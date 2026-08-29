import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
  Modal,
  TextInput as RNTextInput,
  Switch,
  Share,
  Platform,
} from 'react-native';
import { Text, SegmentedButtons, Icon, Button, TextInput, Chip, Surface, IconButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import EditListingModal from '../components/EditListingModal';
import { AdminTaxonomyCMS } from '../components/AdminTaxonomyCMS';
import { getFirebaseFirestore, getCurrentUser } from '../services/firebase';
import { uploadImageToCloudinary } from '../services/cloudinary';

export default function AdminScreen({ navigation }: any) {
  // Navigation tabs
  const [tab, setTab] = useState<'users' | 'listings' | 'banners' | 'taxonomy' | 'announcements' | 'version'>('listings');

  // Core Data States
  const [listings, setListings] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [listingFilter, setListingFilter] = useState<'all' | 'active' | 'pending' | 'featured' | 'verified' | 'sold' | 'reported' | 'trash'>('all');
  const [selectedPartIds, setSelectedPartIds] = useState<string[]>([]);

  // Listing Edit / Detail Modals
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // User Edit Modal State
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserPhone, setEditUserPhone] = useState('');
  const [editUserDistrict, setEditUserDistrict] = useState('');
  const [editUserState, setEditUserState] = useState('');
  const [savingUser, setSavingUser] = useState(false);

  // Banner Add / Edit Modal State
  const [bannerModalVisible, setBannerModalVisible] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerTag, setBannerTag] = useState('Special Offer');
  const [bannerTargetLink, setBannerTargetLink] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerOrder, setBannerOrder] = useState('0');
  const [savingBanner, setSavingBanner] = useState(false);
  const [uploadingBannerImage, setUploadingBannerImage] = useState(false);

  // Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annText, setAnnText] = useState('');
  const [annPriority, setAnnPriority] = useState('normal');
  const [sendingAnn, setSendingAnn] = useState(false);

  // Version Config State
  const [latestVersion, setLatestVersion] = useState('1.0.0');
  const [minVersion, setMinVersion] = useState('1.0.0');
  const [forceUpdate, setForceUpdate] = useState(false);
  const [apkUrl, setApkUrl] = useState('https://autopartsindia.app/download/app-latest.apk');
  const [releaseNotes, setReleaseNotes] = useState('• Performance improvements and speed enhancements\n• Real-time chat & push notifications\n• Bug fixes and UI refinements');
  const [releaseDate, setReleaseDate] = useState('2026-08-29');
  const [savingVersion, setSavingVersion] = useState(false);
  const [loadingVersion, setLoadingVersion] = useState(false);

  // Super Admin Immunity List
  const SUPER_ADMIN_EMAILS = [
    'wwwautoparts2@gmail.com',
    'ym1950394@gmail.com',
    'www.allahforgiveness877@gmail.com',
  ];

  // -------------------------------------------------------------
  // Real-time Firestore Listeners
  // -------------------------------------------------------------
  useEffect(() => {
    let unsubListings = () => {};
    let unsubBanners = () => {};
    let unsubUsers = () => {};
    let unsubAnnouncements = () => {};

    try {
      const db = getFirebaseFirestore();
      if (!db || typeof db.collection !== 'function') {
        setLoading(false);
        return;
      }

      // 1. Listen to Spare Parts Listings
      const qListings = db.collection('spareParts').orderBy('createdAt', 'desc');
      unsubListings = qListings.onSnapshot(
        (snap: any) => {
          const list: any[] = [];
          snap.forEach((d: any) => list.push({ id: d.id, ...d.data() }));
          setListings(list);
          setLoading(false);
        },
        (err: any) => {
          console.warn('[Admin] Listings snapshot error:', err);
          setLoading(false);
        }
      );

      // 2. Listen to Promotional Banners
      const qBanners = db.collection('banners').orderBy('order', 'asc');
      unsubBanners = qBanners.onSnapshot(
        (snap: any) => {
          const list: any[] = [];
          snap.forEach((d: any) => list.push({ id: d.id, ...d.data() }));
          list.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
          setBanners(list);
        },
        (err: any) => {
          console.warn('[Admin] Banners snapshot error:', err);
        }
      );

      // 3. Listen to Registered Users
      const qUsers = db.collection('users');
      unsubUsers = qUsers.onSnapshot(
        (snap: any) => {
          const list: any[] = [];
          snap.forEach((d: any) => list.push({ id: d.id, ...d.data() }));
          setUsers(list);
        },
        (err: any) => {
          console.warn('[Admin] Users snapshot error:', err);
        }
      );

      // 4. Listen to Announcements
      const qAnn = db.collection('announcements').orderBy('createdAt', 'desc');
      unsubAnnouncements = qAnn.onSnapshot(
        (snap: any) => {
          const list: any[] = [];
          snap.forEach((d: any) => list.push({ id: d.id, ...d.data() }));
          setAnnouncements(list);
        },
        (err: any) => {
          console.warn('[Admin] Announcements snapshot error:', err);
        }
      );

      // Load Version Config
      loadVersionConfig();
    } catch (e) {
      console.warn('[Admin] Listeners init error:', e);
      setLoading(false);
    }

    return () => {
      try { unsubListings(); } catch (_) {}
      try { unsubBanners(); } catch (_) {}
      try { unsubUsers(); } catch (_) {}
      try { unsubAnnouncements(); } catch (_) {}
    };
  }, []);

  const loadVersionConfig = async () => {
    try {
      setLoadingVersion(true);
      const db = getFirebaseFirestore();
      if (!db) return;
      const snap = await db.collection('app_version').doc('config').get();
      if (snap.exists) {
        const data = snap.data();
        if (data.latestVersion) setLatestVersion(data.latestVersion);
        if (data.minimumSupportedVersion) setMinVersion(data.minimumSupportedVersion);
        if (typeof data.forceUpdate === 'boolean') setForceUpdate(data.forceUpdate);
        if (data.apkDownloadUrl) setApkUrl(data.apkDownloadUrl);
        if (data.releaseNotes) setReleaseNotes(data.releaseNotes);
        if (data.releaseDate) setReleaseDate(data.releaseDate);
      }
    } catch (err) {
      console.warn('[Admin] Failed to load version config:', err);
    } finally {
      setLoadingVersion(false);
    }
  };

  // -------------------------------------------------------------
  // Listing Action Handlers
  // -------------------------------------------------------------
  const handleToggleApprove = async (item: any) => {
    try {
      const db = getFirebaseFirestore();
      if (!db) return;
      const newStatus = item.approved === false;
      await db.collection('spareParts').doc(item.id).update({
        approved: newStatus,
        verified: newStatus,
        status: newStatus ? 'approved' : 'pending',
        updatedAt: Date.now(),
      });
      Alert.alert('Status Updated', `Listing is now ${newStatus ? 'Approved' : 'Pending Approval'}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to update approval');
    }
  };

  const handleToggleFeatured = async (item: any) => {
    try {
      const db = getFirebaseFirestore();
      if (!db) return;
      const newFeatured = !item.featured;
      await db.collection('spareParts').doc(item.id).update({
        featured: newFeatured,
        updatedAt: Date.now(),
      });
      Alert.alert('Featured Status', `Listing is ${newFeatured ? 'marked as Featured ⭐' : 'removed from Featured'}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to update featured status');
    }
  };

  const handleToggleVerified = async (item: any) => {
    try {
      const db = getFirebaseFirestore();
      if (!db) return;
      const newVerified = !item.verified;
      await db.collection('spareParts').doc(item.id).update({
        verified: newVerified,
        updatedAt: Date.now(),
      });
      Alert.alert('Verification Status', `Listing is ${newVerified ? 'marked as Verified ✓' : 'unverified'}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to update verified status');
    }
  };

  const handleToggleSold = async (item: any) => {
    try {
      const db = getFirebaseFirestore();
      if (!db) return;
      const newSold = !item.sold;
      await db.collection('spareParts').doc(item.id).update({
        sold: newSold,
        updatedAt: Date.now(),
      });
      Alert.alert('Inventory Status', `Listing is marked as ${newSold ? 'SOLD' : 'AVAILABLE'}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to update sold status');
    }
  };

  const handleToggleSoftDelete = async (item: any) => {
    try {
      const db = getFirebaseFirestore();
      if (!db) return;
      const isDeleted = !item.isDeleted;
      await db.collection('spareParts').doc(item.id).update({
        isDeleted,
        updatedAt: Date.now(),
      });
      Alert.alert(isDeleted ? 'Moved to Trash' : 'Restored', isDeleted ? 'Listing moved to Trash.' : 'Listing restored to marketplace.');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to update trash status');
    }
  };

  const handleDeleteListing = (id: string, title: string) => {
    Alert.alert(
      'Permanent Deletion',
      `Are you sure you want to permanently delete "${title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const db = getFirebaseFirestore();
              if (!db) return;
              await db.collection('spareParts').doc(id).delete();
              setSelectedPartIds((prev) => prev.filter((pId) => pId !== id));
              Alert.alert('Deleted', 'Listing permanently removed from database.');
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to delete listing.');
            }
          },
        },
      ]
    );
  };

  const handleBulkDelete = () => {
    if (selectedPartIds.length === 0) return;
    Alert.alert(
      'Bulk Delete',
      `Permanently delete ${selectedPartIds.length} selected listings? This action cannot be reversed.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: `Delete (${selectedPartIds.length})`,
          style: 'destructive',
          onPress: async () => {
            try {
              const db = getFirebaseFirestore();
              if (!db) return;
              for (const id of selectedPartIds) {
                await db.collection('spareParts').doc(id).delete();
              }
              setSelectedPartIds([]);
              Alert.alert('Bulk Deleted', `${selectedPartIds.length} listings deleted.`);
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Bulk delete failed.');
            }
          },
        },
      ]
    );
  };

  // -------------------------------------------------------------
  // User Management Actions
  // -------------------------------------------------------------
  const handleToggleBlockUser = (user: any) => {
    if (SUPER_ADMIN_EMAILS.includes(user.email)) {
      Alert.alert('Protected Account', 'Super Admin accounts cannot be suspended or blocked.');
      return;
    }

    const currentlyBlocked = Boolean(user.isBlocked);
    Alert.alert(
      currentlyBlocked ? 'Unblock User' : 'Suspend / Block User',
      `Are you sure you want to ${currentlyBlocked ? 'unblock' : 'suspend'} ${user.name || user.email}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: currentlyBlocked ? 'Unblock' : 'Suspend',
          style: currentlyBlocked ? 'default' : 'destructive',
          onPress: async () => {
            try {
              const db = getFirebaseFirestore();
              if (!db) return;
              await db.collection('users').doc(user.id).update({
                isBlocked: !currentlyBlocked,
                updatedAt: Date.now(),
              });
              Alert.alert('User Updated', `User account ${currentlyBlocked ? 'unblocked' : 'suspended'}.`);
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to update user block status.');
            }
          },
        },
      ]
    );
  };

  const handleDeleteUser = (user: any) => {
    if (SUPER_ADMIN_EMAILS.includes(user.email)) {
      Alert.alert('Protected Account', 'Super Admin accounts cannot be deleted.');
      return;
    }

    Alert.alert(
      'Delete User Account',
      `Are you sure you want to permanently delete ${user.name || user.email}? All account data will be wiped.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Permanently',
          style: 'destructive',
          onPress: async () => {
            try {
              const db = getFirebaseFirestore();
              if (!db) return;
              await db.collection('users').doc(user.id).delete();
              Alert.alert('Deleted', 'User account permanently deleted.');
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to delete user account.');
            }
          },
        },
      ]
    );
  };

  const handleOpenEditUser = (user: any) => {
    setEditingUser(user);
    setEditUserName(user.name || user.displayName || '');
    setEditUserPhone(user.phone || '');
    setEditUserDistrict(user.district || '');
    setEditUserState(user.state || '');
  };

  const handleSaveUserEdit = async () => {
    if (!editingUser) return;
    setSavingUser(true);
    try {
      const db = getFirebaseFirestore();
      if (!db) return;
      await db.collection('users').doc(editingUser.id).update({
        name: editUserName.trim(),
        displayName: editUserName.trim(),
        phone: editUserPhone.trim(),
        district: editUserDistrict.trim(),
        state: editUserState.trim(),
        updatedAt: Date.now(),
      });
      Alert.alert('Success', 'User profile updated successfully!');
      setEditingUser(null);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to update user profile.');
    } finally {
      setSavingUser(false);
    }
  };

  // -------------------------------------------------------------
  // Promotional Banner Actions
  // -------------------------------------------------------------
  const handleOpenAddBanner = () => {
    setEditingBanner(null);
    setBannerTitle('');
    setBannerSubtitle('');
    setBannerTag('Special Offer');
    setBannerTargetLink('');
    setBannerImageUrl('');
    setBannerActive(true);
    setBannerOrder(String(banners.length));
    setBannerModalVisible(true);
  };

  const handleOpenEditBanner = (banner: any) => {
    setEditingBanner(banner);
    setBannerTitle(banner.title || '');
    setBannerSubtitle(banner.subtitle || '');
    setBannerTag(banner.tag || 'Special Offer');
    setBannerTargetLink(banner.targetLink || '');
    setBannerImageUrl(banner.imageUrl || '');
    setBannerActive(banner.active !== false);
    setBannerOrder(String(typeof banner.order === 'number' ? banner.order : 0));
    setBannerModalVisible(true);
  };

  const handlePickBannerImage = async () => {
    try {
      const res = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
      if (res.assets && res.assets[0]?.uri) {
        setUploadingBannerImage(true);
        const uploadedUrl = await uploadImageToCloudinary(res.assets[0].uri, 'banners');
        setBannerImageUrl(uploadedUrl);
      }
    } catch (err) {
      console.warn('[Admin] Banner image pick error:', err);
    } finally {
      setUploadingBannerImage(false);
    }
  };

  const handleSaveBanner = async () => {
    if (!bannerTitle.trim()) {
      Alert.alert('Validation', 'Please enter a banner title.');
      return;
    }
    if (!bannerImageUrl.trim()) {
      Alert.alert('Validation', 'Please select or upload a banner image.');
      return;
    }

    setSavingBanner(true);
    try {
      const db = getFirebaseFirestore();
      if (!db) return;

      const payload = {
        title: bannerTitle.trim(),
        subtitle: bannerSubtitle.trim(),
        tag: bannerTag.trim(),
        targetLink: bannerTargetLink.trim(),
        imageUrl: bannerImageUrl.trim(),
        active: bannerActive,
        activeStatus: bannerActive,
        order: parseInt(bannerOrder, 10) || 0,
        updatedAt: Date.now(),
      };

      if (editingBanner) {
        await db.collection('banners').doc(editingBanner.id).update(payload);
        Alert.alert('Success', 'Banner updated successfully!');
      } else {
        await db.collection('banners').add({
          ...payload,
          createdAt: Date.now(),
        });
        Alert.alert('Success', 'New banner created successfully!');
      }
      setBannerModalVisible(false);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to save banner.');
    } finally {
      setSavingBanner(false);
    }
  };

  const handleToggleBannerActive = async (banner: any) => {
    try {
      const db = getFirebaseFirestore();
      if (!db) return;
      const newActive = banner.active === false;
      await db.collection('banners').doc(banner.id).update({
        active: newActive,
        activeStatus: newActive,
        updatedAt: Date.now(),
      });
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to toggle banner status.');
    }
  };

  const handleMoveBannerOrder = async (banner: any, direction: 'up' | 'down') => {
    const idx = banners.findIndex((b) => b.id === banner.id);
    if (idx === -1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= banners.length) return;

    try {
      const db = getFirebaseFirestore();
      if (!db) return;
      const currentOrder = banners[idx].order || idx;
      const targetOrder = banners[targetIdx].order || targetIdx;

      await db.collection('banners').doc(banners[idx].id).update({ order: targetOrder });
      await db.collection('banners').doc(banners[targetIdx].id).update({ order: currentOrder });
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to reorder banners.');
    }
  };

  const handleDeleteBanner = (banner: any) => {
    Alert.alert('Delete Banner', `Permanently delete "${banner.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const db = getFirebaseFirestore();
            if (!db) return;
            await db.collection('banners').doc(banner.id).delete();
            Alert.alert('Deleted', 'Banner deleted successfully.');
          } catch (err: any) {
            Alert.alert('Error', err.message || 'Failed to delete banner.');
          }
        },
      },
    ]);
  };

  // -------------------------------------------------------------
  // Announcements Broadcast Actions
  // -------------------------------------------------------------
  const handleSendAnnouncement = async () => {
    if (!annTitle.trim() || !annText.trim()) {
      Alert.alert('Validation', 'Please provide both Title and Announcement Message.');
      return;
    }

    setSendingAnn(true);
    try {
      const db = getFirebaseFirestore();
      if (!db) return;

      const annDoc = {
        title: annTitle.trim(),
        text: annText.trim(),
        message: annText.trim(),
        priority: annPriority,
        createdAt: Date.now(),
        author: 'Super Admin',
      };

      // Add to announcements collection
      await db.collection('announcements').add(annDoc);

      // Broadcast to in-app notifications
      await db.collection('notifications').add({
        title: `📢 ${annTitle.trim()}`,
        message: annText.trim(),
        type: 'broadcast',
        isBroadcast: true,
        createdAt: Date.now(),
        read: false,
      });

      setAnnTitle('');
      setAnnText('');
      Alert.alert('Broadcast Sent', 'Announcement broadcast successfully to all marketplace users!');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to send announcement.');
    } finally {
      setSendingAnn(false);
    }
  };

  const handleDeleteAnnouncement = (ann: any) => {
    Alert.alert('Delete Announcement', `Delete announcement "${ann.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const db = getFirebaseFirestore();
            if (!db) return;
            await db.collection('announcements').doc(ann.id).delete();
            Alert.alert('Deleted', 'Announcement deleted.');
          } catch (err: any) {
            Alert.alert('Error', err.message || 'Failed to delete announcement.');
          }
        },
      },
    ]);
  };

  // -------------------------------------------------------------
  // App Version & OTA Update Actions
  // -------------------------------------------------------------
  const handleSaveVersionConfig = async () => {
    if (!latestVersion.trim() || !minVersion.trim()) {
      Alert.alert('Validation', 'Latest Version and Minimum Supported Version are required.');
      return;
    }
    if (!apkUrl.trim() || (!apkUrl.startsWith('http://') && !apkUrl.startsWith('https://'))) {
      Alert.alert('Validation', 'Please provide a valid HTTP or HTTPS APK download URL.');
      return;
    }

    setSavingVersion(true);
    try {
      const db = getFirebaseFirestore();
      if (!db) return;

      const payload = {
        latestVersion: latestVersion.trim(),
        minimumSupportedVersion: minVersion.trim(),
        forceUpdate,
        apkDownloadUrl: apkUrl.trim(),
        playStoreUrl: apkUrl.trim(),
        releaseNotes: releaseNotes.trim(),
        releaseDate: releaseDate.trim(),
        updatedAt: Date.now(),
        updatedBy: getCurrentUser()?.email || 'admin@autoparts.com',
      };

      await db.collection('app_version').doc('config').set(payload);
      Alert.alert('Success', 'App update configuration saved to Cloud Firestore! All devices will now be prompted.');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to save version configuration.');
    } finally {
      setSavingVersion(false);
    }
  };

  // -------------------------------------------------------------
  // Filtered Listings & Users
  // -------------------------------------------------------------
  const listingCounts = useMemo(() => {
    return {
      all: listings.filter((p) => !p.isDeleted).length,
      active: listings.filter((p) => !p.isDeleted && !p.sold && p.approved !== false).length,
      pending: listings.filter((p) => !p.isDeleted && (p.approved === false || p.status === 'pending')).length,
      featured: listings.filter((p) => !p.isDeleted && p.featured).length,
      verified: listings.filter((p) => !p.isDeleted && p.verified).length,
      sold: listings.filter((p) => !p.isDeleted && p.sold).length,
      reported: listings.filter((p) => !p.isDeleted && p.reported).length,
      trash: listings.filter((p) => p.isDeleted).length,
    };
  }, [listings]);

  const filteredListings = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return listings.filter((p) => {
      // 1. Status Filter
      if (listingFilter === 'all' && p.isDeleted) return false;
      if (listingFilter === 'active' && (p.isDeleted || p.sold || p.approved === false)) return false;
      if (listingFilter === 'sold' && (p.isDeleted || !p.sold)) return false;
      if (listingFilter === 'pending' && (p.isDeleted || (p.approved !== false && p.status !== 'pending'))) return false;
      if (listingFilter === 'featured' && (p.isDeleted || !p.featured)) return false;
      if (listingFilter === 'verified' && (p.isDeleted || !p.verified)) return false;
      if (listingFilter === 'reported' && (p.isDeleted || !p.reported)) return false;
      if (listingFilter === 'trash' && !p.isDeleted) return false;

      // 2. Search Query
      if (!query) return true;
      return (
        (p.title || '').toLowerCase().includes(query) ||
        (p.carBrand || '').toLowerCase().includes(query) ||
        (p.carModel || '').toLowerCase().includes(query) ||
        (p.category || '').toLowerCase().includes(query) ||
        (p.contactName || '').toLowerCase().includes(query) ||
        (p.sellerEmail || '').toLowerCase().includes(query) ||
        (p.location || '').toLowerCase().includes(query) ||
        (p.district || '').toLowerCase().includes(query) ||
        (p.state || '').toLowerCase().includes(query) ||
        (p.id || '').toLowerCase().includes(query)
      );
    });
  }, [listings, listingFilter, searchTerm]);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return users.filter((u) => {
      if (!query) return true;
      return (
        (u.name || '').toLowerCase().includes(query) ||
        (u.displayName || '').toLowerCase().includes(query) ||
        (u.email || '').toLowerCase().includes(query) ||
        (u.phone || '').includes(query) ||
        (u.district || '').toLowerCase().includes(query) ||
        (u.state || '').toLowerCase().includes(query)
      );
    });
  }, [users, searchTerm]);

  const isAllSelected = useMemo(() => {
    if (filteredListings.length === 0) return false;
    return filteredListings.every((p) => selectedPartIds.includes(p.id));
  }, [filteredListings, selectedPartIds]);

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedPartIds([]);
    } else {
      setSelectedPartIds(filteredListings.map((p) => p.id));
    }
  };

  const toggleSelectPart = (id: string) => {
    setSelectedPartIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // -------------------------------------------------------------
  // Render Listing Card Item
  // -------------------------------------------------------------
  const renderListingCard = ({ item }: { item: any }) => {
    const isSelected = selectedPartIds.includes(item.id);
    const imgUri =
      (item.imageUrls && item.imageUrls[0]) ||
      item.imageUrl ||
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=300';

    return (
      <Surface
        style={[
          styles.listingCard,
          isSelected && { borderColor: '#1565FF', backgroundColor: '#F0F7FF' },
          item.isDeleted && { opacity: 0.75, backgroundColor: '#FFF1F2' },
        ]}
        elevation={1}
      >
        {/* Top Header: Checkbox + Thumbnail + Info */}
        <View style={styles.cardTopRow}>
          <TouchableOpacity
            style={styles.checkboxTouch}
            onPress={() => toggleSelectPart(item.id)}
          >
            <Icon
              source={isSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={22}
              color={isSelected ? '#1565FF' : '#94A3B8'}
            />
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <Image source={{ uri: imgUri }} style={styles.listingImage} />
            {item.sold && (
              <View style={styles.soldOverlay}>
                <Text style={styles.soldOverlayText}>SOLD</Text>
              </View>
            )}
          </View>

          <View style={styles.listingInfo}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.listingTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.priceTag}>
                ₹{Number(item.price || 0).toLocaleString('en-IN')}
              </Text>
            </View>

            <Text style={styles.listingMeta} numberOfLines={1}>
              {item.carBrand} {item.carModel} • {item.category}
            </Text>

            <Text style={styles.listingSeller} numberOfLines={1}>
              Seller: {item.contactName || item.sellerEmail || 'Unknown'}
              {item.contactPhone ? ` • 📞 ${item.contactPhone}` : ''}
            </Text>

            <Text style={styles.listingLoc} numberOfLines={1}>
              📍 {[item.district, item.state || item.location].filter(Boolean).join(', ') || 'India'}
            </Text>

            {/* Badges Row */}
            <View style={styles.badgesRow}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: item.approved !== false ? '#DCFCE7' : '#FEF3C7' },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: item.approved !== false ? '#15803D' : '#B45309' },
                  ]}
                >
                  {item.approved !== false ? 'Approved' : 'Pending'}
                </Text>
              </View>

              {item.featured && (
                <View style={[styles.statusBadge, { backgroundColor: '#FEF9C3' }]}>
                  <Text style={[styles.statusText, { color: '#A16207' }]}>Featured ⭐</Text>
                </View>
              )}

              {item.verified && (
                <View style={[styles.statusBadge, { backgroundColor: '#E0F2FE' }]}>
                  <Text style={[styles.statusText, { color: '#0369A1' }]}>Verified ✓</Text>
                </View>
              )}

              {item.sold && (
                <View style={[styles.statusBadge, { backgroundColor: '#FEE2E2' }]}>
                  <Text style={[styles.statusText, { color: '#B91C1C' }]}>Sold</Text>
                </View>
              )}

              {item.isDeleted && (
                <View style={[styles.statusBadge, { backgroundColor: '#F3F4F6' }]}>
                  <Text style={[styles.statusText, { color: '#6B7280' }]}>Trash</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionsBar}>
          {/* Approve / Reject Toggle */}
          <TouchableOpacity
            style={[
              styles.actionBtn,
              { backgroundColor: item.approved !== false ? '#FEF3C7' : '#DCFCE7' },
            ]}
            onPress={() => handleToggleApprove(item)}
          >
            <Icon
              source={item.approved !== false ? 'close-circle-outline' : 'check-circle-outline'}
              size={14}
              color={item.approved !== false ? '#B45309' : '#15803D'}
            />
            <Text
              style={[
                styles.actionBtnText,
                { color: item.approved !== false ? '#B45309' : '#15803D' },
              ]}
            >
              {item.approved !== false ? 'Unapprove' : 'Approve'}
            </Text>
          </TouchableOpacity>

          {/* Featured Toggle */}
          <TouchableOpacity
            style={[
              styles.actionBtn,
              { backgroundColor: item.featured ? '#FEF9C3' : '#F1F5F9' },
            ]}
            onPress={() => handleToggleFeatured(item)}
          >
            <Icon
              source={item.featured ? 'star' : 'star-outline'}
              size={14}
              color={item.featured ? '#A16207' : '#64748B'}
            />
            <Text
              style={[
                styles.actionBtnText,
                { color: item.featured ? '#A16207' : '#64748B' },
              ]}
            >
              {item.featured ? 'Featured' : 'Feature'}
            </Text>
          </TouchableOpacity>

          {/* Sold Toggle */}
          <TouchableOpacity
            style={[
              styles.actionBtn,
              { backgroundColor: item.sold ? '#E2E8F0' : '#DCFCE7' },
            ]}
            onPress={() => handleToggleSold(item)}
          >
            <Icon
              source={item.sold ? 'cart-arrow-up' : 'cart-check'}
              size={14}
              color={item.sold ? '#475569' : '#15803D'}
            />
            <Text
              style={[
                styles.actionBtnText,
                { color: item.sold ? '#475569' : '#15803D' },
              ]}
            >
              {item.sold ? 'Available' : 'Sold'}
            </Text>
          </TouchableOpacity>

          {/* Trash / Restore */}
          <TouchableOpacity
            style={[
              styles.actionBtn,
              { backgroundColor: item.isDeleted ? '#DCFCE7' : '#F1F5F9' },
            ]}
            onPress={() => handleToggleSoftDelete(item)}
          >
            <Icon
              source={item.isDeleted ? 'restore' : 'trash-can-outline'}
              size={14}
              color={item.isDeleted ? '#15803D' : '#64748B'}
            />
            <Text
              style={[
                styles.actionBtnText,
                { color: item.isDeleted ? '#15803D' : '#64748B' },
              ]}
            >
              {item.isDeleted ? 'Restore' : 'Trash'}
            </Text>
          </TouchableOpacity>

          {/* Edit */}
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#EFF6FF' }]}
            onPress={() => {
              setSelectedListing(item);
              setEditModalVisible(true);
            }}
          >
            <Icon source="pencil-outline" size={14} color="#1565FF" />
            <Text style={[styles.actionBtnText, { color: '#1565FF' }]}>Edit</Text>
          </TouchableOpacity>

          {/* Delete Permanently */}
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#FEE2E2' }]}
            onPress={() => handleDeleteListing(item.id, item.title)}
          >
            <Icon source="delete-forever" size={14} color="#EF4444" />
            <Text style={[styles.actionBtnText, { color: '#EF4444' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Super Admin Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Icon source="shield-check" size={26} color="#FDE047" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.title}>Super Admin Panel</Text>
            <Text style={styles.subtitle}>Auto Parts Live Control & Management Engine</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.exitBtn}
          onPress={() => (navigation ? navigation.goBack() : null)}
        >
          <Icon source="close" size={16} color="#FFFFFF" />
          <Text style={styles.exitBtnText}>Exit</Text>
        </TouchableOpacity>
      </View>

      {/* Main Tab Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabScrollContainer}
      >
        {[
          { id: 'listings', label: `Ads (${listings.length})`, icon: 'tag-multiple' },
          { id: 'users', label: `Users (${users.length})`, icon: 'account-group' },
          { id: 'banners', label: `Banners (${banners.length})`, icon: 'image-multiple' },
          { id: 'taxonomy', label: 'Taxonomy CMS', icon: 'shape' },
          { id: 'announcements', label: `Broadcast (${announcements.length})`, icon: 'bullhorn' },
          { id: 'version', label: 'App Update', icon: 'cellphone-arrow-down' },
        ].map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tabButton, tab === t.id && styles.tabButtonActive]}
            onPress={() => {
              setTab(t.id as any);
              setSearchTerm('');
            }}
          >
            <Icon
              source={t.icon}
              size={16}
              color={tab === t.id ? '#FFFFFF' : '#64748B'}
            />
            <Text style={[styles.tabButtonText, tab === t.id && styles.tabButtonTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TAB CONTENTS */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1565FF" />
          <Text style={{ marginTop: 10, color: '#64748B', fontWeight: '600' }}>
            Syncing Cloud Firestore...
          </Text>
        </View>
      ) : tab === 'listings' ? (
        /* TAB 1: LISTINGS MODERATION */
        <View style={{ flex: 1 }}>
          {/* Status Filter Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={{ paddingHorizontal: 12, gap: 6 }}
          >
            {[
              { id: 'all', label: 'All', count: listingCounts.all },
              { id: 'active', label: 'Active', count: listingCounts.active },
              { id: 'pending', label: 'Pending', count: listingCounts.pending },
              { id: 'featured', label: 'Featured', count: listingCounts.featured },
              { id: 'verified', label: 'Verified', count: listingCounts.verified },
              { id: 'sold', label: 'Sold', count: listingCounts.sold },
              { id: 'trash', label: 'Trash', count: listingCounts.trash },
            ].map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[
                  styles.filterPill,
                  listingFilter === f.id && styles.filterPillActive,
                ]}
                onPress={() => {
                  setListingFilter(f.id as any);
                  setSelectedPartIds([]);
                }}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    listingFilter === f.id && styles.filterPillTextActive,
                  ]}
                >
                  {f.label} ({f.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Search Bar & Bulk Actions */}
          <View style={styles.searchBarRow}>
            <TextInput
              mode="outlined"
              placeholder="Search title, brand, model, seller..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
              left={<TextInput.Icon icon="magnify" />}
              right={
                searchTerm ? (
                  <TextInput.Icon icon="close" onPress={() => setSearchTerm('')} />
                ) : null
              }
              dense
            />
          </View>

          {/* Bulk Selection Bar */}
          {filteredListings.length > 0 && (
            <View style={styles.bulkActionBar}>
              <TouchableOpacity style={styles.bulkSelectBtn} onPress={toggleSelectAll}>
                <Icon
                  source={isAllSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={20}
                  color="#1565FF"
                />
                <Text style={styles.bulkSelectText}>
                  {isAllSelected ? 'Deselect All' : `Select All (${filteredListings.length})`}
                </Text>
              </TouchableOpacity>

              {selectedPartIds.length > 0 && (
                <TouchableOpacity style={styles.bulkDeleteBtn} onPress={handleBulkDelete}>
                  <Icon source="delete-sweep" size={16} color="#EF4444" />
                  <Text style={styles.bulkDeleteText}>Delete ({selectedPartIds.length})</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Listings FlatList */}
          <FlatList
            data={filteredListings}
            keyExtractor={(item) => item.id}
            renderItem={renderListingCard}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Icon source="tag-off-outline" size={48} color="#94A3B8" />
                <Text style={styles.emptyText}>No listings found for current filter.</Text>
              </View>
            }
          />
        </View>
      ) : tab === 'users' ? (
        /* TAB 2: USERS MANAGEMENT */
        <View style={{ flex: 1 }}>
          {/* User Count Status Banner */}
          <View style={styles.userBanner}>
            <Icon source="account-group" size={20} color="#1565FF" />
            <Text style={styles.userBannerText}>
              Total Registered Users:{' '}
              <Text style={{ fontWeight: '800', color: '#1565FF' }}>{users.length}</Text>
            </Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBarRow}>
            <TextInput
              mode="outlined"
              placeholder="Search user name, email, phone..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
              left={<TextInput.Icon icon="magnify" />}
              right={
                searchTerm ? (
                  <TextInput.Icon icon="close" onPress={() => setSearchTerm('')} />
                ) : null
              }
              dense
            />
          </View>

          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const isSuper = SUPER_ADMIN_EMAILS.includes(item.email);
              const isBlocked = Boolean(item.isBlocked);

              return (
                <Surface
                  style={[
                    styles.userCard,
                    isBlocked && { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
                  ]}
                  elevation={1}
                >
                  <View style={styles.userAvatar}>
                    <Icon
                      source={isSuper ? 'shield-crown' : 'account'}
                      size={20}
                      color={isSuper ? '#EAB308' : '#1565FF'}
                    />
                  </View>

                  <View style={styles.userInfoCol}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={styles.userName} numberOfLines={1}>
                        {item.name || item.displayName || 'Registered User'}
                      </Text>
                      {isSuper && (
                        <Chip style={styles.superChip} textStyle={{ fontSize: 9, color: '#854D0E', fontWeight: '800' }}>
                          SUPER ADMIN
                        </Chip>
                      )}
                      {isBlocked && (
                        <Chip style={styles.blockedChip} textStyle={{ fontSize: 9, color: '#991B1B', fontWeight: '800' }}>
                          SUSPENDED
                        </Chip>
                      )}
                    </View>

                    <Text style={styles.userMeta}>Email: {item.email || 'N/A'}</Text>
                    {item.phone && <Text style={styles.userMeta}>Phone: 📞 {item.phone}</Text>}
                    {(item.district || item.state) && (
                      <Text style={styles.userMeta}>
                        Location: 📍 {[item.district, item.state].filter(Boolean).join(', ')}
                      </Text>
                    )}
                  </View>

                  <View style={styles.userActionBtns}>
                    {!isSuper && (
                      <>
                        <TouchableOpacity
                          style={[
                            styles.userBtn,
                            { backgroundColor: isBlocked ? '#DCFCE7' : '#FEE2E2' },
                          ]}
                          onPress={() => handleToggleBlockUser(item)}
                        >
                          <Icon
                            source={isBlocked ? 'check-circle' : 'cancel'}
                            size={14}
                            color={isBlocked ? '#15803D' : '#DC2626'}
                          />
                          <Text
                            style={[
                              styles.userBtnText,
                              { color: isBlocked ? '#15803D' : '#DC2626' },
                            ]}
                          >
                            {isBlocked ? 'Unblock' : 'Suspend'}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.userBtn, { backgroundColor: '#EFF6FF' }]}
                          onPress={() => handleOpenEditUser(item)}
                        >
                          <Icon source="pencil-outline" size={14} color="#1565FF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.userBtn, { backgroundColor: '#FEE2E2' }]}
                          onPress={() => handleDeleteUser(item)}
                        >
                          <Icon source="trash-can-outline" size={14} color="#EF4444" />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </Surface>
              );
            }}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Icon source="account-off" size={48} color="#94A3B8" />
                <Text style={styles.emptyText}>No users matched your search.</Text>
              </View>
            }
          />
        </View>
      ) : tab === 'banners' ? (
        /* TAB 3: BANNERS MANAGEMENT */
        <View style={{ flex: 1 }}>
          <View style={styles.bannerHeaderRow}>
            <View>
              <Text style={styles.sectionHeaderTitle}>Hero Promotional Banners</Text>
              <Text style={styles.sectionHeaderSubtitle}>
                Manage active carousel slides & promotions
              </Text>
            </View>

            <Button
              mode="contained"
              icon="plus"
              onPress={handleOpenAddBanner}
              style={styles.addBannerBtn}
              labelStyle={{ color: '#FFFFFF', fontWeight: '700', fontSize: 12 }}
            >
              Add Banner
            </Button>
          </View>

          <ScrollView contentContainerStyle={styles.listContent}>
            {banners.map((b, idx) => (
              <Surface key={b.id || idx} style={styles.bannerCard} elevation={2}>
                <View style={styles.bannerImageWrap}>
                  {b.imageUrl ? (
                    <Image source={{ uri: b.imageUrl }} style={styles.bannerCardImg} />
                  ) : (
                    <View style={[styles.bannerCardImg, { backgroundColor: '#1E293B' }]} />
                  )}

                  <View style={styles.bannerTagRow}>
                    <Chip style={styles.orderChip} textStyle={{ fontSize: 10, color: '#FFFFFF', fontWeight: '800' }}>
                      #{b.order || idx}
                    </Chip>
                    <Chip
                      style={{
                        backgroundColor: b.active !== false ? '#10B981' : '#64748B',
                      }}
                      textStyle={{ fontSize: 10, color: '#FFFFFF', fontWeight: '800' }}
                    >
                      {b.active !== false ? 'ACTIVE' : 'DISABLED'}
                    </Chip>
                  </View>
                </View>

                <View style={styles.bannerInfoBody}>
                  <Text style={styles.bannerTitleText}>{b.title}</Text>
                  {b.subtitle ? <Text style={styles.bannerSubText}>{b.subtitle}</Text> : null}
                  {b.targetLink ? (
                    <Text style={styles.bannerTargetLink}>Target: {b.targetLink}</Text>
                  ) : null}

                  {/* Actions Row */}
                  <View style={styles.bannerActionsRow}>
                    {/* Order buttons */}
                    <View style={styles.reorderGroup}>
                      <TouchableOpacity
                        disabled={idx === 0}
                        style={[styles.reorderBtn, idx === 0 && { opacity: 0.3 }]}
                        onPress={() => handleMoveBannerOrder(b, 'up')}
                      >
                        <Icon source="arrow-up" size={16} color="#1E293B" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={idx === banners.length - 1}
                        style={[styles.reorderBtn, idx === banners.length - 1 && { opacity: 0.3 }]}
                        onPress={() => handleMoveBannerOrder(b, 'down')}
                      >
                        <Icon source="arrow-down" size={16} color="#1E293B" />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 6 }}>
                      {/* Active toggle */}
                      <TouchableOpacity
                        style={[
                          styles.actionBtn,
                          { backgroundColor: b.active !== false ? '#DCFCE7' : '#F1F5F9' },
                        ]}
                        onPress={() => handleToggleBannerActive(b)}
                      >
                        <Icon
                          source={b.active !== false ? 'eye' : 'eye-off'}
                          size={14}
                          color={b.active !== false ? '#15803D' : '#64748B'}
                        />
                        <Text
                          style={[
                            styles.actionBtnText,
                            { color: b.active !== false ? '#15803D' : '#64748B' },
                          ]}
                        >
                          {b.active !== false ? 'Disable' : 'Enable'}
                        </Text>
                      </TouchableOpacity>

                      {/* Edit */}
                      <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: '#EFF6FF' }]}
                        onPress={() => handleOpenEditBanner(b)}
                      >
                        <Icon source="pencil-outline" size={14} color="#1565FF" />
                        <Text style={[styles.actionBtnText, { color: '#1565FF' }]}>Edit</Text>
                      </TouchableOpacity>

                      {/* Delete */}
                      <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: '#FEE2E2' }]}
                        onPress={() => handleDeleteBanner(b)}
                      >
                        <Icon source="trash-can-outline" size={14} color="#EF4444" />
                        <Text style={[styles.actionBtnText, { color: '#EF4444' }]}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Surface>
            ))}

            {banners.length === 0 && (
              <View style={styles.centerContainer}>
                <Icon source="image-broken-variant" size={48} color="#94A3B8" />
                <Text style={styles.emptyText}>No banners configured yet.</Text>
                <Button mode="contained" onPress={handleOpenAddBanner} style={{ marginTop: 12 }}>
                  Add First Banner
                </Button>
              </View>
            )}
          </ScrollView>
        </View>
      ) : tab === 'taxonomy' ? (
        /* TAB 4: TAXONOMY CMS */
        <AdminTaxonomyCMS />
      ) : tab === 'announcements' ? (
        /* TAB 5: BROADCAST ANNOUNCEMENTS */
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.listContent}>
          {/* New Broadcast Form */}
          <Surface style={styles.formCard} elevation={2}>
            <View style={styles.formCardHeader}>
              <Icon source="bullhorn" size={22} color="#1565FF" />
              <Text style={styles.formCardTitle}>Broadcast Notification</Text>
            </View>
            <Text style={styles.formCardSubtitle}>
              Push real-time announcements to all registered app users simultaneously
            </Text>

            <TextInput
              label="Announcement Title (e.g. Festival Mega Clearance)"
              value={annTitle}
              onChangeText={setAnnTitle}
              mode="outlined"
              style={styles.formInput}
            />

            <TextInput
              label="Announcement Message Content..."
              value={annText}
              onChangeText={setAnnText}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={[styles.formInput, { height: 80 }]}
            />

            <Button
              mode="contained"
              icon="send"
              onPress={handleSendAnnouncement}
              loading={sendingAnn}
              disabled={sendingAnn}
              style={styles.broadcastBtn}
              labelStyle={{ color: '#FFFFFF', fontWeight: '800' }}
            >
              Broadcast To All Users
            </Button>
          </Surface>

          {/* Past Announcements History */}
          <Text style={styles.sectionTitle}>Announcements History ({announcements.length})</Text>

          {announcements.map((ann) => (
            <Surface key={ann.id} style={styles.annItemCard} elevation={1}>
              <View style={styles.annHeaderRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.annItemTitle}>{ann.title}</Text>
                  <Text style={styles.annItemDate}>
                    {ann.createdAt ? new Date(ann.createdAt).toLocaleString() : 'Recent'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.annDeleteBtn}
                  onPress={() => handleDeleteAnnouncement(ann)}
                >
                  <Icon source="trash-can-outline" size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
              <Text style={styles.annItemText}>{ann.text || ann.message}</Text>
            </Surface>
          ))}

          {announcements.length === 0 && (
            <View style={styles.centerContainer}>
              <Icon source="bell-sleep-outline" size={40} color="#94A3B8" />
              <Text style={styles.emptyText}>No broadcast announcements sent yet.</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        /* TAB 6: APP UPDATE MANAGER */
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.listContent}>
          <Surface style={styles.formCard} elevation={2}>
            <View style={styles.formCardHeader}>
              <Icon source="cellphone-arrow-down" size={24} color="#1565FF" />
              <Text style={styles.formCardTitle}>OTA & App Update Configuration</Text>
            </View>
            <Text style={styles.formCardSubtitle}>
              Configure latest version prompt, force critical updates, and APK distribution URL
            </Text>

            <View style={styles.rowInputs}>
              <TextInput
                label="Latest Version"
                value={latestVersion}
                onChangeText={setLatestVersion}
                mode="outlined"
                style={[styles.formInput, { flex: 1 }]}
              />
              <TextInput
                label="Min Supported Version"
                value={minVersion}
                onChangeText={setMinVersion}
                mode="outlined"
                style={[styles.formInput, { flex: 1 }]}
              />
            </View>

            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.switchLabel}>Force Update (Block Older Versions)</Text>
                <Text style={styles.switchSubLabel}>
                  Users cannot dismiss the update modal until they install the latest APK
                </Text>
              </View>
              <Switch
                value={forceUpdate}
                onValueChange={setForceUpdate}
                trackColor={{ false: '#CBD5E1', true: '#EF4444' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <TextInput
              label="APK Download URL / Play Store Link"
              value={apkUrl}
              onChangeText={setApkUrl}
              mode="outlined"
              style={styles.formInput}
            />

            <TextInput
              label="Release Date (YYYY-MM-DD)"
              value={releaseDate}
              onChangeText={setReleaseDate}
              mode="outlined"
              style={styles.formInput}
            />

            <TextInput
              label="Changelog / Release Notes"
              value={releaseNotes}
              onChangeText={setReleaseNotes}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={[styles.formInput, { height: 90 }]}
            />

            <Button
              mode="contained"
              icon="cloud-upload"
              onPress={handleSaveVersionConfig}
              loading={savingVersion}
              disabled={savingVersion}
              style={styles.broadcastBtn}
              labelStyle={{ color: '#FFFFFF', fontWeight: '800' }}
            >
              Save App Update Configuration
            </Button>
          </Surface>
        </ScrollView>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: Edit Listing Modal */}
      {/* ------------------------------------------------------------- */}
      {selectedListing && (
        <EditListingModal
          visible={editModalVisible}
          onClose={() => {
            setEditModalVisible(false);
            setSelectedListing(null);
          }}
          listing={selectedListing}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: Edit User Profile Modal */}
      {/* ------------------------------------------------------------- */}
      <Modal
        visible={Boolean(editingUser)}
        transparent
        animationType="slide"
        onRequestClose={() => setEditingUser(null)}
      >
        <View style={styles.modalBackdrop}>
          <Surface style={styles.modalCard} elevation={5}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Edit User Profile</Text>
              <IconButton icon="close" size={20} onPress={() => setEditingUser(null)} />
            </View>

            <TextInput
              label="Full Name"
              value={editUserName}
              onChangeText={setEditUserName}
              mode="outlined"
              style={styles.modalInput}
            />

            <TextInput
              label="Phone Number"
              value={editUserPhone}
              onChangeText={setEditUserPhone}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.modalInput}
            />

            <TextInput
              label="District / City"
              value={editUserDistrict}
              onChangeText={setEditUserDistrict}
              mode="outlined"
              style={styles.modalInput}
            />

            <TextInput
              label="State"
              value={editUserState}
              onChangeText={setEditUserState}
              mode="outlined"
              style={styles.modalInput}
            />

            <View style={styles.modalBtnRow}>
              <Button onPress={() => setEditingUser(null)}>Cancel</Button>
              <Button
                mode="contained"
                onPress={handleSaveUserEdit}
                loading={savingUser}
                disabled={savingUser}
              >
                Save Profile
              </Button>
            </View>
          </Surface>
        </View>
      </Modal>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: Add / Edit Banner Modal */}
      {/* ------------------------------------------------------------- */}
      <Modal
        visible={bannerModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setBannerModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <Surface style={styles.modalCard} elevation={5}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>
                {editingBanner ? 'Edit Promotional Banner' : 'Create New Banner'}
              </Text>
              <IconButton icon="close" size={20} onPress={() => setBannerModalVisible(false)} />
            </View>

            <ScrollView style={{ maxHeight: 400 }}>
              <TextInput
                label="Banner Title *"
                value={bannerTitle}
                onChangeText={setBannerTitle}
                mode="outlined"
                style={styles.modalInput}
              />

              <TextInput
                label="Subtitle / Description"
                value={bannerSubtitle}
                onChangeText={setBannerSubtitle}
                mode="outlined"
                style={styles.modalInput}
              />

              <TextInput
                label="Tag Badge (e.g. Special Offer, Hot Deal)"
                value={bannerTag}
                onChangeText={setBannerTag}
                mode="outlined"
                style={styles.modalInput}
              />

              <TextInput
                label="Target Action / Link"
                value={bannerTargetLink}
                onChangeText={setBannerTargetLink}
                mode="outlined"
                style={styles.modalInput}
              />

              <TextInput
                label="Display Order (0, 1, 2...)"
                value={bannerOrder}
                onChangeText={setBannerOrder}
                mode="outlined"
                keyboardType="numeric"
                style={styles.modalInput}
              />

              {/* Image Picker */}
              <View style={styles.bannerImagePickerBox}>
                <Text style={styles.bannerPickerLabel}>Banner Image *</Text>
                {bannerImageUrl ? (
                  <Image source={{ uri: bannerImageUrl }} style={styles.previewBannerImg} />
                ) : null}

                <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                  <Button
                    mode="outlined"
                    icon="camera"
                    onPress={handlePickBannerImage}
                    loading={uploadingBannerImage}
                    disabled={uploadingBannerImage}
                    style={{ flex: 1 }}
                  >
                    Upload Image
                  </Button>
                </View>

                <TextInput
                  label="Or Direct Image URL"
                  value={bannerImageUrl}
                  onChangeText={setBannerImageUrl}
                  mode="outlined"
                  style={[styles.modalInput, { marginTop: 8 }]}
                />
              </View>

              {/* Active Toggle */}
              <View style={[styles.switchRow, { marginVertical: 8 }]}>
                <Text style={styles.switchLabel}>Active in Carousel</Text>
                <Switch
                  value={bannerActive}
                  onValueChange={setBannerActive}
                  trackColor={{ false: '#CBD5E1', true: '#10B981' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </ScrollView>

            <View style={styles.modalBtnRow}>
              <Button onPress={() => setBannerModalVisible(false)}>Cancel</Button>
              <Button
                mode="contained"
                onPress={handleSaveBanner}
                loading={savingBanner}
                disabled={savingBanner}
              >
                Save Banner
              </Button>
            </View>
          </Surface>
        </View>
      </Modal>
    </View>
  );
}

// -------------------------------------------------------------
// Stylesheet
// -------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#0B1220',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  exitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  exitBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  tabScrollContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 6,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: '#1565FF',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  filterScroll: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterPillActive: {
    backgroundColor: '#1565FF',
    borderColor: '#1565FF',
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  searchBarRow: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
  },
  bulkActionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#EFF6FF',
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
  },
  bulkSelectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bulkSelectText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1565FF',
  },
  bulkDeleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  bulkDeleteText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
  },
  listContent: {
    padding: 12,
    paddingBottom: 32,
  },
  listingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxTouch: {
    paddingTop: 4,
    paddingRight: 6,
  },
  imageContainer: {
    width: 74,
    height: 74,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  listingImage: {
    width: '100%',
    height: '100%',
  },
  soldOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soldOverlayText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  listingInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
  },
  priceTag: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1565FF',
    marginLeft: 6,
  },
  listingMeta: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
    marginTop: 2,
  },
  listingSeller: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  listingLoc: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 6,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
  },
  actionsBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    justifyContent: 'flex-end',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 3,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  centerContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 8,
    fontWeight: '600',
  },
  userBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
  },
  userBannerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoCol: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  userMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  superChip: {
    backgroundColor: '#FEF08A',
    height: 20,
  },
  blockedChip: {
    backgroundColor: '#FEE2E2',
    height: 20,
  },
  userActionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userBtn: {
    padding: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  userBtnText: {
    fontSize: 10,
    fontWeight: '700',
  },
  bannerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionHeaderSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  addBannerBtn: {
    backgroundColor: '#1565FF',
    borderRadius: 10,
  },
  bannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bannerImageWrap: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  bannerCardImg: {
    width: '100%',
    height: '100%',
  },
  bannerTagRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderChip: {
    backgroundColor: '#0F172A',
    height: 22,
  },
  bannerInfoBody: {
    padding: 12,
  },
  bannerTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  bannerSubText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  bannerTargetLink: {
    fontSize: 10,
    color: '#1565FF',
    fontFamily: 'monospace',
    marginTop: 4,
  },
  bannerActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  reorderGroup: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 2,
  },
  reorderBtn: {
    padding: 4,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  formCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  formCardSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 12,
  },
  formInput: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  broadcastBtn: {
    backgroundColor: '#1565FF',
    borderRadius: 10,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  annItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  annHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  annItemTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  annItemDate: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  annDeleteBtn: {
    padding: 4,
  },
  annItemText: {
    fontSize: 12,
    color: '#475569',
    marginTop: 6,
    lineHeight: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  switchSubLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalInput: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  bannerImagePickerBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  bannerPickerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  previewBannerImg: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 6,
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
});
