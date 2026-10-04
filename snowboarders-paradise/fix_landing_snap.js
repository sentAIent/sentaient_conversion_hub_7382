const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/if \(pos\.current\.y <= getTerrainHeight\(pos\.current\.x, pos\.current\.z\) \+ 1\.5\) \{/, "if (pos.current.y <= getTerrainHeight(pos.current.x, pos.current.z) + 0.1) {");

fs.writeFileSync('components/Player.js', code);
