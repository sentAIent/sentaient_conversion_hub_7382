// sphinx-core/lib/weather_radar.mjs
// Real-time weather radar tile resolver (RainViewer / NOAA composite API)

import fetch from 'node-fetch';

export class WeatherRadarService {
  constructor() {
    this.cache = null;
    this.lastFetch = 0;
    this.cacheTtlMs = 180000; // 3 minutes
  }

  async getLatestRadarTileUrl() {
    const now = Date.now();
    if (this.cache && (now - this.lastFetch) < this.cacheTtlMs) {
      return this.cache;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('https://api.rainviewer.com/public/weather-maps.json', {
        headers: {
          'User-Agent': 'SphinxTactical/2.0 (OSINT Radar Composite)'
        },
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const host = data.host || 'https://tilecache.rainviewer.com';
        const past = data.radar?.past || [];
        if (past.length > 0) {
          const latest = past[past.length - 1];
          const tileUrl = `${host}${latest.path}/256/{z}/{x}/{y}/2/1_1.png`;
          this.cache = {
            success: true,
            tileUrl,
            timestamp: latest.time,
            colorScheme: 'RainViewer-Tactical-Smooth',
            availableFrames: past.length
          };
          this.lastFetch = now;
          return this.cache;
        }
      }
    } catch (err) {
      // Fallback below
    }

    // Static fallback using standard RainViewer timestamp estimate
    const roundedTime = Math.floor(now / 600000) * 600; // 10-minute round
    this.cache = {
      success: true,
      tileUrl: `https://tilecache.rainviewer.com/v2/radar/${roundedTime}/256/{z}/{x}/{y}/2/1_1.png`,
      timestamp: roundedTime,
      colorScheme: 'RainViewer-Tactical-Smooth',
      fallback: true
    };
    this.lastFetch = now;
    return this.cache;
  }
}
