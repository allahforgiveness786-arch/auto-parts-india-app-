import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, { 
  Path, Rect, Circle, Defs, LinearGradient, Stop, Ellipse, Line, G 
} from 'react-native-svg';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
}

/* 
  100% Transparent Isolated 3D Objects matching reference mockup file_0000000058548207ad6f8d2358cfca15.png
  - No photo square boxes or dark card backgrounds!
  - Floating 3D objects directly on the soft gray card container
*/

// 1. Engine & Parts - 3D Metallic V8 Turbo Engine Block Render
const Engine3DObject = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="engBody3D" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#475569" />
        <Stop offset="40%" stopColor="#1E293B" />
        <Stop offset="100%" stopColor="#0F172A" />
      </LinearGradient>
      <LinearGradient id="engTopDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#334155" />
        <Stop offset="100%" stopColor="#0F172A" />
      </LinearGradient>
      <LinearGradient id="engChromePipe" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#CBD5E1" />
        <Stop offset="50%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#64748B" />
      </LinearGradient>
      <LinearGradient id="pulleyGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#F59E0B" />
        <Stop offset="100%" stopColor="#B45309" />
      </LinearGradient>
    </Defs>
    {/* Ground Shadow */}
    <Ellipse cx="50" cy="88" rx="36" ry="7" fill="#000000" opacity="0.18" />
    
    {/* Engine Main Block Base */}
    <Path d="M 22 52 L 50 34 L 78 52 L 78 74 L 50 90 L 22 74 Z" fill="url(#engBody3D)" />
    
    {/* Engine Valve Covers / Top */}
    <Path d="M 22 38 L 50 20 L 78 38 L 78 52 L 50 68 L 22 52 Z" fill="url(#engTopDark)" />
    
    {/* Intake Runners & Headers */}
    <Path d="M 32 38 L 50 26 L 68 38 L 50 50 Z" fill="#020617" opacity="0.7" />
    <Path d="M 34 36 L 50 26 L 66 36" stroke="url(#engChromePipe)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <Path d="M 34 42 L 50 32 L 66 42" stroke="url(#engChromePipe)" strokeWidth="3" strokeLinecap="round" fill="none" />
    
    {/* Metallic Air Intake Pipe */}
    <Path d="M 18 42 C 18 28 32 20 44 20 L 52 20" stroke="url(#engChromePipe)" strokeWidth="5" strokeLinecap="round" fill="none" />
    
    {/* Pulleys and Belt Drive */}
    <Path d="M 34 72 L 66 72" stroke="#020617" strokeWidth="4" />
    <Circle cx="34" cy="72" r="9" fill="#0F172A" stroke="url(#engChromePipe)" strokeWidth="2.5" />
    <Circle cx="34" cy="72" r="3" fill="#94A3B8" />
    <Circle cx="66" cy="72" r="9" fill="#0F172A" stroke="url(#engChromePipe)" strokeWidth="2.5" />
    <Circle cx="66" cy="72" r="3" fill="#94A3B8" />
    <Circle cx="50" cy="60" r="6" fill="url(#pulleyGold)" stroke="url(#engChromePipe)" strokeWidth="1.5" />
    
    {/* Highlight Edges */}
    <Path d="M 22 38 L 50 20 L 78 38" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" fill="none" />
  </Svg>
);

// 2. Body Parts - 3D Metallic Royal Blue Car Front Door
const Body3DObject = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="carPaintBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#3B82F6" />
        <Stop offset="45%" stopColor="#1D4ED8" />
        <Stop offset="100%" stopColor="#1E3A8A" />
      </LinearGradient>
      <LinearGradient id="windowTintDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#475569" />
        <Stop offset="100%" stopColor="#0F172A" />
      </LinearGradient>
      <LinearGradient id="chromeHandle" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#E2E8F0" />
        <Stop offset="50%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#64748B" />
      </LinearGradient>
    </Defs>
    {/* Ground Shadow */}
    <Ellipse cx="50" cy="88" rx="38" ry="7" fill="#000000" opacity="0.18" />
    
    {/* Car Door Main Metal Sheet */}
    <Path d="M 16 38 C 30 20 70 18 88 30 L 84 76 C 78 82 66 85 50 85 C 34 85 18 80 16 70 Z" fill="url(#carPaintBlue)" />
    
    {/* Window Glass Area */}
    <Path d="M 24 38 C 34 25 62 23 78 32 L 76 50 L 22 50 Z" fill="url(#windowTintDark)" />
    <Path d="M 30 36 L 42 34 L 36 48 L 26 48 Z" fill="#FFFFFF" opacity="0.35" />
    
    {/* Specular Light Reflection Streak on Door Body */}
    <Path d="M 16 38 C 30 20 70 18 88 30 L 85 42 C 65 30 30 32 16 48 Z" fill="#FFFFFF" opacity="0.25" />
    
    {/* Chrome Door Handle */}
    <Rect x="54" y="58" width="20" height="6" rx="3" fill="url(#chromeHandle)" />
    <Rect x="56" y="60" width="16" height="2" rx="1" fill="#FFFFFF" opacity="0.9" />
    
    {/* Side Mirror */}
    <Path d="M 76 44 C 84 42 92 46 88 53 C 82 56 76 53 76 49 Z" fill="#0F172A" stroke="url(#chromeHandle)" strokeWidth="1.5" />
  </Svg>
);

// 3. Electricals - 3D Bright Yellow Bevelled Lightning Bolt
const Electrical3DObject = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="boltYellowMain" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#FDE047" />
        <Stop offset="50%" stopColor="#EAB308" />
        <Stop offset="100%" stopColor="#CA8A04" />
      </LinearGradient>
      <LinearGradient id="boltHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#FEF08A" />
        <Stop offset="100%" stopColor="#FACC15" />
      </LinearGradient>
    </Defs>
    {/* Soft Shadow behind lightning */}
    <Path d="M 58 12 L 28 52 L 48 52 L 36 88 L 76 44 L 54 44 Z" fill="#000000" opacity="0.15" transform="translate(3, 4)" />
    
    {/* Back 3D Bevel Edge */}
    <Path d="M 58 10 L 28 50 L 48 50 L 36 86 L 76 42 L 54 42 Z" fill="#A16207" />
    
    {/* Front Lightning Face */}
    <Path d="M 56 10 L 28 50 L 46 50 L 36 84 L 74 42 L 52 42 Z" fill="url(#boltYellowMain)" />
    
    {/* Specular Highlight Streak */}
    <Path d="M 56 10 L 38 36 L 46 50 L 52 42 L 74 42 Z" fill="url(#boltHighlight)" opacity="0.7" />
  </Svg>
);

// 4. Suspension - 3D Shock Absorber + Slotted Brake Rotor Disc & Red Caliper
const Suspension3DObject = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="chromeSteel" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#94A3B8" />
        <Stop offset="50%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#475569" />
      </LinearGradient>
      <LinearGradient id="brakeRotorSteel" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#CBD5E1" />
        <Stop offset="50%" stopColor="#94A3B8" />
        <Stop offset="100%" stopColor="#475569" />
      </LinearGradient>
      <LinearGradient id="redCaliper" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#EF4444" />
        <Stop offset="100%" stopColor="#991B1B" />
      </LinearGradient>
    </Defs>
    {/* Ground Shadow */}
    <Ellipse cx="50" cy="88" rx="36" ry="7" fill="#000000" opacity="0.18" />
    
    {/* 1. Ventilated Brake Disc Rotor on right */}
    <Circle cx="62" cy="54" r="28" fill="url(#brakeRotorSteel)" stroke="#334155" strokeWidth="2" />
    <Circle cx="62" cy="54" r="18" fill="#1E293B" stroke="url(#chromeSteel)" strokeWidth="1.5" />
    <Circle cx="62" cy="54" r="8" fill="#0F172A" />
    {/* Rotor Slots */}
    <Line x1="50" y1="42" x2="56" y2="48" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    <Line x1="68" y1="38" x2="66" y2="46" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    <Line x1="74" y1="52" x2="68" y2="54" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    <Line x1="62" y1="68" x2="62" y2="60" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    
    {/* Red Brake Caliper */}
    <Path d="M 72 32 C 86 42 86 64 74 74 L 64 68 C 72 60 72 46 64 38 Z" fill="url(#redCaliper)" />
    <Rect x="72" y="44" width="8" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
    
    {/* 2. Shock Absorber Strut on left */}
    <Rect x="26" y="12" width="10" height="70" rx="3" fill="url(#chromeSteel)" />
    {/* Top Mount */}
    <Rect x="18" y="10" width="26" height="8" rx="2" fill="#0F172A" stroke="url(#chromeSteel)" strokeWidth="1" />
    {/* Coils */}
    <Path d="M 18 24 Q 44 28 18 34 Q 44 38 18 44 Q 44 48 18 54 Q 44 58 18 64" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none" />
    <Path d="M 18 24 Q 44 28 18 34 Q 44 38 18 44 Q 44 48 18 54 Q 44 58 18 64" stroke="url(#chromeSteel)" strokeWidth="3" strokeLinecap="round" fill="none" />
  </Svg>
);

// 5. Exhaust - 3D Dual Metallic Chrome Muffler & Tailpipes
const Exhaust3DObject = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="mufflerSteel" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#E2E8F0" />
        <Stop offset="40%" stopColor="#94A3B8" />
        <Stop offset="100%" stopColor="#334155" />
      </LinearGradient>
      <LinearGradient id="chromeTip" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#CBD5E1" />
        <Stop offset="50%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#475569" />
      </LinearGradient>
    </Defs>
    {/* Ground Shadow */}
    <Ellipse cx="50" cy="86" rx="36" ry="7" fill="#000000" opacity="0.18" />
    
    {/* Inlet Pipe */}
    <Path d="M 12 44 L 32 44 L 32 54 L 12 54 Z" fill="url(#mufflerSteel)" />
    
    {/* Oval Muffler Body */}
    <Rect x="26" y="26" width="42" height="46" rx="14" fill="url(#mufflerSteel)" />
    <Line x1="38" y1="26" x2="38" y2="72" stroke="#475569" strokeWidth="2" opacity="0.4" />
    <Line x1="56" y1="26" x2="56" y2="72" stroke="#475569" strokeWidth="2" opacity="0.4" />
    <Path d="M 28 29 L 64 29" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
    
    {/* Dual Exhaust Tips */}
    <Rect x="68" y="32" width="22" height="13" rx="3" fill="url(#chromeTip)" />
    <Ellipse cx="90" cy="38.5" rx="3" ry="6.5" fill="#090D16" />
    <Path d="M 68 33 L 88 33" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
    
    <Rect x="68" y="52" width="22" height="13" rx="3" fill="url(#chromeTip)" />
    <Ellipse cx="90" cy="58.5" rx="3" ry="6.5" fill="#090D16" />
    <Path d="M 68 53 L 88 53" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
  </Svg>
);

// 6. More - 4 Royal Blue Rounded Squares arranged in a 2x2 Grid
const More3DObject = ({ size = 52 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="blueSquareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#2563EB" />
        <Stop offset="100%" stopColor="#1D4ED8" />
      </LinearGradient>
    </Defs>
    {/* Ground Shadow */}
    <Ellipse cx="50" cy="88" rx="32" ry="6" fill="#000000" opacity="0.14" />
    
    <G transform="translate(14, 14)">
      <Rect x="0" y="0" width="32" height="32" rx="10" fill="url(#blueSquareGrad)" />
      <Rect x="38" y="0" width="32" height="32" rx="10" fill="url(#blueSquareGrad)" />
      <Rect x="0" y="38" width="32" height="32" rx="10" fill="url(#blueSquareGrad)" />
      <Rect x="38" y="38" width="32" height="32" rx="10" fill="url(#blueSquareGrad)" />
    </G>
  </Svg>
);

export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 52, active = false, style }) => {
  const t = (type || 'more').toLowerCase().trim();

  const render3DGraphic = () => {
    if (t.includes('engine') || t.includes('motor') || t.includes('piston') || t.includes('turbo')) {
      return <Engine3DObject size={size} />;
    }
    if (t.includes('body') || t.includes('door') || t.includes('bumper') || t.includes('fender') || t.includes('panel')) {
      return <Body3DObject size={size} />;
    }
    if (t.includes('elect') || t.includes('battery') || t.includes('light') || t.includes('spark') || t.includes('bolt')) {
      return <Electrical3DObject size={size} />;
    }
    if (t.includes('suspension') || t.includes('shock') || t.includes('strut') || t.includes('spring') || t.includes('brake') || t.includes('steering')) {
      return <Suspension3DObject size={size} />;
    }
    if (t.includes('exhaust') || t.includes('muffler') || t.includes('silencer') || t.includes('pipe')) {
      return <Exhaust3DObject size={size} />;
    }
    return <More3DObject size={size} />;
  };

  return (
    <View style={[styles.cutoutContainer, style]}>
      {render3DGraphic()}
    </View>
  );
};

const styles = StyleSheet.create({
  cutoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Category3DIcon;
