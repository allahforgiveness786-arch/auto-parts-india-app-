import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  RefreshControl, 
  Image, 
  SafeAreaView, 
  StatusBar, 
  Modal, 
  Animated,
  Easing,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions
} from "react-native";
import { 
  Text, 
  ActivityIndicator,
  Button,
  Icon
} from 'react-native-paper';
import { getFirebaseFirestore, getCurrentUser } from '../services/firebase';
import { useFavorites } from '../services/favorites';
import { 
  getCurrentLocation, 
  reverseGeocodeLatLng, 
  saveUserLocation,
  getUserSavedLocation
} from '../services/location';
import { INDIAN_STATES_AND_DISTRICTS } from '../data/indianLocations';
import { CarBrandBadge } from '../components/BrandLogo';
import { INITIAL_SPARE_PARTS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelectorModal } from '../components/LanguageSelectorModal';
import { UpdateDialogModal } from '../components/UpdateDialogModal';
import { InAppNotification, InAppNotificationData } from '../components/InAppNotification';
import { matchesCategoryFilter } from '../utils/categoryMatcher';
import { Category3DIcon } from '../components/Category3DIcon';
import { BannerPartsCollage } from '../components/BannerPartsCollage';

// Animated Product Card matching user reference layout
const AnimatedPartCard = React.memo(({ item, index, navigation, isFavorited, onToggleFavorite, cardWidth }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay: Math.min(index * 35, 280),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 380,
        delay: Math.min(index * 35, 280),
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const [imgError, setImgError] = useState(false);
  const primaryUri = !imgError && (item.imageUrl || item.images?.[0] || item.imageUrls?.[0])
    ? (item.imageUrl || item.images?.[0] || item.imageUrls?.[0])
    : 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400';

  const isVerified = Boolean(item.isVerifiedSeller || item.verified || (item.sellerRating && item.sellerRating >= 4.5));

  return (
    <Animated.View
      style={{
        width: cardWidth,
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        marginBottom: 14,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        delayPressIn={0}
        onPress={() => navigation.navigate('ProductDetail', { part: item })}
        style={styles.card}
      >
        {/* Top Image Container */}
        <View style={styles.imageContainer}>
          {item.imageUrl && !imgError ? (
            <Image 
              source={{ uri: item.imageUrl }} 
              style={styles.cardImage} 
              resizeMode="cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <View style={[styles.cardImage, { backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' }]}>
              <Icon source="car-cog" size={32} color="#94A3B8" />
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#64748B', marginTop: 4 }}>OEM Spare Part</Text>
            </View>
          )}

          {/* Verified Dealer Badge or Condition Badge */}
          {isVerified ? (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedBadgeText}>VERIFIED DEALER</Text>
            </View>
          ) : (
            <View style={[styles.conditionBadge, item.condition?.toLowerCase() === 'new' ? styles.conditionBadgeNew : styles.conditionBadgeUsed]}>
              <Text style={[styles.conditionBadgeText, item.condition?.toLowerCase() === 'new' ? styles.conditionTextNew : styles.conditionTextUsed]}>
                {item.condition || 'Used'}
              </Text>
            </View>
          )}

          {/* Floating Circle Heart Wishlist Button */}
          <TouchableOpacity
            style={styles.favoriteCircleButton}
            activeOpacity={0.7}
            delayPressIn={0}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            onPress={(e) => {
              e.stopPropagation?.();
              onToggleFavorite?.(item.id);
            }}
          >
            <Icon 
              source={isFavorited ? "heart" : "heart-outline"} 
              size={18} 
              color={isFavorited ? "#EF4444" : "#475569"} 
            />
          </TouchableOpacity>
        </View>

        {/* Card Body */}
        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text numberOfLines={2} style={styles.partTitle}>
              {item.title || `${item.carBrand || ''} ${item.carModel || ''} Part`}
            </Text>
            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={{ paddingLeft: 4 }}>
              <Icon source="dots-vertical" size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>
            ₹{Number(item.price || item.partPrice || 0).toLocaleString('en-IN')}
          </Text>

          <View style={styles.locationRow}>
            <Icon source="map-marker" size={12} color="#64748B" />
            <Text numberOfLines={1} style={styles.locationText}>
              {item.location ? `${item.location} • ${item.distance || (item.id === 'demo-part-2' ? '12 km away' : '3 km away')}` : 'Chennai • 3 km away'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export default function HomeScreen({ navigation, route, user }: any) {
  const activeUser = user || getCurrentUser();
  const { favorites, toggleFavorite } = useFavorites();
  const { width: screenWidth } = useWindowDimensions();
  const { t } = useLanguage();

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(route?.params?.selectedCategory || 'All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [parts, setParts] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [topCategories, setTopCategories] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [inAppNotification, setInAppNotification] = useState<InAppNotificationData | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateConfig, setUpdateConfig] = useState<any>(null);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // Responsive calculations
  const catCardWidth = Math.floor((screenWidth - 32 - 16) / 3);
  const productCardWidth = Math.floor((screenWidth - 28 - 12) / 2);

  // Sync selectedCategory when passed via navigation params
  useEffect(() => {
    if (route?.params?.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory);
    }
  }, [route?.params?.selectedCategory]);

  // Load saved location
  useEffect(() => {
    const loadSavedLocation = async () => {
      try {
        const saved = await getUserSavedLocation();
        if (saved && saved.city) {
          setSelectedCity(saved.city);
        }
      } catch (err) {
        console.warn('Error reading saved user location:', err);
      }
    };
    loadSavedLocation();
  }, []);

  const handleSelectCity = async (
    cityName: string,
    extra?: { state?: string; district?: string; area?: string; lat?: number; lng?: number; isGPS?: boolean }
  ) => {
    setSelectedCity(cityName);
    setShowLocationModal(false);
    setLocationSearchQuery('');
    await saveUserLocation({
      city: cityName,
      district: extra?.district,
      state: extra?.state,
      area: extra?.area,
      lat: extra?.lat,
      lng: extra?.lng,
      isGPS: !!extra?.isGPS,
    });
  };

  const handleGPSDetect = async () => {
    setIsDetectingGPS(true);
    try {
      const coords = await getCurrentLocation();
      if (coords) {
        const geo = await reverseGeocodeLatLng(coords.latitude, coords.longitude);
        const chosenCity = geo.district || geo.area || geo.state || 'Chennai';
        await handleSelectCity(chosenCity, {
          state: geo.state,
          district: geo.district,
          area: geo.area,
          lat: coords.latitude,
          lng: coords.longitude,
          isGPS: true,
        });
      }
    } catch (err) {
      console.warn('GPS detection error:', err);
    } finally {
      setIsDetectingGPS(false);
    }
  };

  useEffect(() => {
    if (!activeUser) {
      setUnreadCount(3);
      return;
    }
    const db = getFirebaseFirestore();
    if (!db) return;
    const unsub = db.collection('chats')
      .where('participants', 'array-contains', activeUser.uid)
      .onSnapshot((snap: any) => {
        let count = 0;
        snap.forEach((doc: any) => {
          const data = doc.data();
          const c = data.unreadCount?.[activeUser.uid] || (data.lastSenderId && data.lastSenderId !== activeUser.uid && data.unread ? 1 : 0);
          count += c;
        });
        setUnreadCount(count > 0 ? count : 3);
      });
    return () => unsub();
  }, [activeUser]);

  // Entrance Animations
  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  // Default Promotional Banners Carousel Data
  const DEFAULT_PROMO_BANNERS = [
    {
      id: 'mega-deals',
      badge: 'MEGA DEALS',
      badgeColor: '#1565FF',
      headline1: 'UP TO',
      discount: '50% OFF',
      headline2: 'ON GENUINE PARTS',
      features: ['100% Genuine Parts', 'Best Prices Guaranteed', 'Fast & Safe Delivery'],
      cta: 'SHOP NOW',
      targetCategory: 'All',
    },
    {
      id: 'turbo-performance',
      badge: 'PERFORMANCE',
      badgeColor: '#EF4444',
      headline1: 'NEW OEM',
      discount: 'TURBO KITS',
      headline2: 'FOR ALL ENGINES',
      features: ['High-Power Output', 'Precision Balanced', '1 Year Warranty'],
      cta: 'VIEW ENGINES',
      targetCategory: 'Engine & Parts',
    },
    {
      id: 'brakes-suspension',
      badge: 'SAFETY & COMFORT',
      badgeColor: '#10B981',
      headline1: 'SPORT',
      discount: 'COILOVERS',
      headline2: '& BRAKE ROTORS',
      features: ['Ceramic Friction Pads', 'Slotted Steel Discs', 'Anti-Fade Durability'],
      cta: 'EXPLORE BRAKES',
      targetCategory: 'Suspension',
    },
  ];

  // Dynamic promo banners from Firestore or defaults
  const promoBanners = banners.length > 0 ? banners : DEFAULT_PROMO_BANNERS;

  // Auto rotate banner
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % Math.max(promoBanners.length, 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [promoBanners.length]);

  // Default 6 Categories with exact 3D automotive visuals
  const DEFAULT_CATEGORY_GRID_ITEMS = [
    { 
      id: 'Engine & Parts', 
      name: 'Engine & Parts', 
      icon: 'engine', 
      is3DGraphic: 'engine',
    },
    { 
      id: 'Body Parts', 
      name: 'Body Parts', 
      icon: 'car-door', 
      is3DGraphic: 'body',
    },
    { 
      id: 'Electricals', 
      name: 'Electricals', 
      icon: 'lightning-bolt', 
      is3DGraphic: 'electrical',
    },
    { 
      id: 'Suspension', 
      name: 'Suspension', 
      icon: 'car-brake-alert', 
      is3DGraphic: 'suspension',
    },
    { 
      id: 'Exhaust', 
      name: 'Exhaust', 
      icon: 'pipe', 
      is3DGraphic: 'exhaust',
    },
    { 
      id: 'More', 
      name: 'More', 
      icon: 'apps', 
      is3DGraphic: 'more',
    },
  ];

  // Helper to map category names or custom icons to 3D graphic types
  const get3DGraphicForCategory = (cat: any) => {
    if (cat.is3DGraphic) return cat.is3DGraphic;
    const name = (cat.name || cat.title || '').toLowerCase();
    if (name.includes('engine') || name.includes('motor')) return 'engine';
    if (name.includes('body') || name.includes('door') || name.includes('bumper')) return 'body';
    if (name.includes('elect') || name.includes('light') || name.includes('battery')) return 'electrical';
    if (name.includes('suspens') || name.includes('brake') || name.includes('wheel')) return 'suspension';
    if (name.includes('exhaust') || name.includes('silencer') || name.includes('pipe')) return 'exhaust';
    if (name.includes('more') || name.includes('other') || name.includes('all')) return 'more';
    return 'more';
  };

  // Dynamic category grid items from Firestore or defaults
  const categoryGridItems = React.useMemo(() => {
    if (topCategories && topCategories.length > 0) {
      const formatted = topCategories.map((c) => ({
        id: c.id || c.name || c.title,
        name: c.name || c.title,
        icon: c.icon || 'car-cog',
        imageUrl: c.imageUrl,
        is3DGraphic: get3DGraphicForCategory(c),
      }));
      // Ensure 'More' is always present at the end for easy catalog browsing
      if (!formatted.some(c => c.name?.toLowerCase() === 'more')) {
        formatted.push({
          id: 'More',
          name: 'More',
          icon: 'apps',
          imageUrl: undefined,
          is3DGraphic: 'more',
        });
      }
      return formatted;
    }
    return DEFAULT_CATEGORY_GRID_ITEMS;
  }, [topCategories]);

  // Brand items for horizontal brand selector matching the reference image
  const brandList = [
    { id: 'maruti', name: 'Maruti Suzuki' },
    { id: 'hyundai', name: 'Hyundai' },
    { id: 'tata', name: 'Tata' },
    { id: 'mahindra', name: 'Mahindra' },
    { id: 'toyota', name: 'Toyota' },
    { id: 'honda', name: 'Honda' },
    { id: 'kia', name: 'Kia' },
    { id: 'volkswagen', name: 'Volkswagen' },
    { id: 'ford', name: 'Ford' },
  ];

  const popularCities = [
    'Chennai', 'Coimbatore', 'Karur', 'Pallapatti', 
    'Madurai', 'Trichy', 'Salem', 'Tiruppur', 'Erode',
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'All India'
  ];

  const allIndianDistricts = React.useMemo(() => {
    const list: string[] = [];
    INDIAN_STATES_AND_DISTRICTS.forEach((s) => {
      s.districts.forEach((d) => {
        if (!list.includes(d)) list.push(d);
      });
    });
    return list.sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredLocationsList = React.useMemo(() => {
    const q = locationSearchQuery.toLowerCase().trim();
    if (!q) {
      return popularCities;
    }
    const matched = allIndianDistricts.filter((d) => d.toLowerCase().includes(q));
    const matchedStates = INDIAN_STATES_AND_DISTRICTS
      .filter((s) => s.state.toLowerCase().includes(q))
      .map((s) => s.state);
    const combined = Array.from(new Set([...matched, ...matchedStates]));
    if ('all india'.includes(q)) {
      combined.unshift('All India');
    }
    return combined.slice(0, 35);
  }, [locationSearchQuery, allIndianDistricts]);

  useEffect(() => {
    setLoading(true);
    let unsubscribeParts = () => {};
    let unsubscribeBanners = () => {};
    let unsubscribeCategories = () => {};

    try {
      const db = getFirebaseFirestore();
      if (!db || typeof db.collection !== 'function') {
        setParts(INITIAL_SPARE_PARTS);
        setLoading(false);
        return;
      }
      
      // 1. Listen for Spare Parts
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

      // 2. Listen for Admin Banners
      try {
        const qBanners = db.collection('banners');
        unsubscribeBanners = qBanners.onSnapshot((snapshot: any) => {
          const bannerList: any[] = [];
          snapshot.forEach((doc: any) => {
            bannerList.push({ id: doc.id, ...doc.data() });
          });
          // Sort by displayOrder or createdAt
          bannerList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setBanners(bannerList);
        }, (bErr: any) => {
          console.warn('Notice from banners listener:', bErr);
        });
      } catch (bCatch) {
        console.warn('Could not listen to banners collection:', bCatch);
      }

      // 3. Listen for Admin Categories (topCategories collection)
      try {
        const qCategories = db.collection('topCategories');
        unsubscribeCategories = qCategories.onSnapshot((snapshot: any) => {
          const catList: any[] = [];
          snapshot.forEach((doc: any) => {
            catList.push({ id: doc.id, ...doc.data() });
          });
          catList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setTopCategories(catList);
        }, (cErr: any) => {
          console.warn('Notice from categories listener:', cErr);
        });
      } catch (cCatch) {
        console.warn('Could not listen to topCategories collection:', cCatch);
      }

    } catch (queryErr) {
      console.warn('Failed to query Firestore:', queryErr);
      setParts((current) => current.length > 0 ? current : INITIAL_SPARE_PARTS);
      setLoading(false);
      setRefreshing(false);
    }

    return () => {
      try { unsubscribeParts(); } catch (_) {}
      try { unsubscribeBanners(); } catch (_) {}
      try { unsubscribeCategories(); } catch (_) {}
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const strictFilteredParts = parts.filter((part) => {
    const queryLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !queryLower || 
      part.title?.toLowerCase().includes(queryLower) ||
      part.carBrand?.toLowerCase().includes(queryLower) ||
      part.carModel?.toLowerCase().includes(queryLower) ||
      part.category?.toLowerCase().includes(queryLower) ||
      part.subCategory?.toLowerCase().includes(queryLower) ||
      part.location?.toLowerCase().includes(queryLower);

    const matchesCategory = matchesCategoryFilter(part, selectedCategory);
    
    const matchesBrand = selectedBrand === 'All' || 
      (part.carBrand && part.carBrand.toLowerCase().includes(selectedBrand.toLowerCase()));

    const matchesCity = selectedCity === 'All India' || !part.location || 
      part.location.toLowerCase().includes(selectedCity.toLowerCase()) ||
      (part.state && part.state.toLowerCase().includes(selectedCity.toLowerCase()));

    const partPrice = Number(part.price || part.partPrice) || 0;
    const isAboveMin = minPrice ? partPrice >= Number(minPrice) : true;
    const isBelowMax = maxPrice ? partPrice <= Number(maxPrice) : true;

    return matchesSearch && matchesCategory && matchesBrand && matchesCity && isAboveMin && isBelowMax;
  });

  const filteredParts = strictFilteredParts.length > 0 ? strictFilteredParts : parts.filter((part) => {
    const queryLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !queryLower || 
      part.title?.toLowerCase().includes(queryLower) ||
      part.carBrand?.toLowerCase().includes(queryLower) ||
      part.carModel?.toLowerCase().includes(queryLower);

    const matchesCategory = matchesCategoryFilter(part, selectedCategory);
    const matchesBrand = selectedBrand === 'All' || 
      (part.carBrand && part.carBrand.toLowerCase().includes(selectedBrand.toLowerCase()));

    const partPrice = Number(part.price || part.partPrice) || 0;
    const isAboveMin = minPrice ? partPrice >= Number(minPrice) : true;
    const isBelowMax = maxPrice ? partPrice <= Number(maxPrice) : true;

    return matchesSearch && matchesCategory && matchesBrand && isAboveMin && isBelowMax;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565FF" />
      
      {/* Top Header - Royal Blue Bar matching user mockup */}
      <View style={styles.topHeaderWrapper}>
        <Animated.View style={[styles.headerRow, { opacity: headerFade }]}>
          {/* Location Selector Pill */}
          <TouchableOpacity 
            style={styles.locationPill} 
            activeOpacity={0.85}
            onPress={() => setShowLocationModal(true)}
          >
            <Icon source="map-marker" size={15} color="#FFFFFF" />
            <Text style={styles.locationPillText} numberOfLines={1}>
              {selectedCity === 'All India' ? 'All India' : `${selectedCity}, Tamil Nadu`}
            </Text>
            <Icon source="chevron-down" size={15} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Right Controls: Language & Notification */}
          <View style={styles.headerRightGroup}>
            <TouchableOpacity 
              style={styles.langPill} 
              activeOpacity={0.8}
              onPress={() => setShowLanguageModal(true)}
            >
              <Text style={styles.langPillText}>A/அ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.bellBtn} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Icon source="bell-outline" color="#FFFFFF" size={22} />
              {unreadCount > 0 && (
                <View style={styles.bellBadge}>
                  <Text style={styles.bellBadgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Search Bar & Integrated Filter Adjustments Sliders Icon */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBarBox}>
            <Icon source="magnify" size={22} color="#64748B" />
            <TextInput
              placeholder="Search spare parts, OEM numbers, car models..."
              placeholderTextColor="#94A3B8"
              onChangeText={setSearchQuery}
              onSubmitEditing={() => {
                if (searchQuery.trim()) {
                  navigation.navigate('Search', { initialQuery: searchQuery });
                }
              }}
              value={searchQuery}
              style={styles.searchInput}
              returnKeyType="search"
            />
            <TouchableOpacity 
              style={styles.filterInlineBtn} 
              activeOpacity={0.7}
              onPress={() => setShowFilterModal(true)}
            >
              <Icon source="tune-variant" color="#0F172A" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1565FF']} />
        }
      >
        {/* Mega Deals / Admin Promotional Banner */}
        <View style={styles.bannerOuterContainer}>
          {(() => {
            const curBanner = promoBanners[activeBannerIndex] || promoBanners[0];
            if (!curBanner) return null;

            const targetCat = curBanner.targetLink || curBanner.targetCategory || curBanner.category || '';

            const handleBannerPress = () => {
              if (targetCat) {
                setSelectedCategory(targetCat);
              }
            };

            // 1. If banner has an imageUrl (Uploaded via Admin CMS):
            // Show the complete banner image edge-to-edge without any obscuring layers or cropped layouts
            if (curBanner.imageUrl) {
              return (
                <TouchableOpacity
                  activeOpacity={0.92}
                  onPress={handleBannerPress}
                  style={styles.fullImageBannerCard}
                >
                  <Image
                    source={{ uri: curBanner.imageUrl }}
                    style={styles.fullBannerImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            }

            // 2. Fallback text banner if no image is present
            const badgeText = curBanner.badge || curBanner.tag || 'MEGA DEALS';
            const headline1 = curBanner.headline1 || (curBanner.title ? '' : 'UP TO');
            const discountText = curBanner.discount || curBanner.subtitle || '50% OFF';
            const headline2 = curBanner.headline2 || curBanner.title || 'ON GENUINE PARTS';
            const ctaText = curBanner.cta || curBanner.buttonText || 'SHOP NOW';

            return (
              <TouchableOpacity
                activeOpacity={0.92}
                onPress={handleBannerPress}
                style={[
                  styles.megaDealBanner,
                  curBanner.backgroundColor ? { backgroundColor: curBanner.backgroundColor } : null
                ]}
              >
                <View style={styles.bannerLeftContent}>
                  {badgeText ? (
                    <View style={[
                      styles.megaDealsBadge,
                      curBanner.badgeColor ? { borderColor: curBanner.badgeColor } : null
                    ]}>
                      <Text style={styles.megaDealsBadgeText}>{badgeText}</Text>
                    </View>
                  ) : null}
                  {headline1 ? <Text style={styles.bannerSubHeadSmall}>{headline1}</Text> : null}
                  <Text style={styles.megaDealDiscount}>{discountText}</Text>
                  <Text style={styles.megaDealHeadline}>{headline2}</Text>

                  <View style={styles.shopNowBtn}>
                    <Text style={styles.shopNowBtnText}>{ctaText}</Text>
                    <Icon source="chevron-right" size={14} color="#0F172A" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })()}

          {/* Carousel Pagination Dots */}
          {promoBanners.length > 1 && (
            <View style={styles.dotsRow}>
              {promoBanners.map((bItem, idx) => (
                <TouchableOpacity
                  key={bItem.id || idx}
                  onPress={() => setActiveBannerIndex(idx)}
                  hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
                >
                  <View 
                    style={[
                      styles.dot, 
                      idx === activeBannerIndex && styles.activeDot
                    ]} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* 6 Category Grid (3 Columns x 2 Rows) */}
        <View style={styles.categoryGrid}>
          {categoryGridItems.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            const isMore = cat.id === 'More';

            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.catGridCard, 
                  { width: catCardWidth },
                  isSelected && styles.catGridCardSelected
                ]}
                activeOpacity={0.75}
                onPress={() => {
                  if (isMore) {
                    navigation.navigate('AllCategories', { categories: categoryGridItems.filter(c => c.id !== 'More') });
                  } else {
                    setSelectedCategory(isSelected ? 'All' : cat.name);
                  }
                }}
              >
                <View style={styles.catVisualBox}>
                  {cat.imageUrl ? (
                    <Image
                      source={{ uri: cat.imageUrl }}
                      style={{ width: 48, height: 48, borderRadius: 10, resizeMode: 'cover' }}
                    />
                  ) : (
                    <Category3DIcon type={cat.is3DGraphic || 'more'} size={50} active={isSelected} />
                  )}
                </View>
                <Text 
                  style={[styles.catLabel, isSelected && styles.catLabelSelected]} 
                  numberOfLines={1}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Horizontal Brand Selector Chips */}
        <View style={styles.brandsSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandsScrollList}
          >
            {brandList.map((b) => {
              const isBrandSelected = selectedBrand.toLowerCase() === b.name.toLowerCase();
              return (
                <TouchableOpacity
                  key={b.id}
                  style={[
                    styles.brandChipCard,
                    isBrandSelected && styles.brandChipCardSelected
                  ]}
                  activeOpacity={0.75}
                  onPress={() => {
                    setSelectedBrand(isBrandSelected ? 'All' : b.name);
                  }}
                >
                  <View style={styles.brandLogoBox}>
                    <CarBrandBadge brand={b.name} size={28} active={isBrandSelected} />
                  </View>
                  <Text style={[styles.brandChipText, isBrandSelected && styles.brandChipTextSelected]} numberOfLines={1}>
                    {b.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Active Filter Indicators */}
        {(selectedCategory !== 'All' || selectedBrand !== 'All') && (
          <View style={styles.activeFiltersBar}>
            <View style={styles.activeFilterRow}>
              {selectedCategory !== 'All' && (
                <View style={styles.filterPill}>
                  <Text style={styles.filterPillText}>{selectedCategory}</Text>
                  <TouchableOpacity onPress={() => setSelectedCategory('All')} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                    <Icon source="close" size={14} color="#1565FF" />
                  </TouchableOpacity>
                </View>
              )}
              {selectedBrand !== 'All' && (
                <View style={styles.filterPill}>
                  <Text style={styles.filterPillText}>{selectedBrand}</Text>
                  <TouchableOpacity onPress={() => setSelectedBrand('All')} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                    <Icon source="close" size={14} color="#1565FF" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TouchableOpacity 
              onPress={() => { setSelectedCategory('All'); setSelectedBrand('All'); }}
              style={styles.clearAllBtn}
            >
              <Text style={styles.clearAllBtnText}>Clear all</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Fresh Recommendations Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fresh Recommendations</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Search', { initialCategory: selectedCategory !== 'All' ? selectedCategory : undefined })}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>View All &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* 2-Column Product Grid */}
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#1565FF" />
          </View>
        ) : filteredParts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon source="car-search" size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No spare parts found</Text>
            <Text style={styles.emptySubtitle}>
              Try resetting your search query or choosing another category/brand.
            </Text>
            <Button 
              mode="contained" 
              buttonColor="#1565FF"
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedBrand('All');
                setSelectedCity('Chennai');
                setMinPrice('');
                setMaxPrice('');
              }}
              style={{ marginTop: 14 }}
            >
              Show All Parts
            </Button>
          </View>
        ) : (
          <View style={styles.partsGrid}>
            {filteredParts.map((item, idx) => (
              <AnimatedPartCard 
                key={item.id} 
                item={item} 
                index={idx} 
                navigation={navigation} 
                isFavorited={favorites?.includes(item.id)}
                onToggleFavorite={toggleFavorite}
                cardWidth={productCardWidth}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Location Selector Modal */}
      <Modal visible={showLocationModal} animationType="slide" transparent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <TouchableOpacity 
            style={{ flex: 1 }} 
            activeOpacity={1} 
            onPress={() => setShowLocationModal(false)} 
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Select Your Location</Text>
              <TouchableOpacity onPress={() => setShowLocationModal(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Icon source="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.gpsLocationBtn} 
              activeOpacity={0.8}
              onPress={handleGPSDetect}
              disabled={isDetectingGPS}
            >
              {isDetectingGPS ? (
                <ActivityIndicator size="small" color="#1565FF" />
              ) : (
                <Icon source="crosshairs-gps" size={20} color="#1565FF" />
              )}
              <Text style={styles.gpsLocationText}>
                {isDetectingGPS ? 'Detecting your GPS location...' : 'Use Current GPS Location'}
              </Text>
            </TouchableOpacity>

            <View style={styles.locationSearchBox}>
              <Icon source="magnify" size={20} color="#94A3B8" />
              <TextInput
                placeholder="Search state, district, or city..."
                placeholderTextColor="#94A3B8"
                value={locationSearchQuery}
                onChangeText={setLocationSearchQuery}
                style={styles.locationSearchInput}
              />
            </View>

            <ScrollView style={{ maxHeight: 320 }} keyboardShouldPersistTaps="handled">
              {filteredLocationsList.map((loc) => {
                const isActive = selectedCity.toLowerCase() === loc.toLowerCase();
                return (
                  <TouchableOpacity
                    key={loc}
                    style={[styles.locationItem, isActive && styles.locationItemHighlight]}
                    onPress={() => handleSelectCity(loc)}
                  >
                    <Text style={[styles.locationItemText, isActive && styles.locationItemTextActive]}>
                      {loc}
                    </Text>
                    {isActive && <Icon source="check" size={18} color="#1565FF" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Filter Modal */}
      <Modal visible={showFilterModal} animationType="slide" transparent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <TouchableOpacity 
            style={{ flex: 1 }} 
            activeOpacity={1} 
            onPress={() => setShowFilterModal(false)} 
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Icon source="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.filterSectionTitle, { marginTop: 14 }]}>Price Range (₹)</Text>
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <TextInput
                placeholder="Min Price"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
                style={[styles.locationSearchBox, { flex: 1, height: 44 }]}
              />
              <TextInput
                placeholder="Max Price"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
                style={[styles.locationSearchBox, { flex: 1, height: 44 }]}
              />
            </View>

            <Button 
              mode="contained" 
              buttonColor="#1565FF"
              onPress={() => setShowFilterModal(false)}
              style={{ marginTop: 8 }}
            >
              Apply Filters
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <LanguageSelectorModal
        visible={showLanguageModal}
        onDismiss={() => setShowLanguageModal(false)}
      />

      {showUpdateDialog && !!updateConfig && (
        <UpdateDialogModal
          visible={showUpdateDialog}
          versionConfig={updateConfig}
          config={updateConfig}
          onDismiss={() => setShowUpdateDialog(false)}
        />
      )}

      {inAppNotification && (
        <InAppNotification
          notification={inAppNotification}
          onClose={() => setInAppNotification(null)}
          onPress={(item) => {
            if (item?.chatId) {
              navigation.navigate('ChatRoom', { chatId: item.chatId });
            }
            setInAppNotification(null);
          }}
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
    backgroundColor: '#1565FF',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 6,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    maxWidth: '68%',
  },
  locationPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  adminHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
    borderWidth: 1,
    borderColor: '#FDE047',
  },
  adminHeaderBtnText: {
    color: '#FDE047',
    fontSize: 11,
    fontWeight: '800',
  },
  langPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  langPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  bellBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#EF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1565FF',
  },
  bellBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  searchContainer: {
    width: '100%',
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    paddingVertical: 0,
  },
  filterInlineBtn: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  bannerOuterContainer: {
    marginHorizontal: 14,
    marginTop: 18,
    marginBottom: 16,
  },
  fullImageBannerCard: {
    width: '100%',
    aspectRatio: 2.5,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  fullBannerImage: {
    width: '100%',
    height: '100%',
  },
  megaDealBanner: {
    backgroundColor: '#071530',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  bannerLeftContent: {
    flex: 1.25,
    paddingRight: 6,
  },
  megaDealsBadge: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  megaDealsBadgeText: {
    color: '#93C5FD',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  bannerSubHeadSmall: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  megaDealDiscount: {
    color: '#FACC15',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 28,
  },
  megaDealHeadline: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
    marginTop: 2,
    marginBottom: 6,
  },
  bannerBulletsColumn: {
    gap: 3,
    marginVertical: 4,
  },
  bannerBulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bannerBulletText: {
    color: '#E2E8F0',
    fontSize: 9,
    fontWeight: '700',
  },
  bannerSubFeatures: {
    color: '#94A3B8',
    fontSize: 9.5,
    fontWeight: '600',
    marginTop: 6,
  },
  shopNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
    gap: 2,
  },
  shopNowBtnText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '800',
  },
  bannerRightArt: {
    flex: 1,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bannerGlowCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E40AF',
    opacity: 0.6,
  },
  bannerArtImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  activeDot: {
    width: 18,
    backgroundColor: '#1565FF',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    rowGap: 12,
    marginBottom: 16,
  },
  catGridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  catGridCardSelected: {
    borderColor: '#1565FF',
    borderWidth: 1.5,
    backgroundColor: '#EFF6FF',
  },
  catVisualBox: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  catImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  moreIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  catLabelSelected: {
    color: '#1565FF',
    fontWeight: '700',
  },
  brandsSection: {
    marginBottom: 16,
  },
  brandsScrollList: {
    paddingHorizontal: 14,
    gap: 10,
  },
  brandChipCard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 82,
    height: 76,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1.5,
  },
  brandChipCardSelected: {
    borderColor: '#1565FF',
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
  },
  brandLogoBox: {
    width: 46,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 6,
    textAlign: 'center',
  },
  brandChipTextSelected: {
    color: '#1565FF',
    fontWeight: '700',
  },
  activeFiltersBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  activeFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1565FF',
  },
  clearAllBtn: {
    padding: 4,
  },
  clearAllBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
  },
  sectionHeader: {
    paddingHorizontal: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1565FF',
  },
  partsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 136,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#1565FF',
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: 4,
  },
  verifiedBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.3,
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
    fontSize: 9.5,
    fontWeight: '800',
  },
  conditionTextUsed: {
    color: '#15803D',
  },
  conditionTextNew: {
    color: '#1565FF',
  },
  favoriteCircleButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContent: {
    padding: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 34,
  },
  partTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 17,
  },
  price: {
    fontSize: 15.5,
    fontWeight: '900',
    color: '#1565FF',
    marginTop: 4,
    letterSpacing: -0.3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 3,
  },
  locationText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
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
    marginBottom: 12,
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
    color: '#1565FF',
    fontWeight: '700',
    fontSize: 13,
  },
  locationSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 42,
    marginVertical: 6,
    gap: 8,
  },
  locationSearchInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#0F172A',
    paddingVertical: 0,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  locationItemHighlight: {
    backgroundColor: '#EFF6FF',
  },
  locationItemText: {
    color: '#0F172A',
    fontSize: 14,
  },
  locationItemTextActive: {
    color: '#1565FF',
    fontWeight: 'bold',
  },
  filterSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
});
