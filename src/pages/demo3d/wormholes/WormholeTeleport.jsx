import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const teleportVertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const teleportFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vPos;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // Hyper-velocity axial streaming along length of tunnel
    float speed = 28.0;
    float stream = uv.y * 120.0 - (uTime * speed);
    
    // Circumferential warp vortex bands
    float angleBands = sin(uv.x * 60.0 + sin(uv.y * 8.0 + uTime * 6.0));
    float streaks = sin(stream + angleBands * 3.0);
    streaks = smoothstep(0.45, 0.98, streaks);

    // Hyper-speed particles / light needles
    float needleId = floor(uv.x * 40.0);
    float needleSpeed = (random(vec2(needleId, 1.0)) * 0.5 + 0.75) * 35.0;
    float needleStream = fract(uv.y * 30.0 - uTime * needleSpeed);
    float needle = smoothstep(0.85, 0.99, needleStream) * step(0.65, random(vec2(needleId, floor(uv.y * 30.0 - uTime * needleSpeed))));

    // Edge falloff at cylinder mouth & exit
    float edgeFade = smoothstep(0.0, 0.18, uv.y) * smoothstep(1.0, 0.82, uv.y);

    // Dynamic color composition: deep space dark void + electric world primary color + white hot core highlights
    vec3 baseCore = mix(uColor, vec3(1.0, 1.0, 1.0), streaks * 0.65 + needle * 0.85);
    vec3 finalColor = baseCore * (streaks * 1.6 + needle * 2.2 + 0.12);

    float alpha = clamp((streaks * 0.75 + needle * 0.85 + 0.15) * edgeFade * uOpacity, 0.0, 1.0);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function WormholeTeleport() {
  const meshRef = useRef();
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#00e5ff') },
    uOpacity: { value: 0.0 }
  }), []);

  useFrame((state) => {
    const warp = window._teleportWarp;
    if (!warp || !warp.active || warp.opacity <= 0.001) {
      if (meshRef.current) meshRef.current.visible = false;
      return;
    }

    if (meshRef.current) {
      meshRef.current.visible = true;
      // Lock position & orientation exactly to camera so tunnel envelops the viewer in 3D
      meshRef.current.position.copy(state.camera.position);
      meshRef.current.quaternion.copy(state.camera.quaternion);
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uOpacity.value = warp.opacity;
      if (warp.color) {
        materialRef.current.uniforms.uColor.value.set(warp.color);
      }
    }
  });

  return (
    <group ref={meshRef} visible={false}>
      {/* Aligned along Z-axis (forward/backward) so camera looks straight down the conduit */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[160, 160, 3600, 36, 1, true]} />
        <shaderMaterial
          ref={materialRef}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          uniforms={uniforms}
          vertexShader={teleportVertexShader}
          fragmentShader={teleportFragmentShader}
        />
      </mesh>
    </group>
  );
}
