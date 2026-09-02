import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { 
  Path, Rect, Circle, Defs, LinearGradient, Stop, Ellipse, Line, G 
} from 'react-native-svg';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  active?: boolean;
}

// 1. 3D V8 Turbo Engine Block Graphic
const Engine3DGraphic = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="engBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#334155" />
        <Stop offset="50%" stopColor="#1E293B" />
        <Stop offset="100%" stopColor="#0F172A" />
      </LinearGradient>
      <LinearGradient id="valveCover" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#EF4444" />
        <Stop offset="60%" stopColor="#DC2626" />
        <Stop offset="100%" stopColor="#991B1B" />
      </LinearGradient>
      <LinearGradient id="chromePipe" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#94A3B8" />
        <Stop offset="50%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#64748B" />
      </LinearGradient>
      <LinearGradient id="intakeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#3B82F6" />
        <Stop offset="100%" stopColor="#1D4ED8" />
      </LinearGradient>
    </Defs>
    <Ellipse cx="50" cy="85" rx="36" ry="10" fill="#000000" opacity="0.25" />
    <Path d="M 20 50 L 50 32 L 80 50 L 80 72 L 50 90 L 20 72 Z" fill="url(#engBody)" />
    <Path d="M 20 36 L 50 18 L 80 36 L 80 50 L 50 68 L 20 50 Z" fill="url(#valveCover)" />
    <Path d="M 28 36 L 50 23 L 72 36 L 50 49 Z" fill="#7F1D1D" opacity="0.6" />
    <Path d="M 32 35 L 50 25 L 68 35" stroke="url(#chromePipe)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <Path d="M 32 41 L 50 31 L 68 41" stroke="url(#chromePipe)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <Path d="M 14 38 C 14 26 30 20 42 20 L 50 20" stroke="url(#chromePipe)" strokeWidth="6" strokeLinecap="round" fill="none" />
    <Path d="M 10 32 L 20 28 L 20 48 L 10 44 Z" fill="url(#intakeGlow)" />
    <Ellipse cx="10" cy="38" rx="2" ry="6" fill="#60A5FA" />
    <Circle cx="36" cy="68" r="8" fill="#0F172A" stroke="url(#chromePipe)" strokeWidth="2.5" />
    <Circle cx="36" cy="68" r="3" fill="#94A3B8" />
    <Circle cx="64" cy="68" r="8" fill="#0F172A" stroke="url(#chromePipe)" strokeWidth="2.5" />
    <Circle cx="64" cy="68" r="3" fill="#94A3B8" />
    <Path d="M 36 60 L 64 60 M 36 76 L 64 76" stroke="#000000" strokeWidth="3.5" />
    <Path d="M 20 36 L 50 18 L 80 36" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.6" fill="none" />
  </Svg>
);

// 2. 3D Metallic Car Shell / Door Graphic
const Body3DGraphic = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="carPaint" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#3B82F6" />
        <Stop offset="40%" stopColor="#1D4ED8" />
        <Stop offset="100%" stopColor="#0F172A" />
      </LinearGradient>
      <LinearGradient id="glassTint" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#1E293B" />
        <Stop offset="100%" stopColor="#020617" />
      </LinearGradient>
      <LinearGradient id="chromeHandle" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#CBD5E1" />
        <Stop offset="50%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#64748B" />
      </LinearGradient>
    </Defs>
    <Ellipse cx="50" cy="86" rx="38" ry="9" fill="#000000" opacity="0.25" />
    <Path d="M 16 38 C 30 20 70 18 88 30 L 84 76 C 78 82 66 85 50 85 C 34 85 18 80 16 70 Z" fill="url(#carPaint)" />
    <Path d="M 24 38 C 34 25 62 23 78 32 L 76 50 L 22 50 Z" fill="url(#glassTint)" />
    <Path d="M 30 36 L 42 34 L 36 48 L 26 48 Z" fill="#FFFFFF" opacity="0.3" />
    <Path d="M 48 33 L 60 31 L 54 48 L 44 48 Z" fill="#FFFFFF" opacity="0.2" />
    <Path d="M 16 38 C 30 20 70 18 88 30 L 85 42 C 65 30 30 32 16 48 Z" fill="#FFFFFF" opacity="0.22" />
    <Rect x="54" y="58" width="20" height="6" rx="3" fill="url(#chromeHandle)" />
    <Rect x="56" y="60" width="16" height="2" rx="1" fill="#FFFFFF" opacity="0.8" />
    <Path d="M 76 44 C 84 42 92 46 88 53 C 82 56 76 53 76 49 Z" fill="#0F172A" stroke="url(#chromeHandle)" strokeWidth="1.5" />
    <Path d="M 20 72 L 80 76" stroke="#0F172A" strokeWidth="3" opacity="0.5" />
  </Svg>
);

// 3. 3D Car Battery with Lightning Glow Graphic
const Electrical3DGraphic = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="battBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#1E293B" />
        <Stop offset="100%" stopColor="#090D16" />
      </LinearGradient>
      <LinearGradient id="battCap" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#2563EB" />
        <Stop offset="100%" stopColor="#1D4ED8" />
      </LinearGradient>
      <LinearGradient id="goldBolt" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#FEF08A" />
        <Stop offset="50%" stopColor="#EAB308" />
        <Stop offset="100%" stopColor="#CA8A04" />
      </LinearGradient>
    </Defs>
    <Ellipse cx="50" cy="85" rx="36" ry="9" fill="#000000" opacity="0.25" />
    <Path d="M 20 40 L 50 25 L 80 40 L 80 75 L 50 90 L 20 75 Z" fill="url(#battBody)" />
    <Path d="M 20 40 L 50 25 L 80 40 L 50 53 Z" fill="url(#battCap)" />
    <Path d="M 20 40 L 50 25 L 80 40" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.5" fill="none" />
    <Path d="M 30 28 L 38 24 L 42 26 L 34 30 Z" fill="#EF4444" />
    <Rect x="33" y="18" width="6" height="9" rx="1.5" fill="#DC2626" />
    <Path d="M 62 44 L 70 40 L 74 42 L 66 46 Z" fill="#94A3B8" />
    <Rect x="65" y="34" width="6" height="9" rx="1.5" fill="#64748B" />
    <Path d="M 55 34 L 36 58 L 48 58 L 41 78 L 65 50 L 52 50 Z" fill="url(#goldBolt)" />
    <Path d="M 53 36 L 38 56 L 48 56 L 44 72 L 61 52 L 52 52 Z" fill="#FFFFFF" opacity="0.4" />
  </Svg>
);

// 4. 3D Sport Red Coil Spring & Strut Graphic
const Suspension3DGraphic = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="chromeShaft" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#94A3B8" />
        <Stop offset="50%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#475569" />
      </LinearGradient>
      <LinearGradient id="redSpring" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#F87171" />
        <Stop offset="40%" stopColor="#DC2626" />
        <Stop offset="100%" stopColor="#991B1B" />
      </LinearGradient>
    </Defs>
    <Ellipse cx="50" cy="90" rx="28" ry="8" fill="#000000" opacity="0.25" />
    <Rect x="44" y="12" width="12" height="72" rx="3" fill="url(#chromeShaft)" />
    <Path d="M 32 12 L 68 12 L 64 22 L 36 22 Z" fill="#1E293B" />
    <Rect x="32" y="10" width="36" height="3.5" rx="1" fill="#64748B" />
    <G fill="url(#redSpring)">
      <Path d="M 28 26 C 28 20 72 26 72 31 C 72 36 28 31 28 26 Z" />
      <Path d="M 28 26 C 28 20 72 26 72 31 L 70 33 C 70 28 30 23 28 28 Z" fill="#FFFFFF" opacity="0.4" />
      <Path d="M 28 39 C 28 33 72 39 72 44 C 72 49 28 44 28 39 Z" />
      <Path d="M 28 39 C 28 33 72 39 72 44 L 70 46 C 70 41 30 36 28 41 Z" fill="#FFFFFF" opacity="0.4" />
      <Path d="M 28 52 C 28 46 72 52 72 57 C 72 62 28 57 28 52 Z" />
      <Path d="M 28 52 C 28 46 72 52 72 57 L 70 59 C 70 54 30 49 28 54 Z" fill="#FFFFFF" opacity="0.4" />
      <Path d="M 28 65 C 28 59 72 65 72 70 C 72 75 28 70 28 65 Z" />
      <Path d="M 28 65 C 28 59 72 65 72 70 L 70 72 C 70 67 30 62 28 67 Z" fill="#FFFFFF" opacity="0.4" />
    </G>
    <Circle cx="50" cy="80" r="10" fill="#1E293B" />
    <Circle cx="50" cy="80" r="5" fill="url(#chromeShaft)" />
  </Svg>
);

// 5. 3D Titanium Burnt Blue Tip Muffler Graphic
const Exhaust3DGraphic = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="mufflerBox" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#E2E8F0" />
        <Stop offset="40%" stopColor="#94A3B8" />
        <Stop offset="100%" stopColor="#334155" />
      </LinearGradient>
      <LinearGradient id="titaniumTip" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#3B82F6" />
        <Stop offset="30%" stopColor="#8B5CF6" />
        <Stop offset="70%" stopColor="#CBD5E1" />
        <Stop offset="100%" stopColor="#64748B" />
      </LinearGradient>
    </Defs>
    <Ellipse cx="50" cy="84" rx="36" ry="9" fill="#000000" opacity="0.25" />
    <Path d="M 10 44 L 32 44 L 32 54 L 10 54 Z" fill="url(#mufflerBox)" />
    <Rect x="26" y="25" width="42" height="48" rx="12" fill="url(#mufflerBox)" />
    <Line x1="38" y1="25" x2="38" y2="73" stroke="#475569" strokeWidth="2.5" opacity="0.4" />
    <Line x1="56" y1="25" x2="56" y2="73" stroke="#475569" strokeWidth="2.5" opacity="0.4" />
    <Path d="M 28 28 L 64 28" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
    <Rect x="68" y="32" width="22" height="13" rx="3" fill="url(#titaniumTip)" />
    <Ellipse cx="90" cy="38.5" rx="3" ry="6.5" fill="#090D16" />
    <Path d="M 68 33 L 88 33" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
    <Rect x="68" y="52" width="22" height="13" rx="3" fill="url(#titaniumTip)" />
    <Ellipse cx="90" cy="58.5" rx="3" ry="6.5" fill="#090D16" />
    <Path d="M 68 53 L 88 53" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
  </Svg>
);

// 6. 3D Isometric Mechanical Cubes Graphic
const More3DGraphic = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="cubeT" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#60A5FA" />
        <Stop offset="100%" stopColor="#2563EB" />
      </LinearGradient>
      <LinearGradient id="cubeL" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#1D4ED8" />
        <Stop offset="100%" stopColor="#1E40AF" />
      </LinearGradient>
      <LinearGradient id="cubeR" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#1E3A8A" />
        <Stop offset="100%" stopColor="#0F172A" />
      </LinearGradient>
    </Defs>
    <Ellipse cx="50" cy="86" rx="34" ry="9" fill="#000000" opacity="0.22" />
    <G transform="translate(25, 12)">
      <Path d="M 25 0 L 50 12 L 25 24 L 0 12 Z" fill="url(#cubeT)" />
      <Path d="M 0 12 L 25 24 L 25 48 L 0 36 Z" fill="url(#cubeL)" />
      <Path d="M 25 24 L 50 12 L 50 36 L 25 48 Z" fill="url(#cubeR)" />
      <Path d="M 25 0 L 0 12 L 25 24 L 50 12 Z" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.5" />
    </G>
    <G transform="translate(6, 38)">
      <Path d="M 22 0 L 44 11 L 22 22 L 0 11 Z" fill="url(#cubeT)" />
      <Path d="M 0 11 L 22 22 L 22 44 L 0 33 Z" fill="url(#cubeL)" />
      <Path d="M 22 22 L 44 11 L 44 33 L 22 44 Z" fill="url(#cubeR)" />
      <Path d="M 22 0 L 0 11 L 22 22 L 44 11 Z" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.5" />
    </G>
    <G transform="translate(48, 38)">
      <Path d="M 22 0 L 44 11 L 22 22 L 0 11 Z" fill="url(#cubeT)" />
      <Path d="M 0 11 L 22 22 L 22 44 L 0 33 Z" fill="url(#cubeL)" />
      <Path d="M 22 22 L 44 11 L 44 33 L 22 44 Z" fill="url(#cubeR)" />
      <Path d="M 22 0 L 0 11 L 22 22 L 44 11 Z" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.5" />
    </G>
  </Svg>
);

export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 56, active = false }) => {
  const t = (type || 'more').toLowerCase().trim();
  
  const renderGraphic = () => {
    if (t.includes('engine') || t.includes('motor')) return <Engine3DGraphic size={size - 8} />;
    if (t.includes('body') || t.includes('door') || t.includes('bumper')) return <Body3DGraphic size={size - 8} />;
    if (t.includes('elect') || t.includes('battery') || t.includes('light')) return <Electrical3DGraphic size={size - 8} />;
    if (t.includes('suspension') || t.includes('shock') || t.includes('brake')) return <Suspension3DGraphic size={size - 8} />;
    if (t.includes('exhaust') || t.includes('pipe') || t.includes('silencer')) return <Exhaust3DGraphic size={size - 8} />;
    return <More3DGraphic size={size - 8} />;
  };

  return (
    <View 
      style={[
        styles.iconBadge, 
        { width: size, height: size, borderRadius: size / 2 },
        active && styles.iconBadgeActive
      ]}
    >
      {renderGraphic()}
      {active && <View style={[styles.activeOverlay, { borderRadius: size / 2 }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  iconBadge: {
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4, 
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  iconBadgeActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  activeOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#2563EB',
    opacity: 0.06,
  }
});

export default Category3DIcon;
