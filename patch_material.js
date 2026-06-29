import fs from 'fs';
const file = 'binaural-assets/js/visuals/visualizer_v4.js';
let content = fs.readFileSync(file, 'utf8');

// Replace the Tsunami material with a basic red wireframe
const search = `this.tsunamiMaterial = new THREE.ShaderMaterial({`;
const replacement = `this.tsunamiMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true, side: THREE.DoubleSide });\n        const dummyMaterial = new THREE.ShaderMaterial({`;

content = content.replace(search, replacement);
fs.writeFileSync(file, content);
