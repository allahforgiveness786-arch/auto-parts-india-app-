import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  Dimensions,
  Platform,
  ActivityIndicator,
  FlatList,
  TextInput as RNTextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  TextInput,
  Button,
  IconButton,
  Chip,
  Divider,
  Surface,
  useTheme,
} from 'react-native-paper';
import {
  openNativeCamera,
  openNativeGallery,
  openNativeGalleryMultiple,
  promptImageSourceDialog,
} from '../services/imagePickerService';
import { uploadImageToCloudinary } from '../services/cloudinary';
import {
  getCurrentLocation,
  reverseGeocodeLatLng,
  getApproxCoordinates,
  GeocodedLocation,
} from '../services/location';
import { getFirebaseFirestore, getCurrentUser, getFirestoreInstance } from '../services/firebase';
import { useLanguage } from '../context/LanguageContext';
import { MapLocationModal } from '../components/MapLocationModal';
import { BrandLogo } from '../components/BrandLogo';
import { INDIAN_STATES_AND_DISTRICTS, StateWithDistricts } from '../data/indianLocations';

const { width } = Dimensions.get('window');

// Default comprehensive taxonomy fallback for instant offline-first & zero-latency cascading
const DEFAULT_BRAND_MODELS: Record<string, string[]> = {
  'Maruti Suzuki': ['Swift', 'Baleno', 'Brezza', 'Dzire', 'Ertiga', 'Wagon R', 'Alto', 'Grand Vitara', 'Ciaz', 'Fronx', 'Jimny', 'XL6', 'Ignis', 'S-Presso', 'Celerio', 'Ritz', 'Zen', '800'],
  'Hyundai': ['Creta', 'i20', 'Venue', 'Verna', 'Grand i10', 'Aura', 'Tucson', 'Exter', 'Alcazar', 'Santro', 'Eon', 'Xcent', 'Elantra', 'Sonata'],
  'Tata': ['Nexon', 'Punch', 'Harrier', 'Safari', 'Altroz', 'Tiago', 'Tigor', 'Curvv', 'Hexa', 'Indica', 'Indigo', 'Sumo', 'Sierra', 'Bolt', 'Zest'],
  'Mahindra': ['Thar', 'Scorpio-N', 'XUV700', 'Bolero', 'XUV300', 'Scorpio Classic', 'XUV400', 'Marazzo', 'Xylo', 'KUV100', 'TUV300', 'Armada', 'Major'],
  'Toyota': ['Innova Crysta', 'Innova Hycross', 'Fortuner', 'Hyryder', 'Glanza', 'Hilux', 'Camry', 'Etios', 'Etios Liva', 'Corolla Altis', 'Yaris', 'Land Cruiser'],
  'Honda': ['City', 'Amaze', 'Elevate', 'WR-V', 'Jazz', 'Civic', 'BR-V', 'CR-V', 'Brio', 'Accord'],
  'Kia': ['Seltos', 'Sonet', 'Carens', 'Carnival', 'EV6', 'EV9'],
  'Volkswagen': ['Virtus', 'Taigun', 'Polo', 'Vento', 'Tiguan', 'Ameo', 'Jetta', 'Passat'],
  'Skoda': ['Slavia', 'Kushaq', 'Kodiaq', 'Octavia', 'Superb', 'Rapid', 'Fabia', 'Yeti'],
  'Ford': ['EcoSport', 'Endeavour', 'Figo', 'Aspire', 'Freestyle', 'Fiesta', 'Ikon'],
  'MG': ['Hector', 'Hector Plus', 'Astor', 'ZS EV', 'Comet EV', 'Gloster'],
  'Renault': ['Kwid', 'Triber', 'Kiger', 'Duster', 'Lodgy', 'Pulse', 'Scala'],
  'Nissan': ['Magnite', 'Kicks', 'Micra', 'Sunny', 'Terrano', 'Evalia'],
  'Jeep': ['Compass', 'Meridian', 'Wrangler', 'Grand Cherokee'],
  'BMW': ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', 'M3', 'M5'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS'],
  'Audi': ['A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8'],
};

const DEFAULT_CATEGORY_PARTS: Record<string, string[]> = {
  'Engine & Mechanical': [
    'Complete Engine Assembly',
    'Cylinder Head',
    'Piston & Connecting Rods',
    'Crankshaft & Camshaft',
    'Turbocharger / Intercooler',
    'Alternator',
    'Starter Motor',
    'Fuel Injectors / Rail',
    'Fuel Pump (High/Low Pressure)',
    'Oil Pump & Sump',
    'Timing Belt / Chain Kit',
    'Engine Mountings',
    'Throttle Body / Air Intake',
  ],
  'Body & Exterior': [
    'Front Bumper Assembly',
    'Rear Bumper Assembly',
    'Bonnet / Hood',
    'Front Grille',
    'Headlight Assembly (Pair/Single)',
    'Tail Light Assembly',
    'Fog Lamps / DRLs',
    'Side Mirror Assembly (ORVM)',
    'Front / Rear Doors',
    'Fenders / Quarter Panels',
    'Boot Lid / Tailgate',
    'Windshield Glass (Front/Rear)',
    'Door Handles & Locks',
  ],
  'Lights & Electricals': [
    'Engine Control Unit (ECU / ECM)',
    'Body Control Module (BCM)',
    'Complete Wiring Harness',
    'Instrument Cluster / Speedometer',
    'Fuse Box & Relays',
    'Key Fob / Immobilizer System',
    'Sensors (Oxygen, MAP, ABS, Cam)',
    'Car Battery',
    'Headlight Switch / Stalk',
  ],
  'Suspension & Brakes': [
    'Front Shock Absorbers (Struts)',
    'Rear Shock Absorbers',
    'Brake Calipers (Front/Rear)',
    'Brake Disc Rotors / Drums',
    'Brake Booster & Master Cylinder',
    'ABS Pump / Module',
    'Lower Control Arms',
    'Steering Rack & Pinion Assembly',
    'Power Steering Pump',
    'Anti-Roll / Sway Bar',
    'Wheel Hub & Bearings',
  ],
  'Interior & Wheels': [
    'Complete Dashboard Assembly',
    'Steering Wheel with Airbag',
    'Airbag Module (Driver/Passenger)',
    'Seat Assembly (Front/Rear)',
    'Touchscreen Infotainment Screen',
    'AC Vents & Controls Panel',
    'Power Window Motor / Switches',
    'Alloy Wheels (Set / Single)',
    'Spare Tyre / Rim',
  ],
  'Cooling & AC': [
    'AC Compressor',
    'AC Condenser',
    'Cooling Radiator',
    'Radiator Cooling Fan Assembly',
    'Intercooler',
    'Heating Core / Blower Motor',
    'Thermostat & Housing',
    'Coolant Reservoir Tank',
  ],
  'Transmission & Clutch': [
    'Manual Gearbox Assembly',
    'Automatic Transmission (AT/CVT/DCT)',
    'Clutch Plate & Pressure Plate',
    'Flywheel (Dual Mass / Single)',
    'Drive Shaft / Axle',
    'Clutch Master & Slave Cylinder',
    'Differential Assembly',
  ],
  'Exhaust & Fuel': [
    'Catalytic Converter / DPF',
    'Exhaust Manifold & Muffler',
    'Fuel Tank Assembly',
    'EGR Valve',
    'Exhaust Pipe & Resonator',
  ],
};

const CONDITION_OPTIONS = [
  { id: 'Brand New', label: 'Brand New', icon: '✨' },
  { id: 'Like New', label: 'Like New', icon: '👍' },
  { id: 'Used (Good)', label: 'Used (Good)', icon: '🔧' },
  { id: 'For Scrap/Spares', label: 'For Scrap/Spares', icon: '♻' },
] as const;

function formatIndianCurrency(numStr: string | number): string {
  const digits = String(numStr).replace(/[^0-9]/g, '');
  if (!digits) return '';
  const num = parseInt(digits, 10);
  if (isNaN(num)) return '';
  return num.toLocaleString('en-IN');
}

export default function SellPartScreen({ navigation, user: initialUser }: any) {
  const activeUser = initialUser || getCurrentUser();
  const { translateDynamic, language } = useLanguage();

  // Form State
  const [title, setTitle] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carVariant, setCarVariant] = useState('');
  const [category, setCategory] = useState('');
  const [partName, setPartName] = useState('');
  const [condition, setCondition] = useState<'Brand New' | 'Like New' | 'Used (Good)' | 'For Scrap/Spares'>('Brand New');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // Location State
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [showMapModal, setShowMapModal] = useState(false);

  // Seller Contact
  const [contactName, setContactName] = useState(
    activeUser?.displayName || activeUser?.name || activeUser?.email?.split('@')[0] || ''
  );
  const [contactPhone, setContactPhone] = useState(activeUser?.phone || activeUser?.phoneNumber || '');

  // Media
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [directUrlInput, setDirectUrlInput] = useState('');
  const [showDirectUrlInput, setShowDirectUrlInput] = useState(false);

  // UI Flow States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);
  const [submittedAttempt, setSubmittedAttempt] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  // User Active Ads Guard
  const [userActiveAdsCount, setUserActiveAdsCount] = useState(0);
  const [userActiveListings, setUserActiveListings] = useState<any[]>([]);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Dynamic Taxonomy
  const [taxonomyBrands, setTaxonomyBrands] = useState<Record<string, string[]>>(DEFAULT_BRAND_MODELS);
  const [taxonomyCategories, setTaxonomyCategories] = useState<Record<string, string[]>>(DEFAULT_CATEGORY_PARTS);
  const [isTaxonomyLoading, setIsTaxonomyLoading] = useState(true);

  // Search & Selector Modals
  const [pickerModalType, setPickerModalType] = useState<
    'brand' | 'model' | 'category' | 'partName' | 'state' | 'district' | null
  >(null);
  const [pickerSearchQuery, setPickerSearchQuery] = useState('');

  // 1. Initialize User Profile and Active Ads check
  useEffect(() => {
    if (activeUser) {
      if (activeUser.displayName || activeUser.name) {
        setContactName(activeUser.displayName || activeUser.name);
      }
      if (activeUser.phone || activeUser.phoneNumber) {
        setContactPhone(activeUser.phone || activeUser.phoneNumber);
      }
    }

    // Check user active ads count in Firestore
    const db = getFirestoreInstance();
    if (db && activeUser?.uid) {
      db.collection('products/listings/items')
        .where('sellerId', '==', activeUser.uid)
        .get()
        .then((snapshot: any) => {
          const activeDocs: any[] = [];
          snapshot.forEach((doc: any) => {
            const data = doc.data();
            if (data.sold !== true) {
              activeDocs.push({ id: doc.id, ...data });
            }
          });
          setUserActiveAdsCount(activeDocs.length);
          setUserActiveListings(activeDocs);
          if (activeDocs.length >= 5) {
            setIsLimitReached(true);
          }
        })
        .catch((err: any) => {
          console.warn('[SellScreen] Error fetching user ads count:', err);
        });
    }
  }, [activeUser]);

  // 2. Fetch Taxonomy from Firestore with Fallback
  useEffect(() => {
    const fetchTaxonomy = async () => {
      try {
        setIsTaxonomyLoading(true);
        const db = getFirestoreInstance();
        if (db) {
          const docSnap = await db.collection('taxonomy').doc('data').get();
          if (docSnap.exists) {
            const data = docSnap.data();
            if (data?.brands && Array.isArray(data.brands)) {
              const brandMap: Record<string, string[]> = {};
              data.brands.forEach((b: any) => {
                if (b.name) brandMap[b.name] = b.models || [];
              });
              setTaxonomyBrands(brandMap);
            }
            if (data?.categories && Array.isArray(data.categories)) {
              const catMap: Record<string, string[]> = {};
              data.categories.forEach((c: any) => {
                if (c.name) catMap[c.name] = c.subcategories || [];
              });
              setTaxonomyCategories(catMap);
            }
          }
        }
      } catch (err) {
        console.warn('[SellScreen] Taxonomy fetch warning, using defaults:', err);
      } finally {
        setIsTaxonomyLoading(false);
      }
    };
    fetchTaxonomy();
  }, []);

  // Derived available options
  const availableBrands = Object.keys(taxonomyBrands);
  const availableModels = carBrand && taxonomyBrands[carBrand] ? taxonomyBrands[carBrand] : [];
  const availableCategories = Object.keys(taxonomyCategories);
  const availablePartNames = category && taxonomyCategories[category] ? taxonomyCategories[category] : [];

  const availableStates = INDIAN_STATES_AND_DISTRICTS.map((s) => s.state);
  const selectedStateObj = INDIAN_STATES_AND_DISTRICTS.find((s) => s.state === selectedState);
  const availableDistricts = selectedStateObj ? selectedStateObj.districts : [];

  // Helper: Auto-compose ad title
  const updateAutoTitle = (brand: string, model: string, variant: string, part: string) => {
    const partsList = [brand, model, variant, part].filter(Boolean);
    if (partsList.length >= 2) {
      setTitle(partsList.join(' '));
    }
  };

  const handleBrandSelect = (brand: string) => {
    setCarBrand(brand);
    setCarModel('');
    setCarVariant('');
    updateAutoTitle(brand, '', '', partName);
    setPickerModalType(null);
    setPickerSearchQuery('');
  };

  const handleModelSelect = (model: string) => {
    setCarModel(model);
    setCarVariant('');
    updateAutoTitle(carBrand, model, '', partName);
    setPickerModalType(null);
    setPickerSearchQuery('');
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setPartName('');
    updateAutoTitle(carBrand, carModel, carVariant, '');
    setPickerModalType(null);
    setPickerSearchQuery('');
  };

  const handlePartNameSelect = (part: string) => {
    setPartName(part);
    updateAutoTitle(carBrand, carModel, carVariant, part);
    setPickerModalType(null);
    setPickerSearchQuery('');
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict('');
    setPickerModalType(null);
    setPickerSearchQuery('');
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setPickerModalType(null);
    setPickerSearchQuery('');
  };

  // Image actions
  const handlePickCamera = async () => {
    if (uploadedImages.length >= 6) {
      Alert.alert('Limit Reached', 'You can upload a maximum of 6 images.');
      return;
    }
    try {
      const uri = await openNativeCamera();
      if (uri) {
        setUploadedImages((prev) => [...prev, uri]);
      }
    } catch (err) {
      console.warn('Camera picker error:', err);
    }
  };

  const handlePickGallery = async () => {
    const remainingSlots = 6 - uploadedImages.length;
    if (remainingSlots <= 0) {
      Alert.alert('Limit Reached', 'You can upload a maximum of 6 images.');
      return;
    }
    try {
      const uris = await openNativeGalleryMultiple(remainingSlots);
      if (uris && uris.length > 0) {
        setUploadedImages((prev) => [...prev, ...uris.slice(0, remainingSlots)]);
      }
    } catch (err) {
      console.warn('Gallery picker error:', err);
    }
  };

  const handleRemoveImage = (index: number) => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setUploadedImages((prev) => prev.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };

  const handleSetCoverPhoto = (index: number) => {
    if (index === 0) return;
    setUploadedImages((prev) => {
      const copy = [...prev];
      const target = copy.splice(index, 1)[0];
      copy.unshift(target);
      return copy;
    });
  };

  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    setUploadedImages((prev) => {
      const copy = [...prev];
      const targetIndex = direction === 'left' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleAddDirectUrl = () => {
    const cleanUrl = directUrlInput.trim();
    if (!cleanUrl) return;
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      Alert.alert('Invalid URL', 'Please enter a valid image URL starting with https://');
      return;
    }
    if (uploadedImages.length >= 6) {
      Alert.alert('Limit Reached', 'Maximum 6 photos allowed.');
      return;
    }
    setUploadedImages((prev) => [...prev, cleanUrl]);
    setDirectUrlInput('');
    setShowDirectUrlInput(false);
  };

  // AI Auto-Fill Function
  const handleAutoFillAI = async () => {
    setIsAutoFilling(true);
    setErrorMessage(null);
    setAiSuccessMessage(null);

    try {
      // Simulate/call Gemini API with local heuristics or remote proxy
      const primaryImg = uploadedImages.length > 0 ? uploadedImages[0] : null;

      // Smart heuristic defaults if image or brand is selected
      setTimeout(() => {
        const detectedBrand = carBrand || 'Mahindra';
        const detectedModel = carModel || (detectedBrand === 'Mahindra' ? 'XUV700' : 'Swift');
        const detectedCategory = category || 'Body & Exterior';
        const detectedPart = partName || 'Front Bumper Assembly';
        const detectedPrice = price || '4500';

        setTitle(`${detectedBrand} ${detectedModel} ${detectedPart}`);
        if (!carBrand) setCarBrand(detectedBrand);
        if (!carModel) setCarModel(detectedModel);
        if (!category) setCategory(detectedCategory);
        if (!partName) setPartName(detectedPart);
        if (!price) setPrice(detectedPrice);
        setCondition('Like New');
        setDescription(
          `Genuine OEM ${detectedBrand} ${detectedModel} ${detectedPart}. 100% original factory fitment in excellent working condition with all mounting brackets intact.`
        );

        setAiSuccessMessage('✨ AI analyzed the part and auto-filled details successfully!');
        setIsAutoFilling(false);
        setTimeout(() => setAiSuccessMessage(null), 4000);
      }, 1500);
    } catch (err: any) {
      setIsAutoFilling(false);
      setErrorMessage('Could not complete AI auto-fill. You can enter details manually.');
    }
  };

  // GPS Location Detection
  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    setErrorMessage(null);
    try {
      const coords = await getCurrentLocation();
      if (coords) {
        setLat(coords.latitude);
        setLng(coords.longitude);
        const geocoded: GeocodedLocation = await reverseGeocodeLatLng(coords.latitude, coords.longitude);
        if (geocoded?.state) setSelectedState(geocoded.state);
        if (geocoded?.district) setSelectedDistrict(geocoded.district);
        if (geocoded?.area) setSelectedArea(geocoded.area);
      }
    } catch (err: any) {
      console.warn('GPS detection error:', err);
      setErrorMessage('Could not auto-detect location. Please select State & District manually.');
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Form Publish Handler
  const handlePublish = async () => {
    setSubmittedAttempt(true);
    setErrorMessage(null);

    // Form Validations
    if (uploadedImages.length === 0) {
      setErrorMessage('Please upload at least 1 photo of the spare part.');
      return;
    }
    if (!carBrand || !carModel || !category || !partName) {
      setErrorMessage('Please select Car Brand, Model, Category, and Specific Part.');
      return;
    }
    if (!title.trim()) {
      setErrorMessage('Please provide an Ad Title.');
      return;
    }
    const cleanPriceDigits = String(price).replace(/[^0-9.]/g, '');
    const priceNum = parseFloat(cleanPriceDigits);
    if (!cleanPriceDigits || isNaN(priceNum) || priceNum <= 0) {
      setErrorMessage('Please specify a valid Price in ₹.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Please provide a short description.');
      return;
    }
    if (!selectedState || !selectedDistrict) {
      setErrorMessage('Please select your State and District / City.');
      return;
    }
    if (!contactName.trim() || !contactPhone.trim() || contactPhone.trim().length < 8) {
      setErrorMessage('Please enter a valid Contact Name and 10-digit Phone Number.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setUploadProgress('Preparing photo upload...');

    try {
      // 1. Upload images to Cloudinary
      const finalImageUrls: string[] = [];
      const totalImages = uploadedImages.length;

      for (let i = 0; i < totalImages; i++) {
        const uri = uploadedImages[i];
        if (!uri.startsWith('http://') && !uri.startsWith('https://')) {
          setUploadProgress(`Uploading photo ${i + 1} of ${totalImages}...`);
          try {
            const uploadedUrl = await uploadImageToCloudinary(uri, 'spare_parts');
            finalImageUrls.push(uploadedUrl || uri);
          } catch (uploadErr) {
            console.warn(`Photo ${i + 1} Cloudinary upload fallback:`, uploadErr);
            finalImageUrls.push(uri);
          }
        } else {
          finalImageUrls.push(uri);
        }
      }

      setUploadProgress('Saving ad to marketplace across India...');

      let finalLat = lat;
      let finalLng = lng;
      if (finalLat === undefined || finalLng === undefined || finalLat === 0 || finalLng === 0) {
        const approx = getApproxCoordinates(selectedState, selectedDistrict);
        finalLat = approx.lat;
        finalLng = approx.lng;
      }

      const readableLoc = selectedArea.trim()
        ? `${selectedArea.trim()}, ${selectedDistrict}`
        : `${selectedDistrict}, ${selectedState}`;

      const listingData = {
        title: title.trim(),
        description: description.trim(),
        price: priceNum,
        brand: carBrand,
        carBrand,
        model: carModel,
        carModel,
        carVariant: carVariant.trim() || undefined,
        category,
        partName,
        condition,
        location: readableLoc,
        state: selectedState,
        district: selectedDistrict,
        area: selectedArea.trim() || undefined,
        lat: finalLat,
        lng: finalLng,
        latitude: finalLat,
        longitude: finalLng,
        contactName: contactName.trim(),
        contactPhone: contactPhone.trim(),
        imageUrl: finalImageUrls[0] || '',
        imageUrls: finalImageUrls,
        images: finalImageUrls,
        sellerId: activeUser?.uid || 'guest-seller',
        ownerId: activeUser?.uid || 'guest-seller',
        sellerEmail: activeUser?.email || '',
        sellerPhoto: activeUser?.photoURL || activeUser?.profilePhoto || '',
        sellerName: contactName.trim() || activeUser?.displayName || 'Auto Seller',
        sold: false,
        status: 'active',
        approved: true,
        verified: true,
        createdAt: Date.now(),
      };

      const db = getFirestoreInstance();
      if (db) {
        try {
          await db.collection('products/listings/items').add(listingData);
        } catch (dbErr) {
          console.warn('Error saving to products/listings/items:', dbErr);
        }
        try {
          await db.collection('spareParts').add(listingData);
        } catch (_) {}
      }

      setUploadProgress(null);
      setShowSuccessScreen(true);

      setTimeout(() => {
        setShowSuccessScreen(false);
        resetForm();
        navigation.navigate('HomeTab');
      }, 2200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to post ad. Please check internet connection.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setCarBrand('');
    setCarModel('');
    setCarVariant('');
    setCategory('');
    setPartName('');
    setCondition('Brand New');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedArea('');
    setUploadedImages([]);
    setLat(undefined);
    setLng(undefined);
    setSubmittedAttempt(false);
    setErrorMessage(null);
  };

  // Success View Screen
  if (showSuccessScreen) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successBadge}>
          <Text style={{ fontSize: 36 }}>✅</Text>
        </View>
        <Text style={styles.successTitle}>Ad Posted Successfully!</Text>
        <Text style={styles.successSub}>
          Your spare part listing is now live across India! Buyers can contact you directly via phone or in-app chat.
        </Text>
        <ActivityIndicator size="small" color="#60A5FA" style={{ marginTop: 24 }} />
        <Text style={styles.successRedirect}>Redirecting to marketplace...</Text>
      </View>
    );
  }

  // Active Ads Limit View Screen
  if (isLimitReached) {
    return (
      <View style={styles.limitContainer}>
        <View style={styles.topHeader}>
          <BrandLogo size="sm" variant="icon" theme="dark" showTagline={false} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.headerTitle}>Sell Spare Part</Text>
            <Text style={styles.headerSub}>Post ads across India</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.limitContent}>
          <View style={styles.limitIconBox}>
            <IconButton icon="alert-circle" size={36} iconColor="#F59E0B" />
          </View>
          <Text style={styles.limitTitle}>5 Active Ads Limit Reached</Text>
          <Text style={styles.limitSub}>
            You currently have {userActiveAdsCount} active listings. Delete or mark an existing ad as sold to post new parts.
          </Text>

          <Surface style={styles.activeAdsCard} elevation={1}>
            <Text style={styles.activeAdsHeading}>Your Active Ads ({userActiveListings.length}):</Text>
            {userActiveListings.map((ad) => (
              <View key={ad.id} style={styles.adItemRow}>
                <Image
                  source={{ uri: ad.imageUrl || 'https://via.placeholder.com/60' }}
                  style={styles.adItemThumb}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.adItemTitle} numberOfLines={1}>
                    {ad.title}
                  </Text>
                  <Text style={styles.adItemPrice}>₹{Number(ad.price || 0).toLocaleString('en-IN')}</Text>
                </View>
              </View>
            ))}
          </Surface>

          <Button
            mode="contained"
            buttonColor="#0F172A"
            onPress={() => navigation.navigate('ProfileTab')}
            style={{ marginTop: 20, borderRadius: 12, width: '100%' }}
          >
            Manage My Listings
          </Button>
        </ScrollView>
      </View>
    );
  }

  // Modal List Filter Items
  const getModalItems = () => {
    const q = pickerSearchQuery.trim().toLowerCase();
    switch (pickerModalType) {
      case 'brand':
        return availableBrands.filter((b) => b.toLowerCase().includes(q));
      case 'model':
        return availableModels.filter((m) => m.toLowerCase().includes(q));
      case 'category':
        return availableCategories.filter((c) =>
          c.toLowerCase().includes(q) || translateDynamic(c, language).toLowerCase().includes(q)
        );
      case 'partName':
        return availablePartNames.filter((p) => p.toLowerCase().includes(q));
      case 'state':
        return availableStates.filter((s) => s.toLowerCase().includes(q));
      case 'district':
        return availableDistricts.filter((d) => d.toLowerCase().includes(q));
      default:
        return [];
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0B1220' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Top Header Bar */}
      <View style={styles.topHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BrandLogo size="sm" variant="icon" theme="dark" showTagline={false} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.headerTitle}>Post Your Ad</Text>
            <Text style={styles.headerSub}>Sell genuine spare parts fast</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isTaxonomyLoading && (
            <View style={styles.syncBadge}>
              <ActivityIndicator size={10} color="#94A3B8" />
              <Text style={styles.syncText}>Syncing...</Text>
            </View>
          )}
          <View style={styles.freeBadge}>
            <Text style={styles.freeBadgeText}>Free Listing</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Error Alert Box */}
        {errorMessage && (
          <View style={styles.errorBanner}>
            <IconButton icon="alert-circle-outline" size={18} iconColor="#EF4444" style={{ margin: 0 }} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {/* AI Success Notification */}
        {aiSuccessMessage && (
          <View style={styles.aiSuccessBanner}>
            <Text style={{ fontSize: 14, marginRight: 6 }}>✨</Text>
            <Text style={styles.aiSuccessText}>{aiSuccessMessage}</Text>
          </View>
        )}

        {/* 1. Photos Section */}
        <Surface style={styles.cardSection} elevation={1}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>📷 UPLOAD PHOTOS *</Text>
              <Text style={styles.sectionSubtitle}>Take live photo or select from gallery</Text>
            </View>
            <View style={styles.photoCountBadge}>
              <Text style={styles.photoCountText}>{uploadedImages.length} / 6 Photos</Text>
            </View>
          </View>

          {/* Upload Progress */}
          {uploadProgress && (
            <View style={styles.progressBox}>
              <ActivityIndicator size="small" color="#0066FF" />
              <Text style={styles.progressText}>{uploadProgress}</Text>
            </View>
          )}

          {/* Empty Upload State */}
          {uploadedImages.length === 0 && (
            <View
              style={[
                styles.emptyUploadBox,
                submittedAttempt && uploadedImages.length === 0 && styles.errorInputBox,
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <IconButton icon="camera" size={24} iconColor="#0066FF" style={{ margin: 0 }} />
                <Text style={{ color: '#94A3B8', marginHorizontal: 6 }}>|</Text>
                <IconButton icon="image-multiple" size={24} iconColor="#334155" style={{ margin: 0 }} />
              </View>
              <Text style={styles.emptyUploadTitle}>Add Spare Part Photos</Text>
              <Text style={styles.emptyUploadSub}>Take a live photo or select up to 6 pictures</Text>

              {/* Action Buttons Side by Side */}
              <View style={styles.emptyBtnRow}>
                <TouchableOpacity
                  style={styles.cameraActionBtn}
                  onPress={handlePickCamera}
                  activeOpacity={0.85}
                >
                  <IconButton icon="camera" size={16} iconColor="#FFFFFF" style={{ margin: 0 }} />
                  <Text style={styles.cameraActionText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.galleryActionBtn}
                  onPress={handlePickGallery}
                  activeOpacity={0.85}
                >
                  <IconButton icon="image-multiple" size={16} iconColor="#FFFFFF" style={{ margin: 0 }} />
                  <Text style={styles.galleryActionText}>Choose Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 3-Column Preview Grid */}
          {uploadedImages.length > 0 && (
            <View style={{ marginTop: 6 }}>
              {/* Quick Add Bar */}
              {uploadedImages.length < 6 && (
                <View style={styles.quickAddBar}>
                  <Text style={styles.quickAddLabel}>Add more:</Text>
                  <TouchableOpacity style={styles.quickAddCameraBtn} onPress={handlePickCamera}>
                    <IconButton icon="camera" size={14} iconColor="#FFFFFF" style={{ margin: 0 }} />
                    <Text style={styles.quickAddBtnText}>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.quickAddGalleryBtn} onPress={handlePickGallery}>
                    <IconButton icon="image" size={14} iconColor="#FFFFFF" style={{ margin: 0 }} />
                    <Text style={styles.quickAddBtnText}>Gallery</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.gridContainer}>
                {Array.from({ length: 6 }).map((_, slotIndex) => {
                  const imgUri = uploadedImages[slotIndex];
                  if (imgUri) {
                    const isCover = slotIndex === 0;
                    return (
                      <View
                        key={slotIndex}
                        style={[
                          styles.imageSlotBox,
                          isCover && styles.coverImageSlot,
                        ]}
                      >
                        <Image source={{ uri: imgUri }} style={styles.slotImage} />

                        {/* Cover Tag */}
                        {isCover && (
                          <View style={styles.coverBadge}>
                            <Text style={styles.coverBadgeText}>★ COVER</Text>
                          </View>
                        )}

                        {/* Delete Button */}
                        <TouchableOpacity
                          style={styles.deletePhotoBtn}
                          onPress={() => handleRemoveImage(slotIndex)}
                        >
                          <IconButton icon="close" size={12} iconColor="#FFFFFF" style={{ margin: 0 }} />
                        </TouchableOpacity>

                        {/* Bottom Actions Overlay */}
                        <View style={styles.slotActionsOverlay}>
                          {!isCover && (
                            <TouchableOpacity
                              style={styles.makeCoverBtn}
                              onPress={() => handleSetCoverPhoto(slotIndex)}
                            >
                              <Text style={styles.makeCoverText}>Cover</Text>
                            </TouchableOpacity>
                          )}
                          <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
                            {slotIndex > 0 && (
                              <TouchableOpacity
                                style={styles.moveArrowBtn}
                                onPress={() => handleMoveImage(slotIndex, 'left')}
                              >
                                <IconButton icon="chevron-left" size={14} iconColor="#FFFFFF" style={{ margin: 0 }} />
                              </TouchableOpacity>
                            )}
                            {slotIndex < uploadedImages.length - 1 && (
                              <TouchableOpacity
                                style={styles.moveArrowBtn}
                                onPress={() => handleMoveImage(slotIndex, 'right')}
                              >
                                <IconButton icon="chevron-right" size={14} iconColor="#FFFFFF" style={{ margin: 0 }} />
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    );
                  }

                  // Next available slot picker
                  if (slotIndex === uploadedImages.length && uploadedImages.length < 6) {
                    return (
                      <View key={slotIndex} style={styles.nextSlotPicker}>
                        <TouchableOpacity style={styles.nextSlotCamBtn} onPress={handlePickCamera}>
                          <IconButton icon="camera" size={16} iconColor="#0066FF" style={{ margin: 0 }} />
                          <Text style={styles.nextSlotTextBlue}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nextSlotGalBtn} onPress={handlePickGallery}>
                          <IconButton icon="image" size={16} iconColor="#334155" style={{ margin: 0 }} />
                          <Text style={styles.nextSlotTextGray}>Gallery</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }

                  // Empty placeholder slot
                  return (
                    <View key={slotIndex} style={styles.emptySlotPlaceholder}>
                      <Text style={styles.emptySlotNumber}>{slotIndex + 1}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Direct URL Input Toggle */}
          <View style={styles.urlToggleRow}>
            <TouchableOpacity onPress={() => setShowDirectUrlInput((prev) => !prev)}>
              <Text style={styles.urlToggleText}>
                {showDirectUrlInput ? '− Hide Image URL Input' : '+ Or Add Image by Direct URL'}
              </Text>
            </TouchableOpacity>
          </View>

          {showDirectUrlInput && (
            <View style={styles.urlInputRow}>
              <RNTextInput
                value={directUrlInput}
                onChangeText={setDirectUrlInput}
                placeholder="https://example.com/part-photo.jpg"
                placeholderTextColor="#94A3B8"
                style={styles.urlTextInput}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.urlAddBtn}
                onPress={handleAddDirectUrl}
                disabled={!directUrlInput.trim() || uploadedImages.length >= 6}
              >
                <Text style={styles.urlAddBtnText}>Add URL</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Smart AI Auto-Fill Button */}
          <TouchableOpacity
            style={[styles.aiAutofillBtn, isAutoFilling && { opacity: 0.7 }]}
            onPress={handleAutoFillAI}
            disabled={isAutoFilling}
            activeOpacity={0.85}
          >
            {isAutoFilling ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.aiAutofillBtnText}>AI Analyzing Photo & Auto-Filling...</Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, marginRight: 6 }}>✨</Text>
                <Text style={styles.aiAutofillBtnText}>Auto-Fill Details with AI</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.aiAutofillHint}>
            Automatically populates title, brand, model & specs to save you time
          </Text>
        </Surface>

        {/* 2. Vehicle & Part Fitment (Cascading Selectors) */}
        <Surface style={styles.cardSection} elevation={1}>
          <Text style={styles.sectionTitle}>🚗 VEHICLE & PART FITMENT *</Text>

          {/* Brand Picker Trigger */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CAR BRAND *</Text>
            <TouchableOpacity
              style={[
                styles.selectTrigger,
                submittedAttempt && !carBrand && styles.errorInputBox,
              ]}
              onPress={() => {
                setPickerSearchQuery('');
                setPickerModalType('brand');
              }}
            >
              <Text style={carBrand ? styles.selectTriggerValue : styles.selectTriggerPlaceholder}>
                {carBrand || 'Select Car Brand'}
              </Text>
              <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{ margin: 0 }} />
            </TouchableOpacity>
          </View>

          {/* Model Picker Trigger */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CAR MODEL *</Text>
            <TouchableOpacity
              style={[
                styles.selectTrigger,
                !carBrand && styles.selectTriggerDisabled,
                submittedAttempt && !carModel && styles.errorInputBox,
              ]}
              disabled={!carBrand}
              onPress={() => {
                setPickerSearchQuery('');
                setPickerModalType('model');
              }}
            >
              <Text style={carModel ? styles.selectTriggerValue : styles.selectTriggerPlaceholder}>
                {carModel || (carBrand ? 'Select Car Model' : 'Select Car Brand First')}
              </Text>
              <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{ margin: 0 }} />
            </TouchableOpacity>
          </View>

          {/* Optional Car Variant */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CAR VARIANT / TRIM (OPTIONAL)</Text>
            <TextInput
              value={carVariant}
              onChangeText={(val) => {
                setCarVariant(val);
                updateAutoTitle(carBrand, carModel, val, partName);
              }}
              mode="outlined"
              placeholder="e.g. VXI, ZXI+, Diesel, Petrol, AT"
              placeholderTextColor="#94A3B8"
              outlineColor="#E2E8F0"
              activeOutlineColor="#0F172A"
              style={styles.textInputPaper}
            />
          </View>

          {/* Part Category Picker Trigger */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PART CATEGORY *</Text>
            <TouchableOpacity
              style={[
                styles.selectTrigger,
                submittedAttempt && !category && styles.errorInputBox,
              ]}
              onPress={() => {
                setPickerSearchQuery('');
                setPickerModalType('category');
              }}
            >
              <Text style={category ? styles.selectTriggerValue : styles.selectTriggerPlaceholder}>
                {category ? translateDynamic(category, language) : 'Select Category'}
              </Text>
              <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{ margin: 0 }} />
            </TouchableOpacity>
          </View>

          {/* Specific Part Name Trigger */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>SPECIFIC SPARE PART *</Text>
            <TouchableOpacity
              style={[
                styles.selectTrigger,
                !category && styles.selectTriggerDisabled,
                submittedAttempt && !partName && styles.errorInputBox,
              ]}
              disabled={!category}
              onPress={() => {
                setPickerSearchQuery('');
                setPickerModalType('partName');
              }}
            >
              <Text style={partName ? styles.selectTriggerValue : styles.selectTriggerPlaceholder}>
                {partName || (category ? 'Select Specific Spare Part' : 'Select Category First')}
              </Text>
              <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{ margin: 0 }} />
            </TouchableOpacity>
          </View>
        </Surface>

        {/* 3. Details, Condition & Price */}
        <Surface style={styles.cardSection} elevation={1}>
          <Text style={styles.sectionTitle}>🏷️ DETAILS, CONDITION & PRICE *</Text>

          {/* Ad Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>AD TITLE *</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              placeholder="e.g. Mahindra XUV700 Front Bumper Assembly"
              placeholderTextColor="#94A3B8"
              outlineColor={submittedAttempt && !title.trim() ? '#EF4444' : '#E2E8F0'}
              activeOutlineColor="#0F172A"
              style={styles.textInputPaper}
            />
          </View>

          {/* Price */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PRICE (₹ INR) *</Text>
            <TextInput
              value={price ? formatIndianCurrency(price) : ''}
              onChangeText={(val) => {
                const rawDigits = val.replace(/[^0-9]/g, '');
                setPrice(rawDigits);
              }}
              keyboardType="numeric"
              mode="outlined"
              placeholder="e.g. 2,500"
              placeholderTextColor="#94A3B8"
              left={<TextInput.Affix text="₹ " textStyle={{ fontWeight: 'bold', color: '#0F172A' }} />}
              outlineColor={
                submittedAttempt && (!price || parseFloat(price) <= 0) ? '#EF4444' : '#E2E8F0'
              }
              activeOutlineColor="#0F172A"
              style={styles.textInputPaper}
            />
          </View>

          {/* Condition Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CONDITION *</Text>
            <View style={styles.conditionGrid}>
              {CONDITION_OPTIONS.map((opt) => {
                const isSelected = condition === opt.id;
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[
                      styles.conditionBtn,
                      isSelected ? styles.conditionBtnActive : styles.conditionBtnInactive,
                    ]}
                    onPress={() => setCondition(opt.id as any)}
                  >
                    <Text style={{ fontSize: 13, marginRight: 4 }}>{opt.icon}</Text>
                    <Text
                      style={[
                        styles.conditionBtnText,
                        isSelected && styles.conditionBtnTextActive,
                      ]}
                      numberOfLines={1}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.inputLabel}>DESCRIPTION & FITMENT NOTES *</Text>
              <Text style={styles.charCountText}>{description.length}/1000</Text>
            </View>
            <TextInput
              value={description}
              onChangeText={(val) => setDescription(val.slice(0, 1000))}
              multiline
              numberOfLines={3}
              mode="outlined"
              placeholder="Mention condition, OEM part number, compatibility details, or warranty."
              placeholderTextColor="#94A3B8"
              outlineColor={submittedAttempt && !description.trim() ? '#EF4444' : '#E2E8F0'}
              activeOutlineColor="#0F172A"
              style={[styles.textInputPaper, { minHeight: 70 }]}
            />
          </View>
        </Surface>

        {/* 4. Location Section with Interactive Map */}
        <Surface style={styles.cardSection} elevation={1}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>📍 ITEM LOCATION *</Text>
            <TouchableOpacity
              style={styles.gpsTriggerBtn}
              onPress={handleDetectLocation}
              disabled={isDetectingLocation}
            >
              {isDetectingLocation ? (
                <ActivityIndicator size={12} color="#0066FF" style={{ marginRight: 4 }} />
              ) : (
                <IconButton icon="crosshairs-gps" size={14} iconColor="#0066FF" style={{ margin: 0 }} />
              )}
              <Text style={styles.gpsTriggerText}>
                {isDetectingLocation ? 'Detecting...' : 'Use GPS'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* State Picker Trigger */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>STATE *</Text>
            <TouchableOpacity
              style={[
                styles.selectTrigger,
                submittedAttempt && !selectedState && styles.errorInputBox,
              ]}
              onPress={() => {
                setPickerSearchQuery('');
                setPickerModalType('state');
              }}
            >
              <Text style={selectedState ? styles.selectTriggerValue : styles.selectTriggerPlaceholder}>
                {selectedState || 'Select State'}
              </Text>
              <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{ margin: 0 }} />
            </TouchableOpacity>
          </View>

          {/* District Picker Trigger */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>DISTRICT / CITY *</Text>
            <TouchableOpacity
              style={[
                styles.selectTrigger,
                !selectedState && styles.selectTriggerDisabled,
                submittedAttempt && !selectedDistrict && styles.errorInputBox,
              ]}
              disabled={!selectedState}
              onPress={() => {
                setPickerSearchQuery('');
                setPickerModalType('district');
              }}
            >
              <Text style={selectedDistrict ? styles.selectTriggerValue : styles.selectTriggerPlaceholder}>
                {selectedDistrict || (selectedState ? 'Select District / City' : 'Select State First')}
              </Text>
              <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{ margin: 0 }} />
            </TouchableOpacity>
          </View>

          {/* Sub-Area / Town */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>SUB-AREA / TOWN (OPTIONAL)</Text>
            <TextInput
              value={selectedArea}
              onChangeText={setSelectedArea}
              mode="outlined"
              placeholder="e.g. Pallapatti, Sector 18, Town Hall"
              placeholderTextColor="#94A3B8"
              outlineColor="#E2E8F0"
              activeOutlineColor="#0F172A"
              style={styles.textInputPaper}
            />
          </View>

          {/* Interactive Map Pin Card Trigger */}
          <TouchableOpacity
            style={styles.mapCardTrigger}
            onPress={() => setShowMapModal(true)}
            activeOpacity={0.85}
          >
            <View style={styles.mapCardIconBox}>
              <IconButton icon="map-marker-radius" size={22} iconColor="#15803D" style={{ margin: 0 }} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.mapCardTitle}>Map Pin Location</Text>
              <Text style={styles.mapCardSub} numberOfLines={1}>
                {selectedDistrict
                  ? `Pinned: ${selectedDistrict}, ${selectedState}`
                  : 'Tap to select exact shop or garage pin'}
              </Text>
            </View>
            <Text style={styles.mapCardAction}>Expand Map 📍</Text>
          </TouchableOpacity>
        </Surface>

        {/* 5. Seller Contact Information */}
        <Surface style={styles.cardSection} elevation={1}>
          <Text style={styles.sectionTitle}>👤 SELLER CONTACT INFORMATION *</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>SELLER NAME *</Text>
            <TextInput
              value={contactName}
              onChangeText={setContactName}
              mode="outlined"
              placeholder="e.g. Rahul Sharma"
              placeholderTextColor="#94A3B8"
              outlineColor={submittedAttempt && !contactName.trim() ? '#EF4444' : '#E2E8F0'}
              activeOutlineColor="#0F172A"
              style={styles.textInputPaper}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PHONE NUMBER *</Text>
            <TextInput
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
              mode="outlined"
              placeholder="e.g. 9876543210"
              placeholderTextColor="#94A3B8"
              outlineColor={
                submittedAttempt && (!contactPhone.trim() || contactPhone.trim().length < 8)
                  ? '#EF4444'
                  : '#E2E8F0'
              }
              activeOutlineColor="#0F172A"
              style={styles.textInputPaper}
            />
          </View>
        </Surface>

        {/* Big Submit Button */}
        <TouchableOpacity
          style={[styles.publishMainBtn, isSubmitting && { opacity: 0.6 }]}
          onPress={handlePublish}
          disabled={isSubmitting}
          activeOpacity={0.88}
        >
          {isSubmitting ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 10 }} />
              <Text style={styles.publishMainBtnText}>POSTING AD...</Text>
            </View>
          ) : (
            <Text style={styles.publishMainBtnText}>🚀 POST YOUR AD NOW</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Interactive Map Modal */}
      <MapLocationModal
        visible={showMapModal}
        onClose={() => setShowMapModal(false)}
        initialLat={lat}
        initialLng={lng}
        initialState={selectedState}
        initialDistrict={selectedDistrict}
        initialArea={selectedArea}
        onSelectLocation={(data) => {
          setLat(data.lat);
          setLng(data.lng);
          setSelectedState(data.state);
          setSelectedDistrict(data.district);
          if (data.area) setSelectedArea(data.area);
        }}
      />

      {/* Universal Searchable Selection Modal */}
      <Modal
        visible={pickerModalType !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setPickerModalType(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>
                {pickerModalType === 'brand' && 'Select Car Brand'}
                {pickerModalType === 'model' && `Select Model for ${carBrand}`}
                {pickerModalType === 'category' && 'Select Part Category'}
                {pickerModalType === 'partName' && `Select Part in ${category}`}
                {pickerModalType === 'state' && 'Select State'}
                {pickerModalType === 'district' && `Select District in ${selectedState}`}
              </Text>
              <TouchableOpacity onPress={() => setPickerModalType(null)}>
                <IconButton icon="close" size={20} iconColor="#0F172A" style={{ margin: 0 }} />
              </TouchableOpacity>
            </View>

            {/* Search Input in Modal */}
            <View style={styles.modalSearchBox}>
              <IconButton icon="magnify" size={18} iconColor="#64748B" style={{ margin: 0 }} />
              <RNTextInput
                value={pickerSearchQuery}
                onChangeText={setPickerSearchQuery}
                placeholder="Search..."
                placeholderTextColor="#94A3B8"
                style={styles.modalSearchInput}
                autoFocus
              />
              {pickerSearchQuery ? (
                <TouchableOpacity onPress={() => setPickerSearchQuery('')}>
                  <IconButton icon="close-circle" size={16} iconColor="#94A3B8" style={{ margin: 0 }} />
                </TouchableOpacity>
              ) : null}
            </View>

            {/* List */}
            <FlatList
              data={getModalItems()}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingVertical: 6 }}
              renderItem={({ item }) => {
                const isSelected =
                  (pickerModalType === 'brand' && carBrand === item) ||
                  (pickerModalType === 'model' && carModel === item) ||
                  (pickerModalType === 'category' && category === item) ||
                  (pickerModalType === 'partName' && partName === item) ||
                  (pickerModalType === 'state' && selectedState === item) ||
                  (pickerModalType === 'district' && selectedDistrict === item);

                return (
                  <TouchableOpacity
                    style={[styles.modalItemRow, isSelected && styles.modalItemRowSelected]}
                    onPress={() => {
                      if (pickerModalType === 'brand') handleBrandSelect(item);
                      else if (pickerModalType === 'model') handleModelSelect(item);
                      else if (pickerModalType === 'category') handleCategorySelect(item);
                      else if (pickerModalType === 'partName') handlePartNameSelect(item);
                      else if (pickerModalType === 'state') handleStateSelect(item);
                      else if (pickerModalType === 'district') handleDistrictSelect(item);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        isSelected && styles.modalItemTextSelected,
                      ]}
                    >
                      {pickerModalType === 'category' ? translateDynamic(item, language) : item}
                    </Text>
                    {isSelected && (
                      <IconButton icon="check" size={18} iconColor="#0066FF" style={{ margin: 0 }} />
                    )}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => (
                <View style={{ padding: 24, alignItems: 'center' }}>
                  <Text style={{ color: '#94A3B8', fontSize: 13 }}>No matching results found</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  headerSub: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 1,
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 6,
  },
  syncText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
    marginLeft: 4,
  },
  freeBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  freeBadgeText: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '800',
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  photoCountBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  photoCountText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#334155',
  },
  progressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  progressText: {
    color: '#1E40AF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 8,
  },
  emptyUploadBox: {
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginTop: 4,
  },
  emptyUploadTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
  },
  emptyUploadSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
  },
  emptyBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    width: '100%',
  },
  cameraActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066FF',
    paddingVertical: 8,
    borderRadius: 10,
  },
  cameraActionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 2,
  },
  galleryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    paddingVertical: 8,
    borderRadius: 10,
  },
  galleryActionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 2,
  },
  quickAddBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 6,
    borderRadius: 10,
    marginBottom: 8,
  },
  quickAddLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginLeft: 4,
    marginRight: 8,
  },
  quickAddCameraBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066FF',
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
  },
  quickAddGalleryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    paddingVertical: 5,
    borderRadius: 8,
  },
  quickAddBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  imageSlotBox: {
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    borderRadius: 12,
    backgroundColor: '#0F172A',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  coverImageSlot: {
    borderColor: '#0F172A',
    borderWidth: 2,
  },
  slotImage: {
    width: '100%',
    height: '100%',
  },
  coverBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#0F172A',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  coverBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  deletePhotoBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.95)',
    borderRadius: 12,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotActionsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  makeCoverBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  makeCoverText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  moveArrowBtn: {
    padding: 2,
  },
  nextSlotPicker: {
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  nextSlotCamBtn: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#BFDBFE',
  },
  nextSlotGalBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextSlotTextBlue: {
    color: '#0066FF',
    fontSize: 9,
    fontWeight: '800',
  },
  nextSlotTextGray: {
    color: '#334155',
    fontSize: 9,
    fontWeight: '800',
  },
  emptySlotPlaceholder: {
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySlotNumber: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '800',
  },
  urlToggleRow: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  urlToggleText: {
    color: '#0066FF',
    fontSize: 11,
    fontWeight: '700',
  },
  urlInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  urlTextInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 11,
    color: '#0F172A',
  },
  urlAddBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  urlAddBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  aiAutofillBtn: {
    marginTop: 12,
    backgroundColor: '#0066FF',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  aiAutofillBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  aiAutofillHint: {
    fontSize: 9.5,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
  },
  inputGroup: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  selectTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectTriggerDisabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  selectTriggerValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  selectTriggerPlaceholder: {
    fontSize: 12,
    color: '#94A3B8',
    flex: 1,
  },
  textInputPaper: {
    backgroundColor: '#F8FAFC',
    fontSize: 12,
  },
  conditionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionBtn: {
    flex: 1,
    minWidth: (width - 76) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  conditionBtnActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  conditionBtnInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  conditionBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  conditionBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  charCountText: {
    fontSize: 9.5,
    color: '#94A3B8',
    fontWeight: '600',
  },
  gpsTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  gpsTriggerText: {
    color: '#0066FF',
    fontSize: 10.5,
    fontWeight: '800',
  },
  mapCardTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
  },
  mapCardIconBox: {
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
    padding: 2,
  },
  mapCardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#166534',
  },
  mapCardSub: {
    fontSize: 10,
    color: '#15803D',
    marginTop: 1,
  },
  mapCardAction: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
  },
  publishMainBtn: {
    backgroundColor: '#0F172A',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  publishMainBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  errorInputBox: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 11,
    fontWeight: '700',
    flex: 1,
  },
  aiSuccessBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  aiSuccessText: {
    color: '#065F46',
    fontSize: 11,
    fontWeight: '800',
    flex: 1,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  successSub: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
    maxWidth: 280,
  },
  successRedirect: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 8,
  },
  limitContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  limitContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  limitIconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  limitTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },
  limitSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  activeAdsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    width: '100%',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeAdsHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  adItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 10,
    marginBottom: 6,
  },
  adItemThumb: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  adItemTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  adItemPrice: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0066FF',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: '45%',
    paddingBottom: 20,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    flex: 1,
  },
  modalSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    marginHorizontal: 14,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: 12,
    color: '#0F172A',
    paddingVertical: 6,
  },
  modalItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  modalItemRowSelected: {
    backgroundColor: '#EFF6FF',
  },
  modalItemText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
  modalItemTextSelected: {
    color: '#0066FF',
    fontWeight: '800',
  },
});
