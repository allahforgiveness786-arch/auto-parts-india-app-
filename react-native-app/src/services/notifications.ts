import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirebaseFirestore, getCurrentUser } from './firebase';

const READ_ANNOUNCEMENTS_STORAGE_KEY = '@autoparts_read_announcements';

/**
 * Gets all announcement IDs that have been read by the current device/user
 */
export async function getLocalReadAnnouncementIds(): Promise<Set<string>> {
  try {
    const raw = await AsyncStorage.getItem(READ_ANNOUNCEMENTS_STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return new Set<string>(arr);
      }
    }
  } catch (err) {
    console.warn('[notifications] Error reading local read announcements:', err);
  }
  return new Set<string>();
}

/**
 * Marks announcement IDs as read locally and in Firestore
 */
export async function markAnnouncementsAsRead(announcementIds: string[]): Promise<void> {
  if (!announcementIds || announcementIds.length === 0) return;
  try {
    const existingSet = await getLocalReadAnnouncementIds();
    announcementIds.forEach((id) => {
      if (id) existingSet.add(id);
    });
    await AsyncStorage.setItem(
      READ_ANNOUNCEMENTS_STORAGE_KEY,
      JSON.stringify(Array.from(existingSet))
    );

    // Sync to user document in Firestore if logged in
    const user = getCurrentUser();
    const uid = user?.uid || user?.id;
    if (uid) {
      const db = getFirebaseFirestore();
      if (db && typeof db.collection === 'function') {
        const batchPromises = announcementIds.map((id) =>
          db
            .collection('users')
            .doc(uid)
            .collection('read_announcements')
            .doc(id)
            .set({ readAt: Date.now() }, { merge: true })
            .catch(() => {})
        );
        await Promise.all(batchPromises);
      }
    }
  } catch (err) {
    console.warn('[notifications] Error marking announcements as read:', err);
  }
}

/**
 * Subscribes to announcements and computes real unread notification count
 */
export function subscribeToUnreadNotificationCount(
  callback: (unreadCount: number) => void
): () => void {
  let isMounted = true;
  let unsubFirestore = () => {};

  const calculateCount = async (announcementsList: any[]) => {
    try {
      const readSet = await getLocalReadAnnouncementIds();
      let unread = 0;
      announcementsList.forEach((ann) => {
        if (ann?.id && !readSet.has(ann.id)) {
          unread += 1;
        }
      });
      if (isMounted) {
        callback(unread);
      }
    } catch (_) {
      if (isMounted) callback(0);
    }
  };

  try {
    const db = getFirebaseFirestore();
    if (db && typeof db.collection === 'function') {
      unsubFirestore = db
        .collection('announcements')
        .limit(30)
        .onSnapshot(
          (snapshot: any) => {
            const list: any[] = [];
            if (snapshot && typeof snapshot.forEach === 'function') {
              snapshot.forEach((doc: any) => {
                list.push({ id: doc.id, ...(doc.data ? doc.data() : doc) });
              });
            }
            calculateCount(list);
          },
          () => {
            if (isMounted) callback(0);
          }
        );
    } else {
      callback(0);
    }
  } catch (_) {
    callback(0);
  }

  return () => {
    isMounted = false;
    try {
      unsubFirestore();
    } catch (_) {}
  };
}
