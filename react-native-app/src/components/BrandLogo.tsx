import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-paper';

export interface BrandLogoProps {
  name?: string;
  size?: number;
  color?: string;
  showText?: boolean;
  style?: any;
  active?: boolean;
}

/**
 * Authentic Official Car Brand Logos with Transparent Backgrounds
 * Sourced from high-resolution, official vector brand assets.
 * 
 * Supports:
 * - Maruti Suzuki
 * - Hyundai
 * - Tata Motors
 * - Mahindra
 * - Toyota
 * - Honda
 * - Kia
 * - Volkswagen
 * - Ford
 * - Nissan, Renault, BMW, Mercedes-Benz, Audi, Skoda, MG, Jeep
 */
const BRAND_LOGO_URLS: Record<string, string> = {
  // Maruti Suzuki / Suzuki
  'maruti': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/320px-Suzuki_logo_2.svg.png',
  'suzuki': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/320px-Suzuki_logo_2.svg.png',
  'maruti suzuki': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/320px-Suzuki_logo_2.svg.png',
  
  // Hyundai
  'hyundai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/320px-Hyundai_Motor_Company_logo.svg.png',
  
  // Tata Motors
  'tata': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/320px-Tata_logo.svg.png',
  'tata motors': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/320px-Tata_logo.svg.png',
  
  // Mahindra
  'mahindra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Mahindra_Rise_2021.svg/320px-Mahindra_Rise_2021.svg.png',
  'mahindra & mahindra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Mahindra_Rise_2021.svg/320px-Mahindra_Rise_2021.svg.png',
  
  // Toyota
  'toyota': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/320px-Toyota.svg.png',
  
  // Honda
  'honda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/320px-Honda_Logo.svg.png',
  
  // Kia
  'kia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/KIA_logo2.svg/320px-KIA_logo2.svg.png',
  
  // Volkswagen
  'volkswagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/320px-Volkswagen_logo_2019.svg.png',
  'vw': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/320px-Volkswagen_logo_2019.svg.png',
  
  // Ford
  'ford': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/320px-Ford_Motor_Company_Logo.svg.png',

  // Additional Brands
  'nissan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Nissan_logo.png/320px-Nissan_logo.png',
  'renault': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Renault_2021.svg/320px-Renault_2021.svg.png',
  'bmw': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/320px-BMW.svg.png',
  'mercedes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/320px-Mercedes-Logo.svg.png',
  'mercedes-benz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/320px-Mercedes-Logo.svg.png',
  'audi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/320px-Audi-Logo_2016.svg.png',
  'skoda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/%C5%A0koda_wordmark_2022.svg/320px-%C5%A0koda_wordmark_2022.svg.png',
  'mg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/MG_Motor_logo.svg/320px-MG_Motor_logo.svg.png',
  'jeep': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Jeep_logo.svg/320px-Jeep_logo.svg.png',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({ name, size = 36, showText = false, style, active = false }) => {
  const [loadError, setLoadError] = useState(false);
  const norm = (name || '').toLowerCase().trim();
  
  const logoUri = BRAND_LOGO_URLS[norm] || Object.entries(BRAND_LOGO_URLS).find(([key]) => norm.includes(key))?.[1];

  // Bounding box dimensions with fixed aspect-ratio area
  const boxWidth = Math.round(size * 1.3);
  const boxHeight = size;

  if (logoUri && !loadError) {
    return (
      <View style={[styles.container, { width: boxWidth, height: boxHeight }, style]}>
        <Image
          source={{ uri: logoUri }}
          style={styles.logoImage}
          resizeMode="contain"
          onError={() => setLoadError(true)}
        />
      </View>
    );
  }

  // Graceful fallback OEM badge with initial
  const initial = (name || 'C').charAt(0).toUpperCase();
  return (
    <View style={[styles.fallbackContainer, { width: size, height: size, borderRadius: size / 2 }, style]}>
      <Text style={[styles.fallbackText, { fontSize: Math.round(size * 0.45) }]}>
        {initial}
      </Text>
    </View>
  );
};

export const CarBrandBadge: React.FC<{ brand: string; size?: number; active?: boolean }> = ({ brand, size = 32, active = false }) => {
  return <BrandLogo name={brand} size={size} active={active} />;
};

export const SuzukiLogoSvg = () => <BrandLogo name="suzuki" />;
export const ToyotaLogoSvg = () => <BrandLogo name="toyota" />;
export const MahindraLogoSvg = () => <BrandLogo name="mahindra" />;
export const HyundaiLogoSvg = () => <BrandLogo name="hyundai" />;
export const TataLogoSvg = () => <BrandLogo name="tata" />;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  fallbackText: {
    color: '#1565FF',
    fontWeight: '800',
  },
});

export default BrandLogo;
