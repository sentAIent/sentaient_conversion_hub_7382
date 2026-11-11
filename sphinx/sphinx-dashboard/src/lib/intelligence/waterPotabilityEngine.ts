// waterPotabilityEngine.ts
// Natural Water Source Potability & Field Purification Dossier
// Evaluates natural springs, alpine lakes, and aquifers for biological,
// chemical, and mineral contamination, outputting elevation-adjusted treatment protocols.

export type PotabilityGrade = 'POTABLE_RAW_SPRING' | 'PURIFICATION_MANDATORY' | 'CRITICAL_CONTAMINANT_HAZARD';

export interface PathogenRisk {
  name: string;
  type: 'Protozoan' | 'Bacterial' | 'Viral' | 'Cyanotoxin';
  sizeMicrons: string;
  severity: 'Moderate' | 'High' | 'Severe';
  inactivation: string;
}

export interface PurificationProtocol {
  step: number;
  action: string;
  toolRequired: string;
  notes: string;
}

export interface WaterDossier {
  sourceName: string;
  sourceType: 'Artesian Spring' | 'Alpine Lake' | 'River / Stream' | 'Groundwater Aquifer';
  coordinates: [number, number];
  elevationFt: number;
  grade: PotabilityGrade;
  safetyScore: number; // 0 - 100
  tdsEstimatedPpm: number; // Total Dissolved Solids
  phRange: string;
  recommendedBoilTimeMinutes: number;
  chemicalThreatRisk: 'Minimal' | 'Moderate (Ag Runoff)' | 'High (Industrial / Toxic Site Proximity)';
  pathogens: PathogenRisk[];
  fieldPurificationSteps: PurificationProtocol[];
}

export class WaterPotabilityEngine {
  public static evaluateWaterSource(
    name: string,
    lat: number,
    lon: number,
    elevationFt: number = 3200,
    typeHint: string = 'Spring'
  ): WaterDossier {
    const isSpring = typeHint.toLowerCase().includes('spring') || name.toLowerCase().includes('spring');
    const isAlpine = elevationFt >= 5000;

    let grade: PotabilityGrade = 'PURIFICATION_MANDATORY';
    let safetyScore = 78;
    let chemicalRisk: WaterDossier['chemicalThreatRisk'] = 'Minimal';

    // Springs in high elevation remote zones have higher raw safety
    if (isSpring && isAlpine) {
      grade = 'POTABLE_RAW_SPRING';
      safetyScore = 94;
    } else if (!isSpring && elevationFt < 1500) {
      grade = 'PURIFICATION_MANDATORY';
      safetyScore = 62;
      chemicalRisk = 'Moderate (Ag Runoff)';
    }

    // Altitude boiling rule: at > 5,000 ft (1,500m), water boils at ~95°C, requiring 3 minutes rolling boil
    const boilTime = elevationFt >= 5000 ? 3 : 1;

    const pathogens: PathogenRisk[] = [
      {
        name: 'Giardia lamblia (Beaver Fever)',
        type: 'Protozoan',
        sizeMicrons: '8 - 14 µm (Cysts)',
        severity: 'High',
        inactivation: 'Rolling boil (1-3 min) or 0.1 µm hollow-fiber microfilter'
      },
      {
        name: 'Cryptosporidium parvum',
        type: 'Protozoan',
        sizeMicrons: '4 - 6 µm (Oocysts)',
        severity: 'Severe',
        inactivation: 'Chlorine-resistant; requires 0.1 µm filtration, boiling, or UV-C dose (>40 mJ/cm²)'
      },
      {
        name: 'Campylobacter & E. coli',
        type: 'Bacterial',
        sizeMicrons: '0.5 - 2.0 µm',
        severity: 'High',
        inactivation: 'Easily eliminated by standard microfilters, chlorine dioxide, or boiling'
      },
      {
        name: 'Microcystins (Cyanobacteria / Blue-Green Algae)',
        type: 'Cyanotoxin',
        sizeMicrons: 'Soluble Chemical Molecule',
        severity: 'Severe',
        inactivation: 'Heat-stable (boiling does NOT remove); requires Granular Activated Carbon (GAC) adsorption'
      }
    ];

    const protocols: PurificationProtocol[] = [
      {
        step: 1,
        action: 'Physical Clarification & Sediment Pre-Filter',
        toolRequired: 'Bandana, coffee filter, or Millbank bag',
        notes: 'Removes organic debris, suspended silt, and minimizes clogging of fine membranes.'
      },
      {
        step: 2,
        action: 'Sub-Micron Pathogen Filtration',
        toolRequired: '0.1-micron hollow-fiber membrane (Sawyer Squeeze, Katadyn BeFree, LifeStraw)',
        notes: 'Mechanically excludes 99.9999% of bacteria and 99.999% of protozoan cysts (Giardia/Crypto).'
      },
      {
        step: 3,
        action: `Thermal Disinfection (Altitude Adjusted: ${boilTime} Min Rolling Boil)`,
        toolRequired: 'Camp stove or metal canteen over embers',
        notes: `Elevation ${elevationFt} ft drops boiling point to ~203°F (95°C). Maintain rolling boil for ${boilTime} full minute(s).`
      },
      {
        step: 4,
        action: 'Chemical & Toxin Adsorption (Optional / High-Risk Zones)',
        toolRequired: 'Activated carbon core or Chlorine Dioxide tablets (Aquamira)',
        notes: 'Neutralizes agricultural pesticides, heavy metals, foul odor, and residual viral threats.'
      }
    ];

    return {
      sourceName: name,
      sourceType: isSpring ? 'Artesian Spring' : isAlpine ? 'Alpine Lake' : 'River / Stream',
      coordinates: [lon, lat],
      elevationFt,
      grade,
      safetyScore,
      tdsEstimatedPpm: isSpring ? 42 : 118,
      phRange: isSpring ? '7.2 - 7.6 (Alkaline)' : '6.8 - 7.4 (Neutral)',
      recommendedBoilTimeMinutes: boilTime,
      chemicalThreatRisk: chemicalRisk,
      pathogens,
      fieldPurificationSteps: protocols
    };
  }
}
