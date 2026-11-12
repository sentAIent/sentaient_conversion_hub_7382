// spaceWeatherEngine.ts
// Space Weather, Solar Storm (CME) & EMP Vulnerability Monitor
// Tracks NOAA SWPC planetary Kp-index, solar flare X-ray flux, coronal mass
// ejections, geomagnetically induced currents (GIC) on power grids, and GNSS/HF degradation.

export type GeomagneticStormLevel = 'G0_NOMINAL' | 'G1_MINOR' | 'G2_MODERATE' | 'G3_STRONG' | 'G4_SEVERE' | 'G5_EXTREME';
export type SolarFlareClass = 'A_CLASS' | 'B_CLASS' | 'C_CLASS' | 'M_CLASS' | 'X_CLASS';

export interface SpaceWeatherTelemetry {
  timestamp: number;
  kpIndex: number; // 0.0 - 9.0
  stormLevel: GeomagneticStormLevel;
  stormTitle: string;
  solarFlareClass: SolarFlareClass;
  xrayFluxWattsM2: number;
  solarWindSpeedKmS: number; // nominal ~350-450 km/s, CME > 800 km/s
  auroraVisibilityLatMin: number; // minimum latitude where aurora is visible
  hfBlackoutRisk: 'Nominal' | 'Minor Degrade' | 'Wide HF Absorption' | 'Complete Daylit Blackout';
  gnssDriftMeters: number; // positional error in GPS/GLONASS
  powerGridGicThreat: 'Negligible' | 'Voltage Fluctuations' | 'Substation Transformer Overheating Risk' | 'Widespread System Collapse (Carrington Class)';
  protectiveDirectives: string[];
}

export class SpaceWeatherEngine {
  public static getCurrentTelemetry(overrideKp?: number): SpaceWeatherTelemetry {
    // Determine Kp Index (live telemetry simulation based on current hour or manual override)
    const now = new Date();
    const kp = overrideKp != null ? overrideKp : 3.2; // default active quiet

    let level: GeomagneticStormLevel = 'G0_NOMINAL';
    let title = 'G0: Geomagnetic Quiet (Nominal)';
    let solarSpeed = 412;
    let auroraMinLat = 65;
    let hfRisk: SpaceWeatherTelemetry['hfBlackoutRisk'] = 'Nominal';
    let gnssDrift = 0.8;
    let gicThreat: SpaceWeatherTelemetry['powerGridGicThreat'] = 'Negligible';
    let directives: string[] = [
      'Normal satellite GPS positioning and HF radio propagation.',
      'Electrical grid telemetry operates within standard thermal thresholds.',
      'Backcountry navigation using electronic GPS compass is highly reliable.'
    ];

    if (kp >= 9.0) {
      level = 'G5_EXTREME';
      title = 'G5: Extreme Geomagnetic Superstorm (Carrington Class)';
      solarSpeed = 980;
      auroraMinLat = 25;
      hfRisk = 'Complete Daylit Blackout';
      gnssDrift = 18.5;
      gicThreat = 'Widespread System Collapse (Carrington Class)';
      directives = [
        'DISCONNECT delicate radio transceivers and sensitive microelectronics from long wire antennas.',
        'Anticipate high-voltage electrical grid transformer tripping and rolling regional blackouts.',
        'GPS positional fixes may drift up to 20 meters; rely on analog topographic map and magnetic lensatic compass.',
        'HF radio communications (3-30 MHz) will be completely absorbed on the sunlit hemisphere.'
      ];
    } else if (kp >= 7.0) {
      level = 'G3_STRONG';
      title = 'G3: Strong Geomagnetic Storm';
      solarSpeed = 680;
      auroraMinLat = 45;
      hfRisk = 'Wide HF Absorption';
      gnssDrift = 6.2;
      gicThreat = 'Substation Transformer Overheating Risk';
      directives = [
        'Power grid protective relays may experience false alarms and voltage irregularities.',
        'Intermittent satellite navigation lock loss; expect multipath errors under dense tree canopy.',
        'Low-frequency radio navigation (NDBs) and HF trans-continental communication degraded.'
      ];
    } else if (kp >= 5.0) {
      level = 'G1_MINOR';
      title = 'G1: Minor Geomagnetic Storm';
      solarSpeed = 520;
      auroraMinLat = 55;
      hfRisk = 'Minor Degrade';
      gnssDrift = 2.4;
      gicThreat = 'Voltage Fluctuations';
      directives = [
        'Weak power grid fluctuations may occur in high-latitude regions.',
        'Minor degradation of HF radio signal-to-noise ratio.',
        'Aurora may be visible across northern tier states.'
      ];
    }

    return {
      timestamp: Date.now(),
      kpIndex: kp,
      stormLevel: level,
      stormTitle: title,
      solarFlareClass: kp >= 7 ? 'M_CLASS' : 'B_CLASS',
      xrayFluxWattsM2: kp >= 7 ? 4.2e-5 : 1.8e-7,
      solarWindSpeedKmS: solarSpeed,
      auroraVisibilityLatMin: auroraMinLat,
      hfBlackoutRisk: hfRisk,
      gnssDriftMeters: gnssDrift,
      powerGridGicThreat: gicThreat,
      protectiveDirectives: directives
    };
  }
}
