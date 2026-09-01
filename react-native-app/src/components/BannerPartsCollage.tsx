import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-paper';

export const BannerPartsCollage: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Background Radial Glow */}
      <View style={styles.glowBackdrop} />

      {/* Main Studio Render Composition */}
      <View style={styles.compositionBox}>
        {/* Top Floating Badge */}
        <View style={styles.floatingTag}>
          <Icon source="check-decagram" size={14} color="#10B981" />
          <Text style={styles.floatingTagText}>100% GENUINE</Text>
        </View>

        {/* Central Graphic: Turbo & Engine Core */}
        <View style={styles.centerDisc}>
          <View style={styles.innerDiscRing}>
            <Icon source="car-turbocharger" size={48} color="#60A5FA" />
          </View>
        </View>

        {/* Speed streak accents */}
        <View style={styles.streakLine1} />
        <View style={styles.streakLine2} />

        {/* Bottom Specs Pill */}
        <View style={styles.bottomSpecPill}>
          <Icon source="shield-car" size={13} color="#FBBF24" />
          <Text style={styles.bottomSpecText}>OEM VERIFIED</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 135,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  glowBackdrop: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1E40AF',
    opacity: 0.5,
  },
  compositionBox: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderWidth: 1.5,
    borderColor: 'rgba(96, 165, 250, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  floatingTag: {
    position: 'absolute',
    top: -8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#064E3B',
    borderWidth: 1,
    borderColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 10,
  },
  floatingTagText: {
    color: '#6EE7B7',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  centerDisc: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(30, 58, 138, 0.6)',
    borderWidth: 2,
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDiscRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakLine1: {
    position: 'absolute',
    left: 8,
    top: 36,
    width: 14,
    height: 2,
    backgroundColor: '#60A5FA',
    borderRadius: 1,
    opacity: 0.7,
  },
  streakLine2: {
    position: 'absolute',
    right: 8,
    bottom: 36,
    width: 18,
    height: 2,
    backgroundColor: '#FBBF24',
    borderRadius: 1,
    opacity: 0.7,
  },
  bottomSpecPill: {
    position: 'absolute',
    bottom: -8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#78350F',
    borderWidth: 1,
    borderColor: '#D97706',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 10,
  },
  bottomSpecText: {
    color: '#FDE68A',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});

export default BannerPartsCollage;
