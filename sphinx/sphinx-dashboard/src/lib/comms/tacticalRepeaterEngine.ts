// tacticalRepeaterEngine.ts
// Tactical Ham / GMRS Repeater Directory & RF Line-of-Sight Viewshed
// Provides offline frequency pairs, CTCSS/PL tones, offset standards,
// NOAA Weather Radio channels, and 4/3 Earth curvature RF viewshed calculations.

export interface RepeaterNode {
  id: string;
  callsign: string;
  band: '2m (VHF)' | '70cm (UHF)' | 'GMRS' | 'NOAA NWR';
  outputFreqMHz: number;
  offsetMHz: number;
  toneHz: number | null; // CTCSS / PL
  locationName: string;
  elevationFt: number;
  coordinates: [number, number]; // [lon, lat]
  access: 'Open' | 'ARES / RACES' | 'Emergency Priority';
}

export interface RFViewshedResult {
  repeater: RepeaterNode;
  distanceMiles: number;
  horizonLimitMiles: number;
  lineOfSightProbable: boolean;
  signalStrengthEst: 'S9+ (Strong)' | 'S5-S7 (Readable)' | 'S1-S3 (Fringe / Noise)' | 'Obstructed / Below Horizon';
  recommendedPowerWatts: number;
}

export const VERIFIED_TACTICAL_REPEATERS: RepeaterNode[] = [
  // Southern California & Pacific Rim Hubs
  { id: 'rep-socal-1', callsign: 'W6LST', band: '2m (VHF)', outputFreqMHz: 147.090, offsetMHz: 0.600, toneHz: 107.2, locationName: 'Mt. Wilson (San Gabriel Mtns)', elevationFt: 5710, coordinates: [-118.06, 34.22], access: 'Open' },
  { id: 'rep-socal-2', callsign: 'W6FNO', band: '70cm (UHF)', outputFreqMHz: 445.680, offsetMHz: -5.000, toneHz: 114.8, locationName: 'Sunset Ridge / Mt. Baldy', elevationFt: 7100, coordinates: [-117.65, 34.28], access: 'ARES / RACES' },
  { id: 'rep-socal-3', callsign: 'K6SOA', band: '2m (VHF)', outputFreqMHz: 146.940, offsetMHz: -0.600, toneHz: 131.8, locationName: 'Santiago Peak (Saddleback Mtn)', elevationFt: 5689, coordinates: [-117.53, 33.71], access: 'Open' },
  { id: 'rep-gmrs-1', callsign: 'WRXP741', band: 'GMRS', outputFreqMHz: 462.675, offsetMHz: 5.000, toneHz: 141.3, locationName: 'Verdugo Peak (GMRS Emergency Travelers)', elevationFt: 3126, coordinates: [-118.29, 34.21], access: 'Emergency Priority' },
  { id: 'rep-gmrs-2', callsign: 'WRKC922', band: 'GMRS', outputFreqMHz: 462.550, offsetMHz: 5.000, toneHz: 127.3, locationName: 'Palomar Mountain (San Diego North)', elevationFt: 5540, coordinates: [-116.86, 33.35], access: 'Open' },
  
  // Sierra Nevada & Intermountain
  { id: 'rep-sierra-1', callsign: 'W6TAH', band: '2m (VHF)', outputFreqMHz: 147.240, offsetMHz: 0.600, toneHz: 107.2, locationName: 'Slide Mountain (Lake Tahoe Basin)', elevationFt: 9650, coordinates: [-119.88, 39.31], access: 'Open' },
  { id: 'rep-sierra-2', callsign: 'K6JJE', band: '2m (VHF)', outputFreqMHz: 146.790, offsetMHz: -0.600, toneHz: 100.0, locationName: 'Mammoth Mountain Summit', elevationFt: 11053, coordinates: [-119.03, 37.63], access: 'ARES / RACES' },

  // Colorado Rockies & Continental Divide
  { id: 'rep-rockies-1', callsign: 'W0TX', band: '2m (VHF)', outputFreqMHz: 147.225, offsetMHz: 0.600, toneHz: 100.0, locationName: 'Squaw Mountain (Clear Creek Co, CO)', elevationFt: 11486, coordinates: [-105.47, 39.68], access: 'Open' },
  
  // Pacific Northwest Cascades
  { id: 'rep-pnw-1', callsign: 'W7RDR', band: '2m (VHF)', outputFreqMHz: 146.820, offsetMHz: -0.600, toneHz: 103.5, locationName: 'Cougar Mountain (Seattle / Puget Sound)', elevationFt: 1598, coordinates: [-122.10, 47.53], access: 'Open' },

  // NOAA Weather Radio (NWR) Dedicated Transmitters
  { id: 'nwr-kwo37', callsign: 'KWO37', band: 'NOAA NWR', outputFreqMHz: 162.550, offsetMHz: 0, toneHz: null, locationName: 'NOAA NWR Mt. Wilson (Los Angeles Basin)', elevationFt: 5710, coordinates: [-118.06, 34.22], access: 'Open' },
  { id: 'nwr-kzz74', callsign: 'KZZ74', band: 'NOAA NWR', outputFreqMHz: 162.400, offsetMHz: 0, toneHz: null, locationName: 'NOAA NWR Mt. Baldy Regional', elevationFt: 7100, coordinates: [-117.65, 34.28], access: 'Open' }
];

export const EMERGENCY_SIMPLEX_CHANNELS = [
  { name: 'National 2m Simplex Calling', freq: '146.520 MHz', mode: 'FM VHF', notes: 'Primary monitoring frequency for backcountry distress & travelers.' },
  { name: 'US Wilderness Protocol (Check at :00, :15, :30, :45)', freq: '146.420 MHz', mode: 'FM VHF', notes: 'National wilderness calling channel. Monitor top and bottom of each hour.' },
  { name: 'National 70cm Simplex Calling', freq: '446.000 MHz', mode: 'FM UHF', notes: 'High-density urban and line-of-sight simplex link.' },
  { name: 'GMRS Channel 20 (Emergency Traveler Ch)', freq: '462.675 MHz', mode: 'FM UHF', notes: 'National emergency assistance and roadside traveler monitoring.' },
  { name: 'MURS Channel 1 (Blue Dot)', freq: '154.570 MHz', mode: 'FM VHF', notes: 'License-free tactical VHF team coordination (2 Watt limit).' },
  { name: 'CB Channel 9 (Emergency Distress)', freq: '27.065 MHz', mode: 'AM HF', notes: 'FCC designated emergency assistance and highway patrol monitoring.' }
];

export class TacticalRepeaterEngine {
  public static calculateViewsheds(userLat: number, userLon: number, userElevFt: number = 500): RFViewshedResult[] {
    return VERIFIED_TACTICAL_REPEATERS.map(rep => {
      const dist = this.haversineMiles(userLat, userLon, rep.coordinates[1], rep.coordinates[0]);
      
      // 4/3 Earth radio horizon: D_horizon = 1.415 * (sqrt(h1) + sqrt(h2)) in miles
      const radioHorizon = 1.415 * (Math.sqrt(Math.max(0, userElevFt)) + Math.sqrt(Math.max(0, rep.elevationFt)));
      const isLOS = dist <= radioHorizon;

      let strength: RFViewshedResult['signalStrengthEst'] = 'Obstructed / Below Horizon';
      let power = 25; // Watts

      if (dist <= radioHorizon * 0.45) {
        strength = 'S9+ (Strong)';
        power = 5;
      } else if (dist <= radioHorizon * 0.8) {
        strength = 'S5-S7 (Readable)';
        power = 10;
      } else if (dist <= radioHorizon) {
        strength = 'S1-S3 (Fringe / Noise)';
        power = 50;
      }

      return {
        repeater: rep,
        distanceMiles: Math.round(dist * 10) / 10,
        horizonLimitMiles: Math.round(radioHorizon * 10) / 10,
        lineOfSightProbable: isLOS,
        signalStrengthEst: strength,
        recommendedPowerWatts: power
      };
    }).sort((a, b) => a.distanceMiles - b.distanceMiles);
  }

  private static haversineMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
