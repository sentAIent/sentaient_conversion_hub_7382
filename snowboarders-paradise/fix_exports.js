const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code += "\nexport { IncredibleSnowboarder as SnowboarderAvatar } from './DetailedModels';\n";

fs.writeFileSync('components/Player.js', code);
