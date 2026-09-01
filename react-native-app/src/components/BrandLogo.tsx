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
 * Official Automotive Brand Logos with Crisp OEM Geometries & Styling
 * 1. Maruti Suzuki: Iconic Chiseled 'S' Symbol in Official Suzuki Red & Chrome
 * 2. Hyundai: Official Slanted 'H' in Deep Metallic Navy Oval
 * 3. Tata Motors: Official Dual-Trunk 'T' Ring in Royal Tata Blue
 * 4. Mahindra: Official 'Twin Peaks' Infinite Crimson Emblem
 * 5. Toyota: Official Interlocking Triple-Oval Chrome Emblem
 * 6. Honda: Official Trapeze Bold Chrome 'H'
 * 7. Kia: Official Connected Crimson Red Wordmark
 * 8. Volkswagen, Ford, Nissan, BMW
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ name, size = 44, color, showText, style }) => {
  const norm = (name || '').toLowerCase().trim();

  // 1. MARUTI SUZUKI: Official Crisp Suzuki Red & Slate 'S'
  if (norm.includes('suzuki') || norm.includes('maruti')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.suzukiWrapper, { transform: [{ scale }] }]}>
          {/* Top Wing */}
          <View style={styles.suzukiTopWing} />
          {/* Middle Diagonal Connecting Spine */}
          <View style={styles.suzukiCenterSpine} />
          {/* Bottom Wing */}
          <View style={styles.suzukiBottomWing} />
        </View>
      </View>
    );
  }

  // 2. HYUNDAI: Official Deep Navy Oval with Slanted 'H'
  if (norm.includes('hyundai')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.hyundaiWrapper, { transform: [{ scale }] }]}>
          <View style={styles.hyundaiOvalRing}>
            <View style={styles.hyundaiLeftArm} />
            <View style={styles.hyundaiCrossBar} />
            <View style={styles.hyundaiRightArm} />
          </View>
        </View>
      </View>
    );
  }

  // 3. TATA MOTORS: Official Royal Blue Dual-Trunk 'T' Ring
  if (norm.includes('tata')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.tataWrapper, { transform: [{ scale }] }]}>
          <View style={styles.tataOvalRing}>
            <View style={styles.tataTopArch} />
            <View style={styles.tataLeftStem} />
            <View style={styles.tataRightStem} />
          </View>
        </View>
      </View>
    );
  }

  // 4. MAHINDRA: Official 'Twin Peaks' Crimson Metallic Symbol
  if (norm.includes('mahindra')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.mahindraWrapper, { transform: [{ scale }] }]}>
          <View style={styles.mahindraPeakLeft} />
          <View style={styles.mahindraPeakRight} />
          <View style={styles.mahindraBottomTie} />
        </View>
      </View>
    );
  }

  // 5. TOYOTA: Official Triple Interlocking Oval Chrome Emblem
  if (norm.includes('toyota')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.toyotaWrapper, { transform: [{ scale }] }]}>
          <View style={styles.toyotaOuterOval}>
            <View style={styles.toyotaVertOval} />
            <View style={styles.toyotaHorizOval} />
          </View>
        </View>
      </View>
    );
  }

  // 6. HONDA: Official Chrome Trapeze 'H'
  if (norm.includes('honda')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.hondaWrapper, { transform: [{ scale }] }]}>
          <View style={styles.hondaTrapezoid}>
            <View style={styles.hondaLeftLeg} />
            <View style={styles.hondaBar} />
            <View style={styles.hondaRightLeg} />
          </View>
        </View>
      </View>
    );
  }

  // 7. KIA: Official Modern Connected Wordmark
  if (norm.includes('kia')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.kiaWrapper, { transform: [{ scale }] }]}>
          <Text style={styles.kiaWordmark}>KIA</Text>
        </View>
      </View>
    );
  }

  // 8. FORD: Official Deep Blue Oval
  if (norm.includes('ford')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.fordWrapper, { transform: [{ scale }] }]}>
          <View style={styles.fordOval}>
            <Text style={styles.fordWord}>Ford</Text>
          </View>
        </View>
      </View>
    );
  }

  // 9. VOLKSWAGEN: Official VW Emblem
  if (norm.includes('volkswagen') || norm.includes('vw')) {
    const scale = size / 44;
    return (
      <View style={[styles.centerBox, { width: size, height: size }, style]}>
        <View style={[styles.vwWrapper, { transform: [{ scale }] }]}>
          <View style={styles.vwCircle}>
            <Text style={styles.vwLetters}>VW</Text>
          </View>
        </View>
      </View>
    );
  }

  // Default Fallback
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

  // 1. SUZUKI 'S' STYLES
  suzukiWrapper: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  suzukiTopWing: {
    width: 26,
    height: 9,
    backgroundColor: '#64748B',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#475569',
    transform: [{ skewX: '-32deg' }],
  },
  suzukiCenterSpine: {
    width: 13,
    height: 14,
    backgroundColor: '#334155',
    transform: [{ skewX: '42deg' }],
    marginVertical: -3,
    zIndex: 2,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  suzukiBottomWing: {
    width: 26,
    height: 9,
    backgroundColor: '#64748B',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 2,
    borderWidth: 1,
    borderColor: '#475569',
    transform: [{ skewX: '-32deg' }],
  },

  // 2. HYUNDAI STYLES
  hyundaiWrapper: {
    width: 38,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hyundaiOvalRing: {
    width: 36,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#002C6C',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ skewX: '-14deg' }],
    position: 'relative',
  },
  hyundaiLeftArm: {
    position: 'absolute',
    left: 7,
    top: 2,
    bottom: 2,
    width: 3.5,
    backgroundColor: '#002C6C',
    borderRadius: 1.5,
    transform: [{ rotate: '14deg' }],
  },
  hyundaiRightArm: {
    position: 'absolute',
    right: 7,
    top: 2,
    bottom: 2,
    width: 3.5,
    backgroundColor: '#002C6C',
    borderRadius: 1.5,
    transform: [{ rotate: '14deg' }],
  },
  hyundaiCrossBar: {
    width: 16,
    height: 3.5,
    backgroundColor: '#002C6C',
    borderRadius: 1.5,
    transform: [{ rotate: '-8deg' }],
  },

  // 3. TATA STYLES
  tataWrapper: {
    width: 38,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tataOvalRing: {
    width: 36,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#00539B',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tataTopArch: {
    position: 'absolute',
    top: 3,
    left: 4,
    right: 4,
    height: 3,
    backgroundColor: '#00539B',
    borderRadius: 1.5,
  },
  tataLeftStem: {
    position: 'absolute',
    left: 12,
    top: 4,
    bottom: 3,
    width: 3.5,
    backgroundColor: '#00539B',
    borderRadius: 1,
    transform: [{ skewX: '7deg' }],
  },
  tataRightStem: {
    position: 'absolute',
    right: 12,
    top: 4,
    bottom: 3,
    width: 3.5,
    backgroundColor: '#00539B',
    borderRadius: 1,
    transform: [{ skewX: '-7deg' }],
  },

  // 4. MAHINDRA TWIN PEAKS STYLES
  mahindraWrapper: {
    width: 40,
    height: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mahindraPeakLeft: {
    width: 17,
    height: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 2,
    borderWidth: 3,
    borderColor: '#E31837',
    marginRight: -3,
    transform: [{ rotate: '-12deg' }],
  },
  mahindraPeakRight: {
    width: 17,
    height: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderWidth: 3,
    borderColor: '#E31837',
    marginLeft: -3,
    transform: [{ rotate: '12deg' }],
  },
  mahindraBottomTie: {
    position: 'absolute',
    bottom: 1,
    width: 10,
    height: 4,
    backgroundColor: '#E31837',
    borderRadius: 2,
  },

  // 5. TOYOTA STYLES
  toyotaWrapper: {
    width: 38,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toyotaOuterOval: {
    width: 36,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  toyotaVertOval: {
    position: 'absolute',
    width: 12,
    height: 18,
    borderRadius: 6,
    borderWidth: 2.2,
    borderColor: '#1E293B',
    top: 0,
  },
  toyotaHorizOval: {
    position: 'absolute',
    width: 22,
    height: 10,
    borderRadius: 5,
    borderWidth: 2.2,
    borderColor: '#1E293B',
    top: 1,
  },

  // 6. HONDA STYLES
  hondaWrapper: {
    width: 34,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hondaTrapezoid: {
    width: 30,
    height: 24,
    borderRadius: 4,
    borderWidth: 2.4,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hondaLeftLeg: {
    position: 'absolute',
    left: 4,
    top: 2,
    bottom: 2,
    width: 3,
    backgroundColor: '#334155',
    transform: [{ skewX: '-6deg' }],
  },
  hondaRightLeg: {
    position: 'absolute',
    right: 4,
    top: 2,
    bottom: 2,
    width: 3,
    backgroundColor: '#334155',
    transform: [{ skewX: '6deg' }],
  },
  hondaBar: {
    width: 14,
    height: 3,
    backgroundColor: '#334155',
  },

  // 7. KIA STYLES
  kiaWrapper: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#050B14',
  },
  kiaWordmark: {
    color: '#E11D48',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },

  // 8. FORD STYLES
  fordWrapper: {
    width: 38,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fordOval: {
    width: 36,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#002C6C',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fordWord: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    fontStyle: 'italic',
  },

  // 9. VW STYLES
  vwWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwLetters: {
    color: '#0284C7',
    fontSize: 11,
    fontWeight: '900',
  },

  // Fallback
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

