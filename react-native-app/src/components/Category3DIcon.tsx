import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';
import { Icon } from 'react-native-paper';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
}

// 3D Category PNG Assets matching the reference design
const CATEGORY_3D_IMAGES: Record<string, any> = {
  engine: require('../assets/categories/engine.png'),
  body: require('../assets/categories/body.png'),
  electrical: require('../assets/categories/electricals.png'),
  electricals: require('../assets/categories/electricals.png'),
  suspension: require('../assets/categories/suspension.png'),
  exhaust: require('../assets/categories/exhaust.png'),
  more: require('../assets/categories/more.png'),
};

const CATEGORY_FALLBACK_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
  engine: { icon: 'engine', color: '#B45309', bg: '#FEF3C7' },
  body: { icon: 'car-door', color: '#0284C7', bg: '#E0F2FE' },
  electrical: { icon: 'lightning-bolt', color: '#CA8A04', bg: '#FEF9C3' },
  suspension: { icon: 'car-brake-alert', color: '#E11D48', bg: '#FFE4E6' },
  exhaust: { icon: 'pipe', color: '#475569', bg: '#F1F5F9' },
  more: { icon: 'apps', color: '#2563EB', bg: '#EFF6FF' },
};

/**
 * 3D Isometric Automotive Category Icon Renderer
 * Renders high-definition, realistic 3D assets for all 6 home categories.
 */
export const Category3DIcon: React.FC<CategoryIconProps> = ({
  type = 'more',
  size = 46,
  active = false,
  style,
}) => {
  const normType = String(type || '').toLowerCase().trim();

  // Find corresponding 3D image asset
  let imageSource = CATEGORY_3D_IMAGES[normType];
  if (!imageSource) {
    if (normType.includes('engine')) imageSource = CATEGORY_3D_IMAGES.engine;
    else if (normType.includes('body') || normType.includes('door')) imageSource = CATEGORY_3D_IMAGES.body;
    else if (normType.includes('elect') || normType.includes('light')) imageSource = CATEGORY_3D_IMAGES.electrical;
    else if (normType.includes('susp') || normType.includes('brake')) imageSource = CATEGORY_3D_IMAGES.suspension;
    else if (normType.includes('exh') || normType.includes('muffler')) imageSource = CATEGORY_3D_IMAGES.exhaust;
    else imageSource = CATEGORY_3D_IMAGES.more;
  }

  if (imageSource) {
    return (
      <View style={[styles.container, { width: size, height: size }, style]}>
        <Image
          source={imageSource}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Fallback vector icon
  const fallback = CATEGORY_FALLBACK_ICONS[normType] || CATEGORY_FALLBACK_ICONS.more;
  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor: fallback.bg, borderRadius: size * 0.35 }, style]}>
      <Icon source={fallback.icon} size={size * 0.55} color={fallback.color} />
    </View>
  );
};

export default Category3DIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
