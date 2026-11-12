import { SurvivalArticle } from '../survivalData';

/**
 * CIVIL DEFENSE FOOD STORAGE STRATEGY, METRICS & PROCUREMENT
 * Formulated from empirical emergency supply reserves and food storage standards.
 * Completely secularized: Zero LDS/theological references.
 */

export const FOOD_STORAGE_ARTICLES: SurvivalArticle[] = [
  {
    id: 'civil-prep-food-storage-math',
    category: 'civil_defense',
    subcategory: 'storage_metrics',
    title: '1-Year Food Storage Requirements & Demographic Scaling Math',
    summary: 'Nutritional baseline algorithms and physical storage volume calculations for 1-year family survival reserves at 2,300 kcal/day.',
    urgency: 'critical',
    keywords: ['food storage calculation', 'year supply', 'calories per day', 'demographic multipliers', 'grain volume', 'bucket math'],
    materials: [
      'Food-grade 5-gallon buckets with gamma seal lids',
      'Heavy-duty #10 hermetic tin cans with oxygen absorbers',
      'Mylar bags (5 mil minimum thickness)',
      'Hand-crank burr grain mill'
    ],
    warnings: [
      'The 695-lb bare-minimum baseline (24.65 oz/day) provides ~2,300 calories to sustain life, but leaves occupants in a monotonous deficit if supplementary fats, sugars, and vitamins are omitted.',
      'Brown rice and whole wheat flour cannot be stored long-term unground; brown rice essential oils oxidize within 6 months at room temperature. Always store intact hard wheat berries and white rice.'
    ],
    protocols: [
      '1. ANNUAL BASELINE PER ADULT (695 LBS TOTAL SUSTENANCE):',
      '  - Grains: 400 lbs (wheat berries, white rice, rolled oats, corn, rye, pasta) -> 1.096 lbs (2 cups) per day.',
      '  - Beans & Legumes: 60 lbs (pinto, black, navy, lentils, chickpeas, soybeans) -> 2.6 oz (3/4 cup) per day.',
      '  - Milk & Dairy Powder: 16 lbs nonfat dry milk (fortified vitamins A & D).',
      '  - Fats & Oils: 20 lbs / 10 quarts (cooking oil, shortening, canned butter, olive oil).',
      '  - Sugars & Honey: 60 lbs (granulated sugar, pure honey, molasses).',
      '  - Salt (Pure Sodium Chloride): 8 lbs per adult per year.',
      '  - Potable Emergency Water: Minimum 14 gallons (2-week extreme baseline); optimal 1 gal/person/day for hydration.',
      '2. DEMOGRAPHIC CONSUMPTION MULTIPLIERS:',
      '  - Adult Male Baseline: 1.00 (2,300 kcal/day)',
      '  - Adult Female Average: 0.75 (1,725 kcal/day)',
      '  - Heavy Manual Laborer / First Responder: 1.25 to 1.50 (2,875 to 3,450 kcal/day)',
      '  - Children Ages 7 to 9: 0.75',
      '  - Children Ages 4 to 6: 0.50',
      '  - Children Ages 1 to 3: 0.30',
      '  - Nursing Mothers: Require an additional 500 kcal/day and 1 extra quart of fluid daily.',
      '3. CONTAINER & VOLUME TRANSLATION METRICS:',
      '  - Two 5-gallon buckets hold approximately 75 lbs of wheat or white rice.',
      '  - One adult requires eleven 5-gallon buckets of grain for 1 full year.',
      '  - If packing in #10 cans: Wheat/Rice = 64 cans (10.5 cases); Pasta = 32 cans (5.25 cases); Rolled Oats = 124 cans (21 cases); Beans = 12 to 13 cans (2 cases).'
    ],
    tips: [
      'Calculate family requirements using the staged approach: build a 30-day reserve first, expand to 90 days, then scale to 1 year.',
      'A manual grain mill is mandatory; unground grain requires mechanical reduction to produce flour, polenta meal, and cracked cereals.'
    ]
  },
  {
    id: 'civil-prep-purchasing-calendar',
    category: 'civil_defense',
    subcategory: 'procurement',
    title: '12-Month Phased Supply Procurement Schedule ($40-$50/Week)',
    summary: 'A disciplined, budget-friendly 52-week roadmap to build a comprehensive 1-year family survival reserve incrementally without incurring debt.',
    urgency: 'high',
    keywords: ['purchasing calendar', 'budget prepping', '52 week plan', 'staged procurement', 'fifo storage'],
    materials: [
      'Dedicated storage shelving units',
      'Permanent marker for labeling and dating cans/buckets',
      'Food-grade 5-gallon buckets & #10 cans'
    ],
    warnings: [
      'Do not go into high-interest debt to purchase survival supplies; acquire items weekly within cash-flow constraints to maintain financial resilience.',
      'Never abandon supplies "way in the back"; adhere strictly to First-In, First-Out (FIFO) rotation in daily household meal planning.'
    ],
    protocols: [
      'Q1 (FOUNDATIONAL CALORIES & WATER CONTAINERS):',
      '  - January: 1 case canned fruit, 2x #10 cans instant potatoes, 6x #10 cans dry milk, 9 lbs dry baking yeast.',
      '  - February: 55-gallon water drum + spigot, 100 lbs hard white wheat + 3 buckets, 25 lbs sugar or 20 lbs honey, 5 lbs salt, 4x #10 cans shortening, 25 lbs dry beans, 50 lbs popcorn/dent corn.',
      '  - March: Water containers for 14 gal/person, 15 lbs white rice/person, 2 jars mayonnaise, 1 gal oil, 2 tubs shortening, 25 lbs sugar, 25 lbs legumes, 5 lbs salt, 2 bottles bleach.',
      'Q2 (BAKING ESSENTIALS, PROTEINS & CONDIMENTS):',
      '  - April: 100 lbs wheat, 10 lbs brown sugar, 2x #10 cans dried fruit, 1 lb yeast, 1 case canned tuna/salmon, 2x #10 cans milk, 3 lbs sprouting seed, 80 oz baking powder, 2 large jars peanut butter, 2 cans whole egg powder.',
      '  - May: Multivitamins (2-3 bottles), 4x #10 cans rolled oats, 100 lbs wheat + 3 buckets, #10 can margarine powder, 4x #10 cans potato flakes, black pepper.',
      '  - June: 2 cans dry milk, rennet (cheese making), lemon juice & vinegar, 100 lbs wheat, 25 lbs white flour, 10 lbs baking soda, 25 lbs legumes, Knox unflavored gelatin (egg replacer in baking), 3 cases tomato sauce/paste.',
      'Q3 (BULK EXPANSION & HARVEST DEALS):',
      '  - July: 200 lbs wheat, 20 lbs peanut butter, 4x #10 cans shortening, 8x #10 cans dry milk, continuous water container filling.',
      '  - August: 25 lbs rice, 25 lbs sugar, 2x #10 cans instant potatoes, 1 case canned meats, 4x #10 cans dry milk, late-summer case sales on canned vegetables/fruit, 10 lbs salt.',
      '  - September: 6 cases canned fruit, 2 cases canned vegetables, 4 cans shortening, 25 lbs rice + buckets.',
      'Q4 (ROUNDING OUT STAPLES & LONG-TERM REDUNDANCY):',
      '  - October: 100 lbs wheat + 3 buckets, 1 case canned meat, 25 lbs sugar, 2 large cans fruit juice powder, 3x #10 cans dry milk, 9x #10 cans potato flakes.',
      '  - November: 4 large jars peanut butter, 1 case canned fruit, 65 lbs rice + buckets, 7x #10 cans shortening.',
      '  - December: 100 lbs wheat, 1 large can juice powder, 3 large jars peanut butter, 3x #10 cans dry milk, 50 lbs oats/barley.'
    ],
    tips: [
      'Timing purchases during end-of-summer cannery sales and holiday baking specials drops total procurement expenses by 30-40%.',
      'Non-hybrid heirloom garden seeds ($18-20 per variety can) should be acquired by Week 5 of spring to ensure seed-saving independence.'
    ]
  },
  {
    id: 'civil-prep-storage-mistakes',
    category: 'civil_defense',
    subcategory: 'risk_mitigation',
    title: 'Seven Fatal Mistakes in Long-Term Food Storage & Mitigation',
    summary: 'Critical analysis of common psychological, logistical, and biological failures in family food reserves identified across decades of preparedness audits.',
    urgency: 'high',
    keywords: ['food storage mistakes', 'appetite fatigue', 'wheat allergy', 'spoilage', 'containers', 'extended staples'],
    materials: ['Food storage inventory logbook', 'Recipe testing cookbook'],
    warnings: [
      'APPETITE FATIGUE IS FATAL: In severe crises, elderly adults and young children will literally refuse to eat an unvaried, alien diet of plain boiled wheat and salt, leading to rapid starvation.',
      'UNDIAGNOSED WHEAT ALLERGIES: 15-20% of the population develops severe gastrointestinal distress or inflammation from exclusive whole-wheat diets. Storing only wheat without rice, oats, and millet is a critical point of failure.'
    ],
    protocols: [
      'MISTAKE 1: LACK OF VARIETY & SPICES: Do not store only 4 basics. Diversify grains (rice, corn, oats, barley, quinoa) and beans (pinto, black, garbanzo, lentils). Stock bullion cubes, dehydrated cheese powder, chili powder, and onion flakes.',
      'MISTAKE 2: NEGLECTING EXTENDED STAPLES: Basic grains cannot be cooked into bread or palatable meals without cooking oil, shortening, baking powder, baking soda, yeast, and powdered eggs.',
      'MISTAKE 3: OMITTING ESSENTIAL VITAMINS: Children and elderly deplete bodily vitamin reserves rapidly. Stock high-potency multivitamins and Vitamin C (ascorbic acid).',
      'MISTAKE 4: FORGETTING PSYCHOLOGICAL COMFORT FOODS: Severe stress requires morale normalization. Stock hard candies, jello, chocolate pudding mixes, cocoa, and fruit drink powders.',
      'MISTAKE 5: UNBALANCED PURCHASING: Never buy a full year of wheat before acquiring beans, salt, and fats. Build a balanced 1-month supply of all items, then expand to 3 months, then 1 year.',
      'MISTAKE 6: IMPROPER CONTAINER USE: Never store grains in paper sacks or grocery boxes (invites insects and rodents). Never use trash can liners for food (treated with toxic pesticides). Use food-grade HDPE buckets with Mylar liners and O2 absorbers, or sealed #10 cans.',
      'MISTAKE 7: FAILING TO PRACTICE COOKING WITH STORAGE: An emergency is the worst time to learn how to mill wheat, knead bread, or cook raw legumes. Integrate your storage ingredients into daily meals weekly.'
    ],
    tips: [
      'Acquire a specialized off-grid food storage cookbook and test five recipes with your family each month.',
      'Store favorite comfort snacks specifically for children to alleviate crisis anxiety.'
    ]
  },
  {
    id: 'civil-prep-master-supply-table',
    category: 'civil_defense',
    subcategory: 'logistics_matrix',
    title: 'Master Preparedness Supply Matrix (30-Day, 90-Day, 1-Year)',
    summary: 'Comprehensive multi-tier logistics checklist across 15 critical supply domains for family survival sustainment.',
    urgency: 'high',
    keywords: ['supply table', 'master list', 'tools checklist', 'hardware', 'emergency supplies', 'phased priority'],
    materials: ['Home emergency inventory audit ledger'],
    warnings: [
      'Priority 1 items (medical, water containers, sanitation, communication) must be secured first before allocating budget to secondary power or comfort items.'
    ],
    protocols: [
      '1. CLOTHING (WINTER FOCUS): Heavy wool/Gore-Tex outerwear, thermal polypropylene underwear (3/person), 12x pairs heavy socks, insulated boots (2/person), work gloves, rain gear. AVOID COTTON.',
      '2. COMMUNICATIONS: Battery/solar emergency radio, CB/GMRS handhelds, frequency directories, local topo maps, road flares, signaling mirrors, and whistles.',
      '3. VITAL DOCUMENTS: Waterproof firebox containing deeds, auto titles, birth certificates, passports, immunization records, insurance policies, bank account records.',
      '4. FOOD PREPARATION: Hand-cranked grain mill, cast iron dutch oven, pressure cooker, camp stove with dual fuel, P-38 can openers, heavy aluminum foil.',
      '5. FOOD STORAGE HARDWARE: 30x 5-gallon food-grade buckets with lids, bucket openers, 60x 500cc oxygen absorbers, silica gel desiccants, canning jars, canning salt.',
      '6. FUEL & POWER: 55-gallon fuel drums, fuel stabilizer (Sta-bil), 500 lbs lump charcoal, 10 cords seasoned firewood, manual fuel siphons, heavy matches.',
      '7. HARDWARE & TOOLS: Bow saws + spare blades, axe/maul, crowbars, 100 ft wire cable, pulleys, nails/screws assortment, duct tape, 10-mil Visqueen polyethylene sheeting, wheelbarrow spare parts.'
    ],
    tips: [
      'Purchase tools and mechanical hardware before shortages occur; during severe crises, hardware stores are emptied within hours.',
      'Select tools requiring zero grid power: hand drills, brace and bit, manual treadle sewing equipment, and hand-cranked washing machines.'
    ]
  }
];
