import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-paper';

export interface CarBrandBadgeProps {
  brand?: string;
  size?: number;
  active?: boolean;
  style?: any;
}

export const CarBrandBadge: React.FC<CarBrandBadgeProps> = ({
  brand = 'All',
  size = 44,
  active = false,
  style,
}) => {
  const b = (brand || '').toLowerCase().trim();

  const renderBadge = () => {
    // 1. Maruti Suzuki
    if (b.includes('maruti') || b.includes('suzuki')) {
      return (
        <View style={[styles.brandCard, { backgroundColor: '#FEF2F2', borderColor: active ? '#DC2626' : '#FECACA' }]}>
          <View style={styles.suzukiSWrapper}>
            <Text style={styles.suzukiSText}>S</Text>
          </View>
          <View style={styles.brandMicroTag}>
            <Text style={[styles.brandMicroLabel, { color: '#DC2626' }]}>SUZUKI</Text>
          </View>
        </View>
      );
    }

    // 2. Hyundai
    if (b.includes('hyundai')) {
      return (
        <View style={[styles.brandCard, { backgroundColor: '#F0F9FF', borderColor: active ? '#0284C7' : '#BAE6FD' }]}>
          <View style={styles.hyundaiOval}>
            <Text style={styles.hyundaiHText}>H</Text>
          </View>
          <View style={styles.brandMicroTag}>
            <Text style={[styles.brandMicroLabel, { color: '#0284C7' }]}>HYUNDAI</Text>
          </View>
        </View>
      );
    }

    // 3. Tata Motors
    if (b.includes('tata')) {
      return (
        <View style={[styles.brandCard, { backgroundColor: '#EFF6FF', borderColor: active ? '#2563EB' : '#BFDBFE' }]}>
          <View style={styles.tataCircle}>
            <Icon source="shield-car" size={20} color="#1D4ED8" />
          </View>
          <View style={styles.brandMicroTag}>
            <Text style={[styles.brandMicroLabel, { color: '#1D4ED8' }]}>TATA</Text>
          </View>
        </View>
      );
    }

    // 4. Mahindra
    if (b.includes('mahindra')) {
      return (
        <View style={[styles.brandCard, { backgroundColor: '#FFF1F2', borderColor: active ? '#E11D48' : '#FECDD3' }]}>
          <View style={styles.mahindraChevron}>
            <Icon source="chevron-triple-up" size={22} color="#BE123C" />
          </View>
          <View style={styles.brandMicroTag}>
            <Text style={[styles.brandMicroLabel, { color: '#BE123C' }]}>MAHINDRA</Text>
          </View>
        </View>
      );
    }

    // 5. Toyota
    if (b.includes('toyota')) {
      return (
        <View style={[styles.brandCard, { backgroundColor: '#FEF2F2', borderColor: active ? '#DC2626' : '#FECACA' }]}>
          <View style={styles.toyotaOval}>
            <Icon source="car-traction-control" size={20} color="#DC2626" />
          </View>
          <View style={styles.brandMicroTag}>
            <Text style={[styles.brandMicroLabel, { color: '#DC2626' }]}>TOYOTA</Text>
          </View>
        </View>
      );
    }

    // 6. Honda
    if (b.includes('honda')) {
      return (
        <View style={[styles.brandCard, { backgroundColor: '#F8FAFC', borderColor: active ? '#0F172A' : '#E2E8F0' }]}>
          <View style={styles.hondaSquare}>
            <Text style={styles.hondaHText}>H</Text>
          </View>
          <View style={styles.brandMicroTag}>
            <Text style={[styles.brandMicroLabel, { color: '#0F172A' }]}>HONDA</Text>
          </View>
        </View>
      );
    }

    // 7. Kia
    if (b.includes('kia')) {
      return (
        <View style={[styles.brandCard, { backgroundColor: '#F8FAFC', borderColor: active ? '#0F172A' : '#E2E8F0' }]}>
          <View style={styles.kiaBadge}>
            <Text style={styles.kiaText}>KIA</Text>
          </View>
          <View style={styles.brandMicroTag}>
            <Text style={[styles.brandMicroLabel, { color: '#0F172A' }]}>MOTORS</Text>
          </View>
        </View>
      );
    }

    // 8. Volkswagen
    if (b.includes('volkswagen') || b.includes('vw')) {
      return (
        <View style={[styles.brandCard, { backgroundColor: '#EFF6FF', borderColor: active ? '#1D4ED8' : '#BFDBFE' }]}>
          <View style={styles.vwCircle}>
            <Text style={styles.vwText}>VW</Text>
          </View>
          <View style={styles.brandMicroTag}>
            <Text style={[styles.brandMicroLabel, { color: '#1D4ED8' }]}>VW</Text>
          </View>
        </View>
      );
    }

    // 9. Ford
    if (b.includes('ford')) {
      return (
        <View style={[styles.brandCard, { backgroundColor: '#EFF6FF', borderColor: active ? '#1D4ED8' : '#BFDBFE' }]}>
          <View style={styles.fordOval}>
            <Text style={styles.fordText}>Ford</Text>
          </View>
          <View style={styles.brandMicroTag}>
            <Text style={[styles.brandMicroLabel, { color: '#1D4ED8' }]}>FORD</Text>
          </View>
        </View>
      );
    }

    // Fallback
    const initial = (brand || 'A').charAt(0).toUpperCase();
    return (
      <View style={[styles.brandCard, { backgroundColor: '#F1F5F9', borderColor: active ? '#1565FF' : '#CBD5E1' }]}>
        <Text style={{ fontSize: 18, fontWeight: '900', color: '#334155' }}>{initial}</Text>
      </View>
    );
  };

  if (style) {
    return <View style={style}>{renderBadge()}</View>;
  }

  return renderBadge();
};

export const SuzukiEmblemSvg = () => <CarBrandBadge brand="suzuki" />;
export const HyundaiEmblemSvg = () => <CarBrandBadge brand="hyundai" />;
export const TataEmblemSvg = () => <CarBrandBadge brand="tata" />;
export const MahindraEmblemSvg = () => <CarBrandBadge brand="mahindra" />;
export const ToyotaEmblemSvg = () => <CarBrandBadge brand="toyota" />;

const styles = StyleSheet.create({
  brandCard: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
  },
  suzukiSWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  suzukiSText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#DC2626',
    fontStyle: 'italic',
    transform: [{ skewX: '-10deg' }],
  },
  hyundaiOval: {
    width: 32,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hyundaiHText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0284C7',
    fontStyle: 'italic',
    transform: [{ skewX: '-12deg' }],
  },
  tataCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mahindraChevron: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toyotaOval: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hondaSquare: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hondaHText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  kiaBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  kiaText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 1,
  },
  vwCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#1D4ED8',
    letterSpacing: -0.5,
  },
  fordOval: {
    backgroundColor: '#1D4ED8',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 10,
  },
  fordText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  brandMicroTag: {
    position: 'absolute',
    bottom: -5,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 0.5,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  brandMicroLabel: {
    fontSize: 6.5,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
});

export const BrandLogo = CarBrandBadge;
export default CarBrandBadge;
