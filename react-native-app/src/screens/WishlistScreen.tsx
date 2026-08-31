import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { getFirebaseFirestore, getCurrentUser } from '../services/firebase';

export default function WishlistScreen({ navigation }: any) {
  const [savedParts, setSavedParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      setLoading(false);
      return;
    }
    
    let unsubFavs = () => {};
    try {
      const db = getFirebaseFirestore();
      if (db) {
        unsubFavs = db.collection('favorites')
          .where('userId', '==', user.uid)
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
            setLoading(false);
          }, () => {
            setSavedParts([]);
            setLoading(false);
          });
      }
    } catch (_) {
      setSavedParts([]);
      setLoading(false);
    }
    return () => unsubFavs();
  }, []);

  const handleRemoveFavorite = async (partId: string) => {
    try {
      const user = getCurrentUser();
      if (!user) return;
      const db = getFirebaseFirestore();
      if (!db) return;
      
      const snap = await db.collection('favorites')
        .where('userId', '==', user.uid)
        .where('partId', '==', partId)
        .get();
        
      const batch = db.batch();
      snap.forEach((doc: any) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      
      // Update local state optimistically
      setSavedParts((prev) => prev.filter((p) => p.id !== partId));
    } catch (err) {
      console.warn("Could not remove favorite", err);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#0066FF" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedParts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Icon source="heart-outline" size={32} color="#64748B" />
            </View>
            <Text style={styles.emptyTitle}>No Saved Parts</Text>
            <Text style={styles.emptySubtitle}>Items you favorite will appear here.</Text>
            <TouchableOpacity style={styles.emptyActionBtn} onPress={() => navigation.navigate('HomeTab')}>
              <Text style={styles.emptyActionBtnText}>Browse Marketplace</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.adCard}
            onPress={() => navigation.navigate('ProductDetail', { partId: item.id })}
          >
            <View style={styles.cardHeaderArea}>
              <View style={styles.imageWrapper}>
                {item.imageUrl || item.imageUrls?.[0] ? (
                  <Image source={{ uri: item.imageUrl || item.imageUrls?.[0] }} style={styles.adImage} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Icon source="camera-outline" size={24} color="#94A3B8" />
                  </View>
                )}
              </View>
              <View style={styles.adInfoArea}>
                <Text style={styles.adBrandTag} numberOfLines={1}>
                  {item.carBrand} {item.carModel}
                </Text>
                <Text style={styles.adTitle} numberOfLines={2}>
                  {item.partName || item.title}
                </Text>
                <View style={styles.metaRow}>
                  <Text style={styles.adPrice}>₹{item.price?.toLocaleString() || 'N/A'}</Text>
                  <View style={styles.conditionPill}>
                    <Text style={styles.conditionText}>{item.condition || 'Used'}</Text>
                  </View>
                </View>
                <View style={styles.subMetaRow}>
                  <View style={styles.locationWrap}>
                    <Icon source="map-marker-outline" size={12} color="#64748B" />
                    <Text style={styles.locationText} numberOfLines={1}>{item.district || item.state || 'India'}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.cardActionsToolbar}>
              <TouchableOpacity 
                style={styles.actionBtnOutline}
                onPress={() => handleRemoveFavorite(item.id)}
              >
                <Icon source="heart-off-outline" size={16} color="#DC2626" />
                <Text style={[styles.actionBtnOutlineText, { color: '#DC2626' }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { padding: 16 },
  adCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardHeaderArea: { flexDirection: 'row', padding: 12, gap: 12 },
  imageWrapper: { width: 84, height: 84, borderRadius: 10, backgroundColor: '#F1F5F9', overflow: 'hidden' },
  adImage: { width: '100%', height: '100%' },
  imagePlaceholder: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  adInfoArea: { flex: 1, justifyContent: 'space-between' },
  adBrandTag: { fontSize: 11, fontWeight: '700', color: '#0066FF', textTransform: 'uppercase' },
  adTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginTop: 2, lineHeight: 17 },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  adPrice: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  conditionPill: { backgroundColor: '#F1F5F9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: '#E2E8F0' },
  conditionText: { fontSize: 9, fontWeight: '700', color: '#475569', textTransform: 'uppercase' },
  subMetaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  locationWrap: { flexDirection: 'row', alignItems: 'center', gap: 3, flex: 1 },
  locationText: { fontSize: 11, color: '#64748B', fontWeight: '500' },
  cardActionsToolbar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#F8FAFC', borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  actionBtnOutline: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  actionBtnOutlineText: { fontSize: 11, fontWeight: '700' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 60 },
  emptyIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A', marginBottom: 6, textAlign: 'center' },
  emptySubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 19, marginBottom: 20 },
  emptyActionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#0066FF', paddingVertical: 11, paddingHorizontal: 20, borderRadius: 12 },
  emptyActionBtnText: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
});
