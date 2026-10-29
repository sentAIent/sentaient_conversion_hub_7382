const fs = require('fs');
let content = fs.readFileSync('lib/watchtower.mjs', 'utf8');

content = content.replace(/async fetchPowerGrid[\s\S]*?async fetchAviation/m, 'async fetchAviation');
content = content.replace(/async fetchAviation[\s\S]*?async fetchEmergency/m, 'async fetchEmergency');
content = content.replace(/async fetchEmergency[\s\S]*?\n\}\n/m, '\n}\n');
content = content.replace(/async fetchSurveillanceCameras[\s\S]*?async fetchCellTowers/m, 'async fetchCellTowers');
content = content.replace(/async fetchNaturalSprings[\s\S]*?async fetchAllOverpass/m, 'async fetchAllOverpass');

fs.writeFileSync('lib/watchtower.mjs', content);
