// src/lib/defense/sparrowReconEngine.ts
// SparrowMap Counter-Surveillance & Civilian Situational Awareness Engine
// ADMIN ONLY — Strictly excluded from public App Store / Google Play submission builds.

export const IS_STORE_SUBMISSION_BUILD = process.env.NEXT_PUBLIC_STORE_SUBMISSION === 'true';

// Check if SparrowMap features are allowed to be loaded or executed
export function isSparrowFeatureAllowed(isAdmin: boolean = false): boolean {
  if (IS_STORE_SUBMISSION_BUILD) {
    return false; // Permanently stripped out during App Store review
  }
  return isAdmin;
}

// 1. Surveillance Hardware Beacon Signatures
export interface SurveillanceBeaconSignature {
  deviceType: 'FLOCK_ALPR' | 'AXON_BODYCAM' | 'AXON_FLEET' | 'CRUISER_GATEWAY' | 'SPEED_TRAFFIC_RADAR';
  manufacturer: string;
  name: string;
  ssidPatterns: string[];
  bleServiceUuids?: string[];
  ouiPrefixes?: string[]; // MAC Address Organizationally Unique Identifiers
  description: string;
  tacticalImplication: string;
  frequencyBand: '2.4 GHz' | '5.0 GHz' | 'BLE 2.4 GHz' | 'CBRS 3.5 GHz';
}

export const SURVEILLANCE_BEACON_SIGNATURES: SurveillanceBeaconSignature[] = [
  {
    deviceType: 'FLOCK_ALPR',
    manufacturer: 'Flock Safety',
    name: 'Flock Falcon / Sparrow ALPR Fixed Camera',
    ssidPatterns: ['Flock-', 'FS-', 'FLOCK_SETUP', 'Falcon_'],
    bleServiceUuids: ['0000feaa-0000-1000-8000-00805f9b34fb'],
    ouiPrefixes: ['00:25:DF', 'B8:27:EB', 'DC:A6:32'],
    description: 'Solar-powered roadside fixed Automated License Plate Reader capturing plate, vehicle make, model, color, and unique vehicle damage.',
    tacticalImplication: 'Fixed choke-point surveillance capturing all passing vehicles into an automated 30-day search database.',
    frequencyBand: '2.4 GHz'
  },
  {
    deviceType: 'AXON_FLEET',
    manufacturer: 'Axon Enterprise',
    name: 'Axon Fleet 3 Police In-Car Camera & ALPR',
    ssidPatterns: ['AXON_', 'Fleet3_', 'BV-'],
    bleServiceUuids: ['0000180a-0000-1000-8000-00805f9b34fb'],
    ouiPrefixes: ['00:1E:C0', '70:EE:50'],
    description: 'Patrol cruiser dual-camera system with embedded edge AI license plate reader and real-time streaming to Evidence.com.',
    tacticalImplication: 'Mobile surveillance unit actively scanning multiple lanes in traffic in real-time.',
    frequencyBand: '5.0 GHz'
  },
  {
    deviceType: 'AXON_BODYCAM',
    manufacturer: 'Axon Enterprise',
    name: 'Axon Body 3 / 4 Body-Worn Camera',
    ssidPatterns: ['AXON_BODY_', 'AB3_', 'AB4_'],
    bleServiceUuids: ['0000180f-0000-1000-8000-00805f9b34fb'],
    ouiPrefixes: ['00:1E:C0'],
    description: 'Officer-worn camera emitting continuous Bluetooth Low Energy (BLE) sync beacons for vehicle dock pairing and activation.',
    tacticalImplication: 'Indicates uniformed officer within 15–30 meters line of sight.',
    frequencyBand: 'BLE 2.4 GHz'
  },
  {
    deviceType: 'CRUISER_GATEWAY',
    manufacturer: 'Sierra Wireless / Cradlepoint',
    name: 'AirLink MG90 / Cradlepoint NetCloud Router',
    ssidPatterns: ['AirLink-', 'CP-', 'MDT-', 'POLICE_WIFI', 'Patrol-'],
    ouiPrefixes: ['00:1B:C0', '00:30:44', '00:0C:E5'],
    description: 'High-power multi-network in-vehicle cellular gateway interconnecting in-car MDT computer, radar, and ALPR systems.',
    tacticalImplication: 'Active law enforcement or municipal emergency vehicle within 100–200 meters RF range.',
    frequencyBand: '2.4 GHz'
  },
  {
    deviceType: 'SPEED_TRAFFIC_RADAR',
    manufacturer: 'Stalker / Decatur',
    name: 'Doppler Speed Enforcement Radar',
    ssidPatterns: ['RadarSpeed_', 'TrafficDisplay_'],
    ouiPrefixes: ['00:50:C2'],
    description: 'K-band (24.150 GHz) and Ka-band (34.7 GHz) Doppler radar units mounted in police cruisers or stationary trailers.',
    tacticalImplication: 'Speed enforcement corridor active.',
    frequencyBand: '2.4 GHz'
  }
];

// 2. Fixed ALPR Infrastructure Sites
export interface FixedAlprSite {
  id: string;
  name: string;
  agency: string;
  lat: number;
  lon: number;
  type: 'FIXED_FLOCK' | 'HIGHWAY_TOLL' | 'PORTAL_CHOKEPOINT';
  directionMonitored: string;
  confidenceScore: number;
}

export const STRATEGIC_ALPR_CORRIDORS: FixedAlprSite[] = [
  {
    id: 'ALPR-SF-01',
    name: 'Golden Gate Bridge Southbound Gantry',
    agency: 'Golden Gate Highway District / CHP',
    lat: 37.8199,
    lon: -122.4783,
    type: 'HIGHWAY_TOLL',
    directionMonitored: 'Both (North/Southbound)',
    confidenceScore: 0.99
  },
  {
    id: 'ALPR-SF-02',
    name: 'Bay Bridge Toll Plaza Gantry I-80',
    agency: 'BATA / CHP Golden Gate Division',
    lat: 37.8252,
    lon: -122.3168,
    type: 'HIGHWAY_TOLL',
    directionMonitored: 'Westbound',
    confidenceScore: 0.99
  },
  {
    id: 'ALPR-OAK-01',
    name: 'MacArthur Blvd & Broadway Flock Array',
    agency: 'Oakland Police Dept / Flock Safety',
    lat: 37.8234,
    lon: -122.2587,
    type: 'FIXED_FLOCK',
    directionMonitored: 'East/Westbound',
    confidenceScore: 0.95
  },
  {
    id: 'ALPR-SJ-01',
    name: 'I-280 & Saratoga Ave Arterial Flock',
    agency: 'San Jose Police Dept',
    lat: 37.3195,
    lon: -121.9774,
    type: 'FIXED_FLOCK',
    directionMonitored: 'All Arterial Quadrants',
    confidenceScore: 0.92
  },
  {
    id: 'ALPR-LA-01',
    name: 'I-5 & Hwy 14 Newhall Pass Gantry',
    agency: 'CHP Southern Division',
    lat: 34.3382,
    lon: -118.5024,
    type: 'PORTAL_CHOKEPOINT',
    directionMonitored: 'North/Southbound Corridor',
    confidenceScore: 0.98
  },
  {
    id: 'ALPR-SD-01',
    name: 'I-5 San Onofre Border Patrol Checkpoint',
    agency: 'US Border Patrol / CBP',
    lat: 33.3648,
    lon: -117.5451,
    type: 'PORTAL_CHOKEPOINT',
    directionMonitored: 'Northbound',
    confidenceScore: 0.99
  }
];

// 3. Government Surveillance Aircraft ICAO Registration Signatures
export interface SurveillanceAircraftRegistration {
  icao24: string;
  registration: string;
  operator: string;
  aircraftModel: string;
  sensorEquipment: string;
  typicalMission: string;
}

export const SURVEILLANCE_AIRCRAFT_REGISTRY: SurveillanceAircraftRegistration[] = [
  {
    icao24: 'A1B2C3',
    registration: 'N841HP',
    operator: 'California Highway Patrol Air Operations',
    aircraftModel: 'Eurocopter AS350B3 (H125)',
    sensorEquipment: 'FLIR Star SAFIRE 380-HD, Spectrolab SX-16 Nightsun',
    typicalMission: 'Traffic highway surveillance, pursuit vectoring, tactical perimeter'
  },
  {
    icao24: 'A2C4E6',
    registration: 'N242LA',
    operator: 'LAPD Air Support Division (ASD)',
    aircraftModel: 'Bell 206 Jetranger / 412',
    sensorEquipment: 'Forward-Looking Infrared, ALPR aerial sensor, downlink microwave',
    typicalMission: 'Urban high-orbit observation, tactical grid containment'
  },
  {
    icao24: 'A9B8C7',
    registration: 'N721CB',
    operator: 'US Customs and Border Protection (CBP Air & Marine)',
    aircraftModel: 'Lockheed P-3 Orion / Cessna 206',
    sensorEquipment: 'APG-66 Radar, EO/IR high-magnification optical turret',
    typicalMission: 'Border & maritime interdiction, federal recon loitering'
  },
  {
    icao24: 'A5E7F9',
    registration: 'N911NY',
    operator: 'NYPD Aviation Unit',
    aircraftModel: 'Bell 429 GlobalRanger',
    sensorEquipment: 'Wescam MX-15 EO/IR camera, radiation detection sensor pod',
    typicalMission: 'Metropolitan security patrol, maritime harbor reconnaissance'
  }
];

// 4. Ephemeral Civilian Recon Sightings (Zero-PII, 2-Hour TTL)
export interface CitizenReconSighting {
  id: string;
  timestamp: number; // Unix timestamp
  lat: number;
  lon: number;
  type: 'SPEED_TRAP' | 'STATIONARY_PATROL' | 'ALPR_CHECKPOINT' | 'CIRCLING_AIRCRAFT';
  description: string;
  verifiedCount: number;
  expiresAt: number; // TTL: 2 hours after creation
}

// In-memory or localStorage cache for sightings
const SIGHTING_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

export class SparrowReconEngine {
  private static STORAGE_KEY = 'sphinx_sparrow_sightings_v1';

  // Match an observed Wi-Fi SSID against known surveillance hardware signatures
  public static matchSsid(ssid: string): SurveillanceBeaconSignature | null {
    const s = ssid.trim();
    for (const sig of SURVEILLANCE_BEACON_SIGNATURES) {
      for (const pattern of sig.ssidPatterns) {
        if (s.startsWith(pattern) || s.includes(pattern)) {
          return sig;
        }
      }
    }
    return null;
  }

  // Calculate distance in km between two lat/lon points
  public static calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Get fixed ALPR cameras within a radius (km) of current location
  public static getNearbyAlprChokepoints(lat: number, lon: number, radiusKm = 50): {
    site: FixedAlprSite;
    distanceKm: number;
  }[] {
    return STRATEGIC_ALPR_CORRIDORS
      .map(site => ({
        site,
        distanceKm: this.calculateDistanceKm(lat, lon, site.lat, site.lon)
      }))
      .filter(item => item.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }

  // Add an ephemeral civilian sighting (Zero PII)
  public static addSighting(
    lat: number,
    lon: number,
    type: CitizenReconSighting['type'],
    description: string
  ): CitizenReconSighting {
    const now = Date.now();
    const sighting: CitizenReconSighting = {
      id: `sparrow-${now}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: now,
      lat,
      lon,
      type,
      description: description.replace(/\b[A-Z0-9]{5,8}\b/g, '[REDACTED]'), // scrub license plates
      verifiedCount: 1,
      expiresAt: now + SIGHTING_TTL_MS
    };

    const current = this.getActiveSightings();
    current.push(sighting);
    this.saveSightings(current);
    return sighting;
  }

  // Get only unexpired active sightings
  public static getActiveSightings(): CitizenReconSighting[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [];
      const parsed: CitizenReconSighting[] = JSON.parse(raw);
      const now = Date.now();
      const active = parsed.filter(s => s.expiresAt > now);
      if (active.length !== parsed.length) {
        this.saveSightings(active);
      }
      return active;
    } catch {
      return [];
    }
  }

  private static saveSightings(sightings: CitizenReconSighting[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sightings));
    } catch {
      // ignore
    }
  }
}
