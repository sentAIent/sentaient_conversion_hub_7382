// criticalInfrastructureEngine.ts
// Comprehensive Geospatial Critical Infrastructure Engine
// Covers:
// 1. High-Voltage Power Lines, Corridors & Pylons (115kV, 230kV, 345kV, 500kV, 765kV)
// 2. Utility Companies & Major Generation Plants (Electric, Gas, Water, Nuclear, Hydro, Solar)
// 3. Terrestrial Long-Haul Fiberoptic Backbones & Data Center Interconnect (DCI) Cables
// 4. Hospitals & Trauma Centers (Level I - IV, Heliports, Acute Care)
// 5. Urgent Care & Emergency Medical Dispatch Infrastructure (EMS, Fire Rescue, Walk-In)

export interface PowerLineCorridor {
  id: string;
  name: string;
  voltageKv: number;
  circuitType: 'HVAC' | 'HVDC';
  operator: string;
  gridInterconnection: 'WECC' | 'Eastern Interconnection' | 'ERCOT' | 'Hydro-Québec';
  status: 'OPERATIONAL_ENERGIZED' | 'PLANNED_EXPANSION' | 'MAINTENANCE_DERATED';
  path: [number, number][]; // [lon, lat][]
  conductorType: string;
  substations: string[];
}

export interface UtilityCompanyFacility {
  id: string;
  name: string;
  utilitySector: 'Electric' | 'Gas' | 'Water' | 'Multi-Utility';
  operator: string;
  facilityType: 'Substation Hub' | 'Nuclear Plant' | 'Hydroelectric Dam' | 'Combined Cycle Gas' | 'Solar/Wind Facility' | 'Water Treatment & Aqueduct' | 'Wind Farm' | 'Solar Farm' | 'Hydroelectric Plant' | 'Battery Storage (BESS)' | 'Geothermal Complex' | 'Desalination Plant' | 'Water Treatment Facility' | string;
  capacityMw?: number;
  lat: number;
  lon: number;
  serviceArea: string;
  emergencyContact: string;
  regulatoryJurisdiction: string;
  powerGenDetails?: any;
  waterTreatmentDetails?: any;
  [key: string]: any;
}

export interface FiberopticDataCable {
  id: string;
  name: string;
  cableCategory: 'Terrestrial Long-Haul Backbone' | 'Data Center Interconnect (DCI)' | 'Metro Dark Fiber' | 'Subsea Backhaul Link';
  operator: string;
  conduitType: 'Underground Armored Conduit' | 'Aerial OPGW on High-Voltage Line' | 'Subsea Feeder';
  fiberPairs: number;
  capacityTbps: number;
  latencyTier: 'Ultra-Low Latency (<5ms)' | 'Express Route (<15ms)' | 'Standard Transit';
  connectingHubs: string[];
  path: [number, number][]; // [lon, lat][]
}

export interface HospitalFacility {
  id: string;
  name: string;
  traumaLevel: 'Trauma Level I' | 'Trauma Level II' | 'Trauma Level III' | 'Trauma Level IV' | 'Acute General Hospital' | 'Specialty Surgical Center';
  acuteBeds: number;
  icuBeds: number;
  hasHelipad: boolean;
  heliportFaaId?: string;
  emergencyServices24_7: boolean;
  lat: number;
  lon: number;
  address: string;
  phone: string;
  networkSystem: string;
}

export interface UrgentCareEmergencyFacility {
  id: string;
  name: string;
  category: 'Urgent Care Walk-In' | 'EMS Paramedic Station' | 'Fire Rescue & Hazmat' | 'Disaster Medical Triage Base';
  operator: string;
  walkInAccepted: boolean;
  typicalWaitMinutes: number;
  hoursOfOperation: string;
  lat: number;
  lon: number;
  address: string;
  phone: string;
}

// ============================================================================
// VERIFIED CRITICAL INFRASTRUCTURE REPOSITORY
// ============================================================================

export const CRITICAL_POWER_LINES: PowerLineCorridor[] = [
  {
    id: 'pwr-pac-ac-500kv-1',
    name: 'Pacific AC Intertie (Line 1 - 500kV)',
    voltageKv: 500,
    circuitType: 'HVAC',
    operator: 'BPA / PG&E / SCE',
    gridInterconnection: 'WECC',
    status: 'OPERATIONAL_ENERGIZED',
    conductorType: 'Triple-bundle 2156 kcmil ACSR',
    substations: ['John Day (OR)', 'Malin (OR)', 'Round Mountain (CA)', 'Table Mountain (CA)'],
    path: [
      [-120.697, 45.714],
      [-121.240, 44.520],
      [-121.512, 42.980],
      [-121.583, 41.988],
      [-121.845, 40.850],
      [-121.520, 39.730],
      [-121.780, 38.540]
    ]
  },
  {
    id: 'pwr-pac-dc-1000kv-intertie',
    name: 'Pacific DC Intertie (PDCI ±500kV HVDC)',
    voltageKv: 1000,
    circuitType: 'HVDC',
    operator: 'BPA / LADWP',
    gridInterconnection: 'WECC',
    status: 'OPERATIONAL_ENERGIZED',
    conductorType: 'Quad-bundle 1351.5 kcmil ACSR ±500kV DC',
    substations: ['Celilo Converter Station (The Dalles, OR)', 'Sylmar Converter Station (Los Angeles, CA)'],
    path: [
      [-121.115, 45.590],
      [-120.850, 44.200],
      [-120.450, 42.800],
      [-119.820, 40.500],
      [-119.100, 38.800],
      [-118.250, 36.500],
      [-118.490, 34.312]
    ]
  },
  {
    id: 'pwr-path-15-500kv',
    name: 'Path 15 - Los Banos to Gates (500kV Transmission)',
    voltageKv: 500,
    circuitType: 'HVAC',
    operator: 'PG&E / Western Area Power Admin',
    gridInterconnection: 'WECC',
    status: 'OPERATIONAL_ENERGIZED',
    conductorType: 'Bundle 2300 kcmil AAC',
    substations: ['Los Banos 500kV Substation', 'Gates 500kV Substation'],
    path: [
      [-120.880, 37.050],
      [-120.650, 36.800],
      [-120.350, 36.400],
      [-119.980, 36.020]
    ]
  },
  {
    id: 'pwr-path-26-500kv',
    name: 'Path 26 - Midway to Vincent (500kV Southern Trans)',
    voltageKv: 500,
    circuitType: 'HVAC',
    operator: 'SCE / PG&E',
    gridInterconnection: 'WECC',
    status: 'OPERATIONAL_ENERGIZED',
    conductorType: 'Dual-bundle 2156 kcmil ACSR',
    substations: ['Midway (Buttonwillow)', 'Vincent 500kV (Acton)'],
    path: [
      [-119.460, 35.390],
      [-119.120, 35.080],
      [-118.780, 34.780],
      [-118.120, 34.480]
    ]
  },
  {
    id: 'pwr-pjm-765kv-backbone',
    name: 'PJM 765kV Extra-High-Voltage Backbone',
    voltageKv: 765,
    circuitType: 'HVAC',
    operator: 'American Electric Power (AEP) / PJM Interconnection',
    gridInterconnection: 'Eastern Interconnection',
    status: 'OPERATIONAL_ENERGIZED',
    conductorType: 'Six-bundle 954 kcmil Cardinal ACSR 765kV',
    substations: ['Marysville (OH)', 'Kammer (WV)', 'Amos (WV)', 'Cloverdale (VA)'],
    path: [
      [-83.350, 40.230],
      [-82.200, 39.850],
      [-80.720, 39.120],
      [-81.820, 38.480],
      [-80.200, 37.600],
      [-79.910, 37.380]
    ]
  },
  {
    id: 'pwr-ercot-crez-345kv',
    name: 'ERCOT Competitive Renewable Energy Zone (CREZ 345kV)',
    voltageKv: 345,
    circuitType: 'HVAC',
    operator: 'Oncor / LCRA / AEP Texas',
    gridInterconnection: 'ERCOT',
    status: 'OPERATIONAL_ENERGIZED',
    conductorType: 'Twin-bundle 795 kcmil Drake ACSR',
    substations: ['Sweetwater East', 'Clear Crossing', 'Krum', 'West Shackelford'],
    path: [
      [-100.410, 32.470],
      [-99.450, 32.750],
      [-98.200, 33.150],
      [-97.280, 33.260],
      [-96.850, 32.900]
    ]
  },
  {
    id: 'pwr-hydro-quebec-735kv',
    name: 'Hydro-Québec Trans-Boreal 735kV Supergrid',
    voltageKv: 735,
    circuitType: 'HVAC',
    operator: 'Hydro-Québec TransÉnergie',
    gridInterconnection: 'Hydro-Québec',
    status: 'OPERATIONAL_ENERGIZED',
    conductorType: 'Quad-bundle Bersimis 1351 kcmil ACSR 735kV',
    substations: ['La Grande Complex', 'Chissibi', 'Boucherville Montreal'],
    path: [
      [-77.580, 53.750],
      [-75.200, 50.800],
      [-73.550, 47.800],
      [-73.450, 45.600]
    ]
  }
];

export const CRITICAL_UTILITY_COMPANIES: UtilityCompanyFacility[] = [
  {
    id: 'util-pge-hq-norcal',
    name: 'PG&E Northern California Grid Operations & Generation Center',
    utilitySector: 'Multi-Utility',
    operator: 'Pacific Gas and Electric Company',
    facilityType: 'Substation Hub',
    capacityMw: 18500,
    lat: 37.8044,
    lon: -122.2711,
    serviceArea: 'Northern and Central California (16 Million Citizens)',
    emergencyContact: '1-800-743-5002 / California ISO Reliability Coord',
    regulatoryJurisdiction: 'CPUC / FERC / NERC WECC'
  },
  {
    id: 'util-diablo-canyon-nuc',
    name: 'Diablo Canyon Nuclear Power Plant',
    utilitySector: 'Electric',
    operator: 'PG&E Power Generation',
    facilityType: 'Nuclear Plant',
    capacityMw: 2256,
    lat: 35.2111,
    lon: -120.8556,
    serviceArea: 'California Bulk Grid Base Load (8.6% of CA Net Generation)',
    emergencyContact: 'NRC Incident Center / San Luis Obispo County Emergency Services',
    regulatoryJurisdiction: 'US Nuclear Regulatory Commission (NRC) / FERC'
  },
  {
    id: 'util-sce-irwindale-hub',
    name: 'Southern California Edison (SCE) Grid Control & Substation',
    utilitySector: 'Electric',
    operator: 'Southern California Edison',
    facilityType: 'Substation Hub',
    capacityMw: 14200,
    lat: 34.1160,
    lon: -117.9710,
    serviceArea: 'Greater Los Angeles Basin & Southern California (15M Citizens)',
    emergencyContact: '1-800-611-1911 / CAISO Desk',
    regulatoryJurisdiction: 'CPUC / FERC / WECC'
  },
  {
    id: 'util-hoover-dam-hydro',
    name: 'Hoover Dam Hydroelectric Power Station',
    utilitySector: 'Electric',
    operator: 'US Bureau of Reclamation / Western Area Power',
    facilityType: 'Hydroelectric Dam',
    capacityMw: 2080,
    lat: 36.0156,
    lon: -114.7378,
    serviceArea: 'Southwest Power Pool (Nevada, Arizona, Southern California)',
    emergencyContact: 'USBR National Emergency Response / Hoover Police Dispatch',
    regulatoryJurisdiction: 'US Department of the Interior / FERC'
  },
  {
    id: 'util-palo-verde-nuc',
    name: 'Palo Verde Nuclear Generating Station (Largest in USA)',
    utilitySector: 'Electric',
    operator: 'Arizona Public Service (APS) / Salt River Project',
    facilityType: 'Nuclear Plant',
    capacityMw: 3937,
    lat: 33.3964,
    lon: -112.8686,
    serviceArea: 'Phoenix Metro, Southern California, New Mexico (4M homes)',
    emergencyContact: 'NRC Region IV / Maricopa County Emergency Management',
    regulatoryJurisdiction: 'US NRC / WECC'
  },
  {
    id: 'util-coned-ny-hub',
    name: 'Con Edison Manhattan Energy Control Center',
    utilitySector: 'Electric',
    operator: 'Consolidated Edison Company of New York',
    facilityType: 'Substation Hub',
    capacityMw: 13000,
    lat: 40.7335,
    lon: -73.9880,
    serviceArea: 'New York City (5 Boroughs) & Westchester County',
    emergencyContact: '1-800-75-CONED / NYISO Operations Control',
    regulatoryJurisdiction: 'NY Public Service Commission / FERC'
  },
  {
    id: 'util-ercot-taylor-ops',
    name: 'ERCOT Taylor Operations Control Center',
    utilitySector: 'Electric',
    operator: 'Electric Reliability Council of Texas (ERCOT)',
    facilityType: 'Substation Hub',
    capacityMw: 85000,
    lat: 30.5700,
    lon: -97.4100,
    serviceArea: 'Texas Interconnection (90% of Texas Electric Load)',
    emergencyContact: 'ERCOT System Operations Hotline / 1-866-348-1995',
    regulatoryJurisdiction: 'Public Utility Commission of Texas (PUCT)'
  },
  {
    id: 'util-mwd-f-e-wey-water',
    name: 'Metropolitan Water District (MWD) F.E. Wey Treatment Plant',
    utilitySector: 'Water',
    operator: 'Metropolitan Water District of Southern California',
    facilityType: 'Water Treatment & Aqueduct',
    capacityMw: 520, // Pumping load
    lat: 34.1130,
    lon: -117.7650,
    serviceArea: 'Colorado River Aqueduct & State Water Project (19M Southern Californians)',
    emergencyContact: 'MWD 24/7 Dispatch / California DWR Crisis Desk',
    regulatoryJurisdiction: 'California State Water Resources Control Board'
  }
];

export const CRITICAL_FIBER_CABLES: FiberopticDataCable[] = [
  {
    id: 'fib-ashburn-dci-metro',
    name: 'Data Center Alley Terabit Interconnect (Ashburn / Loudoun DCI Ring)',
    cableCategory: 'Data Center Interconnect (DCI)',
    operator: 'Equinix / Zayo / Crown Castle',
    conduitType: 'Underground Armored Conduit',
    fiberPairs: 864,
    capacityTbps: 1800,
    latencyTier: 'Ultra-Low Latency (<5ms)',
    connectingHubs: ['Equinix DC1-DC15 (Ashburn, VA)', 'Digital Realty Building P (Loudoun)', 'AWS US-East-1 Core Campus', 'QTS Richmond Hub'],
    path: [
      [-77.487, 39.043],
      [-77.465, 39.015],
      [-77.435, 38.980],
      [-77.380, 38.950],
      [-77.420, 38.920],
      [-77.487, 39.043] // Ring loop
    ]
  },
  {
    id: 'fib-silicon-valley-dci-ring',
    name: 'Silicon Valley Super-Core Dark Fiber (Santa Clara / San Jose / Sunnyvale)',
    cableCategory: 'Data Center Interconnect (DCI)',
    operator: 'Lumen / Zayo / Silicon Valley Power Dark Fiber',
    conduitType: 'Underground Armored Conduit',
    fiberPairs: 576,
    capacityTbps: 1200,
    latencyTier: 'Ultra-Low Latency (<5ms)',
    connectingHubs: ['CoreSite SV1-SV8 (Santa Clara)', 'Equinix SV1/SV5 (San Jose)', 'Vantage Data Centers Campus', 'Google Sunnyvale Campus'],
    path: [
      [-121.960, 37.385],
      [-121.985, 37.375],
      [-122.015, 37.390],
      [-122.030, 37.410],
      [-121.950, 37.420],
      [-121.960, 37.385] // Ring loop
    ]
  },
  {
    id: 'fib-transcon-express-north',
    name: 'Northern Transcontinental Express Fiber Backbone (Seattle - Chicago - NY)',
    cableCategory: 'Terrestrial Long-Haul Backbone',
    operator: 'AT&T / Lumen Technologies / Zayo',
    conduitType: 'Underground Armored Conduit',
    fiberPairs: 288,
    capacityTbps: 450,
    latencyTier: 'Express Route (<15ms)',
    connectingHubs: ['Westin Building Exchange (Seattle)', 'Spokane Hub', 'Minneapolis 511 Building', '350 E Cermak (Chicago)', '60 Hudson St (NYC)'],
    path: [
      [-122.338, 47.615],
      [-117.426, 47.658],
      [-112.030, 46.590],
      [-104.050, 47.100],
      [-96.780, 46.870],
      [-93.260, 44.970],
      [-87.620, 41.850],
      [-83.050, 42.330],
      [-79.850, 40.750],
      [-74.009, 40.718]
    ]
  },
  {
    id: 'fib-transcon-express-south',
    name: 'Southern Route DWDM Fiber Corridor (LA - Phoenix - Dallas - Atlanta)',
    cableCategory: 'Terrestrial Long-Haul Backbone',
    operator: 'Verizon Business / Windstream / CenturyLink',
    conduitType: 'Underground Armored Conduit',
    fiberPairs: 288,
    capacityTbps: 400,
    latencyTier: 'Express Route (<15ms)',
    connectingHubs: ['One Wilshire (Los Angeles, CA)', 'Phoenix NAP', 'Infomart Dallas (TX)', '56 Marietta (Atlanta, GA)'],
    path: [
      [-118.257, 34.050],
      [-116.540, 33.830],
      [-112.074, 33.448],
      [-106.480, 31.760],
      [-101.850, 33.580],
      [-96.815, 32.798],
      [-89.900, 32.300],
      [-84.390, 33.755]
    ]
  },
  {
    id: 'fib-subsea-backhaul-slc-la',
    name: 'Pacific Coast Subsea Cable Landing Backhaul (Morro Bay / Hermosa Beach)',
    cableCategory: 'Subsea Backhaul Link',
    operator: 'Telxius / Tata Communications / Southern Cross',
    conduitType: 'Subsea Feeder',
    fiberPairs: 144,
    capacityTbps: 320,
    latencyTier: 'Ultra-Low Latency (<5ms)',
    connectingHubs: ['Hermosa Beach Cable Landing', 'Grover Beach Landing Station', 'One Wilshire LA Data Center'],
    path: [
      [-120.620, 35.120],
      [-119.700, 34.420],
      [-118.500, 34.010],
      [-118.397, 33.862],
      [-118.257, 34.050]
    ]
  }
];

export const CRITICAL_HOSPITALS: HospitalFacility[] = [
  {
    id: 'hosp-stanford-health-care',
    name: 'Stanford Hospital & Medical Center',
    traumaLevel: 'Trauma Level I',
    acuteBeds: 613,
    icuBeds: 124,
    hasHelipad: true,
    heliportFaaId: '04CA',
    emergencyServices24_7: true,
    lat: 37.4334,
    lon: -122.1764,
    address: '300 Pasteur Dr, Stanford, CA 94305',
    phone: '(650) 723-4000',
    networkSystem: 'Stanford Medicine'
  },
  {
    id: 'hosp-ucsf-parnassus',
    name: 'UCSF Medical Center at Parnassus',
    traumaLevel: 'Trauma Level I',
    acuteBeds: 600,
    icuBeds: 110,
    hasHelipad: true,
    heliportFaaId: 'CN72',
    emergencyServices24_7: true,
    lat: 37.7631,
    lon: -122.4578,
    address: '505 Parnassus Ave, San Francisco, CA 94143',
    phone: '(415) 476-1000',
    networkSystem: 'University of California Health'
  },
  {
    id: 'hosp-cedars-sinai-la',
    name: 'Cedars-Sinai Medical Center',
    traumaLevel: 'Trauma Level I',
    acuteBeds: 886,
    icuBeds: 172,
    hasHelipad: true,
    heliportFaaId: 'CL50',
    emergencyServices24_7: true,
    lat: 34.0754,
    lon: -118.3804,
    address: '8700 Beverly Blvd, Los Angeles, CA 90048',
    phone: '(310) 423-3277',
    networkSystem: 'Cedars-Sinai Health System'
  },
  {
    id: 'hosp-mayo-clinic-rochester',
    name: 'Mayo Clinic Hospital - Saint Marys Campus',
    traumaLevel: 'Trauma Level I',
    acuteBeds: 1265,
    icuBeds: 210,
    hasHelipad: true,
    heliportFaaId: 'MN51',
    emergencyServices24_7: true,
    lat: 44.0208,
    lon: -92.4842,
    address: '1216 2nd St SW, Rochester, MN 55902',
    phone: '(507) 284-2511',
    networkSystem: 'Mayo Clinic'
  },
  {
    id: 'hosp-mass-general-boston',
    name: 'Massachusetts General Hospital',
    traumaLevel: 'Trauma Level I',
    acuteBeds: 1019,
    icuBeds: 180,
    hasHelipad: true,
    heliportFaaId: 'MA80',
    emergencyServices24_7: true,
    lat: 42.3629,
    lon: -71.0694,
    address: '55 Fruit St, Boston, MA 02114',
    phone: '(617) 726-2000',
    networkSystem: 'Mass General Brigham'
  },
  {
    id: 'hosp-johns-hopkins-baltimore',
    name: 'The Johns Hopkins Hospital',
    traumaLevel: 'Trauma Level I',
    acuteBeds: 1192,
    icuBeds: 195,
    hasHelipad: true,
    heliportFaaId: 'MD27',
    emergencyServices24_7: true,
    lat: 39.2974,
    lon: -76.5927,
    address: '1800 Orleans St, Baltimore, MD 21287',
    phone: '(410) 955-5000',
    networkSystem: 'Johns Hopkins Medicine'
  },
  {
    id: 'hosp-parkland-dallas',
    name: 'Parkland Memorial Hospital (Dallas County)',
    traumaLevel: 'Trauma Level I',
    acuteBeds: 870,
    icuBeds: 120,
    hasHelipad: true,
    heliportFaaId: 'TX18',
    emergencyServices24_7: true,
    lat: 32.8125,
    lon: -96.8378,
    address: '5200 Harry Hines Blvd, Dallas, TX 75235',
    phone: '(214) 590-8000',
    networkSystem: 'Dallas County Hospital District'
  },
  {
    id: 'hosp-inova-fairfax',
    name: 'Inova Fairfax Medical Campus (NoVA Major Trauma)',
    traumaLevel: 'Trauma Level I',
    acuteBeds: 923,
    icuBeds: 132,
    hasHelipad: true,
    heliportFaaId: 'VA42',
    emergencyServices24_7: true,
    lat: 38.8576,
    lon: -77.2285,
    address: '3300 Gallows Rd, Falls Church, VA 22042',
    phone: '(703) 776-4001',
    networkSystem: 'Inova Health System'
  }
];

export const CRITICAL_URGENT_CARE: UrgentCareEmergencyFacility[] = [
  {
    id: 'urg-sutter-urgent-palo-alto',
    name: 'Palo Alto Medical Foundation Urgent Care (Sutter)',
    category: 'Urgent Care Walk-In',
    operator: 'Sutter Health',
    walkInAccepted: true,
    typicalWaitMinutes: 18,
    hoursOfOperation: '7:00 AM – 9:00 PM Daily',
    lat: 37.4398,
    lon: -122.1585,
    address: '795 El Camino Real, Palo Alto, CA 94301',
    phone: '(650) 853-2958'
  },
  {
    id: 'urg-carbon-health-sf',
    name: 'Carbon Health Urgent & Primary Care (Market St)',
    category: 'Urgent Care Walk-In',
    operator: 'Carbon Health',
    walkInAccepted: true,
    typicalWaitMinutes: 12,
    hoursOfOperation: '8:00 AM – 8:00 PM Daily',
    lat: 37.7785,
    lon: -122.4170,
    address: '1998 Market St, San Francisco, CA 94102',
    phone: '(415) 612-3275'
  },
  {
    id: 'urg-exer-urgent-la',
    name: 'Exer Urgent Care - Beverly Hills / West LA',
    category: 'Urgent Care Walk-In',
    operator: 'Exer Urgent Care / Providence',
    walkInAccepted: true,
    typicalWaitMinutes: 15,
    hoursOfOperation: '9:00 AM – 9:00 PM Daily',
    lat: 34.0620,
    lon: -118.4020,
    address: '9900 Wilshire Blvd, Beverly Hills, CA 90212',
    phone: '(310) 888-2780'
  },
  {
    id: 'urg-lafd-station-9-ems',
    name: 'LAFD Station 9 - Central City / Skid Row Paramedic Rescue',
    category: 'EMS Paramedic Station',
    operator: 'Los Angeles Fire Department (LAFD)',
    walkInAccepted: true,
    typicalWaitMinutes: 0,
    hoursOfOperation: '24 Hours / 7 Days (Emergency Dispatch)',
    lat: 34.0435,
    lon: -118.2465,
    address: '430 E 7th St, Los Angeles, CA 90014',
    phone: '911 / (213) 485-6209'
  },
  {
    id: 'urg-loudoun-inova-urgent',
    name: 'Inova Urgent Care - Ashburn (Data Center Alley)',
    category: 'Urgent Care Walk-In',
    operator: 'Inova Health System',
    walkInAccepted: true,
    typicalWaitMinutes: 14,
    hoursOfOperation: '8:00 AM – 8:00 PM Daily',
    lat: 39.0345,
    lon: -77.4785,
    address: '21785 Filigree Ct, Ashburn, VA 20147',
    phone: '(571) 223-3800'
  },
  {
    id: 'urg-ny-citymd-midtown',
    name: 'CityMD Midtown West Urgent Care',
    category: 'Urgent Care Walk-In',
    operator: 'Summit Health / CityMD',
    walkInAccepted: true,
    typicalWaitMinutes: 10,
    hoursOfOperation: '24 Hours / 7 Days',
    lat: 40.7610,
    lon: -73.9850,
    address: '315 W 57th St, New York, NY 10019',
    phone: '(212) 315-2330'
  },
  {
    id: 'urg-fdny-ems-station-7',
    name: 'FDNY EMS Station 7 - Manhattan West Rescue Command',
    category: 'EMS Paramedic Station',
    operator: 'Fire Department of New York (FDNY)',
    walkInAccepted: true,
    typicalWaitMinutes: 0,
    hoursOfOperation: '24 Hours / 7 Days (Emergency Dispatch)',
    lat: 40.7580,
    lon: -73.9990,
    address: '512 W 23rd St, New York, NY 10011',
    phone: '911 / (718) 999-2000'
  }
];

// ============================================================================
// GEOJSON COMPILATION & VIEWPORT EXTRACTION ENGINE
// ============================================================================

export class CriticalInfrastructureEngine {
  /**
   * Generates MapLibre GeoJSON for High-Voltage Power Lines
   */
  public static getPowerLinesGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: CRITICAL_POWER_LINES.map(line => ({
        type: 'Feature',
        id: line.id,
        geometry: {
          type: 'LineString',
          coordinates: line.path
        },
        properties: {
          id: line.id,
          name: line.name,
          voltageKv: line.voltageKv,
          circuitType: line.circuitType,
          operator: line.operator,
          gridInterconnection: line.gridInterconnection,
          status: line.status,
          conductorType: line.conductorType,
          substationsCount: line.substations.length,
          substationsSummary: line.substations.join(' ➔ '),
          color: line.voltageKv >= 765 ? '#ec4899' : line.voltageKv >= 500 ? '#f59e0b' : line.voltageKv >= 345 ? '#eab308' : '#38bdf8',
          weight: line.voltageKv >= 765 ? 4.5 : line.voltageKv >= 500 ? 3.5 : 2.5,
          dasharray: line.circuitType === 'HVDC' ? [4, 2] : [1],
          type: 'power_line'
        }
      }))
    };
  }

  /**
   * Generates MapLibre GeoJSON for Utility Companies & Generation Hubs
   */
  public static getUtilityCompaniesGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: CRITICAL_UTILITY_COMPANIES.map(util => ({
        type: 'Feature',
        id: util.id,
        geometry: {
          type: 'Point',
          coordinates: [util.lon, util.lat]
        },
        properties: {
          id: util.id,
          name: util.name,
          utilitySector: util.utilitySector,
          operator: util.operator,
          facilityType: util.facilityType,
          capacityMw: util.capacityMw || 0,
          serviceArea: util.serviceArea,
          emergencyContact: util.emergencyContact,
          regulatoryJurisdiction: util.regulatoryJurisdiction,
          badgeColor: util.facilityType.includes('Nuclear') ? '#ef4444' : util.facilityType.includes('Hydro') ? '#0ea5e9' : '#eab308',
          icon: util.facilityType.includes('Nuclear') ? '☢️' : util.facilityType.includes('Hydro') ? '💧' : util.facilityType.includes('Water') ? '🚰' : '⚡',
          type: 'utility_company'
        }
      }))
    };
  }

  /**
   * Generates MapLibre GeoJSON for Fiberoptic & Data Center Interconnect Cables
   */
  public static getFiberCablesGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: CRITICAL_FIBER_CABLES.map(fiber => ({
        type: 'Feature',
        id: fiber.id,
        geometry: {
          type: 'LineString',
          coordinates: fiber.path
        },
        properties: {
          id: fiber.id,
          name: fiber.name,
          cableCategory: fiber.cableCategory,
          operator: fiber.operator,
          conduitType: fiber.conduitType,
          fiberPairs: fiber.fiberPairs,
          capacityTbps: fiber.capacityTbps,
          latencyTier: fiber.latencyTier,
          connectingHubsSummary: fiber.connectingHubs.join(' • '),
          color: fiber.cableCategory.includes('DCI') ? '#a855f7' : fiber.cableCategory.includes('Subsea') ? '#06b6d4' : '#3b82f6',
          weight: 3.2,
          type: 'fiber_cable'
        }
      }))
    };
  }

  /**
   * Generates MapLibre GeoJSON for Hospitals & Major Medical Centers
   */
  public static getHospitalsGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: CRITICAL_HOSPITALS.map(hosp => ({
        type: 'Feature',
        id: hosp.id,
        geometry: {
          type: 'Point',
          coordinates: [hosp.lon, hosp.lat]
        },
        properties: {
          id: hosp.id,
          name: hosp.name,
          traumaLevel: hosp.traumaLevel,
          acuteBeds: hosp.acuteBeds,
          icuBeds: hosp.icuBeds,
          hasHelipad: hosp.hasHelipad,
          heliportFaaId: hosp.heliportFaaId || 'None',
          emergencyServices24_7: hosp.emergencyServices24_7,
          address: hosp.address,
          phone: hosp.phone,
          networkSystem: hosp.networkSystem,
          color: hosp.traumaLevel === 'Trauma Level I' ? '#dc2626' : '#ef4444',
          icon: '🏥',
          type: 'hospital'
        }
      }))
    };
  }

  /**
   * Generates MapLibre GeoJSON for Urgent Care & Emergency Medical Posts
   */
  public static getUrgentCareGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: CRITICAL_URGENT_CARE.map(urg => ({
        type: 'Feature',
        id: urg.id,
        geometry: {
          type: 'Point',
          coordinates: [urg.lon, urg.lat]
        },
        properties: {
          id: urg.id,
          name: urg.name,
          category: urg.category,
          operator: urg.operator,
          walkInAccepted: urg.walkInAccepted,
          typicalWaitMinutes: urg.typicalWaitMinutes,
          hoursOfOperation: urg.hoursOfOperation,
          address: urg.address,
          phone: urg.phone,
          color: urg.category.includes('EMS') ? '#f97316' : '#14b8a6',
          icon: urg.category.includes('EMS') ? '🚑' : '🩺',
          type: 'urgent_care'
        }
      }))
    };
  }
}
