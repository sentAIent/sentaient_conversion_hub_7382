const fs = require('fs');
let code = fs.readFileSync('components/TrackManager.js', 'utf8');

// Fix Tree Material
code = code.replace(/const globalTreeMat = new THREE\.MeshStandardMaterial\(\{[\s\S]*?\}\);/, `const globalTreeMat = new THREE.MeshStandardMaterial({ 
  color: '#0f380f', roughness: 0.9, metalness: 0.0 
});`);

// Fix Rock Material
code = code.replace(/const globalRockMat = new THREE\.MeshStandardMaterial\(\{[\s\S]*?\}\);/, `const globalRockMat = new THREE.MeshStandardMaterial({ 
  color: "#555555", roughness: 0.9, metalness: 0.1 
});`);

// Fix Kicker Material (remove neon orange)
code = code.replace(/const globalKickerMat = new THREE\.MeshStandardMaterial\(\{[\s\S]*?\}\);/, `const globalKickerMat = new THREE.MeshStandardMaterial({ 
  color: "#ffffff", roughness: 0.9, metalness: 0.1 
});`);

fs.writeFileSync('components/TrackManager.js', code);
