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
  'maruti suzuki': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/300px-Suzuki_logo_2.svg.png',
  'maruti': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/300px-Suzuki_logo_2.svg.png',
  'suzuki': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/300px-Suzuki_logo_2.svg.png',
  'hyundai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/320px-Hyundai_Motor_Company_logo.svg.png',
  'tata': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/320px-Tata_logo.svg.png',
  'mahindra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Mahindra_Auto_logo.svg/320px-Mahindra_Auto_logo.svg.png',
  'toyota': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/320px-Toyota.svg.png',
  'honda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/320px-Honda_logo.svg.png',
  'ford': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/320px-Ford_Motor_Company_Logo.svg.png',
  'volkswagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/320px-Volkswagen_logo_2019.svg.png',
  'kia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/KIA_logo2.svg/320px-KIA_logo2.svg.png',
  'renault': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Renault_2021.svg/320px-Renault_2021.svg.png',
  'bmw': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/320px-BMW.svg.png',
  'audi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/320px-Audi-Logo_2016.svg.png',
  'mercedes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/320px-Mercedes-Logo.svg.png',
  'skoda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Skoda_Auto_logo_%282023%29.svg/320px-Skoda_Auto_logo_%282023%29.svg.png',
  'nissan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_2020_logo.svg/320px-Nissan_2020_logo.svg.png',
  'chevrolet': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/320px-Chevrolet-logo.png',
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
