import re

with open('src/pages/demo3d/worlds/ContangoQuant.jsx', 'r') as f:
    content = f.read()

new_tunnel = """
const CandlestickTunnel = ({ worldPosition }) => {
  const tunnelRef = useRef();
  
  const candlesticks = useMemo(() => {
    return Array.from({ length: 300 }).map(() => {
      const isGreen = Math.random() > 0.5;
      const height = 20 + Math.random() * 80;
      const wickHeight = height + Math.random() * 40;
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 200;
      
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: (Math.random() - 0.5) * 6000, 
        isGreen,
        height,
        wickHeight,
        speed: 15 + Math.random() * 25 
      };
    });
  }, []);

  useFrame((state) => {
    if (tunnelRef.current) {
      const camPos = state.camera.position.clone();
      const localPos = camPos.sub(new THREE.Vector3(...worldPosition));
      
      tunnelRef.current.position.copy(localPos);
      
      tunnelRef.current.children.forEach((group, i) => {
        group.position.z += candlesticks[i].speed;
        if (group.position.z > 1000) group.position.z -= 6000;
      });
    }
  });

  return (
    <group ref={tunnelRef}>
      {candlesticks.map((candle, i) => (
        <group key={i} position={[candle.x, candle.y, candle.z]}>
          <mesh>
            <cylinderGeometry args={[1.0, 1.0, candle.wickHeight, 4]} />
            <meshStandardMaterial 
              color={candle.isGreen ? "#00ff00" : "#ff0044"} 
              emissive={candle.isGreen ? "#00ff00" : "#ff0044"} 
              emissiveIntensity={2.0} 
            />
          </mesh>
          <mesh>
            <boxGeometry args={[8, candle.height, 8]} />
            <meshStandardMaterial 
              color={candle.isGreen ? "#00ff00" : "#ff0044"} 
              transparent 
              opacity={0.9}
              emissive={candle.isGreen ? "#00aa00" : "#aa0022"}
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
"""
content = re.sub(r'const CandlestickTunnel = \(\) => \{.*?\}\);\n\n  return \(\n    <group ref=\{tunnelRef\}.*?</group>\n  \);\n\};', new_tunnel.strip('\n'), content, flags=re.DOTALL)

# Also update the render call
content = content.replace('<CandlestickTunnel />', '{visible && <CandlestickTunnel worldPosition={position} />}')

with open('src/pages/demo3d/worlds/ContangoQuant.jsx', 'w') as f:
    f.write(content)

print("Contango patched.")
