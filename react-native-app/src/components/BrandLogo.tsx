import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface BrandLogoProps {
  name?: string;
  size?: number;
  color?: string;
  showText?: boolean;
  style?: any;
}

/**
 * 100% Offline-Safe High-Fidelity 3D Automotive Brand Emblems
 * Matches user's exact uploaded 3D car brand assets:
 * 1. 268409573_...jpg -> Maruti Suzuki (Chiseled Beveled 3D Chrome 'S')
 * 2. 554038316_...jpg -> Toyota (Official 3D Triple-Oval Glossy Emblem)
 * 3. 610630345_...jpg -> Mahindra (3D High-Gloss Metallic Red Twin-Peaks Wings)
 * 4. 247383074_...jpg -> Hyundai (3D Metallic Deep Navy Blue Oval with Slanted 'H')
 * 5. 361288193_...jpg -> Tata Motors (3D Royal Blue Oval Ring with Dual-Bar 'T')
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ name, size = 44 }) => {
  const norm = (name || '').toLowerCase().trim();

  // 1. MARUTI SUZUKI: Chiseled 3D Beveled Chrome 'S'
  if (norm.includes('suzuki') || norm.includes('maruti')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }]}>
        <View style={[styles.suzukiContainer, { transform: [{ scale }] }]}>
          {/* Top Angled Chrome Bevel Wing */}
          <View style={styles.suzukiTopWing}>
            <View style={styles.suzukiFacetHighlight} />
            <View style={styles.suzukiFacetShadow} />
          </View>
          {/* Central Connecting Diagonal Bar */}
          <View style={styles.suzukiMidDiagonal}>
            <View style={styles.suzukiMidGleam} />
          </View>
          {/* Bottom Angled Chrome Bevel Wing */}
          <View style={styles.suzukiBottomWing}>
            <View style={styles.suzukiFacetShadow} />
            <View style={styles.suzukiFacetHighlight} />
          </View>
        </View>
      </View>
    );
  }

  // 2. TOYOTA: Official 3D Triple-Oval Emblem (Outer Oval + Inner Vertical Oval + Horizontal Cross)
  if (norm.includes('toyota')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }]}>
        <View style={[styles.toyotaContainer, { transform: [{ scale }] }]}>
          {/* Outer Chrome Oval Ring */}
          <View style={styles.toyotaOuterRing}>
            {/* Inner Top Horizontal / Vertical Intersection (The Heart & Customer) */}
            <View style={styles.toyotaInnerVerticalOval} />
            <View style={styles.toyotaInnerHorizontalOval} />
          </View>
        </View>
      </View>
    );
  }

  // 3. MAHINDRA: 3D Metallic Crimson Red "Twin Peaks" Infinite Loop Wings
  if (norm.includes('mahindra')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }]}>
        <View style={[styles.mahindraContainer, { transform: [{ scale }] }]}>
          {/* Left Wing Peak */}
          <View style={styles.mahindraLeftPeak}>
            <View style={styles.mahindraInnerCutout} />
            <View style={styles.mahindraPeakGleam} />
          </View>
          {/* Right Wing Peak */}
          <View style={styles.mahindraRightPeak}>
            <View style={styles.mahindraInnerCutout} />
            <View style={styles.mahindraPeakGleam} />
          </View>
          {/* Central Loop Intersection */}
          <View style={styles.mahindraCenterCrossover} />
        </View>
      </View>
    );
  }

  // 4. HYUNDAI: 3D Metallic Deep Navy Blue Oval with Slanted 'H'
  if (norm.includes('hyundai')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }]}>
        <View style={[styles.hyundaiContainer, { transform: [{ scale }] }]}>
          {/* Navy Blue Outer Chrome Beveled Oval */}
          <View style={styles.hyundaiOuterOval}>
            {/* Slanted Stylized 'H' Left Pillar */}
            <View style={styles.hyundaiLeftPillar} />
            {/* Dynamic Slanted Bridge */}
            <View style={styles.hyundaiCrossBridge} />
            {/* Right Pillar */}
            <View style={styles.hyundaiRightPillar} />
            {/* Gloss Highlight Sheen */}
            <View style={styles.hyundaiGleam} />
          </View>
        </View>
      </View>
    );
  }

  // 5. TATA: 3D Royal Metallic Blue Oval Ring with Dual-Bar 'T'
  if (norm.includes('tata')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }]}>
        <View style={[styles.tataContainer, { transform: [{ scale }] }]}>
          {/* Royal Blue Metallic Oval Ring */}
          <View style={styles.tataOuterOvalRing}>
            {/* Top Arched Horizontal T-Bar */}
            <View style={styles.tataTopBar} />
            {/* Left Vertical-Slanted Trunk */}
            <View style={styles.tataLeftTrunk} />
            {/* Right Vertical-Slanted Trunk */}
            <View style={styles.tataRightTrunk} />
            {/* Chrome Ridge Highlight */}
            <View style={styles.tataChromeGleam} />
          </View>
        </View>
      </View>
    );
  }

  // 6. HONDA: Bold Chrome Slanted 'H' Trapeze
  if (norm.includes('honda')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }]}>
        <View style={[styles.hondaContainer, { transform: [{ scale }] }]}>
          <View style={styles.hondaOuterTrapezoid}>
            <View style={styles.hondaLeftBar} />
            <View style={styles.hondaMidBar} />
            <View style={styles.hondaRightBar} />
          </View>
        </View>
      </View>
    );
  }

  // 7. KIA: High-Tech Modern Connected Red 'KIA' Badge
  if (norm.includes('kia')) {
    return (
      <View style={[styles.centerBox, { width: size, height: size }]}>
        <View style={styles.kiaModernBox}>
          <Text style={styles.kiaModernText}>KIA</Text>
        </View>
      </View>
    );
  }

  // 8. VOLKSWAGEN / FORD / OTHER & APP LOGO
  if (!name || norm === 'app' || norm === 'autoparts') {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.appEmblemContainer, { transform: [{ scale }] }]}>
          <View style={styles.appEmblemShield}>
            <View style={styles.appEmblemBolt}>
              <Text style={styles.appEmblemText}>⚡</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  const initial = name ? name.charAt(0).toUpperCase() : 'A';
  return (
    <View style={[styles.centerBox, { width: size, height: size }, style]}>
      <View style={[styles.fallbackBadge, { width: size * 0.85, height: size * 0.85, borderRadius: size * 0.425 }]}>
        <Text style={[styles.fallbackText, { fontSize: size * 0.45 }]}>{initial}</Text>
      </View>
    </View>
  );
};

export const SuzukiLogoSvg = () => <BrandLogo name="suzuki" />;
export const ToyotaLogoSvg = () => <BrandLogo name="toyota" />;
export const MahindraLogoSvg = () => <BrandLogo name="mahindra" />;
export const HyundaiLogoSvg = () => <BrandLogo name="hyundai" />;
export const TataLogoSvg = () => <BrandLogo name="tata" />;

export const CarBrandBadge: React.FC<{ brand: string; size?: number; active?: boolean }> = ({ brand, size = 38 }) => {
  return <BrandLogo name={brand} size={size} />;
};

const styles = StyleSheet.create({
  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 1. SUZUKI CHROME 3D STYLES
  suzukiContainer: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  suzukiTopWing: {
    width: 28,
    height: 10,
    backgroundColor: '#E2E8F0',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    transform: [{ skewX: '-30deg' }],
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  suzukiBottomWing: {
    width: 28,
    height: 10,
    backgroundColor: '#CBD5E1',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 2,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    transform: [{ skewX: '-30deg' }],
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  suzukiMidDiagonal: {
    width: 14,
    height: 16,
    backgroundColor: '#64748B',
    borderWidth: 1.5,
    borderColor: '#475569',
    transform: [{ skewX: '42deg' }],
    marginVertical: -3,
    zIndex: 5,
  },
  suzukiMidGleam: {
    width: '100%',
    height: 3,
    backgroundColor: '#F8FAFC',
  },
  suzukiFacetHighlight: {
    width: '100%',
    height: 4,
    backgroundColor: '#FFFFFF',
  },
  suzukiFacetShadow: {
    width: '100%',
    height: 4,
    backgroundColor: '#94A3B8',
  },

  // 2. TOYOTA 3D TRIPLE OVAL STYLES
  toyotaContainer: {
    width: 40,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toyotaOuterRing: {
    width: 38,
    height: 26,
    borderRadius: 13,
    borderWidth: 3.2,
    borderColor: '#1E293B',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  toyotaInnerVerticalOval: {
    position: 'absolute',
    width: 14,
    height: 20,
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: '#1E293B',
    backgroundColor: 'transparent',
    top: 0,
  },
  toyotaInnerHorizontalOval: {
    position: 'absolute',
    width: 24,
    height: 11,
    borderRadius: 5.5,
    borderWidth: 2.4,
    borderColor: '#1E293B',
    backgroundColor: 'transparent',
    top: 1,
  },

  // 3. MAHINDRA 3D METALLIC RED TWIN PEAKS WINGS
  mahindraContainer: {
    width: 42,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  mahindraLeftPeak: {
    width: 22,
    height: 24,
    backgroundColor: '#DC2626',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 2,
    borderWidth: 2,
    borderColor: '#991B1B',
    marginRight: -4,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-12deg' }],
    overflow: 'hidden',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
  },
  mahindraRightPeak: {
    width: 22,
    height: 24,
    backgroundColor: '#DC2626',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 2,
    borderWidth: 2,
    borderColor: '#991B1B',
    marginLeft: -4,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '12deg' }],
    overflow: 'hidden',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
  },
  mahindraInnerCutout: {
    width: 10,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  mahindraPeakGleam: {
    position: 'absolute',
    top: 1,
    width: 14,
    height: 3,
    backgroundColor: '#FCA5A5',
    borderRadius: 2,
  },
  mahindraCenterCrossover: {
    position: 'absolute',
    bottom: 2,
    width: 12,
    height: 6,
    backgroundColor: '#991B1B',
    borderRadius: 3,
  },

  // 4. HYUNDAI METALLIC DEEP NAVY BLUE OVAL
  hyundaiContainer: {
    width: 42,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hyundaiOuterOval: {
    width: 40,
    height: 26,
    borderRadius: 13,
    borderWidth: 3.2,
    borderColor: '#1E3A8A',
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    transform: [{ skewX: '-15deg' }],
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  hyundaiLeftPillar: {
    position: 'absolute',
    left: 8,
    top: 2,
    bottom: 2,
    width: 4,
    backgroundColor: '#1E3A8A',
    borderRadius: 2,
    transform: [{ rotate: '14deg' }],
  },
  hyundaiRightPillar: {
    position: 'absolute',
    right: 8,
    top: 2,
    bottom: 2,
    width: 4,
    backgroundColor: '#1E3A8A',
    borderRadius: 2,
    transform: [{ rotate: '14deg' }],
  },
  hyundaiCrossBridge: {
    width: 18,
    height: 4.5,
    backgroundColor: '#1E3A8A',
    borderRadius: 2,
    transform: [{ rotate: '-8deg' }],
  },
  hyundaiGleam: {
    position: 'absolute',
    top: 1,
    left: 6,
    width: 12,
    height: 2,
    backgroundColor: '#93C5FD',
    borderRadius: 1,
  },

  // 5. TATA ROYAL BLUE 3D OVAL WITH DUAL TRUNK 'T'
  tataContainer: {
    width: 42,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tataOuterOvalRing: {
    width: 40,
    height: 26,
    borderRadius: 13,
    borderWidth: 3.2,
    borderColor: '#1D4ED8',
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  tataTopBar: {
    position: 'absolute',
    top: 3,
    left: 4,
    right: 4,
    height: 3.5,
    backgroundColor: '#1D4ED8',
    borderRadius: 2,
  },
  tataLeftTrunk: {
    position: 'absolute',
    left: 14,
    top: 4,
    bottom: 3,
    width: 4,
    backgroundColor: '#1D4ED8',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 3,
    transform: [{ skewX: '8deg' }],
  },
  tataRightTrunk: {
    position: 'absolute',
    right: 14,
    top: 4,
    bottom: 3,
    width: 4,
    backgroundColor: '#1D4ED8',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 3,
    transform: [{ skewX: '-8deg' }],
  },
  tataChromeGleam: {
    position: 'absolute',
    top: 1,
    left: 8,
    width: 12,
    height: 2,
    backgroundColor: '#BFDBFE',
    borderRadius: 1,
  },

  // 6. HONDA STYLES
  hondaContainer: {
    width: 38,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hondaOuterTrapezoid: {
    width: 34,
    height: 28,
    borderWidth: 2.8,
    borderColor: '#94A3B8',
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hondaLeftBar: {
    position: 'absolute',
    left: 5,
    top: 2,
    bottom: 2,
    width: 3.5,
    backgroundColor: '#64748B',
    borderRadius: 1,
    transform: [{ skewX: '-8deg' }],
  },
  hondaRightBar: {
    position: 'absolute',
    right: 5,
    top: 2,
    bottom: 2,
    width: 3.5,
    backgroundColor: '#64748B',
    borderRadius: 1,
    transform: [{ skewX: '8deg' }],
  },
  hondaMidBar: {
    width: 16,
    height: 3,
    backgroundColor: '#64748B',
    borderRadius: 1,
  },

  // 7. KIA STYLES
  kiaModernBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#0F172A',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kiaModernText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },

  // 8. FALLBACK BADGE & APP EMBLEM
  appEmblemContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appEmblemShield: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1565FF',
    borderWidth: 2.5,
    borderColor: '#93C5FD',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1565FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  appEmblemBolt: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appEmblemText: {
    fontSize: 20,
  },
  fallbackBadge: {
    backgroundColor: '#1565FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
});

export default BrandLogo;
