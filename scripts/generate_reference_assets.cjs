const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Target output directories
const DIRS = [
  path.join(__dirname, '../react-native-app/src/assets/brands'),
  path.join(__dirname, '../react-native-app/src/assets/categories'),
  path.join(__dirname, '../react-native-app/src/assets/banner'),
  path.join(__dirname, '../public/assets/brands'),
  path.join(__dirname, '../public/assets/categories'),
  path.join(__dirname, '../public/assets/banner'),
  path.join(__dirname, '../react-native-app/android/app/src/main/res/drawable'),
];

DIRS.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

// Helper to save SVG to PNG across multiple directories
async function saveSvgToPng(svgString, baseName, width, height, androidDrawableName) {
  const pngBuffer = await sharp(Buffer.from(svgString))
    .resize(width, height)
    .png({ compressionLevel: 9, quality: 100 })
    .toBuffer();

  // Save to react-native-app assets
  const rnaPath = path.join(__dirname, `../react-native-app/src/assets/${baseName}.png`);
  fs.writeFileSync(rnaPath, pngBuffer);

  // Save to public assets for web
  const webPath = path.join(__dirname, `../public/assets/${baseName}.png`);
  fs.writeFileSync(webPath, pngBuffer);

  // Save to android drawable if specified
  if (androidDrawableName) {
    const androidPath = path.join(__dirname, `../react-native-app/android/app/src/main/res/drawable/${androidDrawableName}.png`);
    fs.writeFileSync(androidPath, pngBuffer);
  }

  console.log(`Saved ${baseName}.png (${width}x${height})`);
}

// ==========================================
// 1. BRAND LOGOS (Transparent, Pristine)
// ==========================================

// Maruti Suzuki: The iconic bold sharp 'S'
const svgMarutiSuzuki = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="suzukiGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="50%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="redAccent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#E11D48"/>
      <stop offset="100%" stop-color="#BE123C"/>
    </linearGradient>
  </defs>
  <!-- Authentic Suzuki S symbol -->
  <g transform="translate(15, 10)">
    <!-- Top arm -->
    <path d="M 125 15 L 60 85 L 85 85 L 145 25 Z" fill="#DC2626"/>
    <!-- Center diagonal -->
    <path d="M 45 35 L 140 35 L 120 55 L 65 55 Z" fill="url(#suzukiGrad)"/>
    <path d="M 30 85 L 140 85 L 125 100 L 45 100 Z" fill="url(#suzukiGrad)"/>
    <!-- Bottom arm -->
    <path d="M 25 155 L 90 85 L 65 85 L 5 145 Z" fill="#DC2626"/>
    <path d="M 10 125 L 120 125 L 105 145 L 25 145 Z" fill="url(#suzukiGrad)"/>
    
    <!-- Clean geometric S shape matching OEM emblem -->
    <path d="M 40 40 L 135 40 L 95 80 L 135 80 L 110 140 L 35 140 L 75 100 L 35 100 Z" fill="url(#suzukiGrad)" opacity="0.95"/>
    <path d="M 45 42 L 130 42 L 95 78 L 130 78 L 108 138 L 40 138 L 75 102 L 40 102 Z" fill="#1E293B"/>
    <path d="M 115 48 L 128 48 L 98 78 L 85 78 Z" fill="#E2E8F0"/>
  </g>
</svg>
`;

// Hyundai: The slanted oval 'H' emblem
const svgHyundai = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="hyundaiSilver" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="40%" stop-color="#1E293B"/>
      <stop offset="70%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <!-- Outer slanted ellipse -->
  <ellipse cx="100" cy="100" rx="88" ry="54" transform="rotate(-15, 100, 100)" fill="none" stroke="url(#hyundaiSilver)" stroke-width="16"/>
  <!-- Slanted H monogram inside -->
  <g transform="rotate(-15, 100, 100)">
    <!-- Left vertical bar (curving inward) -->
    <path d="M 52 64 C 62 85, 62 115, 52 136 C 68 136, 74 125, 78 100 C 74 80, 68 64, 52 64 Z" fill="url(#hyundaiSilver)"/>
    <!-- Right vertical bar (curving inward) -->
    <path d="M 148 64 C 138 85, 138 115, 148 136 C 132 136, 126 125, 122 100 C 126 80, 132 64, 148 64 Z" fill="url(#hyundaiSilver)"/>
    <!-- Center connecting arch -->
    <path d="M 68 103 C 85 92, 115 92, 132 103 C 125 113, 75 113, 68 103 Z" fill="url(#hyundaiSilver)"/>
  </g>
</svg>
`;

// Tata: The blue oval with dual curved arcs
const svgTata = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="tataBlue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="50%" stop-color="#0369A1"/>
      <stop offset="100%" stop-color="#075985"/>
    </linearGradient>
  </defs>
  <!-- Outer Blue Oval -->
  <ellipse cx="100" cy="100" rx="88" ry="58" fill="url(#tataBlue)"/>
  <ellipse cx="100" cy="100" rx="84" ry="54" fill="none" stroke="#BAE6FD" stroke-width="2" opacity="0.6"/>
  <!-- Authentic TATA Dual Curved Wings / Arcs -->
  <g fill="#FFFFFF">
    <!-- Left wing -->
    <path d="M 100 60 C 80 62, 50 78, 50 102 C 50 120, 72 135, 96 138 C 76 132, 62 118, 62 102 C 62 86, 82 72, 100 68 Z"/>
    <!-- Right wing -->
    <path d="M 100 60 C 120 62, 150 78, 150 102 C 150 120, 128 135, 104 138 C 124 132, 138 118, 138 102 C 138 86, 118 72, 100 68 Z"/>
    <!-- Center vertical bar -->
    <path d="M 97 68 L 103 68 L 103 136 L 97 136 Z"/>
  </g>
</svg>
`;

// Mahindra: The new Twin Peaks red butterfly / infinity chrome logo
const svgMahindra = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="mahindraRed" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="50%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
  </defs>
  <!-- Authentic New Mahindra Twin Peaks Logo (Dual flowing red ribbon peaks) -->
  <g transform="translate(10, 30)">
    <!-- Left peak loop -->
    <path d="M 90 95 C 75 75, 45 45, 25 60 C 5 75, 15 110, 45 110 C 70 110, 85 95, 90 95 Z" 
          fill="none" stroke="url(#mahindraRed)" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Right peak loop -->
    <path d="M 90 95 C 105 75, 135 45, 155 60 C 175 75, 165 110, 135 110 C 110 110, 95 95, 90 95 Z" 
          fill="none" stroke="url(#mahindraRed)" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Top interlocking peak crests -->
    <path d="M 52 48 L 90 85 L 128 48" fill="none" stroke="url(#mahindraRed)" stroke-width="12" stroke-linecap="round"/>
  </g>
</svg>
`;

// Toyota: The iconic three overlapping ellipses
const svgToyota = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="toyotaMet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="50%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>
  <!-- Outer Ellipse -->
  <ellipse cx="100" cy="100" rx="90" ry="62" fill="none" stroke="url(#toyotaMet)" stroke-width="16"/>
  <!-- Vertical center ellipse -->
  <ellipse cx="100" cy="100" rx="30" ry="58" fill="none" stroke="url(#toyotaMet)" stroke-width="14"/>
  <!-- Horizontal inner cross ellipse -->
  <ellipse cx="100" cy="80" rx="60" ry="24" fill="none" stroke="url(#toyotaMet)" stroke-width="14"/>
</svg>
`;

// ==========================================
// 2. CATEGORY 3D ICONS (256x256 Transparent)
// ==========================================

// Category 1: Engine & Parts (3D silver/metallic engine block)
const svgCatEngine = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="metalTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="50%" stop-color="#CBD5E1"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <linearGradient id="metalSide" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="70%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="redAccentEngine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
    <radialGradient id="pulleyGleam" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="60%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </radialGradient>
    <filter id="engShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <g filter="url(#engShadow)" transform="translate(18, 20) scale(0.86)">
    <!-- Engine Block Base (Cast Iron / Dark Aluminum) -->
    <polygon points="40,110 130,60 210,105 120,165" fill="url(#metalTop)"/>
    <polygon points="40,110 120,165 120,225 40,170" fill="url(#metalSide)"/>
    <polygon points="120,165 210,105 210,165 120,225" fill="#1E293B"/>

    <!-- Dual V-Bank Cylinder Heads (Isometric 3D) -->
    <!-- Left Cylinder Bank -->
    <polygon points="55,100 95,78 120,95 80,118" fill="url(#redAccentEngine)"/>
    <polygon points="80,118 120,95 120,115 80,138" fill="#7F1D1D"/>
    <!-- Cylinder spark plug recesses -->
    <ellipse cx="78" cy="98" rx="6" ry="3" fill="#1E293B"/>
    <ellipse cx="92" cy="90" rx="6" ry="3" fill="#1E293B"/>
    <ellipse cx="106" cy="82" rx="6" ry="3" fill="#1E293B"/>

    <!-- Right Cylinder Bank -->
    <polygon points="125,65 165,45 190,62 150,85" fill="url(#redAccentEngine)"/>
    <polygon points="150,85 190,62 190,82 150,105" fill="#7F1D1D"/>
    <ellipse cx="148" cy="65" rx="6" ry="3" fill="#1E293B"/>
    <ellipse cx="162" cy="57" rx="6" ry="3" fill="#1E293B"/>
    <ellipse cx="176" cy="49" rx="6" ry="3" fill="#1E293B"/>

    <!-- Center Aluminum Intake Manifold Runners -->
    <path d="M 85 85 C 95 65, 130 55, 140 75" stroke="url(#metalTop)" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M 98 92 C 108 72, 143 62, 153 82" stroke="url(#metalTop)" stroke-width="12" fill="none" stroke-linecap="round"/>
    
    <!-- Front Serpentine Pulleys & Belt Assembly -->
    <!-- Crankshaft Pulley (Large Bottom) -->
    <circle cx="80" cy="180" r="28" fill="#0F172A"/>
    <circle cx="80" cy="180" r="24" fill="url(#pulleyGleam)"/>
    <circle cx="80" cy="180" r="10" fill="#0F172A"/>
    <!-- Alternator Pulley (Top Right) -->
    <circle cx="115" cy="140" r="18" fill="#0F172A"/>
    <circle cx="115" cy="140" r="15" fill="url(#pulleyGleam)"/>
    <!-- Water Pump Pulley (Top Left) -->
    <circle cx="50" cy="135" r="16" fill="#0F172A"/>
    <circle cx="50" cy="135" r="13" fill="url(#pulleyGleam)"/>
    <!-- Black Rubber Ribbed Drive Belt connecting all 3 -->
    <path d="M 40 145 C 50 180, 60 205, 80 208 C 100 208, 110 175, 128 150 C 130 130, 110 125, 100 135 C 90 145, 60 125, 42 125 C 34 130, 36 140, 40 145 Z" 
          fill="none" stroke="#090D16" stroke-width="7" stroke-linejoin="round"/>
          
    <!-- Chrome Oil Filter on Front Left -->
    <rect x="22" y="160" width="22" height="34" rx="6" fill="#2563EB" transform="rotate(20, 33, 177)"/>
    <rect x="24" y="162" width="18" height="6" rx="2" fill="#93C5FD" transform="rotate(20, 33, 177)"/>
  </g>
</svg>
`;

// Category 2: Body Parts (3D Electric Blue Car Door)
const svgCatBody = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="doorBluePaint" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="30%" stop-color="#0284C7"/>
      <stop offset="70%" stop-color="#0369A1"/>
      <stop offset="100%" stop-color="#0C4A6E"/>
    </linearGradient>
    <linearGradient id="doorWindowGlass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="40%" stop-color="#334155"/>
      <stop offset="70%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="glassSpecular" x1="0" y1="0" x2="1" y2="0.8">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
      <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <filter id="doorDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="14" stdDeviation="12" flood-color="#0284C7" flood-opacity="0.3"/>
    </filter>
  </defs>

  <g filter="url(#doorDrop)" transform="translate(18, 14)">
    <!-- 3D Car Door Outer Shell -->
    <!-- Window Frame Top Curve -->
    <path d="M 45 110 L 85 35 C 130 35, 175 42, 195 55 L 185 110 Z" fill="#0F172A"/>
    <!-- Glass with realistic automotive reflection -->
    <path d="M 55 105 L 90 45 C 128 45, 165 52, 180 62 L 175 105 Z" fill="url(#doorWindowGlass)"/>
    <path d="M 65 100 L 95 50 L 125 50 L 95 100 Z" fill="url(#glassSpecular)"/>
    
    <!-- Lower Painted Door Body with Aero Curves -->
    <path d="M 40 108 
             C 40 108, 195 105, 195 108 
             C 192 145, 186 185, 175 210 
             C 140 215, 80 215, 52 208 
             C 42 180, 38 140, 40 108 Z" 
          fill="url(#doorBluePaint)"/>

    <!-- Specular Highlight Swage Line (Body character crease) -->
    <path d="M 44 140 C 90 144, 150 144, 188 138" stroke="#7DD3FC" stroke-width="3" fill="none" opacity="0.8"/>
    <!-- Bottom shadow bevel of swage line -->
    <path d="M 44 143 C 90 147, 150 147, 188 141" stroke="#0369A1" stroke-width="2.5" fill="none"/>

    <!-- Flush Modern Chrome Door Handle -->
    <rect x="135" y="125" width="34" height="10" rx="5" fill="#0F172A"/>
    <rect x="136" y="126" width="32" height="7" rx="3.5" fill="#E2E8F0"/>
    <rect x="140" y="128" width="24" height="2" fill="#FFFFFF"/>

    <!-- Side View Mirror Assembly on Window Base -->
    <path d="M 46 95 C 30 92, 15 98, 20 110 C 25 118, 42 112, 48 106 Z" fill="#0F172A"/>
    <path d="M 42 97 C 32 95, 20 99, 23 107 C 27 113, 38 108, 44 104 Z" fill="url(#doorBluePaint)"/>
  </g>
</svg>
`;

// Category 3: Electricals (3D Gold Faceted Lightning Bolt)
const svgCatElectricals = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="goldFront" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="40%" stop-color="#FACC15"/>
      <stop offset="100%" stop-color="#EAB308"/>
    </linearGradient>
    <linearGradient id="goldSide" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#CA8A04"/>
      <stop offset="50%" stop-color="#A16207"/>
      <stop offset="100%" stop-color="#713F12"/>
    </linearGradient>
    <linearGradient id="goldHighlight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FEF08A"/>
    </linearGradient>
    <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#EAB308" flood-opacity="0.5"/>
    </filter>
  </defs>

  <g filter="url(#goldGlow)" transform="translate(32, 16)">
    <!-- 3D Extrusion Side Wall (Depth) -->
    <polygon points="120,15 138,28 88,118 70,105" fill="url(#goldSide)"/>
    <polygon points="88,118 70,105 110,105 128,118" fill="#713F12"/>
    <polygon points="128,118 110,105 50,215 68,228" fill="url(#goldSide)"/>

    <!-- Main Front Lightning Facet -->
    <polygon points="120,15 50,115 105,115 45,225 155,95 95,95" fill="url(#goldFront)"/>

    <!-- Inner Specular Crest (Beveled light reflection) -->
    <polygon points="115,25 60,110 100,110 55,215 75,175 100,120 75,120 135,100" fill="url(#goldHighlight)" opacity="0.6"/>

    <!-- Energy Sparkle Star at Top Tip -->
    <circle cx="120" cy="18" r="4" fill="#FFFFFF"/>
    <line x1="120" y1="8" x2="120" y2="28" stroke="#FFFFFF" stroke-width="2"/>
    <line x1="110" y1="18" x2="130" y2="18" stroke="#FFFFFF" stroke-width="2"/>
  </g>
</svg>
`;

// Category 4: Suspension (3D Coilover Shock Spring & Slotted Brake Rotor)
const svgCatSuspension = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="rotorSilver" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="45%" stop-color="#94A3B8"/>
      <stop offset="70%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <linearGradient id="springRed" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="30%" stop-color="#475569"/>
      <stop offset="70%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="chromeShaft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="50%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
    <filter id="suspShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="12" stdDeviation="10" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <g filter="url(#suspShadow)" transform="translate(20, 16)">
    <!-- 1. Brake Disc Rotor (Behind, slightly to the right) -->
    <g transform="translate(90, 85) rotate(15)">
      <!-- Outer Disc Thickness (3D Edge) -->
      <ellipse cx="40" cy="45" rx="55" ry="55" fill="#334155"/>
      <!-- Rotor Face -->
      <circle cx="40" cy="40" r="54" fill="url(#rotorSilver)"/>
      <circle cx="40" cy="40" r="48" fill="none" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>
      <!-- Ventilation Slots on Disc Face -->
      <path d="M 25 15 Q 35 25 32 32" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 55 15 Q 45 25 48 32" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 68 30 Q 58 40 54 48" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 65 58 Q 52 55 48 48" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 20 50 Q 30 48 35 42" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Center Hub with Wheel Stud Holes -->
      <circle cx="40" cy="40" r="24" fill="#1E293B"/>
      <circle cx="40" cy="40" r="20" fill="#475569"/>
      <circle cx="40" cy="40" r="10" fill="#0F172A"/>
      <circle cx="40" cy="27" r="3" fill="#E2E8F0"/>
      <circle cx="52" cy="35" r="3" fill="#E2E8F0"/>
      <circle cx="48" cy="49" r="3" fill="#E2E8F0"/>
      <circle cx="32" cy="49" r="3" fill="#E2E8F0"/>
      <circle cx="28" cy="35" r="3" fill="#E2E8F0"/>
    </g>

    <!-- 2. Coilover Strut / Shock Absorber (In front, angled) -->
    <g transform="translate(60, 20) rotate(-25)">
      <!-- Top Mount Pillow-ball Hat -->
      <rect x="25" y="0" width="30" height="12" rx="4" fill="#0F172A"/>
      <rect x="35" y="12" width="10" height="10" fill="#E2E8F0"/>
      <!-- Upper Spring Perch Collar -->
      <rect x="20" y="22" width="40" height="8" rx="2" fill="#E11D48"/>
      <!-- Polished Chrome Damper Shaft inside Spring -->
      <rect x="34" y="30" width="12" height="110" fill="url(#chromeShaft)"/>
      
      <!-- Helical Coil Spring Rings (Heavy Duty 3D Coils) -->
      <ellipse cx="40" cy="38" rx="22" ry="7" fill="url(#springRed)"/>
      <ellipse cx="40" cy="54" rx="22" ry="7" fill="url(#springRed)"/>
      <ellipse cx="40" cy="70" rx="22" ry="7" fill="url(#springRed)"/>
      <ellipse cx="40" cy="86" rx="22" ry="7" fill="url(#springRed)"/>
      <ellipse cx="40" cy="102" rx="22" ry="7" fill="url(#springRed)"/>
      <ellipse cx="40" cy="118" rx="22" ry="7" fill="url(#springRed)"/>

      <!-- Lower Adjustable Threaded Locking Rings -->
      <rect x="22" y="125" width="36" height="6" rx="1" fill="#E11D48"/>
      <rect x="24" y="132" width="32" height="6" rx="1" fill="#BE123C"/>
      <!-- Lower Damper Body Tube -->
      <rect x="28" y="138" width="24" height="40" rx="2" fill="#0F172A"/>
      <!-- Bottom Eyelet Bushing Mount -->
      <circle cx="40" cy="188" r="14" fill="#0F172A"/>
      <circle cx="40" cy="188" r="8" fill="url(#chromeShaft)"/>
    </g>
  </g>
</svg>
`;

// Category 5: Exhaust (3D Polished Chrome Muffler & Dual Tailpipes)
const svgCatExhaust = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="chromeCylinder" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="25%" stop-color="#CBD5E1"/>
      <stop offset="50%" stop-color="#475569"/>
      <stop offset="75%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="pipeGleam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="40%" stop-color="#FFFFFF"/>
      <stop offset="80%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <filter id="exhShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="12" stdDeviation="10" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <g filter="url(#exhShadow)" transform="translate(30, 25) rotate(-20, 110, 110)">
    <!-- Inlet Pipe from Engine (Curving into muffler) -->
    <path d="M 185 100 C 185 100, 160 100, 140 100" stroke="url(#chromeCylinder)" stroke-width="22" stroke-linecap="round"/>

    <!-- Main Oval Muffler Canister Body (3D Cylinder) -->
    <rect x="55" y="70" width="95" height="60" rx="28" fill="url(#chromeCylinder)"/>
    <!-- Muffler Seam Rib Bands -->
    <line x1="68" y1="70" x2="68" y2="130" stroke="#FFFFFF" stroke-width="2" opacity="0.6"/>
    <line x1="138" y1="70" x2="138" y2="130" stroke="#0F172A" stroke-width="2" opacity="0.6"/>

    <!-- Dual Polished Stainless Tailpipes -->
    <!-- Top Pipe -->
    <path d="M 60 85 L 15 85" stroke="url(#pipeGleam)" stroke-width="18" stroke-linecap="round"/>
    <ellipse cx="14" cy="85" rx="6" ry="9" fill="#0F172A"/>
    <ellipse cx="14" cy="85" rx="4" ry="7" fill="#020617"/>
    <!-- Bottom Pipe -->
    <path d="M 60 115 L 15 115" stroke="url(#pipeGleam)" stroke-width="18" stroke-linecap="round"/>
    <ellipse cx="14" cy="115" rx="6" ry="9" fill="#0F172A"/>
    <ellipse cx="14" cy="115" rx="4" ry="7" fill="#020617"/>

    <!-- Heat Shield Bracket -->
    <path d="M 85 64 L 115 64" stroke="#94A3B8" stroke-width="5" stroke-linecap="round"/>
  </g>
</svg>
`;

// Category 6: More (3D Royal Blue 4-Square Apps Grid with depth)
const svgCatMore = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="cubeTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <linearGradient id="cubeSide" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1D4ED8"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </linearGradient>
    <filter id="cubeDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="8" stdDeviation="8" flood-color="#1D4ED8" flood-opacity="0.35"/>
    </filter>
  </defs>

  <g filter="url(#cubeDrop)" transform="translate(38, 38)">
    <!-- Top-Left Cube -->
    <g transform="translate(0, 0)">
      <rect x="0" y="4" width="76" height="76" rx="18" fill="url(#cubeSide)"/>
      <rect x="0" y="0" width="76" height="74" rx="18" fill="url(#cubeTop)"/>
    </g>

    <!-- Top-Right Cube -->
    <g transform="translate(100, 0)">
      <rect x="0" y="4" width="76" height="76" rx="18" fill="url(#cubeSide)"/>
      <rect x="0" y="0" width="76" height="74" rx="18" fill="url(#cubeTop)"/>
    </g>

    <!-- Bottom-Left Cube -->
    <g transform="translate(0, 100)">
      <rect x="0" y="4" width="76" height="76" rx="18" fill="url(#cubeSide)"/>
      <rect x="0" y="0" width="76" height="74" rx="18" fill="url(#cubeTop)"/>
    </g>

    <!-- Bottom-Right Cube -->
    <g transform="translate(100, 100)">
      <rect x="0" y="4" width="76" height="76" rx="18" fill="url(#cubeSide)"/>
      <rect x="0" y="0" width="76" height="74" rx="18" fill="url(#cubeTop)"/>
    </g>
  </g>
</svg>
`;

// ==========================================
// 3. HERO BANNER PARTS COMPOSITION
// ==========================================
const svgBannerParts = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 380" width="500" height="380">
  <defs>
    <radialGradient id="stageGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.25"/>
      <stop offset="70%" stop-color="#0284C7" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="discGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F1F5F9"/>
      <stop offset="40%" stop-color="#94A3B8"/>
      <stop offset="80%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="altGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="60%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>

  <!-- Ambient blue spotlight behind parts -->
  <circle cx="300" cy="180" r="170" fill="url(#stageGlow)"/>

  <!-- 1. Big Slotted Brake Rotor (Right background) -->
  <g transform="translate(260, 40)">
    <circle cx="100" cy="110" r="100" fill="#1E293B"/>
    <circle cx="100" cy="106" r="98" fill="url(#discGrad)"/>
    <!-- Ventilation Slots & Grooves -->
    <circle cx="100" cy="106" r="86" fill="none" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="8,6"/>
    <circle cx="100" cy="106" r="70" fill="none" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="6,4"/>
    <path d="M 60 60 Q 80 80 75 95" stroke="#334155" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M 140 60 Q 120 80 125 95" stroke="#334155" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M 155 120 Q 135 125 120 120" stroke="#334155" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M 45 120 Q 65 125 80 120" stroke="#334155" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- Center Hub -->
    <circle cx="100" cy="106" r="44" fill="#1E293B"/>
    <circle cx="100" cy="106" r="36" fill="#475569"/>
    <circle cx="100" cy="106" r="18" fill="#0F172A"/>
    <!-- 5 Wheel Lugs -->
    <circle cx="100" cy="80" r="5" fill="#E2E8F0"/>
    <circle cx="122" cy="95" r="5" fill="#E2E8F0"/>
    <circle cx="114" cy="122" r="5" fill="#E2E8F0"/>
    <circle cx="86" cy="122" r="5" fill="#E2E8F0"/>
    <circle cx="78" cy="95" r="5" fill="#E2E8F0"/>
  </g>

  <!-- 2. Motor Oil Bottle Canister (Far Right) -->
  <g transform="translate(390, 140)">
    <rect x="0" y="40" width="65" height="130" rx="12" fill="#334155"/>
    <rect x="4" y="44" width="57" height="122" rx="10" fill="#1E293B"/>
    <!-- Golden label with oil drop -->
    <rect x="10" y="80" width="45" height="60" rx="6" fill="#FACC15"/>
    <path d="M 32 95 C 25 105, 25 115, 32 120 C 39 115, 39 105, 32 95 Z" fill="#0F172A"/>
    <!-- Cap and neck -->
    <rect x="18" y="22" width="28" height="20" rx="4" fill="#E11D48"/>
    <rect x="14" y="16" width="36" height="12" rx="4" fill="#BE123C"/>
  </g>

  <!-- 3. Heavy Duty Coilover Suspension Strut (Center, Standing Tall) -->
  <g transform="translate(180, 20)">
    <!-- Top Pillowball Mount Hat -->
    <rect x="30" y="5" width="40" height="15" rx="5" fill="#0F172A"/>
    <rect x="44" y="20" width="12" height="12" fill="#E2E8F0"/>
    <rect x="22" y="32" width="56" height="12" rx="3" fill="#E11D48"/>
    
    <!-- Chrome Shock Shaft -->
    <rect x="42" y="44" width="16" height="150" fill="#E2E8F0"/>
    
    <!-- High-Tension Black Coilover Spring (Isometric Helix) -->
    <ellipse cx="50" cy="55" rx="32" ry="12" fill="#0F172A"/>
    <ellipse cx="50" cy="78" rx="32" ry="12" fill="#0F172A"/>
    <ellipse cx="50" cy="101" rx="32" ry="12" fill="#0F172A"/>
    <ellipse cx="50" cy="124" rx="32" ry="12" fill="#0F172A"/>
    <ellipse cx="50" cy="147" rx="32" ry="12" fill="#0F172A"/>
    <ellipse cx="50" cy="170" rx="32" ry="12" fill="#0F172A"/>

    <!-- Lower Locking Aluminum Perches -->
    <rect x="26" y="195" width="48" height="10" rx="2" fill="#E11D48"/>
    <rect x="30" y="206" width="40" height="10" rx="2" fill="#BE123C"/>
    
    <!-- Lower Body & Mount Bushing -->
    <rect x="36" y="218" width="28" height="50" rx="4" fill="#0F172A"/>
    <circle cx="50" cy="285" r="18" fill="#0F172A"/>
    <circle cx="50" cy="285" r="10" fill="#E2E8F0"/>
  </g>

  <!-- 4. Automotive Alternator (Front Left) -->
  <g transform="translate(80, 160)">
    <!-- Alternator Ribbed Housing -->
    <ellipse cx="75" cy="80" rx="65" ry="60" fill="url(#altGrad)"/>
    <ellipse cx="75" cy="80" rx="55" ry="50" fill="#1E293B"/>
    <!-- Copper wire windings visible inside cooling slots -->
    <circle cx="75" cy="80" r="45" fill="none" stroke="#D97706" stroke-width="8" stroke-dasharray="10,6"/>
    <!-- Center Serpentine Pulley and Nut -->
    <circle cx="75" cy="80" r="28" fill="#475569"/>
    <circle cx="75" cy="80" r="22" fill="#E2E8F0"/>
    <polygon points="75,70 84,75 84,85 75,90 66,85 66,75" fill="#0F172A"/>
    <!-- Mounting ears with bolt holes -->
    <rect x="5" y="60" width="20" height="24" rx="6" fill="#64748B"/>
    <circle cx="15" cy="72" r="5" fill="#0F172A"/>
    <rect x="125" y="60" width="20" height="24" rx="6" fill="#64748B"/>
    <circle cx="135" cy="72" r="5" fill="#0F172A"/>
  </g>

  <!-- 5. Yellow Pleated Paper Oil Filter Cartridge (Front Right) -->
  <g transform="translate(285, 175)">
    <!-- Black Base and Top Rubber Caps -->
    <ellipse cx="45" cy="20" rx="38" ry="12" fill="#0F172A"/>
    <!-- Yellow accordion pleats -->
    <rect x="8" y="20" width="74" height="75" fill="#FACC15"/>
    <!-- Dark vertical pleat grooves -->
    <line x1="16" y1="20" x2="16" y2="95" stroke="#CA8A04" stroke-width="2"/>
    <line x1="24" y1="20" x2="24" y2="95" stroke="#CA8A04" stroke-width="2"/>
    <line x1="32" y1="20" x2="32" y2="95" stroke="#CA8A04" stroke-width="2"/>
    <line x1="40" y1="20" x2="40" y2="95" stroke="#CA8A04" stroke-width="2"/>
    <line x1="48" y1="20" x2="48" y2="95" stroke="#CA8A04" stroke-width="2"/>
    <line x1="56" y1="20" x2="56" y2="95" stroke="#CA8A04" stroke-width="2"/>
    <line x1="64" y1="20" x2="64" y2="95" stroke="#CA8A04" stroke-width="2"/>
    <line x1="72" y1="20" x2="72" y2="95" stroke="#CA8A04" stroke-width="2"/>
    <!-- Bottom rubber flange cap -->
    <ellipse cx="45" cy="95" rx="38" ry="12" fill="#0F172A"/>
    <ellipse cx="45" cy="92" rx="36" ry="10" fill="#334155"/>
  </g>
</svg>
`;

async function run() {
  console.log('Generating Authentic Pixel-Perfect Assets...');

  // 1. Car Brands (200x200)
  await saveSvgToPng(svgMarutiSuzuki, 'brands/maruti_suzuki', 200, 200, 'brand_maruti_suzuki');
  await saveSvgToPng(svgHyundai, 'brands/hyundai', 200, 200, 'brand_hyundai');
  await saveSvgToPng(svgTata, 'brands/tata', 200, 200, 'brand_tata');
  await saveSvgToPng(svgMahindra, 'brands/mahindra', 200, 200, 'brand_mahindra');
  await saveSvgToPng(svgToyota, 'brands/toyota', 200, 200, 'brand_toyota');

  // 2. 3D Categories (256x256)
  await saveSvgToPng(svgCatEngine, 'categories/engine', 256, 256, 'cat_engine');
  await saveSvgToPng(svgCatBody, 'categories/body', 256, 256, 'cat_body');
  await saveSvgToPng(svgCatElectricals, 'categories/electricals', 256, 256, 'cat_electricals');
  await saveSvgToPng(svgCatSuspension, 'categories/suspension', 256, 256, 'cat_suspension');
  await saveSvgToPng(svgCatExhaust, 'categories/exhaust', 256, 256, 'cat_exhaust');
  await saveSvgToPng(svgCatMore, 'categories/more', 256, 256, 'cat_more');

  // 3. Hero Banner Right Art (500x380)
  await saveSvgToPng(svgBannerParts, 'banner/hero_parts_collage', 500, 380, 'banner_parts_collage');

  console.log('All Reference Assets Generated Successfully!');
}

run().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
