const fs = require('fs');
const file = 'binaural-assets/js/visuals/visualizer_v4.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /this\.tsunamiMaterial = new THREE\.ShaderMaterial\(\{[\s\S]*?side: THREE\.DoubleSide\s*\}\);/,
    `this.tsunamiMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true, side: THREE.DoubleSide });`
);

fs.writeFileSync(file, content);
