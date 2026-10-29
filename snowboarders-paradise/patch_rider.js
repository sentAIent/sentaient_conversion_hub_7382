const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

const regex = /const bodyMat = React\.useMemo[\s\S]*?const gogglesMat = React\.useMemo[^\n]*\n/;

const newRiderMat = `  // REALISTIC RIDER OUTFIT
  const jacketMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: colors?.suit || "#e63946", roughness: 0.8, metalness: 0.1 }), [colors]);
  const pantsMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#1d3557", roughness: 0.9, metalness: 0.0 }), []);
  const bodyMat = jacketMat; // fallback for rest of body
  const boardMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: colors?.board || "#f1faee", roughness: 0.2, metalness: 0.1 }), [colors]);
  const gogglesMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.0, metalness: 0.9, envMapIntensity: 2.0 }), []);
  const skinMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffc8a2", roughness: 0.6, metalness: 0.1 }), []);
`;

code = code.replace(regex, newRiderMat);
fs.writeFileSync('components/DetailedModels.js', code);
console.log("Rider materials fixed");
