// chemicalSafetyStandards.ts
// Global Toxin & Chemical Safety Threshold Database
// Cross-references regulatory legal limits from world government agencies
// with independent, non-biased scientific health standards.
// Covers:
// 1. Water Additives & Disinfection Byproducts (Fluoride, Chloramines, THMs, HAAs, NDMA)
// 2. Forever Chemicals (PFAS / PFOA, PFOS, GenX, PFHxS)
// 3. Heavy Metals & Metalloids (Lead, Arsenic, Hexavalent Chromium, Mercury, Cadmium, Uranium)
// 4. Industrial Solvents & VOCs (TCE, PCE, Benzene, Vinyl Chloride, 1,4-Dioxane)
// 5. Agricultural Toxins & Endocrine Disruptors (Glyphosate, Atrazine, Chlorpyrifos, Phthalates, BPA)
// 6. Air Quality Contaminants & Radionuclides (PM2.5, Radon, Formaldehyde, Radium-226/228, Tritium)

export interface ChemicalAdditiveDisclosure {
  chemicalName: string;
  chemicalFormula: string;
  casNumber?: string;
  purpose: string;
  targetDosePpm: string;
  epaLegalLimit: string;
  independentHealthGuideline: string;
  healthConcerns: string;
  removalMethod: string;
}

export interface ComparativeThreshold {
  id: string;
  chemical_name: string;
  cas_number: string;
  chemical_category:
    | 'Water Additive / Disinfection Byproduct'
    | 'PFAS Forever Chemicals'
    | 'Heavy Metal / Metalloid'
    | 'Industrial Solvent / VOC'
    | 'Agricultural Pesticide / Herbicide'
    | 'Consumer Endocrine Disruptor'
    | 'Air Quality & Radionuclide';
  primary_sources: string;
  health_effects: string;
  target_organs: string[];
  government_limits: {
    epa_mcl: string;           // US EPA Legal Enforceable Limit
    epa_mclg: string;          // US EPA Maximum Contaminant Level Goal
    who_guideline: string;      // World Health Organization Drinking-water Guidelines
    eu_directive: string;       // European Union Drinking Water Directive / EFSA
    health_canada_mac: string; // Health Canada Maximum Acceptable Concentration
    japan_mhlw: string;        // Japan Ministry of Health, Labour and Welfare
    california_phg: string;    // California OEHHA Public Health Goal
  };
  independent_standards: {
    ewg_health_guideline: string; // Environmental Working Group (non-biased epidemiological benchmark)
    acgih_tlv?: string;           // American Conference of Governmental Industrial Hygienists
    iarc_classification: string;  // International Agency for Research on Cancer (Group 1, 2A, 2B, 3)
    ntp_assessment: string;        // US National Toxicology Program
  };
  safety_discrepancy_analysis: string;
  at_home_removal_methods: string[];
}

export const CHEMICAL_SAFETY_STANDARDS: ComparativeThreshold[] = [
  // ==========================================
  // 1. WATER ADDITIVES & DISINFECTION BYPRODUCTS
  // ==========================================
  {
    id: 'chem-fluoride',
    chemical_name: 'Fluoride (Fluorosilicic Acid / Sodium Fluoride)',
    cas_number: '16984-48-8',
    chemical_category: 'Water Additive / Disinfection Byproduct',
    primary_sources: 'Municipal artificial water fluoridation (fluorosilicic acid H2SiF6 added to tap water), natural mineral deposits',
    health_effects: 'Dental fluorosis (enamel mottling), skeletal fluorosis (bone brittleness, joint calcification), neurodevelopmental IQ deficits in children, endocrine disruption (suppression of thyroid iodine uptake)',
    target_organs: ['Brain / Neurodevelopment', 'Teeth & Skeleton', 'Thyroid Gland', 'Pineal Gland'],
    government_limits: {
      epa_mcl: '4.0 mg/L (enforceable MCL) / 2.0 mg/L (secondary cosmetic limit)',
      epa_mclg: '4.0 mg/L',
      who_guideline: '1.5 mg/L',
      eu_directive: '1.5 mg/L (Note: 97% of Western European nations reject artificial water fluoridation)',
      health_canada_mac: '1.5 mg/L (recommends 0.7 mg/L optimal)',
      japan_mhlw: '0.8 mg/L (artificial fluoridation prohibited in municipal grids)',
      california_phg: '1.0 mg/L'
    },
    independent_standards: {
      ewg_health_guideline: '0.05 mg/L (derived from landmark NIH/NTP neurotoxicity and developmental IQ reduction studies)',
      acgih_tlv: '2.5 mg/m³ (as F, occupational inhalation)',
      iarc_classification: 'Group 3 (Not classifiable as to human carcinogenicity, though NTP confirmed neurotoxicity)',
      ntp_assessment: 'NTP Monograph 2024: Fluoride exposure >1.5 mg/L consistently associated with lower cognitive IQ in children.'
    },
    safety_discrepancy_analysis: 'US EPA\'s legal standard of 4.0 mg/L was established in 1986 and is 80x higher than EWG\'s health guideline (0.05 mg/L). In August 2024, a landmark US Federal Court ruling (Food & Water Watch v. EPA) determined that community water fluoridation at the current 0.7 mg/L level poses an unreasonable risk of reduced IQ in children under TSCA Section 21.',
    at_home_removal_methods: [
      'Reverse Osmosis (RO) with polyamide thin-film composite membrane (removes 92–98% of fluoride)',
      'Activated Alumina (AAL) adsorption filter media (effective but requires pH control)',
      'Bone Char Carbon (Hydroxyapatite media, removes ~90% of fluoride)',
      'Steam Distillation (removes 99.9% of fluoride)',
      'NOTE: Standard pitcher carbon filters (Brita, PUR) DO NOT remove fluoride.'
    ]
  },
  {
    id: 'chem-chloramines',
    chemical_name: 'Chloramines (Monochloramine NH2Cl)',
    cas_number: '10599-90-3',
    chemical_category: 'Water Additive / Disinfection Byproduct',
    primary_sources: 'Municipal disinfectant created by mixing chlorine gas with liquid anhydrous ammonia (NH3) to prolong disinfectant life in distribution pipes',
    health_effects: 'Respiratory irritation, severe eye/skin irritation, hemolytic anemia in dialysis patients (lethal if enters bloodstream), formation of highly toxic unregulated nitrogenous DBPs (NDMA, halonitromethanes)',
    target_organs: ['Respiratory Epithelium', 'Kidneys & Blood (Dialysis)', 'Digestive Mucosa', 'Skin'],
    government_limits: {
      epa_mcl: '4.0 mg/L (as Cl2, Maximum Residual Disinfectant Level MRDL)',
      epa_mclg: '4.0 mg/L (MRDLG)',
      who_guideline: '3.0 mg/L',
      eu_directive: 'Chloramination heavily restricted; maximum disinfectant residual typically <0.2–0.5 mg/L',
      health_canada_mac: '3.0 mg/L',
      japan_mhlw: 'Prohibits chloramination in favor of low-dose free chlorine and activated carbon filtration',
      california_phg: '4.0 mg/L'
    },
    independent_standards: {
      ewg_health_guideline: '0.1 mg/L (accounting for toxic secondary halogenated byproduct generation)',
      acgih_tlv: 'None established for aqueous monochloramine',
      iarc_classification: 'Group 3 (Chloramines), but nitrogenous byproducts (NDMA) are Group 2A (Probable Human Carcinogen)',
      ntp_assessment: 'Identified monochloramine as precursor to potent mutagenic and genotoxic byproducts.'
    },
    safety_discrepancy_analysis: 'While chloramines maintain disinfectant residuals longer than chlorine, they leach lead and copper from older plumbing joints and create highly carcinogenic nitrogenous disinfection byproducts (NDMA). Standard activated carbon filters fail to capture chloramines; catalytic carbon is mandatory.',
    at_home_removal_methods: [
      'Catalytic Carbon Block Filtration (standard activated carbon has poor chloramine capacity; catalytic carbon breaks chemical bond)',
      'Reverse Osmosis equipped with Catalytic Carbon Pre-filter',
      'Ascorbic Acid (Vitamin C) / Sodium Ascorbate chemical neutralization (ideal for bath/shower water)',
      'NOTE: Boiling or leaving water out overnight DOES NOT eliminate chloramines (unlike free chlorine).'
    ]
  },
  {
    id: 'chem-thms',
    chemical_name: 'Total Trihalomethanes (TTHMs: Chloroform, Bromoform, BDCM, DBCM)',
    cas_number: '67-66-3 (Chloroform)',
    chemical_category: 'Water Additive / Disinfection Byproduct',
    primary_sources: 'Chemical reaction between chlorine/chloramine disinfectants and naturally occurring organic matter (decaying vegetation) in raw reservoir water',
    health_effects: 'Bladder cancer, colorectal cancer, liver damage, adverse reproductive outcomes (miscarriage, low birth weight), central nervous system depression',
    target_organs: ['Bladder', 'Liver & Kidneys', 'Reproductive System / Fetus', 'Central Nervous System'],
    government_limits: {
      epa_mcl: '80 ppb (0.080 mg/L)',
      epa_mclg: '0 ppb for Chloroform and BDCM',
      who_guideline: 'Sum of ratios to individual guidelines ≤ 1.0 (Chloroform guideline: 300 ppb)',
      eu_directive: '100 ppb (under Directive 2020/2184, reducing to 50 ppb in several member states)',
      health_canada_mac: '100 ppb',
      japan_mhlw: '100 ppb (Total THMs)',
      california_phg: '1 ppb (Chloroform), 0.1 ppb (Bromodichloromethane)'
    },
    independent_standards: {
      ewg_health_guideline: '0.15 ppb (Total THMs) — 530x stricter than the EPA legal limit',
      acgih_tlv: '10 ppm (Chloroform in workplace air)',
      iarc_classification: 'Group 2B (Chloroform & BDCM: Possibly Carcinogenic to Humans)',
      ntp_assessment: 'Reasonably anticipated to be a human carcinogen based on animal multi-organ tumor bioassays.'
    },
    safety_discrepancy_analysis: 'EPA\'s 80 ppb limit allows a 1-in-10,000 cancer risk, primarily balancing chemical cancer risk against the immediate acute hazard of waterborne cholera/typhoid. Inhalation and dermal absorption during hot showers often exceed oral ingestion by a factor of 3x.',
    at_home_removal_methods: [
      'Granular Activated Carbon (GAC) / Solid Carbon Block (high adsorption affinity for THMs)',
      'Reverse Osmosis with post-carbon polishing',
      'Whole-house Granular Carbon Bed (vital to prevent inhalation of vaporized chloroform in hot showers)'
    ]
  },

  // ==========================================
  // 2. FOREVER CHEMICALS (PFAS)
  // ==========================================
  {
    id: 'chem-pfas-pfoa',
    chemical_name: 'PFOA (Perfluorooctanoic Acid) & PFOS (Perfluorooctane Sulfonate)',
    cas_number: '335-67-1 (PFOA) / 1763-23-1 (PFOS)',
    chemical_category: 'PFAS Forever Chemicals',
    primary_sources: 'Aqueous Film-Forming Foam (AFFF firefighting foam at military airfields), Teflon non-stick coatings, waterproof textiles (GORE-TEX), stain-resistant carpets, food packaging grease-proof liners',
    health_effects: 'Kidney and testicular cancer, severe liver damage, immunosuppression (reduced vaccine antibody response in children), high cholesterol, ulcerative colitis, thyroid disease, gestational hypertension',
    target_organs: ['Kidneys & Testes (Carcinogenesis)', 'Liver (Lipid Metabolism)', 'Immune System', 'Thyroid Gland'],
    government_limits: {
      epa_mcl: '4.0 ppt (0.000004 mg/L) — Legally finalized National Primary Drinking Water Regulation in April 2024',
      epa_mclg: '0 ppt (non-enforceable health goal; recognized as zero-threshold carcinogens)',
      who_guideline: '100 ppt for individual PFAS / 500 ppt for Total PFAS (criticized by global scientists as overly lenient)',
      eu_directive: '100 ppt for sum of 20 targeted PFAS / 500 ppt for Total PFAS',
      health_canada_mac: '30 ppt for sum of all PFAS compounds',
      japan_mhlw: '50 ppt (combined PFOA + PFOS advisory limit)',
      california_phg: '0.007 ppt (PFOA) / 0.01 ppt (PFOS)'
    },
    independent_standards: {
      ewg_health_guideline: '0.007 ppt (PFOA) / 0.01 ppt (PFOS) — Based on accelerated immune system suppression and increased cholesterol',
      acgih_tlv: '0.01 mg/m³ (Inhalation exposure)',
      iarc_classification: 'Group 1 (Carcinogenic to Humans - upgraded December 2023 for PFOA); Group 2B for PFOS',
      ntp_assessment: 'Known to cause immunotoxicity and antibody suppression in humans.'
    },
    safety_discrepancy_analysis: 'Carbon-fluorine bonds in PFAS are among the strongest in organic chemistry; they do not degrade naturally in the human body (biological half-life 3 to 8 years) or environment. Over 200 million Americans consume drinking water contaminated with PFAS above EWG health benchmarks.',
    at_home_removal_methods: [
      'Dual-Stage Reverse Osmosis (RO) with certified NSF/ANSI 58 or 53 performance (99%+ removal)',
      'Granular Activated Carbon (GAC) using coconut shell virgin carbon (requires frequent filter changes to prevent desorption breakthroughs)',
      'Anion Exchange Resin (AIX) targeted specifically for short- and long-chain perfluorinated carboxylates',
      'NOTE: Boiling water DOES NOT remove PFAS; it concentrates them via evaporation.'
    ]
  },

  // ==========================================
  // 3. HEAVY METALS & METALLOIDS
  // ==========================================
  {
    id: 'chem-lead',
    chemical_name: 'Lead (Pb)',
    cas_number: '7439-92-1',
    chemical_category: 'Heavy Metal / Metalloid',
    primary_sources: 'Aging lead service lines (LSLs), brass fixtures, lead-tin solder in homes built before 1986, industrial smelting, legacy leaded aviation fuel',
    health_effects: 'Irreversible childhood neurodevelopmental deficits, lowered IQ, ADHD, encephalopathy, kidney failure, maternal hypertension, spontaneous abortion',
    target_organs: ['Central Nervous System (Brain)', 'Peripheral Nerves', 'Kidneys & Renal Tubules', 'Bone Marrow (Hematopoiesis)'],
    government_limits: {
      epa_mcl: '15 ppb (0.015 mg/L Action Level, lowering to 10 ppb under 2024 LCRI)',
      epa_mclg: '0 ppb (Strictly 0; CDC confirms no safe blood lead level in children)',
      who_guideline: '10 ppb',
      eu_directive: '5 ppb (lowered in 2023 under updated Directive)',
      health_canada_mac: '5 ppb',
      japan_mhlw: '10 ppb',
      california_phg: '0.2 ppb'
    },
    independent_standards: {
      ewg_health_guideline: '0 ppb (CDC, AAP, and EWG all concur that any detectable lead damages synaptic architecture)',
      acgih_tlv: '0.05 mg/m³ (Elemental lead)',
      iarc_classification: 'Group 2A (Probably Carcinogenic to Humans; inorganic lead compounds)',
      ntp_assessment: 'Clear evidence of adverse health effects at blood lead levels <5 µg/dL.'
    },
    safety_discrepancy_analysis: 'EPA\'s 15 ppb Action Level is a regulatory feasibility metric for municipal water utilities, NOT a biological health threshold. Even low-level lead exposure (1–5 ppb in tap water) causes measurable loss of cognitive executive function in developing infants.',
    at_home_removal_methods: [
      'Reverse Osmosis (removes 98%+ of dissolved lead ions)',
      'Solid Carbon Block filter certified under NSF/ANSI Standard 53 for lead reduction',
      'KDF-55 Kinetic Degradation Fluxion media (redox reaction precipitates lead)',
      'Immediate cold water flushing for 2 minutes before drinking (never use hot tap water for baby formula or cooking).'
    ]
  },
  {
    id: 'chem-arsenic',
    chemical_name: 'Inorganic Arsenic (As(III) / As(V))',
    cas_number: '7440-38-2',
    chemical_category: 'Heavy Metal / Metalloid',
    primary_sources: 'Natural geothermal groundwater leaching in Western US aquifers, legacy arsenical pesticides (lead arsenate orchards), coal fly ash waste, rice paddies',
    health_effects: 'Bladder, lung, skin, and kidney cancer, hyperpigmentation, palmoplantar keratosis, peripheral vascular "blackfoot" disease, diabetes, developmental neurotoxicity',
    target_organs: ['Skin & Dermis', 'Lungs & Respiratory Tract', 'Bladder & Urothelium', 'Cardiovascular Vessels'],
    government_limits: {
      epa_mcl: '10 ppb (0.010 mg/L)',
      epa_mclg: '0 ppb',
      who_guideline: '10 ppb (provisional)',
      eu_directive: '10 ppb',
      health_canada_mac: '10 ppb',
      japan_mhlw: '10 ppb',
      california_phg: '0.004 ppb (0.000004 mg/L)'
    },
    independent_standards: {
      ewg_health_guideline: '0.004 ppb — Based on lifetime skin and bladder cancer epidemiological calculations (2,500x lower than legal limit)',
      acgih_tlv: '0.01 mg/m³',
      iarc_classification: 'Group 1 (Carcinogenic to Humans - highest certainty rating)',
      ntp_assessment: 'Known human carcinogen and potent genotoxic mutagen.'
    },
    safety_discrepancy_analysis: 'At the current EPA legal limit of 10 ppb, the estimated lifetime excess cancer risk is approximately 1 in 500—drastically higher than the typical 1-in-1,000,000 regulatory benchmark used for synthetic chemicals. Millions in rural Southwest and Midwest private wells drink water with 20–50+ ppb arsenic.',
    at_home_removal_methods: [
      'Reverse Osmosis with pre-oxidation (Arsenic-III must be oxidized to Arsenic-V via chlorination or aeration for RO rejection)',
      'Granular Ferric Oxide / Titanium Dioxide adsorption beds (high capacity for arsenic)',
      'Anion Exchange'
    ]
  },
  {
    id: 'chem-hexavalent-chromium',
    chemical_name: 'Hexavalent Chromium (Chromium-6, Cr(VI))',
    cas_number: '18540-29-9',
    chemical_category: 'Heavy Metal / Metalloid',
    primary_sources: 'Industrial chrome plating, cooling tower biocides (PG&E Hinkley contamination), stainless steel manufacturing, natural serpentinite rock leaching',
    health_effects: 'Stomach cancer, gastrointestinal ulcers, severe liver damage, reproductive harm, DNA strand breakage (mutagenic cross-linking)',
    target_organs: ['Stomach & Intestines', 'Liver', 'Hematopoietic System', 'Lungs (Inhalation)'],
    government_limits: {
      epa_mcl: '100 ppb for Total Chromium (No specific federal MCL for toxic Hexavalent Chromium)',
      epa_mclg: '100 ppb',
      who_guideline: '50 ppb for Total Chromium',
      eu_directive: '25 ppb for Total Chromium (Directive 2020/2184)',
      health_canada_mac: '50 ppb',
      japan_mhlw: '20 ppb for Hexavalent Chromium',
      california_phg: '0.02 ppb (Enforceable California MCL of 10 ppb adopted April 2024)'
    },
    independent_standards: {
      ewg_health_guideline: '0.02 ppb — Equivalent to California OEHHA public health goal to protect against stomach cancer',
      acgih_tlv: '0.0002 mg/m³ (Inhalation)',
      iarc_classification: 'Group 1 (Carcinogenic to Humans)',
      ntp_assessment: 'Known human carcinogen via oral ingestion causing oral and small intestinal tumors.'
    },
    safety_discrepancy_analysis: 'Federal EPA regulations only measure Total Chromium (which includes benign Chromium-3, an essential dietary nutrient). Federal law allows up to 100 ppb of chromium without testing what fraction is carcinogenic Chromium-6. EWG testing found Chromium-6 in the tap water of over 200 million Americans.',
    at_home_removal_methods: [
      'Dual-pass Reverse Osmosis',
      'Strong Base Anion (SBA) exchange resin',
      'Distillation'
    ]
  },

  // ==========================================
  // 4. INDUSTRIAL SOLVENTS & VOCS
  // ==========================================
  {
    id: 'chem-tce',
    chemical_name: 'Trichloroethylene (TCE)',
    cas_number: '79-01-6',
    chemical_category: 'Industrial Solvent / VOC',
    primary_sources: 'Vapor degreasing solvents in aerospace and electronics manufacturing, military base cleaning (Camp Lejeune, SSFL), toxic waste Superfund plumes',
    health_effects: 'Kidney cancer, non-Hodgkin lymphoma, liver cancer, congenital fetal heart malformations during early pregnancy, Parkinson\'s disease etiology',
    target_organs: ['Kidneys', 'Liver', 'Fetal Heart Development', 'Substantia Nigra (Dopaminergic Neurons)'],
    government_limits: {
      epa_mcl: '5.0 ppb (0.005 mg/L)',
      epa_mclg: '0 ppb',
      who_guideline: '20 ppb',
      eu_directive: 'Substance of Very High Concern (SVHC) under REACH; banned from industrial solvent usage without authorization',
      health_canada_mac: '5.0 ppb',
      japan_mhlw: '10 ppb',
      california_phg: '1.7 ppb'
    },
    independent_standards: {
      ewg_health_guideline: '0.4 ppb (Based on fetal cardiac defects and childhood leukemia risks)',
      acgih_tlv: '10 ppm TWA / 25 ppm STEL',
      iarc_classification: 'Group 1 (Carcinogenic to Humans - causally linked to kidney cancer)',
      ntp_assessment: 'Known human carcinogen.'
    },
    safety_discrepancy_analysis: 'TCE volatilizes rapidly through soil into indoor air via vapor intrusion, entering basements and crawlspaces above contaminated groundwater. Exposure occurs through drinking, showering, and passive indoor inhalation.',
    at_home_removal_methods: [
      'Activated Carbon Block (highly effective at removing VOCs)',
      'Sub-slab Depressurization Systems (for vapor intrusion mitigation in homes above plumes)',
      'Reverse Osmosis with Carbon Pre- and Post-Filters'
    ]
  },

  // ==========================================
  // 5. AGRICULTURAL CHEMICALS
  // ==========================================
  {
    id: 'chem-glyphosate',
    chemical_name: 'Glyphosate (Roundup Formulation)',
    cas_number: '1071-83-6',
    chemical_category: 'Agricultural Pesticide / Herbicide',
    primary_sources: 'Broad-spectrum herbicide sprayed on agricultural crops (corn, soybeans, wheat pre-harvest desiccant), suburban lawn weedkillers, irrigation runoff',
    health_effects: 'Non-Hodgkin lymphoma, gut microbiome dysbiosis (inhibits shikimate-like bacterial pathways), endocrine disruption, non-alcoholic fatty liver disease (NAFLD)',
    target_organs: ['Lymphatic & Immune System', 'Liver & Kidneys', 'Gut Microbiome Composition'],
    government_limits: {
      epa_mcl: '700 ppb (0.7 mg/L)',
      epa_mclg: '700 ppb',
      who_guideline: 'No formal guideline set for drinking water, but dietary ADI of 1 mg/kg body weight',
      eu_directive: '0.1 ppb (The EU imposes a strict uniform limit of 0.1 ppb for any individual pesticide in drinking water, 7,000x stricter than the US EPA)',
      health_canada_mac: '280 ppb',
      japan_mhlw: '2,000 ppb (Pesticide target limit in raw water)',
      california_phg: '900 ppb (Prop 65 requires cancer warning label)'
    },
    independent_standards: {
      ewg_health_guideline: '5.0 ppb — Based on multi-cohort non-Hodgkin lymphoma epidemiological correlations',
      acgih_tlv: 'None established',
      iarc_classification: 'Group 2A (Probably Carcinogenic to Humans - landmark 2015 Monograph 112 evaluation)',
      ntp_assessment: 'Active systematic investigation into genotoxicity and oxidative stress in human lymphocytes.'
    },
    safety_discrepancy_analysis: 'The transatlantic divide on glyphosate is immense: the US EPA legal limit of 700 ppb is 7,000 times higher than the European Union\'s drinking water limit of 0.1 ppb. IARC classified glyphosate as a probable human carcinogen, prompting billions in US civil liability settlements.',
    at_home_removal_methods: [
      'Activated Carbon Filtration (dense carbon blocks achieve >95% reduction)',
      'Reverse Osmosis',
      'Ozonation and Advanced Oxidation'
    ]
  },

  // ==========================================
  // 6. AIR QUALITY & RADIONUCLIDES
  // ==========================================
  {
    id: 'chem-radon',
    chemical_name: 'Radon Gas (Rn-222) & Progeny',
    cas_number: '10043-92-2',
    chemical_category: 'Air Quality & Radionuclide',
    primary_sources: 'Radioactive decay of naturally occurring Uranium-238 and Radium-226 in subterranean granite, shale, and phosphate rock; enters homes via foundation cracks and well water',
    health_effects: 'Lung cancer (#1 cause of lung cancer among non-smokers, causing 21,000 US deaths annually), alpha-particle DNA double-strand breaks in bronchial epithelium',
    target_organs: ['Bronchial Epithelium & Pulmonary Alveoli', 'Gastric Lining (when consumed in well water)'],
    government_limits: {
      epa_mcl: 'Air: 4.0 pCi/L Action Level / Drinking Water: 300 pCi/L (proposed)',
      epa_mclg: '0 pCi/L',
      who_guideline: 'Air: 2.7 pCi/L (100 Bq/m³) Reference Level',
      eu_directive: 'Air: 8.1 pCi/L (300 Bq/m³ under Euratom Directive)',
      health_canada_mac: 'Air: 5.4 pCi/L (200 Bq/m³)',
      japan_mhlw: 'Air: No formal national limit; guidelines recommend <2.7 pCi/L',
      california_phg: 'Air: 4.0 pCi/L'
    },
    independent_standards: {
      ewg_health_guideline: '1.0 pCi/L — Residual lifetime lung cancer risk exists at any level above outdoor background (~0.4 pCi/L)',
      acgih_tlv: '4 Working Level Months (WLM) per year (occupational mining limit)',
      iarc_classification: 'Group 1 (Carcinogenic to Humans)',
      ntp_assessment: 'Known human carcinogen with linear non-threshold radiation damage.'
    },
    safety_discrepancy_analysis: 'The EPA\'s 4.0 pCi/L action level carries a 7 in 1,000 lifetime lung cancer risk for non-smokers and 62 in 1,000 for smokers. WHO recommends an action level of 2.7 pCi/L. One in every 15 American homes has radon levels above 4.0 pCi/L.',
    at_home_removal_methods: [
      'Active Soil Depressurization (ASD) sub-slab radon vent fan',
      'Granular Activated Carbon (GAC) for whole-home well water aeration (water aeration removes 99% of radon before entering plumbing)',
      'Increased crawlspace mechanical ventilation and basement sealing.'
    ]
  },
  {
    id: 'chem-pm25',
    chemical_name: 'Fine Particulate Matter (PM2.5)',
    cas_number: 'N/A (Aerosol mixture)',
    chemical_category: 'Air Quality & Radionuclide',
    primary_sources: 'Wildfire smoke conflagrations, diesel engine exhaust, coal-fired power plants, wood burning, industrial combustion',
    health_effects: 'Premature cardiovascular mortality, ischemic stroke, acute myocardial infarction, asthma exacerbations, deep lung alveolar penetration, systemic vascular inflammation',
    target_organs: ['Cardiovascular System', 'Deep Pulmonary Alveoli', 'Brain / Cognitive Decline', 'Vascular Endothelium'],
    government_limits: {
      epa_mcl: 'Annual: 9.0 µg/m³ (revised Feb 2024 from 12.0) / 24-Hour: 35.0 µg/m³',
      epa_mclg: 'N/A',
      who_guideline: 'Annual: 5.0 µg/m³ / 24-Hour: 15.0 µg/m³ (WHO Global Air Quality Guidelines 2021)',
      eu_directive: 'Annual: 10.0 µg/m³ (revising toward 5.0 µg/m³ by 2030)',
      health_canada_mac: 'Annual: 8.8 µg/m³ / 24-Hour: 27.0 µg/m³',
      japan_mhlw: 'Annual: 15.0 µg/m³ / 24-Hour: 35.0 µg/m³',
      california_phg: 'Annual: 12.0 µg/m³ (CARB standard)'
    },
    independent_standards: {
      ewg_health_guideline: '5.0 µg/m³ (matches WHO guideline for zero excess cardiovascular death)',
      acgih_tlv: '3.0 mg/m³ (respirable particles not otherwise specified)',
      iarc_classification: 'Group 1 (Carcinogenic to Humans - outdoor air pollution and PM)',
      ntp_assessment: 'Strong mechanistic evidence linking fine particles to systematic pulmonary oxidative stress.'
    },
    safety_discrepancy_analysis: 'During megafires, ambient PM2.5 levels routinely spike to 150–500+ µg/m³ (AQI 200–500 "Hazardous"). WHO recommends that 24-hour exposures not exceed 15 µg/m³.',
    at_home_removal_methods: [
      'True HEPA (H13/H14) Air Purifiers (captures 99.97% of particles down to 0.3 microns)',
      'MERV 13 to MERV 16 HVAC filters sealed with zero bypass leakage',
      'Corsi-Rosenthal DIY box fan air cleaners using four MERV 13 filters.'
    ]
  }
];

export class ChemicalSafetyEngine {
  /**
   * Search for chemical safety standards by query text
   */
  public static searchStandards(query: string): ComparativeThreshold[] {
    const q = query.toLowerCase().trim();
    if (!q) return CHEMICAL_SAFETY_STANDARDS;

    return CHEMICAL_SAFETY_STANDARDS.filter(item => {
      return (
        item.chemical_name.toLowerCase().includes(q) ||
        item.cas_number.toLowerCase().includes(q) ||
        item.chemical_category.toLowerCase().includes(q) ||
        item.health_effects.toLowerCase().includes(q) ||
        item.primary_sources.toLowerCase().includes(q) ||
        item.target_organs.some(org => org.toLowerCase().includes(q))
      );
    });
  }

  /**
   * Retrieves single threshold by ID
   */
  public static getThresholdById(id: string): ComparativeThreshold | undefined {
    return CHEMICAL_SAFETY_STANDARDS.find(item => item.id === id);
  }

  /**
   * Generates a comparative Markdown matrix comparing Government vs Independent standards
   */
  public static generateMarkdownComparison(chemical: ComparativeThreshold): string {
    return `### 🧪 CHEMICAL SAFETY PROFILE: ${chemical.chemical_name.toUpperCase()}
**CAS Registry Number:** \`${chemical.cas_number}\` | **Category:** ${chemical.chemical_category}

#### 📋 PRIMARY SOURCES & ENVIRONMENTAL EXPOSURE
${chemical.primary_sources}

#### ⚠️ PHYSIOLOGICAL HEALTH EFFECTS & TARGET ORGANS
- **Pathology:** ${chemical.health_effects}
- **Primary Target Organs:** ${chemical.target_organs.join(', ')}
- **IARC Carcinogenicity:** **${chemical.independent_standards.iarc_classification}**
- **NTP Finding:** ${chemical.independent_standards.ntp_assessment}

---

#### ⚖️ COMPARATIVE EXPOSURE THRESHOLDS: GOVERNMENT VS INDEPENDENT BODIES
| Agency / Organization | Regulatory Tier | Enforceable Limit / Benchmark | Scientific Methodology & Basis |
| :--- | :--- | :---: | :--- |
| **US EPA (Enforceable MCL)** | Federal Legal Standard | **${chemical.government_limits.epa_mcl}** | Statutory safe drinking water act standard balancing cost & feasibility |
| **US EPA Health Goal (MCLG)** | Federal Health Target | **${chemical.government_limits.epa_mclg}** | Non-enforceable aspirational health level |
| **World Health Organization (WHO)**| Global Guidance | **${chemical.government_limits.who_guideline}** | International drinking water quality guidelines |
| **European Union (EU EFSA/ECHA)** | International Precautionary | **${chemical.government_limits.eu_directive}** | EU Drinking Water Directive / REACH restrictions |
| **Health Canada** | National Standard | **${chemical.government_limits.health_canada_mac}** | Canadian maximum acceptable concentration |
| **California OEHHA (PHG)** | State Health Goal | **${chemical.government_limits.california_phg}** | Strictest US state toxicological assessment |
| **Environmental Working Group (EWG)**| **Independent Non-Biased** | **${chemical.independent_standards.ewg_health_guideline}** | Independent epidemiological cancer & neurodevelopmental benchmark |

---

#### 🔬 SCIENTIFIC DISCREPANCY ANALYSIS (LEGAL VS SAFE)
${chemical.safety_discrepancy_analysis}

#### 🛡️ CERTIFIED AT-HOME PURIFICATION & ELIMINATION PROTOCOLS
${chemical.at_home_removal_methods.map(m => `- ${m}`).join('\n')}`;
  }
}
