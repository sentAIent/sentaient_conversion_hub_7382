// ResortPisteEngine.ts
// Universal Global Engine for Ski & Snowboard Trails, Pistes, and Chairlift Networks
// Orchestrates bundled offline high-fidelity datasets with on-demand dynamic Overpass API ingestion.

export interface PisteFeatureProperties {
  id: string;
  type: 'piste' | 'lift';
  name: string;
  resort?: string;
  difficulty?: 'easy' | 'intermediate' | 'advanced' | 'expert';
  difficulty_label?: string;
  difficulty_symbol?: string;
  piste_type?: string;
  gladed?: boolean;
  lit?: boolean;
  color: string;
  aerialway?: string;
  terrain_park?: boolean;
}

type DataListener = (data: GeoJSON.FeatureCollection) => void;

export class ResortPisteEngine {
  private static masterCollection: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };

  private static fetchedAreas: Set<string> = new Set();
  private static pendingFetches: Map<string, Promise<number>> = new Map();
  private static listeners: Set<DataListener> = new Set();
  private static initialized = false;

  private static OVERPASS_MIRRORS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter'
  ];

  public static init(initialData?: GeoJSON.FeatureCollection): void {
    if (initialData && Array.isArray(initialData.features) && initialData.features.length > 0) {
      this.masterCollection = {
        type: 'FeatureCollection',
        features: [...initialData.features]
      };
      this.initialized = true;
      this.notifyListeners();
    }
  }

  public static getGeoJSON(): GeoJSON.FeatureCollection {
    return this.masterCollection;
  }

  public static subscribe(listener: DataListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private static notifyListeners(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.masterCollection);
      } catch (err) {
        console.warn('[ResortPisteEngine] Listener error', err);
      }
    }
  }

  public static getStatsForLocation(lat: number, lon: number, radiusDeg = 0.05): {
    runs: number;
    lifts: number;
    easy: number;
    intermediate: number;
    advanced: number;
    expert: number;
  } {
    let runs = 0;
    let lifts = 0;
    let easy = 0;
    let intermediate = 0;
    let advanced = 0;
    let expert = 0;

    for (const f of this.masterCollection.features) {
      const coords = (f.geometry as any)?.coordinates;
      if (!Array.isArray(coords) || coords.length === 0) continue;
      const firstPt = Array.isArray(coords[0]) ? coords[0] : null;
      if (!firstPt) continue;

      const pLng = firstPt[0];
      const pLat = firstPt[1];
      if (Math.abs(pLat - lat) <= radiusDeg && Math.abs(pLng - lon) <= radiusDeg) {
        if (f.properties?.type === 'lift') {
          lifts++;
        } else if (f.properties?.type === 'piste') {
          runs++;
          const d = f.properties.difficulty;
          if (d === 'easy') easy++;
          else if (d === 'intermediate') intermediate++;
          else if (d === 'advanced') advanced++;
          else if (d === 'expert') expert++;
        }
      }
    }

    return { runs, lifts, easy, intermediate, advanced, expert };
  }

  /**
   * Dynamically ingest trails and lifts from OpenStreetMap Overpass API for a resort
   */
  public static async fetchPistesForResort(lat: number, lon: number, resortName?: string): Promise<number> {
    if (isNaN(lat) || isNaN(lon)) return 0;

    // Quantize key to ~3km grid cell
    const cellKey = `${lat.toFixed(2)}_${lon.toFixed(2)}`;
    if (this.fetchedAreas.has(cellKey)) {
      return 0;
    }

    if (this.pendingFetches.has(cellKey)) {
      return this.pendingFetches.get(cellKey)!;
    }

    const fetchPromise = (async () => {
      this.fetchedAreas.add(cellKey);
      const deltaLat = 0.045;
      const deltaLon = 0.055;
      const south = (lat - deltaLat).toFixed(4);
      const north = (lat + deltaLat).toFixed(4);
      const west = (lon - deltaLon).toFixed(4);
      const east = (lon + deltaLon).toFixed(4);
      const bboxStr = `${south},${west},${north},${east}`;

      const query = `[out:json][timeout:12];(way["piste:type"](${bboxStr});way["aerialway"](${bboxStr}););out geom;`;

      let elements: any[] = [];

      for (const mirror of this.OVERPASS_MIRRORS) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1500);

          const res = await fetch(mirror, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `data=${encodeURIComponent(query)}`,
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.elements) && data.elements.length > 0) {
              elements = data.elements;
              break;
            }
          }
        } catch (e) {
          // Fall through to next mirror
        }
      }

      if (elements.length === 0) {
        this.pendingFetches.delete(cellKey);
        return 0;
      }

      const existingIds = new Set(this.masterCollection.features.map(f => f.properties?.id));
      const newFeatures: GeoJSON.Feature[] = [];

      for (const el of elements) {
        if (!el.geometry || !Array.isArray(el.geometry) || el.geometry.length < 2) continue;
        const coords = el.geometry.map((pt: any) => [pt.lon, pt.lat]);
        const tags = el.tags || {};
        const id = `osm-${el.id}`;

        if (existingIds.has(id)) continue;

        if (tags.aerialway) {
          newFeatures.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coords
            },
            properties: {
              id,
              type: 'lift',
              name: tags.name || `${tags.aerialway.replace(/_/g, ' ')} Lift`,
              resort: resortName || tags.operator || 'Mountain Resort',
              aerialway: tags.aerialway,
              color: '#fbbf24'
            }
          });
          existingIds.add(id);
        } else if (tags['piste:type']) {
          const diffRaw = (tags['piste:difficulty'] || '').toLowerCase();
          let difficulty: 'easy' | 'intermediate' | 'advanced' | 'expert' = 'intermediate';
          let label = 'Blue (Intermediate)';
          let symbol = '🟦';
          let color = '#0284c7';

          if (diffRaw === 'novice' || diffRaw === 'easy' || diffRaw === 'green') {
            difficulty = 'easy';
            label = 'Green (Beginner)';
            symbol = '🟢';
            color = '#22c55e';
          } else if (diffRaw === 'advanced' || diffRaw === 'red' || diffRaw === 'black') {
            difficulty = 'advanced';
            label = 'Black (Advanced)';
            symbol = '◆';
            color = '#0f172a';
          } else if (diffRaw === 'expert' || diffRaw === 'freeride' || diffRaw === 'double_black') {
            difficulty = 'expert';
            label = 'Double Black (Expert)';
            symbol = '◆◆';
            color = '#ef4444';
          }

          newFeatures.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coords
            },
            properties: {
              id,
              type: 'piste',
              name: tags.name || `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Piste`,
              resort: resortName || tags.operator || 'Mountain Resort',
              difficulty,
              difficulty_label: label,
              difficulty_symbol: symbol,
              piste_type: tags['piste:type'] || 'downhill',
              lit: tags.lit === 'yes',
              gladed: tags['piste:grooming'] === 'backcountry' || tags['piste:grooming'] === 'mogul',
              color,
              terrain_park: tags['piste:type'] === 'snow_park' || tags['piste:type'] === 'halfpipe'
            }
          });
          existingIds.add(id);
        }
      }

      if (newFeatures.length > 0) {
        this.masterCollection = {
          type: 'FeatureCollection',
          features: [...this.masterCollection.features, ...newFeatures]
        };
        this.notifyListeners();
      }

      this.pendingFetches.delete(cellKey);
      return newFeatures.length;
    })();

    this.pendingFetches.set(cellKey, fetchPromise);
    return fetchPromise;
  }
}
