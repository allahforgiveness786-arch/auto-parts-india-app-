import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export interface BrandLogoProps {
  name?: string;
  size?: number;
  color?: string;
  showText?: boolean;
  style?: any;
}

/**
 * High-definition Official 3D Car Brand Logos & Emblems
 * Matches official Indian & Global automotive OEM trademarks:
 * 1. Maruti Suzuki: 3D Beveled Chrome 'S'
 * 2. Toyota: Official 3D Triple-Oval Chrome Emblem
 * 3. Mahindra: 3D Metallic Crimson 'Twin Peaks' Infinite Loop Wings
 * 4. Hyundai: 3D Navy Metallic Beveled Oval with Slanted 'H'
 * 5. Tata Motors: 3D Royal Blue Oval Ring with Double-Trunk 'T'
 * 6. Honda: Official Chrome Trapeze Bold 'H'
 * 7. Kia: Official Crimson Tech Connected Wordmark
 * 8. Volkswagen: Official Chrome Circular 'V' & 'W'
 * 9. Ford: Official Deep Blue Oval with Chrome Script
 * 10. Nissan / Renault / BMW / Mercedes / Audi
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ name, size = 44, color, showText, style }) => {
  const norm = (name || '').toLowerCase().trim();

  // 1. MARUTI SUZUKI: Official Chiseled 3D Beveled Chrome 'S'
  if (norm.includes('suzuki') || norm.includes('maruti')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
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

  // 2. TOYOTA: Official 3D Triple-Oval Chrome Emblem
  if (norm.includes('toyota')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.toyotaContainer, { transform: [{ scale }] }]}>
          {/* Outer Chrome Oval Ring */}
          <View style={styles.toyotaOuterRing}>
            {/* Inner Vertical & Horizontal Intersecting Ovals */}
            <View style={styles.toyotaInnerVerticalOval} />
            <View style={styles.toyotaInnerHorizontalOval} />
          </View>
        </View>
      </View>
    );
  }

  // 3. MAHINDRA: Official 3D Metallic Crimson Red "Twin Peaks" Wings
  if (norm.includes('mahindra')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
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
          {/* Center Intersect */}
          <View style={styles.mahindraCenterCrossover} />
        </View>
      </View>
    );
  }

  // 4. HYUNDAI: Official 3D Metallic Navy Blue Oval with Slanted 'H'
  if (norm.includes('hyundai')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.hyundaiContainer, { transform: [{ scale }] }]}>
          {/* Navy Blue Outer Chrome Oval */}
          <View style={styles.hyundaiOuterOval}>
            {/* Slanted Stylized 'H' Left Pillar */}
            <View style={styles.hyundaiLeftPillar} />
            {/* Dynamic Bridge */}
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

  // 5. TATA MOTORS: Official 3D Royal Metallic Blue Oval with Dual-Trunk 'T'
  if (norm.includes('tata')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.tataContainer, { transform: [{ scale }] }]}>
          {/* Royal Blue Metallic Oval Ring */}
          <View style={styles.tataOuterOvalRing}>
            {/* Top Arched Horizontal T-Bar */}
            <View style={styles.tataTopBar} />
            {/* Left Vertical Trunk */}
            <View style={styles.tataLeftTrunk} />
            {/* Right Vertical Trunk */}
            <View style={styles.tataRightTrunk} />
            {/* Chrome Ridge Highlight */}
            <View style={styles.tataChromeGleam} />
          </View>
        </View>
      </View>
    );
  }

  // 6. HONDA: Official Chrome Trapeze Bold 'H'
  if (norm.includes('honda')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.hondaContainer, { transform: [{ scale }] }]}>
          <View style={styles.hondaOuterTrapezoid}>
            <View style={styles.hondaLeftBar} />
            <View style={styles.hondaMidBar} />
            <View style={styles.hondaRightBar} />
            <View style={styles.hondaGleam} />
          </View>
        </View>
      </View>
    );
  }

  // 7. KIA: Official High-Tech Modern Connected Red 'KIA' Emblem
  if (norm.includes('kia')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.kiaContainer, { transform: [{ scale }] }]}>
          <Text style={styles.kiaText}>KIA</Text>
        </View>
      </View>
    );
  }

  // 8. VOLKSWAGEN: Official Chrome Dual-Circle 'V' over 'W'
  if (norm.includes('volkswagen') || norm.includes('vw')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.vwContainer, { transform: [{ scale }] }]}>
          <View style={styles.vwOuterCircle}>
            {/* Top 'V' */}
            <View style={styles.vwTopVBox}>
              <View style={styles.vwLeftVLeg} />
              <View style={styles.vwRightVLeg} />
            </View>
            {/* Horizontal Split Line */}
            <View style={styles.vwSplitLine} />
            {/* Bottom 'W' */}
            <View style={styles.vwBottomWBox}>
              <View style={styles.vwWLeg1} />
              <View style={styles.vwWLeg2} />
              <View style={styles.vwWLeg3} />
              <View style={styles.vwWLeg4} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  // 9. FORD: Official Deep Royal Blue Oval with Silver Script Emblem
  if (norm.includes('ford')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.fordContainer, { transform: [{ scale }] }]}>
          <View style={styles.fordOuterOval}>
            <View style={styles.fordInnerOval}>
              <Text style={styles.fordText}>Ford</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // 10. NISSAN / RENAULT / OTHER
  if (norm.includes('nissan')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.nissanContainer, { transform: [{ scale }] }]}>
          <View style={styles.nissanOuterCircle}>
            <View style={styles.nissanCenterBar}>
              <Text style={styles.nissanText}>NISSAN</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // 11. APP ICON / DEFAULT
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
    borderColor: '#64748B',
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
    backgroundColor: '#334155',
    borderRadius: 1,
    transform: [{ skewX: '-8deg' }],
  },
  hondaRightBar: {
    position: 'absolute',
    right: 5,
    top: 2,
    bottom: 2,
    width: 3.5,
    backgroundColor: '#334155',
    borderRadius: 1,
    transform: [{ skewX: '8deg' }],
  },
  hondaMidBar: {
    width: 16,
    height: 3.5,
    backgroundColor: '#334155',
    borderRadius: 1,
  },
  hondaGleam: {
    position: 'absolute',
    top: 1,
    left: 4,
    width: 10,
    height: 2,
    backgroundColor: '#94A3B8',
  },

  // 7. KIA STYLES
  kiaContainer: {
    width: 42,
    height: 24,
    backgroundColor: '#0F172A',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  kiaText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },

  // 8. VOLKSWAGEN STYLES
  vwContainer: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwOuterCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2.6,
    borderColor: '#0284C7',
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  vwTopVBox: {
    position: 'absolute',
    top: 5,
    width: 18,
    height: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vwLeftVLeg: {
    width: 2.4,
    height: 10,
    backgroundColor: '#0284C7',
    transform: [{ rotate: '-24deg' }],
    left: 4,
  },
  vwRightVLeg: {
    width: 2.4,
    height: 10,
    backgroundColor: '#0284C7',
    transform: [{ rotate: '24deg' }],
    right: 4,
  },
  vwSplitLine: {
    position: 'absolute',
    width: 28,
    height: 1.5,
    backgroundColor: '#0284C7',
    top: 16,
  },
  vwBottomWBox: {
    position: 'absolute',
    bottom: 5,
    width: 20,
    height: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vwWLeg1: { width: 2, height: 11, backgroundColor: '#0284C7', transform: [{ rotate: '-18deg' }] },
  vwWLeg2: { width: 2, height: 11, backgroundColor: '#0284C7', transform: [{ rotate: '18deg' }] },
  vwWLeg3: { width: 2, height: 11, backgroundColor: '#0284C7', transform: [{ rotate: '-18deg' }] },
  vwWLeg4: { width: 2, height: 11, backgroundColor: '#0284C7', transform: [{ rotate: '18deg' }] },

  // 9. FORD STYLES
  fordContainer: {
    width: 44,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fordOuterOval: {
    width: 42,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fordInnerOval: {
    width: 36,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#93C5FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fordText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },

  // 10. NISSAN STYLES
  nissanContainer: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nissanOuterCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2.5,
    borderColor: '#475569',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nissanCenterBar: {
    position: 'absolute',
    width: 38,
    height: 12,
    backgroundColor: '#334155',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nissanText: {
    color: '#FFFFFF',
    fontSize: 7.5,
    fontWeight: '900',
    letterSpacing: 1,
  },

  // 11. FALLBACK BADGE & APP EMBLEM
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
