const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/pos\.current\.y -= 2;\n\s*pos\.current\.x \+= 1\.5; \/\/ Sitting on the skid/, 
  'pos.current.y -= 3.0;\n      pos.current.x += 6.5; // Sitting on the skid of the massive heli');

// Drone offset
code = code.replace(/droneRef\.current\.position\.y -= 1\.5;\n\s*droneRef\.current\.position\.x -= 2\.0;/, 
  'droneRef.current.position.y -= 2.0;\n        droneRef.current.position.x -= 8.0;');

fs.writeFileSync('components/Player.js', code);
