/**
 * Video Library Database
 * 
 * Educational video content organized by category.
 * Placeholder thumbnails and video URLs - replace with actual content.
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

export const videos: Video[] = [
  // ============================================================================
  // PROTOCOL GUIDES
  // ============================================================================
  {
    id: 'cold-exposure-masterclass',
    title: 'Cold Exposure Masterclass',
    description: 'Complete guide to cold exposure: the science, protocols, and how to build up safely from cold showers to ice baths.',
    category: 'protocol-guides',
    duration: 2700, // 45 minutes
    thumbnailUrl: '/images/videos/cold-exposure-thumb.jpg',
    videoUrl: '/videos/cold-exposure-masterclass.mp4',
    instructor: 'Dr. Sarah Chen',
    difficulty: 'beginner',
    topics: ['cold exposure', 'dopamine', 'brown fat', 'metabolism', 'mental resilience'],
    relatedProtocols: ['cold-shower-basic', 'deliberate-cold-exposure'],
    featured: true
  },
  {
    id: 'circadian-rhythm-guide',
    title: 'Master Your Circadian Rhythm',
    description: 'How to optimize your internal clock for better sleep, energy, and longevity through light exposure and timing.',
    category: 'protocol-guides',
    duration: 3600, // 60 minutes
    thumbnailUrl: '/images/videos/circadian-thumb.jpg',
    videoUrl: '/videos/circadian-rhythm-guide.mp4',
    instructor: 'Dr. Michael Torres',
    difficulty: 'beginner',
    topics: ['circadian rhythm', 'light exposure', 'melatonin', 'cortisol', 'sleep'],
    relatedProtocols: ['morning-light-exposure', 'evening-light-dimming', 'sleep-optimization'],
    featured: true
  },
  {
    id: 'sauna-protocol-guide',
    title: 'Sauna for Longevity',
    description: 'The science of heat exposure and how to use sauna protocols for cardiovascular health and longevity.',
    category: 'protocol-guides',
    duration: 2400, // 40 minutes
    thumbnailUrl: '/images/videos/sauna-thumb.jpg',
    videoUrl: '/videos/sauna-protocol-guide.mp4',
    instructor: 'Dr. Sarah Chen',
    difficulty: 'intermediate',
    topics: ['sauna', 'heat shock proteins', 'cardiovascular health', 'longevity'],
    relatedProtocols: ['sauna-protocol']
  },
  {
    id: 'fasting-protocols',
    title: 'Time-Restricted Eating & Fasting',
    description: 'Complete guide to time-restricted eating, intermittent fasting, and how to implement them safely.',
    category: 'protocol-guides',
    duration: 3000, // 50 minutes
    thumbnailUrl: '/images/videos/fasting-thumb.jpg',
    videoUrl: '/videos/fasting-protocols.mp4',
    instructor: 'Dr. James Park',
    difficulty: 'beginner',
    topics: ['fasting', 'autophagy', 'metabolic health', 'insulin sensitivity'],
    relatedProtocols: ['time-restricted-eating']
  },
  {
    id: 'sleep-optimization-deep-dive',
    title: 'Sleep Optimization Deep Dive',
    description: 'Everything you need to know to optimize your sleep: environment, supplements, timing, and tracking.',
    category: 'protocol-guides',
    duration: 3600, // 60 minutes
    thumbnailUrl: '/images/videos/sleep-thumb.jpg',
    videoUrl: '/videos/sleep-optimization.mp4',
    instructor: 'Dr. Elena Rodriguez',
    difficulty: 'intermediate',
    topics: ['sleep', 'deep sleep', 'REM', 'sleep tracking', 'supplements'],
    relatedProtocols: ['sleep-optimization', 'nsdr-yoga-nidra'],
    featured: true
  },

  // ============================================================================
  // SCIENCE DEEP DIVES
  // ============================================================================
  {
    id: 'nad-pathway-explained',
    title: 'The NAD+ Pathway Explained',
    description: 'Deep dive into NAD+, sirtuins, and why this pathway is central to aging and longevity.',
    category: 'science-deep-dives',
    duration: 2700, // 45 minutes
    thumbnailUrl: '/images/videos/nad-thumb.jpg',
    videoUrl: '/videos/nad-pathway.mp4',
    instructor: 'Dr. James Park',
    difficulty: 'advanced',
    topics: ['NAD+', 'sirtuins', 'NMN', 'NR', 'aging'],
    relatedProtocols: [],
    premium: true
  },
  {
    id: 'autophagy-explained',
    title: 'Autophagy: Cellular Cleanup',
    description: 'How autophagy works, why it matters for longevity, and how to activate it through fasting and exercise.',
    category: 'science-deep-dives',
    duration: 2400, // 40 minutes
    thumbnailUrl: '/images/videos/autophagy-thumb.jpg',
    videoUrl: '/videos/autophagy-explained.mp4',
    instructor: 'Dr. Sarah Chen',
    difficulty: 'intermediate',
    topics: ['autophagy', 'mTOR', 'AMPK', 'fasting', 'cellular health'],
    relatedProtocols: ['time-restricted-eating']
  },
  {
    id: 'mitochondria-masterclass',
    title: 'Mitochondria: Your Cellular Powerhouses',
    description: 'Understanding mitochondrial health: why it matters and how to optimize your cellular energy.',
    category: 'science-deep-dives',
    duration: 3000, // 50 minutes
    thumbnailUrl: '/images/videos/mitochondria-thumb.jpg',
    videoUrl: '/videos/mitochondria-masterclass.mp4',
    instructor: 'Dr. Michael Torres',
    difficulty: 'intermediate',
    topics: ['mitochondria', 'energy', 'CoQ10', 'PQQ', 'exercise'],
    relatedProtocols: ['zone-2-cardio', 'vo2-max-training'],
    premium: true
  },
  {
    id: 'senescent-cells',
    title: 'Zombie Cells & Senolytics',
    description: 'What are senescent cells, how they drive aging, and what we can do about them.',
    category: 'science-deep-dives',
    duration: 2100, // 35 minutes
    thumbnailUrl: '/images/videos/senolytics-thumb.jpg',
    videoUrl: '/videos/senescent-cells.mp4',
    instructor: 'Dr. Elena Rodriguez',
    difficulty: 'advanced',
    topics: ['senescent cells', 'senolytics', 'fisetin', 'quercetin', 'aging'],
    relatedProtocols: [],
    premium: true
  },
  {
    id: 'hormesis-explained',
    title: 'Hormesis: Stress That Makes You Stronger',
    description: 'How controlled stressors like cold, heat, and fasting activate longevity pathways.',
    category: 'science-deep-dives',
    duration: 2400, // 40 minutes
    thumbnailUrl: '/images/videos/hormesis-thumb.jpg',
    videoUrl: '/videos/hormesis-explained.mp4',
    instructor: 'Dr. James Park',
    difficulty: 'beginner',
    topics: ['hormesis', 'stress adaptation', 'cold exposure', 'heat exposure', 'fasting'],
    relatedProtocols: ['cold-shower-basic', 'deliberate-cold-exposure', 'sauna-protocol']
  },

  // ============================================================================
  // BREATHWORK SESSIONS
  // ============================================================================
  {
    id: 'box-breathing-guided',
    title: 'Guided Box Breathing (10 min)',
    description: 'Follow along with this guided box breathing session for stress relief and focus.',
    category: 'breathwork-sessions',
    duration: 600, // 10 minutes
    thumbnailUrl: '/images/videos/box-breathing-thumb.jpg',
    videoUrl: '/videos/box-breathing-guided.mp4',
    instructor: 'Anna Williams',
    difficulty: 'beginner',
    topics: ['breathwork', 'stress relief', 'focus', 'nervous system'],
    relatedProtocols: ['box-breathing'],
    featured: true
  },
  {
    id: 'wim-hof-guided',
    title: 'Wim Hof Breathing Session (15 min)',
    description: 'Guided Wim Hof breathing method with 3 rounds. For intermediate practitioners.',
    category: 'breathwork-sessions',
    duration: 900, // 15 minutes
    thumbnailUrl: '/images/videos/wim-hof-thumb.jpg',
    videoUrl: '/videos/wim-hof-guided.mp4',
    instructor: 'Marcus Johnson',
    difficulty: 'intermediate',
    topics: ['breathwork', 'Wim Hof', 'energy', 'cold tolerance'],
    relatedProtocols: ['wim-hof-breathing']
  },
  {
    id: 'physiological-sigh-demo',
    title: 'Physiological Sigh Tutorial',
    description: 'Learn the fastest way to calm your nervous system in real-time.',
    category: 'breathwork-sessions',
    duration: 300, // 5 minutes
    thumbnailUrl: '/images/videos/physio-sigh-thumb.jpg',
    videoUrl: '/videos/physiological-sigh.mp4',
    instructor: 'Anna Williams',
    difficulty: 'beginner',
    topics: ['breathwork', 'stress relief', 'anxiety', 'quick technique'],
    relatedProtocols: ['physiological-sigh']
  },
  {
    id: 'nsdr-20min',
    title: 'NSDR / Yoga Nidra (20 min)',
    description: 'Non-Sleep Deep Rest protocol for recovery, focus, and dopamine restoration.',
    category: 'breathwork-sessions',
    duration: 1200, // 20 minutes
    thumbnailUrl: '/images/videos/nsdr-thumb.jpg',
    videoUrl: '/videos/nsdr-20min.mp4',
    instructor: 'Elena Sanchez',
    difficulty: 'beginner',
    topics: ['NSDR', 'yoga nidra', 'recovery', 'relaxation', 'dopamine'],
    relatedProtocols: ['nsdr-yoga-nidra'],
    featured: true
  },
  {
    id: 'sleep-breathwork',
    title: 'Breathwork for Sleep (15 min)',
    description: 'Calming breathing exercises to do in bed to help you fall asleep faster.',
    category: 'breathwork-sessions',
    duration: 900, // 15 minutes
    thumbnailUrl: '/images/videos/sleep-breathwork-thumb.jpg',
    videoUrl: '/videos/sleep-breathwork.mp4',
    instructor: 'Anna Williams',
    difficulty: 'beginner',
    topics: ['breathwork', 'sleep', 'relaxation', 'nervous system'],
    relatedProtocols: ['sleep-optimization']
  },

  // ============================================================================
  // MOVEMENT ROUTINES
  // ============================================================================
  {
    id: 'morning-mobility-follow',
    title: 'Morning Mobility Flow (10 min)',
    description: 'Follow-along morning mobility routine to start your day with full range of motion.',
    category: 'movement-routines',
    duration: 600, // 10 minutes
    thumbnailUrl: '/images/videos/morning-mobility-thumb.jpg',
    videoUrl: '/videos/morning-mobility-follow.mp4',
    instructor: 'Marcus Johnson',
    difficulty: 'beginner',
    topics: ['mobility', 'stretching', 'morning routine', 'flexibility'],
    relatedProtocols: ['morning-mobility'],
    featured: true
  },
  {
    id: 'zone2-guide',
    title: 'Zone 2 Cardio Explained',
    description: 'How to find your Zone 2, why it matters, and how to structure your cardio training.',
    category: 'movement-routines',
    duration: 1800, // 30 minutes
    thumbnailUrl: '/images/videos/zone2-thumb.jpg',
    videoUrl: '/videos/zone2-guide.mp4',
    instructor: 'Dr. Michael Torres',
    difficulty: 'beginner',
    topics: ['Zone 2', 'cardio', 'mitochondria', 'fat burning', 'aerobic base'],
    relatedProtocols: ['zone-2-cardio']
  },
  {
    id: 'hiit-vo2max',
    title: 'VO2 Max Training Guide',
    description: 'How to safely implement high-intensity intervals for maximum cardiovascular benefit.',
    category: 'movement-routines',
    duration: 2100, // 35 minutes
    thumbnailUrl: '/images/videos/vo2max-thumb.jpg',
    videoUrl: '/videos/hiit-vo2max.mp4',
    instructor: 'Marcus Johnson',
    difficulty: 'advanced',
    topics: ['VO2 max', 'HIIT', 'cardio', 'longevity', 'intervals'],
    relatedProtocols: ['vo2-max-training'],
    premium: true
  },
  {
    id: 'desk-mobility',
    title: 'Desk Worker Mobility (15 min)',
    description: 'Combat the effects of sitting with this mobility routine designed for desk workers.',
    category: 'movement-routines',
    duration: 900, // 15 minutes
    thumbnailUrl: '/images/videos/desk-mobility-thumb.jpg',
    videoUrl: '/videos/desk-mobility.mp4',
    instructor: 'Anna Williams',
    difficulty: 'beginner',
    topics: ['mobility', 'posture', 'desk work', 'hip flexors', 'shoulders'],
    relatedProtocols: ['morning-mobility']
  },

  // ============================================================================
  // EXPERT INTERVIEWS
  // ============================================================================
  {
    id: 'interview-sleep-scientist',
    title: 'Sleep Science with Dr. Walker',
    description: 'In-depth conversation about sleep science, sleep debt, and optimizing recovery.',
    category: 'expert-interviews',
    duration: 5400, // 90 minutes
    thumbnailUrl: '/images/videos/interview-sleep-thumb.jpg',
    videoUrl: '/videos/interview-sleep-scientist.mp4',
    instructor: 'Guest: Dr. Matthew Walker',
    difficulty: 'intermediate',
    topics: ['sleep', 'REM', 'deep sleep', 'sleep deprivation', 'recovery'],
    relatedProtocols: ['sleep-optimization'],
    premium: true
  },
  {
    id: 'interview-longevity-researcher',
    title: 'Longevity Research Update',
    description: 'Latest findings in longevity research: what\'s working and what\'s hype.',
    category: 'expert-interviews',
    duration: 4800, // 80 minutes
    thumbnailUrl: '/images/videos/interview-longevity-thumb.jpg',
    videoUrl: '/videos/interview-longevity-researcher.mp4',
    instructor: 'Guest: Dr. David Sinclair',
    difficulty: 'advanced',
    topics: ['longevity', 'aging', 'NAD+', 'sirtuins', 'research'],
    relatedProtocols: [],
    premium: true
  },
  {
    id: 'interview-cold-exposure',
    title: 'The Science of Cold with Dr. Soberg',
    description: 'Research on cold exposure: how it works and how to do it right.',
    category: 'expert-interviews',
    duration: 4200, // 70 minutes
    thumbnailUrl: '/images/videos/interview-cold-thumb.jpg',
    videoUrl: '/videos/interview-cold-exposure.mp4',
    instructor: 'Guest: Dr. Susanna Soberg',
    difficulty: 'intermediate',
    topics: ['cold exposure', 'brown fat', 'metabolism', 'dopamine', 'research'],
    relatedProtocols: ['cold-shower-basic', 'deliberate-cold-exposure'],
    premium: true
  },

  // ============================================================================
  // QUICK TIPS
  // ============================================================================
  {
    id: 'tip-morning-routine',
    title: 'The Perfect Morning Routine',
    description: 'Quick guide to structuring your morning for maximum energy and focus.',
    category: 'quick-tips',
    duration: 420, // 7 minutes
    thumbnailUrl: '/images/videos/tip-morning-thumb.jpg',
    videoUrl: '/videos/tip-morning-routine.mp4',
    instructor: 'Dr. Sarah Chen',
    difficulty: 'beginner',
    topics: ['morning routine', 'productivity', 'energy', 'circadian rhythm'],
    relatedProtocols: ['morning-light-exposure', 'morning-mobility', 'cold-shower-basic']
  },
  {
    id: 'tip-supplement-timing',
    title: 'Supplement Timing Guide',
    description: 'When to take your supplements for maximum absorption and effectiveness.',
    category: 'quick-tips',
    duration: 480, // 8 minutes
    thumbnailUrl: '/images/videos/tip-supplements-thumb.jpg',
    videoUrl: '/videos/tip-supplement-timing.mp4',
    instructor: 'Dr. James Park',
    difficulty: 'beginner',
    topics: ['supplements', 'timing', 'absorption', 'stacking'],
    relatedProtocols: []
  },
  {
    id: 'tip-sleep-environment',
    title: 'Optimize Your Sleep Environment',
    description: 'Quick changes to your bedroom that can dramatically improve sleep quality.',
    category: 'quick-tips',
    duration: 360, // 6 minutes
    thumbnailUrl: '/images/videos/tip-sleep-env-thumb.jpg',
    videoUrl: '/videos/tip-sleep-environment.mp4',
    instructor: 'Dr. Elena Rodriguez',
    difficulty: 'beginner',
    topics: ['sleep', 'environment', 'temperature', 'light', 'sound'],
    relatedProtocols: ['sleep-optimization']
  },
  {
    id: 'tip-cold-shower-start',
    title: 'How to Start Cold Showers',
    description: 'Step-by-step guide for beginners to start incorporating cold showers.',
    category: 'quick-tips',
    duration: 300, // 5 minutes
    thumbnailUrl: '/images/videos/tip-cold-start-thumb.jpg',
    videoUrl: '/videos/tip-cold-shower-start.mp4',
    instructor: 'Marcus Johnson',
    difficulty: 'beginner',
    topics: ['cold exposure', 'cold shower', 'beginner', 'getting started'],
    relatedProtocols: ['cold-shower-basic']
  },

  // ============================================================================
  // MEDITATION
  // ============================================================================
  {
    id: 'meditation-morning-10',
    title: 'Morning Focus Meditation (10 min)',
    description: 'Start your day with clarity and intention through this guided meditation.',
    category: 'meditation',
    duration: 600, // 10 minutes
    thumbnailUrl: '/images/videos/meditation-morning-thumb.jpg',
    videoUrl: '/videos/meditation-morning-10.mp4',
    instructor: 'Elena Sanchez',
    difficulty: 'beginner',
    topics: ['meditation', 'focus', 'morning', 'mindfulness'],
    relatedProtocols: ['morning-meditation']
  },
  {
    id: 'meditation-gratitude',
    title: 'Gratitude Meditation (5 min)',
    description: 'Brief guided gratitude practice to cultivate positive emotions.',
    category: 'meditation',
    duration: 300, // 5 minutes
    thumbnailUrl: '/images/videos/meditation-gratitude-thumb.jpg',
    videoUrl: '/videos/meditation-gratitude.mp4',
    instructor: 'Elena Sanchez',
    difficulty: 'beginner',
    topics: ['meditation', 'gratitude', 'positive psychology', 'wellbeing'],
    relatedProtocols: ['gratitude-practice']
  },
  {
    id: 'meditation-body-scan',
    title: 'Body Scan Meditation (15 min)',
    description: 'Progressive relaxation through body awareness for stress relief and sleep preparation.',
    category: 'meditation',
    duration: 900, // 15 minutes
    thumbnailUrl: '/images/videos/meditation-body-scan-thumb.jpg',
    videoUrl: '/videos/meditation-body-scan.mp4',
    instructor: 'Elena Sanchez',
    difficulty: 'beginner',
    topics: ['meditation', 'body scan', 'relaxation', 'stress relief'],
    relatedProtocols: ['sleep-optimization', 'nsdr-yoga-nidra']
  }
];

// ============================================================================
// VIDEO CATEGORIES METADATA
// ============================================================================

export const videoCategories = {
  'protocol-guides': {
    name: 'Protocol Guides',
    description: 'In-depth guides to longevity protocols',
    icon: 'BookOpen'
  },
  'science-deep-dives': {
    name: 'Science Deep Dives',
    description: 'Detailed explanations of the science behind longevity',
    icon: 'FlaskConical'
  },
  'breathwork-sessions': {
    name: 'Breathwork Sessions',
    description: 'Guided breathing exercises and practices',
    icon: 'Wind'
  },
  'movement-routines': {
    name: 'Movement Routines',
    description: 'Follow-along exercise and mobility content',
    icon: 'Dumbbell'
  },
  'expert-interviews': {
    name: 'Expert Interviews',
    description: 'Conversations with leading researchers and practitioners',
    icon: 'Mic'
  },
  'quick-tips': {
    name: 'Quick Tips',
    description: 'Short, actionable tips you can apply today',
    icon: 'Lightbulb'
  },
  meditation: {
    name: 'Meditation',
    description: 'Guided meditation and mindfulness practices',
    icon: 'Brain'
  }
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
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Essential videos for beginners to longevity optimization',
    videoIds: [
      'circadian-rhythm-guide',
      'cold-exposure-masterclass',
      'box-breathing-guided',
      'morning-mobility-follow',
      'tip-morning-routine'
    ]
  },
  {
    id: 'sleep-series',
    name: 'Sleep Mastery Series',
    description: 'Everything you need to optimize your sleep',
    videoIds: [
      'sleep-optimization-deep-dive',
      'nsdr-20min',
      'sleep-breathwork',
      'tip-sleep-environment',
      'meditation-body-scan'
    ]
  },
  {
    id: 'breathwork-library',
    name: 'Breathwork Library',
    description: 'Guided breathing practices for every situation',
    videoIds: [
      'box-breathing-guided',
      'wim-hof-guided',
      'physiological-sigh-demo',
      'nsdr-20min',
      'sleep-breathwork'
    ]
  },
  {
    id: 'advanced-science',
    name: 'Advanced Science',
    description: 'Deep dives into the mechanisms of aging and longevity',
    videoIds: [
      'nad-pathway-explained',
      'autophagy-explained',
      'mitochondria-masterclass',
      'senescent-cells',
      'hormesis-explained'
    ]
  }
];

export default videos;
