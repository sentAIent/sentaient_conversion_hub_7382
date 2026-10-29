const fs = require('fs');
let code = fs.readFileSync('components/NPCs.js', 'utf8');

code = code.replace(/import \{ SnowboarderAvatar \} from '\.\/Player';/g, "import { IncredibleSnowboarder } from './DetailedModels';");
code = code.replace(/<SnowboarderAvatar /g, '<IncredibleSnowboarder ghost={true} ');

fs.writeFileSync('components/NPCs.js', code);
