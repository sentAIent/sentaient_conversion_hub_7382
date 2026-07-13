import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const matrixVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const matrixFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    
    // Create falling columns
    float columns = 60.0;
    vec2 gridId = vec2(floor(uv.x * columns), uv.y);
    
    // Vary falling speed per column
    float speed = random(vec2(gridId.x, 0.0)) * 0.5 + 0.2;
    float offset = uTime * speed;
    
    // Add grid lines
    float yPos = fract(uv.y * 20.0 + offset);
    float glow = smoothstep(0.1, 0.9, yPos);
    
    // Abstract characters logic (dots/dashes)
    float char = step(0.5, random(floor(uv * vec2(columns, 20.0) + vec2(0.0, offset))));
    
    vec3 color = vec3(0.0, 1.0, 0.2) * glow * char;
    
    // Base glass reflection
    float glass = pow(1.0 - abs(uv.x - 0.5) * 2.0, 3.0) * 0.3;
    color += vec3(0.0, 0.2, 0.0) * glass;

    gl_FragColor = vec4(color, uOpacity);
  }
`;

const WormholeMatrix = ({ startZ = 10, endZ = -500, visible = true }) => {
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uOpacity: { value: 1.0 }
  }), []);

  useFrame((state) => {
    if (materialRef.current && visible) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth fade in/out based on visibility
      materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uOpacity.value,
        visible ? 1.0 : 0.0,
        0.05
      );
    }
  });

  const path = useMemo(() => {
    const points = [];
    const segments = 100;
    const length = startZ - endZ;
    for (let i = 0; i <= segments; i++) {
      const z = startZ - (i / segments) * length;
      points.push(new THREE.Vector3(
        Math.sin(i * 0.1) * 2.0, 
        Math.cos(i * 0.05) * 2.0, 
        z
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [startZ, endZ]);

  return (
    <mesh visible={visible}>
      <tubeGeometry args={[path, 200, 15, 32, false]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={matrixVertexShader}
        fragmentShader={matrixFragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default WormholeMatrix;
