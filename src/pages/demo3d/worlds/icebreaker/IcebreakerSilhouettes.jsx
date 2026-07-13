import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Billboard } from '@react-three/drei';
import * as THREE from 'three';

const silhouetteVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const silhouetteFragmentShader = `
  varying vec2 vUv;
  uniform float uState; // 0.0 = isolated, 1.0 = party
  uniform vec3 uIsolatedColor;
  uniform vec3 uPartyColor;
  uniform float uTime;
  uniform float uSeed;

  // Signed distance to a capsule (line segment with radius)
  float sdCapsule(vec2 p, vec2 a, vec2 b, float r) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h ) - r;
  }
  
  // Signed distance to a circle
  float sdCircle(vec2 p, vec2 c, float r) {
    return length(p - c) - r;
  }

  void main() {
    vec2 uv = vUv;
    
    // Base animation speeds
    float t = uTime * 2.0 + uSeed * 10.0;
    
    // --- Body Parts ---
    // Head
    vec2 headPos = vec2(0.5, 0.85);
    
    // Spine
    vec2 spineTop = vec2(0.5, 0.7);
    vec2 spineBot = vec2(0.5, 0.4);
    
    // Arms (Dynamic based on state)
    // Isolated: Arms down, close to body
    vec2 armL_Iso = vec2(0.4, 0.45);
    vec2 armR_Iso = vec2(0.6, 0.45);
    
    // Party: Arms waving up in the air
    float waveL = sin(t * 3.0) * 0.1;
    float waveR = cos(t * 3.1) * 0.1;
    vec2 armL_Party = vec2(0.2, 0.8 + waveL);
    vec2 armR_Party = vec2(0.8, 0.8 + waveR);
    
    // Interpolate arm targets based on uState
    vec2 armL_Target = mix(armL_Iso, armL_Party, uState);
    vec2 armR_Target = mix(armR_Iso, armR_Party, uState);
    
    // Legs
    // Isolated: Standing still
    vec2 legL_Iso = vec2(0.45, 0.05);
    vec2 legR_Iso = vec2(0.55, 0.05);
    
    // Party: Dancing/jumping
    float jumpL = max(0.0, sin(t * 4.0)) * 0.1;
    float jumpR = max(0.0, cos(t * 4.0)) * 0.1;
    vec2 legL_Party = vec2(0.35, 0.1 + jumpL);
    vec2 legR_Party = vec2(0.65, 0.1 + jumpR);
    
    vec2 legL_Target = mix(legL_Iso, legL_Party, uState);
    vec2 legR_Target = mix(legR_Iso, legR_Party, uState);
    
    // Calculate distances
    float dHead = sdCircle(uv, headPos, 0.08);
    float dSpine = sdCapsule(uv, spineTop, spineBot, 0.07);
    float dArmL = sdCapsule(uv, spineTop, armL_Target, 0.04);
    float dArmR = sdCapsule(uv, spineTop, armR_Target, 0.04);
    float dLegL = sdCapsule(uv, spineBot, legL_Target, 0.05);
    float dLegR = sdCapsule(uv, spineBot, legR_Target, 0.05);
    
    // Union all parts
    float d = min(dHead, min(dSpine, min(dArmL, min(dArmR, min(dLegL, dLegR)))));
    
    // Anti-aliased alpha
    float alpha = smoothstep(0.01, -0.01, d);
    
    if (alpha <= 0.0) discard;
    
    // Color transition
    vec3 finalColor = mix(uIsolatedColor, uPartyColor, uState);
    
    // Add subtle hologram glow
    float glow = 0.8 + 0.2 * sin(t * 5.0);
    
    gl_FragColor = vec4(finalColor * glow, alpha);
  }
`;

const PersonProcedural = ({ position, angle, delay }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const scroll = useScroll();
  
  const uniforms = useMemo(() => ({
    uState: { value: 0.0 },
    uTime: { value: 0.0 },
    uSeed: { value: Math.random() },
    uIsolatedColor: { value: new THREE.Color('#44aaff') },
    uPartyColor: { value: new THREE.Color('#ff8844') }
  }), []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    uniforms.uTime.value = state.clock.elapsedTime;
    
    const globalProgress = scroll.offset;
    const localProgress = THREE.MathUtils.clamp((globalProgress - 0.20) / 0.08, 0, 1);
    const thawFactor = THREE.MathUtils.smoothstep(localProgress, 0.2, 0.8);
    
    const t = THREE.MathUtils.clamp((thawFactor - delay) * 2.0, 0, 1);
    uniforms.uState.value = t; // 0 = isolated, 1 = party
    
    // Jump towards fire
    const jump = Math.sin(state.clock.elapsedTime * 8 + delay * 10) * t;
    meshRef.current.position.y = position[1] + (jump > 0 ? jump * 2 : 0) + 15;
    
    // Move towards center (0, 0, centerZ)
    if (t > 0) {
       // Manually calculate direction to avoid object allocation in useFrame
        const targetX = 400;
        const targetZ = -200;
        const dx = targetX - position[0];
        const dz = targetZ - position[2];
        const len = Math.sqrt(dx * dx + dz * dz) || 1;
       meshRef.current.position.x = position[0] + (dx / len) * (t * 15);
       meshRef.current.position.z = position[2] + (dz / len) * (t * 15);
    } else {
       meshRef.current.position.x = position[0];
       meshRef.current.position.z = position[2];
    }
  });

  return (
    <group ref={meshRef} position={[position[0], position[1] + 15, position[2]]}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <mesh>
          <planeGeometry args={[20, 30]} />
          <shaderMaterial 
            ref={materialRef}
            vertexShader={silhouetteVertexShader}
            fragmentShader={silhouetteFragmentShader}
            uniforms={uniforms}
            transparent={true}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
};

const IcebreakerSilhouettes = ({ position }) => {
  const numPeople = 12;

  const peopleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < numPeople; i++) {
      const angle = (i / numPeople) * Math.PI * 2;
      const r = 25 + Math.random() * 10;
      data.push({
        position: [
          position[0] + Math.cos(angle) * r,
          position[1], 
          position[2] + Math.sin(angle) * r
        ],
        angle: angle,
        delay: Math.random() * 0.5
      });
    }
    return data;
  }, [numPeople, position]);

  return (
    <group>
      {peopleData.map((data, i) => (
        <PersonProcedural 
          key={i} 
          {...data} 
        />
      ))}
    </group>
  );
};

export default IcebreakerSilhouettes;
