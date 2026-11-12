import { SurvivalArticle } from '../survivalData';

/**
 * CIVIL DEFENSE READINESS, EVACUATION KITS & URBAN RESILIENCE CODEX
 * Adapted from municipal and civil emergency standards.
 * Completely secularized: Zero LDS/theological references.
 */

export const READINESS_DIAGNOSTIC_ARTICLES: SurvivalArticle[] = [
  {
    id: 'civil-prep-diagnostic-test',
    category: 'civil_defense',
    subcategory: 'readiness_audit',
    title: '29-Point Household Emergency Readiness Diagnostic',
    summary: 'Standardized 29-question diagnostic audit to evaluate household survivability across utility severance, fire egress, off-grid coms, and 72-hour to 1-year reserve tiers.',
    urgency: 'high',
    keywords: ['preparedness test', 'audit', 'fire escape', 'gas shutoff', '72 hour kit', 'emergency cash', 'readiness assessment'],
    materials: [
      'Household emergency checklist',
      'Gas valve shutoff wrench',
      'Flashlights for every occupied bedroom',
      'Emergency radio (AM/FM/Shortwave/NOAA)',
      'First aid kits (home + vehicle)',
      'Waterproof document container'
    ],
    warnings: [
      'CRITICAL: Gas shutoff valves should only be closed if you smell gas or suspect structural rupture; once turned off, utility companies or certified technicians must safely re-light pilots.',
      'Never use open candles for emergency lighting if gas lines could be compromised; incandescent sparks or open flames cause lethal structure explosions.'
    ],
    protocols: [
      'PHASE 1: IMMEDIATE PHYSICAL SAFETY AUDIT',
      '  1. Rehearse two distinct fire escape egress routes from every bedroom and establish an outside rally point.',
      '  2. Secure heavy wall art, mirrors, and hanging shelves directly into wall studs away from beds.',
      '  3. Place an operational LED flashlight and sturdy closed-toe shoes beside every occupied bed (prevents broken glass lacerations).',
      '  4. Locate main water shutoff valve; confirm manual operation without tools or tether a dedicated curb wrench.',
      '  5. Locate gas meter shutoff valve; tether an emergency non-sparking shutoff wrench directly to the meter piping.',
      '  6. Verify smoke and carbon monoxide detectors on every level, tested quarterly with battery replacement.',
      '  7. Position a 5-lb ABC dry chemical fire extinguisher on every floor, kitchen, and workshop.',
      'PHASE 2: 72-HOUR GRID-DOWN ISOLATION PROTOCOLS',
      '  8. Confirm minimum 14 gallons potable water per person (2-week baseline) stored in food-grade containers.',
      '  9. Maintain independent cooking equipment requiring zero grid electricity or utility gas (camp stove, Sterno, wood grate).',
      '  10. Assemble dedicated 72-to-96 hour grab-and-go evacuation packs for every household member.',
      '  11. Designate an out-of-area / out-of-state emergency communications contact person.',
      '  12. Maintain emergency physical cash reserve ($1,000+ in small $5, $10, and $20 denominations; ATMs and credit terminals fail during grid blackouts).',
      '  13. Stock minimum 30-day prescription medication supply and comprehensive first aid kits in all vehicles.',
      '  14. Prepare sanitation protocol for prolonged water service interruption (twin-bucket toilet system, heavy bags, disinfectant).'
    ],
    tips: [
      'Store duplicate paper copies of passports, deeds, birth certificates, and insurance policies in an off-site safety deposit box or secure cloud vault.',
      'Audit your score annually: any "NO" response represents an active vulnerability requiring immediate remediation.'
    ]
  },
  {
    id: 'civil-prep-96-hour-evacuation-kit',
    category: 'civil_defense',
    subcategory: 'evacuation_kits',
    title: 'Deluxe 96-Hour Bug-Out & Rapid Evacuation Kit',
    summary: 'Comprehensive 4-day self-contained mobile sustainment loadout designed for sudden evacuations before institutional relief can mobilize.',
    urgency: 'critical',
    keywords: ['96 hour kit', 'bug out bag', 'evacuation', 'go bag', 'sustainment', 'survival kit'],
    materials: [
      'Internal/external frame backpack with rain cover',
      'Freestanding 2-person breathable dome tent + rain fly',
      'Synthetic insulation sleeping bag (Polarguard/Qualofill rated to 20°F)',
      'Closed-cell foam sleeping pad (prevents conduction heat loss)',
      'Heavy-duty reinforced space blanket ground cloth',
      'Personal and family trauma first aid modules',
      'Water purification pump (Katadyn/MSR 0.2µm) + purification tablets',
      'LED headlamp, pack lantern, spare batteries, cyalume chemical sticks',
      'Compact multi-tool, folding saw, camp axe w/ sheath',
      'Dual-band emergency radio (NOAA/AM/FM/GMRS) + solar charger',
      'Four days of compact high-calorie non-perishable rations'
    ],
    warnings: [
      'Never rely on cheap tubular polyethylene tents or flimsy mylar pocket blankets; they cause massive interior condensation and hypothermia.',
      'Avoid down-filled sleeping bags for emergency kits; if down becomes wet, insulation value drops to near zero. Synthetic fills maintain warmth when damp.'
    ],
    protocols: [
      '1. MEDICAL & HYGIENE MODULE: Personal first aid kit, trauma tourniquet, sterile gauze, burn dressing, foot powder, medicated body powder, biodegradable soap, trowel.',
      '2. WATER PROCUREMENT: 2x 1-quart poly canteens, nesting stainless steel cup, microfilter pump, chlorine/iodine tablets, 2-gallon collapsible water bladder.',
      '3. SHELTER & WARMTH: Freestanding dome tent, heavy space blanket for footprint, synthetic sleeping bag, closed-cell foam pad, 2x pairs wool socks, thermal base layers, waterproof shell.',
      '4. TOOLS & ILLUMINATION: Heavy-duty multi-tool, folding pruning saw, 100ft 550 parachute cord, LED headlamp (hands-free), cyalume chemical lightsticks (safe in gas leak environments).',
      '5. COMMUNICATIONS & NAVIGATION: Local topographical maps, liquid-filled sighting compass, whistle, signal mirror, emergency crank/solar radio with USB charging.',
      '6. COOKING & NUTRITION: Compact canister/white-gas stove, nesting pot, P-38 can opener, utensil set, waterproof matches in sealed case, lifeboat food bars (Mainstay/Datrex), trail mix, electrolyte drink powder.',
      '7. DOCUMENTATION & CASH: Laminated emergency contact list, copy of vital IDs, $100 in $1/$5/$10 bills, $10 in quarters, waterproof pouch.'
    ],
    tips: [
      'Inspect and rotate perishable components (batteries, food bars, prescription meds) every 6 months on daylight saving time change.',
      'Store kit near the primary exit of your residence so it can be grabbed in under 30 seconds.'
    ]
  },
  {
    id: 'civil-prep-small-space-storage',
    category: 'civil_defense',
    subcategory: 'storage_engineering',
    title: 'Small-Space Food Storage Engineering & Concealment',
    summary: 'Architectural space-optimization and discrete caching techniques to store 3-month to 1-year emergency supplies in apartments and compact residences.',
    urgency: 'standard',
    keywords: ['small space storage', 'hiding food', 'concealment', 'bucket bed risers', 'false walls', 'apartment prepping'],
    materials: [
      'Food-grade 5-gallon HDPE buckets with gamma seal lids',
      'Plywood circles and fabric table rounds',
      'Modular under-bed storage bins',
      'Heavy-duty shelf brackets anchored into studs'
    ],
    warnings: [
      'Never store food containers on open garage floors or against uninsulated exterior concrete walls where moisture and thermal cycling degrade contents.',
      'Do not stack 5-gallon plastic buckets more than 3 high without intermediate load-bearing plywood dividers to prevent lower bucket wall collapse.'
    ],
    protocols: [
      '1. BED ELEVATION METHOD: Replace standard bed frame legs with 12 to 16 tightly sealed 5-gallon food buckets; provides stable, high-capacity foundation for up to 1,000 lbs of grains.',
      '2. DECORATIVE CAMOUFLAGE: Place clean, unused cylindrical garbage cans or buckets in bedroom corners; top with 24" plywood circles and circular tablecloths to function as end tables.',
      '3. HOLLOW FURNITURE RETROFIT: Build or purchase hollow bench seating, toy-box coffee tables, or ottoman storage boxes lined with dry food supplies.',
      '4. VERTICAL CEILING INTEGRATION: Install continuous overhead perimeter shelving 14 inches below ceiling in closets and hallways for lightweight dry goods and paper essentials.',
      '5. GARAGE FALSE WALL: Frame an insulated false partition wall 2 to 3 feet from the back garage wall with a concealed panel door; preserves hundreds of cubic feet of secure storage without visual footprint.'
    ],
    tips: [
      'Prioritize high-density foods (wheat, rice, beans, honey) in low, cool spaces like subfloor access areas and under-bed compartments.',
      'De-junk non-essential clutter aggressively: every square foot of unused closet space can store 4 months of life-saving sustenance.'
    ]
  },
  {
    id: 'civil-prep-katrina-urban-survival',
    category: 'civil_defense',
    subcategory: 'urban_survival',
    title: 'Urban Grid Collapse & Social Breakdown: 38 Field Lessons',
    summary: 'Exhaustive operational analysis of urban infrastructure failure, law enforcement withdrawal, private property defense, and refugee logistics compiled from direct frontline field observations.',
    urgency: 'critical',
    keywords: ['katrina lessons', 'urban collapse', 'looting', 'civil disorder', 'bugging out', 'neighborhood defense', 'grid down'],
    materials: [
      '12-gauge pump shotgun (18" cylinder barrel)',
      '.357 / .38 Special service revolver',
      'Physical cash stash ($1,000+ in small denominations)',
      'Pre-1965 90% silver junk coinage (dimes/quarters)',
      'Transfer switch for generator isolation',
      'Opaque blackout window curtains',
      'Perimeter tripwires and audible alert devices'
    ],
    warnings: [
      'NEVER USE "SUICIDE WIRING" (double-male cord into dryer outlet): Back-feeding electricity into the municipal grid will electrocute utility linemen working miles away and can ignite your residence.',
      'DO NOT RUN GENERATORS AT NIGHT IN URBAN CRISES: Generator engine noise and bright interior lighting act as beacon flares attracting armed looters across miles.',
      'NEVER RELY ON INSTITUTIONAL OR RED CROSS SHELTERS: Legal weapons are confiscated upon entry, sanitation rapidly collapses, infectious disease proliferates, and evacuees are subjected to bureaucratic confinement.'
    ],
    protocols: [
      '1. TIMELINE OF SOCIAL BREAKDOWN: Municipal police and 911 dispatch capacity evaporates within 24 to 48 hours of catastrophic power and water severance.',
      '2. WATER AS THE CRISIS TRIGGER: Within 48 hours of municipal water taps running dry, grocery stores are looted clean and violent scrambles for hydration commence.',
      '3. MONETARY REVERSION: Credit terminals and ATMs fail immediately. Regional bank branches in disaster zones drown; checks drawn on local banks become uncashable for months. All trade reverts to physical cash, 90% silver, and barter goods.',
      '4. NEIGHBORHOOD COLLECTIVE DEFENSE: Lone-wolf hoarding in an unprepared neighborhood guarantees conflict. The optimal strategy is educating neighbors in advance, forming block security watches, and manning street checkpoints.',
      '5. COMMANDEERING HAZARD: In catastrophic emergencies, emergency authorities frequently requisition private tractors, fuel, boats, and generators without receipts or compensation. Cache critical survival equipment discretely.',
      '6. HOME FORTIFICATION: Replace ground-floor window glass with polycarbonate/plexiglass, install deadbolts on reinforced steel doors, trim sightline foliage, and enforce strict blackout light discipline after sunset.',
      '7. FIREARMS DOCTRINE: Primary home defense weapon is a 12-gauge pump shotgun (Remington 870 / Mossberg 500) loaded with #4 or 00 buckshot. Secondary is a reliable .357/.38 revolver. Never draw a firearm unless committed to shoot; hesitation allows assailants to disarm you.',
      '8. EVACUATION ROUTE DISCIPLINE: Interstate highways gridlock into multi-day parking lots (as seen on I-10 and I-45). Evacuate before mandatory orders or chart secondary non-interstate county arterials.'
    ],
    tips: [
      'Establish a "bug-out bank account" with a large national institution that operates branches across multiple states to access funds outside the impact zone.',
      'Carry essential documents, deeds, insurance policies, and prescription lists in a portable waterproof firebox.'
    ]
  }
];
