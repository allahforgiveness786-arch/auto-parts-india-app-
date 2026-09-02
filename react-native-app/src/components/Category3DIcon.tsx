import React, { useState } from 'react';
import { View, StyleSheet, Image, ViewStyle, StyleProp } from 'react-native';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Real Photorealistic Auto Parts Photography Images for Categories
 * Ensures 100% real auto parts photos instead of line drawings or icons.
 */
const CATEGORY_REAL_PHOTOS: Record<string, string> = {
  engine: 'https://images.unsplash.com/photo-1597739239353-50270a473397?auto=format&fit=crop&w=400&q=80',
  body: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
  electrical: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&q=80',
  suspension: 'https://images.unsplash.com/photo-1600706432523-9914c5b69ddc?auto=format&fit=crop&w=400&q=80',
  exhaust: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=400&q=80',
  wheel: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80',
  cooling: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=400&q=80',
  more: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=400&q=80',
};

export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 52, active = false, style }) => {
  const [loadError, setLoadError] = useState(false);
  const t = (type || 'more').toLowerCase().trim();

  let photoUrl = CATEGORY_REAL_PHOTOS.more;
  if (t.includes('engine') || t.includes('motor') || t.includes('piston') || t.includes('turbo')) {
    photoUrl = CATEGORY_REAL_PHOTOS.engine;
  } else if (t.includes('body') || t.includes('door') || t.includes('bumper') || t.includes('fender') || t.includes('panel')) {
    photoUrl = CATEGORY_REAL_PHOTOS.body;
  } else if (t.includes('elect') || t.includes('battery') || t.includes('light') || t.includes('spark') || t.includes('bolt')) {
    photoUrl = CATEGORY_REAL_PHOTOS.electrical;
  } else if (t.includes('suspension') || t.includes('shock') || t.includes('strut') || t.includes('spring') || t.includes('brake') || t.includes('steering')) {
    photoUrl = CATEGORY_REAL_PHOTOS.suspension;
  } else if (t.includes('exhaust') || t.includes('muffler') || t.includes('silencer') || t.includes('pipe')) {
    photoUrl = CATEGORY_REAL_PHOTOS.exhaust;
  } else if (t.includes('wheel') || t.includes('tyre') || t.includes('alloy') || t.includes('rim')) {
    photoUrl = CATEGORY_REAL_PHOTOS.wheel;
  } else if (t.includes('cool') || t.includes('ac') || t.includes('radiator')) {
    photoUrl = CATEGORY_REAL_PHOTOS.cooling;
  }

  return (
    <View 
      style={[
        styles.photoContainer, 
        { width: size, height: size, borderRadius: 14 },
        active && styles.photoContainerActive,
        style
      ]}
    >
      <Image 
        source={{ uri: photoUrl }}
        style={[styles.photoImage, { width: size - 4, height: size - 4, borderRadius: 12 }]}
        resizeMode="cover"
        onError={() => setLoadError(true)}
      />
      {active && <View style={[styles.activeOverlay, { borderRadius: 14 }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  photoContainerActive: {
    borderColor: '#002F34',
    borderWidth: 2,
    backgroundColor: '#E6F4F1',
  },
  photoImage: {
    backgroundColor: '#F1F5F9',
  },
  activeOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#002F34',
    opacity: 0.1,
  }
});

export default Category3DIcon;
