const fs = require('fs');
let app = fs.readFileSync('App.js', 'utf8');
// Fix lighting
app = app.replace("<ambientLight intensity={0.5} />", "<ambientLight intensity={0.2} />");
app = app.replace("<directionalLight position={[10, 20, -10]} intensity={2} castShadow />", "<directionalLight position={[10, 20, -10]} intensity={1} castShadow />");
// Fix bloom
app = app.replace("<Bloom intensity={1.0} luminanceThreshold={0.5} />", "<Bloom intensity={0.15} luminanceThreshold={0.9} />");
fs.writeFileSync('App.js', app);

let terrain = fs.readFileSync('components/Terrain.js', 'utf8');
// Fix terrain material
terrain = terrain.replace("color=\"#ffffff\" roughness={0.6} metalness={0.1}", "color=\"#eef5ff\" roughness={0.9} metalness={0.0}");
fs.writeFileSync('components/Terrain.js', terrain);
