// elevationHeatmapProtocol.ts
// Real-time GPU-accelerated raster protocol for continuous hypsometric elevation heatmaps.
// Fetches AWS Open Data Terrarium DEM tiles and recolors pixels according to the exact
// elevation gradient in the Sphinx Data Points Legend.

// Color ramp stops matching the Sphinx Data Points Legend:
// <0': #06b6d4 (Depression / Trench)
// 0–500': #10b981 (Lowlands)
// 500–2,000': #84cc16 (Plains)
// 2,000–4,500': #eab308 (Foothills)
// 4,500–8,000': #f97316 (Plateau)
// 8,000–13,000': #ef4444 (Montane)
// 13,000–19,000': #ec4899 (Alpine)
// 19,000–24,000': #a855f7 (Glacial)
// 24,000–26,000': #cbd5e1 (Himalayan)
// 29,000': #ffffff (Everest Peak)

interface ElevationColorStop {
  ft: number;
  r: number;
  g: number;
  b: number;
  a: number;
}

const ELEVATION_STOPS: ElevationColorStop[] = [
  { ft: -300,  r: 6,   g: 182, b: 212, a: 215 }, // #06b6d4 (Depression <0')
  { ft: 0,     r: 16,  g: 185, b: 129, a: 200 }, // #10b981 (Sea level / coastal plains)
  { ft: 500,   r: 16,  g: 185, b: 129, a: 195 }, // #10b981 (Lowlands 0-500')
  { ft: 2000,  r: 132, g: 204, b: 22,  a: 195 }, // #84cc16 (Plains 500-2,000')
  { ft: 4500,  r: 234, g: 179, b: 8,   a: 195 }, // #eab308 (Foothills 2k-4.5k')
  { ft: 8000,  r: 249, g: 115, b: 22,  a: 195 }, // #f97316 (Plateau 4.5k-8k')
  { ft: 13000, r: 239, g: 68,  b: 68,  a: 200 }, // #ef4444 (Montane 8k-13k')
  { ft: 19000, r: 236, g: 72,  b: 153, a: 210 }, // #ec4899 (Alpine 13k-19k')
  { ft: 24000, r: 168, g: 85,  b: 247, a: 220 }, // #a855f7 (Glacial 19k-24k')
  { ft: 26000, r: 203, g: 213, b: 225, a: 230 }, // #cbd5e1 (Himalayan 24k-26k')
  { ft: 29035, r: 255, g: 255, b: 255, a: 240 }  // #ffffff (Everest Peak 29k')
];

function interpolateElevationColor(feet: number): [number, number, number, number] {
  if (feet <= -500) {
    // Deep ocean transparent to preserve satellite water
    return [0, 0, 0, 0];
  }
  if (feet < -300) {
    const t = (feet - (-500)) / 200;
    return [6, 182, 212, Math.round(t * 215)];
  }
  if (feet >= 29035) {
    return [255, 255, 255, 240];
  }
  for (let i = 0; i < ELEVATION_STOPS.length - 1; i++) {
    const s0 = ELEVATION_STOPS[i];
    const s1 = ELEVATION_STOPS[i + 1];
    if (feet >= s0.ft && feet <= s1.ft) {
      const t = (feet - s0.ft) / (s1.ft - s0.ft);
      const r = Math.round(s0.r + t * (s1.r - s0.r));
      const g = Math.round(s0.g + t * (s1.g - s0.g));
      const b = Math.round(s0.b + t * (s1.b - s0.b));
      const a = Math.round(s0.a + t * (s1.a - s0.a));
      return [r, g, b, a];
    }
  }
  return [255, 255, 255, 240];
}

// Precompute 32-bit integer LUT (from -500m to 9000m) for sub-millisecond execution
const LUT_MIN_M = -500;
const LUT_MAX_M = 9000;
const LUT_OFFSET = -LUT_MIN_M;
const LUT_SIZE = LUT_MAX_M - LUT_MIN_M + 1;
let elevationLut32: Uint32Array | null = null;

function getElevationLut(): Uint32Array {
  if (elevationLut32) return elevationLut32;
  elevationLut32 = new Uint32Array(LUT_SIZE);
  for (let m = LUT_MIN_M; m <= LUT_MAX_M; m++) {
    const feet = m * 3.28084;
    const [r, g, b, a] = interpolateElevationColor(feet);
    // 32-bit Little-Endian packed ABGR format
    elevationLut32[m + LUT_OFFSET] = (a << 24) | (b << 16) | (g << 8) | r;
  }
  return elevationLut32;
}

let isProtocolRegistered = false;

/**
 * Registers the 'elevation-heat' custom tile protocol in MapLibre GL.
 * Intercepts 'elevation-heat://<url>' requests, pulls AWS Terrarium DEM tiles,
 * and recolors the elevation into the continuous hypsometric ramp.
 */
export function registerElevationHeatmapProtocol(maplibregl: any): void {
  if (typeof window === 'undefined' || !maplibregl || typeof maplibregl.addProtocol !== 'function') {
    return;
  }
  if (isProtocolRegistered || (maplibregl as any)._elevationHeatRegistered) {
    return;
  }
  isProtocolRegistered = true;
  (maplibregl as any)._elevationHeatRegistered = true;

  const lut = getElevationLut();

  maplibregl.addProtocol('elevation-heat', async (params: any, abortController: AbortController) => {
    const rawUrl = params.url.replace(/^elevation-heat:\/\//, '');

    try {
      const response = await fetch(rawUrl, {
        signal: abortController.signal,
        cache: 'force-cache'
      });

      if (!response.ok) {
        throw new Error(`Elevation tile HTTP error: ${response.status}`);
      }

      const blob = await response.blob();
      const rawBitmap = await createImageBitmap(blob);

      const width = rawBitmap.width || 256;
      const height = rawBitmap.height || 256;

      let canvas: any;
      let ctx: any;

      if (typeof OffscreenCanvas !== 'undefined') {
        canvas = new OffscreenCanvas(width, height);
        ctx = canvas.getContext('2d', { willReadFrequently: true });
      } else {
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d', { willReadFrequently: true });
      }

      if (!ctx) {
        rawBitmap.close?.();
        return { data: rawBitmap };
      }

      ctx.drawImage(rawBitmap, 0, 0);
      rawBitmap.close?.();

      const imgData = ctx.getImageData(0, 0, width, height);
      const data32 = new Uint32Array(imgData.data.buffer);
      const rawBytes = imgData.data;
      const pixelCount = width * height;

      for (let i = 0; i < pixelCount; i++) {
        const byteOffset = i * 4;
        const r = rawBytes[byteOffset];
        const g = rawBytes[byteOffset + 1];
        const b = rawBytes[byteOffset + 2];

        // Terrarium elevation decode formula:
        // elevation in meters = (r * 256 + g + b / 256) - 32768
        const meters = Math.round((r * 256 + g + b / 256) - 32768);

        if (meters < -500) {
          data32[i] = 0; // Transparent ocean
        } else if (meters >= 9000) {
          data32[i] = lut[LUT_SIZE - 1];
        } else {
          data32[i] = lut[meters + LUT_OFFSET];
        }
      }

      ctx.putImageData(imgData, 0, 0);

      let buf: ArrayBuffer;
      if (typeof canvas.convertToBlob === 'function') {
        const blob = await canvas.convertToBlob({ type: 'image/png' });
        buf = await blob.arrayBuffer();
      } else if (typeof canvas.toBlob === 'function') {
        const blob: any = await new Promise((res, rej) => {
          canvas.toBlob((b: any) => b ? res(b) : rej(new Error('toBlob failed')), 'image/png');
        });
        buf = await blob.arrayBuffer();
      } else {
        throw new Error('Canvas convertToBlob/toBlob not available');
      }

      return { data: buf };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw err;
      }
      console.warn('[ElevationHeatmapProtocol] Tile render error:', err);
      // Minimal valid 1x1 transparent PNG buffer fallback
      const transparentPng = new Uint8Array([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
        0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
        0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49,
        0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82
      ]);
      return { data: transparentPng.buffer };
    }
  });
}
