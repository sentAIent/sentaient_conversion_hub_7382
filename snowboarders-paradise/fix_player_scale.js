const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/<group ref=\{visualRef\} scale=\{\[1\.5, 1\.5, 1\.5\]\}>/, "<group ref={visualRef} scale={[4, 4, 4]}>");

// And let's place them slightly further out just in case
code = code.replace(/pos\.current\.x \+= 3\.3;/, "pos.current.x += 4.5; // push them further out onto the edge");

fs.writeFileSync('components/Player.js', code);
