import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
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
  
  float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    float numStreaks = 220.0;
    float streakId = floor(vUv.x * numStreaks);
    
    float offset = rand(vec2(streakId, 1.0)) * 100.0;
    float speed = 25.0 + rand(vec2(streakId, 2.0)) * 35.0;
    
    float y = fract(vUv.y * 6.0 + uTime * speed + offset);
    float streakIntensity = smoothstep(0.78, 1.0, y) * smoothstep(1.0, 0.98, y);
    
    float visibility = step(0.45, rand(vec2(streakId, 3.0)));
    streakIntensity *= visibility;
    
    vec3 baseColor = vec3(0.04, 0.08, 0.22); // Deep audio void
    vec3 streakColor = mix(vec3(0.2, 0.85, 1.0), vec3(1.0, 0.3, 0.9), sin(uTime + vUv.x * 6.28) * 0.5 + 0.5);
    
    vec3 finalColor = baseColor + streakColor * streakIntensity * 4.0;
    
    float alpha = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y) * (streakIntensity * 0.8 + 0.2);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const WormholeSoundwaves = ({
  position = [0, -4000, -5000],
  rotation = [Math.PI / 2, 0, 0],
  length = 3200,
  radius = 220,
  visible = true
}) => {
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    if (materialRef.current && visible) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh position={position} rotation={rotation} visible={visible}>
      <cylinderGeometry args={[radius, radius, length, 48, 1, true]} />
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
