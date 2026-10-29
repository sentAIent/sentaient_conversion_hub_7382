import fetch from 'node-fetch';


export class DisastersService {
  constructor() {
    this.nasaUrl = 'https://eonet.gsfc.nasa.gov/api/v3/events';
    this.usgsBaseUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';
    this.cache = {};
  }

  async fetchSevereWeather(timeframe = 'live') {
    const status = timeframe === 'historical' ? 'closed' : 'open';
    const days = timeframe === 'historical' ? 30 : 5;
    const cacheKey = `weather_${timeframe}`;
    
    if (this.cache[cacheKey] && (Date.now() - this.cache[cacheKey].time < 60000)) {
      console.log(`[Sphinx Disasters] Serving NASA EONET events from 60s cache`);
      return this.cache[cacheKey].data;
    }
    
    console.log(`[Sphinx Disasters] Fetching NASA EONET events (status=${status})`);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(`${this.nasaUrl}?status=${status}&days=${days}`, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`NASA EONET Error: ${response.status}`);
      const data = await response.json();
      
      const features = data.events.map(event => {
        const geom = event.geometry.find(g => g.type === 'Point');
        if (!geom) return null;

        return {
          type: 'Feature',
          properties: {
            type: 'severe_weather',
            id: event.id,
            title: event.title,
            categories: event.categories.map(c => c.title).join(', '),
            date: geom.date,
            magnitude: geom.magnitudeValue ? `${geom.magnitudeValue} ${geom.magnitudeUnit}` : 'N/A',
            source: event.sources[0]?.url || ''
          },
          geometry: {
            type: 'Point',
            coordinates: geom.coordinates
          }
        };
      }).filter(f => f !== null);

      console.log(`[Sphinx Disasters] Discovered ${features.length} NASA events.`);
      const result = { type: 'FeatureCollection', features };
      this.cache[cacheKey] = { time: Date.now(), data: result };
      return result;
    } catch (error) {
      console.error('[Sphinx Disasters] Failed to fetch NASA data:', error.message);
      return this.cache[cacheKey]?.data || { type: 'FeatureCollection', features: [] };
    }
  }

  async fetchEarthquakes(timeframe = 'live') {
    const endpoint = timeframe === 'historical' ? 'significant_month.geojson' : 'all_day.geojson';
    const url = `${this.usgsBaseUrl}/${endpoint}`;
    const cacheKey = `quakes_${timeframe}`;
    
    if (this.cache[cacheKey] && (Date.now() - this.cache[cacheKey].time < 60000)) {
      console.log(`[Sphinx Disasters] Serving USGS Earthquakes from 60s cache`);
      return this.cache[cacheKey].data;
    }
    
    console.log(`[Sphinx Disasters] Fetching USGS Earthquakes from ${endpoint}`);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`USGS Error: ${response.status}`);
      const data = await response.json();
      
      data.features = data.features.map(f => {
        f.properties.type = 'earthquake';
        return f;
      });

      console.log(`[Sphinx Disasters] Discovered ${data.features.length} USGS earthquakes.`);
      this.cache[cacheKey] = { time: Date.now(), data: data };
      return data;
    } catch (error) {
      console.error('[Sphinx Disasters] Failed to fetch USGS data:', error.message);
      return this.cache[cacheKey]?.data || { type: 'FeatureCollection', features: [] };
    }
  }
}
