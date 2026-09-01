import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-paper';

export interface CategoryIconProps {
  type: string;
  size?: number;
  active?: boolean;
}

interface CategoryStyleConfig {
  icon: string;
  bgGradient: string;
  borderColor: string;
  iconColor: string;
  badgeBg: string;
}

const CATEGORY_CONFIGS: Record<string, CategoryStyleConfig> = {
  engine: {
    icon: 'engine',
    bgGradient: '#EEF2FF',
    borderColor: '#C7D2FE',
    iconColor: '#3730A3',
    badgeBg: '#4F46E5',
  },
  body: {
    icon: 'car-door',
    bgGradient: '#F0F9FF',
    borderColor: '#BAE6FD',
    iconColor: '#0369A1',
    badgeBg: '#0284C7',
  },
  electrical: {
    icon: 'lightning-bolt',
    bgGradient: '#FEFCE8',
    borderColor: '#FEF08A',
    iconColor: '#CA8A04',
    badgeBg: '#EAB308',
  },
  suspension: {
    icon: 'car-brake-disc',
    bgGradient: '#F1F5F9',
    borderColor: '#CBD5E1',
    iconColor: '#334155',
    badgeBg: '#475569',
  },
  exhaust: {
    icon: 'smoke',
    bgGradient: '#FFF1F2',
    borderColor: '#FECDD3',
    iconColor: '#E11D48',
    badgeBg: '#F43F5E',
  },
  more: {
    icon: 'view-grid',
    bgGradient: '#EFF6FF',
    borderColor: '#BFDBFE',
    iconColor: '#1565FF',
    badgeBg: '#1565FF',
  },
};

export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 52 }) => {
  const t = (type || 'more').toLowerCase().trim();

  let key = 'more';
  if (t.includes('engine') || t.includes('motor') || t.includes('piston') || t.includes('turbo')) key = 'engine';
  else if (t.includes('body') || t.includes('door') || t.includes('bumper') || t.includes('fender')) key = 'body';
  else if (t.includes('elect') || t.includes('battery') || t.includes('light') || t.includes('spark') || t.includes('bolt')) key = 'electrical';
  else if (t.includes('suspension') || t.includes('shock') || t.includes('strut') || t.includes('spring') || t.includes('brake')) key = 'suspension';
  else if (t.includes('exhaust') || t.includes('muffler') || t.includes('silencer') || t.includes('pipe')) key = 'exhaust';

  const config = CATEGORY_CONFIGS[key] || CATEGORY_CONFIGS.more;
  const containerSize = size;
  const iconSize = Math.max(22, Math.floor(size * 0.52));

  // Custom crafted visual for each category for a high-end, crisp auto look
  if (key === 'engine') {
    return (
      <View style={[styles.outerContainer, { width: containerSize, height: containerSize, backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
        <View style={styles.engineBadge}>
          <Icon source="engine" size={iconSize} color="#1565FF" />
        </View>
        <View style={styles.miniPistonPill}>
          <Text style={styles.miniPillText}>V6</Text>
        </View>
      </View>
    );
  }

  if (key === 'body') {
    return (
      <View style={[styles.outerContainer, { width: containerSize, height: containerSize, backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
        <View style={styles.bodyBadge}>
          <Icon source="car-door" size={iconSize} color="#16A34A" />
        </View>
        <View style={[styles.miniPistonPill, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' }]}>
          <Text style={[styles.miniPillText, { color: '#15803D' }]}>OEM</Text>
        </View>
      </View>
    );
  }

  if (key === 'electrical') {
    return (
      <View style={[styles.outerContainer, { width: containerSize, height: containerSize, backgroundColor: '#FEFCE8', borderColor: '#FEF08A' }]}>
        <View style={styles.electricalBadge}>
          <Icon source="lightning-bolt" size={iconSize} color="#D97706" />
        </View>
        <View style={[styles.miniPistonPill, { backgroundColor: '#FEF9C3', borderColor: '#FDE047' }]}>
          <Text style={[styles.miniPillText, { color: '#A16207' }]}>12V</Text>
        </View>
      </View>
    );
  }

  if (key === 'suspension') {
    return (
      <View style={[styles.outerContainer, { width: containerSize, height: containerSize, backgroundColor: '#F5F3FF', borderColor: '#DDD6FE' }]}>
        <View style={styles.suspensionBadge}>
          <Icon source="car-brake-disc" size={iconSize} color="#7C3AED" />
        </View>
        <View style={[styles.miniPistonPill, { backgroundColor: '#EDE9FE', borderColor: '#C4B5FD' }]}>
          <Text style={[styles.miniPillText, { color: '#6D28D9' }]}>STRUT</Text>
        </View>
      </View>
    );
  }

  if (key === 'exhaust') {
    return (
      <View style={[styles.outerContainer, { width: containerSize, height: containerSize, backgroundColor: '#FFF1F2', borderColor: '#FECDD3' }]}>
        <View style={styles.exhaustBadge}>
          <Icon source="pipe" size={iconSize} color="#E11D48" />
        </View>
        <View style={[styles.miniPistonPill, { backgroundColor: '#FFE4E6', borderColor: '#FDA4AF' }]}>
          <Text style={[styles.miniPillText, { color: '#BE123C' }]}>FLOW</Text>
        </View>
      </View>
    );
  }

  // 6. More Category
  return (
    <View style={[styles.outerContainer, { width: containerSize, height: containerSize, backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }]}>
      <View style={styles.moreGrid}>
        <View style={styles.moreRow}>
          <View style={[styles.moreDot, { backgroundColor: '#1565FF' }]} />
          <View style={[styles.moreDot, { backgroundColor: '#1565FF' }]} />
        </View>
        <View style={styles.moreRow}>
          <View style={[styles.moreDot, { backgroundColor: '#1565FF' }]} />
          <View style={[styles.moreDot, { backgroundColor: '#1565FF' }]} />
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
  outerContainer: {
    borderRadius: 16,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  engineBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  electricalBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  suspensionBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  exhaustBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniPistonPill: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: '#DBEAFE',
    borderWidth: 1,
    borderColor: '#93C5FD',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  miniPillText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#1D4ED8',
    letterSpacing: 0.5,
  },
  moreGrid: {
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreRow: {
    flexDirection: 'row',
    gap: 4,
  },
  moreDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
});

export default Category3DIcon;
