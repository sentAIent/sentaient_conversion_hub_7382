// farmsRanchesEngine.ts
// Comprehensive Agricultural Farms & Livestock Ranches Intelligence Engine
// Covers:
// 1. Cattle & Livestock Ranches (Historic and megasize Western grazing operations)
// 2. Crop, Grain & Produce Farms (Corn, wheat, soybeans, Central Valley fruits/nuts)
// 3. Dairy Farms & Creameries (Dairy belts, pasture-based milk operations)
// 4. Vineyards, Orchards & Citrus Groves (Napa/Sonoma, Yakima, Florida citrus)
// 5. Regenerative, Permaculture & Organic Farms (Chemical-free food resilience hubs)
// 6. Equine & Horse Ranches (Kentucky Bluegrass, Texas working ranches)

export type FarmRanchCategory = 
  | 'livestock_ranch'
  | 'crop_grain_farm'
  | 'dairy_farm'
  | 'orchard_vineyard'
  | 'organic_regenerative'
  | 'equine_ranch';

export interface FarmRanchFacility {
  id: string;
  name: string;
  category: FarmRanchCategory;
  categoryLabel: string;
  region: string;
  stateOrCountry: string;
  coordinates: [number, number]; // [lon, lat]
  acreage: number;
  primaryOutput: string[];
  farmingPractice: 'Conventional Commercial' | 'Organic Certified' | 'Regenerative Holistic' | 'Dryland Pasture' | 'Irrigated Precision' | 'Heritage Sustainable';
  waterSource: string;
  livestockCapacity?: string;
  foodResilienceRating: 'CRITICAL_BREADBASKET' | 'HIGH_LOCAL_SUPPLY' | 'STRATEGIC_SURPLUS' | 'SPECIALTY_PRODUCTION';
  notableFeatures: string;
  operatorOrHeritage?: string;
  icon: string;
  color: string;
}

export class FarmsRanchesEngine {
  public static readonly FARMS_RANCHES_CATALOG: FarmRanchFacility[] = [
    // === 1. HISTORIC & STRATEGIC LIVESTOCK RANCHES (WEST & GREAT PLAINS) ===
    {
      id: 'ranch-king-ranch',
      name: 'King Ranch',
      category: 'livestock_ranch',
      categoryLabel: 'Historic Mega-Ranch / Cattle',
      region: 'Wild Horse Desert / South Texas',
      stateOrCountry: 'Texas, USA',
      coordinates: [-97.8558, 27.5159],
      acreage: 825000,
      primaryOutput: ['Santa Gertrudis Cattle', 'Quarter Horses', 'Sorghum', 'Cotton', 'Citrus'],
      farmingPractice: 'Heritage Sustainable',
      waterSource: 'Deep artesian wells & Santa Gertrudis Creek watershed',
      livestockCapacity: '35,000+ head of cattle',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Larger than the state of Rhode Island; birthplace of the American ranching industry and Santa Gertrudis breed.',
      operatorOrHeritage: 'Founded 1853 by Capt. Richard King',
      icon: '🐂',
      color: '#d97706'
    },
    {
      id: 'ranch-waggoner',
      name: 'W.T. Waggoner Ranch',
      category: 'livestock_ranch',
      categoryLabel: 'Contiguous Cattle & Wheat Ranch',
      region: 'North Texas Red River Valley',
      stateOrCountry: 'Texas, USA',
      coordinates: [-99.2834, 33.8821],
      acreage: 535000,
      primaryOutput: ['Angus & Hereford Beef', 'Winter Wheat', 'Ranch Horses'],
      farmingPractice: 'Conventional Commercial',
      waterSource: 'Lake Kemp reservoir & Pease River basin',
      livestockCapacity: '14,000 brood cows',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Largest single-fence ranch in the United States; includes 30,000 acres of cultivated grain farmland.',
      operatorOrHeritage: 'Established 1849; Stan Kroenke holdings',
      icon: '🐂',
      color: '#d97706'
    },
    {
      id: 'ranch-deseret-fl',
      name: 'Deseret Ranches',
      category: 'livestock_ranch',
      categoryLabel: 'Cow-Calf & Citrus Ranch',
      region: 'Central Florida Osceola Plain',
      stateOrCountry: 'Florida, USA',
      coordinates: [-80.9528, 28.1889],
      acreage: 295000,
      primaryOutput: ['Calves', 'Valencia Oranges', 'Pasture Sod', 'Timber'],
      farmingPractice: 'Conventional Commercial',
      waterSource: 'St. Johns River watershed & Taylor Creek reservoir',
      livestockCapacity: '45,000 beef cows (largest mother cow herd in USA)',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Supplies major Eastern seaboard beef processing networks; massive natural aquifer conservation buffer.',
      operatorOrHeritage: 'AgReserves Inc.',
      icon: '🐂',
      color: '#d97706'
    },
    {
      id: 'ranch-padlock-wy',
      name: 'Padlock Ranch',
      category: 'livestock_ranch',
      categoryLabel: 'Working Mountain Cattle Ranch',
      region: 'Bighorn Mountains & Tongue River',
      stateOrCountry: 'Wyoming / Montana, USA',
      coordinates: [-107.0145, 44.9214],
      acreage: 475000,
      primaryOutput: ['Grass-Fed Black Angus', 'Alfalfa Hay', 'Corn Silage'],
      farmingPractice: 'Regenerative Holistic',
      waterSource: 'Tongue River gravity irrigation & mountain run-off snowpack',
      livestockCapacity: '11,000 mother cows',
      foodResilienceRating: 'HIGH_LOCAL_SUPPLY',
      notableFeatures: 'Spans mountain alpine summer pastures to lower river valley wintering grounds with zero feedlot confinement.',
      operatorOrHeritage: 'Founded 1943 by Homer & Mildred Scott',
      icon: '🐂',
      color: '#d97706'
    },
    {
      id: 'ranch-bell-nm',
      name: 'Bell Ranch',
      category: 'livestock_ranch',
      categoryLabel: 'Historic High Plains Cattle Ranch',
      region: 'Canadian River Escarpment',
      stateOrCountry: 'New Mexico, USA',
      coordinates: [-104.1481, 35.5342],
      acreage: 290100,
      primaryOutput: ['Red Angus Cattle', 'Native Grama Grass Forage'],
      farmingPractice: 'Dryland Pasture',
      waterSource: 'Canadian River and solar livestock wells',
      livestockCapacity: '5,000 head of open-range cattle',
      foodResilienceRating: 'STRATEGIC_SURPLUS',
      notableFeatures: 'Famous bell-shaped mesa landmark; 100% native prairie grasses untouched by chemical cultivation.',
      operatorOrHeritage: 'Historic Spanish Land Grant',
      icon: '🐂',
      color: '#d97706'
    },
    {
      id: 'ranch-tejon-ca',
      name: 'Tejon Ranch',
      category: 'livestock_ranch',
      categoryLabel: 'Historic Range & Orchard Basin',
      region: 'Tehachapi Mountains & San Joaquin Edge',
      stateOrCountry: 'California, USA',
      coordinates: [-118.8239, 34.9875],
      acreage: 270000,
      primaryOutput: ['Range Beef Cattle', 'Almonds', 'Pistachios', 'Wine Grapes'],
      farmingPractice: 'Conventional Commercial',
      waterSource: 'California Aqueduct & Tehachapi watershed springs',
      livestockCapacity: '12,000 head seasonal grazing',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Largest continuous private landholding in California connecting Central Valley to Mojave Desert.',
      operatorOrHeritage: 'Spanish Grant 1843 (Gen. Edward Beale)',
      icon: '🐂',
      color: '#d97706'
    },

    // === 2. MAJOR CROP, GRAIN & PRODUCE BREADBASKETS ===
    {
      id: 'farm-j-g-boswell-ca',
      name: 'J.G. Boswell Corcoran Farm',
      category: 'crop_grain_farm',
      categoryLabel: 'Industrial Grain & Cotton Agro-Empire',
      region: 'Tulare Lake Bed / San Joaquin Valley',
      stateOrCountry: 'California, USA',
      coordinates: [-119.5601, 36.0980],
      acreage: 150000,
      primaryOutput: ['Pima Cotton', 'Tomatoes', 'Wheat', 'Alfalfa', 'Pistachios'],
      farmingPractice: 'Irrigated Precision',
      waterSource: 'Kings River, Friant-Kern Canal & deep aquifer wells',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Controls the historic Tulare Lake basin; premier supplier of high-yield durum wheat and industrial processing tomatoes.',
      operatorOrHeritage: 'J.G. Boswell Company',
      icon: '🌾',
      color: '#eab308'
    },
    {
      id: 'farm-red-river-valley-nd',
      name: 'Grandin Mega-Farms Basin',
      category: 'crop_grain_farm',
      categoryLabel: 'Bonanza Grain & Sugarbeet Operation',
      region: 'Red River Valley of the North',
      stateOrCountry: 'North Dakota, USA',
      coordinates: [-97.0012, 47.2358],
      acreage: 65000,
      primaryOutput: ['Hard Red Spring Wheat', 'Soybeans', 'Sugar Beets', 'Sunflowers'],
      farmingPractice: 'Conventional Commercial',
      waterSource: 'Deep glaciolacustrine black soil rainfall & Red River tributaries',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Richest agricultural topsoil in North America; primary national supplier of pasta durum and bread flour grain.',
      icon: '🌾',
      color: '#eab308'
    },
    {
      id: 'farm-kansas-wheat-belt',
      name: 'Smoky Hill Grain Plains',
      category: 'crop_grain_farm',
      categoryLabel: 'Hard Winter Wheat Producer',
      region: 'Smoky Hill River Basin',
      stateOrCountry: 'Kansas, USA',
      coordinates: [-100.8654, 38.8821],
      acreage: 48000,
      primaryOutput: ['Hard Red Winter Wheat', 'Sorghum (Milo)', 'Corn'],
      farmingPractice: 'Dryland Pasture',
      waterSource: 'Ogallala Aqueduct center-pivot and dryland fallow rotations',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Vital national strategic emergency grain reserves zone; direct railhead access to Gulf export ports.',
      icon: '🌾',
      color: '#eab308'
    },
    {
      id: 'farm-illinois-corn-belt',
      name: 'McLean County Corn & Soybean Hub',
      category: 'crop_grain_farm',
      categoryLabel: 'Prime Corn Belt Agro-Center',
      region: 'Central Illinois Till Plain',
      stateOrCountry: 'Illinois, USA',
      coordinates: [-88.9937, 40.4842],
      acreage: 72000,
      primaryOutput: ['Yellow Dent Corn', 'High-Protein Soybeans'],
      farmingPractice: 'Irrigated Precision',
      waterSource: 'Mahomet Aquifer & abundant summer Midwest precipitation',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Consistently ranks #1 in the nation for corn and soybean bushels produced per square mile.',
      icon: '🌽',
      color: '#eab308'
    },
    {
      id: 'farm-iowa-prairie-farms',
      name: 'Des Moines Lobe Agricultural Tract',
      category: 'crop_grain_farm',
      categoryLabel: 'Feedgrain & Biofuel Farmland',
      region: 'Des Moines Lobe Glacial Plain',
      stateOrCountry: 'Iowa, USA',
      coordinates: [-93.7123, 42.0345],
      acreage: 58000,
      primaryOutput: ['Field Corn', 'Non-GMO Soybeans', 'Oats'],
      farmingPractice: 'Conventional Commercial',
      waterSource: 'Raccoon River drainage & subsurface tile drainage networks',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'High organic matter prairie soils with massive grain silo elevators and seed processing infrastructure.',
      icon: '🌽',
      color: '#eab308'
    },
    {
      id: 'farm-salinas-valley-ca',
      name: 'Salinas Valley Salad Bowl Farmlands',
      category: 'crop_grain_farm',
      categoryLabel: 'Fresh Greens & Vegetable Capital',
      region: 'Salinas River Valley',
      stateOrCountry: 'California, USA',
      coordinates: [-121.5367, 36.5784],
      acreage: 85000,
      primaryOutput: ['Romaine Lettuce', 'Iceberg Lettuce', 'Broccoli', 'Spinach', 'Strawberries'],
      farmingPractice: 'Irrigated Precision',
      waterSource: 'Salinas River subterranean gravel flow & Nacimiento/San Antonio reservoirs',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Known as "The Salad Bowl of the World"; produces over 70% of the entire nation\'s lettuce and leafy greens.',
      operatorOrHeritage: 'Tanimura & Antle / Taylor Farms cooperatives',
      icon: '🥬',
      color: '#10b981'
    },

    // === 3. DAIRY FARMS & CHEESE CREAMERIES ===
    {
      id: 'dairy-fair-oaks-in',
      name: 'Fair Oaks Farms',
      category: 'dairy_farm',
      categoryLabel: 'Mega Dairy & Anaerobic Biogas Facility',
      region: 'Northwest Indiana Plains',
      stateOrCountry: 'Indiana, USA',
      coordinates: [-87.2014, 40.9782],
      acreage: 36000,
      primaryOutput: ['Grade-A Whole Milk', 'Artisan Cheese', 'Renewable Compressed Natural Gas'],
      farmingPractice: 'Conventional Commercial',
      waterSource: 'Deep glacial drift wells',
      livestockCapacity: '38,000 milking cows across 10 individual dairy barns',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Pioneered closed-loop farm waste processing where cow manure is converted to electricity and fuel for milk distribution trucks.',
      icon: '🥛',
      color: '#0284c7'
    },
    {
      id: 'dairy-tillamook-valley-or',
      name: 'Tillamook Valley Creamery Cooperative',
      category: 'dairy_farm',
      categoryLabel: 'Coastal Pasture Dairy Network',
      region: 'Tillamook Bay Watershed',
      stateOrCountry: 'Oregon, USA',
      coordinates: [-123.8432, 45.4789],
      acreage: 42000,
      primaryOutput: ['Cheddar Cheese', 'Sweet Cream Butter', 'Ice Cream'],
      farmingPractice: 'Heritage Sustainable',
      waterSource: 'Wilson & Trask River temperate rainforest rainfall (90+ inches/yr)',
      livestockCapacity: '25,000 grazing cows across 70 farmer-owned co-op dairies',
      foodResilienceRating: 'HIGH_LOCAL_SUPPLY',
      notableFeatures: 'Perpetual cool maritime climate guarantees year-round lush green rye-clover grass pastures.',
      operatorOrHeritage: 'Tillamook County Creamery Association (Est. 1909)',
      icon: '🧀',
      color: '#0284c7'
    },
    {
      id: 'dairy-craig-wisconsin',
      name: 'Craigslea Holsteins & Dairyland Co-op',
      category: 'dairy_farm',
      categoryLabel: 'Midwest Dairy Heritage Farmland',
      region: 'Driftless Area / Green County',
      stateOrCountry: 'Wisconsin, USA',
      coordinates: [-89.6412, 42.6041],
      acreage: 28000,
      primaryOutput: ['Raw Milk', 'Swiss & Gouda Cheeses', 'Alfalfa Silage'],
      farmingPractice: 'Heritage Sustainable',
      waterSource: 'Pecatonica River basin springs',
      livestockCapacity: '18,000 registered dairy cows',
      foodResilienceRating: 'HIGH_LOCAL_SUPPLY',
      notableFeatures: 'Center of American artisan cheese craftsmanship with master cheesemakers in continuous production for over 150 years.',
      icon: '🧀',
      color: '#0284c7'
    },
    {
      id: 'dairy-sunnyside-id',
      name: 'Snake River Valley Dairy Basin',
      category: 'dairy_farm',
      categoryLabel: 'High Desert Commercial Dairy',
      region: 'Snake River Plain / Magic Valley',
      stateOrCountry: 'Idaho, USA',
      coordinates: [-114.4608, 42.5629],
      acreage: 62000,
      primaryOutput: ['Mozzarella & Industrial Cheese Milk', 'Dry Whey', 'Alfalfa'],
      farmingPractice: 'Irrigated Precision',
      waterSource: 'Snake River Aquifer & Milner Dam canal diversions',
      livestockCapacity: '140,000 dairy cows in regional basin',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Largest concentration of dairy milk processing and cheese manufacturing plants in the Western hemisphere.',
      icon: '🥛',
      color: '#0284c7'
    },

    // === 4. ORCHARDS, VINEYARDS & CITRUS GROVES ===
    {
      id: 'orchard-napa-valley-ca',
      name: 'Rutherford & Oakville Premier Vineyards',
      category: 'orchard_vineyard',
      categoryLabel: 'World-Renowned Viticulture Basin',
      region: 'Napa Valley AVA',
      stateOrCountry: 'California, USA',
      coordinates: [-122.4222, 38.4589],
      acreage: 24000,
      primaryOutput: ['Cabernet Sauvignon', 'Chardonnay', 'Table Grapes'],
      farmingPractice: 'Heritage Sustainable',
      waterSource: 'Napa River, Conn Creek Reservoir & alluvial gravels',
      foodResilienceRating: 'SPECIALTY_PRODUCTION',
      notableFeatures: 'World benchmark terroir with Mediterranean microclimate, alluvial fans, and precision drip canopy management.',
      icon: '🍇',
      color: '#9333ea'
    },
    {
      id: 'orchard-yakima-valley-wa',
      name: 'Yakima Valley Apple & Hop Orchards',
      category: 'orchard_vineyard',
      categoryLabel: 'National Apple & Hop Breadbasket',
      region: 'Yakima River Basin',
      stateOrCountry: 'Washington, USA',
      coordinates: [-120.5059, 46.6021],
      acreage: 80000,
      primaryOutput: ['Honeycrisp Apples', 'Sweet Cherries', 'Pears', 'Brewing Hops'],
      farmingPractice: 'Irrigated Precision',
      waterSource: 'Yakima River Basin storage reservoirs fed by Cascade snowpack',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Produces over 70% of the entire US hop crop and over 60% of all commercial eating apples.',
      icon: '🍎',
      color: '#ef4444'
    },
    {
      id: 'orchard-palmetto-citrus-fl',
      name: 'Indian River Citrus Groves',
      category: 'orchard_vineyard',
      categoryLabel: 'Subtropical Citrus & Grapefruit Groves',
      region: 'Indian River Lagoon Basin',
      stateOrCountry: 'Florida, USA',
      coordinates: [-80.4856, 27.6433],
      acreage: 38000,
      primaryOutput: ['Ruby Red Grapefruit', 'Valencia & Navel Oranges', 'Honey Tangerines'],
      farmingPractice: 'Conventional Commercial',
      waterSource: 'Floridan Aquifer artesian wells & canal flood gates',
      foodResilienceRating: 'HIGH_LOCAL_SUPPLY',
      notableFeatures: 'Famous coquina shell marl soil imparts exceptional sweetness and juice content to commercial citrus.',
      icon: '🍊',
      color: '#f97316'
    },
    {
      id: 'orchard-hood-river-or',
      name: 'Hood River Valley Pear & Cherry Loop',
      category: 'orchard_vineyard',
      categoryLabel: 'Alpine Volcanic Fruit Orchards',
      region: 'Mount Hood Foothills',
      stateOrCountry: 'Oregon, USA',
      coordinates: [-121.5215, 45.6845],
      acreage: 18000,
      primaryOutput: ['Anjou & Bosc Pears', 'Bing Cherries', 'Heirloom Cider Apples'],
      farmingPractice: 'Organic Certified',
      waterSource: 'Mount Hood glacial runoff & East Fork irrigation district',
      foodResilienceRating: 'HIGH_LOCAL_SUPPLY',
      notableFeatures: 'Volcanic andisols enriched by ancient Mt. Hood volcanic ash; largest winter pear export district in the nation.',
      icon: '🍐',
      color: '#84cc16'
    },
    {
      id: 'orchard-san-joaquin-almonds',
      name: 'Central Valley Almond & Pistachio Belt',
      category: 'orchard_vineyard',
      categoryLabel: 'Global Nut Agriculture Zone',
      region: 'Fresno & Kern County Orchards',
      stateOrCountry: 'California, USA',
      coordinates: [-119.3458, 36.3214],
      acreage: 140000,
      primaryOutput: ['Nonpareil Almonds', 'Kerman Pistachios', 'Walnuts'],
      farmingPractice: 'Irrigated Precision',
      waterSource: 'Central Valley Project, Friant-Kern & micro-sprinkler wells',
      foodResilienceRating: 'CRITICAL_BREADBASKET',
      notableFeatures: 'Produces 80% of the world\'s entire almond supply and 99% of the US commercial tree nut crop.',
      icon: '🥜',
      color: '#b45309'
    },

    // === 5. REGENERATIVE, PERMACULTURE & ORGANIC FARMS ===
    {
      id: 'organic-polyface-va',
      name: 'Polyface Farm',
      category: 'organic_regenerative',
      categoryLabel: 'Regenerative Grass-Fed Beyond Organic Farm',
      region: 'Shenandoah Valley',
      stateOrCountry: 'Virginia, USA',
      coordinates: [-79.1764, 38.1345],
      acreage: 2000,
      primaryOutput: ['Pastured Poultry', 'Salad Bar Beef', 'Forest Pigaerator Pork', 'Pastured Eggs'],
      farmingPractice: 'Regenerative Holistic',
      waterSource: 'Gravity-fed mountain pond cisterns & rainwater catchment',
      livestockCapacity: 'Rotational multi-species mob grazing (cattle, chickens, pigs)',
      foodResilienceRating: 'STRATEGIC_SURPLUS',
      notableFeatures: 'World renowned pioneer of rotational biomimicry mob grazing; uses zero chemical fertilizers, herbicides, or GMO seeds.',
      operatorOrHeritage: 'Founded by Joel Salatin & Salatin Family',
      icon: '🌱',
      color: '#16a34a'
    },
    {
      id: 'organic-white-oak-pastures-ga',
      name: 'White Oak Pastures',
      category: 'organic_regenerative',
      categoryLabel: 'Radically Traditional Zero-Waste Farm',
      region: 'Southwest Georgia Coastal Plain',
      stateOrCountry: 'Georgia, USA',
      coordinates: [-84.7745, 31.4231],
      acreage: 3200,
      primaryOutput: ['Grass-Fed Beef', 'Pastured Heritage Turkeys', 'Iberico Pork', 'Organic Vegetables'],
      farmingPractice: 'Regenerative Holistic',
      waterSource: 'On-farm deep wells & rainwater swales',
      livestockCapacity: '10 humane species rotationally pastured together',
      foodResilienceRating: 'STRATEGIC_SURPLUS',
      notableFeatures: 'Largest certified organic and Savory Institute Land to Market verified regenerative meat operation in the Southeast; net-negative carbon footprint.',
      operatorOrHeritage: 'Managed by Will Harris (5th Generation Farm)',
      icon: '🌱',
      color: '#16a34a'
    },
    {
      id: 'organic-aprils-garden-vt',
      name: 'Bread & Butter Regenerative Creamery',
      category: 'organic_regenerative',
      categoryLabel: 'Pasture-Grazed Organic Dairy & Grains',
      region: 'Lake Champlain Lowlands',
      stateOrCountry: 'Vermont, USA',
      coordinates: [-73.2145, 44.3891],
      acreage: 1800,
      primaryOutput: ['100% Grass-Fed Jersey Milk', 'Heirloom Cornmeal', 'Pastured Pork'],
      farmingPractice: 'Organic Certified',
      waterSource: 'Glacial artesian springs',
      foodResilienceRating: 'HIGH_LOCAL_SUPPLY',
      notableFeatures: 'Pure pasture grazing with heritage grains and zero synthetic inputs serving New England food sovereignty network.',
      icon: '🌱',
      color: '#16a34a'
    },
    {
      id: 'organic-earthbound-farm-ca',
      name: 'Earthbound Farm Organic Mother Block',
      category: 'organic_regenerative',
      categoryLabel: 'Pioneer Organic Produce Ground',
      region: 'Carmel Valley',
      stateOrCountry: 'California, USA',
      coordinates: [-121.7824, 36.5123],
      acreage: 5000,
      primaryOutput: ['Certified Organic Baby Greens', 'Culinary Herbs', 'Heirloom Squash'],
      farmingPractice: 'Organic Certified',
      waterSource: 'Carmel River watershed wells',
      foodResilienceRating: 'HIGH_LOCAL_SUPPLY',
      notableFeatures: 'Birthplace of commercial bagged organic salad greens; proved large-scale organic agriculture viability in 1984.',
      operatorOrHeritage: 'Founded by Drew & Myra Goodman',
      icon: '🥬',
      color: '#16a34a'
    },

    // === 6. EQUINE & THOROUGHBRED HORSE RANCHES ===
    {
      id: 'equine-calumet-farm-ky',
      name: 'Calumet Farm',
      category: 'equine_ranch',
      categoryLabel: 'Historic Thoroughbred Stud & Horse Ranch',
      region: 'Kentucky Bluegrass Region',
      stateOrCountry: 'Kentucky, USA',
      coordinates: [-84.5781, 38.0489],
      acreage: 762,
      primaryOutput: ['Triple Crown Thoroughbred Stallions', 'Broodmares', 'Bluegrass Hay'],
      farmingPractice: 'Heritage Sustainable',
      waterSource: 'Limestone-filtered subterranean karst springs',
      livestockCapacity: '300+ elite thoroughbred racehorses',
      foodResilienceRating: 'SPECIALTY_PRODUCTION',
      notableFeatures: 'Legendary white board fences and red-roofed barns; bred two Triple Crown winners (Whirlaway & Citation).',
      operatorOrHeritage: 'Established 1924 by William Monroe Wright',
      icon: '🐎',
      color: '#a855f7'
    },
    {
      id: 'equine-four-sixes-tx',
      name: '6666 Ranch (Four Sixes)',
      category: 'equine_ranch',
      categoryLabel: 'Elite Quarter Horse & Angus Ranch',
      region: 'Guthrie / West Texas Plains',
      stateOrCountry: 'Texas, USA',
      coordinates: [-100.3214, 33.6124],
      acreage: 260000,
      primaryOutput: ['American Quarter Horses', 'Angus Seedstock', 'Performance Horses'],
      farmingPractice: 'Heritage Sustainable',
      waterSource: 'South Wichita River watershed & stock tanks',
      livestockCapacity: '6,000 cattle & 1,000 world champion bloodline horses',
      foodResilienceRating: 'HIGH_LOCAL_SUPPLY',
      notableFeatures: 'Premie stock-horse breeding operation in the world with state-of-the-art equine reproductive veterinary clinic.',
      operatorOrHeritage: 'Founded 1870 by Samuel Burk Burnett',
      icon: '🐎',
      color: '#a855f7'
    },
    {
      id: 'equine-claiborne-farm-ky',
      name: 'Claiborne Farm',
      category: 'equine_ranch',
      categoryLabel: 'Championship Thoroughbred Nursery',
      region: 'Bourbon County Bluegrass',
      stateOrCountry: 'Kentucky, USA',
      coordinates: [-84.2542, 38.2045],
      acreage: 3100,
      primaryOutput: ['Thoroughbred Racehorses', 'Stallion Service', 'Karst Pasture'],
      farmingPractice: 'Heritage Sustainable',
      waterSource: 'High-calcium limestone aquifer and Stoner Creek',
      livestockCapacity: '400 horses including global champion sires',
      foodResilienceRating: 'SPECIALTY_PRODUCTION',
      notableFeatures: 'Final resting place of Secretariat; high-calcium Bluegrass soil accelerates equine bone density and structural strength.',
      operatorOrHeritage: 'Hancock Family since 1910',
      icon: '🐎',
      color: '#a855f7'
    }
  ];

  /**
   * Generates GeoJSON FeatureCollection of all farms, ranches, and agricultural operations
   */
  public static getFarmsRanchesGeoJson() {
    return {
      type: 'FeatureCollection' as const,
      features: this.FARMS_RANCHES_CATALOG.map((f) => ({
        type: 'Feature' as const,
        id: f.id,
        properties: {
          id: f.id,
          name: f.name,
          category: f.category,
          categoryLabel: f.categoryLabel,
          region: f.region,
          stateOrCountry: f.stateOrCountry,
          acreage: f.acreage,
          acreageFormatted: `${f.acreage.toLocaleString()} acres`,
          primaryOutput: f.primaryOutput.join(', '),
          farmingPractice: f.farmingPractice,
          waterSource: f.waterSource,
          livestockCapacity: f.livestockCapacity || 'N/A',
          foodResilienceRating: f.foodResilienceRating,
          notableFeatures: f.notableFeatures,
          operatorOrHeritage: f.operatorOrHeritage || 'Independent Agriculture',
          icon: f.icon,
          color: f.color
        },
        geometry: {
          type: 'Point' as const,
          coordinates: f.coordinates
        }
      }))
    };
  }
}
