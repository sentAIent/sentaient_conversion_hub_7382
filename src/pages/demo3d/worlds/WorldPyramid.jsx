import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Custom GLSL shader for the shimmering golden caustic reflecting pool
const poolVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    // Subtle physical surface undulation
    pos.z += sin(pos.x * 0.04 + uTime * 1.5) * cos(pos.y * 0.04 + uTime * 1.2) * 1.8;
    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const poolFragmentShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  uniform float uTime;
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Golden caustic interference rings radiating from the pyramid reflection
    float c1 = sin(dist * 60.0 - uTime * 2.5);
    float c2 = cos((vUv.x - 0.5) * 80.0 + uTime * 1.8);
    float c3 = sin((vUv.y - 0.5) * 70.0 - uTime * 2.0);
    float caustics = clamp((c1 * 0.5 + c2 * 0.25 + c3 * 0.25) * 1.5, 0.0, 1.0);
    
    // Deep midnight obsidian water base
    vec3 waterBase = vec3(0.015, 0.01, 0.03);
    // Molten sovereign gold highlight
    vec3 goldHighlight = vec3(1.0, 0.78, 0.25);
    // Deep amethyst atmospheric rim
    vec3 purpleHaze = vec3(0.28, 0.1, 0.45);
    
    vec3 color = mix(waterBase, purpleHaze, dist * 1.2);
    color += goldHighlight * (caustics * 0.55);
    
    // Soft vignette at edges of pool
    float edgeAlpha = smoothstep(0.5, 0.35, dist);
    
    gl_FragColor = vec4(color, edgeAlpha * 0.92);
  }
`;

export default function WorldPyramid({ position, visible }) {
  const poolShaderRef = useRef();
  const apexCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const opportunityPrismsRef = useRef();
  const lightBeaconRef = useRef();

  const prismCount = 20;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-generate opportunity data vectors (scanned market yields)
  const prismData = useMemo(() => {
    const list = [];
    for (let i = 0; i < prismCount; i++) {
      list.push({
        xOffset: (Math.random() - 0.5) * 90,
        baseY: 20 + Math.random() * 40,
        speed: 0.35 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        rotSpeed: 0.6 + Math.random() * 1.2,
        scale: 6 + Math.random() * 7
      });
    }
    return list;
  }, []);

  const poolUniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // 1. Update reflecting pool caustics
    if (poolShaderRef.current) {
      poolShaderRef.current.uniforms.uTime.value = t;
    }

    // 2. Apex Autonomous Business Core (Eye of RA) Levitation & Rotation
    if (apexCoreRef.current) {
      apexCoreRef.current.position.y = 220 + Math.sin(t * 1.4) * 6;
      apexCoreRef.current.rotation.y = t * 0.4;
      apexCoreRef.current.rotation.z = Math.sin(t * 0.8) * 0.08;
    }

    // 3. Counter-rotating precision telemetry rings
    if (ring1Ref.current) ring1Ref.current.rotation.y = -t * 0.6;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.5;
    if (ring3Ref.current) ring3Ref.current.rotation.z = -t * 0.4;

    // 4. Upward market telemetry laser beacon modulation
    if (lightBeaconRef.current) {
      lightBeaconRef.current.material.opacity = 0.35 + Math.sin(t * 4.0) * 0.12;
    }

    // 5. Floating Opportunity Prisms along the Grand Obsidian Avenue
    if (opportunityPrismsRef.current) {
      for (let i = 0; i < prismCount; i++) {
        const item = prismData[i];
        const progress = ((t * 0.18 * item.speed + item.phase) % 1.0);
        
        // Glide from pyramid base (-600 Z) toward camera (-180 Z)
        const z = -650 + progress * 500;
        const y = -180 + item.baseY + Math.sin(t * 2.0 + i) * 8;
        const x = item.xOffset + Math.sin(t * 1.5 + i) * 12;

        dummy.position.set(x, y, z);
        dummy.rotation.set(t * item.rotSpeed, t * item.rotSpeed * 0.7, i);
        dummy.scale.setScalar(item.scale);
        dummy.updateMatrix();
        opportunityPrismsRef.current.setMatrixAt(i, dummy.matrix);
      }
      opportunityPrismsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* Sovereign Twilight Lighting: Deep Cosmic Desert Atmosphere */}
      <ambientLight intensity={0.3} color="#180b2b" />
      <directionalLight position={[0, 950, -200]} intensity={3.8} color="#ffd480" />
      <directionalLight position={[-850, 400, 200]} intensity={1.8} color="#c084fc" />
      <directionalLight position={[850, 200, 200]} intensity={1.4} color="#00e5ff" />
      <pointLight position={[0, 220, -750]} intensity={22} distance={1800} color="#ffaa00" />
      <pointLight position={[0, -180, -380]} intensity={8} distance={900} color="#ffd700" />

      {/* Infinite Cosmic Desert Dunes Ground Plane */}
      <mesh position={[0, -220, -500]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5000, 5000, 40, 40]} />
        <meshStandardMaterial 
          color="#080410" 
          roughness={0.85} 
          metalness={0.15} 
        />
      </mesh>

      {/* Atmospheric Sovereign Golden Embers & Stardust */}
      <Sparkles 
        count={700} 
        scale={[2200, 1000, 2200]} 
        size={14} 
        speed={0.5} 
        opacity={0.65} 
        color="#fbbf24" 
        position={[0, 100, -600]} 
      />
      <Sparkles 
        count={350} 
        scale={[1400, 700, 1400]} 
        size={18} 
        speed={0.3} 
        opacity={0.55} 
        color="#c084fc" 
        position={[0, 180, -600]} 
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. THE MONUMENTAL OBSIDIAN & ELECTRUM STEPPED CITADEL */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, -220, -780]}>
        
        {/* Tier 1 (Grand Base Tier) */}
        <mesh position={[0, 45, 0]}>
          <boxGeometry args={[580, 90, 580]} />
          <meshStandardMaterial color="#0a0c16" roughness={0.18} metalness={0.92} />
        </mesh>
        {/* Electrum Inlaid Border Tier 1 */}
        <mesh position={[0, 90, 0]}>
          <boxGeometry args={[582, 3, 582]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={1.4} metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Tier 2 */}
        <mesh position={[0, 125, 0]}>
          <boxGeometry args={[450, 70, 450]} />
          <meshStandardMaterial color="#080a13" roughness={0.18} metalness={0.92} />
        </mesh>
        {/* Electrum Inlaid Border Tier 2 */}
        <mesh position={[0, 160, 0]}>
          <boxGeometry args={[452, 3, 452]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={1.4} metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Tier 3 */}
        <mesh position={[0, 195, 0]}>
          <boxGeometry args={[320, 70, 320]} />
          <meshStandardMaterial color="#06080f" roughness={0.18} metalness={0.92} />
        </mesh>
        {/* Electrum Inlaid Border Tier 3 */}
        <mesh position={[0, 230, 0]}>
          <boxGeometry args={[322, 3, 322]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={1.4} metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Tier 4 (Apex Platform of Autonomous Strategy) */}
        <mesh position={[0, 260, 0]}>
          <boxGeometry args={[190, 60, 190]} />
          <meshStandardMaterial color="#05060c" roughness={0.15} metalness={0.95} />
        </mesh>
        {/* Polished Gold Capstone Rim */}
        <mesh position={[0, 290, 0]}>
          <boxGeometry args={[192, 4, 192]} />
          <meshStandardMaterial color="#ffd700" emissive="#b45309" emissiveIntensity={2.0} metalness={0.98} roughness={0.08} />
        </mesh>

        {/* Vertical Lapis Lazuli Energy Conduits Pulsing Up the Pyramid Faces */}
        {[-290, 290].map((xOffset, idx) => (
          <mesh key={`cx-${idx}`} position={[xOffset, 145, 0]}>
            <boxGeometry args={[4, 290, 4]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        ))}
        {[-290, 290].map((zOffset, idx) => (
          <mesh key={`cz-${idx}`} position={[0, 145, zOffset]}>
            <boxGeometry args={[4, 290, 4]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        ))}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE EYE OF RA: AUTONOMOUS BUSINESS BRAIN AT THE APEX */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 95, -780]}>
        
        {/* Levitation Group */}
        <group ref={apexCoreRef}>
          {/* Radiant Quantum Singularity Sun */}
          <mesh>
            <dodecahedronGeometry args={[38, 0]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#fbbf24" 
              emissiveIntensity={4.8} 
              metalness={0.9} 
              roughness={0.05} 
            />
          </mesh>
          <pointLight color="#ffd000" intensity={28} distance={750} />

          {/* Crystalline Electrum Geometric Exo-Shell */}
          <mesh>
            <icosahedronGeometry args={[50, 0]} />
            <meshStandardMaterial 
              color="#fbbf24" 
              emissive="#d97706" 
              emissiveIntensity={1.8} 
              metalness={0.98} 
              roughness={0.12} 
              wireframe={true} 
            />
          </mesh>
        </group>

        {/* Multi-Axis Counter-Rotating Sovereign Telemetry Rings */}
        <group ref={ring1Ref}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[95, 2.2, 16, 90]} />
            <meshStandardMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={2.8} metalness={0.95} />
          </mesh>
        </group>
        <group ref={ring2Ref}>
          <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
            <torusGeometry args={[125, 1.8, 16, 90]} />
            <meshStandardMaterial color="#00e5ff" emissive="#0284c7" emissiveIntensity={2.5} metalness={0.95} />
          </mesh>
        </group>
        <group ref={ring3Ref}>
          <mesh rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
            <torusGeometry args={[155, 1.5, 16, 90]} />
            <meshStandardMaterial color="#c084fc" emissive="#7e22ce" emissiveIntensity={2.2} metalness={0.95} />
          </mesh>
        </group>

        {/* Upward Macro-Market Strategic Laser Conduit */}
        <mesh ref={lightBeaconRef} position={[0, 480, 0]}>
          <cylinderGeometry args={[2.5, 6, 960, 16]} />
          <meshBasicMaterial 
            color="#ffd700" 
            transparent 
            opacity={0.4} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
          />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. SHIMMERING OBSIDIAN REFLECTING POOL WITH CAUSTIC SHADER */}
      {/* ------------------------------------------------------------- */}
      <mesh position={[0, -217, -420]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[260, 460, 32, 32]} />
        <shaderMaterial 
          ref={poolShaderRef}
          vertexShader={poolVertexShader}
          fragmentShader={poolFragmentShader}
          uniforms={poolUniforms}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pool Basin Border Framing */}
      <mesh position={[0, -218, -420]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[272, 472]} />
        <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={0.8} metalness={0.95} roughness={0.15} />
      </mesh>

      {/* ------------------------------------------------------------- */}
      {/* 4. FLOATING OPPORTUNITY PRISMS (HIGH-YIELD BUSINESS NODES) */}
      {/* ------------------------------------------------------------- */}
      <instancedMesh ref={opportunityPrismsRef} args={[null, null, prismCount]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffd700" 
          emissiveIntensity={3.2} 
          roughness={0.08} 
          metalness={0.96} 
        />
      </instancedMesh>

      {/* ------------------------------------------------------------- */}
      {/* 5. TWIN GUARDIAN PYLONS OF STRATEGY & AUTONOMOUS EXECUTION */}
      {/* ------------------------------------------------------------- */}
      {[-210, 210].map((xOffset, idx) => (
        <group key={`pylon-${idx}`} position={[xOffset, -220, -420]}>
          {/* Tapered Monolith Shaft */}
          <mesh position={[0, 120, 0]}>
            <cylinderGeometry args={[10, 18, 240, 4]} />
            <meshStandardMaterial 
              color="#070912" 
              roughness={0.15} 
              metalness={0.92} 
            />
          </mesh>
          {/* Lapis Vertical Beacon Inlay */}
          <mesh position={[0, 120, 10.5]}>
            <planeGeometry args={[2, 236]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>
          {/* Electrum Pyramidion Capstone */}
          <mesh position={[0, 252, 0]}>
            <coneGeometry args={[11, 26, 4]} />
            <meshStandardMaterial 
              color="#ffd700" 
              emissive="#d97706" 
              emissiveIntensity={3.2} 
              metalness={0.98} 
              roughness={0.08} 
            />
          </mesh>
          <pointLight 
            position={[0, 255, 0]} 
            color="#ffd000" 
            intensity={6} 
            distance={320} 
          />
        </group>
      ))}

    </group>
  );
}
