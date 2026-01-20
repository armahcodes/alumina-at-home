/**
 * Longevity Protocols Database
 * 
 * Evidence-based protocols organized by category, difficulty, and time of day.
 * Research sources: Huberman Lab, Peter Attia, David Sinclair, Rhonda Patrick
 */

export interface Protocol {
  id: string;
  title: string;
  description: string;
  category: ProtocolCategory;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  duration: number; // minutes
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'anytime';
  frequency: 'daily' | 'weekly' | 'as-needed';
  benefits: string[];
  steps: ProtocolStep[];
  scienceNote: string;
  equipment?: string[];
  contraindications?: string[];
  points: number;
}

export interface ProtocolStep {
  order: number;
  instruction: string;
  duration?: number; // seconds
  tip?: string;
}

export type ProtocolCategory = 
  | 'circadian'
  | 'cold-exposure'
  | 'heat-exposure'
  | 'breathwork'
  | 'movement'
  | 'sleep'
  | 'nutrition'
  | 'mindfulness'
  | 'recovery';

export const protocols: Protocol[] = [
  // ============================================================================
  // CIRCADIAN RHYTHM PROTOCOLS
  // ============================================================================
  {
    id: 'morning-light-exposure',
    title: 'Morning Sunlight Exposure',
    description: 'Get 10-30 minutes of natural sunlight within 30-60 minutes of waking to set your circadian clock and boost cortisol awakening response.',
    category: 'circadian',
    difficulty: 'foundation',
    duration: 15,
    timeOfDay: 'morning',
    frequency: 'daily',
    benefits: [
      'Sets circadian rhythm for better sleep',
      'Increases morning alertness',
      'Boosts mood and energy',
      'Improves vitamin D synthesis',
      'Regulates cortisol patterns'
    ],
    steps: [
      { order: 1, instruction: 'Wake up and avoid looking at your phone for the first 5 minutes', tip: 'Bright phone light can interfere with the cortisol awakening response' },
      { order: 2, instruction: 'Go outside within 30-60 minutes of waking', duration: 60 },
      { order: 3, instruction: 'Face toward the sun (not directly at it) for 10-30 minutes', duration: 900, tip: 'Cloudy days require longer exposure (20-30 min)' },
      { order: 4, instruction: 'Avoid sunglasses during this time to allow light to reach your eyes', tip: 'Regular glasses and contacts are fine' },
      { order: 5, instruction: 'Combine with a morning walk for added benefits' }
    ],
    scienceNote: 'Morning light exposure triggers melanopsin ganglion cells in the eye, which signal the suprachiasmatic nucleus (SCN) to suppress melatonin and initiate the cortisol awakening response. This sets a "timer" for melatonin release ~14-16 hours later.',
    contraindications: ['Photosensitivity conditions', 'Recent eye surgery'],
    points: 10
  },
  {
    id: 'evening-light-dimming',
    title: 'Evening Light Protocol',
    description: 'Minimize artificial light exposure 2-3 hours before bed to optimize melatonin production.',
    category: 'circadian',
    difficulty: 'foundation',
    duration: 120,
    timeOfDay: 'evening',
    frequency: 'daily',
    benefits: [
      'Increases natural melatonin production',
      'Improves sleep onset latency',
      'Enhances sleep quality',
      'Supports healthy circadian rhythm'
    ],
    steps: [
      { order: 1, instruction: 'Set a "sunset alarm" 2-3 hours before your target bedtime' },
      { order: 2, instruction: 'Dim overhead lights to 50% or lower', tip: 'Use lamps instead of ceiling lights' },
      { order: 3, instruction: 'Switch devices to night mode or use blue light blocking glasses' },
      { order: 4, instruction: 'Use red or amber lighting if needed', tip: 'Red wavelengths don\'t suppress melatonin' },
      { order: 5, instruction: 'Avoid screens 1 hour before bed if possible' }
    ],
    scienceNote: 'Blue and green wavelengths (400-550nm) most strongly suppress melatonin production. Even dim artificial light can reduce melatonin by 50%. Red light (>600nm) has minimal impact on melatonin.',
    equipment: ['Blue light blocking glasses', 'Dimmable smart bulbs', 'Red/amber night lights'],
    points: 10
  },

  // ============================================================================
  // COLD EXPOSURE PROTOCOLS
  // ============================================================================
  {
    id: 'cold-shower-basic',
    title: 'Cold Shower Protocol',
    description: 'End your shower with 1-3 minutes of cold water to activate brown fat, increase dopamine, and build stress resilience.',
    category: 'cold-exposure',
    difficulty: 'foundation',
    duration: 3,
    timeOfDay: 'morning',
    frequency: 'daily',
    benefits: [
      'Increases dopamine by 250-300% for hours',
      'Activates brown adipose tissue',
      'Builds mental resilience',
      'Reduces inflammation',
      'Improves immune function'
    ],
    steps: [
      { order: 1, instruction: 'Complete your normal warm shower routine' },
      { order: 2, instruction: 'Gradually reduce water temperature to coldest setting', duration: 15 },
      { order: 3, instruction: 'Start with 30 seconds of cold exposure', duration: 30, tip: 'Focus on controlled breathing' },
      { order: 4, instruction: 'Build up to 1-3 minutes over several weeks', duration: 180 },
      { order: 5, instruction: 'End cold - don\'t warm up in the shower afterward', tip: 'Let your body naturally reheat to maximize brown fat activation' }
    ],
    scienceNote: 'Cold exposure triggers norepinephrine release (200-300% increase) which converts white fat to metabolically active brown fat. The dopamine increase from cold exposure is comparable to cocaine but sustained for hours.',
    contraindications: ['Heart conditions', 'Raynaud\'s disease', 'Pregnancy', 'Uncontrolled hypertension'],
    points: 15
  },
  {
    id: 'deliberate-cold-exposure',
    title: 'Deliberate Cold Exposure',
    description: 'Structured cold immersion protocol for maximum metabolic and mental benefits.',
    category: 'cold-exposure',
    difficulty: 'intermediate',
    duration: 11,
    timeOfDay: 'morning',
    frequency: 'weekly',
    benefits: [
      'Significantly boosts metabolism',
      'Increases cold shock proteins',
      'Enhances mitochondrial biogenesis',
      'Powerful anti-inflammatory effect',
      'Builds exceptional mental fortitude'
    ],
    steps: [
      { order: 1, instruction: 'Prepare cold water (50-59°F / 10-15°C)', tip: 'Use a thermometer to verify temperature' },
      { order: 2, instruction: 'Enter water up to neck level', duration: 10 },
      { order: 3, instruction: 'Focus on slow, controlled breathing through the initial shock', duration: 30 },
      { order: 4, instruction: 'Stay immersed for 2-4 minutes', duration: 180, tip: 'Build up gradually over weeks' },
      { order: 5, instruction: 'Exit and allow natural rewarming (no hot shower)', tip: 'Shivering is beneficial - it generates heat and burns calories' },
      { order: 6, instruction: 'Target 11 minutes total per week across sessions' }
    ],
    scienceNote: 'Research shows 11 minutes of cold exposure per week (split across sessions) optimizes the metabolic benefits while remaining safe. Cold shock proteins (RBM3) increase neuroplasticity and may protect against neurodegeneration.',
    equipment: ['Cold plunge tub', 'Thermometer', 'Timer'],
    contraindications: ['Heart conditions', 'Raynaud\'s disease', 'Pregnancy', 'Recent surgery'],
    points: 25
  },

  // ============================================================================
  // HEAT EXPOSURE PROTOCOLS
  // ============================================================================
  {
    id: 'sauna-protocol',
    title: 'Sauna Longevity Protocol',
    description: 'Regular sauna use for cardiovascular health, detoxification, and longevity benefits.',
    category: 'heat-exposure',
    difficulty: 'intermediate',
    duration: 20,
    timeOfDay: 'afternoon',
    frequency: 'weekly',
    benefits: [
      'Reduces all-cause mortality by 40% (4+ sessions/week)',
      'Increases growth hormone',
      'Improves cardiovascular function',
      'Activates heat shock proteins',
      'Enhances detoxification'
    ],
    steps: [
      { order: 1, instruction: 'Hydrate well before entering (16oz water)', tip: 'Add electrolytes if doing multiple rounds' },
      { order: 2, instruction: 'Enter sauna at 176-212°F (80-100°C)', duration: 30 },
      { order: 3, instruction: 'Stay for 15-20 minutes per session', duration: 1200, tip: 'Listen to your body - exit if dizzy' },
      { order: 4, instruction: 'Cool down for 5 minutes between rounds', duration: 300 },
      { order: 5, instruction: 'Complete 2-4 rounds for maximum benefit' },
      { order: 6, instruction: 'Rehydrate thoroughly after (24oz+ water with electrolytes)' }
    ],
    scienceNote: 'Finnish studies show 4-7 sauna sessions per week reduce cardiovascular mortality by 50% and all-cause mortality by 40%. Heat shock proteins (HSP70, HSP90) protect cells from stress and may slow aging.',
    equipment: ['Sauna access', 'Thermometer', 'Timer', 'Electrolyte supplement'],
    contraindications: ['Pregnancy', 'Uncontrolled blood pressure', 'Recent alcohol consumption', 'Fever'],
    points: 20
  },

  // ============================================================================
  // BREATHWORK PROTOCOLS
  // ============================================================================
  {
    id: 'physiological-sigh',
    title: 'Physiological Sigh',
    description: 'The fastest way to reduce stress in real-time using a double inhale followed by extended exhale.',
    category: 'breathwork',
    difficulty: 'foundation',
    duration: 1,
    timeOfDay: 'anytime',
    frequency: 'as-needed',
    benefits: [
      'Rapidly reduces stress and anxiety',
      'Activates parasympathetic nervous system',
      'Lowers heart rate within seconds',
      'Can be done anywhere, anytime'
    ],
    steps: [
      { order: 1, instruction: 'Inhale deeply through your nose', duration: 3 },
      { order: 2, instruction: 'Take a second short inhale to maximally inflate lungs', duration: 1, tip: 'This reopens collapsed alveoli' },
      { order: 3, instruction: 'Exhale slowly and completely through your mouth', duration: 6 },
      { order: 4, instruction: 'Repeat 1-3 times as needed' }
    ],
    scienceNote: 'The physiological sigh is the fastest known method to activate the parasympathetic nervous system. The double inhale maximally inflates the lungs, and the extended exhale activates the vagus nerve, rapidly reducing heart rate and stress.',
    points: 5
  },
  {
    id: 'box-breathing',
    title: 'Box Breathing (Navy SEAL)',
    description: 'A powerful technique used by Navy SEALs and first responders to stay calm under pressure.',
    category: 'breathwork',
    difficulty: 'foundation',
    duration: 5,
    timeOfDay: 'anytime',
    frequency: 'daily',
    benefits: [
      'Reduces stress and anxiety',
      'Improves focus and concentration',
      'Balances autonomic nervous system',
      'Enhances CO2 tolerance'
    ],
    steps: [
      { order: 1, instruction: 'Find a comfortable seated position' },
      { order: 2, instruction: 'Inhale through nose for 4 seconds', duration: 4 },
      { order: 3, instruction: 'Hold breath for 4 seconds', duration: 4 },
      { order: 4, instruction: 'Exhale through mouth for 4 seconds', duration: 4 },
      { order: 5, instruction: 'Hold empty for 4 seconds', duration: 4 },
      { order: 6, instruction: 'Repeat for 5-10 minutes' }
    ],
    scienceNote: 'Box breathing creates a balanced ratio of sympathetic and parasympathetic activation. The breath holds increase CO2 tolerance, which improves overall breathing efficiency and stress resilience.',
    points: 10
  },
  {
    id: 'wim-hof-breathing',
    title: 'Wim Hof Breathing Method',
    description: 'Controlled hyperventilation followed by breath retention for enhanced energy and stress resilience.',
    category: 'breathwork',
    difficulty: 'advanced',
    duration: 15,
    timeOfDay: 'morning',
    frequency: 'daily',
    benefits: [
      'Increases energy and alertness',
      'Boosts immune function',
      'Reduces inflammation markers',
      'Enhances stress tolerance',
      'Improves cold tolerance'
    ],
    steps: [
      { order: 1, instruction: 'Lie down in a safe, comfortable position', tip: 'Never do this in water or while driving' },
      { order: 2, instruction: 'Take 30-40 deep breaths (inhale fully, exhale partially)', duration: 90, tip: 'You may feel tingling - this is normal' },
      { order: 3, instruction: 'After last exhale, hold breath as long as comfortable', duration: 90, tip: 'Don\'t force it - relax into the hold' },
      { order: 4, instruction: 'Inhale deeply and hold for 15 seconds', duration: 15 },
      { order: 5, instruction: 'Exhale and begin next round', tip: 'Complete 3-4 rounds total' }
    ],
    scienceNote: 'Research shows Wim Hof breathing can voluntarily influence the immune system and reduce inflammatory markers. The technique creates intermittent hypoxia which stimulates EPO production and mitochondrial adaptation.',
    contraindications: ['Epilepsy', 'Pregnancy', 'Cardiovascular conditions', 'Recent surgery'],
    points: 20
  },

  // ============================================================================
  // MOVEMENT PROTOCOLS
  // ============================================================================
  {
    id: 'zone-2-cardio',
    title: 'Zone 2 Cardio Training',
    description: 'Low-intensity steady-state cardio for mitochondrial health and metabolic efficiency.',
    category: 'movement',
    difficulty: 'foundation',
    duration: 45,
    timeOfDay: 'anytime',
    frequency: 'daily',
    benefits: [
      'Increases mitochondrial density',
      'Improves fat oxidation',
      'Enhances cardiovascular health',
      'Builds aerobic base',
      'Sustainable long-term'
    ],
    steps: [
      { order: 1, instruction: 'Choose activity: walking, cycling, swimming, rowing' },
      { order: 2, instruction: 'Warm up for 5 minutes at easy pace', duration: 300 },
      { order: 3, instruction: 'Maintain effort where you can nose-breathe and hold conversation', duration: 2400, tip: 'Heart rate typically 60-70% of max' },
      { order: 4, instruction: 'Target: can speak in full sentences but slightly challenging' },
      { order: 5, instruction: 'Cool down for 5 minutes', duration: 300 }
    ],
    scienceNote: 'Zone 2 training targets the maximal lactate steady state, optimally stressing mitochondria without exceeding their capacity. This creates the signal for mitochondrial biogenesis. Peter Attia recommends 3-4 hours per week.',
    equipment: ['Heart rate monitor (optional)', 'Comfortable shoes'],
    points: 15
  },
  {
    id: 'vo2-max-training',
    title: 'VO2 Max Intervals',
    description: 'High-intensity interval training to maximize cardiovascular capacity - the strongest predictor of longevity.',
    category: 'movement',
    difficulty: 'advanced',
    duration: 30,
    timeOfDay: 'morning',
    frequency: 'weekly',
    benefits: [
      'VO2 max is strongest predictor of longevity',
      'Improves heart efficiency',
      'Enhances oxygen utilization',
      'Boosts growth hormone',
      'Improves insulin sensitivity'
    ],
    steps: [
      { order: 1, instruction: 'Warm up for 10 minutes with increasing intensity', duration: 600 },
      { order: 2, instruction: 'Perform 4-minute high-intensity interval at 90-95% max heart rate', duration: 240, tip: 'Should be very challenging but sustainable' },
      { order: 3, instruction: 'Active recovery for 4 minutes at easy pace', duration: 240 },
      { order: 4, instruction: 'Repeat for 4-6 intervals total' },
      { order: 5, instruction: 'Cool down for 5-10 minutes', duration: 600 }
    ],
    scienceNote: 'Low VO2 max is associated with 5x higher mortality risk vs high VO2 max. Norwegian 4x4 protocol shown to improve VO2 max by 10% in 10 weeks. Each 1 MET increase in fitness = 12% reduction in mortality.',
    equipment: ['Heart rate monitor', 'Cardio equipment or running shoes'],
    contraindications: ['Heart conditions without clearance', 'Recent injury', 'Uncontrolled hypertension'],
    points: 25
  },
  {
    id: 'morning-mobility',
    title: 'Morning Mobility Routine',
    description: 'Joint mobility and movement flow to start the day with full range of motion.',
    category: 'movement',
    difficulty: 'foundation',
    duration: 10,
    timeOfDay: 'morning',
    frequency: 'daily',
    benefits: [
      'Improves joint health',
      'Reduces stiffness',
      'Prevents injury',
      'Enhances body awareness',
      'Prepares body for the day'
    ],
    steps: [
      { order: 1, instruction: 'Neck circles - 5 each direction', duration: 30 },
      { order: 2, instruction: 'Shoulder rolls and arm circles - 10 each', duration: 45 },
      { order: 3, instruction: 'Cat-cow spine mobilization - 10 reps', duration: 60 },
      { order: 4, instruction: 'Hip circles and leg swings - 10 each side', duration: 60 },
      { order: 5, instruction: 'Deep squat hold - 60 seconds', duration: 60, tip: 'Hold onto something if needed' },
      { order: 6, instruction: 'World\'s greatest stretch - 5 each side', duration: 90 },
      { order: 7, instruction: 'Ankle circles and calf raises - 10 each', duration: 45 }
    ],
    scienceNote: 'Synovial fluid production and joint nutrition require movement. Morning mobility helps distribute synovial fluid, reducing joint stiffness and maintaining cartilage health.',
    points: 10
  },

  // ============================================================================
  // SLEEP PROTOCOLS
  // ============================================================================
  {
    id: 'sleep-optimization',
    title: 'Sleep Optimization Protocol',
    description: 'Comprehensive pre-sleep routine for maximum sleep quality and recovery.',
    category: 'sleep',
    difficulty: 'foundation',
    duration: 60,
    timeOfDay: 'evening',
    frequency: 'daily',
    benefits: [
      'Improves sleep onset',
      'Enhances deep sleep',
      'Optimizes hormone production',
      'Improves next-day cognition',
      'Supports immune function'
    ],
    steps: [
      { order: 1, instruction: 'Set bedroom temperature to 65-68°F (18-20°C)', tip: 'Cool temperatures promote deep sleep' },
      { order: 2, instruction: 'Complete evening light dimming protocol 2 hours before bed' },
      { order: 3, instruction: 'Stop eating 3 hours before bedtime', tip: 'Allows digestion to complete' },
      { order: 4, instruction: 'Take sleep supplements if using (magnesium, glycine, etc.)' },
      { order: 5, instruction: 'Dim lights and avoid screens 1 hour before bed' },
      { order: 6, instruction: 'Practice relaxation: reading, stretching, or meditation', duration: 1800 },
      { order: 7, instruction: 'Keep consistent sleep/wake times (within 30 min daily)' }
    ],
    scienceNote: 'Core body temperature must drop 2-3°F to initiate sleep. Growth hormone is primarily released during deep sleep in the first half of the night. Consistent sleep timing maintains circadian rhythm integrity.',
    equipment: ['Blackout curtains', 'White noise machine (optional)', 'Sleep mask (optional)'],
    points: 15
  },
  {
    id: 'nsdr-yoga-nidra',
    title: 'NSDR / Yoga Nidra',
    description: 'Non-Sleep Deep Rest protocol for recovery, learning consolidation, and dopamine restoration.',
    category: 'sleep',
    difficulty: 'foundation',
    duration: 20,
    timeOfDay: 'afternoon',
    frequency: 'daily',
    benefits: [
      'Restores dopamine levels by 65%',
      'Enhances learning and memory',
      'Reduces anxiety',
      'Compensates for sleep debt',
      'Increases focus post-session'
    ],
    steps: [
      { order: 1, instruction: 'Find a comfortable lying position' },
      { order: 2, instruction: 'Put on headphones with a guided NSDR track', tip: 'Search "Huberman NSDR" on YouTube' },
      { order: 3, instruction: 'Follow the body scan and relaxation cues', duration: 1200 },
      { order: 4, instruction: 'Allow yourself to drift into deep relaxation (not sleep)' },
      { order: 5, instruction: 'Gently return awareness when the session ends' }
    ],
    scienceNote: 'NSDR has been shown to restore dopamine in the striatum by up to 65%. It can partially compensate for sleep loss and enhances neuroplasticity for learning. Regular practice improves ability to control relaxation states.',
    points: 15
  },

  // ============================================================================
  // NUTRITION/FASTING PROTOCOLS
  // ============================================================================
  {
    id: 'time-restricted-eating',
    title: 'Time-Restricted Eating',
    description: 'Limit eating window to 8-10 hours to optimize metabolic health and cellular repair.',
    category: 'nutrition',
    difficulty: 'foundation',
    duration: 0,
    timeOfDay: 'anytime',
    frequency: 'daily',
    benefits: [
      'Improves insulin sensitivity',
      'Activates autophagy',
      'Supports healthy body composition',
      'Aligns eating with circadian rhythm',
      'May extend lifespan'
    ],
    steps: [
      { order: 1, instruction: 'Choose your eating window (e.g., 10am-6pm)', tip: 'Earlier windows may be better for circadian alignment' },
      { order: 2, instruction: 'Consume all calories within your chosen window' },
      { order: 3, instruction: 'Outside the window: water, black coffee, plain tea only' },
      { order: 4, instruction: 'Be consistent with timing daily', tip: 'Consistency matters more than perfection' },
      { order: 5, instruction: 'Start with 12-hour window and gradually reduce to 8-10 hours' }
    ],
    scienceNote: 'Time-restricted eating aligns food intake with circadian metabolic rhythms. Studies show benefits for metabolic health, blood pressure, and body composition even without calorie restriction.',
    contraindications: ['Diabetes (consult doctor)', 'Pregnancy', 'History of eating disorders', 'Underweight'],
    points: 10
  },

  // ============================================================================
  // MINDFULNESS PROTOCOLS
  // ============================================================================
  {
    id: 'morning-meditation',
    title: 'Morning Focus Meditation',
    description: 'Brief morning meditation to enhance focus, reduce anxiety, and set intentions for the day.',
    category: 'mindfulness',
    difficulty: 'foundation',
    duration: 10,
    timeOfDay: 'morning',
    frequency: 'daily',
    benefits: [
      'Improves focus and attention',
      'Reduces anxiety and stress',
      'Enhances emotional regulation',
      'Increases gray matter density',
      'Improves decision making'
    ],
    steps: [
      { order: 1, instruction: 'Sit comfortably with spine straight' },
      { order: 2, instruction: 'Close eyes or soft gaze downward' },
      { order: 3, instruction: 'Focus attention on breath at the nose or belly', duration: 300 },
      { order: 4, instruction: 'When mind wanders, gently return to breath', tip: 'Noticing the wandering IS the practice' },
      { order: 5, instruction: 'End with 3 deep breaths and set an intention for the day' }
    ],
    scienceNote: 'Regular meditation practice increases gray matter in the prefrontal cortex and hippocampus while decreasing amygdala volume. 8 weeks of practice can produce measurable brain changes.',
    points: 10
  },
  {
    id: 'gratitude-practice',
    title: 'Gratitude Practice',
    description: 'Evidence-based gratitude practice to improve wellbeing and positive emotion.',
    category: 'mindfulness',
    difficulty: 'foundation',
    duration: 5,
    timeOfDay: 'evening',
    frequency: 'daily',
    benefits: [
      'Increases life satisfaction',
      'Improves sleep quality',
      'Reduces depression symptoms',
      'Enhances relationships',
      'Builds psychological resilience'
    ],
    steps: [
      { order: 1, instruction: 'Find a quiet moment (often best before bed)' },
      { order: 2, instruction: 'Write down or mentally note 3 specific things you\'re grateful for', duration: 180 },
      { order: 3, instruction: 'For each, reflect on WHY you\'re grateful', tip: 'Specificity increases effectiveness' },
      { order: 4, instruction: 'Notice the positive emotion that arises' },
      { order: 5, instruction: 'Optionally share one gratitude with someone' }
    ],
    scienceNote: 'Gratitude practices have been shown to increase wellbeing and decrease depression in randomized controlled trials. The practice works partly by shifting attention toward positive aspects of life.',
    points: 5
  }
];

// ============================================================================
// PROTOCOL CATEGORIES METADATA
// ============================================================================

export const protocolCategories = {
  circadian: {
    name: 'Circadian Rhythm',
    description: 'Optimize your internal clock for better sleep, energy, and hormone regulation',
    icon: 'Sun',
    color: 'yellow'
  },
  'cold-exposure': {
    name: 'Cold Exposure',
    description: 'Harness the power of cold for metabolism, mood, and resilience',
    icon: 'Snowflake',
    color: 'blue'
  },
  'heat-exposure': {
    name: 'Heat Exposure',
    description: 'Use heat stress for cardiovascular health and longevity',
    icon: 'Flame',
    color: 'orange'
  },
  breathwork: {
    name: 'Breathwork',
    description: 'Control your nervous system through conscious breathing',
    icon: 'Wind',
    color: 'cyan'
  },
  movement: {
    name: 'Movement',
    description: 'Exercise protocols for strength, cardio, and longevity',
    icon: 'Activity',
    color: 'green'
  },
  sleep: {
    name: 'Sleep',
    description: 'Optimize recovery and regeneration through better sleep',
    icon: 'Moon',
    color: 'purple'
  },
  nutrition: {
    name: 'Nutrition',
    description: 'Eating patterns and timing for metabolic health',
    icon: 'Utensils',
    color: 'emerald'
  },
  mindfulness: {
    name: 'Mindfulness',
    description: 'Mental practices for focus, calm, and wellbeing',
    icon: 'Brain',
    color: 'pink'
  },
  recovery: {
    name: 'Recovery',
    description: 'Active recovery techniques for optimal adaptation',
    icon: 'RefreshCw',
    color: 'teal'
  }
};

// ============================================================================
// DAILY PROTOCOL SCHEDULES
// ============================================================================

export interface DailySchedule {
  id: string;
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  totalTime: number;
  protocols: {
    time: string;
    protocolId: string;
    optional?: boolean;
  }[];
}

export const dailySchedules: DailySchedule[] = [
  {
    id: 'foundation-daily',
    name: 'Foundation Protocol',
    description: 'Essential daily practices for longevity beginners. ~45 minutes total.',
    level: 'beginner',
    totalTime: 45,
    protocols: [
      { time: '6:30 AM', protocolId: 'morning-light-exposure' },
      { time: '7:00 AM', protocolId: 'morning-mobility' },
      { time: '7:15 AM', protocolId: 'cold-shower-basic', optional: true },
      { time: '2:00 PM', protocolId: 'nsdr-yoga-nidra', optional: true },
      { time: '8:00 PM', protocolId: 'evening-light-dimming' },
      { time: '9:30 PM', protocolId: 'gratitude-practice' }
    ]
  },
  {
    id: 'optimal-daily',
    name: 'Optimal Protocol',
    description: 'Comprehensive daily protocol for intermediate practitioners. ~90 minutes total.',
    level: 'intermediate',
    totalTime: 90,
    protocols: [
      { time: '6:00 AM', protocolId: 'morning-light-exposure' },
      { time: '6:30 AM', protocolId: 'morning-meditation' },
      { time: '6:45 AM', protocolId: 'morning-mobility' },
      { time: '7:00 AM', protocolId: 'cold-shower-basic' },
      { time: '12:00 PM', protocolId: 'zone-2-cardio' },
      { time: '2:00 PM', protocolId: 'nsdr-yoga-nidra' },
      { time: '7:00 PM', protocolId: 'evening-light-dimming' },
      { time: '9:00 PM', protocolId: 'sleep-optimization' },
      { time: '9:30 PM', protocolId: 'gratitude-practice' }
    ]
  },
  {
    id: 'advanced-daily',
    name: 'Advanced Protocol',
    description: 'Maximum optimization for experienced biohackers. ~120+ minutes total.',
    level: 'advanced',
    totalTime: 120,
    protocols: [
      { time: '5:30 AM', protocolId: 'wim-hof-breathing' },
      { time: '6:00 AM', protocolId: 'morning-light-exposure' },
      { time: '6:30 AM', protocolId: 'morning-meditation' },
      { time: '6:45 AM', protocolId: 'morning-mobility' },
      { time: '7:00 AM', protocolId: 'deliberate-cold-exposure' },
      { time: '8:00 AM', protocolId: 'time-restricted-eating' },
      { time: '12:00 PM', protocolId: 'zone-2-cardio' },
      { time: '2:00 PM', protocolId: 'nsdr-yoga-nidra' },
      { time: '4:00 PM', protocolId: 'vo2-max-training', optional: true },
      { time: '5:00 PM', protocolId: 'sauna-protocol', optional: true },
      { time: '7:00 PM', protocolId: 'evening-light-dimming' },
      { time: '9:00 PM', protocolId: 'sleep-optimization' },
      { time: '9:30 PM', protocolId: 'gratitude-practice' }
    ]
  }
];

export default protocols;
