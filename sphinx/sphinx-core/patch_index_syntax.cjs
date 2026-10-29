const fs = require('fs');
let content = fs.readFileSync('index.js', 'utf8');

content = content.replace(/  const data = await watchtower.fetchPowerGrid\(req\.query\.bbox\);\n  res\.json\(data\);\n\}\);\n/g, '');

fs.writeFileSync('index.js', content);
