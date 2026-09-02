import React from 'react';

export interface BrandLogoProps {
  name?: string;
  size?: number;
  className?: string;
  active?: boolean;
}

const BRAND_LOGO_URLS: Record<string, string> = {
  'maruti suzuki': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2016.svg/320px-Suzuki_logo_2016.svg.png',
  'maruti': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2016.svg/320px-Suzuki_logo_2016.svg.png',
  'suzuki': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2016.svg/320px-Suzuki_logo_2016.svg.png',
  'hyundai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/320px-Hyundai_Motor_Company_logo.svg.png',
  'tata': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/320px-Tata_logo.svg.png',
  'tata motors': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/320px-Tata_logo.svg.png',
  'mahindra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Mahindra_Rise_logo.svg/320px-Mahindra_Rise_logo.svg.png',
  'toyota': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_car_logo.svg/320px-Toyota_car_logo.svg.png',
  'honda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/320px-Honda_logo.svg.png',
  'kia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/KIA_logo2021.svg/320px-KIA_logo2021.svg.png',
  'volkswagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/320px-Volkswagen_logo_2019.svg.png',
};

export function BrandLogo({ name = '', size = 32, className = '' }: BrandLogoProps) {
  const safeSize = Number.isFinite(size) && size > 0 ? size : 32;
  const brandKey = String(name || '').toLowerCase().trim();
  const logoUrl = BRAND_LOGO_URLS[brandKey] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2016.svg/320px-Suzuki_logo_2016.svg.png';

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img 
        src={logoUrl} 
        alt={name} 
        style={{ width: safeSize * 1.2, height: safeSize * 0.85, objectFit: 'contain' }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default BrandLogo;

export function CarBrandBadge(props: BrandLogoProps) {
  return <BrandLogo {...props} />;
}

export function GearSpeedLogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2016.svg/320px-Suzuki_logo_2016.svg.png" 
        alt="GearSpeed" 
        style={{ width: size, height: size, objectFit: 'contain' }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

