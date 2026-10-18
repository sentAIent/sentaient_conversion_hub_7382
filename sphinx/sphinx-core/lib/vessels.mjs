import fetch from "node-fetch";

function getShipType(t) {
  if (!t) return "Vessel";
  if (t === 30) return "Commercial Fishing";
  if (t === 31 || t === 32 || t === 52) return "Tug / Towing";
  if (t === 36) return "Sailing Vessel";
  if (t === 37) return "Pleasure Craft / Yacht";
  if (t >= 40 && t <= 49) return "High-Speed Craft";
  if (t === 50) return "Pilot Vessel";
  if (t === 51) return "Search & Rescue";
  if (t === 55) return "Law Enforcement / Patrol";
  if (t >= 60 && t <= 69) return "Passenger / Ferry";
  if (t >= 70 && t <= 79) return "Cargo / Container";
  if (t >= 80 && t <= 89) return "Tanker";
  return "Special Craft (" + t + ")";
}

export class AisVesselsService {
  constructor() {
    this.cachedVessels = null;
    this.lastFetchTime = 0;
    this.lastBbox = null;
  }

  async fetchVessels(bboxString = null) {
    const now = Date.now();
    if (this.cachedVessels && (now - this.lastFetchTime < 15000) && this.lastBbox === bboxString) {
      return this.cachedVessels;
    }

    let minLat = 38.0, maxLat = 40.0, minLon = -77.5, maxLon = -75.5;
    if (bboxString) {
      const parts = bboxString.split(',').map(Number);
      if (parts.length === 4 && !parts.some(isNaN)) {
        if (Math.abs(parts[0]) > 90 && Math.abs(parts[1]) <= 90) {
          minLon = Math.min(parts[0], parts[2]);
          maxLon = Math.max(parts[0], parts[2]);
          minLat = Math.min(parts[1], parts[3]);
          maxLat = Math.max(parts[1], parts[3]);
        } else if (Math.abs(parts[1]) > 90 && Math.abs(parts[0]) <= 90) {
          minLat = Math.min(parts[0], parts[2]);
          maxLat = Math.max(parts[0], parts[2]);
          minLon = Math.min(parts[1], parts[3]);
          maxLon = Math.max(parts[1], parts[3]);
        } else {
          minLon = Math.min(parts[0], parts[2]);
          maxLon = Math.max(parts[0], parts[2]);
          minLat = Math.min(parts[1], parts[3]);
          maxLat = Math.max(parts[1], parts[3]);
        }
      }
    }

    const latSpan = maxLat - minLat;
    const lonSpan = maxLon - minLon;
    let queryMinLat = minLat, queryMaxLat = maxLat, queryMinLon = minLon, queryMaxLon = maxLon;
    if (latSpan > 8 || lonSpan > 8) {
      const midLat = (minLat + maxLat) / 2;
      const midLon = (minLon + maxLon) / 2;
      queryMinLat = Math.max(-90, midLat - 4);
      queryMaxLat = Math.min(90, midLat + 4);
      queryMinLon = Math.max(-180, midLon - 4);
      queryMaxLon = Math.min(180, midLon + 4);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const url = `https://ais.openwaters.io/v1/vessels?bbox=${queryMinLat.toFixed(4)},${queryMinLon.toFixed(4)},${queryMaxLat.toFixed(4)},${queryMaxLon.toFixed(4)}`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        if (this.cachedVessels) return this.cachedVessels;
        return { type: 'FeatureCollection', features: [] };
      }

      const data = await res.json();
      const features = (data.features || []).map(f => {
        const p = f.properties || {};
        const coords = f.geometry?.coordinates || [0, 0];
        const speed = p.sog !== undefined ? p.sog : 0;
        const heading = p.cog !== undefined ? p.cog : (p.heading !== undefined ? p.heading : 0);
        return {
          type: 'Feature',
          id: 'vessel-' + (p.mmsi || f.id),
          properties: {
            id: 'vessel-' + (p.mmsi || f.id),
            mmsi: p.mmsi || f.id,
            name: p.name || ('VESSEL ' + (p.mmsi || f.id)),
            ship_type: getShipType(p.type),
            speed_knots: speed,
            true_heading: heading,
            callsign: p.callsign || '',
            destination: p.destination || '',
            length_meters: p.length || 0,
            status: speed > 0.5 ? 'Under way' : 'Moored / At anchor',
            flag: p.flag || 'US',
            type: 'vessel'
          },
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        };
      });

      this.cachedVessels = { type: 'FeatureCollection', features };
      this.lastFetchTime = now;
      this.lastBbox = bboxString;
      return this.cachedVessels;
    } catch (err) {
      console.warn('[Sphinx Vessels] Live AIS query error:', err.message);
      if (this.cachedVessels) return this.cachedVessels;
      return { type: 'FeatureCollection', features: [] };
    }
  }
}
