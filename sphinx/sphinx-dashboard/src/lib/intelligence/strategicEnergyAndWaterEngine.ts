/**
 * STRATEGIC ENERGY, PETROLEUM, WATER AQUEDUCTS, DRY CASKS & EARLY WARNING RADARS
 * National infrastructure assets for sovereign resilience, logistics, and disaster modeling.
 */

export const STRATEGIC_PETROLEUM_RESERVES = [
  {
    "id": "spr-bryan-mound",
    "name": "Bryan Mound SPR Storage Facility",
    "category": "Strategic Petroleum Reserve",
    "location": "Freeport, Brazoria County, Texas",
    "coordinates": [
      -95.3675,
      28.9189
    ],
    "capacityBarrels": 247000000,
    "storageType": "Salt Caverns (20 Solution-Mined Caverns)",
    "crudeTypes": [
      "Sweet Crude",
      "Sour Crude"
    ],
    "drawdownRateBpd": 1500000,
    "distributionConnections": [
      "Seaway Pipeline (Freeport & Texas City Refineries)",
      "Enterprise Crude Pipeline",
      "Phillips 66 Terminal"
    ],
    "securityZone": "DoE Protective Force Armed Security / DoD Defense Critical Asset",
    "status": "Operational Active Standby"
  },
  {
    "id": "spr-big-hill",
    "name": "Big Hill SPR Storage Facility",
    "category": "Strategic Petroleum Reserve",
    "location": "Winnie, Jefferson County, Texas",
    "coordinates": [
      -94.2706,
      29.7428
    ],
    "capacityBarrels": 170000000,
    "storageType": "Salt Caverns (14 Solution-Mined Caverns)",
    "crudeTypes": [
      "Sweet Crude",
      "Sour Crude"
    ],
    "drawdownRateBpd": 1100000,
    "distributionConnections": [
      "Sunoco Pipeline (Nederland Terminal / Port Arthur Refineries)",
      "Shell 20-inch Pipeline"
    ],
    "securityZone": "DoE Protective Force Armed Security",
    "status": "Operational Active Standby"
  },
  {
    "id": "spr-west-hackberry",
    "name": "West Hackberry SPR Storage Facility",
    "category": "Strategic Petroleum Reserve",
    "location": "Hackberry, Cameron Parish, Louisiana",
    "coordinates": [
      -93.3831,
      30.0108
    ],
    "capacityBarrels": 220000000,
    "storageType": "Salt Caverns (22 Solution-Mined Caverns)",
    "crudeTypes": [
      "Sweet Crude",
      "Sour Crude"
    ],
    "drawdownRateBpd": 1300000,
    "distributionConnections": [
      "Lake Charles Refining Complex (Citgo/Phillips 66)",
      "Zydeco Pipeline (St. James Hub)"
    ],
    "securityZone": "DoE Protective Force Armed Security",
    "status": "Operational Active Standby"
  },
  {
    "id": "spr-bayou-choctaw",
    "name": "Bayou Choctaw SPR Storage Facility",
    "category": "Strategic Petroleum Reserve",
    "location": "Plaquemine, Iberville Parish, Louisiana",
    "coordinates": [
      -91.3175,
      30.3475
    ],
    "capacityBarrels": 76000000,
    "storageType": "Salt Caverns (6 Solution-Mined Caverns)",
    "crudeTypes": [
      "Sweet Crude",
      "Sour Crude"
    ],
    "drawdownRateBpd": 550000,
    "distributionConnections": [
      "ExxonMobil Baton Rouge Pipeline",
      "St. James Crude Terminal Hub",
      "Mississippi River Docks"
    ],
    "securityZone": "DoE Protective Force Armed Security",
    "status": "Operational Active Standby"
  }
];

export const MAJOR_CRUDE_REFINERIES = [
  {
    "id": "ref-motiva-port-arthur",
    "name": "Motiva Port Arthur Refinery (Largest in North America)",
    "operator": "Motiva Enterprises (Saudi Aramco)",
    "coordinates": [
      -93.9683,
      29.8667
    ],
    "cityState": "Port Arthur, Texas",
    "crudeCapacityBpd": 630000,
    "primaryOutputs": [
      "Ultra-Low Sulfur Diesel",
      "Aviation Jet-A",
      "Reformulated Gasoline",
      "Base Lubricants"
    ],
    "complexityIndex": 17.5,
    "criticalGridInterconnect": "Entergy Texas 230kV",
    "emergencyContact": "Motiva ERT / Port Arthur Industrial Mutual Aid (PAIMA)"
  },
  {
    "id": "ref-marathon-garyville",
    "name": "Marathon Garyville Refinery",
    "operator": "Marathon Petroleum",
    "coordinates": [
      -90.6133,
      30.0567
    ],
    "cityState": "Garyville, Louisiana",
    "crudeCapacityBpd": 596000,
    "primaryOutputs": [
      "Distillates",
      "Gasoline",
      "Heavy Fuel Oil",
      "Asphalt"
    ],
    "complexityIndex": 16.8,
    "criticalGridInterconnect": "Entergy Louisiana 500kV",
    "emergencyContact": "Marathon Safety Control Desk"
  },
  {
    "id": "ref-exxon-baytown",
    "name": "ExxonMobil Baytown Complex",
    "operator": "ExxonMobil",
    "coordinates": [
      -95.0117,
      29.7483
    ],
    "cityState": "Baytown, Texas",
    "crudeCapacityBpd": 560500,
    "primaryOutputs": [
      "Gasoline",
      "Aviation Kerosene",
      "Chemical Feedstocks (Olefins)",
      "Diesel"
    ],
    "complexityIndex": 18.2,
    "criticalGridInterconnect": "CenterPoint Energy 345kV",
    "emergencyContact": "Baytown Emergency Operations"
  },
  {
    "id": "ref-marathon-galveston-bay",
    "name": "Galveston Bay Refinery",
    "operator": "Marathon Petroleum",
    "coordinates": [
      -94.925,
      29.3783
    ],
    "cityState": "Texas City, Texas",
    "crudeCapacityBpd": 593000,
    "primaryOutputs": [
      "Transportation Fuels",
      "Aromatics",
      "Petrochemical Feedstocks"
    ],
    "complexityIndex": 15.9,
    "criticalGridInterconnect": "Texas-New Mexico Power 138kV",
    "emergencyContact": "Texas City Industrial Mutual Aid System"
  },
  {
    "id": "ref-exxon-baton-rouge",
    "name": "ExxonMobil Baton Rouge Refinery",
    "operator": "ExxonMobil",
    "coordinates": [
      -91.1967,
      30.4883
    ],
    "cityState": "Baton Rouge, Louisiana",
    "crudeCapacityBpd": 520000,
    "primaryOutputs": [
      "Motor Fuels",
      "Jet Fuel",
      "Lubricating Oils",
      "Wax"
    ],
    "complexityIndex": 16,
    "criticalGridInterconnect": "Entergy Gulf States 230kV",
    "emergencyContact": "Baton Rouge Refinery Ops Center"
  },
  {
    "id": "ref-bp-whiting",
    "name": "BP Whiting Refinery (Midwest Energy Anchor)",
    "operator": "BP America",
    "coordinates": [
      -87.4883,
      41.6783
    ],
    "cityState": "Whiting, Indiana (Chicago Metro)",
    "crudeCapacityBpd": 435000,
    "primaryOutputs": [
      "Midwest Spec Gasoline",
      "Aviation Turbine Fuel (O'Hare Pipeline direct)",
      "Diesel"
    ],
    "complexityIndex": 17,
    "criticalGridInterconnect": "NIPSCO 138kV/345kV",
    "emergencyContact": "BP Whiting Dispatch Desk"
  },
  {
    "id": "ref-chevron-el-segundo",
    "name": "Chevron El Segundo Refinery (Southern California Fuel Spine)",
    "operator": "Chevron USA",
    "coordinates": [
      -118.4117,
      33.91
    ],
    "cityState": "El Segundo, California",
    "crudeCapacityBpd": 290000,
    "primaryOutputs": [
      "CARB Spec Gasoline",
      "LAX Jet-A Pipeline (Supplies 40% of LAX flights)",
      "CARB Diesel"
    ],
    "complexityIndex": 17.8,
    "criticalGridInterconnect": "Southern California Edison 220kV",
    "emergencyContact": "Chevron El Segundo Fire Department"
  },
  {
    "id": "ref-chevron-richmond",
    "name": "Chevron Richmond Refinery (Northern California)",
    "operator": "Chevron USA",
    "coordinates": [
      -122.385,
      37.9533
    ],
    "cityState": "Richmond, California",
    "crudeCapacityBpd": 250000,
    "primaryOutputs": [
      "CARB Gasoline",
      "Jet Fuel (SFO/OAK direct)",
      "Motor Oil Lubricants"
    ],
    "complexityIndex": 16.5,
    "criticalGridInterconnect": "PG&E 115kV/230kV",
    "emergencyContact": "Richmond Emergency Response Team"
  }
];

export const CONTINENTAL_FUEL_PIPELINES = [
  {
    "id": "pipe-colonial",
    "name": "Colonial Pipeline (East Coast Fuel Artery)",
    "operator": "Colonial Pipeline Company",
    "lengthMiles": 5500,
    "capacityBpd": 3000000,
    "suppliesPctEastCoast": 45,
    "coordinates": [
      [
        -95.3698,
        29.7604
      ],
      [
        -93.9683,
        29.8667
      ],
      [
        -91.1967,
        30.4883
      ],
      [
        -86.7816,
        33.5186
      ],
      [
        -84.388,
        33.749
      ],
      [
        -79.792,
        36.0726
      ],
      [
        -77.436,
        37.5407
      ],
      [
        -77.0369,
        38.9072
      ],
      [
        -75.1652,
        39.9526
      ],
      [
        -74.2447,
        40.6323
      ]
    ],
    "primaryProducts": [
      "Refined Gasoline",
      "Diesel Fuel",
      "Home Heating Oil",
      "Aviation Jet Fuel"
    ],
    "criticalHubs": [
      "Greensboro Tank Farm, NC",
      "Pelham Pumping Station, AL",
      "Linden Delivery Junction, NJ"
    ]
  },
  {
    "id": "pipe-plantation",
    "name": "Plantation Pipeline",
    "operator": "Kinder Morgan",
    "lengthMiles": 3100,
    "capacityBpd": 720000,
    "suppliesPctEastCoast": 15,
    "coordinates": [
      [
        -91.1967,
        30.4883
      ],
      [
        -86.8104,
        33.5186
      ],
      [
        -84.388,
        33.749
      ],
      [
        -80.8431,
        35.2271
      ],
      [
        -77.436,
        37.5407
      ],
      [
        -77.0369,
        38.8048
      ]
    ],
    "primaryProducts": [
      "Motor Gasoline",
      "Aviation Kerosene",
      "Diesel Fuel"
    ],
    "criticalHubs": [
      "Bremen Station, GA",
      "Spartanburg Delivery Terminal, SC"
    ]
  }
];

export const MAJOR_WATER_AQUEDUCTS = [
  {
    "id": "aqua-california-aqueduct",
    "name": "California Aqueduct (State Water Project)",
    "operator": "California Department of Water Resources (DWR)",
    "lengthMiles": 444,
    "designFlowCfs": 13100,
    "suppliesPopulation": 27000000,
    "irrigatesAcres": 750000,
    "coordinates": [
      [
        -121.5833,
        37.8
      ],
      [
        -121.1,
        37.05
      ],
      [
        -120.4,
        36.35
      ],
      [
        -119.55,
        35.5
      ],
      [
        -118.8833,
        34.9667
      ],
      [
        -118.45,
        34.7
      ],
      [
        -118.6,
        34.45
      ],
      [
        -117.3,
        34.3
      ]
    ],
    "criticalEngineeringNode": "A.D. Edmonston Pumping Plant (Largest water lift pumping plant in the world: 14x 80,000 HP pumps lifting 2M gallons/min over 1,926 ft)",
    "earthquakeVulnerability": "Crosses San Andreas Fault Zone in 3 separate locations (Gorman, Palmdale, Cajon Pass)"
  },
  {
    "id": "aqua-la-aqueduct",
    "name": "Los Angeles Aqueduct (First & Second Aqueducts)",
    "operator": "Los Angeles Department of Water and Power (LADWP)",
    "lengthMiles": 233,
    "designFlowCfs": 490,
    "suppliesPopulation": 4000000,
    "coordinates": [
      [
        -119.1,
        37.95
      ],
      [
        -118.3,
        37.35
      ],
      [
        -118.15,
        36.5
      ],
      [
        -117.95,
        35.75
      ],
      [
        -118.05,
        35.05
      ],
      [
        -118.45,
        34.3
      ]
    ],
    "criticalEngineeringNode": "Jawbone Siphon & Elizabeth Lake Tunnel (Crosses active San Andreas fault at Elizabeth Lake)",
    "earthquakeVulnerability": "High risk of complete rupture during San Andreas M7.8+ earthquake"
  },
  {
    "id": "aqua-central-arizona-project",
    "name": "Central Arizona Project (CAP Canal)",
    "operator": "Central Arizona Water Conservation District (CAWCD)",
    "lengthMiles": 336,
    "designFlowCfs": 3000,
    "suppliesPopulation": 5000000,
    "irrigatesAcres": 300000,
    "coordinates": [
      [
        -114.15,
        34.3
      ],
      [
        -113.65,
        33.95
      ],
      [
        -112.75,
        33.75
      ],
      [
        -112.25,
        33.7
      ],
      [
        -111.85,
        33.5
      ],
      [
        -111.45,
        33
      ],
      [
        -111.1,
        32.35
      ]
    ],
    "criticalEngineeringNode": "Mark Wilmer Pumping Plant (Lifts Colorado River water 824 ft out of Lake Havasu)",
    "vulnerability": "Open unlined/concrete canal subject to extreme evaporation, solar debris, and power curtailment"
  },
  {
    "id": "aqua-all-american-canal",
    "name": "All-American Canal",
    "operator": "Imperial Irrigation District (IID) / USBR",
    "lengthMiles": 82,
    "designFlowCfs": 26155,
    "suppliesPopulation": 500000,
    "irrigatesAcres": 500000,
    "coordinates": [
      [
        -114.5,
        32.8
      ],
      [
        -114.75,
        32.72
      ],
      [
        -115.35,
        32.7
      ],
      [
        -115.65,
        32.75
      ]
    ],
    "criticalEngineeringNode": "Imperial Dam Desilting Basins (Removes massive silt loads before desert traversal)",
    "vulnerability": "Border security corridor, single water source for Imperial Valley agriculture"
  }
];

export const NUCLEAR_ISFSI_DRY_CASKS = [
  {
    "id": "isfsi-san-onofre",
    "name": "San Onofre Nuclear Generating Station (SONGS ISFSI)",
    "operator": "Southern California Edison (SCE)",
    "coordinates": [
      -117.5556,
      33.3703
    ],
    "location": "San Clemente, California (Pacific Ocean Coastal Bluff)",
    "caskType": "Holtec HI-STORM UMAX Subsurface Stainless Steel Canisters",
    "spentFuelTons": 1750,
    "totalAssemblies": 3870,
    "tsunamiElevationFt": 20,
    "earthquakeProximity": "Rose Canyon & Newport-Inglewood Fault Zone (5 miles)",
    "hazards": "Coastal erosion, chloride-induced stress corrosion cracking (marine salt fog), seismic shaking",
    "status": "Decommissioning Active Fuel in Dry Storage"
  },
  {
    "id": "isfsi-trojan",
    "name": "Trojan Independent Spent Fuel Storage Installation",
    "operator": "Portland General Electric",
    "coordinates": [
      -122.885,
      46.0383
    ],
    "location": "Rainier, Columbia County, Oregon",
    "caskType": "Holtec TranStor Concrete Casks",
    "spentFuelTons": 790,
    "totalAssemblies": 791,
    "hazards": "Columbia River flood plain, Cascadia Subduction Zone seismic liquefaction",
    "status": "Stand-alone Dry Cask Facility"
  },
  {
    "id": "isfsi-indian-point",
    "name": "Indian Point Energy Center ISFSI",
    "operator": "Holtec International",
    "coordinates": [
      -73.9525,
      41.2708
    ],
    "location": "Buchanan, Westchester County, New York (24 miles from NYC)",
    "caskType": "Holtec HI-STORM 100 Reinforced Concrete Overpacks",
    "spentFuelTons": 2000,
    "totalAssemblies": 4000,
    "hazards": "Ramapo Fault line, high population density corridor, Hudson River storm surge",
    "status": "Decommissioning Active Fuel in Dry Storage"
  },
  {
    "id": "isfsi-zion",
    "name": "Zion Nuclear Generating Station ISFSI",
    "operator": "Exelon / EnergySolutions",
    "coordinates": [
      -87.8017,
      42.445
    ],
    "location": "Zion, Lake County, Illinois (Lake Michigan Shoreline)",
    "caskType": "NAC MAGNASTOR Ultra-High Capacity Casks (61 Casks)",
    "spentFuelTons": 1020,
    "totalAssemblies": 2226,
    "hazards": "Lake Michigan shoreline erosion, lakebed water table seepage",
    "status": "Stand-alone Dry Cask Facility"
  },
  {
    "id": "isfsi-vermont-yankee",
    "name": "Vermont Yankee Nuclear Station ISFSI",
    "operator": "NorthStar Group Services",
    "coordinates": [
      -72.5181,
      42.7789
    ],
    "location": "Vernon, Windham County, Vermont",
    "caskType": "Holtec HI-STORM 100 (58 Dry Casks)",
    "spentFuelTons": 760,
    "totalAssemblies": 3880,
    "hazards": "Connecticut River flooding, severe winter freeze-thaw cycles",
    "status": "Stand-alone Dry Cask Facility"
  }
];

export const EARLY_WARNING_RADARS = [
  {
    "id": "radar-pave-paws-beale",
    "name": "Beale AFB PAVE PAWS Radar Site (7th Space Warning Squadron)",
    "operator": "United States Space Force (Space Delta 4)",
    "coordinates": [
      -121.35,
      39.1361
    ],
    "location": "Beale AFB, Marysville, California",
    "radarType": "AN/FPS-132 Upgraded Early Warning Radar (UEWR)",
    "architecture": "Dual-Face Solid-State Phased Array (102 ft triangular building)",
    "frequencyBand": "UHF (420–450 MHz)",
    "rangeMiles": 3000,
    "azimuthCoverageDeg": 240,
    "primaryMission": "Sea-Launched Ballistic Missile (SLBM) & ICBM Early Warning, Low Earth Orbit Space Domain Awareness",
    "empHardening": "MIL-STD-188-125-1 High-Altitude EMP Shielded"
  },
  {
    "id": "radar-pave-paws-cape-cod",
    "name": "Cape Cod Space Force Station PAVE PAWS (6th Space Warning Squadron)",
    "operator": "United States Space Force (Space Delta 4)",
    "coordinates": [
      -70.5392,
      41.7547
    ],
    "location": "Sagamore, Massachusetts (Cape Cod)",
    "radarType": "AN/FPS-132 Upgraded Early Warning Radar (UEWR)",
    "architecture": "Dual-Face Solid-State Phased Array",
    "frequencyBand": "UHF (420–450 MHz)",
    "rangeMiles": 3000,
    "azimuthCoverageDeg": 240,
    "primaryMission": "Atlantic SLBM / Hypersonic Glide Vehicle Detection, Deep Space Object Tracking",
    "empHardening": "MIL-STD-188-125-1 High-Altitude EMP Shielded"
  },
  {
    "id": "radar-pave-paws-clear",
    "name": "Clear Space Force Station (13th Space Warning Squadron)",
    "operator": "United States Space Force (Space Delta 4)",
    "coordinates": [
      -149.1883,
      64.29
    ],
    "location": "Anderson, Denali Borough, Alaska",
    "radarType": "AN/FPS-132 UEWR & Long Range Discrimination Radar (LRDR)",
    "architecture": "Solid-State Phased Array + S-Band Gallium Nitride (GaN) LRDR",
    "frequencyBand": "UHF + S-Band GaN",
    "rangeMiles": 3500,
    "primaryMission": "Polar Trajectory Russian/Chinese ICBM Discrimination, Ballistic Missile Defense Interceptor Cueing (Fort Greely GMD)",
    "empHardening": "Maximum Arctic EMP & Cold-Weather Hardened"
  },
  {
    "id": "radar-cobra-dane",
    "name": "Cobra Dane Radar (AN/FPS-108)",
    "operator": "United States Space Force / Raytheon",
    "coordinates": [
      174.1167,
      52.7167
    ],
    "location": "Eareckson Air Station, Shemya Island, Aleutian Islands, Alaska",
    "radarType": "AN/FPS-108 L-Band Phased Array (Single Face 94 ft diameter)",
    "frequencyBand": "L-Band (1175–1375 MHz)",
    "rangeMiles": 2000,
    "azimuthCoverageDeg": 136,
    "primaryMission": "Kamchatka Peninsula Russian Ballistic Missile Test Tracking, Verification of Nuclear Arms Treaties",
    "empHardening": "Hardened Subterranean Bunker Complex"
  }
];

export class StrategicEnergyAndWaterEngine {
  public static getPipelinesGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: (typeof CONTINENTAL_FUEL_PIPELINES !== 'undefined' ? CONTINENTAL_FUEL_PIPELINES : []).map(pipe => ({
        type: 'Feature',
        id: pipe.id,
        geometry: {
          type: 'LineString',
          coordinates: pipe.coordinates
        },
        properties: {
          id: pipe.id,
          name: pipe.name,
          operator: pipe.operator,
          lengthMiles: pipe.lengthMiles,
          capacityBpd: pipe.capacityBpd,
          suppliesPctEastCoast: (pipe as any).suppliesPctEastCoast || 0,
          primaryProducts: pipe.primaryProducts ? pipe.primaryProducts.join(', ') : '',
          criticalHubs: (pipe as any).criticalHubs ? (pipe as any).criticalHubs.join(', ') : '',
          color: '#eab308',
          type: 'pipeline'
        }
      }))
    };
  }

  public static getAqueductsGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: (typeof MAJOR_WATER_AQUEDUCTS !== 'undefined' ? MAJOR_WATER_AQUEDUCTS : []).map(aqua => ({
        type: 'Feature',
        id: aqua.id,
        geometry: {
          type: 'LineString',
          coordinates: aqua.coordinates
        },
        properties: {
          id: aqua.id,
          name: aqua.name,
          operator: aqua.operator,
          lengthMiles: aqua.lengthMiles,
          designFlowCfs: aqua.designFlowCfs,
          suppliesPopulation: aqua.suppliesPopulation,
          criticalEngineeringNode: aqua.criticalEngineeringNode,
          earthquakeVulnerability: aqua.earthquakeVulnerability,
          color: '#06b6d4',
          type: 'aqueduct'
        }
      }))
    };
  }

  public static getStrategicFacilitiesGeoJson(): GeoJSON.FeatureCollection {
    const sprFeatures: GeoJSON.Feature[] = (typeof STRATEGIC_PETROLEUM_RESERVES !== 'undefined' ? STRATEGIC_PETROLEUM_RESERVES : []).map(spr => ({
      type: 'Feature',
      id: spr.id,
      geometry: {
        type: 'Point',
        coordinates: spr.coordinates as [number, number]
      },
      properties: {
        id: spr.id,
        name: spr.name,
        category: 'Strategic Petroleum Reserve',
        location: spr.location,
        capacityBarrels: spr.capacityBarrels,
        storageType: spr.storageType,
        drawdownRateBpd: spr.drawdownRateBpd,
        securityZone: spr.securityZone,
        status: spr.status,
        color: '#f59e0b',
        icon: '🛢️',
        facilityType: 'spr'
      }
    }));

    const refineryFeatures: GeoJSON.Feature[] = (typeof MAJOR_CRUDE_REFINERIES !== 'undefined' ? MAJOR_CRUDE_REFINERIES : []).map(ref => ({
      type: 'Feature',
      id: ref.id,
      geometry: {
        type: 'Point',
        coordinates: ref.coordinates as [number, number]
      },
      properties: {
        id: ref.id,
        name: ref.name,
        category: 'Crude Oil Refinery',
        operator: ref.operator,
        cityState: ref.cityState,
        crudeCapacityBpd: ref.crudeCapacityBpd,
        primaryOutputs: ref.primaryOutputs ? ref.primaryOutputs.join(', ') : '',
        complexityIndex: ref.complexityIndex,
        criticalGridInterconnect: ref.criticalGridInterconnect,
        color: '#d97706',
        icon: '🏭',
        facilityType: 'refinery'
      }
    }));

    const caskFeatures: GeoJSON.Feature[] = (typeof NUCLEAR_ISFSI_DRY_CASKS !== 'undefined' ? NUCLEAR_ISFSI_DRY_CASKS : []).map((cask: any) => ({
      type: 'Feature',
      id: cask.id,
      geometry: {
        type: 'Point',
        coordinates: cask.coordinates as [number, number]
      },
      properties: {
        id: cask.id,
        name: cask.name,
        category: 'Nuclear ISFSI Dry Cask Storage',
        operator: cask.operator,
        location: cask.location,
        canisterCount: cask.canisterCount,
        metricTonsUranium: cask.metricTonsUranium,
        caskSystem: cask.caskSystem,
        seismicHazardPeakGroundAccel: cask.seismicHazardPeakGroundAccel,
        tsunamiFloodRisk: cask.tsunamiFloodRisk,
        color: '#8b5cf6',
        icon: '☢️',
        facilityType: 'dry_cask'
      }
    }));

    const radarFeatures: GeoJSON.Feature[] = (typeof EARLY_WARNING_RADARS !== 'undefined' ? EARLY_WARNING_RADARS : []).map(rad => ({
      type: 'Feature',
      id: rad.id,
      geometry: {
        type: 'Point',
        coordinates: rad.coordinates as [number, number]
      },
      properties: {
        id: rad.id,
        name: rad.name,
        category: 'Early Warning Phased Array Radar',
        operator: rad.operator,
        location: rad.location,
        radarType: rad.radarType,
        rangeMiles: rad.rangeMiles,
        primaryMission: rad.primaryMission,
        empHardening: rad.empHardening,
        color: '#ec4899',
        icon: '📡',
        facilityType: 'radar'
      }
    }));

    return {
      type: 'FeatureCollection',
      features: [...sprFeatures, ...refineryFeatures, ...caskFeatures, ...radarFeatures]
    };
  }
}

