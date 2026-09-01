import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export interface CategoryIconProps {
  type: string;
  size?: number;
  active?: boolean;
}

// Curated high-definition 3D automotive graphic assets with transparent background
const CATEGORY_ASSET_MAP: Record<string, string> = {
  engine: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', // 3D Turbocharged Engine Block
  body: 'https://cdn-icons-png.flaticon.com/512/3202/3202923.png', // 3D Car Door & Body Shell
  electrical: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png', // 3D Golden Energy Bolt
  suspension: 'https://cdn-icons-png.flaticon.com/512/2061/2061986.png', // 3D Blue Coilover Strut
  exhaust: 'https://cdn-icons-png.flaticon.com/512/3202/3202930.png', // 3D Stainless Exhaust Muffler
  brakes: 'https://cdn-icons-png.flaticon.com/512/3202/3202924.png', // 3D Brake Disc Rotor
  transmission: 'https://cdn-icons-png.flaticon.com/512/3202/3202927.png', // 3D Gearbox Transmission
  wheels: 'https://cdn-icons-png.flaticon.com/512/3202/3202925.png', // 3D Alloy Wheel & Tyre
  lighting: 'https://cdn-icons-png.flaticon.com/512/3202/3202928.png', // 3D LED Headlight
  interior: 'https://cdn-icons-png.flaticon.com/512/3202/3202929.png', // 3D Steering Wheel
  more: 'https://cdn-icons-png.flaticon.com/512/3202/3202924.png', // 3D Parts Matrix
};

// 1. Engine & Parts - 3D Turbocharged Engine
export const EnginePartsSvg: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <Category3DIcon type="engine" size={size} />
);

// 2. Body Parts - 3D Car Door Panel
export const BodyPartsSvg: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <Category3DIcon type="body" size={size} />
);

// 3. Electricals - 3D Golden Lightning Bolt
export const ElectricalsSvg: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <Category3DIcon type="electrical" size={size} />
);

// 4. Suspension - 3D Coilover Shock Strut with Rotor
export const SuspensionSvg: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <Category3DIcon type="suspension" size={size} />
);

// 5. Exhaust - 3D Performance Exhaust Muffler
export const ExhaustSvg: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <Category3DIcon type="exhaust" size={size} />
);

// 6. More 2x2 Grid Component
export const MoreGridSvg: React.FC<{ size?: number }> = ({ size = 48 }) => {
  const box = Math.max(14, Math.floor(size * 0.35));
  const radius = Math.max(4, Math.floor(box * 0.28));
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={styles.moreGridContainer}>
        <View style={styles.moreRow}>
          <View style={[styles.moreBox, { width: box, height: box, borderRadius: radius, backgroundColor: '#1565FF' }]} />
          <View style={[styles.moreBox, { width: box, height: box, borderRadius: radius, backgroundColor: '#1565FF' }]} />
        </View>
        <View style={styles.moreRow}>
          <View style={[styles.moreBox, { width: box, height: box, borderRadius: radius, backgroundColor: '#1565FF' }]} />
          <View style={[styles.moreBox, { width: box, height: box, borderRadius: radius, backgroundColor: '#1565FF' }]} />
        </View>
      </View>
    </View>
  );
};

export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 48 }) => {
  const t = (type || 'more').toLowerCase().trim();
  const [imageFailed, setImageFailed] = useState(false);

  // Match category key
  let assetKey = 'more';
  if (t.includes('engine') || t.includes('motor') || t.includes('piston') || t.includes('turbo')) assetKey = 'engine';
  else if (t.includes('body') || t.includes('door') || t.includes('bumper') || t.includes('fender')) assetKey = 'body';
  else if (t.includes('elect') || t.includes('battery') || t.includes('light') || t.includes('spark')) assetKey = 'electrical';
  else if (t.includes('suspension') || t.includes('shock') || t.includes('strut') || t.includes('spring')) assetKey = 'suspension';
  else if (t.includes('exhaust') || t.includes('muffler') || t.includes('silencer') || t.includes('pipe')) assetKey = 'exhaust';
  else if (t.includes('brake') || t.includes('rotor') || t.includes('pad') || t.includes('caliper')) assetKey = 'brakes';
  else if (t.includes('trans') || t.includes('gear') || t.includes('clutch')) assetKey = 'transmission';
  else if (t.includes('wheel') || t.includes('tyre') || t.includes('tire') || t.includes('rim')) assetKey = 'wheels';
  else if (t.includes('interior') || t.includes('seat') || t.includes('steering')) assetKey = 'interior';

  if (t === 'more' || assetKey === 'more') {
    return <MoreGridSvg size={size} />;
  }

  const imageUrl = CATEGORY_ASSET_MAP[assetKey] || CATEGORY_ASSET_MAP.engine;

  if (imageFailed) {
    if (assetKey === 'engine') return <View style={[styles.fallbackCircle, { width: size, height: size }]}><Text style={styles.fallbackIcon}>⚙️</Text></View>;
    if (assetKey === 'body') return <View style={[styles.fallbackCircle, { width: size, height: size }]}><Text style={styles.fallbackIcon}>🚗</Text></View>;
    if (assetKey === 'electrical') return <View style={[styles.fallbackCircle, { width: size, height: size }]}><Text style={styles.fallbackIcon}>⚡</Text></View>;
    if (assetKey === 'suspension') return <View style={[styles.fallbackCircle, { width: size, height: size }]}><Text style={styles.fallbackIcon}>🔩</Text></View>;
    if (assetKey === 'exhaust') return <View style={[styles.fallbackCircle, { width: size, height: size }]}><Text style={styles.fallbackIcon}>💨</Text></View>;
    return <MoreGridSvg size={size} />;
  }

  const iconDim = Math.floor(size * 0.94);

  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: iconDim, height: iconDim }}
        resizeMode="contain"
        onError={() => setImageFailed(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreGridContainer: {
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreRow: {
    flexDirection: 'row',
    gap: 4,
  },
  moreBox: {
    shadowColor: '#1565FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 2,
  },
  fallbackCircle: {
    backgroundColor: '#EFF6FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackIcon: {
    fontSize: 22,
  },
});

export default Category3DIcon;
