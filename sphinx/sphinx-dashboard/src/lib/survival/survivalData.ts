/**
 * SPHINX Tactical Survival & Lifesaving Knowledge Base
 * Complete encyclopedic reference for off-grid survival, trauma medicine,
 * foraging, toxin mitigation, equipment repair, and emergency procedures.
 */

import { GLOBAL_EXPAT_SURVIVAL_ARTICLES } from './globalExpatSurvivalData';
import { CIVIL_PREPAREDNESS_ARTICLES } from './civilPreparednessManualData';
import { CONSTITUTIONAL_ARTICLES } from './constitutionalReferenceData';

export interface SurvivalArticle {
  id: string;
  category: 'foraging' | 'medicine_firstaid' | 'toxins_cbrn' | 'water_food_recipes' | 'repair_guides' | 'offline_wikipedia' | 'civil_defense' | 'constitutional_legal';
  subcategory: string;
  title: string;
  summary: string;
  urgency: 'critical' | 'high' | 'medium' | 'standard';
  keywords: string[];
  protocols: string[];
  materials?: string[];
  warnings?: string[];
  tips?: string[];
}

export const SURVIVAL_CATEGORIES: { id: SurvivalArticle['category']; label: string; icon: string; description: string }[] = [
  { id: 'constitutional_legal', label: 'US Constitution & Law', icon: '🏛️', description: 'Original US Constitution in full (Preamble, Articles I–VII, Bill of Rights & 27 Amendments) and grid-down civic liberty defense.' },
  { id: 'civil_defense', label: 'Civil Preparedness Manual', icon: '🛡️', description: 'Comprehensive disaster readiness, food storage calculation, home defense, and urban survival.' },
  { id: 'foraging', label: 'Foraging & Wild Edibles', icon: '🌿', description: 'Wild food identification, universal edibility test, toxic lookalikes, and preparation.' },
  { id: 'medicine_firstaid', label: 'Trauma & First Aid', icon: '🩺', description: 'TCCC MARCH trauma protocol, massive hemorrhage, bone fractures, CPR, burns, and shock.' },
  { id: 'toxins_cbrn', label: 'Toxins, Radiation & Venom', icon: '☣️', description: 'Nuclear fallout 7/10 rule, chemical decontamination, snake/spider bites, and anaphylaxis.' },
  { id: 'water_food_recipes', label: 'Water, Food & Recipes', icon: '💧', description: 'Water purification, long-term food preservation, emergency baking, and authentic pemmican.' },
  { id: 'repair_guides', label: 'Field Repair Guides', icon: '🛠️', description: 'Solar/battery diagnostics, vehicle troubleshooting, small engines, comms, and weapon maintenance.' },
  { id: 'offline_wikipedia', label: 'Survival Encyclopedia', icon: '📚', description: 'Curated offline Wikipedia compendium for disaster readiness, psychology, and shelter design.' },
];

const BASE_SURVIVAL_ARTICLES: SurvivalArticle[] = [
  // ==========================================
  // 1. FORAGING & WILD EDIBLES
  // ==========================================
  {
    id: 'foraging-universal-edibility-test',
    category: 'foraging',
    subcategory: 'protocols',
    title: 'Universal Edibility Test (UET) Protocol',
    summary: 'Rigorous 7-stage military survival protocol to determine if an unknown plant is safe to consume in life-or-death famine situations.',
    urgency: 'high',
    keywords: ['edibility test', 'poison', 'famine', 'unknown plant', 'taste test', 'contact test'],
    materials: ['Fresh water', 'Clean knife or crushing stone', 'Clock/timer'],
    warnings: [
      'NEVER test mushrooms/fungi with this test. Mushroom toxins can be fatal even in microscopic quantities and take up to 72 hours to cause irreversible liver failure.',
      'Test only ONE single plant part at a time (roots, stem, leaves, flower, seed). Different parts of the same plant may have varying toxicity.',
      'Fast from food for 8 hours prior to starting test to ensure clean baseline.'
    ],
    protocols: [
      'Stage 1 (Separation): Break plant into component parts (leaves, stems, roots, buds, flowers). Test only one part.',
      'Stage 2 (Smell): Crush the part and smell it. Discard immediately if it smells of bitter almonds, peaches, or noxious sulfur.',
      'Stage 3 (Skin Contact): Rub crushed plant on tender inner wrist or inside elbow. Wait 15 minutes. If redness, itching, burning, or rash occurs, reject plant.',
      'Stage 4 (Lip Contact): If no skin reaction after 15 minutes, touch a small piece to outer lip for 3 minutes. Discard if burning or tingling.',
      'Stage 5 (Tongue Contact): Place a tiny piece on tip of tongue for 15 minutes without chewing. Do not swallow saliva. If burning, numbness, or irritation occurs, spit out.',
      'Stage 6 (Chew Test): Chew the sample thoroughly and hold in mouth for 15 minutes without swallowing. If no adverse reaction occurs, proceed.',
      'Stage 7 (Ingestion & Wait): Swallow the sample. Wait 8 full hours without eating anything else. Drink clean water. If nausea, vomiting, or stomach cramps develop, induce vomiting with copious water.',
      'Confirmation: If no symptoms occur after 8 hours, prepare and eat 1/4 cup of the exact same part cooked. Wait another 8 hours. If clean, the part is verified edible.'
    ],
    tips: [
      'Cooking plant parts by boiling frequently breaks down thermolabile toxins and sharp oxalic acid crystals.',
      'Avoid any plant with milky sap (unless positive id like dandelion), umbrella-shaped flower clusters (hemlock family), or almond scent.'
    ]
  },
  {
    id: 'foraging-toxic-lookalikes',
    category: 'foraging',
    subcategory: 'danger_identification',
    title: 'Deadly Plant Lookalikes & Lethal Alkaloids',
    summary: 'Critical morphological differentiation between life-saving wild edibles and fatal poisonous lookalikes.',
    urgency: 'critical',
    keywords: ['poison hemlock', 'wild carrot', 'death cap', 'destroying angel', 'deadly nightshade', 'false morel', 'alkaloids'],
    warnings: [
      'Poison Hemlock (Conium maculatum) contains coniine; a single leaf can cause lethal respiratory paralysis within 2-3 hours.',
      'Death Cap (Amanita phalloides) contains amatoxins; indestructible by boiling, frying, or drying.'
    ],
    protocols: [
      'Wild Carrot (Queen Anne\'s Lace) vs Poison Hemlock:',
      '  - Wild Carrot: Stems are distinctly HAIRY and green, smells like sweet garden carrot, often has a single purple/red floret in center of white umbrella.',
      '  - Poison Hemlock: Stems are completely SMOOTH (hairless) with irregular PURPLE BLOTCHES or spots; smells musty, mousy, or fetid. NEVER CONSUME.',
      'Edible Meadow Mushroom (Agaricus campestris) vs Destroying Angel (Amanita bisporigera):',
      '  - Meadow Mushroom: Gills turn pink then rich chocolate brown at maturity; no universal veil cup (volva) at base of stem.',
      '  - Destroying Angel: Gills stay PURE WHITE forever; possesses an underground sack/cup (volva) at base of bulbous stem. 100% FATAL.',
      'True Morel (Morchella) vs False Morel (Gyromitra esculenta):',
      '  - True Morel: Hollow from tip of cap to bottom of stem when sliced in half lengthwise; cap is pitted like honeycomb and fused to stem.',
      '  - False Morel: Cap is wavy, lobed like brain wrinkles, reddish-brown, chambered or solid cottony inside, contains gyromitrin (rocket fuel precursor).',
      'Wild Blueberry vs Deadly Nightshade (Atropa belladonna):',
      '  - Blueberry: Grows on multi-stem woody bush; berries grow in clusters with 5-pointed star calyx at bottom.',
      '  - Deadly Nightshade: Grows individually in leaf axils on herbaceous stalks; berries have a large 5-lobed green star-like calyx enclosing the berry from behind.'
    ],
    tips: [
      'Always dig up the base of any mushroom to inspect for an Amanita volva cup buried in soil or leaf litter.',
      'When in doubt: "Smooth stem and purple stain, poison hemlock brings the pain."'
    ]
  },
  {
    id: 'foraging-common-wild-edibles',
    category: 'foraging',
    subcategory: 'wild_edibles',
    title: 'Top 10 Abundant Wild Survival Edibles',
    summary: 'High-yield, widespread edible wild plants found across temperate, coastal, and wilderness zones.',
    urgency: 'standard',
    keywords: ['dandelion', 'stinging nettle', 'cattail', 'prickly pear', 'pine needle', 'plantain', 'acorns', 'willow'],
    protocols: [
      '1. Broadleaf Cattail (Typha latifolia) — "The Supermarket of the Swamp":',
      '  - Edible parts: Rootstocks (starch), young green shoots (raw or boiled), yellow pollen heads (high protein flour).',
      '  - Calories: 1 acre of cattails yields up to 6,000 lbs of edible starch.',
      '2. Dandelion (Taraxacum officinale):',
      '  - 100% edible: Young leaves (vitamins A, C, K), blossoms (fritters or tea), taproots (roasted for coffee substitute or boiled).',
      '3. Stinging Nettle (Urtica dioica):',
      '  - Harvest with gloves or cloth. Boil or dry leaves for 2 minutes to completely neutralize formic acid stinging hairs.',
      '  - Nutritional value: Rich in protein (25% dry weight), iron, calcium, and magnesium.',
      '4. Pine Trees (Pinus spp.):',
      '  - Inner bark (cambium layer): Scrape white/translucent rubbery layer between outer bark and wood; fry, dry into flour, or chew raw.',
      '  - Pine needles: Steep in hot water for massive Vitamin C infusion (prevents scurvy). Note: Avoid Ponderosa pine during pregnancy.',
      '5. Oak Acorns (Quercus spp.):',
      '  - Must be leached of bitter tannins before eating to avoid kidney damage.',
      '  - Leaching: Shell nuts, crush into coarse meal. Submerge in mesh bag in flowing creek for 24-48 hours, or perform 4-6 boiling water changes until bitterness is gone.',
      '6. Prickly Pear Cactus (Opuntia spp.):',
      '  - Pads (Nopales): Scorch spines and glochids off with fire; slice and sauté.',
      '  - Fruit (Tuna): Peel skin to access sweet hydration and sugars.',
      '7. Broadleaf Plantain (Plantago major):',
      '  - Leaves: Edible raw when young; older leaves boiled.',
      '  - Poultice: Chew raw leaf and apply directly to insect stings, wounds, and burns for immediate pain relief and antimicrobial aucubin action.',
      '8. Wild Garlic / Field Onion (Allium vineale):',
      '  - Must smell distinctly of onion/garlic (distinguishes from poisonous Death Camas). High in sulfur compounds, antibiotic and anti-scurvy.',
      '9. Blackberry & Raspberry Brambles (Rubus spp.):',
      '  - Berries: High fructose, immediate sugars. Young leaves: Steeped for astringent tea to arrest acute diarrhea.',
      '10. Willow Tree (Salix spp.):',
      '  - Inner bark contains salicin (precursor to aspirin). Chew thin slivers or steep in tea for pain relief, headache, and fever reduction.'
    ],
    tips: [
      'Acorn meal is rich in beneficial fats and complex carbohydrates—1 lb of dried acorn meal contains ~2,000 calories.',
      'Gather cattail pollen in early summer by shaking yellow flower heads into a ziplock bag.'
    ]
  },

  // ==========================================
  // 2. TRAUMA & FIRST AID
  // ==========================================
  {
    id: 'trauma-tccc-march-protocol',
    category: 'medicine_firstaid',
    subcategory: 'tccc_trauma',
    title: 'TCCC / MARCH Tactical Trauma Protocol',
    summary: 'The gold-standard battlefield and crisis trauma resuscitation algorithm for saving casualties in severe injuries.',
    urgency: 'critical',
    keywords: ['TCCC', 'MARCH', 'tourniquet', 'massive bleeding', 'tension pneumothorax', 'chest seal', 'hypothermia'],
    materials: ['Tourniquet (CAT or SOFTT)', 'Hemostatic combat gauze', 'Pressure bandage', 'Vented chest seal', 'Decompression needle', 'Hypothermia thermal blanket'],
    warnings: [
      'Massive arterial hemorrhage kills in under 3 minutes. Apply tourniquets immediately without removing clothing if under threat.',
      'Hypothermia causes coagulopathy (inability to clot blood). Always insulate casualties even in 90°F / 32°C ambient temperatures.'
    ],
    protocols: [
      'M — MASSIVE HEMORRHAGE (0 to 60 seconds):',
      '  1. Identify pulsing, squirting bright red blood or pooling dark blood.',
      '  2. Apply CoTCCC tourniquet HIGH & TIGHT over uniform on bleeding limb.',
      '  3. Turn windlass rod until bleeding stops and distal pulse vanishes. Lock rod into clip.',
      '  4. If bleeding continues, apply a SECOND tourniquet immediately adjacent and proximal to first.',
      '  5. Junctional Wounds (Groin/Axilla/Neck): Pack cavity tightly with hemostatic gauze. Maintain direct pressure for minimum 3 continuous minutes. Apply pressure dressing.',
      'A — AIRWAY (60 to 120 seconds):',
      '  1. Assess responsiveness. If unconscious and breathing, place in Recovery Position on side.',
      '  2. Clear mouth of blood, teeth, or vomit with finger sweep.',
      '  3. If snoring or airway compromised, insert lubricated Nasopharyngeal Airway (NPA 28Fr) into right nostril with bevel facing nasal septum.',
      'R — RESPIRATION / BREATHING:',
      '  1. Expose chest and back. Look for bullet holes, shrapnel punctures, or sucking sounds.',
      '  2. Apply vented chest seal immediately during casualty exhalation.',
      '  3. Monitor for Tension Pneumothorax: worsening dyspnea, absent breath sounds on one side, jugular vein distension, tracheal shift.',
      '  4. Needle Decompression: If trained, insert 14-gauge 3.25" catheter at 2nd intercostal space mid-clavicular line or 5th intercostal space anterior axillary line.',
      'C — CIRCULATION:',
      '  1. Reassess all tourniquets and dressings. Check radial pulse.',
      '  2. Prevent shock. Elevate legs slightly if no pelvic/head fracture.',
      'H — HYPOTHERMIA & HEAD TRAUMA:',
      '  1. Remove wet clothing. Wrap casualty in windproof vapor barrier and aluminized thermal blanket.',
      '  2. Insulate casualty from cold ground using sleeping pad, backpack, or foliage.'
    ],
    tips: [
      'Write the exact 24-hour time of tourniquet placement on the tourniquet time strap (e.g., "TK 14:32").',
      'Do NOT loosen a tourniquet in the field without surgical capability available.'
    ]
  },
  {
    id: 'trauma-fractures-splinting',
    category: 'medicine_firstaid',
    subcategory: 'orthopedics',
    title: 'Fractures, Dislocations & Field Splinting',
    summary: 'Assessment, immobilization, and reduction protocols for closed and compound bone fractures in isolated environments.',
    urgency: 'high',
    keywords: ['broken bone', 'fracture', 'splint', 'SAM splint', 'compound fracture', 'traction', 'dislocation'],
    materials: ['SAM splint or rigid branches', 'Ace wrap or duct tape', 'Sterile saline / boiled water', 'Gauze'],
    warnings: [
      'Compound (Open) Fracture: Bone protruding through skin. DO NOT push bone ends back inside wound without extensive irrigation.',
      'Always check CMS (Circulation, Motor, Sensory) distal to the injury BEFORE and AFTER applying any splint.'
    ],
    protocols: [
      '1. Initial CMS Assessment:',
      '  - Circulation: Palpate distal pulse (radial pulse for wrist/arm, dorsalis pedis for ankle/leg). Check capillary refill (<2 seconds).',
      '  - Motor: Ask patient to wiggle fingers or toes.',
      '  - Sensory: Touch patient\'s toe/finger and ask which digit they feel.',
      '2. Open (Compound) Fracture Management:',
      '  - Irrigate wound copiously with clean drinking water to wash away debris.',
      '  - Cover protruding bone and laceration with sterile saline-moistened gauze.',
      '  - Never force exposed contaminated bone into tissue.',
      '3. Splint Configuration (SAM Splint / Rigid Material):',
      '  - Bend SAM splint into a "C-Curve" along length to create structural rigidity (a flat aluminum foam sheet has zero strength; curved it supports 20+ lbs).',
      '  - Immobilize the JOINT ABOVE and the JOINT BELOW the suspected fracture.',
      '  - Forearm/Wrist: Sugar-tong splint running from knuckles around elbow back to wrist.',
      '  - Lower Leg/Tibia: U-splint running under heel and up medial and lateral calf.',
      '4. Securing & Padding:',
      '  - Pad all bony prominences (malleoli, elbow, wrist bones) with cloth to prevent pressure necrosis.',
      '  - Wrap snugly with elastic bandage or strips of cloth. Do not constrict circulation.',
      '5. Post-Splint CMS Check:',
      '  - Re-verify pulse and sensation. If pulse is lost after splinting, loosen wrap immediately.'
    ],
    tips: [
      'Improvised splints: Enclose injured limb in rolled magazines, tree bark, trekking poles, or padded rifle stock.',
      'Anatomical Splinting: Tape an injured broken toe or finger to its adjacent healthy neighbor ("buddy taping").'
    ]
  },
  {
    id: 'trauma-cpr-choking-burns',
    category: 'medicine_firstaid',
    subcategory: 'life_support',
    title: 'CPR, Choking Relief & Burn Management',
    summary: 'Critical resuscitation procedures for cardiac arrest, foreign body airway obstruction, and severe burn injuries.',
    urgency: 'critical',
    keywords: ['CPR', 'Heimlich', 'choking', 'burns', 'Rule of Nines', 'resuscitation', 'airway'],
    protocols: [
      'ADULT CPR PROTOCOL:',
      '  1. Check responsiveness and carotid pulse for no more than 10 seconds.',
      '  2. If absent, place heel of hand in center of chest on lower half of sternum.',
      '  3. Deliver compressions at 100-120 BPM (to beat of "Stayin\' Alive").',
      '  4. Depth: At least 2 inches (5 cm). Allow full chest recoil after each pump.',
      '  5. Compression-to-Breath Ratio: 30 compressions followed by 2 quick rescue breaths (1 sec each). If no barrier, perform Continuous Hands-Only CPR.',
      'CHOKING RELIEF (HEIMLICH MANEUVER):',
      '  1. Confirm victim cannot speak, cough, or breathe (universal hands-on-throat sign).',
      '  2. Stand behind victim. Make a fist with thumb side against abdomen, slightly above navel and well below xiphoid process.',
      '  3. Grasp fist with other hand and deliver quick, forceful inward and upward thrusts until object is expelled.',
      '  4. If victim becomes unconscious: Lower to floor, call for aid, begin 30 chest compressions, check mouth before giving breaths.',
      'BURN MANAGEMENT (THERMAL & CHEMICAL):',
      '  1. Stop Burning Process: Smother flames, remove from heat source. For chemical burns, brush off dry chemicals then flush with clean water for 20 minutes.',
      '  2. DO NOT apply butter, grease, ice, or toothpaste (traps heat and causes infection).',
      '  3. Rule of Nines Assessment:',
      '     - Head: 9% | Each Arm: 9% | Chest: 9% | Abdomen: 9% | Upper Back: 9% | Lower Back: 9% | Each Leg: 18% | Groin: 1%.',
      '  4. Dressing: Cover with clean, dry, non-adherent sterile dressing or clean plastic food wrap.',
      '  5. Fluid Replacement: For burns >20% BSA, administer oral rehydration fluids if conscious (1/2 tsp salt + 6 tsp sugar in 1L water).'
    ],
    tips: [
      'Never pop burn blisters; the intact skin blister is sterile biological protection against infection.',
      'Keep burn patients warm; loss of epidermis causes severe rapid hypothermia.'
    ]
  },

  // ==========================================
  // 3. TOXINS, RADIATION & CBRN
  // ==========================================
  {
    id: 'cbrn-nuclear-fallout-7-10-rule',
    category: 'toxins_cbrn',
    subcategory: 'radiation',
    title: 'Nuclear Fallout Physics, KI Dosing & 7/10 Decay Rule',
    summary: 'Mathematical models of ionizing fallout decay, shielding calculations, and potassium iodide thyroid prophylaxis.',
    urgency: 'critical',
    keywords: ['nuclear', 'fallout', 'radiation', '7/10 rule', 'potassium iodide', 'KI', 'gamma rays', 'halving thickness'],
    materials: ['Potassium Iodide (KI tablets)', 'HEPA mask / N95', 'Duct tape', 'Rain poncho'],
    warnings: [
      'Potassium Iodide ONLY protects thyroid gland against radioactive iodine (I-131). It does NOT protect against external gamma rays, cesium, or strontium.',
      'Take KI ONLY upon official notification or when radioactive plume is imminent. Premature or prolonged intake causes thyroiditis.'
    ],
    protocols: [
      'THE 7/10 RULE OF RADIATION DECAY:',
      '  Formula: For every 7-fold increase in time after nuclear detonation, radiation dose rate drops by a factor of 10.',
      '  - Detonation Hour H+1: Base rate = 1,000 R/hr (Lethal in 20 minutes outside).',
      '  - Hour H+7 (7 hours later): Rate = 100 R/hr (10x reduction).',
      '  - Hour H+49 (~2 days later): Rate = 10 R/hr (100x reduction).',
      '  - Hour H+343 (~2 weeks later): Rate = 1 R/hr (1,000x reduction — safe for brief relocation).',
      'POTASSIUM IODIDE (KI) DOSAGE MATRIX (Once Every 24 Hours):',
      '  - Adults & pregnant/nursing: 130 mg (one full tablet).',
      '  - Children (3 to 18 years, over 150 lbs): 130 mg.',
      '  - Children (3 to 18 years, under 150 lbs): 65 mg (half tablet).',
      '  - Infants (1 month to 3 years): 32 mg (quarter tablet).',
      '  - Neonates (birth to 1 month): 16 mg (crushed in 5mL breast milk or formula).',
      'SHELTER SHIELDING (HALVING THICKNESS — Material to cut Gamma by 50%):',
      '  - Lead: 1.0 cm (0.4 inches)',
      '  - Steel / Iron: 2.5 cm (1.0 inch)',
      '  - Solid Concrete / Masonry: 6.0 cm (2.4 inches)',
      '  - Compacted Earth / Sand: 9.1 cm (3.6 inches)',
      '  - Water: 18.0 cm (7.2 inches)',
      '  - Solid Wood: 28.0 cm (11.0 inches)',
      'Rule of Thumb: 10 halving thicknesses (e.g., 36 inches of dirt or 24 inches of concrete) cuts radiation by 1,024x.',
      'FALLOUT DECONTAMINATION PROTOCOL:',
      '  1. Strip outer clothing outside living area (removes 90% of radioactive particles).',
      '  2. Seal contaminated clothes in plastic contractor bag.',
      '  3. Wash hair and body with warm water and soap. DO NOT SCRUB harshly (prevents particle entry into pores).',
      '  4. DO NOT USE CONDITIONER (binds radioactive isotopes to hair proteins).'
    ],
    tips: [
      'Best shelter location: Central basement below grade with packed earth or concrete floors above.',
      'Improvised shielding: Stack heavy bookcases, filing cabinets, sandbags, and water jugs against exterior walls.'
    ]
  },
  {
    id: 'cbrn-chemical-biological-toxins',
    category: 'toxins_cbrn',
    subcategory: 'chemical_weapons',
    title: 'Chemical Agents, Pesticides & Nerve Agent Resuscitation',
    summary: 'Clinical triage and antidote administration for organophosphate pesticides, nerve agents, blister agents, and industrial chemical leaks.',
    urgency: 'critical',
    keywords: ['nerve agent', 'sarin', 'vx', 'organophosphate', 'atropine', '2-PAM', 'mustard gas', 'cyanide'],
    warnings: [
      'SLUDGEM Symptoms of Nerve Agent / Pesticide Poisoning: Salivation, Lacrimation, Urination, Defecation, GI cramping, Emesis, Miosis (pinpoint pupils).',
      'Rescuers must wear charcoal-filtered CBRN mask and butyl gloves before touching casualty to avoid secondary poisoning.'
    ],
    protocols: [
      '1. SLUDGEM / Cholinergic Triage:',
      '  - Mild: Runny nose, tight chest, pinpoint pupils.',
      '  - Severe: Violent convulsions, frothing at mouth, involuntary defecation, respiratory failure.',
      '2. Antidote Auto-Injector Protocol (Mark I NAAK / ATNAA):',
      '  - ATROPINE (2mg): Blocks excess acetylcholine at muscarinic receptors. Administer IM into outer mid-thigh. Repeat every 5-10 minutes until secretions dry and lungs are clear.',
      '  - PRALIDOXIME CHLORIDE (2-PAM Cl, 600mg): Reactivates acetylcholinesterase before irreversible "aging" occurs. Administer IM alongside atropine.',
      '3. Blister Agents (Sulfur Mustard / Lewisite):',
      '  - Immediate skin burning, erythema, large fluid-filled blisters within 4-12 hours.',
      '  - Decontamination: Blot skin with 0.5% sodium hypochlorite (diluted household bleach 1:10) or dry reactive absorbent powder (Fuller\'s earth, baking soda, flour). Wash with copious soap and water.',
      '4. Cyanide Gas / Blood Agents:',
      '  - Bitter almond odor; rapid gasping convulsions despite pink/flushed skin (cellular hypoxia).',
      '  - Antidote: Hydroxocobalamin (Cyanokit 5g IV) or Amyl Nitrite ampules crushed under breathing mask.'
    ],
    tips: [
      'Industrial agricultural pesticides (malathion, chlorpyrifos) share the identical toxic mechanism as military sarin and VX.',
      'Move upwind and uphill immediately away from chemical spills; chemical vapors are heavier than air and pool in basements and ditches.'
    ]
  },
  {
    id: 'toxins-snake-spider-insect-bites',
    category: 'toxins_cbrn',
    subcategory: 'venom',
    title: 'Venomous Snake, Spider & Insect Envenomation',
    summary: 'Evidence-based wilderness medicine protocol for rattlesnake bites, widow spiders, recluses, and anaphylactic stings.',
    urgency: 'critical',
    keywords: ['snake bite', 'rattlesnake', 'black widow', 'brown recluse', 'antivenom', 'spider bite', 'anaphylaxis', 'epipen'],
    materials: ['EpiPen (Epinephrine 0.3mg)', 'Permanent marker', 'Clean gauze', 'Splint'],
    warnings: [
      'DO NOT cut the wound with a razor or try to suck out venom (mouth bacteria causes severe infection and tissue necrosis).',
      'DO NOT apply a tourniquet or constricting band for Pit Viper bites (causes massive localized tissue ischemia and amputation).',
      'DO NOT apply ice packs directly to venomous snakebites.'
    ],
    protocols: [
      'PIT VIPER BITES (Rattlesnake, Copperhead, Cottonmouth):',
      '  1. Move out of striking distance (snakes strike up to 1/2 their body length).',
      '  2. Keep patient calm and completely still. Elevated heart rate accelerates venom spread through lymphatics.',
      '  3. Remove all rings, watches, bracelets, and tight clothing from bitten limb before swelling starts.',
      '  4. Immobilize limb in splint AT OR SLIGHTLY BELOW HEART LEVEL.',
      '  5. Trace the leading edge of swelling with a permanent marker and write the exact time next to the line (e.g., "14:15"). Re-trace every 15-30 minutes to track venom progression.',
      '  6. Transport immediately to definitive medical care for CroFab / antivenom infusion.',
      'CORAL SNAKE BITES (Neurotoxic):',
      '  - "Red on yellow kills a fellow, red on black venom lack" (North American mnemonic).',
      '  - Apply a broad compression bandage over bite site up the limb and splint; monitor breathing continuously.',
      'BROWN RECLUSE (Violin Spider):',
      '  - "Bullseye" lesion: central blister, white ischemic ring, red erythema. Followed by necrotic ulceration.',
      '  - Protocol: RICE (Rest, Ice intermittently, Compression, Elevation). Clean with antiseptic. Antibiotics for secondary infection.',
      'BLACK WIDOW (Hourglass):',
      '  - Potent neurotoxin (alpha-latrotoxin). Severe abdominal board-like rigidity, muscle cramping, hypertension.',
      '  - Treatment: Clean site, ice pack, calcium gluconate/muscle relaxants, hospital transport for severe cases.',
      'ANAPHYLACTIC SHOCK FROM INSECT STINGS (Bees / Wasps):',
      '  1. Look for wheezing, facial swelling, hives, stridor, dizziness.',
      '  2. Inject EPINEPHRINE (0.3mg adult, 0.15mg child) IM into anterolateral mid-thigh. Hold firmly for 3-5 seconds.',
      '  3. If no improvement within 5-15 minutes, administer second EpiPen dose.'
    ],
    tips: [
      '25% of all pit viper defensive strikes are "dry bites" where no venom is injected. Lack of swelling and pain within 60 minutes indicates probable dry bite.',
      'If stung by a honeybee, scrape stinger away sideways with a credit card or fingernail; do not pinch venom sac.'
    ]
  },

  // ==========================================
  // 4. WATER, FOOD STORAGE & RECIPES
  // ==========================================
  {
    id: 'survival-water-purification-standards',
    category: 'water_food_recipes',
    subcategory: 'water_purification',
    title: 'Water Purification & Chemical Disinfection Standards',
    summary: 'Definitive methods to eliminate waterborne pathogens (protozoa, bacteria, viruses) and chemical toxins in grid-down conditions.',
    urgency: 'high',
    keywords: ['water filter', 'bleach disinfection', 'boiling', 'iodine', 'SODIS', 'giardia', 'cryptosporidium', 'chlorine'],
    materials: ['Unscented household bleach (5-6% sodium hypochlorite)', 'Camping stove / pot', '0.1-micron hollow fiber filter', 'PET clear plastic bottles'],
    protocols: [
      'METHOD 1: THERMAL BOILING (Gold Standard):',
      '  - Sea level to 2,000m (6,500ft): Bring to rolling, turbulent boil for 1 full minute.',
      '  - Elevations above 2,000m: Boil vigorously for 3 full minutes (lower boiling point at altitude requires longer thermal dwell time).',
      '  - Kills 100% of protozoa, cysts (Giardia, Cryptosporidium), bacteria, and enteric viruses.',
      'METHOD 2: HOUSEHOLD LIQUID BLEACH (Sodium Hypochlorite 5-6%):',
      '  - MUST use unscented, non-color-safe, pure liquid bleach without detergents.',
      '  - Clear Water: Add 2 drops per 1 liter (or 8 drops per gallon / 2 drops per quart).',
      '  - Cloudy/Turbid Water: Filter through cloth first, then add 4 drops per 1 liter (16 drops per gallon).',
      '  - Stir well and let stand for 30 MINUTES before drinking. Should have faint chlorine scent. If no chlorine scent, repeat dose and wait another 15 minutes.',
      'METHOD 3: 2% TINCTURE OF IODINE:',
      '  - Clear water: Add 5 drops per liter. Turbid water: Add 10 drops per liter. Let stand 30 minutes (60 minutes if water is freezing cold).',
      'METHOD 4: SODIS (Solar Water Disinfection):',
      '  - Fill clear PET plastic bottles (under 2 liters). Shake for 20 seconds to oxygenate.',
      '  - Lay horizontally on a reflective surface (aluminum foil, metal corrugated roof) in direct sunlight.',
      '  - Sunlight exposure: 6 hours in full bright sun (or 2 full days if 50% overcast). UV-A rays and solar thermal pasteurization destroy 99.9% of bacteria/viruses.',
      'METHOD 5: MULTI-LAYER CHARCOAL BIOFILTER (Pre-Filter):',
      '  - In an inverted plastic bottle or hollow bamboo with pierced cap: Layer cotton cloth -> 3 inches crushed charcoal -> 3 inches clean sand -> 2 inches coarse gravel.',
      '  - Removes sediment, particulates, and chemical odors. MUST BE BOILED OR CHLORINATED AFTERWARD.'
    ],
    tips: [
      'Standard portable hiking filters (Sawyer Squeeze, LifeStraw) remove bacteria and protozoa down to 0.1 micron, but DO NOT remove waterborne viruses (Hepatitis A, Norovirus) or chemical pesticides.',
      'To improve the flat taste of boiled water, pour it back and forth between two clean containers to re-aerate.'
    ]
  },
  {
    id: 'survival-long-term-food-storage',
    category: 'water_food_recipes',
    subcategory: 'food_preservation',
    title: 'Long-Term Dry Food Storage & Mylar Calculations',
    summary: 'Preserving grains, legumes, and caloric staples for 20-30 years using food-grade buckets, Mylar, and oxygen absorbers.',
    urgency: 'medium',
    keywords: ['mylar bags', 'oxygen absorbers', 'food storage', 'shelf life', 'rice and beans', 'diatomaceous earth'],
    materials: ['7-mil Mylar bags', 'Oxygen absorbers (300cc - 2000cc)', 'Food-grade 5-gallon buckets', 'Hair straightener or household iron'],
    protocols: [
      '1. CORE STAPLES & CALORIC YIELDS (Per Adult / 1 Year Survival):',
      '  - White Rice: 300 lbs (~480,000 kcal). Store white rice only; brown rice has oils that turn rancid within 12 months.',
      '  - Dried Beans (Pinto, Black, Kidney): 60 lbs (~95,000 kcal).',
      '  - Hard Red/White Wheat Berries: 150 lbs (~230,000 kcal). Can be sprouted or ground into flour.',
      '  - Rolled Oats: 40 lbs (~70,000 kcal).',
      '  - Iodized Salt: 10 lbs (infinite shelf life; crucial for metabolic sodium-potassium pump).',
      '  - Pure Raw Honey / White Sugar: 30 lbs (infinite shelf life; high energy).',
      '2. OXYGEN ABSORBER (O2) CAPACITY CALCULATION:',
      '  - Air is 21% oxygen. To prevent insect larvae hatching and lipid oxidation, oxygen must drop <0.1%.',
      '  - 1-Gallon Mylar Bag: Use one 300cc or 500cc absorber.',
      '  - 5-Gallon Mylar Bag (Dense foods like rice/wheat): Use 1,500cc to 2,000cc total O2 absorption.',
      '  - 5-Gallon Mylar Bag (Light/airy foods like pasta/flour): Use 2,000cc to 2,500cc total O2 absorption.',
      '3. PACKING & SEALING PROCESS:',
      '  - Place Mylar bag inside 5-gallon food-grade bucket.',
      '  - Pour grain to within 2 inches of top.',
      '  - Drop in O2 absorbers from freshly opened sealed pouch.',
      '  - Seal top of Mylar using hair straightener or hot clothes iron set to high (wool/cotton setting) along a 1-inch width.',
      '  - Push out excess air before final 2 inches of seal. Complete seal.',
      '  - Within 24-48 hours, the bag will pull tight like a brick (vacuum effect as O2 is absorbed).',
      '  - Snap tight rubber-gasket bucket lid to protect against rodents and light.'
    ],
    tips: [
      'NEVER put oxygen absorbers in white sugar or salt! Removing oxygen turns sugar and salt into solid concrete blocks.',
      'Add 1/4 cup of Food-Grade Diatomaceous Earth (DE) per 5-gallon bucket of grain to mechanically kill any weevils or insects without chemicals.'
    ]
  },
  {
    id: 'survival-emergency-recipes-pemmican',
    category: 'water_food_recipes',
    subcategory: 'survival_cooking',
    title: 'Authentic Pemmican, Hardtack & High-Calorie Survival Recipes',
    summary: 'Historical and tactical survival food recipes yielding unmatched caloric density and decade-long preservation.',
    urgency: 'standard',
    keywords: ['pemmican', 'hardtack', 'ash cakes', 'survival recipes', 'bannock', 'tallow', 'bone broth'],
    materials: ['Lean beef, bison, or venison', 'Rendered beef tallow (suet fat)', 'Dried tart berries', 'Flour', 'Salt'],
    protocols: [
      'RECIPE 1: AUTHENTIC NATIVE AMERICAN PEMMICAN (50-Year Shelf Life):',
      '  - Ratio by weight: 50% dried powdered lean meat, 50% rendered beef tallow (fat).',
      '  - Caloric Density: ~3,500 kcal per pound (highest energy-to-weight ratio in human history).',
      '  - Step 1: Slice lean meat wafer-thin. Dehydrate completely until brittle like glass (no moisture remaining).',
      '  - Step 2: Grind or pound dried meat into fine fluffy powder using blender or stone mortar.',
      '  - Step 3: Render beef kidney suet on low heat until golden clear liquid; strain through cheesecloth.',
      '  - Step 4: Add optional crushed dried blueberries/cranberries (must be bone dry).',
      '  - Step 5: Pour warm liquid tallow over powdered meat, mixing thoroughly into stiff paste.',
      '  - Step 6: Press firmly into muffin tins or bars. Allow to solidify. Wrap in wax paper. Keeps indefinitely at room temperature.',
      'RECIPE 2: SHIPBOARD SURVIVAL HARDTACK (The Indestructible Ration):',
      '  - Ingredients: 5 cups unbleached flour, 2 cups water, 1 tablespoon salt.',
      '  - Step 1: Mix flour and salt, add water gradually until non-sticky stiff dough forms.',
      '  - Step 2: Roll out dough to 1/2-inch thickness on floured board.',
      '  - Step 3: Cut into 3x3 inch squares. Using a skewer or fork, punch 16 uniform holes through each cracker.',
      '  - Step 4: Bake at 250°F (120°C) for 2 hours. Flip squares and bake another 2 hours until rock hard and completely dry.',
      '  - Eating Hardtack: Do not bite directly (breaks teeth!). Soak in coffee, broth, or stew for 10 minutes to soften.',
      'RECIPE 3: CAMPFIRE BANNOCK / ASH CAKES:',
      '  - Ingredients: 1 cup flour, 1 tsp baking powder, 1/4 tsp salt, 1 tbsp oil/lard, water.',
      '  - Mix into ball. Flatten and cook on hot flat river rock or clean hardwood coals for 5-7 minutes per side.',
      'RECIPE 4: MINERAL BONE MARROW BROTH:',
      '  - Crack open large animal marrow bones. Simmer in water with 1 tbsp vinegar/acid for 12-24 hours.',
      '  - Extracts dense calcium, collagen, glucosamine, magnesium, and essential amino acids.'
    ],
    tips: [
      'Never use pork fat or un-rendered muscle fat for pemmican; only hard tallow/suet will solidify properly without going rancid.',
      'Two small bars of pemmican provide sufficient calories, protein, and fat to sustain an active adult through harsh winter travel.'
    ]
  },

  // ==========================================
  // 5. FIELD REPAIR GUIDES
  // ==========================================
  {
    id: 'repair-solar-batteries-inverters',
    category: 'repair_guides',
    subcategory: 'electronics_power',
    title: 'Off-Grid Solar, LiFePO4 / Lead-Acid Battery & Inverter Repairs',
    summary: 'Systematic troubleshooting and emergency field restoration of solar PV arrays, charge controllers, and battery banks.',
    urgency: 'high',
    keywords: ['solar panels', 'inverter repair', 'lifepo4 bms', 'battery desulfation', 'mppt', 'multimeter', 'off-grid'],
    materials: ['Digital Multimeter', 'Wire strippers', 'Electrical tape / heat shrink', 'Jumper cables', '12V incandescent bulb'],
    protocols: [
      '1. SOLAR ARRAY ELECTRICAL FAULT ISOLATION:',
      '  - Measure Open Circuit Voltage (Voc): Disconnect panel wires from charge controller. Measure DC voltage with multimeter. Should match panel label within 10%.',
      '  - Low or Zero Volts: Inspect bypass diodes inside junction box on back of panel. A shorted bypass diode can drop voltage to zero.',
      '  - Series vs Parallel Troubleshooting: In series (daisy chain), one shaded or damaged cell kills the entire string voltage. In parallel, check individual MC4 branch connectors for corrosion.',
      '2. LiFePO4 BATTERY BMS LOW-VOLTAGE "SLEEP" WAKEUP:',
      '  - Modern LiFePO4 batteries shut down their internal Battery Management System (BMS) if cell voltage drops below ~10.0V (displays 0.0V on multimeter).',
      '  - Wakeup Protocol: Connect a working 12V lead-acid battery or another LiFePO4 in parallel with jumper cables for 3-5 minutes. The voltage surge resets the BMS transistor gate.',
      '  - Alternatively: Use a smart solar MPPT controller with "Lithium 0V Wakeup" function.',
      '3. LEAD-ACID BATTERY DESULFATION (Recovery of Dead Deep-Cycle Battery):',
      '  - Chronic undercharging causes lead sulfate crystals on plates.',
      '  - Emergency Pulse Desulfation: Charge at 15.5V - 16.0V on a controlled manual charger for 2-4 hours while monitoring temperature (<120°F / 49°C). Top off electrolyte with distilled water only.',
      '4. INVERTER OVERLOAD & FAULT CLEARING:',
      '  - Error E04 / Overload: Disconnect all AC output loads. Disconnect DC input terminals for 60 seconds to discharge internal capacitors.',
      '  - Inspect input DC fuse (automotive spade or ANL fuse inside chassis).',
      '  - Voltage Drop Test: If inverter alarms under load, measure DC voltage at inverter terminals. If voltage drops below 10.5V while battery is full, terminal cables are loose or undersized.'
    ],
    tips: [
      'Always connect Battery to MPPT controller FIRST before connecting solar panels, otherwise controller microprocessor may burn out.',
      'Clean corroded battery terminals with baking soda mixed in water to neutralize sulfuric acid.'
    ]
  },
  {
    id: 'repair-vehicles-engines-triage',
    category: 'repair_guides',
    subcategory: 'vehicles_engines',
    title: 'Vehicle No-Start 5-Point Triage & Emergency Field Fixes',
    summary: 'Universal diagnostic decision tree for combustion engines, roadside tire repair, and emergency coolant bypass.',
    urgency: 'high',
    keywords: ['vehicle repair', 'no start', 'starter motor', 'tire plug', 'radiator leak', 'alternator', 'push start', 'siphon fuel'],
    materials: ['Tire plug kit & 12V compressor', 'Socket set & screwdrivers', 'Jumper cables', 'Black pepper / raw egg', 'Duct tape & wire'],
    protocols: [
      '5-POINT NO-START DIAGNOSTIC TREE (Fuel, Air, Spark, Compression, Electrical):',
      '  1. Electrical: Turn key. Do lights dim? Rapid clicks = weak battery or loose terminal clamp. Single heavy click = seized starter or dead solenoid.',
      '     - Emergency Fix: Tap starter motor casing with wrench while assistant turns key.',
      '  2. Engine Cranks Normal But Won\'t Catch:',
      '     - Spark Check: Pull spark plug wire, place 1/4 inch from metal engine block. Crank engine. Blue/white snap = good spark. Yellow or no spark = ignition coil or crank sensor.',
      '     - Fuel Check: Listen for 2-second electric fuel pump hum in gas tank when ignition turns to "ON". Spray 2-second blast of carburetor cleaner/starting fluid into air intake. If engine stumbles to life for 2 seconds, issue is 100% fuel starvation (clogged fuel filter, blown pump fuse, dead pump).',
      '3. MANUAL TRANSMISSION PUSH-START (Bump Start):',
      '  - Turn ignition to "ON". Depress clutch pedal. Shift transmission into 2nd gear (NOT 1st gear to prevent sudden wheel lockup).',
      '  - Have passengers or downhill roll vehicle to 5-10 MPH.',
      '  - Quickly release (pop) clutch pedal while giving slight throttle. Engine will spin and catch instantly. Immediately depress clutch to idle.',
      '4. EMERGENCY TIRE PLUGGING & BEAD RE-SEATING:',
      '  - Ream puncture with rasp tool. Insert vulcanized rubber strip in needle tool, coat in rubber cement. Push 2/3 into tire, pull needle straight out.',
      '  - Blown Bead Emergency (Tire dislodged from rim): Wrap heavy ratchet strap around tire circumference. Ratchet down until tire sidewall spreads and touches rim. Inflate with compressor until "pop" sounds, then immediately release ratchet strap.',
      '5. EMERGENCY RADIATOR LEAK FIX:',
      '  - Small radiator puncture: Allow engine to cool completely. Open radiator cap. Pour 2 tablespoons of ground black pepper or crack 2 raw egg whites directly into coolant.',
      '  - As coolant heats and circulates, particles coagulate at the puncture hole from differential pressure, sealing leaks up to 1/16 inch for hundreds of miles.'
    ],
    tips: [
      'To siphon fuel without swallowing gas: Use clear vinyl tubing with an improvised hand bulb pump or insert hose and create vacuum with an airtight cloth seal.',
      'If alternator fails while driving: Turn off all headlights, radio, heater blower, and wipers. A good battery can power fuel injection for 30-45 minutes.'
    ]
  },
  {
    id: 'repair-generators-chainsaws-pumps',
    category: 'repair_guides',
    subcategory: 'small_engines',
    title: 'Generators, Chainsaws & Water Pump Field Maintenance',
    summary: 'Restoring gummed carburetors, recoil pull cords, chainsaw sharpening, and pump impeller priming.',
    urgency: 'medium',
    keywords: ['generator', 'carburetor', 'chainsaw', 'water pump', '2-stroke', 'spark plug gap', 'recoil cord'],
    materials: ['Carburetor cleaner', 'Spark plug wrench & feeler gauge', 'Chainsaw round file (5/32" or 7/32")', 'Paracord (for pull start)'],
    protocols: [
      '1. GENERATOR GUMMED CARBURETOR FIELD RESUSCITATION:',
      '  - Symptom: Engine runs only on choke, surges up and down ("hunting"), or dies when choke opens.',
      '  - Cause: Old fuel evaporates, leaving sticky varnish clogging the microscopic pilot jet (idle jet).',
      '  - Fix: Turn off fuel valve. Remove 10mm bolt on bottom of carburetor float bowl. Drain bad fuel.',
      '  - Unscrew center brass main jet nozzle. Use a single fine copper wire strand from an electrical wire to poke clean the tiny orifices. Spray brake/carb cleaner through passages. Reassemble.',
      '2. BROKEN RECOIL STARTER CORD FIX:',
      '  - Unbolt recoil shroud. Carefully release spring tension (caution: coil spring can snap out).',
      '  - Thread 4mm paracord or nylon rope through reel pulley and knot securely. Wind reel counter-clockwise against spring tension 4 turns, thread through handle, and release slowly.',
      '3. TWO-STROKE FLOODED ENGINE CLEARING (Chainsaw / Blower):',
      '  - Strong gasoline smell from muffler.',
      '  - Turn switch to "OFF", set choke to RUN (off). Remove spark plug.',
      '  - Invert tool and pull starter rope 15 times rapidly to blow atomized liquid fuel out of cylinder.',
      '  - Dry or torch spark plug clean with lighter. Gap plug to 0.025" (0.6mm). Re-install and start with throttle locked open.',
      '4. CHAINSAW CHAIN SHARPENING ANGLES:',
      '  - Use correct round file size (e.g., 5/32" for low-profile 3/8" chain; 7/32" for .404 chain).',
      '  - File at consistent 30-degree angle to guide bar, pushing file forward only (never backward). Keep 20% of file diameter above top plate.',
      '  - File all cutters equally (typically 3-4 smooth strokes per tooth).',
      '5. CENTRIFUGAL WATER PUMP PRIMING & AIRLOCK CLEARANCE:',
      '  - Centrifugal pumps cannot pump air. If impeller spins dry, pump will never draw water.',
      '  - Unscrew top priming plug. Fill entire pump chamber with water until overflowing.',
      '  - Verify intake foot valve at bottom of suction hose holds water without leaking back.'
    ],
    tips: [
      'Two-stroke fuel mix ratio: 50:1 = 2.6 oz (77 mL) oil per 1 gallon gas. Running pure gas in a 2-stroke engine destroys piston rings in under 60 seconds.',
      'Never store gasoline without fuel stabilizer for more than 90 days.'
    ]
  },
  {
    id: 'repair-weapons-tactical-gear',
    category: 'repair_guides',
    subcategory: 'tactical_weapons',
    title: 'Firearms Maintenance, Jam Clearing & Knife Sharpening',
    summary: 'Malfunction clearance algorithms (Type 1, 2, 3), carbon scraping, lubrication points, and whetstone sharpening.',
    urgency: 'high',
    keywords: ['firearms', 'jam clearing', 'tap rack bang', 'double feed', 'stovepipe', 'knife sharpening', 'clp', 'bowstring'],
    materials: ['CLP (Cleaner, Lubricant, Preservative)', 'Bore snake or cleaning rod', 'River whetstone or ceramic rod', 'Beeswax'],
    warnings: [
      'Treat every firearm as loaded at all times. Keep muzzle pointed in a safe direction and finger off trigger until ready to shoot.',
      'Hangfire Caution: If gun clicks but fails to fire, hold pointed downrange for 30 seconds before cycling action to prevent delayed propellant explosion.'
    ],
    protocols: [
      '1. IMMEDIATE ACTION DRILL: TYPE 1 MALFUNCTION (Failure to Fire / Click):',
      '  - Cause: Bad primer, empty chamber, unseated magazine.',
      '  - Action: TAP - RACK - BANG.',
      '    1. TAP bottom of magazine firmly with palm to seat it.',
      '    2. RACK charging handle / slide vigorously to rear and release cleanly (do not ride slide forward).',
      '    3. Re-acquire target and squeeze trigger.',
      '2. REMEDIAL ACTION: TYPE 2 MALFUNCTION (Stovepipe):',
      '  - Cause: Spent casing caught horizontally in ejection port.',
      '  - Action: Sweep support hand over top of slide/action rearward to wipe casing free, or rack slide firmly.',
      '3. COMPLEX MALFUNCTION: TYPE 3 (Double Feed / Failure to Extract):',
      '  - Cause: Spent case stuck in chamber while bolt tries to chamber a fresh round from magazine.',
      '  - Action: LOCK - RIP - WORK - RACK.',
      '    1. Lock slide/bolt back to rear.',
      '    2. RIP out magazine forcefully (may require thumb release and firm yank).',
      '    3. WORK charging handle back and forth 3 times vigorously to dislodge stuck case.',
      '    4. Insert fresh magazine, rack slide to chamber round, resume engagement.',
      '4. EMERGENCY FIELD LUBRICATION:',
      '  - Use CLP, motor oil (5W-30), synthetic transmission fluid, or mineral oil in emergency.',
      '  - Lube critical friction points: Slide rails, bolt carrier friction rails, locking lugs, and hammer sear face.',
      '  - Keep chamber and bore dry (excess oil in barrel causes dangerous hydraulic pressure spikes).',
      '5. FIELD KNIFE RE-PROFILING & SHARPENING:',
      '  - Find a smooth, flat river pebble (slate, fine sandstone, or quartz).',
      '  - Lubricate stone with clean water or spit (never dry).',
      '  - Hold blade at constant 20-degree angle (match factory bevel).',
      '  - Stroke edge against stone as if slicing a thin layer off the stone, alternating sides every 5 strokes until burr forms.'
    ],
    tips: [
      'Strop a finished knife edge on the back of a leather belt or cardboard coated in ash to achieve razor-sharp shaving edge.',
      'Condition bowstrings with pure beeswax rubbed vigorously with fingers until friction melts wax into cordage core.'
    ]
  },

  // ==========================================
  // 6. OFFLINE WIKIPEDIA & TACTICAL ENCYCLOPEDIA
  // ==========================================
  {
    id: 'wiki-wilderness-psychology-survival-rules',
    category: 'offline_wikipedia',
    subcategory: 'survival_psychology',
    title: 'Survival Psychology, STOP Protocol & The Rule of Threes',
    summary: 'Human physiological survival limits, cognitive panic mitigation, and the foundational rules of crisis management.',
    urgency: 'standard',
    keywords: ['rule of threes', 'stop protocol', 'survival psychology', 'panic control', 'shelter prioritization'],
    protocols: [
      'THE PHYSIOLOGICAL RULE OF THREES:',
      '  - 3 Minutes without Air or in freezing icy water (loss of consciousness / drowning).',
      '  - 3 Hours without Shelter in severe freezing or desert weather (hypothermia / heatstroke).',
      '  - 3 Days without Drinkable Water (acute kidney failure, delirium, circulatory collapse).',
      '  - 3 Weeks without Caloric Food (muscle catabolism, organ atrophy).',
      'THE S.T.O.P. PROTOCOL (When Disoriented or in Crisis):',
      '  - S — STOP: Halt immediately. Sit down. Do not run or blindly march (burns calories and accelerates disorientation).',
      '  - T — THINK: Assess true status. What time is it? What gear is present? What are immediate hazards?',
      '  - O — OBSERVE: Study surroundings. Weather front approaching? Sources of water? High ground landmarks? Animal trails?',
      '  - P — PLAN: Determine priorities based on the Rule of Threes. In freezing cold, building an insulated debris shelter takes precedence over water or food.'
    ],
    tips: [
      'The #1 killer in wilderness survival is panic and poor decision-making leading to accidental trauma or rapid hypothermia.',
      'A positive mental attitude and deliberate purpose directly sustain autonomic nervous stability.'
    ]
  },
  {
    id: 'wiki-emp-faraday-cage-resilience',
    category: 'offline_wikipedia',
    subcategory: 'disaster_readiness',
    title: 'High-Altitude EMP (HEMP) & Improvised Faraday Enclosures',
    summary: 'Physics of E1, E2, and E3 electromagnetic pulse waveforms and practical fabrication of RF-shielded enclosures for radios and electronics.',
    urgency: 'medium',
    keywords: ['emp', 'faraday cage', 'geomagnetic storm', 'solar flare', 'e1 pulse', 'rf shielding', 'grid collapse'],
    protocols: [
      'ELECTROMAGNETIC PULSE (HEMP) WAVEFORM SPECTRUM:',
      '  - E1 Pulse (Fast): Nanosecond rise time (up to 50,000 V/m). Destroys semiconductors, integrated circuits, diodes, and microprocessors.',
      '  - E2 Pulse (Medium): Similar to lightning strike. Handled by standard surge arrestors if intact.',
      '  - E3 Pulse (Slow): Multi-minute geomagnetically induced currents (GIC). Melts high-voltage grid transmission transformers.',
      'IMPROVISED FARADAY ENCLOSURE FABRICATION:',
      '  1. Core Principle: Continuous, highly conductive conductive skin (aluminum, copper, galvanized steel) without any gaps or slots.',
      '  2. Galvanized Steel Trash Can Method:',
      '     - Line entire inside of new steel trash can with non-conductive insulation (cardboard, carpet, closed-cell foam). Equipment MUST NEVER touch metal wall.',
      '     - Wrap electronic items individually in heavy-duty aluminum foil (minimum 3 layers), separated by plastic bags.',
      '     - Place items in can. Fit lid tightly. Seal lid seam completely with 2-inch aluminum foil conductive adhesive tape.',
      '  3. Microwave Oven Myths: Kitchen microwaves are tuned to 2.45 GHz and possess door gaskets with leakage gaps that DO NOT block high-frequency broadband E1 pulses.',
      '  4. Nesting Strategy: Two nested enclosures (box within a box) separated by dielectric foam provides >80dB attenuation.'
    ],
    tips: [
      'Store spare ham radios, walkie-talkies, solar charge controllers, flashlights, and medical diagnostic meters inside sealed Faraday boxes.'
    ]
  },
  {
    id: 'wiki-emergency-field-sanitation-latrines',
    category: 'offline_wikipedia',
    subcategory: 'field_sanitation',
    title: 'Grid-Down Field Sanitation, Latrines & Disease Prevention',
    summary: 'Preventing fecal-oral transmission, dysentery, and cholera when municipal plumbing, sewer mains, and water systems fail.',
    urgency: 'high',
    keywords: ['field latrine', 'sanitation', 'cat hole', 'dysentery', 'cholera', 'blackout hygiene', 'handwashing'],
    protocols: [
      'THE 200-FOOT SANITATION RULE:',
      '  - Always construct latrines, waste pits, and graywater disposals at least 200 FEET (60 METERS) DOWNSTREAM from any water source, camp, or food prep area.',
      'IMPROVISED FIELD LATRINE DESIGNS:',
      '  1. Individual Cat Hole (Short Term / Mobile):',
      '     - Dig hole 6-8 inches deep by 4-6 inches wide in organic topsoil (contains highest microbial bacteria for decomposition).',
      '     - After use, pack with soil and tamp down.',
      '  2. Straddle Trench Latrine (1-3 Days, Up to 25 People):',
      '     - Dig trench 1 foot wide, 2.5 feet deep, and 4 to 8 feet long.',
      '     - Mound excavated earth along sides with a trowel. Each user immediately shovels a layer of dirt and wood ash over waste.',
      '  3. Two-Bucket Urban System (Grid-Down Apartment/Home):',
      '     - Bucket #1: Strictly for Urine (rich in nitrogen, sterile initially, can be diluted 10:1 for garden or poured down storm drain).',
      '     - Bucket #2: Strictly for Feces. Line with heavy garbage bag. Cover each deposit with 1 cup dry carbon material (sawdust, shredded paper, peat moss, or wood ash) to desiccate waste and eliminate odor.',
      'HYGIENE & HANDWASHING STATION:',
      '  - 80% of crisis mortality historically stems from infectious waterborne diarrheal disease.',
      '  - Improvise a tippy-tap handwashing dispenser from a 1-gallon milk jug suspended by string with soap on a rope.'
    ],
    tips: [
      'Wood ash from a campfire acts as an alkaline disinfectant and deodorizer for latrine pits.',
      'Never mix urine and feces in the same dry bucket; urine provides the moisture that enables anaerobic odor-producing bacteria to proliferate.'
    ]
  },
  {
    id: 'wiki-cold-weather-shelters-igloo-debris',
    category: 'offline_wikipedia',
    subcategory: 'shelter_construction',
    title: 'Sub-Zero Winter Shelters: Debris Huts & Snow Caves',
    summary: 'Thermal mechanics of microclimate shelters, dead-air-space insulation, and preventing winter hypothermia.',
    urgency: 'high',
    keywords: ['debris hut', 'snow cave', 'quinzhee', 'hypothermia', 'winter shelter', 'thermal insulation', 'dead air'],
    protocols: [
      'THERMAL RESISTANCE PRINCIPLE (Dead-Air Space):',
      '  - Debris and snow DO NOT generate heat; they trap the 98.6°F (37°C) body heat your metabolism radiates.',
      '  - The shelter interior must be as SMALL as possible—only slightly larger than your sleeping body—to minimize the air volume you must warm.',
      'DEBRIS HUT CONSTRUCTION (No Snow Present):',
      '  1. Ridgepole: Select a sturdy 9-12 foot log. Prop one end on a stump or sturdy tripod at waist height (~3 feet).',
      '  2. Ribs: Lean sturdy sticks along both sides of ridgepole at 45-degree angles to create an A-frame skeleton.',
      '  3. Lattice: Weave smaller branches across ribs to prevent debris from falling inside.',
      '  4. Insulation Layer: Pile dry leaves, pine needles, grass, and moss over the skeleton MINIMUM 3 FEET (1 METER) THICK on all sides.',
      '  5. Bedding: Fill inside of hut with at least 18 inches of dry fluffy leaves to insulate your body from heat-leaching ground conduction.',
      'QUINZHEE SNOW SHELTER (Powder / Soft Snow):',
      '  1. Pile gear (backpacks) in a mound, cover with tarp.',
      '  2. Shovel snow into a massive dome 6-8 feet tall over the pile.',
      '  3. Insert 12-inch guide sticks all over exterior dome.',
      '  4. Let sit for 2-3 hours to allow snow to "sinter" (crystallize and harden through pressure).',
      '  5. Tunnel entrance from low downhill side. Excavate snow from inside until guide stick tips are reached (ensuring 12-inch wall thickness).',
      '  6. CRITICAL: Punch a 2-inch ventilation hole in ceiling with a stick to prevent carbon monoxide poisoning and asphyxiation.'
    ],
    tips: [
      'Always construct your sleeping platform higher than the shelter door entrance; cold air sinks to the trench, leaving warm air trapped around your sleeping body.',
      'Never sleep directly on snow, ice, or frozen ground without an insulated thermal barrier.'
    ]
  }
];

export const SURVIVAL_ARTICLES: SurvivalArticle[] = [
  ...BASE_SURVIVAL_ARTICLES,
  ...GLOBAL_EXPAT_SURVIVAL_ARTICLES,
  ...CIVIL_PREPAREDNESS_ARTICLES,
  ...CONSTITUTIONAL_ARTICLES,
];

