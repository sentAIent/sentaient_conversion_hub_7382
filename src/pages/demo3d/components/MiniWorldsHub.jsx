import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import ToroidalSentaientCore from './ToroidalSentaientCore';

const LogoMesh = ({ url, scaleX, scaleY }) => {
  const texture = useTexture(url);
  return (
    <mesh scale={[70 * scaleX, 70 * scaleY, 1]} position={[0, 0, 2]} renderOrder={100}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={true} alphaTest={0.05} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
};

let _sharedGlowTex = null;
const getHolographicGlowTexture = () => {
  if (_sharedGlowTex) return _sharedGlowTex;
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.95)');
  grad.addColorStop(0.50, 'rgba(255, 255, 255, 0.60)');
  grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.22)');
  grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  _sharedGlowTex = new THREE.CanvasTexture(canvas);
  return _sharedGlowTex;
};

const MiniWorld = ({ position, name, color, ringColor, startP, targetP, endP, scrollEl, logoUrl, logoScale = 1.578, summary, description, hoveredWorld, onHoverStart, onHoverEnd, itemScale = 1.0, safeMaxCardY = 145, safeMinCardY = -185, glowMultiplier = 1.0, hoverGlowMultiplier, coreGlowColor, glowColor }) => {
  const meshRef = useRef();
  const glowGroupRef = useRef();
  const containerRef = useRef();
  const isHovered = hoveredWorld === name;
  const isDimmed = hoveredWorld !== null && !isHovered;
  const hoverGlow = isHovered ? (hoverGlowMultiplier !== undefined ? hoverGlowMultiplier : ((name === 'Matrix' || name === 'Contango') ? 0.87 : 1.0)) : 1.0;
  
  // Position card popup off to the side (outside the ring, never on top of the logos)
  const isRightSide = position[0] >= 0;
  const sideSign = isRightSide ? 1 : -1;
  const cardOffsetX = sideSign * (130 + 55 * itemScale + 25);
  // Strictly clamp Y so cards at the top and bottom never render off-screen or behind the header
  const targetCardY = Math.max(safeMinCardY, Math.min(safeMaxCardY, position[1]));
  const cardOffsetY = targetCardY - position[1];

  const glowTexture = useMemo(() => getHolographicGlowTexture(), []);
  const scaleX = Array.isArray(logoScale) ? logoScale[0] : (typeof logoScale === 'number' ? logoScale : 1.0);
  const scaleY = Array.isArray(logoScale) ? logoScale[1] : 1.0;
  const baseDim = 74 * itemScale;
  const glowRadiusScale = name === 'Legal Eagle' ? 1.20 : 1.0;
  const glowW = baseDim * Math.min(1.25, Math.max(0.85, scaleX)) * glowRadiusScale;
  const glowH = baseDim * Math.min(1.25, Math.max(0.85, scaleY)) * glowRadiusScale;

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      let el = containerRef.current.parentElement;
      while (el && el !== document.body) {
        if (el.classList && el.classList.contains('mini-world-wrapper')) {
          el.style.setProperty('z-index', isHovered ? '99999999' : '50', 'important');
          el.style.setProperty('pointer-events', isHovered ? 'auto' : 'none', 'important');
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

      // Keep camera-facing holographic glow aura locked in vertical bobbing & hover scale
      if (glowGroupRef.current) {
        glowGroupRef.current.position.y = meshRef.current.position.y;
        glowGroupRef.current.scale.copy(meshRef.current.scale);
      }
    }
  });

  const handleClick = (e) => {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    if (window._goToStation || window.directTeleportTo) {
      let targetIdx = window.STATIONS ? window.STATIONS.findIndex(s => s.name.toLowerCase() === name.toLowerCase()) : -1;
      if (targetIdx === -1 && window.STATIONS) {
        targetIdx = window.STATIONS.findIndex(s => Math.abs(s.p - (targetP || 0)) < 0.03);
      }
      if (targetIdx !== -1) {
        if (window.directTeleportTo) {
          window.directTeleportTo(targetIdx);
        } else {
          window._goToStation(targetIdx, 1350);
        }
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

  return (
    <group position={position}>
      {/* Camera-Facing Pronounced Holographic Glow Aura (Remains behind logo throughout 360° spin) */}
      <group ref={glowGroupRef} position={[0, 0, -2]} renderOrder={20}>
        {glowTexture && (
          <>
            {/* Layer 1: Core Backlight (Brand tinted) */}
            <mesh scale={[glowW * 1.3, glowH * 1.3, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial
                map={glowTexture}
                color={coreGlowColor || glowColor || (name === 'MindWave' ? '#38bdf8' : (name === 'Icebreaker' ? '#FFAA33' : (name === 'Contango' ? '#FFE066' : (name === 'Interstellar' ? '#38bdf8' : (name === 'Liquid' ? '#55FFAA' : color)))))}
                transparent
                opacity={(isHovered ? 0.45 : (isDimmed ? 0.12 : 0.28)) * glowMultiplier * hoverGlow}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>

            {/* Layer 2: Vibrant Brand-Color Holographic Aura */}
            <mesh scale={[glowW * 1.85, glowH * 1.85, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial
                map={glowTexture}
                color={glowColor || (name === 'Icebreaker' ? '#FF6600' : (name === 'Contango' ? '#FFD700' : (name === 'Interstellar' ? '#00D2FF' : (name === 'Liquid' ? '#00FF88' : color))))}
                transparent
                opacity={(isHovered ? 0.55 : (isDimmed ? 0.15 : 0.35)) * glowMultiplier * hoverGlow}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>

            {/* Layer 3: Atmospheric Deep Halo */}
            <mesh scale={[glowW * 2.5, glowH * 2.5, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial
                map={glowTexture}
                color={glowColor || (name === 'Icebreaker' ? '#FF5500' : (name === 'Contango' ? '#F59E0B' : (name === 'Interstellar' ? '#0284C7' : (name === 'Liquid' ? '#059669' : color))))}
                transparent
                opacity={(isHovered ? 0.25 : (isDimmed ? 0.06 : 0.16)) * glowMultiplier * hoverGlow}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </>
        )}
      </group>

      <group ref={meshRef} onClick={handleClick} position={[0, 0, 2]}>
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
      

      {/* Lateral Outer Popup Card (Off to the side, outside the ring, never on top of logos) */}
      {description && isHovered && (
        <Html 
          position={[cardOffsetX, cardOffsetY, 40]} 
          center 
          zIndexRange={[99999999, 99999999]}
          wrapperClass="mini-world-wrapper hovered-world"
        >
          <div 
            ref={containerRef}
            className="mini-world-card"
            onMouseEnter={(e) => { e.stopPropagation(); onHoverStart(); document.body.style.cursor = 'pointer'; }}
            onMouseLeave={(e) => { e.stopPropagation(); onHoverEnd(); document.body.style.cursor = 'auto'; }}
            onPointerEnter={(e) => { e.stopPropagation(); onHoverStart(); document.body.style.cursor = 'pointer'; }}
            onPointerLeave={(e) => { e.stopPropagation(); onHoverEnd(); document.body.style.cursor = 'auto'; }}
            onClick={handleClick}
            style={{
              width: '290px',
              padding: '16px 20px',
              background: 'linear-gradient(135deg, rgba(8, 14, 28, 0.98) 0%, rgba(4, 7, 16, 0.99) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '14px',
              border: `1.5px solid ${color}88`,
              boxShadow: `0 16px 45px rgba(0, 0, 0, 0.95), 0 0 30px ${color}44`,
              cursor: 'pointer',
              userSelect: 'none',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '7px',
              animation: 'popupFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 99999999,
              pointerEvents: 'auto',
              position: 'relative'
            }}>
            {/* Seamless hover bridge so mouse never loses focus when moving between logo and card */}
            <div
              style={{
                position: 'absolute',
                top: '-25px',
                bottom: '-25px',
                left: isRightSide ? '-60px' : 'auto',
                right: !isRightSide ? '-60px' : 'auto',
                width: '65px',
                pointerEvents: 'auto',
                background: 'transparent'
              }}
              onMouseEnter={(e) => { e.stopPropagation(); onHoverStart(); }}
              onPointerEnter={(e) => { e.stopPropagation(); onHoverStart(); }}
            />
              <div style={{
                fontSize: '13px',
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
                  fontSize: '14.5px',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.4,
                  letterSpacing: '0.01em',
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                  pointerEvents: 'none'
                }}>
                  {summary}
                </div>
              )}
              <div style={{
                fontSize: '13.5px',
                lineHeight: 1.55,
                color: '#e2e8f0',
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontWeight: 400,
                letterSpacing: '0.01em',
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                pointerEvents: 'none'
              }}>
                {description}
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
    
    case 'MindWave': return <group scale={0.96} rotation={[0.8, 0.4, 0]}><mesh><icosahedronGeometry args={[20, 1]} />{outerMat}</mesh><mesh scale={0.6}><icosahedronGeometry args={[20, 1]} />{innerMat}</mesh></group>;
    case 'Icebreaker': return <group scale={0.7} rotation={[0.8, 0.5, 0]}><mesh><dodecahedronGeometry args={[18, 0]} />{outerMat}</mesh><mesh scale={0.6}><octahedronGeometry args={[18]} />{innerMat}</mesh></group>;
    case 'Interstellar': return <group scale={0.5} rotation={[0.8, 0.6, 0]}><mesh><torusKnotGeometry args={[15, 5, 100, 16]} />{outerMat}</mesh></group>;
    case 'Legal Eagle': return <group scale={0.8} rotation={[0.8, 0.5, 0]}><mesh><boxGeometry args={[20, 30, 20]} />{outerMat}</mesh><mesh scale={0.6}><boxGeometry args={[20, 30, 20]} />{innerMat}</mesh></group>;
    case 'Autopilot': return <group scale={0.6} rotation={[0.8, 0.4, 0]}><mesh rotation={[Math.PI/2, 0, 0]}><coneGeometry args={[15, 40, 3]} />{outerMat}</mesh><mesh rotation={[Math.PI/2, 0, 0]} position={[0, -10, 0]}><sphereGeometry args={[8, 16, 16]} />{innerMat}</mesh></group>;
    case 'CloveH2O': return <group scale={0.96} rotation={[0.8, 0.4, 0]}><mesh><sphereGeometry args={[20, 16, 16]} />{outerMat}</mesh><mesh><sphereGeometry args={[10, 16, 16]} />{innerMat}</mesh></group>;
    case 'FantasyQuant': return <group scale={0.8} rotation={[0.8, 0.5, 0]}><mesh rotation={[Math.PI/4, 0, 0]}><cylinderGeometry args={[10, 10, 40, 16]} />{outerMatHighContrast}</mesh><mesh><sphereGeometry args={[6, 16, 16]} />{innerMatHighContrast}</mesh></group>;
    case 'Contango': return <group scale={0.8} rotation={[0.8, 0.5, 0]}><mesh><dodecahedronGeometry args={[20, 0]} />{outerMat}</mesh><mesh scale={0.6}><dodecahedronGeometry args={[20, 0]} />{innerMat}</mesh></group>;
    case 'Sentaient': return <group scale={0.6} rotation={[0.8, 0.4, 0]}><mesh><torusGeometry args={[20, 5, 16, 32]} />{outerMat}</mesh><mesh><sphereGeometry args={[10, 16, 16]} />{innerMat}</mesh></group>;
    
    default: return <group><mesh><sphereGeometry args={[15, 16, 16]} />{outerMat}</mesh><mesh scale={0.6}><sphereGeometry args={[15, 16, 16]} />{innerMat}</mesh></group>;
  }
};

export const WORLDS_DATA = [
  { name: 'Sentaient', startP: 0.485, p: 0.505, endP: 0.525, color: '#60A9FF', ringColor: '#FF8800', logoUrl: '/sentaient_logo_final.png', logoScale: [1.692, 0.315], summary: 'Autonomous AI Venture Studio & Multi-Industry Revenue Engines', description: 'The foundational intelligence nexus engineering proprietary autonomous platforms across FinTech, LegalTech, Health & BioTech, Defense, and Enterprise Cloud.' },
  { name: 'CloveH2O', startP: 0.32, p: 0.36, endP: 0.37, color: '#00D2FF', ringColor: '#FF4081', logoUrl: '/cloveh2o_logo.png', logoScale: [1.584, 1.584], glowMultiplier: 1.265, summary: 'Antioxidant-Rich Clove-Infused Functional Beverage', description: 'Experience the restorative power of pure botanical hydration. Naturally infused with whole organic cloves and bioactive eugenol to supercharge digestive vitality, reduce inflammation, and enhance cellular recovery.' },
  { name: 'MindWave', startP: 0.02, p: 0.038, endP: 0.06, color: '#38BDF8', ringColor: '#FF2A6D', logoUrl: '/mindwave-ring-logo.png', logoScale: [1.555, 1.555], coreGlowColor: '#38BDF8', glowMultiplier: 1.265, summary: 'Brainwave Entrainment & Sound Healing Studio', description: 'Harmonize mental states with scientifically engineered binaural frequencies, theta soundscapes, and immersive sensory visualizations.' },
  { name: 'Icebreaker', startP: 0.10, p: 0.135, endP: 0.16, color: '#00F0FF', glowColor: '#FF6600', coreGlowColor: '#FFAA33', glowMultiplier: 1.265, ringColor: '#FF6600', logoUrl: '/icebreaker_logo.png', logoScale: [1.0, 1.0], summary: 'Real Content. Real Human Connections.', description: 'Thaw the social ice. Transform superficial online interactions into vibrant, authentic real-world connections and spontaneous events.' },
  { name: 'Interstellar', startP: 0.16, p: 0.21, endP: 0.22, color: '#FF3F00', glowColor: '#00D2FF', coreGlowColor: '#38BDF8', glowMultiplier: 1.10, ringColor: '#00FFFF', logoUrl: '/interstellar_logo_final.png', logoScale: [1.287, 1.287], summary: 'Galactic Strategy & Space Conquest', description: 'Command deep-space starfleets, conquer uncharted solar systems, extract stellar resources, and build an invincible galactic empire.' },
  { name: 'Elevate', startP: 0.520, p: 0.550, endP: 0.570, color: '#38BDF8', ringColor: '#FF8000', logoUrl: '/elevate_logo_final.png', logoScale: [1.365, 0.81], glowMultiplier: 1.265, summary: '3D Freeride Snowboard Action with Live Mountain Weather, Snow Conditions & Gear Intelligence', description: 'Drop into high-stakes mountain freeriding with thrilling 3D snowboarding action, paired with a complete mountain companion that delivers real-time weather, live snowpack conditions, avalanche safety radar, and personalized gear optimization.' },
  { name: 'FantasyQuant', startP: 0.37, p: 0.42, endP: 0.43, color: '#00E676', ringColor: '#FFD700', logoUrl: '/fantasyquant_wizard_bright.png', logoScale: [0.825, 1.10], summary: 'Sports Betting Intelligence & Quantitative Edge', description: 'Gain a mathematical advantage with algorithmic sports modeling, real-time odds discrepancies, and predictive simulation engines.' },
  { name: 'Sphinx', startP: 0.580, p: 0.60, endP: 0.62, color: '#F59E0B', ringColor: '#00D2FF', logoUrl: '/sphinx_logo_final.png', logoScale: [1.142, 0.9], glowMultiplier: 1.265, summary: 'Global Threat Intelligence & Unified Security', description: 'Protect assets worldwide with real-time natural disaster tracking, geopolitical threat monitoring, and centralized perimeter security.' },
  { name: 'Maya', startP: 0.705, p: 0.725, endP: 0.745, color: '#818CF8', ringColor: '#FB7185', logoUrl: '/maya_logo_final.png', logoScale: [1.222, 1.0], glowMultiplier: 1.265, summary: 'Empathetic AI Avatar & 24/7 Enterprise Representative', description: 'Engage customers around the clock with life-like conversational AI avatars for autonomous sales, compassionate support, and personal growth.' },
  { name: 'Legal Eagle', startP: 0.23, p: 0.255, endP: 0.265, color: '#A855F7', ringColor: '#FBBF24', logoUrl: '/legal_eagle_logo.png', logoScale: [1.032, 1.0], glowMultiplier: 1.668, summary: 'Autonomous AI Legal Intelligence & Contract Defense', description: 'Audit contracts in seconds with eagle-eyed AI precision. Detect hidden liabilities, mitigate legal risks, and auto-draft favorable clauses.' },
  { name: 'LightSpeed', startP: 0.910, p: 0.93, endP: 0.99, color: '#00A3FF', ringColor: '#FFC800', logoUrl: '/lightspeed_logo_gold.png', logoScale: [0.829, 1.0], glowMultiplier: 1.39, summary: 'Autonomous AI CTO & Enterprise Cyber-Defense', description: 'Deploy a self-healing cloud infrastructure protected by zero-trust cyber defense, sub-10ms global edge routing, and 99.999% SLA uptime.' },
  { name: 'Liquid', startP: 0.645, p: 0.665, endP: 0.685, color: '#00FF88', glowColor: '#00FF88', coreGlowColor: '#55FFAA', ringColor: '#A855F7', logoUrl: '/liquid_logo_gold.png', logoScale: [1.25, 1.25], glowMultiplier: 0.765, summary: 'Autonomous Accounting, Tax Intelligence & Token Forge', description: 'Distill enterprise financial complexity into instant clarity with automated tax liability calculation, live P&L auditing, and smart token minting.' },
  { name: 'Contango', startP: 0.44, p: 0.47, endP: 0.475, color: '#22C55E', glowColor: '#FFD700', coreGlowColor: '#FFE066', ringColor: '#FF7A00', logoUrl: '/assets/images/contango_quant_logo_new.png', logoScale: [1.0, 0.526], hoverGlowMultiplier: 0.87, summary: 'Algorithmic Trading & High-Frequency Market Intelligence', description: 'Master market volatility with automated quant strategies, order book microstructure analytics, and macro liquidity tracking.' },
  { name: 'Pyramid', startP: 0.770, p: 0.79, endP: 0.82, color: '#00E5FF', ringColor: '#C084FC', logoUrl: '/pyramid_logo_final.png', logoScale: [1.1, 1.1], summary: 'Autonomous Profit Engine & Strategic Execution', description: 'Harness an AI executive that scans markets for high-margin opportunities, designs end-to-end strategic playbooks, and executes autonomously.' },
  { name: 'Matrix', startP: 0.840, p: 0.865, endP: 0.900, color: '#00FF44', ringColor: '#D946EF', logoUrl: '/matrix_logo_bright.png', logoScale: [1.522, 0.363], glowMultiplier: 0.90, hoverGlowMultiplier: 0.87, summary: 'Autonomous Production Code Generation, Full-Stack Architecture & Deep Technical Research', description: 'Accelerate technical velocity with an autonomous AI developer collective that writes verified production code, refactors complex codebases, and conducts deep end-to-end debugging—leveraging technical research capabilities to parse complex documentation and frontier frameworks.' },
  { name: 'Autopilot', startP: 0.275, p: 0.30, endP: 0.31, color: '#10B981', ringColor: '#FF3366', logoUrl: '/autopilot_logo.png', logoScale: [1.4, 0.766], glowMultiplier: 1.265, summary: 'Enterprise Social Media Marketing Automation', description: 'Automate multi-channel brand growth with AI-driven content generation, scheduled omnichannel publishing, and predictive audience engagement.' }
];

export default function MiniWorldsHub({ visible = true }) {
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
    }, 600);
  };
  
  const { size } = useThree();
  const worlds = useMemo(() => WORLDS_DATA.filter(w => w.name !== 'Sentaient'), []);

  // Canonical Hub camera frustum viewport at Z = -500 (home camera at Z = 10, FOV = 75)
  // Computing directly from screen aspect and canonical distance guarantees rock-solid stability
  // and completely prevents the ring from stretching out when returning to the main page.
  const aspect = size.width / (size.height || 1);
  const canonicalDistance = 510;
  const canonicalFov = 75;
  const visibleH = 2 * Math.tan(((canonicalFov * Math.PI) / 180) / 2) * canonicalDistance;
  const visibleW = visibleH * aspect;

  // Screen edge safety padding - generous clearance for top header (80px) and bottom launcher (60px)
  const safePadTop = 60;
  const safePadBottom = 80;
  const safePadX = 50;
  const maxRadiusY = (visibleH - (safePadTop + safePadBottom)) / 2;
  const maxRadiusX = (visibleW / 2) - safePadX;

  const dynamicRadius = Math.max(135, Math.min(maxRadiusX * 0.85, maxRadiusY * 0.88));
  const itemScale = Math.max(0.60, Math.min(1.00, dynamicRadius / 225));

  // Center ring vertically in safe zone between header and bottom launcher
  const hubCenterY = (safePadBottom - safePadTop) / 2;

  // Safe vertical bounds in 3D units so popup card is dynamically clamped and never cut off by header or bottom edge
  const screenH = size.height || 900;
  const safeTopPx = 80 + 15 + 140; // header (80px) + gap (15px) + card half-height (140px)
  const safeBottomPx = 65 + 15 + 140; // bottom launcher (65px) + gap (15px) + card half-height (140px)
  const safeMaxCardY = visibleH * (0.5 - safeTopPx / screenH);
  const safeMinCardY = visibleH * (safeBottomPx / screenH - 0.5);

  useFrame(() => {
    const p = (window._isTransitActive && window._warpProgress !== undefined) ? window._warpProgress : (scroll ? scroll.offset : 0);
    const shouldShow = visible && p < 0.025;
    if (groupRef.current) {
      groupRef.current.visible = shouldShow;
      groupRef.current.position.y = hubCenterY;
    }
  });

  if (!visible) return null;

  const numWorlds = worlds.length;

  const appPositions = worlds.map((w, idx) => {
    const progress = idx / numWorlds;
    const angle = progress * Math.PI * 2 + Math.PI / 2;
    return {
      name: w.name,
      x: Math.cos(angle) * dynamicRadius,
      y: Math.sin(angle) * dynamicRadius,
      color: w.color
    };
  });

  const ringBandWidth = 50 * itemScale;
  const ringInnerR = Math.max(10, dynamicRadius - ringBandWidth);
  const ringOuterR = dynamicRadius + ringBandWidth;

  return (
    // Group centered dynamically in available safe vertical space below header
    <group ref={groupRef} position={[0, hubCenterY, -500]}>
      <pointLight position={[0, 0, 100]} intensity={2} color="#ffffff" />

      {/* Central SentAIent Toroidal Field Core */}
      <ToroidalSentaientCore
        visible={visible}
        dynamicRadius={dynamicRadius}
        itemScale={itemScale}
        appPositions={appPositions}
        hoveredWorld={hoveredWorld}
        onClick={() => {
          if (window.directTeleportTo) {
            window.directTeleportTo(1);
          } else if (window._goToStation) {
            window._goToStation(1, 1350);
          }
        }}
      />
      
      {/* Darker Holographic Contrast Ring Behind Ring of Logos */}
      <group position={[0, 0, -8]}>
        {/* Soft Ambient Cyan/Navy Bloom */}
        <mesh position={[0, 0, -0.5]}>
          <ringGeometry args={[ringInnerR - 6, ringOuterR + 6, 128]} />
          <meshBasicMaterial
            color="#002244"
            transparent={true}
            opacity={0.4}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Primary Dark Obsidian Contrast Band */}
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[ringInnerR, ringOuterR, 128]} />
          <meshBasicMaterial
            color="#030712"
            transparent={true}
            opacity={0.82}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Outer Cyan Cyber Laser Rim */}
        <mesh position={[0, 0, 0.2]}>
          <ringGeometry args={[ringOuterR - 1.2, ringOuterR + 1.2, 128]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent={true}
            opacity={0.5}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Inner Electric Blue Cyber Laser Rim */}
        <mesh position={[0, 0, 0.2]}>
          <ringGeometry args={[ringInnerR - 1.2, ringInnerR + 1.2, 128]} />
          <meshBasicMaterial
            color="#0088ff"
            transparent={true}
            opacity={0.5}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Subtle Central Orbit Track Wire */}
        <mesh position={[0, 0, 0.1]}>
          <ringGeometry args={[dynamicRadius - 0.6, dynamicRadius + 0.6, 128]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.16}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
      
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
            glowColor={w.glowColor}
            coreGlowColor={w.coreGlowColor}
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
            safeMaxCardY={safeMaxCardY}
            safeMinCardY={safeMinCardY}
            glowMultiplier={w.glowMultiplier !== undefined ? w.glowMultiplier : 1.0}
            hoverGlowMultiplier={w.hoverGlowMultiplier}
            onHoverStart={() => handleHoverStart(w.name)}
            onHoverEnd={() => handleHoverEnd(w.name)}
          />
        );
      })}
    </group>
  );
}
