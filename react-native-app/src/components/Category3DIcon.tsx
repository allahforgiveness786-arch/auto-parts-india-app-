import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-paper';

export interface CategoryIconProps {
  type: string;
  size?: number;
  active?: boolean;
}

/**
 * High-definition 3D Automotive Category Visuals
 * Matches the photorealistic 3D reference mockup:
 * 1. Engine & Parts: 3D Metallic V6 Turbo Engine with Chrome Manifolds
 * 2. Body Parts: 3D Deep Metallic Blue Car Door with Aero Glass & Handle
 * 3. Electricals: 3D Chiseled Solid Golden Lightning Bolt with Specular Sheen
 * 4. Suspension: 3D Performance Blue Coilover Damper + Slotted Rotor Disc
 * 5. Exhaust: 3D Stainless Steel Dual-Tip Performance Muffler
 * 6. More: 3D Glossy Blue 2x2 Rounded Matrix
 */
export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 56 }) => {
  const t = (type || 'more').toLowerCase().trim();

  // 1. ENGINE & PARTS: 3D V6 Engine Block with Dual Manifolds & Crank Pulley
  if (t.includes('engine') || t.includes('motor') || t.includes('piston') || t.includes('turbo')) {
    return (
      <View style={[styles.canvas, { width: size, height: size }]}>
        <View style={styles.engine3DWrapper}>
          {/* Top Twin Chrome Intake Manifolds */}
          <View style={styles.engineIntakeManifoldRow}>
            <View style={styles.engineManifoldTube} />
            <View style={styles.engineManifoldTube} />
            <View style={styles.engineManifoldTube} />
          </View>
          
          {/* V6 Cylinder Heads (Silver Left, Deep Blue Right) */}
          <View style={styles.engineCylinderBlock}>
            <View style={styles.engineHeadSilver}>
              <View style={styles.engineFinHighlight} />
              <View style={styles.engineFinHighlight} />
            </View>
            <View style={styles.engineHeadBlue}>
              <View style={styles.engineGleamStreak} />
            </View>
          </View>

          {/* Cast Metallic Crankcase & Front Chrome Pulley */}
          <View style={styles.engineLowerCase}>
            <View style={styles.enginePulleyOuter}>
              <View style={styles.enginePulleyCore} />
            </View>
            <View style={styles.engineTurboBoostHousing} />
          </View>
          {/* Oil Sump Base */}
          <View style={styles.engineOilSump} />
        </View>
      </View>
    );
  }

  // 2. BODY PARTS: Metallic Deep Blue Car Door with Aero Glass & Handle
  if (t.includes('body') || t.includes('door') || t.includes('bumper') || t.includes('fender') || t.includes('panel')) {
    return (
      <View style={[styles.canvas, { width: size, height: size }]}>
        <View style={styles.door3DWrapper}>
          {/* Top Window Frame with Curved Glass & Reflection */}
          <View style={styles.doorTopWindowFrame}>
            <View style={styles.doorGlassSurface}>
              <View style={styles.doorGlassSheen} />
            </View>
            <View style={styles.doorBPillarBar} />
          </View>

          {/* Metallic Deep Blue Door Panel with Curved Shadow */}
          <View style={styles.doorMainPanel}>
            <View style={styles.doorCreaseLine} />
            <View style={styles.doorHandleBar}>
              <View style={styles.doorKeySlot} />
            </View>
            <View style={styles.doorBottomShade} />
          </View>
        </View>
      </View>
    );
  }

  // 3. ELECTRICALS: 3D Solid Chiseled Golden Energy Lightning Bolt
  if (t.includes('elect') || t.includes('battery') || t.includes('light') || t.includes('spark') || t.includes('bolt')) {
    return (
      <View style={[styles.canvas, { width: size, height: size }]}>
        <View style={styles.lightning3DWrapper}>
          {/* Golden Warm Glow */}
          <View style={styles.lightningDropShadow} />
          {/* Beveled Main 3D Bolt */}
          <View style={styles.lightningBevelBack}>
            <Icon source="flash" size={size * 0.88} color="#D97706" />
          </View>
          <View style={styles.lightningFacetFront}>
            <Icon source="flash" size={size * 0.82} color="#FBBF24" />
          </View>
          <View style={styles.lightningSpecularGlint}>
            <Icon source="flash" size={size * 0.68} color="#FEF08A" />
          </View>
        </View>
      </View>
    );
  }

  // 4. SUSPENSION: Metallic Blue Coilover Strut + Slotted Brake Rotor
  if (t.includes('suspension') || t.includes('shock') || t.includes('strut') || t.includes('spring') || t.includes('brake') || t.includes('steering')) {
    return (
      <View style={[styles.canvas, { width: size, height: size }]}>
        <View style={styles.suspension3DWrapper}>
          {/* Slotted & Drilled Brake Disc Rotor (Bottom Left) */}
          <View style={styles.slottedBrakeRotor}>
            <View style={styles.rotorHub}>
              <View style={styles.hubNut} />
              <View style={styles.hubNut} />
            </View>
            <View style={styles.rotorVentHole1} />
            <View style={styles.rotorVentHole2} />
            <View style={styles.rotorVentHole3} />
          </View>

          {/* Diagonal Sport Coilover Strut with Blue Springs */}
          <View style={styles.coiloverStrutBody}>
            <View style={styles.strutTopMountPill} />
            <View style={styles.strutSpringChamber}>
              <View style={styles.strutSpringCoil} />
              <View style={styles.strutSpringCoil} />
              <View style={styles.strutSpringCoil} />
            </View>
            <View style={styles.strutChromeRod} />
            <View style={styles.strutBottomBushing} />
          </View>
        </View>
      </View>
    );
  }

  // 5. EXHAUST: 3D Polished Stainless Steel Dual-Tip Performance Muffler
  if (t.includes('exhaust') || t.includes('muffler') || t.includes('silencer') || t.includes('pipe')) {
    return (
      <View style={[styles.canvas, { width: size, height: size }]}>
        <View style={styles.exhaust3DWrapper}>
          <View style={styles.exhaustInletTube} />
          {/* Stainless Steel Oval Drum with Chrome Sheen */}
          <View style={styles.exhaustOvalDrum}>
            <View style={styles.exhaustChromeSheen} />
            <View style={styles.exhaustWeldSeam} />
          </View>
          {/* Dual Angle-Cut Chrome Exhaust Tips */}
          <View style={styles.exhaustTipsPair}>
            <View style={styles.exhaustTipPipe}>
              <View style={styles.exhaustInnerBore} />
            </View>
            <View style={styles.exhaustTipPipe}>
              <View style={styles.exhaustInnerBore} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  // 6. MORE: 4 Glossy Royal Blue Rounded Squares (2x2 Matrix)
  return (
    <View style={[styles.canvas, { width: size, height: size }]}>
      <View style={styles.moreMatrixBox}>
        <View style={styles.matrixRow}>
          <View style={styles.matrixCube} />
          <View style={styles.matrixCube} />
        </View>
        <View style={styles.matrixRow}>
          <View style={styles.matrixCube} />
          <View style={styles.matrixCube} />
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

  // 1. ENGINE 3D STYLES
  engine3DWrapper: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  engineIntakeManifoldRow: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: -2,
    zIndex: 4,
  },
  engineManifoldTube: {
    width: 8,
    height: 6,
    backgroundColor: '#334155',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderWidth: 1,
    borderColor: '#64748B',
  },
  engineCylinderBlock: {
    flexDirection: 'row',
    width: 40,
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    zIndex: 3,
  },
  engineHeadSilver: {
    flex: 1,
    backgroundColor: '#94A3B8',
    justifyContent: 'space-evenly',
    paddingVertical: 2,
    paddingLeft: 2,
  },
  engineFinHighlight: {
    width: '80%',
    height: 2,
    backgroundColor: '#E2E8F0',
    borderRadius: 1,
  },
  engineHeadBlue: {
    flex: 1,
    backgroundColor: '#1E40AF',
    position: 'relative',
    overflow: 'hidden',
  },
  engineGleamStreak: {
    position: 'absolute',
    top: 0,
    left: 2,
    width: 6,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
    transform: [{ skewX: '-20deg' }],
  },
  engineLowerCase: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 36,
    height: 14,
    backgroundColor: '#0F172A',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    zIndex: 2,
  },
  enginePulleyOuter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#CBD5E1',
    borderWidth: 1.5,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enginePulleyCore: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0F172A',
  },
  engineTurboBoostHousing: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#38BDF8',
    borderWidth: 1,
    borderColor: '#0284C7',
  },
  engineOilSump: {
    width: 24,
    height: 4,
    backgroundColor: '#020617',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    marginTop: -1,
  },

  // 2. DOOR 3D STYLES
  door3DWrapper: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  doorTopWindowFrame: {
    width: 34,
    height: 18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 3,
    borderWidth: 2,
    borderColor: '#0F172A',
    backgroundColor: '#0284C7',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: -1,
  },
  doorGlassSurface: {
    flex: 1,
    backgroundColor: '#0284C7',
    position: 'relative',
  },
  doorGlassSheen: {
    position: 'absolute',
    top: 0,
    left: 4,
    width: 8,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.4)',
    transform: [{ skewX: '-35deg' }],
  },
  doorBPillarBar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#0F172A',
  },
  doorMainPanel: {
    width: 38,
    height: 24,
    backgroundColor: '#0284C7',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 2,
    borderColor: '#0369A1',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  doorCreaseLine: {
    position: 'absolute',
    top: 5,
    left: 4,
    right: 4,
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  doorHandleBar: {
    position: 'absolute',
    top: 9,
    right: 6,
    width: 10,
    height: 3.5,
    backgroundColor: '#0F172A',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 1,
  },
  doorKeySlot: {
    width: 1.5,
    height: 1.5,
    borderRadius: 0.75,
    backgroundColor: '#94A3B8',
  },
  doorBottomShade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: '#075985',
  },

  // 3. LIGHTNING 3D STYLES
  lightning3DWrapper: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lightningDropShadow: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F59E0B',
    opacity: 0.25,
  },
  lightningBevelBack: {
    position: 'absolute',
    top: 2,
    left: 2,
  },
  lightningFacetFront: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  lightningSpecularGlint: {
    position: 'absolute',
    top: -1,
    left: -1,
    opacity: 0.85,
  },

  // 4. SUSPENSION 3D STYLES
  suspension3DWrapper: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  slottedBrakeRotor: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#CBD5E1',
    borderWidth: 2,
    borderColor: '#64748B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  rotorHub: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hubNut: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 1,
  },
  rotorVentHole1: { position: 'absolute', top: 3, width: 2, height: 4, backgroundColor: '#475569', borderRadius: 1 },
  rotorVentHole2: { position: 'absolute', bottom: 3, width: 2, height: 4, backgroundColor: '#475569', borderRadius: 1 },
  rotorVentHole3: { position: 'absolute', right: 3, width: 4, height: 2, backgroundColor: '#475569', borderRadius: 1 },
  coiloverStrutBody: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 16,
    height: 38,
    alignItems: 'center',
    transform: [{ rotate: '25deg' }],
  },
  strutTopMountPill: {
    width: 12,
    height: 4,
    backgroundColor: '#0F172A',
    borderRadius: 2,
  },
  strutSpringChamber: {
    width: 14,
    height: 22,
    backgroundColor: '#1E40AF',
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#1D4ED8',
    justifyContent: 'space-evenly',
    paddingVertical: 1,
  },
  strutSpringCoil: {
    width: '100%',
    height: 3,
    backgroundColor: '#60A5FA',
    borderRadius: 1,
  },
  strutChromeRod: {
    width: 5,
    height: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#94A3B8',
  },
  strutBottomEyelet: {
    width: 8,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#64748B',
  },

  // 5. EXHAUST 3D STYLES
  exhaust3DWrapper: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    transform: [{ rotate: '-18deg' }],
  },
  exhaustInletTube: {
    position: 'absolute',
    left: 0,
    width: 10,
    height: 7,
    backgroundColor: '#94A3B8',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#475569',
  },
  exhaustOvalDrum: {
    width: 26,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#CBD5E1',
    borderWidth: 1.8,
    borderColor: '#64748B',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  exhaustChromeSheen: {
    position: 'absolute',
    top: 2,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FFFFFF',
  },
  exhaustWeldSeam: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    width: 1.5,
    backgroundColor: '#64748B',
  },
  exhaustTipsPair: {
    position: 'absolute',
    right: -6,
    gap: 3,
  },
  exhaustTipPipe: {
    width: 10,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
    borderWidth: 1.2,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exhaustInnerBore: {
    width: 4,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#0F172A',
  },

  // 6. MORE MATRIX STYLES
  moreMatrixBox: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  matrixRow: {
    flexDirection: 'row',
    gap: 4,
  },
  matrixCube: {
    width: 12,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    borderWidth: 1,
    borderColor: '#3B82F6',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
  },
});

export default Category3DIcon;
