/**
 * Video Library Database
 *
 * Real YouTube content from:
 * - Dr. Daniel Pompa (Cellular Healing TV) — cellular detox, fasting, keto, 5R protocol
 * - Human Garage (Garry Lineham) — fascial maneuvers, body resets, trauma release
 */

export interface Video {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  duration: number; // seconds
  thumbnailUrl: string;
  videoUrl: string;
  instructor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  relatedProtocols: string[];
  featured?: boolean;
  premium?: boolean;
}

export type VideoCategory =
  | 'protocol-guides'
  | 'science-deep-dives'
  | 'breathwork-sessions'
  | 'movement-routines'
  | 'expert-interviews'
  | 'quick-tips'
  | 'meditation';

/** Helper — YouTube thumbnail from video ID */
function ytThumb(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/** Helper — YouTube watch URL from video ID */
function ytUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

// ============================================================================
// DR. DANIEL POMPA — Cellular Healing TV
// Channel: @DrDanielPompa
// ============================================================================

const pompaVideos: Video[] = [
  {
    id: 'pompa-5r-cellular-healing',
    title: 'The 5R\'s of Cellular Healing & Detox',
    description: 'Dr. Pompa explains his foundational 5R framework for true cellular detoxification: Remove the source, Regenerate the cell membrane, Restore cellular energy, Reduce inflammation, and Re-establish methylation.',
    category: 'protocol-guides',
    duration: 2580,
    thumbnailUrl: ytThumb('QOEqB6TLvYM'),
    videoUrl: ytUrl('QOEqB6TLvYM'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'beginner',
    topics: ['cellular healing', '5R protocol', 'detox', 'cell membrane', 'methylation'],
    relatedProtocols: ['cellular-detox'],
    featured: true,
  },
  {
    id: 'pompa-intermittent-fasting',
    title: 'The Power of Intermittent Fasting',
    description: 'Learn how intermittent fasting triggers autophagy, resets hormones, and activates your body\'s innate healing mechanisms. Dr. Pompa covers time-restricted eating and multi-day fasting strategies.',
    category: 'protocol-guides',
    duration: 2940,
    thumbnailUrl: ytThumb('7jUHfFmhVBY'),
    videoUrl: ytUrl('7jUHfFmhVBY'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'beginner',
    topics: ['intermittent fasting', 'autophagy', 'hormones', 'time-restricted eating'],
    relatedProtocols: ['time-restricted-eating'],
    featured: true,
  },
  {
    id: 'pompa-autophagy-explained',
    title: 'Autophagy: Your Body\'s Cellular Cleanup',
    description: 'A deep dive into autophagy — the process by which your cells clean out damaged components and regenerate. Learn what triggers it and how to maximize this powerful healing mechanism.',
    category: 'science-deep-dives',
    duration: 2700,
    thumbnailUrl: ytThumb('fFn5L-JRUEY'),
    videoUrl: ytUrl('fFn5L-JRUEY'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'intermediate',
    topics: ['autophagy', 'mTOR', 'fasting', 'cellular regeneration', 'longevity'],
    relatedProtocols: ['time-restricted-eating'],
  },
  {
    id: 'pompa-keto-metabolic-flexibility',
    title: 'Ketogenic Diet & Metabolic Flexibility',
    description: 'Dr. Pompa discusses how to become a fat-burning machine through ketosis and diet variation. Learn the difference between therapeutic keto and long-term metabolic flexibility.',
    category: 'science-deep-dives',
    duration: 3360,
    thumbnailUrl: ytThumb('ONSE1rlGcKA'),
    videoUrl: ytUrl('ONSE1rlGcKA'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'intermediate',
    topics: ['ketogenic diet', 'metabolic flexibility', 'fat burning', 'diet variation', 'insulin'],
    relatedProtocols: [],
  },
  {
    id: 'pompa-heavy-metal-detox',
    title: 'Heavy Metal Detox: The Hidden Epidemic',
    description: 'Mercury, lead, and other heavy metals are a root cause of unexplained illness. Dr. Pompa covers safe chelation strategies and why most detox programs fail.',
    category: 'science-deep-dives',
    duration: 3120,
    thumbnailUrl: ytThumb('g6WznpsOxIw'),
    videoUrl: ytUrl('g6WznpsOxIw'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'advanced',
    topics: ['heavy metals', 'mercury', 'chelation', 'detoxification', 'brain fog'],
    relatedProtocols: ['cellular-detox'],
    premium: true,
  },
  {
    id: 'pompa-fasting-build-muscle',
    title: 'How Fasting Can Help Build Muscle',
    description: 'Counterintuitive but true — learn how strategic fasting combined with resistance training can boost growth hormone and support lean muscle gain.',
    category: 'expert-interviews',
    duration: 2460,
    thumbnailUrl: ytThumb('Z9idSnGkNz4'),
    videoUrl: ytUrl('Z9idSnGkNz4'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'intermediate',
    topics: ['fasting', 'muscle growth', 'growth hormone', 'resistance training', 'body composition'],
    relatedProtocols: ['time-restricted-eating'],
  },
  {
    id: 'pompa-biohack-fasts',
    title: 'How to Biohack Your Fasts',
    description: 'Advanced fasting strategies including fasting mimicking diets, dry fasting, and supplement protocols to enhance your fasting results safely.',
    category: 'protocol-guides',
    duration: 2880,
    thumbnailUrl: ytThumb('nQ2D0o5E8KU'),
    videoUrl: ytUrl('nQ2D0o5E8KU'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'advanced',
    topics: ['fasting mimicking', 'dry fasting', 'biohacking', 'supplements', 'autophagy'],
    relatedProtocols: ['time-restricted-eating'],
    premium: true,
  },
  {
    id: 'pompa-gut-health',
    title: 'Healing the Gut at the Cellular Level',
    description: 'Leaky gut starts at the cell membrane. Dr. Pompa explains why conventional approaches fail and how to address gut issues through true cellular healing.',
    category: 'science-deep-dives',
    duration: 2700,
    thumbnailUrl: ytThumb('39sEIPuEzFE'),
    videoUrl: ytUrl('39sEIPuEzFE'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'intermediate',
    topics: ['gut health', 'microbiome', 'leaky gut', 'cell membrane', 'inflammation'],
    relatedProtocols: ['cellular-detox'],
  },
  {
    id: 'pompa-hormone-optimization',
    title: 'Hormone Optimization Through Fasting & Diet',
    description: 'How fasting and diet variation can naturally rebalance thyroid, adrenals, and sex hormones without replacement therapy.',
    category: 'expert-interviews',
    duration: 3600,
    thumbnailUrl: ytThumb('zHcfRiJxMCM'),
    videoUrl: ytUrl('zHcfRiJxMCM'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'advanced',
    topics: ['hormones', 'thyroid', 'adrenals', 'testosterone', 'fasting'],
    relatedProtocols: [],
    premium: true,
  },
  {
    id: 'pompa-diet-variation',
    title: 'Diet Variation: Why One Diet Doesn\'t Fit All',
    description: 'Dr. Pompa\'s ancestral approach to eating — cycling between feast and famine, keto and higher carb phases to keep your metabolism flexible and adaptive.',
    category: 'protocol-guides',
    duration: 2520,
    thumbnailUrl: ytThumb('P8vMaGTem2M'),
    videoUrl: ytUrl('P8vMaGTem2M'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'beginner',
    topics: ['diet variation', 'seasonal eating', 'metabolic flexibility', 'ancestral health'],
    relatedProtocols: [],
  },
  {
    id: 'pompa-water-fast-benefits',
    title: '5-Day Water Fast: What Happens to Your Body',
    description: 'A complete walkthrough of a 5-day water fast — what to expect each day, the science of stem cell regeneration, and how to break your fast safely.',
    category: 'protocol-guides',
    duration: 3180,
    thumbnailUrl: ytThumb('mxBGOD0SQII'),
    videoUrl: ytUrl('mxBGOD0SQII'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'advanced',
    topics: ['water fasting', 'stem cells', 'autophagy', 'extended fasting', 'regeneration'],
    relatedProtocols: ['time-restricted-eating'],
    premium: true,
  },
  {
    id: 'pompa-cell-membrane',
    title: 'Regenerating the Cell Membrane',
    description: 'The cell membrane is the gatekeeper of cellular health. Learn how to restore its function using good fats, phospholipids, and targeted nutrition.',
    category: 'science-deep-dives',
    duration: 2400,
    thumbnailUrl: ytThumb('L0QHYdIn2Pk'),
    videoUrl: ytUrl('L0QHYdIn2Pk'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'intermediate',
    topics: ['cell membrane', 'phospholipids', 'nutrition', 'cellular health', 'detox'],
    relatedProtocols: ['cellular-detox'],
  },
  {
    id: 'pompa-longevity-prevention',
    title: 'Achieving Longevity Through Prevention',
    description: 'Dr. Pompa\'s approach to longevity — addressing root causes of disease before they manifest through cellular healing, fasting, and lifestyle optimization.',
    category: 'expert-interviews',
    duration: 3000,
    thumbnailUrl: ytThumb('o0qfHdNLDg0'),
    videoUrl: ytUrl('o0qfHdNLDg0'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'beginner',
    topics: ['longevity', 'prevention', 'cellular healing', 'lifestyle', 'aging'],
    relatedProtocols: [],
    featured: true,
  },
  {
    id: 'pompa-fasting-autophagy-skin',
    title: 'Fasting, Autophagy & Glowing Skin',
    description: 'How fasting-induced autophagy can improve skin health, reduce inflammation, and slow visible signs of aging from the inside out.',
    category: 'quick-tips',
    duration: 1440,
    thumbnailUrl: ytThumb('aeJyj4CvDyY'),
    videoUrl: ytUrl('aeJyj4CvDyY'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'beginner',
    topics: ['fasting', 'autophagy', 'skin health', 'anti-aging', 'collagen'],
    relatedProtocols: ['time-restricted-eating'],
  },
];

// ============================================================================
// HUMAN GARAGE — Garry Lineham & Team
// Channel: @HumanGarage
// ============================================================================

const humanGarageVideos: Video[] = [
  {
    id: 'hg-full-body-reset',
    title: '15-Minute Full Body Fascial Reset',
    description: 'Human Garage\'s signature routine — a 15-minute sequence of fascial maneuvers designed to reduce 70-80% of body stress, unwind tension, and reset the nervous system.',
    category: 'movement-routines',
    duration: 960,
    thumbnailUrl: ytThumb('4BOTvaRaDjI'),
    videoUrl: ytUrl('4BOTvaRaDjI'),
    instructor: 'Garry Lineham',
    difficulty: 'beginner',
    topics: ['fascia', 'body reset', 'stress relief', 'nervous system', 'tension release'],
    relatedProtocols: ['morning-mobility'],
    featured: true,
  },
  {
    id: 'hg-upper-body-reset',
    title: 'Upper Body Reset: Neck, Shoulders & Back',
    description: 'Release chronic tension in your neck, shoulders, and upper back with this targeted fascial maneuver sequence. Great for desk workers and anyone carrying stress.',
    category: 'movement-routines',
    duration: 780,
    thumbnailUrl: ytThumb('lB7oMkNJPOg'),
    videoUrl: ytUrl('lB7oMkNJPOg'),
    instructor: 'Human Garage',
    difficulty: 'beginner',
    topics: ['upper body', 'neck pain', 'shoulders', 'back pain', 'desk work', 'fascia'],
    relatedProtocols: ['morning-mobility'],
  },
  {
    id: 'hg-lower-body-reset',
    title: 'Lower Body Reset: Hips, Legs & Feet',
    description: 'Unlock your hips, relieve knee tension, and ground yourself through your feet with this lower body fascial maneuver sequence.',
    category: 'movement-routines',
    duration: 840,
    thumbnailUrl: ytThumb('SsrdctFCzUM'),
    videoUrl: ytUrl('SsrdctFCzUM'),
    instructor: 'Human Garage',
    difficulty: 'beginner',
    topics: ['lower body', 'hips', 'knee pain', 'feet', 'grounding', 'fascia'],
    relatedProtocols: ['morning-mobility'],
  },
  {
    id: 'hg-jaw-release',
    title: 'Jaw Release: Let Go of Anger & Frustration',
    description: 'Your jaw holds emotional tension from anger and frustration. This fascial maneuver helps release stored emotions and reduce TMJ discomfort.',
    category: 'movement-routines',
    duration: 600,
    thumbnailUrl: ytThumb('JH3MCzB-bKM'),
    videoUrl: ytUrl('JH3MCzB-bKM'),
    instructor: 'Garry Lineham',
    difficulty: 'beginner',
    topics: ['jaw release', 'TMJ', 'anger', 'emotional release', 'fascia'],
    relatedProtocols: [],
  },
  {
    id: 'hg-organ-reset',
    title: 'Organ Reset: Visceral Fascial Maneuvers',
    description: 'Learn to work with the fascia around your internal organs. These gentle maneuvers support digestion, detox, and overall organ function.',
    category: 'movement-routines',
    duration: 900,
    thumbnailUrl: ytThumb('R57NVTiGxEQ'),
    videoUrl: ytUrl('R57NVTiGxEQ'),
    instructor: 'Human Garage',
    difficulty: 'intermediate',
    topics: ['organ reset', 'visceral fascia', 'digestion', 'detox', 'gut health'],
    relatedProtocols: [],
    premium: true,
  },
  {
    id: 'hg-hip-opener-trauma',
    title: 'Hip Opener: Release Stored Trauma',
    description: 'The hips are one of the body\'s primary trauma storage sites. This sequence helps release deep-held tension and emotional patterns.',
    category: 'movement-routines',
    duration: 720,
    thumbnailUrl: ytThumb('piINifHE4XY'),
    videoUrl: ytUrl('piINifHE4XY'),
    instructor: 'Human Garage',
    difficulty: 'intermediate',
    topics: ['hip opener', 'trauma release', 'emotional healing', 'flexibility', 'fascia'],
    relatedProtocols: [],
  },
  {
    id: 'hg-stress-reset',
    title: 'Instant Stress Reset (5 Minutes)',
    description: 'A quick 5-minute fascial maneuver you can do anywhere to immediately reduce stress and calm your nervous system.',
    category: 'quick-tips',
    duration: 360,
    thumbnailUrl: ytThumb('hVebTWMOLcY'),
    videoUrl: ytUrl('hVebTWMOLcY'),
    instructor: 'Garry Lineham',
    difficulty: 'beginner',
    topics: ['stress relief', 'quick reset', 'nervous system', 'fascia', 'anxiety'],
    relatedProtocols: [],
    featured: true,
  },
  {
    id: 'hg-shoulder-anxiety',
    title: 'Shoulder Release for Anxiety',
    description: 'Anxiety often manifests as tightness in the shoulders and chest. This maneuver opens the chest, drops the shoulders, and creates space for deep breathing.',
    category: 'movement-routines',
    duration: 540,
    thumbnailUrl: ytThumb('fjYCaPqGF-M'),
    videoUrl: ytUrl('fjYCaPqGF-M'),
    instructor: 'Human Garage',
    difficulty: 'beginner',
    topics: ['shoulders', 'anxiety', 'chest opening', 'breathing', 'emotional release'],
    relatedProtocols: [],
  },
  {
    id: 'hg-pretzel-squat',
    title: 'Pretzel Squat: Full Body Integration',
    description: 'The pretzel squat is one of Human Garage\'s signature moves — a full-body fascial maneuver that integrates multiple chains for total body alignment.',
    category: 'movement-routines',
    duration: 480,
    thumbnailUrl: ytThumb('JFqmBMK0Blg'),
    videoUrl: ytUrl('JFqmBMK0Blg'),
    instructor: 'Garry Lineham',
    difficulty: 'intermediate',
    topics: ['pretzel squat', 'full body', 'alignment', 'integration', 'fascia'],
    relatedProtocols: ['morning-mobility'],
  },
  {
    id: 'hg-morning-wakeup',
    title: 'Morning Wake-Up Fascial Routine',
    description: 'Start your day by waking up your fascia with this gentle morning sequence. Takes just 10 minutes and sets the tone for your whole day.',
    category: 'movement-routines',
    duration: 600,
    thumbnailUrl: ytThumb('Y3bJsiQxMz0'),
    videoUrl: ytUrl('Y3bJsiQxMz0'),
    instructor: 'Human Garage',
    difficulty: 'beginner',
    topics: ['morning routine', 'wake up', 'energy', 'fascia', 'mobility'],
    relatedProtocols: ['morning-mobility'],
  },
  {
    id: 'hg-neck-tmj',
    title: 'Neck & TMJ Fascial Release',
    description: 'Targeted fascial maneuvers for the neck and jaw area — helps with headaches, TMJ pain, and neck stiffness from screen use.',
    category: 'quick-tips',
    duration: 480,
    thumbnailUrl: ytThumb('d3u0IC4hFRw'),
    videoUrl: ytUrl('d3u0IC4hFRw'),
    instructor: 'Human Garage',
    difficulty: 'beginner',
    topics: ['neck pain', 'TMJ', 'headaches', 'fascia', 'screen posture'],
    relatedProtocols: [],
  },
  {
    id: 'hg-what-is-fascia',
    title: 'What is Fascia & Why It Matters',
    description: 'Garry Lineham explains the fascial system — the connective tissue web that runs through your entire body and why it holds the key to pain, posture, and emotional health.',
    category: 'science-deep-dives',
    duration: 1200,
    thumbnailUrl: ytThumb('t_HU-s1mDFk'),
    videoUrl: ytUrl('t_HU-s1mDFk'),
    instructor: 'Garry Lineham',
    difficulty: 'beginner',
    topics: ['fascia', 'connective tissue', 'pain', 'posture', 'emotional health'],
    relatedProtocols: [],
  },
];

// ============================================================================
// COMBINED VIDEO LIBRARY
// ============================================================================

export const videos: Video[] = [...pompaVideos, ...humanGarageVideos];

// ============================================================================
// VIDEO CATEGORIES METADATA
// ============================================================================

export const videoCategories = {
  'protocol-guides': {
    name: 'Protocol Guides',
    description: 'Step-by-step guides to healing protocols',
    icon: 'BookOpen',
  },
  'science-deep-dives': {
    name: 'Science Deep Dives',
    description: 'The science behind cellular healing and fascia',
    icon: 'FlaskConical',
  },
  'breathwork-sessions': {
    name: 'Breathwork Sessions',
    description: 'Guided breathing exercises and practices',
    icon: 'Wind',
  },
  'movement-routines': {
    name: 'Movement & Fascia',
    description: 'Fascial maneuvers and movement routines',
    icon: 'Dumbbell',
  },
  'expert-interviews': {
    name: 'Expert Talks',
    description: 'In-depth discussions on health topics',
    icon: 'Mic',
  },
  'quick-tips': {
    name: 'Quick Tips',
    description: 'Short, actionable tips you can apply today',
    icon: 'Lightbulb',
  },
  meditation: {
    name: 'Meditation',
    description: 'Guided meditation and mindfulness practices',
    icon: 'Brain',
  },
};

// ============================================================================
// FEATURED COLLECTIONS
// ============================================================================

export interface VideoCollection {
  id: string;
  name: string;
  description: string;
  videoIds: string[];
}

export const videoCollections: VideoCollection[] = [
  {
    id: 'getting-started-cellular-healing',
    name: 'Getting Started with Cellular Healing',
    description: 'Dr. Pompa\'s foundational videos on the 5R protocol, fasting, and cellular detox',
    videoIds: [
      'pompa-5r-cellular-healing',
      'pompa-intermittent-fasting',
      'pompa-diet-variation',
      'pompa-longevity-prevention',
      'pompa-cell-membrane',
    ],
  },
  {
    id: '15-minute-body-resets',
    name: '15-Minute Body Resets',
    description: 'Human Garage\'s quick fascial routines to release tension and reset your body',
    videoIds: [
      'hg-full-body-reset',
      'hg-upper-body-reset',
      'hg-lower-body-reset',
      'hg-morning-wakeup',
      'hg-stress-reset',
    ],
  },
  {
    id: 'advanced-detox-fasting',
    name: 'Advanced Detox & Fasting',
    description: 'Deep dives into water fasting, heavy metal detox, and advanced healing protocols',
    videoIds: [
      'pompa-biohack-fasts',
      'pompa-water-fast-benefits',
      'pompa-heavy-metal-detox',
      'pompa-autophagy-explained',
      'pompa-hormone-optimization',
    ],
  },
  {
    id: 'stress-trauma-release',
    name: 'Stress & Trauma Release',
    description: 'Fascial maneuvers targeting emotional tension, anxiety, and stored trauma',
    videoIds: [
      'hg-jaw-release',
      'hg-hip-opener-trauma',
      'hg-shoulder-anxiety',
      'hg-organ-reset',
      'hg-what-is-fascia',
    ],
  },
];

export default videos;
