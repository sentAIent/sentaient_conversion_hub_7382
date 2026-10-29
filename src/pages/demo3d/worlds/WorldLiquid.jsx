import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function WorldLiquid({ position, visible }) {
  const coinsRef = useRef();
  const tokenForgeRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const coreRef = useRef();

  const coinCount = 1800;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // Cascading cryptocurrency liquid waterfall (strictly in mid-background Z: -850 to -320)
    if (coinsRef.current) {
      for (let i = 0; i < coinCount; i++) {
        const col = i % 36;
        const row = Math.floor(i / 36);
        const x = (col - 18) * 18;
        const flowOffset = (row * 14 + t * 220) % 550;
        const z = -850 + flowOffset; // Stays between -850 and -300, safely away from camera at Z=0

        let y = 280;
        if (z > -600) {
          y = 280 - Math.pow((z + 600) * 0.12, 2);
        }
        if (y < -215) {
          y = -215 + Math.abs(Math.sin(t * 8 + i) * 18);
        }

        dummy.position.set(x, y, z);
        dummy.rotation.x = t * 2.2 + i;
        dummy.rotation.y = t * 3.1 + i;
        dummy.updateMatrix();
        coinsRef.current.setMatrixAt(i, dummy.matrix);
      }
      coinsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Spinning cryptocurrency creation engine / forge rings
    if (ring1Ref.current) ring1Ref.current.rotation.y = t * 0.6;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.45;
    if (ring3Ref.current) ring3Ref.current.rotation.z = -t * 0.35;
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.9;
      coreRef.current.rotation.x = Math.sin(t * 0.8) * 0.3;
      const s = 1.0 + Math.sin(t * 2.5) * 0.08;
      coreRef.current.scale.set(s, s, s);
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* High-End Vault Financial Lighting */}
      <ambientLight intensity={0.4} color="#1c1301" />
      <directionalLight position={[0, 900, -300]} intensity={3.5} color="#ffe58f" />
      <directionalLight position={[-800, 400, 300]} intensity={1.8} color="#ffd700" />
      <pointLight position={[0, 100, -750]} intensity={25} distance={1600} color="#ffaa00" />
      <pointLight position={[0, -180, -750]} intensity={15} distance={1000} color="#ffd700" />

      {/* Floating Gold & Amber Sparkles */}
      <Sparkles count={800} scale={[1800, 800, 1800]} size={8} speed={0.5} opacity={0.55} color="#ffd700" position={[0, 50, -750]} />

      {/* ------------------------------------------------------------- */}
      {/* 1. HIGH-GLOSS REFLECTIVE OBSIDIAN VAULT FLOOR                */}
      {/* ------------------------------------------------------------- */}
      <mesh position={[0, -240, -750]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4200, 4200]} />
        <meshStandardMaterial color="#070603" roughness={0.12} metalness={0.92} />
      </mesh>

      {/* Vault Security Grid Lines on Floor */}
      {[-300, -150, 0, 150, 300].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, -238, -750]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[idx === 2 ? 8 : 2.5, 3600]} />
          <meshBasicMaterial color={idx === 2 ? "#ffd700" : "#ffaa00"} transparent opacity={0.45} />
        </mesh>
      ))}

      {/* ------------------------------------------------------------- */}
      {/* 2. REAR VAULT CYCLORAMA & CRYPTOGRAPHIC SECURITY BLAST DOOR   */}
      {/* ------------------------------------------------------------- */}
      <mesh position={[0, 160, -1050]}>
        <boxGeometry args={[1800, 1200, 80]} />
        <meshStandardMaterial color="#0c0903" roughness={0.7} metalness={0.85} />
      </mesh>

      {/* Security Blast Door Concentric Rings on Back Wall */}
      <group position={[0, 160, -1005]}>
        <mesh>
          <ringGeometry args={[180, 210, 64]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={1.2} />
        </mesh>
        <mesh>
          <ringGeometry args={[300, 320, 64]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.8} />
        </mesh>
        <mesh>
          <ringGeometry args={[440, 455, 64]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. CASCADING CRYPTO CURRENCY WATERFALL (STRICTLY Z: -850 to -300) */}
      {/* ------------------------------------------------------------- */}
      <instancedMesh ref={coinsRef} args={[null, null, coinCount]}>
        <cylinderGeometry args={[6.5, 6.5, 2.2, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.12} emissive="#664400" emissiveIntensity={0.6} />
      </instancedMesh>

      {/* Molten Gold Crucible Reservoir Basin catching the coins */}
      <mesh position={[0, -225, -550]}>
        <cylinderGeometry args={[340, 380, 20, 32]} />
        <meshStandardMaterial color="#1a1204" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, -214, -550]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[335, 32]} />
        <meshStandardMaterial color="#ffbb00" emissive="#ff8800" emissiveIntensity={1.8} roughness={0.1} metalness={0.95} />
      </mesh>

      {/* ------------------------------------------------------------- */}
      {/* 4. CRYPTOCURRENCY CREATION FORGE / TOKEN MINTING CORE (Z: -750) */}
      {/* ------------------------------------------------------------- */}
      <group ref={tokenForgeRef} position={[0, 70, -750]}>
        
        {/* Stepped Vault Plinth Platform */}
        <mesh position={[0, -280, 0]}>
          <cylinderGeometry args={[180, 220, 40, 16]} />
          <meshStandardMaterial color="#0c0903" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh position={[0, -250, 0]}>
          <cylinderGeometry args={[140, 160, 25, 16]} />
          <meshStandardMaterial color="#181205" metalness={0.9} roughness={0.18} />
        </mesh>

        {/* Ring 1 - Outer Gyroscopic Amber Ring */}
        <group ref={ring1Ref}>
          <mesh>
            <torusGeometry args={[160, 3.8, 16, 80]} />
            <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={2.5} metalness={0.95} roughness={0.1} />
          </mesh>
        </group>

        {/* Ring 2 - Meridian Gold Precision Ring */}
        <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[125, 2.8, 16, 80]} />
            <meshStandardMaterial color="#ffd700" emissive="#ffbb00" emissiveIntensity={2.2} metalness={0.95} roughness={0.1} />
          </mesh>
        </group>

        {/* Ring 3 - Equatorial Horizon Scanner */}
        <group ref={ring3Ref}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[95, 2.0, 16, 80]} />
            <meshStandardMaterial color="#fff0aa" emissive="#ffd700" emissiveIntensity={2.0} metalness={0.95} roughness={0.1} />
          </mesh>
        </group>

        {/* Central Smart Token Core (Luminous Octahedron) */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[38, 0]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffd700" emissiveIntensity={3.6} roughness={0.08} metalness={0.9} />
        </mesh>

        <pointLight color="#ffd700" intensity={18} distance={800} />

        {/* Vertical Data Column */}
        <mesh position={[0, 320, 0]}>
          <cylinderGeometry args={[3, 3, 750, 16]} />
          <meshBasicMaterial color="#ffd700" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 5. 3D HOLOGRAPHIC TYPOGRAPHY BLADE (CLEANLY OFF TO THE SIDE)  */}
      {/* ------------------------------------------------------------- */}
      <group position={[-540, 100, -580]} rotation={[0, Math.PI / 10, 0]}>
        {/* Holographic Frosted Obsidian Blade Backing with generous padding */}
        <mesh position={[150, -10, -2]}>
          <planeGeometry args={[300, 260]} />
          <meshStandardMaterial 
            color="#0b0802" 
            transparent 
            opacity={0.52} 
            roughness={0.12} 
            metalness={0.92} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        {/* Glowing Gold Top Rail */}
        <mesh position={[150, 120, 0]}>
          <boxGeometry args={[302, 3, 2]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={3.2} />
        </mesh>

        {/* Category Badge */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[20, 92, 0]}
          fontSize={11}
          color="#ffd700"
          letterSpacing={0.12}
          anchorX="left"
          anchorY="middle"
        >
          EXP // 12  ◈  FINANCIAL INTELLIGENCE
        </Text>

        {/* World Name Title */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[20, 50, 0]}
          fontSize={46}
          color="#ffffff"
          outlineWidth={1.5}
          outlineColor="#443000"
          anchorX="left"
          anchorY="middle"
        >
          LIQUID
        </Text>

        {/* Value Proposition Headline */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[20, 8, 0]}
          fontSize={13.5}
          color="#ffaa00"
          maxWidth={260}
          lineHeight={1.3}
          anchorX="left"
          anchorY="middle"
        >
          AUTONOMOUS ACCOUNTING, TAX INTELLIGENCE & TOKEN FORGE
        </Text>

        {/* System Capability Description */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[20, -50, 0]}
          fontSize={11}
          color="#fef08a"
          maxWidth={260}
          lineHeight={1.45}
          anchorX="left"
          anchorY="middle"
        >
          Distill enterprise financial complexity into instant clarity with automated tax liability calculation, live P&L auditing, and smart token minting.
        </Text>

        {/* Telemetry Pills */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[20, -105, 0]}
          fontSize={9.5}
          color="#ffd700"
          letterSpacing={0.05}
          anchorX="left"
          anchorY="middle"
        >
          [ ◈ TAX AUDIT  ◈ LIVE LEDGER  ◈ SMART TOKEN ]
        </Text>
      </group>
    </group>
  );
}
