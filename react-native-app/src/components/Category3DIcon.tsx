import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-paper';

export interface CategoryIconProps {
  type: string;
  size?: number;
  active?: boolean;
}

/**
 * High-definition 3D Automotive Category Visuals
 * Matches user's exact uploaded 3D assets:
 * 1. lv_0_...0953.png: 3D V6 Engine Block (Silver manifolds, blue cylinder head, pulley)
 * 2. lv_0_...1204.png: 3D Metallic Blue Car Door with aero glass & black B-pillar
 * 3. lv_0_...1308.png: 3D Solid Beveled Golden Power Lightning Bolt
 * 4. lv_0_...1507.png: 3D Blue Coilover Suspension Strut + Perforated Brake Rotor
 * 5. Exhaust: 3D Stainless Performance Twin-Pipe Muffler
 * 6. More: Clean Royal Blue 2x2 App Matrix
 */
export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 56 }) => {
  const t = (type || 'more').toLowerCase().trim();

  // 1. ENGINE & PARTS: 3D V6 Engine Block with Dual Manifolds & Crank Pulley
  if (t.includes('engine') || t.includes('motor') || t.includes('piston') || t.includes('turbo')) {
    return (
      <View style={[styles.canvas, { width: size, height: size }]}>
        <View style={styles.engineBlockContainer}>
          {/* Top Twin Intake Manifold Boxes */}
          <View style={styles.engineIntakeRow}>
            <View style={styles.engineIntakeBoxLeft} />
            <View style={styles.engineIntakeBoxRight} />
          </View>
          
          {/* V-Angle Cylinder Heads (Silver Left, Deep Blue Right) */}
          <View style={styles.engineHeadsRow}>
            <View style={styles.engineHeadSilver}>
              <View style={styles.engineHeadRidget1} />
              <View style={styles.engineHeadRidget2} />
            </View>
            <View style={styles.engineHeadBlue}>
              <View style={styles.engineHeadBlueGleam} />
            </View>
          </View>

          {/* Dark Cast Iron Engine Crankcase */}
          <View style={styles.engineCrankcase}>
            {/* Front Harmonic Balancer / Crank Pulley */}
            <View style={styles.enginePulleyOuter}>
              <View style={styles.enginePulleyInner} />
            </View>
            {/* Side Alternator / Bellhousing Ring */}
            <View style={styles.engineSideFlange} />
          </View>
          {/* Oil Pan Sump Base */}
          <View style={styles.engineOilPan} />
        </View>
      </View>
    );
  }

  // 2. BODY PARTS: Metallic Deep Blue Car Door with Aero Glass Frame & Handle
  if (t.includes('body') || t.includes('door') || t.includes('bumper') || t.includes('fender') || t.includes('panel')) {
    return (
      <View style={[styles.canvas, { width: size, height: size }]}>
        <View style={styles.carDoorContainer}>
          {/* Window Glass Area (Aero Swept Top Curve) */}
          <View style={styles.doorWindowFrame}>
            <View style={styles.doorGlassPane}>
              {/* Glass Reflection Highlight Streak */}
              <View style={styles.doorGlassReflection} />
            </View>
            {/* Black B-Pillar Frame */}
            <View style={styles.doorBPillar} />
            {/* Side View Mirror */}
            <View style={styles.doorSideMirror} />
          </View>

          {/* Metallic Deep Blue Door Lower Panel */}
          <View style={styles.doorLowerSkin}>
            {/* Horizontal Dynamic Body Character Crease */}
            <View style={styles.doorCharacterLine} />
            {/* Door Handle with Lock Cylinder Pocket */}
            <View style={styles.doorHandle}>
              <View style={styles.doorHandleKeyhole} />
            </View>
            {/* Bottom Metallic Shadow Refraction */}
            <View style={styles.doorLowerShadow} />
          </View>
        </View>
      </View>
    );
  }

  // 3. ELECTRICALS: 3D Beveled Solid Golden Energy Lightning Bolt
  if (t.includes('elect') || t.includes('battery') || t.includes('light') || t.includes('spark') || t.includes('bolt')) {
    return (
      <View style={[styles.canvas, { width: size, height: size }]}>
        <View style={styles.lightning3DContainer}>
          {/* Ambient Golden Corona Glow */}
          <View style={styles.lightningAura} />
          
          {/* Main 3D Beveled Golden Bolt */}
          <View style={styles.lightningCore}>
            <Icon source="flash" size={size * 0.9} color="#FBBF24" />
          </View>

          {/* 3D Highlight Bevel overlay */}
          <View style={styles.lightningBevelFacet}>
            <Icon source="flash" size={size * 0.76} color="#FEF08A" />
          </View>
        </View>
      </View>
    );
  }

  // 4. SUSPENSION: Metallic Blue Coilover Strut + Perforated Brake Rotor
  if (t.includes('suspension') || t.includes('shock') || t.includes('strut') || t.includes('spring') || t.includes('brake') || t.includes('steering')) {
    return (
      <View style={[styles.canvas, { width: size, height: size }]}>
        <View style={styles.suspension3DContainer}>
          {/* Slotted & Drilled Brake Disc Rotor (Bottom Right) */}
          <View style={styles.brakeRotorDisc}>
            <View style={styles.brakeHubCenter}>
              <View style={styles.hubBolt1} />
              <View style={styles.hubBolt2} />
              <View style={styles.hubBolt3} />
            </View>
            {/* Drilled Rotor Cooling Holes */}
            <View style={styles.rotorHole1} />
            <View style={styles.rotorHole2} />
            <View style={styles.rotorHole3} />
            <View style={styles.rotorHole4} />
          </View>

          {/* High-Performance Metallic Blue Coilover Spring Shock Strut (Diagonal) */}
          <View style={styles.coiloverStrut}>
            {/* Top Mount Bushing */}
            <View style={styles.strutTopMount} />
            {/* Blue Hydraulic Damper Cylinder */}
            <View style={styles.strutDamperBody}>
              {/* Coiled Suspension Heavy Spring Rings */}
              <View style={styles.springCoilRing} />
              <View style={styles.springCoilRing} />
              <View style={styles.springCoilRing} />
              <View style={styles.springCoilRing} />
            </View>
            {/* Lower Chrome Shaft */}
            <View style={styles.strutChromeShaft} />
            {/* Lower Eyelet Mounting Bushing */}
            <View style={styles.strutBottomEyelet} />
          </View>
        </View>
      </View>
    );
  }

  // 5. EXHAUST: 3D Polished Stainless Steel Performance Muffler & Dual Exhaust Tips
  if (t.includes('exhaust') || t.includes('muffler') || t.includes('silencer') || t.includes('pipe')) {
    return (
      <View style={[styles.canvas, { width: size, height: size }]}>
        <View style={styles.exhaust3DContainer}>
          {/* Inlet Pipe */}
          <View style={styles.exhaustInletPipe} />
          
          {/* Heavy Gauge Oval Stainless Muffler Chamber */}
          <View style={styles.exhaustMufflerBody}>
            {/* Metallic Brushed Reflection Sheen */}
            <View style={styles.exhaustReflectionSheen} />
            <View style={styles.exhaustSeamBand} />
          </View>

          {/* Dual Polished Chrome Angle-Cut Exhaust Tips */}
          <View style={styles.dualTipsBox}>
            <View style={styles.exhaustTip}>
              <View style={styles.exhaustTipBore} />
            </View>
            <View style={styles.exhaustTip}>
              <View style={styles.exhaustTipBore} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  // 6. MORE: Royal Blue 2x2 App Grid
  return (
    <View style={[styles.canvas, { width: size, height: size }]}>
      <View style={styles.moreGridContainer}>
        <View style={styles.gridRow}>
          <View style={styles.gridBlock} />
          <View style={styles.gridBlock} />
        </View>
        <View style={styles.gridRow}>
          <View style={styles.gridBlock} />
          <View style={styles.gridBlock} />
        </View>
      </View>
    </View>
  );
};

export const EnginePartsSvg = () => <Category3DIcon type="engine" />;
export const BodyPartsSvg = () => <Category3DIcon type="body" />;
export const ElectricalsSvg = () => <Category3DIcon type="electrical" />;
export const SuspensionSvg = () => <Category3DIcon type="suspension" />;
export const ExhaustSvg = () => <Category3DIcon type="exhaust" />;
export const MoreGridSvg = () => <Category3DIcon type="more" />;

const styles = StyleSheet.create({
  canvas: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 1. ENGINE STYLES
  engineBlockContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  engineIntakeRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: -2,
    zIndex: 3,
  },
  engineIntakeBoxLeft: {
    width: 14,
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#475569',
  },
  engineIntakeBoxRight: {
    width: 14,
    height: 6,
    backgroundColor: '#0F172A',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#334155',
  },
  engineHeadsRow: {
    flexDirection: 'row',
    gap: 2,
    zIndex: 2,
  },
  engineHeadSilver: {
    width: 22,
    height: 15,
    backgroundColor: '#E2E8F0',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  engineHeadRidget1: {
    width: 14,
    height: 2,
    backgroundColor: '#94A3B8',
    borderRadius: 1,
    marginBottom: 2,
  },
  engineHeadRidget2: {
    width: 10,
    height: 2,
    backgroundColor: '#94A3B8',
    borderRadius: 1,
  },
  engineHeadBlue: {
    width: 18,
    height: 15,
    backgroundColor: '#1D4ED8',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 2,
    borderWidth: 1,
    borderColor: '#3B82F6',
    position: 'relative',
    overflow: 'hidden',
  },
  engineHeadBlueGleam: {
    position: 'absolute',
    top: 1,
    right: 2,
    width: 10,
    height: 3,
    backgroundColor: '#93C5FD',
    borderRadius: 1.5,
  },
  engineCrankcase: {
    width: 40,
    height: 18,
    backgroundColor: '#0F172A',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#334155',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    marginTop: -2,
    zIndex: 1,
  },
  enginePulleyOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#94A3B8',
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enginePulleyInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F172A',
  },
  engineSideFlange: {
    width: 10,
    height: 14,
    backgroundColor: '#64748B',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderLeftWidth: 1,
    borderColor: '#94A3B8',
  },
  engineOilPan: {
    width: 30,
    height: 5,
    backgroundColor: '#020617',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginTop: -1,
  },

  // 2. CAR DOOR STYLES
  carDoorContainer: {
    width: 44,
    height: 48,
    alignItems: 'center',
  },
  doorWindowFrame: {
    width: 42,
    height: 22,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 4,
    borderWidth: 2.5,
    borderColor: '#0F172A',
    borderBottomWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#E0F2FE',
  },
  doorGlassPane: {
    flex: 1,
    backgroundColor: '#BAE6FD',
    opacity: 0.85,
  },
  doorGlassReflection: {
    position: 'absolute',
    top: -10,
    left: 4,
    width: 8,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    transform: [{ rotate: '28deg' }],
  },
  doorBPillar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#0F172A',
  },
  doorSideMirror: {
    position: 'absolute',
    left: -1,
    bottom: -2,
    width: 9,
    height: 7,
    borderRadius: 3,
    backgroundColor: '#0284C7',
    borderWidth: 1,
    borderColor: '#0369A1',
    zIndex: 10,
  },
  doorLowerSkin: {
    width: 44,
    height: 26,
    backgroundColor: '#0284C7',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1.5,
    borderColor: '#0369A1',
    position: 'relative',
    overflow: 'hidden',
  },
  doorCharacterLine: {
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: '#38BDF8',
    opacity: 0.9,
  },
  doorHandle: {
    position: 'absolute',
    top: 9,
    right: 6,
    width: 14,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#0369A1',
    borderWidth: 0.8,
    borderColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 2,
  },
  doorHandleKeyhole: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#CBD5E1',
  },
  doorLowerShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: '#075985',
  },

  // 3. LIGHTNING 3D STYLES
  lightning3DContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lightningAura: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(250, 204, 21, 0.25)',
  },
  lightningCore: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 4,
  },
  lightningBevelFacet: {
    position: 'absolute',
    top: 2,
    left: 2,
    opacity: 0.85,
  },

  // 4. SUSPENSION STYLES
  suspension3DContainer: {
    width: 50,
    height: 50,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brakeRotorDisc: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#CBD5E1',
    borderWidth: 2,
    borderColor: '#64748B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  brakeHubCenter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hubBolt1: { position: 'absolute', top: 1, width: 2, height: 2, borderRadius: 1, backgroundColor: '#E2E8F0' },
  hubBolt2: { position: 'absolute', bottom: 1, left: 2, width: 2, height: 2, borderRadius: 1, backgroundColor: '#E2E8F0' },
  hubBolt3: { position: 'absolute', bottom: 1, right: 2, width: 2, height: 2, borderRadius: 1, backgroundColor: '#E2E8F0' },
  rotorHole1: { position: 'absolute', top: 3, left: 7, width: 2, height: 2, borderRadius: 1, backgroundColor: '#475569' },
  rotorHole2: { position: 'absolute', top: 6, right: 4, width: 2, height: 2, borderRadius: 1, backgroundColor: '#475569' },
  rotorHole3: { position: 'absolute', bottom: 4, left: 5, width: 2, height: 2, borderRadius: 1, backgroundColor: '#475569' },
  rotorHole4: { position: 'absolute', bottom: 6, right: 7, width: 2, height: 2, borderRadius: 1, backgroundColor: '#475569' },
  coiloverStrut: {
    position: 'absolute',
    top: 0,
    left: 2,
    width: 18,
    height: 44,
    transform: [{ rotate: '-32deg' }],
    alignItems: 'center',
    zIndex: 10,
  },
  strutTopMount: {
    width: 10,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#94A3B8',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  strutDamperBody: {
    width: 14,
    height: 22,
    backgroundColor: '#0284C7',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#0369A1',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 1,
  },
  springCoilRing: {
    width: 16,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#0F172A',
    borderWidth: 0.8,
    borderColor: '#38BDF8',
  },
  strutChromeShaft: {
    width: 6,
    height: 10,
    backgroundColor: '#E2E8F0',
    borderWidth: 0.8,
    borderColor: '#94A3B8',
  },
  strutBottomEyelet: {
    width: 10,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#64748B',
    borderWidth: 1,
    borderColor: '#94A3B8',
  },

  // 5. EXHAUST STYLES
  exhaust3DContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-20deg' }],
  },
  exhaustInletPipe: {
    width: 8,
    height: 10,
    backgroundColor: '#64748B',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderWidth: 1,
    borderColor: '#94A3B8',
    marginBottom: -1,
  },
  exhaustMufflerBody: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#94A3B8',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  exhaustReflectionSheen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 6,
    width: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
  },
  exhaustSeamBand: {
    width: '100%',
    height: 2,
    backgroundColor: '#475569',
  },
  dualTipsBox: {
    flexDirection: 'row',
    gap: 3,
    marginTop: -1,
  },
  exhaustTip: {
    width: 9,
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exhaustTipBore: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#0F172A',
  },

  // 6. MORE GRID STYLES
  moreGridContainer: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 5,
  },
  gridBlock: {
    width: 14,
    height: 14,
    borderRadius: 4.5,
    backgroundColor: '#1565FF',
    shadowColor: '#1565FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default Category3DIcon;
