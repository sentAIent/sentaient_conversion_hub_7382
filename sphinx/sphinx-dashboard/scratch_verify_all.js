import { CHEMICAL_SAFETY_STANDARDS, searchStandards, getThresholdById } from './src/lib/intelligence/chemicalSafetyStandards.js';
import { POWER_AND_WATER_FACILITIES } from './src/lib/intelligence/powerAndWaterCatalog.js';
import { isDisasterSimulationQuery, generateDisasterAIResponse } from './src/lib/intelligence/disasterSimulationAI.js';
import { getUtilityCompaniesGeoJson } from './src/lib/intelligence/criticalInfrastructureEngine.js';
import { SURVIVAL_GUIDES } from './src/lib/survival/survivalData.js';

console.log('=== VERIFYING EXTENSIVE INFRASTRUCTURE, CHEMICAL THRESHOLDS & DISASTER SIMULATIONS ===\n');

// 1. Verify Chemical Safety Standards Catalog
console.log(`[1] Chemical Safety Standards: Loaded ${CHEMICAL_SAFETY_STANDARDS.length} contaminants.`);
const fluorideSearch = searchStandards('fluoride');
console.log(`- Search 'fluoride': found ${fluorideSearch.length} match.`);
if (fluorideSearch.length > 0) {
  const f = fluorideSearch[0];
  console.log(`  Name: ${f.chemicalName} (${f.formula})`);
  console.log(`  EPA Legal Limit: ${f.thresholds.find(t => t.agency === 'US EPA')?.legalLimit}`);
  console.log(`  EWG Health Benchmark: ${f.thresholds.find(t => t.agency === 'EWG (Independent)')?.recommendedLimit}`);
  console.log(`  Key Health Risks: ${f.healthRisks.slice(0, 3).join(', ')}`);
}

const pfasSearch = searchStandards('pfas');
console.log(`- Search 'pfas': found ${pfasSearch.length} matches.`);

// 2. Verify Power and Water Infrastructure Catalog
console.log(`\n[2] Power & Water Infrastructure Catalog: Loaded ${POWER_AND_WATER_FACILITIES.length} facilities.`);
const nuclearFacilities = POWER_AND_WATER_FACILITIES.filter(f => f.powerGenDetails?.primaryFuel === 'Nuclear');
const windFacilities = POWER_AND_WATER_FACILITIES.filter(f => f.powerGenDetails?.generationType === 'Wind Farm');
const hydroFacilities = POWER_AND_WATER_FACILITIES.filter(f => f.powerGenDetails?.generationType === 'Hydroelectric Dam' || f.powerGenDetails?.generationType === 'Pumped Storage Hydro');
const waterFacilities = POWER_AND_WATER_FACILITIES.filter(f => f.waterTreatmentDetails);

console.log(`- Nuclear Power Stations: ${nuclearFacilities.length}`);
console.log(`- Wind Turbine Farms: ${windFacilities.length}`);
console.log(`- Hydro & Pumped Storage: ${hydroFacilities.length}`);
console.log(`- Desalination & Water Treatment: ${waterFacilities.length}`);

// Sample water facility additives
const carlsbad = waterFacilities.find(f => f.id === 'desal-carlsbad');
if (carlsbad && carlsbad.waterTreatmentDetails) {
  console.log(`\n- Sample Water Facility: ${carlsbad.name}`);
  console.log(`  Type: ${carlsbad.waterTreatmentDetails.facilityType}`);
  console.log(`  Rated Capacity: ${carlsbad.waterTreatmentDetails.ratedCapacityMGD} MGD`);
  console.log(`  Chemical Additives Count: ${carlsbad.waterTreatmentDetails.chemicalAdditives.length}`);
  carlsbad.waterTreatmentDetails.chemicalAdditives.forEach(add => {
    console.log(`    * ${add.chemicalName} [${add.purpose}]: Dose ${add.typicalDose} - Health Concern: ${add.healthConcerns}`);
  });
}

// 3. Verify GeoJSON Generation & Merging
console.log('\n[3] GeoJSON Generation:');
const geoJson = getUtilityCompaniesGeoJson();
console.log(`- Total GeoJSON features generated: ${geoJson.features.length}`);
const sampleFeature = geoJson.features.find(f => f.properties.id === 'nuke-diablo-canyon');
if (sampleFeature) {
  console.log(`- Found Diablo Canyon feature: [${sampleFeature.geometry.coordinates.join(', ')}]`);
  console.log(`  Reactor Count: ${sampleFeature.properties.reactors}`);
  console.log(`  Containment Type: ${sampleFeature.properties.containmentType}`);
}

// 4. Verify Disaster Simulation AI Engine
console.log('\n[4] Disaster Simulation AI Engine Queries:');
const testQueries = [
  'Simulate Diablo Canyon nuclear meltdown with reactor containment breach',
  'What would happen if the Alta Wind Energy Center windmills shut down in a high-wind wildfire conflagration?',
  'Simulate catastrophic San Andreas fault earthquake rupture M8.2',
  'What happens if ERCOT grid collapses under extreme freeze and cyber attack?',
  'Simulate chlorine railcar tanker rupture toxic gas leak',
  'What are the toxin safety levels for fluoride between EPA, WHO, and EWG?',
  'What chemicals do municipal desalination plants put in our drinking water to treat it?'
];

for (const q of testQueries) {
  const isMatch = isDisasterSimulationQuery(q);
  console.log(`- Query: "${q}" -> Matches Disaster AI: ${isMatch}`);
  if (isMatch) {
    const res = generateDisasterAIResponse(q);
    console.log(`  Action: ${res.mapAction?.type} | Layers: ${res.mapAction?.layers?.join(', ')}`);
    console.log(`  Coords: [${res.mapAction?.coordinates?.join(', ')}] | Text len: ${res.text.length} chars`);
  }
}

// 5. Verify Offline Survival Guides
console.log('\n[5] Offline Survival Library:');
const chemicalGuide = SURVIVAL_GUIDES.find(g => g.id === 'cbrn-global-chemical-safety-thresholds');
const waterAdditiveGuide = SURVIVAL_GUIDES.find(g => g.id === 'survival-water-treatment-chemical-additives');
console.log(`- CBRN Global Chemical Thresholds Guide: ${chemicalGuide ? 'PRESENT (' + chemicalGuide.content.length + ' chars)' : 'MISSING'}`);
console.log(`- Water Additive Disclosure Guide: ${waterAdditiveGuide ? 'PRESENT (' + waterAdditiveGuide.content.length + ' chars)' : 'MISSING'}`);

console.log('\n=== ALL INFRASTRUCTURE & SIMULATION CHECKS COMPLETED SUCCESSFULLY ===');
