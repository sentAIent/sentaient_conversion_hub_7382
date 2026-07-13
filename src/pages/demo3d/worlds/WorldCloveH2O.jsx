import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const Waterfall = ({ position }) => {
  const shaderRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#00ffff") }
  }), []);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={position}>
      <cylinderGeometry args={[400, 400, 4000, 64, 1, true, Math.PI, Math.PI]} />
      <shaderMaterial
        ref={shaderRef}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor;
          varying vec2 vUv;
          
          float rand(vec2 co){
              return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
          }
          
          void main() {
            // Divide into vertical strips
            float stripX = floor(vUv.x * 80.0);
            
            // Each strip has a slightly different offset and speed
            float stripOffset = rand(vec2(stripX, 0.0)) * 100.0;
            float stripSpeed = 3.0 + rand(vec2(stripX, 1.0)) * 2.0;
            
            // Flow DOWN: vUv.y * freq + uTime * speed
            float yPos = vUv.y * 30.0 + (uTime * stripSpeed);
            
            // Create the falling water streaks
            float streak = sin(yPos + stripOffset);
            streak = smoothstep(0.5, 1.0, streak);
            
            // Fade out the edges horizontally
            float edgeFade = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
            
            // Fade out at the bottom where it hits the ocean
            float bottomFade = smoothstep(0.0, 0.2, vUv.y);
            
            float alpha = streak * edgeFade * bottomFade * 0.9;
            
            // Add a bright highlight to the core of the streaks
            vec3 finalColor = mix(uColor, vec3(1.0, 1.0, 1.0), streak * 0.5);
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `}
      />
    </mesh>
  );
};

const OceanPlane = () => {
  const shaderRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#0044ff") },
    uHighlight: { value: new THREE.Color("#00ffff") }
  }), []);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, -200, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8000, 8000, 128, 128]} />
      <shaderMaterial
        ref={shaderRef}
        transparent
        wireframe={true}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Gentle ocean rolling waves
            float elevation = sin(pos.x * 0.005 + uTime * 0.5) * 50.0 
                            + sin(pos.y * 0.005 + uTime * 0.3) * 50.0;
                            
            // Massive ripple around the waterfall impact zone (assumed at 0,0)
            float dist = length(pos.xy);
            float ripple = sin(dist * 0.02 - uTime * 5.0) * 40.0;
            float rippleFade = smoothstep(1500.0, 200.0, dist); // Only near center
            
            pos.z += elevation + (ripple * rippleFade);
            vElevation = pos.z;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform vec3 uHighlight;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = smoothstep(-50.0, 50.0, vElevation);
            vec3 color = mix(uColor, uHighlight, mixFactor);
            
            float dist = length(vUv - 0.5);
            float fade = smoothstep(0.5, 0.2, dist);
            
            gl_FragColor = vec4(color, fade * 0.6);
          }
        `}
      />
    </mesh>
  );
};

const WorldCloveH2O = ({ position, rotation, visible }) => {
  const [logoTexture, setLogoTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/cloveh2o_logo.png', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      setLogoTexture(texture);
    });
  }, []);

  

  return (
    <group visible={visible} position={position} rotation={rotation}>
      {/* Deep blue sky/background */}
      <mesh>
        <sphereGeometry args={[4000, 32, 32]} />
        <meshBasicMaterial color="#000511" side={THREE.BackSide} />
      </mesh>

      <OceanPlane />
      
      {/* Massive Waterfall crashing into the ocean directly behind the text */}
      <Waterfall position={[0, 1800, -800]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} color="#00aaff" />
      <pointLight color="#00ffff" intensity={4} distance={3000} position={[0, 500, -500]} />

      {/* UI Elements */}
      <group position={[0, 0, -300]}>
        {logoTexture && (
          <mesh position={[0, 80, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshBasicMaterial map={logoTexture} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        )}
        
        <Text
          position={[0, -50, 0]}
          fontSize={60}
          color="#ffffff"
          outlineWidth={0.02}
          outlineColor="#0044ff"
          anchorX="center"
          anchorY="middle"
        >
          CLOVEH2O
        </Text>
        
        <Text
          position={[0, -110, 0]}
          fontSize={24}
          color="#ffffff"
          outlineWidth={0.01}
          outlineColor="#001133"
          anchorX="center"
          anchorY="middle"
          maxWidth={800}
          textAlign="center"
          lineHeight={1.5}
        >
          An ocean of pure, refreshing data. Clean, sustainable, and transparent analytics.
        </Text>
      </group>
    </group>
  );
};

export default WorldCloveH2O;
