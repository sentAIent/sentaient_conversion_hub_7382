// src/lib/maps/pmtilesProtocol.ts
// PMTiles / ProtoMaps Offline Single-File Vector Map Protocol Registration for MapLibre GL

export function registerPmtilesProtocol(maplibregl: any): void {
  if (!maplibregl || typeof maplibregl.addProtocol !== 'function') return;

  // Custom range-request protocol for pmtiles:// URLs
  try {
    maplibregl.addProtocol('pmtiles', (params: { url: string }, abortController: AbortController) => {
      // Strips pmtiles:// scheme and fetches via standard HTTP range header or local blob
      const rawUrl = params.url.replace(/^pmtiles:\/\//, '');
      return fetch(rawUrl, {
        signal: abortController.signal,
        headers: { Accept: 'application/x-protobuf, application/octet-stream, */*' }
      }).then(res => {
        if (!res.ok) {
          throw new Error(`PMTiles HTTP ${res.status}: ${res.statusText}`);
        }
        return res.arrayBuffer().then(data => ({ data }));
      });
    });
  } catch {
    // Protocol already registered or running in SSR
  }
}

export interface OfflineMapPack {
  id: string;
  name: string;
  region: string;
  sizeMb: number;
  url: string;
  format: 'PMTILES' | 'MBTILES' | 'GEOJSON';
}

export const REGIONAL_NOMAD_MAP_PACKS: OfflineMapPack[] = [
  {
    id: 'pack-norcal',
    name: 'Northern California & Sierra Nevada Vector Grid',
    region: 'California, US',
    sizeMb: 1420,
    url: 'http://nomad.local:8080/maps/norcal.pmtiles',
    format: 'PMTILES'
  },
  {
    id: 'pack-socal',
    name: 'Southern California & Baja Frontier Vector Grid',
    region: 'California, US',
    sizeMb: 1280,
    url: 'http://nomad.local:8080/maps/socal.pmtiles',
    format: 'PMTILES'
  },
  {
    id: 'pack-pnw',
    name: 'Pacific Northwest Cascades & Puget Sound',
    region: 'Washington / Oregon, US',
    sizeMb: 1650,
    url: 'http://nomad.local:8080/maps/pnw.pmtiles',
    format: 'PMTILES'
  },
  {
    id: 'pack-rockies',
    name: 'Central Rocky Mountain High Country',
    region: 'Colorado / Utah, US',
    sizeMb: 1190,
    url: 'http://nomad.local:8080/maps/rockies.pmtiles',
    format: 'PMTILES'
  }
];
