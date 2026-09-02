import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';
import { Icon } from 'react-native-paper';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
}

// 3D Category PNG Assets matching the reference design
const CATEGORY_3D_IMAGES: Record<string, any> = {
  engine: require('../assets/categories/engine.png'),
  body: require('../assets/categories/body.png'),
  electrical: require('../assets/categories/electricals.png'),
  electricals: require('../assets/categories/electricals.png'),
  suspension: require('../assets/categories/suspension.png'),
  exhaust: require('../assets/categories/exhaust.png'),
  brakes: require('../assets/categories/brakes.png'),
  filters: require('../assets/categories/filters.png'),
  more: require('../assets/categories/more.png'),
};

const CATEGORY_FALLBACK_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
  engine: { icon: 'engine', color: '#B45309', bg: '#FEF3C7' },
  body: { icon: 'car-door', color: '#0284C7', bg: '#E0F2FE' },
  electrical: { icon: 'lightning-bolt', color: '#CA8A04', bg: '#FEF9C3' },
  electricals: { icon: 'lightning-bolt', color: '#CA8A04', bg: '#FEF9C3' },
  suspension: { icon: 'car-brake-alert', color: '#E11D48', bg: '#FFE4E6' },
  exhaust: { icon: 'pipe', color: '#475569', bg: '#F1F5F9' },
  brakes: { icon: 'disc', color: '#DC2626', bg: '#FEE2E2' },
  filters: { icon: 'air-filter', color: '#D97706', bg: '#FEF3C7' },
  more: { icon: 'apps', color: '#2563EB', bg: '#EFF6FF' },
};

/**
 * Custom realistic graphic for Automotive Brake Disc & Caliper
 */
const BrakesGraphic: React.FC<{ size: number }> = ({ size }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Outer steel rotor disc */}
      <View
        style={{
          width: size * 0.92,
          height: size * 0.92,
          borderRadius: (size * 0.92) / 2,
          backgroundColor: '#E2E8F0',
          borderWidth: 2,
          borderColor: '#94A3B8',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 2,
        }}
      >
        {/* Slotted drilled track */}
        <View
          style={{
            width: size * 0.72,
            height: size * 0.72,
            borderRadius: (size * 0.72) / 2,
            borderWidth: 1.5,
            borderColor: '#CBD5E1',
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Central hub with lug holes */}
          <View
            style={{
              width: size * 0.4,
              height: size * 0.4,
              borderRadius: (size * 0.4) / 2,
              backgroundColor: '#64748B',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: size * 0.16,
                height: size * 0.16,
                borderRadius: (size * 0.16) / 2,
                backgroundColor: '#1E293B',
              }}
            />
          </View>
        </View>

        {/* Brake Caliper Clamp */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: size * 0.38,
            height: size * 0.48,
            backgroundColor: '#DC2626',
            borderTopRightRadius: size * 0.22,
            borderBottomRightRadius: size * 0.16,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderWidth: 1,
            borderColor: '#991B1B',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 3,
              height: size * 0.22,
              backgroundColor: '#FEF2F2',
              borderRadius: 1.5,
            }}
          />
        </View>
      </View>
    </View>
  );
};

/**
 * Custom realistic graphic for Automotive Air/Oil Filter
 */
const FiltersGraphic: React.FC<{ size: number }> = ({ size }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={{
          width: size * 0.78,
          height: size * 0.9,
          borderRadius: 6,
          backgroundColor: '#F59E0B',
          borderWidth: 1.5,
          borderColor: '#1E293B',
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          justifyContent: 'space-between',
        }}
      >
        {/* Top Rubber Cap */}
        <View
          style={{
            height: size * 0.16,
            backgroundColor: '#0F172A',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: size * 0.32,
              height: 3,
              borderRadius: 1.5,
              backgroundColor: '#475569',
            }}
          />
        </View>

        {/* Pleated Filter Paper Ribs */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'stretch',
            backgroundColor: '#D97706',
            paddingVertical: 1,
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <View
              key={`filter-rib-${i}`}
              style={{
                width: 2,
                backgroundColor: '#FDE68A',
                opacity: 0.85,
              }}
            />
          ))}
        </View>

        {/* Bottom Metal/Rubber Rim */}
        <View
          style={{
            height: size * 0.16,
            backgroundColor: '#0F172A',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: size * 0.4,
              height: 3,
              borderRadius: 1.5,
              backgroundColor: '#475569',
            }}
          />
        </View>
      </View>
    </View>
  );
};

/**
 * 3D Isometric Automotive Category Icon Renderer
 * Renders high-definition, realistic 3D assets for all 6 home categories.
 */
export const Category3DIcon: React.FC<CategoryIconProps> = ({
  type = 'more',
  size = 46,
  active = false,
  style,
}) => {
  const normType = String(type || '').toLowerCase().trim();

  // Find corresponding 3D image asset
  let imageSource = CATEGORY_3D_IMAGES[normType];
  if (!imageSource) {
    if (normType.includes('engine') || normType.includes('motor')) imageSource = CATEGORY_3D_IMAGES.engine;
    else if (normType.includes('body') || normType.includes('door') || normType.includes('bumper')) imageSource = CATEGORY_3D_IMAGES.body;
    else if (normType.includes('elect') || normType.includes('light') || normType.includes('battery')) imageSource = CATEGORY_3D_IMAGES.electrical;
    else if (normType.includes('susp') || normType.includes('shock') || normType.includes('strut')) imageSource = CATEGORY_3D_IMAGES.suspension;
    else if (normType.includes('exh') || normType.includes('muffler') || normType.includes('pipe')) imageSource = CATEGORY_3D_IMAGES.exhaust;
    else if (normType.includes('brake') || normType.includes('rotor') || normType.includes('pad')) imageSource = CATEGORY_3D_IMAGES.brakes;
    else if (normType.includes('filter')) imageSource = CATEGORY_3D_IMAGES.filters;
    else imageSource = CATEGORY_3D_IMAGES.more;
  }

  if (imageSource) {
    return (
      <View style={[styles.container, { width: size, height: size }, style]}>
        <Image
          source={imageSource}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Fallback vector icon
  const fallback = CATEGORY_FALLBACK_ICONS[normType] || CATEGORY_FALLBACK_ICONS.more;
  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor: fallback.bg, borderRadius: size * 0.35 }, style]}>
      <Icon source={fallback.icon} size={size * 0.55} color={fallback.color} />
    </View>
  );
};

export default Category3DIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
