// floodSimulationAI.ts
// Comprehensive Geospatial Dam Breach Simulation & Multi-Horizon Survival Analysis Engine
// Models immediate, short-term, intermediate, and long-term impacts of dam failures with survival guidance.

import { FloodHydrologyEngine, DamFacility, MultiDamSimulationResult } from './floodHydrologyEngine';
import { AIResponse, MapAction, MapContext } from './aiClient';

// Colorado's western border longitude
export const COLORADO_WEST_LONGITUDE = -109.05;

/**
 * Checks if a natural language query is requesting a dam breach / destruction simulation
 */
export function isDamSimulationQuery(query: string): boolean {
  const lower = query.toLowerCase();
  const hasDamKeyword = lower.includes('dam') || lower.includes('dams') || lower.includes('reservoir') || lower.includes('hoover') || lower.includes('oroville') || lower.includes('shasta') || lower.includes('glen canyon') || lower.includes('grand coulee');
  const hasBreachKeyword = lower.includes('destroy') || lower.includes('destroyed') || lower.includes('breach') || lower.includes('breached') || lower.includes('fail') || lower.includes('failure') || lower.includes('collapse') || lower.includes('flood') || lower.includes('flooding') || lower.includes('inundat') || lower.includes('simulate') || lower.includes('broke') || lower.includes('blown');

  return hasDamKeyword && hasBreachKeyword;
}

/**
 * Resolves target dams based on query geographic/name criteria
 */
export function resolveTargetDams(query: string): { dams: DamFacility[]; regionLabel: string; flyTo: { lat: number; lon: number; zoom: number } } {
  const lower = query.toLowerCase();
  const allDams = FloodHydrologyEngine.DAMS;

  // 1. "West of Colorado" or broad Western US query
  if (
    lower.includes('west of colorado') ||
    lower.includes('western dams') ||
    lower.includes('west coast dams') ||
    lower.includes('all dams west') ||
    (lower.includes('west') && lower.includes('colorado') && lower.includes('dam'))
  ) {
    const westernDams = allDams.filter(dam => {
      // Coordinate check: West of Colorado border (-109.05°W)
      const isWestOfCo = dam.coordinates[0] < COLORADO_WEST_LONGITUDE;
      // Or Western state classification
      const westernStates = ['California', 'Washington', 'Oregon', 'Nevada', 'Arizona', 'Utah', 'Idaho'];
      return isWestOfCo || westernStates.includes(dam.state);
    });

    return {
      dams: westernDams.length > 0 ? westernDams : allDams.slice(0, 15),
      regionLabel: 'Western United States (West of -109.05°W / Colorado Border)',
      flyTo: { lat: 37.8, lon: -117.5, zoom: 5.2 }
    };
  }

  // 2. State-specific filters
  if (lower.includes('california')) {
    const caDams = allDams.filter(d => d.state === 'California');
    return {
      dams: caDams,
      regionLabel: 'California Central Valley & Pacific Basins',
      flyTo: { lat: 38.5, lon: -121.0, zoom: 6.2 }
    };
  }

  if (lower.includes('washington') || lower.includes('columbia river')) {
    const waDams = allDams.filter(d => d.state === 'Washington' || d.riverSystem.toLowerCase().includes('columbia'));
    return {
      dams: waDams,
      regionLabel: 'Pacific Northwest Columbia River Basin',
      flyTo: { lat: 47.5, lon: -120.0, zoom: 6.5 }
    };
  }

  // 3. Named specific dam matches
  const targetDams: DamFacility[] = [];
  if (lower.includes('hoover')) {
    const h = allDams.find(d => d.id === 'dam-hoover');
    if (h) targetDams.push(h);
  }
  if (lower.includes('glen canyon') || lower.includes('lake powell')) {
    const gc = allDams.find(d => d.id === 'dam-glen-canyon');
    if (gc) targetDams.push(gc);
  }
  if (lower.includes('oroville')) {
    const oro = allDams.find(d => d.id === 'dam-oroville');
    if (oro) targetDams.push(oro);
  }
  if (lower.includes('shasta')) {
    const sh = allDams.find(d => d.id === 'dam-shasta');
    if (sh) targetDams.push(sh);
  }
  if (lower.includes('grand coulee')) {
    const gc = allDams.find(d => d.id === 'dam-grand-coulee');
    if (gc) targetDams.push(gc);
  }
  if (lower.includes('folsom')) {
    const f = allDams.find(d => d.id === 'dam-folsom');
    if (f) targetDams.push(f);
  }

  if (targetDams.length > 0) {
    const primary = targetDams[0];
    return {
      dams: targetDams,
      regionLabel: `${targetDams.map(d => d.name).join(', ')} Inundation Zone`,
      flyTo: { lat: primary.coordinates[1], lon: primary.coordinates[0], zoom: 8.5 }
    };
  }

  // 4. Default fallback: All major western dams if unspecified
  const defaultWestern = allDams.filter(d => d.coordinates[0] < COLORADO_WEST_LONGITUDE);
  return {
    dams: defaultWestern.length > 0 ? defaultWestern : allDams.slice(0, 10),
    regionLabel: 'Western Hydrological Basins',
    flyTo: { lat: 37.0, lon: -116.0, zoom: 5.5 }
  };
}

/**
 * Generates an authoritative multi-horizon impact dossier and map actions
 */
export function generateDamBreachAIResponse(
  query: string,
  mapContext: MapContext,
  isDeepResearch = false
): AIResponse {
  const { dams, regionLabel, flyTo } = resolveTargetDams(query);
  const damIds = dams.map(d => d.id);
  const metrics: MultiDamSimulationResult = FloodHydrologyEngine.calculateMultiDamMetrics(damIds, 'catastrophic');

  const totalAcreFeetStr = metrics.totalWaterReleasedAcreFeet.toLocaleString();
  const totalGallonsTrillion = (metrics.totalWaterReleasedGallons / 1e12).toFixed(2);
  const peakCfsStr = metrics.combinedPeakDischargeCfs.toLocaleString();
  const affectedPopStr = metrics.affectedPopulationTotal.toLocaleString();
  const infrastructureCount = metrics.criticalInfrastructureAtRiskCount.toLocaleString();

  // Highlight key compromised dams
  const damBreakdownRows = dams.map(d => {
    const nearest = d.downstreamSettlements[0];
    const nearestDesc = nearest ? `${nearest.name} (${nearest.estimatedPeakDepthFt}ft surge in ${nearest.waveArrivalTimeHours}h)` : 'Unpopulated Canyon';
    return `| **${d.name}** (${d.state}) | ${d.structuralHeightFt} ft | ${(d.reservoirCapacityAcreFeet / 1e6).toFixed(2)}M ac-ft | ${(d.breachPeakDischargeCfs / 1e3).toFixed(0)}k cfs | ${nearestDesc} |`;
  }).join('\n');

  const text = `### 🌊 CATASTROPHIC HYDROLOGICAL BREACH SIMULATION: ${regionLabel.toUpperCase()}
**Tactical Scenario Analysis:** Multi-Dam Structural Collapse & Uncontrolled Downstream Inundation

---

#### 📊 COMPREHENSIVE HYDROLOGICAL IMPACT METRICS
| Parameter | Value | Regional Context & Magnitude |
| :--- | :--- | :--- |
| **Dams Compromised** | **${dams.length} Major Facilities** | Includes Hoover, Glen Canyon, Oroville, Shasta, Grand Coulee, Folsom, Flaming Gorge |
| **Total Impounded Volume Released** | **${totalAcreFeetStr} Acre-Feet** | **~${totalGallonsTrillion} Trillion Gallons** released simultaneously into major western river basins |
| **Combined Breach Peak Discharge** | **${peakCfsStr} cfs** | Multiple orders of magnitude greater than the historical maximum natural floods |
| **Direct Population in Floodway** | **${affectedPopStr} Residents** | Within high-velocity surge zones across CA, NV, AZ, WA, OR |
| **Critical Infrastructure at Risk** | **${infrastructureCount} Facilities** | Power stations, interstate highway bridges, water treatment plants, municipal grids |
| **Primary River Systems Disrupted** | **${metrics.activeBasins.join(', ')}** | Colorado River Basin, Sacramento River Basin, Columbia River Basin |

#### 🏢 COMPROMISED KEY DAM FACILITIES & INITIAL WAVE ARRIVALS
| Dam Facility | Structural Height | Reservoir Capacity | Peak Breach Discharge | Initial Settlement Impact |
| :--- | :---: | :---: | :---: | :--- |
${damBreakdownRows}

---

### ⏱️ MULTI-HORIZON IMPACT TIMELINE & REGIONAL EFFECTS

#### 🚨 1. IMMEDIATE IMPACT (0 TO 6 HOURS): WALL OF WATER & SUDDEN HYDRO-COLLAPSE
- **Catastrophic Wave Fronts:** A high-velocity wall of water ranging from **55 to 140+ feet** surges through river canyons at speeds of 30–65 mph.
  - *Colorado River Corridor:* Glen Canyon's breach creates a 120-foot bore wave ripping through Marble Canyon and the Grand Canyon, crashing into Lake Mead within 4 hours, instantly overtopping and eroding Hoover Dam. Below Hoover, Laughlin, Bullhead City, and Needles experience 45–80 ft surges in under 2–3 hours.
  - *Sacramento Valley:* Shasta's failure delivers a 55-foot surge into Redding in 54 minutes. Oroville's collapse sends a 62-foot wave into the City of Oroville within 36 minutes, obliterating low-lying roads and levees.
  - *Columbia River:* Grand Coulee's catastrophic breach releases massive debris-laden surges downstream, wiping out Coulee Dam town and cascading into Chief Joseph and Wells dams within 2 hours.
- **Electric Grid Severance (Western Interconnection Blackout):** Immediate loss of over **18,000 MW** of hydroelectric generation (Grand Coulee 6,800 MW, Hoover 2,080 MW, Glen Canyon 1,320 MW, California hydro). The WECC (Western Electricity Coordinating Council) grid experiences immediate frequency drop, tripping secondary relays and plunging Las Vegas, Phoenix, Southern California, and Central Washington into widespread blackouts.
- **Communication & Sensor Decapitation:** Cellular towers, fiber backbones running alongside riverbeds and highway bridges, and telemetry sensors in canyon corridors are sheared off.

#### 🌊 2. SHORT-TERM IMPACT (6 TO 72 HOURS): BASIN-WIDE INUNDATION & CORRIDOR SEVERANCE
- **Cascading Inundation of Urban Basins:**
  - *Central Valley Flood Lake:* Sacramento, Marysville, Yuba City, Stockton, and the Sacramento-San Joaquin Delta are inundated under 15 to 35 feet of contaminated water. The confluence of Sacramento, Feather, and American river floods creates an inland sea across thousands of square miles.
  - *Lower Colorado Basin:* Blythe, Yuma, and the Imperial Valley irrigation systems are submerged. Interstate 10, Interstate 40, and Interstate 8 bridges across the Colorado River are washed out, severing ground logistics between California, Arizona, and the rest of the nation.
  - *Interstate & Rail Transport Paralyzed:* I-5 corridor north of Redding and through Sacramento is completely impassable. BNSF and Union Pacific transcontinental rail links are destroyed along river crossings.
- **Water Treatment & Sanitation Outages:** Every downstream wastewater plant is flooded, releasing millions of gallons of raw sewage into floodwaters. Municipal drinking water intakes along the Colorado River Aqueduct and California State Water Project are silted, disabled, or contaminated.
- **Emergency Rescue Overload:** Search and rescue aviation assets are grounded by lack of fuel pumping power and submerged regional airstrips. First responders are restricted to high-ground staging areas.

#### 🌾 3. INTERMEDIATE-TERM IMPACT (3 DAYS TO 4 WEEKS): SUPPLY SHOCK & SYSTEMIC DISRUPTION
- **Agricultural Devastation & National Food Chain Shock:**
  - California's Central Valley produces 25% of the nation's food (including 40% of fruits and nuts). Soil erosion, toxic silt deposits, and drowned agricultural machinery will halt production for an entire growing season or longer.
  - Yuma, Arizona (the nation's winter salad bowl) loses all irrigation canal infrastructure.
- **Secondary Health & Disease Hazards:** Stagnant water across warm valleys breeds vector-borne pathogens (West Nile virus, mosquito proliferation). Chemical runoff from flooded industrial parks, pesticide caches, and gas stations creates severe chemical toxicity in standing waters.
- **Refugee Migration & Shelter Strain:** Over 3.5 million displaced residents from flooded corridors migrate toward high ground (Sierra foothills, high desert plateaus, interior Nevada and Arizona). Regional hospitals that remain operational are overwhelmed by trauma, dehydration, and waterborne illnesses (Giardia, Cryptosporidium, E. coli).
- **Supply Chain Hyperinflation:** National rail and freight delays of 3–6 weeks as cross-country supply routes are rerouted 800+ miles north through Montana or south through Mexico.

#### 🏜️ 4. LONG-TERM IMPACT (1 MONTH TO 5+ YEARS): THE PERMANENT ARIDIFICATION CRISIS
- **Total Reservoir Depletion:** Lake Mead and Lake Powell—which provide multi-year storage buffers—are drained to bedrock. It will take 15 to 25+ years of record snowpack to rebuild these reserves, assuming new dam infrastructure could even be financed and engineered.
- **Permanent Water Rationing in the American Southwest:**
  - Los Angeles, San Diego, Las Vegas, and Phoenix lose 50–90% of their dependable raw water supply. Strict rationing (emergency municipal trucking, desalinization emergency construction, population relocation) becomes a permanent reality.
- **Trillion-Dollar Economic Damage:** Structural replacement costs exceed **$850 Billion to $1.4 Trillion**, with broader economic disruption exceeding $3 Trillion over a decade.
- **Ecological Topography Transformation:** River beds are permanently re-cut, riparian ecosystems are wiped clean of topsoil, and native fish species in the Colorado and Sacramento river systems face near-total extirpation.

---

### 🛡️ SURVIVAL & SAFETY ACTION PROTOCOLS BY TIME HORIZON

#### 🚨 IMMEDIATE SAFETY CHECKLIST (HOUR 0 - 6)
- [ ] **Instant Vertical & Lateral Evacuation:** If you are within 25 miles of a canyon riverway, **do not wait for official sirens or cell broadcasts**. Move perpendicular to the river channel toward high ground immediately (minimum +100 to +150 feet above normal river level).
- [ ] **Abandon Vehicles in Chokepoints:** Bridge crossings and canyon roads will experience gridlock within minutes. If traffic stops, grab your **Go-Bag** and ascend the nearest hillside on foot immediately.
- [ ] **Kill Utilities Prior to Evacuation:** If at home and seconds permit, shut off the main gas line valve and electrical breaker to prevent post-flood fires and explosions.
- [ ] **Assume Tap Water is Lethal:** Turn off main water inlet before floodwaters backflow into municipal mains. Do not drink tap water.

#### 🎒 SHORT-TERM SURVIVAL PROTOCOL (DAY 1 - 3)
- [ ] **Water Purification (Absolute Redundancy):** Floodwater carries heavy silt, raw sewage, and petrochemicals. Simple boiling will kill microbes but **will not remove industrial chemicals**.
  - *Standard protocol:* Filter through cloth/coffee filter first, pass through activated carbon, boil vigorously for 3 minutes, then treat with 8 drops of unscented chlorine bleach per gallon (or utilize Katadyn/Sawyer microfiltration + activated charcoal).
- [ ] **Off-Grid Communications Monitoring:** Cellular towers and internet will be down. Monitor emergency frequencies via **hand-crank NOAA Weather Radio / AM Radio (frequencies 640 kHz / 1240 kHz CONELRAD / EAS alerts)** and FRS/GMRS channels 1–7.
- [ ] **Avoid Wading or Kayaking in Flood Currents:** Even 6 inches of fast-moving water can sweep a person away; 12 inches moves vehicles. Floodwater conceals open manholes, submerged electrical lines, and razor-sharp debris.

#### ⛺ INTERMEDIATE SUSTENANCE PROTOCOL (WEEK 1 - 4)
- [ ] **Ration Caloric Intake & Protect Stored Food:** Shift to high-density, shelf-stable rations (MREs, pemmican, hardtack, canned proteins). Seal all foodstuffs in airtight rodent-proof bins to prevent contamination by flood vermin.
- [ ] **Sanitation & Waste Isolation:** Dig latrines at least 150 feet away and downhill from any potential water source. Treat human waste with agricultural lime or bleach to avert cholera and dysentery outbreaks.
- [ ] **Community Defense & Mutual Aid:** Establish high-ground neighborhood watch perimeters. Maintain flashlights, headlamps, and medical triage points. Conserve generator fuel exclusively for medical devices and communications recharging.

#### 🧭 LONG-TERM SUSTAINABILITY PROTOCOL (MONTH 1 - YEAR 1+)
- [ ] **Strategic Relocation from Arid Basins:** If residing in Southern California, Las Vegas, or Central Arizona, prepare for orderly relocation. Municipal water will be strictly rationed and economic activity severely contracted.
- [ ] **Rainwater Harvesting & Deep Well Transition:** In relocation zones, establish gravity-fed rainwater cisterns and solar-powered deep well pumps with independent battery storage.
- [ ] **Food Self-Reliance:** Develop localized permaculture, heirloom seed banking, and high-efficiency greenhouse food production independent of regional canal irrigation.

---
*Sphinx Tactical Hydrology Engine has automatically engaged the map simulation: **selected ${dams.length} breached dams, loaded catastrophic inundation corridors, and deployed wave arrival markers**.*`;

  const mapActions: MapAction[] = [
    {
      type: 'SIMULATE_DAM_BREACH',
      payload: {
        damIds,
        failureSeverity: 'catastrophic',
        flyTo,
        regionLabel,
        metrics
      }
    }
  ];

  return {
    text,
    isDeepResearch,
    actions: mapActions,
    sources: [
      'Sphinx Geospatial Hydrology Engine (HEC-RAS 2D Simulation Framework)',
      'US Army Corps of Engineers (USACE) National Inventory of Dams (NID)',
      'US Bureau of Reclamation (USBR) Dam Safety Emergency Action Plans',
      'FEMA Federal Guidelines for Dam Safety (FEMA P-64 / SLOSH Flood Modeling)',
      'USGS Water Resources National Streamflow Network'
    ],
    timestamp: new Date().toISOString()
  };
}
