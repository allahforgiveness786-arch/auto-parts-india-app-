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
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  visible,
  part,
  initialIndex = 0,
  onDismiss,
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
        part ? (
          <SafeAreaView style={styles.footerOverlay} pointerEvents="none">
            <View style={styles.partInfoRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.partTitle} numberOfLines={1}>
                  {part.title}
                </Text>
                <Text style={styles.partSub}>
                  {part.carBrand} {part.carModel} • {part.condition}
                </Text>
              </View>
              <Text style={styles.partPrice}>
                ₹{Number(part.price || 0).toLocaleString('en-IN')}
              </Text>
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
    
    marginBottom: Platform.OS === 'ios' ? 40 : 24,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    zIndex: 9999,
    width: SCREEN_WIDTH - 32,
  },
  partInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  partSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  partPrice: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 8,
  },
});
