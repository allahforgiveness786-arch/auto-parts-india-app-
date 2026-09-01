import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-paper';

export const BannerPartsCollage: React.FC = () => {
  return (
    <View style={styles.collageWrapper}>
      {/* Background Soft Blue Radial Glow Flare */}
      <View style={styles.flareGlow} />

      {/* Modern High-End Automotive Parts Composition */}
      <View style={styles.showcaseCard}>
        {/* 1. Top Brake Rotor & Shock Strut */}
        <View style={styles.topRow}>
          <View style={styles.partPill}>
            <Icon source="car-brake-disc" size={24} color="#60A5FA" />
            <Text style={styles.partLabel}>Brakes</Text>
          </View>
          <View style={[styles.partPill, { backgroundColor: 'rgba(59, 130, 246, 0.25)' }]}>
            <Icon source="car-turbocharger" size={24} color="#FBBF24" />
            <Text style={[styles.partLabel, { color: '#FDE047' }]}>Turbo</Text>
          </View>
        </View>

        {/* 2. Center Hero Badge */}
        <View style={styles.centerBadge}>
          <Icon source="car-sports" size={44} color="#FFFFFF" />
          <View style={styles.oemVerifiedPill}>
            <Text style={styles.oemVerifiedText}>100% OEM</Text>
          </View>
        </View>

        {/* 3. Bottom Row Parts */}
        <View style={styles.bottomRow}>
          <View style={[styles.miniPartChip, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
            <Icon source="car-battery" size={16} color="#34D399" />
            <Text style={[styles.miniChipText, { color: '#6EE7B7' }]}>12V</Text>
          </View>
          <View style={[styles.miniPartChip, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
            <Icon source="engine" size={16} color="#F87171" />
            <Text style={[styles.miniChipText, { color: '#FCA5A5' }]}>V6</Text>
          </View>
          <View style={[styles.miniPartChip, { backgroundColor: 'rgba(168, 85, 247, 0.2)' }]}>
            <Icon source="lightning-bolt" size={16} color="#C084FC" />
            <Text style={[styles.miniChipText, { color: '#E9D5FF' }]}>ECU</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  collageWrapper: {
    width: '100%',
    height: 140,
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
    opacity: 0.6,
    top: 0,
    right: 0,
  },
  showcaseCard: {
    width: 130,
    height: 130,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderWidth: 1.5,
    borderColor: 'rgba(96, 165, 250, 0.35)',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#1565FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    gap: 6,
    width: '100%',
    justifyContent: 'center',
  },
  partPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 58, 138, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3,
    borderWidth: 1,
    borderColor: 'rgba(147, 197, 253, 0.3)',
  },
  partLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#93C5FD',
  },
  centerBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  oemVerifiedPill: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginTop: -4,
  },
  oemVerifiedText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 4,
    width: '100%',
    justifyContent: 'center',
  },
  miniPartChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  miniChipText: {
    fontSize: 8,
    fontWeight: '800',
  },
});

export default BannerPartsCollage;
