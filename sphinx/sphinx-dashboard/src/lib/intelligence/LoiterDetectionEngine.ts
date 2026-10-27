"use client";

export interface AircraftTrackPoint {
  time: number;
  lat: number;
  lon: number;
  track: number; // heading 0-360
  altFt: number;
  spdKts: number;
}

export interface LoiterAnalysis {
  isLoitering: boolean;
  loiterType: 'police_orbit' | 'surveillance' | 'medical_hold' | 'traffic_survey' | null;
  agency: string;
  orbitRadiusKm?: number;
  headingDeltaTotal: number;
  squawkMeaning?: string;
  estimatedDurationMins: number;
  tacticalAdvisory?: string;
}

const trackHistoryMap = new Map<string, AircraftTrackPoint[]>();

// Law Enforcement, Federal & Surveillance Callsign / Tail Signatures
const SURVEILLANCE_CALLSIGN_PATTERNS = [
  { pattern: /^(COPTER|POLICE|PD|PATROL|TROOPER|STATEPOLICE|SHERIFF)/i, agency: 'Law Enforcement Air Support' },
  { pattern: /^(AIR\s?[0-9]|EAGLE\s?[0-9]|FALCON\s?[0-9]|STAR\s?[0-9])/i, agency: 'Municipal Tactical Aviation' },
  { pattern: /^(DHS|CBP|BORDER|OMAH|HOMELAND)/i, agency: 'DHS / Customs & Border Protection' },
  { pattern: /^(FBI|JUSTICE|DOJ|FED)/i, agency: 'Federal Law Enforcement' },
  { pattern: /^(MEDEVAC|LIFE|RESCUE|CARE|AIRMED)/i, agency: 'Emergency Medical Aviation' },
  { pattern: /^(NEWS|SKY\s?[0-9]|CHOPPER)/i, agency: 'Broadcast Media / Traffic Observer' }
];

export function analyzeAircraftLoiter(
  aircraftId: string,
  callsign: string = '',
  currentLat: number,
  currentLon: number,
  heading: number,
  altFt: number,
  spdKts: number,
  squawk?: string
): LoiterAnalysis {
  const now = Date.now();
  const currentPoint: AircraftTrackPoint = {
    time: now,
    lat: currentLat,
    lon: currentLon,
    track: heading,
    altFt,
    spdKts
  };

  // Update track history buffer (keep last 5 minutes = 300,000ms)
  let history = trackHistoryMap.get(aircraftId) || [];
  history = history.filter(p => now - p.time < 300000);
  history.push(currentPoint);
  trackHistoryMap.set(aircraftId, history);

  // Callsign & Agency matching
  let identifiedAgency = 'Civilian Aircraft';
  let isKnownSurveillanceAgency = false;

  for (const { pattern, agency } of SURVEILLANCE_CALLSIGN_PATTERNS) {
    if (pattern.test(callsign.trim())) {
      identifiedAgency = agency;
      isKnownSurveillanceAgency = true;
      break;
    }
  }

  // Squawk code meanings
  let squawkMeaning: string | undefined = undefined;
  if (squawk) {
    const s = squawk.trim();
    if (s === '7700') squawkMeaning = 'MAYDAY / GENERAL EMERGENCY';
    else if (s === '7600') squawkMeaning = 'NORDO / LOST RADIO COMMUNICATIONS';
    else if (s === '7500') squawkMeaning = 'UNLAWFUL INTERFERENCE / HIJACK';
    else if (s === '1200') squawkMeaning = 'Standard VFR';
    else if (s === '1202') squawkMeaning = 'Glider Operations';
    else if (s === '7777') squawkMeaning = 'Military Intercept / Operations';
  }

  // Orbit / Loiter Calculation:
  // If we have at least 3 points, calculate cumulative heading angular delta
  let cumulativeHeadingTurn = 0;
  for (let i = 1; i < history.length; i++) {
    const prevHeading = history[i - 1].track;
    const currHeading = history[i].track;
    let diff = Math.abs(currHeading - prevHeading);
    if (diff > 180) diff = 360 - diff;
    cumulativeHeadingTurn += diff;
  }

  // Threshold: If cumulative turns exceed 270 degrees below 7,500 ft AGL and speed is < 160 knots
  const isOrbiting = cumulativeHeadingTurn >= 270 && altFt < 7500 && spdKts < 180;
  const isLoitering = isOrbiting || (isKnownSurveillanceAgency && altFt < 5000);

  let loiterType: LoiterAnalysis['loiterType'] = null;
  let advisory: string | undefined = undefined;

  if (isLoitering) {
    if (identifiedAgency.includes('Law Enforcement') || identifiedAgency.includes('Tactical')) {
      loiterType = 'police_orbit';
      advisory = 'Active law enforcement aerial orbit over ground perimeter. Surveillance sensors deployed.';
    } else if (identifiedAgency.includes('DHS') || identifiedAgency.includes('Federal')) {
      loiterType = 'surveillance';
      advisory = 'Federal aerial reconnaissance orbit active.';
    } else if (identifiedAgency.includes('Medical')) {
      loiterType = 'medical_hold';
      advisory = 'Emergency medical helicopter holding or landing approach.';
    } else {
      loiterType = 'traffic_survey';
      advisory = 'Aircraft holding circular orbit pattern below 7,500 ft.';
    }
  }

  const durationMins = history.length > 1 ? Math.round((now - history[0].time) / 60000) : 1;

  return {
    isLoitering,
    loiterType,
    agency: identifiedAgency,
    headingDeltaTotal: Math.round(cumulativeHeadingTurn),
    squawkMeaning,
    estimatedDurationMins: Math.max(1, durationMins),
    tacticalAdvisory: advisory
  };
}
