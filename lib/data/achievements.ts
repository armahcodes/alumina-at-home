/**
 * Achievements & Gamification Database
 * 
 * Achievement definitions, level system, and point calculations.
 */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  points: number;
  criteria: AchievementCriteria;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  secret?: boolean;
  hint?: string;
}

export interface AchievementCriteria {
  type: 'streak' | 'count' | 'milestone' | 'special' | 'category';
  target: number;
  metric?: string;
  category?: string;
}

export type AchievementCategory = 
  | 'streaks'
  | 'protocols'
  | 'cold-exposure'
  | 'heat-exposure'
  | 'sleep'
  | 'movement'
  | 'mindfulness'
  | 'social'
  | 'learning'
  | 'special';

export const achievements: Achievement[] = [
  // ============================================================================
  // STREAK ACHIEVEMENTS
  // ============================================================================
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first protocol',
    category: 'streaks',
    icon: '👣',
    points: 50,
    tier: 'bronze',
    criteria: { type: 'count', target: 1, metric: 'protocols_completed' }
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    category: 'streaks',
    icon: '🔥',
    points: 100,
    tier: 'bronze',
    criteria: { type: 'streak', target: 7 }
  },
  {
    id: 'fortnight-fighter',
    title: 'Fortnight Fighter',
    description: 'Maintain a 14-day streak',
    category: 'streaks',
    icon: '💪',
    points: 200,
    tier: 'silver',
    criteria: { type: 'streak', target: 14 }
  },
  {
    id: 'monthly-master',
    title: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    category: 'streaks',
    icon: '🏆',
    points: 500,
    tier: 'gold',
    criteria: { type: 'streak', target: 30 }
  },
  {
    id: 'quarterly-champion',
    title: 'Quarterly Champion',
    description: 'Maintain a 90-day streak',
    category: 'streaks',
    icon: '👑',
    points: 1500,
    tier: 'platinum',
    criteria: { type: 'streak', target: 90 }
  },
  {
    id: 'yearly-legend',
    title: 'Yearly Legend',
    description: 'Maintain a 365-day streak',
    category: 'streaks',
    icon: '⭐',
    points: 5000,
    tier: 'diamond',
    criteria: { type: 'streak', target: 365 }
  },

  // ============================================================================
  // COLD EXPOSURE ACHIEVEMENTS
  // ============================================================================
  {
    id: 'cold-curious',
    title: 'Cold Curious',
    description: 'Complete your first cold exposure',
    category: 'cold-exposure',
    icon: '🧊',
    points: 50,
    tier: 'bronze',
    criteria: { type: 'count', target: 1, category: 'cold-exposure' }
  },
  {
    id: 'ice-initiate',
    title: 'Ice Initiate',
    description: 'Complete 10 cold exposure sessions',
    category: 'cold-exposure',
    icon: '❄️',
    points: 150,
    tier: 'silver',
    criteria: { type: 'count', target: 10, category: 'cold-exposure' }
  },
  {
    id: 'frost-fighter',
    title: 'Frost Fighter',
    description: 'Complete 50 cold exposure sessions',
    category: 'cold-exposure',
    icon: '🥶',
    points: 400,
    tier: 'gold',
    criteria: { type: 'count', target: 50, category: 'cold-exposure' }
  },
  {
    id: 'ice-warrior',
    title: 'Ice Warrior',
    description: 'Complete 100 cold exposure sessions',
    category: 'cold-exposure',
    icon: '🏔️',
    points: 800,
    tier: 'platinum',
    criteria: { type: 'count', target: 100, category: 'cold-exposure' }
  },
  {
    id: 'polar-legend',
    title: 'Polar Legend',
    description: 'Complete 365 cold exposure sessions',
    category: 'cold-exposure',
    icon: '🐧',
    points: 2000,
    tier: 'diamond',
    criteria: { type: 'count', target: 365, category: 'cold-exposure' }
  },

  // ============================================================================
  // HEAT EXPOSURE ACHIEVEMENTS
  // ============================================================================
  {
    id: 'heat-seeker',
    title: 'Heat Seeker',
    description: 'Complete your first sauna session',
    category: 'heat-exposure',
    icon: '🔥',
    points: 50,
    tier: 'bronze',
    criteria: { type: 'count', target: 1, category: 'heat-exposure' }
  },
  {
    id: 'sauna-starter',
    title: 'Sauna Starter',
    description: 'Complete 10 sauna sessions',
    category: 'heat-exposure',
    icon: '♨️',
    points: 150,
    tier: 'silver',
    criteria: { type: 'count', target: 10, category: 'heat-exposure' }
  },
  {
    id: 'heat-master',
    title: 'Heat Master',
    description: 'Complete 50 sauna sessions',
    category: 'heat-exposure',
    icon: '🌡️',
    points: 400,
    tier: 'gold',
    criteria: { type: 'count', target: 50, category: 'heat-exposure' }
  },
  {
    id: 'finnish-legend',
    title: 'Finnish Legend',
    description: 'Complete 200 sauna sessions',
    category: 'heat-exposure',
    icon: '🏛️',
    points: 1000,
    tier: 'platinum',
    criteria: { type: 'count', target: 200, category: 'heat-exposure' }
  },

  // ============================================================================
  // SLEEP ACHIEVEMENTS
  // ============================================================================
  {
    id: 'sleep-scholar',
    title: 'Sleep Scholar',
    description: 'Complete your first sleep protocol',
    category: 'sleep',
    icon: '😴',
    points: 50,
    tier: 'bronze',
    criteria: { type: 'count', target: 1, category: 'sleep' }
  },
  {
    id: 'dream-weaver',
    title: 'Dream Weaver',
    description: 'Complete 30 sleep optimization protocols',
    category: 'sleep',
    icon: '🌙',
    points: 300,
    tier: 'silver',
    criteria: { type: 'count', target: 30, category: 'sleep' }
  },
  {
    id: 'sleep-master',
    title: 'Sleep Master',
    description: 'Maintain consistent sleep schedule for 30 days',
    category: 'sleep',
    icon: '💤',
    points: 500,
    tier: 'gold',
    criteria: { type: 'milestone', target: 30, metric: 'sleep_consistency' }
  },

  // ============================================================================
  // MOVEMENT ACHIEVEMENTS
  // ============================================================================
  {
    id: 'movement-starter',
    title: 'Movement Starter',
    description: 'Complete your first movement protocol',
    category: 'movement',
    icon: '🏃',
    points: 50,
    tier: 'bronze',
    criteria: { type: 'count', target: 1, category: 'movement' }
  },
  {
    id: 'zone-2-initiate',
    title: 'Zone 2 Initiate',
    description: 'Complete 10 hours of Zone 2 cardio',
    category: 'movement',
    icon: '❤️',
    points: 200,
    tier: 'silver',
    criteria: { type: 'milestone', target: 600, metric: 'zone2_minutes' }
  },
  {
    id: 'zone-2-devotee',
    title: 'Zone 2 Devotee',
    description: 'Complete 50 hours of Zone 2 cardio',
    category: 'movement',
    icon: '💓',
    points: 600,
    tier: 'gold',
    criteria: { type: 'milestone', target: 3000, metric: 'zone2_minutes' }
  },
  {
    id: 'vo2-max-warrior',
    title: 'VO2 Max Warrior',
    description: 'Complete 25 VO2 max training sessions',
    category: 'movement',
    icon: '🫁',
    points: 400,
    tier: 'gold',
    criteria: { type: 'count', target: 25, metric: 'vo2max_sessions' }
  },
  {
    id: 'mobility-master',
    title: 'Mobility Master',
    description: 'Complete 100 mobility sessions',
    category: 'movement',
    icon: '🧘‍♂️',
    points: 300,
    tier: 'silver',
    criteria: { type: 'count', target: 100, metric: 'mobility_sessions' }
  },

  // ============================================================================
  // MINDFULNESS ACHIEVEMENTS
  // ============================================================================
  {
    id: 'mindful-beginner',
    title: 'Mindful Beginner',
    description: 'Complete your first meditation',
    category: 'mindfulness',
    icon: '🧘',
    points: 50,
    tier: 'bronze',
    criteria: { type: 'count', target: 1, category: 'mindfulness' }
  },
  {
    id: 'breath-master',
    title: 'Breath Master',
    description: 'Complete 50 breathwork sessions',
    category: 'mindfulness',
    icon: '🌬️',
    points: 300,
    tier: 'silver',
    criteria: { type: 'count', target: 50, category: 'breathwork' }
  },
  {
    id: 'meditation-centurion',
    title: 'Meditation Centurion',
    description: 'Complete 100 meditation sessions',
    category: 'mindfulness',
    icon: '🪷',
    points: 500,
    tier: 'gold',
    criteria: { type: 'count', target: 100, category: 'mindfulness' }
  },
  {
    id: 'nsdr-devotee',
    title: 'NSDR Devotee',
    description: 'Complete 50 NSDR sessions',
    category: 'mindfulness',
    icon: '😌',
    points: 300,
    tier: 'silver',
    criteria: { type: 'count', target: 50, metric: 'nsdr_sessions' }
  },

  // ============================================================================
  // LEARNING ACHIEVEMENTS
  // ============================================================================
  {
    id: 'curious-mind',
    title: 'Curious Mind',
    description: 'Watch your first educational video',
    category: 'learning',
    icon: '📚',
    points: 25,
    tier: 'bronze',
    criteria: { type: 'count', target: 1, metric: 'videos_watched' }
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Watch 10 educational videos',
    category: 'learning',
    icon: '🎓',
    points: 100,
    tier: 'bronze',
    criteria: { type: 'count', target: 10, metric: 'videos_watched' }
  },
  {
    id: 'science-student',
    title: 'Science Student',
    description: 'Complete all science deep dive videos',
    category: 'learning',
    icon: '🔬',
    points: 300,
    tier: 'silver',
    criteria: { type: 'milestone', target: 1, metric: 'science_videos_complete' }
  },
  {
    id: 'protocol-professor',
    title: 'Protocol Professor',
    description: 'Complete all protocol guide videos',
    category: 'learning',
    icon: '👨‍🏫',
    points: 400,
    tier: 'gold',
    criteria: { type: 'milestone', target: 1, metric: 'protocol_videos_complete' }
  },

  // ============================================================================
  // PROTOCOL COMPLETION ACHIEVEMENTS
  // ============================================================================
  {
    id: 'protocol-explorer',
    title: 'Protocol Explorer',
    description: 'Try 5 different protocols',
    category: 'protocols',
    icon: '🗺️',
    points: 100,
    tier: 'bronze',
    criteria: { type: 'count', target: 5, metric: 'unique_protocols' }
  },
  {
    id: 'protocol-collector',
    title: 'Protocol Collector',
    description: 'Try 10 different protocols',
    category: 'protocols',
    icon: '📋',
    points: 200,
    tier: 'silver',
    criteria: { type: 'count', target: 10, metric: 'unique_protocols' }
  },
  {
    id: 'protocol-completionist',
    title: 'Protocol Completionist',
    description: 'Complete all available protocols at least once',
    category: 'protocols',
    icon: '✅',
    points: 1000,
    tier: 'platinum',
    criteria: { type: 'milestone', target: 1, metric: 'all_protocols_tried' }
  },
  {
    id: 'morning-routine-master',
    title: 'Morning Routine Master',
    description: 'Complete all morning protocols in one day for 7 days',
    category: 'protocols',
    icon: '🌅',
    points: 300,
    tier: 'silver',
    criteria: { type: 'streak', target: 7, metric: 'morning_protocols' }
  },
  {
    id: 'circadian-champion',
    title: 'Circadian Champion',
    description: 'Complete both morning and evening light protocols for 30 days',
    category: 'protocols',
    icon: '🌓',
    points: 500,
    tier: 'gold',
    criteria: { type: 'streak', target: 30, metric: 'circadian_protocols' }
  },

  // ============================================================================
  // SOCIAL ACHIEVEMENTS
  // ============================================================================
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Share your first progress update',
    category: 'social',
    icon: '🦋',
    points: 50,
    tier: 'bronze',
    criteria: { type: 'count', target: 1, metric: 'shares' }
  },
  {
    id: 'community-champion',
    title: 'Community Champion',
    description: 'Engage with the community 10 times',
    category: 'social',
    icon: '🤝',
    points: 200,
    tier: 'silver',
    criteria: { type: 'count', target: 10, metric: 'community_engagement' }
  },
  {
    id: 'referral-hero',
    title: 'Referral Hero',
    description: 'Refer 3 friends who sign up',
    category: 'social',
    icon: '🎁',
    points: 500,
    tier: 'gold',
    criteria: { type: 'count', target: 3, metric: 'referrals' }
  },

  // ============================================================================
  // SPECIAL ACHIEVEMENTS
  // ============================================================================
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Complete a morning protocol before 6 AM',
    category: 'special',
    icon: '🐦',
    points: 75,
    tier: 'bronze',
    criteria: { type: 'special', target: 1, metric: 'early_morning_protocol' }
  },
  {
    id: 'night-owl-reformed',
    title: 'Night Owl Reformed',
    description: 'Go to bed before 10 PM for 7 consecutive days',
    category: 'special',
    icon: '🦉',
    points: 150,
    tier: 'silver',
    criteria: { type: 'streak', target: 7, metric: 'early_bedtime' }
  },
  {
    id: 'contrast-warrior',
    title: 'Contrast Warrior',
    description: 'Complete hot and cold exposure in the same day',
    category: 'special',
    icon: '🔥🧊',
    points: 100,
    tier: 'bronze',
    criteria: { type: 'special', target: 1, metric: 'contrast_therapy' }
  },
  {
    id: 'bio-age-reverser',
    title: 'Bio-Age Reverser',
    description: 'Maintain all daily protocols for 90 days straight',
    category: 'special',
    icon: '⏳',
    points: 2000,
    tier: 'diamond',
    criteria: { type: 'streak', target: 90, metric: 'all_daily_protocols' },
    secret: true,
    hint: 'Complete every protocol, every day, for three months...'
  },
  {
    id: 'founding-member',
    title: 'Founding Member',
    description: 'Join during beta launch',
    category: 'special',
    icon: '🌟',
    points: 500,
    tier: 'platinum',
    criteria: { type: 'special', target: 1, metric: 'beta_user' }
  },
  {
    id: 'phoenix',
    title: 'Phoenix',
    description: 'Return after a 30+ day break and start a new streak',
    category: 'special',
    icon: '🔄',
    points: 100,
    tier: 'bronze',
    criteria: { type: 'special', target: 1, metric: 'comeback' },
    secret: true,
    hint: 'Even the best of us take breaks. What matters is coming back.'
  }
];

// ============================================================================
// LEVEL SYSTEM
// ============================================================================

export interface Level {
  level: number;
  name: string;
  pointsRequired: number;
  icon: string;
  benefits: string[];
}

export const levels: Level[] = [
  {
    level: 1,
    name: 'Newcomer',
    pointsRequired: 0,
    icon: '🌱',
    benefits: ['Access to foundation protocols', 'Basic progress tracking']
  },
  {
    level: 2,
    name: 'Beginner',
    pointsRequired: 100,
    icon: '🌿',
    benefits: ['Unlock intermediate protocols', 'Weekly insights']
  },
  {
    level: 3,
    name: 'Learner',
    pointsRequired: 300,
    icon: '🌳',
    benefits: ['Personalized recommendations', 'Protocol customization']
  },
  {
    level: 4,
    name: 'Practitioner',
    pointsRequired: 600,
    icon: '💫',
    benefits: ['Advanced protocols unlocked', 'Detailed analytics']
  },
  {
    level: 5,
    name: 'Enthusiast',
    pointsRequired: 1000,
    icon: '⭐',
    benefits: ['Community features', 'Custom protocol builder']
  },
  {
    level: 6,
    name: 'Dedicated',
    pointsRequired: 1500,
    icon: '🌟',
    benefits: ['Expert mode', 'Protocol stacking suggestions']
  },
  {
    level: 7,
    name: 'Advanced',
    pointsRequired: 2500,
    icon: '✨',
    benefits: ['Beta feature access', 'Priority support']
  },
  {
    level: 8,
    name: 'Expert',
    pointsRequired: 4000,
    icon: '💎',
    benefits: ['All premium content', 'Expert badge']
  },
  {
    level: 9,
    name: 'Master',
    pointsRequired: 6000,
    icon: '👑',
    benefits: ['Mentor status', 'Content contributions']
  },
  {
    level: 10,
    name: 'Legend',
    pointsRequired: 10000,
    icon: '🏆',
    benefits: ['Lifetime membership perks', 'Legend badge', 'Special recognition']
  }
];

// ============================================================================
// ACHIEVEMENT CATEGORIES METADATA
// ============================================================================

export const achievementCategories = {
  streaks: {
    name: 'Consistency',
    description: 'Rewards for maintaining daily practice',
    icon: '🔥'
  },
  'cold-exposure': {
    name: 'Cold Exposure',
    description: 'Achievements for cold therapy practice',
    icon: '🧊'
  },
  'heat-exposure': {
    name: 'Heat Exposure',
    description: 'Achievements for sauna and heat therapy',
    icon: '♨️'
  },
  sleep: {
    name: 'Sleep',
    description: 'Achievements for sleep optimization',
    icon: '😴'
  },
  movement: {
    name: 'Movement',
    description: 'Achievements for exercise and mobility',
    icon: '🏃'
  },
  mindfulness: {
    name: 'Mindfulness',
    description: 'Achievements for meditation and breathwork',
    icon: '🧘'
  },
  learning: {
    name: 'Learning',
    description: 'Achievements for educational content',
    icon: '📚'
  },
  protocols: {
    name: 'Protocol Mastery',
    description: 'Achievements for completing protocols',
    icon: '📋'
  },
  social: {
    name: 'Community',
    description: 'Achievements for community engagement',
    icon: '🤝'
  },
  special: {
    name: 'Special',
    description: 'Unique and secret achievements',
    icon: '🌟'
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function calculateLevel(points: number): Level {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].pointsRequired) {
      return levels[i];
    }
  }
  return levels[0];
}

export function getNextLevel(currentPoints: number): Level | null {
  const currentLevel = calculateLevel(currentPoints);
  const nextLevelIndex = levels.findIndex(l => l.level === currentLevel.level) + 1;
  return nextLevelIndex < levels.length ? levels[nextLevelIndex] : null;
}

export function getProgressToNextLevel(currentPoints: number): number {
  const currentLevel = calculateLevel(currentPoints);
  const nextLevel = getNextLevel(currentPoints);
  
  if (!nextLevel) return 100; // Max level
  
  const pointsInCurrentLevel = currentPoints - currentLevel.pointsRequired;
  const pointsNeededForNextLevel = nextLevel.pointsRequired - currentLevel.pointsRequired;
  
  return Math.round((pointsInCurrentLevel / pointsNeededForNextLevel) * 100);
}

export function getTierColor(tier: Achievement['tier']): string {
  const colors = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
    diamond: '#B9F2FF'
  };
  return colors[tier];
}

export default achievements;
