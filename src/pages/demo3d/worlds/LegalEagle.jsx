import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float, Text, Instances, Instance, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import HologramGuide from '../components/HologramGuide';

// --- GLSL Shaders ---

const overlordVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vPosition = position;
    
    // Pulsing displacement
    float noise = snoise(position * 0.02 + uTime * 0.5);
    vec3 newPos = position + normal * noise * 15.0;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const overlordFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  
  void main() {
    // Holographic grid and pulse
    float grid = sin(vUv.y * 100.0 - uTime * 10.0) * sin(vUv.x * 100.0);
    float glow = smoothstep(0.0, 1.0, 1.0 - length(vUv - 0.5) * 2.0);
    
    vec3 color = vec3(0.0, 0.8, 1.0) * (grid * 0.5 + 0.5) * glow;
    
    gl_FragColor = vec4(color, glow * 0.8 + 0.2);
  }
`;

const laserVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const laserFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor;
  
  float rand(vec2 co){
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    // Volumetric gradient (fades at edges and bottom)
    float verticalFade = smoothstep(0.0, 0.8, 1.0 - vUv.y);
    
    // Dust particles moving
    float noise1 = rand(floor(vUv * vec2(100.0, 10.0) + vec2(0.0, uTime * 5.0)));
    float noise2 = rand(floor(vUv * vec2(50.0, 20.0) - vec2(uTime * 2.0, 0.0)));
    float dust = smoothstep(0.95, 1.0, noise1 * noise2);
    
    // Scanning lines
    float scanline = sin(vUv.y * 200.0 - uTime * 15.0) * 0.5 + 0.5;
    
    float alpha = verticalFade * (0.3 + scanline * 0.2 + dust * 0.5);
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;


// Component
const HighSpeedDocumentStream = () => {
  const documentCount = 50;
  const docRefs = useRef([]);
  const canvasRef = useRef(document.createElement('canvas'));
  
  // Create a highly detailed holographic blueprint texture
  const docTex = useMemo(() => {
    canvasRef.current.width = 512;
    canvasRef.current.height = 1024;
    const ctx = canvasRef.current.getContext('2d');
    
    // Deep blue background
    ctx.fillStyle = '#010a15';
    ctx.fillRect(0, 0, 512, 1024);
    
    // Grid
    ctx.strokeStyle = '#004488';
    ctx.lineWidth = 2;
    for(let i=0; i<1024; i+=32) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
      if(i<512) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke(); }
    }
    
    // Headers and redacted text blocks
    ctx.fillStyle = '#0088ff';
    ctx.fillRect(40, 40, 432, 60); // Header
    
    ctx.fillStyle = '#00ffff';
    ctx.font = '24px monospace';
    ctx.fillText("CLASSIFIED // AI REVIEW", 60, 78);
    
    ctx.fillStyle = '#003366';
    for(let i=0; i<30; i++) {
        let y = 140 + i * 28;
        ctx.fillRect(40, y, 432 - (Math.random() * 200), 12);
    }
    
    // Red seal
    ctx.strokeStyle = '#ff0033';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(400, 850, 60, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(400, 850, 50, 0, Math.PI*2); ctx.stroke();
    
    const tex = new THREE.CanvasTexture(canvasRef.current);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const documentData = useMemo(() => {
    return Array.from({ length: documentCount }).map((_, i) => ({
      delay: i * 0.08, 
      state: 'waiting', 
      x: 3000,
      y: (Math.random() - 0.5) * 150 - 50,
      z: -400 + (Math.random() * 200)
    }));
  }, [documentCount]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    documentData.forEach((doc, i) => {
      const ref = docRefs.current[i];
      if (!ref) return;

      if (time > doc.delay) {
        if (doc.state === 'waiting') doc.state = 'approaching';
        
        if (doc.state === 'approaching') {
          doc.x -= 8000 * delta; // move incredibly fast
          if (doc.x <= 0) {
            doc.x = 0;
            doc.state = 'scanning';
            doc.scanTimer = time;
          }
        }
        
        if (doc.state === 'scanning') {
          if (time - doc.scanTimer > 0.05) { // ultra-fast 50ms scan
            doc.state = 'approved';
          }
        }
        
        if (doc.state === 'approved') {
          doc.x -= 8000 * delta; // zip away
          if (doc.x < -3000) {
            // Reset for continuous loop
            doc.x = 3000 + (Math.random() * 500);
            doc.state = 'approaching';
            doc.y = (Math.random() - 0.5) * 150 - 50;
          }
        }
      }

      ref.position.set(doc.x, doc.y, doc.z);
      
      // Dynamic rotation snapping
      if (doc.state === 'scanning') {
        ref.rotation.set(0, 0, 0); // Face judge directly
        ref.scale.setScalar(1.2); // slight pop
      } else if (doc.state === 'approved') {
        ref.rotation.set(0, 0.4, 0);
        ref.scale.setScalar(1.0);
      } else {
        ref.rotation.set(0, -0.4, 0);
        ref.scale.setScalar(1.0);
      }
      
      // Color tint based on state
      if (doc.state === 'scanning') {
        ref.color.set('#ffffff'); // flash bright white
      } else if (doc.state === 'approved') {
        ref.color.set('#00ff66'); // green
      } else {
        ref.color.set('#0088ff'); // deep blue approach
      }
    });
  });

  return (
    <Instances limit={documentCount} range={documentCount}>
      <planeGeometry args={[100, 200]} />
      <meshBasicMaterial map={docTex} side={THREE.DoubleSide} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      {documentData.map((data, i) => (
        <Instance key={i} ref={(el) => (docRefs.current[i] = el)} position={[data.x, data.y, data.z]} />
      ))}
    </Instances>
  );
};

const CourtroomBackground = () => {
  const bgTex = useLoader(THREE.TextureLoader, '/legal_eagle_courtroom_bg.jpg');
  bgTex.colorSpace = THREE.SRGBColorSpace;
  
  return (
    <group>
      {/* Curved background */}
      <mesh position={[0, 0, -2500]}>
        <planeGeometry args={[8000, 4500]} />
        <meshBasicMaterial map={bgTex} depthWrite={false} transparent opacity={0.3} />
      </mesh>
      
      {/* Brutalist Megastructure Pillars */}
      {[-1, 1].map((side, i) => (
        <mesh key={i} position={[side * 800, 0, -1000]}>
          <boxGeometry args={[400, 4000, 400]} />
          <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {[-1, 1].map((side, i) => (
        <mesh key={i+2} position={[side * 1400, 0, -1500]}>
          <boxGeometry args={[600, 4000, 600]} />
          <meshStandardMaterial color="#030303" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const BrutalistOverlord = ({ logoTex }) => {
  const overlordUniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  const laserUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#00ffff') }
  }), []);

  useFrame((state) => {
    overlordUniforms.uTime.value = state.clock.elapsedTime;
    laserUniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group position={[0, -100, -800]}>
      {/* Massive Bench Monolith */}
      <mesh position={[0, -200, 0]}>
        <boxGeometry args={[1200, 600, 400]} />
        <meshStandardMaterial color="#020202" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0, 150, 0]}>
        <boxGeometry args={[800, 100, 300]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* AI Judge (Legal Eagle Logo) */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 400, 0]}>
          <planeGeometry args={[400, 400]} />
          <meshBasicMaterial map={logoTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, 150, 0]} fontSize={100} color="#00ffff" anchorX="center" anchorY="middle" outlineWidth={2} outlineColor="#004488">
            LEGAL EAGLE
        </Text>
      </Float>
    </group>
  );
};

const LegalEagle = ({ position, rotation, visible }) => {
  const logoTex = useLoader(THREE.TextureLoader, '/legal_eagle_logo.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  return (
    <group visible={visible} position={position} rotation={rotation}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1000, 1000]} intensity={1.5} color="#00ffff" />
      <pointLight position={[0, 500, -400]} intensity={2.0} color="#0044ff" distance={2000} />
      
      <CourtroomBackground />
      <BrutalistOverlord logoTex={logoTex} />
      <HighSpeedDocumentStream />

      {/* Hologram Guide */}
      <HologramGuide appId="legaleagle" position={[200, 100, -200]} />
    </group>
  );
};

export default LegalEagle;
