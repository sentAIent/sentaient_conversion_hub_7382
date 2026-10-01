import re

with open('src/pages/demo3d/worlds/LegalEagle.jsx', 'r') as f:
    content = f.read()

doc_scanner_code = """
const DocScanner = ({ position }) => {
  const scanLineRef = useRef();
  
  useFrame((state) => {
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 40;
    }
  });

  return (
    <group position={position}>
      {/* Document Base */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[60, 80]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
      
      {/* Holographic Text lines */}
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[0, 30 - i * 6, 0.5]}>
          <planeGeometry args={[40 + Math.random() * 10, 2]} />
          <meshBasicMaterial color="#00ffcc" />
        </mesh>
      ))}

      {/* Laser Scan Line */}
      <mesh ref={scanLineRef} position={[0, 0, 1]}>
        <planeGeometry args={[70, 2]} />
        <meshBasicMaterial color="#ff00ff" transparent opacity={0.8} />
      </mesh>
      
      {/* Scanner Glow */}
      <pointLight color="#ff00ff" intensity={2} distance={100} position={[0, 0, 5]} />
    </group>
  );
};
"""

content = content.replace("const WorldLegalEagle = ({ position, rotation, visible }) => {", doc_scanner_code + "\nconst WorldLegalEagle = ({ position, rotation, visible }) => {")
content = content.replace("{/* The Judge Logo floating gracefully in the center */}", "<DocScanner position={[0, -50, -100]} />\n      {/* The Judge Logo floating gracefully in the center */}")

with open('src/pages/demo3d/worlds/LegalEagle.jsx', 'w') as f:
    f.write(content)
