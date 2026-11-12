import { DamFacility } from './floodHydrologyEngine';

/**
 * GLOBAL HIGH-HAZARD DAMS & MAJOR RESERVOIRS REPOSITORY
 * Catastrophic failure potential, storage capacities, crest heights, and downstream settlements
 * across Asia, Europe, South America, Africa, Oceania, and North America (Canada/Mexico).
 */
export const GLOBAL_DAMS: DamFacility[] = [
  // ==========================================
  // ASIA
  // ==========================================
  {
    id: 'dam-three-gorges',
    name: 'Three Gorges Dam (三峡大坝)',
    riverSystem: 'Yangtze River (Chang Jiang)',
    drainageBasin: 'Upper Yangtze River Basin',
    nearestCity: 'Yichang, Hubei Province',
    state: 'Hubei',
    country: 'China',
    coordinates: [111.0028, 30.8267],
    damType: 'Concrete Gravity',
    structuralHeightFt: 594,
    crestLengthFt: 7661,
    reservoirCapacityAcreFeet: 31860000, // 39.3 billion m³
    normalStorageCapacityAcreFeet: 17920000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 41000000, // Catastrophic floodwave
    normalPoolElevationFt: 574,
    yearCompleted: 2006,
    operator: 'China Three Gorges Corporation (CTG)',
    downstreamSettlements: [
      { name: 'Yichang City', distanceMiles: 24, waveArrivalTimeHours: 0.8, estimatedPeakDepthFt: 110, populationAtRisk: 4100000 },
      { name: 'Jingzhou', distanceMiles: 115, waveArrivalTimeHours: 4.5, estimatedPeakDepthFt: 65, populationAtRisk: 5200000 },
      { name: 'Wuhan Megacity', distanceMiles: 220, waveArrivalTimeHours: 12.0, estimatedPeakDepthFt: 38, populationAtRisk: 13700000 },
      { name: 'Nanjing', distanceMiles: 540, waveArrivalTimeHours: 36.0, estimatedPeakDepthFt: 18, populationAtRisk: 9500000 },
      { name: 'Shanghai (Yangtze Estuary)', distanceMiles: 750, waveArrivalTimeHours: 58.0, estimatedPeakDepthFt: 10, populationAtRisk: 24800000 }
    ],
    inundationPolygon: [
      [111.00, 30.83], [111.35, 30.70], [112.20, 30.33], [114.30, 30.60], [118.80, 32.06], [121.50, 31.23]
    ]
  },
  {
    id: 'dam-baihetan',
    name: 'Baihetan Dam (白鹤滩水电站)',
    riverSystem: 'Jinsha River (Upper Yangtze)',
    drainageBasin: 'Sichuan-Yunnan Canyon Basin',
    nearestCity: 'Ningnan, Sichuan / Qiaojia, Yunnan',
    state: 'Sichuan/Yunnan',
    country: 'China',
    coordinates: [102.9056, 27.2247],
    damType: 'Concrete Arch-Gravity',
    structuralHeightFt: 948, // Second-tallest arch dam in the world
    crestLengthFt: 2326,
    reservoirCapacityAcreFeet: 16760000,
    normalStorageCapacityAcreFeet: 14500000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 14800000,
    normalPoolElevationFt: 2707,
    yearCompleted: 2021,
    operator: 'China Three Gorges Corporation',
    downstreamSettlements: [
      { name: 'Qiaojia Valley', distanceMiles: 14, waveArrivalTimeHours: 0.4, estimatedPeakDepthFt: 180, populationAtRisk: 180000 },
      { name: 'Xiluodu Reservoir Intake', distanceMiles: 85, waveArrivalTimeHours: 2.8, estimatedPeakDepthFt: 95, populationAtRisk: 350000 }
    ],
    inundationPolygon: [
      [102.90, 27.22], [103.15, 27.50], [103.50, 28.10], [104.60, 28.75]
    ]
  },
  {
    id: 'dam-tarbela',
    name: 'Tarbela Dam',
    riverSystem: 'Indus River',
    drainageBasin: 'Indus River Basin',
    nearestCity: 'Haripur, Khyber Pakhtunkhwa',
    state: 'Khyber Pakhtunkhwa',
    country: 'Pakistan',
    coordinates: [72.6989, 34.0886],
    damType: 'Earthfill Embankment',
    structuralHeightFt: 470,
    crestLengthFt: 8990,
    reservoirCapacityAcreFeet: 11620000,
    normalStorageCapacityAcreFeet: 9680000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 8900000,
    normalPoolElevationFt: 1550,
    yearCompleted: 1976,
    operator: 'Water and Power Development Authority (WAPDA)',
    downstreamSettlements: [
      { name: 'Swabi & Topi Plains', distanceMiles: 8, waveArrivalTimeHours: 0.3, estimatedPeakDepthFt: 85, populationAtRisk: 420000 },
      { name: 'Nowshera & Attock Confluence', distanceMiles: 38, waveArrivalTimeHours: 2.1, estimatedPeakDepthFt: 48, populationAtRisk: 1100000 },
      { name: 'Punjab Plain / Mianwali', distanceMiles: 140, waveArrivalTimeHours: 9.5, estimatedPeakDepthFt: 22, populationAtRisk: 3800000 }
    ],
    inundationPolygon: [
      [72.70, 34.09], [72.35, 33.90], [71.80, 33.20], [71.50, 32.50]
    ]
  },
  {
    id: 'dam-tehri',
    name: 'Tehri Dam',
    riverSystem: 'Bhagirathi River (Ganges Source)',
    drainageBasin: 'Upper Ganges Himalayan Basin',
    nearestCity: 'New Tehri, Uttarakhand',
    state: 'Uttarakhand',
    country: 'India',
    coordinates: [78.4811, 30.3783],
    damType: 'Rockfill Embankment',
    structuralHeightFt: 855, // Tallest dam in India
    crestLengthFt: 1886,
    reservoirCapacityAcreFeet: 3320000,
    normalStorageCapacityAcreFeet: 2860000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 6400000,
    normalPoolElevationFt: 2756,
    yearCompleted: 2006,
    operator: 'THDC India Limited',
    downstreamSettlements: [
      { name: 'Rishikesh Valley', distanceMiles: 42, waveArrivalTimeHours: 1.2, estimatedPeakDepthFt: 75, populationAtRisk: 320000 },
      { name: 'Haridwar Pilgrimage Plains', distanceMiles: 58, waveArrivalTimeHours: 2.4, estimatedPeakDepthFt: 45, populationAtRisk: 1400000 },
      { name: 'Meerut / Western UP Plain', distanceMiles: 125, waveArrivalTimeHours: 7.0, estimatedPeakDepthFt: 18, populationAtRisk: 4200000 }
    ],
    inundationPolygon: [
      [78.48, 30.38], [78.30, 30.12], [78.16, 29.95], [77.70, 29.00]
    ]
  },
  {
    id: 'dam-nurek',
    name: 'Nurek Dam',
    riverSystem: 'Vakhsh River',
    drainageBasin: 'Amu Darya Basin',
    nearestCity: 'Nurek',
    state: 'Khatlon',
    country: 'Tajikistan',
    coordinates: [69.3486, 38.3719],
    damType: 'Earthfill Embankment',
    structuralHeightFt: 984, // Second-tallest dam on Earth
    crestLengthFt: 2310,
    reservoirCapacityAcreFeet: 8510000,
    normalStorageCapacityAcreFeet: 7200000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 7100000,
    normalPoolElevationFt: 3020,
    yearCompleted: 1980,
    operator: 'Barki Tojik',
    downstreamSettlements: [
      { name: 'Nurek City', distanceMiles: 4, waveArrivalTimeHours: 0.15, estimatedPeakDepthFt: 140, populationAtRisk: 35000 },
      { name: 'Bokhtar (Qurghonteppa)', distanceMiles: 65, waveArrivalTimeHours: 3.5, estimatedPeakDepthFt: 40, populationAtRisk: 280000 },
      { name: 'Amu Darya Border Basin', distanceMiles: 120, waveArrivalTimeHours: 8.0, estimatedPeakDepthFt: 20, populationAtRisk: 950000 }
    ],
    inundationPolygon: [
      [69.35, 38.37], [69.05, 37.95], [68.70, 37.50]
    ]
  },

  // ==========================================
  // SOUTH AMERICA
  // ==========================================
  {
    id: 'dam-itaipu',
    name: 'Itaipu Dam (Usina Hidrelétrica de Itaipu)',
    riverSystem: 'Paraná River',
    drainageBasin: 'Río de la Plata Basin',
    nearestCity: 'Foz do Iguaçu (BR) / Ciudad del Este (PY)',
    state: 'Paraná / Alto Paraná',
    country: 'Brazil / Paraguay',
    coordinates: [-54.5889, -25.4089],
    damType: 'Concrete Gravity',
    structuralHeightFt: 643,
    crestLengthFt: 25964, // Over 4.9 miles long
    reservoirCapacityAcreFeet: 23500000,
    normalStorageCapacityAcreFeet: 21200000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 18500000,
    normalPoolElevationFt: 722,
    yearCompleted: 1984,
    operator: 'Itaipu Binacional',
    downstreamSettlements: [
      { name: 'Ciudad del Este & Foz do Iguaçu', distanceMiles: 8, waveArrivalTimeHours: 0.4, estimatedPeakDepthFt: 95, populationAtRisk: 850000 },
      { name: 'Encarnación (PY) / Posadas (AR)', distanceMiles: 185, waveArrivalTimeHours: 7.5, estimatedPeakDepthFt: 42, populationAtRisk: 620000 },
      { name: 'Rosario Metro (Argentina)', distanceMiles: 650, waveArrivalTimeHours: 32.0, estimatedPeakDepthFt: 16, populationAtRisk: 1400000 },
      { name: 'Buenos Aires Metropolitan Delta', distanceMiles: 780, waveArrivalTimeHours: 48.0, estimatedPeakDepthFt: 8, populationAtRisk: 14500000 }
    ],
    inundationPolygon: [
      [-54.59, -25.41], [-54.80, -25.60], [-55.85, -27.35], [-60.65, -32.95], [-58.40, -34.55]
    ]
  },
  {
    id: 'dam-guri',
    name: 'Guri Dam (Central Hidroeléctrica Simón Bolívar)',
    riverSystem: 'Caroní River',
    drainageBasin: 'Orinoco River Basin',
    nearestCity: 'Ciudad Guayana, Bolívar',
    state: 'Bolívar',
    country: 'Venezuela',
    coordinates: [-62.9989, 7.7656],
    damType: 'Concrete Gravity',
    structuralHeightFt: 531,
    crestLengthFt: 24357,
    reservoirCapacityAcreFeet: 109400000, // One of the largest reservoir volumes on Earth (135 billion m³)
    normalStorageCapacityAcreFeet: 98000000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 12500000,
    normalPoolElevationFt: 890,
    yearCompleted: 1986,
    operator: 'Corporación Eléctrica Nacional (CORPOELEC)',
    downstreamSettlements: [
      { name: 'Ciudad Guayana (Puerto Ordaz / San Félix)', distanceMiles: 48, waveArrivalTimeHours: 1.8, estimatedPeakDepthFt: 85, populationAtRisk: 900000 },
      { name: 'Orinoco River Delta Settlements', distanceMiles: 140, waveArrivalTimeHours: 8.5, estimatedPeakDepthFt: 28, populationAtRisk: 220000 }
    ],
    inundationPolygon: [
      [-63.00, 7.77], [-62.70, 8.35], [-62.10, 8.65], [-61.00, 9.20]
    ]
  },
  {
    id: 'dam-tucurui',
    name: 'Tucuruí Dam',
    riverSystem: 'Tocantins River',
    drainageBasin: 'Amazon / Tocantins Basin',
    nearestCity: 'Tucuruí, Pará',
    state: 'Pará',
    country: 'Brazil',
    coordinates: [-49.6464, -3.8322],
    damType: 'Concrete Gravity',
    structuralHeightFt: 348,
    crestLengthFt: 41010, // 7.7 miles wide
    reservoirCapacityAcreFeet: 36500000,
    normalStorageCapacityAcreFeet: 32000000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 9800000,
    normalPoolElevationFt: 236,
    yearCompleted: 1984,
    operator: 'Eletrobras Eletronorte',
    downstreamSettlements: [
      { name: 'Tucuruí Lowlands', distanceMiles: 5, waveArrivalTimeHours: 0.25, estimatedPeakDepthFt: 75, populationAtRisk: 110000 },
      { name: 'Cametá & Marajó Bay Estuary', distanceMiles: 120, waveArrivalTimeHours: 7.0, estimatedPeakDepthFt: 24, populationAtRisk: 350000 }
    ],
    inundationPolygon: [
      [-49.65, -3.83], [-49.50, -2.50], [-48.70, -1.80]
    ]
  },

  // ==========================================
  // EUROPE
  // ==========================================
  {
    id: 'dam-grande-dixence',
    name: 'Grande Dixence Dam',
    riverSystem: 'Dixence River / Rhône Basin',
    drainageBasin: 'Swiss Alps Valais Basin',
    nearestCity: 'Sion, Canton of Valais',
    state: 'Valais',
    country: 'Switzerland',
    coordinates: [7.4042, 46.0806],
    damType: 'Concrete Gravity',
    structuralHeightFt: 935, // Tallest gravity dam in the world
    crestLengthFt: 2280,
    reservoirCapacityAcreFeet: 324000,
    normalStorageCapacityAcreFeet: 300000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 2850000,
    normalPoolElevationFt: 7756,
    yearCompleted: 1961,
    operator: 'Grande Dixence SA',
    downstreamSettlements: [
      { name: 'Val d’Hérémence & Sion Valley', distanceMiles: 11, waveArrivalTimeHours: 0.3, estimatedPeakDepthFt: 120, populationAtRisk: 45000 },
      { name: 'Rhône River Valley (Martigny)', distanceMiles: 32, waveArrivalTimeHours: 1.5, estimatedPeakDepthFt: 45, populationAtRisk: 85000 },
      { name: 'Lake Geneva Estuary (Montreux/Lausanne)', distanceMiles: 55, waveArrivalTimeHours: 3.2, estimatedPeakDepthFt: 18, populationAtRisk: 240000 }
    ],
    inundationPolygon: [
      [7.40, 46.08], [7.35, 46.23], [7.05, 46.10], [6.85, 46.40]
    ]
  },
  {
    id: 'dam-sayano-shushenskaya',
    name: 'Sayano-Shushenskaya Dam',
    riverSystem: 'Yenisei River',
    drainageBasin: 'Yenisei Siberian Basin',
    nearestCity: 'Sayanogorsk, Khakassia',
    state: 'Khakassia',
    country: 'Russia',
    coordinates: [91.3694, 52.8286],
    damType: 'Concrete Arch-Gravity',
    structuralHeightFt: 794,
    crestLengthFt: 3507,
    reservoirCapacityAcreFeet: 25400000,
    normalStorageCapacityAcreFeet: 23100000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 9400000,
    normalPoolElevationFt: 1772,
    yearCompleted: 1978,
    operator: 'RusHydro',
    downstreamSettlements: [
      { name: 'Cheryomushki & Sayanogorsk', distanceMiles: 18, waveArrivalTimeHours: 0.6, estimatedPeakDepthFt: 90, populationAtRisk: 65000 },
      { name: 'Abakan / Minusinsk Basin', distanceMiles: 80, waveArrivalTimeHours: 4.2, estimatedPeakDepthFt: 38, populationAtRisk: 280000 },
      { name: 'Krasnoyarsk Metro', distanceMiles: 310, waveArrivalTimeHours: 18.0, estimatedPeakDepthFt: 14, populationAtRisk: 1100000 }
    ],
    inundationPolygon: [
      [91.37, 52.83], [91.45, 53.20], [91.50, 53.75], [92.85, 56.00]
    ]
  },
  {
    id: 'dam-alqueva',
    name: 'Alqueva Dam (Barragem de Alqueva)',
    riverSystem: 'Guadiana River',
    drainageBasin: 'Iberian Guadiana Basin',
    nearestCity: 'Moura, Alentejo',
    state: 'Alentejo',
    country: 'Portugal / Spain',
    coordinates: [-7.4958, 38.1969],
    damType: 'Concrete Arch-Gravity',
    structuralHeightFt: 315,
    crestLengthFt: 1503,
    reservoirCapacityAcreFeet: 3360000, // Western Europe's largest artificial lake (250 km²)
    normalStorageCapacityAcreFeet: 3100000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 1450000,
    normalPoolElevationFt: 499,
    yearCompleted: 2002,
    operator: 'EDIA (Empresa de Desenvolvimento e Infra-estruturas do Alqueva)',
    downstreamSettlements: [
      { name: 'Moura & Portel Valley', distanceMiles: 9, waveArrivalTimeHours: 0.4, estimatedPeakDepthFt: 42, populationAtRisk: 22000 },
      { name: 'Mértola / Lower Guadiana', distanceMiles: 48, waveArrivalTimeHours: 2.8, estimatedPeakDepthFt: 28, populationAtRisk: 18000 },
      { name: 'Vila Real de Santo António / Ayamonte (ES)', distanceMiles: 88, waveArrivalTimeHours: 6.5, estimatedPeakDepthFt: 15, populationAtRisk: 55000 }
    ],
    inundationPolygon: [
      [-7.50, 38.20], [-7.55, 37.85], [-7.45, 37.18]
    ]
  },

  // ==========================================
  // AFRICA
  // ==========================================
  {
    id: 'dam-aswan-high',
    name: 'Aswan High Dam (السد العالي)',
    riverSystem: 'Nile River',
    drainageBasin: 'Nile River Basin',
    nearestCity: 'Aswan',
    state: 'Aswan Governorate',
    country: 'Egypt',
    coordinates: [32.8803, 23.9703],
    damType: 'Rockfill Embankment',
    structuralHeightFt: 364,
    crestLengthFt: 12566, // 2.4 miles across
    reservoirCapacityAcreFeet: 137000000, // Lake Nasser: 169 billion m³
    normalStorageCapacityAcreFeet: 110000000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 14000000,
    normalPoolElevationFt: 597,
    yearCompleted: 1970,
    operator: 'Ministry of Water Resources and Irrigation (Egypt)',
    downstreamSettlements: [
      { name: 'Aswan City', distanceMiles: 8, waveArrivalTimeHours: 0.4, estimatedPeakDepthFt: 95, populationAtRisk: 380000 },
      { name: 'Luxor & Qena Valley', distanceMiles: 140, waveArrivalTimeHours: 8.0, estimatedPeakDepthFt: 55, populationAtRisk: 1800000 },
      { name: 'Asyut & Minya', distanceMiles: 340, waveArrivalTimeHours: 22.0, estimatedPeakDepthFt: 35, populationAtRisk: 4200000 },
      { name: 'Greater Cairo Megacity', distanceMiles: 540, waveArrivalTimeHours: 42.0, estimatedPeakDepthFt: 24, populationAtRisk: 22000000 },
      { name: 'Nile Delta / Alexandria', distanceMiles: 680, waveArrivalTimeHours: 58.0, estimatedPeakDepthFt: 12, populationAtRisk: 38000000 }
    ],
    inundationPolygon: [
      [32.88, 23.97], [32.65, 25.70], [31.18, 27.18], [31.23, 30.04], [30.50, 31.20]
    ]
  },
  {
    id: 'dam-kariba',
    name: 'Kariba Dam',
    riverSystem: 'Zambezi River',
    drainageBasin: 'Zambezi River Basin',
    nearestCity: 'Kariba (ZW) / Siavonga (ZM)',
    state: 'Mashonaland West / Southern Province',
    country: 'Zambia / Zimbabwe',
    coordinates: [28.7619, -16.5208],
    damType: 'Concrete Arch-Gravity',
    structuralHeightFt: 420,
    crestLengthFt: 1900,
    reservoirCapacityAcreFeet: 146000000, // Lake Kariba: 180 billion m³ (largest artificial reservoir on Earth)
    normalStorageCapacityAcreFeet: 130000000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 11000000,
    normalPoolElevationFt: 1604,
    yearCompleted: 1959,
    operator: 'Zambezi River Authority (ZRA)',
    downstreamSettlements: [
      { name: 'Kariba Gorge & Chirundu', distanceMiles: 45, waveArrivalTimeHours: 1.5, estimatedPeakDepthFt: 80, populationAtRisk: 45000 },
      { name: 'Cahora Bassa Reservoir Intake (Mozambique)', distanceMiles: 280, waveArrivalTimeHours: 14.0, estimatedPeakDepthFt: 45, populationAtRisk: 850000 },
      { name: 'Zambezi Delta Lowlands', distanceMiles: 520, waveArrivalTimeHours: 32.0, estimatedPeakDepthFt: 18, populationAtRisk: 2200000 }
    ],
    inundationPolygon: [
      [28.76, -16.52], [28.85, -16.03], [32.75, -15.60], [35.50, -17.50]
    ]
  },
  {
    id: 'dam-gerd',
    name: 'Grand Ethiopian Renaissance Dam (GERD)',
    riverSystem: 'Blue Nile River',
    drainageBasin: 'Nile Basin (Ethiopian Highlands)',
    nearestCity: 'Guba, Benishangul-Gumuz',
    state: 'Benishangul-Gumuz',
    country: 'Ethiopia',
    coordinates: [35.1500, 11.2167],
    damType: 'Concrete Gravity',
    structuralHeightFt: 476,
    crestLengthFt: 5873,
    reservoirCapacityAcreFeet: 59900000, // 74 billion m³
    normalStorageCapacityAcreFeet: 54000000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 10500000,
    normalPoolElevationFt: 2100,
    yearCompleted: 2023,
    operator: 'Ethiopian Electric Power (EEP)',
    downstreamSettlements: [
      { name: 'Roseires Dam & Ed Damazin (Sudan)', distanceMiles: 25, waveArrivalTimeHours: 0.9, estimatedPeakDepthFt: 75, populationAtRisk: 250000 },
      { name: 'Sennar & Gezira Agricultural Scheme', distanceMiles: 140, waveArrivalTimeHours: 6.5, estimatedPeakDepthFt: 38, populationAtRisk: 1800000 },
      { name: 'Khartoum Blue/White Nile Confluence', distanceMiles: 320, waveArrivalTimeHours: 18.0, estimatedPeakDepthFt: 22, populationAtRisk: 6200000 }
    ],
    inundationPolygon: [
      [35.15, 11.22], [34.38, 11.85], [33.56, 13.55], [32.53, 15.50]
    ]
  },

  // ==========================================
  // NORTH AMERICA (CANADA & MEXICO)
  // ==========================================
  {
    id: 'dam-manic-5',
    name: 'Daniel-Johnson Dam (Manic-5)',
    riverSystem: 'Manicouagan River',
    drainageBasin: 'Saint Lawrence River Basin',
    nearestCity: 'Baie-Comeau, Quebec',
    state: 'Quebec',
    country: 'Canada',
    coordinates: [-68.7247, 50.6406],
    damType: 'Buttress / Multiple Arch',
    structuralHeightFt: 702, // Tallest multiple-arch buttress dam on Earth
    crestLengthFt: 4311,
    reservoirCapacityAcreFeet: 115000000, // Manicouagan impact crater reservoir: 142 billion m³
    normalStorageCapacityAcreFeet: 105000000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 11500000,
    normalPoolElevationFt: 1180,
    yearCompleted: 1968,
    operator: 'Hydro-Québec',
    downstreamSettlements: [
      { name: 'Manic-2 & Manic-1 Facilities', distanceMiles: 85, waveArrivalTimeHours: 3.5, estimatedPeakDepthFt: 95, populationAtRisk: 12000 },
      { name: 'Baie-Comeau Port & St. Lawrence Estuary', distanceMiles: 135, waveArrivalTimeHours: 6.2, estimatedPeakDepthFt: 55, populationAtRisk: 28000 }
    ],
    inundationPolygon: [
      [-68.72, 50.64], [-68.35, 49.95], [-68.15, 49.22]
    ]
  },
  {
    id: 'dam-wac-bennett',
    name: 'W.A.C. Bennett Dam',
    riverSystem: 'Peace River',
    drainageBasin: 'Mackenzie River Basin',
    nearestCity: 'Hudson’s Hope, British Columbia',
    state: 'British Columbia',
    country: 'Canada',
    coordinates: [-122.1950, 56.0150],
    damType: 'Earthfill Embankment',
    structuralHeightFt: 610,
    crestLengthFt: 6700,
    reservoirCapacityAcreFeet: 60200000, // Williston Lake
    normalStorageCapacityAcreFeet: 57000000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 8200000,
    normalPoolElevationFt: 2205,
    yearCompleted: 1968,
    operator: 'BC Hydro',
    downstreamSettlements: [
      { name: 'Hudson’s Hope & Peace River Canyon', distanceMiles: 15, waveArrivalTimeHours: 0.5, estimatedPeakDepthFt: 85, populationAtRisk: 8500 },
      { name: 'Fort St. John / Site C', distanceMiles: 52, waveArrivalTimeHours: 2.5, estimatedPeakDepthFt: 45, populationAtRisk: 32000 },
      { name: 'Peace River, Alberta Plains', distanceMiles: 180, waveArrivalTimeHours: 11.0, estimatedPeakDepthFt: 24, populationAtRisk: 45000 }
    ],
    inundationPolygon: [
      [-122.20, 56.02], [-120.85, 56.25], [-117.35, 56.23]
    ]
  },
  {
    id: 'dam-chicoasen',
    name: 'Manuel Moreno Torres Dam (Chicoasén)',
    riverSystem: 'Grijalva River',
    drainageBasin: 'Grijalva-Usumacinta Basin',
    nearestCity: 'Chicoasén / Tuxtla Gutiérrez, Chiapas',
    state: 'Chiapas',
    country: 'Mexico',
    coordinates: [-93.0972, 16.9431],
    damType: 'Earthfill Embankment',
    structuralHeightFt: 856, // Tallest dam in Mexico
    crestLengthFt: 1591,
    reservoirCapacityAcreFeet: 1300000,
    normalStorageCapacityAcreFeet: 1100000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 4200000,
    normalPoolElevationFt: 1286,
    yearCompleted: 1980,
    operator: 'Comisión Federal de Electricidad (CFE)',
    downstreamSettlements: [
      { name: 'Malpaso / Nezahualcóyotl Basin', distanceMiles: 42, waveArrivalTimeHours: 1.5, estimatedPeakDepthFt: 65, populationAtRisk: 45000 },
      { name: 'Villahermosa Floodplains (Tabasco)', distanceMiles: 95, waveArrivalTimeHours: 4.8, estimatedPeakDepthFt: 28, populationAtRisk: 850000 }
    ],
    inundationPolygon: [
      [-93.10, 16.94], [-93.60, 17.18], [-92.93, 17.99]
    ]
  },

  // ==========================================
  // OCEANIA
  // ==========================================
  {
    id: 'dam-warragamba',
    name: 'Warragamba Dam',
    riverSystem: 'Warragamba River / Hawkesbury-Nepean Basin',
    drainageBasin: 'Hawkesbury-Nepean Basin',
    nearestCity: 'Warragamba / Greater Western Sydney, NSW',
    state: 'New South Wales',
    country: 'Australia',
    coordinates: [150.5969, -33.8833],
    damType: 'Concrete Gravity',
    structuralHeightFt: 466,
    crestLengthFt: 1152,
    reservoirCapacityAcreFeet: 1640000, // Lake Burragorang
    normalStorageCapacityAcreFeet: 1550000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 3500000,
    normalPoolElevationFt: 383,
    yearCompleted: 1960,
    operator: 'WaterNSW',
    downstreamSettlements: [
      { name: 'Penrith / Hawkesbury Valley', distanceMiles: 14, waveArrivalTimeHours: 0.6, estimatedPeakDepthFt: 48, populationAtRisk: 140000 },
      { name: 'Windsor & Richmond Floodplain', distanceMiles: 26, waveArrivalTimeHours: 1.8, estimatedPeakDepthFt: 32, populationAtRisk: 95000 },
      { name: 'Brooklyn & Hawkesbury Estuary', distanceMiles: 52, waveArrivalTimeHours: 5.5, estimatedPeakDepthFt: 14, populationAtRisk: 25000 }
    ],
    inundationPolygon: [
      [150.60, -33.88], [150.70, -33.75], [150.82, -33.60], [151.20, -33.55]
    ]
  },
  {
    id: 'dam-gordon',
    name: 'Gordon Dam',
    riverSystem: 'Gordon River',
    drainageBasin: 'Southwest Wilderness Basin',
    nearestCity: 'Strathgordon, Tasmania',
    state: 'Tasmania',
    country: 'Australia',
    coordinates: [145.7003, -42.7314],
    damType: 'Concrete Arch-Gravity',
    structuralHeightFt: 459, // Double-curvature arch dam
    crestLengthFt: 630,
    reservoirCapacityAcreFeet: 10100000, // Lake Gordon / Pedder (largest storage in Australia)
    normalStorageCapacityAcreFeet: 9800000,
    hazardClassification: 'High Hazard Potential',
    breachPeakDischargeCfs: 2100000,
    normalPoolElevationFt: 984,
    yearCompleted: 1974,
    operator: 'Hydro Tasmania',
    downstreamSettlements: [
      { name: 'Gordon River Gorges', distanceMiles: 18, waveArrivalTimeHours: 0.8, estimatedPeakDepthFt: 85, populationAtRisk: 2500 },
      { name: 'Macquarie Harbour & Strahan Port', distanceMiles: 65, waveArrivalTimeHours: 4.5, estimatedPeakDepthFt: 22, populationAtRisk: 12000 }
    ],
    inundationPolygon: [
      [145.70, -42.73], [145.40, -42.50], [145.30, -42.15]
    ]
  }
];
