const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

code = code.replace(/camDistance=\{qualitySettings\.camDistance\}/g, "camDistance={camDistance}");
code = code.replace(/camHeight=\{qualitySettings\.camHeight\}/g, "camHeight={camHeight}");

fs.writeFileSync('App.js', code);
