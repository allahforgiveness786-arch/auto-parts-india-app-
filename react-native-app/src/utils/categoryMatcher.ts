/**
 * categoryMatcher.ts
 * Robust, fuzzy, and semantic automotive category matcher for spare parts.
 * Works with built-in categories as well as dynamic categories added via the Admin Panel.
 */

// Common semantic synonyms and keywords for automotive categories
const CATEGORY_SYNONYMS: Record<string, string[]> = {
  engine: ['engine', 'motor', 'cylinder', 'piston', 'turbo', 'crankshaft', 'camshaft', 'alternator', 'starter', 'fuel', 'injector', 'timing', 'oil pump', 'spark', 'mechanical'],
  mechanical: ['engine', 'motor', 'mechanical', 'alternator', 'starter', 'turbo', 'injector', 'manifold', 'cylinder'],
  body: ['body', 'bumper', 'bonnet', 'hood', 'door', 'fender', 'grille', 'mirror', 'windshield', 'glass', 'panel', 'boot', 'tailgate', 'exterior', 'handle'],
  exterior: ['body', 'bumper', 'bonnet', 'hood', 'door', 'fender', 'grille', 'mirror', 'windshield', 'glass', 'exterior'],
  lights: ['light', 'lights', 'lamp', 'lamps', 'headlight', 'headlights', 'taillight', 'taillights', 'fog', 'drl', 'indicator', 'bulb', 'led'],
  electrical: ['electrical', 'electricals', 'electric', 'wiring', 'harness', 'battery', 'ecu', 'ecm', 'bcm', 'sensor', 'fuse', 'relay', 'cluster', 'speedometer', 'switch', 'light', 'lamp'],
  suspension: ['suspension', 'shock', 'absorber', 'strut', 'spring', 'arm', 'control arm', 'bush', 'stabilizer', 'link', 'axle', 'joint'],
  brakes: ['brake', 'brakes', 'caliper', 'disc', 'rotor', 'pad', 'drum', 'booster', 'abs', 'master cylinder'],
  exhaust: ['exhaust', 'silencer', 'muffler', 'catalytic', 'converter', 'manifold', 'emission', 'pipe', 'tailpipe'],
  transmission: ['transmission', 'gearbox', 'gear', 'clutch', 'flywheel', 'differential', 'driveshaft', 'propeller', 'automatic', 'manual'],
  gearbox: ['transmission', 'gearbox', 'gear', 'clutch', 'flywheel', 'differential', 'driveshaft'],
  ac: ['ac', 'cooling', 'air condition', 'radiator', 'compressor', 'condenser', 'heater', 'blower', 'coolant', 'intercooler', 'thermostat'],
  cooling: ['ac', 'cooling', 'radiator', 'compressor', 'condenser', 'heater', 'blower', 'coolant', 'intercooler', 'fan'],
  tyres: ['tyre', 'tyres', 'tire', 'tires', 'wheel', 'wheels', 'rim', 'rims', 'alloy', 'alloys', 'hub'],
  wheels: ['tyre', 'tyres', 'tire', 'tires', 'wheel', 'wheels', 'rim', 'rims', 'alloy', 'alloys', 'hub'],
  interior: ['interior', 'seat', 'seats', 'cover', 'covers', 'dashboard', 'steering', 'audio', 'stereo', 'speaker', 'music', 'mats', 'infotainment', 'camera', 'gps', 'console'],
  audio: ['audio', 'stereo', 'speaker', 'music', 'sound', 'woofer', 'amplifier', 'infotainment', 'screen', 'display'],
};

// Stop words to ignore during word extraction
const STOP_WORDS = new Set(['and', '&', 'or', 'the', 'for', 'with', 'in', 'of', 'to', 'a', 'an', 'part', 'parts', 'auto', 'car', 'cars']);

/**
 * Normalizes text by removing special punctuation and converting to lowercase.
 */
function cleanTokens(str: string): string[] {
  if (!str) return [];
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Checks if a spare part matches a given category filter.
 * 
 * @param part The spare part object containing category, title, subCategory, description, etc.
 * @param selectedCategory The category name (from Home tabs, Admin categories, or search filters).
 * @returns boolean
 */
export function matchesCategoryFilter(part: any, selectedCategory: string): boolean {
  if (!selectedCategory) return true;
  
  const catTrimmed = selectedCategory.trim();
  if (
    catTrimmed === '' ||
    catTrimmed.toLowerCase() === 'all' ||
    catTrimmed.toLowerCase() === 'all categories' ||
    catTrimmed.toLowerCase() === 'more'
  ) {
    return true;
  }

  if (!part) return false;

  const partCategory = (part.category || '').toLowerCase().trim();
  const partSubCategory = (part.subCategory || part.subcategory || part.partType || '').toLowerCase().trim();
  const partTitle = (part.title || '').toLowerCase().trim();
  const partDescription = (part.description || '').toLowerCase().trim();
  const targetCategory = catTrimmed.toLowerCase();

  // 1. Direct match or Substring match
  if (partCategory === targetCategory) return true;
  if (partCategory && targetCategory.includes(partCategory)) return true;
  if (partCategory && partCategory.includes(targetCategory)) return true;

  // 2. Direct match on SubCategory
  if (partSubCategory === targetCategory || partSubCategory.includes(targetCategory) || targetCategory.includes(partSubCategory)) {
    return true;
  }

  // 3. Keyword Token matching
  const targetTokens = cleanTokens(targetCategory);
  if (targetTokens.length === 0) return true;

  // Build searchable text from part properties
  const combinedPartText = `${partCategory} ${partSubCategory} ${partTitle} ${partDescription}`;
  const partTokens = new Set(cleanTokens(combinedPartText));

  // Check if any target token directly exists in part's token set or combined text
  for (const token of targetTokens) {
    if (partTokens.has(token)) return true;
    if (partCategory.includes(token)) return true;
    if (partSubCategory.includes(token)) return true;
    if (partTitle.includes(token)) return true;

    // Check synonym expansions for this token
    const synonyms = CATEGORY_SYNONYMS[token];
    if (synonyms) {
      for (const syn of synonyms) {
        if (partTokens.has(syn)) return true;
        if (combinedPartText.includes(syn)) return true;
      }
    }
  }

  // Check reverse synonyms: If any token in the part's category matches the target token
  for (const partToken of cleanTokens(partCategory)) {
    const synonyms = CATEGORY_SYNONYMS[partToken];
    if (synonyms) {
      for (const targetToken of targetTokens) {
        if (synonyms.includes(targetToken)) return true;
      }
    }
  }

  return false;
}
