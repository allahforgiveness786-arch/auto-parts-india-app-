import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

// 1. Maruti Suzuki Emblem
export const SuzukiEmblemSvg: React.FC<{ size?: number }> = ({ size = 38 }) => {
  const scale = size / 38;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={{ width: 38, height: 38, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        {/* Upper S Diagonal */}
        <View style={styles.suzukiTopBar} />
        {/* Middle Connecting S Stroke */}
        <View style={styles.suzukiMidBar} />
        {/* Bottom S Diagonal */}
        <View style={styles.suzukiBottomBar} />
      </View>
    </View>
  );
};

// 2. Hyundai Slanted Oval H Emblem
export const HyundaiEmblemSvg: React.FC<{ size?: number }> = ({ size = 38 }) => {
  const scale = size / 38;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={{ width: 38, height: 38, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        {/* Oval Outer Ring */}
        <View style={styles.hyundaiOval}>
          {/* Slanted H Left Leg */}
          <View style={styles.hyundaiLegLeft} />
          {/* Slanted H Right Leg */}
          <View style={styles.hyundaiLegRight} />
          {/* H Cross Connector */}
          <View style={styles.hyundaiCrossBar} />
        </View>
      </View>
    </View>
  );
};

// 3. Tata Motors Circular T Emblem
export const TataEmblemSvg: React.FC<{ size?: number }> = ({ size = 38 }) => {
  const scale = size / 38;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={{ width: 38, height: 38, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        {/* Blue Circle Base */}
        <View style={styles.tataCircle}>
          {/* Top Arc Ring */}
          <View style={styles.tataTopArc} />
          {/* T Vertical Stem */}
          <View style={styles.tataStem} />
        </View>
      </View>
    </View>
  );
};

// 4. Mahindra Twin Peaks Red Butterfly Emblem
export const MahindraEmblemSvg: React.FC<{ size?: number }> = ({ size = 38 }) => {
  const scale = size / 38;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={{ width: 38, height: 38, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.mahindraRow}>
          {/* Left Wing Loop */}
          <View style={styles.mahindraWingLeft} />
          {/* Right Wing Loop */}
          <View style={styles.mahindraWingRight} />
        </View>
      </View>
    </View>
  );
};

// 5. Toyota Triple Oval Emblem
export const ToyotaEmblemSvg: React.FC<{ size?: number }> = ({ size = 38 }) => {
  const scale = size / 38;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={{ width: 38, height: 38, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        {/* Outer Ellipse */}
        <View style={styles.toyotaOuterOval}>
          {/* Inner Horizontal Oval */}
          <View style={styles.toyotaInnerHorizOval} />
          {/* Inner Vertical Oval */}
          <View style={styles.toyotaInnerVertOval} />
        </View>
      </View>
    </View>
  );
};

// Combined Brand Component supporting both High-Res Official CDN and Direct Vector Fallbacks
export const CarBrandBadge: React.FC<{ brand: string; size?: number; active?: boolean }> = ({ brand, size = 38, active = false }) => {
  const b = (brand || '').toLowerCase().trim();

  if (b.includes('maruti') || b.includes('suzuki')) {
    return <SuzukiEmblemSvg size={size} />;
  }
  if (b.includes('hyundai')) {
    return <HyundaiEmblemSvg size={size} />;
  }
  if (b.includes('tata')) {
    return <TataEmblemSvg size={size} />;
  }
  if (b.includes('mahindra')) {
    return <MahindraEmblemSvg size={size} />;
  }
  if (b.includes('toyota')) {
    return <ToyotaEmblemSvg size={size} />;
  }

  return (
    <View style={[styles.center, { width: size, height: size, backgroundColor: '#F8FAFC', borderRadius: size / 2 }]}>
      <Text style={{ fontSize: size * 0.42, fontWeight: '800', color: active ? '#1565FF' : '#0F172A' }}>
        {(brand || 'C').charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 1. SUZUKI
  suzukiTopBar: {
    position: 'absolute',
    top: 6,
    left: 8,
    width: 22,
    height: 7,
    backgroundColor: '#64748B',
    transform: [{ skewX: '-45deg' }],
    borderRadius: 1.5,
  },
  suzukiMidBar: {
    position: 'absolute',
    top: 15,
    width: 20,
    height: 8,
    backgroundColor: '#475569',
    transform: [{ skewX: '45deg' }],
    borderRadius: 1.5,
  },
  suzukiBottomBar: {
    position: 'absolute',
    bottom: 6,
    right: 8,
    width: 22,
    height: 7,
    backgroundColor: '#64748B',
    transform: [{ skewX: '-45deg' }],
    borderRadius: 1.5,
  },

  // 2. HYUNDAI
  hyundaiOval: {
    width: 34,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    transform: [{ rotate: '-6deg' }],
  },
  hyundaiLegLeft: {
    position: 'absolute',
    left: 8,
    width: 3.5,
    height: 16,
    backgroundColor: '#0F172A',
    transform: [{ skewX: '-15deg' }],
    borderRadius: 1,
  },
  hyundaiLegRight: {
    position: 'absolute',
    right: 8,
    width: 3.5,
    height: 16,
    backgroundColor: '#0F172A',
    transform: [{ skewX: '-15deg' }],
    borderRadius: 1,
  },
  hyundaiCrossBar: {
    width: 14,
    height: 3,
    backgroundColor: '#0F172A',
    transform: [{ skewX: '-15deg' }],
  },

  // 3. TATA
  tataCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tataTopArc: {
    position: 'absolute',
    top: 5,
    width: 18,
    height: 10,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    borderBottomWidth: 0,
  },
  tataStem: {
    position: 'absolute',
    top: 12,
    width: 3,
    height: 11,
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5,
  },

  // 4. MAHINDRA
  mahindraRow: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mahindraWingLeft: {
    width: 15,
    height: 18,
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: '#DC2626',
    transform: [{ rotate: '25deg' }],
  },
  mahindraWingRight: {
    width: 15,
    height: 18,
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: '#DC2626',
    transform: [{ rotate: '-25deg' }],
  },

  // 5. TOYOTA
  toyotaOuterOval: {
    width: 34,
    height: 24,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  toyotaInnerHorizOval: {
    position: 'absolute',
    top: 2,
    width: 22,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  toyotaInnerVertOval: {
    position: 'absolute',
    top: 2,
    width: 10,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0F172A',
  },
});
