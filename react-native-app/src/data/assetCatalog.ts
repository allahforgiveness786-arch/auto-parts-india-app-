// AutoParts India - Asset Catalog & 3D Asset Definitions
export interface AssetDefinition {
  id: string;
  name: string;
  category: string;
  badgeUrl: string;
  iconName: string;
  description: string;
}

export const CATEGORY_ASSETS: Record<string, AssetDefinition> = {
  engine: {
    id: 'engine',
    name: 'Engine & Parts',
    category: 'Engine',
    badgeUrl: 'https://images.unsplash.com/photo-1598209279122-8541213a0387?auto=format&fit=crop&q=80&w=260',
    iconName: 'engine',
    description: 'Genuine petrol and diesel engine assemblies, pistons, blocks, and turbos.',
  },
  body: {
    id: 'body',
    name: 'Body Parts',
    category: 'Body',
    badgeUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=260',
    iconName: 'car-door',
    description: 'Doors, bumpers, fenders, mirrors, grilles, and bonnets.',
  },
  electricals: {
    id: 'electricals',
    name: 'Electricals',
    category: 'Electricals',
    badgeUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&q=80&w=260',
    iconName: 'lightning-bolt',
    description: 'Headlights, taillights, alternators, sensors, and wiring harnesses.',
  },
  suspension: {
    id: 'suspension',
    name: 'Suspension',
    category: 'Suspension',
    badgeUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=260',
    iconName: 'car-brake-alert',
    description: 'Shock absorbers, coil springs, control arms, and disc brake rotors.',
  },
  exhaust: {
    id: 'exhaust',
    name: 'Exhaust',
    category: 'Exhaust',
    badgeUrl: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&q=80&w=260',
    iconName: 'pipe',
    description: 'Mufflers, catalytic converters, exhaust tips, and headers.',
  },
};

export const BRAND_EMBLEM_ASSETS: Record<string, string> = {
  'maruti suzuki': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=300',
  'hyundai': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=300',
  'tata': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=300',
  'mahindra': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=300',
  'toyota': 'https://images.unsplash.com/photo-1629897048994-3a992432614e?auto=format&fit=crop&q=80&w=300',
  'honda': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=300',
};

