import React from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export interface BrandLogoProps {
  name?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  active?: boolean;
}

// Authentic High-Definition Official Brand Logos via Wikimedia / Official CDNs
const BRAND_LOGO_URLS: Record<string, string> = {
  'maruti suzuki': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2016.svg/320px-Suzuki_logo_2016.svg.png',
  'maruti': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2016.svg/320px-Suzuki_logo_2016.svg.png',
  'suzuki': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2016.svg/320px-Suzuki_logo_2016.svg.png',
  'hyundai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/320px-Hyundai_Motor_Company_logo.svg.png',
  'tata': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/320px-Tata_logo.svg.png',
  'tata motors': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/320px-Tata_logo.svg.png',
  'mahindra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Mahindra_Rise_logo.svg/320px-Mahindra_Rise_logo.svg.png',
  'toyota': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_car_logo.svg/320px-Toyota_car_logo.svg.png',
  'honda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/320px-Honda_logo.svg.png',
  'kia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/KIA_logo2021.svg/320px-KIA_logo2021.svg.png',
  'volkswagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/320px-Volkswagen_logo_2019.svg.png',
  'bmw': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/320px-BMW.svg.png',
  'mercedes-benz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/320px-Mercedes-Logo.svg.png',
  'audi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/320px-Audi-Logo_2016.svg.png',
};

export function BrandLogo({ name = '', size = 32, style, active }: BrandLogoProps) {
  const safeSize = Number.isFinite(size) && size > 0 ? size : 32;
  const brandKey = String(name || '').toLowerCase().trim();
  const logoUrl = BRAND_LOGO_URLS[brandKey] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2016.svg/320px-Suzuki_logo_2016.svg.png';

  return (
    <View style={[styles.container, { width: safeSize * 1.3, height: safeSize }, style]}>
      <Image 
        source={{ uri: logoUrl }} 
        resizeMode="contain"
        style={{ width: safeSize * 1.2, height: safeSize * 0.85 }}
      />
    </View>
  );
}

export default BrandLogo;

export function CarBrandBadge(props: BrandLogoProps) {
  return <BrandLogo {...props} />;
}

export function GearSpeedLogoIcon({ size = 32 }: { size?: number }) {
  return <BrandLogo name="suzuki" size={size} />;
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
