import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-paper';

interface Category3DIconProps {
  type: string;
  size?: number;
}

export const Category3DIcon: React.FC<Category3DIconProps> = ({ type, size = 52 }) => {
  // 1. ENGINE & PARTS: 3D Metallic Engine Assembly with Turbo & Intake
  if (type === 'engine') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={styles.engineBlock}>
          {/* Valve Cover / Cylinder Head Top */}
          <View style={styles.engineHeadTop}>
            <View style={styles.valveRidge} />
            <View style={styles.valveRidge} />
            <View style={styles.valveRidge} />
          </View>
          {/* Engine Main Block Body */}
          <View style={styles.engineMainBody}>
            {/* Turbocharger on Left */}
            <View style={styles.turboHousing}>
              <View style={styles.turboCore} />
              <View style={styles.turboInlet} />
            </View>
            {/* Chrome Intake Manifold Runners */}
            <View style={styles.intakePipes}>
              <View style={styles.intakeRunner} />
              <View style={styles.intakeRunner} />
              <View style={styles.intakeRunner} />
            </View>
            {/* Pulley & Alternator Belt */}
            <View style={styles.pulleyBox}>
              <View style={styles.pulleyCircle} />
              <View style={styles.pulleyCircleSmall} />
            </View>
          </View>
          {/* Oil Sump Bottom */}
          <View style={styles.engineSumpBottom} />
        </View>
      </View>
    );
  }

  // 2. BODY PARTS: 3D Metallic Blue Car Door with Window Glass & Handle
  if (type === 'door') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={styles.carDoorCard}>
          {/* Tinted Window with Corner Slope */}
          <View style={styles.windowFrame}>
            <View style={styles.windowGlassTint}>
              <View style={styles.windowReflection} />
            </View>
            <View style={styles.bPillarBlack} />
          </View>
          {/* Blue Metallic Door Panel */}
          <View style={styles.doorMetalPanel}>
            {/* Side View Mirror */}
            <View style={styles.sideMirrorMock} />
            {/* Body Character Crease Line */}
            <View style={styles.doorCharacterLine} />
            {/* Chrome/Black Door Handle */}
            <View style={styles.doorHandleBar}>
              <View style={styles.handleKeyhole} />
            </View>
            {/* Lower Shadow Molding */}
            <View style={styles.lowerDoorMolding} />
          </View>
        </View>
      </View>
    );
  }

  // 3. ELECTRICALS: 3D Glossy Golden Lightning Bolt with Bright Amber Glow
  if (type === 'lightning') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={styles.lightningWrapper}>
          {/* Outer Warm Glow */}
          <View style={styles.lightningGlowBackdrop} />
          {/* 3D Glossy Lightning Bolt */}
          <View style={styles.boltShapeContainer}>
            {/* Top ZigZag */}
            <View style={styles.boltTopSegment} />
            {/* Middle Sharp Diagonal */}
            <View style={styles.boltMiddleSegment} />
            {/* Bottom Tip Point */}
            <View style={styles.boltBottomTip} />
            {/* High-contrast Gold Flare Icon */}
            <Icon source="flash" size={size * 0.76} color="#F59E0B" />
          </View>
        </View>
      </View>
    );
  }

  // 4. SUSPENSION: 3D Coilover Shock Absorber Strut + Drilled Brake Disc Rotor
  if (type === 'suspension') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={styles.suspensionScene}>
          {/* Coilover Shock Strut (Left) */}
          <View style={styles.strutAssembly}>
            <View style={styles.strutTopMount} />
            <View style={styles.strutShaftChrome} />
            {/* Blue Heavy-duty Coil Spring */}
            <View style={styles.coilSpringBox}>
              <View style={styles.springRing} />
              <View style={styles.springRing} />
              <View style={styles.springRing} />
              <View style={styles.springRing} />
            </View>
            <View style={styles.strutLowerFork} />
          </View>

          {/* Drilled Ventilated Disc Rotor (Right) */}
          <View style={styles.discRotorScene}>
            <View style={styles.rotorOuterRing}>
              {/* Vents & Holes */}
              <View style={styles.rotorCenterHub}>
                <View style={styles.lugNutHole} />
                <View style={styles.lugNutHole} />
              </View>
              {/* Red Performance Brake Caliper */}
              <View style={styles.redBrakeCaliper}>
                <View style={styles.caliperPadPiston} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // 5. EXHAUST: 3D Polished Chrome Dual Exhaust Muffler Tips
  if (type === 'exhaust') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={styles.exhaustScene}>
          {/* Main Oval Muffler Canister Body */}
          <View style={styles.mufflerCanister}>
            <View style={styles.canisterSheen} />
          </View>
          {/* Dual Chrome Exhaust Tips with Inner Black Bores */}
          <View style={styles.dualTipsGroup}>
            <View style={styles.exhaustTipPipe}>
              <View style={styles.exhaustInnerBore} />
            </View>
            <View style={styles.exhaustTipPipe}>
              <View style={styles.exhaustInnerBore} />
            </View>
          </View>
          {/* Inflow Inlet Pipe */}
          <View style={styles.exhaustInletPipe} />
        </View>
      </View>
    );
  }

  // 6. MORE: 2x2 Rounded Royal Blue Grid Apps Icon
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.moreGridContainer}>
        <View style={styles.moreBlueSquare} />
        <View style={styles.moreBlueSquare} />
        <View style={styles.moreBlueSquare} />
        <View style={styles.moreBlueSquare} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // Engine styles
  engineBlock: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  engineHeadTop: {
    width: '75%',
    height: 9,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  valveRidge: {
    width: 3,
    height: 5,
    backgroundColor: '#94A3B8',
    borderRadius: 1,
  },
  engineMainBody: {
    width: '88%',
    height: 24,
    backgroundColor: '#334155',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: '#475569',
    marginVertical: 1,
    borderRadius: 3,
  },
  turboHousing: {
    width: 12,
    height: 14,
    backgroundColor: '#64748B',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#94A3B8',
  },
  turboCore: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F172A',
  },
  turboInlet: {
    position: 'absolute',
    left: -2,
    width: 4,
    height: 6,
    backgroundColor: '#38BDF8',
    borderRadius: 1,
  },
  intakePipes: {
    flexDirection: 'row',
    gap: 2,
  },
  intakeRunner: {
    width: 4,
    height: 16,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#64748B',
  },
  pulleyBox: {
    width: 10,
    height: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pulleyCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0284C7',
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  pulleyCircleSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#94A3B8',
  },
  engineSumpBottom: {
    width: '65%',
    height: 5,
    backgroundColor: '#0F172A',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderWidth: 0.5,
    borderColor: '#334155',
  },

  // Car Door styles
  carDoorCard: {
    width: '84%',
    height: '84%',
    borderRadius: 6,
    overflow: 'hidden',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  windowFrame: {
    width: '100%',
    height: '42%',
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 4,
    overflow: 'hidden',
    padding: 1.5,
  },
  windowGlassTint: {
    flex: 1,
    backgroundColor: '#60A5FA',
    borderTopRightRadius: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  windowReflection: {
    position: 'absolute',
    top: -10,
    left: 2,
    width: 6,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    transform: [{ rotate: '25deg' }],
  },
  bPillarBlack: {
    width: 4,
    height: '100%',
    backgroundColor: '#0F172A',
  },
  doorMetalPanel: {
    width: '100%',
    height: '58%',
    backgroundColor: '#1D4ED8',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    position: 'relative',
    justifyContent: 'space-between',
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  sideMirrorMock: {
    position: 'absolute',
    top: -5,
    left: 1,
    width: 9,
    height: 7,
    backgroundColor: '#1E40AF',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 2,
    borderWidth: 0.5,
    borderColor: '#93C5FD',
  },
  doorCharacterLine: {
    width: '90%',
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 1,
    alignSelf: 'center',
  },
  doorHandleBar: {
    width: 14,
    height: 4,
    backgroundColor: '#0F172A',
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginRight: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 2,
    borderWidth: 0.5,
    borderColor: '#94A3B8',
  },
  handleKeyhole: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#E2E8F0',
  },
  lowerDoorMolding: {
    width: '95%',
    height: 2,
    backgroundColor: '#1E3A8A',
    borderRadius: 1,
    alignSelf: 'center',
  },

  // Electricals styles
  lightningWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lightningGlowBackdrop: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF3C7',
  },
  boltShapeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  boltTopSegment: {
    position: 'absolute',
    width: 16,
    height: 4,
    backgroundColor: '#FDE047',
    top: 4,
    left: 6,
    transform: [{ rotate: '-35deg' }],
  },
  boltMiddleSegment: {
    position: 'absolute',
    width: 14,
    height: 4,
    backgroundColor: '#EAB308',
    top: 14,
    left: 10,
    transform: [{ rotate: '45deg' }],
  },
  boltBottomTip: {
    position: 'absolute',
    width: 10,
    height: 3,
    backgroundColor: '#CA8A04',
    bottom: 4,
    left: 8,
  },

  // Suspension styles
  suspensionScene: {
    width: '92%',
    height: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  strutAssembly: {
    width: 15,
    height: 38,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  strutTopMount: {
    width: 12,
    height: 4,
    backgroundColor: '#0F172A',
    borderRadius: 2,
  },
  strutShaftChrome: {
    width: 4,
    height: 6,
    backgroundColor: '#E2E8F0',
  },
  coilSpringBox: {
    width: 14,
    height: 20,
    backgroundColor: '#0F172A',
    borderRadius: 3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 1,
  },
  springRing: {
    width: 12,
    height: 3,
    backgroundColor: '#2563EB',
    borderRadius: 1.5,
  },
  strutLowerFork: {
    width: 8,
    height: 6,
    backgroundColor: '#475569',
    borderRadius: 2,
  },
  discRotorScene: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rotorOuterRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#94A3B8',
    backgroundColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rotorCenterHub: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#475569',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  lugNutHole: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#E2E8F0',
  },
  redBrakeCaliper: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 15,
    backgroundColor: '#DC2626',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#991B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caliperPadPiston: {
    width: 4,
    height: 6,
    backgroundColor: '#FEF2F2',
    borderRadius: 1,
  },

  // Exhaust styles
  exhaustScene: {
    width: '92%',
    height: '92%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mufflerCanister: {
    width: 30,
    height: 18,
    backgroundColor: '#64748B',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    overflow: 'hidden',
    position: 'relative',
  },
  canisterSheen: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    top: 2,
  },
  dualTipsGroup: {
    flexDirection: 'row',
    gap: 4,
    position: 'absolute',
    bottom: 2,
  },
  exhaustTipPipe: {
    width: 9,
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#475569',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 1,
  },
  exhaustInnerBore: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#0F172A',
  },
  exhaustInletPipe: {
    position: 'absolute',
    top: 3,
    width: 8,
    height: 8,
    backgroundColor: '#475569',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  // More 2x2 Grid
  moreGridContainer: {
    width: 28,
    height: 28,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  moreBlueSquare: {
    width: 12,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#1565FF',
  },
});
