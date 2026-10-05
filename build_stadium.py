import re

with open('src/pages/demo3d/worlds/WorldFantasyQuant.jsx', 'r') as f:
    content = f.read()

stadium_component = """
const StadiumGeometry = () => {
  const tiers = 20;
  
  // Build the concrete rings
  const concreteRings = [];
  for (let i = 0; i < tiers; i++) {
    const radius = 600 + i * 80;
    const y = i * 40 - 100;
    // We leave a gap for the Jumbotron
    concreteRings.push(
      <mesh key={`ring-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 20, 16, 100, Math.PI * 1.5]} />
        <meshStandardMaterial color="#222222" roughness={0.9} />
      </mesh>
    );
  }

  // Fans as instances
  const fanMeshRef = useRef();
  const fanCount = 10000;
  
  useEffect(() => {
    if (!fanMeshRef.current) return;
    const tempObj = new THREE.Object3D();
    const tempColor = new THREE.Color();
    const colors = ['#ff0044', '#0044ff', '#ffffff', '#00ff00', '#ffaa00'];
    
    let index = 0;
    for (let i = 0; i < tiers; i++) {
      const radius = 600 + i * 80;
      const y = i * 40 - 100;
      const fansInRow = Math.floor((radius * Math.PI * 1.5) / 10);
      
      for (let j = 0; j < fansInRow; j++) {
        if (index >= fanCount) break;
        
        const angle = (j / fansInRow) * Math.PI * 1.5;
        tempObj.position.set(
          Math.cos(angle) * radius,
          y + 15,
          Math.sin(angle) * radius
        );
        
        // Randomly offset slightly
        tempObj.position.x += (Math.random() - 0.5) * 5;
        tempObj.position.z += (Math.random() - 0.5) * 5;
        
        tempObj.updateMatrix();
        fanMeshRef.current.setMatrixAt(index, tempObj.matrix);
        
        tempColor.set(colors[Math.floor(Math.random() * colors.length)]);
        fanMeshRef.current.setColorAt(index, tempColor);
        index++;
      }
    }
    
    fanMeshRef.current.instanceMatrix.needsUpdate = true;
    if (fanMeshRef.current.instanceColor) fanMeshRef.current.instanceColor.needsUpdate = true;
  }, []);

  return (
    <group rotation={[0, Math.PI * 1.25, 0]}>
      {concreteRings}
      <instancedMesh ref={fanMeshRef} args={[null, null, fanCount]}>
        <boxGeometry args={[8, 15, 8]} />
        <meshStandardMaterial roughness={0.8} />
      </instancedMesh>
    </group>
  );
};
"""

content = re.sub(r'const StadiumCrowd = \(\) => \{.*?</points>\n  \);\n\};', stadium_component.strip('\n'), content, flags=re.DOTALL)
content = content.replace('<StadiumCrowd />', '<StadiumGeometry />')

with open('src/pages/demo3d/worlds/WorldFantasyQuant.jsx', 'w') as f:
    f.write(content)

print("Stadium Geometry added.")
