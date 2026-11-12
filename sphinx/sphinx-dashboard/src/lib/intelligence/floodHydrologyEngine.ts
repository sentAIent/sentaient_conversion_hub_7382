// floodHydrologyEngine.ts
// Comprehensive Geospatial Hydrology & Dam Breach Inundation Engine
// Covers:
// 1. High-Hazard & Major Dams & Reservoirs Repository
// 2. FEMA 100-Year (1%) and 500-Year (0.2%) Flood Zones & Riverine Floodplains
// 3. Multi-Dam Cascade & Localized Inundation Simulation
// 4. Downstream Peak Surge Velocity, Wave Arrival Timelines, and Population at Risk

export interface DownstreamSettlementMilestone {
  name: string;
  distanceMiles: number;
  waveArrivalTimeHours: number;
  estimatedPeakDepthFt: number;
  populationAtRisk: number;
}

export interface DamFacility {
  id: string;
  name: string;
  riverSystem: string;
  drainageBasin: string;
  nearestCity: string;
  state: string;
  country: string;
  coordinates: [number, number]; // [lon, lat]
  damType: 'Concrete Arch-Gravity' | 'Earthfill Embankment' | 'Concrete Gravity' | 'Rockfill Embankment' | 'Zoned Earthfill' | 'Buttress / Multiple Arch';
  structuralHeightFt: number;
  crestLengthFt: number;
  reservoirCapacityAcreFeet: number;
  normalStorageCapacityAcreFeet: number;
  hazardClassification: 'High Hazard Potential' | 'Significant Hazard Potential' | 'Low Hazard Potential';
  breachPeakDischargeCfs: number; // cubic feet per second
  normalPoolElevationFt: number;
  yearCompleted: number;
  operator: string;
  downstreamSettlements: DownstreamSettlementMilestone[];
  // Coarse-to-detailed polygon boundary representing maximum flood inundation footprint
  inundationPolygon: [number, number][]; // [lon, lat][]
}

export interface FemaFloodZone {
  id: string;
  name: string;
  basinName: string;
  state: string;
  zoneType: 'FEMA 100-Year (1% Annual Chance - Zone A/AE)' | 'FEMA 500-Year (0.2% Annual Chance - Zone X)' | 'Coastal Storm Surge Inundation (SLOSH Cat 3-5)' | 'Regulatory Floodway';
  baseFloodElevationFt: number;
  coordinates: [number, number][]; // [lon, lat][]
}

export interface MultiDamSimulationResult {
  selectedDamIds: string[];
  totalWaterReleasedAcreFeet: number;
  totalWaterReleasedGallons: number;
  combinedPeakDischargeCfs: number;
  affectedPopulationTotal: number;
  criticalInfrastructureAtRiskCount: number;
  activeBasins: string[];
}

export class FloodHydrologyEngine {
  // 1. Curated Major Dams & Reservoirs
  public static readonly DAMS: DamFacility[] = [
    {
      id: 'dam-oroville',
      name: 'Oroville Dam',
      riverSystem: 'Feather River',
      drainageBasin: 'Sacramento River Basin',
      nearestCity: 'Oroville',
      state: 'California',
      country: 'USA',
      coordinates: [-121.4889, 39.5397],
      damType: 'Earthfill Embankment',
      structuralHeightFt: 770, // Tallest dam in the United States
      crestLengthFt: 6920,
      reservoirCapacityAcreFeet: 3537577,
      normalStorageCapacityAcreFeet: 3400000,
      hazardClassification: 'High Hazard Potential',
      breachPeakDischargeCfs: 1850000,
      normalPoolElevationFt: 900,
      yearCompleted: 1968,
      operator: 'California Department of Water Resources (DWR)',
      downstreamSettlements: [
        { name: 'City of Oroville', distanceMiles: 5, waveArrivalTimeHours: 0.5, estimatedPeakDepthFt: 65, populationAtRisk: 20000 },
        { name: 'Marysville / Yuba City', distanceMiles: 28, waveArrivalTimeHours: 3.2, estimatedPeakDepthFt: 35, populationAtRisk: 130000 },
        { name: 'Sacramento Metro North', distanceMiles: 68, waveArrivalTimeHours: 11.5, estimatedPeakDepthFt: 18, populationAtRisk: 450000 },
        { name: 'Sacramento Delta Confluence', distanceMiles: 95, waveArrivalTimeHours: 19.0, estimatedPeakDepthFt: 12, populationAtRisk: 300000 }
      ],
      inundationPolygon: [
        [-121.4889, 39.5397],
        [-121.5200, 39.5100],
        [-121.5800, 39.4300],
        [-121.6200, 39.3100],
        [-121.6000, 39.1400],
        [-121.5800, 39.0800],
        [-121.6100, 38.8800],
        [-121.5700, 38.6500],
        [-121.5100, 38.5800],
        [-121.5300, 38.3000],
        [-121.6800, 38.1500],
        [-121.8200, 38.1000],
        [-121.7800, 38.2500],
        [-121.6500, 38.5500],
        [-121.6400, 38.9200],
        [-121.6700, 39.1800],
        [-121.6500, 39.3800],
        [-121.5800, 39.5300],
        [-121.4889, 39.5397]
      ]
    },
    {
      id: 'dam-shasta',
      name: 'Shasta Dam',
      riverSystem: 'Sacramento River',
      drainageBasin: 'Sacramento River Basin',
      nearestCity: 'Redding',
      state: 'California',
      country: 'USA',
      coordinates: [-122.4172, 40.7178],
      damType: 'Concrete Gravity',
      structuralHeightFt: 602,
      crestLengthFt: 3460,
      reservoirCapacityAcreFeet: 4552000,
      normalStorageCapacityAcreFeet: 4400000,
      hazardClassification: 'High Hazard Potential',
      breachPeakDischargeCfs: 2400000,
      normalPoolElevationFt: 1067,
      yearCompleted: 1945,
      operator: 'US Bureau of Reclamation (USBR)',
      downstreamSettlements: [
        { name: 'Redding', distanceMiles: 10, waveArrivalTimeHours: 0.9, estimatedPeakDepthFt: 55, populationAtRisk: 95000 },
        { name: 'Red Bluff', distanceMiles: 42, waveArrivalTimeHours: 4.8, estimatedPeakDepthFt: 38, populationAtRisk: 15000 },
        { name: 'Chico West / Butte Basin', distanceMiles: 85, waveArrivalTimeHours: 12.0, estimatedPeakDepthFt: 22, populationAtRisk: 40000 },
        { name: 'Colusa / Sacramento Confluence', distanceMiles: 130, waveArrivalTimeHours: 21.0, estimatedPeakDepthFt: 16, populationAtRisk: 65000 }
      ],
      inundationPolygon: [
        [-122.4172, 40.7178],
        [-122.4000, 40.6500],
        [-122.3800, 40.5800],
        [-122.2800, 40.4000],
        [-122.2300, 40.1800],
        [-122.1200, 39.8500],
        [-122.0100, 39.5000],
        [-121.9000, 39.2000],
        [-121.7000, 38.9000],
        [-121.5500, 38.6000],
        [-121.6500, 38.6200],
        [-121.8000, 38.9500],
        [-122.1000, 39.2500],
        [-122.2500, 39.6000],
        [-122.3500, 40.2000],
        [-122.4800, 40.5500],
        [-122.4500, 40.7000],
        [-122.4172, 40.7178]
      ]
    },
    {
      id: 'dam-folsom',
      name: 'Folsom Dam',
      riverSystem: 'American River',
      drainageBasin: 'Sacramento River Basin',
      nearestCity: 'Folsom / Sacramento',
      state: 'California',
      country: 'USA',
      coordinates: [-121.1578, 38.7069],
      damType: 'Concrete Gravity',
      structuralHeightFt: 340,
      crestLengthFt: 1400,
      reservoirCapacityAcreFeet: 1010000,
      normalStorageCapacityAcreFeet: 975000,
      hazardClassification: 'High Hazard Potential',
      breachPeakDischargeCfs: 950000,
      normalPoolElevationFt: 466,
      yearCompleted: 1956,
      operator: 'US Bureau of Reclamation (USBR)',
      downstreamSettlements: [
        { name: 'City of Folsom', distanceMiles: 2, waveArrivalTimeHours: 0.2, estimatedPeakDepthFt: 48, populationAtRisk: 80000 },
        { name: 'Rancho Cordova', distanceMiles: 11, waveArrivalTimeHours: 1.1, estimatedPeakDepthFt: 32, populationAtRisk: 75000 },
        { name: 'Downtown Sacramento (Capitol)', distanceMiles: 22, waveArrivalTimeHours: 2.8, estimatedPeakDepthFt: 24, populationAtRisk: 525000 },
        { name: 'West Sacramento / Delta', distanceMiles: 30, waveArrivalTimeHours: 4.5, estimatedPeakDepthFt: 18, populationAtRisk: 120000 }
      ],
      inundationPolygon: [
        [-121.1578, 38.7069],
        [-121.2000, 38.6800],
        [-121.2800, 38.6100],
        [-121.3700, 38.5800],
        [-121.4600, 38.5900],
        [-121.5200, 38.5800],
        [-121.5600, 38.4800],
        [-121.5300, 38.3500],
        [-121.4200, 38.3800],
        [-121.4300, 38.5200],
        [-121.3600, 38.5500],
        [-121.2500, 38.5900],
        [-121.1800, 38.6600],
        [-121.1578, 38.7069]
      ]
    },
    {
      id: 'dam-hoover',
      name: 'Hoover Dam',
      riverSystem: 'Colorado River',
      drainageBasin: 'Lower Colorado River Basin',
      nearestCity: 'Boulder City / Las Vegas',
      state: 'Nevada / Arizona',
      country: 'USA',
      coordinates: [-114.7378, 36.0156],
      damType: 'Concrete Arch-Gravity',
      structuralHeightFt: 726.4,
      crestLengthFt: 1244,
      reservoirCapacityAcreFeet: 28945000, // Lake Mead: largest reservoir in US by volume
      normalStorageCapacityAcreFeet: 26134000,
      hazardClassification: 'High Hazard Potential',
      breachPeakDischargeCfs: 4500000,
      normalPoolElevationFt: 1229,
      yearCompleted: 1936,
      operator: 'US Bureau of Reclamation (USBR)',
      downstreamSettlements: [
        { name: 'Laughlin, NV / Bullhead City, AZ', distanceMiles: 65, waveArrivalTimeHours: 4.5, estimatedPeakDepthFt: 58, populationAtRisk: 55000 },
        { name: 'Needles, CA / Mohave Valley', distanceMiles: 92, waveArrivalTimeHours: 7.2, estimatedPeakDepthFt: 44, populationAtRisk: 25000 },
        { name: 'Lake Havasu City / Parker Dam', distanceMiles: 145, waveArrivalTimeHours: 13.0, estimatedPeakDepthFt: 35, populationAtRisk: 60000 },
        { name: 'Yuma, AZ / San Luis (Mexico Border)', distanceMiles: 290, waveArrivalTimeHours: 32.0, estimatedPeakDepthFt: 22, populationAtRisk: 210000 }
      ],
      inundationPolygon: [
        [-114.7378, 36.0156],
        [-114.7200, 35.8500],
        [-114.6500, 35.5000],
        [-114.6000, 35.1500],
        [-114.5800, 34.8500],
        [-114.4000, 34.4500],
        [-114.3000, 34.1800],
        [-114.5000, 33.6000],
        [-114.7000, 32.7000],
        [-114.9000, 32.4500],
        [-114.7500, 32.5500],
        [-114.5500, 33.5000],
        [-114.2000, 34.1500],
        [-114.3000, 34.5000],
        [-114.4800, 34.9000],
        [-114.5000, 35.2000],
        [-114.5800, 35.6000],
        [-114.6800, 35.9000],
        [-114.7378, 36.0156]
      ]
    },
    {
      id: 'dam-glen-canyon',
      name: 'Glen Canyon Dam',
      riverSystem: 'Colorado River',
      drainageBasin: 'Upper Colorado River Basin',
      nearestCity: 'Page',
      state: 'Arizona',
      country: 'USA',
      coordinates: [-111.4839, 36.9372],
      damType: 'Concrete Arch-Gravity',
      structuralHeightFt: 710,
      crestLengthFt: 1560,
      reservoirCapacityAcreFeet: 26214861, // Lake Powell
      normalStorageCapacityAcreFeet: 25000000,
      hazardClassification: 'High Hazard Potential',
      breachPeakDischargeCfs: 5200000,
      normalPoolElevationFt: 3700,
      yearCompleted: 1966,
      operator: 'US Bureau of Reclamation (USBR)',
      downstreamSettlements: [
        { name: 'Lees Ferry', distanceMiles: 16, waveArrivalTimeHours: 0.8, estimatedPeakDepthFt: 110, populationAtRisk: 1200 },
        { name: 'Grand Canyon Village (Phantom Ranch)', distanceMiles: 88, waveArrivalTimeHours: 5.5, estimatedPeakDepthFt: 85, populationAtRisk: 8500 },
        { name: 'Lake Mead Inflow (Direct Cascade into Hoover)', distanceMiles: 180, waveArrivalTimeHours: 14.0, estimatedPeakDepthFt: 60, populationAtRisk: 15000 }
      ],
      inundationPolygon: [
        [-111.4839, 36.9372],
        [-111.5800, 36.8600],
        [-111.7500, 36.7000],
        [-111.9500, 36.3000],
        [-112.3000, 36.1000],
        [-112.8000, 36.2000],
        [-113.4000, 36.0000],
        [-114.0000, 36.0500],
        [-114.7000, 36.0200],
        [-114.0000, 36.1500],
        [-113.3000, 36.1200],
        [-112.7000, 36.3200],
        [-112.2000, 36.2200],
        [-111.8500, 36.4000],
        [-111.6500, 36.8000],
        [-111.4839, 36.9372]
      ]
    },
    {
      id: 'dam-grand-coulee',
      name: 'Grand Coulee Dam',
      riverSystem: 'Columbia River',
      drainageBasin: 'Columbia River Basin',
      nearestCity: 'Grand Coulee / Spokane',
      state: 'Washington',
      country: 'USA',
      coordinates: [-118.9814, 47.9569],
      damType: 'Concrete Gravity',
      structuralHeightFt: 550,
      crestLengthFt: 5223,
      reservoirCapacityAcreFeet: 9562000, // Franklin D. Roosevelt Lake
      normalStorageCapacityAcreFeet: 9000000,
      hazardClassification: 'High Hazard Potential',
      breachPeakDischargeCfs: 3800000,
      normalPoolElevationFt: 1290,
      yearCompleted: 1942,
      operator: 'US Bureau of Reclamation (USBR)',
      downstreamSettlements: [
        { name: 'Wenatchee', distanceMiles: 75, waveArrivalTimeHours: 5.2, estimatedPeakDepthFt: 46, populationAtRisk: 70000 },
        { name: 'Tri-Cities (Richland/Kennewick/Pasco)', distanceMiles: 165, waveArrivalTimeHours: 13.5, estimatedPeakDepthFt: 34, populationAtRisk: 300000 },
        { name: 'The Dalles / Columbia Gorge', distanceMiles: 270, waveArrivalTimeHours: 24.0, estimatedPeakDepthFt: 26, populationAtRisk: 35000 },
        { name: 'Portland / Vancouver Metro', distanceMiles: 350, waveArrivalTimeHours: 34.0, estimatedPeakDepthFt: 20, populationAtRisk: 2400000 }
      ],
      inundationPolygon: [
        [-118.9814, 47.9569],
        [-119.5000, 47.8500],
        [-120.0000, 47.5000],
        [-120.3000, 47.3000],
        [-119.9000, 46.8000],
        [-119.2500, 46.3000],
        [-119.3000, 45.9000],
        [-120.5000, 45.7000],
        [-121.8000, 45.7000],
        [-122.6000, 45.6000],
        [-122.8000, 45.5000],
        [-122.5000, 45.7500],
        [-121.7000, 45.8500],
        [-120.3000, 45.8500],
        [-119.1000, 46.4000],
        [-119.8000, 46.9000],
        [-120.1000, 47.4000],
        [-119.4000, 47.9500],
        [-118.9814, 47.9569]
      ]
    },
    {
      id: 'dam-fort-peck',
      name: 'Fort Peck Dam',
      riverSystem: 'Missouri River',
      drainageBasin: 'Missouri River Basin',
      nearestCity: 'Fort Peck / Glasgow',
      state: 'Montana',
      country: 'USA',
      coordinates: [-106.4083, 48.0069],
      damType: 'Earthfill Embankment',
      structuralHeightFt: 250.5,
      crestLengthFt: 21026, // Over 4 miles long (largest hydraulic fill dam in the world)
      reservoirCapacityAcreFeet: 18700000,
      normalStorageCapacityAcreFeet: 17500000,
      hazardClassification: 'High Hazard Potential',
      breachPeakDischargeCfs: 1650000,
      normalPoolElevationFt: 2246,
      yearCompleted: 1940,
      operator: 'US Army Corps of Engineers (USACE)',
      downstreamSettlements: [
        { name: 'Wolf Point', distanceMiles: 35, waveArrivalTimeHours: 4.0, estimatedPeakDepthFt: 28, populationAtRisk: 3000 },
        { name: 'Williston, ND', distanceMiles: 125, waveArrivalTimeHours: 16.0, estimatedPeakDepthFt: 20, populationAtRisk: 30000 },
        { name: 'Bismarck / Mandan, ND', distanceMiles: 330, waveArrivalTimeHours: 48.0, estimatedPeakDepthFt: 14, populationAtRisk: 130000 }
      ],
      inundationPolygon: [
        [-106.4083, 48.0069],
        [-105.8000, 48.0500],
        [-105.0000, 48.1000],
        [-104.2000, 48.0500],
        [-103.6000, 48.0000],
        [-102.5000, 47.8000],
        [-101.5000, 47.5000],
        [-100.8000, 46.8000],
        [-100.9000, 46.9000],
        [-101.6000, 47.6000],
        [-102.6000, 47.9000],
        [-103.7000, 48.1500],
        [-105.1000, 48.2000],
        [-105.9000, 48.1500],
        [-106.4083, 48.0069]
      ]
    },
    {
      id: 'dam-fontana',
      name: 'Fontana Dam',
      riverSystem: 'Little Tennessee River',
      drainageBasin: 'Tennessee River Valley',
      nearestCity: 'Fontana Dam / Bryson City',
      state: 'North Carolina',
      country: 'USA',
      coordinates: [-83.8050, 35.4528],
      damType: 'Concrete Gravity',
      structuralHeightFt: 480, // Tallest dam in the Eastern United States
      crestLengthFt: 2365,
      reservoirCapacityAcreFeet: 1443000,
      normalStorageCapacityAcreFeet: 1400000,
      hazardClassification: 'High Hazard Potential',
      breachPeakDischargeCfs: 920000,
      normalPoolElevationFt: 1710,
      yearCompleted: 1944,
      operator: 'Tennessee Valley Authority (TVA)',
      downstreamSettlements: [
        { name: 'Robbinsville / Bryson City', distanceMiles: 15, waveArrivalTimeHours: 1.2, estimatedPeakDepthFt: 42, populationAtRisk: 8000 },
        { name: 'Maryville / Lenoir City', distanceMiles: 48, waveArrivalTimeHours: 4.5, estimatedPeakDepthFt: 26, populationAtRisk: 50000 },
        { name: 'Knoxville Metro Confluence', distanceMiles: 65, waveArrivalTimeHours: 7.0, estimatedPeakDepthFt: 18, populationAtRisk: 220000 }
      ],
      inundationPolygon: [
        [-83.8050, 35.4528],
        [-83.9500, 35.5000],
        [-84.1000, 35.6000],
        [-84.2800, 35.7500],
        [-84.0500, 35.9500],
        [-83.9000, 35.9800],
        [-84.0000, 35.8500],
        [-84.2000, 35.6800],
        [-84.0000, 35.5500],
        [-83.8050, 35.4528]
      ]
    }
  ];

  // 2. Curated FEMA 100-Year & 500-Year Flood Zones
  public static readonly FEMA_FLOOD_ZONES: FemaFloodZone[] = [
    {
      id: 'fema-sacramento-delta',
      name: 'Sacramento-San Joaquin River Delta 100-Year Flood Zone',
      basinName: 'Sacramento & San Joaquin River Basin',
      state: 'California',
      zoneType: 'FEMA 100-Year (1% Annual Chance - Zone A/AE)',
      baseFloodElevationFt: 16.5,
      coordinates: [
        [-121.7500, 38.3500],
        [-121.5000, 38.3000],
        [-121.4000, 38.1000],
        [-121.3500, 37.9500],
        [-121.5500, 37.8500],
        [-121.7500, 38.0000],
        [-121.9000, 38.1000],
        [-121.8500, 38.2500],
        [-121.7500, 38.3500]
      ]
    },
    {
      id: 'fema-houston-bayou',
      name: 'Houston Metro Bayou & Coastal Surge Floodplain',
      basinName: 'San Jacinto River & Galveston Bay',
      state: 'Texas',
      zoneType: 'FEMA 100-Year (1% Annual Chance - Zone A/AE)',
      baseFloodElevationFt: 32.0,
      coordinates: [
        [-95.6000, 29.8500],
        [-95.3000, 29.9500],
        [-95.0500, 29.8000],
        [-95.0000, 29.6000],
        [-95.2000, 29.5000],
        [-95.5500, 29.6500],
        [-95.6000, 29.8500]
      ]
    },
    {
      id: 'fema-new-orleans-basin',
      name: 'Mississippi Delta & Lake Pontchartrain Surge Zone',
      basinName: 'Lower Mississippi River Basin',
      state: 'Louisiana',
      zoneType: 'Coastal Storm Surge Inundation (SLOSH Cat 3-5)',
      baseFloodElevationFt: 14.0,
      coordinates: [
        [-90.3500, 30.1500],
        [-90.0000, 30.2000],
        [-89.8000, 30.1000],
        [-89.8500, 29.8500],
        [-90.1500, 29.8000],
        [-90.3500, 30.0000],
        [-90.3500, 30.1500]
      ]
    },
    {
      id: 'fema-miami-biscayne',
      name: 'Biscayne Bay & Everglades Coastal Inundation Plain',
      basinName: 'Southeast Florida Coastal Basin',
      state: 'Florida',
      zoneType: 'FEMA 100-Year (1% Annual Chance - Zone A/AE)',
      baseFloodElevationFt: 9.5,
      coordinates: [
        [-80.3500, 25.9500],
        [-80.1200, 25.9200],
        [-80.1500, 25.6500],
        [-80.3000, 25.5500],
        [-80.4500, 25.7000],
        [-80.4000, 25.8800],
        [-80.3500, 25.9500]
      ]
    }
  ];

  /**
   * Generates MapLibre GeoJSON for all Dams
   */
  public static getDamsGeoJson(selectedDamIds: string[] = []): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.DAMS.map(dam => {
        const isSelected = selectedDamIds.includes(dam.id);
        return {
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: dam.coordinates
          },
          properties: {
            id: dam.id,
            name: dam.name,
            riverSystem: dam.riverSystem,
            drainageBasin: dam.drainageBasin,
            nearestCity: dam.nearestCity,
            state: dam.state,
            country: dam.country,
            damType: dam.damType,
            structuralHeightFt: dam.structuralHeightFt,
            crestLengthFt: dam.crestLengthFt,
            reservoirCapacityAcreFeet: dam.reservoirCapacityAcreFeet,
            hazardClassification: dam.hazardClassification,
            breachPeakDischargeCfs: dam.breachPeakDischargeCfs,
            yearCompleted: dam.yearCompleted,
            operator: dam.operator,
            isSelected: isSelected,
            color: isSelected ? '#ef4444' : dam.hazardClassification === 'High Hazard Potential' ? '#f59e0b' : '#38bdf8',
            badgeText: isSelected ? '🚨 BREACH ACTIVE' : '🏛️ DAM',
            type: 'dam'
          }
        };
      })
    };
  }

  /**
   * Generates MapLibre GeoJSON for general FEMA 100-Year & 500-Year Flood Zones
   */
  public static getFemaFloodZonesGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.FEMA_FLOOD_ZONES.map(zone => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Polygon' as const,
          coordinates: [zone.coordinates]
        },
        properties: {
          id: zone.id,
          name: zone.name,
          basinName: zone.basinName,
          state: zone.state,
          zoneType: zone.zoneType,
          baseFloodElevationFt: zone.baseFloodElevationFt,
          color: zone.zoneType.includes('100-Year') ? '#0284c7' : '#0369a1',
          type: 'fema_flood_zone'
        }
      }))
    };
  }

  /**
   * Calculates compounded flood simulation metrics for selected dams
   */
  public static calculateMultiDamMetrics(
    selectedDamIds: string[],
    failureSeverity: 'catastrophic' | 'overtopping' | 'controlled' = 'catastrophic'
  ): MultiDamSimulationResult {
    const severityFactor = failureSeverity === 'catastrophic' ? 1.0 : failureSeverity === 'overtopping' ? 0.5 : 0.25;
    const selectedDams = this.DAMS.filter(d => selectedDamIds.includes(d.id));

    let totalAcreFeet = 0;
    let combinedPeakCfs = 0;
    let affectedPop = 0;
    const basins = new Set<string>();

    selectedDams.forEach(dam => {
      totalAcreFeet += dam.reservoirCapacityAcreFeet * severityFactor;
      combinedPeakCfs += dam.breachPeakDischargeCfs * severityFactor;
      basins.add(dam.drainageBasin);
      dam.downstreamSettlements.forEach(s => {
        affectedPop += s.populationAtRisk;
      });
    });

    // 1 Acre-Foot ≈ 325,851 Gallons
    const totalGallons = totalAcreFeet * 325851;
    // Estimated critical facilities (approx 1 per 2,500 affected people)
    const criticalFacilities = Math.max(selectedDams.length * 4, Math.round(affectedPop / 2500));

    return {
      selectedDamIds,
      totalWaterReleasedAcreFeet: Math.round(totalAcreFeet),
      totalWaterReleasedGallons: Math.round(totalGallons),
      combinedPeakDischargeCfs: Math.round(combinedPeakCfs),
      affectedPopulationTotal: affectedPop,
      criticalInfrastructureAtRiskCount: criticalFacilities,
      activeBasins: Array.from(basins)
    };
  }

  /**
   * Generates dynamic MapLibre GeoJSON polygons for multi-dam inundation corridors
   */
  public static getMultiDamInundationGeoJson(
    selectedDamIds: string[],
    failureSeverity: 'catastrophic' | 'overtopping' | 'controlled' = 'catastrophic'
  ): GeoJSON.FeatureCollection {
    if (!selectedDamIds || selectedDamIds.length === 0) {
      return { type: 'FeatureCollection', features: [] };
    }

    const selectedDams = this.DAMS.filter(d => selectedDamIds.includes(d.id));

    return {
      type: 'FeatureCollection',
      features: selectedDams.map(dam => {
        const severityMultiplier = failureSeverity === 'catastrophic' ? 1.0 : failureSeverity === 'overtopping' ? 0.6 : 0.3;
        const color = failureSeverity === 'catastrophic' ? '#0ea5e9' : failureSeverity === 'overtopping' ? '#0284c7' : '#0369a1';

        return {
          type: 'Feature' as const,
          geometry: {
            type: 'Polygon' as const,
            coordinates: [dam.inundationPolygon]
          },
          properties: {
            id: `inundation-${dam.id}`,
            damId: dam.id,
            damName: dam.name,
            riverSystem: dam.riverSystem,
            drainageBasin: dam.drainageBasin,
            releasedAcreFeet: Math.round(dam.reservoirCapacityAcreFeet * severityMultiplier),
            peakDischargeCfs: Math.round(dam.breachPeakDischargeCfs * severityMultiplier),
            severity: failureSeverity,
            color: color,
            fillOpacity: failureSeverity === 'catastrophic' ? 0.55 : 0.4,
            type: 'dam_inundation_zone'
          }
        };
      })
    };
  }

  /**
   * Generates downstream milestone wave arrival markers along riverways
   */
  public static getDamFloodWavePointsGeoJson(selectedDamIds: string[]): GeoJSON.FeatureCollection {
    if (!selectedDamIds || selectedDamIds.length === 0) {
      return { type: 'FeatureCollection', features: [] };
    }

    const selectedDams = this.DAMS.filter(d => selectedDamIds.includes(d.id));
    const features: GeoJSON.Feature[] = [];

    selectedDams.forEach(dam => {
      // Pick coordinates along the inundation polygon path corresponding to downstream settlements
      const numSettlements = dam.downstreamSettlements.length;
      const polyCoords = dam.inundationPolygon;
      const step = Math.max(1, Math.floor(polyCoords.length / (numSettlements + 1)));

      dam.downstreamSettlements.forEach((settlement, idx) => {
        const targetCoord = polyCoords[Math.min(idx * step + 1, polyCoords.length - 1)];
        features.push({
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: targetCoord
          },
          properties: {
            id: `wave-${dam.id}-${idx}`,
            damName: dam.name,
            settlementName: settlement.name,
            distanceMiles: settlement.distanceMiles,
            waveArrivalTimeHours: settlement.waveArrivalTimeHours,
            estimatedPeakDepthFt: settlement.estimatedPeakDepthFt,
            populationAtRisk: settlement.populationAtRisk,
            labelText: `🌊 +${settlement.waveArrivalTimeHours}h: ${settlement.estimatedPeakDepthFt}ft surge [${settlement.name}]`,
            type: 'dam_wave_milestone'
          }
        });
      });
    });

    return {
      type: 'FeatureCollection',
      features
    };
  }
}
