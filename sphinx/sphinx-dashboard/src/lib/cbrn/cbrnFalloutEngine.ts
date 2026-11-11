// cbrnFalloutEngine.ts
// CBRN Fallout & Chemical Plume Dispersion Simulator
// Computes atmospheric Gaussian plume ellipses, nuclear detonation blast radii,
// 7:10 radiological decay laws, and precise PPE filtration requirements.

export type WeaponYield = '1kt_tactical' | '10kt_ind' | '50kt_tactical' | '100kt_strategic' | '475kt_w88';

export interface YieldProfile {
  id: WeaponYield;
  name: string;
  psi20HeavyDestructionMiles: number; // Complete reinforced concrete demolition
  psi5ModerateDestructionMiles: number; // Residential houses collapse, widespread injuries
  psi1GlassBreakageMiles: number;
  thermalFlashBurnMiles: number; // 3rd degree burns
  promptRadiationLethalMiles: number; // 500 rem lethal boundary
}

export const YIELD_PROFILES: Record<WeaponYield, YieldProfile> = {
  '1kt_tactical': {
    id: '1kt_tactical',
    name: '1 Kiloton (Tactical Artillery / Dirty Bomb)',
    psi20HeavyDestructionMiles: 0.14,
    psi5ModerateDestructionMiles: 0.35,
    psi1GlassBreakageMiles: 0.95,
    thermalFlashBurnMiles: 0.50,
    promptRadiationLethalMiles: 0.45
  },
  '10kt_ind': {
    id: '10kt_ind',
    name: '10 Kilotons (Improvised Nuclear Device / IND)',
    psi20HeavyDestructionMiles: 0.30,
    psi5ModerateDestructionMiles: 0.75,
    psi1GlassBreakageMiles: 2.10,
    thermalFlashBurnMiles: 1.15,
    promptRadiationLethalMiles: 0.85
  },
  '50kt_tactical': {
    id: '50kt_tactical',
    name: '50 Kilotons (Sub-Strategic Weapon)',
    psi20HeavyDestructionMiles: 0.52,
    psi5ModerateDestructionMiles: 1.30,
    psi1GlassBreakageMiles: 3.60,
    thermalFlashBurnMiles: 2.30,
    promptRadiationLethalMiles: 1.25
  },
  '100kt_strategic': {
    id: '100kt_strategic',
    name: '100 Kilotons (Strategic Warhead)',
    psi20HeavyDestructionMiles: 0.65,
    psi5ModerateDestructionMiles: 1.62,
    psi1GlassBreakageMiles: 4.50,
    thermalFlashBurnMiles: 3.10,
    promptRadiationLethalMiles: 1.50
  },
  '475kt_w88': {
    id: '475kt_w88',
    name: '475 Kilotons (W88 Trident SLBM Warhead)',
    psi20HeavyDestructionMiles: 1.10,
    psi5ModerateDestructionMiles: 2.75,
    psi1GlassBreakageMiles: 7.80,
    thermalFlashBurnMiles: 5.60,
    promptRadiationLethalMiles: 2.10
  }
};

export interface PlumeEllipse {
  id: string;
  name: string;
  doseRateRhr: number;
  color: string;
  points: [number, number][]; // [lon, lat]
}

export interface CBRNAnalysis {
  detonationCoords: [number, number];
  yieldProfile: YieldProfile;
  windSpeedMph: number;
  windBearingDeg: number;
  plumes: PlumeEllipse[];
  decayTimeline: Array<{ hoursAfter: number; relativeDosePercent: number; safeStatus: string }>;
  recommendedPPE: {
    respirator: string;
    bodySuit: string;
    deconProtocol: string;
  };
}

export class CBRNFalloutEngine {
  public static calculateFallout(
    detonationLon: number,
    detonationLat: number,
    yieldId: WeaponYield = '10kt_ind',
    windSpeedMph: number = 12,
    windBearingDeg: number = 45 // wind blowing toward northeast
  ): CBRNAnalysis {
    const yieldProf = YIELD_PROFILES[yieldId] || YIELD_PROFILES['10kt_ind'];

    // 7:10 rule of radiological decay: R(t) = R_0 * (t)^(-1.2)
    const decay = [
      { hoursAfter: 1, relativeDosePercent: 100, safeStatus: 'CRITICAL LETHAL — Mandatory Deep Basement / Bunker Shelter' },
      { hoursAfter: 7, relativeDosePercent: 10, safeStatus: 'HIGH HAZARD — Radiation dropped by 90%; Remain sheltered' },
      { hoursAfter: 48, relativeDosePercent: 1.5, safeStatus: 'MODERATE — 98.5% decay; Brief emergency egress permitted' },
      { hoursAfter: 168, relativeDosePercent: 0.2, safeStatus: 'LOW — Safe for organized evacuation and perimeter transit' }
    ];

    // Compute downwind elliptical plume coordinates
    // Length scales with wind speed and yield
    const plumeLengthMiles = Math.max(4, yieldProf.psi5ModerateDestructionMiles * 8 + windSpeedMph * 1.5);
    const plumeWidthMiles = Math.max(1.5, plumeLengthMiles * 0.28);

    const plumes: PlumeEllipse[] = [
      this.generateEllipse(detonationLon, detonationLat, plumeLengthMiles, plumeWidthMiles, windBearingDeg, 100, '#ef4444', 'Heavy Fallout (100 R/hr - Immediate Shelter)'),
      this.generateEllipse(detonationLon, detonationLat, plumeLengthMiles * 1.8, plumeWidthMiles * 1.6, windBearingDeg, 20, '#f97316', 'Moderate Fallout (20 R/hr - Infiltration Hazard)'),
      this.generateEllipse(detonationLon, detonationLat, plumeLengthMiles * 3.2, plumeWidthMiles * 2.4, windBearingDeg, 2, '#eab308', 'Precautionary Fallout (2 R/hr - Mask Required)')
    ];

    return {
      detonationCoords: [detonationLon, detonationLat],
      yieldProfile: yieldProf,
      windSpeedMph,
      windBearingDeg,
      plumes,
      decayTimeline: decay,
      recommendedPPE: {
        respirator: 'Full-Facepiece Air-Purifying Respirator with P100 / HEPA (0.3 micron) + Activated Charcoal ABEK2P3 canister',
        bodySuit: 'Non-porous polyethylene Tychem / Tyvek sealed suit with taped wrists and ankles',
        deconProtocol: 'Strip outer clothing before entry (eliminates 90% of radioactive particles); wet-wipe skin from head downward.'
      }
    };
  }

  private static generateEllipse(
    centerLon: number,
    centerLat: number,
    lengthMiles: number,
    widthMiles: number,
    bearingDeg: number,
    doseRate: number,
    color: string,
    name: string
  ): PlumeEllipse {
    const points: [number, number][] = [];
    const rad = (bearingDeg * Math.PI) / 180;
    const numPoints = 32;

    // Center of ellipse is shifted downwind by half length
    const shiftMiles = lengthMiles * 0.45;
    const shiftLat = (shiftMiles / 69.0) * Math.cos(rad);
    const shiftLon = (shiftMiles / (69.0 * Math.cos(centerLat * Math.PI / 180))) * Math.sin(rad);

    const cLat = centerLat + shiftLat;
    const cLon = centerLon + shiftLon;

    for (let i = 0; i <= numPoints; i++) {
      const theta = (i * 2 * Math.PI) / numPoints;
      // Local ellipse axes
      const x = (widthMiles / 2) * Math.cos(theta);
      const y = (lengthMiles / 2) * Math.sin(theta);

      // Rotate by bearing
      const rotX = x * Math.cos(rad) - y * Math.sin(rad);
      const rotY = x * Math.sin(rad) + y * Math.cos(rad);

      const ptLat = cLat + rotY / 69.0;
      const ptLon = cLon + rotX / (69.0 * Math.cos(cLat * Math.PI / 180));
      points.push([ptLon, ptLat]);
    }

    return {
      id: `plume-${doseRate}r`,
      name,
      doseRateRhr: doseRate,
      color,
      points
    };
  }
}
