// sphinx-dashboard/src/lib/intelligence/floraNaturopathicEngine.ts
// Viewport-Aware Native Flora, Medicinal Botanicals, Trees, Flowers & Wild Herbs Engine
// Comprehensive Phytochemical Composition, Evidence-Based Naturopathic Actions,
// Traditional Homeopathic Materia Medica Dilutions, and Ecoregion Growth Analytics.

export type FloraCategory = 'tree' | 'herb' | 'flower' | 'fungi' | 'shrub_succulent';

export type EcoregionType = 
  | 'pacific_temperate_rainforest'
  | 'sierra_cascades_montane'
  | 'intermountain_west_rockies'
  | 'sonoran_mojave_desert'
  | 'great_plains_prairie'
  | 'midwest_deciduous_woodland'
  | 'eastern_appalachian_hardwood'
  | 'southeast_pine_savanna'
  | 'subtropical_gulf_coastal';

export interface PhytochemicalProfile {
  primaryClass: 'Terpenoids & Resins' | 'Polyphenols & Flavonoids' | 'Alkaloids' | 'Polysaccharides & Beta-Glucans' | 'Glycosides & Saponins';
  keyCompounds: string[];              // e.g. ["Shikimic Acid", "Pinene", "Anthocyanins", "Limonene"]
  mechanismOfAction: string;           // Biological / enzymatic pharmacology
  organAffinity: ('Immune' | 'Respiratory' | 'Nervous' | 'Digestive' | 'Cardiovascular' | 'Integumentary' | 'Musculoskeletal' | 'Hepatic')[];
}

export interface HomeopathicProfile {
  keynoteIndication: string;           // Traditional Hahnemann / Boericke Materia Medica core indication
  primaryRemedyName: string;           // Homeopathic Latin title (e.g. "Hypericum perforatum", "Arnica montana")
  commonPotencies: string[];           // ["6C", "30C", "200C", "Mother Tincture (Q)"]
  constitutionalProfile: string;       // Emotional/physical constitutional state
  modalityWarmthCold: string;          // Better/worse with heat, cold, motion, rest
}

export interface NaturopathicBenefits {
  primaryTherapeuticUses: string[];   // e.g. ["Adaptogen / Adrenal Fatigue", "Bronchodilator", "Wound Healing"]
  clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)' | 'B (Observational / Pharmacological Validated)' | 'C (Extensive Traditional Monograph)';
  preparations: string[];              // ["Steam Distillation", "Ethanolic Tincture", "Decoction", "Poultice", "Infusion"]
  contraindications: string[];        // Safety warnings (e.g. pregnancy, MAOI interaction)
}

export interface FloraSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  family: string;
  category: FloraCategory;
  nativeEcoregions: EcoregionType[];
  icon: string;
  color: string;                       // Hex color for MapLibre rendering
  
  // Geospatial Habitat Boundaries (Approximate coordinates or representative clusters)
  typicalElevationRangeFt: [number, number];
  primaryLocations: {
    name: string;
    coordinates: [number, number];     // [lon, lat]
    densityLevel: 'ABUNDANT' | 'FREQUENT' | 'LOCALIZED';
  }[];

  // Botanical Phenology (Seasons)
  activeGrowthSeason: string;          // e.g. "April - October"
  floweringHarvestWindow: string;     // Peak harvest timeline
  foragingEthicsAdvisory: string;

  // Science & Medicine
  phytochemistry: PhytochemicalProfile;
  naturopathy: NaturopathicBenefits;
  homeopathy: HomeopathicProfile;
}

// -----------------------------------------------------------------------------------------
// 1. COMPREHENSIVE BOTANICAL KNOWLEDGE BASE
// -----------------------------------------------------------------------------------------
export const CURATED_MEDICINAL_FLORA: FloraSpecies[] = [
  // --- TREES & EVERGREENS ---
  {
    id: 'tree-eastern-white-pine',
    commonName: 'Eastern White Pine',
    scientificName: 'Pinus strobus',
    family: 'Pinaceae',
    category: 'tree',
    nativeEcoregions: ['eastern_appalachian_hardwood', 'midwest_deciduous_woodland'],
    icon: '🌲',
    color: '#059669', // Emerald
    typicalElevationRangeFt: [100, 4800],
    primaryLocations: [
      { name: 'Adirondack Montane Forest, NY', coordinates: [-74.1500, 44.1800], densityLevel: 'ABUNDANT' },
      { name: 'Great Smoky Mountains National Park, TN/NC', coordinates: [-83.5100, 35.6100], densityLevel: 'ABUNDANT' },
      { name: 'Allegheny Hardwood Plateau, PA', coordinates: [-79.0200, 41.5200], densityLevel: 'ABUNDANT' },
      { name: 'Northwoods Conifer Forest, WI', coordinates: [-90.2000, 45.9000], densityLevel: 'FREQUENT' }
    ],
    activeGrowthSeason: 'Year-round evergreen (Needle flush May-June)',
    floweringHarvestWindow: 'Winter/Spring (Fresh green needle tips high in winter Vitamin C)',
    foragingEthicsAdvisory: 'Prune only low branch needle tips (bundles of 5); never harvest the terminal leader bud.',
    phytochemistry: {
      primaryClass: 'Terpenoids & Resins',
      keyCompounds: ['Shikimic Acid (Oseltamivir precursor)', 'Alpha-Pinene', 'Beta-Pinene', 'Ascorbic Acid (Vitamin C: 4-5x citrus)', 'Proanthocyanidins'],
      mechanismOfAction: 'Alpha-pinene crosses the blood-brain barrier to inhibit acetylcholinesterase, promoting mental clarity and bronchodilation. Shikimic acid acts as a natural neuraminidase inhibitor antagonist.',
      organAffinity: ['Respiratory', 'Immune', 'Cardiovascular']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Expectorant for deep chest congestion', 'Winter immune defense tea', 'Topical antimicrobial resin balm for splinters & cuts', 'Peripheral vascular tonic'],
      clinicalEvidenceGrade: 'B (Observational / Pharmacological Validated)',
      preparations: ['Cold/Hot Needle Water Infusion (Preserves Vitamin C)', 'Pine Resin Salve', 'Steam Inhalation'],
      contraindications: ['Avoid Ponderosa pine lookalike in pregnant livestock; White Pine is safe in moderate culinary/tea usage.']
    },
    homeopathy: {
      primaryRemedyName: 'Pinus sylvestris / Pinus strobus',
      keynoteIndication: 'Rheumatism and joint stiffness in children with weak ankles and scrofulous diathesis; chest weakness with copious mucus.',
      commonPotencies: ['6C', '30C', 'Mother Tincture (Q)'],
      constitutionalProfile: 'Individuals who feel fatigued, chilly, with weak bone development and chronic respiratory susceptibility.',
      modalityWarmthCold: 'Worse from cold damp weather; improved by warm dry pine forest air.'
    }
  },
  {
    id: 'tree-pacific-yew',
    commonName: 'Pacific Yew',
    scientificName: 'Taxus brevifolia',
    family: 'Taxaceae',
    category: 'tree',
    nativeEcoregions: ['pacific_temperate_rainforest', 'sierra_cascades_montane'],
    icon: '🌲',
    color: '#047857',
    typicalElevationRangeFt: [500, 7200],
    primaryLocations: [
      { name: 'Olympic National Forest Understory, WA', coordinates: [-123.8500, 47.8000], densityLevel: 'FREQUENT' },
      { name: 'Cascade Mountain Old-Growth, OR', coordinates: [-122.1800, 44.2500], densityLevel: 'FREQUENT' },
      { name: 'Northern California Trinity Alps, CA', coordinates: [-122.9500, 40.9800], densityLevel: 'LOCALIZED' }
    ],
    activeGrowthSeason: 'Year-round understory evergreen',
    floweringHarvestWindow: 'Late summer (Red fleshy arils; seeds inside are toxic)',
    foragingEthicsAdvisory: 'CRITICAL PROTECTED SPECIES: Bark harvesting prohibited. Foliage holds synthetic precursors without harming tree.',
    phytochemistry: {
      primaryClass: 'Terpenoids & Resins',
      keyCompounds: ['Paclitaxel (Taxol diterpene)', '10-Deacetylbaccatin III', 'Taxines (Toxic cardio-active alkaloids in needles/seeds)', 'Baccatin VI'],
      mechanismOfAction: 'Paclitaxel binds specifically to the beta-tubulin subunit, preventing microtubule disassembly during mitotic cell division and arresting cancer cell proliferation.',
      organAffinity: ['Immune', 'Cardiovascular']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Oncological pharmaceutical synthesis (Paclitaxel)', 'Under strict medical supervision in integrative oncology', 'Topical antimicrobial folklore extracts'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['Strict pharmaceutical extraction only. DO NOT consume raw foliage, needles, or crushed seeds due to taxine cardio-toxicity.'],
      contraindications: ['RAW PLANT IS FATALLY TOXIC TO HUMANS AND LIVESTOCK. Ingesting needles or seeds triggers rapid bradycardia and cardiac arrest.']
    },
    homeopathy: {
      primaryRemedyName: 'Taxus baccata / Taxus brevifolia',
      keynoteIndication: 'Pustular skin eruptions, gouty pains in small joints, chronic digestive dyspepsia with nocturnal empty aching in pit of stomach.',
      commonPotencies: ['30C', '200C (Potentized dilutions completely free of physical taxines)'],
      constitutionalProfile: 'Sluggish circulation, dark purplish extremities, chronic joint stiffness.',
      modalityWarmthCold: 'Worse during night rest; better with gentle daytime warmth.'
    }
  },
  {
    id: 'tree-willow-bark',
    commonName: 'White Willow & Black Willow',
    scientificName: 'Salix alba / Salix nigra',
    family: 'Salicaceae',
    category: 'tree',
    nativeEcoregions: ['eastern_appalachian_hardwood', 'midwest_deciduous_woodland', 'great_plains_prairie'],
    icon: '🌿',
    color: '#15803d',
    typicalElevationRangeFt: [50, 4500],
    primaryLocations: [
      { name: 'Mississippi River Riparian Corridors, MO/IL', coordinates: [-90.1800, 38.6200], densityLevel: 'ABUNDANT' },
      { name: 'Ohio River Basin Wetlands, OH/KY', coordinates: [-84.5100, 39.1000], densityLevel: 'ABUNDANT' },
      { name: 'Chesapeake Bay Watershed Tributaries, MD/VA', coordinates: [-76.4500, 38.9800], densityLevel: 'ABUNDANT' }
    ],
    activeGrowthSeason: 'April - November',
    floweringHarvestWindow: 'Early Spring (When sap rises and young 2-3 year branch bark slips easily)',
    foragingEthicsAdvisory: 'Harvest bark only from pruned side branches or coppiced shoots. NEVER ring the trunk.',
    phytochemistry: {
      primaryClass: 'Glycosides & Saponins',
      keyCompounds: ['Salicin (Prodrug to Salicylic Acid)', 'Tremulacin', 'Salicortin', 'Catechin Polyphenols', 'Gallic Acid'],
      mechanismOfAction: 'Intestinal flora hydrolyze salicin into saligenin, which the liver metabolizes into salicylic acid, selectively inhibiting COX-1 and COX-2 enzymes without caustic stomach lining erosion.',
      organAffinity: ['Musculoskeletal', 'Cardiovascular', 'Integumentary']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Natural pain relief for osteoarthritis & lower back pain', 'Antipyretic for lowering inflammatory fevers', 'Headache & tension migraine abatement', 'Anti-platelet aggregation'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['Decoction (Boiling inner bark 15-20 mins)', 'Standardized Salicin Tincture', 'Liquid Extract'],
      contraindications: ['Contraindicated in individuals with aspirin allergy, active bleeding disorders, and children with viral fevers (Reyes syndrome caution).']
    },
    homeopathy: {
      primaryRemedyName: 'Salix nigra',
      keynoteIndication: 'Genital excitability, nocturnal seminal emissions with hypochondria, nervous neuralgia and red swollen sub-acute rheumatism.',
      commonPotencies: ['3X', '6C', 'Mother Tincture (Q)'],
      constitutionalProfile: 'Nervous exhausted individuals with chronic spinal soreness and pelvic congestion.',
      modalityWarmthCold: 'Worse from prolonged dampness and sexual excess; better with gentle warmth and rest.'
    }
  },
  {
    id: 'tree-american-elderberry',
    commonName: 'American Elderberry',
    scientificName: 'Sambucus canadensis',
    family: 'Adoxaceae',
    category: 'tree',
    nativeEcoregions: ['eastern_appalachian_hardwood', 'midwest_deciduous_woodland', 'southeast_pine_savanna'],
    icon: '🍇',
    color: '#6b21a8', // Purple
    typicalElevationRangeFt: [50, 4200],
    primaryLocations: [
      { name: 'Ozark Mountain Riparian Banks, MO/AR', coordinates: [-92.4000, 36.8000], densityLevel: 'ABUNDANT' },
      { name: 'Shenandoah River Bottomlands, VA', coordinates: [-78.5000, 38.5000], densityLevel: 'ABUNDANT' },
      { name: 'Great Lakes Forest Edges, MI/WI', coordinates: [-85.5000, 44.5000], densityLevel: 'ABUNDANT' }
    ],
    activeGrowthSeason: 'May - October',
    floweringHarvestWindow: 'Flowers in June; ripe dark purple berries in August - September',
    foragingEthicsAdvisory: 'Leave 30% of berry clusters for migratory songbirds. Must cook berries to neutralize sambunigrin.',
    phytochemistry: {
      primaryClass: 'Polyphenols & Flavonoids',
      keyCompounds: ['Cyanidin-3-glucoside (Anthocyanin)', 'Quercetin', 'Rutin', 'Sambucin', 'Lectins (Heat-labile)'],
      mechanismOfAction: 'Anthocyanins neutralize viral hemagglutinin spikes, preventing Influenza A & B virions from penetrating host respiratory mucosal cell membranes.',
      organAffinity: ['Immune', 'Respiratory', 'Cardiovascular']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Shortening duration of upper respiratory viral infections', 'Broad-spectrum antiviral support', 'Cardiovascular capillary strength', 'Natural diaphoretic for fever release'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['Simmered Elderberry Syrup (with raw honey)', 'Elderflower Tea for fevers', 'Glycerite'],
      contraindications: ['Stems, leaves, and uncooked raw green berries contain cyanogenic glycosides (sambunigrin); always simmer berries before consumption.']
    },
    homeopathy: {
      primaryRemedyName: 'Sambucus nigra / Sambucus canadensis',
      keynoteIndication: 'Sudden nighttime suffocative suffocating coughs in infants with dry blocked noses (snuffles); profuse perspiration on waking.',
      commonPotencies: ['6C', '30C', '200C'],
      constitutionalProfile: 'Children or elders with sudden dry coryza, blocked nasal breathing while nursing or sleeping.',
      modalityWarmthCold: 'Worse around midnight, lying down with head low; better by wrapping up warm and sitting erect.'
    }
  },

  // --- WILD HERBS & ADAPTOGENS ---
  {
    id: 'herb-echinacea-purpurea',
    commonName: 'Purple Coneflower',
    scientificName: 'Echinacea purpurea / Echinacea angustifolia',
    family: 'Asteraceae',
    category: 'flower',
    nativeEcoregions: ['great_plains_prairie', 'midwest_deciduous_woodland'],
    icon: '🌸',
    color: '#d946ef', // Fuchsia
    typicalElevationRangeFt: [200, 5200],
    primaryLocations: [
      { name: 'Flint Hills Tallgrass Prairie, KS', coordinates: [-96.5000, 38.3000], densityLevel: 'ABUNDANT' },
      { name: 'Nebraska Sandhills Prairie Bluffs, NE', coordinates: [-100.8000, 41.8000], densityLevel: 'ABUNDANT' },
      { name: 'Illinois Blacksoil Prairie Restorations, IL', coordinates: [-89.2000, 40.1000], densityLevel: 'FREQUENT' }
    ],
    activeGrowthSeason: 'May - September',
    floweringHarvestWindow: 'Flowers in full bloom July; Roots harvested in autumn after first frost',
    foragingEthicsAdvisory: 'Wild populations are vulnerable. Forage only cultivated patches or harvest leaves/seeds instead of destroying taproots.',
    phytochemistry: {
      primaryClass: 'Polysaccharides & Beta-Glucans',
      keyCompounds: ['Alkamides (Isobutylamides causing tongue tingling)', 'Echinacoside', 'Cichoric Acid', 'Inulin Polysaccharides', 'Arabino-galactans'],
      mechanismOfAction: 'Alkamides bind to cannabinoid CB2 receptors on macrophages and T-cells, triggering phagocytosis, macrophage activation, and endogenous interferon production.',
      organAffinity: ['Immune', 'Integumentary', 'Respiratory']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Acute immune activation at onset of colds & flu', 'Lymphatic stagnation cleanser', 'Topical snakebite & venomous insect sting relief', 'Upper respiratory tract infection mitigation'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['Fresh Root/Flower Dual-Extract Tincture', 'Root Decoction', 'Infused Honey'],
      contraindications: ['Use caution in active autoimmune conditions (SLE, MS) during flare-ups due to immune stimulation.']
    },
    homeopathy: {
      primaryRemedyName: 'Echinacea angustifolia',
      keynoteIndication: 'Septic conditions, blood poisoning, foul-smelling ulcerations, snake bites, bites of venomous insects, low adynamic fever states.',
      commonPotencies: ['Mother Tincture (Q)', '3X', '6C'],
      constitutionalProfile: 'Exhausted, prostrated states where the blood seems poisoned, with drowsiness and offensive breath.',
      modalityWarmthCold: 'Worse after physical exertion and in cold dampness; better by lying still in rest.'
    }
  },
  {
    id: 'herb-st-johns-wort',
    commonName: 'St. John\'s Wort',
    scientificName: 'Hypericum perforatum',
    family: 'Hypericaceae',
    category: 'herb',
    nativeEcoregions: ['pacific_temperate_rainforest', 'sierra_cascades_montane', 'eastern_appalachian_hardwood'],
    icon: '🌼',
    color: '#eab308', // Amber yellow
    typicalElevationRangeFt: [200, 7500],
    primaryLocations: [
      { name: 'Willamette Valley & Klamath Basin Foothills, OR', coordinates: [-122.8000, 43.5000], densityLevel: 'ABUNDANT' },
      { name: 'Northern California Sierra Foothills, CA', coordinates: [-121.0000, 39.2000], densityLevel: 'ABUNDANT' },
      { name: 'Appalachian Sunny Ridges, NC/VA', coordinates: [-82.0000, 36.0000], densityLevel: 'FREQUENT' }
    ],
    activeGrowthSeason: 'May - August',
    floweringHarvestWindow: 'Midsummer Solstice (Late June - July when yellow petals crush ruby red)',
    foragingEthicsAdvisory: 'Abundant naturalized herb. Harvest top 3-4 inches of fresh flowering tops in direct midday sunlight.',
    phytochemistry: {
      primaryClass: 'Polyphenols & Flavonoids',
      keyCompounds: ['Hyperforin', 'Hypericin (Naphthodianthrone)', 'Pseudohypericin', 'Quercetin', 'Rutin'],
      mechanismOfAction: 'Hyperforin inhibits synaptic reuptake of serotonin, dopamine, norepinephrine, GABA, and L-glutamate via sodium channel modulation. Hypericin exhibits direct antiviral envelope inactivation.',
      organAffinity: ['Nervous', 'Integumentary', 'Immune']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Mild-to-moderate clinical depression & seasonal affective disorder (SAD)', 'Peripheral nerve trauma (sciatica, carpal tunnel, crushed fingertips)', 'Topical infused red oil for sunburns, shingles & neuralgia', 'Viral enveloped pathogens'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['Fresh Flower Cold-Pressed Olive Oil (turns deep ruby red)', 'Ethanolic Tincture', 'Standardized Extract'],
      contraindications: ['STRONG CYP3A4 INDUCER: Accelerates clearance of pharmaceuticals (oral contraceptives, statins, SSRIs, blood thinners). High doses cause photosensitivity.']
    },
    homeopathy: {
      primaryRemedyName: 'Hypericum perforatum',
      keynoteIndication: 'THE ARNICA OF NERVES: Punctured wounds, crushed fingers and toes, tailbone (coccyx) falls, excruciating sharp shooting pains traveling upward along nerves.',
      commonPotencies: ['30C', '200C', '1M'],
      constitutionalProfile: 'Patients suffering acute nerve lacerations, dental surgery pain, animal bites, and post-operative phantom limb pains.',
      modalityWarmthCold: 'Worse in cold damp air, touch, and motion; better by lying still with head back.'
    }
  },
  {
    id: 'flower-arnica-montana',
    commonName: 'Arnica / Mountain Tobacco',
    scientificName: 'Arnica montana / Arnica cordifolia',
    family: 'Asteraceae',
    category: 'flower',
    nativeEcoregions: ['intermountain_west_rockies', 'sierra_cascades_montane'],
    icon: '🌼',
    color: '#f59e0b',
    typicalElevationRangeFt: [3500, 10500],
    primaryLocations: [
      { name: 'Yellowstone & Grand Teton Alpine Meadows, WY', coordinates: [-110.5000, 44.4000], densityLevel: 'ABUNDANT' },
      { name: 'Colorado San Juan Mountains, CO', coordinates: [-107.8000, 37.8000], densityLevel: 'ABUNDANT' },
      { name: 'Glacier National Park Pass, MT', coordinates: [-113.7500, 48.7000], densityLevel: 'ABUNDANT' }
    ],
    activeGrowthSeason: 'June - September (Alpine summer)',
    floweringHarvestWindow: 'July - August (Full yellow floral opening)',
    foragingEthicsAdvisory: 'Fragile alpine tundra plant. Forage sustainably taking no more than 1 in 5 flower heads.',
    phytochemistry: {
      primaryClass: 'Terpenoids & Resins',
      keyCompounds: ['Helenalin (Sesquiterpene lactone)', '11-alpha,13-Dihydrohelenalin', 'Flavonoid Glycosides (Luteolin)', 'Thymol essential oils'],
      mechanismOfAction: 'Helenalin selectively inhibits the transcription factor NF-kappa-B, shutting down cytokine storm cascades, reducing vascular permeability, and accelerating hematoma / bruise reabsorption.',
      organAffinity: ['Musculoskeletal', 'Integumentary', 'Cardiovascular']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Topical treatment of blunt force trauma, contusions, and hematomas', 'Post-athletic muscle soreness (DOMS)', 'Sprains, joint strains & acute bursitis', 'Osteoarthritis of knee/hands'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['External Gel / Salve / Ointment', 'Infused Massage Oil', 'Do NOT apply to open bleeding wounds'],
      contraindications: ['TOPICAL ONLY IN HERBAL DOSES. Internal ingestion of raw arnica causes severe gastroenteritis, arrhythmia, and internal hemorrhage. Use homeopathic potencies for internal use.']
    },
    homeopathy: {
      primaryRemedyName: 'Arnica montana',
      keynoteIndication: 'THE #1 FIRST AID REMEDY: Blunt physical trauma, bruises, concussions, sore bruised sensation ("bed feels too hard"), says they are well when gravely injured.',
      commonPotencies: ['30C', '200C', '1M'],
      constitutionalProfile: 'Individuals recovering from severe accidents, physical shock, intense athletic exertion, childbirth, or emotional trauma.',
      modalityWarmthCold: 'Worse from touch, jarring motion, and damp cold; better by resting horizontally with head low.'
    }
  },
  {
    id: 'flower-california-poppy',
    commonName: 'California Poppy',
    scientificName: 'Eschscholzia californica',
    family: 'Papaveraceae',
    category: 'flower',
    nativeEcoregions: ['sonoran_mojave_desert', 'sierra_cascades_montane'],
    icon: '🧡',
    color: '#f97316', // Orange
    typicalElevationRangeFt: [50, 6500],
    primaryLocations: [
      { name: 'Antelope Valley Poppy Reserve, CA', coordinates: [-118.3900, 34.7300], densityLevel: 'ABUNDANT' },
      { name: 'Santa Ynez Valley Hillsides, CA', coordinates: [-120.0800, 34.6100], densityLevel: 'ABUNDANT' },
      { name: 'Sonoran Foothills & Superstition Mts, AZ', coordinates: [-111.4500, 33.4500], densityLevel: 'FREQUENT' }
    ],
    activeGrowthSeason: 'February - July',
    floweringHarvestWindow: 'Peak bloom in March - May',
    foragingEthicsAdvisory: 'State flower of California: strictly illegal to harvest on public highways/parks. Forage private land only.',
    phytochemistry: {
      primaryClass: 'Alkaloids',
      keyCompounds: ['Californidine', 'Eschscholtzine', 'Protopine', 'Allocryptopine', 'Chelirubine'],
      mechanismOfAction: 'Protopine and californidine act as positive allosteric modulators of GABA-A receptors and inhibit degradation of endogenous catecholamines, producing mild sedation without opiate addiction.',
      organAffinity: ['Nervous', 'Musculoskeletal']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Sleep latency reduction & non-habit-forming insomnia remedy', 'Nervous tension, pediatric agitation & ADHD soothing', 'Spasmodic toothaches & smooth muscle colic', 'Anxiety & stress heart palpitations'],
      clinicalEvidenceGrade: 'B (Observational / Pharmacological Validated)',
      preparations: ['Whole-Plant Ethanolic Tincture', 'Bedtime Infusion (with chamomile)', 'Liquid Glycerite'],
      contraindications: ['Non-narcotic and does not contain opium morphine; safe in moderate doses. Potentiates sedating pharmaceuticals.']
    },
    homeopathy: {
      primaryRemedyName: 'Eschscholzia californica',
      keynoteIndication: 'Harmless soporific for nervous restlessness, insomnia, torpor, and accelerated pulse due to excessive intellectual stress.',
      commonPotencies: ['Mother Tincture (Q)', '3X', '6C'],
      constitutionalProfile: 'Hyper-sensitive, mentally overworked individuals who lie awake with racing thoughts and nervous heart flutters.',
      modalityWarmthCold: 'Worse during night hours and high heat; better in cool shaded ventilation.'
    }
  },
  {
    id: 'shrub-creosote-bush',
    commonName: 'Creosote Bush / Chaparral / Gobernadora',
    scientificName: 'Larrea tridentata',
    family: 'Zygophyllaceae',
    category: 'shrub_succulent',
    nativeEcoregions: ['sonoran_mojave_desert'],
    icon: '🌿',
    color: '#84cc16', // Lime
    typicalElevationRangeFt: [0, 5000],
    primaryLocations: [
      { name: 'Joshua Tree & Mojave Desert Flats, CA', coordinates: [-115.9000, 34.1000], densityLevel: 'ABUNDANT' },
      { name: 'Sonoran Desert Saguaro National Park, AZ', coordinates: [-110.7000, 32.2500], densityLevel: 'ABUNDANT' },
      { name: 'Chihuahuan Desert Big Bend Basin, TX', coordinates: [-103.2000, 29.2500], densityLevel: 'ABUNDANT' }
    ],
    activeGrowthSeason: 'Year-round evergreen desert shrub (Emits famous rain scent after monsoons)',
    floweringHarvestWindow: 'Spring (March - May) and post-summer monsoon (September)',
    foragingEthicsAdvisory: 'One of Earth\'s oldest living organisms (King Clone ring is 11,000+ years old). Harvest outer leaf twigs gently.',
    phytochemistry: {
      primaryClass: 'Polyphenols & Flavonoids',
      keyCompounds: ['NDGA (Nordihydroguaiaretic Acid - Ultra-potent antioxidant)', 'Lignans', 'Flavonoid Resins', 'Volatile Terpenoids', 'Guaiaretic Acid'],
      mechanismOfAction: 'NDGA powerfully inhibits 5-lipoxygenase (5-LOX) and lipid peroxidation, extinguishing inflammatory leukotrienes and providing massive broad-spectrum antimicrobial resistance against fungal spores.',
      organAffinity: ['Integumentary', 'Respiratory', 'Immune']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Topical antifungal for athlete\'s foot, ringworm & Candida', 'Ancient desert salve for cuts, desert sores & burns', 'Respiratory steam inhalation for bronchial sinus congestion', 'Antioxidant cellular preservation'],
      clinicalEvidenceGrade: 'B (Observational / Pharmacological Validated)',
      preparations: ['External Chaparral Leaf Salve', 'Steam Inhalation of Leaf Twigs', 'Foot Soaks'],
      contraindications: ['AVOID HIGH-DOSE INTERNAL CONSUMPTION. Excessive internal use linked to rare idiosyncratic hepatotoxicity. Best used topically and as steam.']
    },
    homeopathy: {
      primaryRemedyName: 'Larrea tridentata / Chaparral',
      keynoteIndication: 'Chronic fungal dysbiosis, stubborn arthritic joint deposits, scaly dry eczema with intense itching aggravated by cold winds.',
      commonPotencies: ['6C', '30C'],
      constitutionalProfile: 'Individuals living in arid dry regions with hardened joint stiffness and slow detoxification pathways.',
      modalityWarmthCold: 'Worse from dry cold winds; better after warm desert rains and moist warmth.'
    }
  },

  // --- MEDICINAL FUNGI ---
  {
    id: 'fungi-turkey-tail',
    commonName: 'Turkey Tail Mushroom',
    scientificName: 'Trametes versicolor',
    family: 'Polyporaceae',
    category: 'fungi',
    nativeEcoregions: ['pacific_temperate_rainforest', 'eastern_appalachian_hardwood', 'midwest_deciduous_woodland'],
    icon: '🍄',
    color: '#a16207', // Brown
    typicalElevationRangeFt: [50, 8000],
    primaryLocations: [
      { name: 'Redwood National & State Parks, CA', coordinates: [-124.0000, 41.3000], densityLevel: 'ABUNDANT' },
      { name: 'Cascade Range Decaying Logs, WA/OR', coordinates: [-121.7500, 46.8500], densityLevel: 'ABUNDANT' },
      { name: 'Appalachian Moist Oak Woodlands, NC/VA', coordinates: [-81.5000, 36.5000], densityLevel: 'ABUNDANT' }
    ],
    activeGrowthSeason: 'Year-round on fallen hardwood logs',
    floweringHarvestWindow: 'Autumn - Winter (Fresh flexible brackets with bright concentric rings and clean white pores)',
    foragingEthicsAdvisory: 'Extremely abundant. Verify undersurface has fine white pores (not smooth like False Turkey Tail Stereum).',
    phytochemistry: {
      primaryClass: 'Polysaccharides & Beta-Glucans',
      keyCompounds: ['PSK (Polysaccharide Kurcha)', 'PSP (Polysaccharopeptide)', 'Beta-1,3/1,6-D-Glucans', 'Sterols', 'Phenolic Acids'],
      mechanismOfAction: 'Beta-glucans bind to dectin-1 and TLR-2 receptors on natural killer (NK) cells and cytotoxic T-cells, stimulating IL-2 cytokines and dramatically enhancing antitumor surveillance.',
      organAffinity: ['Immune', 'Digestive', 'Hepatic']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Integrative oncology adjunct (Approved pharmaceutical in Japan)', 'Restoration of healthy gut microbiome diversity', 'Chronic viral infection resilience (HPV, EBV)', 'Cellular longevity and immune modulation'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['Dual-Extraction (Simmered Hot Water Decoction + Ethanolic Maceration)', 'Powdered Mycelial Extract'],
      contraindications: ['Generally well tolerated. Safe with conventional therapies under oncological coordination.']
    },
    homeopathy: {
      primaryRemedyName: 'Polyporus versicolor',
      keynoteIndication: 'Profuse debility following protracted infections, deep cellular fatigue, chronic lymphatic swelling, poor nutrient assimilation.',
      commonPotencies: ['6C', '30C', 'Mother Tincture (Q)'],
      constitutionalProfile: 'Depleted, immunocompromised individuals with lingering post-viral exhaustion and pale tongue with thick white coating.',
      modalityWarmthCold: 'Worse from damp cold stagnation; better by gentle movement in fresh air and nutritious warm foods.'
    }
  },
  {
    id: 'herb-american-ginseng',
    commonName: 'American Ginseng',
    scientificName: 'Panax quinquefolius',
    family: 'Araliaceae',
    category: 'herb',
    nativeEcoregions: ['eastern_appalachian_hardwood', 'midwest_deciduous_woodland'],
    icon: '🌱',
    color: '#16a34a',
    typicalElevationRangeFt: [500, 4500],
    primaryLocations: [
      { name: 'Appalachian Deep Mountain Coves, WV/KY', coordinates: [-81.6000, 38.3000], densityLevel: 'LOCALIZED' },
      { name: 'Smoky Mountain Shaded Hardwoods, NC/TN', coordinates: [-83.6000, 35.7000], densityLevel: 'LOCALIZED' },
      { name: 'Wisconsin Driftless Shaded Forest, WI', coordinates: [-90.8000, 43.5000], densityLevel: 'FREQUENT' }
    ],
    activeGrowthSeason: 'May - October',
    floweringHarvestWindow: 'Late Autumn (September - November) when crimson seed berries ripen',
    foragingEthicsAdvisory: 'FEDERALLY REGULATED: Never harvest plants under 5 years old (must have at least 3 prongs). Plant seeds on site.',
    phytochemistry: {
      primaryClass: 'Glycosides & Saponins',
      keyCompounds: ['Ginsenoside Rb1 (Calming / Neuroprotective)', 'Ginsenoside Rg1', 'Quinquenosides', 'Polyacetylenes', 'Panaxynol'],
      mechanismOfAction: 'Modulates the hypothalamic-pituitary-adrenal (HPA) axis, damping cortisol spikes during stress, enhancing insulin sensitivity, and elevating brain acetylcholine levels for sharp cognition.',
      organAffinity: ['Nervous', 'Immune', 'Cardiovascular', 'Digestive']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Yin-tonifying adaptogen (Cooling, unlike warming Asian ginseng)', 'Adrenal exhaustion and chronic fatigue recovery', 'Blood sugar regulation & insulin sensitivity', 'Cognitive focus and memory preservation under pressure'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['Decoction of Aged Root Slices', 'Standardized Ginsenoside Extract', 'Chewed Dry Root'],
      contraindications: ['Monitor in patients taking anticoagulant warfarin or diabetic medication (may lower blood glucose).']
    },
    homeopathy: {
      primaryRemedyName: 'Ginseng quinquefolium',
      keynoteIndication: 'Paralytic weakness of extremities, dizziness with grey spots before eyes, extreme heaviness of lower limbs, sexual exhaustion.',
      commonPotencies: ['3X', '6C', '30C'],
      constitutionalProfile: 'Elderly or premature aging individuals with lumbar back weakness, chronic tiredness, and cold extremities.',
      modalityWarmthCold: 'Worse during cold weather and sitting; better by walking briskly in warm sun.'
    }
  }
];

// -----------------------------------------------------------------------------------------
// 2. VIEWPORT RESOLUTION & ECOREGION MATCHING
// -----------------------------------------------------------------------------------------
export class FloraNaturopathicEngine {
  /**
   * Evaluates the map viewport bounds and returns all native trees, flowers, herbs,
   * and medicinal plants growing in that geographical area, complete with health profiles.
   */
  public static getFloraForViewport(
    bounds: { west: number; south: number; east: number; north: number },
    zoom: number
  ): {
    species: FloraSpecies[];
    geoJson: GeoJSON.FeatureCollection<GeoJSON.Point>;
    detectedEcoregions: string[];
    summary: string;
  } {
    const { west, south, east, north } = bounds;
    const matchingSpeciesSet = new Set<FloraSpecies>();
    const features: GeoJSON.Feature<GeoJSON.Point>[] = [];

    // Determine overlapping ecoregions from bounds
    const centerLon = (west + east) / 2;
    const centerLat = (south + north) / 2;
    const ecoregions: string[] = [];

    if (centerLon < -119 && centerLat > 40) ecoregions.push('Pacific Temperate Rainforest');
    if (centerLon < -118 && centerLat >= 34 && centerLat <= 42) ecoregions.push('Sierra Nevada & Cascades Montane');
    if (centerLon >= -118 && centerLon <= -110 && centerLat >= 31 && centerLat <= 37) ecoregions.push('Sonoran & Mojave Deserts');
    if (centerLon >= -115 && centerLon <= -104 && centerLat >= 35 && centerLat <= 49) ecoregions.push('Rocky Mountains Alpine & Subalpine');
    if (centerLon > -104 && centerLon < -90) ecoregions.push('Great Plains & Tallgrass Prairies');
    if (centerLon >= -90 && centerLon < -78 && centerLat >= 36) ecoregions.push('Midwest & Great Lakes Deciduous Woodlands');
    if (centerLon >= -84 && centerLon <= -75 && centerLat >= 34 && centerLat <= 43) ecoregions.push('Appalachian Hardwood Forest');
    if (centerLat < 32 && centerLon > -90) ecoregions.push('Subtropical Coastal & Everglades Basin');

    if (ecoregions.length === 0) {
      ecoregions.push('North American Temperate Biosphere');
    }

    CURATED_MEDICINAL_FLORA.forEach(plant => {
      // Check each plant's verified primary locations
      plant.primaryLocations.forEach(loc => {
        const [lon, lat] = loc.coordinates;
        // Check if inside viewport bounding box (or within a generous buffer)
        const inViewport = (lon >= west - 1.5 && lon <= east + 1.5 && lat >= south - 1.5 && lat <= north + 1.5);

        if (inViewport) {
          matchingSpeciesSet.add(plant);

          features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lon, lat]
            },
            properties: {
              id: plant.id,
              name: plant.commonName,
              scientificName: plant.scientificName,
              family: plant.family,
              category: plant.category,
              categoryLabel: plant.category.toUpperCase(),
              icon: plant.icon,
              color: plant.color,
              densityLevel: loc.densityLevel,
              locationName: loc.name,
              primaryPhytochemicalClass: plant.phytochemistry.primaryClass,
              keyCompounds: plant.phytochemistry.keyCompounds.join(', '),
              mechanismOfAction: plant.phytochemistry.mechanismOfAction,
              organAffinity: plant.phytochemistry.organAffinity.join(', '),
              primaryTherapeuticUses: plant.naturopathy.primaryTherapeuticUses.join(' • '),
              clinicalEvidenceGrade: plant.naturopathy.clinicalEvidenceGrade,
              preparations: plant.naturopathy.preparations.join(', '),
              contraindications: plant.naturopathy.contraindications.join(' '),
              homeopathicRemedy: plant.homeopathy.primaryRemedyName,
              homeopathicKeynote: plant.homeopathy.keynoteIndication,
              homeopathicPotencies: plant.homeopathy.commonPotencies.join(', '),
              activeGrowthSeason: plant.activeGrowthSeason,
              floweringHarvestWindow: plant.floweringHarvestWindow,
              foragingEthicsAdvisory: plant.foragingEthicsAdvisory
            }
          });
        }
      });
    });

    const species = Array.from(matchingSpeciesSet);
    const summary = species.length > 0
      ? `Discovered ${species.length} native medicinal trees, herbs, and flowers in current viewport. Dominant biomes: ${ecoregions.join(', ')}.`
      : `Broad geographic survey mode. Zoom in to regional watersheds to inspect dense native botanical clusters.`;

    return {
      species,
      geoJson: {
        type: 'FeatureCollection',
        features
      },
      detectedEcoregions: ecoregions,
      summary
    };
  }
}
