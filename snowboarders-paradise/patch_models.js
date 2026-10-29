const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

// Replace Helicopter neon materials
code = code.replace(/color: "#ff00ff", emissive: "#ff00ff", emissiveIntensity: 2\.5/g, 'color: "#cc0000", metalness: 0.5, roughness: 0.5'); // logoMat
code = code.replace(/color: "#00ffff", emissive: "#00ffff", emissiveIntensity: 2\.5/g, 'color: "#eeeeee", metalness: 0.8, roughness: 0.2'); // accentMat
code = code.replace(/color: "#020202", metalness: 0\.95, roughness: 0\.05/g, 'color: "#dd0000", metalness: 0.6, roughness: 0.3'); // paintMat
code = code.replace(/emissive: "#002222", emissiveIntensity: 0\.5/g, 'emissive: "#000000"'); // glassMat

// Replace Snowboarder neon/silhouette materials
const oldRiderMat = `  const bodyMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#000000", roughness: 0.1, metalness: 0.9 }), [colors]);
  const boardMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: colors?.board || "#00ffff", emissive: colors?.board || "#00ffff", emissiveIntensity: 2.0, roughness: 0.2, metalness: 0.8 }), [colors]);
    const gogglesMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#ff00ff", emissive: "#ff00ff", emissiveIntensity: 2.5, metalness: 0.0, roughness: 0.1 }), []);`;

const newRiderMat = `  // REALISTIC RIDER OUTFIT
  const jacketMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: colors?.suit || "#e63946", roughness: 0.8, metalness: 0.1 }), [colors]);
  const pantsMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#1d3557", roughness: 0.9, metalness: 0.0 }), []);
  const bodyMat = jacketMat; // fallback for rest of body
  const boardMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: colors?.board || "#f1faee", roughness: 0.2, metalness: 0.1 }), [colors]);
  const gogglesMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.0, metalness: 0.9, envMapIntensity: 2.0 }), []);
  const skinMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffc8a2", roughness: 0.6, metalness: 0.1 }), []);
`;

code = code.replace(oldRiderMat, newRiderMat);

// Now apply pants and jacket to the different body parts
code = code.replace(/<primitive object=\{bodyMat\} attach="material" \/>/g, '<primitive object={jacketMat} attach="material" />');
// Wait, the body is composed of multiple parts. I'll just change them manually if needed, or just let bodyMat be jacketMat for now. 

fs.writeFileSync('components/DetailedModels.js', code);
console.log("DetailedModels patched");
