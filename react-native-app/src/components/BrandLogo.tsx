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
      <View style={{ width: s * 0.85, height: s * 0.85, position: 'relative' }}>
        
        {/* White Left Pillar & Apex */}
        <View style={{
          position: 'absolute',
          left: s * 0.1,
          bottom: s * 0.22,
          width: s * 0.26,
          height: s * 0.65,
          backgroundColor: '#FFFFFF',
          transform: [{ skewX: '-24deg' }],
          borderWidth: 1,
          borderColor: '#E2E8F0',
          borderRightWidth: 0,
        }} />

        {/* Blue Right Pillar */}
        <View style={{
          position: 'absolute',
          right: s * 0.1,
          bottom: s * 0.22,
          width: s * 0.28,
          height: s * 0.65,
          backgroundColor: '#0066FF',
          transform: [{ skewX: '24deg' }],
        }} />

        {/* White Crossbar */}
        <View style={{
          position: 'absolute',
          bottom: s * 0.42,
          left: s * 0.2,
          width: s * 0.45,
          height: s * 0.18,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#E2E8F0',
        }} />

        {/* Top Cover (to smooth the apex) */}
        <View style={{
          position: 'absolute',
          top: -s * 0.05,
          left: s * 0.35,
          width: s * 0.15,
          height: s * 0.15,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderColor: '#E2E8F0',
        }} />

        {/* Orange Slanted Accent Line Below */}
        <View style={{
          position: 'absolute',
          bottom: s * 0.02,
          left: s * 0.2,
          width: s * 0.45,
          height: s * 0.12,
          backgroundColor: '#FF6B00',
          transform: [{ skewX: '-24deg' }],
          borderRadius: 2,
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
