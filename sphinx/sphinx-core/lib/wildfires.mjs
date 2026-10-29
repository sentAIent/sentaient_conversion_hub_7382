import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class WildfiresService {
  constructor() {
    this.firmsUrls = [
      { url: "https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_USA_contiguous_and_Hawaii_24h.csv", sat: "Suomi-NPP VIIRS" },
      { url: "https://firms.modaps.eosdis.nasa.gov/data/active_fire/noaa-20-viirs-c2/csv/J1_VIIRS_C2_USA_contiguous_and_Hawaii_24h.csv", sat: "NOAA-20 VIIRS" },
      { url: "https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/csv/MODIS_C6_1_USA_contiguous_and_Hawaii_24h.csv", sat: "MODIS" }
    ];
    this.wfigsUrl = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/WFIGS_Incident_Locations_Current/FeatureServer/0/query?where=1%3D1&outFields=*&f=geojson";
    this.cacheFilePath = path.resolve(__dirname, "../data/wildfires_cache.json");
    this.cache = null;
    this.cacheTime = 0;
    this.loadDiskCache();
  }

  _enrichAge(feature, now = Date.now()) {
    const p = feature?.properties;
    if (!p) return;
    if (p.acq_date && p.acq_time) {
      const tClean = String(p.acq_time).replace(":", "").padStart(4, "0");
      p.acq_datetime_iso = `${p.acq_date}T${tClean.slice(0, 2)}:${tClean.slice(2, 4)}:00Z`;
      const ts = Date.parse(p.acq_datetime_iso);
      p.age_hours = ts && !isNaN(ts) ? Math.max(0, Math.round(((now - ts) / (1000 * 3600)) * 10) / 10) : 12;
    } else if (p.acq_date) {
      p.acq_datetime_iso = `${p.acq_date}T00:00:00Z`;
      const ts = Date.parse(p.acq_datetime_iso);
      p.age_hours = ts && !isNaN(ts) ? Math.max(0, Math.round(((now - ts) / (1000 * 3600)) * 10) / 10) : 12;
    } else {
      p.age_hours = 12;
    }
  }

  loadDiskCache() {
    try {
      if (fs.existsSync(this.cacheFilePath)) {
        const raw = fs.readFileSync(this.cacheFilePath, "utf8");
        const parsed = JSON.parse(raw);
        if (parsed?.features?.length > 0) {
          const now = Date.now();
          parsed.features.forEach(f => this._enrichAge(f, now));
          this.cache = parsed;
          this.cacheTime = Date.now() - 300000; // Allow refresh after 5m
          console.log(`[Sphinx Wildfires] Loaded ${parsed.features.length} active fires from disk cache.`);
        }
      }
    } catch (e) {
      console.warn("[Sphinx Wildfires] Could not load disk cache:", e.message);
    }
  }

  async fetchWildfires(force = false, ageMax = null) {
    const now = Date.now();
    const filterByAge = (fc) => {
      if (!fc?.features) return fc;
      if (ageMax !== null && !isNaN(Number(ageMax))) {
        return { ...fc, features: fc.features.filter(f => (f.properties?.age_hours ?? 12) <= Number(ageMax)) };
      }
      return fc;
    };
    if (!force && this.cache && (now - this.cacheTime < 600000)) {
      this.cache.features.forEach(f => this._enrichAge(f, now));
      console.log("[Sphinx Wildfires] Serving 24h NASA FIRMS active fires from 10m cache (" + this.cache.features.length + " points)");
      return filterByAge(this.cache);
    }

    console.log("[Sphinx Wildfires] Fetching fresh NASA VIIRS/MODIS & NIFC/WFIGS active fire feeds...");
    try {
      const features = [];

      // 1. Ingest NASA FIRMS thermal anomaly feeds (VIIRS 375m & MODIS 1km)
      await Promise.all(this.firmsUrls.map(async ({ url, sat }) => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000);
          const res = await fetch(url, {
            headers: { "User-Agent": "SphinxTactical/2.0" },
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (!res.ok) return;
          const csvText = await res.text();
          const lines = csvText.trim().split("\n");
          if (lines.length < 2) return;

          const headers = lines[0].split(",").map(h => h.trim());
          const latIdx = headers.indexOf("latitude");
          const lonIdx = headers.indexOf("longitude");
          const brightIdx = headers.indexOf("bright_ti4") !== -1 ? headers.indexOf("bright_ti4") : headers.indexOf("brightness");
          const frpIdx = headers.indexOf("frp");
          const confIdx = headers.indexOf("confidence");
          const dateIdx = headers.indexOf("acq_date");
          const timeIdx = headers.indexOf("acq_time");
          const daynightIdx = headers.indexOf("daynight");

          for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(",");
            if (row.length <= lonIdx) continue;
            const lat = parseFloat(row[latIdx]);
            const lon = parseFloat(row[lonIdx]);
            if (isNaN(lat) || isNaN(lon)) continue;

            const frp = frpIdx !== -1 ? parseFloat(row[frpIdx]) || 10 : 10;
            const brightness = brightIdx !== -1 ? parseFloat(row[brightIdx]) || 300 : 300;
            let confidence = 50;
            if (confIdx !== -1) {
              const cVal = row[confIdx];
              if (cVal === "h") confidence = 90;
              else if (cVal === "n") confidence = 60;
              else if (cVal === "l") confidence = 30;
              else confidence = parseInt(cVal, 10) || 50;
            }

            features.push({
              type: "Feature",
              properties: {
                id: `fire-${sat}-${i}`,
                type: "wildfire",
                satellite: sat,
                frp,
                brightness,
                confidence,
                acq_date: dateIdx !== -1 ? row[dateIdx] : "",
                acq_time: timeIdx !== -1 ? row[timeIdx] : "",
                daynight: daynightIdx !== -1 ? row[daynightIdx] : "D"
              },
              geometry: {
                type: "Point",
                coordinates: [lon, lat]
              }
            });
          }
        } catch (e) {
          console.warn(`[Sphinx Wildfires] Error fetching ${sat} feed:`, e.message);
        }
      }));

      // 2. Ingest NIFC / WFIGS official wildland fire incident commands
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);
        const res = await fetch(this.wfigsUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          for (const f of data.features || []) {
            const p = f.properties || {};
            const coords = f.geometry?.coordinates;
            if (!coords || isNaN(coords[0]) || isNaN(coords[1])) continue;
            const acres = p.DailyAcres || p.IncidentSize || p.DiscoveryAcres || 0;

            features.push({
              type: "Feature",
              properties: {
                id: `wfigs-${p.UniqueFireIdentifier || p.OBJECTID || f.id}`,
                type: "wildfire",
                incident_name: p.IncidentName || "Wildfire Incident",
                acres: acres,
                containment: p.PercentContained !== null && p.PercentContained !== undefined ? p.PercentContained : null,
                satellite: "NIFC / WFIGS Incident Command",
                frp: Math.max(80, Math.min(500, (acres || 25) * 2)),
                brightness: 350,
                confidence: 100,
                acq_date: p.FireDiscoveryDateTime ? new Date(p.FireDiscoveryDateTime).toISOString().split("T")[0] : "",
                acq_time: p.FireDiscoveryDateTime ? new Date(p.FireDiscoveryDateTime).toISOString().split("T")[1].slice(0, 5) : "",
                daynight: "D"
              },
              geometry: {
                type: "Point",
                coordinates: coords
              }
            });
          }
        }
      } catch (e) {
        console.warn("[Sphinx Wildfires] Error fetching WFIGS incident feed:", e.message);
      }

      if (features.length > 0) {
        console.log("[Sphinx Wildfires] Ingested " + features.length + " active thermal fire hotspots and incident perimeters.");
        features.forEach(f => this._enrichAge(f, now));
        this.cache = { type: "FeatureCollection", features };
        this.cacheTime = now;
        try {
          fs.writeFileSync(this.cacheFilePath, JSON.stringify(this.cache), "utf8");
        } catch (saveErr) {
          console.warn("[Sphinx Wildfires] Failed to write disk cache:", saveErr.message);
        }
        return filterByAge(this.cache);
      }

      console.warn("[Sphinx Wildfires] Ingest yielded 0 live features. Retaining existing cache...");
      if (!this.cache || this.cache.features.length === 0) {
        this.loadDiskCache();
      }
      return filterByAge(this.cache) || { type: "FeatureCollection", features: [] };
    } catch (err) {
      console.warn("[Sphinx Wildfires] Failed to fetch live wildfire feeds:", err.message);
      if (!this.cache || this.cache.features.length === 0) {
        this.loadDiskCache();
      }
      return filterByAge(this.cache) || { type: "FeatureCollection", features: [] };
    }
  }
}
