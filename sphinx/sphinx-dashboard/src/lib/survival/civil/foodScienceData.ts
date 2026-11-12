import { SurvivalArticle } from '../survivalData';

/**
 * CIVIL DEFENSE FOOD SCIENCE, BIO-PRESERVATION & PACKAGING CODEX
 * Encyclopedic protocols for grain milling, legume processing, dairy/egg stabilization,
 * chemical antioxidants, Mylar heat sealing, and microbial spoilage defense.
 * Completely secularized: Zero LDS/theological references.
 */

export const FOOD_SCIENCE_ARTICLES: SurvivalArticle[] = [
  {
    id: 'civil-prep-grains-flours-guide',
    category: 'civil_defense',
    subcategory: 'food_science',
    title: 'Grains, Flours & Milling Master Codex',
    summary: 'Comprehensive agronomic and culinary reference for long-term storage grains, gluten dynamics, alkali nixtamalization, and flour shelf lives.',
    urgency: 'high',
    keywords: ['wheat', 'gluten', 'corn', 'nixtamalization', 'oats', 'quinoa', 'rice', 'milling', 'flour shelf life'],
    materials: ['Grain moisture meter', 'Manual or electric burr mill', 'Mylar pouches with O2 absorbers'],
    warnings: [
      'Raw amaranth contains anti-nutritional factors that block nutrient absorption; it must always be thoroughly cooked before consumption.',
      'Whole wheat flour contains wheat germ oil and oxidizes to rancidity within 4 to 6 weeks at room temperature. Store whole unground wheat berries and mill flour fresh on demand.'
    ],
    protocols: [
      '1. GLUTEN MECHANICS IN GRAIN STORAGE: Gluten proteins (gliadin + glutenin) trap CO2 produced by yeast fermentation to produce raised bread loaves. Hard wheats contain 12-14%+ protein (high gluten, ideal for raised bread). Soft wheats contain 8-10% protein (ideal for pastries and quick breads). Rice, corn, and millet contain zero gluten and cannot form raised loaves without gluten additives.',
      '2. CORN (MAIZE) & ALKALI NIXTAMALIZATION: Yellow dent and flint corns store exceptionally well. Much of the niacin (Vitamin B3) in corn is chemically bound and unavailable to the human body unless treated with alkali (slaked lime / calcium hydroxide or culinary lye). Boiling dried corn in lime water creates nixtamal / hominy / posole, releases bioavailable niacin (preventing pellagra), and produces masa harina dough for tortillas.',
      '3. RICE DIFFERENTIATION: Brown rice retains the vitamin-dense bran and germ, but essential fatty acids oxidize rapidly, limiting room-temperature shelf life to 6 months (1-2 years only under inert nitrogen or freezing). Polished white rice removes fat, storing 10-15+ years hermetically with oxygen absorbers.',
      '4. OATS & PSEUDO-CEREALS: Oat groats (whole oat kernels with hulls removed) retain germ and bran. Steel-cut oats are chopped groats; rolled oats are steamed and flattened. Buckwheat and quinoa are non-cereal seeds high in lysine (an essential amino acid lacking in true grains).',
      '5. FLOUR STORAGE LIFESPANS AT 70°F: Whole wheat flour = 4-6 weeks (1 year in freezer). Refined white flour = 8-12 months standard; 5+ years in Mylar bags with oxygen absorbers. Stored white flour can be fortified with 1/8 tsp ascorbic acid (Vitamin C) per cup as a dough conditioner.'
    ],
    tips: [
      'Yellow corn contains beta-carotene (Vitamin A precursor); white corn contains zero beta-carotene. Always prioritize yellow corn for long-term reserves.',
      'Vital Wheat Gluten (75-80% protein) can be stored to strengthen low-protein grains or hydrated to create seitan high-protein meat substitutes.'
    ]
  },
  {
    id: 'civil-prep-legumes-guide',
    category: 'civil_defense',
    subcategory: 'food_science',
    title: 'Legumes & Pulses Master Guide: Varieties & Preparation',
    summary: 'Protein profiles, soaking chemistry, pressure cooker safety rules, and cooking techniques for 15 essential survival legumes.',
    urgency: 'high',
    keywords: ['beans', 'legumes', 'soybeans', 'lentils', 'chickpeas', 'pinto', 'favism', 'pressure cooking beans'],
    materials: ['Heavy stockpot', 'Pressure canner/cooker', 'Colander for rinsing'],
    warnings: [
      'NEVER PRESSURE COOK BLACK (TURTLE) BEANS: Black bean skins slip off during boiling and can easily lodge in the steam vent pipe of pressure cookers, creating severe explosion risks.',
      'FAVISM WARNING: Individuals of Mediterranean ancestry may possess an inherited G6PD enzyme deficiency; consuming fava (broad) beans can trigger acute hemolytic anemia.'
    ],
    protocols: [
      '1. COMPLEMENTARY PROTEIN SYNTHESIS: Legumes provide 20% to 35% protein by dry weight. Legumes are rich in lysine but low in sulfur-containing amino acids (methionine/cysteine); grains are rich in methionine but low in lysine. Consuming grains and legumes together forms 100% complete dietary protein.',
      '2. COMMON SPECIES PROFILES:',
      '  - Pinto Beans: Most adaptable staple in North America; dappled tan shell; cooks quickly when fresh; mills into instant refried bean flour.',
      '  - Soybeans: Highest protein of any legume; rich in oils (sensitive to oxidation; store in low-oxygen packaging); must be boiled and processed into soymilk, tofu, or tempeh.',
      '  - Chickpeas (Garbanzo): Ancient pulse retaining firm texture when cooked; base for hummus, falafel, and stews; roasted grounds serve as coffee substitute.',
      '  - Lentils & Split Peas: Require ZERO presoaking; cook to tender meal in 20-30 minutes, drastically conserving emergency cooking fuel.',
      '  - Great Northern & Navy Beans: Petite white beans; high shape retention; excellent for soups, purees, and protein flour additives.',
      '3. AGING BEANS & WATER ABSORPTION: Beans stored past 5 years lose natural seed coat oils, become hard-shelled, and resist water rehydration. Remedy: grind aged dry beans into fine bean flour using a burr mill; bean flour cooks into smooth soups, dips, and refried beans in under 5 minutes.'
    ],
    tips: [
      'Discard soaking water to eliminate water-soluble oligosaccharides (raffinose and stachyose) that cause severe gastrointestinal gas and cramping.',
      'Do not add salt or acidic ingredients (tomatoes, vinegar) until beans are fully tender; acids and salt toughen legume skins.'
    ]
  },
  {
    id: 'civil-prep-grain-moisture-mycotoxins',
    category: 'civil_defense',
    subcategory: 'food_science',
    title: 'Grain Quality, Moisture Testing & Spoilage Prevention',
    summary: 'Moisture safety cutoffs, empirical hammer crush testing, precision oven dehydration methods, and fungal mycotoxin (ergot/aflatoxin) identification.',
    urgency: 'critical',
    keywords: ['grain moisture', 'ergot', 'aflatoxin', 'winnowing', 'mycotoxins', 'crush test', 'spoilage'],
    materials: ['Hammer and solid brick/anvil', 'Kitchen scale accurate to 0.1 oz or grams', 'Oven thermometer', 'Blower/fan for winnowing'],
    warnings: [
      'CRITICAL: Moisture levels between 13.5% and 15% permit rapid proliferation of toxic Aspergillus and Fusarium molds. Keep all long-term grains and legumes below 10% moisture (raw peanuts below 8%).',
      'Ergot (Claviceps purpurea) produces ergotamine alkaloids causing violent convulsions, gangrene, and death (St. Anthony\'s Fire). Never consume rye or grains containing purple-black spur bodies.'
    ],
    protocols: [
      '1. METHOD 1: EMPIRICAL HAMMER CRUSH TEST:',
      '  - Place a dry kernel of wheat, corn, or bean on a flat brick or anvil.',
      '  - Strike sharply with a hammer. If the kernel shatters cleanly into dry powdery shards, moisture is <= 10% (safe for packaging). If it flattens into a gummy paste or stubbornly deforms, moisture is > 12% (must be dried).',
      '2. METHOD 2: PRECISION OVEN MOISTURE DETERMINATION:',
      '  - Preheat clean oven to specified seed temperature: 266°F (130°C) for wheat, rice, oats, barley, rye, sorghum; 217°F (103°C) for beans, corn, soybeans, peanuts.',
      '  - Weigh exactly 20.0 oz of whole seed in a shallow metal tare pan.',
      '  - Heat in oven center: 19 hours for wheat/rice; 20 hrs for barley; 22 hrs for oats; 16 hrs for rye; 72 hrs for beans/corn/peanuts.',
      '  - Cover with tight lid, cool in closed oven, and reweigh immediately. Each 1.0 oz loss in weight equals 5% moisture content (2.0 oz loss = 10% moisture).',
      '3. CLEANING & WINNOWING UNTREATED GRAIN: Slowly pour harvested or field-run grain through a steady cross-stream of air generated by an electric fan into a deep container; lighter chaff, smut balls, insect parts, and rodent debris blow away while heavy clean grain falls directly below.',
      '4. IDENTIFYING ERGOT CONTAMINATION: Inspect rye and wheat heads for hard, elongated, purplish-black sclerotia spurs replacing healthy kernels. When broken open, the interior is off-white or yellowish. Reject any lot with visible ergot bodies.'
    ],
    tips: [
      'Never purchase grain treated with pesticide fungicides (often dyed red or pink for agricultural planting); treated seed is lethally toxic to humans.',
      'To dry high-moisture grain at home, spread in a 1/2-inch layer in an air-conditioned room or in an oven at 115°F to 125°F with circulating air.'
    ]
  },
  {
    id: 'civil-prep-dairy-eggs-storage',
    category: 'civil_defense',
    subcategory: 'food_science',
    title: 'Dairy & Powdered Egg Long-Term Preservation Guide',
    summary: 'Technical storage parameters, reconstitution formulas, fat oxidation prevention, and culinary use for shelf-stable dairy products and egg powders.',
    urgency: 'high',
    keywords: ['powdered milk', 'canned butter', 'ghee', 'powdered eggs', 'cheese powder', 'reconstitution', 'shelf life'],
    materials: ['Glass canning jars with vacuum sealer', 'Mylar pouches with O2 absorbers', 'Reconstitution mixing pitcher'],
    warnings: [
      'Whole dry milk contains ~28% milkfat and oxidizes rapidly; without oxygen absorbers and vacuum sealing, it goes rancid within 12-24 months. Nonfat dry milk stores 5-10+ years.',
      'Egg powders absorb atmospheric moisture aggressively. Once opened, store in the refrigerator or reseal with fresh desiccant.'
    ],
    protocols: [
      '1. NONFAT DRY MILK RECONSTITUTION: Combine 3.2 oz (approx. 3 level tablespoons) instant nonfat dry milk powder with 32 oz (1 quart) clean water. Shake vigorously in a closed pitcher to aerate and incorporate oxygen; chill in a cool place for 4-6 hours to develop natural fresh milk flavor.',
      '2. SPECIFYING BULK MILK POWDER: When purchasing bulk milk, insist on "low-temperature spray process" Extra Grade. High-temperature process powder scorched during drying is suitable only for baked breads and will not reconstitute pleasantly for drinking.',
      '3. BUTTER STABILIZATION & CLARIFICATION (GHEE): Shelf-stable butter can be acquired commercially in sealed cans (e.g. Red Feather from New Zealand, 18-36 mo shelf life) or prepared as Ghee (clarified butter): gently melt unsalted butter to evaporate all water, skim foam, and decant pure clear golden butterfat off the milk solids into sterile mason jars. Ghee stores for years without refrigeration.',
      '4. CHEESE SHELF-LIFE PROFILES: Hard cheeses (parmesan/romano grated) vacuum-sealed store 3-5 years. Dehydrated cheddar cheese powder keeps 5-10 years in sealed cans. Commercial canned cheddar (Kraft Australian processed canned cheese) remains edible indefinitely at reasonable room temperatures.',
      '5. DRIED EGG COOKERY & RATIOS: Whole egg powder: 1 level tbsp egg powder + 2 tbsp clean water = 1 large fresh egg (whisk and let hydrate 5 minutes before cooking). Egg white powder whips into stiff peaks like fresh whites for meringue and sponge cakes (5+ year shelf life in Mylar). Egg yolk powder contains natural lecithin emulsifier for dressings and sauces.'
    ],
    tips: [
      'Adding 1-2 tbsp nonfat dry milk to whole wheat bread dough, pancake batter, or oatmeal significantly boosts protein quality by completing essential amino acid chains.',
      'Vitamins A and D in fortified milk powders are photosensitive; always store milk in light-impermeable containers (amber glass, metal cans, or opaque Mylar).'
    ]
  },
  {
    id: 'civil-prep-sugars-honey-botulism',
    category: 'civil_defense',
    subcategory: 'food_science',
    title: 'Sugars, Syrups, Honey Longevity & Infant Botulism Safety',
    summary: 'Longevity characteristics of dry and liquid sweeteners, crystallization recovery, and life-critical pediatric botulism warnings for raw honey.',
    urgency: 'critical',
    keywords: ['honey', 'sugar storage', 'infant botulism', 'clostridium botulinum', 'molasses', 'maple syrup', 'shelf life'],
    materials: ['Airtight glass jars', 'Double boiler or hot water bath'],
    warnings: [
      'CRITICAL PEDIATRIC WARNING: NEVER FEED RAW HONEY TO INFANTS UNDER ONE YEAR OF AGE. Raw honey naturally harbors Clostridium botulinum spores. While adult stomach acid and mature gut flora destroy these spores, an infant\'s immature digestive tract allows spores to germinate and produce lethal botulism neurotoxins.',
      'Bulging honey cans: Natural floral acids in honey can react with metal can linings over years to release inert hydrogen gas; if no foul odor or mold is present, the honey remains sterile and edible.'
    ],
    protocols: [
      '1. DRY SUGARS (INDEFINITE SHELF LIFE): Granulated white sucrose, powdered confectioners sugar, and brown sugars do not support microbial life due to extremely low water activity (aw < 0.60). As long as kept bone-dry and sealed from moisture, shelf life is indefinite. If brown sugar hardens, place a damp paper towel or apple slice in a sealed container with it for 24 hours to restore softness.',
      '2. HONEY LONGEVITY & CRYSTALLIZATION: Pure bee honey gathered with < 18% moisture contains natural hydrogen peroxide and antimicrobial defensin-1 peptides, surviving for centuries (edible honey has been recovered from ancient tombs). Crystallization is a natural physical change, not spoilage. To reliquefy: immerse the sealed container in warm water (120°F to 130°F) until crystals dissolve. Never boil honey or heat over direct flame (destroys delicate aromatic enzymes).',
      '3. CANE SYRUPS & MOLASSES: Blackstrap molasses, sorghum syrup, and pure cane syrup store 2-3 years at room temperature. Once opened, refrigerate to inhibit surface mold. Corn syrup stores poorly (6-12 months max) and is prone to fermentation; discard if foaming or cloudy haze appears.',
      '4. MAPLE SYRUP PRESERVATION: Pure maple syrup keeps 2 years unopened in cool dark pantry. Upon opening, mold spores will colonize surface unless refrigerated or frozen (pure maple syrup does not freeze solid due to high sugar concentration).'
    ],
    tips: [
      'Honey has an average of 22 calories per teaspoon compared to granulated white sugar\'s 16 calories, providing a dense source of survival carbohydrates.',
      'Never add water to bulk honey in storage; introducing moisture above 20% triggers wild yeast fermentation into mead.'
    ]
  },
  {
    id: 'civil-prep-fats-oils-bht',
    category: 'civil_defense',
    subcategory: 'food_science',
    title: 'Fats, Cooking Oils & Chemical Stabilization (BHT Protocol)',
    summary: 'Lipid oxidation dynamics, rancidity prevention, and FDA-compliant antioxidant stabilization of cooking oils for extended 5-year storage.',
    urgency: 'high',
    keywords: ['cooking oil', 'rancidity', 'fats storage', 'BHT antioxidant', 'oxidation', 'lipid stabilization'],
    materials: ['Fresh unrefined/refined oil', 'Butylated Hydroxytoluene (BHT) crystals', 'Gram/grain powder scale', 'Dark glass bottles'],
    warnings: [
      'Rancid fats are carcinogenic and damage cellular membranes. If oil smells stale, paints-like, or acrid, discard immediately: "A little bit rancid is a little bit poisonous."',
      'Oxygen is 8 times more soluble in fat than in water. Plastic jugs (PET/HDPE) are oxygen-permeable; oils stored in original plastic jugs begin oxidizing within 12 months.'
    ],
    protocols: [
      '1. MECHANISMS OF RANCIDITY: Exposure to oxygen, heat, and ultraviolet light cleaves double bonds in unsaturated fatty acids, generating toxic aldehydes, ketones, and free radicals. Saturated fats (coconut oil, clarified ghee) resist oxidation far better than polyunsaturated seed oils (canola, corn, soy).',
      '2. BASELINE STORAGE DISCIPLINE: Transfer retail oils from clear plastic jugs into amber glass jugs or tinplate cans. Seal airtight with minimum headspace (1/2 inch) and store at temperatures <= 65°F in complete darkness.',
      '3. EXTENDING OIL SHELF LIFE WITH BHT ANTIOXIDANT: Butylated Hydroxytoluene (BHT) is an FDA Generally Recognized As Safe (GRAS) antioxidant limited to 0.02% (200 ppm) of fat weight.',
      '  - BHT Dosage Target: 5.3 milligrams of BHT crystals per fluid ounce of oil (or 10.3 grains per 1 gallon of oil).',
      '  - Dissolution Method: Dissolve weighed BHT crystals into 1 pint of warm (not hot) oil by shaking vigorously. Once completely clear, blend this concentrate thoroughly into the full bulk gallon of oil before bottling.',
      '  - Expected Shelf Life: BHT-stabilized oil sealed in gas-impermeable containers stored at <= 70°F achieves 4 to 5 years of stable culinary shelf life.'
    ],
    tips: [
      'Fats provide 9 calories per gram compared to 4 calories per gram for carbohydrates or protein, making oil essential to prevent rapid caloric wasting in active survival scenarios.',
      'Cloudy solidification of olive oil or peanut oil in cold storage is normal wax precipitation; it returns to clear liquid upon warming to room temperature.'
    ]
  },
  {
    id: 'civil-prep-cooking-adjuncts-salt-yeast',
    category: 'civil_defense',
    subcategory: 'food_science',
    title: 'Cooking Adjuncts, Salts, Vinegars & Yeast Fermentation',
    summary: 'Potency testing for chemical leaveners, culinary salt classifications, vinegar mother culture, and yeast viability proofing procedures.',
    urgency: 'high',
    keywords: ['baking powder test', 'baking soda', 'canning salt', 'iodized salt', 'vinegar mother', 'active dry yeast', 'proofing yeast'],
    materials: ['Clean glass jars', 'Water thermometer (105-115°F)', 'Small measuring spoons'],
    warnings: [
      'NEVER USE ROAD SALT (HALITE) OR WATER-SOFTENER SOLAR SALT FOR FOOD: Halite and solar salts are not food-grade and contain insoluble toxic minerals, rock debris, and desiccated aquatic organics.',
      'Do not use iodized table salt for home canning or pickling; iodine causes unsightly darkening and cloudiness in canned foods.'
    ],
    protocols: [
      '1. BAKING POWDER POTENCY FIZZ TEST: Double-acting baking powder loses gas-producing potency over time. Test: stir 1 tsp baking powder into 1/3 cup warm water. It must foam and fizz furiously immediately; if reaction is sluggish or flat, discard and replace.',
      '2. BAKING SODA (SODIUM BICARBONATE): Pure alkaline NaHCO3. Reacts with acidic ingredients (buttermilk, vinegar, molasses) to release CO2. If kept hermetically sealed from atmospheric odors and moisture, shelf life is indefinite.',
      '3. CULINARY SALT SPECIFICATIONS: Pure sodium chloride (NaCl) has an indefinite shelf life. Canning/Pickling Salt is 100% pure fine salt without anti-caking agents (ideal for all preservation). Kosher Salt has large rolled flake crystals (weigh for recipes; volume is double canning salt). Table Salt contains anti-caking silicoaluminate which causes cloudiness in brines.',
      '4. VINEGARS & "MOTHER": Distilled white vinegar (5-6% acetic acid) stores indefinitely without change. Natural fermented cider vinegars may develop a cloudy gelatinous disk called "mother of vinegar" (harmless cellulose biofilm created by Acetobacter); filter through cheesecloth and reuse mother to brew new vinegar from hard cider or wine.',
      '5. YEAST VIABILITY & PROOFING TEST: Active dry yeast is a dormant living single-cell fungus (Saccharomyces cerevisiae). Proofing protocol: dissolve 1 tsp yeast + 1 tsp sugar in 1/4 cup warm water at 105°F to 115°F (40°C to 46°C). Within 5 to 10 minutes, a healthy culture produces a rich frothy head of foam. If completely flat, the yeast is dead.',
      '6. DRY YEAST STORAGE: Sealed foil vacuum bricks store 2 years at 70°F, 5 years refrigerated, and 10+ years frozen at 0°F.'
    ],
    tips: [
      'Sourdough cultures captured from airborne wild yeasts on flour/water slurry provide permanent leavening independence without relying on commercial yeast packets.',
      'In emergencies, 1/2 tsp baking soda + 1/2 tsp cream of tartar replaces 1 tsp double-acting baking powder.'
    ]
  },
  {
    id: 'civil-prep-sprouting-live-vitamins',
    category: 'civil_defense',
    subcategory: 'food_science',
    title: 'Sprouting Seeds for Live Vitamin C, A & B Production',
    summary: 'Low-tech indoor hydroponic seed germination to produce fresh raw enzymes and critical vitamins from stored dry grains and pulses.',
    urgency: 'high',
    keywords: ['sprouting seeds', 'vitamin c famine', 'alfalfa sprouts', 'mung beans', 'scurvy prevention', 'live food'],
    materials: ['Wide-mouth quart glass mason jars', 'Mesh sprouting screen or nylon mesh with rubber band', 'Untreated non-hybrid sprouting seeds'],
    warnings: [
      'NEVER SPROUT TOMATO, POTATO, OR EGGPLANT SEEDS: Solanaceae seedlings contain toxic solanine alkaloids that cause acute neurological and GI poisoning.',
      'Rinse sprouts at least twice daily; failure to drain water completely causes anaerobic bacterial fermentation and sour rotting.'
    ],
    protocols: [
      '1. NUTRITIONAL MULTIPLICATION: Dry seeds contain dormant starches and enzyme inhibitors. Germination activates metabolic enzymes, destroying phytic acid and synthesizing massive quantities of Vitamin C (ascorbic acid), Vitamin A, and B-complex vitamins from baseline reserves.',
      '2. SEED QUANTITIES PER QUART JAR: Use 1/2 cup for large seeds (wheat berries, lentils, chickpeas, rye, oats, mung beans); use 2 level tablespoons for tiny seeds (alfalfa, radish, broccoli, clover, cabbage).',
      '3. SOAKING & RINSING CYCLE:',
      '  - Soak seeds in clean water: 8 to 12 hours for large seeds; 4 to 6 hours for small seeds.',
      '  - Drain thoroughly and invert the mason jar at a 45-degree angle in a dark cabinet with mesh screen secured over mouth so excess water drips out.',
      '  - Rinse with cool water and drain twice daily (morning and evening).',
      '4. SUNLIGHT GREENING (VITAMIN A BOOST): When alfalfa, wheatgrass, or radish sprouts reach 2 inches, expose them to indirect sunlight for 4 to 5 hours. Chlorophyll synthesis turns the leaves vibrant dark green, increasing Vitamin A content by up to 100-fold.',
      '5. MUNG BEANS UNDER PRESSURE: For thick, juicy, commercial-style bean sprouts, place soaked mung beans in a colander, cover with clean damp burlap, and set a 3-5 lb flat weight (bag of clean river stones or marbles) on top. Water every 3 hours while keeping in darkness.'
    ],
    tips: [
      'Store sprouting seeds in breathable containers or air; unlike long-term storage grains, seeds packed in 100% nitrogen experience reduced germination rates over years.',
      'Alfalfa seed viability extends to 8+ years under cool conditions; older "hard" seeds naturally soften and germinate uniformly over time.'
    ]
  },
  {
    id: 'civil-prep-mre-natic-shelf-life',
    category: 'civil_defense',
    subcategory: 'rations_field',
    title: 'MRE Field Rations, Flameless Heaters & Lifeboat Rations',
    summary: 'Retort pouch barrier technology, US Army Natick temperature-to-shelf-life decay curves, chemical heater mechanics, and SOLAS lifeboat rations.',
    urgency: 'high',
    keywords: ['MRE shelf life', 'natick laboratory', 'flameless ration heater', 'mainstay', 'datrex', 'solas rations'],
    materials: ['Standard retort MRE ration pouches', 'Flameless Ration Heater (FRH) sleeves', 'Clean water'],
    warnings: [
      'MRE flameless ration heaters release flammable hydrogen gas during activation; never operate multiple heaters in an unventilated sealed space or inside a tent.',
      'Do not expose retort pouch food bags to direct open flame or hot stove elements; the internal food-contact polypropylene film will melt.'
    ],
    protocols: [
      '1. RETORT POUCH ANATOMY: MRE pouches consist of 3-ply lamination: tough outer polyester film for physical tear resistance, middle ultra-thin aluminum foil layer providing a 100% barrier against oxygen and moisture, and an inner virgin food-grade polypropylene heat-seal layer.',
      '2. NATICK RESEARCH LABORATORIES SHELF-LIFE MATRIX: Storage temperature directly dictates MRE longevity according to US Army empirical testing:',
      '  - 120°F (49°C): 1 month',
      '  - 110°F (43°C): 5 months',
      '  - 100°F (37°C): 22 months',
      '  - 90°F (32°C): 55 months (4.5 years)',
      '  - 80°F (27°C): 76 months (6.3 years)',
      '  - 70°F (21°C): 100 months (8.3 years)',
      '  - 60°F (15°C): 130+ months (10.8+ years)',
      '3. FLAMELESS RATION HEATER (FRH) CHEMISTRY: Utilizes a patented powdered alloy of magnesium and iron mixed with common table salt. Adding 1-2 oz water initiates an intense exothermic redox reaction: Mg + 2H2O -> Mg(OH)2 + H2 + heat, raising an 8 oz meal entree by 100°F (38°C) in 10 to 12 minutes.',
      '4. USCG / SOLAS LIFEBOAT RATION BARS: Mainstay (lemon) and Datrex (coconut) 1200/2400/3600 kcal bars are formulated under strict US Coast Guard specifications. Characteristics: withstands extreme thermal cycling (-22°F to +149°F / -30°C to +65°C), non-thirst provoking (low protein/salt to conserve bodily water), vacuum-sealed in foil laminate, 5-year guaranteed lifespan in vehicles.'
    ],
    tips: [
      'If an FRH is unavailable, submerge the sealed retort pouch in boiling water for 5 minutes or place on a warm vehicle engine block for 10 minutes.',
      'Lifeboat ration bars are the ideal emergency calorie source for vehicle trunks where summer temperatures exceed 120°F.'
    ]
  },
  {
    id: 'civil-prep-packaging-containers-mylar',
    category: 'civil_defense',
    subcategory: 'packaging_engineering',
    title: 'Packaging Engineering: Mylar, #10 Cans & Oxygen Absorbers',
    summary: 'Hermetic packaging physics, interstitial headspace air calculations, clothes-iron Mylar sealing techniques, and dry ice carbon dioxide purging.',
    urgency: 'critical',
    keywords: ['mylar heat seal', 'oxygen absorbers', '5 gallon bucket', 'headspace calculation', 'dry ice purge', 'diatomaceous earth'],
    materials: [
      'Food-grade 5-gallon HDPE #2 buckets',
      'Mylar bags (minimum 4.5 to 5 mil thickness)',
      'Standard household clothes iron and wood 2x4 straight edge',
      'Oxygen absorbers (500cc - 2000cc packets)',
      'Dry ice (solid carbon dioxide) pellets',
      'Food-grade Diatomaceous Earth (amorphous silica)'
    ],
    warnings: [
      'NEVER USE POOL FILTER DIATOMACEOUS EARTH: Swimming pool DE is heat-calcined into toxic crystalline silica causing silicosis. Only use 100% Food-Grade freshwater amorphous DE.',
      'Do not use oxygen absorbers with sugar, salt, or baking powder; sugar and salt turn into solid monolithic rock when oxygen and humidity are evacuated.'
    ],
    protocols: [
      '1. MYLAR HEAT SEALING PROCEDURE (CLOTHES IRON METHOD):',
      '  - Insert Mylar bag into food-grade 5-gallon bucket and fill with dry food, leaving 1.5 inches headspace below rim.',
      '  - Thump bucket firmly on floor to settle contents and minimize internal air pockets.',
      '  - Drop required oxygen absorbers on top of grain.',
      '  - Place a 2x4 wood board across bucket rim; fold bag opening flat across board.',
      '  - Lay a strip of thin cotton cloth (t-shirt/sheet) over Mylar edge; run clothes iron (set to Cotton/High) firmly across the seam for 15-20 seconds creating a 1-inch hermetic weld.',
      '  - Check seal: within 24 hours, atmospheric pressure will pull the Mylar tightly against the food like a brick (proving vacuum seal).',
      '2. CALCULATING OXYGEN ABSORBER CAPACITY:',
      '  - Air contains 21% oxygen. Oxygen absorber rating (cc or ml) must equal or exceed total headspace air volume x 0.21.',
      '  - Intersitial Air Rules: Dense foods (wheat, white rice, small beans) have 33% air space. Loose foods (elbow macaroni, rolled oats, potato flakes) have 50% air space.',
      '  - For 5-gallon bucket (19,000 ml total): Wheat/rice contains ~6,300 ml air -> requires 1,320 cc oxygen absorption (use one 1,500 cc or two 1,000 cc packets). Rolled oats/macaroni contains ~9,500 ml air -> requires 2,000 cc absorption.',
      '3. DRY ICE (CO2) PURGING PROTOCOL:',
      '  - Break dry ice into clean chunks: use 2 oz per 5-gallon bucket (or 1 lb per 8.3 cubic feet). Wipe off white surface frost with paper towel.',
      '  - Place dry ice wrapped in paper towel in bottom of bucket/bag; pour grain over ice to fill bucket.',
      '  - Lay lid loosely over container (do not seal). Sublimating CO2 is heavier than air, pooling at the bottom and forcing lighter oxygen out the top.',
      '  - After 2 hours, feel bucket bottom: once ice has completely sublimated and cold spot warms, snap lid airtight immediately.'
    ],
    tips: [
      'Food-grade Diatomaceous Earth (1 cup per 40 lbs grain) coats kernels with microscopic silica spines, cutting exoskeleton joints of weevil larvae and preventing pest reproduction.',
      'To remove persistent odors from recycled food-grade pickle buckets: scrub with detergent, soak 48 hours with warm water + 1 cup baking soda in direct sun, followed by a mild bleach rinse.'
    ]
  },
  {
    id: 'civil-prep-food-spoilage-temperatures',
    category: 'civil_defense',
    subcategory: 'food_science',
    title: 'Food Spoilage, Clostridium Botulinum & Temperature Curves',
    summary: 'Biological mechanisms of food degradation, thermal destruction curves, pH 4.6 botulism thresholds, and the Arrhenius rule of storage longevity.',
    urgency: 'critical',
    keywords: ['botulism', 'clostridium botulinum', 'ph 4.6', 'pressure canning', 'enzymatic spoilage', 'shelf life master table'],
    materials: ['Pressure canner with calibrated dial gauge', 'pH test strips or digital meter', 'Oven and freezer for thermal pest cycles'],
    warnings: [
      'BOTULISM IS DEADLY: Clostridium botulinum neurotoxin is the most lethal biological poison known. If home-canned low-acid foods (beans, meats, vegetables) show bulging lids, spurting liquid, cloudiness, or off odors, NEVER TASTE. Discard safely away from pets.',
      'Boiling water (212°F / 100°C) KILLS vegetative bacteria but DOES NOT KILL botulism spores. Low-acid foods must be processed in a pressure canner at 240°F (116°C) for the prescribed duration.'
    ],
    protocols: [
      '1. THE pH 4.6 CRITICAL THRESHOLD: Clostridium botulinum cannot germinate or produce toxin in an environment with a pH below 4.6. High-acid foods (fruits, pickles, jams) can be safely preserved in a 212°F boiling water bath. Low-acid foods (all meats, poultry, fish, beans, corn, soups) have pH > 4.6 and MUST be pressure-canned at 10-15 psi to reach 240°F to 250°F.',
      '2. SUSPECT CANNED FOOD NEUTRALIZATION: In survival extremities where canned food safety is unverified, boil the food briskly in an open pot for a minimum of 15 full minutes (add 1 minute per 1,000 ft elevation). While heat does not destroy fungal mycotoxins, a rolling 15-minute boil completely denatures botulinum neurotoxin.',
      '3. THE 10°F TEMPERATURE STORAGE RULE: Food shelf life follows Arrhenius reaction rates: every 10°F (5.6°C) drop in storage temperature approximately DOUBLES the storage life of dry seeds and foods. Conversely, every 10°F rise halves storage life.',
      '4. MASTER FOOD SHELF-LIFE PROFILES AT 70°F (HERMETICALLY SEALED):',
      '  - Hard Grains (Wheat, corn, millet, spelt): 15 to 20+ years (indefinite at < 60°F).',
      '  - White Rice & Rolled Oats: 10 to 15 years.',
      '  - Dry Legumes (Pinto, navy, lentils, chickpeas): 8 to 10 years.',
      '  - Dehydrated Vegetables & Potato Flakes: 8 to 10 years.',
      '  - Nonfat Dry Milk (nitrogen/vacuum sealed): 5 to 10 years.',
      '  - Pasta & Noodles: 10 to 15 years.',
      '  - Pure Granulated Sugar, Honey & Salt: Indefinite if protected from moisture.'
    ],
    tips: [
      'To eradicate weevils in dry grains without chemicals: place packaged grain in a deep freezer at 0°F (-18°C) for 7 days, or bake in oven at 150°F for 20 minutes before sealing.',
      'Food storage basements holding 58°F to 60°F year-round experience over triple the shelf life of above-ground garages that heat to 90°F in summer.'
    ]
  },
  {
    id: 'civil-prep-infant-emergency-nutrition',
    category: 'civil_defense',
    subcategory: 'food_science',
    title: 'Emergency Infant & Pediatric Nutrition Protocols',
    summary: 'Clinical guidelines for feeding infants during crises, commercial formula caching, lactose-free contingencies, and strict prohibitions against homemade formulas.',
    urgency: 'critical',
    keywords: ['infant formula', 'pediatric nutrition', 'breastfeeding emergency', 'lactose free formula', 'infant botulism', 'water purity'],
    materials: ['Commercial iron-fortified infant formula powder', 'Pure distilled/boiled water', 'Sterile feeding bottles and nipples'],
    warnings: [
      'STRICT PROHIBITION: NEVER ATTEMPT HOMEMADE FORMULAS (evaporated milk + Karo syrup, soy milk, or goat\'s milk) AS SOLE NUTRITION FOR INFANTS UNDER 6 MONTHS. These mixtures cause severe electrolyte imbalances, metabolic acidosis, kidney failure, and death.',
      'Formula powder requires clean, pathogen-free water. Contaminated water used to reconstitute formula is the primary cause of infant mortality in disaster zones.'
    ],
    protocols: [
      '1. BREASTFEEDING PRIORITY (AAP & WHO GUIDELINES): Breastfeeding is the single most resilient feeding strategy during crises. Even under maternal caloric stress, a lactating mother produces biologically sterile, immunologically protective milk tailored to her infant. Increase mother\'s fluid intake by 1-2 quarts daily and allocate extra calories to her diet.',
      '2. EMERGENCY FORMULA STOCKPILING: For formula-dependent infants, calculate 1 large can (12-14 oz powder) per week for infants under 6 months. Stock a minimum 90-day reserve (12-15 cans).',
      '3. HYPOALLERGENIC & LACTOSE-FREE SELECTION: When storing formula for unknown contingencies or infants prone to colic, store cow\'s-milk-based lactose-free formula (e.g. Similac Sensitive or Enfamil LactoFree), which resolves the vast majority of feeding intolerances.',
      '4. PREPARATION HYGIENE WITHOUT GRID POWER: Boil water vigorously for 1 full minute (3 minutes at high elevation) and allow to cool before mixing. Discard any reconstituted formula remaining in a bottle after 1 hour of feeding to prevent bacterial proliferation.'
    ],
    tips: [
      'Track formula expiration dates vigilantly. Unopened formula cans nearing their 12-month best-by date should be rotated into daily use or donated to food banks.',
      'Stock disposable pre-sterilized bottle liners and nipples to conserve precious water that would otherwise be spent sterilizing equipment.'
    ]
  }
];
