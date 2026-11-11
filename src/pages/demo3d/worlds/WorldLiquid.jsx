import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function WorldLiquid({ position, visible }) {
  const coinsRef = useRef();
  const tokenForgeRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const coreRef = useRef();

  // Load official Liquid logo
  const logoTex = useLoader(THREE.TextureLoader, '/liquid_logo_gold.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  const coinCount = 1800;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // Cascading cryptocurrency liquid waterfall (strictly in background Z: -880 to -450)
    if (coinsRef.current) {
      for (let i = 0; i < coinCount; i++) {
        const col = i % 36;
        const row = Math.floor(i / 36);
        const x = (col - 18) * 18;
        const flowOffset = (row * 12 + t * 200) % 430;
        const z = -880 + flowOffset; // Stays between -880 and -450, strictly in background behind centerpiece

        let y = 260;
        if (z > -660) {
          y = 260 - Math.pow((z + 660) * 0.12, 2);
        }
        if (y < -215) {
          y = -215 + Math.abs(Math.sin(t * 8 + i) * 16);
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
      <pointLight position={[0, 100, -750]} intensity={22.5} distance={1600} color="#ffaa00" />
      <pointLight position={[0, -180, -750]} intensity={13.5} distance={1000} color="#ffd700" />

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
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={1.08} />
        </mesh>
        <mesh>
          <ringGeometry args={[300, 320, 64]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.72} />
        </mesh>
        <mesh>
          <ringGeometry args={[440, 455, 64]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.54} />
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
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 5. CENTERPIECE: LIQUID LOGO & TITLE PROMINENTLY IN FOREGROUND */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 240, -300]}>
        {/* Floating High-Res Liquid Emblem - Clear Foreground */}
        <Float speed={2} rotationIntensity={0.05} floatIntensity={0.3}>
          <mesh position={[0, 85, 0]}>
            <planeGeometry args={[140, 140]} />
            <meshBasicMaterial 
              map={logoTex} 
              transparent 
              depthWrite={false} 
            />
          </mesh>
        </Float>

        {/* Liquid Title */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, 0, 0]}
          fontSize={58}
          color="#ffffff"
          outlineWidth={2.0}
          outlineColor="#b45309"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          LIQUID
        </Text>

        {/* Subtitle - Significantly Enlarged & High Contrast */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, -48, 0]}
          fontSize={26}
          color="#ffd700"
          outlineWidth={1.2}
          outlineColor="#0b0802"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          FINANCIAL INTELLIGENCE & TAX FORGE
        </Text>
      </group>
    </group>
  );
}
