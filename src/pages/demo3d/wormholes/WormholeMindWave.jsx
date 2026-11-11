import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const mindwaveVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const mindwaveFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  
  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    // Binaural Theta brainwave frequency streaks
    float numStreaks = 180.0;
    float streakId = floor(vUv.x * numStreaks);
    
    float offset = rand(vec2(streakId, 1.0)) * 50.0;
    float speed = 20.0 + rand(vec2(streakId, 2.0)) * 25.0;
    
    // Wave oscillation mimicking EEG brainwaves
    float waveOsc = sin(vUv.x * 24.0 + uTime * 4.0) * 0.05;
    float y = fract((vUv.y + waveOsc) * 5.0 + uTime * speed + offset);
    float streakIntensity = smoothstep(0.82, 1.0, y) * smoothstep(1.0, 0.96, y);
    
    float visibility = step(0.35, rand(vec2(streakId, 3.0)));
    streakIntensity *= visibility;
    
    // MindWave signature palette: Theta Violet, Binaural Cyan, and Sound-Healing Magenta
    vec3 deepTheta = vec3(0.04, 0.01, 0.12);
    vec3 cyanPulse = vec3(0.0, 0.94, 1.0);       // #00f0ff
    vec3 magentaPulse = vec3(0.95, 0.15, 0.85);  // #f426d9
    vec3 violetGlow = vec3(0.65, 0.25, 1.0);     // #a855f7
    
    vec3 streakColor = mix(cyanPulse, magentaPulse, sin(uTime * 2.0 + vUv.x * 6.28) * 0.5 + 0.5);
    streakColor = mix(streakColor, violetGlow, cos(vUv.y * 12.0) * 0.5 + 0.5);
    
    vec3 finalColor = deepTheta + streakColor * streakIntensity * 3.5;
    
    // Smooth fade at tunnel openings
    float alpha = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y) * (streakIntensity * 0.85 + 0.25);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const WormholeMindWave = ({
  position = [0, 0, -375],
  rotation = [Math.PI / 2, 0, 0],
  length = 1100,
  radius = 230,
  visible = true
}) => {
  const materialRef = useRef();
  const ringsRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y = t * 0.6;
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Outer Brainwave Frequency Conduit */}
      <mesh>
        <cylinderGeometry args={[radius, radius, length, 48, 1, true]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={mindwaveVertexShader}
          fragmentShader={mindwaveFragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Internal Concentric Neural Frequency Rings */}
      <mesh ref={ringsRef}>
        <cylinderGeometry args={[radius - 12, radius - 12, length, 16, 24, true]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default WormholeMindWave;
