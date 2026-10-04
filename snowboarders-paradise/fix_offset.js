const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/pos\.current\.x \+= 6\.5; \/\/ Sitting on the skid of the massive heli/, 
  'pos.current.x += 3.3; // Sitting exactly on the skid of the sleek Eurocopter');

// Drone offset
code = code.replace(/droneRef\.current\.position\.x -= 8\.0;/, 
  'droneRef.current.position.x -= 4.5; // Drone hovers just outside the left skid');

fs.writeFileSync('components/Player.js', code);
