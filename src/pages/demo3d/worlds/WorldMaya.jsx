import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================================================
// WORLD MAYA: Empathetic AI Avatar & 24/7 Enterprise Representative
// Luminous Cybernetic Holographic Avatar Bust with Pulsing Vocal Core,
// Dynamic 3D Conversational Waveforms, Live Speech Equalizers, and
// Floating Glass Intelligence HUD Panels.
// ===========================================================================

export default function WorldMaya({ position, visible }) {
  const avatarGroupRef = useRef();
  const vocalCoreRef = useRef();
  const waveRingsRef = useRef();
  const eqBarsRef = useRef();
  const leftHudRef = useRef();
  const rightHudRef = useRef();
  const neuralCrownRef = useRef();

  // Load official Maya emblem
  const logoTex = useLoader(THREE.TextureLoader, '/maya_logo_final.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  // 24 Equalizer Audio Frequency Columns forming a wide stage arc
  const eqData = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const angle = (i / 27) * Math.PI * 0.9 - Math.PI * 0.45; // -81 deg to +81 deg
      const radius = 290;
      return {
        x: Math.sin(angle) * radius,
        z: -Math.cos(angle) * radius + 140,
        height: 25 + Math.random() * 45,
        speed: 2.0 + Math.random() * 3.5,
        phase: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? '#818cf8' : '#38bdf8'
      };
    });
  }, []);

  // Neural Crown Fibers radiating from avatar head
  const fiberCurves = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const a = (i / 13) * Math.PI * 1.4 - Math.PI * 0.7;
      return {
        angle: a,
        radius: 46 + (i % 3) * 6,
        rotZ: a * 0.4,
        scaleY: 0.8 + (i % 4) * 0.15
      };
    });
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // 1. Natural breathing & lifelike subtle head sway of the Holographic AI Avatar
    if (avatarGroupRef.current) {
      avatarGroupRef.current.position.y = 80 + Math.sin(t * 1.5) * 6;
      avatarGroupRef.current.rotation.y = Math.sin(t * 0.45) * 0.08;
      avatarGroupRef.current.rotation.x = Math.sin(t * 0.6) * 0.03;
    }

    // 2. Vocal Larynx Pulse (simulating active speech synthesis & empathetic warmth)
    if (vocalCoreRef.current) {
      const speechPulse = 1.0 + Math.sin(t * 5.0) * 0.14 + Math.sin(t * 11.0) * 0.06;
      vocalCoreRef.current.scale.set(speechPulse, speechPulse, speechPulse);
    }

    // 3. Conversational Audio Waveform Ribbons
    if (waveRingsRef.current) {
      waveRingsRef.current.children.forEach((ring, idx) => {
        const speed = (idx + 1) * 0.4;
        ring.rotation.z = t * (idx % 2 === 0 ? speed : -speed);
        const s = 1.0 + Math.sin(t * 3.2 + idx * 1.2) * 0.08;
        ring.scale.set(s, s, s);
      });
    }

    // 4. Equalizer Bar Dance in the front arc
    if (eqBarsRef.current) {
      eqBarsRef.current.children.forEach((bar, i) => {
        const item = eqData[i];
        if (item) {
          const osc = 0.4 + 0.6 * Math.abs(Math.sin(t * item.speed + item.phase));
          bar.scale.y = osc;
        }
      });
    }

    // 5. Floating Glass HUD gentle hover
    if (leftHudRef.current) {
      leftHudRef.current.position.y = 110 + Math.sin(t * 1.2 + 0.5) * 5;
    }
    if (rightHudRef.current) {
      rightHudRef.current.position.y = 110 + Math.sin(t * 1.2 + 1.8) * 5;
    }

    // 6. Neural Crown Fiber shimmer
    if (neuralCrownRef.current) {
      neuralCrownRef.current.rotation.y = Math.sin(t * 0.5) * 0.06;
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* ------------------------------------------------------------- */}
      {/* LIGHTING & ATMOSPHERE                                         */}
      {/* ------------------------------------------------------------- */}
      <ambientLight intensity={0.5} color="#0c071e" />
      <directionalLight position={[600, 700, 400]} intensity={3.5} color="#818cf8" />
      <directionalLight position={[-600, 500, -300]} intensity={2.8} color="#fb7185" />
      <pointLight position={[0, 160, -600]} intensity={25} distance={1400} color="#38bdf8" />
      <pointLight position={[0, 40, -550]} intensity={20} distance={1000} color="#e0f2fe" />

      {/* Floating Consciousness Particles & Emotion Sparkles */}
      <Sparkles count={1200} scale={[2600, 1200, 2600]} size={12} speed={0.4} opacity={0.65} color="#818cf8" position={[0, 120, -650]} />
      <Sparkles count={700} scale={[1800, 800, 1800]} size={9} speed={0.5} opacity={0.55} color="#fb7185" position={[0, 100, -650]} />
      <Sparkles count={500} scale={[1200, 600, 1200]} size={14} speed={0.3} opacity={0.7} color="#38bdf8" position={[0, 140, -650]} />

      {/* Hexagonal Obsidian Sanctuary Dais Base */}
      <mesh position={[0, -210, -650]} rotation={[-Math.PI / 2, 0, Math.PI / 6]}>
        <cylinderGeometry args={[440, 480, 24, 6]} />
        <meshStandardMaterial color="#05030e" roughness={0.12} metalness={0.94} />
      </mesh>

      {/* Luminous Cybernetic Energy Inlay Rings on Floor */}
      {[220, 340, 460].map((radius, idx) => (
        <mesh key={idx} position={[0, -196, -650]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 3.5, 64]} />
          <meshBasicMaterial 
            color={idx % 2 === 0 ? "#818cf8" : "#38bdf8"} 
            transparent 
            opacity={0.45 - idx * 0.1} 
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Reflective Deep Space Obsidian Ground Plane */}
      <mesh position={[0, -215, -650]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4800, 4800]} />
        <meshStandardMaterial color="#030108" roughness={0.1} metalness={0.96} />
      </mesh>

      {/* ------------------------------------------------------------- */}
      {/* 1. THE HOLOGRAPHIC EMPATHETIC AI AVATAR BUST                  */}
      {/* ------------------------------------------------------------- */}
      <group ref={avatarGroupRef} position={[0, 80, -650]}>
        
        {/* --- Cybernetic Shoulders & Collarbone Plinth --- */}
        <mesh position={[0, -45, 0]}>
          <cylinderGeometry args={[26, 75, 45, 32]} />
          <meshPhysicalMaterial 
            color="#1e1b4b" 
            emissive="#312e81" 
            emissiveIntensity={1.4} 
            roughness={0.25} 
            metalness={0.85} 
            transparent 
            opacity={0.88} 
          />
        </mesh>

        {/* Bioluminescent Circuit Inlay Lines across Collarbone */}
        <mesh position={[0, -42, 38]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[38, 1.2, 12, 32, Math.PI]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0, -52, 48]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[48, 1.2, 12, 32, Math.PI]} />
          <meshBasicMaterial color="#fb7185" />
        </mesh>

        {/* --- Slender Cybernetic Neck --- */}
        <mesh position={[0, -8, 0]}>
          <cylinderGeometry args={[14, 18, 36, 32]} />
          <meshPhysicalMaterial 
            color="#2e1065" 
            emissive="#4c1d95" 
            emissiveIntensity={1.2} 
            roughness={0.2} 
            metalness={0.8} 
            transparent 
            opacity={0.9} 
          />
        </mesh>

        {/* --- Vocal Larynx Audio Synthesizer (Pulsing Speech Core) --- */}
        <group position={[0, -12, 14]}>
          <mesh ref={vocalCoreRef}>
            <sphereGeometry args={[8.5, 24, 24]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#38bdf8" 
              emissiveIntensity={4.5} 
              roughness={0.08} 
              metalness={0.9} 
            />
          </mesh>
          <pointLight color="#38bdf8" intensity={12} distance={280} />
          {/* Concentric vocal frequency pulse rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[15, 0.9, 12, 32]} />
            <meshBasicMaterial color="#fb7185" transparent opacity={0.7} />
          </mesh>
        </group>

        {/* --- Sculpted Facial Architecture (AI Head & Features) --- */}
        <group position={[0, 32, 4]}>
          {/* Cranial Dome / Head Form */}
          <mesh position={[0, 0, 0]} scale={[1.0, 1.25, 1.1]}>
            <sphereGeometry args={[28, 36, 36]} />
            <meshPhysicalMaterial 
              color="#1e1b4b" 
              emissive="#3730a3" 
              emissiveIntensity={1.6} 
              roughness={0.15} 
              metalness={0.82} 
              transparent 
              opacity={0.85} 
              transmission={0.3} 
            />
          </mesh>

          {/* Elegant Tapered Jawline & Cheeks Plate */}
          <mesh position={[0, -15, 8]} rotation={[0.22, 0, 0]} scale={[1.0, 0.9, 0.85]}>
            <coneGeometry args={[22, 28, 32]} />
            <meshPhysicalMaterial 
              color="#312e81" 
              emissive="#4338ca" 
              emissiveIntensity={1.5} 
              roughness={0.2} 
              metalness={0.88} 
              transparent 
              opacity={0.88} 
            />
          </mesh>

          {/* Serene Luminous Visor / Eye Array (Empathetic Cyber Vision) */}
          <group position={[0, 4, 26]}>
            {/* Left Eye Node */}
            <mesh position={[-9, 0, 0]}>
              <sphereGeometry args={[3.2, 16, 16]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
            <mesh position={[-9, 0, 0]}>
              <ringGeometry args={[3.8, 4.8, 24]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>

            {/* Right Eye Node */}
            <mesh position={[9, 0, 0]}>
              <sphereGeometry args={[3.2, 16, 16]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
            <mesh position={[9, 0, 0]}>
              <ringGeometry args={[3.8, 4.8, 24]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>

            {/* Ethereal Horizontal Consciousness Beam bridging eyes */}
            <mesh position={[0, 0, -1]}>
              <planeGeometry args={[28, 2.2]} />
              <meshBasicMaterial color="#818cf8" transparent opacity={0.65} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>

          {/* Subtle Forehead Third-Eye Empathy Gem */}
          <mesh position={[0, 16, 27]}>
            <octahedronGeometry args={[4.2, 0]} />
            <meshStandardMaterial color="#ffffff" emissive="#fb7185" emissiveIntensity={4.0} />
          </mesh>

          {/* --- Neural Fiber Crown (Sweeping Fiber-Optic Halo Hair) --- */}
          <group ref={neuralCrownRef}>
            {fiberCurves.map((fib, i) => (
              <group key={i} rotation={[0, fib.angle, fib.rotZ]}>
                <mesh position={[0, 14, fib.radius]} scale={[1, fib.scaleY, 1]}>
                  <torusGeometry args={[24, 1.2, 12, 32, Math.PI / 1.3]} />
                  <meshPhysicalMaterial 
                    color={i % 2 === 0 ? "#818cf8" : "#fb7185"} 
                    emissive={i % 2 === 0 ? "#6366f1" : "#f43f5e"} 
                    emissiveIntensity={2.4} 
                    transparent 
                    opacity={0.82} 
                    roughness={0.1} 
                    metalness={0.9} 
                  />
                </mesh>
              </group>
            ))}
          </group>
        </group>

        {/* ------------------------------------------------------------- */}
        {/* 2. CONVERSATIONAL 3D SPEECH FREQUENCY RIBBONS                 */}
        {/* ------------------------------------------------------------- */}
        <group ref={waveRingsRef} position={[0, -10, 0]}>
          {/* Inner Frequency Ribbon (Cyan) */}
          <mesh rotation={[Math.PI / 2.2, 0.1, 0]}>
            <torusGeometry args={[115, 2.4, 16, 80]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={3.2} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Mid Empathy Resonance Ribbon (Indigo) */}
          <mesh rotation={[Math.PI / 1.8, -0.15, 0.2]}>
            <torusGeometry args={[165, 2.0, 16, 80]} />
            <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={2.8} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Outer Compassion Wave Ribbon (Rose/Pink) */}
          <mesh rotation={[Math.PI / 2.0, 0.25, -0.1]}>
            <torusGeometry args={[225, 1.6, 16, 80]} />
            <meshStandardMaterial color="#fb7185" emissive="#e11d48" emissiveIntensity={2.5} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. CONVERSATIONAL VOICE SPECTRUM EQUALIZER BARS (ARC IN FRONT)*/}
      {/* ------------------------------------------------------------- */}
      <group ref={eqBarsRef} position={[0, -180, -650]}>
        {eqData.map((bar, i) => (
          <group key={i} position={[bar.x, 0, bar.z]}>
            <mesh position={[0, bar.height / 2, 0]}>
              <boxGeometry args={[4.5, bar.height, 4.5]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive={bar.color} 
                emissiveIntensity={3.4} 
                roughness={0.1} 
                metalness={0.9} 
              />
            </mesh>
            {/* Base anchor ring */}
            <mesh position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[5, 16]} />
              <meshBasicMaterial color={bar.color} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. FLOATING CONVERSATIONAL INTELLIGENCE GLASS HUD SCREENS      */}
      {/* ------------------------------------------------------------- */}
      
      {/* --- Left HUD: Empathy & Sentiment Engine --- */}
      <group ref={leftHudRef} position={[-280, 110, -560]} rotation={[0, 0.45, 0]}>
        {/* Holographic Translucent Glass Panel */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[180, 120]} />
          <meshPhysicalMaterial 
            color="#0f172a" 
            roughness={0.1} 
            metalness={0.2} 
            transmission={0.85} 
            transparent 
            opacity={0.88} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        {/* Cyber Neon Frame */}
        <mesh position={[0, 0, 0.5]}>
          <ringGeometry args={[88, 90, 4]} rotation={[0, 0, Math.PI / 4]} />
          <meshBasicMaterial color="#38bdf8" wireframe />
        </mesh>
        {/* Content */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-75, 42, 2]}
          fontSize={11}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.08}
        >
          MAYA NEURAL EMPATHY
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-75, 20, 2]}
          fontSize={16}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          outlineWidth={0.8}
          outlineColor="#0369a1"
        >
          COMPASSIONATE AI
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-75, -2, 2]}
          fontSize={9}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          • Emotion Vector: 99.8% Synchronized
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-75, -16, 2]}
          fontSize={9}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          • Latency: &lt; 140ms Natural Voice
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-75, -30, 2]}
          fontSize={9}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          • Adaptive Tone Modulation: Active
        </Text>
        {/* Mini Audio Wave Bar in HUD */}
        <mesh position={[0, -44, 2]}>
          <planeGeometry args={[150, 4]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* --- Right HUD: 24/7 Enterprise Representative Capabilities --- */}
      <group ref={rightHudRef} position={[280, 110, -560]} rotation={[0, -0.45, 0]}>
        {/* Holographic Translucent Glass Panel */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[180, 120]} />
          <meshPhysicalMaterial 
            color="#0f172a" 
            roughness={0.1} 
            metalness={0.2} 
            transmission={0.85} 
            transparent 
            opacity={0.88} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        {/* Cyber Neon Frame */}
        <mesh position={[0, 0, 0.5]}>
          <ringGeometry args={[88, 90, 4]} rotation={[0, 0, Math.PI / 4]} />
          <meshBasicMaterial color="#fb7185" wireframe />
        </mesh>
        {/* Content */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-75, 42, 2]}
          fontSize={11}
          color="#fb7185"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.08}
        >
          ENTERPRISE REVENUE DESK
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-75, 20, 2]}
          fontSize={16}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          outlineWidth={0.8}
          outlineColor="#be123c"
        >
          AUTONOMOUS SALES
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-75, -2, 2]}
          fontSize={9}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          • Inbound Lead Qualification: 24/7
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-75, -16, 2]}
          fontSize={9}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          • Habit & Wellness Coaching
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-75, -30, 2]}
          fontSize={9}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          • Multi-Lingual Speech Synthesis
        </Text>
        {/* Mini Audio Wave Bar in HUD */}
        <mesh position={[0, -44, 2]}>
          <planeGeometry args={[150, 4]} />
          <meshBasicMaterial color="#fb7185" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 5. CENTERPIECE: FLOATING MAYA EMBLEM & BRANDING               */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 310, -450]}>
        {/* Floating High-Res Maya Logo Emblem */}
        <Float speed={2} rotationIntensity={0.05} floatIntensity={0.35}>
          <mesh position={[0, 75, 0]}>
            <planeGeometry args={[130, 106]} />
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
          EMPATHETIC AI AVATAR & 24/7 ENTERPRISE CONCIERGE
        </Text>
      </group>
    </group>
  );
}
