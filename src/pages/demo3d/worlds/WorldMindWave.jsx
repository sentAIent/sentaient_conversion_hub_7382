import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text } from '@react-three/drei';
import * as THREE from 'three';

// Cymatic water shader
const waterVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScrollProgress; // 0 to 1 based on how close to center we are
  
  void main() {
    vUv = uv;
    
    // Distance from center of the plane
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Create cymatic standing waves that intensify as user approaches center
    float wave1 = sin(dist * 100.0 - uTime * 2.0) * 0.5;
    float wave2 = sin(dist * 50.0 + uTime * 4.0) * 0.5;
    float angular = sin(atan(vUv.y - 0.5, vUv.x - 0.5) * 8.0 + uTime);
    
    // Combine waves for a geometric mandala-like ripple
    float elevation = (wave1 + wave2) * angular * uScrollProgress;
    
    vec3 pos = position;
    pos.z += elevation * 15.0; // Z is up because plane is rotated
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const waterFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScrollProgress;
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Colors
    vec3 baseColor = vec3(0.125, 0.153, 0.2); // #202733
    vec3 highlightColor = vec3(0.376, 0.663, 1.0); // #60a9ff
    
    // Rings
    float rings = sin(dist * 100.0 - uTime * 2.0);
    float angular = sin(atan(vUv.y - 0.5, vUv.x - 0.5) * 8.0 + uTime);
    
    float intensity = max(0.0, rings * angular) * uScrollProgress;
    
    // Sinkhole at the center
    // vPosition.xy gives us local plane coordinates
    float distFromCenter = length(vPosition.xy);
    
    if (distFromCenter < 80.0) {
      discard; // The physical hole
    }
    
    // Fade out edges into the hole
    float holeAlpha = smoothstep(80.0, 180.0, distFromCenter);
    
    vec3 color = mix(baseColor, highlightColor, intensity);
    
    // Add a glowing rim around the sinkhole
    float rimGlow = smoothstep(150.0, 80.0, distFromCenter);
    color += highlightColor * rimGlow * 1.5;
    
    gl_FragColor = vec4(color, holeAlpha);
  }
`;

const skyFragmentShader = `
  varying vec2 vUv;
  void main() {
    vec3 topColor = vec3(0.1, 0.3, 0.5); // Brighter vibrant blue instead of dark black/blue
    vec3 bottomColor = vec3(0.376, 0.663, 1.0); // Bright MindWave blue horizon
    
    // Gradient sky
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const HologramText = ({ position, visible }) => {
  
  
  return (
    <group visible={visible} position={position}>
      <Text
        position={[0, 40, 0]}
        fontSize={24}
        color="#051024"
        outlineWidth={0.02}
        outlineColor="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        MINDWAVE
      </Text>
      <Text
        position={[0, 20, 0]}
        fontSize={8}
        color="#051024"
        outlineWidth={0.02}
        outlineColor="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Intelligent Health & Wellness
      </Text>
      <Text
        position={[0, 8, 0]}
        fontSize={6}
        color="#0a1930"
        outlineWidth={0.01}
        outlineColor="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Tune your frequency.
      </Text>
    </group>
  );
};

const WorldMindWave = ({ position, visible }) => {
  const scroll = useScroll();
  const waterMaterialRef = useRef();
  const logoRef = useRef();
  const sunRef = useRef();
  const [logoTex, setLogoTex] = useState(null);
  const [sunTex, setSunTex] = useState(null);
  
  useEffect(() => {
    new THREE.TextureLoader().load('/mindwave-logo.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setLogoTex(tex);
    });
    new THREE.TextureLoader().load('/tribal-sun.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setSunTex(tex);
    });
  }, []);
  
  // Extract Z from position prop
  const centerZ = position ? position[2] : 0;

  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 }
  }), []);

  useFrame((state) => {
    if (!visible) return;
    
    const time = state.clock.elapsedTime;
    
    // Update shader time
    if (waterMaterialRef.current) {
      waterMaterialRef.current.uniforms.uTime.value = time;
      
      // Calculate how close the camera is to the centerZ
      // Camera is roughly at state.camera.position.z
      const distToCenter = Math.abs(state.camera.position.z - centerZ);
      const maxDist = 1000;
      // 1 at center, 0 at edges
      let intensity = 1.0 - Math.min(distToCenter / maxDist, 1.0);
      // Smooth it
      intensity = Math.pow(intensity, 2.0);
      
      waterMaterialRef.current.uniforms.uScrollProgress.value = intensity;
    }
    
    // Float and pulse logo
    if (logoRef.current) {
      logoRef.current.position.y = 25 + Math.sin(time * 2) * 2;
      const scale = 1.0 + Math.sin(time * 4) * 0.05;
      logoRef.current.scale.set(scale, scale, 1);
      logoRef.current.rotation.y = 0; // Keep facing camera
    }
    
    if (sunRef.current) {
      sunRef.current.position.y = 25 + Math.sin(time * 2) * 2;
      sunRef.current.rotation.z = time * 0.1;
      const sunScale = 1.0 + Math.sin(time * 3) * 0.05;
      sunRef.current.scale.set(sunScale, sunScale, 1);
    }
  });

  

  return (
    <group visible={visible} position={position}>
      {/* Sky / Horizon Dome */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[800, 800, 4000, 64, 1, true]} />
        <shaderMaterial
          vertexShader="varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
          fragmentShader={skyFragmentShader}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Cymatic Lake Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -50, 0]}>
        <planeGeometry args={[2000, 4000, 128, 128]} />
        <shaderMaterial
          ref={waterMaterialRef}
          vertexShader={waterVertexShader}
          fragmentShader={waterFragmentShader}
          uniforms={uniforms}
          transparent={true}
          side={THREE.DoubleSide}
          wireframe={false}
        />
      </mesh>
      
      {/* Tribal Sun glowing behind logo */}
      {sunTex && (
        <mesh ref={sunRef} position={[0, -10, -85]}>
          <planeGeometry args={[140, 140]} />
          <meshBasicMaterial 
            map={sunTex} 
            transparent={true} 
            side={THREE.DoubleSide} 
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#00ffff"
            opacity={0.6}
          />
        </mesh>
      )}

      {/* MindWave Logo (Floating above center) */}
      {logoTex && (
        <mesh ref={logoRef} position={[0, -10, -80]}>
          <planeGeometry args={[80, 80]} />
          <meshBasicMaterial 
            map={logoTex} 
            transparent={true} 
            side={THREE.DoubleSide} 
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
      
      {/* Hologram Description */}
      <HologramText position={[0, -25, -80]} visible={true} />
    </group>
  );
};

export default WorldMindWave;
