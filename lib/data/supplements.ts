/**
 * Longevity Supplements Database
 * 
 * Evidence-based supplement recommendations organized by category.
 * Research sources: Examine.com, Peter Attia, David Sinclair, Rhonda Patrick
 * 
 * DISCLAIMER: This is for educational purposes only. Consult a healthcare
 * provider before starting any supplement regimen.
 */

export interface Supplement {
  id: string;
  name: string;
  category: SupplementCategory;
  description: string;
  benefits: string[];
  dosage: {
    amount: string;
    frequency: string;
    timing: 'morning' | 'afternoon' | 'evening' | 'with-meals' | 'empty-stomach' | 'bedtime' | 'anytime';
    notes?: string;
  };
  evidenceLevel: 'strong' | 'moderate' | 'emerging';
  mechanisms: string[];
  interactions?: string[];
  sideEffects?: string[];
  contraindications?: string[];
  stacksWith?: string[];
  monthlyBudget: 'low' | 'medium' | 'high'; // <$20, $20-50, >$50
  tier: 'essential' | 'intermediate' | 'advanced';
  icon: string;
}

export type SupplementCategory = 
  | 'nad-pathway'
  | 'mitochondrial'
  | 'longevity-pathway'
  | 'sleep-recovery'
  | 'cognitive'
  | 'cardiovascular'
  | 'foundational'
  | 'anti-inflammatory';

export const supplements: Supplement[] = [
  // ============================================================================
  // FOUNDATIONAL SUPPLEMENTS
  // ============================================================================
  {
    id: 'vitamin-d3',
    name: 'Vitamin D3',
    category: 'foundational',
    description: 'The "sunshine vitamin" essential for immune function, bone health, and longevity. Most people are deficient.',
    benefits: [
      'Supports immune function',
      'Maintains bone density',
      'Reduces all-cause mortality',
      'Supports mood and cognition',
      'May reduce cancer risk'
    ],
    dosage: {
      amount: '2,000-5,000 IU',
      frequency: 'Daily',
      timing: 'with-meals',
      notes: 'Take with fat-containing meal for absorption. Test levels and adjust dose accordingly.'
    },
    evidenceLevel: 'strong',
    mechanisms: [
      'Vitamin D receptor activation in nearly every cell',
      'Modulates immune cell function',
      'Regulates calcium absorption',
      'Influences gene expression of 200+ genes'
    ],
    interactions: ['May reduce effectiveness of some medications'],
    sideEffects: ['Rare at normal doses; hypercalcemia at very high doses'],
    stacksWith: ['vitamin-k2', 'magnesium'],
    monthlyBudget: 'low',
    tier: 'essential',
    icon: '☀️'
  },
  {
    id: 'vitamin-k2',
    name: 'Vitamin K2 (MK-7)',
    category: 'foundational',
    description: 'Essential partner to Vitamin D3. Directs calcium to bones and teeth, away from arteries.',
    benefits: [
      'Prevents arterial calcification',
      'Supports bone density',
      'Enhances Vitamin D effectiveness',
      'May reduce fracture risk',
      'Supports cardiovascular health'
    ],
    dosage: {
      amount: '100-200 mcg',
      frequency: 'Daily',
      timing: 'with-meals',
      notes: 'Always take with Vitamin D3. MK-7 form has longer half-life than MK-4.'
    },
    evidenceLevel: 'moderate',
    mechanisms: [
      'Activates matrix Gla protein (MGP) to prevent calcification',
      'Activates osteocalcin for bone formation',
      'Works synergistically with Vitamin D'
    ],
    interactions: ['Warfarin (blood thinners) - consult doctor'],
    stacksWith: ['vitamin-d3'],
    monthlyBudget: 'low',
    tier: 'essential',
    icon: '💚'
  },
  {
    id: 'omega-3',
    name: 'Omega-3 Fish Oil (EPA/DHA)',
    category: 'foundational',
    description: 'Essential fatty acids for brain, heart, and cellular health. Most powerful anti-inflammatory supplement.',
    benefits: [
      'Reduces inflammation (powerful)',
      'Supports brain health and cognition',
      'Improves cardiovascular markers',
      'May reduce depression and anxiety',
      'Supports eye health'
    ],
    dosage: {
      amount: '2-3g EPA+DHA combined',
      frequency: 'Daily',
      timing: 'with-meals',
      notes: 'Higher EPA for inflammation/mood, higher DHA for brain. Refrigerate to prevent oxidation.'
    },
    evidenceLevel: 'strong',
    mechanisms: [
      'Incorporates into cell membranes improving fluidity',
      'Precursor to anti-inflammatory resolvins',
      'Reduces inflammatory cytokines',
      'Supports neuronal membrane function'
    ],
    interactions: ['Blood thinners - may increase bleeding risk'],
    sideEffects: ['Fish burps (use enteric-coated or take with meals)'],
    stacksWith: ['vitamin-d3', 'curcumin'],
    monthlyBudget: 'medium',
    tier: 'essential',
    icon: '🐟'
  },
  {
    id: 'magnesium',
    name: 'Magnesium (Glycinate/Threonate)',
    category: 'foundational',
    description: 'Involved in 300+ enzymatic reactions. Most people are deficient. Critical for sleep, stress, and energy.',
    benefits: [
      'Improves sleep quality',
      'Reduces stress and anxiety',
      'Supports muscle function',
      'Maintains heart rhythm',
      'Supports bone health'
    ],
    dosage: {
      amount: '200-400mg elemental',
      frequency: 'Daily',
      timing: 'bedtime',
      notes: 'Glycinate for sleep/relaxation, Threonate for cognitive benefits. Split dose if GI issues.'
    },
    evidenceLevel: 'strong',
    mechanisms: [
      'Cofactor for 300+ enzymes including ATP production',
      'Regulates GABA receptors for relaxation',
      'Essential for DNA repair',
      'Maintains electrolyte balance'
    ],
    sideEffects: ['Loose stools at high doses (especially citrate)'],
    stacksWith: ['vitamin-d3', 'zinc'],
    monthlyBudget: 'low',
    tier: 'essential',
    icon: '💫'
  },

  // ============================================================================
  // NAD+ PATHWAY SUPPLEMENTS
  // ============================================================================
  {
    id: 'nmn',
    name: 'NMN (Nicotinamide Mononucleotide)',
    category: 'nad-pathway',
    description: 'Direct precursor to NAD+, the critical coenzyme for energy metabolism and sirtuins.',
    benefits: [
      'Increases cellular NAD+ levels',
      'Supports energy metabolism',
      'May improve insulin sensitivity',
      'Activates longevity sirtuins',
      'Supports DNA repair'
    ],
    dosage: {
      amount: '250-500mg',
      frequency: 'Daily',
      timing: 'morning',
      notes: 'Take in the morning as NAD+ follows circadian rhythm. Sublingual may improve absorption.'
    },
    evidenceLevel: 'emerging',
    mechanisms: [
      'Direct conversion to NAD+ via NMNAT enzymes',
      'Activates SIRT1-7 (longevity genes)',
      'Supports PARP enzymes for DNA repair',
      'Enhances mitochondrial function'
    ],
    interactions: ['Theoretical: may reduce cancer treatment efficacy'],
    stacksWith: ['resveratrol', 'pterostilbene'],
    monthlyBudget: 'high',
    tier: 'advanced',
    icon: '⚡'
  },
  {
    id: 'nr',
    name: 'NR (Nicotinamide Riboside)',
    category: 'nad-pathway',
    description: 'NAD+ precursor with good human trial data. Alternative to NMN with different uptake pathway.',
    benefits: [
      'Increases NAD+ levels (proven in humans)',
      'Supports healthy aging',
      'May improve muscle function',
      'Supports cognitive health',
      'Well-studied safety profile'
    ],
    dosage: {
      amount: '300-1000mg',
      frequency: 'Daily',
      timing: 'morning',
      notes: 'Best studied NAD+ precursor in humans. Niagen® is the most researched form.'
    },
    evidenceLevel: 'moderate',
    mechanisms: [
      'Converted to NMN then NAD+ via NRK pathway',
      'Activates sirtuins',
      'Supports mitochondrial health',
      'May cross blood-brain barrier'
    ],
    stacksWith: ['pterostilbene'],
    monthlyBudget: 'high',
    tier: 'intermediate',
    icon: '🔋'
  },

  // ============================================================================
  // LONGEVITY PATHWAY SUPPLEMENTS
  // ============================================================================
  {
    id: 'resveratrol',
    name: 'Resveratrol',
    category: 'longevity-pathway',
    description: 'Polyphenol from red grapes that activates SIRT1 and mimics caloric restriction benefits.',
    benefits: [
      'Activates SIRT1 longevity pathway',
      'Mimics caloric restriction',
      'Potent antioxidant',
      'Supports cardiovascular health',
      'May enhance exercise benefits'
    ],
    dosage: {
      amount: '250-500mg trans-resveratrol',
      frequency: 'Daily',
      timing: 'morning',
      notes: 'Take with fat (like olive oil) for 5x better absorption. Trans form is active.'
    },
    evidenceLevel: 'moderate',
    mechanisms: [
      'Allosteric activator of SIRT1',
      'Activates AMPK pathway',
      'Inhibits mTOR (promotes autophagy)',
      'Potent antioxidant effects'
    ],
    interactions: ['Blood thinners', 'Estrogen-sensitive conditions'],
    stacksWith: ['nmn', 'quercetin'],
    monthlyBudget: 'medium',
    tier: 'intermediate',
    icon: '🍇'
  },
  {
    id: 'quercetin',
    name: 'Quercetin',
    category: 'longevity-pathway',
    description: 'Flavonoid with senolytic properties - helps clear damaged "zombie" cells from the body.',
    benefits: [
      'Senolytic (clears senescent cells)',
      'Powerful anti-inflammatory',
      'Supports immune function',
      'May enhance exercise capacity',
      'Synergizes with fasting'
    ],
    dosage: {
      amount: '500-1000mg',
      frequency: 'Intermittent (2-3 days monthly)',
      timing: 'morning',
      notes: 'For senolytic effect, take higher dose for 2-3 consecutive days monthly. Can take daily at lower dose for antioxidant benefits.'
    },
    evidenceLevel: 'emerging',
    mechanisms: [
      'Induces apoptosis in senescent cells',
      'Inhibits inflammatory NF-kB pathway',
      'Zinc ionophore (helps zinc enter cells)',
      'Inhibits mast cell activation'
    ],
    stacksWith: ['fisetin', 'dasatinib'],
    monthlyBudget: 'low',
    tier: 'intermediate',
    icon: '🧹'
  },
  {
    id: 'fisetin',
    name: 'Fisetin',
    category: 'longevity-pathway',
    description: 'The most potent natural senolytic. Found in strawberries. Clears senescent cells more effectively than quercetin.',
    benefits: [
      'Most effective natural senolytic',
      'Clears senescent "zombie" cells',
      'Potent antioxidant',
      'Neuroprotective effects',
      'May extend healthspan'
    ],
    dosage: {
      amount: '100-500mg',
      frequency: 'Intermittent (2-3 days monthly)',
      timing: 'morning',
      notes: 'Senolytic protocol: 500mg for 2 consecutive days, once monthly. Daily: 100mg for general benefits.'
    },
    evidenceLevel: 'emerging',
    mechanisms: [
      'Induces apoptosis in senescent cells (more potent than quercetin)',
      'Activates autophagy',
      'Anti-inflammatory via multiple pathways',
      'Crosses blood-brain barrier'
    ],
    stacksWith: ['quercetin'],
    monthlyBudget: 'medium',
    tier: 'advanced',
    icon: '🍓'
  },
  {
    id: 'spermidine',
    name: 'Spermidine',
    category: 'longevity-pathway',
    description: 'Polyamine that powerfully induces autophagy - your body\'s cellular cleanup system.',
    benefits: [
      'Potent autophagy inducer',
      'May extend lifespan (animal studies)',
      'Supports cardiovascular health',
      'Neuroprotective',
      'Anti-aging at cellular level'
    ],
    dosage: {
      amount: '1-5mg',
      frequency: 'Daily',
      timing: 'morning',
      notes: 'Can also be obtained from wheat germ, aged cheese, and mushrooms.'
    },
    evidenceLevel: 'emerging',
    mechanisms: [
      'Induces autophagy independent of mTOR',
      'Enhances mitophagy (mitochondrial cleanup)',
      'Supports healthy cell division',
      'May rejuvenate stem cells'
    ],
    stacksWith: ['fasting'],
    monthlyBudget: 'high',
    tier: 'advanced',
    icon: '🔄'
  },

  // ============================================================================
  // MITOCHONDRIAL SUPPORT
  // ============================================================================
  {
    id: 'coq10',
    name: 'CoQ10 (Ubiquinol)',
    category: 'mitochondrial',
    description: 'Essential for mitochondrial energy production. Levels decline with age and statin use.',
    benefits: [
      'Supports cellular energy production',
      'Protects mitochondria from oxidation',
      'Essential if taking statins',
      'Supports heart health',
      'May improve exercise performance'
    ],
    dosage: {
      amount: '100-200mg ubiquinol',
      frequency: 'Daily',
      timing: 'with-meals',
      notes: 'Ubiquinol is the reduced (active) form - better absorbed than ubiquinone, especially over age 40.'
    },
    evidenceLevel: 'strong',
    mechanisms: [
      'Essential electron carrier in mitochondrial electron transport chain',
      'Potent lipid-soluble antioxidant',
      'Regenerates vitamin E',
      'Required for ATP synthesis'
    ],
    stacksWith: ['pqq', 'alpha-lipoic-acid'],
    monthlyBudget: 'medium',
    tier: 'essential',
    icon: '🔥'
  },
  {
    id: 'pqq',
    name: 'PQQ (Pyrroloquinoline Quinone)',
    category: 'mitochondrial',
    description: 'Promotes mitochondrial biogenesis - the creation of new mitochondria. Synergistic with CoQ10.',
    benefits: [
      'Stimulates new mitochondria growth',
      'Neuroprotective',
      'Supports cognitive function',
      'Enhances CoQ10 effectiveness',
      'Antioxidant 5000x more potent than vitamin C'
    ],
    dosage: {
      amount: '10-20mg',
      frequency: 'Daily',
      timing: 'morning',
      notes: 'Small dose is effective. Works synergistically with CoQ10.'
    },
    evidenceLevel: 'moderate',
    mechanisms: [
      'Activates PGC-1α (master switch for mitochondrial biogenesis)',
      'Promotes nerve growth factor (NGF)',
      'Extremely potent redox agent',
      'Supports mitochondrial efficiency'
    ],
    stacksWith: ['coq10'],
    monthlyBudget: 'medium',
    tier: 'intermediate',
    icon: '⚡'
  },
  {
    id: 'creatine',
    name: 'Creatine Monohydrate',
    category: 'mitochondrial',
    description: 'Most studied supplement ever. Benefits go far beyond muscle - supports brain, heart, and energy.',
    benefits: [
      'Enhances ATP production',
      'Supports muscle strength',
      'Neuroprotective and cognitive benefits',
      'May improve depression',
      'Supports bone health'
    ],
    dosage: {
      amount: '3-5g',
      frequency: 'Daily',
      timing: 'anytime',
      notes: 'No loading phase necessary. Monohydrate is the most studied and effective form.'
    },
    evidenceLevel: 'strong',
    mechanisms: [
      'Increases phosphocreatine stores for rapid ATP regeneration',
      'Supports brain energy metabolism',
      'May enhance cellular hydration',
      'Neuroprotective against excitotoxicity'
    ],
    sideEffects: ['May cause water retention initially'],
    stacksWith: ['protein', 'hmb'],
    monthlyBudget: 'low',
    tier: 'essential',
    icon: '💪'
  },

  // ============================================================================
  // SLEEP & RECOVERY
  // ============================================================================
  {
    id: 'glycine',
    name: 'Glycine',
    category: 'sleep-recovery',
    description: 'Amino acid that lowers core body temperature and enhances deep sleep quality.',
    benefits: [
      'Improves sleep quality',
      'Lowers core body temperature',
      'Supports collagen production',
      'May reduce next-day fatigue',
      'Supports liver detoxification'
    ],
    dosage: {
      amount: '3g',
      frequency: 'Daily',
      timing: 'bedtime',
      notes: 'Take 30-60 minutes before bed. Sweet taste - can be mixed into tea.'
    },
    evidenceLevel: 'moderate',
    mechanisms: [
      'Acts on NMDA receptors to lower body temperature',
      'Inhibitory neurotransmitter',
      'Supports glutathione synthesis',
      'Collagen precursor'
    ],
    stacksWith: ['magnesium', 'l-theanine'],
    monthlyBudget: 'low',
    tier: 'essential',
    icon: '😴'
  },
  {
    id: 'l-theanine',
    name: 'L-Theanine',
    category: 'sleep-recovery',
    description: 'Amino acid from tea that promotes calm focus without drowsiness. Excellent with caffeine or for sleep.',
    benefits: [
      'Promotes relaxation without sedation',
      'Reduces anxiety',
      'Improves focus when combined with caffeine',
      'Enhances sleep quality',
      'Increases alpha brain waves'
    ],
    dosage: {
      amount: '100-200mg',
      frequency: 'As needed',
      timing: 'morning',
      notes: 'Morning: combine with caffeine for calm focus. Evening: take alone for relaxation.'
    },
    evidenceLevel: 'moderate',
    mechanisms: [
      'Increases GABA, dopamine, and serotonin',
      'Crosses blood-brain barrier',
      'Promotes alpha brain wave activity',
      'Modulates glutamate'
    ],
    stacksWith: ['caffeine', 'magnesium'],
    monthlyBudget: 'low',
    tier: 'essential',
    icon: '🍵'
  },
  {
    id: 'apigenin',
    name: 'Apigenin',
    category: 'sleep-recovery',
    description: 'Flavonoid from chamomile that promotes sleep by reducing anxiety. Natural and non-habit forming.',
    benefits: [
      'Promotes sleep onset',
      'Reduces anxiety',
      'Non-habit forming',
      'May increase testosterone in men',
      'Anti-inflammatory'
    ],
    dosage: {
      amount: '50mg',
      frequency: 'Daily',
      timing: 'bedtime',
      notes: '30-60 minutes before bed. Can also drink chamomile tea for milder effect.'
    },
    evidenceLevel: 'moderate',
    mechanisms: [
      'Binds to GABA receptors (similar to benzodiazepines but milder)',
      'Anxiolytic without sedation',
      'May inhibit aromatase',
      'Anti-inflammatory'
    ],
    stacksWith: ['magnesium', 'glycine'],
    monthlyBudget: 'low',
    tier: 'intermediate',
    icon: '🌼'
  },

  // ============================================================================
  // COGNITIVE SUPPORT
  // ============================================================================
  {
    id: 'lions-mane',
    name: 'Lion\'s Mane Mushroom',
    category: 'cognitive',
    description: 'Medicinal mushroom that promotes nerve growth factor (NGF) for brain health and neuroplasticity.',
    benefits: [
      'Stimulates nerve growth factor (NGF)',
      'Supports neuroplasticity',
      'May improve memory and focus',
      'Neuroprotective',
      'Supports gut-brain axis'
    ],
    dosage: {
      amount: '500-1000mg',
      frequency: 'Daily',
      timing: 'morning',
      notes: 'Look for extracts standardized to beta-glucans and hericenones/erinacines.'
    },
    evidenceLevel: 'moderate',
    mechanisms: [
      'Stimulates NGF and BDNF production',
      'Promotes neuronal growth and myelination',
      'Anti-inflammatory in the brain',
      'Supports gut microbiome'
    ],
    stacksWith: ['omega-3', 'bacopa'],
    monthlyBudget: 'medium',
    tier: 'intermediate',
    icon: '🦁'
  },
  {
    id: 'alpha-gpc',
    name: 'Alpha-GPC',
    category: 'cognitive',
    description: 'Highly bioavailable choline source for acetylcholine production. Supports memory and focus.',
    benefits: [
      'Increases acetylcholine',
      'Supports memory formation',
      'May enhance power output',
      'Supports growth hormone release',
      'Neuroprotective'
    ],
    dosage: {
      amount: '300-600mg',
      frequency: 'Daily',
      timing: 'morning',
      notes: 'Can take before workouts for cognitive and physical performance. Start with lower dose.'
    },
    evidenceLevel: 'moderate',
    mechanisms: [
      'Crosses blood-brain barrier',
      'Direct acetylcholine precursor',
      'Supports cell membrane integrity',
      'May enhance growth hormone'
    ],
    sideEffects: ['Headache if dose too high', 'May cause brain fog in some'],
    stacksWith: ['racetams', 'caffeine'],
    monthlyBudget: 'medium',
    tier: 'intermediate',
    icon: '🧠'
  },

  // ============================================================================
  // CARDIOVASCULAR SUPPORT
  // ============================================================================
  {
    id: 'berberine',
    name: 'Berberine',
    category: 'cardiovascular',
    description: 'Plant compound as effective as metformin for blood sugar. Activates AMPK longevity pathway.',
    benefits: [
      'Lowers blood glucose (comparable to metformin)',
      'Activates AMPK pathway',
      'Improves lipid profile',
      'May support gut health',
      'Anti-inflammatory'
    ],
    dosage: {
      amount: '500mg',
      frequency: '2-3x daily',
      timing: 'with-meals',
      notes: 'Take with meals to reduce GI upset. Cycle: 8 weeks on, 2 weeks off.'
    },
    evidenceLevel: 'strong',
    mechanisms: [
      'Activates AMPK (metabolic master switch)',
      'Inhibits gluconeogenesis',
      'Improves insulin sensitivity',
      'Modulates gut microbiome'
    ],
    interactions: ['Diabetes medications', 'CYP450-metabolized drugs'],
    sideEffects: ['GI upset initially', 'May cause hypoglycemia with meds'],
    contraindications: ['Pregnancy', 'Breastfeeding'],
    monthlyBudget: 'low',
    tier: 'intermediate',
    icon: '🌿'
  },
  {
    id: 'citrus-bergamot',
    name: 'Citrus Bergamot',
    category: 'cardiovascular',
    description: 'Powerful support for cholesterol optimization. May be as effective as low-dose statins.',
    benefits: [
      'Reduces LDL cholesterol',
      'Increases HDL cholesterol',
      'Reduces triglycerides',
      'Supports healthy blood sugar',
      'Antioxidant properties'
    ],
    dosage: {
      amount: '500-1000mg',
      frequency: 'Daily',
      timing: 'with-meals',
      notes: 'Look for standardized extracts. Takes 30-60 days to see lipid changes.'
    },
    evidenceLevel: 'moderate',
    mechanisms: [
      'Inhibits HMG-CoA reductase (like statins)',
      'Activates AMPK',
      'Reduces oxidized LDL',
      'Supports PPAR activity'
    ],
    stacksWith: ['omega-3', 'niacin'],
    monthlyBudget: 'medium',
    tier: 'intermediate',
    icon: '🍊'
  },

  // ============================================================================
  // ANTI-INFLAMMATORY
  // ============================================================================
  {
    id: 'curcumin',
    name: 'Curcumin (with Piperine)',
    category: 'anti-inflammatory',
    description: 'Active compound from turmeric. Powerful anti-inflammatory with brain and joint benefits.',
    benefits: [
      'Powerful anti-inflammatory',
      'Antioxidant',
      'Supports joint health',
      'May support brain health',
      'Supports gut health'
    ],
    dosage: {
      amount: '500-1000mg',
      frequency: 'Daily',
      timing: 'with-meals',
      notes: 'Must be taken with piperine (black pepper) or as lipid formulation for absorption.'
    },
    evidenceLevel: 'strong',
    mechanisms: [
      'Inhibits NF-kB inflammatory pathway',
      'Activates Nrf2 antioxidant pathway',
      'May inhibit COX-2',
      'Supports autophagy'
    ],
    interactions: ['Blood thinners', 'Diabetes medications'],
    stacksWith: ['omega-3', 'ginger'],
    monthlyBudget: 'low',
    tier: 'essential',
    icon: '🧡'
  }
];

// ============================================================================
// SUPPLEMENT STACKS
// ============================================================================

export interface SupplementStack {
  id: string;
  name: string;
  description: string;
  tier: 'essential' | 'intermediate' | 'advanced';
  monthlyBudget: string;
  supplements: {
    supplementId: string;
    timing: string;
    priority: 'required' | 'recommended' | 'optional';
  }[];
}

export const supplementStacks: SupplementStack[] = [
  {
    id: 'foundation-stack',
    name: 'Foundation Stack',
    description: 'The essential supplements everyone should consider. Addresses common deficiencies and supports baseline health.',
    tier: 'essential',
    monthlyBudget: '$30-50/month',
    supplements: [
      { supplementId: 'vitamin-d3', timing: 'Morning with breakfast', priority: 'required' },
      { supplementId: 'vitamin-k2', timing: 'Morning with breakfast', priority: 'required' },
      { supplementId: 'omega-3', timing: 'With largest meal', priority: 'required' },
      { supplementId: 'magnesium', timing: 'Before bed', priority: 'required' }
    ]
  },
  {
    id: 'sleep-stack',
    name: 'Sleep Optimization Stack',
    description: 'Support deep, restorative sleep for recovery and longevity.',
    tier: 'essential',
    monthlyBudget: '$25-40/month',
    supplements: [
      { supplementId: 'magnesium', timing: '30-60 min before bed', priority: 'required' },
      { supplementId: 'glycine', timing: '30-60 min before bed', priority: 'required' },
      { supplementId: 'l-theanine', timing: '30-60 min before bed', priority: 'recommended' },
      { supplementId: 'apigenin', timing: '30-60 min before bed', priority: 'optional' }
    ]
  },
  {
    id: 'energy-mitochondria-stack',
    name: 'Energy & Mitochondria Stack',
    description: 'Optimize cellular energy production and protect your mitochondria.',
    tier: 'intermediate',
    monthlyBudget: '$60-90/month',
    supplements: [
      { supplementId: 'coq10', timing: 'Morning with breakfast', priority: 'required' },
      { supplementId: 'pqq', timing: 'Morning', priority: 'recommended' },
      { supplementId: 'creatine', timing: 'Anytime (consistent)', priority: 'required' },
      { supplementId: 'alpha-gpc', timing: 'Morning', priority: 'optional' }
    ]
  },
  {
    id: 'longevity-stack',
    name: 'Longevity Optimization Stack',
    description: 'Advanced stack targeting the hallmarks of aging: NAD+, senolytics, and autophagy.',
    tier: 'advanced',
    monthlyBudget: '$150-250/month',
    supplements: [
      { supplementId: 'nmn', timing: 'Morning', priority: 'required' },
      { supplementId: 'resveratrol', timing: 'Morning with fat', priority: 'required' },
      { supplementId: 'quercetin', timing: 'Monthly senolytic days', priority: 'recommended' },
      { supplementId: 'fisetin', timing: 'Monthly senolytic days', priority: 'recommended' },
      { supplementId: 'spermidine', timing: 'Morning', priority: 'optional' }
    ]
  },
  {
    id: 'cognitive-stack',
    name: 'Cognitive Enhancement Stack',
    description: 'Support focus, memory, and long-term brain health.',
    tier: 'intermediate',
    monthlyBudget: '$50-80/month',
    supplements: [
      { supplementId: 'lions-mane', timing: 'Morning', priority: 'required' },
      { supplementId: 'omega-3', timing: 'With meals (high DHA)', priority: 'required' },
      { supplementId: 'alpha-gpc', timing: 'Morning', priority: 'recommended' },
      { supplementId: 'l-theanine', timing: 'Morning with caffeine', priority: 'optional' }
    ]
  },
  {
    id: 'cardiovascular-stack',
    name: 'Cardiovascular Health Stack',
    description: 'Support heart health, healthy cholesterol, and blood vessel function.',
    tier: 'intermediate',
    monthlyBudget: '$60-100/month',
    supplements: [
      { supplementId: 'omega-3', timing: 'With meals', priority: 'required' },
      { supplementId: 'coq10', timing: 'With meals', priority: 'required' },
      { supplementId: 'vitamin-k2', timing: 'With meals', priority: 'required' },
      { supplementId: 'citrus-bergamot', timing: 'With meals', priority: 'recommended' },
      { supplementId: 'berberine', timing: 'With meals (if metabolic support needed)', priority: 'optional' }
    ]
  }
];

// ============================================================================
// SUPPLEMENT CATEGORIES METADATA
// ============================================================================

export const supplementCategories = {
  foundational: {
    name: 'Foundational',
    description: 'Essential supplements that address common deficiencies',
    color: 'blue'
  },
  'nad-pathway': {
    name: 'NAD+ Pathway',
    description: 'Support cellular energy and longevity through NAD+ optimization',
    color: 'purple'
  },
  'longevity-pathway': {
    name: 'Longevity Pathways',
    description: 'Target specific aging pathways: sirtuins, autophagy, senolytics',
    color: 'emerald'
  },
  mitochondrial: {
    name: 'Mitochondrial Support',
    description: 'Enhance cellular energy production and protect mitochondria',
    color: 'orange'
  },
  'sleep-recovery': {
    name: 'Sleep & Recovery',
    description: 'Optimize sleep quality and recovery',
    color: 'indigo'
  },
  cognitive: {
    name: 'Cognitive Support',
    description: 'Support brain health, focus, and memory',
    color: 'pink'
  },
  cardiovascular: {
    name: 'Cardiovascular',
    description: 'Support heart health and circulation',
    color: 'red'
  },
  'anti-inflammatory': {
    name: 'Anti-Inflammatory',
    description: 'Reduce chronic inflammation - a root cause of aging',
    color: 'yellow'
  }
};

export default supplements;
