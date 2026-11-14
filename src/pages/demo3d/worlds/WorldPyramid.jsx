import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sparkles, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================================================
// WORLD PYRAMID: Autonomous Profit Engine & Strategic Execution
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

  // Dynamic Autonomous Telemetry State & Apex Interactivity
  const [telemetry, setTelemetry] = useState({
    total_treasury_balance_dollars: 1090.09,
    gross_revenue_dollars: 1104.0,
    net_profit_dollars: 1090.09,
    aggregate_margin_pct: 98.7,
    solvency_health_score: 99,
    synaptic_pulse_intensity: 0.2,
    active_ventures: [
      "Bug Bounty Hunter (#5)",
      "Media Localization Studio (#3)",
      "Academic Synthesis Studio (#2)",
      "Autonomous Marketing Agency (#1)"
    ],
    recent_events: []
  });
  const [apexHovered, setApexHovered] = useState(false);
  const [showExecutiveBoard, setShowExecutiveBoard] = useState(false);
  const [hoveredObelisk, setHoveredObelisk] = useState(null);
  const [selectedObelisk, setSelectedObelisk] = useState(null);

  // Web Audio native harmonic chime feedback
  const playChime = (freq = 440, duration = 0.35, type = 'sine') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay gracefully suppressed if not yet interacted
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('/pyramid_telemetry.json');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setTelemetry(data);
        }
      } catch (e) {
        // Fallback defaults retained
      }
    };
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3500);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Load official high-res Pyramid emblem
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

    // 2. Apex Consciousness Orb Pulsing & Dynamic Synaptic Surge
    if (apexOrbRef.current) {
      const pulseRate = 3.0 + (telemetry.synaptic_pulse_intensity || 0.2) * 8.0;
      const basePulse = 1.0 + Math.sin(t * pulseRate) * 0.08;
      const hoverScale = apexHovered ? 1.3 : 1.0;
      apexOrbRef.current.scale.set(basePulse * hoverScale, basePulse * hoverScale, basePulse * hoverScale);
      apexOrbRef.current.rotation.y = t * 0.6;
    }

    // Dynamic Circuit Synaptic Pulse Surge
    if (circuitsRef.current) {
      circuitsRef.current.children.forEach((child, i) => {
        if (child.material) {
          const pulseWave = Math.sin(t * 3.5 + i * 0.25);
          child.material.opacity = Math.max(0.3, Math.min(1.0, 0.55 + pulseWave * 0.45));
        }
      });
    }

    // 3. Expanding Wireless Thought Transmission Wave Pulses (All Directions)
    if (waveArcsRef.current) {
      const count = waveArcsRef.current.children.length;
      waveArcsRef.current.children.forEach((group, idx) => {
        const speed = 1.1;
        const progress = ((t * speed + idx * (1.0 / count)) % 1.0);
        const s = 1.0 + progress * 1.0;
        group.scale.set(s, s, s);
        const opacity = Math.pow(1.0 - progress, 1.2) * 0.85;
        group.traverse((node) => {
          if (node.isMesh && node.material) {
            node.material.opacity = opacity * (node.userData.baseAlpha || 1.0);
          }
        });
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

        {/* Crystalline High-Tech 4-Sided Cyber-Pyramid Shell */}
        <mesh position={[0, 20, 0]} rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[0, 240, 320, 4, 1]} />
          <meshStandardMaterial 
            color="#080e1e" 
            emissive="#00e5ff" 
            emissiveIntensity={0.65} 
            roughness={0.15} 
            metalness={0.92} 
            transparent 
            opacity={0.88} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Luminous Cyan Edge Ribs Framing the Pyramid */}
        <mesh position={[0, 20, 0]} rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[0, 241, 321, 4, 1]} />
          <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.85} />
        </mesh>

        {/* ------------------------------------------------------------- */}
        {/* 2. THE QUANTUM AI BRAIN CORE (INSIDE PYRAMID CENTER)         */}
        {/* ------------------------------------------------------------- */}
        <group ref={brainCoreRef} position={[0, 20, 0]} scale={0.5}>
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
          {/* Levitating Apex Purple/Indigo Spherical Transmitter with Interactivity */}
          <mesh 
            ref={apexOrbRef}
            onPointerOver={(e) => { e.stopPropagation(); setApexHovered(true); playChime(523.25, 0.25, 'sine'); }}
            onPointerOut={(e) => { e.stopPropagation(); setApexHovered(false); }}
            onClick={(e) => { e.stopPropagation(); setShowExecutiveBoard((prev) => !prev); playChime(329.63, 0.45, 'triangle'); }}
          >
            <sphereGeometry args={[22, 32, 32]} />
            <meshStandardMaterial 
              color={apexHovered ? "#6b21a8" : "#3b0764"} 
              emissive={apexHovered ? "#e879f9" : "#a855f7"} 
              emissiveIntensity={apexHovered ? 4.5 : 3.2} 
              metalness={0.9} 
              roughness={0.1} 
            />
          </mesh>
          <pointLight color={apexHovered ? "#f472b6" : "#c084fc"} intensity={apexHovered ? 24 : 14} distance={450} />

          {/* Upward Apex Yield Transmission Light Pillar */}
          <mesh position={[0, 150, 0]}>
            <cylinderGeometry args={[2.5, 6, 300, 16]} />
            <meshBasicMaterial color="#c084fc" transparent opacity={apexHovered ? 0.7 : 0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>

          {/* Radial Wireless Thought Transmission Waves (All Directions) */}
          <group ref={waveArcsRef}>
            {[0, 1, 2, 3].map((w) => (
              <group key={w}>
                {/* Horizontal Wave Ring (XZ Plane) */}
                <mesh rotation={[Math.PI / 2, 0, 0]} userData={{ baseAlpha: 0.85 }}>
                  <ringGeometry args={[26, 29, 64]} />
                  <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
                {/* Frontal Wave Ring (XY Plane - Camera Facing) */}
                <mesh rotation={[0, 0, 0]} userData={{ baseAlpha: 0.75 }}>
                  <ringGeometry args={[26, 29, 64]} />
                  <meshBasicMaterial color="#c084fc" transparent opacity={0.7} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
                {/* Lateral Wave Ring (YZ Plane) */}
                <mesh rotation={[0, Math.PI / 2, 0]} userData={{ baseAlpha: 0.65 }}>
                  <ringGeometry args={[26, 29, 64]} />
                  <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
                {/* Diagonal Spherical Wave Ring */}
                <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]} userData={{ baseAlpha: 0.55 }}>
                  <ringGeometry args={[26, 29, 64]} />
                  <meshBasicMaterial color="#f472b6" transparent opacity={0.5} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
              </group>
            ))}
          </group>
        </group>

        {/* 4 Interactive Monumental Obelisks: Autonomous Fleet Stations */}
        {[
          { key: 'north', name: 'Marketing Agency (#1)', pos: [-270, -140], color: '#f59e0b', note: 440.0 },
          { key: 'east', name: 'Academic Studio (#2)', pos: [270, -140], color: '#38bdf8', note: 493.88 },
          { key: 'south', name: 'Localization (#3)', pos: [-200, 120], color: '#c084fc', note: 587.33 },
          { key: 'west', name: 'Bug Bounty (#5)', pos: [200, 120], color: '#34d399', note: 659.25 }
        ].map((ob, idx) => {
          const isHovered = hoveredObelisk === ob.key;
          const isSelected = selectedObelisk === ob.key;
          const obData = telemetry?.obelisks?.[ob.key] || { jobs: 2, profit_dollars: 209.32 };

          return (
            <group 
              key={idx} 
              position={[ob.pos[0], -80, ob.pos[1]]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredObelisk(ob.key);
                playChime(ob.note, 0.25, 'sine');
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredObelisk(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedObelisk(prev => prev === ob.key ? null : ob.key);
                playChime(ob.note * 0.75, 0.4, 'triangle');
              }}
            >
              {/* Tapered Obelisk Shaft */}
              <mesh position={[0, 75, 0]}>
                <cylinderGeometry args={[5, 12, 150, 4]} rotation={[0, Math.PI / 4, 0]} />
                <meshStandardMaterial 
                  color={isHovered || isSelected ? "#18182f" : "#090a14"} 
                  roughness={0.2} 
                  metalness={0.9} 
                />
              </mesh>
              {/* Pyramidion Gold / Electrum Cap */}
              <mesh position={[0, 160, 0]}>
                <coneGeometry args={[6.5, 18, 4]} rotation={[0, Math.PI / 4, 0]} />
                <meshStandardMaterial 
                  color={ob.color} 
                  emissive={ob.color} 
                  emissiveIntensity={isHovered || isSelected ? 4.5 : 2.5} 
                  metalness={0.95} 
                />
              </mesh>
              <pointLight position={[0, 165, 0]} color={ob.color} intensity={isHovered || isSelected ? 8 : 4} distance={220} />

              {/* Station Label & Live Profit Halo */}
              <Text
                font="/fonts/Roboto.woff"
                fallbackFonts={[]}
                position={[0, 190, 0]}
                fontSize={13}
                color={ob.color}
                outlineWidth={0.8}
                outlineColor="#090a14"
                anchorX="center"
                anchorY="middle"
              >
                {ob.name}
              </Text>
              <Text
                font="/fonts/Roboto.woff"
                fallbackFonts={[]}
                position={[0, 175, 0]}
                fontSize={10.5}
                color="#ffffff"
                outlineWidth={0.5}
                outlineColor="#090a14"
                anchorX="center"
                anchorY="middle"
              >
                {`PROFIT: +$${(obData.profit_dollars ?? 120.0).toFixed(2)}`}
              </Text>
            </group>
          );
        })}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. FLOATING OFFICIAL PYRAMID EMBLEM & TITLE                   */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 310, -450]}>
        {/* Floating High-Res PyRAmid Logo Icon (Sleek & Scaled) */}
        <Float speed={2} rotationIntensity={0.06} floatIntensity={0.35}>
          <mesh position={[0, 96, 0]}>
            <planeGeometry args={[82, 82]} />
            <meshBasicMaterial map={logoTex} transparent depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
        </Float>

        {/* Pyramid Title Text */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, 8, 0]}
          fontSize={56}
          color="#00e5ff"
          outlineWidth={2.0}
          outlineColor="#3b0764"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          Pyramid
        </Text>
      </group>
    </group>
  );
}
