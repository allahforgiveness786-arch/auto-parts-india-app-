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
  maruti: '/assets/brands/maruti_suzuki.svg',
  suzuki: '/assets/brands/maruti_suzuki.svg',
  'maruti suzuki': '/assets/brands/maruti_suzuki.svg',
  hyundai: '/assets/brands/hyundai.svg',
  tata: '/assets/brands/tata.svg',
  mahindra: '/assets/brands/mahindra.svg',
  toyota: '/assets/brands/toyota.svg',
  honda: '/assets/brands/honda.svg',
  kia: '/assets/brands/kia.svg',
  volkswagen: '/assets/brands/volkswagen.svg',
  vw: '/assets/brands/volkswagen.svg',
  ford: '/assets/brands/ford.svg',
  renault: '/assets/brands/renault.svg',
  skoda: '/assets/brands/skoda.svg',
  nissan: '/assets/brands/nissan.svg',
  bmw: '/assets/brands/bmw.svg',
  mercedes: '/assets/brands/mercedes.svg',
  'mercedes-benz': '/assets/brands/mercedes.svg',
  benz: '/assets/brands/mercedes.svg',
  audi: '/assets/brands/audi.svg',
  mg: '/assets/brands/mg.svg',
  'morris garages': '/assets/brands/mg.svg',
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

  // If a car brand is specified (e.g. Maruti Suzuki, Tata, Hyundai, Mahindra, Toyota, Honda, Kia, VW, Ford, etc.)
  if (brandKey && brandKey !== 'all' && brandKey !== 'all brands') {
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
        className={`flex items-center justify-center bg-slate-900 border border-slate-700 rounded-lg text-white font-bold text-xs shadow-xs shrink-0 ${className}`}
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
