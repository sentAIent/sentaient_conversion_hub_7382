const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const newDt = `
  // We determine slow-mo if they are in the air and doing a trick (grabbing or spinning)
  let timeScale = 1.0;
  if (introState === 'playing') {
      const px = pos.current.x;
      const pz = pos.current.z;
      // Rough ground check to avoid getTerrainHeight overhead every frame for this if possible,
      // but we need it. We'll do it safely.
      const gY = getTerrainHeight(px, pz);
      if (pos.current.y - gY > 5 && (controls.current.left || controls.current.right || controls.current.jump || controls.current.grab)) {
          timeScale = 0.4; // MATRIX BULLET TIME during big air tricks!
      }
  }
  const dt = Math.min(delta, 0.1) * timeScale;
`;

code = code.replace(/const dt = Math\.min\(delta, 0\.1\);/g, newDt);

fs.writeFileSync('components/Player.js', code);
