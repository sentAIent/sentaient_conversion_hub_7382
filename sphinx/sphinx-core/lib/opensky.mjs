import fetch from 'node-fetch';

export class OpenSkyService {
  constructor() {
    this.baseUrl = 'https://opensky-network.org/api';
    this.boundingBox = 'lamin=38.8&lomin=-77.1&lamax=39.0&lomax=-76.9';
    this.cachedAircraft = null;
    this.lastFetchTime = 0;
    this.fetchPromise = null;
  }

  async fetchLiveAircraft(bboxString = null) {
    let query = this.boundingBox;
    let centerLat = 38.9072;
    let centerLon = -77.0369;

    let minLat, maxLat, minLon, maxLon;
    if (bboxString) {
      const [sw_lon, sw_lat, ne_lon, ne_lat] = bboxString.split(',');
      query = `lamin=${sw_lat}&lomin=${sw_lon}&lamax=${ne_lat}&lomax=${ne_lon}`;
      centerLat = (parseFloat(sw_lat) + parseFloat(ne_lat)) / 2;
      centerLon = (parseFloat(sw_lon) + parseFloat(ne_lon)) / 2;
      minLat = parseFloat(sw_lat); maxLat = parseFloat(ne_lat);
      minLon = parseFloat(sw_lon); maxLon = parseFloat(ne_lon);
    }

    const now = Date.now();
    if (this.cachedAircraft && (now - this.lastFetchTime) < 15000) {
      console.log('[Sphinx OSINT] Serving aircraft from 15s cache to prevent rate limiting');
      if (bboxString) {
        return this.cachedAircraft.filter(a => 
          a.latitude >= minLat && a.latitude <= maxLat &&
          a.longitude >= minLon && a.longitude <= maxLon
        );
      }
      return this.cachedAircraft;
    }

    if (this.fetchPromise) {
      console.log('[Sphinx OSINT] Awaiting existing OpenSky request...');
      await this.fetchPromise;
      if (bboxString && this.cachedAircraft) {
        return this.cachedAircraft.filter(a => 
          a.latitude >= minLat && a.latitude <= maxLat &&
          a.longitude >= minLon && a.longitude <= maxLon
        );
      }
      return this.cachedAircraft || [];
    }

    
    const headers = { 'User-Agent': 'SphinxOSINT/2.0' };
    if (process.env.OPENSKY_USERNAME && process.env.OPENSKY_PASSWORD) {
      const auth = Buffer.from(`${process.env.OPENSKY_USERNAME}:${process.env.OPENSKY_PASSWORD}`).toString('base64');
      headers['Authorization'] = `Basic ${auth}`;
      console.log('[Sphinx OSINT] Using authenticated OpenSky request.');
    }

    console.log(`[Sphinx OSINT] Fetching live aircraft data for area: ${query}...`);
    this.fetchPromise = (async () => {
      try {
        const response = await fetch(`${this.baseUrl}/states/all?${query}`, { headers });

        if (response.status === 429) {
          throw new Error(`OpenSky API Error: 429 Too Many Requests`);
        }
        if (!response.ok) {
          throw new Error(`OpenSky API Error: ${response.status}`);
        }
        const data = await response.json();
        
        const aircraft = (data.states || []).map(state => ({
          icao24: state[0],
          callsign: state[1] ? state[1].trim() : 'UNKNOWN',
          country: state[2],
          longitude: state[5],
          latitude: state[6],
          altitude_m: state[7],
          velocity_ms: state[9],
          true_track: state[10],
          squawk: state[14],
          spi: state[15]
        })).filter(a => a.latitude && a.longitude);

        console.log(`[Sphinx OSINT] Tracked ${aircraft.length} aircraft in airspace.`);
        
        this.cachedAircraft = aircraft;
        this.lastFetchTime = Date.now();
      
      } catch (error) {
        console.error('[Sphinx OSINT] Failed to fetch aircraft:', error.message);
        if (error.message.includes('429')) {
           console.log('[Sphinx OSINT] Rate limit hit. Backing off for 60 seconds.');
           this.lastFetchTime = Date.now() + 45000; // Fake the fetch time so it waits 60s total
        } else {
           this.lastFetchTime = Date.now();
        }
        if (!this.cachedAircraft) {

          this.cachedAircraft = [
            { icao24: "mock1", callsign: "MOCK01", country: "US", longitude: centerLon + 0.05, latitude: centerLat + 0.05, altitude_m: 5000, velocity_ms: 250, true_track: 45, squawk: "1200", spi: false },
            { icao24: "mock2", callsign: "MOCK02", country: "US", longitude: centerLon - 0.05, latitude: centerLat - 0.05, altitude_m: 4000, velocity_ms: 200, true_track: 270, squawk: "1200", spi: false },
            { icao24: "mock3", callsign: "MOCK03", country: "US", longitude: centerLon + 0.08, latitude: centerLat - 0.08, altitude_m: 3500, velocity_ms: 210, true_track: 315, squawk: "1200", spi: false }
          ];
        }
        this.lastFetchTime = Date.now();
      } finally {
        this.fetchPromise = null;
      }
    })();
    
    await this.fetchPromise;
    
    if (bboxString && this.cachedAircraft) {
      return this.cachedAircraft.filter(a => 
        a.latitude >= minLat && a.latitude <= maxLat &&
        a.longitude >= minLon && a.longitude <= maxLon
      );
    }
    return this.cachedAircraft || [];
  }
}
