const fs = require('fs');
let code = fs.readFileSync('components/TrackManager.js', 'utf8');

code = code.replace(/import { Avalanche } from '.\/Avalanche';\n/, '');
code = code.replace(/<Avalanche gameStarted=\{gameStarted\} \/>\n/, '');

fs.writeFileSync('components/TrackManager.js', code);
