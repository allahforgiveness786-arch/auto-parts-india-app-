import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-paper';

export interface CategoryIconProps {
  type: string;
  size?: number;
  active?: boolean;
}

/**
 * Professional Automotive Marketplace Category Icon System
 * Features unified visual weight, clean automotive iconography,
 * equal proportions, and professional automotive blue/navy styling.
 * 
 * 1. Engine & Parts: Precision engine block vector icon
 * 2. Body Parts: Precision automotive car door / chassis icon
 * 3. Electricals: Precision automotive battery / lightning energy icon
 * 4. Suspension: Precision brake disc / suspension damper icon
 * 5. Exhaust: Precision dual performance muffler / turbo pipe icon
 * 6. More: Precision 4-grid matrix catalog icon
 */
export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 52, active = false }) => {
  const t = (type || 'more').toLowerCase().trim();

  // Color Palette: Professional Automotive Blue & Deep Navy
  const iconColor = active ? '#1565FF' : '#1E293B';
  const iconSize = Math.round(size * 0.55);

  let iconName = 'view-grid-outline';

  // 1. ENGINE & PARTS
  if (t.includes('engine') || t.includes('motor') || t.includes('piston') || t.includes('turbo')) {
    iconName = 'engine-outline';
  } 
  // 2. BODY PARTS
  else if (t.includes('body') || t.includes('door') || t.includes('bumper') || t.includes('fender') || t.includes('panel')) {
    iconName = 'car-door';
  } 
  // 3. ELECTRICALS
  else if (t.includes('elect') || t.includes('battery') || t.includes('light') || t.includes('spark') || t.includes('bolt')) {
    iconName = 'car-battery';
  } 
  // 4. SUSPENSION
  else if (t.includes('suspension') || t.includes('shock') || t.includes('strut') || t.includes('spring') || t.includes('brake') || t.includes('steering')) {
    iconName = 'car-brake-disc';
  } 
  // 5. EXHAUST
  else if (t.includes('exhaust') || t.includes('muffler') || t.includes('silencer') || t.includes('pipe')) {
    iconName = 'car-turbocharger';
  } 
  // 6. MORE / OTHER
  else {
    iconName = 'view-grid-outline';
  }

  return (
    <View 
      style={[
        styles.iconBadge, 
        { width: size, height: size, borderRadius: size / 2 },
        active && styles.iconBadgeActive
      ]}
    >
      <Icon source={iconName} size={iconSize} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconBadge: {
    backgroundColor: '#F1F7FE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2EDFA',
  },
  iconBadgeActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#93C5FD',
  },
});

export default Category3DIcon;
