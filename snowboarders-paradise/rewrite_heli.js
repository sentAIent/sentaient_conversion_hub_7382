const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

const startIndex = code.indexOf('export function Helicopter({ ...props }) {');
const endIndex = code.indexOf('export function CameraDrone({ ...props }) {');

if (startIndex !== -1 && endIndex !== -1) {
  const newHeli = `export const Helicopter = React.forwardRef(({ ...props }, ref) => {
  const mainRotor = React.useRef();
  const tailRotor = React.useRef();
  
  useFrame((state, dt) => {
    if (mainRotor.current) mainRotor.current.rotation.y -= dt * 15;
    if (tailRotor.current) tailRotor.current.rotation.x -= dt * 25;
  });

  const paintMat = <meshPhysicalMaterial color="#080808" metalness={0.8} roughness={0.15} clearcoat={1.0} />;
  const accentMat = <meshPhysicalMaterial color="#ff2200" metalness={0.5} roughness={0.2} clearcoat={1.0} />;
  const glassMat = <meshPhysicalMaterial color="#000000" metalness={0.9} roughness={0.0} transmission={0.5} transparent opacity={0.7} />;
  const metalMat = <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.4} />;

  return (
    <group {...props} ref={ref} scale={[15, 15, 15]}>
      {/* Main Fuselage */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.18, 0.4, 16, 16]} />
        {paintMat}
      </mesh>
      
      {/* Cockpit Glass */}
      <mesh position={[0, 0.05, 0.22]} rotation={[Math.PI / 2 - 0.2, 0, 0]}>
        <capsuleGeometry args={[0.16, 0.2, 16, 16]} />
        {glassMat}
      </mesh>

      {/* Accent Stripe */}
      <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.182, 0.182, 0.4, 16]} />
        {accentMat}
      </mesh>

      {/* Tail Boom */}
      <mesh position={[0, 0.05, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.8, 16]} />
        {paintMat}
      </mesh>

      {/* Vertical Tail Fin */}
      <mesh position={[0, 0.1, -1.0]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.02, 0.3, 0.1]} />
        {accentMat}
      </mesh>
      {/* Horizontal Stabilizer */}
      <mesh position={[0, 0.05, -0.9]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.25, 0.01, 0.06]} />
        {paintMat}
      </mesh>

      {/* Landing Skids */}
      <mesh position={[0.22, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 1.1, 8]} />
        {metalMat}
      </mesh>
      <mesh position={[-0.22, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 1.1, 8]} />
        {metalMat}
      </mesh>
      {/* Struts */}
      {[1, -1].map((x) => 
        [0.2, -0.2].map((z) => (
          <mesh key={\`\${x}-\${z}\`} position={[x * 0.18, -0.1, z]} rotation={[0, 0, x * 0.2]}>
            <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
            {metalMat}
          </mesh>
        ))
      )}

      {/* Main Rotor Mast */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.15, 8]} />
        {metalMat}
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 12]} />
        {metalMat}
      </mesh>

      {/* Main Rotor Blades */}
      <group position={[0, 0.31, 0]} ref={mainRotor}>
        <mesh>
          <boxGeometry args={[1.8, 0.01, 0.06]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.06, 0.01, 1.8]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>

      {/* Tail Rotor */}
      <mesh position={[0.02, 0.2, -1.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.04, 8]} />
        {metalMat}
      </mesh>
      <group position={[0.05, 0.2, -1.02]} ref={tailRotor}>
        <mesh>
          <boxGeometry args={[0.01, 0.25, 0.03]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.01, 0.03, 0.25]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
});

`;

  const newCode = code.substring(0, startIndex) + newHeli + code.substring(endIndex);
  fs.writeFileSync('components/DetailedModels.js', newCode);
  console.log("Success");
} else {
  console.log("Failed to find bounds");
}
