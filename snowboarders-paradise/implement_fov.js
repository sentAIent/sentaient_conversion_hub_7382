const fs = require('fs');
let playerCode = fs.readFileSync('components/Player.js', 'utf8');

playerCode = playerCode.replace(
  "camera.fov = THREE.MathUtils.lerp(camera.fov, 60 + Math.min(speed * 0.5, 40), 0.1);",
  "const targetFov = 60 + Math.min(speed * 0.5, 40) + (boost && boostRef.current > 0 ? 25 : 0);\n      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.1);"
);

fs.writeFileSync('components/Player.js', playerCode);
console.log("FOV updated");
