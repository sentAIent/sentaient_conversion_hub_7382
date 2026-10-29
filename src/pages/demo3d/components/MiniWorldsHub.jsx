import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const LogoMesh = ({ url, scaleX, scaleY }) => {
  const texture = useTexture(url);
  return (
    <mesh scale={[70 * scaleX, 70 * scaleY, 1]} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={false} alphaTest={0.5} depthWrite side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
};

const MiniWorld = ({ position, name, color, ringColor, startP, targetP, endP, scrollEl, logoUrl, logoScale = 1.578, summary, description, hoveredWorld, onHoverStart, onHoverEnd, itemScale = 1.0 }) => {
  const meshRef = useRef();
  const containerRef = useRef();
  const isHovered = hoveredWorld === name;
  const isDimmed = hoveredWorld !== null && !isHovered;
  const len = Math.hypot(position[0], position[1]) || 1;
  const inwardX = -position[0] / len;
  const inwardY = -position[1] / len;

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      let el = containerRef.current.parentElement;
      while (el && el !== document.body) {
        if (el.classList && el.classList.contains('mini-world-wrapper')) {
          el.style.setProperty('z-index', isHovered ? '99999999' : '50', 'important');
          el.style.setProperty('pointer-events', 'none', 'important');
          break;
        }
        el = el.parentElement;
      }
    }
  }, [isHovered]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(t * 2 + position[0]) * 5;
      
      const targetScale = isHovered ? 1.5 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handleClick = (e) => {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    if (window._goToStation) {
      let targetIdx = window.STATIONS ? window.STATIONS.findIndex(s => s.name.toLowerCase() === name.toLowerCase()) : -1;
      if (targetIdx === -1 && window.STATIONS) {
        targetIdx = window.STATIONS.findIndex(s => Math.abs(s.p - (targetP || 0)) < 0.03);
      }
      if (targetIdx !== -1) {
        window._goToStation(targetIdx, 2400);
        return;
      }
    }
  };

  const renderIcon = () => {
    if (logoUrl) {
      const scaleX = Array.isArray(logoScale) ? logoScale[0] : logoScale;
      const scaleY = Array.isArray(logoScale) ? logoScale[1] : logoScale;
      
      return (
        <group scale={1.2 * itemScale}>
          <LogoMesh url={logoUrl} scaleX={scaleX} scaleY={scaleY} />
        </group>
      );
    }

    return <group scale={3.0 * itemScale}>{getPrimitiveLogo(name, color, isHovered)}</group>;
  };

  // Calculate a perfectly complimentary color for the circular base
  const compColor = React.useMemo(() => {
    if (ringColor) return new THREE.Color(ringColor);
    const c = new THREE.Color(color);
    const hsl = {};
    c.getHSL(hsl);
    // Shift hue by 180 degrees (0.5), boost saturation slightly, and ensure it stays bright/appealing
    return new THREE.Color().setHSL((hsl.h + 0.5) % 1.0, Math.min(1.0, hsl.s * 1.2), Math.max(0.5, hsl.l));
  }, [color, ringColor]);

  return (
    <group position={position}>
      <group ref={meshRef} onClick={handleClick}>
        {/* Wormhole Base / Portal */}
        <mesh position={[0, -35 * itemScale, 0]} rotation={[-Math.PI/2, 0, 0]} scale={itemScale} onClick={handleClick}>
          <ringGeometry args={[20, 35, 32]} />
          <meshBasicMaterial color={compColor} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Holographic Mini World Preview Diorama */}
        <group
          onPointerOver={(e) => { e.stopPropagation(); onHoverStart(); document.body.style.cursor = 'pointer'; }}
          onPointerOut={(e) => { e.stopPropagation(); onHoverEnd(); document.body.style.cursor = 'auto'; }}
          onClick={handleClick}
        >
          {renderIcon()}
          
          {/* Hit box for reliable clicking and hovering over complex groups */}
          <mesh position={[0, -10, 0]} onClick={handleClick}>
            <sphereGeometry args={[70, 16, 16]} />
            <meshBasicMaterial colorWrite={false} depthWrite={false} />
          </mesh>
        </group>
      </group>
      
      {/* Label */}
      <Html 
        position={[0, -50 * itemScale, 0]} 
        center 
        zIndexRange={[50, 50]}
        wrapperClass="mini-world-label"
      >
        <div 
          onPointerEnter={(e) => { e.stopPropagation(); onHoverStart(); document.body.style.cursor = 'pointer'; }}
          onPointerLeave={(e) => { e.stopPropagation(); onHoverEnd(); document.body.style.cursor = 'auto'; }}
          onClick={handleClick}
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            opacity: isHovered ? 0.35 : (isDimmed ? 0.25 : 1),
            transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            whiteSpace: 'nowrap',
            pointerEvents: 'auto'
          }}
        >
          <div style={{
            color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
            fontFamily: "'Space Grotesk', 'Inter', -apple-system, sans-serif",
            fontSize: '14px',
            fontWeight: '800',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textShadow: isHovered 
              ? `0 0 16px ${color}, 0 2px 10px rgba(0,0,0,0.9)` 
              : '0px 2px 10px rgba(0,0,0,0.8)',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}>
            {name}
          </div>
        </div>
      </Html>

      {/* Inward Radial Popup Card */}
      {description && isHovered && (
        <Html 
          position={[inwardX * 105, inwardY * 105, 40]} 
          center 
          zIndexRange={[99999999, 99999999]}
          wrapperClass="mini-world-wrapper hovered-world"
        >
          <div 
            ref={containerRef}
            className="mini-world-card"
            onPointerEnter={(e) => { e.stopPropagation(); onHoverStart(); document.body.style.cursor = 'pointer'; }}
            onPointerLeave={(e) => { e.stopPropagation(); onHoverEnd(); document.body.style.cursor = 'auto'; }}
            onClick={handleClick}
            style={{
              width: '260px',
              padding: '14px 18px',
              background: 'linear-gradient(135deg, rgba(8, 14, 28, 0.98) 0%, rgba(4, 7, 16, 0.99) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '14px',
              border: `1.5px solid ${color}88`,
              boxShadow: `0 16px 45px rgba(0, 0, 0, 0.95), 0 0 30px ${color}44`,
              cursor: 'pointer',
              userSelect: 'none',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              animation: 'popupFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 99999999,
              pointerEvents: 'auto',
              position: 'relative'
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: color,
                textTransform: 'uppercase',
                textShadow: `0 0 10px ${color}aa`,
                marginBottom: '2px',
                pointerEvents: 'none'
              }}>
                {name}
              </div>
              {summary && (
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.35,
                  letterSpacing: '0.01em',
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                  pointerEvents: 'none'
                }}>
                  {summary}
                </div>
              )}
              <div style={{
                fontSize: '12px',
                lineHeight: 1.5,
                color: '#e2e8f0',
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontWeight: 400,
                letterSpacing: '0.01em',
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                pointerEvents: 'none'
              }}>
                {description}
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: color,
                textTransform: 'uppercase',
                textShadow: `0 0 10px ${color}aa`,
                marginTop: '4px',
                pointerEvents: 'none'
              }}>
                <span>ENTER WORLD</span>
                <span style={{ fontSize: '11px' }}>→</span>
              </div>
          </div>
        </Html>
      )}
    </group>
  );
};

export const getPrimitiveLogo = (name, color, hovered) => {
  // Inner core glow intensity
  const glow = hovered ? 2.5 : 1.5;
  // Holographic outer energy shell: additive blending ensures it is luminous but perfectly see-through
  const outerMat = <meshStandardMaterial 
    color={color} 
    transparent 
    opacity={0.4} 
    emissive={color} 
    emissiveIntensity={0.5} 
    blending={THREE.AdditiveBlending}
    depthWrite={false} 
    side={THREE.DoubleSide} 
  />;
  // Solid glowing inner core material
  const innerMat = <meshStandardMaterial color={color} emissive={color} emissiveIntensity={glow} />;

  const outerMatHighContrast = <meshStandardMaterial 
    color={color} 
    transparent 
    opacity={0.15} 
    emissive={color} 
    emissiveIntensity={0.2} 
    blending={THREE.AdditiveBlending}
    depthWrite={false} 
    side={THREE.DoubleSide} 
  />;
  const innerMatHighContrast = <meshStandardMaterial color={color} emissive={color} emissiveIntensity={glow * 2.5} />;

  switch(name) {
    case 'Elevate':
    case 'Elevation': return <group scale={0.5} rotation={[0.8, 0.5, 0]}><mesh position={[0, -10, 0]}><coneGeometry args={[30, 40, 4]} />{outerMat}</mesh><mesh position={[0, 10, 0]}><sphereGeometry args={[5, 16, 16]} />{innerMat}</mesh></group>;
    case 'Sphinx': return <group scale={0.72} rotation={[0.8, 0.5, 0]}><mesh position={[0, -5, 0]}><boxGeometry args={[30, 10, 40]} />{outerMatHighContrast}</mesh><mesh position={[0, 5, 10]}><sphereGeometry args={[10, 16, 16]} />{innerMatHighContrast}</mesh></group>;
    case 'Pyramid':
    case 'PyRAmid': return <group scale={0.56} rotation={[0.8, 0.5, 0]}><mesh><cylinderGeometry args={[0, 30, 40, 4]} />{outerMat}</mesh><mesh position={[0, -5, 0]}><sphereGeometry args={[5, 16, 16]} />{innerMat}</mesh></group>;
    case 'Maya': return <group scale={0.72} rotation={[0.9, 0.4, 0]}><mesh position={[0, -10, 0]}><cylinderGeometry args={[20, 20, 2, 32]} />{outerMat}</mesh><mesh position={[0, 0, 0]}><sphereGeometry args={[6, 16, 16]} />{innerMat}</mesh><mesh position={[-12, -5, 0]}><boxGeometry args={[10, 10, 10]} />{outerMat}</mesh><mesh position={[12, -5, 0]}><boxGeometry args={[10, 10, 10]} />{outerMat}</mesh></group>;
    case 'Matrix': return <group scale={0.54} rotation={[0.8, 0.5, 0]}><mesh><boxGeometry args={[30, 40, 30]} />{outerMatHighContrast}</mesh><mesh scale={0.8}><boxGeometry args={[30, 40, 30]} />{innerMatHighContrast}</mesh></group>;
    case 'Liquid': return <group scale={0.9} rotation={[0.6, 0.3, 0]}><mesh><sphereGeometry args={[15, 32, 32]} />{outerMatHighContrast}</mesh><mesh scale={0.7}><sphereGeometry args={[15, 16, 16]} />{innerMatHighContrast}</mesh></group>;
    case 'LightSpeed': return <group scale={0.7} rotation={[0.8, 0.5, 0]}><mesh rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[15, 15, 40, 16]} />{outerMat}</mesh><mesh><octahedronGeometry args={[5]} />{innerMat}</mesh></group>;
    
    case 'MindWave': return <group scale={0.8} rotation={[0.8, 0.4, 0]}><mesh><icosahedronGeometry args={[20, 1]} />{outerMat}</mesh><mesh scale={0.6}><icosahedronGeometry args={[20, 1]} />{innerMat}</mesh></group>;
    case 'Icebreaker': return <group scale={0.7} rotation={[0.8, 0.5, 0]}><mesh><dodecahedronGeometry args={[18, 0]} />{outerMat}</mesh><mesh scale={0.6}><octahedronGeometry args={[18]} />{innerMat}</mesh></group>;
    case 'Interstellar': return <group scale={0.5} rotation={[0.8, 0.6, 0]}><mesh><torusKnotGeometry args={[15, 5, 100, 16]} />{outerMat}</mesh></group>;
    case 'Legal Eagle': return <group scale={0.8} rotation={[0.8, 0.5, 0]}><mesh><boxGeometry args={[20, 30, 20]} />{outerMat}</mesh><mesh scale={0.6}><boxGeometry args={[20, 30, 20]} />{innerMat}</mesh></group>;
    case 'Autopilot': return <group scale={0.6} rotation={[0.8, 0.4, 0]}><mesh rotation={[Math.PI/2, 0, 0]}><coneGeometry args={[15, 40, 3]} />{outerMat}</mesh><mesh rotation={[Math.PI/2, 0, 0]} position={[0, -10, 0]}><sphereGeometry args={[8, 16, 16]} />{innerMat}</mesh></group>;
    case 'CloveH2O': return <group scale={0.8} rotation={[0.8, 0.4, 0]}><mesh><sphereGeometry args={[20, 16, 16]} />{outerMat}</mesh><mesh><sphereGeometry args={[10, 16, 16]} />{innerMat}</mesh></group>;
    case 'FantasyQuant': return <group scale={0.8} rotation={[0.8, 0.5, 0]}><mesh rotation={[Math.PI/4, 0, 0]}><cylinderGeometry args={[10, 10, 40, 16]} />{outerMatHighContrast}</mesh><mesh><sphereGeometry args={[6, 16, 16]} />{innerMatHighContrast}</mesh></group>;
    case 'Contango': return <group scale={0.8} rotation={[0.8, 0.5, 0]}><mesh><dodecahedronGeometry args={[20, 0]} />{outerMat}</mesh><mesh scale={0.6}><dodecahedronGeometry args={[20, 0]} />{innerMat}</mesh></group>;
    case 'Sentaient': return <group scale={0.6} rotation={[0.8, 0.4, 0]}><mesh><torusGeometry args={[20, 5, 16, 32]} />{outerMat}</mesh><mesh><sphereGeometry args={[10, 16, 16]} />{innerMat}</mesh></group>;
    
    default: return <group><mesh><sphereGeometry args={[15, 16, 16]} />{outerMat}</mesh><mesh scale={0.6}><sphereGeometry args={[15, 16, 16]} />{innerMat}</mesh></group>;
  }
};

export const WORLDS_DATA = [
  { name: 'Sentaient', startP: 0.485, p: 0.50, endP: 0.51, color: '#60A9FF', ringColor: '#FF8800', logoUrl: '/sentaient_logo_final.png', logoScale: [1.692, 0.315], summary: 'Real-World Social Network & Connection OS', description: 'Bridge digital presence into meaningful physical reality. Discover nearby kindred spirits, spontaneous meetups, and real-world community.' },
  { name: 'CloveH2O', startP: 0.32, p: 0.36, endP: 0.37, color: '#00D2FF', ringColor: '#FF4081', logoUrl: '/cloveh2o_logo.png', logoScale: [1.0, 1.0], summary: 'Smart Hydration & Cellular Wellness Tracking', description: 'Optimize biological performance with precision hydration monitoring, electrolyte balance telemetry, and personalized wellness analytics.' },
  { name: 'MindWave', startP: 0.02, p: 0.040, endP: 0.06, color: '#4AA1FE', ringColor: '#FF2A6D', logoUrl: '/mindwave-logo-light.png', logoScale: [1.0, 1.0], summary: 'Brainwave Entrainment & Sound Healing Studio', description: 'Harmonize mental states with scientifically engineered binaural frequencies, theta soundscapes, and immersive sensory visualizations.' },
  { name: 'Icebreaker', startP: 0.10, p: 0.135, endP: 0.16, color: '#00F0FF', ringColor: '#FF6600', logoUrl: '/icebreaker_logo.png', logoScale: [1.0, 1.0], summary: 'Real Content. Real Human Connections.', description: 'Thaw the social ice. Transform superficial online interactions into vibrant, authentic real-world connections and spontaneous events.' },
  { name: 'Interstellar', startP: 0.16, p: 0.21, endP: 0.22, color: '#FF3F00', ringColor: '#00FFFF', logoUrl: '/interstellar_logo_final.png', logoScale: [1.17, 1.17], summary: 'Galactic Strategy & Space Conquest', description: 'Command deep-space starfleets, conquer uncharted solar systems, extract stellar resources, and build an invincible galactic empire.' },
  { name: 'Elevate', startP: 0.520, p: 0.550, endP: 0.570, color: '#38BDF8', ringColor: '#FF8000', logoUrl: '/elevate_logo_final.png', logoScale: [1.365, 0.81], summary: 'Alpine AI & Action Sports Survival OS', description: 'Conquer the mountain with real-time alpine telemetry, avalanche survival radar, AI gear optimization, and 4K GoPro action highlight sync.' },
  { name: 'FantasyQuant', startP: 0.37, p: 0.42, endP: 0.43, color: '#00E676', ringColor: '#FFD700', logoUrl: '/fantasyquant_wizard_bright.png', logoScale: [0.75, 1.0], summary: 'Sports Betting Intelligence & Quantitative Edge', description: 'Gain a mathematical advantage with algorithmic sports modeling, real-time odds discrepancies, and predictive simulation engines.' },
  { name: 'Sphinx', startP: 0.580, p: 0.60, endP: 0.62, color: '#F59E0B', ringColor: '#00D2FF', logoUrl: '/sphinx_logo_final.png', logoScale: [1.142, 0.9], summary: 'Global Threat Intelligence & Unified Security', description: 'Protect assets worldwide with real-time natural disaster tracking, geopolitical threat monitoring, and centralized perimeter security.' },
  { name: 'Legal Eagle', startP: 0.23, p: 0.255, endP: 0.265, color: '#A855F7', ringColor: '#FBBF24', logoUrl: '/legal_eagle_logo.png', logoScale: [1.032, 1.0], summary: 'Autonomous AI Legal Intelligence & Contract Defense', description: 'Audit contracts in seconds with eagle-eyed AI precision. Detect hidden liabilities, mitigate legal risks, and auto-draft favorable clauses.' },
  { name: 'Maya', startP: 0.705, p: 0.725, endP: 0.745, color: '#818CF8', ringColor: '#FB7185', logoUrl: '/maya_logo_final.png', logoScale: [1.222, 1.0], summary: 'Empathetic AI Avatar & 24/7 Enterprise Representative', description: 'Engage customers around the clock with life-like conversational AI avatars for autonomous sales, compassionate support, and personal growth.' },
  { name: 'LightSpeed', startP: 0.910, p: 0.93, endP: 0.99, color: '#00A3FF', ringColor: '#FFC800', logoUrl: '/lightspeed_logo_gold.png', logoScale: [0.829, 1.0], summary: 'Autonomous AI CTO & Enterprise Cyber-Defense', description: 'Deploy a self-healing cloud infrastructure protected by zero-trust cyber defense, sub-10ms global edge routing, and 99.999% SLA uptime.' },
  { name: 'Liquid', startP: 0.645, p: 0.665, endP: 0.685, color: '#00FF88', ringColor: '#A855F7', logoUrl: '/liquid_logo_final.png', logoScale: [1.0, 1.0], summary: 'Autonomous Accounting, Tax Intelligence & Token Forge', description: 'Distill enterprise financial complexity into instant clarity with automated tax liability calculation, live P&L auditing, and smart token minting.' },
  { name: 'Contango', startP: 0.44, p: 0.47, endP: 0.475, color: '#22C55E', ringColor: '#FF7A00', logoUrl: '/assets/images/contango_quant_logo_new.png', logoScale: [1.0, 0.526], summary: 'Algorithmic Trading & High-Frequency Market Intelligence', description: 'Master market volatility with automated quant strategies, order book microstructure analytics, and macro liquidity tracking.' },
  { name: 'PyRAmid', startP: 0.770, p: 0.79, endP: 0.82, color: '#00E5FF', ringColor: '#C084FC', logoUrl: '/pyramid_logo_final.png', logoScale: [1.005, 1.0], summary: 'Autonomous Business Ops Brain & Strategic Execution', description: 'Harness an AI executive that scans markets for high-margin opportunities, designs end-to-end strategic playbooks, and executes autonomously.' },
  { name: 'Matrix', startP: 0.840, p: 0.865, endP: 0.900, color: '#00FF44', ringColor: '#D946EF', logoUrl: '/matrix_logo_bright.png', logoScale: [1.522, 0.363], summary: 'Autonomous AI Software Engineering & Research Lab', description: 'Accelerate technical velocity with an autonomous AI developer collective that writes verified production code, refactors systems, and conducts deep debugging.' },
  { name: 'Autopilot', startP: 0.275, p: 0.30, endP: 0.31, color: '#10B981', ringColor: '#FF3366', logoUrl: '/autopilot_logo.png', logoScale: [1.4, 0.766], summary: 'Enterprise Social Media Marketing Automation', description: 'Automate multi-channel brand growth with AI-driven content generation, scheduled omnichannel publishing, and predictive audience engagement.' }
];

export default function MiniWorldsHub() {
  const scroll = useScroll();
  const groupRef = useRef();
  const [hoveredWorld, setHoveredWorld] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const handleHoverStart = (name) => {
    if (hoverTimeoutRef.current) { clearTimeout(hoverTimeoutRef.current); hoverTimeoutRef.current = null; }
    setHoveredWorld(name);
  };
  const handleHoverEnd = (name) => {
    if (hoverTimeoutRef.current) { clearTimeout(hoverTimeoutRef.current); }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredWorld((curr) => (curr === name ? null : curr));
    }, 220);
  };
  
  const [winSize, setWinSize] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800
  }));
  const lastSizeRef = useRef({ w: 0, h: 0 });
  useEffect(() => {
    const onResize = () => setWinSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const worlds = WORLDS_DATA;

  useFrame(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth, h = window.innerHeight;
      if (w !== lastSizeRef.current.w || h !== lastSizeRef.current.h) {
        lastSizeRef.current = { w, h };
        setWinSize({ w, h });
      }
    }
    if (groupRef.current) groupRef.current.visible = scroll.offset < 0.05;
  });

  const curW = winSize.w || 1200, curH = winSize.h || 800;
  const visibleH = 2 * 510 * Math.tan((75 * Math.PI / 180) / 2);
  const visibleW = visibleH * (curW / (curH || 1));
  const headerWorldH = visibleH * (64 / curH);
  const safeMarginY = Math.max(headerWorldH + 25, 80);
  const hubCenterY = 0;
  const dynamicRadius = Math.min((visibleW * 0.86) / 2, (visibleH / 2) - safeMarginY) * 0.92;
  const itemScale = Math.max(0.65, Math.min(1.05, dynamicRadius / 280));
  
  const numWorlds = worlds.length;

  return (
    // Group centered dynamically in available safe vertical space below header
    <group ref={groupRef} position={[0, hubCenterY, -500]}>
      <pointLight position={[0, 0, 100]} intensity={2} color="#ffffff" />
      
      {worlds.map((w, idx) => {
        // Distribute worlds in a perfect ellipse/oval around the screen perimeter
        // This guarantees "mid left" and "mid right" placement, perfectly uses window sides,
        // and physically cannot be cut off at the bottom because it's strictly bounded by availableHeight/2.
        
        const progress = idx / numWorlds;
        
        // Offset by Math.PI/2 so the first item starts at top-center, proceeding clockwise
        const angle = progress * Math.PI * 2 + Math.PI / 2;
        
        const x = Math.cos(angle) * dynamicRadius;
        const y = Math.sin(angle) * dynamicRadius;
        
        // Keep Z flat. 
        const z = 0;
        
        return (
          <MiniWorld 
            key={w.name}
            name={w.name}
            color={w.color}
            ringColor={w.ringColor}
            startP={w.startP}
            targetP={w.p}
            endP={w.endP}
            logoUrl={w.logoUrl}
            logoScale={w.logoScale}
            summary={w.summary}
            description={w.description}
            position={[x, y, z]}
            scrollEl={scroll.el}
            hoveredWorld={hoveredWorld}
            itemScale={itemScale}
            onHoverStart={() => handleHoverStart(w.name)}
            onHoverEnd={() => handleHoverEnd(w.name)}
          />
        );
      })}
    </group>
  );
}
