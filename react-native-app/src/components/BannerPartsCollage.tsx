import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const BannerPartsCollage: React.FC = () => {
  return (
    <View style={styles.collageWrapper}>
      {/* Background Soft Blue Radial Glow Flare */}
      <View style={styles.flareGlow} />

      {/* 1. High-Performance Ventilated Brake Disc Rotor (Back Layer) */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3202/3202924.png' }}
        style={styles.brakeDisc}
        resizeMode="contain"
      />

      {/* 2. Blue Racing Coilover Suspension Strut (Center Top) */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2061/2061986.png' }}
        style={styles.shockStrut}
        resizeMode="contain"
      />

      {/* 3. Turbocharger & Engine Component (Front Left) */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png' }}
        style={styles.engineTurbo}
        resizeMode="contain"
      />

      {/* 4. Dual Exhaust Muffler (Front Center) */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3202/3202930.png' }}
        style={styles.exhaustTip}
        resizeMode="contain"
      />

      {/* 5. 5W-30 Synthetic Motor Oil Bottle (Front Right) */}
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
    height: 145,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  flareGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#1E40AF',
    opacity: 0.5,
    top: -5,
    right: 0,
  },

  // 1. Drilled Brake Rotor Disc
  brakeDisc: {
    position: 'absolute',
    top: 4,
    right: 16,
    width: 76,
    height: 76,
    opacity: 0.95,
    zIndex: 2,
  },

  // 2. Shock Strut
  shockStrut: {
    position: 'absolute',
    top: -8,
    right: 58,
    width: 52,
    height: 86,
    zIndex: 4,
  },

  // 3. Engine / Turbo
  engineTurbo: {
    position: 'absolute',
    bottom: 6,
    left: 4,
    width: 58,
    height: 58,
    zIndex: 6,
  },

  // 4. Exhaust / Muffler
  exhaustTip: {
    position: 'absolute',
    bottom: 8,
    left: 56,
    width: 48,
    height: 48,
    zIndex: 5,
  },

  // 5. Motor Oil
  motorOil: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 46,
    height: 60,
    zIndex: 7,
  },
});

export default BannerPartsCollage;
