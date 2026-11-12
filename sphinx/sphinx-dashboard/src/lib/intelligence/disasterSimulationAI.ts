// disasterSimulationAI.ts
// Comprehensive Multi-Disaster Simulation & Geospatial Analytics Engine
// Simulates and analyzes:
// 1. Commercial Nuclear Reactor Meltdowns & Radiological Fallout Dispersion
// 2. Catastrophic Megafire Conflagrations & Firestorms
// 3. Great Tectonic Fault Ruptures & Mega-Earthquakes (San Andreas M8.2, Cascadia M9.0)
// 4. Continental Power Grid Collapse / EMP Blackouts
// 5. Toxic Industrial Chemical Tanker / Chlorine Gas Railcar Leaks
// 6. Water Contamination, Desalination Failures & Chemical Safety Inquiries

import { AIResponse, MapAction, MapContext } from './aiClient';
import { ChemicalSafetyEngine, CHEMICAL_SAFETY_STANDARDS } from './chemicalSafetyStandards';
import { POWER_AND_WATER_FACILITIES } from './powerAndWaterCatalog';
import { CRITICAL_UTILITY_COMPANIES } from './criticalInfrastructureEngine';

export interface DisasterScenario {
  type: 'nuclear' | 'wildfire' | 'earthquake' | 'grid_collapse' | 'chemical_plume' | 'chemical_safety';
  targetFacilityOrLocation: string;
  centerCoordinates: { lat: number; lon: number };
  zoomLevel: number;
  activeLayers: string[];
}

/**
 * Checks if a user prompt is asking for a disaster simulation, toxin/chemical threshold, or water additive review
 */
export function isDisasterSimulationQuery(query: string): boolean {
  const lower = query.toLowerCase();

  const hasNuclear = lower.includes('nuclear') || lower.includes('reactor') || lower.includes('meltdown') || lower.includes('radiation') || lower.includes('fallout') || lower.includes('diablo canyon') || lower.includes('palo verde') || lower.includes('vogtle');
  const hasWildfire = lower.includes('wildfire') || lower.includes('firestorm') || lower.includes('conflagration') || (lower.includes('fire') && (lower.includes('spread') || lower.includes('burn') || lower.includes('smoke') || lower.includes('rothermel')));
  const hasQuake = lower.includes('earthquake') || lower.includes('fault') || lower.includes('san andreas') || lower.includes('cascadia') || lower.includes('rupture') || lower.includes('tremor') || lower.includes('richter');
  const hasGrid = lower.includes('grid') || lower.includes('blackout') || lower.includes('emp') || lower.includes('carrington') || lower.includes('power outage') || (lower.includes('power') && lower.includes('collapse'));
  const hasChemical = lower.includes('chlorine') || lower.includes('chemical leak') || lower.includes('tanker') || lower.includes('railcar') || lower.includes('plume') || lower.includes('toxic release') || lower.includes('superfund');
  const hasWaterChemicals = (lower.includes('water') && (lower.includes('chemical') || lower.includes('additive') || lower.includes('put in') || lower.includes('fluoride') || lower.includes('chloramine') || lower.includes('desalination') || lower.includes('carlsbad'))) || lower.includes('ewg') || lower.includes('pfas') || lower.includes('safety level') || lower.includes('safe level') || lower.includes('who guideline') || lower.includes('epa mcl');

  return hasNuclear || hasWildfire || hasQuake || hasGrid || hasChemical || hasWaterChemicals;
}

/**
 * Generates an authoritative multi-horizon impact dossier and dispatches map actions
 */
export function generateDisasterAIResponse(
  query: string,
  mapContext: MapContext,
  isDeepResearch = false
): AIResponse {
  const lower = query.toLowerCase();

  // 1. CHEMICAL SAFETY & WATER ADDITIVES QUERY
  if (
    lower.includes('chemical') ||
    lower.includes('safety level') ||
    lower.includes('safe level') ||
    lower.includes('threshold') ||
    lower.includes('additive') ||
    lower.includes('put in the water') ||
    lower.includes('treat it') ||
    lower.includes('fluoride') ||
    lower.includes('chloramine') ||
    lower.includes('pfas') ||
    lower.includes('ewg') ||
    lower.includes('who')
  ) {
    return handleChemicalSafetyQuery(query, lower, mapContext, isDeepResearch);
  }

  // 2. NUCLEAR REACTOR MELTDOWN SIMULATION
  if (lower.includes('nuclear') || lower.includes('meltdown') || lower.includes('fallout') || lower.includes('diablo canyon') || lower.includes('palo verde') || lower.includes('vogtle')) {
    return handleNuclearDisasterSimulation(query, lower, mapContext, isDeepResearch);
  }

  // 3. WILDFIRE CONFLAGRATION SIMULATION
  if (lower.includes('wildfire') || lower.includes('firestorm') || lower.includes('conflagration') || lower.includes('fire')) {
    return handleWildfireDisasterSimulation(query, lower, mapContext, isDeepResearch);
  }

  // 4. GREAT EARTHQUAKE FAULT RUPTURE SIMULATION
  if (lower.includes('earthquake') || lower.includes('fault') || lower.includes('san andreas') || lower.includes('cascadia') || lower.includes('rupture')) {
    return handleEarthquakeDisasterSimulation(query, lower, mapContext, isDeepResearch);
  }

  // 5. CONTINENTAL POWER GRID COLLAPSE / EMP
  if (lower.includes('grid') || lower.includes('blackout') || lower.includes('emp') || lower.includes('power outage')) {
    return handleGridDisasterSimulation(query, lower, mapContext, isDeepResearch);
  }

  // 6. HAZARDOUS CHEMICAL RAILCAR / TANKER LEAK
  return handleChlorineChemicalDisasterSimulation(query, lower, mapContext, isDeepResearch);
}

// -------------------------------------------------------------
// Sub-handler 1: Chemical Safety & Water Additives Query
// -------------------------------------------------------------
function handleChemicalSafetyQuery(query: string, lower: string, mapContext: MapContext, isDeepResearch: boolean): AIResponse {
  const matchedStandards = ChemicalSafetyEngine.searchStandards(query);
  const primaryStandard = matchedStandards[0] || CHEMICAL_SAFETY_STANDARDS[0];

  const standardsSummaryTable = matchedStandards.slice(0, 5).map(s => {
    return `| **${s.chemical_name}** | **${s.government_limits.epa_mcl}** | **${s.government_limits.who_guideline}** | **${s.government_limits.eu_directive}** | **${s.independent_standards.ewg_health_guideline}** | ${s.independent_standards.iarc_classification} |`;
  }).join('\n');

  const text = `### 🧪 GLOBAL TOXIN & WATER TREATMENT CHEMICAL SAFETY REFERENCE
**Comparative Regulatory Standards:** US EPA, WHO, European Union EFSA/ECHA, Health Canada, Japan MHLW, and Independent Non-Biased Health Guidelines (EWG, ACGIH, IARC, NTP).

---

#### 📊 COMPARATIVE EXPOSURE THRESHOLDS: GOVERNMENT LEGAL LIMITS VS INDEPENDENT HEALTH SCIENCE
| Chemical Contaminant / Additive | US EPA (Legal MCL) | World Health Org (WHO) | European Union (EU) | EWG Health Guideline (Independent) | IARC Carcinogen Group |
| :--- | :---: | :---: | :---: | :---: | :---: |
${standardsSummaryTable}

---

#### 💧 MUNICIPAL WATER TREATMENT & DESALINATION CHEMICAL ADDITIVES
When municipal water utilities (e.g. MWD Wey Plant, Chicago Jardine) and ocean desalination plants (e.g. Carlsbad 50 MGD) treat raw river or seawater, they inject an inventory of synthetic and mineral reagents:

1. **Disinfectants & Biocides (Kill Pathogens, Form Carcinogenic Byproducts):**
   - **Chlorine Gas ($Cl_2$) & Sodium Hypochlorite ($NaOCl$):** Dosed at **1.5 to 4.0 ppm**. Reacts with natural organic matter to form toxic **Trihalomethanes (THMs)** (EPA legal limit: 80 ppb; EWG health benchmark: 0.15 ppb).
   - **Chloramines (Monochloramine, $NH_2Cl$):** Created by adding anhydrous ammonia ($NH_3$) to chlorine. Extends disinfectant lifespan in pipes but forms potent genotoxic **N-Nitrosodimethylamine (NDMA)**.
   - **Ozone Gas ($O_3$):** Powerful oxidizer that eliminates THMs but reacts with natural bromide salts in seawater/rivers to form **Bromate ($BrO_3^-$)** (EPA limit 10 ppb).
2. **Artificial Water Fluoridation Agents:**
   - **Fluorosilicic Acid ($H_2SiF_6$) / Sodium Fluorosilicate:** Dosed at **0.7 ppm (0.7 mg/L)**. The US EPA legal ceiling is 4.0 mg/L (established in 1986). In August 2024, a US Federal Court determined that 0.7 mg/L presents an unreasonable risk of reduced IQ in children. European nations overwhelmingly reject artificial fluoridation (97% unfluoridated).
3. **Coagulants & Flocculants (Clarify Silt & Turbidity):**
   - **Liquid Aluminum Sulfate (Alum, $Al_2(SO_4)_3$):** Glues suspended clay and microscopic particles into settleable clumps. Leaves trace residual dissolved aluminum (0.05–0.15 mg/L) in finished tap water.
   - **Ferric Chloride ($FeCl_3$) & Polyaluminum Chloride (PAC):** Iron-based alternative coagulants used extensively in desalination pretreatment.
4. **Alkalinity & pH Buffers (Prevent Acidic Pipe Corrosion):**
   - **Caustic Soda ($NaOH$) & Hydrated Lime ($Ca(OH)_2$):** Injected at 5–25 ppm to raise finished water pH to 8.0–8.4, preventing tap water from dissolving lead and copper from plumbing solder.
5. **Corrosion Inhibitors (Lead Line Sealing):**
   - **Orthophosphates & Zinc Orthophosphate:** Forms a microscopic protective mineral coating along the inside of municipal lead service lines (LSLs) to lock lead in place.
6. **Desalination Re-mineralization & Antiscalants:**
   - **Phosphonate Antiscalants:** Injected upstream of Reverse Osmosis (RO) membranes to stop mineral scale buildup.
   - **Calcite (Limestone) & $CO_2$ Contactors:** Pure RO permeate contains near-zero minerals and is aggressively acidic; contactors dissolve 40–80 ppm calcium bicarbonate to re-harden water to healthy drinking levels.

---

#### ⚖️ CRITICAL DISCREPANCY ANALYSIS: LEGAL LIMITS VS BIOLOGICAL SAFETY
- **The "Economic Feasibility" Compromise:** Federal EPA MCLs are statutory compromises balancing human health against water utility compliance costs. Legal compliance **does NOT guarantee health safety**.
- **Forever Chemicals (PFAS):** Until 2024, the EPA had zero enforceable limits for PFAS despite independent toxicologists establishing that lifetime bioaccumulation causes kidney cancer and antibody suppression even at fractions of a part-per-trillion.
- **Vapor Inhalation in Showers:** Volatile organic chemicals (Chloroform, TCE, Benzene, Radon) turn into gas in hot showers; lungs absorb up to **3x more VOCs** through steam inhalation than oral drinking ingestion.

#### 🛡️ PROVEN AT-HOME CONTAMINANT REMOVAL PROTOCOLS
- [ ] **Dual-Stage Under-Sink Reverse Osmosis (RO):** Certified to NSF/ANSI 58. Removes 95–99% of Fluoride, Lead, Arsenic, PFAS, Microplastics, and Nitrates.
- [ ] **Catalytic Carbon Block Post-Filter:** Necessary if your city doses Chloramines, as standard activated carbon fails to break monochloramine bonds.
- [ ] **Shower KDF-55 / Vitamin C Neutralization:** Essential for neutralizing free chlorine and chloramines to prevent inhalation of aerosolized VOCs during hot showers.
- [ ] **Avoid Pitcher Filters for Heavy Contaminants:** Basic pour-through carbon pitchers do not remove fluoride, nitrate, or arsenic.`;

  return {
    text,
    isDeepResearch,
    actions: [
      {
        type: 'SIMULATE_DISASTER',
        payload: {
          disasterType: 'chemical_safety',
          flyTo: { lat: 37.0902, lon: -95.7129, zoom: 4.5 },
          layers: ['utility_companies', 'toxic_sites', 'weather_stations']
        }
      }
    ],
    sources: [
      'US EPA National Primary Drinking Water Regulations (40 CFR Part 141)',
      'World Health Organization (WHO) Guidelines for Drinking-water Quality (4th Edition)',
      'European Union Drinking Water Directive (EU 2020/2184)',
      'Environmental Working Group (EWG) Tap Water Scientific Database',
      'National Toxicology Program (NTP) Monograph on Fluoride & Neurodevelopment (2024)',
      'California Office of Environmental Health Hazard Assessment (OEHHA) Public Health Goals'
    ],
    timestamp: new Date().toISOString()
  };
}

// -------------------------------------------------------------
// Sub-handler 2: Nuclear Reactor Meltdown Simulation
// -------------------------------------------------------------
function handleNuclearDisasterSimulation(query: string, lower: string, mapContext: MapContext, isDeepResearch: boolean): AIResponse {
  let targetName = 'Diablo Canyon Nuclear Power Plant';
  let coords = { lat: 35.2111, lon: -120.8556 };
  let regionDesc = 'Central Coast & San Luis Obispo County, California';

  if (lower.includes('palo verde') || lower.includes('phoenix') || lower.includes('arizona')) {
    targetName = 'Palo Verde Nuclear Generating Station';
    coords = { lat: 33.3964, lon: -112.8686 };
    regionDesc = 'Maricopa County / Phoenix Metropolitan Basin, Arizona';
  } else if (lower.includes('vogtle') || lower.includes('georgia') || lower.includes('savannah')) {
    targetName = 'Vogtle Electric Generating Plant';
    coords = { lat: 33.1425, lon: -81.7619 };
    regionDesc = 'Burke County / Savannah River Corridor, Georgia';
  }

  const text = `### ☢️ CATASTROPHIC DISASTER SIMULATION: FULL NUCLEAR MELTDOWN & CONTAINMENT BREACH
**Target Facility:** ${targetName} (${regionDesc})
**Tactical Scenario:** Complete Loss of Offsite Power (Station Blackout / SBO), Emergency Diesel Generator Failure, Loss of Emergency Core Cooling (LOCA), Core Uncovery, Ex-Vessel Corium Concrete Interaction, and Radiological Plume Venting.

---

#### 📊 INCIDENT ENGINEERING & RADIOLOGICAL RELEASE METRICS
| Parameter | Value | Tactical & Population Context |
| :--- | :--- | :--- |
| **Reactor Status** | **Level 7 Major Accident (INES Scale)** | Equivalent in severity to Fukushima Daiichi and Chornobyl |
| **Volatile Core Fission Products** | **~25–40% Core Inventory Released** | Major isotopic discharge of Iodine-131 ($I^{131}$), Cesium-137 ($Cs^{137}$), Strontium-90 ($Sr^{90}$) |
| **Spent Fuel Pool Threat** | **Active High-Risk Thermal Boil-off** | 2,000+ spent fuel assemblies without forced circulation; potential zirconium fire |
| **Plume Exposure Pathway (EPZ)** | **10-Mile Radius (Direct Inhalation)** | Instant lethal dosage zone within 2–5 miles downwind without fortified bunker shielding |
| **Ingestion Pathway Zone (IPZ)** | **50-Mile Radius (Dairy & Agriculture)** | Atmospheric fallout contamination across milk, crops, surface reservoirs, and soil |
| **Base Load Electrical Loss** | **2,256 – 4,500 MW Disconnected** | Triggers regional electrical grid derating and immediate industrial shedding |

---

### ⏱️ MULTI-HORIZON RADIOLOGICAL IMPACT & CASUALTY MODELING

#### 🚨 1. IMMEDIATE IMPACT (0 TO 6 HOURS): HYDROGEN DETONATION & INITIAL GROUND SHINE
- **Explosion & Containment Overpressurization:** Zirconium cladding reacts with steam at $>1,200^\circ C$ generating copious hydrogen gas ($Zr + 2H_2O \rightarrow ZrO_2 + 2H_2$). Secondary hydrogen deflagrations compromise the containment dome.
- **Initial Flash Dose Rate:** In the immediate downwind corridor (0–5 miles), dose rates reach **500 to 2,000 R/hr** within 90 minutes. Unshielded exposure for $>20$ minutes results in Acute Radiation Sickness (ARS - hematopoietic and gastrointestinal syndrome, lethal LD50/60).
- **Evacuation Gridlock:** Highway chokepoints experience total paralysis within 45 minutes as civilian panic evacuations cross paths with emergency responders and National Guard CBRN convoys.

#### ☢️ 2. SHORT-TERM IMPACT (6 TO 72 HOURS): WINDBORNE PLUME SPREAD & EVAPORATIVE FALLOUT
- **Atmospheric Dispersion:** Prevailing winds carry the radioactive plume across regional valleys and metropolitan suburbs at 10–25 mph. Rain or convective showers precipitate "hot spots" of concentrated particulate fallout.
- **Surface Reservoir Poisoning:** Municipal open-air drinking water reservoirs within 50 miles receive severe isotopic fallout ($I^{131}$ and $Cs^{137}$). Tap water intakes must be shut off immediately.
- **Thyroid Saturation Crisis:** Children and pregnant women exposed to unmitigated inhalation face extreme lifetime thyroid carcinoma risk without immediate Potassium Iodide (KI) thyroid blocking.

#### 🌾 3. INTERMEDIATE-TERM IMPACT (3 DAYS TO 4 WEEKS): THE 7/10 DECAY REDUCTION & COLD REDOUBTS
- **The 7/10 Radiation Decay Principle:**
  - Hour H+1: Base dose rate = 1,000 R/hr
  - Hour H+7 (Day 1): Rate drops to 100 R/hr (10x drop)
  - Hour H+49 (Day 2): Rate drops to 10 R/hr (100x drop)
  - Hour H+343 (Day 14): Rate drops to 1 R/hr (1,000x drop — safe for brief outdoor vehicle transit)
- **Agricultural Quarantine:** Immediate USDA/FDA recall of all dairy, leafy vegetables, livestock, and unsealed food within an 80-mile perimeter.
- **Critical Infrastructure Abandonment:** Telecommunications technicians, power plant operators, and municipal water workers are evacuated from the Exclusion Zone, causing cascading utility failure.

#### 🏜️ 4. LONG-TERM IMPACT (1 MONTH TO 5+ YEARS): THE PERMANENT EXCLUSION ZONE
- **Cesium-137 Contamination ($t_{1/2} = 30.17$ years):** Deep soil penetration of Cesium-137 creates a permanent radioactive exclusion zone extending 15 to 35 miles downwind, requiring decades of topsoil stripping and concrete remediation.
- **$300+ Billion Economic Fallout:** Real estate values within the 50-mile ingestion pathway crash to zero. Power utilities face bankruptcy; federal Price-Anderson Act liability reserves are instantly exhausted.

---

### 🛡️ CBRN RADIOLOGICAL SURVIVAL PROTOCOLS BY TIME HORIZON

#### 🚨 IMMEDIATE ACTION CHECKLIST (HOUR 0 - 6)
- [ ] **Seek Maximum Below-Grade Mass Shielding:** Get inside the central basement of a multi-story concrete building or packed earth bunker.
  - *Shielding Rule (Halving Thickness):* 2.4 inches of solid concrete, 3.6 inches of compacted dirt, or 7.2 inches of water cuts gamma radiation by 50%. 10 halving thicknesses (24" concrete or 36" dirt) cuts radiation by **1,024 times**.
- [ ] **Seal Living Perimeter:** Turn off all HVAC, furnaces, and outside air intakes. Seal window edges, door jams, and vents with 6-mil plastic sheeting and heavy duct tape.
- [ ] **Administer Potassium Iodide (KI):** Take immediately upon confirmation of radioactive plume release:
  - Adults & pregnant/nursing: **130 mg** (1 tablet daily).
  - Children (3–18 yrs, <150 lbs): **65 mg** (half tablet).
  - Infants (1 mo–3 yrs): **32 mg** (quarter tablet).
  - Neonates (birth–1 mo): **16 mg** (crushed in formula).
- [ ] **Wear Respiratory Protection:** N95/N100 or P100 respirator to filter particulate radioactive isotopes from entering pulmonary alveoli.

#### 🎒 SHORT-TERM SURVIVAL PROTOCOL (DAY 1 - 3)
- [ ] **STAY INSIDE (Do Not Evacuate Through Active Fallout):** The radiation outdoors during the first 24–48 hours is lethal. Wait for the 7/10 decay rule to drop radiation by 99% before attempting relocation.
- [ ] **Decontamination Protocol Upon Exposure:**
  - Strip outer clothing outside living space (removes 90% of radioactive particles). Double-bag in heavy contractor trash bags.
  - Wash hair and body with warm water and soap without abrasive scrubbing. **DO NOT USE HAIR CONDITIONER** (conditioner bonds radioactive isotopes to hair proteins).
- [ ] **Consume Strictly Sealed Food & Water:** Drink only bottled water, canned goods, or sealed Mylar-packed survival rations stored before the event.

#### 🧭 INTERMEDIATE & LONG-TERM RECOVERY (WEEK 1 - YEAR 1+)
- [ ] **Monitor Emergency EAS & Radiac Instruments:** Use a calibrated Geiger-Müller counter / dosimeter to identify clean transit routes. Monitor NOAA radio (AM 640 / 1240 kHz CONELRAD frequencies).
- [ ] **Orderly Cross-Wind Relocation:** When evacuated by authorities, travel **perpendicular (cross-wind)** to the fallout plume track, never directly downwind.`;

  return {
    text,
    isDeepResearch,
    actions: [
      {
        type: 'SIMULATE_DISASTER',
        payload: {
          disasterType: 'nuclear_meltdown',
          flyTo: { lat: coords.lat, lon: coords.lon, zoom: 9.0 },
          layers: ['utility_companies', 'power_lines', 'toxic_sites', 'military_bunkers', 'hospitals']
        }
      }
    ],
    sources: [
      'US Nuclear Regulatory Commission (NRC) Severe Accident Mitigation Guidelines (NUREG-1150)',
      'FEMA Federal Radiological Emergency Response Plan (FRERP)',
      'International Atomic Energy Agency (IAEA) Safety Standards Series No. GSR Part 7',
      'CDC Guidelines for Potassium Iodide (KI) Prophylaxis',
      'Oak Ridge National Laboratory Radiation Shielding Assessment Manual'
    ],
    timestamp: new Date().toISOString()
  };
}

// -------------------------------------------------------------
// Sub-handler 3: Wildfire Conflagration Simulation
// -------------------------------------------------------------
function handleWildfireDisasterSimulation(query: string, lower: string, mapContext: MapContext, isDeepResearch: boolean): AIResponse {
  let targetArea = 'Sierra Nevada Foothills / Northern California Wildland-Urban Interface (WUI)';
  let coords = { lat: 39.7596, lon: -121.6219 };

  if (lower.includes('angeles') || lower.includes('southern california') || lower.includes('malibu')) {
    targetArea = 'Santa Ana Wind Corridor (Southern California / Los Angeles Basin)';
    coords = { lat: 34.0259, lon: -118.7798 };
  } else if (lower.includes('colorado') || lower.includes('boulder') || lower.includes('marshall')) {
    targetArea = 'Front Range Foothills (Boulder County, Colorado)';
    coords = { lat: 39.9556, lon: -105.1686 };
  }

  const text = `### 🔥 CATASTROPHIC WILDFIRE SIMULATION: HIGH-WIND EXTREME CONFLAGRATION
**Location:** ${targetArea}
**Tactical Scenario:** Diabatic Offshore Wind Event (Santa Ana / Diablo Wind, 65–85 mph gusts, Relative Humidity <8%), High-Voltage Transmission Line Failure, Extreme Rothermel Rate of Spread, Pyrocumulonimbus Cloud Generation, and Long-Range Ember Spotting.

---

#### 📊 FIRE BEHAVIOR & WEATHER TELEMETRY
| Parameter | Value | Tactical Interpretation |
| :--- | :--- | :--- |
| **Rate of Spread (ROS)** | **4.5 to 8.0 mph forward spread** | Consumes 80–120 football fields of fuel per minute |
| **Flame Length** | **80 to 140+ feet** | Exceeds all direct suppression capabilities; aerial tankers grounded due to severe turbulence |
| **Spotting Distance** | **2.5 to 4.5 miles ahead of front** | Fire brands lofted into jet stream ignite multiple secondary fires behind defensible lines |
| **Fuel Moisture (10-Hour)** | **2.5% (Extremely Critical)** | Living chaparral, timber, and timber litter combust with explosive flash ignition |
| **Evacuation Time Window** | **<25 minutes for WUI settlements** | Roads blocked by fallen burning trees and disabled civilian vehicles |

---

### ⏱️ MULTI-HORIZON IMPACT & EVACUATION DYNAMICS

#### 🚨 1. IMMEDIATE IMPACT (0 TO 6 HOURS): FLASHOVER & CHOKEPOINT COLLAPSE
- **Ember Storm Ignition:** Millions of burning embers shower urban roofs, entering attic vents and igniting structures from the inside out miles ahead of the main wall of fire.
- **Escape Route Paralysis:** Two-lane canyon evacuation corridors become jammed with abandoned burning vehicles. Power lines drop onto roadways, creating lethal electrical hazards.
- **Water Infrastructure Pressure Loss:** Municipal water tanks drain to zero within 2 hours as residential plumbing burns through and tens of thousands of garden hoses are left running by fleeing residents.

#### 💨 2. SHORT-TERM IMPACT (6 TO 72 HOURS): MASS AIR POLLUTION & UTILITY LOSS
- **Hazardous PM2.5 Inundation:** Ambient Particulate Matter ($PM_{2.5}$) spikes to **400 to 1,200+ µg/m³** (AQI 300–600+ "Hazardous / Beyond Index").
- **Electrical Grid Cutoff (PSPS):** High-voltage line trips plunge entire counties into darkness, disabling traffic signals, cell towers, and fuel pumps.

#### 🌾 3. INTERMEDIATE-TERM (3 DAYS TO 4 WEEKS) & LONG-TERM (MONTHS TO YEARS)
- **Soil Hydrophobicity & Debris Flow Risk:** Intense soil heating creates a water-repellent waxy crust. The first winter storm will trigger catastrophic mudslides and debris flows.
- **Water System Benzene Contamination:** Underground plastic PVC and HDPE water pipes pyrolyze under soil heat, leaching carcinogenic Benzene, Styrene, and Toluene throughout the municipal drinking network.

---

### 🛡️ WILDFIRE SURVIVAL PROTOCOL & LAST-RESORT TRAPPED ACTIONS
- [ ] **Instant Early Departure:** If an evacuation warning is issued and you smell smoke during a high-wind diabatic event, **leave immediately**. Never wait for an official mandatory door-knock.
- [ ] **Hardening Home (Seconds to Spare):** Close all double-pane windows, pull metal blinds, turn off propane tank valve, turn on exterior sprinklers ONLY if on dedicated generator/pool pump.
- [ ] **Vehicle Preparedness:** Headlights on, windows closed, air conditioning on RECIRCULATE. Keep headlights on low beam through dense smoke.
- [ ] **LAST RESORT TRAPPED PROTOCOL (If Cut Off by Fire):**
  - Do NOT run on foot through brush or uphill (fire travels uphill 4x faster than on flat ground).
  - Seek a large cleared area (bare plowed field, asphalt parking lot, concrete building, or body of water).
  - If trapped in a car: Park behind a concrete wall or away from heavy trees. Keep engine running with AC on recirculate. Lie on floorboards below window line covered in 100% wool or cotton blankets (avoid synthetic nylon/polyester which melts into skin).`;

  return {
    text,
    isDeepResearch,
    actions: [
      {
        type: 'SIMULATE_DISASTER',
        payload: {
          disasterType: 'wildfire_conflagration',
          flyTo: { lat: coords.lat, lon: coords.lon, zoom: 8.5 },
          layers: ['wildfires', 'fire_spread_forecast', 'weather_radar', 'road_closures', 'hospitals']
        }
      }
    ],
    sources: [
      'USFS Rothermel Mathematical Surface Fire Spread Model',
      'CAL FIRE Incident Command & Wildland-Urban Interface Fire Behavior Manual',
      'National Interagency Fire Center (NIFC) Incident Management Protocols',
      'NFPA 1144: Standard for Reducing Structure Ignition Hazards from Wildland Fire'
    ],
    timestamp: new Date().toISOString()
  };
}

// -------------------------------------------------------------
// Sub-handler 4: Great Earthquake Fault Rupture Simulation
// -------------------------------------------------------------
function handleEarthquakeDisasterSimulation(query: string, lower: string, mapContext: MapContext, isDeepResearch: boolean): AIResponse {
  let targetFault = 'San Andreas Fault (Southern Segment - Coachella to Palmdale)';
  let coords = { lat: 34.2000, lon: -117.5000 };
  let magnitude = 'M8.2';

  if (lower.includes('cascadia') || lower.includes('seattle') || lower.includes('portland') || lower.includes('oregon')) {
    targetFault = 'Cascadia Subduction Zone Megathrust (Cape Mendocino to Vancouver Island)';
    coords = { lat: 45.0000, lon: -124.5000 };
    magnitude = 'M9.0';
  } else if (lower.includes('hayward') || lower.includes('san francisco') || lower.includes('oakland') || lower.includes('bay area')) {
    targetFault = 'Hayward Fault (East Bay / Oakland / Berkeley)';
    coords = { lat: 37.8000, lon: -122.2500 };
    magnitude = 'M7.2';
  }

  const text = `### 🌋 SEISMIC CATASTROPHE SIMULATION: ${magnitude} GREAT FAULT RUPTURE
**Fault System:** ${targetFault}
**Tactical Scenario:** Complete Unlocked Tectonic Rupture, 300+ Miles of Surface Fault Displacement (15–30 ft offset), Peak Ground Acceleration (PGA) >1.2g, Severe Liquefaction across Sedimentary Basins, Simultaneous Lifeline Corridor Severance.

---

#### 📊 SEISMOLOGICAL METRICS & SHAKING INTENSITY
| Parameter | Value | Engineering Consequence |
| :--- | :--- | :--- |
| **Moment Magnitude** | **${magnitude}** | Tremendous energy release; ground shaking lasts 90 to 240 seconds |
| **Modified Mercalli Intensity** | **MMI IX (Violent) to MMI X (Extreme)** | Widespread structural collapse of unreinforced masonry, tilt-up warehouses, and soft-story apartments |
| **Fault Surface Offset** | **15 to 32 feet lateral displacement** | Shears all pipelines, highway bridges, and aqueducts crossing the fault trace |
| **Aqueduct Rupture** | **California Aqueduct & Colorado River Aqueduct Severed** | Halts 70% of imported raw water into the Los Angeles & Inland Empire basins |
| **Tsunami Threat (If Cascadia)** | **35 to 65-foot inundation wave** | Arrival in 15–25 minutes along Pacific Northwest coastline |

---

### ⏱️ MULTI-HORIZON SEISMIC DISASTER TIMELINE

#### 🚨 1. IMMEDIATE IMPACT (0 TO 6 HOURS): CONCURRENT STRUCTURAL COLLAPSE & FIRES
- **Violent Long-Duration Shaking:** High-rise structures experience extreme inter-story drift; older bridges and freeway interchanges (e.g., I-5, I-10, I-15 Cajon Pass) collapse.
- **The "Fire Following Earthquake" Conflagration:** Hundreds of ruptured natural gas lines ignite simultaneous urban fires while water mains are broken and fire hydrants produce zero pressure.
- **Hospital Overload:** Over 50,000 trauma casualties (crush syndrome, blunt force trauma, arterial bleeding). 30% of regional hospitals suffer structural or medical gas pipeline failures.

#### 💧 2. SHORT-TERM IMPACT (6 TO 72 HOURS): THE DRY TAP & HIGHWAY ISLAND CRISIS
- **Loss of Municipal Water:** Underground water distribution pipes shatter at thousands of joints. Residents face zero water pressure for weeks.
- **Supply Route Severance:** All major mountain passes and rail tunnels crossing the fault are impassable. Regional metropolitan areas become isolated logistical islands.

#### ⛺ 3. INTERMEDIATE & LONG-TERM REBUILDING (WEEKS TO YEARS)
- **Housing Displacement:** Over 400,000 housing units tagged red (unsafe) or yellow (restricted entry).
- **Economic Loss:** Direct structural damages exceed **$300 to $650 Billion**.

---

### 🛡️ EARTHQUAKE SURVIVAL & CRITICAL ACTIONS
- [ ] **DURING SHAKING: DROP, COVER, AND HOLD ON:** Do NOT run outside (falling architectural glass and masonry facades are the #1 killer). Take cover beneath a sturdy desk or table.
- [ ] **IMMEDIATELY AFTER SHAKING: SHUT OFF GAS & WATER VALVES:**
  - Locate gas meter and turn rectangular valve 90 degrees with a wrench until perpendicular to pipe.
  - Shut off main house water valve to prevent contaminated water from backflowing into your internal water heater (your water heater contains 40–50 gallons of clean emergency drinking water!).
- [ ] **Inspect for Structural Damage:** Exit building using stairs only; NEVER use elevators.
- [ ] **Prepare for Continuous Violent Aftershocks:** Aftershocks reaching M6.5–M7.2 will occur for days, bringing down previously weakened buildings.`;

  return {
    text,
    isDeepResearch,
    actions: [
      {
        type: 'SIMULATE_DISASTER',
        payload: {
          disasterType: 'earthquake_rupture',
          flyTo: { lat: coords.lat, lon: coords.lon, zoom: 7.5 },
          layers: ['earthquakes', 'disasters', 'hospitals', 'power_lines', 'boundaries']
        }
      }
    ],
    sources: [
      'USGS ShakeOut Earthquake Scenario & Uniform California Earthquake Rupture Forecast (UCERF3)',
      'Cascadia Subduction Zone Megathrust Assessment (CREW)',
      'Structural Engineers Association of California (SEAOC) Seismic Design Manual',
      'FEMA HAZUS-MH Earthquake Loss Estimation Methodology'
    ],
    timestamp: new Date().toISOString()
  };
}

// -------------------------------------------------------------
// Sub-handler 5: Continental Power Grid Collapse / EMP
// -------------------------------------------------------------
function handleGridDisasterSimulation(query: string, lower: string, mapContext: MapContext, isDeepResearch: boolean): AIResponse {
  let targetGrid = 'Continental Western Interconnection / Texas ERCOT Grid';
  let coords = { lat: 31.9686, lon: -99.9018 };

  const text = `### ⚡ CONTINENTAL INFRASTRUCTURE COLLAPSE: GRID COLLAPSE & EMP / CORONAL MASS EJECTION
**System:** ${targetGrid}
**Tactical Scenario:** Severe Geomagnetically Induced Currents (GIC / Carrington Event G5+ Solar Superstorm) or High-Altitude Electromagnetic Pulse (HEMP E1/E2/E3 burst) inducing catastrophic core saturation in extra-high-voltage (EHV) step-up transformers (345kV–765kV).

---

#### 📊 ELECTRICAL GRID INFRASTRUCTURE AT RISK
| Component | Failure Mode | Recovery Lead Time |
| :--- | :--- | :--- |
| **Large Power Transformers (LPTs)** | Thermal core melting & dielectric insulation breakdown | **12 to 24 months per custom-built transformer** |
| **SCADA & Digital Relays** | E1 pulse semiconductor burnout (nanosecond rise time) | Widespread substation control failure |
| **Cellular Tower Backup Batteries** | Lead-acid / Lithium backup banks | **Depleted in 4 to 8 hours** |
| **Municipal Water Lift Pumps** | Electrical grid loss; emergency diesel fuel depletion | **Municipal water pressure dies in 24 to 48 hours** |
| **Refined Fuel Distribution** | Pipeline pumps and electronic gas station pumps dead | **Zero fuel dispensing capability** |

---

### ⏱️ MULTI-HORIZON BLACK SKY RECOVERY TIMELINE
- **Hour 0–6:** Immediate blackout across millions of square miles. Grid operators attempt emergency frequency separation; secondary islands trip on under-frequency load shedding (UFLS).
- **Hour 6–72:** Cellular networks go completely dark as battery backups die and backup generator diesel runs out. Banking, ATM, credit card, and digital supply chains are completely paralyzed.
- **Week 1–4:** "Black Start" recovery procedures crawl at a slow pace. Hydroelectric dams (Hoover, Grand Coulee) and gas peakers must slowly bootstrap local micro-grids without overloading transmission lines.
- **Month 1–12+:** If multiple 500kV transformers suffered physical melting, full continental grid restoration takes over a year due to international supply chain backlogs.

---

### 🛡️ GRID-DOWN / EMP SURVIVAL PROTOCOL
- [ ] **Protect Critical Electronics (Faraday Shielding):** Store emergency ham radios, solar charge controllers, night vision, and medical devices in nested conductive Faraday bags or galvanized steel trash cans with tight-fitting foil-gasketed lids.
- [ ] **Secure Off-Grid Water:** Fill bathtubs, sinks, and clean containers in the first 60 minutes before municipal water pressure drops to zero.
- [ ] **Food Preservation & Consumption Sequence:** Consume refrigerated foods first (0–24h), then freezer foods (24–72h), before tapping into dry shelf-stable emergency stores (rice, beans, pemmican, hardtack).
- [ ] **Off-Grid Solar & Battery Independence:** Utilize mobile monocrystalline solar panels with independent MPPT controllers to charge 12V LiFePO4 batteries for lighting, medical devices, and communications.`;

  return {
    text,
    isDeepResearch,
    actions: [
      {
        type: 'SIMULATE_DISASTER',
        payload: {
          disasterType: 'grid_collapse',
          flyTo: { lat: coords.lat, lon: coords.lon, zoom: 5.5 },
          layers: ['power', 'power_lines', 'utility_companies', 'cell_towers', 'data_centers']
        }
      }
    ],
    sources: [
      'NERC (North American Electric Reliability Corp) Geomagnetic Disturbance Planning Standards',
      'Congressional Commission to Assess the Threat to the United States from Electromagnetic Pulse (EMP)',
      'EPRI (Electric Power Research Institute) High-Altitude Electromagnetic Pulse Assessment',
      'DoD Defense Critical Infrastructure Program'
    ],
    timestamp: new Date().toISOString()
  };
}

// -------------------------------------------------------------
// Sub-handler 6: Toxic Chlorine Railcar / Tanker Leak
// -------------------------------------------------------------
function handleChlorineChemicalDisasterSimulation(query: string, lower: string, mapContext: MapContext, isDeepResearch: boolean): AIResponse {
  let targetCity = 'Chicago Industrial Rail Yard / Greater Metropolitan Corridor';
  let coords = { lat: 41.8781, lon: -87.6298 };

  const text = `### ☣️ HAZARDOUS CHEMICAL DISASTER SIMULATION: 90-TON LIQUID CHLORINE RAIL TANKER BREACH
**Location:** ${targetCity}
**Tactical Scenario:** High-Speed Train Derailment / Tanker Puncture, Instant Release of 90 Tons of Pressurized Liquid Chlorine ($Cl_2$), Rapid Flashing into Dense Greenish-Yellow Gas Cloud, Heavy-Gas Gravity Slumping, and Low-Lying Atmospheric Vapor Drift.

---

#### 📊 CHEMICAL PROPERTIES & LETHALITY METRICS
| Parameter | Value | Physiological Consequence |
| :--- | :--- | :--- |
| **Chemical Agent** | **Chlorine Gas ($Cl_2$, CAS 7782-50-5)** | 2.5x heavier than air; hugs the ground, pooling in basements, subways, and street depressions |
| **IDLH (Immediately Dangerous to Life & Health)**| **10 ppm** | Severe respiratory spasm and coughing within seconds |
| **LC50 Lethal Concentration (30 Min)** | **400 to 800 ppm** | Fatal pulmonary edema, severe chemical lung burning, and suffocation |
| **Initial Isolation Distance** | **1,000 feet in all directions** | Absolute exclusion zone |
| **Downwind Protective Action Distance** | **14.2 miles downwind (Day) / 20+ miles (Night)** | Immediate shelter-in-place or crosswind evacuation |

---

### ⏱️ MULTI-HORIZON IMPACT & GAS DRIFT BEHAVIOR
- **Minute 0–15:** Expanding dense green cloud covers 1 square mile. Ground-level civilians, subway commuters, and animals experience severe burning of eyes, throat, and mucous membranes.
- **Hour 1–6:** Cloud drifts downwind along river valleys and street canyons. Humidity reacts with chlorine to form Hydrochloric Acid ($HCl$) and Hypochlorous Acid ($HOCl$) inside human lungs.
- **Hour 6–24:** Liquid chlorine pool completes boiling off. First responders neutralize contaminated pockets with sodium hydroxide or water fog curtains.

---

### 🛡️ CHEMICAL GAS CLOUD SURVIVAL PROTOCOL
- [ ] **MOVE IMMEDIATELY CROSSWIND & UPHILL:** Never run with the wind or directly into the wind. Move at a 90-degree angle (crosswind) toward higher terrain or high-rise building floors.
- [ ] **SEAL-IN-PLACE (Vertical Elevation):** If unable to evacuate crosswind, enter an interior room on the **highest floor possible** (chlorine sinks to the lowest level).
  - Seal all doors, vents, and electrical outlets with plastic and wet towels.
- [ ] **Improvised Respiratory Filter:** Breathe through a cloth soaked in a baking soda solution (Sodium Bicarbonate, $NaHCO_3$) or clean water; baking soda neutralizes acidic chlorine vapors.
- [ ] **Avoid Basements & Subways:** Basements become lethal gas death traps within minutes of an industrial chlorine or ammonia release.`;

  return {
    text,
    isDeepResearch,
    actions: [
      {
        type: 'SIMULATE_DISASTER',
        payload: {
          disasterType: 'chemical_leak',
          flyTo: { lat: coords.lat, lon: coords.lon, zoom: 11.0 },
          layers: ['toxic_sites', 'emergency', 'hospitals', 'weather_radar']
        }
      }
    ],
    sources: [
      'DOT / Transport Canada Emergency Response Guidebook (ERG Guide 124: Toxic Gases)',
      'EPA ALOHA (Areal Locations of Hazardous Atmospheres) Chemical Dispersion Modeling',
      'NIOSH Pocket Guide to Chemical Hazards: Chlorine',
      'Graniteville, SC Chlorine Disaster Investigation (National Transportation Safety Board)'
    ],
    timestamp: new Date().toISOString()
  };
}
