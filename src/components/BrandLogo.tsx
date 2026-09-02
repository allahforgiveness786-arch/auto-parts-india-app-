import React from 'react';

export interface BrandLogoProps {
  name?: string;
  brand?: string;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string;
  className?: string;
  active?: boolean;
  variant?: string;
  theme?: string;
  showTagline?: boolean;
}

const BRAND_IMAGE_PATHS: Record<string, string> = {
  maruti: '/assets/brands/maruti_suzuki.png',
  suzuki: '/assets/brands/maruti_suzuki.png',
  'maruti suzuki': '/assets/brands/maruti_suzuki.png',
  hyundai: '/assets/brands/hyundai.png',
  tata: '/assets/brands/tata.png',
  mahindra: '/assets/brands/mahindra.png',
  toyota: '/assets/brands/toyota.png',
};

const SIZE_MAP: Record<string, number> = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  '2xl': 80,
};

export function BrandLogo({ 
  name = '', 
  brand = '', 
  size = 32, 
  className = '', 
  active,
  variant,
  theme,
  showTagline 
}: BrandLogoProps) {
  const numericSize = typeof size === 'number' 
    ? size 
    : (SIZE_MAP[size] || 32);
  const safeSize = Number.isFinite(numericSize) && numericSize > 0 ? numericSize : 32;
  const brandKey = String(brand || name || '').toLowerCase().trim();

  let matchedSrc = BRAND_IMAGE_PATHS[brandKey];
  if (!matchedSrc) {
    for (const key of Object.keys(BRAND_IMAGE_PATHS)) {
      if (brandKey.includes(key) || key.includes(brandKey)) {
        matchedSrc = BRAND_IMAGE_PATHS[key];
        break;
      }
    }
  }

  if (matchedSrc) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img
          src={matchedSrc}
          alt={brand || name}
          style={{ width: safeSize * 1.25, height: safeSize * 1.25, objectFit: 'contain' }}
          className="transition-transform duration-200"
        />
      </div>
    );
  }

  const initial = (brand || name || 'A').charAt(0).toUpperCase();
  return (
    <div 
      className={`flex items-center justify-center bg-slate-800 border border-slate-700 rounded-md text-white font-bold text-xs shadow-xs ${className}`}
      style={{ width: safeSize, height: safeSize }}
    >
      {initial}
    </div>
  );
}

export function CarBrandBadge(props: BrandLogoProps) {
  return <BrandLogo {...props} />;
}

export function GearSpeedLogoIcon({ size = 32 }: { size?: number }) {
  return <BrandLogo name="suzuki" size={size} />;
}

export default BrandLogo;
