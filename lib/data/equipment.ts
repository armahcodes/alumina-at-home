/**
 * Longevity Equipment Database
 * 
 * Recommended equipment organized by budget tier and category.
 * Based on research from longevity experts and biohacking community.
 */

export interface Equipment {
  id: string;
  name: string;
  brand?: string;
  category: EquipmentCategory;
  tier: 'essential' | 'intermediate' | 'premium';
  priceRange: string;
  description: string;
  benefits: string[];
  features: string[];
  useCases: string[];
  relatedProtocols: string[];
  purchaseLink?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
}

export type EquipmentCategory = 
  | 'cold-exposure'
  | 'heat-exposure'
  | 'light-therapy'
  | 'sleep'
  | 'fitness'
  | 'recovery'
  | 'air-quality'
  | 'water'
  | 'monitoring'
  | 'breathwork';

export const equipment: Equipment[] = [
  // ============================================================================
  // COLD EXPOSURE EQUIPMENT
  // ============================================================================
  {
    id: 'cold-shower-thermometer',
    name: 'Waterproof Shower Thermometer',
    category: 'cold-exposure',
    tier: 'essential',
    priceRange: '$10-20',
    description: 'Digital thermometer to accurately track cold shower water temperature for consistent protocols.',
    benefits: [
      'Track exact water temperature',
      'Ensure consistent cold exposure',
      'Monitor progress as you adapt',
      'Affordable starting point'
    ],
    features: [
      'Waterproof design',
      'Digital display',
      'Suction cup mount',
      'Battery powered'
    ],
    useCases: [
      'Cold shower protocols',
      'Temperature tracking',
      'Progress monitoring'
    ],
    relatedProtocols: ['cold-shower-basic']
  },
  {
    id: 'ice-barrel',
    name: 'Ice Barrel',
    brand: 'Ice Barrel',
    category: 'cold-exposure',
    tier: 'intermediate',
    priceRange: '$1,200-1,500',
    description: 'Upright cold plunge barrel designed for easy entry/exit and efficient water usage.',
    benefits: [
      'Purpose-built for cold exposure',
      'Compact vertical design',
      'Easy entry and exit',
      'Well-insulated'
    ],
    features: [
      'Upright barrel design',
      'Insulated walls',
      'Drain plug for easy maintenance',
      '105-gallon capacity',
      'UV-resistant'
    ],
    useCases: [
      'Deliberate cold exposure',
      'Post-workout recovery',
      'Daily cold practice'
    ],
    relatedProtocols: ['deliberate-cold-exposure', 'cold-shower-basic']
  },
  {
    id: 'cold-plunge-chiller',
    name: 'Cold Plunge with Chiller',
    brand: 'Plunge',
    category: 'cold-exposure',
    tier: 'premium',
    priceRange: '$5,000-8,000',
    description: 'All-in-one cold plunge system with built-in chiller. Maintains precise temperature 24/7.',
    benefits: [
      'Always ready at target temperature',
      'No ice needed',
      'Precise temperature control',
      'Built-in filtration'
    ],
    features: [
      'Integrated cooling system',
      'Temperature range: 39-60°F',
      'Ozone sanitation',
      'Insulated tub',
      'Digital controls',
      'WiFi connectivity'
    ],
    useCases: [
      'Daily cold practice',
      'Professional biohacking',
      'Home wellness setup'
    ],
    relatedProtocols: ['deliberate-cold-exposure']
  },

  // ============================================================================
  // HEAT EXPOSURE EQUIPMENT
  // ============================================================================
  {
    id: 'portable-sauna-blanket',
    name: 'Infrared Sauna Blanket',
    brand: 'HigherDOSE',
    category: 'heat-exposure',
    tier: 'intermediate',
    priceRange: '$400-600',
    description: 'Portable infrared sauna blanket for heat therapy at home. Space-efficient alternative to traditional saunas.',
    benefits: [
      'Portable and storable',
      'Lower cost than full sauna',
      'Infrared penetrates deeper',
      'Use while watching TV'
    ],
    features: [
      'Far infrared technology',
      'Adjustable temperature',
      'Timer function',
      'Waterproof interior',
      'Rolls up for storage'
    ],
    useCases: [
      'Heat therapy sessions',
      'Detoxification',
      'Relaxation',
      'Recovery'
    ],
    relatedProtocols: ['sauna-protocol']
  },
  {
    id: 'barrel-sauna',
    name: 'Outdoor Barrel Sauna',
    brand: 'Almost Heaven',
    category: 'heat-exposure',
    tier: 'premium',
    priceRange: '$4,000-8,000',
    description: 'Traditional Finnish-style barrel sauna for authentic heat exposure therapy.',
    benefits: [
      'Authentic sauna experience',
      'Reaches higher temperatures',
      'Social/family use',
      'Increases property value'
    ],
    features: [
      'Cedar or hemlock wood',
      'Electric or wood-burning heater',
      'Reaches 180-200°F',
      'Seats 2-4 people',
      'Weatherproof design'
    ],
    useCases: [
      'Longevity sauna protocol',
      'Post-workout recovery',
      'Social wellness',
      'Contrast therapy (with cold plunge)'
    ],
    relatedProtocols: ['sauna-protocol']
  },

  // ============================================================================
  // LIGHT THERAPY EQUIPMENT
  // ============================================================================
  {
    id: 'light-therapy-lamp',
    name: '10,000 Lux Light Therapy Lamp',
    brand: 'Verilux',
    category: 'light-therapy',
    tier: 'essential',
    priceRange: '$30-60',
    description: 'Bright light therapy lamp for circadian rhythm support, especially useful in winter or for shift workers.',
    benefits: [
      'Supports circadian rhythm',
      'Combats winter blues (SAD)',
      'Increases morning alertness',
      'Affordable entry point'
    ],
    features: [
      '10,000 lux brightness',
      'UV-free light',
      'Timer function',
      'Compact design'
    ],
    useCases: [
      'Morning light exposure (when sunlight unavailable)',
      'Winter circadian support',
      'Shift work adaptation'
    ],
    relatedProtocols: ['morning-light-exposure']
  },
  {
    id: 'red-light-panel',
    name: 'Red Light Therapy Panel',
    brand: 'Joovv',
    category: 'light-therapy',
    tier: 'intermediate',
    priceRange: '$600-1,500',
    description: 'Medical-grade red and near-infrared light panel for cellular energy, skin health, and recovery.',
    benefits: [
      'Enhances mitochondrial function',
      'Improves skin health',
      'Accelerates recovery',
      'Reduces inflammation'
    ],
    features: [
      'Red (660nm) and NIR (850nm) wavelengths',
      'Medical-grade LEDs',
      'Modular/expandable',
      'Timer and intensity control',
      'Low EMF'
    ],
    useCases: [
      'Morning light routine',
      'Skin rejuvenation',
      'Muscle recovery',
      'Wound healing',
      'Joint health'
    ],
    relatedProtocols: ['morning-light-exposure']
  },
  {
    id: 'blue-light-glasses',
    name: 'Blue Light Blocking Glasses',
    brand: 'Ra Optics',
    category: 'light-therapy',
    tier: 'essential',
    priceRange: '$50-150',
    description: 'High-quality blue light blocking glasses for evening use to protect melatonin production.',
    benefits: [
      'Protects melatonin production',
      'Reduces eye strain',
      'Improves sleep onset',
      'Allows evening screen use'
    ],
    features: [
      'Blocks blue & green wavelengths',
      'Multiple lens options (day/night)',
      'Comfortable frames',
      'Prescription available'
    ],
    useCases: [
      'Evening screen use',
      'Evening light protocol',
      'Night shift work'
    ],
    relatedProtocols: ['evening-light-dimming']
  },

  // ============================================================================
  // SLEEP EQUIPMENT
  // ============================================================================
  {
    id: 'sleep-mask',
    name: 'Contoured Sleep Mask',
    brand: 'Manta',
    category: 'sleep',
    tier: 'essential',
    priceRange: '$30-50',
    description: 'Ergonomic sleep mask with eye cups that block 100% of light without pressure on eyes.',
    benefits: [
      'Complete darkness',
      'No pressure on eyes',
      'Allows eye movement (REM)',
      'Travel-friendly'
    ],
    features: [
      'Contoured eye cups',
      '100% light blocking',
      'Adjustable strap',
      'Breathable materials'
    ],
    useCases: [
      'Sleep optimization',
      'Travel',
      'Napping',
      'Shift work'
    ],
    relatedProtocols: ['sleep-optimization']
  },
  {
    id: 'cooling-mattress-pad',
    name: 'Mattress Cooling System',
    brand: 'Eight Sleep',
    category: 'sleep',
    tier: 'premium',
    priceRange: '$2,000-3,000',
    description: 'Smart mattress cover that actively cools/heats your bed and tracks sleep metrics.',
    benefits: [
      'Optimal sleep temperature',
      'Tracks sleep metrics',
      'Different temps per side',
      'Improves deep sleep'
    ],
    features: [
      'Active cooling/heating',
      'App-controlled temperature',
      'Sleep tracking',
      'Dual-zone for couples',
      'Vibration alarm'
    ],
    useCases: [
      'Sleep temperature optimization',
      'Sleep tracking',
      'Hot sleepers',
      'Couples with different preferences'
    ],
    relatedProtocols: ['sleep-optimization']
  },
  {
    id: 'white-noise-machine',
    name: 'White Noise Machine',
    brand: 'LectroFan',
    category: 'sleep',
    tier: 'essential',
    priceRange: '$40-60',
    description: 'High-quality white noise machine to mask disruptive sounds and create consistent sleep environment.',
    benefits: [
      'Masks disruptive sounds',
      'Creates consistent soundscape',
      'Improves sleep quality',
      'Travel-friendly'
    ],
    features: [
      'Multiple sound options',
      'Volume control',
      'Compact design',
      'Timer function'
    ],
    useCases: [
      'Sleep environment optimization',
      'Light sleepers',
      'Urban environments',
      'Travel'
    ],
    relatedProtocols: ['sleep-optimization']
  },

  // ============================================================================
  // FITNESS EQUIPMENT
  // ============================================================================
  {
    id: 'heart-rate-monitor',
    name: 'Chest Strap Heart Rate Monitor',
    brand: 'Polar H10',
    category: 'fitness',
    tier: 'essential',
    priceRange: '$80-100',
    description: 'Medical-grade accurate heart rate monitor for Zone 2 and VO2 max training.',
    benefits: [
      'Most accurate HR tracking',
      'Essential for zone training',
      'Long battery life',
      'Works with most apps'
    ],
    features: [
      'ECG-accurate heart rate',
      'Bluetooth & ANT+',
      'Waterproof',
      '400+ hour battery'
    ],
    useCases: [
      'Zone 2 cardio training',
      'VO2 max intervals',
      'HRV monitoring',
      'Any cardio workout'
    ],
    relatedProtocols: ['zone-2-cardio', 'vo2-max-training']
  },
  {
    id: 'rower',
    name: 'Rowing Machine',
    brand: 'Concept2',
    category: 'fitness',
    tier: 'intermediate',
    priceRange: '$900-1,200',
    description: 'Gold-standard rowing machine for full-body Zone 2 cardio with minimal joint impact.',
    benefits: [
      'Full-body cardio',
      'Low impact on joints',
      'Perfect for Zone 2',
      'Builds aerobic base'
    ],
    features: [
      'Air resistance',
      'PM5 performance monitor',
      'Stores upright',
      'Connects to apps'
    ],
    useCases: [
      'Zone 2 cardio',
      'Full-body conditioning',
      'Low-impact cardio'
    ],
    relatedProtocols: ['zone-2-cardio', 'vo2-max-training']
  },
  {
    id: 'resistance-bands',
    name: 'Resistance Band Set',
    category: 'fitness',
    tier: 'essential',
    priceRange: '$20-50',
    description: 'Versatile resistance bands for mobility work, warm-ups, and travel workouts.',
    benefits: [
      'Portable strength training',
      'Great for mobility work',
      'Multiple resistance levels',
      'Joint-friendly'
    ],
    features: [
      'Multiple resistance levels',
      'Door anchor included',
      'Travel bag',
      'Handles and ankle straps'
    ],
    useCases: [
      'Morning mobility routine',
      'Warm-up/activation',
      'Travel workouts',
      'Rehabilitation'
    ],
    relatedProtocols: ['morning-mobility']
  },

  // ============================================================================
  // RECOVERY EQUIPMENT
  // ============================================================================
  {
    id: 'massage-gun',
    name: 'Percussion Massage Gun',
    brand: 'Theragun',
    category: 'recovery',
    tier: 'intermediate',
    priceRange: '$200-400',
    description: 'Professional-grade percussion therapy device for muscle recovery and tension relief.',
    benefits: [
      'Accelerates recovery',
      'Reduces muscle tension',
      'Improves blood flow',
      'Targets deep tissue'
    ],
    features: [
      'Multiple speed settings',
      'Interchangeable heads',
      'Quiet operation',
      'Long battery life',
      'App connectivity'
    ],
    useCases: [
      'Post-workout recovery',
      'Muscle tension relief',
      'Pre-workout activation'
    ],
    relatedProtocols: ['zone-2-cardio', 'vo2-max-training']
  },
  {
    id: 'foam-roller',
    name: 'High-Density Foam Roller',
    category: 'recovery',
    tier: 'essential',
    priceRange: '$20-40',
    description: 'Essential tool for self-myofascial release, mobility work, and recovery.',
    benefits: [
      'Releases muscle tension',
      'Improves mobility',
      'Affordable',
      'Durable and portable'
    ],
    features: [
      'High-density foam',
      'Multiple sizes available',
      'Textured options',
      'Easy to clean'
    ],
    useCases: [
      'Pre/post workout',
      'Morning mobility',
      'Daily recovery routine'
    ],
    relatedProtocols: ['morning-mobility']
  },
  {
    id: 'compression-boots',
    name: 'Pneumatic Compression Boots',
    brand: 'Normatec',
    category: 'recovery',
    tier: 'premium',
    priceRange: '$800-1,200',
    description: 'Professional-grade compression therapy system for enhanced recovery and circulation.',
    benefits: [
      'Accelerates recovery',
      'Reduces muscle soreness',
      'Improves circulation',
      'Used by pro athletes'
    ],
    features: [
      'Sequential compression',
      'Multiple intensity levels',
      'Full leg coverage',
      'Portable design'
    ],
    useCases: [
      'Post-workout recovery',
      'Travel recovery',
      'Rest days'
    ],
    relatedProtocols: ['vo2-max-training']
  },

  // ============================================================================
  // AIR QUALITY EQUIPMENT
  // ============================================================================
  {
    id: 'air-purifier',
    name: 'HEPA Air Purifier',
    brand: 'Molekule',
    category: 'air-quality',
    tier: 'intermediate',
    priceRange: '$300-600',
    description: 'High-quality air purifier for removing allergens, pollutants, and improving sleep environment.',
    benefits: [
      'Removes 99.97% of particles',
      'Reduces allergens',
      'Improves sleep quality',
      'Reduces inflammation'
    ],
    features: [
      'True HEPA filter',
      'Activated carbon filter',
      'Quiet operation',
      'Air quality sensor',
      'App connectivity'
    ],
    useCases: [
      'Bedroom air quality',
      'Allergy reduction',
      'Sleep optimization'
    ],
    relatedProtocols: ['sleep-optimization']
  },
  {
    id: 'co2-monitor',
    name: 'CO2 Monitor',
    brand: 'Aranet4',
    category: 'air-quality',
    tier: 'essential',
    priceRange: '$200-250',
    description: 'Track indoor CO2 levels to optimize cognitive performance and sleep quality.',
    benefits: [
      'Monitor air quality',
      'Optimize cognitive performance',
      'Know when to ventilate',
      'Improve sleep quality'
    ],
    features: [
      'Accurate CO2 sensing',
      'E-ink display',
      'Long battery life',
      'Bluetooth app'
    ],
    useCases: [
      'Office air quality',
      'Bedroom optimization',
      'Meeting rooms'
    ],
    relatedProtocols: ['sleep-optimization']
  },

  // ============================================================================
  // WATER EQUIPMENT
  // ============================================================================
  {
    id: 'water-filter',
    name: 'Reverse Osmosis Water Filter',
    brand: 'AquaTru',
    category: 'water',
    tier: 'intermediate',
    priceRange: '$400-500',
    description: 'Countertop reverse osmosis system for clean, purified drinking water.',
    benefits: [
      'Removes 99% of contaminants',
      'No installation required',
      'Better than bottled water',
      'Cost-effective long-term'
    ],
    features: [
      '4-stage filtration',
      'Countertop design',
      'No plumbing needed',
      'BPA-free tank'
    ],
    useCases: [
      'Clean drinking water',
      'Cooking',
      'Supplement mixing'
    ],
    relatedProtocols: ['time-restricted-eating']
  },
  {
    id: 'hydrogen-water',
    name: 'Hydrogen Water Generator',
    brand: 'Echo',
    category: 'water',
    tier: 'premium',
    priceRange: '$600-2,000',
    description: 'Generate hydrogen-rich water for antioxidant benefits.',
    benefits: [
      'Molecular hydrogen antioxidant',
      'May reduce inflammation',
      'Emerging research supporting benefits',
      'Easy to use'
    ],
    features: [
      'SPE/PEM technology',
      'High hydrogen concentration',
      'Portable options available',
      'BPA-free materials'
    ],
    useCases: [
      'Daily hydration',
      'Pre/post workout',
      'Anti-inflammatory support'
    ],
    relatedProtocols: []
  },

  // ============================================================================
  // MONITORING EQUIPMENT
  // ============================================================================
  {
    id: 'oura-ring',
    name: 'Oura Ring',
    brand: 'Oura',
    category: 'monitoring',
    tier: 'intermediate',
    priceRange: '$300-400 + subscription',
    description: 'Smart ring that tracks sleep, HRV, readiness, and activity with exceptional accuracy.',
    benefits: [
      'Best sleep tracking available',
      'Tracks HRV and readiness',
      'Comfortable to wear 24/7',
      'No screen distractions'
    ],
    features: [
      'Sleep stage tracking',
      'HRV monitoring',
      'Body temperature tracking',
      'Activity tracking',
      'Readiness score'
    ],
    useCases: [
      'Sleep optimization',
      'Recovery tracking',
      'Readiness assessment',
      'Menstrual cycle tracking'
    ],
    relatedProtocols: ['sleep-optimization', 'zone-2-cardio']
  },
  {
    id: 'cgm',
    name: 'Continuous Glucose Monitor',
    brand: 'Levels/Nutrisense',
    category: 'monitoring',
    tier: 'premium',
    priceRange: '$200-400/month',
    description: 'Real-time glucose monitoring to understand metabolic health and optimize nutrition.',
    benefits: [
      'Real-time glucose data',
      'Understand food responses',
      'Optimize metabolic health',
      'Personalize diet'
    ],
    features: [
      'Continuous monitoring',
      'App with insights',
      'Food logging integration',
      'Personalized recommendations'
    ],
    useCases: [
      'Metabolic health optimization',
      'Dietary personalization',
      'Time-restricted eating',
      'Blood sugar management'
    ],
    relatedProtocols: ['time-restricted-eating']
  },
  {
    id: 'blood-pressure-monitor',
    name: 'Digital Blood Pressure Monitor',
    brand: 'Omron',
    category: 'monitoring',
    tier: 'essential',
    priceRange: '$50-100',
    description: 'Accurate home blood pressure monitoring for cardiovascular health tracking.',
    benefits: [
      'Track cardiovascular health',
      'Medical-grade accuracy',
      'Easy to use',
      'Track trends over time'
    ],
    features: [
      'Validated accuracy',
      'Memory storage',
      'Irregular heartbeat detection',
      'Bluetooth connectivity'
    ],
    useCases: [
      'Cardiovascular monitoring',
      'Sauna protocol safety',
      'Supplement effect tracking'
    ],
    relatedProtocols: ['sauna-protocol']
  },

  // ============================================================================
  // BREATHWORK EQUIPMENT
  // ============================================================================
  {
    id: 'breathwork-trainer',
    name: 'Respiratory Trainer',
    brand: 'Airofit',
    category: 'breathwork',
    tier: 'intermediate',
    priceRange: '$300-350',
    description: 'Smart breathing trainer that strengthens respiratory muscles and guides breathwork.',
    benefits: [
      'Strengthens respiratory muscles',
      'Guided breathing exercises',
      'Tracks progress over time',
      'Improves lung capacity'
    ],
    features: [
      'Adjustable resistance',
      'App-guided training',
      'Progress tracking',
      'Multiple exercise modes'
    ],
    useCases: [
      'Breathwork training',
      'Athletic performance',
      'Respiratory health',
      'Stress management'
    ],
    relatedProtocols: ['box-breathing', 'wim-hof-breathing']
  },
  {
    id: 'pulse-oximeter',
    name: 'Pulse Oximeter',
    category: 'breathwork',
    tier: 'essential',
    priceRange: '$20-50',
    description: 'Measure blood oxygen saturation for breathwork safety and breath hold training.',
    benefits: [
      'Monitor oxygen levels',
      'Safety for breath holds',
      'Track improvement',
      'Affordable'
    ],
    features: [
      'SpO2 measurement',
      'Pulse rate',
      'Compact design',
      'Battery powered'
    ],
    useCases: [
      'Wim Hof breathing safety',
      'Breath hold training',
      'Health monitoring'
    ],
    relatedProtocols: ['wim-hof-breathing']
  }
];

// ============================================================================
// EQUIPMENT CATEGORIES METADATA
// ============================================================================

export const equipmentCategories = {
  'cold-exposure': {
    name: 'Cold Exposure',
    description: 'Equipment for deliberate cold exposure and contrast therapy',
    icon: '🧊'
  },
  'heat-exposure': {
    name: 'Heat Exposure',
    description: 'Sauna and heat therapy equipment',
    icon: '🔥'
  },
  'light-therapy': {
    name: 'Light Therapy',
    description: 'Red light, bright light, and blue light blocking equipment',
    icon: '💡'
  },
  sleep: {
    name: 'Sleep Optimization',
    description: 'Equipment for improving sleep quality',
    icon: '😴'
  },
  fitness: {
    name: 'Fitness',
    description: 'Cardio and strength training equipment',
    icon: '🏋️'
  },
  recovery: {
    name: 'Recovery',
    description: 'Muscle recovery and massage equipment',
    icon: '🔄'
  },
  'air-quality': {
    name: 'Air Quality',
    description: 'Air purification and monitoring equipment',
    icon: '🌬️'
  },
  water: {
    name: 'Water',
    description: 'Water filtration and enhancement equipment',
    icon: '💧'
  },
  monitoring: {
    name: 'Health Monitoring',
    description: 'Wearables and health tracking devices',
    icon: '📊'
  },
  breathwork: {
    name: 'Breathwork',
    description: 'Breathing training and monitoring equipment',
    icon: '🫁'
  }
};

// ============================================================================
// EQUIPMENT BUNDLES BY BUDGET
// ============================================================================

export interface EquipmentBundle {
  id: string;
  name: string;
  tier: 'essential' | 'intermediate' | 'premium';
  totalBudget: string;
  description: string;
  equipment: string[];
}

export const equipmentBundles: EquipmentBundle[] = [
  {
    id: 'starter-kit',
    name: 'Starter Kit',
    tier: 'essential',
    totalBudget: '$200-400',
    description: 'Essential equipment to begin your longevity journey without breaking the bank.',
    equipment: [
      'cold-shower-thermometer',
      'light-therapy-lamp',
      'blue-light-glasses',
      'sleep-mask',
      'heart-rate-monitor',
      'foam-roller',
      'resistance-bands',
      'pulse-oximeter',
      'blood-pressure-monitor'
    ]
  },
  {
    id: 'home-biohacker',
    name: 'Home Biohacker Setup',
    tier: 'intermediate',
    totalBudget: '$3,000-5,000',
    description: 'Comprehensive home setup for serious longevity optimization.',
    equipment: [
      'ice-barrel',
      'portable-sauna-blanket',
      'red-light-panel',
      'blue-light-glasses',
      'oura-ring',
      'heart-rate-monitor',
      'rower',
      'massage-gun',
      'air-purifier',
      'co2-monitor',
      'water-filter',
      'breathwork-trainer'
    ]
  },
  {
    id: 'ultimate-setup',
    name: 'Ultimate Longevity Lab',
    tier: 'premium',
    totalBudget: '$15,000-25,000',
    description: 'The complete home longevity optimization setup with premium equipment.',
    equipment: [
      'cold-plunge-chiller',
      'barrel-sauna',
      'red-light-panel',
      'cooling-mattress-pad',
      'oura-ring',
      'cgm',
      'rower',
      'compression-boots',
      'massage-gun',
      'air-purifier',
      'hydrogen-water',
      'breathwork-trainer'
    ]
  }
];

export default equipment;
