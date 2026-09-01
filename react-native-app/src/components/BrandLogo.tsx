import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface CarBrandBadgeProps {
  brand?: string;
  size?: number;
  active?: boolean;
  style?: any;
}

export const CarBrandBadge: React.FC<CarBrandBadgeProps> = ({
  brand = 'All',
  size = 38,
  active = false,
  style,
}) => {
  const b = (brand || '').toLowerCase().trim();

  // Custom high-fidelity brand emblem vectors
  const renderBrandEmblem = () => {
    // 1. Maruti Suzuki (Red & Blue Suzuki 'S' Emblem)
    if (b.includes('maruti') || b.includes('suzuki')) {
      return (
        <View style={styles.center}>
          <Text style={{ fontSize: size * 0.44, fontWeight: '900', color: '#E11D48', fontStyle: 'italic' }}>
            S
          </Text>
        </View>
      );
    }

    // 2. Hyundai (Slanted Blue 'H' Emblem)
    if (b.includes('hyundai')) {
      return (
        <View style={[styles.center, styles.hyundaiOval, { width: size * 0.72, height: size * 0.48 }]}>
          <Text style={{ fontSize: size * 0.36, fontWeight: '900', color: '#002C6C', transform: [{ skewX: '-14deg' }] }}>
            H
          </Text>
        </View>
      );
    }

    // 3. Tata Motors (Royal Blue Tata Emblem with Ring)
    if (b.includes('tata')) {
      return (
        <View style={[styles.center, styles.tataRing, { width: size * 0.68, height: size * 0.68 }]}>
          <Text style={{ fontSize: size * 0.36, fontWeight: '900', color: '#00539B' }}>
            T
          </Text>
        </View>
      );
    }

    // 4. Mahindra (Crimson Twin Peaks / 'M' Badge)
    if (b.includes('mahindra')) {
      return (
        <View style={styles.center}>
          <Text style={{ fontSize: size * 0.38, fontWeight: '900', color: '#D32F2F', letterSpacing: -1 }}>
            M
          </Text>
        </View>
      );
    }

    // 5. Toyota (Triple Oval Red/Black Toyota 'T')
    if (b.includes('toyota')) {
      return (
        <View style={[styles.center, styles.toyotaOval, { width: size * 0.72, height: size * 0.52 }]}>
          <Text style={{ fontSize: size * 0.36, fontWeight: '900', color: '#EB0A1E' }}>
            T
          </Text>
        </View>
      );
    }

    // 6. Honda (Classic Red/Chrome Bold 'H')
    if (b.includes('honda')) {
      return (
        <View style={styles.center}>
          <Text style={{ fontSize: size * 0.44, fontWeight: '900', color: '#CC0000' }}>
            H
          </Text>
        </View>
      );
    }

    // 7. Kia (Modern Bold Typography)
    if (b.includes('kia')) {
      return (
        <View style={styles.center}>
          <Text style={{ fontSize: size * 0.28, fontWeight: '900', color: '#05141F', letterSpacing: 0.5 }}>
            KIA
          </Text>
        </View>
      );
    }

    // 8. Volkswagen (VW Double Letter in Circle)
    if (b.includes('volkswagen') || b.includes('vw')) {
      return (
        <View style={[styles.center, styles.vwRing, { width: size * 0.68, height: size * 0.68 }]}>
          <Text style={{ fontSize: size * 0.28, fontWeight: '900', color: '#001E50', lineHeight: size * 0.32 }}>
            VW
          </Text>
        </View>
      );
    }

    // 9. Ford (Blue Oval)
    if (b.includes('ford')) {
      return (
        <View style={[styles.center, styles.fordOval, { width: size * 0.74, height: size * 0.46 }]}>
          <Text style={{ fontSize: size * 0.26, fontWeight: '900', color: '#FFFFFF', fontStyle: 'italic' }}>
            Ford
          </Text>
        </View>
      );
    }

    // Default Fallback Initial
    const initial = (brand || 'A').charAt(0).toUpperCase();
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: size * 0.42, fontWeight: '800', color: active ? '#1565FF' : '#334155' }}>
          {initial}
        </Text>
      </View>
    );
  };

  const badgeContent = (
    <View
      style={[
        styles.badgeContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: active ? '#EFF6FF' : '#FFFFFF',
          borderColor: active ? '#1565FF' : '#E2E8F0',
        },
      ]}
    >
      {renderBrandEmblem()}
    </View>
  );

  if (style) {
    return <View style={style}>{badgeContent}</View>;
  }

  return badgeContent;
};

export const SuzukiEmblemSvg = () => <CarBrandBadge brand="suzuki" />;
export const HyundaiEmblemSvg = () => <CarBrandBadge brand="hyundai" />;
export const TataEmblemSvg = () => <CarBrandBadge brand="tata" />;
export const MahindraEmblemSvg = () => <CarBrandBadge brand="mahindra" />;
export const ToyotaEmblemSvg = () => <CarBrandBadge brand="toyota" />;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  hyundaiOval: {
    borderWidth: 1.5,
    borderColor: '#002C6C',
    borderRadius: 14,
  },
  tataRing: {
    borderWidth: 1.5,
    borderColor: '#00539B',
    borderRadius: 20,
  },
  toyotaOval: {
    borderWidth: 1.5,
    borderColor: '#EB0A1E',
    borderRadius: 14,
  },
  vwRing: {
    borderWidth: 1.5,
    borderColor: '#001E50',
    borderRadius: 20,
  },
  fordOval: {
    backgroundColor: '#002C6C',
    borderRadius: 14,
  },
});

export const BrandLogo = CarBrandBadge;
export default CarBrandBadge;
