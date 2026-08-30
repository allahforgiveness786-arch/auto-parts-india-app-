import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';

const RECENTLY_VIEWED_STORAGE_KEY = '@autoparts_recently_viewed_v1';
const MAX_RECENT_ITEMS = 25;

export async function addRecentlyViewedPart(part: any): Promise<void> {
  if (!part || !part.id) return;
  try {
    const raw = await AsyncStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
    let items: any[] = raw ? JSON.parse(raw) : [];
    
    // Filter out if already present
    items = items.filter((item: any) => item.id !== part.id);
    
    // Add to top with timestamp
    items.unshift({
      id: part.id,
      title: part.title || part.name || 'Spare Part',
      price: part.price || 0,
      carBrand: part.carBrand || part.brand || '',
      carModel: part.carModel || part.model || '',
      imageUrl: part.imageUrl || part.images?.[0] || part.imageUrls?.[0] || '',
      location: part.location || part.city || 'India',
      viewedAt: Date.now(),
      sold: Boolean(part.sold),
    });

    if (items.length > MAX_RECENT_ITEMS) {
      items = items.slice(0, MAX_RECENT_ITEMS);
    }

    await AsyncStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn('[RecentlyViewed] Error saving item:', err);
  }
}

export async function getRecentlyViewedParts(): Promise<any[]> {
  try {
    const raw = await AsyncStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('[RecentlyViewed] Error reading items:', err);
    return [];
  }
}

export async function clearRecentlyViewedParts(): Promise<void> {
  try {
    await AsyncStorage.removeItem(RECENTLY_VIEWED_STORAGE_KEY);
  } catch (err) {
    console.warn('[RecentlyViewed] Error clearing items:', err);
  }
}

export function useRecentlyViewed() {
  const [recentParts, setRecentParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const list = await getRecentlyViewedParts();
    setRecentParts(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { recentParts, loading, reload, clear: clearRecentlyViewedParts };
}
