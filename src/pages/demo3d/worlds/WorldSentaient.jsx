import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sparkles, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================================================
// WORLD SENTAIENT: Real-World Social Network & Human Connection OS
// Monumental Kinetic Infinity Nexus, Geospatial Proximity Radar Plaza,
// Spontaneous Real-World Meetup Beacons, Kindred Spirit Energy Arcs.
// ===========================================================================

export default function WorldSentaient({ position, rotation, visible }) {
  const centralInfinityRef = useRef();
  const earthNexusRef = useRef();
  const radarRingsRef = useRef();
  const sweepBeamRef = useRef();
  const meetupGroupRef = useRef();
  const hudRef = useRef();

  // Load official high-res sentAIent emblem
  const logoTex = useLoader(
    THREE.TextureLoader, 
    '/sentaient_logo_final.png'
  );
  logoTex.colorSpace = THREE.SRGBColorSpace;

  // Real-world spontaneous gathering clusters
  const meetupPods = useMemo(() => [
    { title: 'COFFEE & COLLAB', category: 'Creative Lab', x: -280, z: -460, color: '#60a9ff', members: 4 },
    { title: 'SUNSET TRAIL RUN', category: 'Alpine Fitness', x: 280, z: -460, color: '#ff8800', members: 6 },
    { title: 'AI BUILDER JAM', category: 'Tech Collective', x: -380, z: -640, color: '#38bdf8', members: 8 },
    { title: 'MINDFUL SOUNDBATH', category: 'Wellness Sanctuary', x: 380, z: -640, color: '#fbbf24', members: 5 },
    { title: 'LIVE ACOUSTIC ROOFTOP', category: 'Social Music', x: 0, z: -760, color: '#a855f7', members: 12 },
  ], []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.elapsedTime;

    // 1. Kinetic 3D Infinity Nexus Rotation & Breathing
    if (centralInfinityRef.current) {
      centralInfinityRef.current.position.y = 50 + Math.sin(t * 1.4) * 6;
      centralInfinityRef.current.rotation.y = t * 0.35;
      centralInfinityRef.current.rotation.z = Math.sin(t * 0.5) * 0.12;
    }

    // 2. Holographic Earth Presence Sphere
    if (earthNexusRef.current) {
      earthNexusRef.current.rotation.y = -t * 0.25;
      const s = 1.0 + Math.sin(t * 2.0) * 0.04;
      earthNexusRef.current.scale.set(s, s, s);
    }

    // 3. Proximity Radar Sweeping Beam
    if (sweepBeamRef.current) {
      sweepBeamRef.current.rotation.z = -t * 0.8;
    }

    // 4. Meetup Pods Subtle Floating & Beacon Pulsing
    if (meetupGroupRef.current) {
      meetupGroupRef.current.children.forEach((pod, idx) => {
        pod.position.y = -130 + Math.sin(t * 2.0 + idx * 1.2) * 6;
      });
    }

    // 5. HUD hover
    if (hudRef.current) {
      hudRef.current.position.y = 120 + Math.sin(t * 1.2) * 5;
    }
  });

  if (!visible) return null;

  return (
    <group position={position} rotation={rotation}>
      
      {/* Electric Cyan & Sovereign Warm Golden Lighting */}
      <ambientLight intensity={0.4} color="#061226" />
      <directionalLight position={[700, 800, -200]} intensity={3.5} color="#60a9ff" />
      <directionalLight position={[-700, 700, 300]} intensity={2.8} color="#ff8800" />
      <pointLight position={[0, 50, -550]} intensity={24} distance={1600} color="#ff8800" />
      <pointLight position={[0, 180, -550]} intensity={22} distance={1400} color="#60a9ff" />
      <pointLight position={[0, -140, -550]} intensity={16} distance={1000} color="#38bdf8" />

      {/* Atmospheric Real-World Community Connection Sparkles */}
      <Sparkles count={900} scale={[2200, 900, 2200]} size={12} speed={0.4} opacity={0.65} color="#60a9ff" position={[0, 60, -550]} />
      <Sparkles count={550} scale={[1500, 700, 1500]} size={14} speed={0.5} opacity={0.7} color="#ff8800" position={[0, 60, -550]} />
      <Sparkles count={300} scale={[1000, 500, 1000]} size={16} speed={0.3} opacity={0.75} color="#fbbf24" position={[0, 100, -550]} />

      {/* Deep Midnight Reflective Plaza Floor */}
      <mesh position={[0, -220, -550]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4400, 4400]} />
        <meshStandardMaterial color="#040916" roughness={0.12} metalness={0.92} />
      </mesh>

      {/* High-Tech Geolocation Concentric Grid */}
      <mesh position={[0, -218, -550]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1800, 1800, 36, 36]} />
        <meshBasicMaterial color="#60a9ff" wireframe transparent opacity={0.15} />
      </mesh>

      {/* ------------------------------------------------------------- */}
      {/* 1. GEOSPATIAL PROXIMITY RADAR RINGS & SWEEPING SCANNER        */}
      {/* ------------------------------------------------------------- */}
      <group ref={radarRingsRef} position={[0, -215, -550]} rotation={[-Math.PI / 2, 0, 0]}>
        {[180, 320, 480, 660].map((radius, idx) => (
          <mesh key={idx}>
            <ringGeometry args={[radius, radius + 3.5, 80]} />
            <meshBasicMaterial 
              color={idx % 2 === 0 ? "#ff8800" : "#60a9ff"} 
              transparent 
              opacity={0.42 - idx * 0.08} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        ))}

        {/* Real-Time Radar Sweep Beam */}
        <mesh ref={sweepBeamRef}>
          <ringGeometry args={[15, 680, 48, 1, 0, Math.PI / 3]} />
          <meshBasicMaterial 
            color="#60a9ff" 
            transparent 
            opacity={0.22} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE MONUMENTAL KINETIC 3D INFINITY NEXUS                   */}
      {/* ------------------------------------------------------------- */}
      <group ref={centralInfinityRef} position={[0, 50, -550]}>

        {/* Sovereign Orange Reality Loop (Physical Human Life) */}
        <mesh position={[-55, 0, 0]} rotation={[Math.PI / 3, 0.4, 0]}>
          <torusGeometry args={[115, 6.5, 24, 96]} />
          <meshStandardMaterial 
            color="#ff8800" 
            emissive="#ea580c" 
            emissiveIntensity={3.2} 
            metalness={0.85} 
            roughness={0.15} 
          />
        </mesh>

        {/* Electric Cyan Digital Loop (AI & Virtual Presence) */}
        <mesh position={[55, 0, 0]} rotation={[-Math.PI / 3, -0.4, 0]}>
          <torusGeometry args={[115, 6.5, 24, 96]} />
          <meshStandardMaterial 
            color="#60a9ff" 
            emissive="#0284c7" 
            emissiveIntensity={3.2} 
            metalness={0.85} 
            roughness={0.15} 
          />
        </mesh>

        {/* Golden Central Intersection Crossover Ring */}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[145, 3.5, 16, 80]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={2.5} />
        </mesh>

        {/* Central Holographic Geolocation Earth Sphere */}
        <group ref={earthNexusRef} position={[0, 0, 0]}>
          <mesh>
            <sphereGeometry args={[42, 32, 32]} />
            <meshStandardMaterial 
              color="#0284c7" 
              emissive="#60a9ff" 
              emissiveIntensity={2.0} 
              roughness={0.2} 
              metalness={0.8} 
              wireframe 
            />
          </mesh>
          <mesh scale={0.85}>
            <sphereGeometry args={[42, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ff8800" emissiveIntensity={3.5} />
          </mesh>
          <pointLight color="#ff8800" intensity={18} distance={450} />
          <pointLight color="#60a9ff" intensity={18} distance={450} />
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. SPONTANEOUS REAL-WORLD MEETUP BEACONS                      */}
      {/* ------------------------------------------------------------- */}
      <group ref={meetupGroupRef}>
        {meetupPods.map((pod, idx) => (
          <group key={idx} position={[pod.x, -130, pod.z]}>
            {/* Luminous Meetup Beacon Core */}
            <mesh position={[0, 30, 0]}>
              <sphereGeometry args={[14, 24, 24]} />
              <meshStandardMaterial color="#ffffff" emissive={pod.color} emissiveIntensity={3.8} />
            </mesh>
            <pointLight position={[0, 30, 0]} color={pod.color} intensity={10} distance={240} />

            {/* Pulsing Beacon Halo Rings */}
            <mesh position={[0, 30, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[18, 22, 32]} />
              <meshBasicMaterial color={pod.color} transparent opacity={0.65} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 30, 0]} rotation={[Math.PI / 3, 0.3, 0]}>
              <torusGeometry args={[26, 1.4, 12, 32]} />
              <meshStandardMaterial color="#ffffff" emissive={pod.color} emissiveIntensity={2.5} />
            </mesh>

            {/* Vertical Light Column connecting into Earth */}
            <mesh position={[0, -20, 0]}>
              <cylinderGeometry args={[2, 4, 100, 16]} />
              <meshBasicMaterial color={pod.color} transparent opacity={0.45} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Connecting Energy Arc bridging back to Center Infinity */}
            <line>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 30, 0, -pod.x, 180, -550 - pod.z])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial attach="material" color={pod.color} linewidth={2} transparent opacity={0.4} />
            </line>

            {/* Meetup Pill Card */}
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
                {pod.title}
              </Text>
              <Text
                font="/fonts/Roboto.woff"
                fallbackFonts={[]}
                position={[0, -3, 0]}
                fontSize={10}
                color={pod.color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={1.2}
                outlineColor="#020617"
              >
                {pod.category} • {pod.members} Kindred Nearby
              </Text>
            </group>
          </group>
        ))}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. FLOATING OFFICIAL SENTAIENT EMBLEM & TITLE                 */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 260, -380]}>
        {/* Floating High-Res sentAIent Logo */}
        <Float speed={2} rotationIntensity={0.06} floatIntensity={0.35}>
          <mesh position={[0, 40, 0]}>
            <planeGeometry args={[260, 65]} />
            <meshBasicMaterial map={logoTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </Float>

        {/* sentAIent Title */}
        <Text 
          position={[0, -20, 0]} 
          fontSize={44} 
          color="#ffffff" 
          outlineWidth={1.8}
          outlineColor="#1d4ed8"
          anchorX="center" 
          anchorY="middle"
          letterSpacing={0.12}
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]}
        >
          sentAIent
        </Text>

        {/* Subtitle */}
        <Text 
          position={[0, -56, 0]} 
          fontSize={15} 
          color="#60a9ff" 
          outlineWidth={0.8}
          outlineColor="#030816"
          anchorX="center" 
          anchorY="middle"
          letterSpacing={0.14}
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]}
        >
          AUTONOMOUS AI VENTURE STUDIO & REVENUE ENGINES
        </Text>
      </group>
    </group>
  );
}
