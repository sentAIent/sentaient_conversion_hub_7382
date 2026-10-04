const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

code = code.replace(/const glassMat = useMemo\(\(\) => new THREE\.MeshStandardMaterial\(\{ color: "#000000", metalness: 0\.9, roughness: 0\.0, transmission: 0\.5,/g, "const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: \"#000000\", metalness: 0.9, roughness: 0.0, transmission: 0.5,");

fs.writeFileSync('components/DetailedModels.js', code);
