import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

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

// High-Fidelity Exact Vector Emblems for Indian Car Brands matching reference image
export const CarBrandBadge: React.FC<{ brand: string; size?: number; active?: boolean }> = ({ brand, size = 38, active = false }) => {
  const b = (brand || '').toLowerCase().trim();

  // 1. MARUTI SUZUKI: Official Suzuki S Geometric Emblem (Dual Chrome Slash)
  if (b.includes('maruti') || b.includes('suzuki')) {
    return (
      <View style={[styles.badgeContainer, { width: size, height: size }]}>
        <View style={styles.suzukiEmblem}>
          <View style={styles.suzukiTopSlash} />
          <View style={styles.suzukiMidCross} />
          <View style={styles.suzukiBottomSlash} />
        </View>
      </View>
    );
  }

  // 2. HYUNDAI: Official Slanted Oval H Chrome Emblem
  if (b.includes('hyundai')) {
    return (
      <View style={[styles.badgeContainer, { width: size, height: size }]}>
        <View style={styles.hyundaiOval}>
          <View style={styles.hyundaiLeftBar} />
          <View style={styles.hyundaiCrossBar} />
          <View style={styles.hyundaiRightBar} />
        </View>
      </View>
    );
  }

  // 3. TATA: Official Circular Blue Background with Crisp Chrome T Ring Emblem
  if (b.includes('tata')) {
    return (
      <View style={[styles.badgeContainer, { width: size, height: size }]}>
        <View style={styles.tataCircle}>
          <View style={styles.tataUpperArc} />
          <View style={styles.tataCenterStem} />
        </View>
      </View>
    );
  }

  // 4. MAHINDRA: Official Twin Peaks Infinity Red Butterfly Emblem
  if (b.includes('mahindra')) {
    return (
      <View style={[styles.badgeContainer, { width: size, height: size }]}>
        <View style={styles.mahindraTwinPeaks}>
          <View style={styles.mahindraPeakLeft} />
          <View style={styles.mahindraPeakRight} />
        </View>
      </View>
    );
  }

  // 5. TOYOTA: Official Triple Oval Chrome Emblem
  if (b.includes('toyota')) {
    return (
      <View style={[styles.badgeContainer, { width: size, height: size }]}>
        <View style={styles.toyotaOuterOval}>
          <View style={styles.toyotaInnerHorizontalOval} />
          <View style={styles.toyotaInnerVerticalOval} />
        </View>
      </View>
    );
  }

  // 6. HONDA: Chrome Squared H
  if (b.includes('honda')) {
    return (
      <View style={[styles.badgeContainer, { width: size, height: size }]}>
        <View style={styles.hondaTrapezoid}>
          <Text style={{ fontSize: size * 0.55, fontWeight: '900', color: '#0F172A' }}>H</Text>
        </View>
      </View>
    );
  }

  // 7. FORD: Blue Oval with Script
  if (b.includes('ford')) {
    return (
      <View style={[styles.badgeContainer, { width: size, height: size }]}>
        <View style={styles.fordBlueOval}>
          <Text style={{ fontSize: size * 0.35, fontWeight: '900', color: '#FFFFFF', fontStyle: 'italic' }}>Ford</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.badgeContainer, { width: size, height: size, backgroundColor: '#F8FAFC' }]}>
      <Text style={{ fontSize: size * 0.42, fontWeight: '800', color: '#0F172A' }}>
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

  // Brand badges precision geometry
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Suzuki S
  suzukiEmblem: {
    width: 26,
    height: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  suzukiTopSlash: {
    width: 20,
    height: 6,
    backgroundColor: '#475569',
    transform: [{ skewX: '-30deg' }],
    borderRadius: 1.5,
    borderTopWidth: 1,
    borderColor: '#94A3B8',
  },
  suzukiMidCross: {
    width: 14,
    height: 6,
    backgroundColor: '#334155',
    transform: [{ skewX: '30deg' }],
    borderRadius: 1.5,
  },
  suzukiBottomSlash: {
    width: 20,
    height: 6,
    backgroundColor: '#475569',
    transform: [{ skewX: '-30deg' }],
    borderRadius: 1.5,
    borderBottomWidth: 1,
    borderColor: '#1E293B',
  },

  // Hyundai Oval H
  hyundaiOval: {
    width: 32,
    height: 20,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hyundaiLeftBar: {
    position: 'absolute',
    left: 7,
    width: 3,
    height: 12,
    backgroundColor: '#0F172A',
    transform: [{ skewX: '-18deg' }],
    borderRadius: 1,
  },
  hyundaiCrossBar: {
    position: 'absolute',
    width: 12,
    height: 2.5,
    backgroundColor: '#0F172A',
  },
  hyundaiRightBar: {
    position: 'absolute',
    right: 7,
    width: 3,
    height: 12,
    backgroundColor: '#0F172A',
    transform: [{ skewX: '-18deg' }],
    borderRadius: 1,
  },

  // Tata Blue Ring
  tataCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#0052CC',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  tataUpperArc: {
    width: 16,
    height: 6,
    borderTopWidth: 2.5,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFFFFF',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: 1,
  },
  tataCenterStem: {
    width: 2.5,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },

  // Mahindra Twin Peaks Red Butterfly
  mahindraTwinPeaks: {
    width: 30,
    height: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
  },
  mahindraPeakLeft: {
    width: 13,
    height: 14,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 8,
    borderWidth: 2.5,
    borderColor: '#E11D48',
    transform: [{ rotate: '-12deg' }],
  },
  mahindraPeakRight: {
    width: 13,
    height: 14,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 8,
    borderWidth: 2.5,
    borderColor: '#E11D48',
    transform: [{ rotate: '12deg' }],
  },

  // Toyota Triple Oval
  toyotaOuterOval: {
    width: 32,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5,
    borderColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  toyotaInnerHorizontalOval: {
    position: 'absolute',
    top: 2,
    width: 18,
    height: 9,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  toyotaInnerVerticalOval: {
    position: 'absolute',
    width: 8,
    height: 14,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0F172A',
  },

  // Honda
  hondaTrapezoid: {
    width: 26,
    height: 22,
    borderWidth: 2,
    borderColor: '#0F172A',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Ford
  fordBlueOval: {
    width: 32,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#002C6C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
