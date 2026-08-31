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

export const CarBrandBadge: React.FC<{ brand: string; size?: number; active?: boolean }> = ({ brand, size = 32, active = false }) => {
  const b = (brand || '').toLowerCase();
  
  // Custom styled brand emblem representations
  if (b.includes('maruti') || b.includes('suzuki')) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: size * 0.7, fontWeight: '900', color: '#1E293B', fontStyle: 'italic', transform: [{ skewX: '-12deg' }] }}>
          S
        </Text>
      </View>
    );
  }
  if (b.includes('hyundai')) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.9, height: size * 0.65, borderRadius: size * 0.35, borderWidth: 2, borderColor: '#0B2050', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: size * 0.5, fontWeight: '900', color: '#0B2050', fontStyle: 'italic', transform: [{ skewX: '-15deg' }] }}>
            H
          </Text>
        </View>
      </View>
    );
  }
  if (b.includes('tata')) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.85, height: size * 0.85, borderRadius: size * 0.425, backgroundColor: '#0052CC', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: size * 0.52, fontWeight: '900', color: '#FFFFFF' }}>
            T
          </Text>
        </View>
      </View>
    );
  }
  if (b.includes('mahindra')) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: -2 }}>
          <Text style={{ fontSize: size * 0.65, fontWeight: '900', color: '#E11D48', letterSpacing: -3 }}>
            ∞
          </Text>
        </View>
      </View>
    );
  }
  if (b.includes('toyota')) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.9, height: size * 0.68, borderRadius: size * 0.35, borderWidth: 2.2, borderColor: '#0F172A', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: size * 0.45, height: size * 0.45, borderRadius: size * 0.22, borderWidth: 1.8, borderColor: '#0F172A' }} />
        </View>
      </View>
    );
  }
  if (b.includes('honda')) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.8, height: size * 0.8, borderRadius: 6, borderWidth: 2, borderColor: '#DC2626', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: size * 0.55, fontWeight: '900', color: '#DC2626' }}>
            H
          </Text>
        </View>
      </View>
    );
  }
  if (b.includes('ford')) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.95, height: size * 0.55, borderRadius: size * 0.28, backgroundColor: '#1D4ED8', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: size * 0.35, fontWeight: '900', color: '#FFFFFF', fontStyle: 'italic' }}>
            Ford
          </Text>
        </View>
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
