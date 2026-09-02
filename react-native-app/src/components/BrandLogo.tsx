import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';

export interface BrandLogoProps {
  name?: string;
  brand?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  active?: boolean;
}

// Authentic High-Resolution Automotive Brand PNGs
const BRAND_IMAGES: Record<string, any> = {
  maruti: require('../assets/brands/maruti_suzuki.png'),
  suzuki: require('../assets/brands/maruti_suzuki.png'),
  'maruti suzuki': require('../assets/brands/maruti_suzuki.png'),
  hyundai: require('../assets/brands/hyundai.png'),
  tata: require('../assets/brands/tata.png'),
  mahindra: require('../assets/brands/mahindra.png'),
  toyota: require('../assets/brands/toyota.png'),
};

/**
 * Authentic High-Definition Automotive Brand Badges
 * Uses official brand emblem images for Maruti Suzuki, Hyundai, Tata, Mahindra, Toyota.
 * 100% reliable offline rendering matching the reference mockup.
 */
export function BrandLogo({ name = '', brand = '', size = 32, style, active }: BrandLogoProps) {
  const safeSize = Number.isFinite(size) && size > 0 ? size : 32;
  const brandKey = String(brand || name || '').toLowerCase().trim();

  // 1. Direct match for official brand images
  let matchedImage = BRAND_IMAGES[brandKey];
  if (!matchedImage) {
    for (const key of Object.keys(BRAND_IMAGES)) {
      if (brandKey.includes(key) || key.includes(brandKey)) {
        matchedImage = BRAND_IMAGES[key];
        break;
      }
    }
  }

  // Fallback to Maruti Suzuki emblem if brand is not specifically recognized
  if (!matchedImage) {
    matchedImage = BRAND_IMAGES.maruti;
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        source={matchedImage}
        style={{ width: safeSize * 1.2, height: safeSize * 1.2 }}
        resizeMode="contain"
      />
    </View>
  );
}

export function CarBrandBadge(props: BrandLogoProps) {
  return <BrandLogo {...props} />;
}

export default BrandLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
