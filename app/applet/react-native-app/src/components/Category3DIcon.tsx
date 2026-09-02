import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  active?: boolean;
}

// Local 3D SVG Assets from src/assets/categories
import engineAsset from '../assets/categories/engine.svg';
import bodyAsset from '../assets/categories/body.svg';
import electricalAsset from '../assets/categories/electrical.svg';
import suspensionAsset from '../assets/categories/suspension.svg';
import exhaustAsset from '../assets/categories/exhaust.svg';
import moreAsset from '../assets/categories/more.svg';

const LOCAL_CATEGORY_ASSETS: Record<string, string> = {
  engine: engineAsset,
  body: bodyAsset,
  electrical: electricalAsset,
  suspension: suspensionAsset,
  exhaust: exhaustAsset,
  more: moreAsset,
};

export const Category3DIcon: React.FC<CategoryIconProps> = ({ type, size = 60, active = false }) => {
  const t = (type || 'more').toLowerCase().trim();
  
  let assetUrl = LOCAL_CATEGORY_ASSETS.more;
  if (t.includes('engine') || t.includes('motor')) assetUrl = LOCAL_CATEGORY_ASSETS.engine;
  else if (t.includes('body') || t.includes('door') || t.includes('bumper')) assetUrl = LOCAL_CATEGORY_ASSETS.body;
  else if (t.includes('elect') || t.includes('battery')) assetUrl = LOCAL_CATEGORY_ASSETS.electrical;
  else if (t.includes('suspension') || t.includes('shock') || t.includes('brake')) assetUrl = LOCAL_CATEGORY_ASSETS.suspension;
  else if (t.includes('exhaust') || t.includes('pipe')) assetUrl = LOCAL_CATEGORY_ASSETS.exhaust;

  return (
    <View 
      style={[
        styles.iconBadge, 
        { width: size, height: size, borderRadius: size / 2 },
        active && styles.iconBadgeActive
      ]}
    >
      <Image 
        source={{ uri: assetUrl }} 
        style={{ width: size - 12, height: size - 12 }}
        resizeMode="contain"
      />
      {active && <View style={[styles.activeOverlay, { borderRadius: size / 2 }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  iconBadge: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // Premium soft drop shadow for the 3D asset container
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 6, 
    borderWidth: 2,
    borderColor: '#F1F5F9',
  },
  iconBadgeActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 8,
  },
  activeOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#2563EB',
    opacity: 0.08,
  }
});

export default Category3DIcon;
