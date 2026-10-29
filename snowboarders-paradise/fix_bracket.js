const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');
code = code.replace("           </mesh>\n        </group>\n}\n        \n      </group>", "           </mesh>\n        </group>\n      </group>");
fs.writeFileSync('components/Player.js', code);
console.log("Fixed rogue bracket in Player.js");
