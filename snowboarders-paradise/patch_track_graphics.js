const fs = require('fs');
let code = fs.readFileSync('components/TrackManager.js', 'utf8');

// We need to import useLoader and TextureLoader
code = code.replace("import { useFrame, useThree } from '@react-three/fiber';", "import { useFrame, useThree, useLoader } from '@react-three/fiber';");

// Inside TrackManager, load the texture
const loadTex = `export function TrackManager({ gameStarted }) {
  const snowNormal = useLoader(THREE.TextureLoader, '/snow_normal.jpg');
  snowNormal.wrapS = THREE.RepeatWrapping;
  snowNormal.wrapT = THREE.RepeatWrapping;
  snowNormal.repeat.set(50, 50);`;
  
code = code.replace("export function TrackManager({ gameStarted }) {", loadTex);

// Pass it down to TerrainChunk
code = code.replace("<TerrainChunk key={chunkZ}", "<TerrainChunk key={chunkZ} snowNormal={snowNormal}");

// In TerrainChunk, accept it and use it
code = code.replace("function TerrainChunk({ zOffset, chunkIndex }) {", "function TerrainChunk({ zOffset, chunkIndex, snowNormal }) {");

code = code.replace(
`    const mat = new THREE.MeshPhysicalMaterial({
      color: matColor,
      roughness: matRoughness,
      metalness: matMetalness,
      clearcoat: matClearcoat,
      transmission: 0.1,
      thickness: 1.5,
    });`,
`    const mat = new THREE.MeshPhysicalMaterial({
      color: matColor,
      roughness: matRoughness,
      metalness: matMetalness,
      clearcoat: matClearcoat,
      transmission: 0.1,
      thickness: 1.5,
      normalMap: biome === 1 ? snowNormal : null,
      normalScale: new THREE.Vector2(0.5, 0.5)
    });`
);

// We should also make the trees look better
const treesReplace = `    const geo = new THREE.CylinderGeometry(0, 30, 150, 16, 20);
    geo.translate(0, 75, 0);`;

const newTrees = `    // Better Pine Tree shape
    const geo = new THREE.ConeGeometry(25, 150, 8);
    geo.translate(0, 75, 0);`;
    
code = code.replace(treesReplace, newTrees);

// Make the trees dark green with snow
const treeMatReplace = `    const mat = new THREE.MeshStandardMaterial({ 
      color: '#082211', 
      roughness: 0.9, 
      metalness: 0.0,
    });`;

const newTreeMat = `    const mat = new THREE.MeshStandardMaterial({ 
      color: '#0a1c10', 
      roughness: 0.8, 
      metalness: 0.1,
    });`;
code = code.replace(treeMatReplace, newTreeMat);

fs.writeFileSync('components/TrackManager.js', code);
console.log("TrackManager Graphics patched!");
