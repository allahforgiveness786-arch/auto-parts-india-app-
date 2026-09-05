import React from 'react';

export interface BrandLogoProps {
  name?: string;
  brand?: string;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string;
  className?: string;
  active?: boolean;
  variant?: 'icon' | 'full' | 'horizontal' | string;
  theme?: 'dark' | 'light' | string;
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
  xs: 20,
  sm: 32,
  md: 44,
  lg: 64,
  xl: 96,
  '2xl': 128,
};

export function BrandLogo({ 
  name = '', 
  brand = '', 
  size = 32, 
  className = '', 
  active,
  variant = 'full',
  theme = 'dark',
  showTagline = true 
}: BrandLogoProps) {
  const numericSize = typeof size === 'number' 
    ? size 
    : (SIZE_MAP[size] || 32);
  const safeSize = Number.isFinite(numericSize) && numericSize > 0 ? numericSize : 32;
  const brandKey = String(brand || '').toLowerCase().trim();

  // If a car brand is specified (e.g. Maruti, Tata, Hyundai, Mahindra, Toyota)
  if (brandKey) {
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
        <div className={`flex items-center justify-center shrink-0 ${className}`}>
          <img
            src={matchedSrc}
            alt={brand || name}
            style={{ width: safeSize, height: safeSize, objectFit: 'contain' }}
            className="transition-transform duration-200"
            loading="lazy"
          />
        </div>
      );
    }

    const initial = (brand || name || 'A').charAt(0).toUpperCase();
    return (
      <div 
        className={`flex items-center justify-center bg-slate-800 border border-slate-700 rounded-lg text-white font-bold text-xs shadow-xs shrink-0 ${className}`}
        style={{ width: safeSize, height: safeSize }}
      >
        {initial}
      </div>
    );
  }

  // APP BRANDING LOGO: Use Official Auto Parts India Logo
  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center shrink-0 ${className}`}>
        <img
          src="/assets/logo_icon.svg"
          alt="Auto Parts India"
          style={{ width: safeSize, height: safeSize, objectFit: 'contain' }}
          className="drop-shadow-sm select-none"
        />
      </div>
    );
  }

  // Full / Horizontal / Default App Logo
  const isCompact = safeSize <= 40;
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <img
        src="/assets/logo.svg"
        alt="Auto Parts India"
        style={{ 
          height: safeSize, 
          width: 'auto', 
          maxHeight: safeSize,
          objectFit: 'contain' 
        }}
        className="drop-shadow-md transition-transform duration-200 hover:scale-[1.02]"
      />
    </div>
  );
}

export function CarBrandBadge(props: BrandLogoProps) {
  return <BrandLogo {...props} />;
}

export function GearSpeedLogoIcon({ size = 48 }: { size?: number }) {
  return (
    <img
      src="/assets/logo_icon.svg"
      alt="Auto Parts Logo"
      style={{ width: size, height: size, objectFit: 'contain' }}
      className="drop-shadow-lg select-none"
    />
  );
}

export default BrandLogo;

