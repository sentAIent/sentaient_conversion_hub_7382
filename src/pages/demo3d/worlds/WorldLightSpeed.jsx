import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Custom GLSL shader for the glowing hexagonal Zero-Trust cyber shield
const shieldVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const shieldFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uPulseColor;

  void main() {
    // Fresnel rim glow for high-end forcefield effect
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.8);
    
    // Hexagonal matrix interference pattern
    float hexPattern = sin(vUv.x * 60.0 + uTime * 1.5) * cos(vUv.y * 60.0 - uTime * 1.2);
    float scanline = sin(vPosition.y * 0.12 - uTime * 4.0);
    
    float intensity = fresnel * 1.4 + max(0.0, hexPattern * 0.35) + max(0.0, scanline * 0.25);
    vec3 color = mix(uBaseColor, uPulseColor, fresnel * 0.7);
    
    float alpha = clamp(fresnel * 0.65 + (hexPattern > 0.6 ? 0.35 : 0.05), 0.0, 0.85);
    gl_FragColor = vec4(color * intensity, alpha);
  }
`;

export default function WorldLightSpeed({ position, visible }) {
  const quantumMainframeRef = useRef();
  const innerDieRef = useRef();
  const shieldShaderRef = useRef();
  const edgeTorusRef = useRef();
  const packetsRef = useRef();
  const threatsRef = useRef();

  const packetCount = 48;
  const threatCount = 18;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-calculate fiber packet trajectories along global edge routes
  const packetData = useMemo(() => {
    const list = [];
    for (let i = 0; i < packetCount; i++) {
      const radius = 180 + Math.random() * 140;
      const angle = (i / packetCount) * Math.PI * 2;
      const speed = 1.2 + Math.random() * 1.8;
      const yOffset = (Math.random() - 0.5) * 80;
      list.push({ radius, angle, speed, yOffset, size: 2.5 + Math.random() * 3.0 });
    }
    return list;
  }, []);

  // Threat vectors: red inbound attacks that get intercepted by the zero-trust shield
  const threatData = useMemo(() => {
    const list = [];
    for (let i = 0; i < threatCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;
      const r = 320;
      const target = new THREE.Vector3(
        r * Math.cos(phi) * Math.cos(theta),
        r * Math.sin(phi) * 0.6,
        r * Math.cos(phi) * Math.sin(theta)
      );
      const origin = target.clone().multiplyScalar(2.2);
      list.push({
        origin,
        target,
        speed: 0.7 + Math.random() * 1.0,
        phase: Math.random() * Math.PI * 2,
        size: 3.5 + Math.random() * 4.0
      });
    }
    return list;
  }, []);

  const shieldUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uBaseColor: { value: new THREE.Color("#0088ff") },
    uPulseColor: { value: new THREE.Color("#00ffff") }
  }), []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // 1. Update shield shader time
    if (shieldShaderRef.current) {
      shieldShaderRef.current.uniforms.uTime.value = t;
    }

    // 2. Quantum Mainframe levitation and core clock pulsation
    if (quantumMainframeRef.current) {
      quantumMainframeRef.current.rotation.y = t * 0.4;
      quantumMainframeRef.current.position.y = Math.sin(t * 1.5) * 8;
    }
    if (innerDieRef.current) {
      innerDieRef.current.rotation.y = -t * 0.8;
      innerDieRef.current.rotation.z = t * 0.5;
      const pulse = 1.0 + Math.sin(t * 5.0) * 0.08;
      innerDieRef.current.scale.set(pulse, pulse, pulse);
    }

    // 3. Global Edge Network Torus orbit
    if (edgeTorusRef.current) {
      edgeTorusRef.current.rotation.y = t * 0.25;
      edgeTorusRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }

    // 4. Photonic Data Packets streaming along sub-10ms global routes
    if (packetsRef.current) {
      for (let i = 0; i < packetCount; i++) {
        const item = packetData[i];
        const currentAngle = item.angle + t * item.speed;
        const x = Math.cos(currentAngle) * item.radius;
        const z = Math.sin(currentAngle) * item.radius;
        const y = item.yOffset + Math.sin(t * 3.0 + i) * 10;

        dummy.position.set(x, y, z);
        dummy.scale.setScalar(item.size);
        dummy.rotation.set(0, -currentAngle, 0);
        dummy.updateMatrix();
        packetsRef.current.setMatrixAt(i, dummy.matrix);
      }
      packetsRef.current.instanceMatrix.needsUpdate = true;
    }

    // 5. Inbound cyber-attacks intercepted by Zero-Trust shield
    if (threatsRef.current) {
      for (let i = 0; i < threatCount; i++) {
        const item = threatData[i];
        const progress = ((t * item.speed + item.phase) % 1.0);
        
        // Threat rushes toward shield (0.0 -> 0.82) then gets vaporized/neutralized (0.82 -> 1.0)
        const isIntercepted = progress > 0.82;
        const currentPos = new THREE.Vector3().lerpVectors(
          item.origin,
          item.target,
          Math.min(progress / 0.82, 1.0)
        );

        dummy.position.copy(currentPos);
        dummy.rotation.set(t * 3 + i, t * 2 + i, 0);

        if (isIntercepted) {
          // Spark vaporization
          const decay = (progress - 0.82) / 0.18;
          const s = item.size * (1.6 - decay * 1.5);
          dummy.scale.set(s, s, s);
        } else {
          dummy.scale.setScalar(item.size);
        }

        dummy.updateMatrix();
        threatsRef.current.setMatrixAt(i, dummy.matrix);
      }
      threatsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  if (!visible) return null;

  // Hexagonal blade server monoliths arranged in an elegant arc
  const serverCount = 8;
  const arcRadius = 400;

  return (
    <group position={position}>
      {/* Deep Cybernetic Lighting */}
      <ambientLight intensity={0.28} color="#020817" />
      <directionalLight position={[0, 850, 300]} intensity={3.5} color="#00e5ff" />
      <directionalLight position={[-700, -200, -300]} intensity={2.0} color="#3b82f6" />
      <directionalLight position={[700, 200, 200]} intensity={1.5} color="#10b981" />
      <pointLight position={[0, 0, -450]} intensity={18} distance={1400} color="#00ffff" />
      <pointLight position={[0, -200, -450]} intensity={10} distance={800} color="#38bdf8" />

      {/* Cybernetic Platform Floor */}
      <mesh position={[0, -240, -450]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3000, 3000, 32, 32]} />
        <meshStandardMaterial 
          color="#020612" 
          roughness={0.25} 
          metalness={0.92} 
        />
      </mesh>

      {/* Laser-etched high-speed bus lines across floor */}
      <mesh position={[0, -239, -450]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[180, 420, 64]} />
        <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Photonic Atmospheric Telemetry Stream */}
      <Sparkles 
        count={850} 
        scale={[1800, 900, 1800]} 
        size={14} 
        speed={1.5} 
        opacity={0.7} 
        color="#00f0ff" 
        position={[0, 0, -450]} 
      />
      <Sparkles 
        count={350} 
        scale={[1200, 600, 1200]} 
        size={18} 
        speed={0.8} 
        opacity={0.65} 
        color="#10b981" 
        position={[0, 0, -450]} 
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. THE AUTONOMOUS AI CTO QUANTUM HYPER-MAINFRAME CORE */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 20, -450]}>
        
        {/* Levitation Mainframe Chassis */}
        <group ref={quantumMainframeRef}>
          {/* Obsidian Supercomputer Die */}
          <mesh>
            <octahedronGeometry args={[65, 0]} />
            <meshStandardMaterial 
              color="#070c18" 
              metalness={0.95} 
              roughness={0.12} 
              emissive="#003366" 
              emissiveIntensity={1.5} 
            />
          </mesh>

          {/* Golden Superconducting Micro-Buses */}
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[75, 12, 75]} />
            <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={1.8} metalness={0.96} roughness={0.1} />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <boxGeometry args={[12, 75, 75]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.8} metalness={0.96} roughness={0.1} />
          </mesh>
        </group>

        {/* Pulsating Internal Neural Singularity */}
        <mesh ref={innerDieRef}>
          <dodecahedronGeometry args={[36, 0]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#00ffff" 
            emissiveIntensity={5.0} 
            roughness={0.05} 
            metalness={0.9} 
          />
        </mesh>
        <pointLight color="#00f0ff" intensity={22} distance={600} />

        {/* Vertical Hyper-Speed Optical Laser Conduit */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[3, 3, 1600, 16]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.65} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[10, 10, 1600, 16]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.18} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* ------------------------------------------------------------- */}
        {/* 2. REACTIVE ZERO-TRUST CYBER-DEFENSE SHIELD DOME */}
        {/* ------------------------------------------------------------- */}
        <mesh>
          <sphereGeometry args={[320, 48, 48]} />
          <shaderMaterial 
            ref={shieldShaderRef}
            vertexShader={shieldVertexShader}
            fragmentShader={shieldFragmentShader}
            uniforms={shieldUniforms}
            transparent={true}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Intercepted Cyber Threats (Neutralized in real-time) */}
        <instancedMesh ref={threatsRef} args={[null, null, threatCount]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#ef4444" 
            emissive="#dc2626" 
            emissiveIntensity={4.0} 
            roughness={0.2} 
          />
        </instancedMesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. GLOBAL EDGE ROUTING TOPOLOGY (SUB-10MS PACKET HIGHWAYS) */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 20, -450]} ref={edgeTorusRef}>
        {/* Orbital Optical Fiber Ring 1 */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[220, 1.8, 16, 100]} />
          <meshStandardMaterial color="#00f0ff" emissive="#0284c7" emissiveIntensity={3.0} />
        </mesh>
        {/* Orbital Optical Fiber Ring 2 */}
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[260, 1.5, 16, 100]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={2.8} />
        </mesh>
        {/* Orbital Optical Fiber Ring 3 */}
        <mesh rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
          <torusGeometry args={[300, 1.2, 16, 100]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* Streaming High-Speed Verified Data Packets */}
      <instancedMesh ref={packetsRef} args={[null, null, packetCount]} position={[0, 20, -450]}>
        <boxGeometry args={[2.5, 1.2, 5]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#00f0ff" 
          emissiveIntensity={4.5} 
        />
      </instancedMesh>

      {/* ------------------------------------------------------------- */}
      {/* 4. ARCHITECTURAL CLUSTER: QUANTUM SERVER BLADE MONOLITHS */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, -130, -450]}>
        {Array.from({ length: serverCount }).map((_, idx) => {
          // Place in a stately rear arc behind the core
          const angle = Math.PI * 0.2 + (idx / (serverCount - 1)) * Math.PI * 0.6;
          const x = Math.cos(angle) * arcRadius;
          const z = -Math.sin(angle) * (arcRadius * 0.85);
          const rotY = -angle + Math.PI / 2;

          return (
            <group key={`rack-${idx}`} position={[x, 0, z]} rotation={[0, rotY, 0]}>
              {/* Obsidian Blade Chassis */}
              <mesh position={[0, 75, 0]}>
                <boxGeometry args={[44, 230, 22]} />
                <meshStandardMaterial 
                  color="#080e1b" 
                  metalness={0.92} 
                  roughness={0.18} 
                />
              </mesh>
              {/* Smoked Quartz Glass Facade */}
              <mesh position={[0, 75, 11.5]}>
                <boxGeometry args={[40, 222, 1.5]} />
                <meshStandardMaterial 
                  color="#021429" 
                  transparent 
                  opacity={0.85} 
                  roughness={0.08} 
                  metalness={0.95} 
                />
              </mesh>
              {/* Telemetry Status Blade Columns (Uptime & Active Routing) */}
              {[-80, -45, -10, 25, 60, 95, 130].map((yOffset, bIdx) => (
                <group key={`blade-${bIdx}`} position={[0, yOffset, 12]}>
                  {/* Verified Healthy Status Node */}
                  <mesh position={[-12, 0, 0]}>
                    <planeGeometry args={[8, 2.5]} />
                    <meshBasicMaterial color="#10b981" />
                  </mesh>
                  {/* Optical Traffic Channel */}
                  <mesh position={[4, 0, 0]}>
                    <planeGeometry args={[18, 2.5]} />
                    <meshBasicMaterial color={idx % 2 === 0 ? "#00f0ff" : "#38bdf8"} />
                  </mesh>
                </group>
              ))}

              {/* High-Bandwidth Underfloor Bus to Central Core */}
              <mesh position={[0, -2, arcRadius * 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1.5, 1.5, arcRadius * 0.8, 8]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} />
              </mesh>
            </group>
          );
        })}
      </group>

    </group>
  );
}
