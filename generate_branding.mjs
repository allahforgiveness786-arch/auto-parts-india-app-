import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Generate SVG of the exact Electric Blue + White geometric triangle chevron + diamond on black
const svgLogo = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#000000"/>
  
  <!-- Outer Blue Chevron -->
  <polygon points="512,140 890,520 770,520 512,260 254,520 134,520" fill="#0066FF"/>
  
  <!-- Middle White Chevron -->
  <polygon points="512,295 780,565 660,565 512,415 364,565 244,565" fill="#FFFFFF"/>
  
  <!-- Inner Blue Chevron -->
  <polygon points="512,450 670,610 570,610 512,550 454,610 354,610" fill="#0066FF"/>
  
  <!-- Bottom White Diamond -->
  <polygon points="512,710 578,776 512,842 446,776" fill="#FFFFFF"/>
</svg>
`;

// Adaptive Foreground (with padding for Android Adaptive Icons)
const svgForeground = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer Blue Chevron -->
  <polygon points="512,230 790,510 700,510 512,320 324,510 234,510" fill="#0066FF"/>
  
  <!-- Middle White Chevron -->
  <polygon points="512,345 710,545 620,545 512,435 404,545 314,545" fill="#FFFFFF"/>
  
  <!-- Inner Blue Chevron -->
  <polygon points="512,460 630,580 555,580 512,535 469,580 394,580" fill="#0066FF"/>
  
  <!-- Bottom White Diamond -->
  <polygon points="512,655 560,705 512,755 464,705" fill="#FFFFFF"/>
</svg>
`;

async function generateAssets() {
  const baseDir = path.join(process.cwd(), 'react-native-app/android/app/src/main/res');
  const svgBuffer = Buffer.from(svgLogo);
  const fgBuffer = Buffer.from(svgForeground);

  const mipmaps = [
    { dir: 'mipmap-mdpi', size: 48, fgSize: 108 },
    { dir: 'mipmap-hdpi', size: 72, fgSize: 162 },
    { dir: 'mipmap-xhdpi', size: 96, fgSize: 216 },
    { dir: 'mipmap-xxhdpi', size: 144, fgSize: 324 },
    { dir: 'mipmap-xxxhdpi', size: 192, fgSize: 432 },
  ];

  for (const m of mipmaps) {
    const dirPath = path.join(baseDir, m.dir);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    // ic_launcher.png
    await sharp(svgBuffer).resize(m.size, m.size).png().toFile(path.join(dirPath, 'ic_launcher.png'));
    // ic_launcher_round.png
    await sharp(svgBuffer).resize(m.size, m.size).png().toFile(path.join(dirPath, 'ic_launcher_round.png'));
    // ic_launcher_foreground.png
    await sharp(fgBuffer).resize(m.fgSize, m.fgSize).png().toFile(path.join(dirPath, 'ic_launcher_foreground.png'));
    // ic_launcher_monochrome.png
    await sharp(svgBuffer).resize(m.size, m.size).grayscale().png().toFile(path.join(dirPath, 'ic_launcher_monochrome.png'));
  }

  const drawables = [
    { dir: 'drawable-mdpi', size: 160 },
    { dir: 'drawable-hdpi', size: 240 },
    { dir: 'drawable-xhdpi', size: 320 },
    { dir: 'drawable-xxhdpi', size: 480 },
    { dir: 'drawable-xxxhdpi', size: 640 },
  ];

  for (const d of drawables) {
    const dirPath = path.join(baseDir, d.dir);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    await sharp(svgBuffer).resize(d.size, d.size).png().toFile(path.join(dirPath, 'splash_logo.png'));
    await sharp(svgBuffer).resize(d.size, d.size).png().toFile(path.join(dirPath, 'master_logo.png'));
  }

  // Web & public icons
  const publicDir = path.join(process.cwd(), 'public');
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'app-icon.png'));
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'adaptive-icon.png'));
  await sharp(svgBuffer).resize(64, 64).png().toFile(path.join(publicDir, 'favicon.png'));

  // Also save to react-native-app/src/assets/logo.png for JS imports if needed
  const srcAssetsDir = path.join(process.cwd(), 'react-native-app/src/assets');
  if (!fs.existsSync(srcAssetsDir)) fs.mkdirSync(srcAssetsDir, { recursive: true });
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(srcAssetsDir, 'logo.png'));

  console.log('✅ Successfully generated all Android mipmaps, drawables, splash logos, and public branding assets with 100% precision!');
}

generateAssets().catch(console.error);
