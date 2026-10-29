const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/heliRef\.current\.position\.z \+= 100 \* dt; \/\/ flies backwards/, "heliRef.current.position.z -= 150 * dt; // flies forwards away from camera");
code = code.replace(/heliRef\.current\.position\.x -= 50 \* dt;/, "heliRef.current.position.x += 80 * dt; // fly right");

fs.writeFileSync('components/Player.js', code);
