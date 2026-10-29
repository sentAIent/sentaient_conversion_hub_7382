import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function WorldMaya({ position, visible }) {
  const avatarGroupRef = useRef();
  const avatarHeadRef = useRef();
  const avatarHeartRef = useRef();
  const voiceRing1Ref = useRef();
  const voiceRing2Ref = useRef();
  const voiceRing3Ref = useRef();
  const haloRef = useRef();
  const satellitesRef = useRef();

  // 4 Core AI Pillars of Maya
  const capabilitySatellites = useMemo(() => [
    { title: 'Conversational Sales', code: 'SALES', color: '#f59e0b', angle: 0 },
    { title: 'Compassionate Support', code: 'SUPPORT', color: '#38bdf8', angle: Math.PI / 2 },
    { title: 'Habit Coaching', code: 'COACH', color: '#10b981', angle: Math.PI },
    { title: 'Deep Knowledge', code: 'INTEL', color: '#a855f7', angle: (3 * Math.PI) / 2 }
  ], []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // Gentle natural consciousness levitation of Maya
    if (avatarGroupRef.current) {
      avatarGroupRef.current.position.y = 75 + Math.sin(t * 1.5) * 6;
      avatarGroupRef.current.rotation.y = Math.sin(t * 0.35) * 0.08;
    }

    // Subtle head tilt & thought awareness
    if (avatarHeadRef.current) {
      avatarHeadRef.current.rotation.y = Math.sin(t * 0.5) * 0.12;
      avatarHeadRef.current.rotation.x = Math.sin(t * 0.7) * 0.05;
    }

    // Empathy Heart Nexus - biological rhythm pulse
    if (avatarHeartRef.current) {
      const pulse = 1.0 + Math.sin(t * 2.2) * 0.12 + Math.sin(t * 4.4) * 0.04;
      avatarHeartRef.current.scale.set(pulse, pulse, pulse);
    }

    // Halo rotation
    if (haloRef.current) {
      haloRef.current.rotation.z = t * 0.4;
      haloRef.current.rotation.x = Math.sin(t * 0.8) * 0.15;
    }

    // 3D Vocal resonance frequency rings (Speech & dialogue waveforms)
    if (voiceRing1Ref.current) {
      voiceRing1Ref.current.rotation.y = t * 0.28;
      voiceRing1Ref.current.rotation.x = Math.sin(t * 0.6) * 0.18;
    }
    if (voiceRing2Ref.current) {
      voiceRing2Ref.current.rotation.y = -t * 0.22;
      voiceRing2Ref.current.rotation.z = Math.cos(t * 0.5) * 0.22;
    }
    if (voiceRing3Ref.current) {
      voiceRing3Ref.current.rotation.y = t * 0.15;
      const s = 1.0 + Math.sin(t * 1.8) * 0.06;
      voiceRing3Ref.current.scale.set(s, s, s);
    }

    // Orbiting capability satellites
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = -t * 0.25;
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* Empathetic Ethereal Sanctuary Lighting */}
      <ambientLight intensity={0.45} color="#200d1e" />
      <directionalLight position={[900, 800, -500]} intensity={3.2} color="#fda4af" />
      <directionalLight position={[-900, 500, 400]} intensity={2.0} color="#818cf8" />
      <pointLight position={[0, 160, -750]} intensity={28} distance={1800} color="#ff66aa" />
      <pointLight position={[0, -140, -750]} intensity={18} distance={1200} color="#818cf8" />

      {/* Floating Consciousness / Thought Sparkles */}
      <Sparkles count={1100} scale={[2200, 1000, 2200]} size={12} speed={0.4} opacity={0.65} color="#fda4af" position={[0, 80, -750]} />
      <Sparkles count={500} scale={[1400, 700, 1400]} size={8} speed={0.6} opacity={0.5} color="#38bdf8" position={[0, 100, -750]} />

      {/* ------------------------------------------------------------- */}
      {/* 1. HIGH-GLOSS REFLECTIVE OBSIDIAN SANCTUARY FLOOR             */}
      {/* ------------------------------------------------------------- */}
      <mesh position={[0, -240, -750]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4200, 4200]} />
        <meshStandardMaterial color="#070308" roughness={0.10} metalness={0.94} />
      </mesh>

      {/* Radiant Empathy Concentric Floor Inlays */}
      {[200, 360, 540, 720].map((radius, idx) => (
        <mesh key={idx} position={[0, -238, -750]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + (idx === 0 ? 4 : 2), 64]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#f472b6" : "#818cf8"} transparent opacity={0.4 - idx * 0.08} />
        </mesh>
      ))}

      {/* ------------------------------------------------------------- */}
      {/* 2. SANCTUARY PAVILION DAIS (SACRED CYBERNETIC PLINTH)         */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 0, -750]}>
        {/* Tier 1 - Grand Obsidian Outer Plinth */}
        <mesh position={[0, -230, 0]}>
          <cylinderGeometry args={[300, 340, 22, 32]} />
          <meshStandardMaterial color="#0d040e" metalness={0.92} roughness={0.16} />
        </mesh>
        {/* Glowing Rose Plinth Rim */}
        <mesh position={[0, -218, 0]}>
          <torusGeometry args={[302, 2.5, 16, 64]} />
          <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={2.5} />
        </mesh>

        {/* Tier 2 - Inner Altar Dais */}
        <mesh position={[0, -208, 0]}>
          <cylinderGeometry args={[220, 250, 18, 32]} />
          <meshStandardMaterial color="#1a0a1c" metalness={0.90} roughness={0.18} />
        </mesh>
        <mesh position={[0, -198, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[100, 218, 64]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={1.4} roughness={0.1} metalness={0.95} />
        </mesh>

        {/* Vertical Holographic Uplight Column */}
        <mesh position={[0, 300, 0]}>
          <cylinderGeometry args={[4, 4, 800, 16]} />
          <meshBasicMaterial color="#fb7185" transparent opacity={0.45} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 300, 0]}>
          <cylinderGeometry args={[14, 14, 800, 16]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. MAYA AVATAR NEXUS (HOLOGRAPHIC NEURAL CONSTRUCT)           */}
      {/* ------------------------------------------------------------- */}
      <group ref={avatarGroupRef} position={[0, 75, -750]}>

        {/* A. FACETED CRYSTALLINE CRANIAL & NEURAL MATRIX */}
        <group ref={avatarHeadRef} position={[0, 70, 0]}>
          {/* Translucent Prismatic Face / Cranial Facet */}
          <mesh>
            <icosahedronGeometry args={[26, 2]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#fda4af" 
              emissiveIntensity={1.2} 
              roughness={0.06} 
              metalness={0.92} 
              transparent 
              opacity={0.88} 
            />
          </mesh>

          {/* Internal Cyan Synaptic Neural Brain Core */}
          <mesh position={[0, 2, 0]}>
            <sphereGeometry args={[14, 24, 24]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={3.5} />
          </mesh>
          <pointLight color="#38bdf8" intensity={12} distance={350} />

          {/* Holographic Synaptic Halo Crown */}
          <group ref={haloRef} position={[0, 32, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[34, 1.2, 16, 64]} />
              <meshStandardMaterial color="#fb7185" emissive="#f43f5e" emissiveIntensity={3.0} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[42, 0.8, 16, 64]} />
              <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={2.0} />
            </mesh>
          </group>
        </group>

        {/* B. SCULPTED BIOMETRIC CYBERNETIC TORSO & SHOULDERS */}
        <group position={[0, 10, 0]}>
          {/* Neck Support */}
          <mesh position={[0, 42, 0]}>
            <cylinderGeometry args={[8, 11, 22, 16]} />
            <meshStandardMaterial color="#1f0f24" metalness={0.94} roughness={0.14} />
          </mesh>

          {/* Sculpted Geometric Chest / Pauldrons */}
          <mesh position={[0, 18, 0]}>
            <cylinderGeometry args={[22, 15, 38, 6]} />
            <meshStandardMaterial 
              color="#2a122e" 
              emissive="#be185d" 
              emissiveIntensity={0.6} 
              metalness={0.92} 
              roughness={0.16} 
            />
          </mesh>

          {/* Shoulders */}
          {[-26, 26].map((x, i) => (
            <mesh key={i} position={[x, 26, 0]}>
              <sphereGeometry args={[9, 16, 16]} />
              <meshStandardMaterial color="#fb7185" emissive="#e11d48" emissiveIntensity={1.8} metalness={0.9} roughness={0.2} />
            </mesh>
          ))}

          {/* EMPATHY HEART NEXUS (Pulsating Biological Core) */}
          <group ref={avatarHeartRef} position={[0, 16, 10]}>
            <mesh>
              <dodecahedronGeometry args={[11, 0]} />
              <meshStandardMaterial color="#ffffff" emissive="#fb7185" emissiveIntensity={4.2} />
            </mesh>
            <pointLight color="#fb7185" intensity={16} distance={450} />
          </group>

          {/* Flowing Holographic Energy Gown */}
          <mesh position={[0, -55, 0]}>
            <coneGeometry args={[44, 115, 32, 8, true]} />
            <meshStandardMaterial 
              color="#fda4af" 
              emissive="#be185d" 
              emissiveIntensity={1.4} 
              transparent 
              opacity={0.65} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        </group>

        {/* C. 3D VOCAL RESONANCE FREQUENCY RINGS (VOICE WAVE VISUALIZER) */}
        <group ref={voiceRing1Ref}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[165, 2.4, 16, 96]} />
            <meshStandardMaterial color="#fb7185" emissive="#e11d48" emissiveIntensity={2.5} />
          </mesh>
        </group>
        <group ref={voiceRing2Ref} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[215, 2.0, 16, 96]} />
            <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={2.2} />
          </mesh>
        </group>
        <group ref={voiceRing3Ref} rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
          <mesh>
            <torusGeometry args={[275, 1.6, 16, 96]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2.0} />
          </mesh>
        </group>

        {/* D. 4 ORBITING INTELLIGENCE SATELLITES */}
        <group ref={satellitesRef}>
          {capabilitySatellites.map((sat, i) => {
            const dist = 340;
            const x = Math.cos(sat.angle) * dist;
            const z = Math.sin(sat.angle) * dist;
            return (
              <group key={i} position={[x, 0, z]}>
                {/* Faceted Core */}
                <mesh>
                  <octahedronGeometry args={[14, 0]} />
                  <meshStandardMaterial color="#ffffff" emissive={sat.color} emissiveIntensity={3.6} />
                </mesh>
                {/* Orbiting Halo */}
                <mesh rotation={[Math.PI / 3, 0, 0]}>
                  <torusGeometry args={[22, 1.0, 16, 32]} />
                  <meshStandardMaterial color={sat.color} emissive={sat.color} emissiveIntensity={2.5} />
                </mesh>
                <pointLight color={sat.color} intensity={7} distance={240} />

                {/* Laser Conduit back to Maya */}
                <mesh position={[-x / 2, 0, -z / 2]} rotation={[0, Math.atan2(x, z), Math.PI / 2]}>
                  <cylinderGeometry args={[0.8, 0.8, dist, 8]} />
                  <meshBasicMaterial color={sat.color} transparent opacity={0.35} blending={THREE.AdditiveBlending} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* E. CURVED HOLOGRAPHIC DIALOGUE PANELS */}
        {/* Left Telemetry Stela */}
        <group position={[-250, 20, 60]} rotation={[0, Math.PI / 6, 0]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[130, 90]} />
            <meshStandardMaterial color="#0a0512" transparent opacity={0.65} roughness={0.1} metalness={0.9} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 46, 0]}>
            <boxGeometry args={[132, 2, 2]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3.0} />
          </mesh>
          <Text
            font="/fonts/Roboto.woff"
            fallbackFonts={[]}
            position={[-55, 30, 2]}
            fontSize={7}
            color="#38bdf8"
            anchorX="left"
            letterSpacing={0.08}
          >
            EMPATHY ENGINE v4.2
          </Text>
          <Text
            font="/fonts/Roboto.woff"
            fallbackFonts={[]}
            position={[-55, 12, 2]}
            fontSize={6}
            color="#cbd5e1"
            anchorX="left"
            maxWidth={110}
            lineHeight={1.4}
          >
            ◈ SENTIMENT: RESONANT (+99.8%)
            ◈ VOICE SYNTH: 24kHz ULTRA-HD
            ◈ LATENCY: 24ms SUB-PERCEPTUAL
          </Text>
        </group>

        {/* Right Telemetry Stela */}
        <group position={[250, 20, 60]} rotation={[0, -Math.PI / 6, 0]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[130, 90]} />
            <meshStandardMaterial color="#0a0512" transparent opacity={0.65} roughness={0.1} metalness={0.9} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 46, 0]}>
            <boxGeometry args={[132, 2, 2]} />
            <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={3.0} />
          </mesh>
          <Text
            font="/fonts/Roboto.woff"
            fallbackFonts={[]}
            position={[-55, 30, 2]}
            fontSize={7}
            color="#fb7185"
            anchorX="left"
            letterSpacing={0.08}
          >
            ACTIVE OMNICHANNEL
          </Text>
          <Text
            font="/fonts/Roboto.woff"
            fallbackFonts={[]}
            position={[-55, 12, 2]}
            fontSize={6}
            color="#cbd5e1"
            anchorX="left"
            maxWidth={110}
            lineHeight={1.4}
          >
            ◈ STREAMS: VOICE • VIDEO • CHAT
            ◈ ACTIVE CALLS: 1,480 ENTERPRISE
            ◈ CONVERSION RATE: +340% BOOST
          </Text>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. 3D HOLOGRAPHIC TYPOGRAPHY BLADE (CLEANLY ON THE RIGHT FLANK) */}
      {/* ------------------------------------------------------------- */}
      <group position={[540, 100, -580]} rotation={[0, -Math.PI / 10, 0]}>
        {/* Holographic Frosted Obsidian Blade Backing */}
        <mesh position={[-150, -10, -2]}>
          <planeGeometry args={[300, 260]} />
          <meshStandardMaterial 
            color="#0b030e" 
            transparent 
            opacity={0.52} 
            roughness={0.12} 
            metalness={0.92} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        {/* Glowing Rose Top Rail */}
        <mesh position={[-150, 120, 0]}>
          <boxGeometry args={[302, 3, 2]} />
          <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={3.2} />
        </mesh>

        {/* Category Badge */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-280, 92, 0]}
          fontSize={11}
          color="#fb7185"
          letterSpacing={0.12}
          anchorX="left"
          anchorY="middle"
        >
          EXP // 13  ◈  EMPATHETIC AI AVATAR
        </Text>

        {/* World Name Title */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-280, 50, 0]}
          fontSize={46}
          color="#ffffff"
          outlineWidth={1.5}
          outlineColor="#440a20"
          anchorX="left"
          anchorY="middle"
        >
          MAYA
        </Text>

        {/* Value Proposition Headline */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-280, 8, 0]}
          fontSize={13.5}
          color="#fda4af"
          maxWidth={260}
          lineHeight={1.3}
          anchorX="left"
          anchorY="middle"
        >
          24/7 CONVERSATIONAL SALES & ENTERPRISE CONCIERGE
        </Text>

        {/* System Capability Description */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-280, -50, 0]}
          fontSize={11}
          color="#e2e8f0"
          maxWidth={260}
          lineHeight={1.45}
          anchorX="left"
          anchorY="middle"
        >
          Engage customers around the clock with life-like conversational AI avatars for autonomous sales, compassionate support, and personal growth.
        </Text>

        {/* Telemetry Pills */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-280, -105, 0]}
          fontSize={9.5}
          color="#818cf8"
          letterSpacing={0.05}
          anchorX="left"
          anchorY="middle"
        >
          [ ◈ 24/7 SALES  ◈ REAL-TIME EMPATHY  ◈ ACTIVE COACH ]
        </Text>
      </group>
    </group>
  );
}
