import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text } from '@react-three/drei';
import * as THREE from 'three';
import DigitalFire from './icebreaker/DigitalFire';
import IcebreakerSilhouettes from './icebreaker/IcebreakerSilhouettes';

const HolographicLogo = ({ position }) => {
  const meshRef = useRef();
  const [logoTex, setLogoTex] = useState(null);
  const scroll = useScroll();

  useEffect(() => {
    new THREE.TextureLoader().load('/icebreaker_logo.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setLogoTex(tex);
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 5.0;
      
      if (meshRef.current.material) {
        const globalProgress = scroll.offset;
        const localProgress = THREE.MathUtils.clamp((globalProgress - 0.20) / 0.08, 0, 1);
        const thawFactor = THREE.MathUtils.smoothstep(localProgress, 0.2, 0.8);
        meshRef.current.material.opacity = thawFactor * 0.9;
        meshRef.current.scale.setScalar(0.01 + thawFactor); 
      }
    }
  });

  if (!logoTex) return null;

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[40, 40]} />
      <meshBasicMaterial map={logoTex} transparent={true} opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
    </mesh>
  );
};

const ProceduralPalmTrees = ({ numTrees = 30, radius = 50, centerZ = -500 }) => {
  const trunkRef = useRef();
  const leafRef = useRef();
  const scroll = useScroll();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const treeData = useMemo(() => {
    const data = [];
    for (let i = 0; i < numTrees; i++) {
      const angle = (i / numTrees) * Math.PI * 2 + (Math.random() * 0.5);
      const r = radius + Math.random() * 20;
      data.push({
        position: new THREE.Vector3(Math.cos(angle) * r, -18, Math.sin(angle) * r + centerZ),
        rotation: new THREE.Euler(0, angle + Math.PI/2, Math.random() * 0.2),
        scale: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 0.5
      });
    }
    return data;
  }, [numTrees, radius, centerZ]);

  useFrame(() => {
    if (!trunkRef.current || !leafRef.current) return;
    
    const globalProgress = scroll.offset;
    const localProgress = THREE.MathUtils.clamp((globalProgress - 0.20) / 0.08, 0, 1);
    const thawFactor = THREE.MathUtils.smoothstep(localProgress, 0.2, 0.8);
    
    for (let i = 0; i < numTrees; i++) {
      const tree = treeData[i];
      const growFactor = Math.max(0, (thawFactor - tree.delay) * 2.0);
      const scale = THREE.MathUtils.clamp(growFactor, 0, 1) * tree.scale;
      
      dummy.position.copy(tree.position);
      dummy.rotation.copy(tree.rotation);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      
      trunkRef.current.setMatrixAt(i, dummy.matrix);
      
      // Leaves are higher up on the trunk
      dummy.position.y += 18 * scale; 
      dummy.updateMatrix();
      leafRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    trunkRef.current.instanceMatrix.needsUpdate = true;
    leafRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={trunkRef} args={[null, null, numTrees]}>
        <cylinderGeometry args={[0.5, 1.0, 20, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={leafRef} args={[null, null, numTrees]}>
        <sphereGeometry args={[8, 4, 4]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </instancedMesh>
    </group>
  );
};

const gridVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gridFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uThawProgress;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    float n = snoise(vUv * 20.0 + uTime * 0.1) * 0.5 + 0.5;
    float n2 = snoise(vUv * 50.0 - uTime * 0.2) * 0.5 + 0.5;
    
    // Plato's Cave (Frozen) Colors
    vec3 caveDark = vec3(0.02, 0.05, 0.1);
    vec3 iceGlow = vec3(0.4, 0.8, 1.0);
    vec3 caveColor = mix(caveDark, iceGlow, n * 0.3);
    
    // Tropical Island (Thawed) Colors
    vec3 sandColor = vec3(0.9, 0.8, 0.6);
    vec3 waterColor = vec3(0.1, 0.6, 0.8);
    vec3 tropicalColor = mix(sandColor, waterColor, n2 * step(0.3, vUv.y)); // Higher up = water/sky
    
    vec3 finalColor = mix(caveColor, tropicalColor, uThawProgress);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const AbstractCavern = ({ startZ, endZ }) => {
  const [cavernTex, setCavernTex] = useState(null);
  
  const length = Math.abs(endZ - startZ);
  const centerZ = (startZ + endZ) / 2;

  useEffect(() => {
    new THREE.TextureLoader().load('/assets/images/ice_cavern.jpg', (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 2);
      tex.colorSpace = THREE.SRGBColorSpace;
      setCavernTex(tex);
    });
  }, []);

  if (!cavernTex) return null;

  return (
    <mesh position={[0, 0, centerZ]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[120, 120, length, 64, 64, true]} />
      <meshBasicMaterial
        map={cavernTex}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

const WorldIcebreaker = ({ position, rotation, visible = true }) => {
  const startZ = 1000;
  const endZ = -1000;
  const centerZ = (startZ + endZ) / 2;

  return (
    <group position={position} rotation={rotation} visible={visible}>
      <AbstractCavern startZ={startZ} endZ={endZ} />
      
      {/* Ice Cavern Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, 0]}>
        <planeGeometry args={[1000, 3000]} />
        <meshStandardMaterial color="#001133" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Text Details */}
      <Text 
        position={[0, 60, centerZ - 500]} 
        fontSize={25} 
        color="#ffffff" 
        outlineWidth={0.05} 
        outlineColor="#00ffff" 
      >
        ICEBREAKER
      </Text>
      <Text 
        position={[0, 30, centerZ - 500]} 
        fontSize={10} 
        color="#00ffff" 
      >
        THE REAL-WORLD SOCIAL PROTOCOL
      </Text>

      {/* Central Holographic Fire / Nexus */}
      <DigitalFire position={[0, -20, centerZ]} />
      
      {/* Holographic Logo Centerpiece */}
      <HolographicLogo position={[0, 10, centerZ]} />
      
      {/* Procedural Tropical Foliage */}
      <ProceduralPalmTrees radius={60} centerZ={centerZ} />
      
      {/* The People */}
      <IcebreakerSilhouettes position={[0, -20, centerZ]} />
    </group>
  );
};

export default WorldIcebreaker;