import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const BannerPartsCollage: React.FC = () => {
  return (
    <View style={styles.collageWrapper}>
      {/* Background Deep Blue Electric Flare */}
      <View style={styles.flareGlow} />
      <View style={styles.flareStreak} />

      {/* 1. Coilover Shock Absorber Strut (Center Top / Right) */}
      <View style={styles.strutCol}>
        <View style={styles.strutTopShaft} />
        {/* Blue Spring Rings */}
        <View style={styles.springRing} />
        <View style={styles.springRing} />
        <View style={styles.springRing} />
        <View style={styles.springRing} />
        <View style={styles.strutLowerBody} />
      </View>

      {/* 2. Drilled Brake Rotor Disc (Behind Alternator) */}
      <View style={styles.brakeDiscDisc}>
        <View style={styles.discInnerVent} />
        <View style={styles.discCenterHole} />
      </View>

      {/* 3. Alternator / Generator (Front Left) */}
      <View style={styles.alternatorHousing}>
        <View style={styles.alternatorRibsRow}>
          <View style={styles.altRib} />
          <View style={styles.altRib} />
          <View style={styles.altRib} />
        </View>
        <View style={styles.altPulleyCenter} />
      </View>

      {/* 4. Oil Filter Cartridge (Front Middle) */}
      <View style={styles.oilFilterCylinder}>
        <View style={styles.filterFlutes} />
        <View style={styles.filterTopRing} />
      </View>

      {/* 5. Motor Oil Bottle (Front Right) */}
      <View style={styles.oilBottle}>
        <View style={styles.bottleCap} />
        <View style={styles.bottleNeck} />
        <View style={styles.bottleBody}>
          <View style={styles.bottleLabel}>
            <Text style={styles.bottleLabelText}>MOTOR</Text>
            <Text style={styles.bottleLabelText}>OIL</Text>
            <Text style={styles.bottleViscosity}>5W-30</Text>
          </View>
        </View>
      </View>

      {/* 6. Precision Ball Bearings (Bottom Left) */}
      <View style={styles.bearingRing}>
        <View style={styles.bearingBall} />
        <View style={styles.bearingBall} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  collageWrapper: {
    width: '100%',
    height: 130,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flareGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1E40AF',
    opacity: 0.55,
    top: -10,
    right: 5,
  },
  flareStreak: {
    position: 'absolute',
    bottom: 4,
    width: '100%',
    height: 20,
    backgroundColor: '#3B82F6',
    opacity: 0.35,
    borderRadius: 10,
    transform: [{ scaleX: 1.2 }],
  },

  // 1. Strut Shock Absorber
  strutCol: {
    position: 'absolute',
    top: 2,
    right: 52,
    width: 22,
    height: 78,
    alignItems: 'center',
    zIndex: 5,
  },
  strutTopShaft: {
    width: 6,
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  springRing: {
    width: 18,
    height: 9,
    backgroundColor: '#2563EB',
    borderRadius: 4.5,
    marginVertical: 1,
    borderWidth: 1,
    borderColor: '#60A5FA',
  },
  strutLowerBody: {
    width: 10,
    height: 18,
    backgroundColor: '#0F172A',
    borderRadius: 2,
  },

  // 2. Brake Disc Rotor
  brakeDiscDisc: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#94A3B8',
    borderWidth: 4,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  discInnerVent: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#64748B',
    borderStyle: 'dashed',
  },
  discCenterHole: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#334155',
  },

  // 3. Alternator
  alternatorHousing: {
    position: 'absolute',
    bottom: 12,
    left: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#475569',
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 7,
  },
  alternatorRibsRow: {
    flexDirection: 'row',
    gap: 3,
  },
  altRib: {
    width: 3,
    height: 24,
    backgroundColor: '#CBD5E1',
    borderRadius: 1.5,
  },
  altPulleyCenter: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },

  // 4. Oil Filter
  oilFilterCylinder: {
    position: 'absolute',
    bottom: 8,
    left: 48,
    width: 30,
    height: 38,
    backgroundColor: '#FDE68A',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 6,
  },
  filterFlutes: {
    width: '80%',
    height: '75%',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#D97706',
  },
  filterTopRing: {
    position: 'absolute',
    top: -3,
    width: 26,
    height: 5,
    backgroundColor: '#0F172A',
    borderRadius: 2,
  },

  // 5. Motor Oil Bottle
  oilBottle: {
    position: 'absolute',
    bottom: 6,
    right: 4,
    width: 28,
    height: 54,
    alignItems: 'center',
    zIndex: 8,
  },
  bottleCap: {
    width: 8,
    height: 5,
    backgroundColor: '#DC2626',
    borderRadius: 1,
  },
  bottleNeck: {
    width: 10,
    height: 6,
    backgroundColor: '#0F172A',
  },
  bottleBody: {
    width: 28,
    height: 43,
    backgroundColor: '#0F172A',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1.5,
  },
  bottleLabel: {
    width: '90%',
    height: '80%',
    backgroundColor: '#1E293B',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#F59E0B',
  },
  bottleLabelText: {
    fontSize: 5,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 6,
  },
  bottleViscosity: {
    fontSize: 4.5,
    fontWeight: '800',
    color: '#FBBF24',
    marginTop: 1,
  },

  // 6. Bearing Ring
  bearingRing: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#64748B',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 9,
  },
  bearingBall: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
});
