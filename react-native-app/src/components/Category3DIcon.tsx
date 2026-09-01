import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle, G, Ellipse, Line } from 'react-native-svg';

export interface CategoryIconProps {
  type: string;
  size?: number;
  active?: boolean;
}

/**
 * 1. Engine & Parts Icon:
 * Precision automotive engine block with cylinder head, spark plugs,
 * intake manifold runners, timing pulley, and oil pan.
 */
const EngineVectorIcon = ({ color, active }: { color: string; active: boolean }) => (
  <Svg width="28" height="28" viewBox="0 0 48 48" fill="none">
    {/* Main Engine Block */}
    <Rect x="10" y="16" width="28" height="20" rx="3" fill={active ? "#DBEAFE" : "#F1F5F9"} stroke={color} strokeWidth="2.5" />
    
    {/* Cylinder Head / Valve Cover */}
    <Path d="M14 16 L14 11 C14 9.5 15.5 8 17 8 L31 8 C32.5 8 34 9.5 34 11 L34 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Spark Plugs / Ignition Rails */}
    <Line x1="19" y1="5" x2="19" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="24" y1="5" x2="24" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="29" y1="5" x2="29" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    
    {/* Intake Manifold / Side Plenums */}
    <Path d="M10 20 L5 20 C4 20 3 21 3 22 L3 30 C3 31 4 32 5 32 L10 32" stroke={color} strokeWidth="2" strokeLinecap="round" />
    
    {/* Crankshaft Pulley Wheel */}
    <Circle cx="38" cy="26" r="5" stroke={color} strokeWidth="2" fill={active ? "#93C5FD" : "#E2E8F0"} />
    <Circle cx="38" cy="26" r="1.5" fill={color} />
    
    {/* Lower Oil Sump / Pan */}
    <Path d="M15 36 L17 42 C17.5 43 18.5 44 20 44 L28 44 C29.5 44 30.5 43 31 42 L33 36" stroke={color} strokeWidth="2.2" strokeLinejoin="round" fill={active ? "#BFDBFE" : "#E2E8F0"} />
  </Svg>
);

/**
 * 2. Body Parts Icon:
 * Car door panel, vehicle body shell, side mirror, and door handle silhouette.
 */
const BodyPartsVectorIcon = ({ color, active }: { color: string; active: boolean }) => (
  <Svg width="28" height="28" viewBox="0 0 48 48" fill="none">
    {/* Outer Car Door / Body Panel Contour */}
    <Path 
      d="M8 12 C14 8 28 8 38 12 C40 13 41 15 40 18 L38 38 C37.5 41 35 43 32 43 L12 43 C9 43 7 40 7 37 L7 16 C7 14 7.5 12.5 8 12 Z" 
      fill={active ? "#DBEAFE" : "#F1F5F9"} 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinejoin="round"
    />
    
    {/* Window Frame & Glass Area */}
    <Path 
      d="M11 15 L11 25 L36 25 L36 15 C28 12 18 12 11 15 Z" 
      fill={active ? "#93C5FD" : "#E2E8F0"} 
      stroke={color} 
      strokeWidth="2" 
      strokeLinejoin="round"
    />
    
    {/* Side Mirror Mount */}
    <Path d="M36 22 L42 21 C43.5 21 44 22.5 43 24 L40 26 L36 25" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} />
    
    {/* Aerodynamic Door Handle & Crease Line */}
    <Rect x="24" y="29" width="8" height="3" rx="1.5" fill={color} />
    <Path d="M10 34 C18 35 28 35 37 33" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
  </Svg>
);

/**
 * 3. Electricals Icon:
 * 12V Automotive Heavy-Duty Battery with terminal posts (+ / -) and energy lightning core.
 */
const ElectricalsVectorIcon = ({ color, active }: { color: string; active: boolean }) => (
  <Svg width="28" height="28" viewBox="0 0 48 48" fill="none">
    {/* Battery Casing Base */}
    <Rect x="7" y="14" width="34" height="26" rx="4" fill={active ? "#DBEAFE" : "#F1F5F9"} stroke={color} strokeWidth="2.5" />
    
    {/* Positive & Negative Terminal Posts */}
    <Rect x="12" y="9" width="6" height="5" rx="1" fill={color} stroke={color} strokeWidth="1" />
    <Rect x="30" y="9" width="6" height="5" rx="1" fill={color} stroke={color} strokeWidth="1" />
    
    {/* Cell Top Cap Lids */}
    <Line x1="11" y1="19" x2="37" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    
    {/* Polarity Markers */}
    <Line x1="12" y1="24" x2="16" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="32" y1="24" x2="36" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="34" y1="22" x2="34" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" />
    
    {/* Center High-Energy Lightning Bolt */}
    <Path 
      d="M25 21 L20 30 L24 30 L23 37 L29 28 L25 28 Z" 
      fill={active ? "#2563EB" : color} 
      stroke={active ? "#1D4ED8" : color} 
      strokeWidth="1.5" 
      strokeLinejoin="round" 
    />
  </Svg>
);

/**
 * 4. Suspension Icon:
 * Performance coilover shock absorber strut with helical spring & brake rotor disc.
 */
const SuspensionVectorIcon = ({ color, active }: { color: string; active: boolean }) => (
  <Svg width="28" height="28" viewBox="0 0 48 48" fill="none">
    {/* Top Strut Mount Bushing */}
    <Rect x="18" y="5" width="12" height="4" rx="2" fill={color} />
    <Line x1="24" y1="9" x2="24" y2="14" stroke={color} strokeWidth="3" strokeLinecap="round" />
    
    {/* Upper Spring Perch Plate */}
    <Rect x="14" y="14" width="20" height="3" rx="1.5" fill={color} />
    
    {/* Helical Coilover Spring Coils */}
    <Path d="M16 17 L32 20 L16 23 L32 26 L16 29 L32 32 L16 35" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Lower Damper Body Cylinder */}
    <Rect x="21" y="17" width="6" height="18" fill={active ? "#93C5FD" : "#CBD5E1"} opacity="0.75" />
    
    {/* Lower Spring Collar */}
    <Rect x="14" y="35" width="20" height="3" rx="1.5" fill={color} />
    
    {/* Lower Mount Eyelet Ring */}
    <Circle cx="24" cy="41" r="3.5" stroke={color} strokeWidth="2.5" fill={active ? "#DBEAFE" : "#F1F5F9"} />
  </Svg>
);

/**
 * 5. Exhaust Icon:
 * Performance stainless steel muffler with dual exhaust tailpipes and flow vents.
 */
const ExhaustVectorIcon = ({ color, active }: { color: string; active: boolean }) => (
  <Svg width="28" height="28" viewBox="0 0 48 48" fill="none">
    {/* Inlet Pipe Connection from Cat-Back */}
    <Path d="M5 24 L14 24" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <Path d="M12 20 L12 28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    
    {/* Main Muffler Silencer Canister Body */}
    <Rect x="14" y="13" width="20" height="22" rx="7" fill={active ? "#DBEAFE" : "#F1F5F9"} stroke={color} strokeWidth="2.5" />
    
    {/* Muffler Structural Ribs */}
    <Line x1="20" y1="14" x2="20" y2="34" stroke={color} strokeWidth="1.8" opacity="0.4" />
    <Line x1="28" y1="14" x2="28" y2="34" stroke={color} strokeWidth="1.8" opacity="0.4" />
    
    {/* Dual Polished Exhaust Tailpipes */}
    <Path d="M34 18 L42 18" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <Path d="M34 30 L42 30" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    
    {/* Exhaust Pipe Beveled Tips */}
    <Ellipse cx="42" cy="18" rx="1.5" ry="3" fill={color} />
    <Ellipse cx="42" cy="30" rx="1.5" ry="3" fill={color} />
  </Svg>
);

/**
 * 6. More Icon:
 * Clean 4-square / 6-matrix catalog grid icon.
 */
const MoreVectorIcon = ({ color, active }: { color: string; active: boolean }) => (
  <Svg width="28" height="28" viewBox="0 0 48 48" fill="none">
    <Rect x="9" y="9" width="12" height="12" rx="3.5" fill={active ? "#2563EB" : color} />
    <Rect x="27" y="9" width="12" height="12" rx="3.5" fill={active ? "#3B82F6" : color} opacity="0.85" />
    <Rect x="9" y="27" width="12" height="12" rx="3.5" fill={active ? "#3B82F6" : color} opacity="0.85" />
    <Rect x="27" y="27" width="12" height="12" rx="3.5" fill={active ? "#60A5FA" : color} opacity="0.6" />
  </Svg>
);

/**
 * Professional Automotive Marketplace Category Icon System
 * Features unified visual weight, clean automotive vector iconography,
 * equal proportions, and professional automotive blue/navy styling.
 */
export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 52, active = false }) => {
  const t = (type || 'more').toLowerCase().trim();

  // Color Palette: Professional Automotive Blue & Deep Navy
  const iconColor = active ? '#1565FF' : '#0F172A';

  const renderIconGraphic = () => {
    // 1. ENGINE & PARTS
    if (t.includes('engine') || t.includes('motor') || t.includes('piston') || t.includes('turbo')) {
      return <EngineVectorIcon color={iconColor} active={active} />;
    }
    // 2. BODY PARTS
    if (t.includes('body') || t.includes('door') || t.includes('bumper') || t.includes('fender') || t.includes('panel')) {
      return <BodyPartsVectorIcon color={iconColor} active={active} />;
    }
    // 3. ELECTRICALS
    if (t.includes('elect') || t.includes('battery') || t.includes('light') || t.includes('spark') || t.includes('bolt')) {
      return <ElectricalsVectorIcon color={iconColor} active={active} />;
    }
    // 4. SUSPENSION
    if (t.includes('suspension') || t.includes('shock') || t.includes('strut') || t.includes('spring') || t.includes('brake') || t.includes('steering')) {
      return <SuspensionVectorIcon color={iconColor} active={active} />;
    }
    // 5. EXHAUST
    if (t.includes('exhaust') || t.includes('muffler') || t.includes('silencer') || t.includes('pipe')) {
      return <ExhaustVectorIcon color={iconColor} active={active} />;
    }
    // 6. MORE / OTHER CATALOG
    return <MoreVectorIcon color={iconColor} active={active} />;
  };

  return (
    <View 
      style={[
        styles.iconBadge, 
        { width: size, height: size, borderRadius: size / 2 },
        active && styles.iconBadgeActive
      ]}
    >
      {renderIconGraphic()}
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
