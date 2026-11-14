import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// 1. Cascading Japanese Digital Code Rain Shaders (Falls Downwards)
// ---------------------------------------------------------------------------
const matrixRainVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const matrixRainFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uCols;
  uniform float uRows;
  uniform sampler2D uAtlas;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    float cols = uCols;
    float rows = uRows;
    
    float colId = floor(vUv.x * cols);
    float rowId = floor(vUv.y * rows);
    
    float colHash = hash(vec2(colId, 37.19));
    float speed = (0.75 + colHash * 0.65) * uSpeed;
    
    // Genuine Downward Streaming Motion:
    // As uTime increases, characters physically flow downward from top (vUv.y = 1.0) to bottom (vUv.y = 0.0)
    float flow = uTime * speed * 6.0;
    float streamY = vUv.y * rows + flow;
    float charRow = floor(streamY);
    float charUvY = fract(streamY);
    
    // Periodic raindrop drops cascading down each column
    float dropPeriod = 24.0;
    float dropPhase = fract((streamY + colHash * 50.0) / dropPeriod);
    
    // Leading tip: white-hot phosphor glyph
    float head = smoothstep(0.065, 0.0, dropPhase);
    // Trailing stream: iconic phosphorescent green decay behind the falling head
    float tail = (dropPhase < 0.75) ? pow(1.0 - (dropPhase / 0.75), 1.9) : 0.0;
    float intensity = head * 2.8 + tail * 1.5;
    
    // Dynamic Katakana character selection that mutates as it falls
    float charMutate = floor(uTime * 1.25 + colHash * 10.0);
    float charIndex = floor(hash(vec2(colId, charRow + charMutate * 0.05)) * 64.0);
    
    vec2 cellUv = vec2(fract(vUv.x * cols), charUvY);
    float c = mod(charIndex, 8.0);
    float r = floor(charIndex / 8.0);
    vec2 atlasUv = vec2((c + cellUv.x) / 8.0, (7.0 - r + cellUv.y) / 8.0);
    
    float glyphAlpha = texture2D(uAtlas, atlasUv).r;
    
    // Color: White-hot leading glyph fading into iconic Matrix phosphorescent green
    vec3 headColor = vec3(1.0, 1.0, 1.0);
    vec3 tailColor = mix(vec3(0.0, 0.4, 0.12), vec3(0.0, 1.0, 0.45), tail);
    vec3 rgb = mix(tailColor, headColor, head);
    
    // Smooth boundary fade for curtains
    float edgeFade = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x)
                   * smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);
                   
    float alpha = glyphAlpha * intensity * edgeFade;
    
    if (alpha < 0.02) discard;
    
    gl_FragColor = vec4(rgb, alpha * 0.98);
  }
`;

function createFallbackKatakanaAtlas() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 512, 512);
  // 64 Pure Japanese Katakana characters (zero numbers, zero symbols, zero missing glyphs)
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブ';
  const cols = 8;
  const rows = 8;
  const cellW = 512 / cols;
  const cellH = 512 / rows;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W6", "Meiryo", "Yu Gothic", "MS Gothic", -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < 64; i++) {
    const char = chars[i % chars.length];
    const c = i % cols;
    const r = Math.floor(i / cols);
    ctx.fillText(char, c * cellW + cellW / 2, r * cellH + cellH / 2);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

// Sub-component for individual code curtains with independent uniform control
function MatrixRainCurtain({ pos, rot, scale, cols = 32, rows = 44, speedMult = 1.0, atlasTexture }) {
  const shaderRef = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: speedMult },
    uCols: { value: cols },
    uRows: { value: rows },
    uAtlas: { value: atlasTexture }
  }), [speedMult, cols, rows, atlasTexture]);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh position={pos} rotation={rot} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={matrixRainVertexShader}
        fragmentShader={matrixRainFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// 2. Main WorldMatrix Component
// ---------------------------------------------------------------------------
export default function WorldMatrix({ position, visible }) {
  const coreRef = useRef();
  const innerSeedRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const discRef = useRef();

  // Load official glowing Matrix emblem
  const logoTex = useLoader(THREE.TextureLoader, '/matrix_logo_bright.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  // Load Katakana texture atlas with instant fallback
  const atlasTexture = useMemo(() => {
    let tex;
    try {
      const loader = new THREE.TextureLoader();
      tex = loader.load(
        '/matrix_katakana_atlas_v2.png',
        (t) => {
          t.minFilter = THREE.LinearFilter;
          t.magFilter = THREE.LinearFilter;
          t.needsUpdate = true;
        }
      );
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
    } catch {
      tex = createFallbackKatakanaAtlas();
    }
    return tex;
  }, []);

  // Expansive multi-tier code curtains filling the entire screen horizontally
  const codeCurtains = useMemo(() => [
    // 1. FULL-WIDTH PRIMARY BACKDROP: Spans the full horizontal field of view
    { 
      pos: [0, 180, -960], 
      rot: [0, 0, 0], 
      scale: [4600, 1800, 1],
      cols: 140,
      rows: 56,
      speedMult: 1.05
    },
    // 2. ULTRA-WIDE DEEP HORIZON CYCLORAMA: Infinite panoramic matrix depth
    { 
      pos: [0, 260, -1350], 
      rot: [0, 0, 0], 
      scale: [5800, 2400, 1],
      cols: 180,
      rows: 64,
      speedMult: 0.85
    },
    // 3. WRAPAROUND FLANK WINGS: Envelops left and right peripheral vision
    { 
      pos: [-1450, 180, -800], 
      rot: [0, Math.PI / 4.5, 0], 
      scale: [1800, 1800, 1],
      cols: 56,
      rows: 54,
      speedMult: 1.15
    },
    { 
      pos: [1450, 180, -800], 
      rot: [0, -Math.PI / 4.5, 0], 
      scale: [1800, 1800, 1],
      cols: 56,
      rows: 54,
      speedMult: 1.15
    },
    // 4. FOREGROUND PERIMETER CASCADES: Left & right foreground cascades
    { 
      pos: [-980, 120, -550], 
      rot: [0, Math.PI / 7, 0], 
      scale: [950, 1400, 1],
      cols: 32,
      rows: 44,
      speedMult: 1.25
    },
    { 
      pos: [980, 120, -550], 
      rot: [0, -Math.PI / 7, 0], 
      scale: [950, 1400, 1],
      cols: 32,
      rows: 44,
      speedMult: 1.25
    },
    // 5. OVERHEAD DIGITAL CANOPY: High ceiling code rain
    { 
      pos: [0, 850, -850], 
      rot: [-Math.PI / 2.6, 0, 0], 
      scale: [3800, 1500, 1],
      cols: 110,
      rows: 44,
      speedMult: 0.95
    },
  ], []);

  // Flanking Server Monoliths pushed to the far architectural perimeter
  const serverTowers = useMemo(() => [
    { pos: [-1500, 220, -700], size: [140, 900, 140] },
    { pos: [1500, 220, -700], size: [140, 900, 140] },
    { pos: [-1650, 300, -980], size: [180, 1100, 180] },
    { pos: [1650, 300, -980], size: [180, 1100, 180] },
  ], []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // Central Quantum Crystalline Core rotation and levitation
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.18;
      coreRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;
      coreRef.current.position.y = 85 + Math.sin(t * 1.6) * 7;
    }

    // Inner Quantum Seed pulse
    if (innerSeedRef.current) {
      innerSeedRef.current.rotation.y = -t * 0.45;
      innerSeedRef.current.rotation.z = t * 0.3;
      const s = 1.0 + Math.sin(t * 3.2) * 0.14;
      innerSeedRef.current.scale.set(s, s, s);
    }

    // Precision Telemetry Rings (smooth, elegant, mechanical)
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = t * 0.22;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.15;
      ring2Ref.current.rotation.z = t * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = -t * 0.18;
    }
    if (discRef.current) {
      discRef.current.rotation.z = t * 0.06;
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* Immersive Deep Cyber Matrix Lighting */}
      <ambientLight intensity={0.45} color="#001408" />
      <directionalLight position={[0, 900, -200]} intensity={4.0} color="#00ff66" />
      <directionalLight position={[-600, 400, 300]} intensity={2.0} color="#00e5ff" />
      <pointLight position={[0, 100, -750]} intensity={28} distance={1600} color="#00ff66" />
      <pointLight position={[0, -180, -750]} intensity={14} distance={1000} color="#00e5ff" />

      {/* ------------------------------------------------------------- */}
      {/* 1. HIGH-GLOSS REFLECTIVE OBSIDIAN CYBER-FLOOR */}
      {/* ------------------------------------------------------------- */}
      <mesh position={[0, -220, -700]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4200, 4200, 32, 32]} />
        <meshStandardMaterial 
          color="#020804" 
          roughness={0.10} 
          metalness={0.94} 
        />
      </mesh>

      {/* Cyber Bus Lines on Floor leading to Core */}
      {[-300, -150, 0, 150, 300].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, -218, -700]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[idx === 2 ? 8 : 3, 3800]} />
          <meshBasicMaterial color={idx === 2 ? "#00ff66" : "#00f0ff"} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* ------------------------------------------------------------- */}
      {/* 2. CASCADING JAPANESE DIGITAL CODE RAIN (FALLS DOWNWARDS) */}
      {/*    Includes prominent central backdrop falling behind core */}
      {/* ------------------------------------------------------------- */}
      {codeCurtains.map((c, i) => (
        <MatrixRainCurtain
          key={i}
          pos={c.pos}
          rot={c.rot}
          scale={c.scale}
          cols={c.cols}
          rows={c.rows}
          speedMult={c.speedMult}
          atlasTexture={atlasTexture}
        />
      ))}

      {/* ------------------------------------------------------------- */}
      {/* 3. FLANKING CYBER SERVER TOWER MEGASTRUCTURES */}
      {/* ------------------------------------------------------------- */}
      {serverTowers.map((tower, idx) => (
        <group key={idx} position={tower.pos}>
          {/* Solid Obsidian Monolith */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={tower.size} />
            <meshStandardMaterial 
              color="#030d06" 
              metalness={0.94} 
              roughness={0.16} 
            />
          </mesh>
          {/* Vertical Glowing Optical Data Spine */}
          <mesh position={[0, 0, tower.size[2] / 2 + 2]}>
            <planeGeometry args={[12, tower.size[1] * 0.92]} />
            <meshBasicMaterial color="#00ff66" transparent opacity={0.75} />
          </mesh>
          {/* Status Beacon on Roof */}
          <mesh position={[0, tower.size[1] / 2 + 20, 0]}>
            <sphereGeometry args={[10, 24, 24]} />
            <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={3.5} />
          </mesh>
          <pointLight position={[0, tower.size[1] / 2 + 25, 0]} color="#00ff66" intensity={5} distance={220} />
        </group>
      ))}

      {/* ------------------------------------------------------------- */}
      {/* 4. QUANTUM CRYSTALLINE NEURAL CORE & PRECISION TELEMETRY RINGS */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 0, -750]}>
        
        {/* Stepped Octagonal Obsidian Plinth */}
        <mesh position={[0, -200, 0]}>
          <cylinderGeometry args={[160, 180, 40, 8]} />
          <meshStandardMaterial color="#020a04" metalness={0.95} roughness={0.12} />
        </mesh>
        <mesh position={[0, -170, 0]}>
          <cylinderGeometry args={[120, 140, 30, 8]} />
          <meshStandardMaterial color="#031206" metalness={0.92} roughness={0.15} />
        </mesh>

        {/* Holographic Projection Disc at base */}
        <mesh ref={discRef} position={[0, -150, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[70, 220, 64]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.25} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Floating Quantum Crystalline Processor Assembly */}
        <group ref={coreRef} position={[0, 85, 0]}>
          
          {/* Multi-faceted Faceted Emerald Crystal Shell */}
          <mesh>
            <icosahedronGeometry args={[52, 0]} />
            <meshStandardMaterial 
              color="#021c09" 
              metalness={0.95} 
              roughness={0.08} 
              emissive="#004416" 
              emissiveIntensity={1.4} 
              transparent
              opacity={0.88}
            />
          </mesh>

          {/* Faceted Internal Crystal Cage */}
          <mesh>
            <octahedronGeometry args={[42, 0]} />
            <meshStandardMaterial 
              color="#00ff66" 
              emissive="#00ff44" 
              emissiveIntensity={2.2} 
              metalness={0.9} 
              roughness={0.12} 
              wireframe={false}
            />
          </mesh>

          {/* Glowing Inner Quantum Singularity (Neural Compute Core) */}
          <mesh ref={innerSeedRef}>
            <sphereGeometry args={[22, 32, 32]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#00ff66" 
              emissiveIntensity={4.5} 
            />
          </mesh>
          <pointLight color="#00ff66" intensity={20} distance={650} />

          {/* Precision Equatorial Telemetry Ring (Gunmetal with Emerald Emitter) */}
          <group ref={ring1Ref}>
            <mesh>
              <torusGeometry args={[130, 1.4, 16, 96]} />
              <meshStandardMaterial color="#051408" emissive="#00ff66" emissiveIntensity={2.2} metalness={0.95} roughness={0.1} />
            </mesh>
          </group>

          {/* Axial Meridian Precision Ring (Tilted 45°) */}
          <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
            <mesh>
              <torusGeometry args={[160, 1.2, 16, 96]} />
              <meshStandardMaterial color="#041208" emissive="#00e5ff" emissiveIntensity={2.0} metalness={0.95} roughness={0.1} />
            </mesh>
          </group>

          {/* Outer Horizon Scanner Ring */}
          <group ref={ring3Ref}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[190, 1.0, 16, 96]} />
              <meshStandardMaterial color="#030f06" emissive="#00ff66" emissiveIntensity={1.8} metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 5. CENTERPIECE: FLOATING MATRIX LOGO & SUBTITLE ABOVE ANIMATION */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 480, -750]}>
        <Float speed={1.8} rotationIntensity={0.04} floatIntensity={0.3}>
          <mesh position={[0, 36, 0]}>
            <planeGeometry args={[260, 62]} />
            <meshBasicMaterial 
              map={logoTex} 
              transparent 
              depthWrite={false} 
              blending={THREE.AdditiveBlending} 
            />
          </mesh>
        </Float>
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, -82, 0]}
          fontSize={48}
          lineHeight={1.2}
          textAlign="center"
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={2.4}
          outlineColor="#022c22"
          letterSpacing={0.08}
        >
          {'AUTONOMOUS AI SOFTWARE\nENGINEERING LAB'}
        </Text>
      </group>
    </group>
  );
}
