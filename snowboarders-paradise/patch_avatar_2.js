const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

const oldModelStart = code.indexOf('{/* Legs */}');
const oldModelEnd = code.indexOf('</group>', code.indexOf('{/* Head */}')) + 8;

const betterModel = `
        {/* Legs with Knees */}
        <mesh position={[-0.15, 0.25, 0.3]} rotation={[0.4, 0, 0]}>
          <capsuleGeometry args={[0.07, 0.4, 8, 16]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>
        <mesh position={[0.15, 0.25, -0.3]} rotation={[-0.2, 0, 0]}>
          <capsuleGeometry args={[0.07, 0.4, 8, 16]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.75, 0]} rotation={[0.2, 0.5, 0]}>
          <capsuleGeometry args={[0.18, 0.5, 8, 16]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>

        {/* Arms */}
        {/* Left Arm (holding balance) */}
        <mesh position={[-0.3, 0.8, 0.1]} rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.05, 0.5, 8, 16]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>
        {/* Right Arm (trailing back) */}
        <mesh position={[0.3, 0.8, -0.1]} rotation={[-0.5, 0, -0.5]}>
          <capsuleGeometry args={[0.05, 0.5, 8, 16]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>

        {/* Bindings */}
        <mesh position={[-0.15, -0.05, 0.3]} rotation={[0, 0.3, 0]}>
           <boxGeometry args={[0.2, 0.1, 0.25]} />
           <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0.15, -0.05, -0.3]} rotation={[0, -0.3, 0]}>
           <boxGeometry args={[0.2, 0.1, 0.25]} />
           <meshStandardMaterial color="#333333" />
        </mesh>

        {/* Head */}
        <group position={[0, 1.2, 0]} rotation={[0.2, 0.5, 0]}>
          <mesh>
            <sphereGeometry args={[0.14, 32, 32]} />
            <primitive object={bodyMat} attach="material" />
          </mesh>
          {/* Goggles */}
          <mesh position={[0, 0.02, -0.11]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[0.22, 0.08, 0.1]} />
            <primitive object={gogglesMat} attach="material" />
          </mesh>
        </group>
`;

if (oldModelStart !== -1 && oldModelEnd !== -1) {
  code = code.substring(0, oldModelStart) + betterModel + code.substring(oldModelEnd);
  fs.writeFileSync('components/DetailedModels.js', code);
}
