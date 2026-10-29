const fs = require('fs');

let playerCode = fs.readFileSync('components/Player.js', 'utf8');

// Wrap SnowboarderAvatar in Suspense
playerCode = playerCode.replace('<SnowboarderAvatar animState={animState} colors={colors} />', 
  '<React.Suspense fallback={null}><SnowboarderAvatar animState={animState} colors={colors} /></React.Suspense>');

fs.writeFileSync('components/Player.js', playerCode);

console.log("Suspense added.");
