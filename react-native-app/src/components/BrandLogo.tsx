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
const APP_LOGO_ICON = require('../assets/logo.png');

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

  // 1. Maruti Suzuki (Official Suzuki Emblem Badge)
  if (brandKey.includes('maruti') || brandKey.includes('suzuki')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="szRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FF3B30" />
            <Stop offset="50%" stopColor="#D32F2F" />
            <Stop offset="100%" stopColor="#990000" />
          </LinearGradient>
          <LinearGradient id="szBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#2196F3" />
            <Stop offset="50%" stopColor="#1565C0" />
            <Stop offset="100%" stopColor="#0D47A1" />
          </LinearGradient>
          <LinearGradient id="szChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="50%" stopColor="#E0E0E0" />
            <Stop offset="100%" stopColor="#9E9E9E" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 10) scale(0.9)">
          <Circle cx="100" cy="100" r="94" fill="#0A0F1D" stroke="url(#szChrome)" strokeWidth="5" />
          {/* Top Red Wing */}
          <Path d="M 82 22 L 162 22 L 118 72 L 160 72 L 112 130 L 74 130 L 114 84 L 38 84 Z" fill="url(#szRedGrad)" stroke="#FFFFFF" strokeWidth="1" />
          {/* Bottom Blue Wing */}
          <Path d="M 118 178 L 38 178 L 82 128 L 40 128 L 88 70 L 126 70 L 86 116 L 162 116 Z" fill="url(#szBlueGrad)" stroke="#FFFFFF" strokeWidth="1" />
        </G>
      </Svg>
    );
  }

  // 2. Hyundai (Official Slanted Oval & Italic H)
  if (brandKey.includes('hyundai')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="hyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0052CC" />
            <Stop offset="100%" stopColor="#002266" />
          </LinearGradient>
          <LinearGradient id="hyChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="50%" stopColor="#CBD5E1" />
            <Stop offset="100%" stopColor="#64748B" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 15) scale(0.9)">
          <Circle cx="100" cy="95" r="94" fill="#070D1A" stroke="url(#hyChrome)" strokeWidth="5" />
          <Ellipse cx="100" cy="95" rx="82" ry="50" transform="rotate(-15, 100, 95)" fill="none" stroke="url(#hyBlue)" strokeWidth="14" />
          <Path d="M 58 132 C 54 108, 61 76, 76 56 C 80 50, 86 54, 84 62 C 72 82, 68 110, 72 130 C 73 134, 59 134, 58 132 Z" fill="#FFFFFF" />
          <Path d="M 124 136 C 130 112, 136 80, 122 60 C 118 54, 126 50, 130 54 C 144 76, 138 114, 132 138 C 130 142, 122 142, 124 136 Z" fill="#FFFFFF" />
          <Path d="M 70 98 C 90 90, 112 88, 128 94 C 130 100, 122 104, 108 104 C 90 104, 78 106, 70 106 Z" fill="#FFFFFF" />
        </G>
      </Svg>
    );
  }

  // 3. Tata Motors (Official Twin-Wing Crest)
  if (brandKey.includes('tata')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="tataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0066FF" />
            <Stop offset="100%" stopColor="#003399" />
          </LinearGradient>
          <LinearGradient id="tataChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#94A3B8" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 15) scale(0.9)">
          <Circle cx="100" cy="95" r="94" fill="#0A0F1D" stroke="url(#tataChrome)" strokeWidth="5" />
          <Ellipse cx="100" cy="95" rx="84" ry="54" fill="none" stroke="url(#tataGrad)" strokeWidth="12" />
          <Path d="M 98 138 C 96 112, 88 88, 54 70 C 48 66, 46 60, 54 58 C 68 58, 86 70, 94 90 C 96 96, 98 114, 98 138 Z" fill="#FFFFFF" />
          <Path d="M 102 138 C 104 112, 112 88, 146 70 C 152 66, 154 60, 146 58 C 132 58, 114 70, 106 90 C 104 96, 102 114, 102 138 Z" fill="#FFFFFF" />
          <Rect x="96" y="48" width="8" height="40" rx="4" fill="#FFFFFF" />
        </G>
      </Svg>
    );
  }

  // 4. Mahindra (Official Twin Peaks Emblem)
  if (brandKey.includes('mahindra')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="mahRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#EF4444" />
            <Stop offset="100%" stopColor="#991B1B" />
          </LinearGradient>
          <LinearGradient id="mahChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#64748B" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 15) scale(0.9)">
          <Circle cx="100" cy="95" r="94" fill="#0A0F1D" stroke="url(#mahChrome)" strokeWidth="5" />
          <Path d="M 96 116 L 36 148 C 34 138, 40 100, 62 46 C 66 36, 74 36, 78 46 L 96 100 Z" fill="url(#mahRed)" />
          <Path d="M 78 46 L 96 100 L 96 68 L 78 46 Z" fill="url(#mahChrome)" />
          <Path d="M 104 116 L 164 148 C 166 138, 160 100, 138 46 C 134 36, 126 36, 122 46 L 104 100 Z" fill="url(#mahRed)" />
          <Path d="M 122 46 L 104 100 L 104 68 L 122 46 Z" fill="url(#mahChrome)" />
          <Path d="M 96 120 L 100 134 L 104 120 L 100 104 Z" fill="#FFFFFF" />
        </G>
      </Svg>
    );
  }

  // 5. Toyota (Official Triple-Oval Emblem)
  if (brandKey.includes('toyota')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="toyotaRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FF3333" />
            <Stop offset="100%" stopColor="#CC0000" />
          </LinearGradient>
          <LinearGradient id="toyotaChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#94A3B8" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 15) scale(0.9)">
          <Circle cx="100" cy="95" r="94" fill="#0A0F1D" stroke="url(#toyotaChrome)" strokeWidth="5" />
          <Ellipse cx="100" cy="95" rx="84" ry="58" fill="none" stroke="url(#toyotaRed)" strokeWidth="11" />
          <Ellipse cx="100" cy="95" rx="26" ry="44" fill="none" stroke="url(#toyotaRed)" strokeWidth="8" />
          <Ellipse cx="100" cy="74" rx="56" ry="20" fill="none" stroke="url(#toyotaRed)" strokeWidth="8" />
        </G>
      </Svg>
    );
  }

  // 6. Honda (Official Red Emblem)
  if (brandKey.includes('honda')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="hondaRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FF1111" />
            <Stop offset="100%" stopColor="#880000" />
          </LinearGradient>
          <LinearGradient id="hondaChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#94A3B8" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 10) scale(0.9)">
          <Circle cx="100" cy="100" r="94" fill="#0A0F1D" stroke="url(#hondaChrome)" strokeWidth="5" />
          <Path d="M 38 26 L 162 26 C 174 26 182 36 178 50 L 158 160 C 154 172 144 178 134 178 L 66 178 C 56 178 46 172 42 160 L 22 50 C 18 38 26 26 38 26 Z" fill="none" stroke="url(#hondaRed)" strokeWidth="10" />
          <Path d="M 52 42 L 68 42 L 76 102 L 124 102 L 132 42 L 148 42 L 136 158 L 120 158 L 124 118 L 76 118 L 80 158 L 64 158 Z" fill="#FFFFFF" />
        </G>
      </Svg>
    );
  }

  // 7. Kia (Official Modern Connected Typography Emblem)
  if (brandKey.includes('kia')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="kiaDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0F172A" />
            <Stop offset="100%" stopColor="#020617" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 30) scale(0.9)">
          <Path 
            d="M 18 136 L 18 64 L 40 64 L 72 112 L 72 64 L 92 64 L 92 136 L 72 136 L 40 88 L 40 136 Z" 
            fill="url(#kiaDarkGrad)" 
          />
          <Path 
            d="M 92 64 L 114 64 L 136 136 L 116 136 L 110 116 L 92 116 Z" 
            fill="url(#kiaDarkGrad)" 
          />
          <Path 
            d="M 114 64 L 138 64 L 182 136 L 160 136 L 150 114 L 128 114 Z" 
            fill="url(#kiaDarkGrad)" 
          />
        </G>
      </Svg>
    );
  }

  // 8. Volkswagen (Official Circle & Stacked V/W Emblem)
  if (brandKey.includes('volkswagen') || brandKey.includes('vw')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="vwBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#002D72" />
            <Stop offset="50%" stopColor="#001E50" />
            <Stop offset="100%" stopColor="#000E26" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 10) scale(0.9)">
          <Circle cx="100" cy="100" r="88" fill="none" stroke="url(#vwBlueGrad)" strokeWidth="10" />
          {/* V */}
          <Path d="M 52 46 L 94 124 L 106 124 L 148 46 L 134 46 L 100 110 L 66 46 Z" fill="url(#vwBlueGrad)" />
          {/* W */}
          <Path d="M 38 84 L 72 154 L 84 154 L 100 122 L 116 154 L 128 154 L 162 84 L 148 84 L 122 138 L 106 106 L 94 106 L 78 138 L 52 84 Z" fill="url(#vwBlueGrad)" />
        </G>
      </Svg>
    );
  }

  // 9. Renault (Official Double-Line Geometric Diamond)
  if (brandKey.includes('renault')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="renaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#1E293B" />
            <Stop offset="100%" stopColor="#020617" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 10) scale(0.9)">
          <Path d="M 100 18 L 172 100 L 100 182 L 28 100 Z" fill="none" stroke="url(#renaultGrad)" strokeWidth="12" />
          <Path d="M 100 52 L 142 100 L 100 148 L 58 100 Z" fill="none" stroke="#EAB308" strokeWidth="8" />
        </G>
      </Svg>
    );
  }

  // 10. Skoda (Official Emerald Winged Arrow Emblem)
  if (brandKey.includes('skoda')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="skEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0E3A2F" />
            <Stop offset="100%" stopColor="#06221B" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 10) scale(0.9)">
          <Circle cx="100" cy="100" r="88" fill="url(#skEmeraldGrad)" stroke="#2BE87D" strokeWidth="4" />
          <Circle cx="100" cy="100" r="76" fill="none" stroke="#2BE87D" strokeWidth="2" opacity={0.6} />
          {/* Winged Arrow */}
          <Path d="M 64 68 C 82 56, 112 56, 142 66 L 126 84 C 106 78, 86 78, 72 84 Z" fill="#2BE87D" />
          <Path d="M 52 92 C 72 84, 104 84, 136 94 L 122 110 C 98 104, 76 104, 60 110 Z" fill="#2BE87D" />
          <Path d="M 80 134 L 148 100 L 128 144 L 112 132 L 96 150 Z" fill="#2BE87D" />
          <Circle cx="122" cy="74" r="5" fill="#0E3A2F" />
        </G>
      </Svg>
    );
  }

  // 11. Nissan (Official Modern Ring with Center Wordmark)
  if (brandKey.includes('nissan')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(10, 15) scale(0.9)">
          <Path d="M 28 80 C 34 46, 64 20, 100 20 C 136 20, 166 46, 172 80 L 154 80 C 148 54, 126 36, 100 36 C 74 36, 52 54, 46 80 Z" fill="#1E293B" />
          <Path d="M 28 100 C 34 134, 64 160, 100 160 C 136 160, 166 134, 172 100 L 154 100 C 148 126, 126 144, 100 144 C 74 144, 52 126, 46 100 Z" fill="#1E293B" />
          <Rect x="14" y="80" width="172" height="22" rx="3" fill="#C3002F" />
          <SvgText x="100" y="96" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="#FFFFFF" textAnchor="middle" letterSpacing="1.5">NISSAN</SvgText>
        </G>
      </Svg>
    );
  }

  // 12. MG (Official Morris Garages Octagon & Monogram)
  if (brandKey.includes('mg') || brandKey.includes('morris')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(10, 10) scale(0.9)">
          <Polygon points="56,18 144,18 182,56 182,144 144,182 56,182 18,144 18,56" fill="#BE123C" stroke="#991B1B" strokeWidth="4" />
          <Polygon points="60,26 140,26 174,60 174,140 140,174 60,174 26,140 26,60" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <Path d="M 44 140 L 44 60 L 68 112 L 92 60 L 92 140 L 76 140 L 76 96 L 68 116 L 60 96 L 60 140 Z" fill="#FFFFFF" />
          <Path d="M 156 82 L 140 82 C 136 72, 126 66, 114 66 C 98 66, 88 80, 88 100 C 88 120, 98 134, 114 134 C 126 134, 136 128, 140 118 L 116 118 L 116 102 L 156 102 L 156 140 L 142 140 C 134 146, 124 150, 112 150 C 86 150, 70 128, 70 100 C 70 72, 86 50, 112 50 C 130 50, 146 62, 156 82 Z" fill="#FFFFFF" />
        </G>
      </Svg>
    );
  }

  // 13. BMW (Official Roundel)
  if (brandKey.includes('bmw')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(10, 10) scale(0.9)">
          <Circle cx="100" cy="100" r="90" fill="#0F172A" stroke="#CBD5E1" strokeWidth="3" />
          <Circle cx="100" cy="100" r="58" fill="#FFFFFF" />
          <Path d="M 100 42 A 58 58 0 0 1 158 100 L 100 100 Z" fill="#0066B1" />
          <Path d="M 100 158 A 58 58 0 0 1 42 100 L 100 100 Z" fill="#0066B1" />
          <Line x1="100" y1="42" x2="100" y2="158" stroke="#0F172A" strokeWidth="2.5" />
          <Line x1="42" y1="100" x2="158" y2="100" stroke="#0F172A" strokeWidth="2.5" />
          <SvgText x="58" y="34" fontWeight="900" fontSize="16" fill="#FFFFFF">B</SvgText>
          <SvgText x="93" y="26" fontWeight="900" fontSize="16" fill="#FFFFFF">M</SvgText>
          <SvgText x="130" y="34" fontWeight="900" fontSize="16" fill="#FFFFFF">W</SvgText>
        </G>
      </Svg>
    );
  }

  // 14. Mercedes-Benz (Official Three-Pointed 3D Chrome Star)
  if (brandKey.includes('mercedes') || brandKey.includes('benz')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(10, 10) scale(0.9)">
          <Circle cx="100" cy="100" r="88" fill="none" stroke="#64748B" strokeWidth="8" />
          <Path d="M 100 100 L 100 18 L 94 100 Z" fill="#94A3B8" />
          <Path d="M 100 100 L 100 18 L 106 100 Z" fill="#334155" />
          <Path d="M 100 100 L 171 141 L 104 106 Z" fill="#94A3B8" />
          <Path d="M 100 100 L 171 141 L 97 97 Z" fill="#334155" />
          <Path d="M 100 100 L 29 141 L 97 97 Z" fill="#94A3B8" />
          <Path d="M 100 100 L 29 141 L 104 106 Z" fill="#334155" />
          <Circle cx="100" cy="100" r="8" fill="#475569" />
        </G>
      </Svg>
    );
  }

  // 15. Audi (Official Four Interlocking Rings)
  if (brandKey.includes('audi')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(5, 50) scale(0.95)">
          <Circle cx="36" cy="50" r="26" fill="none" stroke="#475569" strokeWidth="6" />
          <Circle cx="78" cy="50" r="26" fill="none" stroke="#475569" strokeWidth="6" />
          <Circle cx="122" cy="50" r="26" fill="none" stroke="#475569" strokeWidth="6" />
          <Circle cx="164" cy="50" r="26" fill="none" stroke="#475569" strokeWidth="6" />
        </G>
      </Svg>
    );
  }

  // 16. Ford (Official Blue Oval with Script Emblem)
  if (brandKey.includes('ford')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="fordBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#003478" />
            <Stop offset="50%" stopColor="#092B60" />
            <Stop offset="100%" stopColor="#001438" />
          </LinearGradient>
        </Defs>
        <G transform="translate(10, 35) scale(0.9)">
          <Ellipse cx="100" cy="65" rx="90" ry="54" fill="url(#fordBlueGrad)" stroke="#FFFFFF" strokeWidth="4" />
          <Ellipse cx="100" cy="65" rx="84" ry="48" fill="none" stroke="#60A5FA" strokeWidth="2" />
          <SvgText 
            x="100" 
            y="76" 
            fontFamily="serif" 
            fontStyle="italic" 
            fontWeight="bold" 
            fontSize="34" 
            fill="#FFFFFF" 
            textAnchor="middle"
          >
            Ford
          </SvgText>
        </G>
      </Svg>
    );
  }

  // 17. Jeep (Official Bold Blockmark)
  if (brandKey.includes('jeep')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 200 200">
        <G transform="translate(10, 50) scale(0.9)">
          <SvgText 
            x="100" 
            y="70" 
            fontFamily="sans-serif" 
            fontWeight="900" 
            fontSize="48" 
            fill="#1E293B" 
            textAnchor="middle" 
            letterSpacing="2"
          >
            Jeep
          </SvgText>
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

function getLocalBrandLogo(brandKey: string) {
  let slug = brandKey;
  if (slug.includes('maruti') || slug.includes('suzuki')) return require('../assets/brands/suzuki.png');
  if (slug.includes('hyundai')) return require('../assets/brands/hyundai.png');
  if (slug.includes('tata')) return require('../assets/brands/tata.png');
  if (slug.includes('mahindra')) return require('../assets/brands/mahindra.png');
  if (slug.includes('toyota')) return require('../assets/brands/toyota.png');
  if (slug.includes('honda')) return require('../assets/brands/honda.png');
  if (slug.includes('kia')) return require('../assets/brands/kia.png');
  if (slug.includes('volkswagen') || slug.includes('vw')) return require('../assets/brands/volkswagen.png');
  if (slug.includes('ford')) return require('../assets/brands/ford.png');
  if (slug.includes('bmw')) return require('../assets/brands/bmw.png');
  if (slug.includes('audi')) return require('../assets/brands/audi.png');
  if (slug.includes('mercedes') || slug.includes('benz')) return require('../assets/brands/mercedes.png');
  if (slug.includes('skoda')) return require('../assets/brands/skoda.png');
  if (slug.includes('renault')) return require('../assets/brands/renault.png');
  if (slug.includes('nissan')) return require('../assets/brands/nissan.png');
  if (slug.includes('mg')) return require('../assets/brands/mg.png');
  if (slug.includes('jeep')) return require('../assets/brands/jeep.png');
  return null;
}

function OfficialBrandLogo({ brandKey, size, style }: { brandKey: string; size: number; style?: StyleProp<ViewStyle> }) {
  const [imageError, setImageError] = React.useState(false);
  const localAsset = getLocalBrandLogo(brandKey);

  if (!imageError && localAsset) {
    return (
      <View style={[styles.center, { width: size, height: size }, style]}>
        <Image 
          source={localAsset} 
          style={{ width: size * 0.9, height: size * 0.9, resizeMode: 'contain' }}
          onError={() => setImageError(true)}
        />
      </View>
    );
  }

  return (
    <View style={[styles.center, style]}>
      {renderBrandVector(brandKey, size)}
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
  const brandKey = String(brand || name || '').toLowerCase().trim();

  // 1. If Car Brand is specified: render official brand logo image with vector fallback
  if (brandKey && brandKey !== 'all' && brandKey !== 'all brands') {
    return <OfficialBrandLogo brandKey={brandKey} size={safeSize} style={style} />;
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
