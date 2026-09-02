import React from 'react';

export interface CategoryIconProps {
  type?: string;
  size?: number;
  className?: string;
}

// 1. Engine & Parts - 3D Metallic V8 Turbo Engine Block Render
const Engine3DObject = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="engBody3D" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="40%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="engTopDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="engChromePipe" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#CBD5E1" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <linearGradient id="pulleyGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="88" rx="36" ry="7" fill="#000000" opacity="0.18" />
    <path d="M 22 52 L 50 34 L 78 52 L 78 74 L 50 90 L 22 74 Z" fill="url(#engBody3D)" />
    <path d="M 22 38 L 50 20 L 78 38 L 78 52 L 50 68 L 22 52 Z" fill="url(#engTopDark)" />
    <path d="M 32 38 L 50 26 L 68 38 L 50 50 Z" fill="#020617" opacity="0.7" />
    <path d="M 34 36 L 50 26 L 66 36" stroke="url(#engChromePipe)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M 34 42 L 50 32 L 66 42" stroke="url(#engChromePipe)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M 18 42 C 18 28 32 20 44 20 L 52 20" stroke="url(#engChromePipe)" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M 34 72 L 66 72" stroke="#020617" strokeWidth="4" />
    <circle cx="34" cy="72" r="9" fill="#0F172A" stroke="url(#engChromePipe)" strokeWidth="2.5" />
    <circle cx="34" cy="72" r="3" fill="#94A3B8" />
    <circle cx="66" cy="72" r="9" fill="#0F172A" stroke="url(#engChromePipe)" strokeWidth="2.5" />
    <circle cx="66" cy="72" r="3" fill="#94A3B8" />
    <circle cx="50" cy="60" r="6" fill="url(#pulleyGold)" stroke="url(#engChromePipe)" strokeWidth="1.5" />
    <path d="M 22 38 L 50 20 L 78 38" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" fill="none" />
  </svg>
);

// 2. Body Parts - 3D Metallic Royal Blue Car Front Door
const Body3DObject = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="carPaintBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="45%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
      <linearGradient id="windowTintDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="chromeHandle" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="88" rx="38" ry="7" fill="#000000" opacity="0.18" />
    <path d="M 16 38 C 30 20 70 18 88 30 L 84 76 C 78 82 66 85 50 85 C 34 85 18 80 16 70 Z" fill="url(#carPaintBlue)" />
    <path d="M 24 38 C 34 25 62 23 78 32 L 76 50 L 22 50 Z" fill="url(#windowTintDark)" />
    <path d="M 30 36 L 42 34 L 36 48 L 26 48 Z" fill="#FFFFFF" opacity="0.35" />
    <path d="M 16 38 C 30 20 70 18 88 30 L 85 42 C 65 30 30 32 16 48 Z" fill="#FFFFFF" opacity="0.25" />
    <rect x="54" y="58" width="20" height="6" rx="3" fill="url(#chromeHandle)" />
    <rect x="56" y="60" width="16" height="2" rx="1" fill="#FFFFFF" opacity="0.9" />
    <path d="M 76 44 C 84 42 92 46 88 53 C 82 56 76 53 76 49 Z" fill="#0F172A" stroke="url(#chromeHandle)" strokeWidth="1.5" />
  </svg>
);

// 3. Electricals - 3D Bright Yellow Bevelled Lightning Bolt
const Electrical3DObject = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="boltYellowMain" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
      <linearGradient id="boltHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="100%" stopColor="#FACC15" />
      </linearGradient>
    </defs>
    <path d="M 58 12 L 28 52 L 48 52 L 36 88 L 76 44 L 54 44 Z" fill="#000000" opacity="0.15" transform="translate(3, 4)" />
    <path d="M 58 10 L 28 50 L 48 50 L 36 86 L 76 42 L 54 42 Z" fill="#A16207" />
    <path d="M 56 10 L 28 50 L 46 50 L 36 84 L 74 42 L 52 42 Z" fill="url(#boltYellowMain)" />
    <path d="M 56 10 L 38 36 L 46 50 L 52 42 L 74 42 Z" fill="url(#boltHighlight)" opacity="0.7" />
  </svg>
);

// 4. Suspension - 3D Shock Absorber + Slotted Brake Rotor Disc & Red Caliper
const Suspension3DObject = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chromeSteel" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="brakeRotorSteel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#CBD5E1" />
        <stop offset="50%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="redCaliper" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="88" rx="36" ry="7" fill="#000000" opacity="0.18" />
    <circle cx="62" cy="54" r="28" fill="url(#brakeRotorSteel)" stroke="#334155" strokeWidth="2" />
    <circle cx="62" cy="54" r="18" fill="#1E293B" stroke="url(#chromeSteel)" strokeWidth="1.5" />
    <circle cx="62" cy="54" r="8" fill="#0F172A" />
    <line x1="50" y1="42" x2="56" y2="48" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    <line x1="68" y1="38" x2="66" y2="46" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    <line x1="74" y1="52" x2="68" y2="54" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    <line x1="62" y1="68" x2="62" y2="60" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    <path d="M 72 32 C 86 42 86 64 74 74 L 64 68 C 72 60 72 46 64 38 Z" fill="url(#redCaliper)" />
    <rect x="72" y="44" width="8" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
    <rect x="26" y="12" width="10" height="70" rx="3" fill="url(#chromeSteel)" />
    <rect x="18" y="10" width="26" height="8" rx="2" fill="#0F172A" stroke="url(#chromeSteel)" strokeWidth="1" />
    <path d="M 18 24 Q 44 28 18 34 Q 44 38 18 44 Q 44 48 18 54 Q 44 58 18 64" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M 18 24 Q 44 28 18 34 Q 44 38 18 44 Q 44 48 18 54 Q 44 58 18 64" stroke="url(#chromeSteel)" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

// 5. Exhaust - 3D Dual Metallic Chrome Muffler & Tailpipes
const Exhaust3DObject = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mufflerSteel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="40%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="chromeTip" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#CBD5E1" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="86" rx="36" ry="7" fill="#000000" opacity="0.18" />
    <path d="M 12 44 L 32 44 L 32 54 L 12 54 Z" fill="url(#mufflerSteel)" />
    <rect x="26" y="26" width="42" height="46" rx="14" fill="url(#mufflerSteel)" />
    <line x1="38" y1="26" x2="38" y2="72" stroke="#475569" strokeWidth="2" opacity="0.4" />
    <line x1="56" y1="26" x2="56" y2="72" stroke="#475569" strokeWidth="2" opacity="0.4" />
    <path d="M 28 29 L 64 29" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
    <rect x="68" y="32" width="22" height="13" rx="3" fill="url(#chromeTip)" />
    <ellipse cx="90" cy="38.5" rx="3" ry="6.5" fill="#090D16" />
    <path d="M 68 33 L 88 33" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
    <rect x="68" y="52" width="22" height="13" rx="3" fill="url(#chromeTip)" />
    <ellipse cx="90" cy="58.5" rx="3" ry="6.5" fill="#090D16" />
    <path d="M 68 53 L 88 53" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
  </svg>
);

// 6. More - 4 Royal Blue Rounded Squares arranged in a 2x2 Grid
const More3DObject = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="blueSquareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="88" rx="32" ry="6" fill="#000000" opacity="0.14" />
    <g transform="translate(14, 14)">
      <rect x="0" y="0" width="32" height="32" rx="10" fill="url(#blueSquareGrad)" />
      <rect x="38" y="0" width="32" height="32" rx="10" fill="url(#blueSquareGrad)" />
      <rect x="0" y="38" width="32" height="32" rx="10" fill="url(#blueSquareGrad)" />
      <rect x="38" y="38" width="32" height="32" rx="10" fill="url(#blueSquareGrad)" />
    </g>
  </svg>
);

export default function Category3DIcon({ type, size = 48, className = "" }: CategoryIconProps) {
  const t = (type || 'more').toLowerCase().trim();

  if (t.includes('engine') || t.includes('motor') || t.includes('piston') || t.includes('turbo')) {
    return <div className={`inline-flex items-center justify-center ${className}`}><Engine3DObject size={size} /></div>;
  }
  if (t.includes('body') || t.includes('door') || t.includes('bumper') || t.includes('fender') || t.includes('panel')) {
    return <div className={`inline-flex items-center justify-center ${className}`}><Body3DObject size={size} /></div>;
  }
  if (t.includes('elect') || t.includes('battery') || t.includes('light') || t.includes('spark') || t.includes('bolt')) {
    return <div className={`inline-flex items-center justify-center ${className}`}><Electrical3DObject size={size} /></div>;
  }
  if (t.includes('suspension') || t.includes('shock') || t.includes('strut') || t.includes('spring') || t.includes('brake') || t.includes('steering')) {
    return <div className={`inline-flex items-center justify-center ${className}`}><Suspension3DObject size={size} /></div>;
  }
  if (t.includes('exhaust') || t.includes('muffler') || t.includes('silencer') || t.includes('pipe')) {
    return <div className={`inline-flex items-center justify-center ${className}`}><Exhaust3DObject size={size} /></div>;
  }
  return <div className={`inline-flex items-center justify-center ${className}`}><More3DObject size={size} /></div>;
}
