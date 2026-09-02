import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Rect, Circle, G, Ellipse } from 'react-native-svg';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  active?: boolean;
}

/**
 * 3D Style Category Icons using Gradients, Overlaps, and Highlights
 */

const Engine3DIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 48 48">
    <Defs>
      <LinearGradient id="block" x1="0" y1="0" x2="0" y2="48">
         <Stop offset="0" stopColor="#94A3B8"/>
         <Stop offset="1" stopColor="#475569"/>
      </LinearGradient>
      <LinearGradient id="head" x1="0" y1="0" x2="48" y2="48">
         <Stop offset="0" stopColor="#60A5FA"/>
         <Stop offset="1" stopColor="#2563EB"/>
      </LinearGradient>
    </Defs>
    {/* Drop Shadow */}
    <Rect x="8" y="28" width="32" height="16" rx="4" fill="#000" opacity="0.15" transform="translate(0, 3)"/>
    {/* Base Engine Block */}
    <Rect x="8" y="26" width="32" height="16" rx="4" fill="url(#block)"/>
    {/* Cylinders/Top Cover */}
    <Path d="M12 14 L36 14 L40 26 L8 26 Z" fill="url(#head)"/>
    {/* 3D Glossy Highlight */}
    <Path d="M12 14 L36 14 L37 18 L11 18 Z" fill="#FFFFFF" opacity="0.3"/>
    <Path d="M12 14 L11 18 L8 26 L9 26 L12 14 Z" fill="#FFFFFF" opacity="0.15"/>
    {/* Pulleys & Belts */}
    <Circle cx="12" cy="34" r="5" fill="#1E293B"/>
    <Circle cx="12" cy="34" r="2" fill="#CBD5E1"/>
    <Circle cx="36" cy="34" r="5" fill="#1E293B"/>
    <Circle cx="36" cy="34" r="2" fill="#CBD5E1"/>
    <Rect x="12" y="29.5" width="24" height="2.5" fill="#0F172A"/>
    <Rect x="12" y="36.5" width="24" height="2.5" fill="#0F172A"/>
  </Svg>
);

const BodyParts3DIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 48 48">
    <Defs>
      <LinearGradient id="doorBody" x1="0" y1="0" x2="48" y2="48">
         <Stop offset="0" stopColor="#3B82F6"/>
         <Stop offset="1" stopColor="#1E3A8A"/>
      </LinearGradient>
      <LinearGradient id="window" x1="0" y1="0" x2="0" y2="48">
         <Stop offset="0" stopColor="#0F172A"/>
         <Stop offset="1" stopColor="#334155"/>
      </LinearGradient>
    </Defs>
    {/* Drop Shadow */}
    <Path d="M8 18 C14 12 30 12 40 18 L38 42 C36 45 32 46 28 46 L14 46 C10 46 8 43 8 38 Z" fill="#000" opacity="0.15" transform="translate(0, 4)" />
    {/* Painted Door Metal */}
    <Path d="M8 16 C14 10 30 10 40 16 L38 40 C36 43 32 44 28 44 L14 44 C10 44 8 41 8 36 Z" fill="url(#doorBody)" />
    {/* Tinted Window Glass */}
    <Path d="M12 18 L12 26 L36 26 C33 16 20 15 12 18 Z" fill="url(#window)" />
    {/* Glass Reflection */}
    <Path d="M14 19 L19 18 C25 18 30 20 33 24 L29 25 C25 22 20 20 14 20 Z" fill="#FFFFFF" opacity="0.15" />
    {/* Car Door Handle */}
    <Rect x="26" y="30" width="8" height="2.5" rx="1" fill="#FFFFFF" opacity="0.7"/>
    {/* 3D Glossy Paint Highlight */}
    <Path d="M8 16 C14 10 30 10 40 16 L38 22 C25 22 12 24 8 32 Z" fill="#FFFFFF" opacity="0.2" />
  </Svg>
);

const Electricals3DIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 48 48">
    <Defs>
      <LinearGradient id="battBody" x1="0" y1="0" x2="48" y2="48">
         <Stop offset="0" stopColor="#1E293B"/>
         <Stop offset="1" stopColor="#020617"/>
      </LinearGradient>
      <LinearGradient id="battTop" x1="0" y1="0" x2="0" y2="48">
         <Stop offset="0" stopColor="#3B82F6"/>
         <Stop offset="1" stopColor="#1D4ED8"/>
      </LinearGradient>
      <LinearGradient id="bolt" x1="0" y1="0" x2="0" y2="48">
         <Stop offset="0" stopColor="#FEF08A"/>
         <Stop offset="1" stopColor="#EAB308"/>
      </LinearGradient>
    </Defs>
    {/* Shadow */}
    <Rect x="6" y="16" width="36" height="28" rx="4" fill="#000" opacity="0.15" transform="translate(0, 3)"/>
    {/* Battery Base Box */}
    <Rect x="6" y="14" width="36" height="28" rx="4" fill="url(#battBody)"/>
    {/* Battery Blue Top Cover */}
    <Rect x="6" y="14" width="36" height="8" rx="4" fill="url(#battTop)"/>
    {/* Plus / Minus Terminals */}
    <Rect x="10" y="8" width="6" height="8" rx="1" fill="#EF4444"/>
    <Rect x="32" y="8" width="6" height="8" rx="1" fill="#94A3B8"/>
    {/* Glossy Edge Highlight */}
    <Rect x="6" y="14" width="36" height="2" rx="1" fill="#FFFFFF" opacity="0.3"/>
    <Rect x="6" y="14" width="2" height="28" rx="1" fill="#FFFFFF" opacity="0.1"/>
    {/* 3D Glowing Energy Bolt */}
    <Path d="M27 18 L17 29 L24 29 L22 38 L32 26 L25 26 Z" fill="url(#bolt)"/>
    {/* Bolt Inner Highlight */}
    <Path d="M26 19 L19 28 L23 28 L23 29 L28 20 Z" fill="#FFFFFF" opacity="0.4"/>
  </Svg>
);

const Suspension3DIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 48 48">
     <Defs>
      <LinearGradient id="rod" x1="0" y1="0" x2="48" y2="0">
         <Stop offset="0" stopColor="#94A3B8"/>
         <Stop offset="0.5" stopColor="#F8FAFC"/>
         <Stop offset="1" stopColor="#64748B"/>
      </LinearGradient>
      <LinearGradient id="spring" x1="0" y1="0" x2="0" y2="48">
         <Stop offset="0" stopColor="#F87171"/>
         <Stop offset="0.5" stopColor="#DC2626"/>
         <Stop offset="1" stopColor="#7F1D1D"/>
      </LinearGradient>
    </Defs>
    {/* Drop shadow underneath */}
    <Rect x="20" y="6" width="8" height="40" rx="2" fill="#000" opacity="0.1" transform="translate(0, 3)"/>
    {/* Metallic Center Rod */}
    <Rect x="20" y="4" width="8" height="40" rx="2" fill="url(#rod)"/>
    {/* Pseudo 3D Layered Coil Springs */}
    <Path d="M12 12 L36 16 C39 16 39 20 36 20 L12 16 C9 16 9 12 12 12 Z" fill="url(#spring)"/>
    <Path d="M12 12 L36 16 L35 17 L13 13 Z" fill="#FFFFFF" opacity="0.3"/>
    
    <Path d="M12 22 L36 26 C39 26 39 30 36 30 L12 26 C9 26 9 22 12 22 Z" fill="url(#spring)"/>
    <Path d="M12 22 L36 26 L35 27 L13 23 Z" fill="#FFFFFF" opacity="0.3"/>

    <Path d="M12 32 L36 36 C39 36 39 40 36 40 L12 36 C9 36 9 32 12 32 Z" fill="url(#spring)"/>
    <Path d="M12 32 L36 36 L35 37 L13 33 Z" fill="#FFFFFF" opacity="0.3"/>
    
    {/* Dark Top & Bottom Mounts */}
    <Rect x="16" y="6" width="16" height="5" rx="1" fill="#0F172A"/>
    <Rect x="16" y="37" width="16" height="5" rx="1" fill="#0F172A"/>
    <Rect x="16" y="6" width="16" height="1" fill="#FFFFFF" opacity="0.2"/>
    <Rect x="16" y="37" width="16" height="1" fill="#FFFFFF" opacity="0.2"/>
  </Svg>
);

const Exhaust3DIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 48 48">
    <Defs>
      <LinearGradient id="muffler" x1="0" y1="0" x2="0" y2="48">
         <Stop offset="0" stopColor="#E2E8F0"/>
         <Stop offset="0.3" stopColor="#F8FAFC"/>
         <Stop offset="1" stopColor="#64748B"/>
      </LinearGradient>
      <LinearGradient id="tips" x1="0" y1="0" x2="48" y2="0">
         <Stop offset="0" stopColor="#94A3B8"/>
         <Stop offset="0.5" stopColor="#E2E8F0"/>
         <Stop offset="1" stopColor="#475569"/>
      </LinearGradient>
    </Defs>
    {/* Pipe in (Shadow & Body) */}
    <Rect x="4" y="24" width="12" height="6" fill="#000" opacity="0.15" transform="translate(0,2)"/>
    <Rect x="4" y="22" width="12" height="6" fill="url(#tips)"/>
    {/* Main Silencer Box Shadow */}
    <Rect x="12" y="12" width="20" height="24" rx="6" fill="#000" opacity="0.15" transform="translate(0, 4)"/>
    {/* Main Silencer Metallic Box */}
    <Rect x="12" y="12" width="20" height="24" rx="6" fill="url(#muffler)"/>
    {/* Muffler Structural Indents */}
    <Rect x="18" y="12" width="2" height="24" fill="#64748B" opacity="0.4"/>
    <Rect x="24" y="12" width="2" height="24" fill="#64748B" opacity="0.4"/>
    <Rect x="13" y="13" width="18" height="4" rx="2" fill="#FFFFFF" opacity="0.5"/>
    {/* Shiny Dual Tailpipes */}
    <Rect x="32" y="16" width="12" height="6" rx="1" fill="url(#tips)"/>
    <Rect x="32" y="26" width="12" height="6" rx="1" fill="url(#tips)"/>
    {/* Exhaust Pipe Holes (giving depth illusion) */}
    <Ellipse cx="43" cy="19" rx="1.5" ry="2.5" fill="#020617"/>
    <Ellipse cx="43" cy="29" rx="1.5" ry="2.5" fill="#020617"/>
  </Svg>
);

const More3DIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 48 48">
     <Defs>
      <LinearGradient id="cubeTop" x1="0" y1="0" x2="0" y2="48">
         <Stop offset="0" stopColor="#93C5FD"/>
         <Stop offset="1" stopColor="#3B82F6"/>
      </LinearGradient>
      <LinearGradient id="cubeLeft" x1="0" y1="0" x2="48" y2="0">
         <Stop offset="0" stopColor="#2563EB"/>
         <Stop offset="1" stopColor="#1D4ED8"/>
      </LinearGradient>
      <LinearGradient id="cubeRight" x1="0" y1="0" x2="48" y2="48">
         <Stop offset="0" stopColor="#1E3A8A"/>
         <Stop offset="1" stopColor="#0F172A"/>
      </LinearGradient>
    </Defs>
    {/* Isometric 3D Cubes Arrangement */}
    {/* Top Cube */}
    <G transform="translate(12, 4)">
       <Path d="M12 0 L24 6 L12 12 L0 6 Z" fill="url(#cubeTop)"/>
       <Path d="M0 6 L12 12 L12 24 L0 18 Z" fill="url(#cubeLeft)"/>
       <Path d="M12 12 L24 6 L24 18 L12 24 Z" fill="url(#cubeRight)"/>
       {/* Edge highlight */}
       <Path d="M12 0 L0 6 L12 12 L24 6 Z" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.4"/>
    </G>
    {/* Bottom Left Cube */}
    <G transform="translate(1, 22)">
       <Path d="M12 0 L24 6 L12 12 L0 6 Z" fill="url(#cubeTop)"/>
       <Path d="M0 6 L12 12 L12 24 L0 18 Z" fill="url(#cubeLeft)"/>
       <Path d="M12 12 L24 6 L24 18 L12 24 Z" fill="url(#cubeRight)"/>
       <Path d="M12 0 L0 6 L12 12 L24 6 Z" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.4"/>
    </G>
    {/* Bottom Right Cube */}
    <G transform="translate(23, 22)">
       <Path d="M12 0 L24 6 L12 12 L0 6 Z" fill="url(#cubeTop)"/>
       <Path d="M0 6 L12 12 L12 24 L0 18 Z" fill="url(#cubeLeft)"/>
       <Path d="M12 12 L24 6 L24 18 L12 24 Z" fill="url(#cubeRight)"/>
       <Path d="M12 0 L0 6 L12 12 L24 6 Z" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.4"/>
    </G>
  </Svg>
);

export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 60, active = false }) => {
  const t = (type || 'more').toLowerCase().trim();
  
  const renderIconGraphic = () => {
    if (t.includes('engine') || t.includes('motor')) return <Engine3DIcon />;
    if (t.includes('body') || t.includes('door') || t.includes('bumper')) return <BodyParts3DIcon />;
    if (t.includes('elect') || t.includes('battery')) return <Electricals3DIcon />;
    if (t.includes('suspension') || t.includes('shock') || t.includes('brake')) return <Suspension3DIcon />;
    if (t.includes('exhaust') || t.includes('pipe')) return <Exhaust3DIcon />;
    return <More3DIcon />;
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // 3D Neumorphic / Soft Shadow UI styling for the container
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6, 
    borderWidth: 1,
    borderColor: '#F8FAFC',
  },
  iconBadgeActive: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    shadowColor: '#0284C7',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
});

export default Category3DIcon;
