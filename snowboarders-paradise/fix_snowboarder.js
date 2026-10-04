const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

code = code.replace(/const bodyMat = React\.useMemo.*?\[colors\]\);/g, 'const bodyMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#000000", roughness: 0.1, metalness: 0.9 }), [colors]);');
code = code.replace(/const boardMat = React\.useMemo.*?\[colors\]\);/g, 'const boardMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: colors?.board || "#00ffff", emissive: colors?.board || "#00ffff", emissiveIntensity: 2.0, roughness: 0.2, metalness: 0.8 }), [colors]);');
code = code.replace(/const skinMat = React\.useMemo.*?\n/g, ''); // Delete skin mat
code = code.replace(/<primitive object=\{skinMat\} attach="material" \/>/g, '<primitive object={bodyMat} attach="material" />');
code = code.replace(/const gogglesMat = React\.useMemo.*?\n/g, 'const gogglesMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#ff00ff", emissive: "#ff00ff", emissiveIntensity: 2.5, metalness: 0.0, roughness: 0.1 }), []);\n');

fs.writeFileSync('components/DetailedModels.js', code);
