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
