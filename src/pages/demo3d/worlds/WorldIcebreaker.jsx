import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text, Sky } from '@react-three/drei';
import * as THREE from 'three';
import DigitalFire from './icebreaker/DigitalFire';
import IcebreakerSilhouettes from './icebreaker/IcebreakerSilhouettes';
import HologramGuide from '../components/HologramGuide';

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
        const thawFactor = window.icebreakerThaw || 0;
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
    
    const thawFactor = window.icebreakerThaw || 0;
    
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

const meltVertexShader = `
  uniform float uThaw;
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Dali melt effect:
    // Cylinder local Z corresponds to World Y (because of Math.PI/2 X-rotation).
    // We want it to sag downwards (negative local Z).
    
    float angle = atan(pos.y, pos.x);
    // Add organic variation based on angle and position along the cylinder
    float droopVariation = sin(angle * 8.0 + uTime * 2.0) * 0.5 + 0.5;
    droopVariation += sin(pos.y * 0.05) * 0.5 + 0.5;
    
    // Ensure the minimum melt amount is large enough to flatten the entire cave!
    // Top of the cave is pos.z = -120. Needs to reach +19. So meltAmount must be at least 140.
    float meltAmount = uThaw * 500.0 * (0.4 + droopVariation * 0.6);
    
    pos.z += meltAmount;
    
    // Pool outwards exactly at the ocean surface level (World Y = -19)
    // World Y = -19 means pos.z = 19.0
    if (pos.z > 19.0) {
       // Bulge outwards (local X and Y)
       float bulge = (pos.z - 19.0) * 0.5 * uThaw;
       vec2 dir = normalize(pos.xy);
       pos.xy += dir * bulge;
       // Clamp to ground level so it forms a puddle that blends into the ocean
       pos.z = 19.0;
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const meltFragmentShader = `
  uniform sampler2D tMap;
  uniform float uThaw;
  varying vec2 vUv;
  
  void main() {
    // Distort UVs as it melts
    vec2 distortedUv = vUv;
    distortedUv.y -= uThaw * 0.5; // Texture slides down
    
    vec4 texColor = texture2D(tMap, distortedUv);
    
    // Fade to vibrant electric blue with greens
    vec3 waterColor = vec3(0.0, 0.95, 0.8);
    vec3 finalColor = mix(texColor.rgb, waterColor, clamp(uThaw * 1.5, 0.0, 1.0));
    
    // We KEEP alpha at 1.0 so it forms a permanent flat ocean layer on the ground
    float alpha = 1.0;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const AbstractCavern = ({ startZ, endZ }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const [cavernTex, setCavernTex] = useState(null);
  
  const length = Math.abs(endZ - startZ);
  const centerZ = (startZ + endZ) / 2;

  const uniforms = useMemo(() => ({
    tMap: { value: null },
    uThaw: { value: 0.0 },
    uTime: { value: 0.0 }
  }), []);

  useEffect(() => {
    new THREE.TextureLoader().load('/assets/images/ice_cavern.jpg', (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 2);
      tex.colorSpace = THREE.SRGBColorSpace;
      setCavernTex(tex);
      uniforms.tMap.value = tex;
    });
  }, [uniforms]);

  useFrame((state) => {
    if (materialRef.current) {
      const thaw = window.icebreakerThaw || 0;
      uniforms.uThaw.value = thaw;
      uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  if (!cavernTex) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, centerZ]} rotation={[Math.PI / 2, 0, 0]}>
      {/* High segments for smooth vertex displacement */}
      <cylinderGeometry args={[120, 120, length, 128, 128, true]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={meltVertexShader}
        fragmentShader={meltFragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

const IcebreakerOcean = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const thaw = window.icebreakerThaw || 0;
      // Start as a tiny puddle, expand to massive ocean
      const scale = THREE.MathUtils.lerp(0.01, 50, Math.pow(thaw, 2));
      meshRef.current.scale.setScalar(scale);
      // Ocean only becomes visible once melting starts
      meshRef.current.visible = thaw > 0;
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], position[1] + 1, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[20, 64]} />
      {/* Vibrant electric blue with bright green emissive so it never turns dark */}
      <meshStandardMaterial color="#00ffff" emissive="#00ff66" emissiveIntensity={0.5} roughness={0.1} metalness={0.2} />
    </mesh>
  );
};

const IslandFloor = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const thaw = window.icebreakerThaw || 0;
      meshRef.current.scale.setScalar(thaw > 0 ? 1 : 0.001);
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], position[1] + 1.5, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[96, 64]} />
      <meshStandardMaterial color="#e5d0a1" roughness={0.9} />
    </mesh>
  );
};

const IceCavernFloor = ({ position }) => {
  const materialRef = useRef();
  
  useFrame(() => {
    if (materialRef.current) {
      const thaw = window.icebreakerThaw || 0;
      materialRef.current.opacity = 1.0 - Math.pow(thaw, 2);
      materialRef.current.transparent = true;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <planeGeometry args={[1000, 3000]} />
      <meshStandardMaterial ref={materialRef} color="#001133" roughness={0.1} metalness={0.8} />
    </mesh>
  );
};

const IslandEnvironment = ({ centerZ }) => {
  const skyMatRef = useRef();
  const sunRef = useRef();
  
  const uniforms = useMemo(() => ({
    uColorBottom: { value: new THREE.Color("#ffaa55") }, // Bright sun yellow-orange
    uColorTop: { value: new THREE.Color("#00f3ff") },    // Vibrant electric sky blue
    uOpacity: { value: 0.0 }
  }), []);
  
  useFrame(() => {
    const thaw = window.icebreakerThaw || 0;
    if (skyMatRef.current) {
      skyMatRef.current.uniforms.uOpacity.value = thaw;
    }
    if (sunRef.current) {
      sunRef.current.intensity = thaw * 0.6;
    }
  });

  return (
    <group>
      {/* Sunset Sky Dome */}
      <mesh scale={2000}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial 
          ref={skyMatRef}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
          uniforms={uniforms}
          vertexShader={`
            varying vec3 vPosition;
            void main() {
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 uColorBottom;
            uniform vec3 uColorTop;
            uniform float uOpacity;
            varying vec3 vPosition;
            void main() {
              // Normalize local Y position to create a gradient
              float h = normalize(vPosition).y;
              // Map h from [-1, 1] to [0, 1], focusing the gradient on the horizon
              float mixVal = smoothstep(-0.2, 0.5, h);
              vec3 finalColor = mix(uColorBottom, uColorTop, mixVal);
              gl_FragColor = vec4(finalColor, uOpacity);
            }
          `}
        />
      </mesh>
      
      {/* Sun Light matching the sunset */}
      <directionalLight 
        ref={sunRef}
        position={[0, 100, -2000]} 
        color="#ffaa55" 
        intensity={0} 
        castShadow
      />
      
      {/* Extra ambient fill for the island */}
      <ambientLight intensity={0.6} color="#ffffff" />
    </group>
  );
};

const IcebreakerController = () => {
  const scroll = useScroll();
  const [locked, setLocked] = useState(false);
  const [textLocked, setTextLocked] = useState(false);
  const [caveLocked, setCaveLocked] = useState(false);
  const textLockRef = useRef({ triggered: false, timer: 0 });
  const caveLockRef = useRef({ triggered: false, timer: 0 });
  
  useEffect(() => {
    window.icebreakerThaw = 0;
    window.icebreakerThawLocked = false;
    window.icebreakerTextLocked = false;
    window.icebreakerCaveLocked = false;
  }, []);

  useFrame((state, delta) => {
    const p = scroll.offset;
    
    // Trigger lock at Stop 1 (Cave Entrance)
    if (!caveLockRef.current.triggered && p >= 0.22) {
      caveLockRef.current.triggered = true;
      setCaveLocked(true);
      window.icebreakerCaveLocked = true;
      if (scroll.el) {
        scroll.el.style.overflow = 'hidden';
        scroll.el.scrollTop = 0.22 * (scroll.el.scrollHeight - scroll.el.clientHeight);
      }
    }
    
    if (window.icebreakerCaveLocked) {
      if (scroll.el) {
        scroll.el.scrollTop = 0.22 * (scroll.el.scrollHeight - scroll.el.clientHeight);
      }
      caveLockRef.current.timer += delta;
      // Unlock after 1.5 seconds to force a pause
      if (caveLockRef.current.timer > 1.5) {
        window.icebreakerCaveLocked = false;
        setCaveLocked(false);
        if (scroll.el) scroll.el.style.overflow = 'auto';
      }
    }

    // Trigger lock at Stop 2 (Melt)
    if (!locked && p >= 0.265 && window.icebreakerThaw < 1.0) {
      setLocked(true);
      window.icebreakerThawLocked = true;
      if (scroll.el) {
        scroll.el.style.overflow = 'hidden';
        scroll.el.scrollTop = 0.27 * (scroll.el.scrollHeight - scroll.el.clientHeight);
      }
    }
    
    if (window.icebreakerThawLocked) {
      // Keep it strictly at 0.27 during the animation
      if (scroll.el) {
        scroll.el.scrollTop = 0.27 * (scroll.el.scrollHeight - scroll.el.clientHeight);
      }

      window.icebreakerThaw += delta * 0.15; // Takes ~6.6 seconds to melt
      if (window.icebreakerThaw >= 1.0) {
        window.icebreakerThaw = 1.0;
        window.icebreakerThawLocked = false;
        if (scroll.el && !textLocked) scroll.el.style.overflow = 'auto';
        setLocked(false);
      }
    } else {
      if (p < 0.2) window.icebreakerThaw = 0;
    }
    
    // Trigger text lock at Stop 3
    if (!textLockRef.current.triggered && p >= 0.285 && window.icebreakerThaw >= 1.0) {
      textLockRef.current.triggered = true;
      setTextLocked(true);
      window.icebreakerTextLocked = true;
      if (scroll.el) {
        scroll.el.style.overflow = 'hidden';
        scroll.el.scrollTop = 0.29 * (scroll.el.scrollHeight - scroll.el.clientHeight);
      }
    }
    
    if (window.icebreakerTextLocked) {
      if (scroll.el) {
        scroll.el.scrollTop = 0.29 * (scroll.el.scrollHeight - scroll.el.clientHeight);
      }
      textLockRef.current.timer += delta;
      // Unlock after 1.5 seconds
      if (textLockRef.current.timer > 1.5) {
        window.icebreakerTextLocked = false;
        setTextLocked(false);
        if (scroll.el) scroll.el.style.overflow = 'auto';
      }
    }
  });
  return null;
};

const WorldIcebreaker = ({ position, rotation, visible = true }) => {
  const startZ = 1000;
  const endZ = -1000;
  const centerZ = (startZ + endZ) / 2;

  return (
    <group position={position} rotation={rotation} visible={visible}>
      <IcebreakerController />
      <IslandEnvironment centerZ={centerZ} />
      <AbstractCavern startZ={startZ} endZ={endZ} />
      
      {/* Ice Cavern Floor */}
      <IceCavernFloor position={[0, -20, 0]} />

      {/* The expanding ocean and island */}
      <IcebreakerOcean position={[0, -20, centerZ]} />
      <IslandFloor position={[0, -20, centerZ]} />
      
      {/* Text Details */}
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} 
        position={[0, 60, centerZ - 500]} 
        fontSize={25} 
        color="#ffffff" 
        outlineWidth={0.05} 
        outlineColor="#00ffff" 
      >
        ICEBREAKER
      </Text>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} 
        position={[0, 30, centerZ - 500]} 
        fontSize={10} 
        color="#00ffff" 
      >
        REAL CONTENT. REAL CONNECTIONS.
      </Text>

      {/* Central Holographic Fire / Nexus */}
      <DigitalFire position={[0, -20, centerZ]} />
      
      {/* Holographic Logo Centerpiece */}
      <HolographicLogo position={[0, 30, centerZ]} />
      
      {/* Procedural Tropical Foliage */}
      <ProceduralPalmTrees radius={60} centerZ={centerZ} />
      
      {/* The People */}
      <IcebreakerSilhouettes position={[0, -20, centerZ]} />

      {/* Hologram Guide */}
      <HologramGuide appId="icebreaker" position={[-80, 20, centerZ - 200]} />
    </group>
  );
};

export default WorldIcebreaker;