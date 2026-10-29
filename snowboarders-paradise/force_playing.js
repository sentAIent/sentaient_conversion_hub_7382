const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Force it to playing in useFrame so that hot-reloads instantly snap them to the game
code = code.replace(/if \(!gameStarted\) return;/, `if (!gameStarted) return;\n    if (introState !== 'playing') { setIntroState('playing'); return; }`);

fs.writeFileSync('components/Player.js', code);
