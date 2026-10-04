const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

const newHeli = `
export const Helicopter = React.forwardRef(({ ...props }, ref) => {
  const mainRotor = React.useRef();
  const tailRotor = React.useRef();
  
  useFrame((state, dt) => {
    if (mainRotor.current) mainRotor.current.rotation.y -= dt * 25;
    if (tailRotor.current) tailRotor.current.rotation.x -= dt * 40;
  });

  const logoMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#ff00ff", emissive: "#ff00ff", emissiveIntensity: 2.5, metalness: 0.0, roughness: 0.1 }), []);
  const paintMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#020202", metalness: 0.95, roughness: 0.05 }), []);
  const accentMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#00ffff", emissive: "#00ffff", emissiveIntensity: 2.5, metalness: 0.0, roughness: 0.1 }), []);
  const glassMat = React.useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#000000", metalness: 0.9, roughness: 0.0, transmission: 0.5, transparent: true, opacity: 0.7, emissive: "#002222", emissiveIntensity: 0.5 }), []);
  const metalMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#222222", metalness: 0.9, roughness: 0.4 }), []);

  return (
    <group {...props} ref={ref} scale={[15, 15, 15]}>
      {/* AH-1 Cobra Sleek Fuselage (Scaled Sphere) */}
      <mesh position={[0, 0, 0]} scale={[0.4, 0.8, 3.0]} material={paintMat}>
        <sphereGeometry args={[0.3, 32, 32]} />
      </mesh>

      {/* Aerodynamic Tandem Canopy */}
      <mesh position={[0, 0.12, 0.35]} scale={[0.35, 0.45, 1.8]} rotation={[-0.05, 0, 0]} material={glassMat}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>
      
      {/* Weapon Stub Wings (Aerodynamic) */}
      <mesh position={[0, -0.05, 0]} scale={[3.0, 0.1, 0.6]} material={paintMat}>
        <sphereGeometry args={[0.15, 16, 16]} />
      </mesh>

      {/* Tapered Tail Boom */}
      <mesh position={[0, 0.05, -0.9]} rotation={[Math.PI / 2, 0, 0]} material={paintMat}>
        <cylinderGeometry args={[0.02, 0.1, 1.2, 16]} />
      </mesh>

      {/* Swept Vertical Tail Fin */}
      <mesh position={[0, 0.18, -1.4]} rotation={[-0.4, 0, 0]} scale={[0.1, 2.0, 0.8]} material={paintMat}>
        <sphereGeometry args={[0.15, 16, 16]} />
      </mesh>

      {/* Horizontal Stabilizers on Tail */}
      <mesh position={[0, 0.08, -1.35]} scale={[2.5, 0.1, 0.8]} material={paintMat}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>

      {/* Landing Skids */}
      <mesh position={[0.2, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]} material={metalMat}>
        <cylinderGeometry args={[0.015, 0.015, 1.4, 8]} />
      </mesh>
      <mesh position={[-0.2, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]} material={metalMat}>
        <cylinderGeometry args={[0.015, 0.015, 1.4, 8]} />
      </mesh>
      {/* Skid Struts */}
      {[1, -1].map((x) => 
        [0.4, -0.4].map((z) => (
          <mesh key={'strut'+x+z} position={[x * 0.16, -0.15, z]} rotation={[0, 0, x * 0.4]} material={metalMat}>
            <cylinderGeometry args={[0.01, 0.01, 0.35, 8]} />
          </mesh>
        ))
      )}

      {/* Main Rotor Assembly */}
      <group position={[0, 0.3, 0]} ref={mainRotor}>
        <mesh position={[0, 0.05, 0]} material={metalMat}>
          <cylinderGeometry args={[0.02, 0.02, 0.15]} />
        </mesh>
        <mesh position={[0, 0.1, 0]} material={metalMat}>
          <boxGeometry args={[2.2, 0.01, 0.08]} />
        </mesh>
      </group>

      {/* Tail Rotor */}
      <group position={[0.04, 0.35, -1.45]} rotation={[0, 0, Math.PI / 2]} ref={tailRotor}>
        <mesh material={metalMat}>
          <boxGeometry args={[0.4, 0.01, 0.04]} />
        </mesh>
      </group>
      
      {/* Glowing Accents */}
      <mesh position={[0, -0.18, 0]} scale={[1.0, 1.0, 4.0]} material={accentMat}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} rotation={[0, 0, Math.PI / 2]} />
      </mesh>
    </group>
  );
});
`;

code = code.replace(/export const Helicopter = React\.forwardRef\(\(\{ \.\.\.props \}, ref\) => \{[\s\S]*?\n\}\);\n/g, newHeli + '\n');

fs.writeFileSync('components/DetailedModels.js', code);
