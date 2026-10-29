const fs = require('fs');
let content = fs.readFileSync('lib/watchtower.mjs', 'utf8');

content = content.replace(
  /this\.lastOverpassFetch \= Date\.now\(\);\n\s*this\.cachedOverpassData \= \{ type\: 'FeatureCollection', features\: features \};/,
  "return { type: 'FeatureCollection', features };"
);

fs.writeFileSync('lib/watchtower.mjs', content);
