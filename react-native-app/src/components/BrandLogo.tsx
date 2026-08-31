import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Image } from 'react-native';

interface BrandLogoProps {
  size?: number | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'icon' | 'horizontal' | 'full' | 'compact';
  theme?: 'light' | 'dark';
  showTagline?: boolean;
  style?: ViewStyle;
  className?: string;
}

export const ModernDeltaLogoIcon: React.FC<{ size?: number }> = ({ size = 48 }) => {
  const s = size;
  
  return (
    <View style={{ width: s, height: s, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: s, height: s, position: 'relative' }}>
        
        {/* White Left Pillar */}
        <View style={{
          position: 'absolute',
          left: s * 0.335,
          top: s * 0.12,
          width: s * 0.16,
          height: s * 0.56,
          backgroundColor: '#FFFFFF',
          transform: [{ skewX: '-20.56deg' }],
        }} />

        {/* White Right Pillar (Full) */}
        <View style={{
          position: 'absolute',
          left: s * 0.545,
          top: s * 0.12,
          width: s * 0.16,
          height: s * 0.56,
          backgroundColor: '#FFFFFF',
          transform: [{ skewX: '20.56deg' }],
        }} />

        {/* White Crossbar */}
        <View style={{
          position: 'absolute',
          left: s * 0.35,
          top: s * 0.46,
          width: s * 0.30,
          height: s * 0.10,
          backgroundColor: '#FFFFFF',
        }} />

        {/* Blue Right Pillar (Bottom Half) */}
        <View style={{
          position: 'absolute',
          left: s * 0.60875,
          top: s * 0.46,
          width: s * 0.16,
          height: s * 0.22,
          backgroundColor: '#0066FF',
          transform: [{ skewX: '20.56deg' }],
        }} />

        {/* Orange Accent */}
        <View style={{
          position: 'absolute',
          left: s * 0.36875,
          top: s * 0.72,
          width: s * 0.21,
          height: s * 0.06,
          backgroundColor: '#FF6B00',
          transform: [{ skewX: '-20.56deg' }],
        }} />

      </View>
    </View>
  );
};

// Real High-Definition Car Brand Logos with safe fallback
const BRAND_LOGO_URLS: Record<string, string> = {
  'maruti suzuki': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/suzuki.png',
  'maruti': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/suzuki.png',
  'suzuki': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/suzuki.png',
  'hyundai': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hyundai.png',
  'tata': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tata.png',
  'mahindra': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mahindra.png',
  'toyota': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/toyota.png',
  'honda': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/honda.png',
  'ford': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ford.png',
  'volkswagen': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/volkswagen.png',
  'kia': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/kia.png',
  'renault': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/renault.png',
  'bmw': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bmw.png',
  'audi': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/audi.png',
  'mercedes': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mercedes-benz.png',
  'skoda': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/skoda.png',
  'nissan': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/nissan.png',
  'chevrolet': 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/chevrolet.png',
};

export const CarBrandBadge: React.FC<{ brand: string; size?: number; active?: boolean }> = ({ brand, size = 32, active = false }) => {
  const b = (brand || '').toLowerCase().trim();
  const [hasError, setHasError] = React.useState(false);

  const logoUrl = Object.entries(BRAND_LOGO_URLS).find(([key]) => b.includes(key))?.[1];

  if (logoUrl && !hasError) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: size / 2, padding: 3, borderWidth: 1, borderColor: active ? '#1565FF' : '#E2E8F0' }}>
        <Image
          source={{ uri: logoUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
          onError={() => setHasError(true)}
        />
      </View>
    );
  }

  // Custom styled brand emblem representations fallback
  if (b.includes('maruti') || b.includes('suzuki')) {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: size * 0.6, fontWeight: '900', color: '#DC2626', fontStyle: 'italic', transform: [{ skewX: '-12deg' }] }}>
          S
        </Text>
      </View>
    );
  }
  if (b.includes('hyundai')) {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.8, height: size * 0.55, borderRadius: size * 0.28, borderWidth: 2, borderColor: '#002C6C', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: size * 0.45, fontWeight: '900', color: '#002C6C', fontStyle: 'italic', transform: [{ skewX: '-15deg' }] }}>
            H
          </Text>
        </View>
      </View>
    );
  }
  if (b.includes('tata')) {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#0052CC', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: size * 0.52, fontWeight: '900', color: '#FFFFFF' }}>
          T
        </Text>
      </View>
    );
  }
  if (b.includes('mahindra')) {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: size * 0.6, fontWeight: '900', color: '#E11D48' }}>
          M
        </Text>
      </View>
    );
  }
  if (b.includes('toyota')) {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.85, height: size * 0.6, borderRadius: size * 0.3, borderWidth: 2, borderColor: '#EB0A1E', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: size * 0.45, fontWeight: '900', color: '#EB0A1E' }}>T</Text>
        </View>
      </View>
    );
  }
  if (b.includes('honda')) {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: size * 0.6, fontWeight: '900', color: '#DC2626' }}>
          H
        </Text>
      </View>
    );
  }
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: size * 0.45, fontWeight: '800', color: '#0F172A' }}>
        {(brand || 'C').charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 48,
  variant = 'icon',
  theme = 'dark',
  showTagline = false,
  style,
}) => {
  let numSize = 48;
  if (typeof size === 'number') {
    numSize = size;
  } else if (size === 'sm') {
    numSize = 32;
  } else if (size === 'md') {
    numSize = 44;
  } else if (size === 'lg') {
    numSize = 56;
  } else if (size === 'xl') {
    numSize = 72;
  } else if (size === '2xl') {
    numSize = 96;
  }

  const isLight = theme === 'light';
  const textColor = isLight ? '#0F172A' : '#F8FAFC';
  const accentColor = '#0066FF';
  const subTextColor = isLight ? '#64748B' : '#94A3B8';

  if (variant === 'icon') {
    return (
      <View style={[styles.container, style]}>
        <ModernDeltaLogoIcon size={numSize} />
      </View>
    );
  }

  if (variant === 'horizontal') {
    return (
      <View style={[styles.horizontalContainer, style]}>
        <ModernDeltaLogoIcon size={numSize} />
        <View style={styles.textColumn}>
          <Text style={[styles.brandTitle, { color: textColor, fontSize: numSize * 0.4 }]}>
            Auto<Text style={{ color: accentColor }}>Parts</Text>
          </Text>
          {showTagline && (
            <Text style={[styles.tagline, { color: subTextColor, fontSize: numSize * 0.2 }]}>
              INDIA MARKETPLACE
            </Text>
          )}
        </View>
      </View>
    );
  }

  // Full / Default variant
  return (
    <View style={[styles.fullContainer, style]}>
      <ModernDeltaLogoIcon size={numSize} />
      <Text style={[styles.brandTitleFull, { color: textColor, fontSize: numSize * 0.28 }]}>
        Auto<Text style={{ color: accentColor }}>Parts</Text> India
      </Text>
      {showTagline && (
        <Text style={[styles.tagline, { color: subTextColor, fontSize: numSize * 0.16 }]}>
          Verified Genuine Auto Spares & Parts
        </Text>
      )}
    </View>
  );
};

export default BrandLogo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brandTitle: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tagline: {
    fontWeight: '600',
    letterSpacing: 0.8,
    marginTop: 1,
  },
  fullContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  brandTitleFull: {
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 8,
  },
});
