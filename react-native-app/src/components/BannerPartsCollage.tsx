import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-paper';

/**
 * 3D Composite Automotive Parts Graphic for Hero Promo Banner
 * Matches the reference mockup:
 * - Shock absorber / coilover damper (electric blue)
 * - Drilled brake rotor disc
 * - Chrome alternator
 * - Oil filter canister
 * - Motor Oil bottle
 * - Deep navy/blue illuminated aura background
 */
export const BannerPartsCollage: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Deep Blue Luminous Circular Background Aura */}
      <View style={styles.deepBlueAura} />
      <View style={styles.innerGlowRing} />

      {/* 1. Tall Performance Coilover Strut (Top Center) */}
      <View style={styles.coiloverGraphic}>
        <View style={styles.topMountPill} />
        <View style={styles.blueDamperBody}>
          <View style={styles.springRingHighlight} />
          <View style={styles.springRingHighlight} />
          <View style={styles.springRingHighlight} />
          <View style={styles.springRingHighlight} />
        </View>
        <View style={styles.chromeLowerPiston} />
      </View>

      {/* 2. Drilled Brake Rotor Disc (Right Center) */}
      <View style={styles.slottedRotorGraphic}>
        <View style={styles.rotorHubCenter}>
          <View style={styles.hubPin} />
          <View style={styles.hubPin} />
          <View style={styles.hubPin} />
        </View>
        <View style={styles.perforationRing} />
      </View>

      {/* 3. Cast Chrome Alternator / Dynamo (Bottom Left) */}
      <View style={styles.alternatorGraphic}>
        <View style={styles.alternatorHousing}>
          <View style={styles.alternatorFanVanes} />
          <View style={styles.alternatorFanVanes} />
        </View>
        <View style={styles.alternatorPulleyWheel} />
      </View>

      {/* 4. Pleated Oil Filter Element (Bottom Center) */}
      <View style={styles.oilFilterGraphic}>
        <View style={styles.oilFilterTopRing} />
        <View style={styles.oilFilterPaperPleats}>
          <View style={styles.filterStripe} />
          <View style={styles.filterStripe} />
          <View style={styles.filterStripe} />
        </View>
      </View>

      {/* 5. 5W-30 Motor Oil Bottle Canister (Far Right) */}
      <View style={styles.oilBottleGraphic}>
        <View style={styles.oilBottleCap} />
        <View style={styles.oilBottleBody}>
          <Text style={styles.oilBottleTextLabel}>MOTOR</Text>
          <Text style={styles.oilBottleTextBold}>OIL</Text>
          <Text style={styles.oilBottleGrade}>5W-30</Text>
        </View>
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
  deepBlueAura: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#1E3A8A',
    opacity: 0.85,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
  },
  innerGlowRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2563EB',
    opacity: 0.4,
  },

  // 1. COILOVER
  coiloverGraphic: {
    position: 'absolute',
    top: 4,
    right: 52,
    alignItems: 'center',
    zIndex: 6,
    transform: [{ rotate: '12deg' }],
  },
  topMountPill: {
    width: 14,
    height: 6,
    backgroundColor: '#0F172A',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#475569',
  },
  blueDamperBody: {
    width: 16,
    height: 38,
    backgroundColor: '#1D4ED8',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    justifyContent: 'space-evenly',
    paddingVertical: 2,
  },
  springRingHighlight: {
    width: '100%',
    height: 3.5,
    backgroundColor: '#60A5FA',
    borderRadius: 1,
  },
  chromeLowerPiston: {
    width: 7,
    height: 14,
    backgroundColor: '#E2E8F0',
    borderWidth: 1,
    borderColor: '#94A3B8',
  },

  // 2. BRAKE ROTOR
  slottedRotorGraphic: {
    position: 'absolute',
    top: 24,
    right: 28,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#94A3B8',
    borderWidth: 2.5,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  rotorHubCenter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#64748B',
  },
  hubPin: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: '#E2E8F0',
    marginVertical: 0.5,
  },
  perforationRing: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.4)',
    borderStyle: 'dashed',
  },

  // 3. ALTERNATOR
  alternatorGraphic: {
    position: 'absolute',
    bottom: 8,
    left: 12,
    alignItems: 'center',
    zIndex: 7,
  },
  alternatorHousing: {
    width: 36,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#CBD5E1',
    borderWidth: 2,
    borderColor: '#475569',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden',
  },
  alternatorFanVanes: {
    width: 28,
    height: 3,
    backgroundColor: '#475569',
    borderRadius: 1,
  },
  alternatorPulleyWheel: {
    width: 14,
    height: 8,
    backgroundColor: '#0F172A',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    marginTop: -4,
  },

  // 4. OIL FILTER
  oilFilterGraphic: {
    position: 'absolute',
    bottom: 6,
    right: 38,
    alignItems: 'center',
    zIndex: 8,
  },
  oilFilterTopRing: {
    width: 24,
    height: 5,
    backgroundColor: '#0F172A',
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: '#475569',
  },
  oilFilterPaperPleats: {
    width: 22,
    height: 26,
    backgroundColor: '#FDE047',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderWidth: 1.5,
    borderColor: '#CA8A04',
    justifyContent: 'space-evenly',
    paddingVertical: 1,
  },
  filterStripe: {
    width: '100%',
    height: 2,
    backgroundColor: '#EAB308',
  },

  // 5. MOTOR OIL BOTTLE
  oilBottleGraphic: {
    position: 'absolute',
    bottom: 10,
    right: 4,
    alignItems: 'center',
    zIndex: 9,
  },
  oilBottleCap: {
    width: 8,
    height: 4,
    backgroundColor: '#EF4444',
    borderRadius: 1,
  },
  oilBottleBody: {
    width: 22,
    height: 34,
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderWidth: 1.5,
    borderColor: '#0F172A',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  oilBottleTextLabel: {
    color: '#94A3B8',
    fontSize: 5,
    fontWeight: '800',
  },
  oilBottleTextBold: {
    color: '#FACC15',
    fontSize: 7,
    fontWeight: '900',
    lineHeight: 8,
  },
  oilBottleGrade: {
    color: '#38BDF8',
    fontSize: 5,
    fontWeight: '700',
  },
});

export default BannerPartsCollage;
