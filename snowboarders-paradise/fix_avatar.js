const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

const boxMan = `export function IncredibleSnowboarder({ animState, colors, ghost }) {
  const { carving, inAir, grabbing, wipeout } = animState || { carving: 0, inAir: false, grabbing: false, wipeout: false };

  const bodyLeanZ = carving === -1 ? -0.3 : (carving === 1 ? 0.3 : 0);
  const bodyLeanX = inAir ? (grabbing ? 0.6 : 0) : 0;
  const armRotZ = inAir ? (grabbing ? -1.0 : 0) : (carving === -1 ? -0.5 : (carving === 1 ? 0.5 : 0));

  const tProps = ghost ? { transparent: true, opacity: 0.3 } : {};

  if (wipeout) {
    return (
      <group position={[0, -0.4, 0]}>
        <mesh position={[0, 0.2, 0]} rotation={[1.5, 0, Math.random()]}>
          <boxGeometry args={[0.6, 1.2, 0.4]} />
          <meshStandardMaterial color="#ff0055" {...tProps} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={[0, -0.4, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.05, 1.8]} />
        <meshStandardMaterial color={colors?.snowboard || "#00d0ff"} metalness={0.8} emissive={colors?.snowboard || "#00d0ff"} emissiveIntensity={0.5} {...tProps} />
      </mesh>
      
      <mesh position={[0, 0.1, -0.3]}><boxGeometry args={[0.2, 0.2, 0.3]} /><meshStandardMaterial color="#111" {...tProps} /></mesh>
      <mesh position={[0, 0.1, 0.3]}><boxGeometry args={[0.2, 0.2, 0.3]} /><meshStandardMaterial color="#111" {...tProps} /></mesh>
      
      <group position={[0, 0.8, 0]} rotation={[bodyLeanX, Math.PI/2, bodyLeanZ]}>
        <mesh><boxGeometry args={[0.5, 0.7, 0.3]} /><meshStandardMaterial color={colors?.suit || "#ff0055"} roughness={0.9} {...tProps} /></mesh>
        
        <mesh position={[0, 0, -0.2]}><boxGeometry args={[0.4, 0.5, 0.15]} /><meshStandardMaterial color="#222" {...tProps} /></mesh>

        <group position={[0, 0.5, 0]}>
          <mesh><boxGeometry args={[0.3, 0.35, 0.35]} /><meshStandardMaterial color="#111" metalness={0.6} {...tProps} /></mesh>
          <mesh position={[0, 0.05, 0.18]}><boxGeometry args={[0.32, 0.15, 0.05]} /><meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1} {...tProps} /></mesh>
        </group>
        
        <group position={[-0.35, 0.2, 0]} rotation={[0, 0, -0.2 + armRotZ]}>
          <mesh position={[0, -0.3, 0]}><boxGeometry args={[0.15, 0.6, 0.15]} /><meshStandardMaterial color={colors?.suit || "#ff0055"} {...tProps} /></mesh>
        </group>
        <group position={[0.35, 0.2, 0]} rotation={[0, 0, 0.2 - armRotZ]}>
          <mesh position={[0, -0.3, 0]}><boxGeometry args={[0.15, 0.6, 0.15]} /><meshStandardMaterial color={colors?.suit || "#ff0055"} {...tProps} /></mesh>
        </group>
      </group>
      
      <group position={[0, 0.4, -0.3]} rotation={[inAir ? 0.2 : 0, 0, 0]}>
        <mesh><boxGeometry args={[0.2, 0.6, 0.2]} /><meshStandardMaterial color="#222" {...tProps} /></mesh>
      </group>
      <group position={[0, 0.4, 0.3]} rotation={[inAir ? -0.2 : 0, 0, 0]}>
        <mesh><boxGeometry args={[0.2, 0.6, 0.2]} /><meshStandardMaterial color="#222" {...tProps} /></mesh>
      </group>
    </group>
  );
}`;

const betterAvatar = `export function IncredibleSnowboarder({ animState, colors, ghost }) {
  const { carving, inAir, grabbing, wipeout } = animState || { carving: 0, inAir: false, grabbing: false, wipeout: false };

  const bodyLeanZ = carving === -1 ? -0.3 : (carving === 1 ? 0.3 : 0);
  const bodyLeanX = inAir ? (grabbing ? 0.6 : 0) : 0;
  const armRotZ = inAir ? (grabbing ? -1.0 : 0) : (carving === -1 ? -0.5 : (carving === 1 ? 0.5 : 0));

  const tProps = ghost ? { transparent: true, opacity: 0.3 } : {};
  const suitColor = colors?.suit || "#ff4400";
  
  if (wipeout) {
    return (
      <group position={[0, -0.4, 0]}>
        <group position={[0, 0.2, 0]} rotation={[1.5, 0, Math.random()]}>
           <mesh position={[0,0,0]}><capsuleGeometry args={[0.2, 0.6, 4, 8]} /><meshStandardMaterial color={suitColor} {...tProps} /></mesh>
        </group>
      </group>
    );
  }

  return (
    <group position={[0, -0.4, 0]}>
      {/* Torso */}
      <group position={[0, 0.8, 0]} rotation={[bodyLeanX, 1.57, bodyLeanZ]}>
        <mesh position={[0, 0, 0]}><capsuleGeometry args={[0.18, 0.4, 4, 16]} /><meshStandardMaterial color={suitColor} roughness={0.8} {...tProps}/></mesh>
        
        {/* Head */}
        <group position={[0, 0.45, 0]}>
          <mesh position={[0, 0, 0]}><sphereGeometry args={[0.16, 16, 16]} /><meshStandardMaterial color="#222" roughness={0.3} metalness={0.5} {...tProps} /></mesh>
          <mesh position={[0, 0, 0.12]}><boxGeometry args={[0.18, 0.08, 0.05]} /><meshStandardMaterial color="#000" emissive={colors?.snowboard || "#00d0ff"} emissiveIntensity={1.5} {...tProps} /></mesh>
        </group>
        
        {/* Left Arm */}
        <group position={[-0.25, 0.15, 0]} rotation={[0, 0, -0.2 + armRotZ]}>
          <mesh position={[0, -0.2, 0]}><capsuleGeometry args={[0.06, 0.3, 4, 8]} /><meshStandardMaterial color={suitColor} {...tProps} /></mesh>
        </group>
        
        {/* Right Arm */}
        <group position={[0.25, 0.15, 0]} rotation={[0, 0, 0.2 - armRotZ]}>
          <mesh position={[0, -0.2, 0]}><capsuleGeometry args={[0.06, 0.3, 4, 8]} /><meshStandardMaterial color={suitColor} {...tProps}/></mesh>
        </group>
      </group>
      
      {/* Left Leg */}
      <group position={[0, 0.4, -0.2]} rotation={[inAir ? 0.2 : 0, 0, 0]}>
        <mesh position={[0, -0.2, 0]}><capsuleGeometry args={[0.08, 0.4, 4, 8]} /><meshStandardMaterial color={suitColor} {...tProps}/></mesh>
      </group>
      
      {/* Right Leg */}
      <group position={[0, 0.4, 0.2]} rotation={[inAir ? -0.2 : 0, 0, 0]}>
        <mesh position={[0, -0.2, 0]}><capsuleGeometry args={[0.08, 0.4, 4, 8]} /><meshStandardMaterial color={suitColor} {...tProps}/></mesh>
      </group>
    </group>
  );
}`;

code = code.replace(boxMan, betterAvatar);
fs.writeFileSync('components/DetailedModels.js', code);
