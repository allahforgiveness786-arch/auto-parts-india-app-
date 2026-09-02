import React from 'react';
import { Grid } from 'lucide-react';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  className?: string;
  active?: boolean;
}

const CATEGORY_IMAGE_PATHS: Record<string, string> = {
  engine: '/assets/categories/engine.png',
  body: '/assets/categories/body.png',
  electrical: '/assets/categories/electricals.png',
  electricals: '/assets/categories/electricals.png',
  suspension: '/assets/categories/suspension.png',
  exhaust: '/assets/categories/exhaust.png',
  more: '/assets/categories/more.png',
};

export const Category3DIcon: React.FC<CategoryIconProps> = ({
  type = 'more',
  size = 52,
  className = '',
  active = false,
}) => {
  const normType = String(type || '').toLowerCase().trim();

  let matchedSrc = CATEGORY_IMAGE_PATHS[normType];
  if (!matchedSrc) {
    if (normType.includes('engine')) matchedSrc = CATEGORY_IMAGE_PATHS.engine;
    else if (normType.includes('body') || normType.includes('door')) matchedSrc = CATEGORY_IMAGE_PATHS.body;
    else if (normType.includes('elect') || normType.includes('light')) matchedSrc = CATEGORY_IMAGE_PATHS.electrical;
    else if (normType.includes('susp') || normType.includes('brake')) matchedSrc = CATEGORY_IMAGE_PATHS.suspension;
    else if (normType.includes('exh') || normType.includes('muffler')) matchedSrc = CATEGORY_IMAGE_PATHS.exhaust;
    else matchedSrc = CATEGORY_IMAGE_PATHS.more;
  }

  if (matchedSrc) {
    return (
      <div 
        className={`flex items-center justify-center transition-transform duration-200 ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={matchedSrc}
          alt={normType}
          style={{ width: size, height: size, objectFit: 'contain' }}
          className="drop-shadow-md"
        />
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 ${className}`}
      style={{ width: size, height: size }}
    >
      <Grid size={size * 0.55} />
    </div>
  );
};

export default Category3DIcon;
