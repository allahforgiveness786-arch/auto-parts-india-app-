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

/* 
  Isolated Transparent 3D Cutout Graphics (OLX Style)
  No rectangular photo background - pure floating 3D objects with dynamic highlights and shadows
*/

// 1. Engine & Parts - Isolated 3D V8 Turbo Engine Cutout
const EngineIsolatedCutout = ({ size = 56 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="olxEngBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#475569" />
        <Stop offset="50%" stopColor="#1E293B" />
        <Stop offset="100%" stopColor="#0F172A" />
      </LinearGradient>
      <LinearGradient id="olxValveRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#EF4444" />
        <Stop offset="70%" stopColor="#DC2626" />
        <Stop offset="100%" stopColor="#991B1B" />
      </LinearGradient>
      <LinearGradient id="olxChromePipe" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#CBD5E1" />
        <Stop offset="50%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#64748B" />
      </LinearGradient>
      <LinearGradient id="olxTurboGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#3B82F6" />
        <Stop offset="100%" stopColor="#1D4ED8" />
      </LinearGradient>
    </Defs>
    {/* Contact Shadow beneath object */}
    <Ellipse cx="50" cy="88" rx="38" ry="8" fill="#000000" opacity="0.18" />
    {/* Main Engine Block */}
    <Path d="M 22 52 L 50 34 L 78 52 L 78 74 L 50 90 L 22 74 Z" fill="url(#olxEngBody)" />
    <Path d="M 22 38 L 50 20 L 78 38 L 78 52 L 50 68 L 22 52 Z" fill="url(#olxValveRed)" />
    <Path d="M 30 38 L 50 25 L 70 38 L 50 50 Z" fill="#7F1D1D" opacity="0.6" />
    {/* Chrome Intake Headers */}
    <Path d="M 34 37 L 50 27 L 66 37" stroke="url(#olxChromePipe)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <Path d="M 34 43 L 50 33 L 66 43" stroke="url(#olxChromePipe)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <Path d="M 16 40 C 16 28 32 22 44 22 L 50 22" stroke="url(#olxChromePipe)" strokeWidth="6" strokeLinecap="round" fill="none" />
    {/* Turbocharger Unit */}
    <Path d="M 10 34 L 22 30 L 22 50 L 10 46 Z" fill="url(#olxTurboGlow)" />
    <Ellipse cx="10" cy="40" rx="3" ry="7" fill="#60A5FA" />
    {/* Pulleys */}
    <Circle cx="36" cy="70" r="8" fill="#0F172A" stroke="url(#olxChromePipe)" strokeWidth="2.5" />
    <Circle cx="36" cy="70" r="3" fill="#94A3B8" />
    <Circle cx="64" cy="70" r="8" fill="#0F172A" stroke="url(#olxChromePipe)" strokeWidth="2.5" />
    <Circle cx="64" cy="70" r="3" fill="#94A3B8" />
    {/* Top Highlight Line */}
    <Path d="M 22 38 L 50 20 L 78 38" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" fill="none" />
  </Svg>
);

// 2. Body Parts & Shell - Isolated 3D Car Metallic Door/Panel Cutout
const BodyIsolatedCutout = ({ size = 56 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="olxCarPaint" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#2563EB" />
        <Stop offset="50%" stopColor="#1D4ED8" />
        <Stop offset="100%" stopColor="#0F172A" />
      </LinearGradient>
      <LinearGradient id="olxGlassTint" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#334155" />
        <Stop offset="100%" stopColor="#020617" />
      </LinearGradient>
      <LinearGradient id="olxChromeHandle" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#E2E8F0" />
        <Stop offset="50%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#64748B" />
      </LinearGradient>
    </Defs>
    {/* Contact Shadow */}
    <Ellipse cx="50" cy="88" rx="38" ry="7" fill="#000000" opacity="0.18" />
    {/* Metallic Door Panel */}
    <Path d="M 16 38 C 30 20 70 18 88 30 L 84 76 C 78 82 66 85 50 85 C 34 85 18 80 16 70 Z" fill="url(#olxCarPaint)" />
    {/* Window Tint */}
    <Path d="M 24 38 C 34 25 62 23 78 32 L 76 50 L 22 50 Z" fill="url(#olxGlassTint)" />
    {/* Window Reflection */}
    <Path d="M 30 36 L 42 34 L 36 48 L 26 48 Z" fill="#FFFFFF" opacity="0.35" />
    <Path d="M 48 33 L 60 31 L 54 48 L 44 48 Z" fill="#FFFFFF" opacity="0.25" />
    {/* Body Contour Specular Line */}
    <Path d="M 16 38 C 30 20 70 18 88 30 L 85 42 C 65 30 30 32 16 48 Z" fill="#FFFFFF" opacity="0.28" />
    {/* Chrome Door Handle */}
    <Rect x="54" y="58" width="20" height="6" rx="3" fill="url(#olxChromeHandle)" />
    <Rect x="56" y="60" width="16" height="2" rx="1" fill="#FFFFFF" opacity="0.9" />
    {/* Side Mirror */}
    <Path d="M 76 44 C 84 42 92 46 88 53 C 82 56 76 53 76 49 Z" fill="#0F172A" stroke="url(#olxChromeHandle)" strokeWidth="1.5" />
    <Path d="M 20 72 L 80 76" stroke="#0F172A" strokeWidth="3" opacity="0.4" />
  </Svg>
);

// 3. Electricals & Battery - Isolated 3D Battery Cutout with Lightning Bolt
const ElectricalIsolatedCutout = ({ size = 56 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="olxBattBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#334155" />
        <Stop offset="100%" stopColor="#0F172A" />
      </LinearGradient>
      <LinearGradient id="olxBattCap" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#2563EB" />
        <Stop offset="100%" stopColor="#1D4ED8" />
      </LinearGradient>
      <LinearGradient id="olxGoldBolt" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#FEF08A" />
        <Stop offset="50%" stopColor="#F59E0B" />
        <Stop offset="100%" stopColor="#D97706" />
      </LinearGradient>
    </Defs>
    {/* Contact Shadow */}
    <Ellipse cx="50" cy="87" rx="36" ry="7" fill="#000000" opacity="0.18" />
    {/* Battery Casing */}
    <Path d="M 20 40 L 50 25 L 80 40 L 80 75 L 50 90 L 20 75 Z" fill="url(#olxBattBody)" />
    <Path d="M 20 40 L 50 25 L 80 40 L 50 53 Z" fill="url(#olxBattCap)" />
    <Path d="M 20 40 L 50 25 L 80 40" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.5" fill="none" />
    {/* Positive Terminal Red */}
    <Path d="M 30 28 L 38 24 L 42 26 L 34 30 Z" fill="#EF4444" />
    <Rect x="33" y="18" width="6" height="9" rx="1.5" fill="#DC2626" />
    {/* Negative Terminal Blue/Silver */}
    <Path d="M 62 44 L 70 40 L 74 42 L 66 46 Z" fill="#94A3B8" />
    <Rect x="65" y="34" width="6" height="9" rx="1.5" fill="#64748B" />
    {/* 3D Glowing Energy Bolt */}
    <Path d="M 55 32 L 36 58 L 48 58 L 41 80 L 65 50 L 52 50 Z" fill="url(#olxGoldBolt)" />
    <Path d="M 53 34 L 38 56 L 48 56 L 44 74 L 61 52 L 52 52 Z" fill="#FFFFFF" opacity="0.45" />
  </Svg>
);

// 4. Suspension & Brakes - Isolated 3D Red Coilover Strut Cutout
const SuspensionIsolatedCutout = ({ size = 56 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="olxChromeShaft" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#94A3B8" />
        <Stop offset="50%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#475569" />
      </LinearGradient>
      <LinearGradient id="olxRedSpring" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#F87171" />
        <Stop offset="40%" stopColor="#DC2626" />
        <Stop offset="100%" stopColor="#991B1B" />
      </LinearGradient>
    </Defs>
    {/* Contact Shadow */}
    <Ellipse cx="50" cy="90" rx="28" ry="6" fill="#000000" opacity="0.18" />
    {/* Damper Shaft */}
    <Rect x="44" y="10" width="12" height="74" rx="3" fill="url(#olxChromeShaft)" />
    <Path d="M 32 12 L 68 12 L 64 22 L 36 22 Z" fill="#1E293B" />
    <Rect x="32" y="10" width="36" height="3.5" rx="1" fill="#64748B" />
    {/* 3D Coils */}
    <G fill="url(#olxRedSpring)">
      <Path d="M 28 26 C 28 20 72 26 72 31 C 72 36 28 31 28 26 Z" />
      <Path d="M 28 26 C 28 20 72 26 72 31 L 70 33 C 70 28 30 23 28 28 Z" fill="#FFFFFF" opacity="0.4" />
      <Path d="M 28 39 C 28 33 72 39 72 44 C 72 49 28 44 28 39 Z" />
      <Path d="M 28 39 C 28 33 72 39 72 44 L 70 46 C 70 41 30 36 28 41 Z" fill="#FFFFFF" opacity="0.4" />
      <Path d="M 28 52 C 28 46 72 52 72 57 C 72 62 28 57 28 52 Z" />
      <Path d="M 28 52 C 28 46 72 52 72 57 L 70 59 C 70 54 30 49 28 54 Z" fill="#FFFFFF" opacity="0.4" />
      <Path d="M 28 65 C 28 59 72 65 72 70 C 72 75 28 70 28 65 Z" />
      <Path d="M 28 65 C 28 59 72 65 72 70 L 70 72 C 70 67 30 62 28 67 Z" fill="#FFFFFF" opacity="0.4" />
    </G>
    {/* Lower Mounting Bush */}
    <Circle cx="50" cy="80" r="10" fill="#1E293B" />
    <Circle cx="50" cy="80" r="5" fill="url(#olxChromeShaft)" />
  </Svg>
);

// 5. Exhaust Systems - Isolated 3D Burnt Titanium Blue Exhaust Cutout
const ExhaustIsolatedCutout = ({ size = 56 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="olxMuffler" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#E2E8F0" />
        <Stop offset="40%" stopColor="#94A3B8" />
        <Stop offset="100%" stopColor="#334155" />
      </LinearGradient>
      <LinearGradient id="olxTitaniumTip" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#2563EB" />
        <Stop offset="30%" stopColor="#7C3AED" />
        <Stop offset="70%" stopColor="#CBD5E1" />
        <Stop offset="100%" stopColor="#64748B" />
      </LinearGradient>
    </Defs>
    {/* Contact Shadow */}
    <Ellipse cx="50" cy="86" rx="36" ry="7" fill="#000000" opacity="0.18" />
    {/* Inlet Pipe */}
    <Path d="M 10 44 L 32 44 L 32 54 L 10 54 Z" fill="url(#olxMuffler)" />
    {/* Muffler Box */}
    <Rect x="26" y="25" width="42" height="48" rx="12" fill="url(#olxMuffler)" />
    <Line x1="38" y1="25" x2="38" y2="73" stroke="#475569" strokeWidth="2.5" opacity="0.4" />
    <Line x1="56" y1="25" x2="56" y2="73" stroke="#475569" strokeWidth="2.5" opacity="0.4" />
    <Path d="M 28 28 L 64 28" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
    {/* Burnt Titanium Dual Tips */}
    <Rect x="68" y="32" width="22" height="13" rx="3" fill="url(#olxTitaniumTip)" />
    <Ellipse cx="90" cy="38.5" rx="3" ry="6.5" fill="#090D16" />
    <Path d="M 68 33 L 88 33" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
    <Rect x="68" y="52" width="22" height="13" rx="3" fill="url(#olxTitaniumTip)" />
    <Ellipse cx="90" cy="58.5" rx="3" ry="6.5" fill="#090D16" />
    <Path d="M 68 53 L 88 53" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
  </Svg>
);

// 6. Wheels & Tyres - Isolated 3D Sport Alloy Wheel Cutout
const WheelIsolatedCutout = ({ size = 56 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="olxRubberTyre" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#334155" />
        <Stop offset="70%" stopColor="#0F172A" />
        <Stop offset="100%" stopColor="#020617" />
      </LinearGradient>
      <LinearGradient id="olxAlloyRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="50%" stopColor="#94A3B8" />
        <Stop offset="100%" stopColor="#475569" />
      </LinearGradient>
    </Defs>
    {/* Contact Shadow */}
    <Ellipse cx="50" cy="88" rx="36" ry="7" fill="#000000" opacity="0.2" />
    {/* Outer Rubber Tyre */}
    <Circle cx="50" cy="48" r="38" fill="url(#olxRubberTyre)" />
    {/* Tread Pattern Detailing */}
    <Circle cx="50" cy="48" r="37" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.6" />
    {/* Alloy Rim Inner */}
    <Circle cx="50" cy="48" r="26" fill="url(#olxAlloyRim)" />
    <Circle cx="50" cy="48" r="23" fill="#0F172A" />
    {/* 5-Spoke Alloy Design */}
    <G stroke="url(#olxAlloyRim)" strokeWidth="4.5" strokeLinecap="round">
      <Line x1="50" y1="48" x2="50" y2="26" />
      <Line x1="50" y1="48" x2="71" y2="41" />
      <Line x1="50" y1="48" x2="63" y2="67" />
      <Line x1="50" y1="48" x2="37" y2="67" />
      <Line x1="50" y1="48" x2="29" y2="41" />
    </G>
    {/* Center Cap */}
    <Circle cx="50" cy="48" r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
  </Svg>
);

// 7. More Categories - Isolated 3D Grid Cubes Cutout
const MoreIsolatedCutout = ({ size = 56 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="olxCubeT" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#60A5FA" />
        <Stop offset="100%" stopColor="#2563EB" />
      </LinearGradient>
      <LinearGradient id="olxCubeL" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#1D4ED8" />
        <Stop offset="100%" stopColor="#1E40AF" />
      </LinearGradient>
      <LinearGradient id="olxCubeR" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#1E3A8A" />
        <Stop offset="100%" stopColor="#0F172A" />
      </LinearGradient>
    </Defs>
    {/* Contact Shadow */}
    <Ellipse cx="50" cy="88" rx="34" ry="7" fill="#000000" opacity="0.18" />
    <G transform="translate(25, 12)">
      <Path d="M 25 0 L 50 12 L 25 24 L 0 12 Z" fill="url(#olxCubeT)" />
      <Path d="M 0 12 L 25 24 L 25 48 L 0 36 Z" fill="url(#olxCubeL)" />
      <Path d="M 25 24 L 50 12 L 50 36 L 25 48 Z" fill="url(#olxCubeR)" />
      <Path d="M 25 0 L 0 12 L 25 24 L 50 12 Z" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.6" />
    </G>
    <G transform="translate(6, 38)">
      <Path d="M 22 0 L 44 11 L 22 22 L 0 11 Z" fill="url(#olxCubeT)" />
      <Path d="M 0 11 L 22 22 L 22 44 L 0 33 Z" fill="url(#olxCubeL)" />
      <Path d="M 22 22 L 44 11 L 44 33 L 22 44 Z" fill="url(#olxCubeR)" />
      <Path d="M 22 0 L 0 11 L 22 22 L 44 11 Z" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.6" />
    </G>
    <G transform="translate(48, 38)">
      <Path d="M 22 0 L 44 11 L 22 22 L 0 11 Z" fill="url(#olxCubeT)" />
      <Path d="M 0 11 L 22 22 L 22 44 L 0 33 Z" fill="url(#olxCubeL)" />
      <Path d="M 22 22 L 44 11 L 44 33 L 22 44 Z" fill="url(#olxCubeR)" />
      <Path d="M 22 0 L 0 11 L 22 22 L 44 11 Z" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.6" />
    </G>
  </Svg>
);

export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 56, active = false }) => {
  const t = (type || 'more').toLowerCase().trim();
  
  const renderCutoutGraphic = () => {
    if (t.includes('engine') || t.includes('motor')) return <EngineIsolatedCutout size={size} />;
    if (t.includes('body') || t.includes('door') || t.includes('bumper')) return <BodyIsolatedCutout size={size} />;
    if (t.includes('elect') || t.includes('battery') || t.includes('light')) return <ElectricalIsolatedCutout size={size} />;
    if (t.includes('suspension') || t.includes('shock') || t.includes('brake')) return <SuspensionIsolatedCutout size={size} />;
    if (t.includes('exhaust') || t.includes('pipe') || t.includes('silencer')) return <ExhaustIsolatedCutout size={size} />;
    if (t.includes('wheel') || t.includes('tyre') || t.includes('alloy')) return <WheelIsolatedCutout size={size} />;
    return <MoreIsolatedCutout size={size} />;
  };

  return (
    <View style={styles.cutoutContainer}>
      {renderCutoutGraphic()}
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
