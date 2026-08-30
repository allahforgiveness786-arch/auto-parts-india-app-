import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  RefreshControl, 
  Image, 
  Dimensions, 
  SafeAreaView, 
  StatusBar, 
  Modal, 
  Linking, 
  Alert,
  Animated,
  Easing,
  TextInput
} from "react-native";
import { 
  Searchbar, 
  Text, 
  Chip, 
  Card, 
  Badge, 
  IconButton, 
  useTheme, 
  ActivityIndicator,
  Button,
  Divider,
  Icon
} from 'react-native-paper';
import { getFirebaseFirestore } from '../services/firebase';
import { useFavorites } from '../services/favorites';
import { getCurrentLocation, reverseGeocodeOSM } from '../services/location';
import BrandLogo from '../components/BrandLogo';
import { INITIAL_SPARE_PARTS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelectorModal } from '../components/LanguageSelectorModal';
import { UpdateDialogModal } from '../components/UpdateDialogModal';
import { InAppNotification, InAppNotificationData } from '../components/InAppNotification';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Animated Card Component matching the user screenshot 1:1
function AnimatedPartCard({ item, index, navigation, isFavorited, onToggleFavorite, styles }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay: Math.min(index * 40, 300),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: Math.min(index * 40, 300),
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const isNew = (item.condition || '').toLowerCase().includes('new');

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        activeOpacity={0.92}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => navigation.navigate('ProductDetail', { part: item })}
        style={styles.card}
      >
        {/* Top Image Container */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400' }} 
            style={styles.cardImage} 
            resizeMode="cover"
          />

          {/* Condition Badge (Used: Green, New: Blue) */}
          <View style={[styles.conditionBadge, isNew ? styles.conditionBadgeNew : styles.conditionBadgeUsed]}>
            <Text style={[styles.conditionBadgeText, isNew ? styles.conditionTextNew : styles.conditionTextUsed]}>
              {isNew ? 'New' : 'Used'}
            </Text>
          </View>

          {/* Favorite Heart Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            activeOpacity={0.8}
            onPress={(e) => {
              e.stopPropagation?.();
              onToggleFavorite?.(item.id);
            }}
          >
            <Icon 
              source={isFavorited ? "heart" : "heart-outline"} 
              size={20} 
              color={isFavorited ? "#EF4444" : "#FFFFFF"} 
            />
          </TouchableOpacity>
        </View>

        {/* Card Body */}
        <View style={styles.cardContent}>
          <Text numberOfLines={1} style={styles.partTitle}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.partModel}>
            {item.carBrand} {item.carModel}
          </Text>
          <View style={styles.locationRow}>
            <Icon source="map-marker" size={13} color="#64748B" />
            <Text numberOfLines={1} style={styles.locationText}>
              {item.location || 'India'}
            </Text>
          </View>
          <Text style={styles.price}>
            ₹{item.price?.toLocaleString('en-IN')}
          </Text>

          {/* Quick Action Contact Buttons */}
          <View style={styles.cardQuickActions}>
            <TouchableOpacity
              style={styles.waPill}
              activeOpacity={0.8}
              onPress={(e) => {
                e.stopPropagation?.();
                const phoneClean = (item.contactPhone || '').replace(/[^0-9]/g, '');
                const waUrl = phoneClean
                  ? `https://wa.me/91${phoneClean.slice(-10)}?text=Hi, I am interested in your listing: ${encodeURIComponent(item.title)} on Auto Parts India.`
                  : `https://wa.me/?text=Hi, I am interested in your listing: ${encodeURIComponent(item.title)}`;
                Linking.openURL(waUrl).catch(() => Alert.alert('Notice', 'Unable to open WhatsApp'));
              }}
            >
              <Icon source="whatsapp" size={14} color="#15803D" />
              <Text style={styles.waPillText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.callPill}
              activeOpacity={0.8}
              onPress={(e) => {
                e.stopPropagation?.();
                if (item.contactPhone) {
                  Linking.openURL(`tel:${item.contactPhone}`);
                } else {
                  Alert.alert('Notice', 'Phone number not available for this listing.');
                }
              }}
            >
              <Icon source="phone" size={14} color="#0066FF" />
              <Text style={styles.callPillText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen({ navigation, user }: any) {
  const { favorites, toggleFavorite } = useFavorites();
  const [taxonomyCategories, setTaxonomyCategories] = useState<string[]>([]);
  const { t } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All India');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [parts, setParts] = useState<any[]>([]);
  const [promoBanners, setPromoBanners] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [inAppNotification, setInAppNotification] = useState<InAppNotificationData | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateConfig, setUpdateConfig] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return;
    }
    const db = getFirebaseFirestore();
    if (!db) return;
    const unsub = db.collection('chats')
      .where('participants', 'array-contains', user.uid)
      .onSnapshot((snap: any) => {
        let count = 0;
        snap.forEach((doc: any) => {
          const data = doc.data();
          const c = data.unreadCount?.[user.uid] || (data.lastSenderId && data.lastSenderId !== user.uid && data.unread ? 1 : 0);
          count += c;
        });
        setUnreadCount(count);
      });
    return () => unsub();
  }, [user]);

  // Entrance Animations for smooth load
  const headerFade = useRef(new Animated.Value(0)).current;
  const searchSlide = useRef(new Animated.Value(-12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(searchSlide, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.back(1.4)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Exact categories matching the user screenshot
  const categoryItems = [
    { id: 'Engine & Parts', name: 'Engine & Parts', icon: 'engine', iconColor: '#0F172A' },
    { id: 'Body Parts', name: 'Body Parts', icon: 'car-door', iconColor: '#0F172A' },
    { id: 'Electricals', name: 'Electricals', icon: 'lightning-bolt', iconColor: '#0066FF' },
    { id: 'Suspension', name: 'Suspension', icon: 'car-brake-alert', iconColor: '#0F172A' },
    { id: 'Exhaust', name: 'Exhaust', icon: 'needle', iconColor: '#0F172A' },
    { id: 'More', name: 'More', icon: 'apps', iconColor: '#0F172A' },
  ];

  const cities = [
    'All India', 'Delhi', 'Mumbai', 'Bangalore', 'Pune', 
    'Chennai', 'Hyderabad', 'Kolkata', 'Ahmedabad', 'Jaipur'
  ];

  useEffect(() => {
    setLoading(true);
    let unsubscribeParts = () => {};
    let unsubscribeBanners = () => {};

    try {
      const db = getFirebaseFirestore();
      if (!db || typeof db.collection !== 'function') {
        setParts(INITIAL_SPARE_PARTS);
        setLoading(false);
        return;
      }
      
      const qParts = db.collection('spareParts').orderBy('createdAt', 'desc');
      unsubscribeParts = qParts.onSnapshot((snapshot: any) => {
        const list: any[] = [];
        snapshot.forEach((doc: any) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setParts(list.length > 0 ? list : INITIAL_SPARE_PARTS);
        setLoading(false);
        setRefreshing(false);
      }, (err: any) => {
        console.warn('Notice from parts listener:', err);
        setParts((current) => current.length > 0 ? current : INITIAL_SPARE_PARTS);
        setLoading(false);
        setRefreshing(false);
      });

      const qBanners = db.collection('banners').orderBy('order', 'asc');
      unsubscribeBanners = qBanners.onSnapshot((snapshot: any) => {
        const list: any[] = [];
        snapshot.forEach((doc: any) => {
          const data = doc.data();
          // Filter active on client side to avoid composite index requirement
          if (data.active !== false && data.activeStatus !== false) {
            list.push({ id: doc.id, ...data });
          }
        });
        list.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
        setPromoBanners(list);
      }, (err: any) => {
        console.warn('Notice from banners listener:', err);
      });

    } catch (queryErr) {
      console.warn('Failed to query Firestore:', queryErr);
      setParts((current) => current.length > 0 ? current : INITIAL_SPARE_PARTS);
      setLoading(false);
      setRefreshing(false);
    }

    return () => {
      try { unsubscribeParts(); } catch (_) {}
      try { unsubscribeBanners(); } catch (_) {}
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredParts = parts.filter((part) => {
    const queryLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      part.title?.toLowerCase().includes(queryLower) ||
      part.carBrand?.toLowerCase().includes(queryLower) ||
      part.carModel?.toLowerCase().includes(queryLower) ||
      part.category?.toLowerCase().includes(queryLower);

    const matchesCategory = selectedCategory === 'All' || selectedCategory === 'More' || 
      (part.category && part.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]));
    
    const matchesCity = selectedCity === 'All India' || !part.location || 
      part.location.toLowerCase().includes(selectedCity.toLowerCase());

    const partPrice = Number(part.price || part.partPrice) || 0;
    const isAboveMin = minPrice ? partPrice >= Number(minPrice) : true;
    const isBelowMax = maxPrice ? partPrice <= Number(maxPrice) : true;

    return matchesSearch && matchesCategory && matchesCity && isAboveMin && isBelowMax;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080E1B" />
      
      {/* Top Header - Exact dark bar from screenshot */}
      <View style={styles.topHeaderWrapper}>
        <Animated.View style={[styles.header, { opacity: headerFade }]}>
          <View style={styles.headerLeft}>
            <BrandLogo size={36} style={styles.logoImage} />
            <View>
              <Text style={styles.headerTitle}>Auto Parts India</Text>
              <TouchableOpacity 
                style={styles.locationSelector} 
                activeOpacity={0.8}
                onPress={() => setShowLocationModal(true)}
              >
                <Icon source="map-marker" size={13} color="#EF4444" />
                <Text style={styles.headerSubtitle}>
                  {selectedCity} ▾
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.headerActionBtn} 
              onPress={() => setShowLanguageModal(true)}
            >
              <Icon source="translate" color="#FFFFFF" size={22} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.headerActionBtn} 
              onPress={() => navigation.navigate('Notifications')}
            >
              <Icon source="bell-outline" color="#FFFFFF" size={22} />
              {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Search Bar & Blue Filter Button */}
        <Animated.View style={[styles.searchContainer, { transform: [{ translateY: searchSlide }] }]}>
          <Searchbar
            placeholder="Search parts, brands, models..."
            placeholderTextColor="#94A3B8"
            onChangeText={setSearchQuery}
            onSubmitEditing={() => {
              if (searchQuery.trim()) {
                navigation.navigate('Search', { initialQuery: searchQuery });
              }
            }}
            value={searchQuery}
            iconColor="#64748B"
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            elevation={0}
          />
          <TouchableOpacity 
            style={styles.filterBtn} 
            activeOpacity={0.85}
            onPress={() => setShowFilterModal(true)}
          >
            <Icon source="tune-variant" color="#FFFFFF" size={22} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0066FF']} />
        }
      >
        {/* Categories Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity 
            onPress={() => {
              setSelectedCategory('All');
            }}
          >
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Category Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryList}
        >
          {categoryItems.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(isSelected ? 'All' : cat.id)}
                style={[
                  styles.categoryCard,
                  isSelected && styles.categoryCardSelected
                ]}
              >
                <View style={styles.categoryIconWrap}>
                  <Icon 
                    source={cat.icon} 
                    color={isSelected ? '#0066FF' : cat.iconColor} 
                    size={28} 
                  />
                </View>
                <Text 
                  numberOfLines={1} 
                  style={[
                    styles.categoryName,
                    isSelected && styles.categoryNameSelected
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Latest Parts Section Header */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Latest Parts</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* 2-Column Product Grid */}
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0066FF" />
          </View>
        ) : filteredParts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon source="package-variant" size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No spare parts found</Text>
            <Text style={styles.emptySubtitle}>Try resetting your search query or location filter.</Text>
            <Button 
              mode="contained" 
              buttonColor="#0066FF"
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedCity('All India');
                setMinPrice('');
                setMaxPrice('');
              }}
              style={{ marginTop: 14 }}
            >
              Reset Filters
            </Button>
          </View>
        ) : (
          <View style={styles.partsGrid}>
            {filteredParts.map((item, idx) => (
              <View key={item.id} style={styles.gridItem}>
                <AnimatedPartCard 
                  item={item} 
                  index={idx} 
                  navigation={navigation} 
                  isFavorited={favorites?.includes(item.id)}
                  onToggleFavorite={toggleFavorite}
                  styles={styles} 
                />
              </View>
            ))}
          </View>
        )}

        {/* Promotional Bottom Banners */}
        {promoBanners.length > 0 ? (
          promoBanners.map((banner, index) => (
            <TouchableOpacity 
              key={banner.id || index} 
              style={[styles.bottomBanner, { marginTop: index === 0 ? 0 : 16 }]}
              activeOpacity={banner.targetLink ? 0.85 : 1}
              onPress={() => {
                if (banner.targetLink) {
                  Linking.openURL(banner.targetLink).catch(err => console.warn('Could not open link:', err));
                }
              }}
            >
              <View style={[styles.bannerLeft, { flex: banner.imageUrl ? 0.65 : 1 }]}>
                {banner.tag ? (
                   <View style={{ backgroundColor: '#10B981', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8 }}>
                     <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>{banner.tag}</Text>
                   </View>
                ) : null}
                <Text style={styles.bannerTitle}>{banner.title}</Text>
                <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                {banner.targetLink ? (
                  <View style={[styles.bannerBtn, { alignSelf: 'flex-start' }]}>
                    <Text style={styles.bannerBtnText}>View Offer</Text>
                    <Icon source="chevron-right" size={16} color="#0F172A" />
                  </View>
                ) : null}
              </View>
              {banner.imageUrl ? (
                <View style={[styles.bannerRight, { flex: 0.35 }]}>
                  <Image 
                    source={{ uri: banner.imageUrl }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.bottomBanner}>
            <View style={styles.bannerLeft}>
              <Text style={styles.bannerTitle}>Sell Your Parts</Text>
              <Text style={styles.bannerSubtitle}>
                Quickly list and reach thousands of buyers across India
              </Text>
              <TouchableOpacity 
                style={styles.bannerBtn}
                activeOpacity={0.85}
                onPress={() => {
                  if (!user) {
                    navigation.navigate('Auth');
                  } else {
                    navigation.navigate('SellPart');
                  }
                }}
              >
                <Text style={styles.bannerBtnText}>Sell Now</Text>
                <Icon source="chevron-right" size={16} color="#0F172A" />
              </TouchableOpacity>
            </View>
            <View style={styles.bannerRight}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400' }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Location Selector Modal */}
      <Modal visible={showLocationModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <TouchableOpacity onPress={() => setShowLocationModal(false)}>
                <Icon source="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>
            <Divider style={{ marginVertical: 12 }} />
            
            <TouchableOpacity 
              style={styles.gpsLocationBtn}
              onPress={async () => {
                const coords = await getCurrentLocation();
                if (coords) {
                  const geo = await reverseGeocodeOSM(coords.latitude, coords.longitude);
                  if (geo?.city) {
                    setSelectedCity(geo.city);
                  }
                }
                setShowLocationModal(false);
              }}
            >
              <Icon source="crosshairs-gps" size={18} color="#0066FF" />
              <Text style={styles.gpsLocationText}>
                Detect Current Location (GPS)
              </Text>
            </TouchableOpacity>

            {cities.map((city) => (
              <TouchableOpacity
                key={city}
                style={styles.locationItem}
                onPress={() => {
                  setSelectedCity(city);
                  setShowLocationModal(false);
                }}
              >
                <Text style={[styles.locationItemText, selectedCity === city && styles.locationItemTextActive]}>
                  {city}
                </Text>
                {selectedCity === city && <Icon source="check" size={18} color="#0066FF" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal visible={showFilterModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Filter Spare Parts</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Icon source="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>
            <Divider style={{ marginVertical: 12 }} />

            <Text style={styles.filterSectionTitle}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {['All', ...categoryItems.map(c => c.name)].map((c) => (
                <Chip
                  key={c}
                  selected={selectedCategory === c}
                  onPress={() => setSelectedCategory(c)}
                  style={{ marginRight: 8, backgroundColor: selectedCategory === c ? '#DBEAFE' : '#F1F5F9' }}
                  textStyle={{ color: selectedCategory === c ? '#0066FF' : '#334155', fontWeight: '600' }}
                >
                  {c}
                </Chip>
              ))}
            </ScrollView>

            <Text style={styles.filterSectionTitle}>Price Range (₹)</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 }}>
              <View style={{ flex: 1, backgroundColor: '#F8FAFC', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#E2E8F0' }}>
                <TextInput
                  placeholder="Min Price"
                  placeholderTextColor="#94A3B8"
                  value={minPrice}
                  onChangeText={setMinPrice}
                  keyboardType="numeric"
                  style={{ fontSize: 15, color: '#0F172A', padding: 0 }}
                />
              </View>
              <Text style={{ color: '#64748B', fontWeight: 'bold' }}>to</Text>
              <View style={{ flex: 1, backgroundColor: '#F8FAFC', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#E2E8F0' }}>
                <TextInput
                  placeholder="Max Price"
                  placeholderTextColor="#94A3B8"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                  keyboardType="numeric"
                  style={{ fontSize: 15, color: '#0F172A', padding: 0 }}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Button 
                mode="outlined" 
                textColor="#64748B"
                onPress={() => {
                  setSelectedCategory('All');
                  setMinPrice('');
                  setMaxPrice('');
                }} 
                style={{ flex: 1, borderRadius: 12, paddingVertical: 4, borderColor: '#CBD5E1' }}
              >
                Clear
              </Button>
              <Button 
                mode="contained" 
                buttonColor="#0066FF" 
                onPress={() => setShowFilterModal(false)} 
                style={{ flex: 1, borderRadius: 12, paddingVertical: 4 }}
              >
                Apply
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        visible={showLanguageModal}
        onDismiss={() => setShowLanguageModal(false)}
      />

      {/* In-App Notification Overlay */}
      <InAppNotification
        notification={inAppNotification}
        onClose={() => setInAppNotification(null)}
        onPress={() => navigation.navigate('Chats')}
      />

      {/* Version Update Check Modal */}
      {updateConfig && (
        <UpdateDialogModal
          visible={showUpdateDialog}
          versionConfig={updateConfig}
          isForceUpdate={updateConfig.forceUpdate}
          onDismiss={() => setShowUpdateDialog(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeaderWrapper: {
    backgroundColor: '#080E1B',
    paddingBottom: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 9,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 17,
    letterSpacing: -0.2,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 3,
  },
  headerSubtitle: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 48,
  },
  searchInput: {
    fontSize: 14,
    minHeight: 48,
  },
  filterBtn: {
    width: 48,
    height: 48,
    backgroundColor: '#0066FF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0066FF',
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryCard: {
    width: 96,
    height: 98,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryCardSelected: {
    borderColor: '#0066FF',
    borderWidth: 1.5,
    backgroundColor: '#EFF6FF',
  },
  categoryIconWrap: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: '#0066FF',
  },
  partsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  gridItem: {
    width: '48.5%',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 124,
    backgroundColor: '#0F172A',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  conditionBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  conditionBadgeUsed: {
    backgroundColor: '#DCFCE7',
  },
  conditionBadgeNew: {
    backgroundColor: '#DBEAFE',
  },
  conditionBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  conditionTextUsed: {
    color: '#15803D',
  },
  conditionTextNew: {
    color: '#0066FF',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 10,
  },
  partTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  partModel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 2,
  },
  locationText: {
    fontSize: 11,
    color: '#64748B',
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0066FF',
    marginTop: 5,
    letterSpacing: -0.3,
  },
  cardQuickActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 9,
    gap: 6,
  },
  waPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F8EE',
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  waPillText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#15803D',
  },
  callPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF3FF',
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  callPillText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0066FF',
  },
  bottomBanner: {
    backgroundColor: '#08142C',
    borderRadius: 18,
    marginHorizontal: 14,
    marginTop: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    overflow: 'hidden',
  },
  bannerLeft: {
    flex: 1.3,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: 11.5,
    color: '#94A3B8',
    marginTop: 4,
    lineHeight: 16,
  },
  bannerBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    alignSelf: 'flex-start',
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bannerBtnText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
  },
  bannerRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: 110,
    height: 80,
    borderRadius: 12,
  },
  loaderContainer: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#334155',
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  gpsLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    gap: 8,
  },
  gpsLocationText: {
    color: '#0066FF',
    fontWeight: '700',
    fontSize: 13,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  locationItemText: {
    color: '#0F172A',
    fontSize: 14,
  },
  locationItemTextActive: {
    color: '#0066FF',
    fontWeight: 'bold',
  },
  filterSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
});
