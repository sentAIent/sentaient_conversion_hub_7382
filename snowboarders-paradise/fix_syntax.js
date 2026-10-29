const fs = require('fs');
let code = fs.readFileSync('components/CarveTrail.js', 'utf8');

const badCode = `          // skip the old set
            (Math.random() - 0.5) * carvingIntensity.current,
            Math.random() * 5,
            (Math.random() - 0.5) * carvingIntensity.current
          );`;

code = code.replace(badCode, "");

fs.writeFileSync('components/CarveTrail.js', code);
console.log("Syntax fixed");
