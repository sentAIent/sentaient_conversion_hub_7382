// sphinx-dashboard/src/lib/atmosphericRadarEngine.ts
// Sophisticated Atmospheric & Ionospheric Radar Network and Sweep Engine
// Tracks HAARP, SuperDARN HF chain, Incoherent Scatter Radars, and NEXRAD Doppler Arrays

export interface AtmosphericRadarStation {
  id: string;
  name: string;
  callsign?: string;
  type: 'ionospheric_research' | 'superdarn_hf' | 'nexrad_doppler' | 'atmospheric_radar';
  lat: number;
  lon: number;
  elevationM: number;
  primaryFrequency: string;
  peakPowerMw: number; // Megawatts peak
  pulseRepFreqHz: number; // Pulse repetition frequency in Hz
  pulseWidthUs: number; // Pulse width in microseconds
  coverageRadiusKm: number;
  operationalStatus: 'ACTIVE_PULSING' | 'SWEEP_TRANSMIT' | 'MONITORING' | 'RESEARCH_RUN';
  description: string;
  agency: string;
}

export const ATMOSPHERIC_RADAR_STATIONS: AtmosphericRadarStation[] = [
  {
    id: 'haarp-gakona',
    name: 'HAARP Ionospheric Research Instrument',
    callsign: 'HAARP-IRI',
    type: 'ionospheric_research',
    lat: 62.3917,
    lon: -145.1500,
    elevationM: 610,
    primaryFrequency: '2.7 – 10.0 MHz (HF Phased Array)',
    peakPowerMw: 3.6,
    pulseRepFreqHz: 200,
    pulseWidthUs: 100,
    coverageRadiusKm: 500,
    operationalStatus: 'RESEARCH_RUN',
    description: 'High Frequency Active Auroral Research Program. 180-element cross-dipole phased antenna array studying ionospheric plasma physics, radio propagation, and magnetospheric ducting.',
    agency: 'University of Alaska Fairbanks / NSF'
  },
  {
    id: 'poker-flat',
    name: 'Poker Flat Research Range & Lidar',
    callsign: 'PFRR-ATM',
    type: 'atmospheric_radar',
    lat: 65.1200,
    lon: -147.4700,
    elevationM: 200,
    primaryFrequency: '449 MHz (UHF Wind Profiler) & 532nm Lidar',
    peakPowerMw: 0.25,
    pulseRepFreqHz: 5000,
    pulseWidthUs: 1.5,
    coverageRadiusKm: 300,
    operationalStatus: 'ACTIVE_PULSING',
    description: 'Atmospheric rocket range and mesosphere-stratosphere-troposphere (MST) radar tracking polar mesospheric clouds, auroral currents, and gravity waves.',
    agency: 'Geophysical Institute UAF / NASA'
  },
  {
    id: 'superdarn-kodiak',
    name: 'SuperDARN Kodiak HF Radar',
    callsign: 'KOD-SD',
    type: 'superdarn_hf',
    lat: 57.6167,
    lon: -152.1833,
    elevationM: 45,
    primaryFrequency: '8.0 – 20.0 MHz (High Frequency)',
    peakPowerMw: 0.01,
    pulseRepFreqHz: 60,
    pulseWidthUs: 300,
    coverageRadiusKm: 3500,
    operationalStatus: 'SWEEP_TRANSMIT',
    description: 'Super Dual Auroral Radar Network site. Measures high-latitude ionospheric plasma convection velocities and geomagnetic storm energy dissipation.',
    agency: 'SuperDARN Collaboration / NSF'
  },
  {
    id: 'superdarn-fort-hays',
    name: 'SuperDARN Fort Hays Mid-Latitude Radar',
    callsign: 'FHW-SD',
    type: 'superdarn_hf',
    lat: 38.8500,
    lon: -99.3800,
    elevationM: 615,
    primaryFrequency: '9.0 – 18.0 MHz (High Frequency)',
    peakPowerMw: 0.01,
    pulseRepFreqHz: 60,
    pulseWidthUs: 300,
    coverageRadiusKm: 3000,
    operationalStatus: 'SWEEP_TRANSMIT',
    description: 'Mid-latitude SuperDARN HF radar array monitoring sub-auroral ionospheric electric fields and space weather disturbances.',
    agency: 'Virginia Tech / NSF'
  },
  {
    id: 'superdarn-christmas-valley',
    name: 'SuperDARN Christmas Valley Radar',
    callsign: 'CVW-SD',
    type: 'superdarn_hf',
    lat: 43.2700,
    lon: -120.3600,
    elevationM: 1320,
    primaryFrequency: '10.0 – 18.0 MHz (High Frequency)',
    peakPowerMw: 0.01,
    pulseRepFreqHz: 60,
    pulseWidthUs: 300,
    coverageRadiusKm: 3000,
    operationalStatus: 'ACTIVE_PULSING',
    description: 'Western US dual HF radar array surveying ionospheric irregularities and traveling ionospheric disturbances (TIDs).',
    agency: 'Dartmouth College / NSF'
  },
  {
    id: 'millstone-hill',
    name: 'Millstone Hill Incoherent Scatter Radar',
    callsign: 'MHO-ISR',
    type: 'atmospheric_radar',
    lat: 42.6190,
    lon: -71.4910,
    elevationM: 126,
    primaryFrequency: '440 MHz (UHF Megawatt Klystron)',
    peakPowerMw: 2.5,
    pulseRepFreqHz: 30,
    pulseWidthUs: 1000,
    coverageRadiusKm: 1000,
    operationalStatus: 'MONITORING',
    description: '46-meter fully steerable dish and 68-meter zenith antenna measuring ionospheric electron densities, temperatures, and electric fields.',
    agency: 'MIT Haystack Observatory / NSF'
  },
  {
    id: 'nexrad-katx',
    name: 'NEXRAD WSR-88D Seattle Doppler Weather Radar',
    callsign: 'KATX',
    type: 'nexrad_doppler',
    lat: 48.1947,
    lon: -122.4958,
    elevationM: 151,
    primaryFrequency: '2.7 – 3.0 GHz (S-Band Dual-Pol)',
    peakPowerMw: 0.75,
    pulseRepFreqHz: 1014,
    pulseWidthUs: 1.57,
    coverageRadiusKm: 460,
    operationalStatus: 'ACTIVE_PULSING',
    description: 'Dual-polarization Doppler weather radar tracking precipitation, wind shear, freezing level boundaries, and severe storm velocity profiles.',
    agency: 'NOAA / NWS'
  },
  {
    id: 'nexrad-klot',
    name: 'NEXRAD WSR-88D Chicago Doppler Weather Radar',
    callsign: 'KLOT',
    type: 'nexrad_doppler',
    lat: 41.6044,
    lon: -88.0847,
    elevationM: 202,
    primaryFrequency: '2.7 – 3.0 GHz (S-Band Dual-Pol)',
    peakPowerMw: 0.75,
    pulseRepFreqHz: 1014,
    pulseWidthUs: 1.57,
    coverageRadiusKm: 460,
    operationalStatus: 'ACTIVE_PULSING',
    description: 'Midwestern NEXRAD terminal Doppler observing supercells, lake effect squalls, meso-cyclones, and tornado vortex signatures.',
    agency: 'NOAA / NWS'
  },
  {
    id: 'nexrad-kokx',
    name: 'NEXRAD WSR-88D New York Doppler Weather Radar',
    callsign: 'KOKX',
    type: 'nexrad_doppler',
    lat: 40.8656,
    lon: -72.8639,
    elevationM: 40,
    primaryFrequency: '2.7 – 3.0 GHz (S-Band Dual-Pol)',
    peakPowerMw: 0.75,
    pulseRepFreqHz: 1014,
    pulseWidthUs: 1.57,
    coverageRadiusKm: 460,
    operationalStatus: 'ACTIVE_PULSING',
    description: 'Coastal dual-pol Doppler radar monitoring Atlantic nor\'easters, tropical cyclones, and precipitation phase transitions.',
    agency: 'NOAA / NWS'
  },
  {
    id: 'nexrad-ksox',
    name: 'NEXRAD WSR-88D Santa Ana Mountain Doppler Radar',
    callsign: 'KSOX',
    type: 'nexrad_doppler',
    lat: 33.8178,
    lon: -117.6358,
    elevationM: 928,
    primaryFrequency: '2.7 – 3.0 GHz (S-Band Dual-Pol)',
    peakPowerMw: 0.75,
    pulseRepFreqHz: 1014,
    pulseWidthUs: 1.57,
    coverageRadiusKm: 460,
    operationalStatus: 'ACTIVE_PULSING',
    description: 'Southern California high-elevation radar surveying Pacific atmospheric rivers, marine layer inversions, and Santa Ana wind patterns.',
    agency: 'NOAA / NWS'
  },
  {
    id: 'nexrad-kftg',
    name: 'NEXRAD WSR-88D Denver Front Range Radar',
    callsign: 'KFTG',
    type: 'nexrad_doppler',
    lat: 39.7867,
    lon: -104.5458,
    elevationM: 1675,
    primaryFrequency: '2.7 – 3.0 GHz (S-Band Dual-Pol)',
    peakPowerMw: 0.75,
    pulseRepFreqHz: 1014,
    pulseWidthUs: 1.57,
    coverageRadiusKm: 460,
    operationalStatus: 'ACTIVE_PULSING',
    description: 'High-plains radar tracking severe orographic hail cores, microbursts, and Rocky Mountain snowpack fronts.',
    agency: 'NOAA / NWS'
  }
];

export interface RadarGeoJSONPayload {
  stations: GeoJSON.FeatureCollection;
  rangeRings: GeoJSON.FeatureCollection;
  sweepBeams: GeoJSON.FeatureCollection;
}

export function generateAtmosphericRadarGeoJSON(sweepAngleDeg: number = 0): RadarGeoJSONPayload {
  const stationFeatures: GeoJSON.Feature[] = [];
  const ringFeatures: GeoJSON.Feature[] = [];
  const sweepFeatures: GeoJSON.Feature[] = [];

  ATMOSPHERIC_RADAR_STATIONS.forEach((station) => {
    // 1. Station Point Feature
    stationFeatures.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [station.lon, station.lat]
      },
      properties: {
        id: station.id,
        name: station.name,
        callsign: station.callsign,
        stationType: station.type,
        elevationM: station.elevationM,
        frequency: station.primaryFrequency,
        peakPowerMw: station.peakPowerMw,
        pulseRepFreqHz: station.pulseRepFreqHz,
        pulseWidthUs: station.pulseWidthUs,
        operationalStatus: station.operationalStatus,
        agency: station.agency,
        description: station.description,
        icon: station.type === 'ionospheric_research' ? '⚛️' : station.type === 'superdarn_hf' ? '📡' : '🛰️',
        color: station.type === 'ionospheric_research' ? '#ec4899' : station.type === 'superdarn_hf' ? '#06b6d4' : '#10b981'
      }
    });

    // 2. Pulse Range Rings (e.g. 150km and coverage radius)
    const ringRadiiKm = [150, Math.min(station.coverageRadiusKm, 500)];
    ringRadiiKm.forEach((radiusKm) => {
      const coords: number[][] = [];
      const steps = 48;
      const degRadius = radiusKm / 111.32; // Approx degrees
      const cosLat = Math.cos(station.lat * (Math.PI / 180));

      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * 2 * Math.PI;
        const lon = station.lon + (Math.sin(theta) * degRadius) / cosLat;
        const lat = station.lat + Math.cos(theta) * degRadius;
        coords.push([Math.round(lon * 10000) / 10000, Math.round(lat * 10000) / 10000]);
      }

      ringFeatures.push({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coords
        },
        properties: {
          stationId: station.id,
          radiusKm,
          stationType: station.type,
          color: station.type === 'ionospheric_research' ? '#ec4899' : station.type === 'superdarn_hf' ? '#06b6d4' : '#10b981'
        }
      });
    });

    // 3. Rotating Radar Sweep Beam Line & Sector
    const beamRadiusKm = Math.min(station.coverageRadiusKm, 450);
    const degRadius = beamRadiusKm / 111.32;
    const cosLat = Math.cos(station.lat * (Math.PI / 180));
    const rad = ((sweepAngleDeg + (station.lon % 360)) % 360) * (Math.PI / 180);

    const endLon = station.lon + (Math.sin(rad) * degRadius) / cosLat;
    const endLat = station.lat + Math.cos(rad) * degRadius;

    sweepFeatures.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [station.lon, station.lat],
          [Math.round(endLon * 10000) / 10000, Math.round(endLat * 10000) / 10000]
        ]
      },
      properties: {
        stationId: station.id,
        sweepAngleDeg: Math.round(sweepAngleDeg),
        color: station.type === 'ionospheric_research' ? '#f472b6' : station.type === 'superdarn_hf' ? '#22d3ee' : '#34d399'
      }
    });
  });

  return {
    stations: { type: 'FeatureCollection', features: stationFeatures },
    rangeRings: { type: 'FeatureCollection', features: ringFeatures },
    sweepBeams: { type: 'FeatureCollection', features: sweepFeatures }
  };
}
