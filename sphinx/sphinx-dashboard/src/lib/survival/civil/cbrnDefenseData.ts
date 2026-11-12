import { SurvivalArticle } from '../survivalData';

/**
 * CIVIL DEFENSE CHEMICAL, BIOLOGICAL, RADIOLOGICAL & NUCLEAR (CBRN) CODEX
 * Protocols for nerve agents, weaponized pathogens, reverse quarantine (SIRQ),
 * expedited fallout shielding factors, and 11-step field decontamination.
 * Completely secularized: Zero LDS/theological references.
 */

export const CBRN_DEFENSE_ARTICLES: SurvivalArticle[] = [
  {
    id: 'civil-prep-cbrn-chemical-biological',
    category: 'civil_defense',
    subcategory: 'cbrn_defense',
    title: 'Chemical & Biological Agent Defense, Symptoms & Medical Countermeasures',
    summary: 'Clinical triage tables, incubation periods, quarantine parameters, and immediate treatments for military chemical warfare and biological threat vectors.',
    urgency: 'critical',
    keywords: ['nerve agent', 'sarin', 'vx', 'anthrax', 'plague', 'smallpox', 'atropine', 'pralidoxime', 'quarantine'],
    materials: [
      'NIOSH CBRN-rated full-face gas mask with multi-gas/P100 filter',
      'Atropine and Pralidoxime (2-PAM) auto-injectors',
      'Ciprofloxacin / Doxycycline broad-spectrum antibiotic reserves',
      'Tyvek protective suits and nitrile inner + butyl outer gloves'
    ],
    warnings: [
      'Nerve agents (Sarin, Soman, VX) kill via respiratory arrest in minutes; immediate administration of Atropine + 2-PAM and full physical skin decontamination are the only lifesaving interventions.',
      'Do not initiate prophylactic antibiotics before symptoms appear in biological incidents; premature use destroys gut microbiome and breeds resistant pathogens.'
    ],
    protocols: [
      '1. CHEMICAL WARFARE AGENT SPECTRUM & EMERGENCY INTERVENTIONS:',
      '  - Nerve Agents (GA Tabun, GB Sarin, GD Soman, VX): Symptoms: pinpoint miosis pupils, sudden rhinorrhea, chest tightness, violent salivation, convulsions, flaccid paralysis. Treatment: Atropine (blocks acetylcholine receptors) + Pralidoxime Chloride 2-PAM (reactivates cholinesterase enzyme) + CPR + immediate soap and water skin wash.',
      '  - Blister / Vesicant Agents (H, HD Distilled Mustard): Blistering of moist skin, corneal burning, severe airway necrosis. Treatment: Immediate skin blot with dry absorbent powder or reactive decontaminating solution (RSDL); irrigate eyes with saline.',
      '  - Choking / Pulmonary Agents (HT Phosgene, Chlorine): Laryngeal spasm, massive non-cardiogenic pulmonary edema, cyanosis. Treatment: Strict physical rest (exertion accelerates edema); 100% oxygen; positive pressure ventilation.',
      '  - Blood / Cyanide Agents (AC Hydrogen Cyanide, CK Cyanogen Chloride): Inhibits cellular cytochrome oxidase; bright red venous blood, hyperventilation, death in minutes. Treatment: Amyl nitrite inhalant + Sodium nitrite IV + Sodium thiosulfate.',
      '2. BIOLOGICAL WARFARE PATHOGEN PARAMETERS:',
      '  - Inhalation Anthrax (Bacillus anthracis): 1-6 day incubation; fever, chest pain, toxemia, mediastinal widening. Post-exposure treatment: Oral Ciprofloxacin 500mg or Doxycycline 100mg twice daily for 60 days.',
      '  - Pneumonic Plague (Yersinia pestis): Highly contagious human-to-human aerosol; 90-100 day quarantine observation; streptomycin, gentamicin, or doxycycline.',
      '  - Smallpox (Variola Major virus): High fever, severe prostration, synchronous pustular rash on face and extremities; 30-day strict negative-pressure quarantine.',
      '  - Tularemia (Francisella tularensis): Swollen lymphadenopathy, pleuropneumonitis; 30-day quarantine; streptomycin/doxycycline.',
      '  - Botulinum Toxin: Flaccid descending cranial nerve paralysis, diplopia, dysphagia, respiratory arrest; heptavalent antitoxin + mechanical ventilation.'
    ],
    tips: [
      'Industrial chemical spills (DOT placards) travel downwind at 2 to 40 mph; evacuate crosswind immediately, perpendicular to the wind plume vector.',
      'Military gas mask filter canisters (40mm NATO) degrade in humid open air; maintain unopened filters in factory vacuum-sealed foil cans.'
    ]
  },
  {
    id: 'civil-prep-sirq-sealed-sheltering',
    category: 'civil_defense',
    subcategory: 'cbrn_defense',
    title: 'SIRQ (Self-Imposed Reverse Isolation) & In-Place Sealed Sheltering',
    summary: 'Execution protocols for pre-emptive household reverse quarantine during biological outbreaks and short-term sealed safe rooms for chemical/fallout plumes.',
    urgency: 'critical',
    keywords: ['SIRQ', 'reverse isolation', 'sealed room', 'plastic sheeting', 'duct tape', 'oxygen calculation', 'pandemic protocol'],
    materials: [
      '4-mil polyethylene plastic sheeting (pre-cut to window/door sizes)',
      'Heavy-duty duct tape (2-3 rolls per room)',
      'Wet towels for door base sealing',
      'Battery-powered air monitoring instruments'
    ],
    warnings: [
      'DO NOT REMAIN IN A PLASTIC-SEALED ROOM FOR MORE THAN 1 TO 2 HOURS: Residential rooms cannot supply sufficient oxygen for long durations; prolonged sealing causes lethal carbon dioxide toxicity and asphyxiation.',
      'Dogs and large pets consume double the oxygen of an adult human. Factor pet respiration directly into enclosed space occupancy limits.'
    ],
    protocols: [
      '1. SIRQ (SELF-IMPOSED REVERSE ISOLATION) DOCTRINE: During high-mortality viral or bacterial pandemics, execute reverse quarantine BEFORE infection reaches your local neighborhood. The household sequesters as an impenetrable biological cell: cancel public school, halt non-essential outings, and establish an exterior disinfection staging area for incoming supplies.',
      '2. CHEMICAL PLUME / FALLOUT IN-PLACE SEALING PROCEDURE:',
      '  - Select an interior, above-ground room (chemical vapors like chlorine and sarin are heavier than air and sink into basements).',
      '  - Immediately shut off all HVAC, furnaces, heat pumps, and exhaust fans. Close all chimney dampers.',
      '  - Close and latch all exterior windows and doors.',
      '  - Tape 4-mil plastic sheeting across window frames, electrical switch plates, and HVAC vents.',
      '  - Roll soaking wet towels and wedge firmly into the crack beneath the shelter door.',
      '3. OXYGEN CALCULATION (THE ARM-SPAN RULE):',
      '  - In standing position, all room occupants stretch arms out horizontally.',
      '  - If occupants can extend arms fully without touching another person or wall, the room contains sufficient oxygen for ONE HOUR of safe breathing (e.g. an 8x6 ft bathroom safely holds 2 adults and 1 small child for 1 hour).',
      '  - Minimize all physical movement and speaking to suppress metabolic oxygen consumption.',
      '  - After 1 to 2 hours, once the airborne chemical plume has passed downwind, unseal the room to prevent asphyxiation.'
    ],
    tips: [
      'Pre-cut plastic sheeting panels 6 inches wider than every window and door opening in advance, labeling each with permanent marker for rapid 5-minute deployment.',
      'Do not light candles, lanterns, or camp stoves inside a sealed room; open flames consume oxygen at ten times human metabolic rates.'
    ]
  },
  {
    id: 'civil-prep-field-decontamination',
    category: 'civil_defense',
    subcategory: 'cbrn_defense',
    title: '11-Step CBRN Field Decontamination Kit & Procedure',
    summary: 'Standard operating procedure for establishing an exterior hot/warm/cold decontamination zone to strip radioactive fallout, chemical agents, and pathogens before entering clean shelters.',
    urgency: 'critical',
    keywords: ['decontamination kit', 'decon protocol', 'radiation washout', 'blotting technique', 'rad meter', 'hot zone'],
    materials: [
      '5-gallon bucket with sealable lid (functions as storage container)',
      '2x spray bottles (water + 0.5% mild bleach solution)',
      'Bulb syringe for ocular and ear canal irrigation',
      '2x large bath towels and 8x washcloths',
      'Liquid dish soap or antibacterial shampoo',
      'Heavy-duty 39-gallon 3-mil yard cleanup bags + wire ties',
      'Survey meter / Geiger counter (calibrated to Roentgens/hr or µSv/hr)'
    ],
    warnings: [
      'NEVER SCRUB OR RUB AGGRESSIVELY DURING CHEMICAL/RADIOLOGICAL DECON: Rubbing abrades the epidermis and forces particulate toxins directly into skin pores and blood vessels. Always BLOT gently.',
      'Do not use bleach solution on eyes, open wounds, mouth, or inner ear canals; use clean isotonic saline or plain water only.'
    ],
    protocols: [
      '1. STAGING THE DECON CORRIDOR: Set up decon staging outside the primary shelter entrance. Position clean clothing and dry towels in the clean "Cold Zone"; designate a large plastic containment basin or heavy bag for the contaminated "Hot Zone".',
      '2. STRIPPING PROTOCOL: Step into the containment bag. Carefully cut or peel off outer garments rolling them inward (dirty side facing in) to avoid shaking fallout dust into the air. Deposit all garments, shoes, and watch in the waste bag. Remove eyeglasses and jewelry for separate detergent washing.',
      '3. HEAD-TO-TOE IRRIGATION: Wash head, hair, and facial hair thoroughly with running water and liquid shampoo; rinse backward away from face to prevent runoff into eyes and mouth.',
      '4. BLOTTING TECHNIQUE: Using a soapy washcloth, blot skin starting at the face, neck, and arms, progressing downward to torso, genital orifices, legs, and feet. Deposit cloth in the disposal bag.',
      '5. RINSE & RE-TEST: Rinse entire body with fresh water from spray bottle. Dry thoroughly with clean towel.',
      '6. RADIOLOGICAL VERIFICATION: Scan body with Geiger counter/Rad meter. Reading must measure below 1 mR/hr (or background baseline). If elevated radiation persists in hair or under nails, repeat washing cycle.',
      '7. SEALING HAZARDOUS REFUSE: Twist and wire-tie the heavy disposal bag; relocate at least 30 feet away from the shelter entrance.'
    ],
    tips: [
      'Cutting off tight pullover sweaters or t-shirts with trauma shears prevents dragging hazardous chemical droplets across facial mucous membranes.',
      'Keep a pair of safety goggles and an N-95 respirator on during the initial stripping phase to prevent inhaling resuspended radioactive fallout.'
    ]
  },
  {
    id: 'civil-prep-nuclear-fallout-emp',
    category: 'civil_defense',
    subcategory: 'nuclear_defense',
    title: 'Nuclear Attack, Expedient Fallout Sheltering & EMP Hardening',
    summary: 'Immediate action drill for nuclear detonations, shielding factor mass tables, expedient basement fortification, the 7/10 radiological decay rule, and EMP countermeasures.',
    urgency: 'critical',
    keywords: ['nuclear attack', 'fallout shelter', 'protection factor', 'shielding factor', '7/10 rule', 'potassium iodide', 'emp hardening'],
    materials: [
      'Potassium Iodide (KI) tablets (130mg adult / 65mg child)',
      'Calibrated ionizing radiation survey meter / dosimeter',
      'Solid bricks, concrete blocks, sandbags, and packed dirt',
      'Heavy timber or solid doors for overhead fallout bridging',
      'Galvanized steel trash cans with tight lids (improvised Faraday cages)'
    ],
    warnings: [
      'NEVER LOOK AT A NUCLEAR FLASH: The thermal pulse causes instantaneous permanent retinal burns and flash blindness up to 50 miles away.',
      'Expect TWO distinct blast shockwaves: the outward positive pressure wave (up to 200 mph) followed seconds later by a powerful inward negative suction wave.',
      'POTASSIUM IODIDE (KI) ONLY PROTECTS THE THYROID GLAND FROM RADIOACTIVE IODINE-131: KI provides ZERO protection against external gamma radiation, cesium-137, strontium-90, or blast injury.'
    ],
    protocols: [
      '1. IMMEDIATE ACTION DRILL (0 TO 10 SECONDS): If you see a flash or receive an attack alert, instantly drop face down on the ground in a culvert, behind a low wall, or under a heavy desk with head between knees, eyes closed, hands covering neck, mouth open slightly (prevents eardrum rupture). Remain down until both blast waves pass (approx. 30 seconds).',
      '2. POTASSIUM IODIDE (KI) DOSAGE SCHEDULE (UPON OFFICIAL WARNING):',
      '  - Adults & Pregnant/Nursing Women: 130 mg daily.',
      '  - Children Ages 3 to 18: 65 mg daily.',
      '  - Infants 1 month to 3 years: 32 mg daily.',
      '  - Neonates Birth to 1 month: 16 mg single dose.',
      '3. EXPEDIENT BASEMENT FALLOUT SHUTDOWN (PF/SF SHIELDING TABLE):',
      '  - Protection Factor (PF) is the inverse of Shielding Factor (SF). A PF of 4 (SF 0.25) reduces external radiation to 25%; a PF of 20 (SF 0.05) reduces radiation to 5%.',
      '  - Thickness required for 1/2-value reduction of penetrating gamma rays: Lead = 0.4 inches; Steel/Iron = 0.7 inches; Concrete = 2.4 inches; Earth/Soil/Gravel = 3.6 inches; Water = 7.2 inches; Hardwood = 8.8 inches; Wheat/Grains = 18 inches; Books/Magazines = 14 inches.',
      '  - Expedient Shelter Construction: In the deepest basement corner, place a heavy workbench or lay solid doors across sturdy bookshelves. Pile minimum 12-18 inches of dense materials (dirt, sandbags, full grain buckets, stacks of books) directly overhead. Fill ground-level basement window wells with sand or packed soil.',
      '4. THE 7/10 RADIOLOGICAL DECAY RULE: For every 7-fold increase in time following detonation, fallout radiation decreases by a factor of 10. Example: 1,000 R/hr at Hour 1 -> 100 R/hr at Hour 7 -> 10 R/hr at Hour 49 (approx. Day 2) -> 1 R/hr at 2 weeks. Remain inside the shelter continuously for at least 14 days.',
      '5. EMP (ELECTROMAGNETIC PULSE) HARDENING: Nuclear high-altitude bursts (HEMP) induce thousands of volts per meter in electrical lines, destroying semiconductor electronics, automotive ECUs, and grid transformers.',
      '  - Unplug all vital electronics and disconnect coaxial cable / radio antennas longer than 12 inches.',
      '  - Store backup two-way radios, Geiger counters, and flashlights inside nested Faraday enclosures (e.g. nested galvanized metal cans with conductive gasket lids isolated by cardboard).'
    ],
    tips: [
      'After 2 to 3 weeks of radiological decay, brief outdoor excursions to discard waste and retrieve supplies become manageable under dosimeter monitoring.',
      'Before planting food crops in fallout zones, scrape off and discard the top 3 to 5 inches of contaminated topsoil or plow at least 18 inches deep.'
    ]
  }
];
