// I just want to verify syntax is perfectly fine in the file.
const fs = require('fs');
try {
    const code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');
    // If we can evaluate it, it's valid javascript. Since there are DOM references, we can't eval it simply.
    // Instead, we will just use node's syntax checker
    require('child_process').execSync('node --check public/interstellar-game/script.js');
    console.log("Syntax is valid!");
} catch(e) {
    console.error("Syntax Error: " + e.message);
}
