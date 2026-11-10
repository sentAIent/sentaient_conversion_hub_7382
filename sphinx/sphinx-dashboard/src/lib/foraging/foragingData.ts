// foragingData.ts
// Deep Offline Wild Foraging & Mycology Database
// Complete with offline botanical illustrations, nutritional benefits, and critical toxic lookalike warnings

import { FloraSpecies, ToxicLookalike, EdibilityRating, SurvivalBenefits } from '../intelligence/floraNaturopathicEngine';

export interface ForagingSpecies extends FloraSpecies {
  imageUrl: string;
  edibility: EdibilityRating;
  survivalBenefits: SurvivalBenefits;
  toxicLookalikes: ToxicLookalike[];
  sporePrintColor?: string;
  stemCharacteristics?: string;
  capCharacteristics?: string;
}

// Offline high-clarity SVG botanical illustrations
const SVG_ICONS = {
  morel: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M45 90 L45 55 Q40 55 35 45 Q30 30 50 10 Q70 30 65 45 Q60 55 55 55 L55 90 Z' fill='%23d97706' stroke='%2378350f' stroke-width='3'/%3E%3Cpath d='M40 25 Q50 30 45 40 M55 25 Q45 35 55 45 M45 42 Q50 48 48 52' stroke='%23451a03' stroke-width='2' fill='none'/%3E%3C/svg%3E`,
  chanterelle: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M45 90 L45 50 Q30 45 20 30 Q50 35 80 30 Q70 45 55 50 L55 90 Z' fill='%23f59e0b' stroke='%23b45309' stroke-width='3'/%3E%3Cpath d='M25 35 L48 52 M75 35 L52 52 M35 38 L49 60 M65 38 L51 60' stroke='%23d97706' stroke-width='2'/%3E%3C/svg%3E`,
  wildCarrot: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M48 90 L52 90 L51 40 L49 40 Z' fill='%2316a34a' stroke='%2314532d' stroke-width='2'/%3E%3Ccircle cx='50' cy='25' r='20' fill='%23f8fafc' stroke='%23cbd5e1' stroke-width='2' stroke-dasharray='3 2'/%3E%3Ccircle cx='50' cy='25' r='3' fill='%23831843'/%3E%3Cpath d='M42 60 L30 50 M58 60 L70 50 M44 75 L32 68 M56 75 L68 68' stroke='%2315803d' stroke-width='2'/%3E%3C/svg%3E`,
  ramps: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M48 92 C48 85 45 75 42 60 C38 45 42 30 50 15 C58 30 62 45 58 60 C55 75 52 85 52 92 Z' fill='%2322c55e' stroke='%2315803d' stroke-width='2'/%3E%3Cpath d='M46 95 L54 95 L52 75 L48 75 Z' fill='%23be123c'/%3E%3C/svg%3E`,
  lionsMane: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cellipse cx='50' cy='40' rx='30' ry='22' fill='%23f8fafc' stroke='%23e2e8f0' stroke-width='2'/%3E%3Cpath d='M30 45 L28 75 M36 48 L35 80 M44 50 L43 85 M50 50 L50 88 M56 50 L57 85 M64 48 L65 80 M70 45 L72 75' stroke='%23e2e8f0' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E`,
  elderberry: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='40' cy='35' r='6' fill='%231e1b4b'/%3E%3Ccircle cx='52' cy='32' r='6' fill='%231e1b4b'/%3E%3Ccircle cx='62' cy='38' r='6' fill='%231e1b4b'/%3E%3Ccircle cx='45' cy='46' r='6' fill='%23312e81'/%3E%3Ccircle cx='58' cy='45' r='6' fill='%231e1b4b'/%3E%3Ccircle cx='50' cy='56' r='6' fill='%23312e81'/%3E%3Cpath d='M50 56 L50 90' stroke='%23854d0e' stroke-width='3'/%3E%3C/svg%3E`
};

export const DEEP_FORAGING_DATABASE: ForagingSpecies[] = [
  {
    id: 'fungi-yellow-morel',
    commonName: 'Yellow Morel',
    scientificName: 'Morchella esculenta',
    family: 'Morchellaceae',
    category: 'fungi',
    nativeEcoregions: ['midwest_deciduous_woodland', 'eastern_appalachian_hardwood', 'intermountain_west_rockies'],
    icon: '🍄',
    color: '#d97706',
    imageUrl: SVG_ICONS.morel,
    edibility: 'CHOICE_EDIBLE',
    typicalElevationRangeFt: [600, 7500],
    primaryLocations: [
      { name: 'Midwest Deciduous Apple Orchards & Dying Elms, IL/IA/MI', coordinates: [-89.3985, 40.6331], densityLevel: 'ABUNDANT' },
      { name: 'Appalachian Rich Hardwood Slopes, OH/WV', coordinates: [-81.5000, 38.5000], densityLevel: 'FREQUENT' },
      { name: 'Rocky Mountain Burn Scars & River Basins, CO/MT', coordinates: [-105.2705, 40.0150], densityLevel: 'ABUNDANT' }
    ],
    activeGrowthSeason: 'Spring (April - May) when soil temp exceeds 50°F (10°C)',
    floweringHarvestWindow: 'Peak 2-3 weeks following warm spring rains; often under dead elms, ash, and old apple trees',
    foragingEthicsAdvisory: 'Cut stem at ground level with a knife or pinch; never pull up mycelium. Carry in porous mesh sack to disperse spores.',
    sporePrintColor: 'Cream to yellow-ochre',
    stemCharacteristics: 'Hollow, whitish-tan stem continuous with the hollow cap cavity.',
    capCharacteristics: 'Distinct honeycomb-like ridges and deep pits fused completely to the stem at the base.',
    survivalBenefits: {
      nutritionalHighlights: [
        'High protein content (31% dry weight)',
        'Rich in natural Vitamin D2 (206 IU / 100g when sun-dried)',
        'High in dietary Iron (12.2mg / 100g - 68% DV)',
        'Potassium, Copper, Selenium, and Zinc',
        'Low calorie survival food: 31 kcal / 100g fresh'
      ],
      survivalUtility: [
        'Caloric and mineral replenishment during spring emergence',
        'Can be easily sun-dried or smoke-preserved for multi-year storage',
        'Boiled broth yields electrolyte-dense survival soup'
      ],
      caloriesPer100g: 31
    },
    toxicLookalikes: [
      {
        name: 'Deadly False Morel',
        scientificName: 'Gyromitra esculenta / infula',
        dangerLevel: 'DEADLY_FATAL',
        poisonToxin: 'Gyromitrin (metabolizes to Monomethylhydrazine / MMH rocket fuel toxin)',
        distinguishingMarkers: [
          'CRITICAL CROSS-SECTION TEST: Cut longitudinally in half. A True Morel is 100% HOLLOW from the tip of the cap down through the stem base. A False Morel is SOLID, FIBROUS, or filled with cottony white chambers.',
          'Cap Attachment: True Morel cap is fused seamlessly to the stem at the bottom. False Morel cap hangs loosely like a skirt attached only at the very top.',
          'Cap Surface: True Morel has honeycomb pits and structured ridges. False Morel has brain-like, squiggly, lobed, or folded convolutions without true pits.'
        ],
        warningAdvice: 'Gyromitrin causes severe vomiting, explosive diarrhea, liver necrosis, seizures, and death within 24-72 hours. Inhaling fumes while cooking is also toxic. DO NOT CONSUME.'
      },
      {
        name: 'Half-Free Morel (Verpa bohemica)',
        scientificName: 'Verpa bohemica',
        dangerLevel: 'GASTROINTESTINAL_IRRITANT',
        poisonToxin: 'Gyromitrin analogues and hemolytic toxins',
        distinguishingMarkers: [
          'Cap hangs free from the stalk like a bell or thimble, attached only at the apex.',
          'Stalk is filled with loose, cotton-like white fibers instead of being clean and hollow.'
        ],
        warningAdvice: 'Causes lack of muscular coordination, vomiting, and dizziness in sensitive individuals.'
      }
    ],
    phytochemistry: {
      primaryClass: 'Polysaccharides & Beta-Glucans',
      keyCompounds: ['Beta-1,3-Glucans', 'Ergosterol (Pro-Vitamin D2)', 'Phenolic Antioxidants', 'Shikimic Acid Precursors'],
      mechanismOfAction: 'Inhibits NF-kB inflammatory cascades, elevates systemic macrophage phagocytosis, and exhibits strong hepatoprotective properties.',
      organAffinity: ['Immune', 'Hepatic', 'Digestive']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Post-winter immune stimulation and metabolic reboot', 'Liver antioxidant support', 'Cellular protection against lipid peroxidation'],
      clinicalEvidenceGrade: 'B (Observational / Pharmacological Validated)',
      preparations: ['Thoroughly Sauteed in Butter/Oil (Never eat raw)', 'Dehydrated and reconstituted in warm broth'],
      contraindications: ['MUST ALWAYS BE THOROUGHLY COOKED. Raw morels contain heat-labile hemolysins that cause severe stomach cramping.']
    },
    homeopathy: {
      primaryRemedyName: 'Morchella esculenta',
      keynoteIndication: 'General spring sluggishness, liver engorgement, deep mineral craving.',
      commonPotencies: ['6C', '30C'],
      constitutionalProfile: 'Depleted individual seeking mineral-rich nourishment.',
      modalityWarmthCold: 'Better with warm nourishing cooked broths; worse from cold damp exposure.'
    }
  },
  {
    id: 'fungi-golden-chanterelle',
    commonName: 'Golden Chanterelle',
    scientificName: 'Cantharellus cibarius',
    family: 'Cantharellaceae',
    category: 'fungi',
    nativeEcoregions: ['pacific_temperate_rainforest', 'eastern_appalachian_hardwood', 'sierra_cascades_montane'],
    icon: '🍄',
    color: '#f59e0b',
    imageUrl: SVG_ICONS.chanterelle,
    edibility: 'CHOICE_EDIBLE',
    typicalElevationRangeFt: [100, 6000],
    primaryLocations: [
      { name: 'Pacific Northwest Douglas Fir & Hemlock Moss, WA/OR', coordinates: [-122.4000, 47.1000], densityLevel: 'ABUNDANT' },
      { name: 'Appalachian Hardwood Oak & Beech Coves, NC/TN', coordinates: [-83.5000, 35.6000], densityLevel: 'ABUNDANT' },
      { name: 'Great Lakes Mixed Hardwoods, WI/MI', coordinates: [-86.5000, 45.0000], densityLevel: 'FREQUENT' }
    ],
    activeGrowthSeason: 'Summer to Late Autumn (July - November)',
    floweringHarvestWindow: 'Thrives after heavy summer thunderstorms; symbiotic mycorrhizal associate of oaks, beech, and conifers',
    foragingEthicsAdvisory: 'Slice at base; never rake the forest floor as it damages delicate mycorrhizal root connections.',
    sporePrintColor: 'Pale yellow to creamy white',
    stemCharacteristics: 'Solid, firm, yellowish-white stem with solid white internal flesh.',
    capCharacteristics: 'Funnel or trumpet shaped with wavy margins. Smells distinctly fruity, like fresh apricots.',
    survivalBenefits: {
      nutritionalHighlights: [
        'Highest natural Vitamin D source of any mushroom (212 IU / 100g)',
        'Extremely high in Vitamin C (more than many vegetables)',
        'Vitamin A (Beta-carotene giving it golden color)',
        'High dietary fiber and copper',
        'Calories: 38 kcal / 100g'
      ],
      survivalUtility: [
        'Natural insect resistance (insects rarely infest chanterelles due to natural deterrents)',
        'Long shelf life fresh (up to 10 days in cool shade)',
        'Can be pickled or sauteed and frozen/dried for winter rations'
      ],
      caloriesPer100g: 38
    },
    toxicLookalikes: [
      {
        name: "Jack-o'-Lantern Mushroom",
        scientificName: 'Omphalotus illudens / olearius',
        dangerLevel: 'SEVERE_TOXIC',
        poisonToxin: 'Illudin S and Illudin M (cytotoxic sesquiterpenes)',
        distinguishingMarkers: [
          'GILL STRUCTURE: Chanterelles have BLUNT FALSE GILLS (forked, shallow ridges that look like melted veins running down the stem). Jack-o\'-Lanterns have SHARP, BLADE-LIKE TRUE GILLS that are easily separated.',
          'SUBSTRATE: Chanterelles grow DIRECTLY ON SOIL under live trees. Jack-o\'-Lanterns grow IN CLUSTERS DIRECTLY ON DECAYING WOOD or buried stumps.',
          'FLESH COLOR: Chanterelle flesh is SOLID WHITE or cream inside. Jack-o\'-Lantern flesh is SOLID ORANGE throughout.',
          'BIOLUMINESCENCE: Jack-o\'-Lantern gills glow faintly green in total darkness.'
        ],
        warningAdvice: 'Causes violent, protracted vomiting, bloody diarrhea, dehydration, and intense abdominal cramps within 30-120 minutes. Requires emergency fluid replacement.'
      },
      {
        name: 'False Chanterelle',
        scientificName: 'Hygrophoropsis aurantiaca',
        dangerLevel: 'GASTROINTESTINAL_IRRITANT',
        poisonToxin: 'Unknown gastrointestinal irritants',
        distinguishingMarkers: [
          'Gills are true, thin, close, and intensely orange, much brighter than the pale cap.',
          'Stem is often thin, dark at the base, and flexible, lacking the solid chunky apricot-scented flesh of true chanterelles.'
        ],
        warningAdvice: 'Causes digestive upset and nausea. Discard if uncertain.'
      }
    ],
    phytochemistry: {
      primaryClass: 'Polyphenols & Flavonoids',
      keyCompounds: ['Beta-Carotene', 'Canthaxanthin', 'Ergocalciferol (Vitamin D2)', 'Polysaccharides'],
      mechanismOfAction: 'Potent scavenger of singlet oxygen, enhances corneal rhodopsin regeneration, and modulates innate immunity.',
      organAffinity: ['Integumentary', 'Immune', 'Cardiovascular']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Anti-inflammatory nutrition', 'Seasonal affective resilience via high natural Vitamin D', 'Immune system tonification'],
      clinicalEvidenceGrade: 'B (Observational / Pharmacological Validated)',
      preparations: ['Dry Sauteed to release natural juices, then cooked in fat', 'Pickled in apple cider vinegar'],
      contraindications: ['Cook thoroughly. Rare individual sensitivities to wild chitin.']
    },
    homeopathy: {
      primaryRemedyName: 'Cantharellus',
      keynoteIndication: 'Visual fatigue, skin dryness, seasonal winter blues.',
      commonPotencies: ['6C', '12C'],
      constitutionalProfile: 'Individual feeling drained during short sunless days.',
      modalityWarmthCold: 'Better with rich warm savory meals and sunlight.'
    }
  },
  {
    id: 'herb-wild-carrot',
    commonName: "Wild Carrot / Queen Anne's Lace",
    scientificName: 'Daucus carota',
    family: 'Apiaceae',
    category: 'herb',
    nativeEcoregions: ['midwest_deciduous_woodland', 'great_plains_prairie', 'eastern_appalachian_hardwood'],
    icon: '🥕',
    color: '#16a34a',
    imageUrl: SVG_ICONS.wildCarrot,
    edibility: 'CHOICE_EDIBLE',
    typicalElevationRangeFt: [50, 6000],
    primaryLocations: [
      { name: 'Midwest Sunny Meadows & Roadside Fields, IL/IN/OH', coordinates: [-86.0000, 40.0000], densityLevel: 'ABUNDANT' },
      { name: 'Appalachian Valley Pastures, VA/PA', coordinates: [-78.0000, 40.0000], densityLevel: 'ABUNDANT' },
      { name: 'Great Plains Prairie Margins, KS/NE', coordinates: [-97.0000, 39.0000], densityLevel: 'ABUNDANT' }
    ],
    activeGrowthSeason: 'Biennial: Spring basal rosettes; Summer tall flowering umbels',
    floweringHarvestWindow: 'Harvest taproot in Autumn of first year or early Spring of second year before flowering stalk shoots up',
    foragingEthicsAdvisory: 'Extremely abundant naturalized wild ancestor of domestic carrots. Only harvest first-year rosettes for tender roots.',
    sporePrintColor: 'N/A (Angiosperm)',
    stemCharacteristics: 'HAIRY, SOLID green stem with fine grooves. NEVER smooth; NEVER purple-spotted.',
    capCharacteristics: 'Flat-topped white umbel with a distinctive solitary dark purple/crimson center flower floret.',
    survivalBenefits: {
      nutritionalHighlights: [
        'Carbohydrate and starch-dense survival taproot (41 kcal / 100g)',
        'Extremely rich in Provitamin A Beta-Carotene (8285 mcg / 100g)',
        'Vitamins B1, B2, B6, C, and E',
        'Rich in Potassium, Calcium, and Phosphorus'
      ],
      survivalUtility: [
        'Reliable staple carbohydrate source in winter and early spring',
        'Dried seeds contain carminative oils used for digestive distress and water purification',
        'Crushed leaves create emergency poultice for insect stings and minor cuts'
      ],
      caloriesPer100g: 41
    },
    toxicLookalikes: [
      {
        name: 'Deadly Poison Hemlock',
        scientificName: 'Conium maculatum',
        dangerLevel: 'DEADLY_FATAL',
        poisonToxin: 'Coniine and gamma-coniceine (neurotoxic piperidine alkaloids)',
        distinguishingMarkers: [
          'STEM TEST (CRITICAL): Queen Anne\'s Lace has a HAIRY green stem. Poison Hemlock has a COMPLETELY SMOOTH, HAIRLESS stem covered in BLOTCHY PURPLE SPOTS. Remember: "The Queen has hairy legs; Hemlock is spotted and bald."',
          'CENTRAL FLORET: Queen Anne\'s Lace almost always has ONE TINY DARK PURPLE/BLACK FLOWER in the dead center of the white umbrella. Hemlock NEVER has a center dark flower.',
          'ODOR: Crushed Queen Anne\'s Lace leaves and root smell SWEETLY OF CARROTS. Poison Hemlock smells foul, rank, musty, and mouse-like.',
          'STEM CORE: Hemlock stems are hollow; Queen Anne\'s lace stems are solid or pithy.'
        ],
        warningAdvice: 'DEADLIEST PLANT IN NORTH AMERICA. Coniine blocks neuromuscular junctions causing ascending muscular paralysis, asphyxiation, and death within 2-3 hours while patient remains fully conscious. Even 6-8 leaves can kill an adult. EMERGENCY 911 / MEDICAL RESCUE MANDATORY.'
      },
      {
        name: 'Spotted Water Hemlock',
        scientificName: 'Cicuta maculata',
        dangerLevel: 'DEADLY_FATAL',
        poisonToxin: 'Cicutoxin (violent central nervous system convulsant)',
        distinguishingMarkers: [
          'Grows strictly in wet marshes, ditches, and standing water.',
          'Root contains chambered air pockets that ooze a yellow, oily, highly lethal sap.',
          'Leaf veins terminate in the notches between leaf teeth, NOT at the tips.'
        ],
        warningAdvice: 'Lethal in micro-doses. Causes violent intractable seizures and death within 30 minutes.'
      }
    ],
    phytochemistry: {
      primaryClass: 'Polyphenols & Flavonoids',
      keyCompounds: ['Beta-Carotene', 'Luteolin', 'Falcarinol', 'Daucene', 'Essential Fatty Acids'],
      mechanismOfAction: 'Falcarinol exhibits potent natural antifungal and immunostimulant activity. Essential oil relaxes smooth muscle tissue in the urinary tract.',
      organAffinity: ['Integumentary', 'Digestive', 'Respiratory']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Wild survival nutrition & calorie source', 'Mild diuretic and kidney cleanse (Seed infusion)', 'Carminative for gas and colic'],
      clinicalEvidenceGrade: 'B (Observational / Pharmacological Validated)',
      preparations: ['Boiled or Roasted Taproot', 'Infusion of Wild Seeds', 'Fresh Leaf Poultice'],
      contraindications: ['ABSOLUTE ZERO HARVESTING UNLESS 100% CERTAIN OF DISTINCTION FROM POISON HEMLOCK. Do not use seeds during pregnancy (traditional emmenagogue).']
    },
    homeopathy: {
      primaryRemedyName: 'Daucus carota',
      keynoteIndication: 'Urinary gravel, dysuria, burning sensation, weak assimilation.',
      commonPotencies: ['3X', '6C'],
      constitutionalProfile: 'Individual with chronic digestive weakness and urinary tract sluggishness.',
      modalityWarmthCold: 'Better with warm herbal teas.'
    }
  },
  {
    id: 'herb-wild-ramps',
    commonName: 'Wild Ramps / Spring Leek',
    scientificName: 'Allium tricoccum',
    family: 'Amaryllidaceae',
    category: 'herb',
    nativeEcoregions: ['eastern_appalachian_hardwood', 'midwest_deciduous_woodland'],
    icon: '🧄',
    color: '#22c55e',
    imageUrl: SVG_ICONS.ramps,
    edibility: 'CHOICE_EDIBLE',
    typicalElevationRangeFt: [600, 5000],
    primaryLocations: [
      { name: 'Appalachian Rich Mountain Coves, WV/VA/NC', coordinates: [-80.5000, 37.8000], densityLevel: 'ABUNDANT' },
      { name: 'Great Smoky Mountains Shaded Deciduous Forests, TN/NC', coordinates: [-83.5000, 35.6500], densityLevel: 'ABUNDANT' },
      { name: 'Catskill & Adirondack Moist Slopes, NY', coordinates: [-74.2000, 42.1000], densityLevel: 'FREQUENT' }
    ],
    activeGrowthSeason: 'Very early Spring (March - May) before canopy leaves emerge',
    floweringHarvestWindow: 'Ephemeral spring delicacy: leaves emerge first; flowers appear after leaves die back in summer',
    foragingEthicsAdvisory: 'SUSTAINABLE HARVEST RULE: Cut only one leaf per cluster; leave bulbs and roots undisturbed in soil to prevent colony collapse.',
    sporePrintColor: 'N/A',
    stemCharacteristics: 'Burgundy-reddish blush at the base of the leaf stems leading to a small white underground bulb.',
    capCharacteristics: 'Broad, smooth, elliptical green leaves (2 to 3 per plant).',
    survivalBenefits: {
      nutritionalHighlights: [
        'Potent Vitamin C booster after winter (vital scurvy preventative)',
        'Rich in Allicin (natural broad-spectrum antimicrobial compound)',
        'High in Vitamin A, Iron, and Chromium',
        'Calories: 45 kcal / 100g'
      ],
      survivalUtility: [
        'Natural antibiotic and wound wash component via crushed raw bulbs',
        'Insect repelling skin rub due to sulfur allicin exudate',
        'Easily dehydrated and powdered for high-value survival seasoning'
      ],
      caloriesPer100g: 45
    },
    toxicLookalikes: [
      {
        name: 'Deadly Lily of the Valley',
        scientificName: 'Convallaria majalis',
        dangerLevel: 'DEADLY_FATAL',
        poisonToxin: 'Convallatoxin and cardiac glycosides (similar to Digoxin)',
        distinguishingMarkers: [
          'SMELL TEST (FOOLPROOF): Crushed Ramps leaves smell POWERFULLY OF GARLIC AND ONIONS. Lily of the Valley has ZERO ONION OR GARLIC SMELL (smells floral or grassy). Rule: If it doesn\'t smell like garlic, DO NOT EAT.',
          'Leaf Emergence: Lily of the Valley leaves wrap around a central flowering stem. Ramps leaves arise independently from the root with a distinct reddish/burgundy base.',
          'Flowers: Lily of the Valley has small white nodding bell-shaped flowers on a stem. Ramps flower much later in summer without leaves.'
        ],
        warningAdvice: 'Cardiac glycosides cause profound bradycardia, cardiac arrest, blurred vision, and fatal arrhythmias. Seek immediate emergency medical care.'
      },
      {
        name: 'Deadly Autumn Crocus',
        scientificName: 'Colchicum autumnale',
        dangerLevel: 'DEADLY_FATAL',
        poisonToxin: 'Colchicine (cellular mitosis inhibitor)',
        distinguishingMarkers: [
          'Leaves are thicker, stiffer, and completely lack any onion or garlic odor.',
          'Does not produce bulbs with scallion-like skin.'
        ],
        warningAdvice: 'Colchicine poisoning mimics arsenic: multisystem organ failure within 24-72 hours. Fatal in small quantities.'
      }
    ],
    phytochemistry: {
      primaryClass: 'Alkaloids',
      keyCompounds: ['Allicin (Diallyl thiosulfinate)', 'Ajoene', 'S-Allyl-cysteine', 'Flavonoid Kaempferol', 'Fructans'],
      mechanismOfAction: 'Allicin irreversibly binds sulfhydryl groups in bacterial enzymes, disrupting bacterial cell membranes and reducing arterial plaque formation.',
      organAffinity: ['Cardiovascular', 'Immune', 'Digestive']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Spring cardiovascular and arterial cleanse', 'Antimicrobial respiratory support', 'Blood pressure and cholesterol balance'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['Raw chopped leaves in salads', 'Sauteed bulbs and greens', 'Pickled in brine'],
      contraindications: ['High quantities may thin blood; use caution if taking anticoagulant pharmaceutical agents.']
    },
    homeopathy: {
      primaryRemedyName: 'Allium cepa / sativum',
      keynoteIndication: 'Acrid nasal discharge, lachrymation, catarrhal spring colds.',
      commonPotencies: ['6C', '30C'],
      constitutionalProfile: 'Congested individual during spring seasonal weather transitions.',
      modalityWarmthCold: 'Worse in warm rooms; better in open cool fresh air.'
    }
  },
  {
    id: 'fungi-lions-mane',
    commonName: "Lion's Mane Mushroom",
    scientificName: 'Hericium erinaceus',
    family: 'Hericiaceae',
    category: 'fungi',
    nativeEcoregions: ['eastern_appalachian_hardwood', 'midwest_deciduous_woodland', 'pacific_temperate_rainforest'],
    icon: '🦁',
    color: '#e2e8f0',
    imageUrl: SVG_ICONS.lionsMane,
    edibility: 'CHOICE_EDIBLE',
    typicalElevationRangeFt: [200, 5500],
    primaryLocations: [
      { name: 'Appalachian Old-Growth Hardwood Trees, NC/VA', coordinates: [-82.0000, 36.0000], densityLevel: 'FREQUENT' },
      { name: 'Ozark Plateau Decaying Oak Stems, MO/AR', coordinates: [-92.5000, 37.0000], densityLevel: 'LOCALIZED' },
      { name: 'Pacific Northwest Mixed Woods, WA', coordinates: [-121.5000, 47.5000], densityLevel: 'LOCALIZED' }
    ],
    activeGrowthSeason: 'Late Summer to Late Autumn (August - November)',
    floweringHarvestWindow: 'Found high on wounds or decaying wood of living or recently fallen oaks, beech, and maples',
    foragingEthicsAdvisory: 'Cut gently from bark. Note tree location as Lion\'s Mane often fruits in the exact same spot annually.',
    sporePrintColor: 'White',
    stemCharacteristics: 'Rudimentary or absent; fruiting body attaches directly to tree bark.',
    capCharacteristics: 'Globose cluster of cascading white to cream icicle-like spines (1-6 cm long).',
    survivalBenefits: {
      nutritionalHighlights: [
        'Remarkable neuroprotective compounds (Hericenones & Erinacines)',
        'Stimulates Nerve Growth Factor (NGF) synthesis in brain neurons',
        'High in Beta-Glucans and prebiotic dietary fiber',
        'Contains 20% protein by dry weight',
        'Calories: 35 kcal / 100g'
      ],
      survivalUtility: [
        'Maintains high cognitive focus, executive function, and memory in high-stress tactical environments',
        'Tastes remarkably like lobster/crab when pan-seared with butter',
        'Can be dried and powdered into survival cognitive teas'
      ],
      caloriesPer100g: 35
    },
    toxicLookalikes: [
      {
        name: 'Comb Tooth / Bear\'s Head (Hericium coralloides)',
        scientificName: 'Hericium coralloides / americanum',
        dangerLevel: 'GASTROINTESTINAL_IRRITANT',
        poisonToxin: 'None (Edible Lookalike)',
        distinguishingMarkers: [
          'Hericium coralloides has branching coral-like structures rather than a solid mass of downward-hanging icicles.',
          'SAFE LOOKALIKE: All North American Hericium species with white spines are EDIBLE and safe. No deadly lookalikes exist for this distinct genus.'
        ],
        warningAdvice: 'Safe edible cousin. Avoid only if discolored yellow/brown or decaying, which causes bacterial digestive upset.'
      }
    ],
    phytochemistry: {
      primaryClass: 'Polysaccharides & Beta-Glucans',
      keyCompounds: ['Hericenones A-H', 'Erinacines A-K', 'Beta-1,3-D-Glucan', 'Ergosterol', 'Dilinoleoyl-phosphatidylethanolamine'],
      mechanismOfAction: 'Low molecular weight erinacines cross the blood-brain barrier to trigger hippocampal NGF production, accelerating myelin sheath repair and synaptic plasticity.',
      organAffinity: ['Nervous', 'Digestive', 'Immune']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Cognitive enhancement, mental acuity, and focus under duress', 'Peripheral neuropathy and nerve healing', 'Gastric mucosal protection and gut barrier restoration'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['Pan-seared fresh fruiting body', 'Dual-Extracted Tincture', 'Fine Powdered Tea'],
      contraindications: ['Generally safe. Mild itching reported very rarely from elevated NGF levels.']
    },
    homeopathy: {
      primaryRemedyName: 'Hericium erinaceus',
      keynoteIndication: 'Brain fog, memory lapses, peripheral numbness, nerve tingling.',
      commonPotencies: ['6C', '30C'],
      constitutionalProfile: 'Mentally overworked individual with sensory exhaustion.',
      modalityWarmthCold: 'Better with mental quiet, rest, and nourishing warm food.'
    }
  },
  {
    id: 'shrub-black-elderberry',
    commonName: 'American Black Elderberry',
    scientificName: 'Sambucus canadensis',
    family: 'Adoxaceae',
    category: 'shrub_succulent',
    nativeEcoregions: ['eastern_appalachian_hardwood', 'midwest_deciduous_woodland', 'subtropical_gulf_coastal'],
    icon: '🫐',
    color: '#312e81',
    imageUrl: SVG_ICONS.elderberry,
    edibility: 'EDIBLE_WITH_PREPARATION',
    typicalElevationRangeFt: [50, 4500],
    primaryLocations: [
      { name: 'Appalachian Moist Stream Valleys, NC/VA', coordinates: [-81.0000, 36.5000], densityLevel: 'ABUNDANT' },
      { name: 'Midwest River Basins & Field Margins, IN/IL/MO', coordinates: [-89.0000, 39.0000], densityLevel: 'ABUNDANT' },
      { name: 'Gulf Coastal Woodlands, AL/GA/FL', coordinates: [-84.5000, 31.0000], densityLevel: 'ABUNDANT' }
    ],
    activeGrowthSeason: 'Spring leaf and flower flush; late summer berry maturation',
    floweringHarvestWindow: 'White floral umbels in June; dark purple-black berry clusters in August - September',
    foragingEthicsAdvisory: 'Snip whole umbrella clusters with pruning shears. NEVER eat raw green berries, bark, or leaves.',
    sporePrintColor: 'N/A',
    stemCharacteristics: 'Woody shrub with warty gray bark and soft white spongy internal pith.',
    capCharacteristics: 'Flat-topped clusters (cymes) of deep purple-black droop berries (not red).',
    survivalBenefits: {
      nutritionalHighlights: [
        'Extremely high in Vitamin C (36mg / 100g - 60% DV)',
        'Powerful antiviral anthocyanins (Cyanidin-3-glucoside)',
        'Rich in Vitamin A, Potassium, and Iron',
        'Calories: 73 kcal / 100g'
      ],
      survivalUtility: [
        'Gold standard antiviral survival medicine (inhibits viral cell entry in influenza)',
        'Woody stems with spongy pith can be hollowed out into emergency tap spouts, bellows, or tinder carriers',
        'Dark juice yields permanent natural purple-black dye and writing ink'
      ],
      caloriesPer100g: 73
    },
    toxicLookalikes: [
      {
        name: 'American Pokeweed',
        scientificName: 'Phytolacca americana',
        dangerLevel: 'SEVERE_TOXIC',
        poisonToxin: 'Phytolaccine and phytolaccatoxin (mitogenic saponins and alkaloids)',
        distinguishingMarkers: [
          'STEM: Pokeweed has bright PINK, MAGENTA, or PURPLE smooth succulent stems. Elderberry has woody, gray, warty bark.',
          'CLUSTER SHAPE: Pokeweed berries hang in long, cylindrical, drooping GRAPE-LIKE RACEMES. Elderberry fruits hang in broad, flat-topped umbrella-like clusters (cymes).',
          'BERRY STRUCTURE: Pokeweed berries have deep grooves and indentations on the bottom like tiny green/purple pumpkins. Elderberry is smooth and spherical.'
        ],
        warningAdvice: 'Raw pokeweed berries cause violent gastrointestinal distress, burning of the throat, spasms, and hypotension. Potentially lethal to children and pets.'
      },
      {
        name: 'Water Hemlock (Cicuta maculata)',
        scientificName: 'Cicuta maculata',
        dangerLevel: 'DEADLY_FATAL',
        poisonToxin: 'Cicutoxin (violent CNS neurotoxin)',
        distinguishingMarkers: [
          'Flowers resemble white elderberry blossoms, but foliage is distinctly carrot-like and grows in standing water.',
          'Does not produce hanging dark purple berry cymes.'
        ],
        warningAdvice: 'Fatal upon ingestion within 15-30 minutes.'
      }
    ],
    phytochemistry: {
      primaryClass: 'Polyphenols & Flavonoids',
      keyCompounds: ['Cyanidin-3-glucoside', 'Cyanidin-3-sambubioside', 'Quercetin', 'Rutin', 'Chlorogenic Acid'],
      mechanismOfAction: 'Anthocyanins bind directly to influenza viral hemagglutinin spikes, preventing the virus from penetrating and infecting host epithelial cells.',
      organAffinity: ['Immune', 'Respiratory', 'Cardiovascular']
    },
    naturopathy: {
      primaryTherapeuticUses: ['Clinically proven acute influenza and viral upper respiratory reduction', 'Fever mitigation and natural diaphoretic', 'Systemic vascular antioxidant support'],
      clinicalEvidenceGrade: 'A (Double-Blind Clinical Trials)',
      preparations: ['Boiled Elderberry Syrup with Raw Honey', 'Simmered Berry Decoction', 'Infusion of dried berries'],
      contraindications: ['NEVER CONSUME RAW BERRIES, ROOTS, OR BARK. Raw elderberries contain sambunigrin (a cyanogenic glycoside) causing nausea. Cooking destroys sambunigrin completely.']
    },
    homeopathy: {
      primaryRemedyName: 'Sambucus nigra',
      keynoteIndication: 'Sudden suffocative cough at midnight, blocked infant nose, copious perspiration.',
      commonPotencies: ['6C', '30C', '200C'],
      constitutionalProfile: 'Person waking up gasping for air from dry spasmodic croup.',
      modalityWarmthCold: 'Worse from dry cold air and midnight; better wrapped up warmly.'
    }
  }
];
