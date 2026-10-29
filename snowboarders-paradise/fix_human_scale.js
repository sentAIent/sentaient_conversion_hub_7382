const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/<group ref=\{visualRef\} scale=\{\[4, 4, 4\]\}>/, "<group ref={visualRef} scale={[1.5, 1.5, 1.5]}>");

fs.writeFileSync('components/Player.js', code);
