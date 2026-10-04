const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

const newRider = `
export function IncredibleSnowboarder({ animState, colors, ghost }) {
  const { carving, inAir, grabbing, wipeout } = animState || { carving: 0, inAir: false, grabbing: false, wipeout: false };

  const bodyMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#000000", roughness: 0.1, metalness: 0.9 }), [colors]);
  const boardMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: colors?.board || "#00ffff", emissive: colors?.board || "#00ffff", emissiveIntensity: 2.0, roughness: 0.2, metalness: 0.8 }), [colors]);
  const gogglesMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: "#ff00ff", emissive: "#ff00ff", emissiveIntensity: 2.5, metalness: 0.0, roughness: 0.1 }), []);

  const boardRot = wipeout ? [0, 0, Math.PI/2] : (inAir ? [0.2, 0, carving * 0.5] : [0, 0, -carving * 0.3]);
  const bodyRot = wipeout ? [Math.PI/2, 0, 0] : (inAir ? [0.5, carving * 0.5, 0] : [0.5, carving * 0.5, 0]);

  return (
    <group rotation={boardRot}>
      {/* Aerodynamic Snowboard */}
      <mesh position={[0, 0.05, 0]} scale={[1, 0.05, 4]}>
        <cylinderGeometry args={[0.2, 0.2, 0.4, 32]} rotation={[0, 0, Math.PI / 2]} />
        <primitive object={boardMat} attach="material" />
      </mesh>
      
      {/* Board glow trail */}
      <mesh position={[0, -0.05, -0.6]} scale={[0.1, 0.1, 0.8]}>
        <sphereGeometry args={[1, 8, 8]} />
        <primitive object={boardMat} attach="material" />
      </mesh>

      {/* Human Body - Aerodynamic Stealth Suit */}
      <group position={[0, 0.15, 0]} rotation={bodyRot}>
        {/* Legs (Tapered Spheres) */}
        <mesh position={[-0.1, 0.3, 0.15]} rotation={[0.4, 0, 0]} scale={[0.08, 0.4, 0.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>
        <mesh position={[0.1, 0.3, -0.15]} rotation={[-0.2, 0, 0]} scale={[0.08, 0.4, 0.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>

        {/* Torso (Aerodynamic Oval) */}
        <mesh position={[0, 0.7, 0]} rotation={[0.2, 0, 0]} scale={[0.15, 0.35, 0.1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>
        
        {/* Arms */}
        <mesh position={[-0.2, 0.7, 0]} rotation={[0.2, 0, 0.3 + carving * 0.2]} scale={[0.05, 0.3, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>
        <mesh position={[0.2, 0.7, 0]} rotation={[0.2, 0, -0.3 + carving * 0.2]} scale={[0.05, 0.3, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>

        {/* Head / Helmet (Sleek Sphere) */}
        <group position={[0, 1.15, 0.1]} rotation={[-0.2, 0, 0]}>
          <mesh scale={[0.12, 0.14, 0.15]}>
            <sphereGeometry args={[1, 32, 32]} />
            <primitive object={bodyMat} attach="material" />
          </mesh>
          {/* Glowing Goggles (Visor wrap) */}
          <mesh position={[0, 0.02, 0.13]} scale={[0.1, 0.03, 0.04]}>
            <sphereGeometry args={[1, 16, 16]} />
            <primitive object={gogglesMat} attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
`;

code = code.replace(/export function IncredibleSnowboarder.*?\}\n\n/s, newRider);
fs.writeFileSync('components/DetailedModels.js', code);
