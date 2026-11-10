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
      <meshBasicMaterial 
        map={logoTex} 
        transparent={true} 
        opacity={0} 
        depthWrite={false} 
        side={THREE.DoubleSide} 
        toneMapped={false}
      />
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
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // In Three.js CylinderGeometry with rotation=[Math.PI/2, 0, 0]:
    // pos.y is length along the tunnel (World Z)
    // pos.x is cross-section width (World X)
    // pos.z is cross-section height (World Y = -pos.z)
    // Ceiling: pos.z = -120 (World Y = +120)
    // Floor level: World Y = -20 (pos.z = +20)
    
    float angle = atan(-pos.z, pos.x);
    
    // Organic drooping waves along the ceiling and walls
    float droop = sin(angle * 6.0 + uTime * 2.5) * 0.5 + 0.5;
    droop += sin(pos.y * 0.04 + uTime * 1.5) * 0.3;
    
    // Thermal downward melt displacement
    float meltDisplacement = uThaw * 260.0 * (0.6 + droop * 0.4);
    pos.z += meltDisplacement;
    
    // Pool outwards upon hitting ground level (pos.z = 22.0)
    if (pos.z > 22.0) {
      float puddleSpread = (pos.z - 22.0) * 0.4 * uThaw;
      pos.x += sign(pos.x + 0.0001) * puddleSpread;
      pos.z = 22.0;
    }
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const meltFragmentShader = `
  uniform sampler2D tMap;
  uniform float uThaw;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    // Distort UVs as ice melts into sliding water drips
    vec2 uv = vUv;
    uv.y -= uThaw * 0.35 + sin(uv.x * 20.0 + uTime * 2.0) * 0.02 * uThaw;
    
    vec4 texColor = texture2D(tMap, uv);
    
    // Glistening transition from cold frost blue to melting aqua liquid
    vec3 iceColor = texColor.rgb;
    vec3 liquidMelt = vec3(0.12, 0.88, 0.96);
    vec3 finalColor = mix(iceColor, liquidMelt, clamp(uThaw * 1.4, 0.0, 1.0));
    
    // Shimmering drips of melting water
    float dripShimmer = sin(uv.y * 60.0 - uTime * 6.0) * 0.5 + 0.5;
    finalColor += vec3(0.3, 0.7, 1.0) * (dripShimmer * uThaw * 0.6);
    
    // Dissolve & evaporate:
    // As uThaw progresses, the cavern walls dissolve completely to reveal the tropical beach
    float dissolve = 1.0 - smoothstep(0.15, 0.92, uThaw);
    
    if (dissolve < 0.01) {
      discard;
    }
    
    gl_FragColor = vec4(finalColor, dissolve);
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
    const thaw = window.icebreakerThaw || 0;
    if (meshRef.current) {
      meshRef.current.visible = thaw < 0.99;
    }
    if (materialRef.current) {
      uniforms.uThaw.value = thaw;
      uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  if (!cavernTex) return null;

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, centerZ]} rotation={[Math.PI / 2, 0, 0]}>
        {/* High segments for smooth vertex displacement */}
        <cylinderGeometry args={[120, 120, length, 128, 128, true]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={meltVertexShader}
          fragmentShader={meltFragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[0, 0, 1300]} rotation={[Math.PI / 2, 0, 0]}>
         <sphereGeometry args={[120, 64, 64]} />
         <shaderMaterial
            vertexShader={meltVertexShader}
            fragmentShader={meltFragmentShader}
            uniforms={uniforms}
            transparent={true}
            depthWrite={false}
            side={THREE.BackSide}
         />
      </mesh>
    </group>
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
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame(() => {
    const thaw = window.icebreakerThaw || 0;
    if (meshRef.current) {
      meshRef.current.visible = thaw < 0.98;
    }
    if (materialRef.current) {
      materialRef.current.opacity = Math.max(0, 1.0 - Math.pow(thaw, 2));
      materialRef.current.transparent = true;
      materialRef.current.depthWrite = thaw < 0.05;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={position}>
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

const preventInputEvent = (e) => {
  if (e.cancelable) e.preventDefault();
  e.stopPropagation();
  if (typeof e.stopImmediatePropagation === 'function') {
    e.stopImmediatePropagation();
  }
  return false;
};

let isInputLocked = false;

export const lockIcebreakerInput = () => {
  if (typeof document === 'undefined' || isInputLocked) return;
  isInputLocked = true;

  let blocker = document.getElementById('icebreaker-input-lock');
  if (!blocker) {
    blocker = document.createElement('div');
    blocker.id = 'icebreaker-input-lock';
    blocker.style.position = 'fixed';
    blocker.style.top = '0';
    blocker.style.left = '0';
    blocker.style.width = '100vw';
    blocker.style.height = '100vh';
    blocker.style.zIndex = '999999';
    blocker.style.pointerEvents = 'all';
    blocker.style.cursor = 'wait';
    blocker.style.userSelect = 'none';
    blocker.style.touchAction = 'none';
    blocker.style.background = 'transparent';
    document.body.appendChild(blocker);
  }

  const events = ['wheel', 'touchmove', 'touchstart', 'touchend', 'pointerdown', 'pointermove', 'pointerup', 'mousedown', 'mousemove', 'mouseup', 'keydown'];
  events.forEach((evt) => {
    window.addEventListener(evt, preventInputEvent, { passive: false, capture: true });
  });

  if (window._scrollEl) {
    window._scrollEl.style.overflow = 'hidden';
  }
};

export const unlockIcebreakerInput = () => {
  if (typeof document === 'undefined' || !isInputLocked) return;
  isInputLocked = false;

  const blocker = document.getElementById('icebreaker-input-lock');
  if (blocker) blocker.remove();

  const events = ['wheel', 'touchmove', 'touchstart', 'touchend', 'pointerdown', 'pointermove', 'pointerup', 'mousedown', 'mousemove', 'mouseup', 'keydown'];
  events.forEach((evt) => {
    window.removeEventListener(evt, preventInputEvent, { capture: true });
  });

  if (window._scrollEl) {
    window._scrollEl.style.overflow = 'auto';
  }
};

export const runIcebreakerMelt = (onComplete) => {
  if (window._icebreakerMeltState === 'running' || window._icebreakerMeltState === 'completed') {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  window._icebreakerMeltState = 'running';
  window._isWorldActionActive = true;
  window.icebreakerThawLocked = true;
  window._icebreakerLockCamera = true;
  window.icebreakerThaw = 0;

  // Initialize camera at wide cavern entrance view
  window._icebreakerCam = {
    active: true,
    x: 0,
    y: -3980,
    z: -1680,
    rx: 0,
    ry: 0
  };

  lockIcebreakerInput();

  if (window._scrollEl) {
    const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
    if (maxScroll > 0) {
      window._scrollEl.scrollTop = 0.120 * maxScroll;
    }
  }

  // Phase 1: Camera stops in center where we see the ice cave for 2.0s
  // Phase 2: Melts smoothly without needing to move the mouse (3.2s)
  // Phase 3: Automatic smooth camera zoom-in toward the dancing people on the island (2.6s)
  const PAUSE_MS = 2000;
  const MELT_MS = 3200;
  const ZOOM_MS = 2600;
  const start = performance.now();

  const easeOutCubic = (t) => 1.0 - Math.pow(1.0 - t, 3);
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1.0 - Math.pow(-2 * t + 2, 3) / 2);

  const step = (now) => {
    if (window._icebreakerMeltState !== 'running') return;

    // If user or tour advances to another world, cleanly finish Icebreaker and exit immediately
    if (window._isTransitActive && window._currentStationIndex !== 2) {
      window.icebreakerThaw = 1.0;
      if (window._icebreakerCam) {
        window._icebreakerCam.active = false;
        window._icebreakerCam = null;
      }
      window._icebreakerMeltState = 'completed';
      window.icebreakerThawLocked = false;
      window._icebreakerLockCamera = false;
      window._isWorldActionActive = false;
      unlockIcebreakerInput();
      return;
    }

    const elapsed = now - start;

    if (window._scrollEl && !window._isTransitActive) {
      const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
      if (maxScroll > 0) {
        let curP = 0.120;
        if (elapsed > PAUSE_MS + MELT_MS) {
          const zoomElapsed = elapsed - PAUSE_MS - MELT_MS;
          const prog = Math.min(1.0, zoomElapsed / ZOOM_MS);
          curP = 0.120 + (0.131 - 0.120) * easeInOutCubic(prog);
        }
        window._scrollEl.scrollTop = curP * maxScroll;
      }
    }

    if (elapsed < PAUSE_MS) {
      // Phase 1: Frozen cave hold at entrance focal point
      window.icebreakerThaw = 0.0;
      window._icebreakerCam = { active: true, x: 0, y: -3980, z: -1680, rx: 0, ry: 0 };
      requestAnimationFrame(step);
    } else if (elapsed < PAUSE_MS + MELT_MS) {
      // Phase 2: Melting progression
      const meltElapsed = elapsed - PAUSE_MS;
      const prog = Math.min(1.0, meltElapsed / MELT_MS);
      window.icebreakerThaw = easeOutCubic(prog);
      window._icebreakerCam = { active: true, x: 0, y: -3980, z: -1680, rx: 0, ry: 0 };
      requestAnimationFrame(step);
    } else if (elapsed < PAUSE_MS + MELT_MS + ZOOM_MS) {
      // Phase 3: Automatic smooth camera zoom-in toward campfire and dancing people
      window.icebreakerThaw = 1.0;
      const zoomElapsed = elapsed - PAUSE_MS - MELT_MS;
      const prog = Math.min(1.0, zoomElapsed / ZOOM_MS);
      const easedZoom = easeInOutCubic(prog);

      // Glide from entrance up and forward to look down at people around fire at 33-35 degree angle
      window._icebreakerCam = {
        active: true,
        x: 0,
        y: -3980 + (-3840 - -3980) * easedZoom,
        z: -1680 + (-2010 - -1680) * easedZoom,
        rx: 0 + (-0.58 - 0) * easedZoom,
        ry: 0
      };
      requestAnimationFrame(step);
    } else {
      // Phase 4: Completed - keep fully thawed, hand off to master timeline at elevated campfire position
      window.icebreakerThaw = 1.0;
      if (window._icebreakerCam) {
        window._icebreakerCam.active = false;
        window._icebreakerCam = null;
      }
      window._icebreakerMeltState = 'completed';
      window.icebreakerThawLocked = false;
      window._icebreakerLockCamera = false;
      window._isWorldActionActive = false;
      window._currentProgress = 0.131;
      if (window._scrollObj) {
        window._scrollObj.offset = 0.131;
      }
      if (window._scrollEl && !window._isTransitActive) {
        const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
        if (maxScroll > 0) {
          window._scrollEl.scrollTop = 0.131 * maxScroll;
        }
      }
      unlockIcebreakerInput();
      if (typeof onComplete === 'function') onComplete();
    }
  };
  requestAnimationFrame(step);
};
if (typeof window !== 'undefined') {
  window.triggerIcebreakerMelt = runIcebreakerMelt;
}

const IcebreakerController = () => {
  const scroll = useScroll();

  useEffect(() => {
    if (!window._icebreakerMeltState) {
      window._icebreakerMeltState = 'idle';
      window.icebreakerThaw = 0;
    }
    if (scroll?.el) {
      window._scrollEl = scroll.el;
    }

    return () => {
      unlockIcebreakerInput();
    };
  }, [scroll]);

  useFrame(() => {
    if (scroll?.el && !window._scrollEl) {
      window._scrollEl = scroll.el;
    }

    const p = (window._isTransitActive && window._warpProgress !== undefined) 
      ? window._warpProgress 
      : scroll.offset;

    // Reset only if user scrolls all the way back before plunge tunnel entry (p < 0.070)
    if (!window.icebreakerThawLocked && !window._icebreakerLockCamera && window._icebreakerMeltState !== 'running') {
      if (p < 0.070) {
        if (window._icebreakerMeltState !== 'idle' || window.icebreakerThaw > 0 || window._icebreakerCam) {
          window._icebreakerMeltState = 'idle';
          window.icebreakerThaw = 0.0;
          window.icebreakerThawLocked = false;
          window._icebreakerLockCamera = false;
          window._isWorldActionActive = false;
          if (window._icebreakerCam) {
            window._icebreakerCam.active = false;
            window._icebreakerCam = null;
          }
          unlockIcebreakerInput();
          if (scroll?.el) scroll.el.style.overflow = 'auto';
        }
      }
    }

    // While completed, maintain thawed state
    if (window._icebreakerMeltState === 'completed') {
      window.icebreakerThaw = 1.0;
    }

    // Automatically trigger melt sequence when user is in Icebreaker pause zone (p between 0.115 and 0.142)
    // Only trigger when not in transit to a different station
    if (!window._isTransitActive && p >= 0.115 && p <= 0.142) {
      if (!window._icebreakerMeltState || window._icebreakerMeltState === 'idle') {
        runIcebreakerMelt();
      }
    }
  });

  return null;
};

const WorldIcebreaker = ({ position, rotation, visible = true }) => {
  const startZ = 1550;
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
      
      {/* Text Details - Elevated High Above Island Campfire */}
      <Text 
        font="/fonts/Roboto.woff" 
        fallbackFonts={[]} 
        position={[0, 118, centerZ - 40]} 
        rotation={[-0.45, 0, 0]}
        fontSize={52} 
        color="#ffffff" 
        outlineWidth={1.5} 
        outlineColor="#0077cc" 
        anchorX="center"
        anchorY="middle"
      >
        ICEBREAKER
      </Text>
      <Text 
        font="/fonts/Roboto.woff" 
        fallbackFonts={[]} 
        position={[0, 84, centerZ - 40]} 
        rotation={[-0.45, 0, 0]}
        fontSize={20} 
        color="#00ffff" 
        outlineWidth={1.0} 
        outlineColor="#003366" 
        anchorX="center"
        anchorY="middle"
      >
        REAL CONTENT. REAL CONNECTIONS.
      </Text>

      {/* Central Holographic Fire / Nexus */}
      <DigitalFire position={[0, -20, centerZ]} />
      
      {/* Holographic Logo Centerpiece - Elevated Above Fire */}
      <HolographicLogo position={[0, 50, centerZ]} />
      
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