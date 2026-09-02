import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';

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
 * Authentic, Indestructible High-Definition Automotive Brand Badges
 * Uses official brand emblem images for Maruti Suzuki, Hyundai, Tata, Mahindra, Toyota.
 * Zero network reliance, 100% reliable offline rendering matching the reference mockup.
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

  if (matchedImage) {
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

  // 2. Fallback stylized vector badges for other brands
  const renderFallback = () => {
    if (brandKey.includes('honda')) {
      return (
        <View style={[styles.badgeBase, { width: safeSize * 1.25, height: safeSize, borderRadius: 6, backgroundColor: '#FFFFFF', borderColor: '#334155', borderWidth: 2 }]}>
          <Text style={{ color: '#0F172A', fontWeight: '900', fontSize: safeSize * 0.58 }}>H</Text>
        </View>
      );
    }

    if (brandKey.includes('kia')) {
      return (
        <View style={[styles.badgeBase, { width: safeSize * 1.35, height: safeSize, borderRadius: safeSize * 0.5, backgroundColor: '#0F172A', borderColor: '#334155' }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: '900', fontSize: safeSize * 0.38, letterSpacing: 1.5 }}>KIA</Text>
        </View>
      );
    }

    if (brandKey.includes('volkswagen') || brandKey === 'vw') {
      return (
        <View style={[styles.badgeBase, { width: safeSize, height: safeSize, borderRadius: safeSize * 0.5, backgroundColor: '#001E50', borderColor: '#38BDF8', borderWidth: 1.5 }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: '900', fontSize: safeSize * 0.42, letterSpacing: -1 }}>VW</Text>
        </View>
      );
    }

    if (brandKey.includes('ford')) {
      return (
        <View style={[styles.badgeBase, { width: safeSize * 1.4, height: safeSize * 0.9, borderRadius: safeSize * 0.45, backgroundColor: '#002C6C', borderColor: '#E2E8F0', borderWidth: 1.5 }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: '900', fontSize: safeSize * 0.42, fontStyle: 'italic', letterSpacing: 0.5 }}>Ford</Text>
        </View>
      );
    }

    if (brandKey.includes('bmw')) {
      return (
        <View style={[styles.badgeBase, { width: safeSize, height: safeSize, borderRadius: safeSize * 0.5, backgroundColor: '#0F172A', borderWidth: 1.5, borderColor: '#94A3B8', overflow: 'hidden' }]}>
          <View style={{ width: '100%', height: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
            <View style={{ width: '50%', height: '50%', backgroundColor: '#0066B1' }} />
            <View style={{ width: '50%', height: '50%', backgroundColor: '#FFFFFF' }} />
            <View style={{ width: '50%', height: '50%', backgroundColor: '#FFFFFF' }} />
            <View style={{ width: '50%', height: '50%', backgroundColor: '#0066B1' }} />
          </View>
        </View>
      );
    }

    if (brandKey.includes('audi')) {
      return (
        <View style={[styles.badgeBase, { width: safeSize * 1.45, height: safeSize * 0.75, backgroundColor: '#F8FAFC', borderRadius: 4, borderColor: '#CBD5E1' }]}>
          <Text style={{ color: '#334155', fontWeight: '900', fontSize: safeSize * 0.38, letterSpacing: -2 }}>OOOO</Text>
        </View>
      );
    }

    if (brandKey.includes('mercedes')) {
      return (
        <View style={[styles.badgeBase, { width: safeSize, height: safeSize, borderRadius: safeSize * 0.5, backgroundColor: '#0F172A', borderColor: '#CBD5E1', borderWidth: 1.5 }]}>
          <Text style={{ color: '#F8FAFC', fontWeight: '900', fontSize: safeSize * 0.55 }}>★</Text>
        </View>
      );
    }

    // Generic Brand Initial
    const initial = (brand || name || 'A').charAt(0).toUpperCase();
    return (
      <View style={[styles.badgeBase, { width: safeSize * 1.2, height: safeSize, borderRadius: 8, backgroundColor: '#1E293B', borderColor: '#334155' }]}>
        <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: safeSize * 0.5 }}>{initial}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderFallback()}
    </View>
  );
}

export function CarBrandBadge(props: BrandLogoProps) {
  return <BrandLogo {...props} />;
}

export function GearSpeedLogoIcon({ size = 32 }: { size?: number }) {
  return <BrandLogo name="suzuki" size={size} />;
}

export default BrandLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeBase: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
});
