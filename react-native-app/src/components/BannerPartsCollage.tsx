import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Category3DIcon } from './Category3DIcon';

export const BannerPartsCollage: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Background Soft Glow Aura */}
      <View style={styles.glowAura} />

      {/* 3D V6 Engine Block (Prominently Angled) */}
      <View style={styles.enginePlacement}>
        <Category3DIcon type="engine" size={62} />
      </View>

      {/* 3D Coilover Shock & Rotor (Bottom Left) */}
      <View style={styles.suspensionPlacement}>
        <Category3DIcon type="suspension" size={54} />
      </View>

      {/* 3D Metallic Car Door (Top Right) */}
      <View style={styles.doorPlacement}>
        <Category3DIcon type="body" size={46} />
      </View>

      {/* 3D Golden Energy Lightning Bolt (Floating High-Power Highlight) */}
      <View style={styles.boltPlacement}>
        <Category3DIcon type="electrical" size={32} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  glowAura: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#1E40AF',
    opacity: 0.35,
  },
  enginePlacement: {
    position: 'absolute',
    top: 14,
    right: 18,
    zIndex: 3,
  },
  suspensionPlacement: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    zIndex: 4,
  },
  doorPlacement: {
    position: 'absolute',
    top: 4,
    left: 10,
    zIndex: 2,
    opacity: 0.9,
  },
  boltPlacement: {
    position: 'absolute',
    bottom: 24,
    right: 8,
    zIndex: 5,
  },
});

export default BannerPartsCollage;
