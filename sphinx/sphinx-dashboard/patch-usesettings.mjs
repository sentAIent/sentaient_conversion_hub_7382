import fs from 'fs';
const file = 'src/lib/useSettings.ts';
let code = fs.readFileSync(file, 'utf8');

const target = `          layers: newSettings.layers,
          updated_at: new Date().toISOString()`;

const replacement = `          layers: newSettings.layers,
          clustering_enabled: newSettings.clustering_enabled,
          updated_at: new Date().toISOString()`;

code = code.replace(target, replacement);
fs.writeFileSync(file, code);
