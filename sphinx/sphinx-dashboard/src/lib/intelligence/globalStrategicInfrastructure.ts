/**
 * GLOBAL STRATEGIC INFRASTRUCTURE CATALOG
 * Worldwide strategic petroleum reserves, mega-refineries, continental fuel pipelines,
 * strategic transboundary water canals/aqueducts, deep geological nuclear repositories,
 * and hemispheric early warning radars.
 */

export interface GlobalFacilityNode {
  id: string;
  name: string;
  category?: string;
  location: string;
  country: string;
  continent: string;
  coordinates: [number, number];
  [key: string]: any;
}

export const GLOBAL_STRATEGIC_PETROLEUM_RESERVES: GlobalFacilityNode[] = [
  {
    id: "spr-china-zhoushan",
    name: "Zhoushan National Strategic Petroleum Reserve",
    category: "Strategic Petroleum Reserve",
    location: "Zhoushan Archipelago, Zhejiang Province",
    country: "China",
    continent: "Asia",
    coordinates: [122.2072, 29.9856],
    capacityBarrels: 50000000,
    storageType: "Aboveground Steel Tanks & Underground Rock Caverns (Aoshan/Cezi Islands)",
    crudeTypes: ["Heavy Sour Crude", "Middle East Sweet"],
    drawdownRateBpd: 1200000,
    securityZone: "PLA Eastern Theater Command Coastal Defense / State Reserve Bureau Grade-1 Restricted Zone",
    status: "Operational Active Reserve"
  },
  {
    id: "spr-china-zhenhai",
    name: "Zhenhai National Crude Oil Reserve Base",
    category: "Strategic Petroleum Reserve",
    location: "Ningbo, Zhejiang Province",
    country: "China",
    continent: "Asia",
    coordinates: [121.6881, 29.9575],
    capacityBarrels: 52000000,
    storageType: "52x 100,000 m³ External Floating Roof Tanks",
    crudeTypes: ["Oman Crude", "Russian ESPO"],
    drawdownRateBpd: 1000000,
    securityZone: "Sinopec Zhenhai Refining Interconnect / PAP Armed Guard",
    status: "Operational Active Reserve"
  },
  {
    id: "spr-japan-shirashima",
    name: "Shirashima National Offshore Floating Oil Storage Terminal",
    category: "Strategic Petroleum Reserve",
    location: "Shirashima Island, Kitakyushu, Fukuoka Prefecture",
    country: "Japan",
    continent: "Asia",
    coordinates: [130.8256, 33.9983],
    capacityBarrels: 35000000,
    storageType: "8x Floating Steel Barges Protected by Giant Offshore Breakwater",
    crudeTypes: ["Arabian Light", "Murban Crude"],
    drawdownRateBpd: 800000,
    securityZone: "Japan Coast Guard 7th Regional HQ Maritime Security Zone / JOGMEC",
    status: "Operational National Reserve"
  },
  {
    id: "spr-japan-shibushi",
    name: "Shibushi National Oil Storage Base",
    category: "Strategic Petroleum Reserve",
    location: "Shibushi Bay, Kagoshima Prefecture",
    country: "Japan",
    continent: "Asia",
    coordinates: [131.1192, 31.4722],
    capacityBarrels: 31000000,
    storageType: "Aboveground Cylindrical Tanks on Reclaimed Coastal Land",
    crudeTypes: ["Middle Eastern Sweet & Sour Blend"],
    drawdownRateBpd: 750000,
    securityZone: "JOGMEC National Strategic Asset / Strict Maritime Exclusion Zone",
    status: "Operational National Reserve"
  },
  {
    id: "spr-korea-ulsan-knoc",
    name: "KNOC Ulsan Underground Oil Storage Cavern Complex",
    category: "Strategic Petroleum Reserve",
    location: "Ulju-gun, Ulsan Metropolitan City",
    country: "South Korea",
    continent: "Asia",
    coordinates: [129.3589, 35.4856],
    capacityBarrels: 40000000,
    storageType: "Unlined Hydrostatic Water-Curtain Rock Caverns (80m below sea level)",
    crudeTypes: ["Oman Crude", "Dubai Crude"],
    drawdownRateBpd: 900000,
    securityZone: "ROK Ministry of Trade, Industry and Energy / Defense Critical Infrastructure",
    status: "Operational Active Strategic Reserve"
  },
  {
    id: "spr-india-visakhapatnam",
    name: "ISPRL Visakhapatnam Underground Rock Caverns",
    category: "Strategic Petroleum Reserve",
    location: "Visakhapatnam, Andhra Pradesh",
    country: "India",
    continent: "Asia",
    coordinates: [83.2185, 17.6868],
    capacityBarrels: 9770000,
    storageType: "Underground Hydrodynamic Water-Sealed Rock Caverns",
    crudeTypes: ["High-Sulfur Arabian Mix"],
    drawdownRateBpd: 350000,
    securityZone: "Indian Strategic Petroleum Reserves Ltd / CISF Paramilitary Security",
    status: "Operational Active Strategic Reserve"
  },
  {
    id: "spr-india-mangalore",
    name: "ISPRL Mangalore Strategic Crude Storage",
    category: "Strategic Petroleum Reserve",
    location: "Mangalore, Karnataka (Arabian Sea Coast)",
    country: "India",
    continent: "Asia",
    coordinates: [74.856, 12.9141],
    capacityBarrels: 11000000,
    storageType: "Deep Granite Rock Caverns",
    crudeTypes: ["Basrah Light", "ADNOC Das Blend"],
    drawdownRateBpd: 400000,
    securityZone: "CISF Strategic Installation Security Force",
    status: "Operational Active Strategic Reserve"
  },
  {
    id: "spr-germany-wilhelmshaven",
    name: "EBV Rüstringen Salt Cavern Petroleum Reserve",
    category: "Strategic Petroleum Reserve",
    location: "Wilhelmshaven, Lower Saxony",
    country: "Germany",
    continent: "Europe",
    coordinates: [8.0833, 53.5833],
    capacityBarrels: 50000000,
    storageType: "Solution-Mined Salt Dome Caverns (Deep Underground)",
    crudeTypes: ["North Sea Brent", "Urals Substitute Light"],
    drawdownRateBpd: 1100000,
    securityZone: "Erdölbevorratungsverband (EBV) / Federal Critical Infrastructure",
    status: "Operational EU 90-Day Mandate Reserve"
  },
  {
    id: "spr-france-manosque",
    name: "Géosel Manosque Underground Hydrocarbon Storage Caverns",
    category: "Strategic Petroleum Reserve",
    location: "Manosque, Alpes-de-Haute-Provence",
    country: "France",
    continent: "Europe",
    coordinates: [5.7833, 43.8333],
    capacityBarrels: 58000000,
    storageType: "30 Salt Caverns excavated in Dauphin Saline Basin (500–1000m depth)",
    crudeTypes: ["Light Arabian", "Sahara Blend", "Diesel Reserve"],
    drawdownRateBpd: 850000,
    securityZone: "SAGESS Strategic Stockpile / Gendarmerie Protected Zone",
    status: "Operational EU Strategic Reserve"
  }
];

export const GLOBAL_MAJOR_REFINERIES = [
  {
    id: "ref-jamnagar-india",
    name: "Jamnagar Refinery Complex (World's Largest Petroleum Refining Hub)",
    operator: "Reliance Industries Ltd",
    coordinates: [69.8286, 22.3556],
    cityState: "Jamnagar, Gujarat, India",
    crudeCapacityBpd: 1240000,
    primaryOutputs: ["Ultra-Clean Euro VI Diesel", "Aviation Turbine Fuel", "Gasoline", "Petrochemical Feedstock"],
    complexityIndex: 21.1,
    criticalGridInterconnect: "Captive 4000MW Cogeneration + Gujarat Energy Transmission (GETCO) 400kV",
    emergencyContact: "Reliance Crisis Management Cell Jamnagar"
  },
  {
    id: "ref-ulsan-sk-korea",
    name: "SK Energy Ulsan Refinery (Asia-Pacific Energy Spine)",
    operator: "SK Innovation",
    coordinates: [129.3528, 35.5083],
    cityState: "Ulsan Metropolitan City, South Korea",
    crudeCapacityBpd: 840000,
    primaryOutputs: ["Low-Sulfur Marine Gasoil", "Jet-A1", "Ultra-Low Sulfur Diesel", "Paraxylene"],
    complexityIndex: 16.8,
    criticalGridInterconnect: "KEPCO 345kV Nuclear/Thermal Grid Intertie",
    emergencyContact: "Ulsan Petrochemical Emergency Dispatch"
  },
  {
    id: "ref-ruwais-adnoc-uae",
    name: "Ruwais Refining Complex (Middle East Mega Hub)",
    operator: "ADNOC Refining",
    coordinates: [52.7306, 24.1111],
    cityState: "Al Ruwais Industrial City, Abu Dhabi, UAE",
    crudeCapacityBpd: 837000,
    primaryOutputs: ["Aviation Fuel", "Euro-6 Gasoline", "Carbon Black", "Base Oils (Group III)"],
    complexityIndex: 17.4,
    criticalGridInterconnect: "EWEC 400kV Grid Interconnection",
    emergencyContact: "ADNOC Corporate Emergency Operation Center"
  },
  {
    id: "ref-yeosu-gs-korea",
    name: "GS Caltex Yeosu Refinery",
    operator: "GS Caltex (Chevron & GS Joint Venture)",
    coordinates: [127.7289, 34.8028],
    cityState: "Yeosu, South Jeolla Province, South Korea",
    crudeCapacityBpd: 800000,
    primaryOutputs: ["Aviation Kerosene", "High-Octane Gasoline", "Lube Base Oils"],
    complexityIndex: 17.2,
    criticalGridInterconnect: "KEPCO 345kV Gwangyang-Yeosu Substation",
    emergencyContact: "Yeosu National Industrial Complex Fire Station"
  },
  {
    id: "ref-jurong-island-singapore",
    name: "Jurong Island Integrated Refining & Petrochemical Hub",
    operator: "ExxonMobil Asia Pacific / Shell Singapore",
    coordinates: [103.7083, 1.2667],
    cityState: "Jurong Island, Singapore",
    crudeCapacityBpd: 605000,
    primaryOutputs: ["Aviation Fuel (Changi Airport Direct Pipeline)", "Bunker Fuel", "Naphtha"],
    complexityIndex: 18.5,
    criticalGridInterconnect: "SP Group 400kV Transmission Ring",
    emergencyContact: "Singapore Civil Defence Force (SCDF) 1st CD Division"
  },
  {
    id: "ref-ras-tanura-aramco",
    name: "Ras Tanura Refinery & Crude Export Terminal",
    operator: "Saudi Aramco",
    coordinates: [50.1583, 26.6433],
    cityState: "Ras Tanura, Eastern Province, Saudi Arabia",
    crudeCapacityBpd: 550000,
    primaryOutputs: ["Light Distillates", "Diesel", "Jet Fuel", "Liquefied Petroleum Gas"],
    complexityIndex: 15.9,
    criticalGridInterconnect: "SEC Eastern Operating Area 380kV Intertie",
    emergencyContact: "Aramco Loss Prevention & Crisis Response Department"
  },
  {
    id: "ref-pernis-rotterdam-shell",
    name: "Shell Pernis Refinery (Largest Refining Complex in Europe)",
    operator: "Shell Nederland Raffinaderij B.V.",
    coordinates: [4.3833, 51.8833],
    cityState: "Rotterdam, South Holland, Netherlands",
    crudeCapacityBpd: 404000,
    primaryOutputs: ["Ultra-Low Sulfur Diesel", "Sustainable Aviation Fuel (SAF)", "Gasoline", "Chemical Feedstocks"],
    complexityIndex: 16.7,
    criticalGridInterconnect: "TenneT 380kV Maasvlakte-Crayestein Backbone",
    emergencyContact: "Gezamenlijke Brandweer (Port of Rotterdam Joint Fire Service)"
  },
  {
    id: "ref-paraguana-venezuela",
    name: "Paraguaná Refining Center (CRP - Amuay & Cardón)",
    operator: "Petróleos de Venezuela, S.A. (PDVSA)",
    coordinates: [-70.2167, 11.75],
    cityState: "Punto Fijo, Falcón State, Venezuela",
    crudeCapacityBpd: 955000,
    primaryOutputs: ["Gasoline", "Residual Fuel Oil", "Distillates"],
    complexityIndex: 14.2,
    criticalGridInterconnect: "Corpoelec 230kV Northwestern Grid",
    emergencyContact: "CRP Industrial Safety Control Center"
  }
];

export const GLOBAL_CONTINENTAL_PIPELINES = [
  {
    id: "pipe-druzhba",
    name: "Druzhba Oil Pipeline ('Friendship' Pipeline - World's Longest Artery)",
    operator: "Transneft / Gomeltransneft / PERN / MERO / Transpetrol / MOL",
    lengthMiles: 2500,
    capacityBpd: 1400000,
    suppliesPctEastCoast: 0,
    coordinates: [
      [52.05, 53.25],   // Samara, Russia
      [31.0, 52.4],     // Mozyr Hub, Belarus
      [23.1, 52.1],     // Brest, Belarus border
      [21.0, 52.2],     // Warsaw, Poland
      [14.4, 52.5],     // Schwedt Refinery, Germany
      [22.2, 48.6],     // Uzhgorod, Ukraine
      [17.1, 48.1],     // Bratislava, Slovakia
      [14.4, 50.1]      // Prague, Czechia
    ],
    criticalEngineeringNode: "Mozyr Pipeline Junction (Splits northern route to Poland/Germany and southern route to Slovakia/Hungary)",
    geopoliticalVulnerability: "Crosses active European conflict corridor and sanctions choke points"
  },
  {
    id: "pipe-nord-stream-corridor",
    name: "Nord Stream 1 & 2 Subsea Baltic Corridor",
    operator: "Nord Stream AG",
    lengthMiles: 759,
    capacityBpd: 1900000,
    suppliesPctEastCoast: 0,
    coordinates: [
      [28.05, 59.95],   // Vyborg / Ust-Luga, Russia
      [25.0, 59.5],     // Gulf of Finland
      [19.0, 57.0],     // Central Baltic Sea
      [15.5, 55.3],     // Near Bornholm Island (Sabotage detonation zone)
      [13.6, 54.1]      // Lubmin landfall, Germany
    ],
    criticalEngineeringNode: "Portovaya & Slavyanskaya Giant Gas Compressor Stations (Capable of 220 bar subsea injection)",
    geopoliticalVulnerability: "Critical subsea infrastructure demonstrated vulnerable to underwater explosive demolition"
  },
  {
    id: "pipe-transmed",
    name: "Trans-Mediterranean Natural Gas Pipeline (Enrico Mattei)",
    operator: "Sonatrach / Eni",
    lengthMiles: 1539,
    capacityBpd: 1800000,
    suppliesPctEastCoast: 0,
    coordinates: [
      [3.18, 31.85],    // Hassi R'Mel Gas Field, Algeria
      [8.5, 35.8],      // Feriana, Tunisia border
      [11.0, 36.9],     // Cap Bon, Tunisia
      [12.4, 37.6],     // Mazara del Vallo landfall, Sicily
      [15.6, 38.2],     // Strait of Messina subsea crossing
      [12.5, 41.9],     // Rome Metro Intertie
      [11.0, 44.5]      // Minerbio Gas Hub, Bologna, Italy
    ],
    criticalEngineeringNode: "Cap Bon Subsea Marine Terminal (Pumps gas through Sicilian Channel at depths up to 600m)",
    geopoliticalVulnerability: "Essential lifeline for 30%+ of Italian industrial gas demand, high Mediterranean seismic hazard"
  },
  {
    id: "pipe-west-east-gas-china",
    name: "West-East Gas Pipeline Network (Tarim to Shanghai)",
    operator: "PipeChina (China Oil & Gas Piping Network Corp)",
    lengthMiles: 5410,
    capacityBpd: 2100000,
    suppliesPctEastCoast: 0,
    coordinates: [
      [81.3, 41.7],     // Tarim Basin / Lunnan, Xinjiang
      [94.6, 40.1],     // Dunhuang, Gansu
      [103.8, 36.0],    // Lanzhou Yellow River crossing
      [108.9, 34.3],    // Xi'an, Shaanxi
      [114.3, 30.5],    // Wuhan Yangtze River crossing
      [118.8, 32.0],    // Nanjing
      [121.4, 31.2],    // Shanghai Landfall Terminal
      [114.1, 22.3]     // Hong Kong Dapeng Branch
    ],
    criticalEngineeringNode: "Zhongwei Relay Compression Station (Gansu/Ningxia desert mega junction)",
    geopoliticalVulnerability: "Spans extreme seismic zones, Taklamakan desert sand migration, and Loess Plateau landslide corridors"
  },
  {
    id: "pipe-btc-caucasus",
    name: "Baku-Tbilisi-Ceyhan (BTC) Crude Oil Pipeline",
    operator: "BP / BTC Co. Consortium",
    lengthMiles: 1099,
    capacityBpd: 1200000,
    suppliesPctEastCoast: 0,
    coordinates: [
      [49.8671, 40.4093], // Sangachal Terminal, Baku, Azerbaijan
      [44.7833, 41.7167], // Tbilisi, Georgia
      [43.0, 41.0],       // Georgian-Turkish Border
      [39.0, 39.5],       // Eastern Anatolian Plateau
      [35.8, 36.8]        // Ceyhan Marine Export Terminal, Mediterranean Coast, Turkey
    ],
    criticalEngineeringNode: "Kura River Gorge & Anatolian Mountain Pumping Stations (Lifts crude to 2,830m elevation pass)",
    geopoliticalVulnerability: "Crosses East Anatolian & North Anatolian active seismic fault systems and Caucasus geopolitical hotspots"
  },
  {
    id: "pipe-espo-pacific",
    name: "Eastern Siberia-Pacific Ocean Oil Pipeline (ESPO)",
    operator: "Transneft",
    lengthMiles: 3018,
    capacityBpd: 1600000,
    suppliesPctEastCoast: 0,
    coordinates: [
      [98.0, 56.0],       // Taishet, Irkutsk Oblast, Russia
      [105.0, 56.5],      // Ust-Kut, Lena River
      [120.0, 60.0],      // Aldan, Sakha Republic (Permafrost)
      [126.0, 53.0],      // Skovorodino (Offshoot branch to Daqing, China)
      [135.0, 48.5],      // Khabarovsk Amur River Crossing
      [133.0, 42.8]       // Kozmino Port Terminal (Sea of Japan / Pacific Ocean)
    ],
    criticalEngineeringNode: "Lena River and Amur River Sub-fluvial Crossings and Permafrost Thermopile Foundations",
    geopoliticalVulnerability: "Severe permafrost thaw degradation due to Siberian warming; solitary crude outlet to Asia-Pacific"
  }
];

export const GLOBAL_WATER_CANALS_AND_AQUEDUCTS = [
  {
    id: "aqua-panama-canal",
    name: "Panama Canal & Gatun Lake Hydrological Artery",
    operator: "Panama Canal Authority (ACP)",
    lengthMiles: 51,
    designFlowCfs: 14000,
    suppliesPopulation: 2500000,
    coordinates: [
      [-79.55, 8.95],   // Miraflores Locks, Pacific Entrance
      [-79.61, 9.02],   // Pedro Miguel Locks & Culebra Cut
      [-79.80, 9.15],   // Gatun Lake Core Reservoir
      [-79.91, 9.27]    // Gatun / Agua Clara Locks, Caribbean Entrance
    ],
    criticalEngineeringNode: "Gatun Dam & Spillway (Controls artificial lake supplying fresh lockage water for transoceanic ships and Panama City drinking water)",
    vulnerability: "Severe El Niño drought curtails daily transit ship slots; vulnerable to Gatun Dam earthen crest failure or sabotage"
  },
  {
    id: "aqua-suez-canal",
    name: "Suez Canal Maritime Lifeline",
    operator: "Suez Canal Authority (SCA)",
    lengthMiles: 120,
    designFlowCfs: 0,
    suppliesPopulation: 1200000,
    coordinates: [
      [32.31, 31.26],   // Port Said, Mediterranean Entrance
      [32.32, 30.70],   // El Qantara
      [32.34, 30.40],   // Great Bitter Lake (Bypass and Anchorage)
      [32.55, 29.93]    // Port Tewfik / Suez, Red Sea Entrance
    ],
    criticalEngineeringNode: "Ballah Bypass Channel & Ahmed Hamdi Under-Canal Road Tunnel",
    vulnerability: "Single point of failure for 12% of global seaborne commerce; vessel grounding (e.g. Ever Given) paralyzes supply chains"
  },
  {
    id: "aqua-south-north-water-china",
    name: "South-North Water Transfer Project (Middle Route)",
    operator: "China South-to-North Water Diversion Corporation",
    lengthMiles: 890,
    designFlowCfs: 12360,
    suppliesPopulation: 85000000,
    coordinates: [
      [111.5, 32.5],    // Danjiangkou Dam Reservoir, Hubei
      [113.0, 34.0],    // Henan agricultural plains canal
      [113.5, 34.9],    // Yellow River Tunnel Aqueduct (Twin 4km shield-bored tunnels under Yellow River bed)
      [114.5, 36.5],    // Handan, Hebei
      [115.5, 38.5],    // Baoding
      [116.3, 39.9]     // Beijing Tuancheng Lake Reservoir / Summer Palace terminus
    ],
    criticalEngineeringNode: "Yellow River Inverted Siphon (Dual bored pressurized tunnels 30 meters beneath the silted Yellow River bed)",
    vulnerability: "Sole primary fresh drinking water supply for Beijing and Tianjin; seismic rupture of elevated flumes causes capital-wide dehydration"
  },
  {
    id: "aqua-great-man-made-river",
    name: "Great Man-Made River Project (GMMR - Nubian Sandstone Aquifer)",
    operator: "Great Man-Made River Authority (Libya)",
    lengthMiles: 1750,
    designFlowCfs: 23000,
    suppliesPopulation: 6500000,
    coordinates: [
      [23.5, 24.2],     // Kufra Basin Deep Wellfields (Fossil Aquifer)
      [21.5, 27.5],     // Sarir Wellfield Hub
      [20.0, 30.8],     // Ajdabiya Holding Reservoir
      [20.1, 32.1],     // Benghazi Coastal Distribution
      [15.1, 32.3],     // Sirte
      [13.2, 32.8]      // Tripoli Coastal Distribution Network
    ],
    criticalEngineeringNode: "Ajdabiya Prestressed Concrete Pipe Reservoir (4-meter diameter prestressed cylinder pipes traversing 1,000 km of hyper-arid desert)",
    vulnerability: "Non-renewable fossil groundwater depletion; vulnerable to militia attacks, chlorine supply cutoff, and sabotage of desert electrical pumping fields"
  },
  {
    id: "aqua-tagus-segura-spain",
    name: "Tagus-Segura Water Transfer Aqueduct (Trasvase Tajo-Segura)",
    operator: "Confederación Hidrográfica del Segura / MITECO",
    lengthMiles: 178,
    designFlowCfs: 1160,
    suppliesPopulation: 2500000,
    coordinates: [
      [-2.65, 40.58],   // Bolarque Reservoir (Tagus River)
      [-2.55, 39.85],   // Altomira Tunnel (32 km mountain tunnel)
      [-2.05, 39.25],   // Alarcón Reservoir intertie
      [-1.45, 38.45],   // Talave Tunnel & Talave Reservoir
      [-1.13, 37.98]    // Segura River Basin distribution network (Murcia / Alicante)
    ],
    criticalEngineeringNode: "Altomira Pressure Tunnel and Bujeda Lift Pump Station (Lifts water 245m across Iberian mountain divide)",
    vulnerability: "Severe Iberian droughts, agricultural over-exploitation, and regional inter-basin political water conflicts"
  },
  {
    id: "aqua-snowy-mountains-australia",
    name: "Snowy Mountains Hydroelectric & Irrigation Scheme",
    operator: "Snowy Hydro Limited",
    lengthMiles: 145,
    designFlowCfs: 4500,
    suppliesPopulation: 3000000,
    coordinates: [
      [148.68, -35.95], // Lake Eucumbene (Core storage reservoir)
      [148.42, -35.88], // Jindabyne Pumping Station
      [148.29, -35.75], // Murray 1 & 2 Power Stations / Murray River Diversion
      [148.33, -35.53]  // Tumut 1, 2 & 3 Underground Stations / Murrumbidgee Irrigation
    ],
    criticalEngineeringNode: "Eucumbene-Snowy & Eucumbene-Tumut Trans-Mountain Granite Pressure Tunnels (Crosses Great Dividing Range)",
    vulnerability: "Critical irrigation supply for Murray-Darling Food Bowl; bushfire debris sedimentation and climate-induced alpine snowpack loss"
  }
];

export const GLOBAL_NUCLEAR_REPOSITORIES_AND_STORAGE: GlobalFacilityNode[] = [
  {
    id: "isfsi-onkalo-finland",
    name: "Onkalo Deep Geological Spent Fuel Repository",
    category: "Nuclear Deep Geological Repository",
    location: "Olkiluoto Island, Eurajoki Municipality",
    country: "Finland",
    continent: "Europe",
    coordinates: [21.4828, 61.2389],
    caskType: "Cast Iron & Pure Copper Double Canisters Embedded in Bentonite Clay (450m Granite Bedrock)",
    spentFuelTons: 6500,
    totalAssemblies: 12000,
    hazards: "World's first permanent 100,000-year deep geological repository; post-glacial seismicity and copper corrosion monitoring",
    status: "Under Commissioning / Licensing (World First Final Repository)"
  },
  {
    id: "isfsi-sellafield-uk",
    name: "Sellafield Nuclear Fuel Reprocessing & ISFSI Complex",
    category: "Nuclear ISFSI & Reprocessing Facility",
    location: "Seascale, Cumbria (Irish Sea Coast)",
    country: "United Kingdom",
    continent: "Europe",
    coordinates: [-3.4989, 54.4194],
    caskType: "Vitrified High-Level Waste (HLW) Stainless Steel Canisters & Encapsulated Actinide Silos",
    spentFuelTons: 8500,
    totalAssemblies: 24000,
    hazards: "Legacy Magnox swarf ponds, high-level liquid waste tanks requiring continuous active cooling, Irish Sea storm inundation",
    status: "Active Decommissioning and National Spent Nuclear Materials Storage"
  },
  {
    id: "isfsi-la-hague-france",
    name: "Orano La Hague Nuclear Fuel Recycling & Vitrification Plant",
    category: "Nuclear Fuel Recycling & Storage Hub",
    location: "La Hague, Cotentin Peninsula, Normandy",
    country: "France",
    continent: "Europe",
    coordinates: [-1.8817, 49.6781],
    caskType: "UP2-800 & UP3 Dry Storage Wells & Stainless Steel Vitrification Canisters",
    spentFuelTons: 10000,
    totalAssemblies: 32000,
    hazards: "World's largest commercial light water spent fuel center; English Channel coastal fog corrosion, aircraft crash hardening",
    status: "Fully Operational Commercial Recycling & Vitrified Storage"
  },
  {
    id: "isfsi-chernobyl-nsc-ukraine",
    name: "Chernobyl New Safe Confinement (NSC) & ISFSI-2",
    category: "Severe Disaster Confinement & Dry Storage",
    location: "Pripyat / Chernobyl Exclusion Zone, Kyiv Oblast",
    country: "Ukraine",
    continent: "Europe",
    coordinates: [30.0994, 51.3892],
    caskType: "36,000-ton Movable Mega Steel Arch + Holtec Double-Walled Canister Dry Storage (ISFSI-2)",
    spentFuelTons: 2600,
    totalAssemblies: 21284,
    hazards: "Degraded Unit 4 fuel corium mass (Elephant's Foot), active armed conflict corridor, grid loss to ventilation systems",
    status: "100-Year Confinement Enclosure & Active Dry Storage"
  },
  {
    id: "isfsi-fukushima-daiichi-japan",
    name: "Fukushima Daiichi Common Spent Fuel Pool & Cask Custody",
    category: "Disaster Site ISFSI & Treated Storage",
    location: "Okuma & Futaba, Fukushima Prefecture",
    country: "Japan",
    continent: "Asia",
    coordinates: [141.0328, 37.4214],
    caskType: "On-site Reinforced Concrete Dry Cask Storage Yard + ALPS Treated Water Storage Area",
    spentFuelTons: 3800,
    totalAssemblies: 6375,
    hazards: "Tohoku seismicity, Pacific tsunami vulnerability, highly radioactive molten fuel debris inside Units 1–3 containments",
    status: "Active 40-Year Decommissioning & Stabilization Phase"
  },
  {
    id: "isfsi-mayak-russia",
    name: "Mayak Production Association & Techa River Waste Complex",
    category: "Nuclear Weapons Waste & Vitrification Complex",
    location: "Ozyorsk, Chelyabinsk Oblast (Southern Urals)",
    country: "Russia",
    continent: "Asia",
    coordinates: [60.85, 55.71],
    caskType: "Vitrified Borosilicate High-Level Blocks + Covered Lake Karachay (Reservoir V-9) Concrete Capping",
    spentFuelTons: 7000,
    totalAssemblies: 18000,
    hazards: "Historical Kyshtym disaster epicenter; covered radioactive lakebed susceptible to extreme drought aerosolization and radioactive water table migration",
    status: "Closed High-Security Strategic Facility"
  }
];

export const GLOBAL_EARLY_WARNING_RADARS: GlobalFacilityNode[] = [
  {
    id: "radar-raf-fylingdales-uk",
    name: "RAF Fylingdales Solid-State Phased Array Radar (SSPAR)",
    operator: "Royal Air Force / US Space Force (Space Delta 4)",
    location: "Snod Hill, North Yorkshire Moors, England",
    country: "United Kingdom",
    continent: "Europe",
    coordinates: [-0.6722, 54.3606],
    radarType: "AN/FPS-132 SSPAR (3-Sided Truncated Pyramid)",
    architecture: "3-Face Active Electronically Scanned Array (AESA)",
    frequencyBand: "UHF (420–450 MHz)",
    rangeMiles: 3000,
    azimuthCoverageDeg: 360,
    primaryMission: "Full 360-degree Euro-Atlantic Ballistic Missile Early Warning System (BMEWS) and Deep Space Surveillance",
    empHardening: "Fully EMP-Shielded Heavy Concrete Pyramid Bunker"
  },
  {
    id: "radar-thule-pituffik-greenland",
    name: "Pituffik Space Base UEWR (12th Space Warning Squadron)",
    operator: "United States Space Force (Space Delta 4)",
    location: "Pituffik Space Base (Formerly Thule Air Base), Northern Greenland",
    country: "Greenland (Denmark)",
    continent: "North America",
    coordinates: [-68.7561, 76.5317],
    radarType: "AN/FPS-132 Upgraded Early Warning Radar (UEWR)",
    architecture: "Dual-Face High-Power Phased Array Structure",
    frequencyBand: "UHF (420–450 MHz)",
    rangeMiles: 3000,
    azimuthCoverageDeg: 240,
    primaryMission: "Detects polar Arctic ICBM trajectories targeting North America and Europe; low Earth orbit surveillance",
    empHardening: "Arctic Permafrost Foundation with Full EMP Isolation"
  },
  {
    id: "radar-globus-vardo-norway",
    name: "Globus III Advanced Space & Intelligence Radar (HAVE STARE)",
    operator: "Norwegian Intelligence Service (Etterretningstjenesten) / US Space Force",
    location: "Vardø, Finnmark (Barents Sea Arctic Coast)",
    country: "Norway",
    continent: "Europe",
    coordinates: [31.1083, 70.3667],
    radarType: "AN/FPS-129 HAVE STARE High-Power X-Band Phased Tracking Radar",
    architecture: "Enclosed Arctic Radome Housing Steerable Monopulse Cassegrain / Phased Array System",
    frequencyBand: "X-Band High-Resolution Imaging",
    rangeMiles: 2500,
    azimuthCoverageDeg: 180,
    primaryMission: "Tracks Russian Northern Fleet missile launches, Kola Peninsula submarine tests, and orbital intelligence targets",
    empHardening: "Extreme Arctic Storm-Hardened and High-Level Electronic Counter-Countermeasures"
  },
  {
    id: "radar-voronezh-armavir-russia",
    name: "Armavir Voronezh-DM Early Warning Radar Complex",
    operator: "Russian Aerospace Forces (VKS - 15th Aerospace Army)",
    location: "Armavir, Krasnodar Krai, Russia",
    country: "Russia",
    continent: "Europe",
    coordinates: [40.9833, 44.9167],
    radarType: "Voronezh-DM High-Potential Phased Array Radar",
    architecture: "Modular High-Rise Phased Array Antenna Building (Two Array Sectors)",
    frequencyBand: "Decimeter Band (UHF)",
    rangeMiles: 3700,
    azimuthCoverageDeg: 245,
    primaryMission: "Early warning surveillance of Middle East, Mediterranean, and South European ballistic missile corridors",
    empHardening: "Protected Subterranean Generator Vaults & Hardened Waveguides"
  },
  {
    id: "radar-jorn-australia",
    name: "Jindalee Operational Radar Network (JORN Over-The-Horizon Radar)",
    operator: "Royal Australian Air Force (No. 1 Remote Sensor Unit)",
    location: "Longreach (QLD) & Laverton (WA), Continental Australia",
    country: "Australia",
    continent: "Oceania",
    coordinates: [144.25, -23.44],
    radarType: "Over-The-Horizon Backscatter Radar (OTHR)",
    architecture: "Ionospheric Skywave HF Arrays (Transmitter arrays stretching kilometers across the outback)",
    frequencyBand: "High Frequency (HF 5–30 MHz)",
    rangeMiles: 1900,
    azimuthCoverageDeg: 180,
    primaryMission: "Wide-area oceanic surveillance of northern maritime approaches across Timor, Arafura seas and Indian Ocean",
    empHardening: "Dispersed Continental Footprint with Redundant Outback Power Generation"
  },
  {
    id: "radar-pine-gap-australia",
    name: "Joint Defence Facility Pine Gap (Satellite Early Warning Downlink)",
    operator: "Australian Department of Defence & US National Reconnaissance Office / CIA / NSA",
    location: "Alice Springs, Northern Territory",
    country: "Australia",
    continent: "Oceania",
    coordinates: [133.7372, -23.7994],
    radarType: "Multi-Dish Satellite Defense Downlink & SIGINT Intercept Array",
    architecture: "38+ High-Gain Satellite Tracking Radomes in Valley Depression",
    frequencyBand: "Microwave S/C/X/Ku/Ka Bands",
    rangeMiles: 22000,
    azimuthCoverageDeg: 360,
    primaryMission: "Downlinks infrared missile early warning telemetry from US SBIRS/DSP geostationary satellites covering Eurasia",
    empHardening: "Top-Secret Subterranean Complex with Comprehensive Tempest & EMP Hardening"
  }
];
