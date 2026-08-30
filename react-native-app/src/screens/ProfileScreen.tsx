import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Modal,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  List,
  Button,
  Divider,
  Surface,
  Badge,
  useTheme,
  Icon,
} from 'react-native-paper';
import { promptImageSourceDialog } from '../services/imagePickerService';
import { uploadImageToCloudinary } from '../services/cloudinary';
import { getFirebaseAuth, getFirebaseFirestore, getCurrentUser } from '../services/firebase';
import { signOutFromGoogle } from '../services/googleAuth';
import { UserProfile } from '../types';
import { EditListingModal } from '../components/EditListingModal';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelectorModal } from '../components/LanguageSelectorModal';
import { UserProfilePopupModal } from '../components/UserProfilePopupModal';
import { getRecentlyViewedParts, clearRecentlyViewedParts } from '../services/recentlyViewed';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250';
const SUPPORT_EMAIL = 'wwwautoparts2@gmail.com';

export default function ProfileScreen({ navigation, route, user: initialUser, initialTab = 'overview' }: any) {
  const theme = useTheme();
  const { t, language } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  
  // Tab states: 'overview' | 'my_listings' | 'saved' | 'recent' | 'enquiries'
  const [activeTab, setActiveTab] = useState<'overview' | 'my_listings' | 'saved' | 'recent' | 'enquiries'>(
    route?.params?.initialTab || initialTab || 'overview'
  );

  // Filter within listings: 'all' | 'active' | 'sold'
  const [listingFilter, setListingFilter] = useState<'all' | 'active' | 'sold'>('all');

  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [isPopupModalVisible, setIsPopupModalVisible] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [cacheBuster, setCacheBuster] = useState(Date.now());

  // Listings, Favorites, Recently Viewed & Enquiries state
  const [myListings, setMyListings] = useState<any[]>([]);
  const [savedParts, setSavedParts] = useState<any[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [myEnquiries, setMyEnquiries] = useState<any[]>([]);
  const [selectedEditPart, setSelectedEditPart] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Edit profile info modal
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Modals for Report Problem, Help Center, Terms, Privacy
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportIssueType, setReportIssueType] = useState('Listing Issue');
  const [reportDescription, setReportDescription] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  const [helpCenterVisible, setHelpCenterVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [securityModalVisible, setSecurityModalVisible] = useState(false);

  const currentAuthUser = initialUser || getCurrentUser();
  const activeUid = currentAuthUser?.uid || currentAuthUser?.id || 'demo-user';

  // Check if current user has admin rights
  const isAdmin =
    currentAuthUser?.email === SUPPORT_EMAIL ||
    profileData?.role === 'admin' ||
    profileData?.role === 'superadmin';

  // 1. Real-time Profile Sync
  useEffect(() => {
    if (!currentAuthUser) {
      setProfileData(null);
      return;
    }

    let unsubscribe = () => {};
    try {
      const db = getFirebaseFirestore();
      if (db && typeof db.collection === 'function') {
        const userDocRef = db.collection('users').doc(activeUid);
        unsubscribe = userDocRef.onSnapshot(
          (docSnap: any) => {
            const isExisting = typeof docSnap?.exists === 'function' ? docSnap.exists() : Boolean(docSnap?.exists);
            if (isExisting) {
              const data = docSnap.data();
              setProfileData({
                id: docSnap.id,
                email: data?.email || currentAuthUser.email || '',
                name: data?.name || data?.displayName || currentAuthUser.displayName || '',
                displayName: data?.displayName || data?.name || currentAuthUser.displayName || '',
                photoURL: data?.photoURL || currentAuthUser.photoURL || '',
                phone: data?.phone || '',
                location: data?.location || '',
                role: data?.role || 'buyer',
                createdAt: data?.createdAt,
              });
              setEditName(data?.displayName || data?.name || currentAuthUser.displayName || '');
              setEditPhone(data?.phone || '');
              setEditLocation(data?.location || '');
              setCacheBuster(Date.now());
            } else {
              setProfileData({
                id: activeUid,
                email: currentAuthUser.email || '',
                name: currentAuthUser.displayName || '',
                displayName: currentAuthUser.displayName || '',
                photoURL: currentAuthUser.photoURL || '',
                role: 'buyer',
              });
              setEditName(currentAuthUser.displayName || '');
            }
          },
          (error: any) => {
            console.warn('[ProfileScreen] Firestore onSnapshot notice:', error);
          }
        );
      }
    } catch (e) {
      console.warn('[ProfileScreen] Setup snapshot error:', e);
    }

    return () => {
      try { unsubscribe(); } catch (_) {}
    };
  }, [activeUid]);

  // 2. Fetch User's Listings, Favorites, and Enquiries in Real-time
  useEffect(() => {
    let unsubSpare = () => {};
    let unsubFavs = () => {};
    let unsubChats = () => {};

    try {
      const db = getFirebaseFirestore();
      if (db && typeof db.collection === 'function') {
        // Spare parts listener
        unsubSpare = db.collection('spareParts').onSnapshot((snapshot: any) => {
          const list: any[] = [];
          snapshot.forEach((doc: any) => {
            list.push({ id: doc.id, ...doc.data() });
          });

          // User's own listings
          const own = list.filter((it: any) =>
            it.sellerId === activeUid ||
            it.userId === activeUid ||
            it.sellerEmail === currentAuthUser?.email
          );
          setMyListings(own);
        }, () => {
          setMyListings([]);
        });

        // Favorites listener
        unsubFavs = db.collection('favorites')
          .where('userId', '==', activeUid)
          .onSnapshot(async (favSnap: any) => {
            const favIds: string[] = [];
            favSnap.forEach((d: any) => {
              const data = d.data();
              if (data.partId) favIds.push(data.partId);
            });

            if (favIds.length > 0) {
              const partsSnap = await db.collection('spareParts').get();
              const favedList: any[] = [];
              partsSnap.forEach((docSnap: any) => {
                if (favIds.includes(docSnap.id)) {
                  favedList.push({ id: docSnap.id, ...docSnap.data() });
                }
              });
              setSavedParts(favedList);
            } else {
              setSavedParts([]);
            }
          }, () => {
            setSavedParts([]);
          });

        // Enquiries / Buyer chats listener
        unsubChats = db.collection('chats')
          .where('participants', 'array-contains', activeUid)
          .onSnapshot((chatSnap: any) => {
            const enqList: any[] = [];
            chatSnap.forEach((cDoc: any) => {
              const data = cDoc.data();
              enqList.push({ id: cDoc.id, ...data });
            });
            // Sort by latest message
            enqList.sort((a, b) => (b.lastMessageTime || b.updatedAt || 0) - (a.lastMessageTime || a.updatedAt || 0));
            setMyEnquiries(enqList);
          }, () => {
            setMyEnquiries([]);
          });
      }
    } catch (_) {
      setMyListings([]);
      setSavedParts([]);
      setMyEnquiries([]);
    }

    return () => {
      try { unsubSpare(); } catch (_) {}
      try { unsubFavs(); } catch (_) {}
      try { unsubChats(); } catch (_) {}
    };
  }, [activeUid, currentAuthUser?.email]);

  // 3. Load Recently Viewed Parts
  useEffect(() => {
    const loadRecent = async () => {
      const items = await getRecentlyViewedParts();
      setRecentlyViewed(items);
    };
    loadRecent();
  }, [activeTab]);

  // 4. Photo Upload
  const handleUpdateProfilePhoto = async () => {
    if (!currentAuthUser) {
      Alert.alert('Sign In Required', 'Please sign in to update your profile photo.');
      return;
    }

    try {
      const selectedUri = await promptImageSourceDialog(
        'Profile Picture',
        'Choose a photo for your profile'
      );

      if (!selectedUri) return;

      setUploadingPhoto(true);
      setProfileData((prev) =>
        prev
          ? { ...prev, photoURL: selectedUri }
          : {
              id: activeUid,
              email: currentAuthUser.email || '',
              name: currentAuthUser.displayName || '',
              displayName: currentAuthUser.displayName || '',
              photoURL: selectedUri,
              role: 'buyer',
            }
      );

      const uploadedUrl = await uploadImageToCloudinary(selectedUri, 'avatars');

      // Update Auth
      try {
        const authInst = getFirebaseAuth();
        if (authInst?.currentUser && typeof authInst.currentUser.updateProfile === 'function') {
          await authInst.currentUser.updateProfile({ photoURL: uploadedUrl });
        }
      } catch (_) {}

      // Update Firestore
      try {
        const db = getFirebaseFirestore();
        if (db && typeof db.collection === 'function') {
          await db.collection('users').doc(activeUid).set(
            { photoURL: uploadedUrl, updatedAt: Date.now() },
            { merge: true }
          );
        }
      } catch (_) {}

      // Propagate photo to user's listings
      try {
        const db = getFirebaseFirestore();
        if (db && typeof db.collection === 'function') {
          const userSnap = await db
            .collection('spareParts')
            .where('sellerId', '==', activeUid)
            .get();
          userSnap.forEach((docSnap: any) => {
            docSnap.ref
              .update({
                sellerPhotoURL: uploadedUrl,
                sellerPhoto: uploadedUrl,
                sellerAvatar: uploadedUrl,
              })
              .catch(() => {});
          });
        }
      } catch (_) {}

      setProfileData((prev) => (prev ? { ...prev, photoURL: uploadedUrl } : null));
      setCacheBuster(Date.now());
      Alert.alert('Success', 'Profile photo updated successfully!');
    } catch (err: any) {
      Alert.alert('Upload Status', err.message || 'Could not update profile photo.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  // 5. Save Profile Details
  const handleSaveProfileDetails = async () => {
    if (!editName.trim()) {
      Alert.alert('Validation', 'Please enter your name.');
      return;
    }
    setSavingProfile(true);
    try {
      const db = getFirebaseFirestore();
      if (db && typeof db.collection === 'function') {
        await db.collection('users').doc(activeUid).set(
          {
            displayName: editName.trim(),
            name: editName.trim(),
            phone: editPhone.trim(),
            location: editLocation.trim(),
            updatedAt: Date.now(),
          },
          { merge: true }
        );
      }
      setIsEditProfileModalOpen(false);
      Alert.alert('Saved', 'Your profile details have been updated.');
    } catch (err: any) {
      Alert.alert('Error', 'Failed to update profile details.');
    } finally {
      setSavingProfile(false);
    }
  };

  // 6. Toggle Mark As Sold
  const handleToggleSold = (part: any) => {
    const newSoldStatus = !part.sold;
    Alert.alert(
      newSoldStatus ? 'Mark as Sold' : 'Mark as Available',
      newSoldStatus
        ? 'Are you sure you want to mark this spare part as Sold?'
        : 'Do you want to restore this spare part listing to Available status?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: newSoldStatus ? 'Mark Sold' : 'Make Available',
          onPress: async () => {
            try {
              const db = getFirebaseFirestore();
              if (db && typeof db.collection === 'function') {
                await db.collection('spareParts').doc(part.id).update({
                  sold: newSoldStatus,
                  status: newSoldStatus ? 'sold' : 'available',
                  updatedAt: Date.now(),
                });
              }
              setMyListings((prev) =>
                prev.map((item) => (item.id === part.id ? { ...item, sold: newSoldStatus } : item))
              );
              Alert.alert('Status Updated', newSoldStatus ? 'Marked as Sold.' : 'Marked as Available.');
            } catch (_) {
              Alert.alert('Notice', 'Status updated.');
            }
          },
        },
      ]
    );
  };

  // 7. Delete Listing
  const handleDeleteListing = (partId: string) => {
    Alert.alert(
      'Delete Listing',
      'Are you sure you want to permanently delete this listing? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const db = getFirebaseFirestore();
              if (db && typeof db.collection === 'function') {
                await db.collection('spareParts').doc(partId).delete();
              }
              setMyListings((prev) => prev.filter((it) => it.id !== partId));
              Alert.alert('Deleted', 'Listing removed successfully.');
            } catch (_) {
              setMyListings((prev) => prev.filter((it) => it.id !== partId));
            }
          },
        },
      ]
    );
  };

  // 8. Sign Out
  const handleSignOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOutFromGoogle();
              const authInst = getFirebaseAuth();
              if (authInst && typeof authInst.signOut === 'function') {
                await authInst.signOut();
              }
              if (navigation?.reset) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                });
              } else {
                navigation.navigate('Auth');
              }
            } catch (err: any) {
              Alert.alert('Error', 'Failed to logout.');
            }
          },
        },
      ]
    );
  };

  // 9. Contact Support Action
  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      `Need help with your account, orders or listings? Email our 24/7 support desk at:\n\n${SUPPORT_EMAIL}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Email',
          onPress: () => {
            Linking.openURL(
              `mailto:${SUPPORT_EMAIL}?subject=Support Request - Auto Parts App&body=Hello Support Team,\n\nUser ID: ${activeUid}\nEmail: ${userEmail}\n\nMy Query / Issue:\n`
            ).catch(() => {
              Alert.alert('Email Client', `Please send an email directly to ${SUPPORT_EMAIL}`);
            });
          },
        },
      ]
    );
  };

  // 10. Submit Report Issue
  const handleSubmitReport = async () => {
    if (!reportDescription.trim()) {
      Alert.alert('Validation', 'Please describe the problem.');
      return;
    }
    setSubmittingReport(true);
    try {
      const db = getFirebaseFirestore();
      if (db && typeof db.collection === 'function') {
        await db.collection('reports').add({
          userId: activeUid,
          userEmail: userEmail,
          userName: displayName,
          type: reportIssueType,
          description: reportDescription.trim(),
          status: 'pending',
          createdAt: Date.now(),
        });
      }
      setSubmittingReport(false);
      setReportModalVisible(false);
      setReportDescription('');
      Alert.alert(
        'Report Submitted',
        'Thank you! Our support team will review your report and get back to you shortly.'
      );
    } catch (err) {
      setSubmittingReport(false);
      Alert.alert('Error', 'Failed to submit report. Please try contacting support directly via email.');
    }
  };

  const rawPhoto = !avatarLoadError ? (profileData?.photoURL || currentAuthUser?.photoURL) : null;
  const displayPhotoUrl = rawPhoto
    ? `${rawPhoto}${rawPhoto.includes('?') ? '&' : '?'}t=${cacheBuster}`
    : DEFAULT_AVATAR;

  const displayName =
    profileData?.displayName ||
    profileData?.name ||
    currentAuthUser?.displayName ||
    currentAuthUser?.email?.split('@')[0] ||
    'Auto Parts Member';

  const userEmail = profileData?.email || currentAuthUser?.email || 'Logged In Account';

  // Listings filtered by sub-category
  const filteredListings = myListings.filter((part) => {
    if (listingFilter === 'active') return !part.sold;
    if (listingFilter === 'sold') return Boolean(part.sold);
    return true;
  });

  const activeAdsCount = myListings.filter((p) => !p.sold).length;
  const soldAdsCount = myListings.filter((p) => Boolean(p.sold)).length;

  return (
    <View style={styles.container}>
      {/* 👤 Top Account / Profile Section */}
      <Surface style={styles.header} elevation={3}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            onPress={() => setIsPopupModalVisible(true)}
            activeOpacity={0.8}
            style={styles.avatarTouch}
            disabled={uploadingPhoto}
          >
            <Image
              key={`avatar-${cacheBuster}`}
              source={{ uri: displayPhotoUrl }}
              style={styles.avatarImage}
              resizeMode="cover"
              onError={() => setAvatarLoadError(true)}
              onLoadStart={() => setAvatarLoadError(false)}
            />
            {uploadingPhoto && (
              <View style={styles.avatarLoadingOverlay}>
                <ActivityIndicator size="small" color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
          {!uploadingPhoto && (
            <TouchableOpacity
              style={styles.cameraIconBadge}
              onPress={handleUpdateProfilePhoto}
              activeOpacity={0.7}
            >
              <Icon source="camera" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.userInfoBlock}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{userEmail}</Text>
          {profileData?.phone ? (
            <Text style={styles.phoneText}>📞 {profileData.phone}</Text>
          ) : null}
          {profileData?.location ? (
            <Text style={styles.locationText}>📍 {profileData.location}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.editProfileBtn}
          onPress={() => setIsEditProfileModalOpen(true)}
          activeOpacity={0.8}
        >
          <Icon source="pencil-outline" size={14} color="#FFFFFF" />
          <Text style={styles.editProfileBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </Surface>

      {/* Main Navigation Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'overview' && styles.tabBtnActive]}
          onPress={() => setActiveTab('overview')}
        >
          <Icon
            source="account-circle-outline"
            size={18}
            color={activeTab === 'overview' ? '#1565FF' : '#64748B'}
          />
          <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
            Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'my_listings' && styles.tabBtnActive]}
          onPress={() => {
            setActiveTab('my_listings');
            setListingFilter('all');
          }}
        >
          <Icon
            source="package-variant-closed"
            size={18}
            color={activeTab === 'my_listings' ? '#1565FF' : '#64748B'}
          />
          <Text style={[styles.tabText, activeTab === 'my_listings' && styles.tabTextActive]}>
            My Ads ({myListings.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'saved' && styles.tabBtnActive]}
          onPress={() => setActiveTab('saved')}
        >
          <Icon
            source="heart"
            size={18}
            color={activeTab === 'saved' ? '#EF4444' : '#64748B'}
          />
          <Text style={[styles.tabText, activeTab === 'saved' && styles.tabTextActive]}>
            Wishlist ({savedParts.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'recent' && styles.tabBtnActive]}
          onPress={() => setActiveTab('recent')}
        >
          <Icon
            source="history"
            size={18}
            color={activeTab === 'recent' ? '#1565FF' : '#64748B'}
          />
          <Text style={[styles.tabText, activeTab === 'recent' && styles.tabTextActive]}>
            Recent
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ================================================================ */}
        {/* OVERVIEW / STRUCTURED ACCOUNT DASHBOARD */}
        {/* ================================================================ */}
        {activeTab === 'overview' && (
          <View style={styles.overviewSection}>
            
            {/* 🛡️ ADMIN ACCESS PANEL (Visible to Admin Account) */}
            {isAdmin && (
              <View style={styles.adminCardContainer}>
                <Surface style={styles.adminCard} elevation={2}>
                  <View style={styles.adminCardHeader}>
                    <View style={styles.adminBadge}>
                      <Icon source="shield-crown" size={16} color="#FFFFFF" />
                      <Text style={styles.adminBadgeText}>ADMIN PRIVILEGES</Text>
                    </View>
                    <Text style={styles.adminAccountTag}>wwwautoparts2@gmail.com</Text>
                  </View>

                  <Text style={styles.adminCardTitle}>Full System Control & Moderation Panel</Text>
                  <Text style={styles.adminCardDesc}>
                    Manage all marketplace ads, approve/reject listings, edit taxonomy categories, manage promotional banners, broadcast announcements & update app versions.
                  </Text>

                  <TouchableOpacity
                    style={styles.openAdminBtn}
                    onPress={() => navigation.navigate('Admin')}
                    activeOpacity={0.85}
                  >
                    <Icon source="view-dashboard" size={18} color="#FFFFFF" />
                    <Text style={styles.openAdminBtnText}>Open Admin Panel</Text>
                    <Icon source="arrow-right" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </Surface>
              </View>
            )}

            {/* 📦 SECTION 1: MY ACTIVITY */}
            <List.Section style={styles.menuSection}>
              <List.Subheader style={styles.sectionHeader}>📦 MY ACTIVITY</List.Subheader>
              
              {/* My Listings */}
              <List.Item
                title="My Listings"
                description={`Total ${myListings.length} spare parts posted`}
                left={(props) => <List.Icon {...props} icon="format-list-bulleted" color="#1565FF" />}
                right={(props) => (
                  <View style={styles.itemRightRow}>
                    <Badge style={styles.countBadge}>{myListings.length}</Badge>
                    <List.Icon {...props} icon="chevron-right" />
                  </View>
                )}
                onPress={() => {
                  setListingFilter('all');
                  setActiveTab('my_listings');
                }}
                style={styles.listItem}
              />

              {/* Active Ads */}
              <List.Item
                title="Active Ads"
                description="Parts currently live and visible to buyers"
                left={(props) => <List.Icon {...props} icon="check-decagram" color="#10B981" />}
                right={(props) => (
                  <View style={styles.itemRightRow}>
                    <Badge style={[styles.countBadge, { backgroundColor: '#10B981' }]}>{activeAdsCount}</Badge>
                    <List.Icon {...props} icon="chevron-right" />
                  </View>
                )}
                onPress={() => {
                  setListingFilter('active');
                  setActiveTab('my_listings');
                }}
                style={styles.listItem}
              />

              {/* Sold Parts / Sold Ads */}
              <List.Item
                title="Sold Parts / Ads"
                description="List of parts successfully sold out"
                left={(props) => <List.Icon {...props} icon="tag-check" color="#F59E0B" />}
                right={(props) => (
                  <View style={styles.itemRightRow}>
                    <Badge style={[styles.countBadge, { backgroundColor: '#F59E0B' }]}>{soldAdsCount}</Badge>
                    <List.Icon {...props} icon="chevron-right" />
                  </View>
                )}
                onPress={() => {
                  setListingFilter('sold');
                  setActiveTab('my_listings');
                }}
                style={styles.listItem}
              />

              {/* Saved / Wishlist ❤️ */}
              <List.Item
                title="Saved / Wishlist ❤️"
                description="Bookmarked parts you liked"
                left={(props) => <List.Icon {...props} icon="heart" color="#EF4444" />}
                right={(props) => (
                  <View style={styles.itemRightRow}>
                    <Badge style={[styles.countBadge, { backgroundColor: '#EF4444' }]}>{savedParts.length}</Badge>
                    <List.Icon {...props} icon="chevron-right" />
                  </View>
                )}
                onPress={() => setActiveTab('saved')}
                style={styles.listItem}
              />

              {/* Recently Viewed */}
              <List.Item
                title="Recently Viewed"
                description="Auto parts browsed in your previous sessions"
                left={(props) => <List.Icon {...props} icon="clock-outline" color="#8B5CF6" />}
                right={(props) => (
                  <View style={styles.itemRightRow}>
                    <Badge style={[styles.countBadge, { backgroundColor: '#8B5CF6' }]}>{recentlyViewed.length}</Badge>
                    <List.Icon {...props} icon="chevron-right" />
                  </View>
                )}
                onPress={() => setActiveTab('recent')}
                style={styles.listItem}
              />

              {/* My Chats */}
              <List.Item
                title="My Chats"
                description="Conversations with buyers and sellers"
                left={(props) => <List.Icon {...props} icon="chat-processing-outline" color="#0EA5E9" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => navigation.navigate('ChatsTab')}
                style={styles.listItem}
              />

              {/* My Enquiry */}
              <List.Item
                title="My Enquiry"
                description="Direct price and part availability inquiries"
                left={(props) => <List.Icon {...props} icon="message-question-outline" color="#6366F1" />}
                right={(props) => (
                  <View style={styles.itemRightRow}>
                    {myEnquiries.length > 0 && (
                      <Badge style={[styles.countBadge, { backgroundColor: '#6366F1' }]}>{myEnquiries.length}</Badge>
                    )}
                    <List.Icon {...props} icon="chevron-right" />
                  </View>
                )}
                onPress={() => navigation.navigate('ChatsTab')}
                style={styles.listItem}
              />

              {/* Manage My Ads */}
              <List.Item
                title="Manage My Ads"
                description="Edit prices, descriptions, images or delete ads"
                left={(props) => <List.Icon {...props} icon="tune-vertical" color="#0F172A" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {
                  if (navigation?.navigate) {
                    navigation.navigate('MyAdsTab');
                  } else {
                    setListingFilter('all');
                    setActiveTab('my_listings');
                  }
                }}
                style={styles.listItem}
              />
            </List.Section>

            <Divider style={styles.sectionDivider} />

            {/* ⚙️ SECTION 2: SETTINGS */}
            <List.Section style={styles.menuSection}>
              <List.Subheader style={styles.sectionHeader}>⚙️ SETTINGS</List.Subheader>

              {/* Notifications */}
              <List.Item
                title="Notifications"
                description="Marketplace announcements, offers & alerts"
                left={(props) => <List.Icon {...props} icon="bell-outline" color="#1565FF" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => navigation.navigate('Notifications')}
                style={styles.listItem}
              />

              {/* Language — English / हिंदी / தமிழ் */}
              <List.Item
                title="Language — English / தமிழ் / हिंदी"
                description={`Selected: ${language === 'en' ? 'English (ஆங்கிலம்)' : language === 'ta' ? 'தமிழ் (Tamil)' : 'हिंदी (Hindi)'}`}
                left={(props) => <List.Icon {...props} icon="translate" color="#0EA5E9" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => setShowLanguageModal(true)}
                style={styles.listItem}
              />

              {/* Privacy & Security */}
              <List.Item
                title="Privacy & Security"
                description="Account protection, data storage & security"
                left={(props) => <List.Icon {...props} icon="shield-lock-outline" color="#10B981" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => setSecurityModalVisible(true)}
                style={styles.listItem}
              />
            </List.Section>

            <Divider style={styles.sectionDivider} />

            {/* 🆘 SECTION 3: HELP & SUPPORT */}
            <List.Section style={styles.menuSection}>
              <List.Subheader style={styles.sectionHeader}>🆘 HELP & SUPPORT</List.Subheader>

              {/* Help Center */}
              <List.Item
                title="Help Center"
                description="FAQs, buying & selling guidelines"
                left={(props) => <List.Icon {...props} icon="help-circle-outline" color="#0284C7" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => setHelpCenterVisible(true)}
                style={styles.listItem}
              />

              {/* Report a Problem */}
              <List.Item
                title="Report a Problem"
                description="Submit issue, spam ad, or technical bug"
                left={(props) => <List.Icon {...props} icon="alert-octagon-outline" color="#F43F5E" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => setReportModalVisible(true)}
                style={styles.listItem}
              />

              {/* Contact Support */}
              <List.Item
                title="Contact Support"
                description={`Official Email: ${SUPPORT_EMAIL}`}
                left={(props) => <List.Icon {...props} icon="email-outline" color="#1565FF" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={handleContactSupport}
                style={styles.listItem}
              />

              {/* Terms & Conditions */}
              <List.Item
                title="Terms & Conditions"
                description="Marketplace usage rules & policies"
                left={(props) => <List.Icon {...props} icon="file-document-outline" color="#64748B" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => setTermsModalVisible(true)}
                style={styles.listItem}
              />

              {/* Privacy Policy */}
              <List.Item
                title="Privacy Policy"
                description="User privacy & personal information safety"
                left={(props) => <List.Icon {...props} icon="shield-account-outline" color="#64748B" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => setPrivacyModalVisible(true)}
                style={styles.listItem}
              />
            </List.Section>

            {/* ✅ SECTION 4: LOGOUT BUTTON */}
            <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut} activeOpacity={0.85}>
              <Icon source="logout" size={20} color="#EF4444" />
              <Text style={styles.logoutBtnText}>Logout Account</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>
              Auto Parts India App v2.4.0 • Built with Firebase Realtime Sync
            </Text>
          </View>
        )}

        {/* ================================================================ */}
        {/* MY LISTINGS / ADS TAB WITH ACTIVE & SOLD FILTERS */}
        {/* ================================================================ */}
        {activeTab === 'my_listings' && (
          <View style={styles.listingsSection}>
            <View style={styles.listingsHeaderRow}>
              <View>
                <Text style={styles.listingsTitle}>My Spare Part Ads</Text>
                <Text style={styles.listingsSubtitle}>
                  {filteredListings.length} listings ({activeAdsCount} active, {soldAdsCount} sold)
                </Text>
              </View>
              <TouchableOpacity
                style={styles.newListingBtn}
                onPress={() => navigation.navigate('SellTab')}
              >
                <Icon source="plus" size={16} color="#FFFFFF" />
                <Text style={styles.newListingBtnText}>Post Ad</Text>
              </TouchableOpacity>
            </View>

            {/* Filter pills */}
            <View style={styles.filterPillsRow}>
              <TouchableOpacity
                style={[styles.filterPill, listingFilter === 'all' && styles.filterPillActive]}
                onPress={() => setListingFilter('all')}
              >
                <Text style={[styles.filterPillText, listingFilter === 'all' && styles.filterPillTextActive]}>
                  All ({myListings.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filterPill, listingFilter === 'active' && styles.filterPillActive]}
                onPress={() => setListingFilter('active')}
              >
                <Text style={[styles.filterPillText, listingFilter === 'active' && styles.filterPillTextActive]}>
                  Active ({activeAdsCount})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filterPill, listingFilter === 'sold' && styles.filterPillActive]}
                onPress={() => setListingFilter('sold')}
              >
                <Text style={[styles.filterPillText, listingFilter === 'sold' && styles.filterPillTextActive]}>
                  Sold ({soldAdsCount})
                </Text>
              </TouchableOpacity>
            </View>

            {filteredListings.length === 0 ? (
              <View style={styles.emptyAds}>
                <Icon source="car-wrench" size={48} color="#94A3B8" />
                <Text style={styles.emptyAdsTitle}>
                  {listingFilter === 'sold' ? 'No Sold Ads' : 'No Listings Found'}
                </Text>
                <Text style={styles.emptyAdsSub}>
                  {listingFilter === 'sold'
                    ? 'When you mark your listings as Sold, they will show here.'
                    : 'List your car spare parts and connect with genuine buyers.'}
                </Text>
                <Button
                  mode="contained"
                  buttonColor="#1565FF"
                  style={{ marginTop: 14 }}
                  onPress={() => navigation.navigate('SellTab')}
                >
                  Post Spare Part Now
                </Button>
              </View>
            ) : (
              filteredListings.map((part) => (
                <Surface key={part.id} style={styles.listingCard} elevation={2}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('ProductDetail', { part })}
                    style={styles.listingCardRow}
                  >
                    <Image
                      source={{
                        uri:
                          part.imageUrl ||
                          part.images?.[0] ||
                          part.imageUrls?.[0] ||
                          'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=200',
                      }}
                      style={styles.listingImg}
                      resizeMode="cover"
                    />
                    <View style={styles.listingDetails}>
                      <View style={styles.listingPriceRow}>
                        <Text style={styles.listingPrice}>₹{(part.price || 0).toLocaleString('en-IN')}</Text>
                        {part.sold ? (
                          <View style={styles.soldBadge}>
                            <Text style={styles.soldBadgeText}>SOLD</Text>
                          </View>
                        ) : (
                          <View style={styles.activeBadge}>
                            <Text style={styles.activeBadgeText}>ACTIVE</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.listingName} numberOfLines={2}>
                        {part.title}
                      </Text>
                      <Text style={styles.listingBrand}>
                        {part.carBrand} {part.carModel} • {part.location || 'India'}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Actions Bar */}
                  <View style={styles.listingActionsRow}>
                    <TouchableOpacity
                      style={styles.actionPill}
                      onPress={() => {
                        setSelectedEditPart(part);
                        setEditModalVisible(true);
                      }}
                    >
                      <Icon source="pencil" size={14} color="#1565FF" />
                      <Text style={styles.actionPillTextBlue}>Edit Ad</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.actionPill}
                      onPress={() => handleToggleSold(part)}
                    >
                      <Icon
                        source={part.sold ? 'check-circle' : 'tag-outline'}
                        size={14}
                        color={part.sold ? '#10B981' : '#F59E0B'}
                      />
                      <Text
                        style={[
                          styles.actionPillTextGreen,
                          !part.sold && { color: '#D97706' },
                        ]}
                      >
                        {part.sold ? 'Mark Available' : 'Mark Sold'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.actionPill}
                      onPress={() => handleDeleteListing(part.id)}
                    >
                      <Icon source="trash-can-outline" size={14} color="#EF4444" />
                      <Text style={styles.actionPillTextRed}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </Surface>
              ))
            )}
          </View>
        )}

        {/* ================================================================ */}
        {/* SAVED / WISHLIST TAB */}
        {/* ================================================================ */}
        {activeTab === 'saved' && (
          <View style={styles.listingsSection}>
            <View style={styles.listingsHeaderRow}>
              <View>
                <Text style={styles.listingsTitle}>Saved Items / Wishlist ❤️</Text>
                <Text style={styles.listingsSubtitle}>{savedParts.length} parts saved</Text>
              </View>
            </View>

            {savedParts.length === 0 ? (
              <View style={styles.emptyAds}>
                <Icon source="heart-broken-outline" size={48} color="#94A3B8" />
                <Text style={styles.emptyAdsTitle}>No Saved Items</Text>
                <Text style={styles.emptyAdsSub}>
                  Tap the heart ❤️ button on any spare part to save it here for quick access later.
                </Text>
                <Button
                  mode="contained"
                  buttonColor="#1565FF"
                  style={{ marginTop: 14 }}
                  onPress={() => navigation.navigate('HomeTab')}
                >
                  Explore Spare Parts
                </Button>
              </View>
            ) : (
              savedParts.map((part) => (
                <TouchableOpacity
                  key={part.id}
                  style={styles.savedCard}
                  activeOpacity={0.88}
                  onPress={() => navigation.navigate('ProductDetail', { part })}
                >
                  <Image
                    source={{
                      uri:
                        part.imageUrl ||
                        part.images?.[0] ||
                        part.imageUrls?.[0] ||
                        'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=200',
                    }}
                    style={styles.savedImg}
                    resizeMode="cover"
                  />
                  <View style={styles.savedDetails}>
                    <Text style={styles.savedPrice}>₹{(part.price || 0).toLocaleString('en-IN')}</Text>
                    <Text style={styles.savedTitle} numberOfLines={2}>
                      {part.title}
                    </Text>
                    <Text style={styles.savedBrand}>
                      {part.carBrand} {part.carModel} • {part.location || 'India'}
                    </Text>
                  </View>
                  <Icon source="chevron-right" size={20} color="#94A3B8" />
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {/* ================================================================ */}
        {/* RECENTLY VIEWED TAB */}
        {/* ================================================================ */}
        {activeTab === 'recent' && (
          <View style={styles.listingsSection}>
            <View style={styles.listingsHeaderRow}>
              <View>
                <Text style={styles.listingsTitle}>Recently Viewed</Text>
                <Text style={styles.listingsSubtitle}>{recentlyViewed.length} parts browsed</Text>
              </View>
              {recentlyViewed.length > 0 && (
                <TouchableOpacity
                  onPress={async () => {
                    await clearRecentlyViewedParts();
                    setRecentlyViewed([]);
                  }}
                >
                  <Text style={styles.clearBtnText}>Clear History</Text>
                </TouchableOpacity>
              )}
            </View>

            {recentlyViewed.length === 0 ? (
              <View style={styles.emptyAds}>
                <Icon source="history" size={48} color="#94A3B8" />
                <Text style={styles.emptyAdsTitle}>No Browsing History</Text>
                <Text style={styles.emptyAdsSub}>
                  Parts you view will appear here so you can easily find them again.
                </Text>
                <Button
                  mode="contained"
                  buttonColor="#1565FF"
                  style={{ marginTop: 14 }}
                  onPress={() => navigation.navigate('HomeTab')}
                >
                  Browse Market
                </Button>
              </View>
            ) : (
              recentlyViewed.map((part) => (
                <TouchableOpacity
                  key={part.id}
                  style={styles.savedCard}
                  activeOpacity={0.88}
                  onPress={() => navigation.navigate('ProductDetail', { part })}
                >
                  <Image
                    source={{
                      uri:
                        part.imageUrl ||
                        'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=200',
                    }}
                    style={styles.savedImg}
                    resizeMode="cover"
                  />
                  <View style={styles.savedDetails}>
                    <Text style={styles.savedPrice}>₹{(part.price || 0).toLocaleString('en-IN')}</Text>
                    <Text style={styles.savedTitle} numberOfLines={2}>
                      {part.title}
                    </Text>
                    <Text style={styles.savedBrand}>
                      {part.carBrand} {part.carModel} • {part.location || 'India'}
                    </Text>
                  </View>
                  <Icon source="chevron-right" size={20} color="#94A3B8" />
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* Profile Photo Popup Modal */}
      <UserProfilePopupModal
        visible={isPopupModalVisible}
        onDismiss={() => setIsPopupModalVisible(false)}
        userPhoto={displayPhotoUrl}
      />

      {/* Edit Profile Details Modal */}
      <Modal
        visible={isEditProfileModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsEditProfileModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalSheetTitle}>Edit Profile Information</Text>
              <TouchableOpacity onPress={() => setIsEditProfileModalOpen(false)}>
                <Icon source="close" size={22} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Full Name / Business Name</Text>
            <TextInput
              style={styles.textInput}
              value={editName}
              onChangeText={setEditName}
              placeholder="e.g. Rahul Sharma"
              placeholderTextColor="#94A3B8"
            />

            <Text style={styles.inputLabel}>Contact Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={editPhone}
              onChangeText={setEditPhone}
              placeholder="e.g. +91 98765 43210"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
            />

            <Text style={styles.inputLabel}>Location / City / State</Text>
            <TextInput
              style={styles.textInput}
              value={editLocation}
              onChangeText={setEditLocation}
              placeholder="e.g. Chennai, Tamil Nadu"
              placeholderTextColor="#94A3B8"
            />

            <TouchableOpacity
              style={[styles.saveModalBtn, savingProfile && styles.saveModalBtnDisabled]}
              onPress={handleSaveProfileDetails}
              disabled={savingProfile}
            >
              {savingProfile ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.saveModalBtnText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Report a Problem Modal */}
      <Modal
        visible={reportModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setReportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalSheetTitle}>Report a Problem</Text>
              <TouchableOpacity onPress={() => setReportModalVisible(false)}>
                <Icon source="close" size={22} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Issue Type</Text>
            <View style={styles.issueTypeRow}>
              {['Listing Issue', 'Payment/Chat', 'Spam/Fraud', 'App Bug'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.issueTypePill,
                    reportIssueType === type && styles.issueTypePillActive,
                  ]}
                  onPress={() => setReportIssueType(type)}
                >
                  <Text
                    style={[
                      styles.issueTypePillText,
                      reportIssueType === type && styles.issueTypePillTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Description of Problem</Text>
            <TextInput
              style={[styles.textInput, { height: 90, textAlignVertical: 'top' }]}
              value={reportDescription}
              onChangeText={setReportDescription}
              placeholder="Please explain the issue in detail so we can resolve it quickly..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={[styles.saveModalBtn, submittingReport && styles.saveModalBtnDisabled]}
              onPress={handleSubmitReport}
              disabled={submittingReport}
            >
              {submittingReport ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.saveModalBtnText}>Submit Report</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Help Center Modal */}
      <Modal
        visible={helpCenterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setHelpCenterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { maxHeight: '80%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalSheetTitle}>Help Center & FAQs</Text>
              <TouchableOpacity onPress={() => setHelpCenterVisible(false)}>
                <Icon source="close" size={22} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.faqCard}>
                <Text style={styles.faqQ}>1. How do I sell car spare parts?</Text>
                <Text style={styles.faqA}>
                  Tap the '+' Sell button in the bottom navigation bar. Add photos, select vehicle brand, model, price, and publish your ad instantly.
                </Text>
              </View>

              <View style={styles.faqCard}>
                <Text style={styles.faqQ}>2. How do I contact a seller?</Text>
                <Text style={styles.faqA}>
                  Open any spare part listing and use the 'Chat with Seller' or 'Call Seller' buttons to communicate directly in real time.
                </Text>
              </View>

              <View style={styles.faqCard}>
                <Text style={styles.faqQ}>3. How do I mark a part as Sold?</Text>
                <Text style={styles.faqA}>
                  Go to Account → My Listings, tap 'Mark Sold' under your listing to inform buyers that the item is no longer available.
                </Text>
              </View>

              <View style={styles.faqCard}>
                <Text style={styles.faqQ}>4. Need emergency support?</Text>
                <Text style={styles.faqA}>
                  Email us 24/7 at {SUPPORT_EMAIL} for account assistance and listing reviews.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Terms & Conditions Modal */}
      <Modal
        visible={termsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setTermsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { maxHeight: '80%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalSheetTitle}>Terms & Conditions</Text>
              <TouchableOpacity onPress={() => setTermsModalVisible(false)}>
                <Icon source="close" size={22} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.legalBody}>
                Welcome to Auto Parts India. By using this marketplace application, you agree to comply with our listing policies:
                {'\n\n'}
                1. Only authentic, legal automotive parts and vehicle accessories may be listed.
                {'\n\n'}
                2. Sellers must accurately describe part condition (Used / New) and provide genuine photos.
                {'\n\n'}
                3. Spam, fraudulent listings, and duplicate ads will be promptly removed by our moderation team.
                {'\n\n'}
                4. For queries or disputes, contact us at {SUPPORT_EMAIL}.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        visible={privacyModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { maxHeight: '80%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalSheetTitle}>Privacy Policy</Text>
              <TouchableOpacity onPress={() => setPrivacyModalVisible(false)}>
                <Icon source="close" size={22} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.legalBody}>
                Your privacy is of utmost importance to Auto Parts India:
                {'\n\n'}
                • We only collect your email, display name, and optional phone number to facilitate buyer-seller communication.
                {'\n\n'}
                • Your chats, saved items, and listings are stored securely using cloud databases.
                {'\n\n'}
                • We do not sell your personal data to third parties.
                {'\n\n'}
                • You can request account deletion or data clearance anytime by emailing {SUPPORT_EMAIL}.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Privacy & Security Settings Modal */}
      <Modal
        visible={securityModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSecurityModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { maxHeight: '80%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalSheetTitle}>Privacy & Security</Text>
              <TouchableOpacity onPress={() => setSecurityModalVisible(false)}>
                <Icon source="close" size={22} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.securityOption}>
                <Icon source="shield-check" size={24} color="#10B981" />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.securityTitle}>Encrypted Messaging</Text>
                  <Text style={styles.securityDesc}>
                    Buyer and seller communications are stored with real-time token security.
                  </Text>
                </View>
              </View>

              <View style={styles.securityOption}>
                <Icon source="account-lock" size={24} color="#1565FF" />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.securityTitle}>Google & Firebase Authentication</Text>
                  <Text style={styles.securityDesc}>
                    Your sign-in credentials are authenticated through Google OAuth & Firebase.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.dangerBtn}
                onPress={() => {
                  setSecurityModalVisible(false);
                  Alert.alert(
                    'Delete Account',
                    `To delete your account and all associated listings permanently, please send a confirmation request to ${SUPPORT_EMAIL}.`,
                    [{ text: 'OK' }]
                  );
                }}
              >
                <Icon source="trash-can-outline" size={16} color="#EF4444" />
                <Text style={styles.dangerBtnText}>Request Account Deletion</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Edit Listing Modal */}
      {selectedEditPart && (
        <EditListingModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          listing={selectedEditPart}
          onSuccess={() => {
            setEditModalVisible(false);
            Alert.alert('Success', 'Listing updated!');
          }}
        />
      )}

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        visible={showLanguageModal}
        onDismiss={() => setShowLanguageModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 20,
    backgroundColor: '#0F172A',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatarTouch: {
    position: 'relative',
    borderRadius: 44,
  },
  avatarImage: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: '#1565FF',
    backgroundColor: '#1E293B',
  },
  avatarLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 41,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1565FF',
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  userInfoBlock: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  email: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  phoneText: {
    fontSize: 11,
    color: '#CBD5E1',
    marginTop: 2,
  },
  locationText: {
    fontSize: 11,
    color: '#CBD5E1',
    marginTop: 1,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  editProfileBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: '#1565FF',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#1565FF',
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  overviewSection: {},
  
  // Admin Card
  adminCardContainer: {
    marginBottom: 16,
  },
  adminCard: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1565FF',
  },
  adminCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  adminBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  adminAccountTag: {
    color: '#94A3B8',
    fontSize: 10,
  },
  adminCardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  adminCardDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 12,
  },
  openAdminBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1565FF',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  openAdminBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // Sections & items
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  sectionDivider: {
    marginVertical: 4,
    backgroundColor: 'transparent',
  },
  listItem: {
    borderRadius: 10,
    marginVertical: 2,
    paddingHorizontal: 6,
  },
  itemRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: '#1565FF',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 10,
    marginRight: 4,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutBtnText: {
    color: '#EF4444',
    fontWeight: '800',
    fontSize: 14,
  },
  versionText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 16,
  },

  // Listings Section
  listingsSection: {},
  listingsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  listingsSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  newListingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1565FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  newListingBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  filterPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  filterPillActive: {
    backgroundColor: '#1565FF',
    borderColor: '#1565FF',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  listingCardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  listingImg: {
    width: 76,
    height: 76,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  listingDetails: {
    flex: 1,
  },
  listingPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1565FF',
  },
  soldBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  soldBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  activeBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeBadgeText: {
    color: '#15803D',
    fontSize: 9,
    fontWeight: '800',
  },
  listingName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
  listingBrand: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  listingActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionPillTextBlue: {
    color: '#1565FF',
    fontSize: 11,
    fontWeight: '700',
  },
  actionPillTextGreen: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  actionPillTextRed: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '700',
  },
  savedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  savedImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    marginRight: 10,
  },
  savedDetails: {
    flex: 1,
  },
  savedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1565FF',
  },
  savedTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  savedBrand: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  clearBtnText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyAds: {
    alignItems: 'center',
    paddingVertical: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyAdsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#334155',
    marginTop: 10,
  },
  emptyAdsSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalSheetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginTop: 10,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  saveModalBtn: {
    backgroundColor: '#1565FF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveModalBtnDisabled: {
    opacity: 0.7,
  },
  saveModalBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  issueTypeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 6,
  },
  issueTypePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  issueTypePillActive: {
    backgroundColor: '#1565FF',
    borderColor: '#1565FF',
  },
  issueTypePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  issueTypePillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  faqCard: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  faqQ: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  faqA: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  legalBody: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
    paddingBottom: 20,
  },
  securityOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  securityTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 2,
  },
  securityDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    gap: 6,
  },
  dangerBtnText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
  },
});
