import { SurvivalArticle } from '../survivalData';

/**
 * CIVIL DEFENSE WATER SOURCING, PURIFICATION, SANITATION & POWER CODEX
 * Engineering guidelines for well mechanics, chemical chlorination,
 * bio-filtration, off-grid generators, and emergency field toilets.
 * Completely secularized: Zero LDS/theological references.
 */

export const WATER_SANITATION_ARTICLES: SurvivalArticle[] = [
  {
    id: 'civil-prep-water-procurement-wells',
    category: 'civil_defense',
    subcategory: 'water_sourcing',
    title: 'Emergency Water Procurement, Well Hydraulics & Pipe Salvage',
    summary: 'Techniques for extracting trapped residential plumbing water, well pump mechanics, 20-foot suction cavitation limits, and emergency pipe bailers.',
    urgency: 'critical',
    keywords: ['water sourcing', 'water heater draining', 'well pumps', 'suction limit', 'pipe bailer', 'spring box'],
    materials: [
      'Galvanized pipe (2-foot length) with end caps and flapper valve',
      'Garden hose and drain fittings',
      'Submersible well pump or manual pitcher/cylinder pump',
      'Spring box construction materials'
    ],
    warnings: [
      'SHUT OFF WATER HEATER POWER/GAS BEFORE DRAINING: Heating an empty hot water tank burns out electric elements instantly or causes catastrophic gas tank rupture.',
      'Suction pumps CANNOT lift water higher than 20 to 25 feet due to atmospheric physics (cavitation/boiling in vacuum); wells deeper than 25 feet require deep cylinder hand pumps, jet ejectors, or submersible electric pumps.'
    ],
    protocols: [
      '1. RESIDENTIAL PLUMBING WATER SALVAGE: The average home plumbing contains 30 to 80 gallons of pristine water in pipes and water heaters:',
      '  - Immediately close main street water shutoff valve to prevent back-siphonage of contaminated municipal water.',
      '  - Open the highest faucet in the home to introduce atmospheric air.',
      '  - Open the lowest faucet (basement or garden hose bib) to drain all potable water into clean buckets.',
      '  - Connect a hose to the bottom drain valve of your water heater; drain 40 to 80 gallons of hot water storage (allow sediment to settle before filtration).',
      '  - Toilet tanks (NOT the bowl) hold 2 to 3 gallons of clean water if no chemical drop-in disinfectants were added.',
      '2. DEEP WELL RECOVERY MECHANICS:',
      '  - Shallow Wells (< 25 ft): Single-pipe suction hand pump located at ground level.',
      '  - Medium Wells (25 to 100 ft): Deep-well cylinder pump with working barrel located inside the well water column, actuated by wooden or fiberglass sucker rods from the surface.',
      '  - Improvised Well Bailer: Drill a 1/2" hole in bottom cap of a 2-foot galvanized pipe; attach a flexible rubber flapper valve inside; lower into drilled well casing on nylon rope. Weight forces water past flapper; upon lifting, water pressure closes valve, lifting 1-2 quarts per drop.'
    ],
    tips: [
      'Cap and protect artesian springs with a concrete spring box with an overflow pipe to prevent surface water runoff from introducing agricultural coliforms.',
      'Calculate baseline water needs: 1 gal/person/day for pure hydration/survival; 4 gal/day for hygiene and cooking.'
    ]
  },
  {
    id: 'civil-prep-water-purification-chemical',
    category: 'civil_defense',
    subcategory: 'water_treatment',
    title: 'Water Purification, Pathogen Sizing & Disinfection Codex',
    summary: 'Comprehensive chemical, physical, and biological water treatment algorithms: absolute pore sizing for cysts/bacteria/viruses, bleach ratios, and slow sand filters.',
    urgency: 'critical',
    keywords: ['water purification', 'cryptosporidium', 'giardia', 'bleach dosage', 'calcium hypochlorite', 'iodine', 'slow sand filter', 'ornl filter'],
    materials: [
      'Plain unscented household bleach (5.25% - 6% NaOCl)',
      'Calcium hypochlorite (HTH 70% available chlorine)',
      '2% USP Tincture of Iodine or Potable Aqua tablets',
      'Microfilter with absolute <= 0.2 micron rating',
      'Clean 5-gallon bucket, gravel, sand, and porous cloth'
    ],
    warnings: [
      'CHLORINE AND IODINE DO NOT KILL CRYPTOSPORIDIUM CYSTS: Cryptosporidium oocysts possess an impenetrable protein shell resistant to standard chemical disinfection. Only boiling or microfiltration (<= 1 micron absolute) neutralizes Cryptosporidium.',
      'Never use calcium hypochlorite crystals directly in drinking water; it must be diluted into a 1% stock solution first to prevent chemical burns and acute diarrhea.'
    ],
    protocols: [
      '1. PATHOGEN SIZE & FILTRATION SPECTRUM:',
      '  - Protozoan Cysts (Giardia lamblia, Cryptosporidium): 1 to 15 µm -> Removed by 1 µm absolute ceramic/fiber microfilters.',
      '  - Bacteria (E. coli, Salmonella, Vibrio cholerae): 0.2 to 0.6 µm -> Removed by 0.2 µm absolute filters.',
      '  - Enteric Viruses (Hepatitis A, Norovirus, Polio): 0.02 to 0.03 µm -> CANNOT be removed by standard mechanical filters. Requires boiling, chemical disinfection, or UV sterilization.',
      '2. THERMAL PURIFICATION: Bring water to a vigorous rolling boil for 1 full minute (3 full minutes at altitudes > 5,000 feet / 1,500 m). Kills 100% of protozoa, bacteria, and viruses.',
      '3. HOUSEHOLD BLEACH (5.25% SODIUM HYPOCHLORITE):',
      '  - Clear Water: Add 8 drops (0.4 ml) per gallon (2 drops per liter). Shake and wait 30 minutes. Must have a faint chlorine scent; if not, repeat dose and wait 15 minutes.',
      '  - Cloudy/Cold Water: Double dose to 16 drops (0.8 ml) per gallon and wait 60 minutes.',
      '4. CALCIUM HYPOCHLORITE (HTH 70%): Dissolve 1 rounded teaspoon (approx. 7 grams) HTH crystals in 2 gallons of water to create a 1% chlorine stock solution. Add 1 part stock solution to 100 parts water (approx. 3 tablespoons per 5-gallon bucket of water). Stores indefinitely in powder form.',
      '5. IODINE DISINFECTION: 2% USP Iodine Tincture: Add 8 drops per liter of clear water (16 drops if cold/cloudy); wait 30 minutes. To remove bitter iodine or chlorine taste, dissolve 50 mg Vitamin C (ascorbic acid) powder into water AFTER the full 30-minute contact time is complete.',
      '6. OAK RIDGE NATIONAL LABORATORY (ORNL) EMERGENCY FALLOUT/SAND FILTER: Perforate bottom of a 5-gal bucket with a dozen nail holes. Layer 1.5" gravel, porous towel, 6-7" sandy clay soil, and top porous cloth weighted with clean stones. Filters 6 quarts/hour of turbid or fallout-contaminated water.'
    ],
    tips: [
      'SODIS (Solar Photooxidative Disinfection): Fill clear PET beverage bottles 3/4 full, shake vigorously for 20 seconds to oxygenate, lay flat in direct equatorial sun on a reflective metal roof for 6 hours; UV-A + heat kills fecal coliforms.',
      'Slow Sand Filters (SSF) develop a biological "schmutzdecke" layer of predatory microorganisms on the top 1 cm of sand that consumes viral and bacterial pathogens.'
    ]
  },
  {
    id: 'civil-prep-emergency-sanitation-toilets',
    category: 'civil_defense',
    subcategory: 'sanitation',
    title: 'Emergency Sanitation, Bucket Latrines & Waste Disposal',
    summary: 'Preventing catastrophic fecal-oral pathogen transmission when municipal sewer systems fail: twin-bucket commodes, chemical disinfection, and latrine siting.',
    urgency: 'critical',
    keywords: ['emergency toilet', 'bucket latrine', 'human waste disposal', 'sewage failure', 'cat holes', 'cholera prevention'],
    materials: [
      '5-gallon heavy plastic bucket with snap-on seat',
      'Heavy-duty 13-gallon and 39-gallon plastic garbage bags (2-3 mil)',
      'Hydrated lime, sawdust, wood shavings, or peat moss',
      '10:1 water to bleach spray solution'
    ],
    warnings: [
      'ALL HUMAN WASTE AND GARBAGE MUST BE BURIED AT LEAST 100 FEET (30 METERS) FROM ANY WATER WELL, STREAM, OR SPRING: Failing to obey this distance results in lethal aquifer contamination with typhoid, cholera, and amoebic dysentery.',
      'Do not use quicklime (calcium oxide) in unventilated commodes; quicklime is violently caustic and creates severe skin/eye burns upon contact with moisture. Use hydrated lime (calcium hydroxide).'
    ],
    protocols: [
      '1. IN-HOME TOILET CONVERSION: If residential toilet bowl is intact but municipal water is severed:',
      '  - Sponge bowl dry and scrub clean with 10:1 bleach solution.',
      '  - Line bowl with a heavy 13-gallon plastic garbage bag; fold excess over rim.',
      '  - Lower toilet seat over bag rim to anchor.',
      '  - After every defecation, cover waste with a scoop of absorbent material (sawdust, peat moss, or dry earth mixed with hydrated lime) and spray with 10:1 bleach water.',
      '  - When bag is 1/3 full, expel air, tie knot securely, double-bag, and store in sealed metal garbage cans outside.',
      '2. THE TWIN-BUCKET SYSTEM: Maintain two dedicated 5-gallon buckets with snap-on toilet seats: Bucket 1 for Urine ONLY (uncontaminated urine is virtually sterile and can be diluted 10:1 with water as garden fertilizer or poured in soil); Bucket 2 for Feces ONLY (drastically reduces odor and volume).',
      '3. EMERGENCY PIT LATRINE (EXTENDED CRISIS): Dig a trench 4 to 6 feet deep, 1 foot wide, at least 100 feet downhill from water sources. Mount a plywood box seat over pit with a fly-tight cover lid. Sprinkle clean soil and lime after each use. When filled to within 18 inches of the surface, fill with earth and mound over with 18 inches of compacted soil.',
      '4. REFUSE & GARBAGE MANAGEMENT: Strain all food liquid away into soil > 100 ft from water. Wrap solid food scrap in newspaper to absorb moisture before bagging. If garbage pickup ceases for weeks, bury refuse under 18-24 inches of compacted earth to prevent rodent and insect breeding.'
    ],
    tips: [
      'Keep a 1-gallon sprayer filled with 10% bleach solution beside the bucket commode for immediate post-use aerosol disinfection.',
      'Stock disposable wipes and alcohol hand sanitizer; hand hygiene after sanitation tasks prevents 95% of survival camp dysentery.'
    ]
  },
  {
    id: 'civil-prep-generators-power-alternatives',
    category: 'civil_defense',
    subcategory: 'power_generation',
    title: 'Emergency Generators, Hookup Safety & Non-Electric Lighting',
    summary: 'Generator sizing formulas, manual transfer switches, deadly back-feeding suicide wiring risks, fuel preservation, and non-electric heating alternatives.',
    urgency: 'high',
    keywords: ['generators', 'transfer switch', 'suicide wiring danger', 'fuel storage', 'kerosene heater', 'aladdin lamps', 'propane'],
    materials: [
      'Standby generator (3.5 kW to 7.5 kW)',
      'Pre-installed manual transfer switch (UL approved)',
      'Heavy-duty 10-gauge 4-wire generator cord',
      'Fuel storage cans with fuel stabilizer (Sta-bil)',
      'Carbon monoxide (CO) battery detector'
    ],
    warnings: [
      'NEVER OPERATE A GENERATOR INDOORS OR IN AN ATTACHED GARAGE: Carbon monoxide is odorless, invisible, and lethal. Always operate generators outdoors at least 20 feet away from open windows and doors.',
      'NEVER CONNECT A GENERATOR DIRECTLY INTO A WALL OUTLET ("SUICIDE CORD"): Back-feeding electrocutes electrical linemen repairing power lines miles away and creates immediate fire hazards in household circuits.'
    ],
    protocols: [
      '1. GENERATOR SIZING MATRIX:',
      '  - 1000W to 1500W: LED lighting, radio, communications, phone/laptop chargers, small manual defrost freezer.',
      '  - 3500W (120V): Standard kitchen refrigerator/freezer, sump pump, washing machine, furnace blower.',
      '  - 5000W to 7500W (120/240V): Refrigerator, freezer, furnace blower, 1/2 HP well pump (240V), multiple lighting circuits.',
      '  - 15,000W+ (240V Whole House): Central air conditioning, electric water heaters, large well pumps.',
      '2. SAFE ELECTRICAL HOOKUP: Install a dedicated manual transfer switch wired between the generator inlet box and the household breaker panel. The mechanical interlock ensures commercial utility power and generator power can NEVER be energized simultaneously.',
      '3. FUEL STORAGE & STABILIZATION LIFESPANS:',
      '  - Gasoline: Unstabilized gasoline degrades in 3 to 6 months; stabilized with Sta-bil or PRI-G in full, sealed airtight metal/poly cans, it stores 1 to 2 years.',
      '  - Diesel / Kerosene: Inherently safer and less volatile; stores 2 to 3 years without degradation. Store kerosene in blue or clear cans (never red gasoline cans).',
      '  - Liquid Propane (LP Gas): Indefinite storage life with zero chemical degradation; ideal for standby generators and portable cookers.',
      '4. NON-ELECTRIC BACKUP HEATING & LIGHTING: Kerosene convection heaters (9,600 to 25,000 BTU) provide clean indoor heat (crack window 1/4 inch for oxygen exchange). Aladdin mantle kerosene lamps produce 60W equivalent light and 750°F radiant heat. Use cyalume chemical sticks in post-earthquake environments to prevent gas ignition.'
    ],
    tips: [
      'Run generators intermittently: operate 2 hours in the morning and 2 hours in the evening to maintain refrigerator/freezer temperatures while slashing fuel consumption by 75%.',
      'Conduct a 30-minute load test under actual appliance draw once a month to ensure starting battery and carburetor health.'
    ]
  }
];
