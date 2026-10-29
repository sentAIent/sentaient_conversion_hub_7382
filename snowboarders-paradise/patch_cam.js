const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const camFix = `
      idealOffset.applyAxisAngle(_yAxis, moveAngle);
      idealOffset.add(playerV);
      
      // Ensure camera never clips into the mountain
      const camGroundY = getTerrainHeight(idealOffset.x, idealOffset.z);
      if (idealOffset.y < camGroundY + 1.5) {
         idealOffset.y = camGroundY + 1.5;
      }
`;

code = code.replace(/idealOffset\.applyAxisAngle\(_yAxis, moveAngle\);\n\s*idealOffset\.add\(playerV\);/g, camFix);

fs.writeFileSync('components/Player.js', code);
