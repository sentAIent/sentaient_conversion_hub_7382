import fs from 'fs';

let content = fs.readFileSync('../sphinx-core/lib/watchtower.mjs', 'utf8');

const replacement = `
  async fetchAllOverpass(bboxString = null) {
    let searchBbox = this.bbox;
    let isGlobalQuery = false;
    let area = 999;
    if (bboxString) {
      let [sw_lon, sw_lat, ne_lon, ne_lat] = bboxString.split(',').map(parseFloat);
      
      // Fix wrapped longitudes
      while (sw_lon > 180) sw_lon -= 360;
      while (sw_lon < -180) sw_lon += 360;
      while (ne_lon > 180) ne_lon -= 360;
      while (ne_lon < -180) ne_lon += 360;
      
      // Clamp latitudes
      sw_lat = Math.max(-90, Math.min(90, sw_lat));
      ne_lat = Math.max(-90, Math.min(90, ne_lat));
      
      // Handle anti-meridian crossover (Overpass doesn't support min > max without split, so we clamp)
      if (sw_lon > ne_lon) {
         // Just clamp to global for now or swap
         sw_lon = -180;
         ne_lon = 180;
      }
      
      searchBbox = \`\${sw_lat},\${sw_lon},\${ne_lat},\${ne_lon}\`;
      area = Math.abs(ne_lat - sw_lat) * Math.abs(ne_lon - sw_lon);
`;

content = content.replace(/async fetchAllOverpass\(bboxString = null\) \{[\s\S]*?area = Math\.abs\(parseFloat\(ne_lat\) - parseFloat\(sw_lat\)\) \* Math\.abs\(parseFloat\(ne_lon\) - parseFloat\(sw_lon\)\);/, replacement);

fs.writeFileSync('../sphinx-core/lib/watchtower.mjs', content);
