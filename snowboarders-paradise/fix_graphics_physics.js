const fs = require('fs');

// 1. Fix terrainUtils.js
let terrain = fs.readFileSync('utils/terrainUtils.js', 'utf8');
terrain = terrain.replace(/y \+= noise\(x \* 0\.2, z \* 0\.2\) \* 1\.5;/g, "y += noise(x * 0.1, z * 0.1) * 0.2; // Small micro bumps");
terrain = terrain.replace(/y \+= Math\.sin\(x \* 0\.05\) \* Math\.cos\(z \* 0\.05\) \* 8;/g, "y += Math.sin(x * 0.02) * Math.cos(z * 0.02) * 15; // Smooth massive rolling hills");
fs.writeFileSync('utils/terrainUtils.js', terrain);

// 2. Fix App.js Lighting
let app = fs.readFileSync('App.js', 'utf8');
app = app.replace(/<color attach="background" args=\{\['#d0e3ff'\]\} \/>/g, "<color attach=\"background\" args={['#ffaa77']} />");
app = app.replace(/<fogExp2 attach="fog" args=\{\['#d0e3ff', 0\.002\]\} \/>/g, "<fogExp2 attach=\"fog\" args={['#ffaa77', 0.004]} />");
app = app.replace(/<Sky sunPosition=\{\[100, 20, -100\]\}/g, "<Sky sunPosition={[100, 10, -100]}");
app = app.replace(/<ambientLight intensity=\{0\.2\} color="#88aaff" \/>/g, "<ambientLight intensity={0.5} color=\"#445588\" />");
app = app.replace(/intensity=\{3\.0\}/g, "intensity={5.0}");
fs.writeFileSync('App.js', app);

// 3. Fix Player.js Camera Trailing
let player = fs.readFileSync('components/Player.js', 'utf8');
player = player.replace(/const camOffset = new THREE.Vector3\([^)]+\);/g, `const camOffset = new THREE.Vector3(
      Math.sin(boardRot.current * 0.5) * 2.5,
      1.5,
      6 + speedMultiplier * 1.5
    );`);
// Make camera lerp buttery smooth
player = player.replace(/camera\.position\.lerp\(idealPos, dt \* 10\);/g, "camera.position.lerp(idealPos, dt * 2.5);");
fs.writeFileSync('components/Player.js', player);

console.log("Graphics and Physics overhauled.");
