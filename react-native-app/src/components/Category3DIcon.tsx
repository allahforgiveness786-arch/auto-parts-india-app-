import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-paper';

export interface CategoryIconProps {
  type: string;
  size?: number;
  active?: boolean;
}

export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 52 }) => {
  const t = (type || 'more').toLowerCase().trim();

  // 1. Engine & Mechanical
  if (t.includes('engine') || t.includes('motor') || t.includes('piston') || t.includes('turbo')) {
    return (
      <View style={[styles.iconCard, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
        <View style={[styles.innerCircle, { backgroundColor: '#DBEAFE' }]}>
          <Icon source="engine" size={28} color="#1D4ED8" />
        </View>
        <View style={[styles.badgePill, { backgroundColor: '#1E40AF' }]}>
          <Icon source="flash" size={10} color="#FDE047" />
          <Text style={styles.badgeText}>CORE</Text>
        </View>
      </View>
    );
  }

  // 2. Body Parts & Panels
  if (t.includes('body') || t.includes('door') || t.includes('bumper') || t.includes('fender')) {
    return (
      <View style={[styles.iconCard, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
        <View style={[styles.innerCircle, { backgroundColor: '#DCFCE7' }]}>
          <Icon source="car-side" size={28} color="#15803D" />
        </View>
        <View style={[styles.badgePill, { backgroundColor: '#166534' }]}>
          <Icon source="shield-check" size={10} color="#86EFAC" />
          <Text style={styles.badgeText}>PANELS</Text>
        </View>
      </View>
    );
  }

  // 3. Electricals & Electronics
  if (t.includes('elect') || t.includes('battery') || t.includes('light') || t.includes('spark') || t.includes('bolt')) {
    return (
      <View style={[styles.iconCard, { backgroundColor: '#FEFCE8', borderColor: '#FEF08A' }]}>
        <View style={[styles.innerCircle, { backgroundColor: '#FEF9C3' }]}>
          <Icon source="car-battery" size={28} color="#B45309" />
        </View>
        <View style={[styles.badgePill, { backgroundColor: '#854D0E' }]}>
          <Icon source="lightning-bolt" size={10} color="#FDE047" />
          <Text style={styles.badgeText}>12V / ECU</Text>
        </View>
      </View>
    );
  }

  // 4. Suspension & Steering (Fixed valid icon: tire & shock)
  if (t.includes('suspension') || t.includes('shock') || t.includes('strut') || t.includes('spring') || t.includes('brake') || t.includes('steering')) {
    return (
      <View style={[styles.iconCard, { backgroundColor: '#FAF5FF', borderColor: '#E9D5FF' }]}>
        <View style={[styles.innerCircle, { backgroundColor: '#F3E8FF' }]}>
          <Icon source="tire" size={28} color="#7E22CE" />
        </View>
        <View style={[styles.badgePill, { backgroundColor: '#6B21A8' }]}>
          <Icon source="car-traction-control" size={10} color="#D8B4FE" />
          <Text style={styles.badgeText}>STRUTS</Text>
        </View>
      </View>
    );
  }

  // 5. Exhaust & Performance
  if (t.includes('exhaust') || t.includes('muffler') || t.includes('silencer') || t.includes('pipe')) {
    return (
      <View style={[styles.iconCard, { backgroundColor: '#FFF1F2', borderColor: '#FECDD3' }]}>
        <View style={[styles.innerCircle, { backgroundColor: '#FFE4E6' }]}>
          <Icon source="car-turbocharger" size={28} color="#BE123C" />
        </View>
        <View style={[styles.badgePill, { backgroundColor: '#9F1239' }]}>
          <Icon source="fire" size={10} color="#FDA4AF" />
          <Text style={styles.badgeText}>EXHAUST</Text>
        </View>
      </View>
    );
  }

  // 6. More Categories (2x2 Matrix)
  return (
    <View style={[styles.iconCard, { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }]}>
      <View style={styles.grid2x2}>
        <View style={styles.gridRow}>
          <View style={[styles.gridDot, { backgroundColor: '#1565FF' }]} />
          <View style={[styles.gridDot, { backgroundColor: '#1565FF' }]} />
        </View>
        <View style={styles.gridRow}>
          <View style={[styles.gridDot, { backgroundColor: '#1565FF' }]} />
          <View style={[styles.gridDot, { backgroundColor: '#1565FF' }]} />
        </View>
      </View>
      <View style={[styles.badgePill, { backgroundColor: '#1E293B' }]}>
        <Text style={styles.badgeText}>ALL (20+)</Text>
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
  iconCard: {
    width: 62,
    height: 62,
    borderRadius: 18,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  innerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgePill: {
    position: 'absolute',
    bottom: -6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeText: {
    fontSize: 7.5,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  grid2x2: {
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 4,
  },
  gridDot: {
    width: 12,
    height: 12,
    borderRadius: 4,
  },
});

export default Category3DIcon;
