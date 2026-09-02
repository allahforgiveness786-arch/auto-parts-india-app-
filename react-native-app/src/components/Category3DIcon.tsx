import React from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
}

/*
  Photorealistic 3D Studio Rendered Auto Part Images for Categories
  Replaces flat vector drawings with real high-resolution 3D studio cutout images
*/
const CATEGORY_3D_IMAGE_URLS: Record<string, string> = {
  'engine': 'https://images.unsplash.com/photo-1597766333694-88339b1a03a7?auto=format&fit=crop&w=400&q=80',
  'body': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
  'electrical': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&q=80',
  'suspension': 'https://images.unsplash.com/photo-1600706432502-77821c97a55f?auto=format&fit=crop&w=400&q=80',
  'exhaust': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
  'more': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80',
};

export function Category3DIcon({ type = 'more', size = 52, style }: CategoryIconProps) {
  const safeSize = Number.isFinite(size) && size > 0 ? size : 52;
  const key = String(type || 'more').toLowerCase().trim();
  
  let imageUrl = CATEGORY_3D_IMAGE_URLS['more'];
  if (key.includes('engine') || key.includes('motor') || key.includes('piston')) {
    imageUrl = CATEGORY_3D_IMAGE_URLS['engine'];
  } else if (key.includes('body') || key.includes('door') || key.includes('bumper')) {
    imageUrl = CATEGORY_3D_IMAGE_URLS['body'];
  } else if (key.includes('elect') || key.includes('battery') || key.includes('bolt') || key.includes('light')) {
    imageUrl = CATEGORY_3D_IMAGE_URLS['electrical'];
  } else if (key.includes('suspension') || key.includes('brake') || key.includes('shock') || key.includes('strut')) {
    imageUrl = CATEGORY_3D_IMAGE_URLS['suspension'];
  } else if (key.includes('exhaust') || key.includes('muffler') || key.includes('pipe')) {
    imageUrl = CATEGORY_3D_IMAGE_URLS['exhaust'];
  }

  return (
    <View style={[styles.container, { width: safeSize, height: safeSize }, style]}>
      <Image
        source={{ uri: imageUrl }}
        resizeMode="cover"
        style={{
          width: safeSize,
          height: safeSize,
          borderRadius: 12,
        }}
      />
    </View>
  );
}

export default Category3DIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 12,
  },
});
