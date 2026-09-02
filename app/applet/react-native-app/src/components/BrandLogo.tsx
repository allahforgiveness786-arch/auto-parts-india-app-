import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Svg, { Path, Circle, Rect, Ellipse, Defs, LinearGradient, Stop } from 'react-native-svg';

export interface BrandLogoProps {
  name?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  active?: boolean;
}

// 1. Official Suzuki 'S' Emblem Vector
const SuzukiVector = ({ color = '#E62D31', size = 32 }: { color?: string; size?: number }) => (
  <Svg width={size * 1.2} height={size} viewBox="0 0 100 80">
    <Defs>
      <LinearGradient id="suzGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#EF4444" />
        <Stop offset="100%" stopColor="#B91C1C" />
      </LinearGradient>
    </Defs>
    <Path 
      fill={color === '#1565FF' ? '#1565FF' : 'url(#suzGrad)'} 
      d="M 68 8 C 50 18 42 24 42 24 L 8 8 S 28 0 46 12 L 72 28 L 76 26 L 8 2 S 20 0 38 0 C 56 0 92 24 92 24 S 72 38 54 26 L 38 16 L 34 18 L 92 56 S 80 58 62 70 C 44 82 8 80 8 80 L 92 38 S 72 32 54 44 L 28 60 L 24 62 L 92 80 C 68 80 68 80 68 80 Z"
    />
  </Svg>
);

// 2. Official Hyundai Tilted 'H' Emblem Vector
const HyundaiVector = ({ color = '#002C5F', size = 32 }: { color?: string; size?: number }) => (
  <Svg width={size * 1.3} height={size} viewBox="0 0 120 80">
    <Defs>
      <LinearGradient id="hyuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#00418A" />
        <Stop offset="100%" stopColor="#001838" />
      </LinearGradient>
    </Defs>
    <Ellipse cx="60" cy="40" rx="54" ry="34" fill="none" stroke={color === '#1565FF' ? '#1565FF' : 'url(#hyuGrad)'} strokeWidth="7" />
    <Path 
      fill={color === '#1565FF' ? '#1565FF' : 'url(#hyuGrad)'} 
      d="M 32 60 L 38 20 C 38 20 54 44 68 36 C 80 29 82 20 82 20 L 88 60 C 88 60 72 36 58 44 C 44 52 42 60 42 60 Z" 
    />
  </Svg>
);

// 3. Official Tata Motors 'T' Emblem Vector
const TataVector = ({ color = '#1E40AF', size = 32 }: { color?: string; size?: number }) => (
  <Svg width={size * 1.3} height={size} viewBox="0 0 120 80">
    <Defs>
      <LinearGradient id="tataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#2563EB" />
        <Stop offset="100%" stopColor="#1E3A8A" />
      </LinearGradient>
    </Defs>
    <Ellipse cx="60" cy="40" rx="54" ry="34" fill="none" stroke={color === '#1565FF' ? '#1565FF' : 'url(#tataGrad)'} strokeWidth="6" />
    <Path 
      fill={color === '#1565FF' ? '#1565FF' : 'url(#tataGrad)'} 
      d="M 24 24 C 44 22 76 22 96 24 L 92 34 C 76 31 68 31 64 36 L 64 64 L 56 64 L 56 36 C 52 31 44 31 28 34 Z" 
    />
  </Svg>
);

// 4. Official Mahindra Twin Peaks 'M' Emblem Vector
const MahindraVector = ({ color = '#E21836', size = 32 }: { color?: string; size?: number }) => (
  <Svg width={size * 1.3} height={size} viewBox="0 0 120 80">
    <Defs>
      <LinearGradient id="mahGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#EF4444" />
        <Stop offset="100%" stopColor="#991B1B" />
      </LinearGradient>
    </Defs>
    <Path 
      fill={color === '#1565FF' ? '#1565FF' : 'url(#mahGrad)'} 
      d="M 12 62 L 32 18 C 36 18 42 28 50 42 C 58 28 64 18 68 18 L 88 62 L 76 62 L 68 40 L 58 58 L 42 58 L 32 40 L 24 62 Z M 50 18 C 55 18 60 22 65 30 L 50 52 L 35 30 C 40 22 45 18 50 18 Z" 
    />
  </Svg>
);

// 5. Official Toyota Ellipses Emblem Vector
const ToyotaVector = ({ color = '#EB0A1E', size = 32 }: { color?: string; size?: number }) => (
  <Svg width={size * 1.3} height={size} viewBox="0 0 120 80">
    <Defs>
      <LinearGradient id="toyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#DC2626" />
        <Stop offset="100%" stopColor="#991B1B" />
      </LinearGradient>
    </Defs>
    <Ellipse cx="60" cy="40" rx="54" ry="34" fill="none" stroke={color === '#1565FF' ? '#1565FF' : 'url(#toyGrad)'} strokeWidth="6" />
    <Ellipse cx="60" cy="22" rx="36" ry="12" fill="none" stroke={color === '#1565FF' ? '#1565FF' : 'url(#toyGrad)'} strokeWidth="5" />
    <Ellipse cx="60" cy="46" rx="14" ry="24" fill="none" stroke={color === '#1565FF' ? '#1565FF' : 'url(#toyGrad)'} strokeWidth="5" />
  </Svg>
);

// 6. Official Honda 'H' Emblem Vector
const HondaVector = ({ color = '#0F172A', size = 32 }: { color?: string; size?: number }) => (
  <Svg width={size * 1.2} height={size} viewBox="0 0 100 80">
    <Path 
      fill="none" 
      stroke={color === '#1565FF' ? '#1565FF' : '#0F172A'} 
      strokeWidth="6" 
      d="M 18 10 L 82 10 C 88 10 92 14 90 22 L 82 70 C 80 76 74 78 68 78 L 32 78 C 26 78 20 76 18 70 L 10 22 C 8 14 12 10 18 10 Z" 
    />
    <Path 
      fill={color === '#1565FF' ? '#1565FF' : '#0F172A'} 
      d="M 26 20 L 34 20 L 38 42 L 62 42 L 66 20 L 74 20 L 70 68 L 62 68 L 60 48 L 40 48 L 38 68 L 30 68 Z" 
    />
  </Svg>
);

// 7. Official KIA Wordmark Vector
const KiaVector = ({ color = '#05141F', size = 32 }: { color?: string; size?: number }) => (
  <Svg width={size * 1.4} height={size} viewBox="0 0 120 60">
    <Path 
      fill={color === '#1565FF' ? '#1565FF' : '#05141F'} 
      d="M 12 12 L 24 12 L 24 48 L 12 48 Z M 32 12 L 44 12 L 62 30 L 62 12 L 74 12 L 74 48 L 62 48 L 44 30 L 44 48 L 32 48 Z M 82 12 L 108 12 L 108 22 L 94 22 L 94 28 L 106 28 L 106 38 L 94 38 L 94 48 L 82 48 Z" 
    />
  </Svg>
);

// 8. Official Volkswagen Emblem Vector
const VolkswagenVector = ({ color = '#001E50', size = 32 }: { color?: string; size?: number }) => (
  <Svg width={size * 1.2} height={size} viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="44" fill="none" stroke={color === '#1565FF' ? '#1565FF' : '#001E50'} strokeWidth="7" />
    <Path 
      fill={color === '#1565FF' ? '#1565FF' : '#001E50'} 
      d="M 28 22 L 36 22 L 46 54 L 54 54 L 64 22 L 72 22 L 58 64 L 42 64 Z M 36 68 L 44 68 L 50 82 L 56 82 L 64 68 L 72 68 L 58 92 L 42 92 Z" 
    />
  </Svg>
);

// 9. Official Ford Oval Vector
const FordVector = ({ color = '#003478', size = 32 }: { color?: string; size?: number }) => (
  <Svg width={size * 1.4} height={size} viewBox="0 0 120 70">
    <Ellipse cx="60" cy="35" rx="54" ry="28" fill={color === '#1565FF' ? '#1565FF' : '#003478'} stroke="#FFFFFF" strokeWidth="4" />
    <Path fill="#FFFFFF" d="M 32 45 C 32 25 50 20 62 20 C 72 20 84 25 84 35 C 84 45 70 50 58 50 C 42 50 32 45 32 45 Z M 42 35 C 42 28 54 26 62 26 C 70 26 74 30 74 35 C 74 40 64 42 58 42 C 48 42 42 38 42 35 Z" />
  </Svg>
);

export const BrandLogo: React.FC<BrandLogoProps> = ({ name, size = 30, style, active = false }) => {
  const norm = (name || '').toLowerCase().trim();
  const activeColor = active ? '#1565FF' : undefined;

  const renderLogoGraphic = () => {
    if (norm.includes('maruti') || norm.includes('suzuki')) return <SuzukiVector color={activeColor} size={size} />;
    if (norm.includes('hyundai')) return <HyundaiVector color={activeColor} size={size} />;
    if (norm.includes('tata')) return <TataVector color={activeColor} size={size} />;
    if (norm.includes('mahindra')) return <MahindraVector color={activeColor} size={size} />;
    if (norm.includes('toyota')) return <ToyotaVector color={activeColor} size={size} />;
    if (norm.includes('honda')) return <HondaVector color={activeColor} size={size} />;
    if (norm.includes('kia')) return <KiaVector color={activeColor} size={size} />;
    if (norm.includes('volkswagen') || norm.includes('vw')) return <VolkswagenVector color={activeColor} size={size} />;
    if (norm.includes('ford')) return <FordVector color={activeColor} size={size} />;
    
    return <SuzukiVector color={activeColor} size={size} />;
  };

  return (
    <View style={[styles.container, style]}>
      {renderLogoGraphic()}
    </View>
  );
};

export const CarBrandBadge: React.FC<{ brand: string; size?: number; active?: boolean }> = ({ brand, size = 30, active = false }) => {
  return <BrandLogo name={brand} size={size} active={active} />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BrandLogo;
