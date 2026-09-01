import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const BRAND_LOGO_URLS: Record<string, string> = {
  suzuki: 'https://www.carlogos.org/car-logos/suzuki-logo.png',
  maruti: 'https://www.carlogos.org/car-logos/suzuki-logo.png',
  hyundai: 'https://www.carlogos.org/car-logos/hyundai-logo.png',
  tata: 'https://www.carlogos.org/car-logos/tata-motors-logo.png',
  mahindra: 'https://www.carlogos.org/car-logos/mahindra-logo.png',
  toyota: 'https://www.carlogos.org/car-logos/toyota-logo.png',
  honda: 'https://www.carlogos.org/car-logos/honda-logo.png',
  volkswagen: 'https://www.carlogos.org/car-logos/volkswagen-logo.png',
  ford: 'https://www.carlogos.org/car-logos/ford-logo.png',
  kia: 'https://www.carlogos.org/car-logos/kia-logo.png',
  bmw: 'https://www.carlogos.org/car-logos/bmw-logo.png',
  mercedes: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png',
  audi: 'https://www.carlogos.org/car-logos/audi-logo.png',
  skoda: 'https://www.carlogos.org/car-logos/skoda-logo.png',
  renault: 'https://www.carlogos.org/car-logos/renault-logo.png',
  nissan: 'https://www.carlogos.org/car-logos/nissan-logo.png',
  mg: 'https://www.carlogos.org/car-logos/mg-logo.png',
};

export const SuzukiEmblemSvg: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <CarBrandBadge brand="suzuki" size={size} />
);

export const HyundaiEmblemSvg: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <CarBrandBadge brand="hyundai" size={size} />
);

export const TataEmblemSvg: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <CarBrandBadge brand="tata" size={size} />
);

export const MahindraEmblemSvg: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <CarBrandBadge brand="mahindra" size={size} />
);

export const ToyotaEmblemSvg: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <CarBrandBadge brand="toyota" size={size} />
);

export interface CarBrandBadgeProps {
  brand?: string;
  size?: number;
  active?: boolean;
  style?: any;
}

export const CarBrandBadge: React.FC<CarBrandBadgeProps> = ({
  brand = 'All',
  size = 38,
  active = false,
  style,
}) => {
  const b = (brand || '').toLowerCase().trim();
  const [loadError, setLoadError] = useState(false);

  // Match key
  let brandKey = '';
  if (b.includes('maruti') || b.includes('suzuki')) brandKey = 'suzuki';
  else if (b.includes('hyundai')) brandKey = 'hyundai';
  else if (b.includes('tata')) brandKey = 'tata';
  else if (b.includes('mahindra')) brandKey = 'mahindra';
  else if (b.includes('toyota')) brandKey = 'toyota';
  else if (b.includes('honda')) brandKey = 'honda';
  else if (b.includes('volkswagen') || b.includes('vw')) brandKey = 'volkswagen';
  else if (b.includes('ford')) brandKey = 'ford';
  else if (b.includes('kia')) brandKey = 'kia';
  else if (b.includes('bmw')) brandKey = 'bmw';
  else if (b.includes('mercedes') || b.includes('benz')) brandKey = 'mercedes';
  else if (b.includes('audi')) brandKey = 'audi';
  else if (b.includes('skoda')) brandKey = 'skoda';
  else if (b.includes('renault')) brandKey = 'renault';
  else if (b.includes('nissan')) brandKey = 'nissan';
  else if (b.includes('mg')) brandKey = 'mg';

  const logoUrl = brandKey ? BRAND_LOGO_URLS[brandKey] : null;

  let content = null;

  if (logoUrl && !loadError) {
    const imgSize = Math.floor(size * 0.78);
    content = (
      <View
        style={[
          styles.badgeContainer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: active ? '#EFF6FF' : '#FFFFFF',
            borderColor: active ? '#1565FF' : '#E2E8F0',
          },
        ]}
      >
        <Image
          source={{ uri: logoUrl }}
          style={{ width: imgSize, height: imgSize }}
          resizeMode="contain"
          onError={() => setLoadError(true)}
        />
      </View>
    );
  } else {
    const initial = (brand || 'A').charAt(0).toUpperCase();
    content = (
      <View
        style={[
          styles.badgeContainer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: active ? '#1565FF' : '#F1F5F9',
            borderColor: active ? '#1565FF' : '#E2E8F0',
          },
        ]}
      >
        <Text
          style={{
            fontSize: Math.max(12, Math.floor(size * 0.42)),
            fontWeight: '800',
            color: active ? '#FFFFFF' : '#334155',
          }}
        >
          {initial}
        </Text>
      </View>
    );
  }

  if (style) {
    return <View style={style}>{content}</View>;
  }

  return content;
};

const styles = StyleSheet.create({
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
});

export const BrandLogo = CarBrandBadge;
export default CarBrandBadge;
