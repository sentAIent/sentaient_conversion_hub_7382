import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * WORLD MAYA: Empathetic AI Avatar & 24/7 Enterprise Representative
 * Redesigned as a Beautiful Holographic AI Avatar featuring:
 * - Lifelike Sculpted Holographic Female AI Avatar with Graceful Visage, Ethereal Luminescent Eyes, Flowing Cybernetic Hair Tendrils, and Empathy Heart Core
 * - Volumetric Holographic Light Projection Cone & Concentric High-Tech Emitter Dais
 * - Audio-Reactive Conversational Voice Equalizer & Emotional Resonance Rings
 * - Interactive Conversational Greeting & Dynamic Harmonic Feedback
 * - High-Contrast Enterprise Intelligence Consoles & Official Maya Emblem
 */
export default function WorldMaya({ position, visible }) {
  const avatarGroupRef = useRef();
  const headRef = useRef();
  const eyesRef = useRef();
  const lipsRef = useRef();
  const hairLeftRef = useRef();
  const hairRightRef = useRef();
  const empathyHeartRef = useRef();
  const projectorBeamRef = useRef();
  const resonanceOrbitsRef = useRef();
  const eqBarsRef = useRef();
  const leftHudRef = useRef();
  const rightHudRef = useRef();

  const [avatarHovered, setAvatarHovered] = useState(false);
  const [speechActive, setSpeechActive] = useState(true);

  // Load official Maya emblem
  const logoTex = useLoader(THREE.TextureLoader, '/maya_logo_final.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  // Web Audio chime feedback on avatar interaction
  const playChime = (freq = 523.25, duration = 0.35, type = 'sine') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Gracefully handled if browser policy restricts autoplay
    }
  };

  // 28 Equalizer Audio Frequency Columns forming a wide stage arc
  const eqData = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const angle = (i / 27) * Math.PI * 0.95 - Math.PI * 0.475;
      const radius = 320;
      return {
        x: Math.sin(angle) * radius,
        z: -Math.cos(angle) * radius + 120,
        height: 30 + (i % 5) * 14,
        speed: 2.2 + (i % 4) * 0.8,
        phase: (i * 0.4),
        color: i % 3 === 0 ? '#818cf8' : i % 3 === 1 ? '#38bdf8' : '#fb7185'
      };
    });
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // 1. Organic Breathing & Lifelike Idle Motion of Maya Avatar
    if (avatarGroupRef.current) {
      avatarGroupRef.current.position.y = Math.sin(t * 1.5) * 6;
      avatarGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.08;
    }

    // 2. Subtle Empathic Head Tilt & Expressive Eye Tracking
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 0.8) * 0.04;
      headRef.current.rotation.x = Math.sin(t * 1.1) * 0.03;
    }

    // 3. Ethereal Ocular Sensor Pulse (Blinking & Emotional Focus)
    if (eyesRef.current) {
      const blink = Math.pow(Math.sin(t * 0.65), 18);
      const eyeScaleY = THREE.MathUtils.lerp(1.0, 0.1, blink);
      eyesRef.current.scale.y = eyeScaleY;
    }

    // 4. Conversational Lips Audio Oscillation
    if (lipsRef.current) {
      const talkMod = speechActive ? (0.85 + Math.sin(t * 7.5) * 0.35 + Math.sin(t * 14.0) * 0.2) : 1.0;
      lipsRef.current.scale.x = talkMod;
      lipsRef.current.scale.y = 0.9 + Math.sin(t * 6.0) * 0.2;
    }

    // 5. Flowing Holographic Hair Tendrils (Gentle Cybernetic Breeze)
    if (hairLeftRef.current) {
      hairLeftRef.current.rotation.z = 0.15 + Math.sin(t * 1.4) * 0.06;
      hairLeftRef.current.rotation.x = Math.sin(t * 1.2) * 0.08;
    }
    if (hairRightRef.current) {
      hairRightRef.current.rotation.z = -0.15 - Math.sin(t * 1.4 + 0.5) * 0.06;
      hairRightRef.current.rotation.x = Math.sin(t * 1.2 + 0.5) * 0.08;
    }

    // 6. Empathy Heart Matrix Emotional Core Pulse
    if (empathyHeartRef.current) {
      const heartPulse = 1.0 + Math.sin(t * 2.8) * 0.12 + (avatarHovered ? 0.2 : 0);
      empathyHeartRef.current.scale.set(heartPulse, heartPulse, heartPulse);
      empathyHeartRef.current.rotation.y = t * 0.8;
    }

    // 7. Projector Beam Light Shimmer
    if (projectorBeamRef.current) {
      projectorBeamRef.current.material.opacity = 0.32 + Math.sin(t * 3.2) * 0.08;
    }

    // 8. Harmonic Voice Resonance Orbits
    if (resonanceOrbitsRef.current) {
      resonanceOrbitsRef.current.children.forEach((orbit, idx) => {
        const speed = (idx + 1) * 0.35;
        orbit.rotation.z = t * (idx % 2 === 0 ? speed : -speed);
        orbit.rotation.x = Math.sin(t * 0.5 + idx) * 0.3;
      });
    }

    // 9. Audio Frequency Equalizer Dancing
    if (eqBarsRef.current) {
      eqBarsRef.current.children.forEach((bar, i) => {
        const item = eqData[i];
        if (item) {
          const osc = 0.35 + 0.65 * Math.abs(Math.sin(t * item.speed + item.phase));
          bar.scale.y = osc;
        }
      });
    }

    // 10. Subtle Hover of Intelligence HUDs
    if (leftHudRef.current) {
      leftHudRef.current.position.y = 80 + Math.sin(t * 1.4) * 6;
    }
    if (rightHudRef.current) {
      rightHudRef.current.position.y = 80 + Math.sin(t * 1.4 + 1.2) * 6;
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* ------------------------------------------------------------- */}
      {/* 1. LIGHTING & LUXURIOUS CYBERNETIC ATMOSPHERE                */}
      {/* ------------------------------------------------------------- */}
      <ambientLight intensity={0.5} color="#0c071e" />
      <directionalLight position={[600, 800, 400]} intensity={3.5} color="#818cf8" />
      <directionalLight position={[-600, 600, -300]} intensity={2.8} color="#fb7185" />
      <pointLight position={[0, 160, -500]} intensity={24} distance={1500} color="#38bdf8" />
      <pointLight position={[0, 40, -450]} intensity={20} distance={1000} color="#e0f2fe" />
      <pointLight position={[0, 75, -550]} intensity={avatarHovered ? 26 : 16} distance={600} color="#f472b6" />

      {/* Atmospheric Consciousness Particles & Emotion Sparkles */}
      <Sparkles count={900} scale={[2400, 1000, 2400]} size={11} speed={0.4} opacity={0.65} color="#818cf8" position={[0, 120, -550]} />
      <Sparkles count={600} scale={[1800, 800, 1800]} size={9} speed={0.5} opacity={0.55} color="#fb7185" position={[0, 100, -550]} />
      <Sparkles count={500} scale={[1400, 600, 1400]} size={13} speed={0.3} opacity={0.7} color="#38bdf8" position={[0, 140, -550]} />

      {/* Reflective Deep Space Obsidian Ground Plane */}
      <mesh position={[0, -215, -550]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4800, 4800]} />
        <meshStandardMaterial color="#030108" roughness={0.1} metalness={0.96} />
      </mesh>

      {/* High-Gloss Obsidian Sanctuary Dais */}
      <mesh position={[0, -210, -550]} rotation={[-Math.PI / 2, 0, Math.PI / 6]}>
        <cylinderGeometry args={[460, 500, 24, 8]} />
        <meshStandardMaterial color="#05030e" roughness={0.12} metalness={0.94} />
      </mesh>

      {/* Concentric Energy Inlay Rings on Dais Floor */}
      {[240, 360, 470].map((radius, idx) => (
        <mesh key={idx} position={[0, -196, -550]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 4, 64]} />
          <meshBasicMaterial 
            color={idx % 2 === 0 ? "#818cf8" : "#38bdf8"} 
            transparent 
            opacity={0.5 - idx * 0.12} 
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* ------------------------------------------------------------- */}
      {/* 2. HOLOGRAPHIC EMITTER BASE & VOLUMETRIC PROJECTION CONE       */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, -195, -550]}>
        {/* Hologram Projector Ring Platform */}
        <mesh position={[0, 4, 0]}>
          <cylinderGeometry args={[130, 150, 12, 32]} />
          <meshStandardMaterial color="#0e0a24" roughness={0.15} metalness={0.95} />
        </mesh>
        {/* Glowing Lapis Emitter Rim */}
        <mesh position={[0, 10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[115, 128, 48]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={3.5} />
        </mesh>
        <pointLight position={[0, 25, 0]} color="#38bdf8" intensity={18} distance={400} />

        {/* Volumetric Upward Projection Light Cone */}
        <mesh ref={projectorBeamRef} position={[0, 160, 0]}>
          <cylinderGeometry args={[95, 125, 310, 32, 1, true]} />
          <meshBasicMaterial 
            color="#38bdf8" 
            transparent 
            opacity={0.28} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
          />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. BEAUTIFUL HOLOGRAPHIC AI AVATAR (MAYA)                      */}
      {/* ------------------------------------------------------------- */}
      <group 
        ref={avatarGroupRef} 
        position={[0, 20, -550]}
        onPointerOver={(e) => { e.stopPropagation(); setAvatarHovered(true); playChime(659.25, 0.35, 'triangle'); }}
        onPointerOut={(e) => { e.stopPropagation(); setAvatarHovered(false); }}
        onClick={(e) => { e.stopPropagation(); setSpeechActive(prev => !prev); playChime(523.25, 0.45, 'sine'); }}
      >
        {/* Holographic Torso, Neck, and Shoulders */}
        <group position={[0, -40, 0]}>
          {/* Elegant Tapered Cybernetic Shoulders / Bust */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[26, 42, 70, 24]} />
            <meshStandardMaterial
              color="#091b34"
              emissive="#38bdf8"
              emissiveIntensity={avatarHovered ? 2.4 : 1.6}
              roughness={0.15}
              metalness={0.88}
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Holographic Wireframe Chest & Shoulder Armor Lattice */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[26.5, 42.5, 71, 24, 6, true]} />
            <meshBasicMaterial
              color="#c084fc"
              wireframe
              transparent
              opacity={0.55}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          {/* Graceful Cybernetic Neck */}
          <mesh position={[0, 48, 0]}>
            <cylinderGeometry args={[14, 18, 32, 20]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#818cf8"
              emissiveIntensity={1.8}
              roughness={0.12}
              metalness={0.9}
              transparent
              opacity={0.88}
            />
          </mesh>
          <mesh position={[0, 48, 0]}>
            <cylinderGeometry args={[14.5, 18.5, 32, 16, 4, true]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>

          {/* Glowing Empathy Heart Matrix Core in Center of Chest */}
          <group ref={empathyHeartRef} position={[0, 5, 18]}>
            <mesh>
              <octahedronGeometry args={[14, 0]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#fb7185"
                emissiveIntensity={avatarHovered ? 4.5 : 3.0}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <pointLight color="#f43f5e" intensity={12} distance={180} />
          </group>
        </group>

        {/* Sculpted Holographic Head & Visage */}
        <group ref={headRef} position={[0, 45, 0]}>
          {/* Graceful Cranial Form */}
          <mesh position={[0, 16, -2]}>
            <sphereGeometry args={[26, 32, 28]} />
            <meshStandardMaterial
              color="#0d1b30"
              emissive="#38bdf8"
              emissiveIntensity={avatarHovered ? 2.2 : 1.4}
              roughness={0.15}
              metalness={0.85}
              transparent
              opacity={0.88}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Stylized Facial Plane & Cheeks */}
          <mesh position={[0, 12, 12]}>
            <sphereGeometry args={[20, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.55]} scale={[0.88, 1.05, 0.85]} />
            <meshStandardMaterial
              color="#13233c"
              emissive="#818cf8"
              emissiveIntensity={1.6}
              roughness={0.12}
              metalness={0.9}
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Ethereal Outer Holographic Face Scanline Lattice */}
          <mesh position={[0, 14, 1]}>
            <sphereGeometry args={[27.2, 28, 24]} />
            <meshBasicMaterial
              color="#a78bfa"
              wireframe
              transparent
              opacity={0.45}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          {/* Luminous Cybernetic Ocular Sensors (Expressive Almond Eyes) */}
          <group ref={eyesRef} position={[0, 17, 24]}>
            {/* Left Eye */}
            <mesh position={[-9, 0, 0]}>
              <sphereGeometry args={[4.2, 16, 16]} scale={[1.4, 0.85, 0.4]} />
              <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={5.0} />
            </mesh>
            {/* Right Eye */}
            <mesh position={[9, 0, 0]}>
              <sphereGeometry args={[4.2, 16, 16]} scale={[1.4, 0.85, 0.4]} />
              <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={5.0} />
            </mesh>
            {/* Soft Eye Aura Glow */}
            <pointLight position={[0, 0, 4]} color="#38bdf8" intensity={8} distance={120} />
          </group>

          {/* Graceful Audio-Reactive Conversational Lips */}
          <mesh ref={lipsRef} position={[0, 4.5, 23]}>
            <torusGeometry args={[5.2, 1.2, 12, 24, Math.PI]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#fb7185" emissive="#f43f5e" emissiveIntensity={3.2} />
          </mesh>

          {/* Forehead Holographic Neural Node */}
          <mesh position={[0, 27, 21]}>
            <circleGeometry args={[2.8, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={4.0} />
          </mesh>

          {/* Flowing Luminescent Holographic Hair Tendrils (Left Side) */}
          <group ref={hairLeftRef} position={[-20, 24, -2]}>
            <mesh position={[-6, -28, 4]} rotation={[0.1, 0, 0.12]}>
              <cylinderGeometry args={[2.5, 6.0, 75, 12]} />
              <meshStandardMaterial
                color="#818cf8"
                emissive="#c084fc"
                emissiveIntensity={2.5}
                transparent
                opacity={0.82}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
            <mesh position={[-8, -20, -10]} rotation={[-0.2, 0, 0.15]}>
              <cylinderGeometry args={[2.0, 5.0, 65, 12]} />
              <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2.2} transparent opacity={0.78} />
            </mesh>
          </group>

          {/* Flowing Luminescent Holographic Hair Tendrils (Right Side) */}
          <group ref={hairRightRef} position={[20, 24, -2]}>
            <mesh position={[6, -28, 4]} rotation={[0.1, 0, -0.12]}>
              <cylinderGeometry args={[2.5, 6.0, 75, 12]} />
              <meshStandardMaterial
                color="#818cf8"
                emissive="#c084fc"
                emissiveIntensity={2.5}
                transparent
                opacity={0.82}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
            <mesh position={[8, -20, -10]} rotation={[-0.2, 0, -0.15]}>
              <cylinderGeometry args={[2.0, 5.0, 65, 12]} />
              <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2.2} transparent opacity={0.78} />
            </mesh>
          </group>

          {/* Crown Holographic Halo Diadem */}
          <mesh position={[0, 36, -2]} rotation={[Math.PI / 2.3, 0, 0]}>
            <torusGeometry args={[24, 1.4, 16, 48]} />
            <meshStandardMaterial color="#ffd700" emissive="#f59e0b" emissiveIntensity={3.2} />
          </mesh>
        </group>

        {/* Concentric Harmonic Voice Orbits Floating around Avatar */}
        <group ref={resonanceOrbitsRef} position={[0, 20, 0]}>
          {/* Inner Vocal Frequency Ring (Cyan) */}
          <mesh rotation={[Math.PI / 2.2, 0.1, 0]}>
            <torusGeometry args={[95, 2.2, 16, 80]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={3.2} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Mid Empathy Resonance Ring (Lavender) */}
          <mesh rotation={[Math.PI / 1.8, -0.15, 0.2]}>
            <torusGeometry args={[135, 1.8, 16, 80]} />
            <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={2.8} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Outer Compassion Wave Ring (Rose) */}
          <mesh rotation={[Math.PI / 2.0, 0.25, -0.1]}>
            <torusGeometry args={[175, 1.5, 16, 80]} />
            <meshStandardMaterial color="#fb7185" emissive="#e11d48" emissiveIntensity={2.5} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* Floating Interactive Greeting Badge */}
        <Float speed={1.8} rotationIntensity={0.02} floatIntensity={0.25}>
          <group position={[0, 115, 30]}>
            <mesh position={[0, 0, -2]}>
              <planeGeometry args={[280, 42]} />
              <meshBasicMaterial color="#090d16" transparent opacity={0.88} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0, -1]}>
              <planeGeometry args={[282, 44]} />
              <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.5} />
            </mesh>
            <Text
              font="/fonts/Roboto.woff"
              fallbackFonts={[]}
              position={[0, 8, 2]}
              fontSize={11.5}
              color="#38bdf8"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.12}
            >
              ● MAYA LIVE CONVERSATIONAL AI ●
            </Text>
            <Text
              font="/fonts/Roboto.woff"
              fallbackFonts={[]}
              position={[0, -8, 2]}
              fontSize={9}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              “Welcome! How can I assist your enterprise growth today?”
            </Text>
          </group>
        </Float>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. CONVERSATIONAL VOICE EQUALIZER BARS (STAGE ARC IN FRONT)   */}
      {/* ------------------------------------------------------------- */}
      <group ref={eqBarsRef} position={[0, -180, -550]}>
        {eqData.map((bar, i) => (
          <group key={i} position={[bar.x, 0, bar.z]}>
            <mesh position={[0, bar.height / 2, 0]}>
              <boxGeometry args={[5.5, bar.height, 5.5]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive={bar.color} 
                emissiveIntensity={3.2} 
                roughness={0.1} 
                metalness={0.9} 
              />
            </mesh>
            <mesh position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[6, 16]} />
              <meshBasicMaterial color={bar.color} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 5. HIGH-TECH HOLOGRAPHIC INTELLIGENCE CONSOLES (READABLE)     */}
      {/* ------------------------------------------------------------- */}
      {/* Left Console: Neural Empathy */}
      <group ref={leftHudRef} position={[-360, 80, -480]} rotation={[0, 0.36, 0]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[260, 160]} />
          <meshPhysicalMaterial 
            color="#090d16" 
            roughness={0.1} 
            metalness={0.3} 
            transmission={0.82} 
            transparent 
            opacity={0.9} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        <mesh position={[0, 0, 1]}>
          <planeGeometry args={[262, 162]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.45} />
        </mesh>

        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-115, 54, 3]}
          fontSize={17}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.1}
        >
          NEURAL EMPATHY ARCHITECTURE
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-115, 26, 3]}
          fontSize={22}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          outlineWidth={1.0}
          outlineColor="#0369a1"
        >
          COMPASSIONATE AI CORE
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-115, -6, 3]}
          fontSize={14}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          • Emotion Alignment: 99.8% Synchronized
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-115, -28, 3]}
          fontSize={14}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          • Voice Latency: &lt; 140ms Client WebGPU
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-115, -50, 3]}
          fontSize={14}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          • Dynamic Tone Modulation &amp; Active Listening
        </Text>
      </group>

      {/* Right Console: Enterprise Capabilities */}
      <group ref={rightHudRef} position={[360, 80, -480]} rotation={[0, -0.36, 0]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[260, 160]} />
          <meshPhysicalMaterial 
            color="#090d16" 
            roughness={0.1} 
            metalness={0.3} 
            transmission={0.82} 
            transparent 
            opacity={0.9} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        <mesh position={[0, 0, 1]}>
          <planeGeometry args={[262, 162]} />
          <meshBasicMaterial color="#fb7185" wireframe transparent opacity={0.45} />
        </mesh>

        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-115, 54, 3]}
          fontSize={17}
          color="#fb7185"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.1}
        >
          ENTERPRISE REPRESENTATIVE
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-115, 26, 3]}
          fontSize={22}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          outlineWidth={1.0}
          outlineColor="#be123c"
        >
          AUTONOMOUS SALES DESK
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-115, -6, 3]}
          fontSize={14}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          • 24/7 Inbound Lead Qualification &amp; Demo Booking
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-115, -28, 3]}
          fontSize={14}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          • Multi-Lingual Speech Synthesis (20+ Languages)
        </Text>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-115, -50, 3]}
          fontSize={14}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          • 1-Line Web Concierge Script Embed
        </Text>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 6. PROMINENT MAYA EMBLEM & CLEAR TITLE BRANDING               */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 230, -380]}>
        {/* Floating High-Res Maya Logo Emblem - Crisp Normal Blending */}
        <Float speed={2} rotationIntensity={0.04} floatIntensity={0.3}>
          <mesh position={[0, 85, 0]}>
            <planeGeometry args={[150, 122]} />
            <meshBasicMaterial map={logoTex} transparent depthWrite={false} />
          </mesh>
        </Float>

        {/* Maya Title */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, 0, 0]}
          fontSize={64}
          color="#ffffff"
          outlineWidth={2.2}
          outlineColor="#4338ca"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          MAYA
        </Text>

        {/* Subtitle */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, -50, 0]}
          fontSize={26}
          color="#818cf8"
          outlineWidth={1.2}
          outlineColor="#090d16"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          EMPATHETIC AI AVATAR &amp; 24/7 ENTERPRISE CONCIERGE
        </Text>
      </group>
    </group>
  );
}
