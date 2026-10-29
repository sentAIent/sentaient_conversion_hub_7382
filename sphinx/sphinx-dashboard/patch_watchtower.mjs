import fs from 'fs';

let content = fs.readFileSync('../sphinx-core/lib/watchtower.mjs', 'utf8');

// 1. Add the import for OsintCache
if (!content.includes('OsintCache')) {
  content = content.replace(
    "import { spawn } from 'child_process';",
    "import { spawn } from 'child_process';\nimport { OsintCache } from './cache.mjs';"
  );
  
  // Initialize it in the class constructor
  content = content.replace(
    /constructor\(\) \{/,
    "constructor() {\n    this.cache = new OsintCache();"
  );
}

// 2. Wrap the fetch catch block
const fetchReplacement = `
    try {
      const fetch = (await import('node-fetch')).default || (await import('node-fetch'));
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000);

      const response = await fetch(this.overpassUrl, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'SphinxOSINT/2.0 (sentaient_dev@sentaient.com)'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();
      
      // SAVE TO LOCAL SQLITE CACHE
      if (data.elements && data.elements.length > 0) {
        this.cache.saveFeatures(data.elements);
      }

      this.cachedOverpassData = this.parseOverpassData(data);
      this.lastOverpassFetch = Date.now();
      return this.cachedOverpassData;
    } catch (e) {
      console.warn(\`[Sphinx Watchtower] Overpass API Error or Offline: \${e.message}. Falling back to local SQLite cache.\`);
      
      // FALLBACK TO SQLITE
      // searchBbox is sw_lat, sw_lon, ne_lat, ne_lon
      const [sw_lat, sw_lon, ne_lat, ne_lon] = searchBbox.split(',').map(parseFloat);
      const localElements = this.cache.getFeaturesInBbox(sw_lat, sw_lon, ne_lat, ne_lon);
      console.log(\`[Sphinx Watchtower] Recovered \${localElements.length} OSINT markers from local SQLite cache.\`);
      
      return this.parseOverpassData({ elements: localElements });
    }
`;

// Replace the try/catch block
content = content.replace(/try \{[\s\S]*?throw e;\n    \}/, fetchReplacement.trim());

fs.writeFileSync('../sphinx-core/lib/watchtower.mjs', content);
