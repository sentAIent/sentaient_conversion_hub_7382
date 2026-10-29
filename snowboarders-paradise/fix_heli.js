const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

const newMats = `
  const logoMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ff00ff", emissive: "#ff00ff", emissiveIntensity: 2.5, metalness: 0.0, roughness: 0.1 }), []);
  const paintMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#020202", metalness: 0.95, roughness: 0.05 }), []);
  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#00ffff", emissive: "#00ffff", emissiveIntensity: 2.5, metalness: 0.0, roughness: 0.1 }), []);
  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#000000", metalness: 0.9, roughness: 0.0, transmission: 0.5, transparent: true, opacity: 0.7, emissive: "#002222", emissiveIntensity: 0.5 }), []);
  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#222222", metalness: 0.9, roughness: 0.4 }), []);
`;

code = code.replace(/const logoMat = [^;]+;\n\s*const paintMat = [^;]+;\n\s*const accentMat = [^;]+;\n\s*const glassMat = [^;]+;\n\s*const metalMat = [^;]+;/g, newMats.trim());

fs.writeFileSync('components/DetailedModels.js', code);
