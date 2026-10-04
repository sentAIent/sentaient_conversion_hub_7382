import fs from 'fs';
const file = '../sphinx-core/lib/watchtower.mjs';
let code = fs.readFileSync(file, 'utf8');

const target = `  async fetchAllOverpass(bboxString) {
    if (!bboxString) return { error: true, message: 'No bbox provided' };`;

const replacement = `  async fetchAllOverpass(bboxString) {
    if (!bboxString) return { error: true, message: 'No bbox provided' };
    
    // Cache per bbox for 60 seconds to prevent Overpass 429 rate limits when panning
    const cacheKey = \`overpass_\${bboxString}\`;
    if (this.cache[cacheKey] && (Date.now() - this.cache[cacheKey].time < 60000)) {
      console.log(\`[Sphinx Watchtower] Serving Overpass data from 60s cache\`);
      return this.cache[cacheKey].data;
    }`;

code = code.replace(target, replacement);

const target2 = `this.cachedOverpassData = { 
        springs: { type: 'FeatureCollection', features: springs },
        power: { type: 'FeatureCollection', features: power },
        aviation: { type: 'FeatureCollection', features: aviation },
        emergency: { type: 'FeatureCollection', features: emergency },
        cameras: { type: 'FeatureCollection', features: cameras }
      };
      return this.cachedOverpassData;`;

const replacement2 = `this.cachedOverpassData = { 
        springs: { type: 'FeatureCollection', features: springs },
        power: { type: 'FeatureCollection', features: power },
        aviation: { type: 'FeatureCollection', features: aviation },
        emergency: { type: 'FeatureCollection', features: emergency },
        cameras: { type: 'FeatureCollection', features: cameras }
      };
      this.cache[cacheKey] = { time: Date.now(), data: this.cachedOverpassData };
      return this.cachedOverpassData;`;

code = code.replace(target2, replacement2);
fs.writeFileSync(file, code);
