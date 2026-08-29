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

export const ModernDeltaLogoIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
}) => {
  // Renders the exact geometric triple chevron with lower diamond motif
  // Using pure Native Vector shape layers with high precision proportions
  const s = size;
  return (
    <View
      style={{
        width: s,
        height: s,
        backgroundColor: '#000000',
        borderRadius: s * 0.22,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1E293B',
      }}
    >
      <View
        style={{
          width: s * 0.85,
          height: s * 0.85,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Top Outer Blue Delta Chevron */}
        <View
          style={{
            position: 'absolute',
            top: s * 0.04,
            width: 0,
            height: 0,
            borderLeftWidth: s * 0.38,
            borderRightWidth: s * 0.38,
            borderBottomWidth: s * 0.42,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#0066FF',
          }}
        />

        {/* Middle White Chevron Layer */}
        <View
          style={{
            position: 'absolute',
            top: s * 0.16,
            width: 0,
            height: 0,
            borderLeftWidth: s * 0.28,
            borderRightWidth: s * 0.28,
            borderBottomWidth: s * 0.32,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#FFFFFF',
          }}
        />

        {/* Inner Blue Chevron */}
        <View
          style={{
            position: 'absolute',
            top: s * 0.29,
            width: 0,
            height: 0,
            borderLeftWidth: s * 0.18,
            borderRightWidth: s * 0.18,
            borderBottomWidth: s * 0.22,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#0066FF',
          }}
        />

        {/* Cutout / Depth shadow */}
        <View
          style={{
            position: 'absolute',
            top: s * 0.40,
            width: 0,
            height: 0,
            borderLeftWidth: s * 0.1,
            borderRightWidth: s * 0.1,
            borderBottomWidth: s * 0.12,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#000000',
          }}
        />

        {/* Bottom Diamond Apex Accent */}
        <View
          style={{
            position: 'absolute',
            bottom: s * 0.05,
            width: s * 0.11,
            height: s * 0.11,
            backgroundColor: '#FFFFFF',
            transform: [{ rotate: '45deg' }],
          }}
        />
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
