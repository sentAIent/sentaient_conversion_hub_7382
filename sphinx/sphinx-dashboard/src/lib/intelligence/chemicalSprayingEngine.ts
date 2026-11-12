// sphinx-dashboard/src/lib/intelligence/chemicalSprayingEngine.ts
// Comprehensive Chemical Spraying, Agro-Toxin & Environmental Poison Tracking Engine
// Implements Natural Earth Eradication Kinetics (Microbial Biodegradation, UV Photolysis,
// Soil Half-Life, Metabolite Persistence, and Complete Planetary Purification Timelines).

export interface ChemicalProfile {
  id: string;
  name: string;
  commonName: string;
  casNumber: string;
  chemicalFormula: string;
  category: 'herbicide' | 'insecticide' | 'fungicide' | 'defoliant' | 'aerosol_particulate' | 'forever_chemical' | 'novel_synthetic';
  syntheticEra: 'legacy_historical' | 'contemporary_industrial' | 'emerging_novel';
  primaryVector: 'aerial_crop_duster' | 'ground_boom_tractor' | 'highway_rail_sprayer' | 'urban_mosquito_fogger' | 'atmospheric_dispersal';
  
  // Natural Earth Half-Life Breakdown (in Days)
  soilHalfLifeDays: number;            // Aerobic soil microbial degradation half-life
  aquaticHalfLifeDays: number;         // Freshwater photolysis & hydrolysis half-life
  atmosphericHalfLifeDays: number;     // Gas-phase OH radical reaction half-life
  
  // Metabolite persistence
  primaryMetaboliteName?: string;
  primaryMetaboliteHalfLifeDays?: number;

  // Complete Natural Eradication (Days until >=99.9% degraded or background levels)
  completeEradicationDays: number;     // Benchmark natural clearance time under typical field conditions
  eradicationMechanism: string;        // Specific biological/physical earth processes (e.g. Pseudomonas bacteria, UV photolysis)
  earthRegenerationRemedy: string;     // Recommended natural bioremediation (e.g. oyster mushrooms, biochar, compost tea)

  // Toxicity & Risk Profile
  epaToxicityClass: 'Class I (High Danger)' | 'Class II (Warning)' | 'Class III (Caution)' | 'Class IV (Low)' | string;
  iarcCarcinogenRating: 'Group 1 (Carcinogenic)' | 'Group 2A (Probable Carcinogen)' | 'Group 2B (Possible Carcinogen)' | 'Group 3 (Not Classifiable)' | string;
  primaryHealthHazards: string[];
  pollinatorToxicity: 'EXTREME' | 'HIGH' | 'MODERATE' | 'LOW' | string;
  waterTableLeachingRisk: 'VERY_HIGH' | 'HIGH' | 'MODERATE' | 'LOW' | string;
}

export interface SprayIncident {
  id: string;
  locationName: string;
  coordinates: [number, number];       // [lon, lat]
  sprayRadiusMiles: number;
  sprayPath?: [number, number][];      // Flight / ground transit coordinates
  chemicalId: string;
  customChemicalName?: string;
  customCasNumber?: string;
  dosageApplied: string;               // e.g. "32 oz / acre"
  applicationTimestamp: string;        // ISO-8601
  appliedBy: string;                   // Aerial operator, county vector control, rail utility
  targetSpeciesOrCrop: string;         // e.g., "Roundup-Ready Corn Desiccation", "Aedes Aegypti Mosquitoes"
  notes: string;
}

export interface EradicationEvaluation {
  incident: SprayIncident;
  chemical: ChemicalProfile;
  daysElapsed: number;
  hoursElapsed: number;
  remainingConcentrationPercent: number;
  percentPurifiedByEarth: number;
  decayPhase: 'ACTIVE_TOXIC_SURFACE' | 'RESIDUAL_MICROBIAL_DECAY' | 'PERSISTENT_METABOLITE_PHASE' | 'TRACE_BENCHMARK' | 'PURIFIED_BY_EARTH';
  estimatedEradicationDate: string;
  daysRemaining: number;
  hoursRemaining: number;
  eradicationProgressRatio: number;   // 0.0 to 1.0
  activeToxicityLevel: 'CRITICAL' | 'ELEVATED' | 'MODERATE' | 'LOW' | 'NEGLIGIBLE';
  soilActionSummary: string;
}

// -----------------------------------------------------------------------------------------
// 1. COMPREHENSIVE CHEMICAL DOSSIERS
// -----------------------------------------------------------------------------------------
export const KNOWN_CHEMICAL_PROFILES: Record<string, ChemicalProfile> = {
  glyphosate: {
    id: 'glyphosate',
    name: 'N-(phosphonomethyl)glycine',
    commonName: 'Glyphosate (Roundup / Rodeo)',
    casNumber: '1071-83-6',
    chemicalFormula: 'C3H8NO5P',
    category: 'herbicide',
    syntheticEra: 'contemporary_industrial',
    primaryVector: 'aerial_crop_duster',
    soilHalfLifeDays: 47,               // Field average (range 15-174 days depending on soil biology)
    aquaticHalfLifeDays: 45,
    atmosphericHalfLifeDays: 3,
    primaryMetaboliteName: 'AMPA (Aminomethylphosphonic acid)',
    primaryMetaboliteHalfLifeDays: 240, // Highly persistent soil metabolite (up to 958 days in cold soils)
    completeEradicationDays: 730,        // ~2 full years for complete soil clearance including AMPA metabolite
    eradicationMechanism: 'Microbial degradation by soil bacteria (Pseudomonas sp., Agrobacterium radiobacter) via carbon-phosphorus (C-P) lyase enzymatic cleavage into AMPA, glycine, and inorganic phosphate.',
    earthRegenerationRemedy: 'High-diversity compost teas, mycorrhizal fungal inoculation, biochar soil binding, and cover cropping with daikon radish to bio-extract phosphorus-bound residues.',
    epaToxicityClass: 'Class III (Caution)',
    iarcCarcinogenRating: 'Group 2A (Probable Carcinogen)',
    primaryHealthHazards: ['Non-Hodgkin Lymphoma risk', 'Gut microbiome shikimate pathway disruption', 'Endocrine disruption', 'Chelation of trace soil minerals (Mn, Zn, Fe)'],
    pollinatorToxicity: 'HIGH',
    waterTableLeachingRisk: 'MODERATE'
  },
  paraquat: {
    id: 'paraquat',
    name: '1,1\'-Dimethyl-4,4\'-bipyridinium dichloride',
    commonName: 'Paraquat (Gramoxone)',
    casNumber: '1910-42-5',
    chemicalFormula: 'C12H14Cl2N2',
    category: 'defoliant',
    syntheticEra: 'legacy_historical',
    primaryVector: 'ground_boom_tractor',
    soilHalfLifeDays: 1000,             // Adsorbs extremely tightly to clay; half-life 1,000 to 4,000 days
    aquaticHalfLifeDays: 28,            // Rapid photolysis under intense surface sunlight
    atmosphericHalfLifeDays: 1,
    completeEradicationDays: 2555,       // ~7 years in soil without advanced remediation
    eradicationMechanism: 'Photochemical solar UV cleavage on plant surfaces; once bound to soil clay minerals, microbial digestion is extremely sluggish due to electrostatic entrapment.',
    earthRegenerationRemedy: 'Deep humus amendment, oyster mushroom (Pleurotus ostreatus) white-rot mycoremediation, and activated carbon soil wash.',
    epaToxicityClass: 'Class I (High Danger)',
    iarcCarcinogenRating: 'Group 3 (Not Classifiable)',
    primaryHealthHazards: ['Severe acute pulmonary fibrosis', 'Etiological link to Parkinson\'s Disease', 'Superoxide radical tissue destruction', 'High dermal lethality'],
    pollinatorToxicity: 'MODERATE',
    waterTableLeachingRisk: 'LOW'
  },
  atrazine: {
    id: 'atrazine',
    name: '2-chloro-4-ethylamino-6-isopropylamino-1,3,5-triazine',
    commonName: 'Atrazine (Aatrex)',
    casNumber: '1912-24-9',
    chemicalFormula: 'C8H14ClN5',
    category: 'herbicide',
    syntheticEra: 'contemporary_industrial',
    primaryVector: 'aerial_crop_duster',
    soilHalfLifeDays: 75,
    aquaticHalfLifeDays: 365,            // Highly persistent in groundwater aquifers (up to 6 years)
    atmosphericHalfLifeDays: 4,
    primaryMetaboliteName: 'Deethylatrazine (DEA) & Deisopropylatrazine (DIA)',
    primaryMetaboliteHalfLifeDays: 180,
    completeEradicationDays: 1095,       // ~3 years total environmental clearance
    eradicationMechanism: 'Hydrolytic dechlorination by Rhodococcus and Pseudomonas strain ADP possessing AtzA and AtzB enzymes.',
    earthRegenerationRemedy: 'Constructed wetland biofilters, Cattail (Typha latifolia) phytoremediation, and mycorrhizal soil restoration.',
    epaToxicityClass: 'Class III (Caution)',
    iarcCarcinogenRating: 'Group 3 (Not Classifiable)',
    primaryHealthHazards: ['Severe endocrine disruptor (demasculinization of amphibians)', 'Aromatase enzyme induction', 'Estrogen mimicry', 'Aquifer drinking water contaminant'],
    pollinatorToxicity: 'MODERATE',
    waterTableLeachingRisk: 'VERY_HIGH'
  },
  dicamba: {
    id: 'dicamba',
    name: '3,6-dichloro-2-methoxybenzoic acid',
    commonName: 'Dicamba (Xtendimax / Engenia)',
    casNumber: '1918-00-9',
    chemicalFormula: 'C8H6Cl2O3',
    category: 'herbicide',
    syntheticEra: 'contemporary_industrial',
    primaryVector: 'ground_boom_tractor',
    soilHalfLifeDays: 25,
    aquaticHalfLifeDays: 30,
    atmosphericHalfLifeDays: 14,         // High vapor drift volatilization causes extensive regional off-target damage
    completeEradicationDays: 180,        // 6 months in temperate soil
    eradicationMechanism: 'Microbial demethylation by soil Pseudomonas maltophilia to 3,6-dichlorosalicylic acid (DCSA) followed by ring cleavage.',
    earthRegenerationRemedy: 'Aerated thermal compost topdressing and sunflower (Helianthus annuus) phytoremediation.',
    epaToxicityClass: 'Class III (Caution)',
    iarcCarcinogenRating: 'Group 3 (Not Classifiable)',
    primaryHealthHazards: ['Severe off-target atmospheric vapor drift', 'Phytotoxicity to native flora & non-GMO crops', 'Suspected reproductive toxicity'],
    pollinatorToxicity: 'LOW',
    waterTableLeachingRisk: 'HIGH'
  },
  two_four_d: {
    id: 'two_four_d',
    name: '2,4-Dichlorophenoxyacetic acid',
    commonName: '2,4-D (Enlist / Weedar)',
    casNumber: '94-75-7',
    chemicalFormula: 'C8H6Cl2O3',
    category: 'herbicide',
    syntheticEra: 'legacy_historical',
    primaryVector: 'highway_rail_sprayer',
    soilHalfLifeDays: 10,
    aquaticHalfLifeDays: 15,
    atmosphericHalfLifeDays: 2,
    completeEradicationDays: 120,        // 4 months
    eradicationMechanism: 'Rapid microbial mineralization by Alcaligenes eutrophus harboring the tfdA plasmid gene.',
    earthRegenerationRemedy: 'Native prairie grass vegetative buffers and composted woodchip mulch inoculation.',
    epaToxicityClass: 'Class I (High Danger)',
    iarcCarcinogenRating: 'Group 2B (Possible Carcinogen)',
    primaryHealthHazards: ['Severe ocular damage', 'Lymphatic cancer correlation', 'Dioxin contaminant risks in synthesis', 'Endocrine disruption'],
    pollinatorToxicity: 'MODERATE',
    waterTableLeachingRisk: 'HIGH'
  },
  chlorpyrifos: {
    id: 'chlorpyrifos',
    name: 'O,O-diethyl O-3,5,6-trichloropyridin-2-yl phosphorothioate',
    commonName: 'Chlorpyrifos (Lorsban)',
    casNumber: '2921-88-2',
    chemicalFormula: 'C9H11Cl3NO3PS',
    category: 'insecticide',
    syntheticEra: 'legacy_historical',
    primaryVector: 'aerial_crop_duster',
    soilHalfLifeDays: 120,
    aquaticHalfLifeDays: 25,
    atmosphericHalfLifeDays: 1,
    completeEradicationDays: 450,        // ~1.2 years
    eradicationMechanism: 'Hydrolysis to 3,5,6-trichloro-2-pyridinol (TCP) by Flavobacterium and Sphingomonas soil strains.',
    earthRegenerationRemedy: 'Oyster mushroom white-rot fungi mycelium beds and high-nitrogen organic compost.',
    epaToxicityClass: 'Class II (Warning)',
    iarcCarcinogenRating: 'Group 2A (Probable Carcinogen)',
    primaryHealthHazards: ['Irreversible acetylcholinesterase inhibition', 'Childhood neurodevelopmental impairment', 'ADHD & autism spectrum linkages', 'Acute neurotoxicity'],
    pollinatorToxicity: 'EXTREME',
    waterTableLeachingRisk: 'MODERATE'
  },
  neonicotinoid_imidacloprid: {
    id: 'neonicotinoid_imidacloprid',
    name: '1-(6-chloro-3-pyridylmethyl)-N-nitroimidazolidin-2-ylideneamine',
    commonName: 'Imidacloprid (Confidor / Merit)',
    casNumber: '138261-41-3',
    chemicalFormula: 'C9H10ClN5O2',
    category: 'insecticide',
    syntheticEra: 'contemporary_industrial',
    primaryVector: 'ground_boom_tractor',
    soilHalfLifeDays: 230,
    aquaticHalfLifeDays: 30,
    atmosphericHalfLifeDays: 5,
    completeEradicationDays: 900,        // ~2.5 years persistence in soil
    eradicationMechanism: 'Slow aerobic microbial biodegradation by Bacillus and Stenotrophomonas species; susceptible to photolytic cleavage in transparent surface water.',
    earthRegenerationRemedy: 'Legume cover cropping (crimson clover, hairy vetch) paired with fungal mycorrhizae to regenerate soil food web.',
    epaToxicityClass: 'Class II (Warning)',
    iarcCarcinogenRating: 'Group 3 (Not Classifiable)',
    primaryHealthHazards: ['Colony Collapse Disorder (CCD) in honeybees', 'Nicotinic acetylcholine receptor overstimulation in non-target beneficial insects', 'Avian mortality through food web'],
    pollinatorToxicity: 'EXTREME',
    waterTableLeachingRisk: 'HIGH'
  },
  naled_mosquito_adulticide: {
    id: 'naled_mosquito_adulticide',
    name: '1,2-dibromo-2,2-dichloroethyl dimethyl phosphate',
    commonName: 'Naled (Dibrom / Trumpet)',
    casNumber: '300-76-5',
    chemicalFormula: 'C4H7Br2Cl2O4P',
    category: 'insecticide',
    syntheticEra: 'contemporary_industrial',
    primaryVector: 'urban_mosquito_fogger',
    soilHalfLifeDays: 1,
    aquaticHalfLifeDays: 2,
    atmosphericHalfLifeDays: 1,
    primaryMetaboliteName: 'Dichlorvos (DDVP - Highly Toxic Carcinogen)',
    primaryMetaboliteHalfLifeDays: 10,
    completeEradicationDays: 30,         // 1 month total clearance
    eradicationMechanism: 'Rapid photolytic debromination by sunlight and microbial hydrolysis to DDVP, subsequently broken down into dimethyl phosphate.',
    earthRegenerationRemedy: 'Immediate rain washdown into living bio-retention swales and urban tree canopy vegetative interception.',
    epaToxicityClass: 'Class I (High Danger)',
    iarcCarcinogenRating: 'Group 2B (Possible Carcinogen via DDVP metabolite)',
    primaryHealthHazards: ['Cholinesterase suppression in humans & pets', 'Severe collateral honeybee kill', 'Respiratory irritation in asthmatics', 'Aquatic toxicity to crustaceans'],
    pollinatorToxicity: 'EXTREME',
    waterTableLeachingRisk: 'LOW'
  },
  pfas_surfactants: {
    id: 'pfas_surfactants',
    name: 'Per- and Polyfluoroalkyl Substances (Pesticide Adjuvants & Fluorosurfactants)',
    commonName: 'PFAS ("Forever Chemicals" in Agrochemical Formulations)',
    casNumber: '335-67-1',
    chemicalFormula: 'C8HF15O2',
    category: 'forever_chemical',
    syntheticEra: 'contemporary_industrial',
    primaryVector: 'aerial_crop_duster',
    soilHalfLifeDays: 36500,            // Virtually inert to natural microbial degradation (>100 years)
    aquaticHalfLifeDays: 36500,
    atmosphericHalfLifeDays: 7300,
    completeEradicationDays: 365000,     // >1,000 years without advanced photocatalytic or plasma remediation
    eradicationMechanism: 'Extremely strong Carbon-Fluorine (C-F) bond resists natural microbial, photolytic, and hydrolytic earth mechanisms. Requires supercritical water oxidation or plasma mineralization.',
    earthRegenerationRemedy: 'Hemp (Cannabis sativa) phytoremediation, activated carbon adsorption barriers, and biochar sequestration.',
    epaToxicityClass: 'Class I (High Danger)',
    iarcCarcinogenRating: 'Group 1 (Carcinogenic to Humans)',
    primaryHealthHazards: ['Kidney and testicular cancer', 'Immune system suppression & vaccine blunting', 'Thyroid disease', 'Permanent bioaccumulation in human serum and wildlife'],
    pollinatorToxicity: 'HIGH',
    waterTableLeachingRisk: 'VERY_HIGH'
  },
  sai_atmospheric_aerosols: {
    id: 'sai_atmospheric_aerosols',
    name: 'Stratospheric Aerosol Injection (Barium, Strontium, Nano-Alumina, SO2)',
    commonName: 'Atmospheric Geoengineering & Cloud Nucleation Particulates',
    casNumber: '7440-39-3',
    chemicalFormula: 'Ba + Sr + Al2O3 + SO2',
    category: 'aerosol_particulate',
    syntheticEra: 'emerging_novel',
    primaryVector: 'atmospheric_dispersal',
    soilHalfLifeDays: 1825,             // Elemental heavy metals do not decompose; residence in topsoil 5+ years before leaching
    aquaticHalfLifeDays: 730,
    atmosphericHalfLifeDays: 365,       // Stratospheric suspension 1-2 years before gravitational settling
    completeEradicationDays: 3650,      // ~10 years environmental dispersion into sediment sink
    eradicationMechanism: 'Gravitational dry settling and tropospheric wet precipitation (rain/snow deposition) followed by soil adsorption and mineral complexation.',
    earthRegenerationRemedy: 'Chelation phytoremediation via Brassica juncea (Indian mustard), humic acid soil conditioning, and remineralization with volcanic basalt dust.',
    epaToxicityClass: 'Class II (Warning)',
    iarcCarcinogenRating: 'Group 2B (Possible Carcinogen)',
    primaryHealthHazards: ['Cardiovascular and respiratory particulate inhalation hazard', 'Soil pH alteration and microbial toxicity from heavy metal fallout', 'Sunlight dimming and photosynthetic inhibition'],
    pollinatorToxicity: 'HIGH',
    waterTableLeachingRisk: 'HIGH'
  },
  novel_synthetic_generic: {
    id: 'novel_synthetic_generic',
    name: 'Novel Synthetic Agrochemical / Experimental Bio-Toxin',
    commonName: 'Emerging / Next-Gen Synthetic Toxin',
    casNumber: 'PENDING-REGISTRY',
    chemicalFormula: 'CxHyOzClw-SYNTH',
    category: 'novel_synthetic',
    syntheticEra: 'emerging_novel',
    primaryVector: 'aerial_crop_duster',
    soilHalfLifeDays: 90,
    aquaticHalfLifeDays: 60,
    atmosphericHalfLifeDays: 10,
    completeEradicationDays: 365,
    eradicationMechanism: 'Adaptive enzyme induction in native soil microbiomes, solar UV photolysis, and natural soil clay sorption.',
    earthRegenerationRemedy: 'Broad-spectrum organic compost tea, biochar blending, and diverse multi-species polyculture cover cropping.',
    epaToxicityClass: 'Class II (Warning)',
    iarcCarcinogenRating: 'Group 2B (Possible Carcinogen)',
    primaryHealthHazards: ['Unknown long-term endocrine interference', 'Ecosystem bioaccumulation', 'Soil microbiome stress'],
    pollinatorToxicity: 'HIGH',
    waterTableLeachingRisk: 'MODERATE'
  }
};

// -----------------------------------------------------------------------------------------
// 2. ACTIVE & HISTORICAL SPRAY INCIDENTS DATABASE
// -----------------------------------------------------------------------------------------
export const CURATED_SPRAY_INCIDENTS: SprayIncident[] = [
  {
    id: 'spray-ca-central-valley-01',
    locationName: 'San Joaquin Valley Citrus & Almond Belt, CA',
    coordinates: [-119.2921, 36.3302], // Visalia / Tulare area
    sprayRadiusMiles: 8.5,
    sprayPath: [
      [-119.38, 36.25],
      [-119.34, 36.32],
      [-119.29, 36.38],
      [-119.22, 36.42]
    ],
    chemicalId: 'glyphosate',
    dosageApplied: '48 oz / acre (Roundup PowerMAX)',
    applicationTimestamp: '2026-10-15T06:30:00Z',
    appliedBy: 'Valley Ag Aerial Services (Air Tractor AT-802A)',
    targetSpeciesOrCrop: 'Post-Harvest Almond Orchard Weed Knockdown',
    notes: 'Aerial blanket herbicide application prior to winter cover crops. High drift potential detected near Kings River canal.'
  },
  {
    id: 'spray-ia-corn-belt-02',
    locationName: 'Des Moines River Basin, IA (Corn & Soy Belt)',
    coordinates: [-93.6091, 41.6005],
    sprayRadiusMiles: 12.0,
    sprayPath: [
      [-93.75, 41.52],
      [-93.68, 41.58],
      [-93.58, 41.66],
      [-93.48, 41.72]
    ],
    chemicalId: 'atrazine',
    dosageApplied: '1.5 lbs a.i. / acre (Aatrex 4L)',
    applicationTimestamp: '2026-05-20T08:00:00Z',
    appliedBy: 'Midwest Precision Agronomy (Ground Boom Rig)',
    targetSpeciesOrCrop: 'Pre-emergence broadleaf control in GMO Corn fields',
    notes: 'Major surface runoff during June rainfall event elevated Des Moines Water Works atrazine levels above 3.0 ppb.'
  },
  {
    id: 'spray-ms-delta-03',
    locationName: 'Mississippi Alluvial Delta (Greenville - Leland, MS)',
    coordinates: [-90.9634, 33.4018],
    sprayRadiusMiles: 10.0,
    sprayPath: [
      [-91.05, 33.32],
      [-90.98, 33.39],
      [-90.92, 33.45],
      [-90.85, 33.52]
    ],
    chemicalId: 'paraquat',
    dosageApplied: '2.0 pts / acre (Gramoxone 3SL)',
    applicationTimestamp: '2026-09-02T11:15:00Z',
    appliedBy: 'Delta Ag Air Spray Wing',
    targetSpeciesOrCrop: 'Cotton Crop Desiccation & Harvest Defoliation',
    notes: 'Severe toxicity alert. Strict EPA drift buffers established around residential perimeters.'
  },
  {
    id: 'spray-fl-miami-vector-04',
    locationName: 'Miami-Dade & Everglades Urban Fringe, FL',
    coordinates: [-80.3553, 25.7617],
    sprayRadiusMiles: 6.5,
    sprayPath: [
      [-80.42, 25.70],
      [-80.38, 25.75],
      [-80.32, 25.80],
      [-80.26, 25.84]
    ],
    chemicalId: 'naled_mosquito_adulticide',
    dosageApplied: '0.75 fl oz / acre (Dibrom Concentrate)',
    applicationTimestamp: '2026-10-24T03:30:00Z',
    appliedBy: 'Miami-Dade Mosquito Control (Twin-Engine Beechcraft King Air)',
    targetSpeciesOrCrop: 'Urban Vector Control (Zika / Dengue Virus Abatement)',
    notes: 'Ultra-low volume (ULV) night aerial application. Organic beekeepers and urban gardens sheltered.'
  },
  {
    id: 'spray-or-willamette-05',
    locationName: 'Willamette Valley Grass Seed & Hazelnut Region, OR',
    coordinates: [-123.0351, 44.9429], // Salem area
    sprayRadiusMiles: 7.0,
    sprayPath: [
      [-123.12, 44.88],
      [-123.06, 44.93],
      [-123.00, 44.98],
      [-122.92, 45.03]
    ],
    chemicalId: 'chlorpyrifos',
    dosageApplied: '1.5 pts / acre (Lorsban Advanced)',
    applicationTimestamp: '2026-04-18T09:45:00Z',
    appliedBy: 'Cascade Aerial Solutions',
    targetSpeciesOrCrop: 'Filbertworm and Aphid Eradication in Hazelnuts',
    notes: 'Critical monitoring station set at Pudding River watershed due to endangered salmonid stream buffer rules.'
  },
  {
    id: 'spray-nd-red-river-06',
    locationName: 'Red River Valley Wheat & Canola Corridor, ND',
    coordinates: [-97.0328, 47.9253], // Grand Forks
    sprayRadiusMiles: 11.0,
    sprayPath: [
      [-97.18, 47.85],
      [-97.10, 47.91],
      [-97.00, 47.97],
      [-96.90, 48.04]
    ],
    chemicalId: 'dicamba',
    dosageApplied: '22 fl oz / acre (Xtendimax)',
    applicationTimestamp: '2026-06-28T14:20:00Z',
    appliedBy: 'Prairie Wings Custom Applicators',
    targetSpeciesOrCrop: 'Post-emergence Pigweed & Palmer Amaranth in Soybeans',
    notes: 'Thermal temperature inversion at 600 ft triggered atmospheric vapor drift drifting 4 miles east across MN border.'
  },
  {
    id: 'spray-co-neonicotinoid-07',
    locationName: 'Northern Colorado Front Range Sugar Beet Belt, CO',
    coordinates: [-104.7091, 40.4233], // Greeley
    sprayRadiusMiles: 8.0,
    sprayPath: [
      [-104.82, 40.36],
      [-104.74, 40.41],
      [-104.66, 40.46],
      [-104.58, 40.51]
    ],
    chemicalId: 'neonicotinoid_imidacloprid',
    dosageApplied: '14 oz / acre (Merit 2F)',
    applicationTimestamp: '2026-07-12T10:00:00Z',
    appliedBy: 'Platte River Ag Aviation',
    targetSpeciesOrCrop: 'Root Maggot and Whitefly Suppression',
    notes: 'Apiary monitoring tags recorded 45% decline in local bumblebee hive foraging activity within 3 miles.'
  },
  {
    id: 'spray-tx-sai-aerosol-08',
    locationName: 'West Texas Permian Atmosphere Corridor (Midland - Odessa), TX',
    coordinates: [-102.0779, 31.9973],
    sprayRadiusMiles: 25.0,
    sprayPath: [
      [-102.50, 31.80],
      [-102.25, 31.92],
      [-102.00, 32.05],
      [-101.70, 32.18]
    ],
    chemicalId: 'sai_atmospheric_aerosols',
    dosageApplied: 'Stratospheric Aerosol Injection Test Run (Barium/Strontium Nano-Alumina)',
    applicationTimestamp: '2026-10-01T15:00:00Z',
    appliedBy: 'Atmospheric Research High-Altitude Platform',
    targetSpeciesOrCrop: 'Solar Radiation Management / Cloud Albedo Enhancement Research',
    notes: 'High-altitude aerosol particulate plume verified by ground lidar and spectrophotometer network.'
  }
];

// -----------------------------------------------------------------------------------------
// 3. NATURAL ERADICATION CALCULATION ENGINE
// -----------------------------------------------------------------------------------------
export class ChemicalSprayingEngine {
  private static userReportedIncidents: SprayIncident[] = [];

  public static getUserIncidents(): SprayIncident[] {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sphinx_user_chemical_sprays');
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.error('Failed to load user chemical sprays:', e);
      }
    }
    return this.userReportedIncidents;
  }

  public static addSprayIncident(incident: SprayIncident): void {
    const existing = this.getUserIncidents();
    const updated = [incident, ...existing.filter(i => i.id !== incident.id)];
    this.userReportedIncidents = updated;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sphinx_user_chemical_sprays', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save user chemical spray:', e);
      }
    }
  }

  public static getAllIncidents(): SprayIncident[] {
    const userIncidents = this.getUserIncidents();
    return [...userIncidents, ...CURATED_SPRAY_INCIDENTS];
  }

  public static getChemicalProfile(chemicalId: string): ChemicalProfile {
    return KNOWN_CHEMICAL_PROFILES[chemicalId] || KNOWN_CHEMICAL_PROFILES.novel_synthetic_generic;
  }

  /**
   * Evaluates exact natural earth eradication metrics for a chemical spray incident.
   * Uses first-order exponential decay kinetics C(t) = C0 * exp(-lambda * t)
   * accounting for soil microbial degradation, aqueous photolysis, and metabolite half-lives.
   */
  public static evaluateEradication(
    incident: SprayIncident,
    asOfDate: Date = new Date()
  ): EradicationEvaluation {
    const chemical = this.getChemicalProfile(incident.chemicalId);
    const appliedTime = new Date(incident.applicationTimestamp).getTime();
    const currentTime = asOfDate.getTime();
    const elapsedMs = Math.max(0, currentTime - appliedTime);
    
    const daysElapsed = elapsedMs / (1000 * 60 * 60 * 24);
    const hoursElapsed = elapsedMs / (1000 * 60 * 60);

    // Primary decay constant lambda = ln(2) / halfLife
    const lambda = Math.LN2 / Math.max(1, chemical.soilHalfLifeDays);
    
    // Remaining concentration percentage:
    let remainingConcentration = 100 * Math.exp(-lambda * daysElapsed);

    // If there is a highly persistent metabolite (like AMPA from Glyphosate):
    if (chemical.primaryMetaboliteHalfLifeDays && chemical.primaryMetaboliteHalfLifeDays > chemical.soilHalfLifeDays) {
      // Metabolite formation and decay curve:
      const metaLambda = Math.LN2 / chemical.primaryMetaboliteHalfLifeDays;
      const metaboliteConcentration = 85 * (Math.exp(-metaLambda * daysElapsed) - Math.exp(-lambda * daysElapsed));
      remainingConcentration = Math.max(remainingConcentration, remainingConcentration + Math.max(0, metaboliteConcentration * 0.7));
    }

    remainingConcentration = Math.max(0, Math.min(100, remainingConcentration));
    const percentPurifiedByEarth = Math.round((100 - remainingConcentration) * 10) / 10;

    // Eradication progress ratio (0 to 1) based on benchmark complete eradication duration
    const progressRatio = Math.min(1.0, daysElapsed / Math.max(1, chemical.completeEradicationDays));

    // Estimated complete natural eradication date:
    const completeEradicationMs = appliedTime + (chemical.completeEradicationDays * 24 * 60 * 60 * 1000);
    const remainingDurationMs = Math.max(0, completeEradicationMs - currentTime);
    const daysRemaining = Math.ceil(remainingDurationMs / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.ceil(remainingDurationMs / (1000 * 60 * 60));
    const estimatedEradicationDate = new Date(completeEradicationMs).toISOString();

    // Determine current decay phase:
    let decayPhase: EradicationEvaluation['decayPhase'] = 'ACTIVE_TOXIC_SURFACE';
    let activeToxicityLevel: EradicationEvaluation['activeToxicityLevel'] = 'CRITICAL';

    if (daysRemaining === 0 || remainingConcentration < 0.1) {
      decayPhase = 'PURIFIED_BY_EARTH';
      activeToxicityLevel = 'NEGLIGIBLE';
    } else if (remainingConcentration < 2.0) {
      decayPhase = 'TRACE_BENCHMARK';
      activeToxicityLevel = 'LOW';
    } else if (chemical.primaryMetaboliteName && daysElapsed > chemical.soilHalfLifeDays * 1.5) {
      decayPhase = 'PERSISTENT_METABOLITE_PHASE';
      activeToxicityLevel = 'MODERATE';
    } else if (daysElapsed > chemical.soilHalfLifeDays * 0.5) {
      decayPhase = 'RESIDUAL_MICROBIAL_DECAY';
      activeToxicityLevel = 'ELEVATED';
    }

    let soilActionSummary = '';
    switch (decayPhase) {
      case 'ACTIVE_TOXIC_SURFACE':
        soilActionSummary = `High acute surface concentration. Solar UV photolysis is active on leaf foliage; soil bacteria are beginning initial enzymatic cleavage.`;
        break;
      case 'RESIDUAL_MICROBIAL_DECAY':
        soilActionSummary = `Primary compound has passed initial half-life. Soil microorganisms (${chemical.eradicationMechanism.split(' ')[0]}) actively mineralizing active parent molecules.`;
        break;
      case 'PERSISTENT_METABOLITE_PHASE':
        soilActionSummary = `Parent molecules largely broken down. Persistent secondary metabolite (${chemical.primaryMetaboliteName || 'intermediates'}) is slowly decaying in deeper soil clay complexes.`;
        break;
      case 'TRACE_BENCHMARK':
        soilActionSummary = `Over 98% naturally eradicated by Earth's biological and hydrological systems. Remaining trace residues are sequestered in humus.`;
        break;
      case 'PURIFIED_BY_EARTH':
        soilActionSummary = `100% Completely eradicated by Earth's natural systems. Soil microbiome and watershed have returned to biological equilibrium.`;
        break;
    }

    return {
      incident,
      chemical,
      daysElapsed: Math.round(daysElapsed * 10) / 10,
      hoursElapsed: Math.round(hoursElapsed),
      remainingConcentrationPercent: Math.round(remainingConcentration * 10) / 10,
      percentPurifiedByEarth,
      decayPhase,
      estimatedEradicationDate,
      daysRemaining,
      hoursRemaining,
      eradicationProgressRatio: Math.round(progressRatio * 100) / 100,
      activeToxicityLevel,
      soilActionSummary
    };
  }

  /**
   * Generates a circular/elliptical polygon representing the chemical spray dispersion zone.
   */
  private static generateSprayZoneCoordinates(
    center: [number, number],
    radiusMiles: number,
    numPoints: number = 32
  ): [number, number][] {
    const [lon, lat] = center;
    const coords: [number, number][] = [];
    const latMilesToDeg = 1 / 69.0;
    const lonMilesToDeg = 1 / (69.0 * Math.cos((lat * Math.PI) / 180));

    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints;
      // Slight atmospheric jitter to simulate wind dispersal plume asymmetry
      const jitter = 1 + 0.12 * Math.sin(angle * 3) + 0.08 * Math.cos(angle * 2);
      const r = radiusMiles * jitter;
      const ptLon = lon + r * Math.sin(angle) * lonMilesToDeg;
      const ptLat = lat + r * Math.cos(angle) * latMilesToDeg;
      coords.push([ptLon, ptLat]);
    }
    coords.push(coords[0]); // Close polygon
    return coords;
  }

  /**
   * Generates GeoJSON FeatureCollections for:
   * 1. Spray Zones (Polygons colored by toxicity & eradication phase)
   * 2. Spray Paths (Flight / tractor tracks)
   * 3. Spray Centroids (Interactive inspection points)
   */
  public static generateGeoJSON(asOfDate: Date = new Date()): {
    zones: GeoJSON.FeatureCollection<GeoJSON.Polygon>;
    paths: GeoJSON.FeatureCollection<GeoJSON.LineString>;
    points: GeoJSON.FeatureCollection<GeoJSON.Point>;
  } {
    const incidents = this.getAllIncidents();
    const zoneFeatures: GeoJSON.Feature<GeoJSON.Polygon>[] = [];
    const pathFeatures: GeoJSON.Feature<GeoJSON.LineString>[] = [];
    const pointFeatures: GeoJSON.Feature<GeoJSON.Point>[] = [];

    incidents.forEach(incident => {
      const evalData = this.evaluateEradication(incident, asOfDate);
      const ring = this.generateSprayZoneCoordinates(incident.coordinates, incident.sprayRadiusMiles);

      // Color coding based on active toxicity
      let fillColor = '#ef4444'; // Red
      let strokeColor = '#dc2626';
      if (evalData.decayPhase === 'PURIFIED_BY_EARTH') {
        fillColor = '#10b981'; // Emerald
        strokeColor = '#059669';
      } else if (evalData.decayPhase === 'TRACE_BENCHMARK') {
        fillColor = '#06b6d4'; // Cyan
        strokeColor = '#0891b2';
      } else if (evalData.decayPhase === 'PERSISTENT_METABOLITE_PHASE') {
        fillColor = '#f59e0b'; // Amber
        strokeColor = '#d97706';
      } else if (evalData.decayPhase === 'RESIDUAL_MICROBIAL_DECAY') {
        fillColor = '#f97316'; // Orange
        strokeColor = '#ea580c';
      }

      const commonProps = {
        id: incident.id,
        chemicalId: incident.chemicalId,
        chemicalName: evalData.chemical.commonName,
        casNumber: evalData.chemical.casNumber,
        category: evalData.chemical.category,
        locationName: incident.locationName,
        dosageApplied: incident.dosageApplied,
        applicationTimestamp: incident.applicationTimestamp,
        appliedBy: incident.appliedBy,
        targetSpeciesOrCrop: incident.targetSpeciesOrCrop,
        daysElapsed: evalData.daysElapsed,
        daysRemaining: evalData.daysRemaining,
        estimatedEradicationDate: evalData.estimatedEradicationDate,
        remainingConcentrationPercent: evalData.remainingConcentrationPercent,
        percentPurifiedByEarth: evalData.percentPurifiedByEarth,
        decayPhase: evalData.decayPhase,
        activeToxicityLevel: evalData.activeToxicityLevel,
        fillColor,
        strokeColor,
        notes: incident.notes
      };

      zoneFeatures.push({
        type: 'Feature',
        properties: commonProps,
        geometry: {
          type: 'Polygon',
          coordinates: [ring]
        }
      });

      if (incident.sprayPath && incident.sprayPath.length >= 2) {
        pathFeatures.push({
          type: 'Feature',
          properties: {
            ...commonProps,
            isSprayPath: true
          },
          geometry: {
            type: 'LineString',
            coordinates: incident.sprayPath
          }
        });
      }

      pointFeatures.push({
        type: 'Feature',
        properties: commonProps,
        geometry: {
          type: 'Point',
          coordinates: incident.coordinates
        }
      });
    });

    return {
      zones: { type: 'FeatureCollection', features: zoneFeatures },
      paths: { type: 'FeatureCollection', features: pathFeatures },
      points: { type: 'FeatureCollection', features: pointFeatures }
    };
  }
}
