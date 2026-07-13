import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const soundwaveVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const soundwaveFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  
  // pseudo-random
  float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    // Warp speed streaks
    // vUv.y is the depth. vUv.x is the circumference.
    
    // Quantize the angle to create distinct streaks
    float numStreaks = 200.0;
    float streakId = floor(vUv.x * numStreaks);
    
    // Each streak has a random offset and speed
    float offset = rand(vec2(streakId, 1.0)) * 100.0;
    float speed = 20.0 + rand(vec2(streakId, 2.0)) * 30.0; // very fast
    
    // moving along Y (adding uTime * speed makes them fly UP past the falling camera)
    float y = fract(vUv.y * 5.0 + uTime * speed + offset);
    
    // Streak shape: bright head, trailing tail
    float streakIntensity = smoothstep(0.8, 1.0, y) * smoothstep(1.0, 0.99, y);
    
    // Randomize length and visibility
    float visibility = step(0.5, rand(vec2(streakId, 3.0)));
    streakIntensity *= visibility;
    
    // Tunnel glow
    vec3 baseColor = vec3(0.05, 0.1, 0.2); // dark space blue
    vec3 streakColor = mix(vec3(0.3, 0.7, 1.0), vec3(1.0, 1.0, 1.0), streakIntensity);
    
    // Combine
    vec3 finalColor = baseColor + streakColor * streakIntensity * 3.0;
    
    // Fade out edges
    float alpha = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    
    // Add central bright glow (towards the end of the tunnel)
    float centerGlow = smoothstep(0.5, 1.0, vUv.y);
    finalColor += vec3(0.5, 0.8, 1.0) * centerGlow * 1.5;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const WormholeSoundwaves = ({ startZ, endZ, visible }) => {
  const materialRef = useRef();
  
  const length = 8000;
  const centerY = -4000;
  const fixedZ = -3500; // Directly below MindWave

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    if (materialRef.current && visible) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, centerY, fixedZ]} rotation={[0, 0, 0]} visible={visible}>
      {/* radiusTop = 800 (MindWave sinkhole), radiusBottom = 100 (Interstellar entry) */}
      <cylinderGeometry args={[800, 100, length, 64, 64, true]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={soundwaveVertexShader}
        fragmentShader={soundwaveFragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

export default WormholeSoundwaves;
