const fs = require('fs');
let code = fs.readFileSync('snowboarders-paradise/components/Player.js', 'utf8');

const newAvatar = `export function SnowboarderAvatar({ animState, colors = {} }) {
  const { carving, inAir, grabbing, wipeout } = animState;
  
  const getCol = (key, def) => colors[key] || def;

  // Ultra-realistic materials
  const jacketMaterial = <meshStandardMaterial color={getCol('jacket', '#1a1a1a')} roughness={0.7} metalness={0.1} />;
  const pantsMaterial = <meshStandardMaterial color={getCol('pants', '#1a1a1a')} roughness={0.8} metalness={0.1} />;
  const skinMaterial = <meshStandardMaterial color="#8d5524" roughness={0.4} />;
  const gloveMaterial = <meshStandardMaterial color="#0f0f0f" roughness={0.9} />;
  const bootsMaterial = <meshStandardMaterial color={getCol('boots', '#222222')} roughness={0.8} />;
  const bindingsMaterial = <meshStandardMaterial color={getCol('bindings', '#ff0000')} roughness={0.5} />;
  const beanieMaterial = <meshStandardMaterial color={getCol('beanie', '#222')} roughness={0.9} />;
  const faceGuardMaterial = <meshStandardMaterial color={getCol('faceGuard', '#111')} roughness={0.9} />;
  const earmuffsMaterial = <meshStandardMaterial color={getCol('earmuffs', '#fff')} roughness={0.9} />;
  const backpackMaterial = <meshStandardMaterial color={getCol('backpack', '#444')} roughness={0.6} />;

  if (wipeout) {
    return (
      <group position={[0, -0.4, 0]}>
        <group position={[0, 0.1, 0]} rotation={[1.5, 0, Math.random()]}>
           <mesh position={[0,0,0]}><boxGeometry args={[0.35, 0.5, 0.2]} />{jacketMaterial}</mesh>
        </group>
      </group>
    );
  }
  
  const defaultLegBent = 0.2;
  const leftLegRot = inAir ? (grabbing ? 0.8 : 0.4) : (carving === -1 ? 0.6 : defaultLegBent);
  const rightLegRot = inAir ? (grabbing ? -0.8 : -0.4) : (carving === 1 ? -0.6 : -defaultLegBent);
  const bodyLeanZ = carving === -1 ? -0.3 : (carving === 1 ? 0.3 : 0);
  const bodyLeanX = inAir ? (grabbing ? 0.6 : 0) : 0;
  
  const leftArmRotZ = inAir && grabbing ? -1.5 : (inAir ? -1.0 : -0.3);
  const leftArmRotX = inAir && grabbing ? 0.5 : 0;
  const rightArmRotZ = inAir && grabbing ? 1.0 : (inAir ? 1.0 : 0.3);

  return (
    <group position={[0, -0.4, 0]}>
      {/* Bindings */}
      <mesh position={[0, -0.05, -0.25]}><boxGeometry args={[0.2, 0.05, 0.2]} />{bindingsMaterial}</mesh>
      <mesh position={[0, -0.05, 0.25]}><boxGeometry args={[0.2, 0.05, 0.2]} />{bindingsMaterial}</mesh>

      <group position={[0, 0.6, 0]} rotation={[bodyLeanX, 1.57, bodyLeanZ]}>
        {/* Torso - Jacket */}
        <mesh position={[0, 0, 0]}><boxGeometry args={[0.35, 0.55, 0.22]} />{jacketMaterial}</mesh>
        {/* Backpack */}
        <mesh position={[0, 0, 0.15]}><boxGeometry args={[0.25, 0.4, 0.15]} />{backpackMaterial}</mesh>
        
        {/* Head Base */}
        <group position={[0, 0.4, 0]}>
          <mesh position={[0, 0, 0]}><boxGeometry args={[0.18, 0.22, 0.18]} />{skinMaterial}</mesh>
          {/* Beanie */}
          <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.2, 0.12, 0.2]} />{beanieMaterial}</mesh>
          {/* Earmuffs */}
          <mesh position={[0.11, 0, 0]}><boxGeometry args={[0.04, 0.1, 0.1]} />{earmuffsMaterial}</mesh>
          <mesh position={[-0.11, 0, 0]}><boxGeometry args={[0.04, 0.1, 0.1]} />{earmuffsMaterial}</mesh>
          {/* Face Guard */}
          <mesh position={[0, -0.05, -0.05]}><boxGeometry args={[0.19, 0.12, 0.15]} />{faceGuardMaterial}</mesh>
          {/* Goggles */}
          <mesh position={[0, 0.02, -0.1]}><boxGeometry args={[0.18, 0.08, 0.05]} /><meshStandardMaterial color="#000" emissive={getCol('goggles', '#ff9900')} emissiveIntensity={1.5} /></mesh>
        </group>
        
        {/* Left Arm */}
        <group position={[-0.22, 0.15, 0]} rotation={[leftArmRotX, 0, leftArmRotZ]}>
          <mesh position={[0, -0.2, 0]}><boxGeometry args={[0.12, 0.4, 0.12]} />{jacketMaterial}</mesh>
          <mesh position={[0, -0.42, 0]}><boxGeometry args={[0.13, 0.1, 0.13]} />{gloveMaterial}</mesh>
        </group>
        {/* Right Arm */}
        <group position={[0.22, 0.15, 0]} rotation={[0, 0, rightArmRotZ]}>
          <mesh position={[0, -0.2, 0]}><boxGeometry args={[0.12, 0.4, 0.12]} />{jacketMaterial}</mesh>
          <mesh position={[0, -0.42, 0]}><boxGeometry args={[0.13, 0.1, 0.13]} />{gloveMaterial}</mesh>
        </group>
      </group>
      
      {/* Legs - Pants */}
      <mesh position={[0, 0.25, -0.25]} rotation={[leftLegRot, 0, 0]}>
        <boxGeometry args={[0.14, 0.5, 0.14]} />{pantsMaterial}
        {/* Boot */}
        <mesh position={[0, -0.25, 0]}><boxGeometry args={[0.16, 0.15, 0.18]} />{bootsMaterial}</mesh>
      </mesh>
      <mesh position={[0, 0.25, 0.25]} rotation={[rightLegRot, 0, 0]}>
        <boxGeometry args={[0.14, 0.5, 0.14]} />{pantsMaterial}
        {/* Boot */}
        <mesh position={[0, -0.25, 0]}><boxGeometry args={[0.16, 0.15, 0.18]} />{bootsMaterial}</mesh>
      </mesh>
    </group>
  );
}`;

code = code.replace(/export function SnowboarderAvatar\([\s\S]+?\}\s*\)\s*;\s*\}/m, newAvatar);
fs.writeFileSync('snowboarders-paradise/components/Player.js', code);
