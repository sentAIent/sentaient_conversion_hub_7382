const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace("boostActive={boost && boostRef.current > 0}", "boostActive={controls.current.boost && boostRef.current > 0}");

fs.writeFileSync('components/Player.js', code);
