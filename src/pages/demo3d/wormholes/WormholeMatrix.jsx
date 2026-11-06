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
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    
    // Create active rotational swirl around the wormhole cylinder circumference
    float rotOffset = uTime * 0.06;
    float columns = 54.0;
    vec2 gridId = vec2(floor((uv.x + rotOffset) * columns), uv.y);
    
    // Vary falling stream speed per column
    float speed = random(vec2(gridId.x, 0.0)) * 0.45 + 0.25;
    float offset = uTime * speed;
    
    // Add cascading grid lines
    float yPos = fract(uv.y * 18.0 + offset);
    float glow = smoothstep(0.12, 0.88, yPos);
    
    // Abstract characters logic (dots/dashes/energy packets)
    float char = step(0.48, random(floor(vec2(uv.x + rotOffset, uv.y) * vec2(columns, 18.0) + vec2(0.0, offset))));
    
    // Saturated SentAIent electric blue, laser cyan, and deep space sapphire
    vec3 electricBlue = vec3(0.06, 0.58, 1.0);    // #0f94ff
    vec3 vividCyan = vec3(0.15, 0.92, 1.0);       // #26ebff
    vec3 royalSapphire = vec3(0.015, 0.10, 0.45); // Deep pure sapphire backing

    vec3 streamColor = mix(electricBlue, vividCyan, char * 0.60);
    vec3 color = streamColor * glow * char * 2.2;
    
    // Deep saturated edge glow with clamped math (100% safe from macOS GPU driver NaN resets)
    float edgeDist = clamp(1.0 - abs(uv.x - 0.5) * 2.0, 0.0, 1.0);
    float edgeGlow = edgeDist * edgeDist * 0.40;
    color += royalSapphire * edgeGlow * (glow * 0.7 + 0.3);

    gl_FragColor = vec4(color, uOpacity);
  }
`;

const WormholeMatrix = ({ startZ = 20, endZ = -1200, visible = true }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uOpacity: { value: 1.0 }
  }), []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.elapsedTime;

    // Continuous 3D vortex rotation around the central axis
    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.08;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
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
        Math.sin(i * 0.08) * 12.0, 
        Math.cos(i * 0.05) * 12.0, 
        z
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [startZ, endZ]);

  return (
    <mesh ref={meshRef} visible={visible}>
      {/* Expansive 480-unit radius tunnel creating an immersive spinning cosmic vortex behind the logos */}
      <tubeGeometry args={[path, 160, 480, 36, false]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={matrixVertexShader}
        fragmentShader={matrixFragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default WormholeMatrix;
