import React from 'react';

interface AutoPartsBrandLogoProps {
  className?: string;
  size?: number | string;
  color?: string;
  bgColor?: string;
  showText?: boolean;
  useExactAsset?: boolean;
}

export default function AutoPartsBrandLogo({
  className = "",
  size = 280,
  color = "#FFFFFF",
  bgColor = "#0075FF",
  showText = true,
  useExactAsset = true,
}: AutoPartsBrandLogoProps) {
  if (useExactAsset) {
    return (
      <div className={`flex flex-col items-center justify-center select-none ${className}`}>
        <img
          src="/assets/splash_logo.png"
          alt="Auto Parts INDIA"
          style={{ width: typeof size === 'number' ? `${size}px` : size, height: 'auto', objectFit: 'contain' }}
          className="max-w-full drop-shadow-sm pointer-events-none"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={showText ? (typeof size === 'number' ? size * 0.72 : 'auto') : (typeof size === 'number' ? size * 0.48 : 'auto')}
        viewBox="0 0 600 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-full"
      >
        {/* UPPER RIGHT GEAR */}
        <g transform="translate(362, 134)">
          {/* 8 Chunky Rounded Teeth */}
          <rect x="-14" y="-88" width="28" height="26" rx="7" fill={color} />
          <rect x="-14" y="-88" width="28" height="26" rx="7" fill={color} transform="rotate(45)" />
          <rect x="-14" y="-88" width="28" height="26" rx="7" fill={color} transform="rotate(90)" />
          <rect x="-14" y="-88" width="28" height="26" rx="7" fill={color} transform="rotate(135)" />
          <rect x="-14" y="-88" width="28" height="26" rx="7" fill={color} transform="rotate(180)" />
          <rect x="-14" y="-88" width="28" height="26" rx="7" fill={color} transform="rotate(225)" />
          <rect x="-14" y="-88" width="28" height="26" rx="7" fill={color} transform="rotate(270)" />
          <rect x="-14" y="-88" width="28" height="26" rx="7" fill={color} transform="rotate(315)" />

          {/* Solid Gear Ring Body */}
          <circle cx="0" cy="0" r="74" fill={color} />

          {/* Center Hole Matching Background */}
          <circle cx="0" cy="0" r="44" fill={bgColor} />
        </g>

        {/* SIDE MIRRORS */}
        <rect x="190" y="156" width="30" height="14" rx="7" fill={color} />
        <rect x="380" y="156" width="30" height="14" rx="7" fill={color} />

        {/* CAR OUTER BODY SHELL */}
        <path
          d="M 300 100 
             C 334 100, 366 112, 386 136 
             C 394 146, 402 156, 410 164 
             C 414 167, 422 176, 422 196 
             C 422 212, 414 224, 402 228 
             L 390 228 
             C 390 236, 386 242, 378 242 
             L 358 242 
             C 350 242, 346 236, 346 228 
             L 254 228 
             C 254 236, 250 242, 242 242 
             L 222 242 
             C 214 242, 210 236, 210 228 
             L 198 228 
             C 186 224, 178 212, 178 196 
             C 178 176, 186 167, 190 164 
             C 198 156, 206 146, 214 136 
             C 234 112, 266 100, 300 100 Z"
          fill={color}
        />

        {/* WINDSHIELD CUTOUT */}
        <path
          d="M 300 112 
             C 330 112, 354 120, 366 134 
             C 372 142, 374 150, 378 158 
             C 378 162, 374 164, 368 164 
             L 232 164 
             C 226 164, 222 162, 222 158 
             C 226 150, 228 142, 234 134 
             C 246 120, 270 112, 300 112 Z"
          fill={bgColor}
        />

        {/* LEFT HEADLIGHT CUTOUT */}
        <path
          d="M 196 180 
             C 204 174, 224 174, 234 180 
             C 236 184, 230 192, 222 194 
             C 208 196, 196 192, 196 180 Z"
          fill={bgColor}
        />

        {/* RIGHT HEADLIGHT CUTOUT */}
        <path
          d="M 404 180 
             C 396 174, 376 174, 366 180 
             C 364 184, 370 192, 378 194 
             C 392 196, 404 192, 404 180 Z"
          fill={bgColor}
        />

        {/* CENTER LOWER AIR INTAKE / GRILLE */}
        <path
          d="M 256 192 
             L 344 192 
             C 348 192, 350 195, 348 198 
             L 340 214 
             C 336 220, 330 224, 322 224 
             L 278 224 
             C 270 224, 264 220, 260 214 
             L 252 198 
             C 250 195, 252 192, 256 192 Z"
          fill={bgColor}
        />

        {/* BRAND TYPOGRAPHY */}
        {showText && (
          <>
            {/* Auto Parts Text in Chunky Rounded Display Font */}
            <text
              x="300"
              y="336"
              textAnchor="middle"
              fill={color}
              style={{
                fontFamily: "'Fredoka', 'Poppins', 'Nunito', system-ui, -apple-system, sans-serif",
                fontWeight: 900,
                fontSize: "88px",
                letterSpacing: "-1px"
              }}
            >
              Auto Parts
            </text>

            {/* INDIA Text */}
            <text
              x="300"
              y="384"
              textAnchor="middle"
              fill={color}
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Poppins', system-ui, -apple-system, sans-serif",
                fontWeight: 700,
                fontSize: "26px",
                letterSpacing: "18px"
              }}
            >
              INDIA
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
