import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';

export interface BrandLogoProps {
  name?: string;
  brand?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  active?: boolean;
  variant?: 'icon' | 'full' | string;
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
  honda: require('../assets/brands/honda.png'),
  kia: require('../assets/brands/kia.png'),
  volkswagen: require('../assets/brands/volkswagen.png'),
  vw: require('../assets/brands/volkswagen.png'),
};

const APP_LOGO = require('../assets/logo.png');
const APP_LOGO_ICON = require('../assets/logo_icon.png');

/**
 * Authentic High-Definition Automotive Brand Badges & Official App Logo
 * When brand is passed, renders official OEM emblem (Maruti, Hyundai, Tata, etc.)
 * When brand is empty, renders official Auto Parts India App Logo
 */
export function BrandLogo({ name = '', brand = '', size = 32, style, active, variant = 'full' }: BrandLogoProps) {
  const safeSize = Number.isFinite(size) && size > 0 ? size : 32;
  const brandKey = String(brand || '').toLowerCase().trim();

  // 1. If Car Brand is specified
  if (brandKey) {
    let matchedImage = BRAND_IMAGES[brandKey];
    if (!matchedImage) {
      for (const key of Object.keys(BRAND_IMAGES)) {
        if (brandKey.includes(key) || key.includes(brandKey)) {
          matchedImage = BRAND_IMAGES[key];
          break;
        }
      }
    }

    if (matchedImage) {
      return (
        <View style={[styles.container, style]}>
          <Image
            source={matchedImage}
            style={{ width: safeSize, height: safeSize }}
            resizeMode="contain"
          />
        </View>
      );
    }
  }

  // 2. App Official Logo
  const logoSource = variant === 'icon' ? APP_LOGO_ICON : APP_LOGO;

  return (
    <View style={[styles.container, style]}>
      <Image
        source={logoSource}
        style={{ width: safeSize * 1.5, height: safeSize }}
        resizeMode="contain"
      />
    </View>
  );
}

export function CarBrandBadge(props: BrandLogoProps) {
  return <BrandLogo {...props} />;
}

export function GearSpeedLogoIcon({ size = 48, style }: { size?: number; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={APP_LOGO_ICON}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
}

export default BrandLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

