/**
 * offlineGisCacheEngine.ts
 * SPHINX Tactical Offline GIS & Tile Caching Engine
 * Manages client-side CacheStorage and IndexedDB persistence for offline vector/raster
 * map tiles and critical national GeoJSON datasets (borders, public lands, infrastructure,
 * water supplies, hospitals, toxic plumes) for grid-down black-sky scenarios.
 */

export interface GisLayerCacheTarget {
  id: string;
  name: string;
  url: string;
  category: 'base_boundaries' | 'critical_infrastructure' | 'survival_assets' | 'environmental_hazards';
  approxSizeKb: number;
  description: string;
}

export const CRITICAL_GEOJSON_TARGETS: GisLayerCacheTarget[] = [
  {
    id: 'boundaries_states',
    name: 'US State & Provincial Boundaries',
    url: '/data/boundaries_states.geojson',
    category: 'base_boundaries',
    approxSizeKb: 1240,
    description: 'State lines, jurisdictional bounds, and administrative boundaries.'
  },
  {
    id: 'boundaries_countries',
    name: 'International National Borders',
    url: '/data/boundaries_countries.geojson',
    category: 'base_boundaries',
    approxSizeKb: 1850,
    description: 'Global sovereign territorial boundaries and maritime baselines.'
  },
  {
    id: 'critical_infrastructure',
    name: 'National Critical Infrastructure',
    url: '/data/critical_infrastructure_global.geojson',
    category: 'critical_infrastructure',
    approxSizeKb: 920,
    description: 'Power plants, high-voltage corridors, water treatment, and refineries.'
  },
  {
    id: 'data_centers',
    name: 'Global Data Centers & IXPs',
    url: '/data/data_centers_global.geojson',
    category: 'critical_infrastructure',
    approxSizeKb: 480,
    description: 'Cloud hyperscalers, carrier-neutral facilities, and internet exchanges.'
  },
  {
    id: 'submarine_cables',
    name: 'Submarine Fiber Landing Points & Cables',
    url: '/data/submarine_cables.geojson',
    category: 'critical_infrastructure',
    approxSizeKb: 650,
    description: 'Transoceanic telecommunication cables and coastal landing stations.'
  },
  {
    id: 'public_lands',
    name: 'Federal Public Lands & BLM Territories',
    url: '/data/public_lands_global.geojson',
    category: 'survival_assets',
    approxSizeKb: 1450,
    description: 'Dispersed camping, BLM zones, USFS national forests, and unmonitored refuges.'
  },
  {
    id: 'civil_preparedness',
    name: 'Civil Preparedness & Survival Catalog',
    url: '/data/civil_preparedness_catalog.json',
    category: 'survival_assets',
    approxSizeKb: 840,
    description: 'Survival caches, emergency repeaters, natural drinking springs, and trauma hubs.'
  },
  {
    id: 'toxic_sites',
    name: 'EPA Superfund Toxic Sites & Plumes',
    url: '/data/toxic_sites_global.geojson',
    category: 'environmental_hazards',
    approxSizeKb: 520,
    description: 'Active contamination zones, volatile solvent plumes, and radioactive dumps.'
  },
  {
    id: 'wildfires_baseline',
    name: 'Continental Wildfire Perimeter Baseline',
    url: '/data/wildfires.geojson',
    category: 'environmental_hazards',
    approxSizeKb: 310,
    description: 'Satellite thermal anomaly hot zones, fire perimeters, and burn scars.'
  }
];

export interface GisCacheSummary {
  isFullyCached: boolean;
  cachedLayersCount: number;
  totalLayersCount: number;
  totalCachedBytes: number;
  lastCachedTimestamp: number | null;
  cachedLayerIds: string[];
}

const CACHE_NAME = 'sphinx_gis_vault_v1';
const META_KEY = 'sphinx_gis_meta_v1';

export class OfflineGisCacheEngine {
  /**
   * Check if CacheStorage API is supported in the current browser
   */
  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'caches' in window;
  }

  /**
   * Returns current caching status of all GIS datasets
   */
  public static async getCacheSummary(): Promise<GisCacheSummary> {
    if (!this.isSupported()) {
      return {
        isFullyCached: false,
        cachedLayersCount: 0,
        totalLayersCount: CRITICAL_GEOJSON_TARGETS.length,
        totalCachedBytes: 0,
        lastCachedTimestamp: null,
        cachedLayerIds: []
      };
    }

    try {
      const cache = await caches.open(CACHE_NAME);
      const cachedLayerIds: string[] = [];
      let totalBytes = 0;

      for (const target of CRITICAL_GEOJSON_TARGETS) {
        const match = await cache.match(target.url);
        if (match) {
          cachedLayerIds.push(target.id);
          const blob = await match.clone().blob();
          totalBytes += blob.size;
        }
      }

      const metaRaw = localStorage.getItem(META_KEY);
      const lastCachedTimestamp = metaRaw ? parseInt(metaRaw, 10) : null;

      return {
        isFullyCached: cachedLayerIds.length === CRITICAL_GEOJSON_TARGETS.length,
        cachedLayersCount: cachedLayerIds.length,
        totalLayersCount: CRITICAL_GEOJSON_TARGETS.length,
        totalCachedBytes: totalBytes,
        lastCachedTimestamp,
        cachedLayerIds
      };
    } catch (e) {
      console.warn('[OfflineGisCache] Failed to retrieve cache summary:', e);
      return {
        isFullyCached: false,
        cachedLayersCount: 0,
        totalLayersCount: CRITICAL_GEOJSON_TARGETS.length,
        totalCachedBytes: 0,
        lastCachedTimestamp: null,
        cachedLayerIds: []
      };
    }
  }

  /**
   * Batch download and cache all critical GeoJSON layers into CacheStorage
   */
  public static async downloadAllLayers(
    onProgress?: (progressPct: number, currentLayer: string) => void
  ): Promise<{ success: boolean; totalBytes: number; layerCount: number; error?: string }> {
    if (!this.isSupported()) {
      return { success: false, totalBytes: 0, layerCount: 0, error: 'CacheStorage API not supported.' };
    }

    try {
      const cache = await caches.open(CACHE_NAME);
      let totalBytes = 0;
      let completedCount = 0;

      for (const target of CRITICAL_GEOJSON_TARGETS) {
        if (onProgress) {
          const pct = Math.round((completedCount / CRITICAL_GEOJSON_TARGETS.length) * 100);
          onProgress(pct, target.name);
        }

        try {
          const res = await fetch(target.url, { cache: 'no-cache' });
          if (res.ok) {
            const clone = res.clone();
            const blob = await clone.blob();
            totalBytes += blob.size;
            await cache.put(target.url, res);
            completedCount++;
          }
        } catch (fetchErr) {
          console.warn(`[OfflineGisCache] Error caching layer ${target.id}:`, fetchErr);
        }
      }

      localStorage.setItem(META_KEY, Date.now().toString());

      if (onProgress) {
        onProgress(100, 'Complete');
      }

      return {
        success: true,
        totalBytes,
        layerCount: completedCount
      };
    } catch (err: any) {
      console.error('[OfflineGisCache] Batch download failed:', err);
      return {
        success: false,
        totalBytes: 0,
        layerCount: 0,
        error: err.message || 'Unknown caching error'
      };
    }
  }

  /**
   * Wipe offline GIS cache
   */
  public static async clearGisCache(): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      await caches.delete(CACHE_NAME);
      localStorage.removeItem(META_KEY);
      return true;
    } catch (e) {
      console.error('[OfflineGisCache] Clear cache failed:', e);
      return false;
    }
  }
}
