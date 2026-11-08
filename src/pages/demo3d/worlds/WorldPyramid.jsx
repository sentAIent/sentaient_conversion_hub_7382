import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sparkles, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================================================
// WORLD PYRAMID: Autonomous Business Ops Brain & Strategic Execution Engine
// Translucent Crystalline Cyber-Pyramid with Quantum Brain Core, Pulsed
// Synaptic Circuitry, Apex Transmission Orb, and Strategic Market Execution HUD.
// ===========================================================================

export default function WorldPyramid({ position, visible }) {
  const pyramidGroupRef = useRef();
  const brainCoreRef = useRef();
  const apexOrbRef = useRef();
  const waveArcsRef = useRef();
  const circuitsRef = useRef();
  const beaconRef = useRef();

  // Load official high-res PyRAmid emblem
  const logoTex = useLoader(THREE.TextureLoader, '/pyramid_logo_final.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  // Synaptic neural circuit traces on the motherboard floor
  const circuitBranches = useMemo(() => {
    const branches = [];
    const count = 32;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r1 = 30 + (i % 4) * 15;
      const r2 = 140 + (i % 5) * 35;
      branches.push({
        x1: Math.cos(angle) * r1,
        z1: Math.sin(angle) * r1,
        x2: Math.cos(angle) * r2,
        z2: Math.sin(angle) * r2,
        color: i % 3 === 0 ? '#00e5ff' : (i % 3 === 1 ? '#c084fc' : '#ffd700'),
        width: (i % 2 === 0 ? 2.5 : 1.5)
      });
    }
    return branches;
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // Subtle breathing float of the entire pyramid monument
    if (pyramidGroupRef.current) {
      pyramidGroupRef.current.position.y = Math.sin(t * 0.8) * 4;
    }

    // 1. Quantum AI Brain Core Levitation & Biological Rhythm Pulse
    if (brainCoreRef.current) {
      const pulse = 1.0 + Math.sin(t * 3.0) * 0.08 + Math.sin(t * 6.0) * 0.03;
      brainCoreRef.current.scale.set(pulse, pulse, pulse);
      brainCoreRef.current.rotation.y = t * 0.35;
      brainCoreRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }

    // 2. Apex Consciousness Orb Pulsing
    if (apexOrbRef.current) {
      apexOrbRef.current.rotation.y = t * 0.6;
    }

    // 3. Expanding Wireless Thought Transmission Wave Arcs
    if (waveArcsRef.current) {
      waveArcsRef.current.children.forEach((child, idx) => {
        const speed = 1.2;
        const progress = ((t * speed + idx * 0.33) % 1.0);
        const s = 1.0 + progress * 1.8;
        child.scale.set(s, s, s);
        if (child.material) {
          child.material.opacity = (1.0 - progress) * 0.85;
        }
      });
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* --- Cosmic Cyber-Egyptian Lighting --- */}
      <ambientLight intensity={0.4} color="#080414" />
      <directionalLight position={[600, 900, 400]} intensity={3.5} color="#00e5ff" />
      <directionalLight position={[-600, 800, -300]} intensity={2.8} color="#c084fc" />
      <pointLight position={[0, 160, -650]} intensity={24} distance={1600} color="#00e5ff" />
      <pointLight position={[0, 80, -650]} intensity={20} distance={1200} color="#c084fc" />
      <pointLight position={[0, 310, -650]} intensity={18} distance={900} color="#a855f7" />

      {/* Deep Cybernetic Obsidian Reflective Ground Plane */}
      <mesh position={[0, -220, -650]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4600, 4600]} />
        <meshStandardMaterial color="#030206" roughness={0.12} metalness={0.92} />
      </mesh>

      {/* High-Tech Motherboard Hex Grid Base */}
      <mesh position={[0, -218, -650]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1400, 1400]} />
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Atmospheric Quantum Particles */}
      <Sparkles count={800} scale={[1800, 800, 1800]} size={12} speed={0.4} opacity={0.65} color="#00e5ff" position={[0, 80, -650]} />
      <Sparkles count={450} scale={[1200, 600, 1200]} size={14} speed={0.5} opacity={0.6} color="#c084fc" position={[0, 120, -650]} />
      <Sparkles count={250} scale={[900, 500, 900]} size={16} speed={0.3} opacity={0.7} color="#ffd700" position={[0, 200, -650]} />

      {/* ------------------------------------------------------------- */}
      {/* 1. THE MONUMENTAL CRYSTALLINE CYBER-PYRAMID                  */}
      {/* ------------------------------------------------------------- */}
      <group ref={pyramidGroupRef} position={[0, -20, -650]}>

        {/* Stepped Cybernetic Pedestal Base (Obsidian & Electrum) */}
        <group position={[0, -160, 0]}>
          <mesh position={[0, 12, 0]}>
            <boxGeometry args={[460, 24, 460]} />
            <meshStandardMaterial color="#06060c" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 30, 0]}>
            <boxGeometry args={[410, 14, 410]} />
            <meshStandardMaterial color="#0a0a14" roughness={0.15} metalness={0.92} />
          </mesh>
          {/* Glowing Electrum Inlay Band */}
          <mesh position={[0, 38, 0]}>
            <boxGeometry args={[412, 2.5, 412]} />
            <meshStandardMaterial color="#ffd700" emissive="#f59e0b" emissiveIntensity={2.0} metalness={0.9} />
          </mesh>

          {/* Radiating Synaptic Motherboard Circuit Traces */}
          <group ref={circuitsRef} position={[0, 38.5, 0]}>
            {circuitBranches.map((b, i) => (
              <line key={i}>
                <bufferGeometry attach="geometry">
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([b.x1, 0, b.z1, b.x2, 0, b.z2])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial attach="material" color={b.color} linewidth={b.width} transparent opacity={0.75} />
              </line>
            ))}
          </group>
        </group>

        {/* Crystalline Translucent 4-Sided Pyramid Shell */}
        <mesh position={[0, 20, 0]} rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[0, 240, 320, 4, 1]} />
          <meshPhysicalMaterial 
            color="#e0f7fa" 
            emissive="#00e5ff" 
            emissiveIntensity={0.35} 
            transparent 
            opacity={0.38} 
            roughness={0.08} 
            metalness={0.1} 
            transmission={0.88} 
            ior={1.52} 
            side={THREE.DoubleSide} 
            depthWrite={false} 
          />
        </mesh>

        {/* Luminous Cyan Edge Ribs Framing the Pyramid */}
        <mesh position={[0, 20, 0]} rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[0, 241, 321, 4, 1]} />
          <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.65} />
        </mesh>

        {/* ------------------------------------------------------------- */}
        {/* 2. THE QUANTUM AI BRAIN CORE (INSIDE PYRAMID CENTER)         */}
        {/* ------------------------------------------------------------- */}
        <group ref={brainCoreRef} position={[0, 20, 0]}>
          {/* Pulsing Crystalline AI Brain Housing */}
          <mesh>
            <dodecahedronGeometry args={[44, 1]} />
            <meshStandardMaterial 
              color="#581c87" 
              emissive="#c084fc" 
              emissiveIntensity={2.8} 
              roughness={0.15} 
              metalness={0.85} 
            />
          </mesh>

          {/* Inner Glowing Neural Synapse Core */}
          <mesh>
            <sphereGeometry args={[26, 24, 24]} />
            <meshStandardMaterial color="#ffffff" emissive="#00e5ff" emissiveIntensity={4.5} />
          </mesh>

          {/* Surrounding Gyroscopic Quantum Logic Rings */}
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[65, 2.2, 16, 64]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={3.0} />
          </mesh>
          <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[78, 2.0, 16, 64]} />
            <meshStandardMaterial color="#ffd700" emissive="#f59e0b" emissiveIntensity={2.5} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, Math.PI / 4]}>
            <torusGeometry args={[92, 1.8, 16, 64]} />
            <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={2.2} />
          </mesh>

          <pointLight color="#00e5ff" intensity={18} distance={450} />
        </group>

        {/* ------------------------------------------------------------- */}
        {/* 3. APEX CONSCIOUSNESS ORB & THOUGHT TRANSMISSION WAVES        */}
        {/* ------------------------------------------------------------- */}
        <group position={[0, 185, 0]}>
          {/* Levitating Apex Purple/Indigo Spherical Transmitter */}
          <mesh ref={apexOrbRef}>
            <sphereGeometry args={[22, 32, 32]} />
            <meshStandardMaterial 
              color="#3b0764" 
              emissive="#a855f7" 
              emissiveIntensity={3.2} 
              metalness={0.9} 
              roughness={0.1} 
            />
          </mesh>
          <pointLight color="#c084fc" intensity={14} distance={400} />

          {/* Radial Wireless Thought Transmission Wave Arcs */}
          <group ref={waveArcsRef}>
            {[1, 2, 3].map((w) => (
              <mesh key={w} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[28 + w * 12, 32 + w * 12, 32, 1, -Math.PI / 3, (2 * Math.PI) / 3]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
              </mesh>
            ))}
          </group>
        </group>

        {/* 4 Monumental Obelisks Guarding the 4 Perimeter Coordinates */}
        {[
          [-280, -280],
          [280, -280],
          [-280, 280],
          [280, 280]
        ].map(([ox, oz], idx) => (
          <group key={idx} position={[ox, -80, oz]}>
            {/* Tapered Obelisk Shaft */}
            <mesh position={[0, 75, 0]}>
              <cylinderGeometry args={[5, 12, 150, 4]} rotation={[0, Math.PI / 4, 0]} />
              <meshStandardMaterial color="#090a14" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Pyramidion Gold Cap */}
            <mesh position={[0, 160, 0]}>
              <coneGeometry args={[6.5, 18, 4]} rotation={[0, Math.PI / 4, 0]} />
              <meshStandardMaterial color="#ffd700" emissive="#f59e0b" emissiveIntensity={3.0} metalness={0.95} />
            </mesh>
            <pointLight position={[0, 165, 0]} color="#ffd700" intensity={4} distance={200} />
          </group>
        ))}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. FLOATING OFFICIAL PYRAMID EMBLEM & TITLE                   */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 310, -450]}>
        {/* Floating High-Res PyRAmid Logo Icon (Sleek & Scaled) */}
        <Float speed={2} rotationIntensity={0.06} floatIntensity={0.35}>
          <mesh position={[0, 50, 0]}>
            <planeGeometry args={[75, 75]} />
            <meshBasicMaterial map={logoTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </Float>

        {/* PyRAmid Title Text */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, -10, 0]}
          fontSize={44}
          color="#ffffff"
          outlineWidth={1.5}
          outlineColor="#3b0764"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          PyRAmid
        </Text>

        {/* Subtitle Badge */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, -42, 0]}
          fontSize={15}
          color="#00e5ff"
          outlineWidth={0.8}
          outlineColor="#090a14"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.16}
        >
          AUTONOMOUS BUSINESS OPS BRAIN
        </Text>
      </group>
    </group>
  );
}
