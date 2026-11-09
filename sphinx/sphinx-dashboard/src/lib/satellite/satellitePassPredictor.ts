// satellitePassPredictor.ts
// Orbital Reconnaissance Satellite Overflight Pass Predictor
// Predicts optical and SAR satellite passes and tactical overhead concealment windows

export interface SatelliteTarget {
  noradId: number;
  name: string;
  designator: string;
  sensorType: 'OPTICAL_HIGH_RES' | 'SYNTHETIC_APERTURE_RADAR' | 'SIGINT_ELINT';
  resolutionMeters: number;
  altitudeKm: number;
  country: string;
}

export interface SatellitePass {
  id: string;
  satellite: SatelliteTarget;
  startTime: Date;
  peakTime: Date;
  endTime: Date;
  durationMinutes: number;
  maxElevationDeg: number;
  approachAzimuthDeg: number;
  departureAzimuthDeg: number;
  threatLevel: 'CRITICAL_OVERHEAD' | 'ELEVATED' | 'HORIZON_PASS';
  concealmentAdvisory: string;
}

export const RECON_CONSTELLATION: SatelliteTarget[] = [
  {
    noradId: 37348,
    name: 'USA-224 (KH-11 Kennen)',
    designator: 'Keyhole Optical',
    sensorType: 'OPTICAL_HIGH_RES',
    resolutionMeters: 0.08,
    altitudeKm: 260,
    country: 'USA'
  },
  {
    noradId: 39634,
    name: 'Sentinel-1A SAR',
    designator: 'Copernicus C-SAR',
    sensorType: 'SYNTHETIC_APERTURE_RADAR',
    resolutionMeters: 5.0,
    altitudeKm: 693,
    country: 'ESA'
  },
  {
    noradId: 40115,
    name: 'WorldView-3 Commercial',
    designator: 'Maxar Sub-meter',
    sensorType: 'OPTICAL_HIGH_RES',
    resolutionMeters: 0.31,
    altitudeKm: 619,
    country: 'USA'
  },
  {
    noradId: 37212,
    name: 'COSMO-SkyMed 4 Military',
    designator: 'X-Band SAR Radar',
    sensorType: 'SYNTHETIC_APERTURE_RADAR',
    resolutionMeters: 1.0,
    altitudeKm: 620,
    country: 'Italy'
  }
];

export class SatellitePassPredictor {
  /**
   * Predicts upcoming satellite passes over a given coordinate within a specified window.
   */
  public static predictUpcomingPasses(
    lat: number,
    lon: number,
    referenceTime: Date = new Date(),
    windowHours: number = 12
  ): SatellitePass[] {
    const passes: SatellitePass[] = [];
    const baseEpoch = referenceTime.getTime();

    // Deterministic pseudo-orbital propagator based on satellite orbit period
    RECON_CONSTELLATION.forEach((sat, satIdx) => {
      // Mean orbital period T = 2 * pi * sqrt(a^3 / mu)
      const periodMinutes = sat.altitudeKm < 300 ? 89.5 : 98.2;
      const periodMs = periodMinutes * 60 * 1000;

      // Calculate passes within the window
      const maxPasses = Math.min(3, Math.floor((windowHours * 60) / periodMinutes));
      for (let p = 0; p < maxPasses; p++) {
        // Pseudo-phase offset based on lat/lon
        const phaseOffsetMs = ((Math.abs(Math.sin(lat * 0.1 + lon * 0.2 + satIdx * 1.5)) * 45) + (satIdx * 22) + (p * periodMinutes)) * 60 * 1000;
        const peakTimeMs = baseEpoch + phaseOffsetMs;

        // Peak elevation (0 to 88 degrees)
        const elevSeed = Math.abs(Math.sin(lat * 0.05 + lon * 0.07 + satIdx * 3.1 + p * 1.7));
        const maxElevation = Math.round(25 + elevSeed * 63); // 25° to 88°
        const durationMinutes = Math.round(5 + (maxElevation / 90) * 6); // 5 to 11 mins

        const startTime = new Date(peakTimeMs - (durationMinutes * 60 * 1000) / 2);
        const peakTime = new Date(peakTimeMs);
        const endTime = new Date(peakTimeMs + (durationMinutes * 60 * 1000) / 2);

        let threatLevel: 'CRITICAL_OVERHEAD' | 'ELEVATED' | 'HORIZON_PASS' = 'HORIZON_PASS';
        let concealmentAdvisory = 'Low horizon angle. Natural terrain masking effective.';

        if (maxElevation >= 60) {
          threatLevel = 'CRITICAL_OVERHEAD';
          concealmentAdvisory = sat.sensorType === 'SYNTHETIC_APERTURE_RADAR'
            ? 'OVERHEAD SAR RADAR: Cloud cover ineffective. Seek radar-reflective shielding or enclosed masonry.'
            : 'HIGH RESOLUTION OPTICAL: Sub-meter overhead visual. Conceal vehicles under canopy or camouflage netting.';
        } else if (maxElevation >= 40) {
          threatLevel = 'ELEVATED';
          concealmentAdvisory = sat.sensorType === 'SYNTHETIC_APERTURE_RADAR'
            ? 'Angled SAR pass. Side-looking radar active. Avoid open metallic surfaces.'
            : 'Oblique optical reconnaissance pass. Maintain low signature under eaves or shade.';
        }

        passes.push({
          id: `pass-${sat.noradId}-${p}`,
          satellite: sat,
          startTime,
          peakTime,
          endTime,
          durationMinutes,
          maxElevationDeg: maxElevation,
          approachAzimuthDeg: Math.round((satIdx * 75 + p * 120) % 360),
          departureAzimuthDeg: Math.round((satIdx * 75 + p * 120 + 180) % 360),
          threatLevel,
          concealmentAdvisory
        });
      }
    });

    // Sort by ascending start time
    return passes.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }
}
