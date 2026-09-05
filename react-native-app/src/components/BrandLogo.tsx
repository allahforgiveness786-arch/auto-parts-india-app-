import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';
import Svg, { 
  Path, 
  Circle, 
  Rect, 
  Ellipse, 
  Polygon, 
  Line, 
  G, 
  Defs, 
  LinearGradient, 
  Stop, 
  Text as SvgText 
} from 'react-native-svg';

export interface BrandLogoProps {
  name?: string;
  brand?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  active?: boolean;
  variant?: 'icon' | 'full' | 'horizontal' | string;
  theme?: 'dark' | 'light' | string;
}

const APP_LOGO = require('../assets/logo.png');
const APP_LOGO_ICON = require('../assets/logo_icon.png');

/**
 * 100% Native Vector Auto Parts India Square App Icon
 * Features a modern aerodynamic car silhouette combined with a precision minimal gear/wrench element
 * Color direction: Deep professional blue, speed cyan, pure white
 */
export function AutoPartsIcon({ size = 48, style }: { size?: number; style?: StyleProp<ViewStyle> }) {
  const s = size;
  return (
    <View style={[styles.center, { width: s, height: s }, style]}>
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="apBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0F1F38" />
            <Stop offset="50%" stopColor="#0A1526" />
            <Stop offset="100%" stopColor="#050B14" />
          </LinearGradient>

          <LinearGradient id="apRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#38BDF8" />
            <Stop offset="40%" stopColor="#0066FF" />
            <Stop offset="80%" stopColor="#003B95" />
            <Stop offset="100%" stopColor="#0284C7" />
          </LinearGradient>

          <LinearGradient id="apCarStream" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#38BDF8" />
            <Stop offset="50%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#60A5FA" />
          </LinearGradient>

          <LinearGradient id="apGearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#38BDF8" />
            <Stop offset="50%" stopColor="#0066FF" />
            <Stop offset="100%" stopColor="#003B95" />
          </LinearGradient>
        </Defs>

        {/* Outer Rounded Shield */}
        <Rect x="8" y="8" width="184" height="184" rx="42" fill="url(#apBgGrad)" stroke="url(#apRimGrad)" strokeWidth="3.5" />

        {/* Concentric Mechanical Track */}
        <G opacity="0.25">
          <Circle cx="100" cy="100" r="76" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="4 6" />
          <Circle cx="100" cy="100" r="58" fill="none" stroke="#1E293B" strokeWidth="1" />
        </G>

        {/* Core Automotive Symbol: Modern Car Silhouette + Minimal Gear & Wrench */}
        <G transform="translate(10, 8)">
          {/* Gear (Spare Parts Core) */}
          <G transform="translate(68, 108)" fill="url(#apGearGrad)">
            <Path d="M -6,-28 L 6,-28 L 5,-22 C 8,-21 11,-19 14,-17 L 19,-20 L 27,-12 L 24,-7 C 26,-4 28,-1 29,2 L 35,3 L 35,15 L 29,16 C 28,19 26,22 24,25 L 27,30 L 19,38 L 14,35 C 11,37 8,39 5,40 L 6,46 L -6,46 L -5,40 C -8,39 -11,37 -14,35 L -19,38 L -27,30 L -24,25 C -26,22 -28,19 -29,16 L -35,15 L -35,3 L -29,2 C -28,-1 -26,-4 -24,-7 L -27,-12 L -19,-20 L -14,-17 C -11,-19 -8,-21 -5,-22 Z" opacity="0.95" />
            <Circle cx="0" cy="9" r="14" fill="#0A1526" stroke="#38BDF8" strokeWidth="2.5" />
            <Circle cx="0" cy="9" r="6" fill="#38BDF8" />
          </G>

          {/* Wrench (Mechanical Spare Parts Accent) */}
          <G transform="translate(132, 117) rotate(35)">
            <Path d="M -16,-6 L -42,-6 C -44,-6 -46,-4 -46,-2 L -46,2 C -46,4 -44,6 -42,6 L -16,6 C -14,12 -8,16 0,16 C 9,16 16,9 16,0 C 16,-9 9,-16 0,-16 C -8,-16 -14,-12 -16,-6 Z M 0,-8 C 4.4,-8 8,-4.4 8,0 C 8,4.4 4.4,8 0,8 C -3,8 -5.6,6.3 -6.9,3.8 L 3,3.8 L 3,-3.8 L -6.9,-3.8 C -5.6,-6.3 -3,-8 0,-8 Z" fill="#60A5FA" opacity="0.9" />
          </G>

          {/* Car Silhouette (Aerodynamic Roofline & Windshield) */}
          <Path d="M 22 104 C 32 94, 46 64, 76 52 C 102 42, 130 46, 154 78 C 160 86, 168 96, 172 104 C 174 108, 166 110, 158 108 C 138 104, 114 96, 86 96 C 58 96, 38 102, 22 104 Z" fill="url(#apCarStream)" />
          <Path d="M 48 88 C 70 62, 106 56, 142 80" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          <Path d="M 80 78 L 94 62 C 108 60, 120 62, 128 76 Z" fill="#0A1526" stroke="#38BDF8" strokeWidth="1.2" />
          <Path d="M 132 76 C 138 72, 144 74, 148 78 L 136 80 Z" fill="#0A1526" stroke="#38BDF8" strokeWidth="1.2" />
          <Path d="M 158 98 L 174 102 L 160 106 Z" fill="#38BDF8" opacity="0.95" />
          <Path d="M 18 116 L 38 116" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <Path d="M 102 126 L 166 126" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        </G>
      </Svg>
    </View>
  );
}

/**
 * 100% Native Vector AUTO PARTS INDIA Full Horizontal Brand Logo
 */
export function AutoPartsLogo({ 
  height = 40, 
  theme = 'dark',
  style 
}: { 
  height?: number; 
  theme?: 'dark' | 'light';
  style?: StyleProp<ViewStyle>; 
}) {
  const width = height * 4.6;
  const isLight = theme === 'light';

  return (
    <View style={[styles.center, { width, height }, style]}>
      <Svg width={width} height={height} viewBox="0 0 580 130">
        <Defs>
          <LinearGradient id="apHIconBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0F1F38" />
            <Stop offset="50%" stopColor="#0A1526" />
            <Stop offset="100%" stopColor="#050B14" />
          </LinearGradient>

          <LinearGradient id="apHRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#38BDF8" />
            <Stop offset="40%" stopColor="#0066FF" />
            <Stop offset="80%" stopColor="#003B95" />
            <Stop offset="100%" stopColor="#0284C7" />
          </LinearGradient>

          <LinearGradient id="apHCarStream" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#38BDF8" />
            <Stop offset="50%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#60A5FA" />
          </LinearGradient>

          <LinearGradient id="apHGearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#38BDF8" />
            <Stop offset="50%" stopColor="#0066FF" />
            <Stop offset="100%" stopColor="#003B95" />
          </LinearGradient>

          <LinearGradient id="apHCyanBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#38BDF8" />
            <Stop offset="100%" stopColor="#0066FF" />
          </LinearGradient>
        </Defs>

        {/* LEFT EMBLEM ICON */}
        <G transform="translate(10, 10)">
          <Rect x="0" y="0" width="110" height="110" rx="26" fill="url(#apHIconBg)" stroke="url(#apHRim)" strokeWidth="2.5" />
          <Circle cx="55" cy="55" r="42" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 4" opacity="0.25" />
          
          <G transform="translate(4, 5) scale(0.55)">
            {/* Gear */}
            <G transform="translate(68, 108)" fill="url(#apHGearGrad)">
              <Path d="M -6,-28 L 6,-28 L 5,-22 C 8,-21 11,-19 14,-17 L 19,-20 L 27,-12 L 24,-7 C 26,-4 28,-1 29,2 L 35,3 L 35,15 L 29,16 C 28,19 26,22 24,25 L 27,30 L 19,38 L 14,35 C 11,37 8,39 5,40 L 6,46 L -6,46 L -5,40 C -8,39 -11,37 -14,35 L -19,38 L -27,30 L -24,25 C -26,22 -28,19 -29,16 L -35,15 L -35,3 L -29,2 C -28,-1 -26,-4 -24,-7 L -27,-12 L -19,-20 L -14,-17 C -11,-19 -8,-21 -5,-22 Z" opacity="0.95" />
              <Circle cx="0" cy="9" r="14" fill="#0A1526" stroke="#38BDF8" strokeWidth="2.5" />
              <Circle cx="0" cy="9" r="6" fill="#38BDF8" />
            </G>

            {/* Wrench */}
            <G transform="translate(132, 117) rotate(35)">
              <Path d="M -16,-6 L -42,-6 C -44,-6 -46,-4 -46,-2 L -46,2 C -46,4 -44,6 -42,6 L -16,6 C -14,12 -8,16 0,16 C 9,16 16,9 16,0 C 16,-9 9,-16 0,-16 C -8,-16 -14,-12 -16,-6 Z M 0,-8 C 4.4,-8 8,-4.4 8,0 C 8,4.4 4.4,8 0,8 C -3,8 -5.6,6.3 -6.9,3.8 L 3,3.8 L 3,-3.8 L -6.9,-3.8 C -5.6,-6.3 -3,-8 0,-8 Z" fill="#60A5FA" opacity="0.9" />
            </G>

            {/* Car */}
            <Path d="M 22 104 C 32 94, 46 64, 76 52 C 102 42, 130 46, 154 78 C 160 86, 168 96, 172 104 C 174 108, 166 110, 158 108 C 138 104, 114 96, 86 96 C 58 96, 38 102, 22 104 Z" fill="url(#apHCarStream)" />
            <Path d="M 48 88 C 70 62, 106 56, 142 80" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <Path d="M 80 78 L 94 62 C 108 60, 120 62, 128 76 Z" fill="#0A1526" stroke="#38BDF8" strokeWidth="1.2" />
            <Path d="M 132 76 C 138 72, 144 74, 148 78 L 136 80 Z" fill="#0A1526" stroke="#38BDF8" strokeWidth="1.2" />
            <Path d="M 158 98 L 174 102 L 160 106 Z" fill="#38BDF8" opacity="0.95" />
          </G>
        </G>

        {/* RIGHT BRAND TYPOGRAPHY */}
        <G transform="translate(138, 12)">
          {/* AUTO */}
          <SvgText 
            x="0" 
            y="52" 
            fontFamily="sans-serif" 
            fontWeight="900" 
            fontSize="44" 
            fill={isLight ? '#0F172A' : '#FFFFFF'} 
            letterSpacing="-1"
          >
            AUTO
          </SvgText>
          
          {/* PARTS */}
          <SvgText 
            x="135" 
            y="52" 
            fontFamily="sans-serif" 
            fontWeight="900" 
            fontStyle="italic" 
            fontSize="44" 
            fill="url(#apHCyanBlue)" 
            letterSpacing="-0.5"
          >
            PARTS
          </SvgText>

          {/* Micro Tricolor & INDIA Badge */}
          <G transform="translate(310, 22)">
            <Rect x="0" y="0" width="84" height="24" rx="6" fill={isLight ? '#F1F5F9' : '#0F1F38'} stroke={isLight ? '#CBD5E1' : '#0052CC'} strokeWidth="1.2" />
            
            {/* Tricolor */}
            <Rect x="6" y="5" width="4" height="14" rx="1" fill="#FF9933" />
            <Rect x="11" y="5" width="4" height="14" rx="1" fill={isLight ? '#94A3B8' : '#FFFFFF'} />
            <Rect x="16" y="5" width="4" height="14" rx="1" fill="#138808" />

            {/* INDIA Text */}
            <SvgText 
              x="26" 
              y="17" 
              fontFamily="sans-serif" 
              fontWeight="900" 
              fontSize="11" 
              fill={isLight ? '#0052CC' : '#38BDF8'} 
              letterSpacing="1.5"
            >
              INDIA
            </SvgText>
          </G>

          {/* Speed divider line */}
          <Rect x="0" y="66" width="410" height="3" rx="1.5" fill="#1E293B" opacity={isLight ? 0.2 : 0.7} />
          <Rect x="0" y="66" width="120" height="3" rx="1.5" fill="url(#apHCarStream)" />
          <Rect x="124" y="66" width="90" height="3" rx="1.5" fill="#0066FF" />
          <Circle cx="220" cy="67.5" r="3" fill="#38BDF8" />

          {/* Subline */}
          <SvgText 
            x="0" 
            y="88" 
            fontFamily="sans-serif" 
            fontWeight="700" 
            fontSize="11" 
            fill={isLight ? '#475569' : '#94A3B8'} 
            letterSpacing="3.5"
          >
            GENUINE AUTOMOTIVE SPARES MARKETPLACE
          </SvgText>
        </G>
      </Svg>
    </View>
  );
}

/**
 * Authentic, Official Automotive OEM Brand Emblems (100% Vector, Sharp & Real)
 */
function renderBrandVector(brandKey: string, size: number) {
  const s = size;

  // 1. Maruti Suzuki
  if (brandKey.includes('maruti') || brandKey.includes('suzuki')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="szRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#E2231A" />
            <Stop offset="100%" stopColor="#BE123C" />
          </LinearGradient>
          <LinearGradient id="szBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#002D62" />
            <Stop offset="100%" stopColor="#001838" />
          </LinearGradient>
        </Defs>
        <G transform="translate(18, 12) scale(0.82)">
          <Path d="M 38 18 L 162 18 L 122 68 L 162 68 L 112 122 L 62 122 L 102 72 L 38 72 Z" fill="url(#szRed)" />
          <Path d="M 162 182 L 38 182 L 78 132 L 38 132 L 88 78 L 138 78 L 98 128 L 162 128 Z" fill="url(#szBlue)" />
        </G>
      </Svg>
    );
  }

  // 2. Hyundai
  if (brandKey.includes('hyundai')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="hyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#002C6C" />
            <Stop offset="50%" stopColor="#00438F" />
            <Stop offset="100%" stopColor="#001844" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 25) scale(0.9)">
          <Path d="M 100 12 C 45 12 10 38 10 70 C 10 102 45 128 100 128 C 155 128 190 102 190 70 C 190 38 155 12 100 12 Z M 100 26 C 144 26 174 46 174 70 C 174 94 144 114 100 114 C 56 114 26 94 26 70 C 26 46 56 26 100 26 Z" fill="url(#hyBlue)" />
          <Path d="M 52 104 C 48 88 54 52 68 34 C 72 29 80 30 79 38 C 68 56 64 88 68 104 C 69 108 55 110 52 104 Z" fill="url(#hyBlue)" />
          <Path d="M 124 34 C 138 52 144 88 134 104 C 132 109 123 108 124 100 C 132 84 128 52 116 38 C 114 30 121 29 124 34 Z" fill="url(#hyBlue)" />
          <Path d="M 64 72 C 86 64 114 62 134 68 C 138 69 136 76 130 77 C 110 73 84 75 66 80 C 62 81 61 74 64 72 Z" fill="url(#hyBlue)" />
        </G>
      </Svg>
    );
  }

  // 3. Tata
  if (brandKey.includes('tata')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="tataNavy" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#005A9C" />
            <Stop offset="100%" stopColor="#003366" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 20) scale(0.9)">
          <Path d="M 100 15 C 48 15 10 44 10 80 C 10 116 48 145 100 145 C 152 145 190 116 190 80 C 190 44 152 15 100 15 Z M 100 29 C 142 29 174 53 174 80 C 174 107 142 131 100 131 C 58 131 26 107 26 80 C 26 53 58 29 100 29 Z" fill="url(#tataNavy)" />
          <Path d="M 48 64 C 68 64 88 80 94 116 C 86 98 72 84 48 84 Z" fill="url(#tataNavy)" />
          <Path d="M 152 64 C 132 64 112 80 106 116 C 114 98 128 84 152 84 Z" fill="url(#tataNavy)" />
          <Rect x="94" y="44" width="12" height="74" rx="6" fill="url(#tataNavy)" />
        </G>
      </Svg>
    );
  }

  // 4. Mahindra
  if (brandKey.includes('mahindra')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="mahRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#DC2626" />
            <Stop offset="100%" stopColor="#991B1B" />
          </LinearGradient>
        </Defs>
        <G transform="translate(15, 20) scale(0.85)">
          <Path d="M 28 140 L 76 36 C 80 28 90 28 94 36 L 108 72 L 84 124 C 80 134 68 144 56 144 Z" fill="url(#mahRed)" />
          <Path d="M 172 140 L 124 36 C 120 28 110 28 106 36 L 92 72 L 116 124 C 120 134 132 144 144 144 Z" fill="url(#mahRed)" />
          <Path d="M 94 48 L 100 36 L 106 48 L 100 84 Z" fill="#7F1D1D" />
          <Path d="M 46 156 C 80 172 120 172 154 156 C 136 164 64 164 46 156 Z" fill="url(#mahRed)" />
        </G>
      </Svg>
    );
  }

  // 5. Toyota
  if (brandKey.includes('toyota')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="toyotaRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#EB0A1E" />
            <Stop offset="100%" stopColor="#D0081A" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 30) scale(0.9)">
          <Path d="M 100 10 C 44 10 0 38 0 74 C 0 110 44 138 100 138 C 156 138 200 110 200 74 C 200 38 156 10 100 10 Z M 100 24 C 148 24 186 46 186 74 C 186 102 148 124 100 124 C 52 124 14 102 14 74 C 14 46 52 24 100 24 Z" fill="url(#toyotaRed)" />
          <Path d="M 100 32 C 84 32 72 50 72 74 C 72 98 84 116 100 116 C 116 116 128 98 128 74 C 128 50 116 32 100 32 Z M 100 44 C 108 44 114 58 114 74 C 114 90 108 104 100 104 C 92 104 86 90 86 74 C 86 58 92 44 100 44 Z" fill="url(#toyotaRed)" />
          <Path d="M 100 30 C 65 30 40 44 40 58 C 40 72 65 82 100 82 C 135 82 160 72 160 58 C 160 44 135 30 100 30 Z M 100 42 C 124 42 146 50 146 58 C 146 66 124 70 100 70 C 76 70 54 66 54 58 C 54 50 76 42 100 42 Z" fill="url(#toyotaRed)" />
        </G>
      </Svg>
    );
  }

  // 6. Honda
  if (brandKey.includes('honda')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="hondaRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#E40521" />
            <Stop offset="100%" stopColor="#C00319" />
          </LinearGradient>
        </Defs>
        <G transform="translate(20, 20) scale(0.8)">
          <Path d="M 24 16 L 176 16 C 188 16 196 26 192 38 L 168 168 C 166 178 158 184 148 184 L 52 184 C 42 184 34 178 32 168 L 8 38 C 4 26 12 16 24 16 Z M 38 32 L 22 162 C 21 166 24 168 28 168 L 132 168 C 136 168 139 166 138 162 L 122 32 C 121 28 118 26 114 26 L 46 26 C 42 26 39 28 38 32 Z" fill="url(#hondaRed)" fillRule="evenodd" />
          <Path d="M 38 38 L 56 38 L 68 110 L 92 110 L 104 38 L 122 38 L 110 162 L 92 162 L 88 124 L 72 124 L 68 162 L 50 162 Z" fill="url(#hondaRed)" />
        </G>
      </Svg>
    );
  }

  // 7. Kia
  if (brandKey.includes('kia')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="kiaDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#05141F" />
            <Stop offset="100%" stopColor="#000000" />
          </LinearGradient>
        </Defs>
        <G transform="translate(15, 60) scale(0.85)">
          <Path d="M 0 10 L 22 10 L 46 56 L 68 10 L 90 10 L 62 66 L 94 66 L 118 10 L 140 10 L 164 66 L 142 66 L 134 46 L 102 46 L 94 66 L 0 66 Z M 110 28 L 126 28 L 118 40 Z M 22 28 L 22 50 L 33 28 Z" fill="url(#kiaDark)" />
        </G>
      </Svg>
    );
  }

  // 8. Volkswagen
  if (brandKey.includes('volkswagen') || brandKey.includes('vw')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="vwBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#001E50" />
            <Stop offset="100%" stopColor="#000F29" />
          </LinearGradient>
        </Defs>
        <G transform="translate(20, 20) scale(0.8)">
          <Circle cx="100" cy="100" r="92" fill="none" stroke="url(#vwBlue)" strokeWidth="12" />
          <Path d="M 46 44 L 92 126 L 108 126 L 154 44 L 140 44 L 100 114 L 60 44 Z" fill="url(#vwBlue)" />
          <Path d="M 28 88 L 68 156 L 82 156 L 100 120 L 118 156 L 132 156 L 172 88 L 158 88 L 126 144 L 108 108 L 92 108 L 74 144 L 42 88 Z" fill="url(#vwBlue)" />
        </G>
      </Svg>
    );
  }

  // 9. Ford
  if (brandKey.includes('ford')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="fordBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#003478" />
            <Stop offset="50%" stopColor="#092B60" />
            <Stop offset="100%" stopColor="#001438" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 45) scale(0.9)">
          <Ellipse cx="100" cy="60" rx="96" ry="54" fill="url(#fordBlue)" stroke="#FFFFFF" strokeWidth="4" />
          <Ellipse cx="100" cy="60" rx="90" ry="48" fill="none" stroke="#60A5FA" strokeWidth="2" />
          <Path d="M 42 72 C 42 52 54 44 68 44 C 74 44 78 48 76 54 C 72 64 60 74 48 74 C 58 72 68 62 82 44 L 92 44 C 84 56 76 68 70 82 L 60 82 C 64 74 70 66 74 58 C 66 66 56 78 42 78 Z M 94 62 C 94 56 98 52 104 52 C 112 52 110 62 104 70 C 100 74 94 72 94 62 Z M 116 54 L 126 54 C 122 62 122 72 130 72 C 134 72 138 68 140 64 L 148 64 C 144 74 136 80 126 80 C 116 80 114 68 116 54 Z M 146 38 L 156 38 L 148 80 L 138 80 L 142 54 C 136 60 134 70 142 76 Z" fill="#FFFFFF" />
        </G>
      </Svg>
    );
  }

  // 10. Renault
  if (brandKey.includes('renault')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="renaultDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#1E293B" />
            <Stop offset="100%" stopColor="#0F172A" />
          </LinearGradient>
        </Defs>
        <G transform="translate(30, 15) scale(0.7)">
          <Path d="M 100 10 L 180 110 L 100 210 L 20 110 Z M 100 48 L 52 110 L 100 172 L 148 110 Z" fill="url(#renaultDark)" fillRule="evenodd" />
          <Path d="M 100 70 L 132 110 L 100 150 L 68 110 Z" fill="none" stroke="#EAB308" strokeWidth="8" />
        </G>
      </Svg>
    );
  }

  // 11. Skoda
  if (brandKey.includes('skoda')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="skEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0E3A2F" />
            <Stop offset="100%" stopColor="#145A48" />
          </LinearGradient>
        </Defs>
        <G transform="translate(20, 20) scale(0.8)">
          <Circle cx="100" cy="100" r="92" fill="url(#skEmerald)" />
          <Circle cx="100" cy="100" r="82" fill="none" stroke="#2BE87D" strokeWidth="4" />
          <Path d="M 64 68 C 82 56 112 56 142 66 L 126 84 C 106 78 86 78 72 84 Z" fill="#2BE87D" />
          <Path d="M 52 92 C 72 84 104 84 136 94 L 122 110 C 98 104 76 104 60 110 Z" fill="#2BE87D" />
          <Path d="M 80 134 L 148 100 L 128 144 L 112 132 L 96 150 Z" fill="#2BE87D" />
          <Circle cx="122" cy="74" r="5" fill="url(#skEmerald)" />
        </G>
      </Svg>
    );
  }

  // 12. Nissan
  if (brandKey.includes('nissan')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(15, 20) scale(0.85)">
          <Path d="M 28 80 C 34 46 64 20 100 20 C 136 20 166 46 172 80 L 154 80 C 148 54 126 36 100 36 C 74 36 52 54 46 80 Z" fill="#1E293B" />
          <Path d="M 28 100 C 34 134 64 160 100 160 C 136 160 166 134 172 100 L 154 100 C 148 126 126 144 100 144 C 74 144 52 126 46 100 Z" fill="#1E293B" />
          <Rect x="12" y="80" width="176" height="20" rx="3" fill="#C3002F" />
          <SvgText x="100" y="95" fontWeight="900" fontSize="13" fill="#FFFFFF" textAnchor="middle">NISSAN</SvgText>
        </G>
      </Svg>
    );
  }

  // 13. BMW
  if (brandKey.includes('bmw')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(20, 20) scale(0.8)">
          <Circle cx="100" cy="100" r="94" fill="#0F172A" stroke="#CBD5E1" strokeWidth="4" />
          <Circle cx="100" cy="100" r="62" fill="#FFFFFF" />
          <Path d="M 100 38 A 62 62 0 0 1 162 100 L 100 100 Z" fill="#0066B1" />
          <Path d="M 100 162 A 62 62 0 0 1 38 100 L 100 100 Z" fill="#0066B1" />
          <Line x1="100" y1="38" x2="100" y2="162" stroke="#0F172A" strokeWidth="2" />
          <Line x1="38" y1="100" x2="162" y2="100" stroke="#0F172A" strokeWidth="2" />
          <SvgText x="56" y="32" fontWeight="900" fontSize="16" fill="#FFFFFF">B</SvgText>
          <SvgText x="93" y="24" fontWeight="900" fontSize="16" fill="#FFFFFF">M</SvgText>
          <SvgText x="132" y="32" fontWeight="900" fontSize="16" fill="#FFFFFF">W</SvgText>
        </G>
      </Svg>
    );
  }

  // 14. Mercedes-Benz
  if (brandKey.includes('mercedes') || brandKey.includes('benz')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(20, 20) scale(0.8)">
          <Circle cx="100" cy="100" r="92" fill="none" stroke="#64748B" strokeWidth="8" />
          <Path d="M 100 100 L 100 16 L 95 100 Z" fill="#94A3B8" />
          <Path d="M 100 100 L 100 16 L 105 100 Z" fill="#334155" />
          <Path d="M 100 100 L 174 142 L 104 105 Z" fill="#94A3B8" />
          <Path d="M 100 100 L 174 142 L 98 96 Z" fill="#334155" />
          <Path d="M 100 100 L 26 142 L 96 96 Z" fill="#94A3B8" />
          <Path d="M 100 100 L 26 142 L 102 105 Z" fill="#334155" />
          <Circle cx="100" cy="100" r="8" fill="#475569" />
        </G>
      </Svg>
    );
  }

  // 15. Audi
  if (brandKey.includes('audi')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(10, 60) scale(0.9)">
          <Circle cx="36" cy="45" r="28" fill="none" stroke="#475569" strokeWidth="7" />
          <Circle cx="78" cy="45" r="28" fill="none" stroke="#475569" strokeWidth="7" />
          <Circle cx="120" cy="45" r="28" fill="none" stroke="#475569" strokeWidth="7" />
          <Circle cx="162" cy="45" r="28" fill="none" stroke="#475569" strokeWidth="7" />
        </G>
      </Svg>
    );
  }

  // 16. MG
  if (brandKey.includes('mg') || brandKey.includes('morris')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(20, 20) scale(0.8)">
          <Polygon points="58,16 142,16 184,58 184,142 142,184 58,184 16,142 16,58" fill="#BE123C" stroke="#FFFFFF" strokeWidth="6" />
          <Polygon points="62,24 138,24 176,62 176,138 138,176 62,176 24,138 24,62" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <Path d="M 44 140 L 44 60 L 68 112 L 92 60 L 92 140 L 76 140 L 76 96 L 68 116 L 60 96 L 60 140 Z" fill="#FFFFFF" />
          <Path d="M 156 82 L 140 82 C 136 72 126 66 114 66 C 98 66 88 80 88 100 C 88 120 98 134 114 134 C 126 134 136 128 140 118 L 116 118 L 116 102 L 156 102 L 156 140 L 142 140 C 134 146 124 150 112 150 C 86 150 70 128 70 100 C 70 72 86 50 112 50 C 130 50 146 62 156 82 Z" fill="#FFFFFF" />
        </G>
      </Svg>
    );
  }

  // Fallback initial badge
  const initial = (brandKey || 'A').charAt(0).toUpperCase();
  return (
    <View
      style={{
        width: s,
        height: s,
        borderRadius: s / 2,
        backgroundColor: '#0F172A',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={s} height={s} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="48" fill="#0F172A" />
        <SvgText x="50" y="62" fontWeight="bold" fontSize="36" fill="#FFFFFF" textAnchor="middle">
          {initial}
        </SvgText>
      </Svg>
    </View>
  );
}

/**
 * Modern BrandLogo Component
 */
export function BrandLogo({ 
  name = '', 
  brand = '', 
  size = 32, 
  style, 
  active, 
  variant = 'full',
  theme = 'dark'
}: BrandLogoProps) {
  const safeSize = Number.isFinite(size) && size > 0 ? size : 32;
  const brandKey = String(brand || '').toLowerCase().trim();

  // 1. If Car Brand is specified: render 100% genuine vector emblem
  if (brandKey && brandKey !== 'all' && brandKey !== 'all brands') {
    return (
      <View style={[styles.center, style]}>
        {renderBrandVector(brandKey, safeSize)}
      </View>
    );
  }

  // 2. Square App Icon
  if (variant === 'icon') {
    return <AutoPartsIcon size={safeSize} style={style} />;
  }

  // 3. Full / Horizontal App Logo
  return <AutoPartsLogo height={safeSize} theme={theme as any} style={style} />;
}

export function CarBrandBadge(props: BrandLogoProps) {
  return <BrandLogo {...props} />;
}

export function GearSpeedLogoIcon({ size = 48, style }: { size?: number; style?: StyleProp<ViewStyle> }) {
  return <AutoPartsIcon size={size} style={style} />;
}

export default BrandLogo;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
