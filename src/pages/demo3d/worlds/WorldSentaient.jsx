import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sparkles, Text, Float, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================================================
// WORLD SENTAIENT: Sovereign Autonomous AI Venture Studio & Multi-Industry Lab
// Monumental Kinetic Toroidal Field Nexus, Multi-Sector Orbital Amphitheater,
// Dedicated Industry Pods, and Dynamic Quantum Synapse Conduits.
// ===========================================================================

export default function WorldSentaient({ position, rotation, visible }) {
  const centralToroidRef = useRef();
  const innerToroidRef = useRef();
  const poloidalGroupRef = useRef();
  const coreSingularityRef = useRef();
  const industryGroupRef = useRef();
  const radarRingsRef = useRef();
  const sweepBeamRef = useRef();

  // Load official high-res sentAIent emblem
  const logoTex = useLoader(THREE.TextureLoader, '/sentaient_logo_final.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  // The 8 Major Global Industry Sectors engineered by sentAIent
  const industrySectors = useMemo(() => [
    { title: 'FINTECH & QUANT MARKETS', category: 'High-Frequency Order Books & Liquidity', x: -380, z: -430, color: '#22c55e' },
    { title: 'AUTONOMOUS LEGAL COUNSEL', category: 'Contract Auditing & Liability Defense', x: 380, z: -430, color: '#a855f7' },
    { title: 'BIOTECH & WELLNESS', category: 'Functional Bioactives & Neural Entrainment', x: -460, z: -620, color: '#00d2ff' },
    { title: 'DEFENSE & THREAT INTEL', category: 'Global Disaster Radar & Perimeter AI', x: 460, z: -620, color: '#f59e0b' },
    { title: 'ENTERPRISE OPS & STRATEGY', category: 'Autonomous Business Ops & Playbooks', x: -280, z: -760, color: '#00e5ff' },
    { title: 'AI SOFTWARE ENGINEERING', category: 'Autonomous Code Generation & Architecture', x: 280, z: -760, color: '#38bdf8' },
    { title: 'OMNICHANNEL MARKETING', category: 'Predictive Audience Growth & Virality', x: -140, z: -860, color: '#10b981' },
    { title: 'CLOUD & RUNTIME DEFENSE', category: 'Autonomous CTO & Self-Healing Edge', x: 140, z: -860, color: '#60a9ff' },
  ], []);

  // 12 Poloidal Tokamak Magnetic Flux Rings
  const poloidalLoops = useMemo(() => {
    const loops = [];
    const R = 135;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      loops.push({
        x: Math.cos(a) * R,
        y: Math.sin(a) * R,
        rotZ: a + Math.PI / 2
      });
    }
    return loops;
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.elapsedTime;

    // 1. Kinetic Toroidal Field Dynamic Rotation & Breathing
    if (centralToroidRef.current) {
      centralToroidRef.current.position.y = Math.sin(t * 1.4) * 8;
      centralToroidRef.current.rotation.z = t * 0.22;
      centralToroidRef.current.rotation.x = Math.sin(t * 0.5) * 0.14;
      centralToroidRef.current.rotation.y = Math.cos(t * 0.4) * 0.1;
    }

    // 2. Counter-rotating inner Toroid
    if (innerToroidRef.current) {
      innerToroidRef.current.rotation.z = -t * 0.35;
      innerToroidRef.current.rotation.y = -Math.sin(t * 0.7) * 0.18;
    }

    // 3. Poloidal magnetic loops field spin
    if (poloidalGroupRef.current) {
      poloidalGroupRef.current.rotation.z = t * 0.12;
    }

    // 4. Central Singularity Core Pulsing
    if (coreSingularityRef.current) {
      const s = 1.0 + Math.sin(t * 2.2) * 0.06;
      coreSingularityRef.current.scale.set(s, s, s);
    }

    // 5. Proximity Industry Radar Scanner Beam
    if (sweepBeamRef.current) {
      sweepBeamRef.current.rotation.z = -t * 0.75;
    }

    // 6. Industry Sector Beacons subtle levitation
    if (industryGroupRef.current) {
      industryGroupRef.current.children.forEach((pod, idx) => {
        pod.position.y = -130 + Math.sin(t * 2.0 + idx * 0.9) * 6;
      });
    }
  });

  const scroll = useScroll();
  const curP = (window._isTransitActive && window._warpProgress !== undefined)
    ? window._warpProgress 
    : (window._currentProgress !== undefined ? window._currentProgress : (scroll ? scroll.offset : 0.505));

  if (!visible || curP < 0.480 || curP > 0.528) return null;

  return (
    <group position={position} rotation={rotation}>
      
      {/* SentAIent Signature Lighting: Electric Azure & Midnight Space Slate */}
      <ambientLight intensity={0.45} color="#0c1626" />
      <directionalLight position={[700, 800, -200]} intensity={3.8} color="#60a9ff" />
      <directionalLight position={[-700, 700, 300]} intensity={2.5} color="#38bdf8" />
      <pointLight position={[0, 10, -550]} intensity={30} distance={1800} color="#60a9ff" />
      <pointLight position={[0, 140, -550]} intensity={25} distance={1500} color="#38bdf8" />
      <pointLight position={[0, -120, -550]} intensity={20} distance={1200} color="#fbbf24" />

      {/* Atmospheric SentAIent Blue Quantum Sparkles */}
      <Sparkles count={950} scale={[2400, 950, 2400]} size={12} speed={0.4} opacity={0.7} color="#60a9ff" position={[0, 60, -550]} />
      <Sparkles count={550} scale={[1600, 750, 1600]} size={14} speed={0.5} opacity={0.65} color="#38bdf8" position={[0, 60, -550]} />
      <Sparkles count={320} scale={[1100, 550, 1100]} size={15} speed={0.3} opacity={0.75} color="#fbbf24" position={[0, 100, -550]} />

      {/* Deep Midnight Navy Reflective Floor (#202733 tone) */}
      <mesh position={[0, -220, -550]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4800, 4800]} />
        <meshStandardMaterial color="#060c18" roughness={0.12} metalness={0.92} />
      </mesh>

      {/* High-Tech Radial Multi-Industry Grid */}
      <mesh position={[0, -218, -550]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2000, 2000, 40, 40]} />
        <meshBasicMaterial color="#60a9ff" wireframe transparent opacity={0.14} />
      </mesh>

      {/* ------------------------------------------------------------- */}
      {/* 1. SECTOR RADAR ACCELERATOR RINGS & SWEEPING SCANNER          */}
      {/* ------------------------------------------------------------- */}
      <group ref={radarRingsRef} position={[0, -215, -550]} rotation={[-Math.PI / 2, 0, 0]}>
        {[200, 350, 520, 720].map((radius, idx) => (
          <mesh key={idx}>
            <ringGeometry args={[radius, radius + 3.5, 80]} />
            <meshBasicMaterial 
              color={idx % 2 === 0 ? "#60a9ff" : "#fbbf24"} 
              transparent 
              opacity={0.42 - idx * 0.08} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        ))}

        {/* Real-Time Radar Sweep Beam */}
        <mesh ref={sweepBeamRef}>
          <ringGeometry args={[20, 750, 48, 1, 0, Math.PI / 3]} />
          <meshBasicMaterial 
            color="#60a9ff" 
            transparent 
            opacity={0.24} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE MONUMENTAL KINETIC TOROIDAL FIELD NEXUS                */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 10, -550]}>

        {/* Primary Toroidal Magnetic Flux Shell */}
        <group ref={centralToroidRef}>
          {/* Wireframe Electric Azure Lattice */}
          <mesh>
            <torusGeometry args={[135, 48, 24, 72]} />
            <meshBasicMaterial 
              color="#60a9ff" 
              wireframe 
              transparent 
              opacity={0.35} 
              blending={THREE.AdditiveBlending} 
            />
          </mesh>

          {/* Deep Midnight Navy Specular Core Body */}
          <mesh>
            <torusGeometry args={[135, 45, 20, 48]} />
            <meshStandardMaterial 
              color="#202733" 
              emissive="#0d2444" 
              emissiveIntensity={1.8} 
              roughness={0.15} 
              metalness={0.88} 
              transparent 
              opacity={0.5} 
            />
          </mesh>
        </group>

        {/* Inner Counter-Rotating Quantum Torus (Cerulean Core) */}
        <group ref={innerToroidRef}>
          <mesh>
            <torusGeometry args={[115, 26, 18, 48]} />
            <meshStandardMaterial 
              color="#38bdf8" 
              emissive="#0284c7" 
              emissiveIntensity={3.2} 
              roughness={0.12} 
              metalness={0.94} 
              wireframe 
              transparent 
              opacity={0.6} 
              blending={THREE.AdditiveBlending} 
            />
          </mesh>
        </group>

        {/* Poloidal Magnetic Cross-Section Loops (Tokamak Flux Rings) */}
        <group ref={poloidalGroupRef}>
          {poloidalLoops.map((loop, idx) => (
            <group key={idx} position={[loop.x, loop.y, 0]} rotation={[0, 0, loop.rotZ]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[52, 1.4, 12, 32]} />
                <meshBasicMaterial 
                  color={idx % 3 === 0 ? "#fbbf24" : "#60a9ff"} 
                  transparent 
                  opacity={0.48} 
                  blending={THREE.AdditiveBlending} 
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* Concentric Sovereign Gold Equatorial Accelerator Ring */}
        <mesh rotation={[0, 0, 0]}>
          <ringGeometry args={[133, 137, 80]} />
          <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.75} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <ringGeometry args={[186, 190, 80]} />
          <meshBasicMaterial color="#60a9ff" side={THREE.DoubleSide} transparent opacity={0.38} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Central Singularity & Emissive AI Brain Core */}
        <group ref={coreSingularityRef}>
          <mesh>
            <sphereGeometry args={[44, 32, 32]} />
            <meshStandardMaterial 
              color="#0284c7" 
              emissive="#60a9ff" 
              emissiveIntensity={2.8} 
              roughness={0.2} 
              metalness={0.8} 
              wireframe 
            />
          </mesh>
          <mesh scale={0.82}>
            <sphereGeometry args={[44, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={3.8} />
          </mesh>
          <pointLight color="#60a9ff" intensity={24} distance={500} />
          <pointLight color="#fbbf24" intensity={18} distance={400} />
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. MULTI-INDUSTRY SECTOR BEACONS & ENERGY ARCS                */}
      {/* ------------------------------------------------------------- */}
      <group ref={industryGroupRef}>
        {industrySectors.map((sector, idx) => (
          <group key={idx} position={[sector.x, -130, sector.z]}>
            {/* Luminous Industry Beacon Core */}
            <mesh position={[0, 30, 0]}>
              <sphereGeometry args={[15, 24, 24]} />
              <meshStandardMaterial color="#ffffff" emissive={sector.color} emissiveIntensity={3.8} />
            </mesh>
            <pointLight position={[0, 30, 0]} color={sector.color} intensity={12} distance={260} />

            {/* Pulsing Beacon Halo Rings */}
            <mesh position={[0, 30, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[20, 24, 32]} />
              <meshBasicMaterial color={sector.color} transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 30, 0]} rotation={[Math.PI / 3, 0.3, 0]}>
              <torusGeometry args={[28, 1.4, 12, 32]} />
              <meshStandardMaterial color="#ffffff" emissive={sector.color} emissiveIntensity={2.6} />
            </mesh>

            {/* Vertical Light Column connecting to Floor */}
            <mesh position={[0, -20, 0]}>
              <cylinderGeometry args={[2.5, 4.5, 100, 16]} />
              <meshBasicMaterial color={sector.color} transparent opacity={0.45} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Connecting Energy Arc bridging back to Central Toroidal Core */}
            <line>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 30, 0, -sector.x, 180, -550 - sector.z])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial attach="material" color={sector.color} linewidth={2} transparent opacity={0.42} />
            </line>

            {/* Sector Card Callout */}
            <group position={[0, 75, 0]}>
              <Text
                font="/fonts/Roboto.woff"
                fallbackFonts={[]}
                position={[0, 14, 0]}
                fontSize={13}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={1.5}
                outlineColor="#020617"
              >
                {sector.title}
              </Text>
              <Text
                font="/fonts/Roboto.woff"
                fallbackFonts={[]}
                position={[0, -3, 0]}
                fontSize={10}
                color={sector.color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={1.2}
                outlineColor="#020617"
              >
                {sector.category}
              </Text>
            </group>
          </group>
        ))}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. FLOATING OFFICIAL SENTAIENT EMBLEM & TITLE (ABOVE VISUALS)  */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 280, -420]}>
        {/* Floating High-Res sentAIent Logo */}
        <Float speed={2} rotationIntensity={0.05} floatIntensity={0.35}>
          <mesh position={[0, 24, 0]}>
            <planeGeometry args={[260, 65]} />
            <meshBasicMaterial map={logoTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </Float>

        {/* Multi-Industry Subtitle */}
        <Text 
          position={[0, -28, 0]} 
          fontSize={24} 
          color="#60a9ff" 
          outlineWidth={1.2}
          outlineColor="#030816"
          anchorX="center" 
          anchorY="middle"
          letterSpacing={0.14}
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]}
        >
          AUTONOMOUS AI PLATFORMS ACROSS DIVERSE GLOBAL INDUSTRIES
        </Text>
      </group>
    </group>
  );
}
