const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

const yellowMat = `  const logoMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#ffcc00", metalness: 0.2, roughness: 0.1, clearcoat: 1.0 }), []);\n  const paintMat`;
code = code.replace(/  const paintMat/, yellowMat);

const logoJSX = `
      {/* Red Bull Yellow Sun Logos */}
      <mesh position={[0.185, -0.05, -0.1]} rotation={[0, Math.PI / 2, 0]} material={logoMat}>
        <cylinderGeometry args={[0.08, 0.08, 0.01, 16]} />
      </mesh>
      <mesh position={[-0.185, -0.05, -0.1]} rotation={[0, -Math.PI / 2, 0]} material={logoMat}>
        <cylinderGeometry args={[0.08, 0.08, 0.01, 16]} />
      </mesh>
      
      {/* Accent Stripe */}`;
code = code.replace(/      \{\/\* Accent Stripe \*\/\}/, logoJSX);

fs.writeFileSync('components/DetailedModels.js', code);
