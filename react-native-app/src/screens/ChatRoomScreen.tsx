import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
  Linking,
} from 'react-native';
import {
  TextInput,
  IconButton,
  Text,
  useTheme,
  ActivityIndicator,
  Chip,
  Badge,
  Icon,
} from 'react-native-paper';
import { getFirebaseFirestore, getCurrentUser } from '../services/firebase';
import { promptImageSourceDialog } from '../services/imagePickerService';
import { uploadImageToCloudinary } from '../services/cloudinary';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelectorModal } from '../components/LanguageSelectorModal';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text?: string;
  imageUrl?: string | null;
  createdAt: number | any;
  status?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  readBy?: string[];
}

export default function ChatRoomScreen({ route, navigation, user: initialUser }: any) {
  const { chatId: routeChatId, part: routePart, chat: routeChat } = route.params || {};
  const activeUser = initialUser || getCurrentUser();
  const currentUid = activeUser?.uid || activeUser?.id || 'guest';
  const currentName = activeUser?.displayName || activeUser?.name || activeUser?.email?.split('@')[0] || 'User';
  const currentUserPhoto = activeUser?.photoURL || '';

  // Determine chatId if missing
  const part = routePart || (routeChat ? {
    id: routeChat.partId,
    title: routeChat.partTitle,
    imageUrl: routeChat.partImageUrl,
    price: routeChat.partPrice,
    sellerId: routeChat.sellerId,
    sellerName: routeChat.sellerName,
  } : null);

  const chatId = routeChatId || (part && currentUid ? `${currentUid}_${part.sellerId || 'seller'}_${part.id || 'item'}` : 'default_chat');

  // Partner Identification logic matching Web
  const isCurrentUserBuyer = routeChat?.buyerId === currentUid || (part && part.sellerId !== currentUid);
  const partnerId = routeChat 
    ? (isCurrentUserBuyer ? routeChat.sellerId : routeChat.buyerId)
    : (part ? (part.sellerId === currentUid ? 'buyer' : part.sellerId) : 'seller');
  const partnerName = routeChat
    ? (isCurrentUserBuyer ? (routeChat.sellerName || 'Verified Seller') : (routeChat.buyerName || 'Buyer'))
    : (part ? (part.sellerName || 'Verified Seller') : 'Seller');
  const partnerRole = isCurrentUserBuyer ? 'Seller' : 'Buyer';
  const partnerPhoto = routeChat
    ? (isCurrentUserBuyer ? routeChat.sellerPhoto : routeChat.buyerPhoto)
    : (part ? part.sellerPhoto : '');

  // State Management
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string | null>(null);

  // Presence & Typing State
  const [partnerPresence, setPartnerPresence] = useState<{ online: boolean; lastSeen: number }>({
    online: true,
    lastSeen: Date.now(),
  });
  const [partnerIsTyping, setPartnerIsTyping] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { language, t, translateDynamic } = useLanguage();

  // 1. Subscribe to Chat Messages Real-time (Firestore query)
  useEffect(() => {
    if (!chatId) return;

    let unsubscribe = () => {};
    try {
      const db = getFirebaseFirestore();
      if (!db || typeof db.collection !== 'function') return;

      const messagesRef = db.collection('chats').doc(chatId).collection('messages');
      const q = messagesRef.orderBy('createdAt', 'asc');

      unsubscribe = q.onSnapshot(
        (snapshot: any) => {
          const list: ChatMessage[] = [];
          if (snapshot && typeof snapshot.forEach === 'function') {
            snapshot.forEach((doc: any) => {
              const data = doc.data ? doc.data() : doc;
              list.push({
                id: doc.id || data.id,
                ...data,
                status: data.status || 'read',
              });
            });
          }

          // Sort messages by createdAt
          list.sort((a, b) => {
            const timeA = typeof a.createdAt === 'number' ? a.createdAt : Date.now();
            const timeB = typeof b.createdAt === 'number' ? b.createdAt : Date.now();
            return timeA - timeB;
          });

          setMessages(list);

          // Mark incoming unread messages as read
          list.forEach(async (msg) => {
            if (msg.senderId !== currentUid && msg.status !== 'read') {
              try {
                await messagesRef.doc(msg.id).set({ status: 'read' }, { merge: true });
              } catch (_) {}
            }
          });
        },
        (err: any) => {
          console.warn('[ChatRoomScreen] Messages snapshot error:', err);
        }
      );
    } catch (e) {
      console.warn('[ChatRoomScreen] Exception in messages listener:', e);
    }

    return () => {
      try {
        unsubscribe();
      } catch (_) {}
    };
  }, [chatId, currentUid]);

  // 2. Subscribe to Partner Typing Status & Presence Real-time
  useEffect(() => {
    if (!chatId || !partnerId) return;

    let unsubTyping = () => {};
    let unsubPresence = () => {};

    try {
      const db = getFirebaseFirestore();
      if (db && typeof db.collection === 'function') {
        // Typing indicator doc: chats/{chatId}/typing/{partnerId}
        const typingDocRef = db.collection('chats').doc(chatId).collection('typing').doc(partnerId);
        unsubTyping = typingDocRef.onSnapshot(
          (docSnap: any) => {
            const data = docSnap?.data ? docSnap.data() : docSnap;
            if (data && data.isTyping) {
              const age = Date.now() - (data.timestamp || 0);
              setPartnerIsTyping(age < 8000);
            } else {
              setPartnerIsTyping(false);
            }
          },
          (err: any) => console.warn('[ChatRoomScreen] Typing error:', err)
        );

        // Presence doc: presence/{partnerId}
        const presenceDocRef = db.collection('presence').doc(partnerId);
        unsubPresence = presenceDocRef.onSnapshot(
          (docSnap: any) => {
            const data = docSnap?.data ? docSnap.data() : docSnap;
            if (data) {
              setPartnerPresence({
                online: data.online === true,
                lastSeen: data.lastSeen || Date.now(),
              });
            }
          },
          (err: any) => console.warn('[ChatRoomScreen] Presence error:', err)
        );
      }
    } catch (e) {
      console.warn('[ChatRoomScreen] Exception in typing/presence:', e);
    }

    return () => {
      try {
        unsubTyping();
        unsubPresence();
      } catch (_) {}
    };
  }, [chatId, partnerId]);

  // Update Current User's Typing Status
  const emitTyping = useCallback(
    async (isTyping: boolean) => {
      if (!chatId || !currentUid) return;
      try {
        const db = getFirebaseFirestore();
        if (db && typeof db.collection === 'function') {
          await db
            .collection('chats')
            .doc(chatId)
            .collection('typing')
            .doc(currentUid)
            .set({
              isTyping,
              timestamp: Date.now(),
              userId: currentUid,
            }, { merge: true });
        }
      } catch (_) {}
    },
    [chatId, currentUid]
  );

  const handleInputChange = (text: string) => {
    setInputText(text);

    if (text.trim().length > 0) {
      emitTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        emitTyping(false);
      }, 3000);
    } else {
      emitTyping(false);
    }
  };

  // 3. Send Message Logic (Optimistic update + Cloud Firestore + Chat metadata update)
  const executeSend = async (textToSend: string, imageUrl?: string | null) => {
    const cleanText = textToSend ? textToSend.trim() : '';
    if (!cleanText && !imageUrl) return;
    if (!chatId || !activeUser) {
      Alert.alert('Sign In Required', 'Please sign in to message this seller.');
      return;
    }

    const tempId = `msg_temp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = Date.now();

    // Optimistic message
    const optimisticMessage: ChatMessage = {
      id: tempId,
      senderId: currentUid,
      senderName: currentName,
      text: cleanText,
      imageUrl: imageUrl || null,
      createdAt: now,
      status: 'pending',
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInputText('');
    emitTyping(false);
    setIsSending(true);

    // Scroll to bottom immediately
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const db = getFirebaseFirestore();
      if (!db || typeof db.collection !== 'function') {
        throw new Error('Firestore is not initialized');
      }

      const messagesRef = db.collection('chats').doc(chatId).collection('messages');

      // Add to Firestore
      const docRef = await messagesRef.add({
        senderId: currentUid,
        senderName: currentName,
        senderPhoto: currentUserPhoto,
        text: cleanText,
        imageUrl: imageUrl || null,
        createdAt: now,
        status: 'sent',
      });

      // Update parent Chat document for inbox previews
      const chatDocRef = db.collection('chats').doc(chatId);
      await chatDocRef.set(
        {
          id: chatId,
          partId: part?.id || '',
          partTitle: part?.title || part?.partTitle || 'Spare Part',
          partImageUrl: part?.imageUrl || part?.partImageUrl || '',
          partPrice: Number(part?.price || part?.partPrice) || 0,
          buyerId: routeChat?.buyerId || (isCurrentUserBuyer ? currentUid : partnerId),
          buyerName: routeChat?.buyerName || (isCurrentUserBuyer ? currentName : partnerName),
          sellerId: routeChat?.sellerId || (isCurrentUserBuyer ? partnerId : currentUid),
          sellerName: routeChat?.sellerName || (isCurrentUserBuyer ? partnerName : currentName),
          lastMessageText: imageUrl ? '📷 Photo Attachment' : cleanText,
          lastMessageAt: now,
          lastSenderId: currentUid,
          participants: [currentUid, partnerId],
          unread: true,
        },
        { merge: true }
      );

      // Upgrade optimistic status to sent
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, id: docRef.id || tempId, status: 'sent' } : m))
      );

      // Trigger Push Notification via Backend Server
      try {
        fetch('https://ais-dev-7edqjbzlqrmbdqv4rx3rez-572875732715.asia-southeast1.run.app/api/notifications/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            senderId: currentUid,
            senderName: currentName,
            receiverId: partnerId,
            text: cleanText || 'Sent an image',
            chatId: chatId,
          })
        }).catch(() => {});
      } catch (_) {}

    } catch (err: any) {
      console.warn('[ChatRoomScreen] Failed to send message:', err);
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, status: 'failed' } : m))
      );
      Alert.alert('Message Not Sent', 'Could not send your message. Please check your internet and tap to retry.');
    } finally {
      setIsSending(false);
    }
  };

  const handleSendPress = () => {
    if (inputText.trim()) {
      executeSend(inputText);
    }
  };

  // 4. Image Upload Flow via Cloudinary
  const handlePickImage = async () => {
    try {
      const selectedUri = await promptImageSourceDialog(
        translateDynamic('Attach Photo'),
        translateDynamic('Select camera or gallery to share spare part images')
      );

      if (selectedUri) {
        setIsUploadingImage(true);
        try {
          const cloudinaryUrl = await uploadImageToCloudinary(selectedUri, 'chat_attachments');
          if (cloudinaryUrl) {
            await executeSend('', cloudinaryUrl);
          }
        } catch (err) {
          console.warn('[ChatRoomScreen] Image upload error:', err);
          Alert.alert('Upload Failed', 'Could not upload image. Please try again.');
        } finally {
          setIsUploadingImage(false);
        }
      }
    } catch (err) {
      console.warn('[ChatRoomScreen] Image picker dialog error:', err);
    }
  };

  const retrySendMessage = (failedMsg: ChatMessage) => {
    setMessages((prev) => prev.filter((m) => m.id !== failedMsg.id));
    executeSend(failedMsg.text || '', failedMsg.imageUrl);
  };

  const parseTimestamp = (ts: any): number => {
    if (!ts) return Date.now();
    if (typeof ts === 'number') return ts;
    if (typeof ts === 'string') {
      const parsed = Date.parse(ts);
      return isNaN(parsed) ? Date.now() : parsed;
    }
    if (typeof ts === 'object') {
      if (typeof ts.toMillis === 'function') return ts.toMillis();
      if (typeof ts.seconds === 'number') return ts.seconds * 1000;
    }
    return Date.now();
  };

  const formatMessageTime = (ts: any) => {
    const millis = parseTimestamp(ts);
    try {
      return new Date(millis).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  const getRelativePresenceTime = (lastSeen: number) => {
    if (!lastSeen) return translateDynamic('Offline');
    const diff = Math.floor((Date.now() - lastSeen) / 1000);
    if (diff < 60) return translateDynamic('Active just now');
    if (diff < 3600) return `Active ${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `Active ${Math.floor(diff / 3600)}h ago`;
    return `Last seen ${Math.floor(diff / 86400)}d ago`;
  };

  const formatPrice = (price: number) => {
    if (!price) return '₹0';
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };

  // Quick reply presets based on language
  const getQuickReplies = () => {
    switch (language) {
      case 'ta':
        return [
          'இது இன்னும் கிடைக்குமா?',
          'விலை குறைக்க முடியுமா?',
          'பொருள் எங்கே இருக்கிறது?',
          'கொரியர் மூலம் அனுப்ப முடியுமா?',
          'உத்தரவாதம் இருக்கிறதா?',
        ];
      case 'hi':
        return [
          'क्या यह अभी उपलब्ध है?',
          'क्या कीमत में छूट हो सकती है?',
          'पार्ट की वर्तमान स्थिति कैसी है?',
          'क्या आप कूरियर से भेज सकते हैं?',
          'क्या इस पर कोई वारंटी है?',
        ];
      default:
        return [
          'Is this still available?',
          'Is the price negotiable?',
          'What is the exact condition?',
          'Can you ship via courier?',
          'Any warranty or testing guarantee?',
        ];
    }
  };

  const handleCallPartner = () => {
    if (!part?.contactPhone) {
      Alert.alert('Contact', 'Phone number not available for this seller.');
      return;
    }
    Alert.alert(
      'Call Seller',
      `Do you want to call ${partnerName || 'the seller'} at ${part.contactPhone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Now',
          onPress: () => Linking.openURL(`tel:${part.contactPhone}`),
        },
      ]
    );
  };

  const handleDeleteMessage = (msgItem: ChatMessage) => {
    if (msgItem.senderId !== currentUid) return;
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message for everyone?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const db = getFirebaseFirestore();
              if (db && typeof db.collection === 'function' && chatId && msgItem.id) {
                await db
                  .collection('chats')
                  .doc(chatId)
                  .collection('messages')
                  .doc(msgItem.id)
                  .delete();
              }
              setMessages((prev) => prev.filter((m) => m.id !== msgItem.id));
            } catch (err: any) {
              console.warn('[ChatRoomScreen] Delete message error:', err);
            }
          },
        },
      ]
    );
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMe = item.senderId === currentUid;
    const isFailed = item.status === 'failed';
    const isPending = item.status === 'pending';

    return (
      <View
        style={[
          styles.messageRow,
          isMe ? styles.myMessageRow : styles.theirMessageRow,
        ]}
      >
        {/* Partner avatar for received messages */}
        {!isMe && (
          <View style={styles.partnerBubbleAvatar}>
            {partnerPhoto ? (
              <Image source={{ uri: partnerPhoto }} style={styles.partnerSmallAvatarImg} />
            ) : (
              <View style={styles.partnerSmallAvatarPlaceholder}>
                <Text style={styles.partnerSmallAvatarText}>
                  {(partnerName || 'S').charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={[styles.bubbleWrapper, isMe ? styles.myBubbleWrapper : styles.theirBubbleWrapper]}>
          <TouchableOpacity
            activeOpacity={0.85}
            onLongPress={() => isMe && handleDeleteMessage(item)}
            style={[
              styles.bubbleBox,
              isMe
                ? isFailed
                  ? styles.failedBubble
                  : styles.myBubble
                : styles.theirBubble,
            ]}
          >
            {/* Image attachment inside bubble */}
            {item.imageUrl ? (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setSelectedPreviewImage(item.imageUrl || null)}
                onLongPress={() => isMe && handleDeleteMessage(item)}
                style={styles.imageAttachmentContainer}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.messageImage}
                  resizeMode="cover"
                />
                <View style={styles.zoomOverlayIcon}>
                  <Icon source="magnify-plus-outline" size={20} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            ) : null}

            {/* Message text content */}
            {item.text ? (
              <Text
                style={[
                  styles.messageText,
                  isMe ? styles.myMessageText : styles.theirMessageText,
                ]}
              >
                {item.text}
              </Text>
            ) : null}
          </TouchableOpacity>

          {/* Timestamp & Status ticks */}
          <View style={[styles.metaRow, isMe ? styles.myMetaRow : styles.theirMetaRow]}>
            <Text style={styles.timeText}>{formatMessageTime(item.createdAt)}</Text>

            {isMe && (
              <View style={styles.statusTickContainer}>
                {isPending ? (
                  <ActivityIndicator size={10} color="#94A3B8" />
                ) : isFailed ? (
                  <TouchableOpacity
                    onPress={() => retrySendMessage(item)}
                    style={styles.retryBtn}
                  >
                    <Icon source="alert-circle" size={12} color="#EF4444" />
                    <Text style={styles.retryText}>{translateDynamic('Retry')}</Text>
                  </TouchableOpacity>
                ) : item.status === 'read' ? (
                  <Icon source="check-all" size={14} color="#38BDF8" />
                ) : item.status === 'delivered' ? (
                  <Icon source="check-all" size={14} color="#94A3B8" />
                ) : (
                  <Icon source="check" size={14} color="#94A3B8" />
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0B1220" />

      {/* Top Header Bar matching Web */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon source="arrow-left" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Partner Info and Presence */}
        <TouchableOpacity
          style={styles.partnerHeaderInfo}
          activeOpacity={0.8}
          onPress={() => {
            if (partnerId && partnerId !== 'seller') {
              navigation.navigate('SellerProfile', { sellerId: partnerId, sellerName: partnerName });
            }
          }}
        >
          <View style={styles.partnerHeaderAvatarWrapper}>
            {partnerPhoto ? (
              <Image source={{ uri: partnerPhoto }} style={styles.partnerHeaderAvatar} />
            ) : (
              <View style={styles.partnerHeaderAvatarPlaceholder}>
                <Text style={styles.partnerHeaderAvatarInitial}>
                  {(partnerName || 'U').charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View
              style={[
                styles.presenceDot,
                partnerPresence.online ? styles.presenceOnline : styles.presenceOffline,
              ]}
            />
          </View>

          <View style={styles.partnerTextCol}>
            <View style={styles.partnerTitleRow}>
              <Text variant="titleSmall" numberOfLines={1} style={styles.partnerHeaderName}>
                {partnerName}
              </Text>
              <View style={styles.partnerRoleBadge}>
                <Text style={styles.partnerRoleBadgeText}>{partnerRole}</Text>
              </View>
            </View>

            <View style={styles.statusIndicatorRow}>
              {partnerIsTyping ? (
                <Text style={styles.typingStatusText}>
                  {translateDynamic('Typing...')}
                </Text>
              ) : partnerPresence.online ? (
                <Text style={styles.onlineStatusText}>
                  {translateDynamic('Online')}
                </Text>
              ) : (
                <Text style={styles.offlineStatusText}>
                  {getRelativePresenceTime(partnerPresence.lastSeen)}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* Action Controls */}
        <View style={styles.headerRightActions}>
          {part?.contactPhone ? (
            <TouchableOpacity
              style={styles.phoneCallBtn}
              onPress={handleCallPartner}
            >
              <Icon source="phone" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.langBtn}
            onPress={() => setShowLanguageModal(true)}
          >
            <Icon source="translate" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Linked Product Banner */}
      {part ? (
        <TouchableOpacity
          style={styles.productBanner}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ProductDetail', { part })}
        >
          <Image
            source={{
              uri:
                part.imageUrl ||
                part.partImageUrl ||
                'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=200',
            }}
            style={styles.productBannerImage}
          />
          <View style={styles.productBannerInfo}>
            <Text style={styles.inquiryLabel}>
              {translateDynamic('INQUIRY ABOUT')}
            </Text>
            <Text numberOfLines={1} style={styles.productBannerTitle}>
              {part.title || part.partTitle || 'Auto Spare Part'}
            </Text>
            <Text style={styles.productBannerPrice}>
              {formatPrice(Number(part.price || part.partPrice) || 0)}
            </Text>
          </View>
          <View style={styles.activeChatBadge}>
            <Text style={styles.activeChatBadgeText}>
              {translateDynamic('Active Chat')}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}

      {/* Message Feed List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageListContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        ListEmptyComponent={
          <View style={styles.emptyFeedContainer}>
            <View style={styles.emptyFeedIconCircle}>
              <Icon source="hand-wave" size={32} color="#1565FF" />
            </View>
            <Text variant="titleMedium" style={styles.emptyFeedTitle}>
              {translateDynamic('Start Conversation')}
            </Text>
            <Text variant="bodySmall" style={styles.emptyFeedSub}>
              {translateDynamic('Ask about part condition, negotiate price, or arrange courier delivery.')}
            </Text>

            {/* Quick replies block in empty state */}
            <View style={styles.emptyQuickRepliesWrapper}>
              <Text style={styles.quickReplyHeaderLabel}>
                ⚡ {translateDynamic('Quick Inquiries')}
              </Text>
              {getQuickReplies().map((replyText, idx) => (
                <TouchableOpacity
                  key={`empty-${idx}`}
                  style={styles.emptyQuickReplyBtn}
                  onPress={() => executeSend(replyText)}
                  disabled={isSending || isUploadingImage}
                >
                  <Text style={styles.emptyQuickReplyText}>{replyText}</Text>
                  <Icon source="arrow-top-right" size={14} color="#1565FF" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        ListFooterComponent={
          <>
            {partnerIsTyping && (
              <View style={styles.typingIndicatorBubble}>
                <Text style={styles.typingBubbleText}>
                  {partnerName} {translateDynamic('is typing...')}
                </Text>
                <ActivityIndicator size={10} color="#1565FF" />
              </View>
            )}
            {isUploadingImage && (
              <View style={styles.uploadingImageBubble}>
                <ActivityIndicator size={14} color="#1565FF" />
                <Text style={styles.uploadingImageText}>
                  {translateDynamic('Uploading image to Cloudinary...')}
                </Text>
              </View>
            )}
          </>
        }
      />

      {/* Quick Reply Bar above composer */}
      <View style={styles.quickRepliesBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickRepliesScroll}
        >
          <View style={styles.zapIconContainer}>
            <Icon source="flash" size={14} color="#F59E0B" />
          </View>
          {getQuickReplies().map((replyText, idx) => (
            <TouchableOpacity
              key={`bar-${idx}`}
              style={styles.quickReplyChip}
              onPress={() => executeSend(replyText)}
              disabled={isSending || isUploadingImage}
              activeOpacity={0.7}
            >
              <Text style={styles.quickReplyChipText}>{replyText}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Message Input Composer matching Web */}
      <View style={styles.composerContainer}>
        {/* Direct Camera Button */}
        <TouchableOpacity
          style={styles.mediaIconButton}
          onPress={handlePickImage}
          disabled={isUploadingImage || isSending}
          activeOpacity={0.7}
        >
          <Icon source="camera" size={22} color="#64748B" />
        </TouchableOpacity>

        {/* Direct Gallery Button */}
        <TouchableOpacity
          style={styles.mediaIconButton}
          onPress={handlePickImage}
          disabled={isUploadingImage || isSending}
          activeOpacity={0.7}
        >
          <Icon source="image-outline" size={22} color="#64748B" />
        </TouchableOpacity>

        {/* Text Input */}
        <TextInput
          placeholder={translateDynamic('Type a message...')}
          value={inputText}
          onChangeText={handleInputChange}
          mode="outlined"
          style={styles.composerInput}
          outlineColor="#E2E8F0"
          activeOutlineColor="#1565FF"
          placeholderTextColor="#94A3B8"
          multiline
          maxLength={1000}
          dense
        />

        {/* Send Button */}
        <TouchableOpacity
          style={[
            styles.sendButton,
            inputText.trim() ? styles.sendButtonActive : styles.sendButtonDisabled,
          ]}
          onPress={handleSendPress}
          disabled={!inputText.trim() || isSending}
          activeOpacity={0.8}
        >
          {isSending ? (
            <ActivityIndicator size={18} color="#FFFFFF" />
          ) : (
            <Icon source="send" size={18} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>

      {/* Fullscreen Image Preview Modal */}
      <Modal
        visible={!!selectedPreviewImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedPreviewImage(null)}
      >
        <View style={styles.imageModalContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <TouchableOpacity
            style={styles.closeImageModalBtn}
            onPress={() => setSelectedPreviewImage(null)}
          >
            <Icon source="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {selectedPreviewImage && (
            <Image
              source={{ uri: selectedPreviewImage }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        visible={showLanguageModal}
        onDismiss={() => setShowLanguageModal(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerBar: {
    backgroundColor: '#0B1220',
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#18233C',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  backBtn: {
    padding: 6,
    marginRight: 6,
    borderRadius: 20,
  },
  partnerHeaderInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerHeaderAvatarWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  partnerHeaderAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  partnerHeaderAvatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1565FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  partnerHeaderAvatarInitial: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  presenceDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#0B1220',
  },
  presenceOnline: {
    backgroundColor: '#10B981',
  },
  presenceOffline: {
    backgroundColor: '#64748B',
  },
  partnerTextCol: {
    flex: 1,
  },
  partnerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  partnerHeaderName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    maxWidth: '75%',
  },
  partnerRoleBadge: {
    backgroundColor: 'rgba(37, 99, 235, 0.3)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  partnerRoleBadgeText: {
    color: '#60A5FA',
    fontSize: 8,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  statusIndicatorRow: {
    marginTop: 1,
  },
  typingStatusText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '700',
  },
  onlineStatusText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '600',
  },
  offlineStatusText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '500',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  phoneCallBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  productBannerImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 10,
  },
  productBannerInfo: {
    flex: 1,
  },
  inquiryLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#2563EB',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productBannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 16,
  },
  productBannerPrice: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1E293B',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  activeChatBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  activeChatBadgeText: {
    color: '#059669',
    fontSize: 9,
    fontWeight: '800',
  },
  messageListContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexGrow: 1,
  },
  messageRow: {
    marginVertical: 4,
    flexDirection: 'row',
    maxWidth: '85%',
  },
  myMessageRow: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  theirMessageRow: {
    alignSelf: 'flex-start',
  },
  partnerBubbleAvatar: {
    marginRight: 6,
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  partnerSmallAvatarImg: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  partnerSmallAvatarPlaceholder: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1565FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerSmallAvatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bubbleWrapper: {
    maxWidth: '100%',
  },
  myBubbleWrapper: {
    alignItems: 'flex-end',
  },
  theirBubbleWrapper: {
    alignItems: 'flex-start',
  },
  bubbleBox: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 18,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  myBubble: {
    backgroundColor: '#1565FF',
    borderBottomRightRadius: 2,
  },
  failedBubble: {
    backgroundColor: '#EF4444',
    borderBottomRightRadius: 2,
  },
  theirBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  imageAttachmentContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 6,
    position: 'relative',
  },
  messageImage: {
    width: SCREEN_WIDTH * 0.58,
    height: 160,
    borderRadius: 12,
  },
  zoomOverlayIcon: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 3,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  theirMessageText: {
    color: '#0F172A',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    paddingHorizontal: 4,
    gap: 4,
  },
  myMetaRow: {
    justifyContent: 'flex-end',
  },
  theirMetaRow: {
    justifyContent: 'flex-start',
  },
  timeText: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '500',
  },
  statusTickContainer: {
    marginLeft: 2,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  retryText: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: 'bold',
  },
  typingIndicatorBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 4,
  },
  typingBubbleText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  uploadingImageBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(21, 101, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(21, 101, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  uploadingImageText: {
    fontSize: 11,
    color: '#1565FF',
    fontWeight: '700',
  },
  emptyFeedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyFeedIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyFeedTitle: {
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  emptyFeedSub: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 260,
    lineHeight: 18,
  },
  emptyQuickRepliesWrapper: {
    width: '100%',
    maxWidth: 320,
    marginTop: 20,
    gap: 6,
  },
  quickReplyHeaderLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    textAlign: 'center',
  },
  emptyQuickReplyBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyQuickReplyText: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  quickRepliesBar: {
    backgroundColor: '#F1F5F9',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 6,
  },
  quickRepliesScroll: {
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 6,
  },
  zapIconContainer: {
    paddingRight: 4,
  },
  quickReplyChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  quickReplyChipText: {
    color: '#1E40AF',
    fontSize: 11,
    fontWeight: '700',
  },
  composerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  composerInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    fontSize: 13,
    maxHeight: 90,
    marginHorizontal: 4,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  sendButtonActive: {
    backgroundColor: '#1565FF',
  },
  sendButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  imageModalContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeImageModalBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  fullscreenImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8,
  },
});
