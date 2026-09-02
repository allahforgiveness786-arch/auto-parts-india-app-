import React from 'react';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  className?: string;
}

const CATEGORY_3D_IMAGE_URLS: Record<string, string> = {
  'engine': 'https://images.unsplash.com/photo-1597766333694-88339b1a03a7?auto=format&fit=crop&w=400&q=80',
  'body': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
  'electrical': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&q=80',
  'suspension': 'https://images.unsplash.com/photo-1600706432502-77821c97a55f?auto=format&fit=crop&w=400&q=80',
  'exhaust': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
  'more': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80',
};

export function Category3DIcon({ type = 'more', size = 52, className = '' }: CategoryIconProps) {
  const safeSize = Number.isFinite(size) && size > 0 ? size : 52;
  const key = String(type || 'more').toLowerCase().trim();
  
  let imageUrl = CATEGORY_3D_IMAGE_URLS['more'];
  if (key.includes('engine') || key.includes('motor') || key.includes('piston')) {
    imageUrl = CATEGORY_3D_IMAGE_URLS['engine'];
  } else if (key.includes('body') || key.includes('door') || key.includes('bumper')) {
    imageUrl = CATEGORY_3D_IMAGE_URLS['body'];
  } else if (key.includes('elect') || key.includes('battery') || key.includes('bolt') || key.includes('light')) {
    imageUrl = CATEGORY_3D_IMAGE_URLS['electrical'];
  } else if (key.includes('suspension') || key.includes('brake') || key.includes('shock') || key.includes('strut')) {
    imageUrl = CATEGORY_3D_IMAGE_URLS['suspension'];
  } else if (key.includes('exhaust') || key.includes('muffler') || key.includes('pipe')) {
    imageUrl = CATEGORY_3D_IMAGE_URLS['exhaust'];
  }

  return (
    <div className={`inline-flex items-center justify-center overflow-hidden rounded-xl ${className}`}>
      <img
        src={imageUrl}
        alt={type}
        style={{
          width: safeSize,
          height: safeSize,
          borderRadius: 12,
          objectFit: 'cover',
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default Category3DIcon;
