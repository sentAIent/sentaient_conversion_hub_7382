const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');
code = code.replace("<CarveTrail playerPos={pos} carvingIntensity={carvingIntensity} />", "<CarveTrail playerPos={pos} carvingIntensity={carvingIntensity} boostActive={boost && boostRef.current > 0} />");
fs.writeFileSync('components/Player.js', code);
