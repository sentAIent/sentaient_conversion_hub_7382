import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, ScrollControls, Scroll, useScroll, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

const HUDLogoMesh = ({ url, scale }) => {
  const texture = useTexture(url);
  const s = Array.isArray(scale) ? [scale[0], scale[1], 1] : [scale, scale, 1];
  return (
    <mesh scale={s}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={false} alphaTest={0.5} depthWrite side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
};
import { CameraController, TimelineManager } from '../TimelineManager';
import { useWaypointControls } from '../navigation/WaypointNavigator';
import { WORLDS_DATA, getPrimitiveLogo } from './MiniWorldsHub';
import * as THREE from 'three';

const FloatingHUDLogo = () => {
  return null;
};

const WORLD_CONFIG = {
  'MindWave': {
    category: 'NEURAL FREQUENCIES & AUDIO LAB',
    index: '01 / 16',
    posStyle: { top: '80px', left: '44px', bottom: 'auto', right: 'auto', transform: 'none' },
    tags: ['Binaural Engine', 'Theta States', 'Sound Healing']
  },
  'Icebreaker': {
    category: 'AUTHENTIC SOCIAL CONNECTION OS',
    index: '02 / 16',
    posStyle: { bottom: '40px', left: '44px', top: 'auto', right: 'auto', transform: 'none' },
    tags: ['Real-World Match', 'Dynamic Hangouts', 'Zero Catfishing']
  },
  'Interstellar': {
    category: 'GALACTIC STRATEGY & DEEP-SPACE RTS',
    index: '03 / 16',
    posStyle: { top: '80px', right: '44px', bottom: 'auto', left: 'auto', transform: 'none' },
    tags: ['Starfleet Fleet', 'Planetary Conquest', 'Warp Telemetry']
  },
  'Legal Eagle': {
    category: 'AUTONOMOUS AI LEGAL COUNSEL',
    index: '04 / 16',
    posStyle: { top: '50%', left: '44px', bottom: 'auto', right: 'auto', transform: 'translateY(-50%)' },
    tags: ['Liability Audit', 'Automated Defense', 'Risk Mitigation']
  },
  'Autopilot': {
    category: 'ENTERPRISE SOCIAL MARKETING AGENT',
    index: '05 / 16',
    posStyle: { top: '50%', right: '44px', bottom: 'auto', left: 'auto', transform: 'translateY(-50%)' },
    tags: ['Omnichannel Sync', 'Predictive Virality', 'Audience Scaling']
  },
  'CloveH2O': {
    category: 'CELLULAR WELLNESS & HYDRATION OS',
    index: '06 / 16',
    posStyle: { bottom: '40px', right: '44px', top: 'auto', left: 'auto', transform: 'none' },
    tags: ['Precision Osmosis', 'Electrolyte Balance', 'Vitality Score']
  },
  'FantasyQuant': {
    category: 'QUANTITATIVE SPORTS INTELLIGENCE',
    index: '07 / 16',
    posStyle: { top: '80px', left: '44px', bottom: 'auto', right: 'auto', transform: 'none' },
    tags: ['Algorithmic Edge', 'Odds Arbitrage', 'Simulation Engine']
  },
  'Contango': {
    category: 'HIGH-FREQUENCY MARKET INTELLIGENCE',
    index: '08 / 16',
    posStyle: { bottom: '40px', left: '44px', top: 'auto', right: 'auto', transform: 'none' },
    tags: ['Order Book Micro', 'Volatility Trading', 'Macro Liquidity']
  },
  'Sentaient': {
    category: 'SOVEREIGN HUMANITY NETWORK',
    index: '09 / 16',
    posStyle: { bottom: '40px', right: '44px', top: 'auto', left: 'auto', transform: 'none' },
    tags: ['Physical Presence', 'Kindred Souls', 'Real Reality']
  },
  'Elevate': {
    category: 'ALPINE AI & MOUNTAIN SURVIVAL OS',
    index: '10 / 16',
    posStyle: { top: '80px', right: '44px', bottom: 'auto', left: 'auto', transform: 'none' },
    tags: ['Avalanche Radar', 'AI Gear Tuning', '4K GoPro Sync']
  },
  'Sphinx': {
    category: 'GLOBAL THREAT & DISASTER DEFENSE',
    index: '11 / 16',
    posStyle: { top: '48%', left: '44px', bottom: 'auto', right: 'auto', transform: 'translateY(-50%)' },
    tags: ['Disaster Radar', 'Geopolitical Intel', 'Perimeter Home Sec']
  },
  'Liquid': {
    category: 'FINANCIAL INTELLIGENCE & TAX FORGE',
    index: '12 / 16',
    posStyle: { top: '48%', right: '44px', bottom: 'auto', left: 'auto', transform: 'translateY(-50%)' },
    tags: ['Automated Tax Audit', 'Live P&L Ledger', 'Smart Token Mint']
  },
  'Maya': {
    category: 'EMPATHETIC AI AVATAR & 24/7 CONCIERGE',
    index: '13 / 16',
    posStyle: { top: '80px', left: '44px', bottom: 'auto', right: 'auto', transform: 'none' },
    tags: ['Conversational Sales', 'Active Habit Coach', 'Deep Learning Companion']
  },
  'PyRAmid': {
    category: 'AUTONOMOUS BUSINESS OPS BRAIN',
    index: '14 / 16',
    posStyle: { bottom: '40px', left: '44px', top: 'auto', right: 'auto', transform: 'none' },
    tags: ['Market Arbitrage', 'Strategic Execution', 'Self-Operating Venture']
  },
  'Matrix': {
    category: 'AUTONOMOUS AI ENGINEERING COLLECTIVE',
    index: '15 / 16',
    posStyle: { bottom: '40px', right: '44px', top: 'auto', left: 'auto', transform: 'none' },
    tags: ['Production Code Gen', 'System Refactoring', 'Deep AI Research']
  },
  'LightSpeed': {
    category: 'AUTONOMOUS AI CTO & RUNTIME DEFENSE',
    index: '16 / 16',
    posStyle: { top: '80px', right: '44px', bottom: 'auto', left: 'auto', transform: 'none' },
    tags: ['99.999% SLA Uptime', 'Self-Healing Cloud', 'Sub-10ms Global Edge']
  },
};

// --- HTML Overlays (Stations) ---
const HTMLStations = () => {
  const scroll = useScroll();
  const backRef = useRef();
  const overlayRef = useRef();
  const cardRef = useRef();
  const logoImgRef = useRef();
  const statusDotRef = useRef();
  const categoryRef = useRef();
  const indexRef = useRef();
  const titleRef = useRef();
  const summaryRef = useRef();
  const descRef = useRef();
  const tagsRef = useRef();
  const btnRef = useRef();
  
  // Keep track of the currently active world to avoid redundant DOM updates
  const activeWorldRef = useRef(null);

  useWaypointControls(scroll);

  useFrame(() => {
    const progress = window._warpProgress !== undefined ? window._warpProgress : scroll.offset;
    
    // Back button visibility
    if (backRef.current) {
        const show = progress > 0.08;
        backRef.current.style.opacity = show ? '1' : '0';
        backRef.current.style.pointerEvents = show ? 'auto' : 'none';
        backRef.current.style.transform = show ? 'translateY(0px)' : 'translateY(-10px)';
    }

    // World overlay visibility and content
    if (overlayRef.current) {
        // Find which world we are currently in
        const world = WORLDS_DATA.find(w => progress >= w.startP - 0.01 && progress <= w.endP + 0.01);
        
        if (world) {
            // We are inside a world
            overlayRef.current.style.opacity = '1';
            overlayRef.current.style.pointerEvents = 'auto';
            
            // Only update DOM if the world changed
            if (activeWorldRef.current !== world.name) {
                activeWorldRef.current = world.name;
                const conf = WORLD_CONFIG[world.name] || {
                  category: 'AUTONOMOUS WORLD EXPERIENCE',
                  index: 'SYSTEM',
                  posStyle: { bottom: '40px', right: '44px', top: 'auto', left: 'auto', transform: 'none' },
                  tags: ['AI Autonomous', 'Real-Time Telemetry', 'Cloud Sync']
                };

                // Apply unique off-to-the-side position
                overlayRef.current.style.top = conf.posStyle.top;
                overlayRef.current.style.bottom = conf.posStyle.bottom;
                overlayRef.current.style.left = conf.posStyle.left;
                overlayRef.current.style.right = conf.posStyle.right;
                overlayRef.current.style.transform = conf.posStyle.transform;

                // Update Logo
                if (logoImgRef.current) {
                  if (world.logoUrl) {
                    logoImgRef.current.src = world.logoUrl;
                    logoImgRef.current.style.display = 'block';
                  } else {
                    logoImgRef.current.style.display = 'none';
                  }
                }

                // Update Status Dot & Category
                if (statusDotRef.current) {
                  statusDotRef.current.style.background = world.color || '#38bdf8';
                  statusDotRef.current.style.boxShadow = `0 0 10px ${world.color || '#38bdf8'}`;
                }
                if (categoryRef.current) {
                  categoryRef.current.innerText = conf.category;
                  categoryRef.current.style.color = world.color || '#38bdf8';
                }
                if (indexRef.current) {
                  indexRef.current.innerText = conf.index;
                }

                // Update Title
                if (titleRef.current) {
                    titleRef.current.innerText = world.name;
                }

                // Update Summary
                if (summaryRef.current) {
                    summaryRef.current.innerText = world.summary || '';
                }

                // Update Description
                if (descRef.current) {
                  descRef.current.innerText = world.description || '';
                }

                // Update Superpower Pills
                if (tagsRef.current) {
                  tagsRef.current.innerHTML = conf.tags.map(tag => (
                    `<span style="
                      display: inline-flex;
                      align-items: center;
                      gap: 4px;
                      padding: 3px 8px;
                      border-radius: 6px;
                      background: rgba(255, 255, 255, 0.05);
                      border: 1px solid rgba(255, 255, 255, 0.1);
                      font-size: 10px;
                      font-weight: 600;
                      letter-spacing: 0.03em;
                      color: #cbd5e1;
                      font-family: 'Inter', sans-serif;
                    ">
                      <span style="color: ${world.color || '#38bdf8'}; font-size: 8px;">◈</span>
                      ${tag}
                    </span>`
                  )).join('');
                }

                // Update Card Accent
                if (cardRef.current) {
                  cardRef.current.style.borderTop = `2px solid ${world.color || '#38bdf8'}`;
                  cardRef.current.style.boxShadow = `0 24px 60px rgba(0, 0, 0, 0.9), 0 0 35px ${world.color || '#38bdf8'}22`;
                }

                // Update Button
                if (btnRef.current) {
                  btnRef.current.style.backgroundColor = world.color || '#38bdf8';
                }
            }
        } else {
            // We are between worlds or in the hub
            overlayRef.current.style.opacity = '0';
            overlayRef.current.style.pointerEvents = 'none';
            activeWorldRef.current = null;
        }
    }
  });

  const handleBack = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    ['icebreakerCaveLocked', 'icebreakerThawLocked', 'icebreakerTextLocked', 'mindwaveLocked', 'interstellarLocked', 'autopilotLocked', 'contangoLocked', 'swarmLocked', 'orbitalLocked'].forEach(k => { window[k] = false; });
    if (window._goToStation) {
      window._goToStation(0, 1800);
    } else if (scroll.el) {
      window._cancelWarp = true;
      window._warpProgress = undefined;
      window._snapCamera = true;
      scroll.el.style.overflow = 'auto';
      scroll.el.scrollTop = 0;
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 40 }}>
      
      {/* Dynamic Unique Position Side Dossier Card */}
      <div 
        ref={overlayRef} 
        style={{ 
          position: 'absolute',
          opacity: 0, 
          transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 85
        }}
      >
        <div 
          ref={cardRef}
          style={{
            maxWidth: '430px',
            width: 'calc(100vw - 64px)',
            padding: '22px 24px',
            background: 'linear-gradient(145deg, rgba(8, 14, 28, 0.84) 0%, rgba(4, 7, 18, 0.95) 100%)',
            backdropFilter: 'blur(28px) saturate(190%)',
            WebkitBackdropFilter: 'blur(28px) saturate(190%)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderTop: '2px solid #38bdf8',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            pointerEvents: 'auto'
          }}
        >
          {/* Header Row: Logo, Category Badge, Index */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '10px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <img 
                ref={logoImgRef} 
                src="" 
                alt="Logo" 
                style={{ 
                  height: '30px', 
                  maxWidth: '120px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))',
                  flexShrink: 0
                }} 
              />
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 9px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '9.5px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                <span ref={statusDotRef} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', flexShrink: 0 }}></span>
                <span ref={categoryRef} style={{ color: '#38bdf8' }}>Category</span>
              </div>
            </div>
            <span ref={indexRef} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', flexShrink: 0 }}>EXP // 01</span>
          </div>

          {/* World Title */}
          <h1 ref={titleRef} style={{
            fontFamily: "'Space Grotesk', 'Inter', -apple-system, sans-serif",
            fontSize: '1.9rem',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            margin: '2px 0 4px 0',
            lineHeight: 1.15,
            color: '#ffffff'
          }}>
            World Name
          </h1>

          {/* Value Proposition Headline */}
          <h2 ref={summaryRef} style={{
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontSize: '13.5px',
            fontWeight: 700,
            color: '#f8fafc',
            margin: '0 0 6px 0',
            lineHeight: 1.4,
            letterSpacing: '-0.01em'
          }}>
            Summary
          </h2>

          {/* System Capability Narrative */}
          <p ref={descRef} style={{
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontSize: '12px',
            color: '#94a3b8',
            margin: '0 0 12px 0',
            lineHeight: 1.55,
            fontWeight: 400
          }}>
            Description
          </p>

          {/* Capability Superpower Badges */}
          <div ref={tagsRef} style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '14px'
          }}>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <button 
              ref={btnRef}
              style={{
                padding: '7px 18px',
                borderRadius: '8px',
                border: 'none',
                color: '#020617',
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: '10.5px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <span>ENTER EXPERIENCE</span>
              <span style={{ fontSize: '12px' }}>→</span>
            </button>
            <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.06em' }}>SCROLL TO FLY ↓</span>
          </div>
        </div>
      </div>

    </div>,
    document.body
  );
};

const Scene3D = () => {
  return (
    <Canvas 
      camera={{ fov: 55, near: 2, far: 25000, position: [0, 0, 100] }}
      dpr={[1, 1.5]} 
      performance={{ min: 0.5 }} 
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      {/* Background color removed for transparency */}
      
      <ScrollControls pages={50} damping={0.2} distance={1.2}>
        
        {/* The 3D World */}
        <React.Suspense fallback={null}>
          <CameraController />
          <TimelineManager />
        </React.Suspense>
        <React.Suspense fallback={null}>
          <FloatingHUDLogo />
        </React.Suspense>
        <Sparkles count={2000} scale={200} size={4} speed={0.8} opacity={0.5} color="#00ff44" />

        {/* The HTML UI Layer */}
        <Scroll html style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
          <HTMLStations />
        </Scroll>

      </ScrollControls>
      
      {/* Cinematic Post-Processing */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={0.85} 
          mipmapBlur 
          intensity={1.2} 
        />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
};

export default Scene3D;
