const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

const oldFuselage = `      {/* AH-1 Cobra Sleek Fuselage (Scaled Sphere) */}
      <mesh position={[0, 0, 0]} scale={[0.4, 0.8, 3.0]} material={paintMat}>
        <sphereGeometry args={[0.3, 32, 32]} />
      </mesh>

      {/* Aerodynamic Tandem Canopy */}
      <mesh position={[0, 0.12, 0.35]} scale={[0.35, 0.45, 1.8]} rotation={[-0.05, 0, 0]} material={glassMat}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>`;

const newFuselage = `      {/* AH-1 Cobra Flat-Sided Fuselage */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={paintMat}>
        <cylinderGeometry args={[0.15, 0.15, 1.4, 32]} />
      </mesh>
      
      {/* Pointed Angular Nose */}
      <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]} material={paintMat}>
        <coneGeometry args={[0.15, 0.4, 32]} />
      </mesh>

      {/* Angular Faceted Canopy (Like real Cobra) */}
      <mesh position={[0, 0.15, 0.25]} rotation={[0.1, 0, 0]} material={glassMat}>
        <cylinderGeometry args={[0.07, 0.12, 0.6, 4]} rotation={[0, Math.PI / 4, 0]} />
      </mesh>
      <mesh position={[0, 0.12, 0.55]} rotation={[-1.2, 0, 0]} material={glassMat}>
        <cylinderGeometry args={[0.01, 0.07, 0.3, 4]} rotation={[0, Math.PI / 4, 0]} />
      </mesh>`;

code = code.replace(oldFuselage, newFuselage);
fs.writeFileSync('components/DetailedModels.js', code);
