const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

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

        {/* Glowing Scarf */}
        <mesh position={[0, 1.0, 0.2]} rotation={[-Math.PI / 2 + 0.2, 0, Math.sin(Date.now() / 200) * 0.2]}>
          <planeGeometry args={[0.15, 0.8, 4, 8]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} side={THREE.DoubleSide} />
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

code = code.replace(/\{\/\* Legs \*\/\}(.|\n)*?\{\/\* Goggles \*\/\}\n\s*<mesh position=\{\[0, 0.02, 0.11\]\} rotation=\{\[-0.1, 0, 0\]\}>\n\s*<boxGeometry args=\{\[0.22, 0.08, 0.1\]\} \/>\n\s*<primitive object=\{gogglesMat\} attach="material" \/>\n\s*<\/mesh>\n\s*<\/group>/, betterModel);

fs.writeFileSync('components/DetailedModels.js', code);
