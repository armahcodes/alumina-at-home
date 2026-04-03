/**
 * Video Library Database
 *
 * YouTube sources (handles verified via channel pages + oEmbed on each video ID):
 * - Dr. Daniel Pompa — https://www.youtube.com/@DrDanielPompa
 * - Gary Brecka — https://www.youtube.com/@garybrecka (long-form + topic clips)
 * - Human Garage (Garry Lineham & team) — https://www.youtube.com/@HumanGarage
 *
 * Thumbnails use YouTube’s CDN: https://img.youtube.com/vi/{id}/mqdefault.jpg
 */

export interface Video {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  duration: number; // seconds (approximate when not extracted from API)
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

/** YouTube thumbnail from video ID (mqdefault is available for almost all public videos) */
function ytThumb(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

function ytUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

// ============================================================================
// DR. DANIEL POMPA — @DrDanielPompa
// ============================================================================

const pompaVideos: Video[] = [
  {
    id: 'pompa-5r-cellular-healing',
    title: 'True Cellular Detox: A Road Map to Fixing the Cell',
    description:
      'Dr. Pompa outlines how true cellular detox works as a roadmap to fix the cell — the foundation behind his cellular healing approach.',
    category: 'protocol-guides',
    duration: 1200,
    thumbnailUrl: ytThumb('yNGj7tM4lN4'),
    videoUrl: ytUrl('yNGj7tM4lN4'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'beginner',
    topics: ['cellular healing', 'detox', 'cell membrane', 'true cellular detox'],
    relatedProtocols: ['cellular-detox'],
    featured: true,
  },
  {
    id: 'pompa-intermittent-fasting',
    title: 'See the Newest Intermittent Fasting Study?! Is It Dangerous?',
    description:
      'Dr. Pompa breaks down a recent intermittent fasting study and what it means for safety, metabolism, and how you time meals.',
    category: 'protocol-guides',
    duration: 900,
    thumbnailUrl: ytThumb('fEoZ67huT2E'),
    videoUrl: ytUrl('fEoZ67huT2E'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'beginner',
    topics: ['intermittent fasting', 'studies', 'metabolism', 'time-restricted eating'],
    relatedProtocols: ['time-restricted-eating'],
    featured: true,
  },
  {
    id: 'pompa-autophagy-explained',
    title: 'What is Autophagy?',
    description:
      'A focused explanation of autophagy — how cells clear damaged parts and why fasting and lifestyle affect this cleanup process.',
    category: 'science-deep-dives',
    duration: 720,
    thumbnailUrl: ytThumb('fOkVqtJh0dY'),
    videoUrl: ytUrl('fOkVqtJh0dY'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'intermediate',
    topics: ['autophagy', 'fasting', 'cellular regeneration', 'longevity'],
    relatedProtocols: ['time-restricted-eating'],
  },
  {
    id: 'pompa-keto-metabolic-flexibility',
    title: 'Why Ketosis is Different From ANY Other Diet | Dr. Pompa',
    description:
      'How ketosis differs from typical diets, fat adaptation, and what metabolic flexibility looks like in practice.',
    category: 'science-deep-dives',
    duration: 1080,
    thumbnailUrl: ytThumb('_qdKpjMQLeg'),
    videoUrl: ytUrl('_qdKpjMQLeg'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'intermediate',
    topics: ['ketogenic diet', 'metabolic flexibility', 'fat burning', 'ketosis'],
    relatedProtocols: [],
  },
  {
    id: 'pompa-heavy-metal-detox',
    title: 'Heavy Metal Detox Done Right — Safe Chelation and Mercury',
    description:
      'Why heavy metals matter, how detox often goes wrong, and safer framing around chelation and mercury exposure.',
    category: 'science-deep-dives',
    duration: 1800,
    thumbnailUrl: ytThumb('oXurlnMzPVE'),
    videoUrl: ytUrl('oXurlnMzPVE'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'advanced',
    topics: ['heavy metals', 'mercury', 'chelation', 'detoxification'],
    relatedProtocols: ['cellular-detox'],
    premium: true,
  },
  {
    id: 'pompa-fasting-build-muscle',
    title: 'Intermittent Fasting, Growth Hormone and Anti-Aging — CHTV Episode 38',
    description:
      'Discussion of intermittent fasting in the context of growth hormone, aging, and how fasting intersects with muscle and longevity.',
    category: 'expert-interviews',
    duration: 2400,
    thumbnailUrl: ytThumb('VJCk4kN16ac'),
    videoUrl: ytUrl('VJCk4kN16ac'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'intermediate',
    topics: ['fasting', 'growth hormone', 'muscle', 'anti-aging'],
    relatedProtocols: ['time-restricted-eating'],
  },
  {
    id: 'pompa-biohack-fasts',
    title: 'How to Biohack your Fasts — CHTV 282',
    description:
      'Practical ideas for structuring fasts and supporting the process — from a cellular healing and biohacking lens.',
    category: 'protocol-guides',
    duration: 2100,
    thumbnailUrl: ytThumb('Vwu-xASWsq0'),
    videoUrl: ytUrl('Vwu-xASWsq0'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'advanced',
    topics: ['fasting', 'biohacking', 'autophagy', 'protocols'],
    relatedProtocols: ['time-restricted-eating'],
    premium: true,
  },
  {
    id: 'pompa-gut-health',
    title: 'How to Heal Your Leaky Gut with Dr. Daniel Pompa',
    description:
      'Approach to leaky gut and gut healing tied to upstream drivers like inflammation and cellular health.',
    category: 'science-deep-dives',
    duration: 1500,
    thumbnailUrl: ytThumb('Wdgp_d6Iu2M'),
    videoUrl: ytUrl('Wdgp_d6Iu2M'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'intermediate',
    topics: ['gut health', 'leaky gut', 'inflammation', 'healing'],
    relatedProtocols: ['cellular-detox'],
  },
  {
    id: 'pompa-hormone-optimization',
    title: "Why You Can't Fix Your Hormones & The Best Test | Dr. Pompa Explains",
    description:
      'Why hormone issues persist without addressing root causes, and how to think about testing and priorities.',
    category: 'expert-interviews',
    duration: 1200,
    thumbnailUrl: ytThumb('B8Zv43wlgSA'),
    videoUrl: ytUrl('B8Zv43wlgSA'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'advanced',
    topics: ['hormones', 'testing', 'thyroid', 'root cause'],
    relatedProtocols: [],
    premium: true,
  },
  {
    id: 'pompa-diet-variation',
    title: 'What is Diet Variation and Why is it the Best "Diet?"',
    description:
      'Feast–famine cycles, variation across the week or season, and why metabolic flexibility beats a single static diet.',
    category: 'protocol-guides',
    duration: 1080,
    thumbnailUrl: ytThumb('z2ul1dasOXY'),
    videoUrl: ytUrl('z2ul1dasOXY'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'beginner',
    topics: ['diet variation', 'metabolic flexibility', 'feast famine', 'carb cycling'],
    relatedProtocols: [],
  },
  {
    id: 'pompa-water-fast-benefits',
    title: 'Pros and Cons — Water Fast, Partial Fast, Fasting Mimicking Diet',
    description:
      'Compares water fasting, partial fasting, and fasting-mimicking approaches so you can understand tradeoffs.',
    category: 'protocol-guides',
    duration: 1800,
    thumbnailUrl: ytThumb('pQ2LSjM9IGo'),
    videoUrl: ytUrl('pQ2LSjM9IGo'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'advanced',
    topics: ['water fasting', 'FMD', 'partial fast', 'extended fasting'],
    relatedProtocols: ['time-restricted-eating'],
    premium: true,
  },
  {
    id: 'pompa-cell-membrane',
    title: "R2 REGENERATE THE CELL MEMBRANE | The 5R's of Health & Healing",
    description:
      'Part of the 5R series: regenerating the cell membrane, fats, and why membrane health drives detox and hormone signaling.',
    category: 'science-deep-dives',
    duration: 900,
    thumbnailUrl: ytThumb('_N4oy6yDBJg'),
    videoUrl: ytUrl('_N4oy6yDBJg'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'intermediate',
    topics: ['cell membrane', '5R protocol', 'fats', 'cellular health'],
    relatedProtocols: ['cellular-detox'],
  },
  {
    id: 'pompa-longevity-prevention',
    title: 'Achieving Longevity through Prevention — CHTV 217',
    description:
      'Prevention-first longevity — addressing drivers of disease before they fully manifest.',
    category: 'expert-interviews',
    duration: 2400,
    thumbnailUrl: ytThumb('DPgO9UGaNdg'),
    videoUrl: ytUrl('DPgO9UGaNdg'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'beginner',
    topics: ['longevity', 'prevention', 'lifestyle', 'aging'],
    relatedProtocols: [],
    featured: true,
  },
  {
    id: 'pompa-fasting-autophagy-skin',
    title: 'Fasting, Autophagy, and Glowing Skin with Naomi Whittel — CHTV 246',
    description:
      'Conversation on fasting, autophagy, and skin health from a cellular and lifestyle perspective.',
    category: 'quick-tips',
    duration: 2700,
    thumbnailUrl: ytThumb('DyWsimG-7SA'),
    videoUrl: ytUrl('DyWsimG-7SA'),
    instructor: 'Dr. Daniel Pompa',
    difficulty: 'beginner',
    topics: ['fasting', 'autophagy', 'skin', 'collagen'],
    relatedProtocols: ['time-restricted-eating'],
  },
];

// ============================================================================
// GARY BRECKA — @garybrecka
// ============================================================================

const breckaVideos: Video[] = [
  {
    id: 'brecka-brad-lea-full-episode',
    title: 'Dropping Bombs with Brad Lea x Gary Brecka | Full Episode',
    description:
      'Long-form interview covering human biology, performance, and practical health ideas from Gary Brecka’s perspective.',
    category: 'expert-interviews',
    duration: 5400,
    thumbnailUrl: ytThumb('Bl4Cgvb_edM'),
    videoUrl: ytUrl('Bl4Cgvb_edM'),
    instructor: 'Gary Brecka',
    difficulty: 'beginner',
    topics: ['longevity', 'performance', 'human biology', 'interview'],
    relatedProtocols: [],
    featured: true,
  },
  {
    id: 'brecka-10x-speech',
    title: '10X Growth Conference x Gary Brecka | Full Speech',
    description:
      'Keynote-style talk on health, energy, and optimization from a 10X Growth Conference stage.',
    category: 'expert-interviews',
    duration: 3600,
    thumbnailUrl: ytThumb('KN0-pPbvzZY'),
    videoUrl: ytUrl('KN0-pPbvzZY'),
    instructor: 'Gary Brecka',
    difficulty: 'beginner',
    topics: ['mindset', 'health', 'performance', 'speaking'],
    relatedProtocols: [],
  },
  {
    id: 'brecka-path-mastery',
    title: 'Path To Mastery x Gary Brecka',
    description:
      'Discussion on mastery, discipline, and applying biology-backed habits in daily life.',
    category: 'expert-interviews',
    duration: 3600,
    thumbnailUrl: ytThumb('iE07t-131GY'),
    videoUrl: ytUrl('iE07t-131GY'),
    instructor: 'Gary Brecka',
    difficulty: 'beginner',
    topics: ['mastery', 'habits', 'performance'],
    relatedProtocols: [],
  },
  {
    id: 'brecka-sleep',
    title: 'The Importance of Sleep | Gary Brecka',
    description:
      'Short breakdown on deep sleep, recovery, and why sleep is a lever for mood, metabolism, and focus.',
    category: 'quick-tips',
    duration: 120,
    thumbnailUrl: ytThumb('lXwPwutw0co'),
    videoUrl: ytUrl('lXwPwutw0co'),
    instructor: 'Gary Brecka',
    difficulty: 'beginner',
    topics: ['sleep', 'recovery', 'deep sleep', 'circadian'],
    relatedProtocols: ['evening-light-dimming'],
    featured: true,
  },
  {
    id: 'brecka-cold-showers',
    title: 'How to take cold showers | Gary Brecka',
    description:
      'Quick guidance on using cold exposure and cold showers as a resilience and recovery tool.',
    category: 'quick-tips',
    duration: 90,
    thumbnailUrl: ytThumb('Aepjq-Ula2w'),
    videoUrl: ytUrl('Aepjq-Ula2w'),
    instructor: 'Gary Brecka',
    difficulty: 'beginner',
    topics: ['cold exposure', 'cold shower', 'resilience', 'stress'],
    relatedProtocols: ['cold-shower-basic'],
    featured: true,
  },
  {
    id: 'brecka-breathwork',
    title: 'Why do Breathwork | Gary Brecka',
    description:
      'Why breathwork matters for nervous system regulation and performance.',
    category: 'breathwork-sessions',
    duration: 90,
    thumbnailUrl: ytThumb('39Nrf4Ssv0c'),
    videoUrl: ytUrl('39Nrf4Ssv0c'),
    instructor: 'Gary Brecka',
    difficulty: 'beginner',
    topics: ['breathwork', 'nervous system', 'stress', 'HRV'],
    relatedProtocols: [],
  },
  {
    id: 'brecka-four-oils',
    title: 'The 4 Oils you Need | Gary Brecka',
    description:
      'Overview of dietary fats and oils often emphasized in a whole-food, low-seed-oil framing.',
    category: 'quick-tips',
    duration: 90,
    thumbnailUrl: ytThumb('jdTsKMArg5s'),
    videoUrl: ytUrl('jdTsKMArg5s'),
    instructor: 'Gary Brecka',
    difficulty: 'beginner',
    topics: ['fats', 'nutrition', 'oils', 'omega-3'],
    relatedProtocols: [],
  },
  {
    id: 'brecka-autoimmune',
    title: 'Autoimmune diseases | Gary Brecka',
    description:
      'High-level perspective on autoimmune disease and biology-backed lifestyle context (not medical advice).',
    category: 'science-deep-dives',
    duration: 120,
    thumbnailUrl: ytThumb('9UU2JE3FgVE'),
    videoUrl: ytUrl('9UU2JE3FgVE'),
    instructor: 'Gary Brecka',
    difficulty: 'intermediate',
    topics: ['autoimmune', 'inflammation', 'immune system'],
    relatedProtocols: [],
    premium: true,
  },
  {
    id: 'brecka-tap-water',
    title: 'Do not Drink Tapwater | Gary Brecka',
    description:
      'Short clip on water quality considerations and filtering mindset (verify for your locality).',
    category: 'quick-tips',
    duration: 90,
    thumbnailUrl: ytThumb('2ma1r5o_ilQ'),
    videoUrl: ytUrl('2ma1r5o_ilQ'),
    instructor: 'Gary Brecka',
    difficulty: 'beginner',
    topics: ['water', 'hydration', 'filtration'],
    relatedProtocols: [],
  },
  {
    id: 'brecka-depression-truth',
    title: 'The Truth about Depression | Gary Brecka',
    description:
      'Discussion framing depression through a biological lens; not a substitute for professional care.',
    category: 'science-deep-dives',
    duration: 120,
    thumbnailUrl: ytThumb('hOYJLO2xbss'),
    videoUrl: ytUrl('hOYJLO2xbss'),
    instructor: 'Gary Brecka',
    difficulty: 'intermediate',
    topics: ['mental health', 'depression', 'neuroscience'],
    relatedProtocols: [],
    premium: true,
  },
];

// ============================================================================
// HUMAN GARAGE — Garry Lineham & team (@HumanGarage)
// Channel display name on YouTube: "Human Garage TV"
// ============================================================================

const humanGarageVideos: Video[] = [
  {
    id: 'hg-full-body-reset',
    title: '15 Minute Full Body Stress Reset: Self-Care Fascial Maneuvers',
    description:
      'Human Garage’s guided sequence to unwind stress through self-applied fascial maneuvers in about fifteen minutes.',
    category: 'movement-routines',
    duration: 960,
    thumbnailUrl: ytThumb('wzef2nA9anw'),
    videoUrl: ytUrl('wzef2nA9anw'),
    instructor: 'Garry Lineham (Human Garage)',
    difficulty: 'beginner',
    topics: ['fascia', 'body reset', 'stress relief', 'nervous system'],
    relatedProtocols: ['morning-mobility'],
    featured: true,
  },
  {
    id: 'hg-upper-body-reset',
    title: 'Tight Traps & Shoulders? Try This Vagus Nerve Release & Unwind Tension',
    description:
      'Upper-back and shoulder release using vagus-nerve–oriented fascial work to drop tension.',
    category: 'movement-routines',
    duration: 600,
    thumbnailUrl: ytThumb('yxNycxcyWhQ'),
    videoUrl: ytUrl('yxNycxcyWhQ'),
    instructor: 'Human Garage',
    difficulty: 'beginner',
    topics: ['upper body', 'shoulders', 'traps', 'vagus nerve'],
    relatedProtocols: ['morning-mobility'],
  },
  {
    id: 'hg-lower-body-reset',
    title: 'Lower Body Fascia Reset for the hips, knees and legs',
    description:
      'Targets hips, knees, and legs to improve mobility and reduce stored lower-body tension.',
    category: 'movement-routines',
    duration: 720,
    thumbnailUrl: ytThumb('nrC5RKXSRh8'),
    videoUrl: ytUrl('nrC5RKXSRh8'),
    instructor: 'Human Garage',
    difficulty: 'beginner',
    topics: ['lower body', 'hips', 'knees', 'legs', 'fascia'],
    relatedProtocols: ['morning-mobility'],
  },
  {
    id: 'hg-jaw-release',
    title: 'The Link Between Jaw & Neck Pain & Your Emotions',
    description:
      'How jaw and neck tension connect to stress and anger — with fascial release concepts.',
    category: 'movement-routines',
    duration: 180,
    thumbnailUrl: ytThumb('GG8LdOuFc60'),
    videoUrl: ytUrl('GG8LdOuFc60'),
    instructor: 'Garry Lineham (Human Garage)',
    difficulty: 'beginner',
    topics: ['jaw', 'TMJ', 'neck', 'emotions', 'stress'],
    relatedProtocols: [],
  },
  {
    id: 'hg-organ-reset',
    title: 'Organ Reset | Fascial Maneuvers: How to Recharge & Repair Organs',
    description:
      'Gentle organ-focused fascial maneuvers aimed at stress patterns held around the viscera.',
    category: 'movement-routines',
    duration: 900,
    thumbnailUrl: ytThumb('-dnZbIO_3aE'),
    videoUrl: ytUrl('-dnZbIO_3aE'),
    instructor: 'Human Garage',
    difficulty: 'intermediate',
    topics: ['organ reset', 'visceral fascia', 'stress', 'emotions'],
    relatedProtocols: [],
    premium: true,
  },
  {
    id: 'hg-hip-opener-trauma',
    title: 'Powerful Fascial Maneuver for Healing Emotional Trauma: Partner Belly Breath',
    description:
      'Partner-based maneuver emphasizing breath and belly to work with stored emotional tension.',
    category: 'movement-routines',
    duration: 600,
    thumbnailUrl: ytThumb('fgHrb0WCn00'),
    videoUrl: ytUrl('fgHrb0WCn00'),
    instructor: 'Human Garage',
    difficulty: 'intermediate',
    topics: ['trauma release', 'breath', 'partner work', 'fascia'],
    relatedProtocols: [],
  },
  {
    id: 'hg-stress-reset',
    title: 'How To Release Anxiety + Tension In Seconds!',
    description:
      'Short vagus- and fascia-oriented reset you can use when anxiety spikes.',
    category: 'quick-tips',
    duration: 120,
    thumbnailUrl: ytThumb('t4jNKNtF-wI'),
    videoUrl: ytUrl('t4jNKNtF-wI'),
    instructor: 'Garry Lineham (Human Garage)',
    difficulty: 'beginner',
    topics: ['anxiety', 'vagus nerve', 'quick reset', 'stress'],
    relatedProtocols: [],
    featured: true,
  },
  {
    id: 'hg-shoulder-anxiety',
    title: 'Anxiety DIY Remedy — Vagus Nerve Reset',
    description:
      'Simple vagus-nerve reset sequence aimed at calming the body during anxious states.',
    category: 'movement-routines',
    duration: 300,
    thumbnailUrl: ytThumb('bWvkGyYgHac'),
    videoUrl: ytUrl('bWvkGyYgHac'),
    instructor: 'Human Garage',
    difficulty: 'beginner',
    topics: ['anxiety', 'vagus nerve', 'shoulders', 'calm'],
    relatedProtocols: [],
  },
  {
    id: 'hg-pretzel-squat',
    title: 'Fascial Maneuver: Pretzel Squat (Part 1) — Unlock the Hips & Pelvic Floor',
    description:
      'Signature pretzel squat progressions for hip and pelvic-floor mobility.',
    category: 'movement-routines',
    duration: 720,
    thumbnailUrl: ytThumb('lvAXQ8aaTR0'),
    videoUrl: ytUrl('lvAXQ8aaTR0'),
    instructor: 'Garry Lineham (Human Garage)',
    difficulty: 'intermediate',
    topics: ['pretzel squat', 'hips', 'pelvic floor', 'mobility'],
    relatedProtocols: ['morning-mobility'],
  },
  {
    id: 'hg-morning-wakeup',
    title: 'The Best Morning Ritual',
    description:
      'Morning fascial ritual to wake up tissue and set a calmer tone for the day.',
    category: 'movement-routines',
    duration: 600,
    thumbnailUrl: ytThumb('94eUZFjo7_M'),
    videoUrl: ytUrl('94eUZFjo7_M'),
    instructor: 'Human Garage',
    difficulty: 'beginner',
    topics: ['morning routine', 'ritual', 'fascia', 'energy'],
    relatedProtocols: ['morning-mobility'],
  },
  {
    id: 'hg-neck-tmj',
    title: 'Stiff Neck? Try This Fascial Maneuver for Instant Relief!',
    description:
      'Targeted neck fascial maneuver for stiffness and screen-related tension.',
    category: 'quick-tips',
    duration: 120,
    thumbnailUrl: ytThumb('2EHiZ_OqauM'),
    videoUrl: ytUrl('2EHiZ_OqauM'),
    instructor: 'Human Garage',
    difficulty: 'beginner',
    topics: ['neck pain', 'stiff neck', 'fascia', 'posture'],
    relatedProtocols: [],
  },
  {
    id: 'hg-what-is-fascia',
    title: 'What Is Fascia?',
    description:
      'Foundational explainer on fascia — the connective tissue network — and why it matters for pain and posture.',
    category: 'science-deep-dives',
    duration: 480,
    thumbnailUrl: ytThumb('99h3K_UhPmc'),
    videoUrl: ytUrl('99h3K_UhPmc'),
    instructor: 'Garry Lineham (Human Garage)',
    difficulty: 'beginner',
    topics: ['fascia', 'connective tissue', 'pain', 'posture'],
    relatedProtocols: [],
  },
];

// ============================================================================
// COMBINED VIDEO LIBRARY
// ============================================================================

export const videos: Video[] = [...pompaVideos, ...breckaVideos, ...humanGarageVideos];

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
    description: 'Dr. Pompa on cellular detox, fasting, diet variation, and longevity',
    videoIds: [
      'pompa-5r-cellular-healing',
      'pompa-intermittent-fasting',
      'pompa-diet-variation',
      'pompa-longevity-prevention',
      'pompa-cell-membrane',
    ],
  },
  {
    id: 'gary-brecka-essentials',
    name: 'Gary Brecka — Essentials',
    description: 'Sleep, cold exposure, breathwork, and long-form talks from Gary Brecka',
    videoIds: [
      'brecka-brad-lea-full-episode',
      'brecka-sleep',
      'brecka-cold-showers',
      'brecka-breathwork',
      'brecka-10x-speech',
    ],
  },
  {
    id: '15-minute-body-resets',
    name: '15-Minute Body Resets',
    description: 'Human Garage fascial routines to release tension and reset your body',
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
    description: 'Heavy metals, water fasting options, biohacking fasts, and autophagy',
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
    description: 'Fascial maneuvers targeting emotional tension, anxiety, and stored stress',
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
