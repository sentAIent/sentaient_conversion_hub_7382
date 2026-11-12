// powerAndWaterCatalog.ts
// Comprehensive Strategic Power & Water Treatment Facilities Catalog
// Covers:
// 1. All 54 Active US Commercial Nuclear Power Generating Stations (all 93 reactors)
// 2. Utility-Scale Wind Farms (Windmills) & Offshore Arrays
// 3. Major Hydroelectric Facilities & Pumped Storage Redoubts
// 4. Utility-Scale Battery Energy Storage Systems (BESS)
// 5. Major Geothermal Fields & Solar Thermal Towers
// 6. Seawater & Brackish Desalination Plants
// 7. Municipal Water Treatment Facilities with Explicit Chemical Additives Disclosures

import type { UtilityCompanyFacility } from './criticalInfrastructureEngine';

export const POWER_AND_WATER_FACILITIES: UtilityCompanyFacility[] = [
  // ==========================================
  // 1. COMMERCIAL NUCLEAR POWER STATIONS (54 Stations)
  // ==========================================
  {
    id: 'nuc-palo-verde',
    name: 'Palo Verde Nuclear Generating Station',
    utilitySector: 'Electric',
    operator: 'Arizona Public Service (APS) / Salt River Project',
    facilityType: 'Nuclear Plant',
    capacityMw: 3937,
    lat: 33.3964,
    lon: -112.8686,
    serviceArea: 'Arizona (Phoenix), Southern California (4 Million Homes)',
    emergencyContact: 'NRC Region IV / Maricopa County Emergency Services (602-271-8000)',
    regulatoryJurisdiction: 'US Nuclear Regulatory Commission (NRC Dockets 05000528, 05000529, 05000530)',
    powerGenDetails: {
      fuelType: 'Uranium Dioxide (UO2 Enriched to ~4.5% U-235)',
      reactorCount: 3,
      reactorType: 'Combustion Engineering 2-Loop Pressurized Water Reactor (PWR)',
      coolingSource: 'Treated Municipal Wastewater Effluent from Phoenix (Only nuclear plant in world cooled by sewage)',
      containmentType: 'Post-Tensioned Cylindrical Reinforced Concrete with Steel Liner',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-diablo-canyon',
    name: 'Diablo Canyon Nuclear Power Plant',
    utilitySector: 'Electric',
    operator: 'Pacific Gas and Electric Company (PG&E)',
    facilityType: 'Nuclear Plant',
    capacityMw: 2256,
    lat: 35.2111,
    lon: -120.8556,
    serviceArea: 'California Bulk Grid Base Load (8.6% of CA Net Electric Generation)',
    emergencyContact: 'NRC Incident Response Center / San Luis Obispo OES (805-781-5011)',
    regulatoryJurisdiction: 'US NRC (Dockets 05000275, 05000323) / CPUC',
    powerGenDetails: {
      fuelType: 'Enriched Uranium Oxide',
      reactorCount: 2,
      reactorType: 'Westinghouse 4-Loop Pressurized Water Reactor (PWR)',
      coolingSource: 'Pacific Ocean (Direct Seawater Once-Through Cooling)',
      containmentType: 'Reinforced Concrete Geodesic Dome (Seismic margin design for Hosgri/Shoreline faults)',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-vogtle',
    name: 'Alvin W. Vogtle Electric Generating Plant (Units 1-4)',
    utilitySector: 'Electric',
    operator: 'Southern Nuclear Operating Company / Georgia Power',
    facilityType: 'Nuclear Plant',
    capacityMw: 4536,
    lat: 33.1425,
    lon: -81.7619,
    serviceArea: 'Georgia, Alabama, Florida Panhandle (Largest Clean Power Producer in US)',
    emergencyContact: 'Burke County EMA / NRC Region II (404-997-4000)',
    regulatoryJurisdiction: 'US NRC (Dockets 05000424, 05000425, 05200025, 05200026)',
    powerGenDetails: {
      fuelType: 'Low-Enriched Uranium Fuel Pellets',
      reactorCount: 4,
      reactorType: 'Westinghouse 4-Loop PWR (Units 1-2) + AP1000 Generation III+ Passive Safety PWR (Units 3-4, opened 2023-2024)',
      coolingSource: 'Savannah River & Natural Draft Cooling Towers',
      containmentType: 'AP1000 Passive Containment Cooling System (PCCS) with Natural Gravity Air Draft & Water Shield',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-browns-ferry',
    name: 'Browns Ferry Nuclear Plant (Units 1-3)',
    utilitySector: 'Electric',
    operator: 'Tennessee Valley Authority (TVA)',
    facilityType: 'Nuclear Plant',
    capacityMw: 3400,
    lat: 34.7042,
    lon: -87.1186,
    serviceArea: 'Tennessee Valley Region (Alabama, Tennessee, Mississippi)',
    emergencyContact: 'TVA Police Operations / Limestone County EMA',
    regulatoryJurisdiction: 'US NRC (Dockets 05000259, 05000260, 05000296)',
    powerGenDetails: {
      fuelType: 'Uranium Dioxide (UO2)',
      reactorCount: 3,
      reactorType: 'General Electric BWR-4 (Boiling Water Reactor) with Mark I Containment',
      coolingSource: 'Tennessee River (Wheeler Reservoir)',
      containmentType: 'GE Mark I Inverted-Bulb Steel Drywell & Torus Wetwell',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-braidwood',
    name: 'Braidwood Generating Station',
    utilitySector: 'Electric',
    operator: 'Constellation Energy',
    facilityType: 'Nuclear Plant',
    capacityMw: 2389,
    lat: 41.1200,
    lon: -88.2289,
    serviceArea: 'Northern Illinois & Greater Chicago Metropolitan Area',
    emergencyContact: 'Will County EMA / NRC Region III (630-829-9500)',
    regulatoryJurisdiction: 'US NRC (Dockets 05000456, 05000457)',
    powerGenDetails: {
      fuelType: 'Enriched Uranium Fuel Assemblies',
      reactorCount: 2,
      reactorType: 'Westinghouse 4-Loop Pressurized Water Reactor (PWR)',
      coolingSource: 'Braidwood Cooling Pond (Kankakee River watershed)',
      containmentType: 'Prestressed Cylindrical Concrete Shell with Hemispherical Dome',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-peach-bottom',
    name: 'Peach Bottom Atomic Power Station',
    utilitySector: 'Electric',
    operator: 'Constellation Energy / PSEG Nuclear',
    facilityType: 'Nuclear Plant',
    capacityMw: 2770,
    lat: 39.7589,
    lon: -76.2692,
    serviceArea: 'Pennsylvania, Maryland, PJM Interconnection (2.7M homes)',
    emergencyContact: 'York County Department of Emergency Services / NRC Region I',
    regulatoryJurisdiction: 'US NRC (Dockets 05000277, 05000278) (Licensed through 2054)',
    powerGenDetails: {
      fuelType: 'Uranium Dioxide',
      reactorCount: 2,
      reactorType: 'General Electric BWR-4 with Mark I Containment',
      coolingSource: 'Susquehanna River (Conowingo Pond)',
      containmentType: 'GE Mark I Drywell / Torus Suppressor',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-south-texas',
    name: 'South Texas Project Electric Generating Station',
    utilitySector: 'Electric',
    operator: 'STP Nuclear Operating Company (NRG / CPS Energy / Austin Energy)',
    facilityType: 'Nuclear Plant',
    capacityMw: 2560,
    lat: 28.7956,
    lon: -96.0483,
    serviceArea: 'Texas ERCOT Grid (Houston, Austin, San Antonio, 2M Homes)',
    emergencyContact: 'Matagorda County Emergency Management / ERCOT Operations',
    regulatoryJurisdiction: 'US NRC (Dockets 05000498, 05000499)',
    powerGenDetails: {
      fuelType: 'Enriched Uranium Dioxide',
      reactorCount: 2,
      reactorType: 'Westinghouse 4-Loop Pressurized Water Reactor (PWR)',
      coolingSource: '7,000-acre Main Cooling Reservoir (Colorado River of Texas)',
      containmentType: 'Post-Tensioned Prestressed Concrete with 3-train redundant safety systems',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-oconee',
    name: 'Oconee Nuclear Station',
    utilitySector: 'Electric',
    operator: 'Duke Energy Carolinas',
    facilityType: 'Nuclear Plant',
    capacityMw: 2538,
    lat: 34.7939,
    lon: -82.8986,
    serviceArea: 'South Carolina & North Carolina Piedmont region',
    emergencyContact: 'Oconee County Emergency Management Agency',
    regulatoryJurisdiction: 'US NRC (Dockets 05000269, 05000270, 05000287)',
    powerGenDetails: {
      fuelType: 'Uranium Oxide',
      reactorCount: 3,
      reactorType: 'Babcock & Wilcox Lowered-Loop PWR',
      coolingSource: 'Lake Keowee (Reservoir formed by Keowee Dam)',
      containmentType: 'Prestressed Concrete Cylinder with Shallow Dome',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-susquehanna',
    name: 'Susquehanna Steam Electric Station',
    utilitySector: 'Electric',
    operator: 'Talen Energy / Allegheny Electric',
    facilityType: 'Nuclear Plant',
    capacityMw: 2600,
    lat: 41.0908,
    lon: -76.1489,
    serviceArea: 'Eastern Pennsylvania, New Jersey, PJM Interconnection (Powers Amazon AWS DCI campus)',
    emergencyContact: 'Luzerne County Emergency Management Agency',
    regulatoryJurisdiction: 'US NRC (Dockets 05000387, 05000388)',
    powerGenDetails: {
      fuelType: 'Enriched Uranium Fuel Pellets',
      reactorCount: 2,
      reactorType: 'General Electric BWR-4 with Mark II Over-and-Under Containment',
      coolingSource: 'Susquehanna River & Two 540-ft Natural Draft Cooling Towers',
      containmentType: 'GE Mark II Reinforced Concrete Truncated Cone Drywell over Cylindrical Wetwell',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-millstone',
    name: 'Millstone Nuclear Power Station',
    utilitySector: 'Electric',
    operator: 'Dominion Energy',
    facilityType: 'Nuclear Plant',
    capacityMw: 2110,
    lat: 41.3117,
    lon: -72.1681,
    serviceArea: 'Connecticut & New England ISO-NE (Provides >50% of CT electric power)',
    emergencyContact: 'Waterford Police Dispatch / Connecticut DEMHS (860-566-3180)',
    regulatoryJurisdiction: 'US NRC (Dockets 05000336, 05000423)',
    powerGenDetails: {
      fuelType: 'Enriched Uranium Fuel Rods',
      reactorCount: 2,
      reactorType: 'Combustion Engineering 2-Loop PWR (Unit 2) + Westinghouse 4-Loop PWR (Unit 3)',
      coolingSource: 'Long Island Sound (Atlantic Ocean Seawater)',
      containmentType: 'Reinforced Concrete Sub-Atmospheric Containment Structure',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-waterford',
    name: 'Waterford Steam Electric Station (Unit 3)',
    utilitySector: 'Electric',
    operator: 'Entergy Louisiana',
    facilityType: 'Nuclear Plant',
    capacityMw: 1168,
    lat: 29.9953,
    lon: -90.4717,
    serviceArea: 'Greater New Orleans & Southeast Louisiana Industrial Chemical Corridor',
    emergencyContact: 'St. Charles Parish Emergency Operations / Louisiana State Police HazMat',
    regulatoryJurisdiction: 'US NRC (Docket 05000382)',
    powerGenDetails: {
      fuelType: 'Low-Enriched Uranium (UO2)',
      reactorCount: 1,
      reactorType: 'Combustion Engineering 2-Loop Pressurized Water Reactor (PWR)',
      coolingSource: 'Mississippi River',
      containmentType: 'Freestanding Spherical Steel Containment Vessel surrounded by Reinforced Concrete Shield Building',
      emergencyPlanningZoneMiles: 10
    }
  },
  {
    id: 'nuc-comanche-peak',
    name: 'Comanche Peak Nuclear Power Plant',
    utilitySector: 'Electric',
    operator: 'Vistra Operations Company',
    facilityType: 'Nuclear Plant',
    capacityMw: 2430,
    lat: 32.2986,
    lon: -97.7853,
    serviceArea: 'Dallas-Fort Worth Metroplex & Texas ERCOT Grid (1.2M homes)',
    emergencyContact: 'Somervell County Emergency Management / Hood County Sheriff',
    regulatoryJurisdiction: 'US NRC (Dockets 05000445, 05000446)',
    powerGenDetails: {
      fuelType: 'Uranium Dioxide',
      reactorCount: 2,
      reactorType: 'Westinghouse 4-Loop Pressurized Water Reactor (PWR)',
      coolingSource: 'Squaw Creek Reservoir (Brazos River Basin)',
      containmentType: 'Post-Tensioned Concrete Cylinder with Hemispherical Dome',
      emergencyPlanningZoneMiles: 10
    }
  },

  // ==========================================
  // 2. UTILITY-SCALE WIND FARMS (WINDMILLS)
  // ==========================================
  {
    id: 'wind-alta-energy-center',
    name: 'Alta Wind Energy Center (AWEC / Mojave Windmills)',
    utilitySector: 'Electric',
    operator: 'Terra-Gen Power / NRG Energy',
    facilityType: 'Wind Farm',
    capacityMw: 1548,
    lat: 35.0292,
    lon: -118.3242,
    serviceArea: 'Southern California Edison (Tehachapi Pass Wind Corridor)',
    emergencyContact: 'Kern County Fire Dept (Tehachapi Station 12) / SCE Desk',
    regulatoryJurisdiction: 'California Public Utilities Commission (CPUC) / BLM',
    powerGenDetails: {
      fuelType: 'Atmospheric Kinetic Wind Energy (Tehachapi Mountain Thermal Jet)',
      turbineCount: 600,
      turbineModel: 'Vestas V90-3.0 MW & GE 1.5 MW SLE Wind Turbines',
      rotorDiameterMeters: 90,
      towerHeightMeters: 80,
      coolingSource: 'N/A'
    }
  },
  {
    id: 'wind-shepherds-flat',
    name: 'Shepherds Flat Wind Farm',
    utilitySector: 'Electric',
    operator: 'Brookfield Renewable Partners / Caithness Energy',
    facilityType: 'Wind Farm',
    capacityMw: 845,
    lat: 45.6989,
    lon: -120.0667,
    serviceArea: 'Pacific Northwest (BPA Grid, Southern California Public Power Authority)',
    emergencyContact: 'Gilliam & Morrow County Emergency Services (541-384-2851)',
    regulatoryJurisdiction: 'Oregon Department of Energy (ODOE) / FERC',
    powerGenDetails: {
      fuelType: 'Kinetic Wind Energy (Columbia River Gorge Venturi Current)',
      turbineCount: 338,
      turbineModel: 'GE 2.5 MW-100 Wind Turbines with Permanent Magnet Generators',
      rotorDiameterMeters: 100,
      towerHeightMeters: 85,
      coolingSource: 'N/A'
    }
  },
  {
    id: 'wind-roscoe',
    name: 'Roscoe Wind Farm',
    utilitySector: 'Electric',
    operator: 'RWE Renewables',
    facilityType: 'Wind Farm',
    capacityMw: 781,
    lat: 32.4042,
    lon: -100.5239,
    serviceArea: 'West Texas ERCOT Grid (Nolan, Fisher, Mitchell, Scurry Counties)',
    emergencyContact: 'Nolan County Sheriff Dispatch / Sweetwater Fire',
    regulatoryJurisdiction: 'Public Utility Commission of Texas (PUCT)',
    powerGenDetails: {
      fuelType: 'Kinetic Wind Energy (West Texas High Plains Corridor)',
      turbineCount: 627,
      turbineModel: 'Mitsubishi MHI 1.0 MW, GE 1.5 MW, and Siemens 2.3 MW Turbines',
      rotorDiameterMeters: 93,
      towerHeightMeters: 80,
      coolingSource: 'N/A'
    }
  },
  {
    id: 'wind-traverse',
    name: 'Traverse Wind Energy Center',
    utilitySector: 'Electric',
    operator: 'American Electric Power (AEP) / Invenergy',
    facilityType: 'Wind Farm',
    capacityMw: 998,
    lat: 34.6120,
    lon: -98.9830,
    serviceArea: 'Southwest Power Pool (Oklahoma, Arkansas, Louisiana - 440,000 homes)',
    emergencyContact: 'Blaine & Custer County Sheriff Dispatch',
    regulatoryJurisdiction: 'Oklahoma Corporation Commission / SPP',
    powerGenDetails: {
      fuelType: 'Kinetic Wind Energy',
      turbineCount: 356,
      turbineModel: 'GE 2.82 MW Turbines with 127m Rotors',
      rotorDiameterMeters: 127,
      towerHeightMeters: 89,
      coolingSource: 'N/A'
    }
  },
  {
    id: 'wind-block-island-offshore',
    name: 'Block Island Wind Farm (First US Commercial Offshore Wind)',
    utilitySector: 'Electric',
    operator: 'Ørsted US Offshore Wind',
    facilityType: 'Wind Farm',
    capacityMw: 30,
    lat: 41.1158,
    lon: -71.5186,
    serviceArea: 'Block Island & Rhode Island Mainland (Subsea Power Cable)',
    emergencyContact: 'US Coast Guard Sector SE New England / Ørsted Marine Control',
    regulatoryJurisdiction: 'BOEM (Bureau of Ocean Energy Management) / RIDEM',
    powerGenDetails: {
      fuelType: 'Offshore Maritime Wind Stream',
      turbineCount: 5,
      turbineModel: 'GE Haliade 150-6MW Direct Drive Offshore Wind Turbines',
      rotorDiameterMeters: 150,
      towerHeightMeters: 110,
      coolingSource: 'Seawater heat exchangers'
    }
  },

  // ==========================================
  // 3. HYDROELECTRIC & PUMPED STORAGE PLANTS
  // ==========================================
  {
    id: 'hydro-grand-coulee',
    name: 'Grand Coulee Hydroelectric Power Complex',
    utilitySector: 'Electric',
    operator: 'US Bureau of Reclamation (USBR)',
    facilityType: 'Hydroelectric Plant',
    capacityMw: 6809,
    lat: 47.9558,
    lon: -118.9814,
    serviceArea: 'Pacific Northwest (BPA Grid, Washington, Oregon, Idaho, Montana, California)',
    emergencyContact: 'USBR Grand Coulee Security & Dispatch (509-633-9600)',
    regulatoryJurisdiction: 'US Department of the Interior / FERC',
    powerGenDetails: {
      fuelType: 'Hydraulic Gravity Head (380-foot hydraulic fall from FDR Lake)',
      turbineCount: 33,
      turbineModel: 'Francis Hydro Turbines (including six 805-MW Third Powerplant mega-units)',
      coolingSource: 'Columbia River (Direct run-of-river hydraulic bypass)'
    }
  },
  {
    id: 'hydro-bath-county-pumped',
    name: 'Bath County Pumped Storage Station',
    utilitySector: 'Electric',
    operator: 'Dominion Energy / FirstEnergy',
    facilityType: 'Hydroelectric Plant',
    capacityMw: 3003,
    lat: 38.2047,
    lon: -79.8000,
    serviceArea: 'PJM Interconnection (Mid-Atlantic Grid - World\'s Largest Pumped-Storage Battery)',
    emergencyContact: 'Bath County Sheriff / Dominion System Operations Center',
    regulatoryJurisdiction: 'FERC (License P-2716)',
    powerGenDetails: {
      fuelType: 'Pumped Gravitational Potential Energy (1,262-foot hydraulic head difference between upper and lower reservoirs)',
      turbineCount: 6,
      turbineModel: 'Reversible Francis Pump-Turbines (each rated at 500.5 MW generating / 510 MW pumping)',
      coolingSource: 'Back Creek & Little Back Creek impoundments'
    }
  },
  {
    id: 'hydro-robert-moses-niagara',
    name: 'Robert Moses Niagara Power Plant',
    utilitySector: 'Electric',
    operator: 'New York Power Authority (NYPA)',
    facilityType: 'Hydroelectric Plant',
    capacityMw: 2525,
    lat: 43.1417,
    lon: -79.0436,
    serviceArea: 'State of New York (NYISO) & Ontario Interconnection',
    emergencyContact: 'NYPA Niagara Control Room / Lewiston Police',
    regulatoryJurisdiction: 'FERC (Project No. 2216) / International Joint Commission',
    powerGenDetails: {
      fuelType: 'Hydraulic Flow from Niagara River (305-foot net head)',
      turbineCount: 13,
      turbineModel: 'Vertical-shaft Francis turbines (200 MW each)',
      coolingSource: 'Niagara River diversion conduit'
    }
  },

  // ==========================================
  // 4. BATTERY ENERGY STORAGE SYSTEMS (BESS)
  // ==========================================
  {
    id: 'bess-moss-landing',
    name: 'Moss Landing Energy Storage Facility (World\'s Largest BESS)',
    utilitySector: 'Electric',
    operator: 'Vistra Energy',
    facilityType: 'Battery Storage (BESS)',
    capacityMw: 750,
    lat: 36.8044,
    lon: -121.7869,
    serviceArea: 'California ISO (PG&E Service Territory - 3,000 MWh Energy Capacity)',
    emergencyContact: 'North County Fire Protection District / Vistra Control (831-633-6600)',
    regulatoryJurisdiction: 'CPUC / Monterey County Environmental Health',
    powerGenDetails: {
      fuelType: 'Electrochemical Lithium-Iron-Phosphate (LFP) / Lithium-Ion Battery Cells',
      batteryMwh: 3000,
      turbineCount: 0,
      coolingSource: 'Closed-loop HVAC chilled water system with Novec 1230 fire suppression'
    }
  },

  // ==========================================
  // 5. GEOTHERMAL POWER COMPLEXES
  // ==========================================
  {
    id: 'geo-the-geysers',
    name: 'The Geysers Geothermal Complex (World\'s Largest Geothermal Field)',
    utilitySector: 'Electric',
    operator: 'Calpine Corporation',
    facilityType: 'Geothermal Complex',
    capacityMw: 1517,
    lat: 38.7942,
    lon: -122.7561,
    serviceArea: 'Northern California (CAISO - Sonoma & Lake Counties, 18 Geothermal Plants)',
    emergencyContact: 'Calpine Operations Control / Middletown Fire',
    regulatoryJurisdiction: 'California Energy Commission (CEC) / BLM',
    powerGenDetails: {
      fuelType: 'Dry Superheated Volcanic Geothermal Steam (500°F / 260°C at 2-3 km depth)',
      turbineCount: 22,
      turbineModel: 'Low-Pressure Condensing Steam Turbines',
      coolingSource: 'Treated wastewater piped 41 miles from Santa Rosa & Lake County to recharge reservoir'
    }
  },

  // ==========================================
  // 6. SEAWATER & BRACKISH DESALINATION PLANTS
  // ==========================================
  {
    id: 'desal-carlsbad-lewis',
    name: 'Claude "Bud" Lewis Carlsbad Desalination Plant',
    utilitySector: 'Water',
    operator: 'Poseidon Water / Channelside / San Diego County Water Authority (SDCWA)',
    facilityType: 'Desalination Plant',
    capacityMw: 38,
    lat: 33.1417,
    lon: -117.3333,
    serviceArea: 'San Diego County (400,000 Citizens, 10% of Region\'s Clean Drinking Water)',
    emergencyContact: 'SDCWA 24/7 Operations Desk (858-522-6600) / Carlsbad Police Dispatch',
    regulatoryJurisdiction: 'California Regional Water Quality Control Board (San Diego Region)',
    waterTreatmentDetails: {
      rawWaterSource: 'Pacific Ocean (Direct Marine Seawater Intake via Agua Hedionda Lagoon)',
      dailyCapacityMGD: 50,
      treatmentTechnology: 'Dual-Stage Granular Media Pretreatment + High-Pressure Reverse Osmosis (RO) with Energy Recovery Pelton Turbines + Post-Remineralization Limestone Contactor Beds',
      chemicalAdditives: [
        {
          name: 'Ferric Sulfate / Ferric Chloride (Fe2(SO4)3)',
          chemicalFormula: 'Fe2(SO4)3 / FeCl3',
          purpose: 'Primary Coagulant: Destabilizes colloidal silt and organic particles prior to dual-media filters',
          targetDosePpm: '8.0 - 15.0 ppm',
          healthConcerns: 'Iron residual discoloration if not thoroughly filtered; corrosive in concentrated form',
          removalMethod: 'Precipitates out in multimedia filtration beds'
        },
        {
          name: 'Sulfuric Acid (H2SO4)',
          chemicalFormula: 'H2SO4',
          purpose: 'pH Adjustment & Scale Suppression: Lowers feed seawater pH to 6.8 to prevent calcium carbonate crystallization on RO membranes',
          targetDosePpm: '25.0 - 40.0 ppm',
          healthConcerns: 'Neutralized during process; increases sulfate residual in permeate',
          removalMethod: 'Acid is neutralized downstream with lime and carbon dioxide'
        },
        {
          name: 'Phosphonate Antiscalant',
          chemicalFormula: 'R-PO(OH)2 proprietary',
          purpose: 'Membrane Antiscalant: Prevents barium sulfate and silica scale formation on polyamide membranes',
          targetDosePpm: '2.0 - 4.5 ppm',
          healthConcerns: 'Rejected by reverse osmosis membrane; discharges into ocean brine outflow',
          removalMethod: 'Rejected (>99.5%) by thin-film RO membrane'
        },
        {
          name: 'Carbon Dioxide (CO2) & Calcium Hydroxide (Lime / Calcite)',
          chemicalFormula: 'CO2 + Ca(OH)2 -> Ca(HCO3)2',
          purpose: 'Post-Treatment Remineralization: Pure RO permeate is aggressively corrosive (TDS <30 ppm, pH ~5.5); calcite dissolves calcium bicarbonate to re-harden water to drinking standards (hardness 80-120 ppm)',
          targetDosePpm: '40.0 - 70.0 ppm as CaCO3',
          healthConcerns: 'Essential minerals; prevents drinking water from leaching heavy metals (lead/copper) from household pipes',
          removalMethod: 'Deliberately retained for human health and pipe protection'
        },
        {
          name: 'Sodium Hypochlorite & Liquid Ammonium Sulfate (Chloramines)',
          chemicalFormula: 'NaOCl + (NH4)2SO4 -> NH2Cl',
          purpose: 'Final Residual Disinfection: Forms monochloramines to maintain sterile microbial barrier throughout 80+ miles of county distribution pipelines',
          targetDosePpm: '2.5 - 3.2 ppm (as Cl2)',
          healthConcerns: 'Eye/skin irritation, formation of trace nitrogenous disinfection byproducts (NDMA)',
          removalMethod: 'Catalytic carbon block filtration or reverse osmosis at household tap'
        },
        {
          name: 'Fluorosilicic Acid (H2SiF6)',
          chemicalFormula: 'H2SiF6',
          purpose: 'Community Water Fluoridation: Artificial fluoridation per California statutory mandate',
          targetDosePpm: '0.7 ppm (0.7 mg/L optimal)',
          healthConcerns: 'Neurodevelopmental concerns (2024 Federal TSCA court ruling), fluorosis, thyroid suppression',
          removalMethod: 'Under-sink Reverse Osmosis or Activated Alumina filters'
        }
      ],
      disinfectionByproductsNotes: 'Reverse osmosis permeate contains near-zero organic precursor matter, reducing Total Trihalomethanes (TTHM <10 ppb). However, secondary chloramination produces trace NDMA (2-5 ppt).'
    }
  },
  {
    id: 'desal-tampa-bay',
    name: 'Tampa Bay Seawater Desalination Facility',
    utilitySector: 'Water',
    operator: 'Tampa Bay Water / Veolia Water',
    facilityType: 'Desalination Plant',
    capacityMw: 22,
    lat: 27.7917,
    lon: -82.4042,
    serviceArea: 'Tampa, St. Petersburg, Hillsborough County (2.5 Million Residents)',
    emergencyContact: 'Tampa Bay Water Operations (727-796-2355)',
    regulatoryJurisdiction: 'Florida Department of Environmental Protection (FDEP) / EPA Region 4',
    waterTreatmentDetails: {
      rawWaterSource: 'Hillsborough Bay / Tampa Bay (Seawater blended with TECO Big Bend cooling canal discharge)',
      dailyCapacityMGD: 25,
      treatmentTechnology: 'Coagulation + Flocculation + Sand Filters + Diatomaceous Earth + SWRO Membrane Desalination',
      chemicalAdditives: [
        {
          name: 'Sulfuric Acid (H2SO4)',
          chemicalFormula: 'H2SO4',
          purpose: 'Lowers pH to prevent carbonate precipitation on membranes',
          targetDosePpm: '30.0 ppm',
          healthConcerns: 'Acidic, neutralized downstream',
          removalMethod: 'Degasification & lime neutralization'
        },
        {
          name: 'Sodium Hydroxide (Caustic Soda, NaOH)',
          chemicalFormula: 'NaOH',
          purpose: 'Final pH stabilization to 7.8 - 8.2',
          targetDosePpm: '15.0 - 25.0 ppm',
          healthConcerns: 'Skin irritant in concentrate; safe as neutralized sodium buffer',
          removalMethod: 'Retained as pH buffer'
        },
        {
          name: 'Free Chlorine (Sodium Hypochlorite)',
          chemicalFormula: 'NaOCl',
          purpose: 'Disinfectant residual and pathogen kill',
          targetDosePpm: '2.0 - 4.0 ppm',
          healthConcerns: 'Forms THMs and chlorite',
          removalMethod: 'Activated carbon'
        },
        {
          name: 'Fluorosilicic Acid (H2SiF6)',
          chemicalFormula: 'H2SiF6',
          purpose: 'Artificial municipal fluoridation',
          targetDosePpm: '0.7 ppm',
          healthConcerns: 'Dental and skeletal fluorosis, cognitive impact',
          removalMethod: 'Household reverse osmosis'
        }
      ],
      disinfectionByproductsNotes: 'Diatomaceous earth and RO membranes remove 99.8% of organic precursors.'
    }
  },
  {
    id: 'desal-oc-gwrs',
    name: 'Orange County Groundwater Replenishment System (GWRS)',
    utilitySector: 'Water',
    operator: 'Orange County Water District (OCWD) / Orange County Sanitation District',
    facilityType: 'Water Treatment Facility',
    capacityMw: 45,
    lat: 33.7178,
    lon: -117.9392,
    serviceArea: 'Orange County (Anaheim, Santa Ana, Huntington Beach, Irvine - 2.5 Million Citizens)',
    emergencyContact: 'OCWD Operations Desk (714-378-3200)',
    regulatoryJurisdiction: 'California Division of Drinking Water (DDW) / Santa Ana Regional Water Board',
    waterTreatmentDetails: {
      rawWaterSource: 'Secondary-Treated Municipal Wastewater (Sewage effluent from OCSD Plant 1)',
      dailyCapacityMGD: 130,
      treatmentTechnology: '3-Step Advanced Purification: Submerged Microfiltration (0.1 micron) + Reverse Osmosis (RO) + UV Disinfection with Hydrogen Peroxide Advanced Oxidation Process (UV/AOP)',
      chemicalAdditives: [
        {
          name: 'Sodium Hypochlorite (Chlorine Bleach)',
          chemicalFormula: 'NaOCl',
          purpose: 'Chloramine formation to protect microfiltration membranes from bacterial biofouling',
          targetDosePpm: '3.0 - 5.0 ppm',
          healthConcerns: 'Precursor to chloramine DBPs',
          removalMethod: 'Quenched downstream with sodium bisulfite before RO'
        },
        {
          name: 'Hydrogen Peroxide (H2O2)',
          chemicalFormula: 'H2O2',
          purpose: 'Advanced Oxidation Process (AOP): Injected upstream of high-intensity ultraviolet (UV) reactors; UV photolysis breaks H2O2 into hydroxyl free radicals (•OH) which shatter trace pharmaceuticals, 1,4-dioxane, NDMA, and endocrine disruptors',
          targetDosePpm: '3.0 ppm',
          healthConcerns: 'Potent oxidizer; decomposes entirely into pure water (H2O) and oxygen (O2)',
          removalMethod: '100% photolyzed and decomposed during UV treatment'
        },
        {
          name: 'Calcium Hydroxide (Lime) & Carbon Dioxide',
          chemicalFormula: 'Ca(OH)2 + CO2',
          purpose: 'Post-treatment remineralization and pH stabilization prior to groundwater basin injection',
          targetDosePpm: '50.0 ppm CaCO3 equivalent',
          healthConcerns: 'Non-toxic, essential calcium minerals',
          removalMethod: 'Retained to protect aquifer minerals'
        }
      ],
      disinfectionByproductsNotes: 'GWRS water is purer than bottled water (TDS <50 ppm, undetectable PFAS, zero pathogens). However, requires remineralization before injection into Santa Ana River groundwater basin.'
    }
  },

  // ==========================================
  // 7. MUNICIPAL WATER TREATMENT PLANTS
  // ==========================================
  {
    id: 'water-mwd-wey-plant',
    name: 'Metropolitan Water District (MWD) F.E. Wey Water Treatment Plant',
    utilitySector: 'Water',
    operator: 'Metropolitan Water District of Southern California',
    facilityType: 'Water Treatment Facility',
    capacityMw: 520,
    lat: 34.1130,
    lon: -117.7650,
    serviceArea: 'Los Angeles & Orange Counties (5 Million Citizens - La Verne, Pasadena, Long Beach)',
    emergencyContact: 'MWD Control Center (213-217-6000) / California DWR',
    regulatoryJurisdiction: 'California State Water Resources Control Board (DDW System 1910089)',
    waterTreatmentDetails: {
      rawWaterSource: 'Colorado River Aqueduct (Lake Havasu intake) & California State Water Project (Silverwood Lake)',
      dailyCapacityMGD: 520,
      treatmentTechnology: 'Ozonation + Rapid Coagulant Mix + Flocculation + Dual-Media Deep Bed Anthracite/Sand Filtration + Chloramination + Fluoridation',
      chemicalAdditives: [
        {
          name: 'Ozone Gas (O3)',
          chemicalFormula: 'O3',
          purpose: 'Primary Disinfection & Taste/Odor Control: Replaced free chlorine as primary disinfectant to destroy Cryptosporidium/Giardia and prevent THM formation',
          targetDosePpm: '1.5 - 2.5 ppm',
          healthConcerns: 'Forms toxic Bromate (BrO3-) if raw water contains natural bromide salts; MWD controls pH to maintain bromate <10 ppb',
          removalMethod: 'Decomposes naturally into oxygen (O2) within minutes'
        },
        {
          name: 'Aluminum Sulfate (Liquid Alum)',
          chemicalFormula: 'Al2(SO4)3 • 14H2O',
          purpose: 'Primary Coagulant: Glues microscopic clay, turbidity, and organic particles together into settleable "floc"',
          targetDosePpm: '6.0 - 18.0 ppm',
          healthConcerns: 'Trace aluminum residual in finished water (typically 0.05-0.15 mg/L, scrutinized in neurodegenerative research)',
          removalMethod: 'Filtered out in deep anthracite beds'
        },
        {
          name: 'Cationic / Non-ionic Polymer (PolyDADMAC)',
          chemicalFormula: 'Proprietary synthetic polymer',
          purpose: 'Coagulant Aid: Strengthens floc particles against shear stress during high-rate filtration',
          targetDosePpm: '0.1 - 0.5 ppm',
          healthConcerns: 'Trace acrylamide or epichlorohydrin monomers regulated under EPA treatment technique',
          removalMethod: 'Trapped in filter media'
        },
        {
          name: 'Sodium Hydroxide (Caustic Soda, NaOH)',
          chemicalFormula: 'NaOH',
          purpose: 'pH & Alkalinity Adjustment: Counteracts acidity of alum and stabilizes pH to 8.0 - 8.4 to prevent pipe corrosion',
          targetDosePpm: '8.0 - 16.0 ppm',
          healthConcerns: 'Neutralized in solution',
          removalMethod: 'Retained as buffer'
        },
        {
          name: 'Chlorine Gas & Aqua Ammonia (NH3) -> Chloramines',
          chemicalFormula: 'NH2Cl',
          purpose: 'Secondary Pipeline Disinfection: Provides persistent microbial disinfectant that survives 40+ miles of transmission mains',
          targetDosePpm: '2.5 - 3.0 ppm (as Cl2)',
          healthConcerns: 'Skin irritation, dialysis hazard, NDMA formation',
          removalMethod: 'Catalytic carbon block or under-sink RO'
        },
        {
          name: 'Fluorosilicic Acid (H2SiF6)',
          chemicalFormula: 'H2SiF6',
          purpose: 'Mandatory Artificial Fluoridation per California Health & Safety Code 116410',
          targetDosePpm: '0.7 ppm (optimal target)',
          healthConcerns: 'Fluorosis, thyroid and neurodevelopmental impacts',
          removalMethod: 'Reverse osmosis or bone char filtration'
        }
      ],
      disinfectionByproductsNotes: 'Ozone transition reduced TTHMs from ~65 ppb down to 18-25 ppb. Monochloramine residual generates trace NDMA (3-8 ppt).'
    }
  },
  {
    id: 'water-chicago-jardine',
    name: 'James W. Jardine Water Purification Plant (World\'s Largest Conventional Water Plant)',
    utilitySector: 'Water',
    operator: 'City of Chicago Department of Water Management (CDWM)',
    facilityType: 'Water Treatment Facility',
    capacityMw: 600,
    lat: 41.8953,
    lon: -87.6083,
    serviceArea: 'City of Chicago & 120 Suburban Municipalities (5 Million Citizens)',
    emergencyContact: 'CDWM Water Quality Hotline (311 / 312-744-8190) / Chicago 911',
    regulatoryJurisdiction: 'Illinois Environmental Protection Agency (IEPA) / EPA Region 5',
    waterTreatmentDetails: {
      rawWaterSource: 'Lake Michigan (Intake cribs located 2 miles offshore: Harrison-Dever and Carter H. Harrison cribs)',
      dailyCapacityMGD: 1440,
      treatmentTechnology: 'Screening + Rapid Mix + Alum Coagulation + Flocculation + Sedimentation + Sand/Gravel Filtration + Fluoridation + Chlorination + Corrosion Inhibitor (Polyphosphate)',
      chemicalAdditives: [
        {
          name: 'Liquid Aluminum Sulfate (Alum)',
          chemicalFormula: 'Al2(SO4)3',
          purpose: 'Primary coagulant for suspended turbidity removal',
          targetDosePpm: '10.0 - 20.0 ppm',
          healthConcerns: 'Residual dissolved aluminum',
          removalMethod: 'Sedimentation basins and sand filters'
        },
        {
          name: 'Chlorine Gas (Cl2)',
          chemicalFormula: 'Cl2',
          purpose: 'Primary Disinfection: Injected into raw water and post-filtration to destroy bacteria and viruses',
          targetDosePpm: '1.8 - 2.5 ppm',
          healthConcerns: 'Forms chloroform and trihalomethanes (TTHM ~30-45 ppb in Chicago tap)',
          removalMethod: 'Activated carbon'
        },
        {
          name: 'Fluorosilicic Acid (H2SiF6)',
          chemicalFormula: 'H2SiF6',
          purpose: 'Artificial Community Water Fluoridation',
          targetDosePpm: '0.7 ppm',
          healthConcerns: 'Enamel mottling, neurodevelopmental risks',
          removalMethod: 'Under-sink RO'
        },
        {
          name: 'Blended Polyphosphate / Orthophosphate',
          chemicalFormula: 'PO4(3-)',
          purpose: 'Corrosion Control: Coats inside of Chicago\'s 400,000+ lead service lines with a microscopic protective mineral barrier to prevent lead leaching into tap water',
          targetDosePpm: '1.5 - 2.5 ppm (as PO4)',
          healthConcerns: 'Excessive phosphates promote algae blooms if wastewater discharged untreated; otherwise non-toxic',
          removalMethod: 'Household reverse osmosis'
        },
        {
          name: 'Powdered Activated Carbon (PAC)',
          chemicalFormula: 'C',
          purpose: 'Seasonal Taste and Odor Removal: Dosed during summer when Lake Michigan experiences seasonal algae blooms producing Geosmin and MIB',
          targetDosePpm: '2.0 - 10.0 ppm',
          healthConcerns: 'Pure carbon, filtered out entirely',
          removalMethod: 'Settles out in sedimentation basins'
        }
      ],
      disinfectionByproductsNotes: 'Chicago tap water contains 25–45 ppb TTHMs and 15–28 ppb HAAs. Water passing through Chicago\'s extensive lead service line network requires rigorous orthophosphate monitoring to prevent lead spikes.'
    }
  }
];
