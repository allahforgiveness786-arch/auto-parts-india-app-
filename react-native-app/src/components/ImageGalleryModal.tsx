import React from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { SparePart } from '../types';
import ImageView from 'react-native-image-viewing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ImageGalleryModalProps {
  visible: boolean;
  part: SparePart | null;
  initialIndex?: number;
  onDismiss: () => void;
  onChat?: () => void;
  onCall?: () => void;
  isOwner?: boolean;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  visible,
  part,
  initialIndex = 0,
  onDismiss,
  onChat,
  onCall,
  isOwner = false,
}) => {
  const images: string[] = [];
  if (part) {
    if (part.imageUrls && part.imageUrls.length > 0) {
      part.imageUrls.forEach((url) => {
        if (url && !images.includes(url)) images.push(url);
      });
    } else if (part.imageUrl) {
      images.push(part.imageUrl);
    }
  }
  if (images.length === 0) {
    images.push('https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80');
  }

  const formattedImages = images.map((url) => ({ uri: url }));

  return (
    <ImageView
      images={formattedImages}
      imageIndex={initialIndex}
      visible={visible}
      onRequestClose={onDismiss}
      swipeToCloseEnabled={true}
      doubleTapToZoomEnabled={true}
      HeaderComponent={({ imageIndex }) => (
        <SafeAreaView style={styles.topBar} pointerEvents="box-none">
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={onDismiss}
            activeOpacity={0.7}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Icon source="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>
              {imageIndex + 1} / {images.length}
            </Text>
          </View>
          <View style={{ width: 40 }} pointerEvents="none" />
        </SafeAreaView>
      )}
      FooterComponent={() => 
        part && !isOwner && (onChat || onCall) ? (
          <SafeAreaView style={styles.footerOverlay}>
            <View style={styles.actionBtnRow}>
              {onChat && (
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.chatBtn}
                  onPress={() => {
                    onDismiss();
                    setTimeout(() => {
                      onChat();
                    }, 100);
                  }}
                >
                  <Icon source="message-text" size={19} color="#FFFFFF" />
                  <Text style={styles.chatBtnText}>Chat</Text>
                </TouchableOpacity>
              )}
              {onCall && (
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.callBtn}
                  onPress={() => {
                    onCall();
                  }}
                >
                  <Icon source="phone" size={19} color="#0B1220" />
                  <Text style={styles.callBtnText}>Call</Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        ) : <View />
      }
    />
  );
};

const styles = StyleSheet.create({
  topBar: {
    
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    left: 16,
    right: 16,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - 32,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBadge: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  counterText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  footerOverlay: {
    marginBottom: Platform.OS === 'ios' ? 40 : 28,
    left: 16,
    right: 16,
    zIndex: 9999,
    width: SCREEN_WIDTH - 32,
  },
  actionBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chatBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#1565FF',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  chatBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  callBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  callBtnText: {
    color: '#0B1220',
    fontSize: 15,
    fontWeight: '700',
  },
});
