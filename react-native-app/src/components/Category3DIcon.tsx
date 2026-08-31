import React from 'react';
import { View, StyleSheet } from 'react-native';

// 1. Engine & Parts - Blue Top Cover, Slate V6/V8 Block, Center Crank Pulley, Side Tensioners
export const EnginePartsSvg: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const scale = size / 52;
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={{ width: 52, height: 52, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        {/* Top Blue Valve/Intake Cover */}
        <View style={styles.engineTopBlueCover}>
          <View style={styles.coverRidge} />
          <View style={styles.coverRidge} />
          <View style={styles.coverRidge} />
        </View>

        {/* Engine Main Metal Block */}
        <View style={styles.engineMainBlock}>
          {/* Left Accessory Pulley */}
          <View style={styles.sidePulleyLeft}>
            <View style={styles.pulleyBolt} />
          </View>
          {/* Right Accessory Alternator */}
          <View style={styles.sidePulleyRight}>
            <View style={styles.pulleyBolt} />
          </View>

          {/* Symmetrical Cylinder Bore Dots */}
          <View style={styles.cylinderRow}>
            <View style={styles.engineBoltDot} />
            <View style={styles.engineBoltDot} />
          </View>

          {/* Center Crankshaft Pulley with White Outer Ring */}
          <View style={styles.centerCrankPulleyOuter}>
            <View style={styles.centerCrankPulleyWhiteRing}>
              <View style={styles.centerCrankPulleyCore} />
            </View>
          </View>
        </View>

        {/* Lower Oil Sump */}
        <View style={styles.engineSump} />
      </View>
    </View>
  );
};

// 2. Body Parts - Royal Blue Front Car Door with Black Frame, Tinted Window & Handle
export const BodyPartsSvg: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const scale = size / 52;
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={{ width: 52, height: 52, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        {/* Car Door Outer Frame */}
        <View style={styles.carDoorFrame}>
          {/* Black Window Outline & Tinted Glass */}
          <View style={styles.windowFrame}>
            <View style={styles.windowGlass}>
              <View style={styles.windowReflection} />
            </View>
          </View>

          {/* Door Lower Metal Skin in Royal Blue */}
          <View style={styles.doorMetalPanel}>
            {/* Mirror Mounting Corner */}
            <View style={styles.mirrorBase} />
            {/* Horizontal Door Handle */}
            <View style={styles.doorHandle} />
            {/* Aerodynamic Body Crease Line */}
            <View style={styles.doorCreaseLine} />
          </View>
        </View>
      </View>
    </View>
  );
};

// 3. Electricals - Dark Navy Circular Ring with Sharp Vibrant Golden Lightning Bolt
export const ElectricalsSvg: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const scale = size / 52;
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={{ width: 52, height: 52, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        {/* Dark Circular Ring Container */}
        <View style={styles.electricCircleRing}>
          {/* Inner Light Glow */}
          <View style={styles.electricInnerGlow} />
        </View>

        {/* 3D Golden-Yellow Diagonal Lightning Bolt */}
        <View style={styles.lightningBoltWrap}>
          {/* Top Pointy Arrow */}
          <View style={styles.lightningTopBar} />
          {/* Middle Step */}
          <View style={styles.lightningMidBar} />
          {/* Bottom Pointy Arrow */}
          <View style={styles.lightningBottomBar} />
        </View>
      </View>
    </View>
  );
};

// 4. Suspension - Blue Coilover Strut Shock Absorber at 45-Degree Angle
export const SuspensionSvg: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const scale = size / 52;
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={{ width: 52, height: 52, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        {/* Tilted Strut Assembly at 45deg */}
        <View style={styles.strutDiagonalWrap}>
          {/* Top Mounting Eyelet */}
          <View style={styles.strutTopEyelet}>
            <View style={styles.eyeletHole} />
          </View>
          {/* Chrome Upper Piston Shaft */}
          <View style={styles.strutShaft} />

          {/* Electric Blue Coil Spring Assembly */}
          <View style={styles.springCoilsWrap}>
            <View style={styles.blueSpringRing} />
            <View style={styles.blueSpringRing} />
            <View style={styles.blueSpringRing} />
            <View style={styles.blueSpringRing} />
            <View style={styles.blueSpringRing} />
          </View>

          {/* Lower Damper Body Cylinder */}
          <View style={styles.strutLowerBody}>
            <View style={styles.collarRing} />
          </View>

          {/* Bottom Mounting Eyelet */}
          <View style={styles.strutBottomEyelet}>
            <View style={styles.eyeletHole} />
          </View>
        </View>
      </View>
    </View>
  );
};

// 5. Exhaust - Performance Dual Chrome Tip Exhaust Muffler Chamber at 45-Degree Angle
export const ExhaustSvg: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const scale = size / 52;
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={{ width: 52, height: 52, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        {/* Tilted Muffler Assembly at 45deg */}
        <View style={styles.exhaustDiagonalWrap}>
          {/* Top-Right Inlet Pipe */}
          <View style={styles.exhaustInletTube} />

          {/* Main Metallic Polished Muffler Body */}
          <View style={styles.mufflerCylinderBody}>
            <View style={styles.mufflerChromeSheen} />
          </View>

          {/* Dual Polished Chrome Exhaust Tips */}
          <View style={styles.dualTipsContainer}>
            <View style={styles.chromeTipPipe}>
              <View style={styles.tipDarkBore} />
            </View>
            <View style={styles.chromeTipPipe}>
              <View style={styles.tipDarkBore} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

// 6. More - 4 Rounded Royal Blue Squares in 2x2 Grid
export const MoreGridSvg: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const scale = size / 52;
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={{ width: 52, height: 52, transform: [{ scale }], justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.moreGridContainer}>
          <View style={styles.moreSquarePill} />
          <View style={styles.moreSquarePill} />
          <View style={styles.moreSquarePill} />
          <View style={styles.moreSquarePill} />
        </View>
      </View>
    </View>
  );
};

export interface Category3DIconProps {
  type: string;
  size?: number;
}

export const Category3DIcon: React.FC<Category3DIconProps> = ({ type, size = 48 }) => {
  switch (type.toLowerCase()) {
    case 'engine':
    case 'engine & parts':
      return <EnginePartsSvg size={size} />;
    case 'door':
    case 'body parts':
    case 'body':
      return <BodyPartsSvg size={size} />;
    case 'lightning':
    case 'electricals':
    case 'electrical':
      return <ElectricalsSvg size={size} />;
    case 'suspension':
    case 'suspension & brakes':
      return <SuspensionSvg size={size} />;
    case 'exhaust':
    case 'exhaust & fuel':
      return <ExhaustSvg size={size} />;
    case 'more':
    default:
      return <MoreGridSvg size={size} />;
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- 1. ENGINE STYLES ---
  engineTopBlueCover: {
    width: 28,
    height: 9,
    backgroundColor: '#1565FF',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
    zIndex: 3,
  },
  coverRidge: {
    width: 3,
    height: 5,
    backgroundColor: '#93C5FD',
    borderRadius: 1,
  },
  engineMainBlock: {
    width: 44,
    height: 33,
    backgroundColor: '#1E293B',
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  sidePulleyLeft: {
    position: 'absolute',
    left: -5,
    top: 6,
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#334155',
    borderWidth: 1.5,
    borderColor: '#64748B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidePulleyRight: {
    position: 'absolute',
    right: -5,
    top: 6,
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#334155',
    borderWidth: 1.5,
    borderColor: '#64748B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulleyBolt: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#94A3B8',
  },
  cylinderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 24,
    position: 'absolute',
    top: 4,
  },
  engineBoltDot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 1.75,
    backgroundColor: '#64748B',
  },
  centerCrankPulleyOuter: {
    width: 19,
    height: 19,
    borderRadius: 9.5,
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  centerCrankPulleyWhiteRing: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCrankPulleyCore: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F172A',
  },
  engineSump: {
    width: 22,
    height: 4,
    backgroundColor: '#0F172A',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },

  // --- 2. CAR DOOR STYLES ---
  carDoorFrame: {
    width: 44,
    height: 42,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#0F172A',
  },
  windowFrame: {
    width: '100%',
    height: 18,
    backgroundColor: '#0F172A',
    padding: 1.5,
    paddingRight: 3,
  },
  windowGlass: {
    flex: 1,
    backgroundColor: '#93C5FD',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  windowReflection: {
    position: 'absolute',
    top: -5,
    left: 8,
    width: 8,
    height: 30,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
    transform: [{ rotate: '25deg' }],
  },
  doorMetalPanel: {
    flex: 1,
    backgroundColor: '#1565FF',
    borderTopWidth: 1,
    borderColor: '#0F172A',
    position: 'relative',
  },
  mirrorBase: {
    position: 'absolute',
    top: 1,
    left: 2,
    width: 4,
    height: 6,
    backgroundColor: '#0F172A',
    borderTopRightRadius: 2,
  },
  doorHandle: {
    position: 'absolute',
    top: 4,
    right: 5,
    width: 10,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#0F172A',
  },
  doorCreaseLine: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    right: 4,
    height: 1,
    backgroundColor: '#1E40AF',
  },

  // --- 3. ELECTRICALS / LIGHTNING STYLES ---
  electricCircleRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  electricInnerGlow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFBEB',
  },
  lightningBoltWrap: {
    width: 26,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lightningTopBar: {
    position: 'absolute',
    top: 1,
    right: 2,
    width: 15,
    height: 22,
    backgroundColor: '#F59E0B',
    transform: [{ rotate: '24deg' }, { skewX: '-20deg' }],
    borderTopRightRadius: 2,
  },
  lightningMidBar: {
    position: 'absolute',
    top: 18,
    width: 22,
    height: 7,
    backgroundColor: '#D97706',
    borderRadius: 1.5,
  },
  lightningBottomBar: {
    position: 'absolute',
    bottom: 1,
    left: 2,
    width: 15,
    height: 22,
    backgroundColor: '#FBBF24',
    transform: [{ rotate: '24deg' }, { skewX: '-20deg' }],
    borderBottomLeftRadius: 2,
  },

  // --- 4. SUSPENSION / STRUT STYLES ---
  strutDiagonalWrap: {
    width: 20,
    height: 52,
    alignItems: 'center',
    transform: [{ rotate: '38deg' }],
  },
  strutTopEyelet: {
    width: 11,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#64748B',
  },
  eyeletHole: {
    width: 3.5,
    height: 3.5,
    borderRadius: 1.75,
    backgroundColor: '#0F172A',
  },
  strutShaft: {
    width: 5,
    height: 8,
    backgroundColor: '#CBD5E1',
  },
  springCoilsWrap: {
    width: 18,
    alignItems: 'center',
    marginVertical: 1,
  },
  blueSpringRing: {
    width: 17,
    height: 5,
    backgroundColor: '#1565FF',
    borderRadius: 2.5,
    marginVertical: 0.6,
    borderWidth: 0.8,
    borderColor: '#93C5FD',
  },
  strutLowerBody: {
    width: 11,
    height: 12,
    backgroundColor: '#1E293B',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#475569',
    alignItems: 'center',
  },
  collarRing: {
    width: 13,
    height: 2.5,
    backgroundColor: '#64748B',
    borderRadius: 1,
  },
  strutBottomEyelet: {
    width: 10,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- 5. EXHAUST STYLES ---
  exhaustDiagonalWrap: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-35deg' }],
    position: 'relative',
  },
  exhaustInletTube: {
    position: 'absolute',
    top: 5,
    right: 2,
    width: 10,
    height: 6,
    backgroundColor: '#0F172A',
    borderRadius: 2,
  },
  mufflerCylinderBody: {
    width: 24,
    height: 24,
    backgroundColor: '#94A3B8',
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  mufflerChromeSheen: {
    width: '100%',
    height: 5,
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
  },
  dualTipsContainer: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    flexDirection: 'column',
    gap: 2,
  },
  chromeTipPipe: {
    width: 14,
    height: 7,
    backgroundColor: '#CBD5E1',
    borderRadius: 3.5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 1.5,
  },
  tipDarkBore: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0F172A',
  },

  // --- 6. MORE GRID STYLES ---
  moreGridContainer: {
    width: 38,
    height: 38,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  moreSquarePill: {
    width: 16,
    height: 16,
    borderRadius: 5,
    backgroundColor: '#1565FF',
  },
});
