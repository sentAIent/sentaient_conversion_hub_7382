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

  const logoMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ff00ff", emissive: "#ff00ff", emissiveIntensity: 2.5, metalness: 0.0, roughness: 0.1 }), []);
  const paintMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#020202", metalness: 0.95, roughness: 0.05 }), []);
  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#00ffff", emissive: "#00ffff", emissiveIntensity: 2.5, metalness: 0.0, roughness: 0.1 }), []);
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#000000", metalness: 0.9, roughness: 0.0, transmission: 0.5, transparent: true, opacity: 0.7, emissive: "#002222", emissiveIntensity: 0.5 }), []);
  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#222222", metalness: 0.9, roughness: 0.4 }), []);

  return (
    <group {...props} ref={ref} scale={[15, 15, 15]}>
      {/* AH-1 Cobra Narrow Fuselage */}
      <mesh position={[0, 0, 0]} material={paintMat}>
        <boxGeometry args={[0.15, 0.35, 1.2]} />
      </mesh>
      
      {/* Sharp Nose */}
      <mesh position={[0, -0.05, 0.7]} rotation={[0.2, 0, 0]} material={paintMat}>
        <coneGeometry args={[0.075, 0.4, 4]} />
      </mesh>

      {/* Tandem Cockpit Canopy (Angular) */}
      <mesh position={[0, 0.18, 0.3]} rotation={[0, 0, 0]} material={glassMat}>
        <boxGeometry args={[0.14, 0.15, 0.5]} />
      </mesh>
      
      {/* Stub Wings */}
      <mesh position={[0, 0, 0]} material={paintMat}>
        <boxGeometry args={[0.6, 0.02, 0.2]} />
      </mesh>

      {/* Tail Boom */}
      <mesh position={[0, 0.08, -0.8]} rotation={[Math.PI / 2, 0, 0]} material={paintMat}>
        <cylinderGeometry args={[0.05, 0.07, 0.8, 8]} />
      </mesh>

      {/* Vertical Tail Fin (Swept back) */}
      <group position={[0, 0.15, -1.2]} rotation={[-0.3, 0, 0]}>
        <mesh material={paintMat}>
          <boxGeometry args={[0.02, 0.4, 0.15]} />
        </mesh>
      </group>

      {/* Horizontal Stabilizers on Tail */}
      <mesh position={[0, 0.1, -1.1]} material={paintMat}>
        <boxGeometry args={[0.3, 0.01, 0.08]} />
      </mesh>

      {/* Landing Skids */}
      <mesh position={[0.2, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]} material={metalMat}>
        <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
      </mesh>
      <mesh position={[-0.2, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]} material={metalMat}>
        <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
      </mesh>
      {/* Skid Struts */}
      {[1, -1].map((x) => 
        [0.3, -0.3].map((z) => (
          <mesh key={'strut'+x+z} position={[x * 0.16, -0.12, z]} rotation={[0, 0, x * 0.4]} material={metalMat}>
            <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
          </mesh>
        ))
      )}

      {/* Main Rotor Assembly */}
      <group position={[0, 0.25, 0]} ref={mainRotor}>
        <mesh position={[0, 0.05, 0]} material={metalMat}>
          <cylinderGeometry args={[0.02, 0.02, 0.1]} />
        </mesh>
        <mesh position={[0, 0.1, 0]} material={metalMat}>
          <boxGeometry args={[1.8, 0.01, 0.08]} />
        </mesh>
      </group>

      {/* Tail Rotor */}
      <group position={[0.03, 0.3, -1.25]} rotation={[0, 0, Math.PI / 2]} ref={tailRotor}>
        <mesh material={metalMat}>
          <boxGeometry args={[0.3, 0.01, 0.03]} />
        </mesh>
      </group>
      
      {/* Glowing Accents (Tron/Alto style) */}
      <mesh position={[0, -0.17, 0]} material={accentMat}>
        <boxGeometry args={[0.16, 0.01, 1.2]} />
      </mesh>
      <mesh position={[0, 0, 0.2]} material={logoMat}>
        <boxGeometry args={[0.151, 0.2, 0.2]} />
      </mesh>
    </group>
  );
});
`;

code = code.replace(/export const Helicopter = React\.forwardRef\(\(\{ \.\.\.props \}, ref\) => \{[\s\S]*?\n\}\);\n/g, newHeli + '\n');

fs.writeFileSync('components/DetailedModels.js', code);
