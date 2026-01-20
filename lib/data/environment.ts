/**
 * Environment Optimization Database
 * 
 * Room-by-room guide to optimizing your home for longevity.
 */

export interface Room {
  id: string;
  name: string;
  icon: string;
  description: string;
  optimizations: Optimization[];
  metrics: RoomMetric[];
  relatedEquipment: string[];
}

export interface Optimization {
  id: string;
  title: string;
  description: string;
  priority: 'essential' | 'recommended' | 'advanced';
  impact: 'high' | 'medium' | 'low';
  costRange: string;
  difficulty: 'easy' | 'moderate' | 'complex';
  scienceNote?: string;
  steps: string[];
  relatedProtocols?: string[];
}

export interface RoomMetric {
  name: string;
  ideal: string;
  icon: string;
  importance: string;
}

export const rooms: Room[] = [
  // ============================================================================
  // BEDROOM
  // ============================================================================
  {
    id: 'bedroom',
    name: 'Bedroom',
    icon: '🛏️',
    description: 'Your sleep sanctuary. The most important room to optimize for longevity, as sleep impacts nearly every health marker.',
    optimizations: [
      {
        id: 'bedroom-temperature',
        title: 'Temperature Control',
        description: 'Maintain bedroom temperature between 65-68°F (18-20°C) for optimal sleep.',
        priority: 'essential',
        impact: 'high',
        costRange: 'Free - $3,000',
        difficulty: 'easy',
        scienceNote: 'Core body temperature must drop 2-3°F to initiate and maintain sleep. A cool room facilitates this natural process.',
        steps: [
          'Set thermostat to 65-68°F before bed',
          'Consider a programmable thermostat to lower temp automatically',
          'Use breathable bedding (cotton, linen, bamboo)',
          'For advanced: consider a cooling mattress pad like Eight Sleep'
        ],
        relatedProtocols: ['sleep-optimization']
      },
      {
        id: 'bedroom-darkness',
        title: 'Complete Darkness',
        description: 'Eliminate all light sources for maximum melatonin production.',
        priority: 'essential',
        impact: 'high',
        costRange: '$30 - $500',
        difficulty: 'easy',
        scienceNote: 'Even dim light exposure during sleep can suppress melatonin and disrupt sleep architecture. The bedroom should be dark enough that you cannot see your hand.',
        steps: [
          'Install blackout curtains or shades',
          'Cover LED lights on devices with electrical tape',
          'Remove or cover digital clocks',
          'Use a sleep mask if complete darkness isn\'t possible',
          'Consider blackout stickers for any remaining light sources'
        ],
        relatedProtocols: ['sleep-optimization', 'evening-light-dimming']
      },
      {
        id: 'bedroom-emf',
        title: 'EMF Reduction',
        description: 'Minimize electromagnetic field exposure in the sleep environment.',
        priority: 'recommended',
        impact: 'medium',
        costRange: 'Free - $100',
        difficulty: 'easy',
        scienceNote: 'While research is ongoing, some studies suggest EMF exposure may affect sleep quality and melatonin production.',
        steps: [
          'Put phone in airplane mode or leave outside bedroom',
          'Unplug WiFi router at night (or use timer)',
          'Keep electronics at least 3 feet from bed',
          'Avoid electric blankets during sleep',
          'Consider a battery-powered alarm clock'
        ],
        relatedProtocols: ['sleep-optimization']
      },
      {
        id: 'bedroom-air-quality',
        title: 'Air Quality',
        description: 'Ensure clean, fresh air in your sleep environment.',
        priority: 'essential',
        impact: 'high',
        costRange: '$40 - $600',
        difficulty: 'easy',
        scienceNote: 'CO2 levels above 1000ppm impair cognitive function and sleep quality. Most bedrooms exceed this by morning without ventilation.',
        steps: [
          'Use a HEPA air purifier rated for room size',
          'Monitor CO2 levels with a sensor',
          'Ventilate room before sleep when possible',
          'Keep door slightly open if CO2 rises too high',
          'Consider houseplants for natural air filtration'
        ],
        relatedProtocols: ['sleep-optimization']
      },
      {
        id: 'bedroom-sound',
        title: 'Sound Management',
        description: 'Create a consistent, quiet soundscape for uninterrupted sleep.',
        priority: 'recommended',
        impact: 'medium',
        costRange: '$0 - $100',
        difficulty: 'easy',
        scienceNote: 'Sound disruptions during sleep can cause micro-arousals that fragment sleep even without waking you fully.',
        steps: [
          'Use white/pink noise machine to mask disruptions',
          'Consider earplugs for noise-sensitive sleepers',
          'Address sources of noise (fans, appliances)',
          'Weatherstrip doors and windows if needed'
        ],
        relatedProtocols: ['sleep-optimization']
      },
      {
        id: 'bedroom-light-evening',
        title: 'Evening Lighting Setup',
        description: 'Install lighting that supports melatonin production in the evening.',
        priority: 'recommended',
        impact: 'high',
        costRange: '$20 - $200',
        difficulty: 'moderate',
        scienceNote: 'Blue and green wavelengths (400-550nm) suppress melatonin. Red/amber lighting preserves melatonin production.',
        steps: [
          'Install dimmable warm-white bulbs (2700K or lower)',
          'Add red or amber night lights for bathroom trips',
          'Use smart bulbs that can shift to warm tones at night',
          'Keep overhead lights off after sunset - use lamps instead'
        ],
        relatedProtocols: ['evening-light-dimming']
      }
    ],
    metrics: [
      { name: 'Temperature', ideal: '65-68°F (18-20°C)', icon: '🌡️', importance: 'Critical for sleep onset and maintenance' },
      { name: 'Light Level', ideal: '< 1 lux (pitch black)', icon: '🌙', importance: 'Essential for melatonin production' },
      { name: 'CO2', ideal: '< 800 ppm', icon: '💨', importance: 'Above 1000ppm impairs sleep quality' },
      { name: 'Humidity', ideal: '40-60%', icon: '💧', importance: 'Affects breathing and comfort' },
      { name: 'Noise', ideal: '< 30 dB or consistent', icon: '🔇', importance: 'Prevents micro-arousals' }
    ],
    relatedEquipment: ['sleep-mask', 'cooling-mattress-pad', 'white-noise-machine', 'air-purifier', 'co2-monitor']
  },

  // ============================================================================
  // HOME OFFICE
  // ============================================================================
  {
    id: 'home-office',
    name: 'Home Office',
    icon: '💼',
    description: 'Where you spend focused work time. Optimize for cognitive performance, circadian alignment, and ergonomics.',
    optimizations: [
      {
        id: 'office-light',
        title: 'Bright Light Exposure',
        description: 'Ensure adequate light exposure during work hours to support circadian rhythm and alertness.',
        priority: 'essential',
        impact: 'high',
        costRange: '$0 - $400',
        difficulty: 'easy',
        scienceNote: 'Daytime light exposure is critical for circadian rhythm, energy, and nighttime sleep. Most indoor environments are too dim.',
        steps: [
          'Position desk near window for natural light',
          'Use a 10,000 lux light therapy lamp in the morning',
          'Get outside for 10+ minutes during the day',
          'Ensure overhead lighting is bright during work hours'
        ],
        relatedProtocols: ['morning-light-exposure']
      },
      {
        id: 'office-air',
        title: 'Air Quality for Cognition',
        description: 'Optimize air quality to maintain peak cognitive function.',
        priority: 'essential',
        impact: 'high',
        costRange: '$200 - $500',
        difficulty: 'easy',
        scienceNote: 'Harvard research shows cognitive function scores are 61% higher in green buildings with good ventilation. CO2 above 1000ppm impairs decision-making.',
        steps: [
          'Install CO2 monitor and keep levels below 800ppm',
          'Use HEPA air purifier',
          'Ventilate room regularly',
          'Add plants for air quality and psychological benefits'
        ]
      },
      {
        id: 'office-ergonomics',
        title: 'Ergonomic Setup',
        description: 'Prevent chronic pain and postural issues with proper workstation setup.',
        priority: 'essential',
        impact: 'high',
        costRange: '$100 - $1,500',
        difficulty: 'moderate',
        scienceNote: 'Poor ergonomics contribute to chronic pain, which is associated with inflammation and accelerated aging.',
        steps: [
          'Monitor at eye level, arm\'s length away',
          'Chair supports lumbar curve',
          'Feet flat on floor, thighs parallel to ground',
          'Keyboard and mouse at elbow height',
          'Consider sit-stand desk for position variety'
        ],
        relatedProtocols: ['morning-mobility']
      },
      {
        id: 'office-movement',
        title: 'Movement Prompts',
        description: 'Break up prolonged sitting to maintain metabolic health.',
        priority: 'recommended',
        impact: 'medium',
        costRange: 'Free - $50',
        difficulty: 'easy',
        scienceNote: 'Prolonged sitting is associated with increased mortality independent of exercise. Movement breaks every 30-60 minutes mitigate these effects.',
        steps: [
          'Set timer for movement break every 30-60 minutes',
          'Keep resistance bands or mobility tools nearby',
          'Take walking meetings when possible',
          'Consider under-desk walking pad'
        ],
        relatedProtocols: ['morning-mobility', 'zone-2-cardio']
      },
      {
        id: 'office-blue-light',
        title: 'Blue Light Management',
        description: 'Protect circadian rhythm during evening work.',
        priority: 'recommended',
        impact: 'medium',
        costRange: '$0 - $150',
        difficulty: 'easy',
        scienceNote: 'Screen blue light in the evening suppresses melatonin and delays sleep onset.',
        steps: [
          'Enable night mode on devices after sunset',
          'Use blue light blocking glasses in the evening',
          'Install f.lux or similar software',
          'Avoid work after sunset if possible'
        ],
        relatedProtocols: ['evening-light-dimming']
      }
    ],
    metrics: [
      { name: 'Light Level', ideal: '> 500 lux (daytime)', icon: '☀️', importance: 'Supports alertness and circadian rhythm' },
      { name: 'CO2', ideal: '< 800 ppm', icon: '💨', importance: 'Critical for cognitive performance' },
      { name: 'Temperature', ideal: '68-72°F (20-22°C)', icon: '🌡️', importance: 'Optimal for focused work' },
      { name: 'Monitor Distance', ideal: '20-26 inches', icon: '🖥️', importance: 'Prevents eye strain' },
      { name: 'Movement', ideal: 'Every 30-60 min', icon: '🚶', importance: 'Breaks prolonged sitting' }
    ],
    relatedEquipment: ['light-therapy-lamp', 'co2-monitor', 'air-purifier', 'blue-light-glasses']
  },

  // ============================================================================
  // BATHROOM
  // ============================================================================
  {
    id: 'bathroom',
    name: 'Bathroom',
    icon: '🚿',
    description: 'Transform your bathroom into a recovery and cold exposure station.',
    optimizations: [
      {
        id: 'bathroom-cold',
        title: 'Cold Exposure Setup',
        description: 'Optimize for cold shower or cold plunge protocols.',
        priority: 'recommended',
        impact: 'high',
        costRange: '$10 - $8,000',
        difficulty: 'easy',
        scienceNote: 'Cold exposure increases dopamine by 250-300% and activates brown fat for metabolic benefits.',
        steps: [
          'Install waterproof thermometer to track water temperature',
          'Know your water heater\'s cold output temperature',
          'Consider upgrading to a cold plunge if space allows',
          'Place non-slip mat for safety'
        ],
        relatedProtocols: ['cold-shower-basic', 'deliberate-cold-exposure']
      },
      {
        id: 'bathroom-lighting',
        title: 'Circadian-Friendly Lighting',
        description: 'Install lighting that supports your circadian rhythm.',
        priority: 'recommended',
        impact: 'medium',
        costRange: '$20 - $100',
        difficulty: 'easy',
        scienceNote: 'Bright bathroom lights during nighttime trips can suppress melatonin and disrupt sleep.',
        steps: [
          'Install dimmer switch for main lights',
          'Add red or amber night light for nighttime',
          'Avoid bright lights if you wake at night',
          'Consider motion-activated dim night lighting'
        ],
        relatedProtocols: ['evening-light-dimming', 'sleep-optimization']
      },
      {
        id: 'bathroom-water',
        title: 'Water Quality',
        description: 'Filter shower water to reduce chlorine and chemical exposure.',
        priority: 'recommended',
        impact: 'medium',
        costRange: '$30 - $200',
        difficulty: 'easy',
        scienceNote: 'Chlorine and chloramines in shower water are absorbed through skin and inhaled as steam.',
        steps: [
          'Install shower head filter',
          'Replace filter cartridges regularly',
          'Consider whole-house water filtration'
        ]
      }
    ],
    metrics: [
      { name: 'Cold Water Temp', ideal: '50-60°F (10-15°C)', icon: '🧊', importance: 'Target for cold exposure' },
      { name: 'Night Light', ideal: 'Red/amber only', icon: '🔴', importance: 'Preserves melatonin' }
    ],
    relatedEquipment: ['cold-shower-thermometer', 'ice-barrel', 'cold-plunge-chiller']
  },

  // ============================================================================
  // KITCHEN
  // ============================================================================
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: '🍳',
    description: 'Optimize for nutrition, food quality, and healthy eating patterns.',
    optimizations: [
      {
        id: 'kitchen-water',
        title: 'Water Filtration',
        description: 'Install water filtration for clean drinking and cooking water.',
        priority: 'essential',
        impact: 'high',
        costRange: '$50 - $500',
        difficulty: 'easy',
        scienceNote: 'Tap water contains chlorine, fluoride, heavy metals, and pharmaceutical residues that may impact health.',
        steps: [
          'Install under-sink RO filter or countertop system',
          'Consider adding minerals back if using RO',
          'Replace filters on schedule',
          'Test water quality periodically'
        ]
      },
      {
        id: 'kitchen-lighting',
        title: 'Meal Timing Cues',
        description: 'Use lighting to support circadian eating patterns.',
        priority: 'recommended',
        impact: 'medium',
        costRange: '$20 - $100',
        difficulty: 'easy',
        scienceNote: 'Eating late at night is associated with metabolic dysfunction. Evening kitchen lighting should discourage late eating.',
        steps: [
          'Install warm, dimmable lights',
          'Dim lights in evening to signal end of eating window',
          'Use bright lights during daytime for alertness'
        ],
        relatedProtocols: ['time-restricted-eating']
      },
      {
        id: 'kitchen-organization',
        title: 'Healthy Food Accessibility',
        description: 'Organize kitchen to make healthy choices easy.',
        priority: 'recommended',
        impact: 'medium',
        costRange: 'Free - $100',
        difficulty: 'easy',
        scienceNote: 'Environmental design significantly impacts food choices. Making healthy foods visible and accessible increases consumption.',
        steps: [
          'Keep healthy snacks visible and accessible',
          'Store less healthy foods out of sight',
          'Pre-prepare vegetables for easy use',
          'Use smaller plates to naturally reduce portions'
        ]
      },
      {
        id: 'kitchen-cookware',
        title: 'Non-Toxic Cookware',
        description: 'Use cookware that doesn\'t leach harmful chemicals.',
        priority: 'recommended',
        impact: 'medium',
        costRange: '$50 - $500',
        difficulty: 'easy',
        scienceNote: 'PFAS from non-stick coatings, aluminum, and plastics can leach into food and accumulate in the body.',
        steps: [
          'Replace non-stick with ceramic, cast iron, or stainless steel',
          'Avoid plastic containers for hot foods',
          'Use glass or stainless steel storage containers',
          'Avoid cooking with aluminum'
        ]
      }
    ],
    metrics: [
      { name: 'Water TDS', ideal: '< 50 ppm (filtered)', icon: '💧', importance: 'Indicates filtration quality' },
      { name: 'Eating Window', ideal: '8-10 hours', icon: '⏰', importance: 'Supports metabolic health' }
    ],
    relatedEquipment: ['water-filter', 'hydrogen-water']
  },

  // ============================================================================
  // LIVING ROOM / RECOVERY AREA
  // ============================================================================
  {
    id: 'living-room',
    name: 'Living Room / Recovery',
    icon: '🛋️',
    description: 'Create a dedicated space for relaxation, recovery, and wellness practices.',
    optimizations: [
      {
        id: 'living-recovery-zone',
        title: 'Recovery Zone Setup',
        description: 'Designate area for recovery practices like NSDR, stretching, and breathwork.',
        priority: 'recommended',
        impact: 'high',
        costRange: '$50 - $500',
        difficulty: 'easy',
        scienceNote: 'Having a dedicated space for recovery practices increases consistency and effectiveness.',
        steps: [
          'Designate a corner for yoga mat and recovery tools',
          'Keep foam roller, massage gun, and bands accessible',
          'Ensure space is quiet and comfortable',
          'Consider floor cushion for meditation'
        ],
        relatedProtocols: ['nsdr-yoga-nidra', 'morning-mobility', 'morning-meditation']
      },
      {
        id: 'living-light',
        title: 'Circadian Lighting',
        description: 'Implement lighting that shifts with time of day.',
        priority: 'essential',
        impact: 'high',
        costRange: '$50 - $300',
        difficulty: 'moderate',
        scienceNote: 'Most evening activities happen in living rooms. Proper lighting here is critical for melatonin preservation.',
        steps: [
          'Install smart bulbs that warm in evening',
          'Use lamps instead of overhead lights after sunset',
          'Set lights to auto-dim starting 2-3 hours before bed',
          'Add salt lamp or candles for minimal light option'
        ],
        relatedProtocols: ['evening-light-dimming']
      },
      {
        id: 'living-sauna',
        title: 'Heat Therapy Space',
        description: 'Create space for sauna blanket or infrared panel if no full sauna.',
        priority: 'recommended',
        impact: 'high',
        costRange: '$400 - $2,000',
        difficulty: 'easy',
        scienceNote: 'Heat exposure activates heat shock proteins and provides cardiovascular benefits similar to exercise.',
        steps: [
          'Designate area for sauna blanket use',
          'Lay down towels or protective mat',
          'Have water and electrolytes nearby',
          'Ensure good ventilation'
        ],
        relatedProtocols: ['sauna-protocol']
      },
      {
        id: 'living-red-light',
        title: 'Red Light Therapy Station',
        description: 'Install red light panel for morning and recovery use.',
        priority: 'recommended',
        impact: 'medium',
        costRange: '$300 - $1,500',
        difficulty: 'easy',
        scienceNote: 'Red and near-infrared light stimulate mitochondrial function and accelerate tissue recovery.',
        steps: [
          'Mount panel at appropriate height and distance',
          'Use in morning as part of light routine',
          'Use after workouts for recovery',
          'Start with 10-minute sessions'
        ],
        relatedProtocols: ['morning-light-exposure']
      }
    ],
    metrics: [
      { name: 'Evening Light', ideal: '< 100 lux, warm', icon: '🌙', importance: 'Protects melatonin' },
      { name: 'Recovery Space', ideal: 'Dedicated area', icon: '🧘', importance: 'Encourages consistent practice' }
    ],
    relatedEquipment: ['portable-sauna-blanket', 'red-light-panel', 'massage-gun', 'foam-roller']
  },

  // ============================================================================
  // OUTDOOR SPACE
  // ============================================================================
  {
    id: 'outdoor',
    name: 'Outdoor Space',
    icon: '🌳',
    description: 'Leverage outdoor areas for natural light, grounding, and thermal exposure.',
    optimizations: [
      {
        id: 'outdoor-morning-light',
        title: 'Morning Light Spot',
        description: 'Designate outdoor area for morning sunlight exposure.',
        priority: 'essential',
        impact: 'high',
        costRange: 'Free - $100',
        difficulty: 'easy',
        scienceNote: 'Natural morning light is far more effective than indoor light for circadian entrainment. Even cloudy days provide 10,000+ lux.',
        steps: [
          'Identify east-facing spot for morning sun',
          'Keep slippers or shoes by door for easy access',
          'Set weather-resistant chair if space allows',
          'Make it part of your non-negotiable morning routine'
        ],
        relatedProtocols: ['morning-light-exposure']
      },
      {
        id: 'outdoor-cold-plunge',
        title: 'Cold Plunge Setup',
        description: 'Install outdoor cold plunge for deliberate cold exposure.',
        priority: 'recommended',
        impact: 'high',
        costRange: '$1,000 - $10,000',
        difficulty: 'moderate',
        scienceNote: 'Cold immersion is more effective than cold showers for metabolic and mental benefits.',
        steps: [
          'Choose location near electrical for chiller (if using)',
          'Ensure drainage and water source access',
          'Consider privacy for outdoor use',
          'Install on level, stable surface'
        ],
        relatedProtocols: ['deliberate-cold-exposure']
      },
      {
        id: 'outdoor-sauna',
        title: 'Outdoor Sauna',
        description: 'Install outdoor sauna for heat exposure therapy.',
        priority: 'recommended',
        impact: 'high',
        costRange: '$3,000 - $15,000',
        difficulty: 'complex',
        scienceNote: 'Regular sauna use (4+ times/week) is associated with 40% reduction in all-cause mortality.',
        steps: [
          'Choose location with electrical access',
          'Ensure proper ventilation and drainage',
          'Consider proximity to cold plunge for contrast therapy',
          'Check local building codes'
        ],
        relatedProtocols: ['sauna-protocol']
      },
      {
        id: 'outdoor-grounding',
        title: 'Grounding/Earthing Area',
        description: 'Create space for direct contact with earth.',
        priority: 'recommended',
        impact: 'medium',
        costRange: 'Free',
        difficulty: 'easy',
        scienceNote: 'Earthing (direct contact with ground) may reduce inflammation and improve sleep, though research is emerging.',
        steps: [
          'Identify grassy or natural surface area',
          'Spend 10-20 minutes barefoot outdoors',
          'Combine with morning light exposure',
          'Consider grounding mat for indoor use'
        ]
      }
    ],
    metrics: [
      { name: 'Morning Sun', ideal: '10-30 min daily', icon: '☀️', importance: 'Critical for circadian rhythm' },
      { name: 'Nature Exposure', ideal: '2+ hours/week', icon: '🌲', importance: 'Reduces stress hormones' }
    ],
    relatedEquipment: ['ice-barrel', 'cold-plunge-chiller', 'barrel-sauna']
  }
];

// ============================================================================
// ENVIRONMENT ASSESSMENT QUESTIONS
// ============================================================================

export interface AssessmentQuestion {
  id: string;
  room: string;
  question: string;
  options: {
    text: string;
    score: number;
    recommendation?: string;
  }[];
}

export const environmentAssessment: AssessmentQuestion[] = [
  {
    id: 'bedroom-temp',
    room: 'bedroom',
    question: 'What is your bedroom temperature at night?',
    options: [
      { text: 'Below 65°F / 18°C', score: 80, recommendation: 'Great! Just ensure it\'s not too cold for comfort.' },
      { text: '65-68°F / 18-20°C', score: 100 },
      { text: '69-72°F / 21-22°C', score: 50, recommendation: 'Consider lowering to 65-68°F for better sleep.' },
      { text: 'Above 72°F / 22°C', score: 20, recommendation: 'This is likely impairing your sleep quality. Lower to 65-68°F.' }
    ]
  },
  {
    id: 'bedroom-light',
    room: 'bedroom',
    question: 'How dark is your bedroom at night?',
    options: [
      { text: 'Pitch black - can\'t see my hand', score: 100 },
      { text: 'Very dark with minimal light', score: 70, recommendation: 'Eliminate remaining light sources.' },
      { text: 'Some light from devices or outside', score: 40, recommendation: 'Add blackout curtains and cover LED lights.' },
      { text: 'Significant light exposure', score: 10, recommendation: 'Priority: blackout curtains and eliminate all light sources.' }
    ]
  },
  {
    id: 'morning-light',
    room: 'outdoor',
    question: 'Do you get natural sunlight within 1 hour of waking?',
    options: [
      { text: 'Yes, 10+ minutes outside daily', score: 100 },
      { text: 'Sometimes, a few times per week', score: 50, recommendation: 'Make morning light exposure a daily habit.' },
      { text: 'Rarely, I stay inside', score: 20, recommendation: 'Critical: Get outside within 30-60 min of waking.' },
      { text: 'I use a light therapy lamp', score: 80, recommendation: 'Good alternative. Try to get natural light when possible.' }
    ]
  },
  {
    id: 'office-air',
    room: 'home-office',
    question: 'Do you monitor air quality in your workspace?',
    options: [
      { text: 'Yes, CO2 stays below 800ppm', score: 100 },
      { text: 'Yes, but it often exceeds 1000ppm', score: 60, recommendation: 'Improve ventilation or get a HEPA purifier.' },
      { text: 'I have an air purifier but don\'t monitor CO2', score: 50, recommendation: 'Add a CO2 monitor for optimal cognition.' },
      { text: 'No air quality monitoring', score: 20, recommendation: 'Consider a CO2 monitor and air purifier.' }
    ]
  }
];

export default rooms;
