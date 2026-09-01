import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const BannerPartsCollage: React.FC = () => {
  return (
    <View style={styles.collageWrapper}>
      {/* Background Soft Blue Radial Glow Flare */}
      <View style={styles.flareGlow} />

      {/* 1. Drilled Steel Brake Disc Rotor (Background layer) */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3202/3202924.png' }}
        style={styles.brakeDisc}
        resizeMode="contain"
      />

      {/* 2. Blue Coilover Strut Shock Absorber (Center Top) */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2061/2061986.png' }}
        style={styles.shockStrut}
        resizeMode="contain"
      />

      {/* 3. Automotive Alternator / Generator (Front Left) */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png' }}
        style={styles.alternator}
        resizeMode="contain"
      />

      {/* 4. Yellow Ribbed Oil Filter Cartridge (Front Middle) */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2061/2061966.png' }}
        style={styles.oilFilter}
        resizeMode="contain"
      />

      {/* 5. 5W-30 Motor Oil Bottle (Front Right) */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2061/2061976.png' }}
        style={styles.motorOil}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  collageWrapper: {
    width: '100%',
    height: 135,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  flareGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1D4ED8',
    opacity: 0.45,
    top: -5,
    right: 0,
  },

  // 1. Drilled Brake Rotor Disc
  brakeDisc: {
    position: 'absolute',
    top: 6,
    right: 14,
    width: 68,
    height: 68,
    opacity: 0.95,
    zIndex: 2,
  },

  // 2. Shock Strut
  shockStrut: {
    position: 'absolute',
    top: -4,
    right: 48,
    width: 46,
    height: 76,
    zIndex: 4,
  },

  // 3. Alternator
  alternator: {
    position: 'absolute',
    bottom: 4,
    left: 8,
    width: 52,
    height: 52,
    zIndex: 6,
  },

  // 4. Yellow Oil Filter
  oilFilter: {
    position: 'absolute',
    bottom: 6,
    left: 54,
    width: 40,
    height: 48,
    zIndex: 5,
  },

  // 5. Motor Oil
  motorOil: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 44,
    height: 58,
    zIndex: 7,
  },
});

export default BannerPartsCollage;
