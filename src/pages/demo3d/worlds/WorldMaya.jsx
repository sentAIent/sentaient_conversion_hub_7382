import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================================================
// WORLD MAYA: Empathetic AI Avatar & 24/7 Enterprise Representative
// Sacred Holographic Lotus Sanctuary with Luminous Consciousness Pearl,
// Blossoming Iridescent Petals, Conversational Voice Waveforms, and 4 Core Pillars.
// ===========================================================================

export default function WorldMaya({ position, visible }) {
  const lotusGroupRef = useRef();
  const pearlRef = useRef();
  const innerPetalsRef = useRef();
  const midPetalsRef = useRef();
  const outerPetalsRef = useRef();
  const voiceRingsRef = useRef();
  const satellitesRef = useRef();

  // Load official Maya celestial lotus emblem
  const logoTex = useLoader(THREE.TextureLoader, '/maya_logo_final.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  // 4 Core Enterprise AI Pillars of Maya
  const capabilitySatellites = useMemo(() => [
    { title: 'Conversational Sales', code: 'SALES', color: '#f59e0b', angle: 0 },
    { title: 'Compassionate Support', code: 'SUPPORT', color: '#38bdf8', angle: Math.PI / 2 },
    { title: 'Habit & Wellness Coaching', code: 'COACH', color: '#10b981', angle: Math.PI },
    { title: 'Enterprise Intelligence', code: 'INTEL', color: '#a855f7', angle: (3 * Math.PI) / 2 }
  ], []);

  // Procedural petal geometry generation (curved, tapered lotus petal)
  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(18, 25, 26, 70, 0, 110);
    shape.bezierCurveTo(-26, 70, -18, 25, 0, 0);
    const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 1, bevelThickness: 1 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // 1. Natural levitation of the entire sacred lotus sanctuary
    if (lotusGroupRef.current) {
      lotusGroupRef.current.position.y = 60 + Math.sin(t * 1.2) * 6;
      lotusGroupRef.current.rotation.y = Math.sin(t * 0.25) * 0.08;
    }

    // 2. Empathy Heart Pearl Pulse (Simulating living consciousness & emotional awareness)
    if (pearlRef.current) {
      const pulse = 1.0 + Math.sin(t * 2.4) * 0.1 + Math.sin(t * 4.8) * 0.04;
      pearlRef.current.scale.set(pulse, pulse, pulse);
      pearlRef.current.rotation.y = t * 0.5;
    }

    // 3. Blossoming Petal Breathing Movement
    if (innerPetalsRef.current) {
      innerPetalsRef.current.rotation.y = t * 0.15;
    }
    if (midPetalsRef.current) {
      midPetalsRef.current.rotation.y = -t * 0.12;
    }
    if (outerPetalsRef.current) {
      outerPetalsRef.current.rotation.y = t * 0.08;
    }

    // 4. Conversational Voice Waveform Frequency Rings
    if (voiceRingsRef.current) {
      voiceRingsRef.current.children.forEach((ring, idx) => {
        const s = 1.0 + Math.sin(t * 2.5 + idx * 0.8) * 0.06;
        ring.scale.set(s, s, s);
        ring.rotation.z = t * (idx % 2 === 0 ? 0.3 : -0.25);
      });
    }

    // 5. Orbiting AI Capability Satellites
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = -t * 0.22;
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* Empathetic Ethereal Sanctuary Lighting */}
      <ambientLight intensity={0.45} color="#160824" />
      <directionalLight position={[700, 800, -300]} intensity={3.5} color="#fda4af" />
      <directionalLight position={[-700, 600, 400]} intensity={2.4} color="#818cf8" />
      <pointLight position={[0, 160, -700]} intensity={26} distance={1800} color="#f472b6" />
      <pointLight position={[0, -100, -700]} intensity={18} distance={1200} color="#38bdf8" />
      <pointLight position={[0, 80, -700]} intensity={20} distance={1000} color="#e0f2fe" />

      {/* Floating Stardust & Consciousness Motes */}
      <Sparkles count={1100} scale={[2400, 1000, 2400]} size={12} speed={0.4} opacity={0.65} color="#fda4af" position={[0, 80, -700]} />
      <Sparkles count={600} scale={[1600, 700, 1600]} size={9} speed={0.5} opacity={0.55} color="#38bdf8" position={[0, 100, -700]} />
      <Sparkles count={400} scale={[1000, 500, 1000]} size={14} speed={0.3} opacity={0.7} color="#c084fc" position={[0, 140, -700]} />

      {/* High-Gloss Obsidian Water Reflective Sanctuary Floor */}
      <mesh position={[0, -220, -700]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4400, 4400]} />
        <meshStandardMaterial color="#05020a" roughness={0.08} metalness={0.96} />
      </mesh>

      {/* Concentric Empathy Harmonic Wave Inlays on the Floor */}
      {[220, 380, 560, 760].map((radius, idx) => (
        <mesh key={idx} position={[0, -218, -700]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 3, 64]} />
          <meshBasicMaterial 
            color={idx % 2 === 0 ? "#f472b6" : "#818cf8"} 
            transparent 
            opacity={0.38 - idx * 0.07} 
          />
        </mesh>
      ))}

      {/* ------------------------------------------------------------- */}
      {/* 1. THE BLOSSOMING SACRED LOTUS OF CONSCIOUSNESS               */}
      {/* ------------------------------------------------------------- */}
      <group ref={lotusGroupRef} position={[0, 60, -700]}>

        {/* --- Central Radiant Consciousness Pearl --- */}
        <group position={[0, 25, 0]}>
          <mesh ref={pearlRef}>
            <sphereGeometry args={[32, 32, 32]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#e0f2fe" 
              emissiveIntensity={3.8} 
              roughness={0.1} 
              metalness={0.4} 
            />
          </mesh>
          <pointLight color="#e0f2fe" intensity={22} distance={450} />

          {/* Golden/Rose Spark Inner Radiance */}
          <mesh scale={0.75}>
            <sphereGeometry args={[32, 16, 16]} />
            <meshStandardMaterial color="#fb7185" emissive="#f43f5e" emissiveIntensity={4.5} />
          </mesh>
        </group>

        {/* --- Tier 1: Inner Petals (6 Blossom Blades curving up) --- */}
        <group ref={innerPetalsRef} position={[0, 10, 0]}>
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <group key={i} rotation={[0, angle, 0]}>
                <mesh 
                  geometry={petalGeometry} 
                  position={[0, 0, 22]} 
                  rotation={[0.35, 0, 0]} 
                  scale={[0.75, 0.75, 0.75]}
                >
                  <meshPhysicalMaterial 
                    color="#c084fc" 
                    emissive="#a855f7" 
                    emissiveIntensity={1.8} 
                    transparent 
                    opacity={0.88} 
                    roughness={0.12} 
                    transmission={0.4} 
                    side={THREE.DoubleSide} 
                  />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* --- Tier 2: Mid Petals (8 Graceful Lotus Petals) --- */}
        <group ref={midPetalsRef} position={[0, 0, 0]}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
            return (
              <group key={i} rotation={[0, angle, 0]}>
                <mesh 
                  geometry={petalGeometry} 
                  position={[0, -5, 36]} 
                  rotation={[0.65, 0, 0]} 
                  scale={[1.0, 1.0, 1.0]}
                >
                  <meshPhysicalMaterial 
                    color="#38bdf8" 
                    emissive="#0284c7" 
                    emissiveIntensity={1.6} 
                    transparent 
                    opacity={0.82} 
                    roughness={0.15} 
                    transmission={0.45} 
                    side={THREE.DoubleSide} 
                  />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* --- Tier 3: Outer Grand Petals (12 Sweeping Lotus Foundation Petals) --- */}
        <group ref={outerPetalsRef} position={[0, -10, 0]}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <group key={i} rotation={[0, angle, 0]}>
                <mesh 
                  geometry={petalGeometry} 
                  position={[0, -12, 54]} 
                  rotation={[0.95, 0, 0]} 
                  scale={[1.25, 1.25, 1.25]}
                >
                  <meshPhysicalMaterial 
                    color="#fda4af" 
                    emissive="#e11d48" 
                    emissiveIntensity={1.4} 
                    transparent 
                    opacity={0.78} 
                    roughness={0.18} 
                    transmission={0.5} 
                    side={THREE.DoubleSide} 
                  />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* ------------------------------------------------------------- */}
        {/* 2. CONVERSATIONAL 3D VOICE FREQUENCY WAVEFORMS (SPEECH WAVES) */}
        {/* ------------------------------------------------------------- */}
        <group ref={voiceRingsRef} position={[0, 25, 0]}>
          {/* Inner Frequency Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[140, 2.2, 16, 80]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={3.0} />
          </mesh>
          {/* Mid Resonance Ring */}
          <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
            <torusGeometry args={[190, 1.8, 16, 80]} />
            <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={2.5} />
          </mesh>
          {/* Outer Emotional Pulse Ring */}
          <mesh rotation={[Math.PI / 1.8, -0.2, 0]}>
            <torusGeometry args={[250, 1.5, 16, 80]} />
            <meshStandardMaterial color="#f472b6" emissive="#db2777" emissiveIntensity={2.2} />
          </mesh>
        </group>

        {/* ------------------------------------------------------------- */}
        {/* 3. ORBITING AI CAPABILITY SATELLITES                          */}
        {/* ------------------------------------------------------------- */}
        <group ref={satellitesRef} position={[0, 25, 0]}>
          {capabilitySatellites.map((sat, i) => {
            const dist = 320;
            const x = Math.cos(sat.angle) * dist;
            const z = Math.sin(sat.angle) * dist;
            return (
              <group key={i} position={[x, 0, z]}>
                {/* Luminous Node Core */}
                <mesh>
                  <octahedronGeometry args={[16, 0]} />
                  <meshStandardMaterial color="#ffffff" emissive={sat.color} emissiveIntensity={3.2} />
                </mesh>
                <pointLight color={sat.color} intensity={8} distance={220} />

                {/* Orbiting Halo */}
                <mesh rotation={[Math.PI / 3, 0, 0]}>
                  <torusGeometry args={[26, 1.2, 12, 32]} />
                  <meshStandardMaterial color={sat.color} emissive={sat.color} emissiveIntensity={2.0} />
                </mesh>

                {/* Node Pill Tag */}
                <Text
                  font="/fonts/Roboto.woff"
                  fallbackFonts={[]}
                  position={[0, 32, 0]}
                  fontSize={14}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={1.2}
                  outlineColor="#0f172a"
                >
                  {sat.title}
                </Text>
              </group>
            );
          })}
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. FLOATING OFFICIAL MAYA EMBLEM & TITLE                      */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 310, -450]}>
        {/* Floating High-Res Maya Sacred Lotus Icon */}
        <Float speed={2} rotationIntensity={0.06} floatIntensity={0.4}>
          <mesh position={[0, 80, 0]}>
            <planeGeometry args={[140, 112]} />
            <meshBasicMaterial map={logoTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </Float>

        {/* Maya Title */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, 10, 0]}
          fontSize={48}
          color="#ffffff"
          outlineWidth={1.8}
          outlineColor="#4338ca"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          MAYA
        </Text>

        {/* Subtitle */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, -28, 0]}
          fontSize={15}
          color="#818cf8"
          outlineWidth={0.8}
          outlineColor="#0f172a"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          EMPATHETIC AI AVATAR & 24/7 CONCIERGE
        </Text>
      </group>
    </group>
  );
}
