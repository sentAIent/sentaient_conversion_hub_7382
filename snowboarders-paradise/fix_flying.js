const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// The player visual was using smoothedYRef, which lags behind the actual ground when going downhill fast, making them float in the air.
code = code.replace(/visualRef\.current\.position\.set\(pos\.current\.x, smoothedYRef\.current, pos\.current\.z\);/g, "visualRef.current.position.set(pos.current.x, pos.current.y, pos.current.z);");

fs.writeFileSync('components/Player.js', code);
