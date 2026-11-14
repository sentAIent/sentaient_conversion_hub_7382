import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, ScrollControls, Scroll, useScroll, Preload } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { CameraController, TimelineManager } from '../TimelineManager';
import { useWaypointControls } from '../navigation/WaypointNavigator';
import { WORLDS_DATA } from './MiniWorldsHub';
import analytics from '../../../services/ComprehensiveAnalytics';
import { useAutoTour } from '../navigation/useAutoTour';

const WORLD_ROUTES = {
  'MindWave': '/mindwave.html',
  'Icebreaker': '/icebreaker',
  'Interstellar': '/interstellar-game/',
  'Legal Eagle': '/legaleagle/',
  'Autopilot': '/autopilot',
  'CloveH2O': 'https://cloveh2o.com',
  'FantasyQuant': '/fantasyquant',
  'Contango': '/contango/',
  'Sentaient': '/agent-studio',
  'Elevate': null,
  'Sphinx': '/sphinx/',
  'Liquid': '/liquid',
  'Maya': null,
  'Pyramid': '/pyramid',
  'PyRAmid': '/pyramid',
  'Matrix': '/matrix',
  'LightSpeed': '/lightspeed/'
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
    category: 'BOTANICAL WELLNESS & FUNCTIONAL HYDRATION',
    index: '15 / 16',
    posStyle: { bottom: '40px', right: '44px', top: 'auto', left: 'auto', transform: 'none' },
    tags: ['Organic Clove Extract', 'Bioactive Eugenol', 'Antioxidant Powerhouse', 'Digestive Vitality']
  },
  'FantasyQuant': {
    category: 'QUANTITATIVE SPORTS INTELLIGENCE',
    index: '06 / 16',
    posStyle: { bottom: '40px', left: '44px', top: 'auto', right: 'auto', transform: 'none' },
    tags: ['Algorithmic Edge', 'Odds Arbitrage', 'Simulation Engine']
  },
  'Contango': {
    category: 'HIGH-FREQUENCY MARKET INTELLIGENCE',
    index: '07 / 16',
    posStyle: { bottom: '40px', left: '44px', top: 'auto', right: 'auto', transform: 'none' },
    tags: ['Order Book Micro', 'Volatility Trading', 'Macro Liquidity']
  },
  'Sentaient': {
    category: 'AUTONOMOUS AI VENTURE STUDIO & MULTI-INDUSTRY LAB',
    index: '16 / 16',
    posStyle: { bottom: '20px', right: '44px', top: 'auto', left: 'auto', transform: 'none' },
    tags: ['Multi-Industry AI', 'FinTech & Quant', 'LegalTech Defense', 'BioTech & Wellness', 'Autonomous CTO']
  },
  'Elevate': {
    category: 'BIG-MOUNTAIN SNOWBOARD GAME & ALPINE HUB',
    index: '08 / 16',
    posStyle: { top: '80px', right: '44px', bottom: 'auto', left: 'auto', transform: 'none' },
    tags: ['3D Snowboard Game', 'Live Mountain Weather', 'Avalanche Safety Radar', 'Gear Optimization']
  },
  'Sphinx': {
    category: 'GLOBAL THREAT & DISASTER DEFENSE',
    index: '09 / 16',
    posStyle: { top: '48%', left: '44px', bottom: 'auto', right: 'auto', transform: 'translateY(-50%)' },
    tags: ['Disaster Radar', 'Geopolitical Intel', 'Perimeter Home Sec']
  },
  'Liquid': {
    category: 'FINANCIAL INTELLIGENCE & ACCOUNTING',
    index: '10 / 16',
    posStyle: { top: '48%', right: '44px', bottom: 'auto', left: 'auto', transform: 'translateY(-50%)' },
    tags: ['Automated Tax Audit', 'Live P&L Ledger', 'Smart Token Mint']
  },
  'Maya': {
    category: 'EMPATHETIC AI AVATAR & 24/7 CONCIERGE',
    index: '11 / 16',
    posStyle: { top: '80px', left: '44px', bottom: 'auto', right: 'auto', transform: 'none' },
    tags: ['Conversational Sales', 'Active Habit Coach', 'Deep Learning Companion']
  },
  'Pyramid': {
    category: 'AUTONOMOUS PROFIT ENGINE',
    index: '12 / 16',
    posStyle: { bottom: '40px', left: '44px', top: 'auto', right: 'auto', transform: 'none' },
    tags: ['Market Arbitrage', 'Strategic Execution', 'Self-Operating Venture']
  },
  'PyRAmid': {
    category: 'AUTONOMOUS PROFIT ENGINE',
    index: '12 / 16',
    posStyle: { bottom: '40px', left: '44px', top: 'auto', right: 'auto', transform: 'none' },
    tags: ['Market Arbitrage', 'Strategic Execution', 'Self-Operating Venture']
  },
  'Matrix': {
    category: 'AUTONOMOUS AI SOFTWARE ENGINEERING LAB',
    index: '13 / 16',
    posStyle: { bottom: '40px', right: '44px', top: 'auto', left: 'auto', transform: 'none' },
    tags: ['Production Code Gen', 'Full-Stack Architecture', 'Autonomous Debugging', 'Deep Tech Research']
  },
  'LightSpeed': {
    category: 'AUTONOMOUS AI CTO & CYBERSECURITY',
    index: '14 / 16',
    posStyle: { top: '80px', right: '44px', bottom: 'auto', left: 'auto', transform: 'none' },
    tags: ['99.999% SLA Uptime', 'Self-Healing Cloud', 'Sub-10ms Global Edge']
  },
};

// --- HTML Overlays (Stations) ---
const HTMLStations = () => {
  const scroll = useScroll();
  const tour = useAutoTour();
  const backRef = useRef();
  const overlayRef = useRef();
  const cardRef = useRef();
  const hubTourRef = useRef();
  const logoImgRef = useRef();
  const statusDotRef = useRef();
  const categoryRef = useRef();
  const indexRef = useRef();
  const titleRef = useRef();
  const summaryRef = useRef();
  const descRef = useRef();
  const tagsRef = useRef();
  const enterAppBtnRef = useRef();
  const comingSoonRef = useRef();
  
  // Keep track of the currently active world to avoid redundant DOM updates
  const activeWorldRef = useRef(null);

  useWaypointControls(scroll);

  // Clean up any stale or orphaned duplicate portals from previous renders/HMR
  useEffect(() => {
    const existingPortals = document.querySelectorAll('.demo3d-portal-root');
    if (existingPortals.length > 1) {
      for (let i = 0; i < existingPortals.length - 1; i++) {
        existingPortals[i].remove();
      }
    }
  }, []);

  useFrame(() => {
    const progress = (window._isTransitActive && window._warpProgress !== undefined) ? window._warpProgress : scroll.offset;

    // Back button visibility
    if (backRef.current) {
        const show = progress > 0.015;
        backRef.current.style.opacity = show ? '1' : '0';
        backRef.current.style.pointerEvents = show ? 'auto' : 'none';
        backRef.current.style.transform = show ? 'translateY(0px)' : 'translateY(-10px)';
    }

    // Hub Auto Tour Launcher visibility
    if (hubTourRef.current) {
        const showHub = progress < 0.015 && !tour.isActive;
        hubTourRef.current.style.opacity = showHub ? '1' : '0';
        hubTourRef.current.style.pointerEvents = showHub ? 'auto' : 'none';
        hubTourRef.current.style.transform = showHub ? 'translate(-50%, 0)' : 'translate(-50%, 15px)';
    }

    // World overlay visibility and content
    if (overlayRef.current) {
        // Dossier card MUST NOT show during wormhole transit or in the Home Hub
        const isWarping = window._isTransitActive;
        const inHub = progress < 0.025;
        
        let world = null;
        if (!isWarping && !inHub) {
          // Find matching world at current arrival position
          world = WORLDS_DATA.find(w => Math.abs(progress - w.p) <= 0.018);
        }
        
        if (world) {
            // We have arrived inside a world
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

                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

                // On mobile phones, dock the dossier card cleanly at the bottom so the 3D world stays unobstructed
                if (isMobile) {
                  overlayRef.current.style.removeProperty('top');
                  overlayRef.current.style.removeProperty('right');
                  overlayRef.current.style.bottom = '12px';
                  overlayRef.current.style.left = '50%';
                  overlayRef.current.style.transform = 'translateX(-50%)';
                } else {
                  // Apply unique off-to-the-side position cleanly with property removal
                  if (conf.posStyle.top && conf.posStyle.top !== 'auto') {
                    overlayRef.current.style.top = conf.posStyle.top;
                    overlayRef.current.style.removeProperty('bottom');
                  } else {
                    overlayRef.current.style.removeProperty('top');
                    overlayRef.current.style.bottom = conf.posStyle.bottom || '40px';
                  }

                  if (conf.posStyle.left && conf.posStyle.left !== 'auto') {
                    overlayRef.current.style.left = conf.posStyle.left;
                    overlayRef.current.style.removeProperty('right');
                  } else {
                    overlayRef.current.style.removeProperty('left');
                    overlayRef.current.style.right = conf.posStyle.right || '44px';
                  }

                  overlayRef.current.style.transform = conf.posStyle.transform || 'none';
                }

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

                // Update Card Accent & Per-World Dimensions
                if (cardRef.current) {
                  cardRef.current.style.borderTop = `2px solid ${world.color || '#38bdf8'}`;
                  cardRef.current.style.boxShadow = `0 24px 60px rgba(0, 0, 0, 0.9), 0 0 35px ${world.color || '#38bdf8'}22`;
                  cardRef.current.style.maxWidth = conf.cardStyle?.maxWidth || '360px';
                  cardRef.current.style.width = conf.cardStyle?.width || 'calc(100vw - 64px)';
                  cardRef.current.style.padding = conf.cardStyle?.padding || '18px 20px';
                }

                // Update Enter App Button or Coming Soon Badge
                if (enterAppBtnRef.current) {
                  const targetUrl = world.appUrl || WORLD_ROUTES[world.name];
                  if (targetUrl) {
                    enterAppBtnRef.current.href = targetUrl;
                    enterAppBtnRef.current.target = targetUrl.startsWith('http') ? '_blank' : '_self';
                    enterAppBtnRef.current.style.display = 'inline-flex';
                    enterAppBtnRef.current.style.background = `linear-gradient(135deg, ${world.color || '#38bdf8'}ee, ${world.color || '#38bdf8'}99)`;
                    enterAppBtnRef.current.style.boxShadow = `0 4px 16px ${world.color || '#38bdf8'}44`;
                    if (comingSoonRef.current) comingSoonRef.current.style.display = 'none';
                  } else {
                    enterAppBtnRef.current.style.display = 'none';
                    if (comingSoonRef.current) {
                      comingSoonRef.current.style.display = 'inline-flex';
                      comingSoonRef.current.style.borderColor = `${world.color || '#38bdf8'}77`;
                      comingSoonRef.current.style.background = `linear-gradient(135deg, ${world.color || '#38bdf8'}26, ${world.color || '#38bdf8'}10)`;
                      comingSoonRef.current.style.boxShadow = `0 0 18px ${world.color || '#38bdf8'}26`;
                    }
                  }
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
    tour.stopTour();
    if (window.clearActiveWorldPause) window.clearActiveWorldPause();
    ['icebreakerCaveLocked', 'icebreakerThawLocked', 'icebreakerTextLocked', 'mindwaveLocked', 'interstellarLocked', 'autopilotLocked', 'contangoLocked', 'swarmLocked', 'orbitalLocked'].forEach(k => { window[k] = false; });
    if (window.directTeleportTo) {
      window.directTeleportTo(0, 1350);
    } else if (window._goToStation) {
      window._goToStation(0, 1350);
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
    <div className="demo3d-portal-root" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', pointerEvents: 'none', zIndex: 40 }}>
      
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
          className="demo3d-side-dossier-card"
          style={{
            maxWidth: '360px',
            width: 'calc(100vw - 64px)',
            padding: '18px 20px',
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
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', minWidth: 0 }}>
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
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '9.5px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                lineHeight: 1.3,
                textTransform: 'uppercase',
                whiteSpace: 'normal',
                minWidth: 0
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
          {/* Action Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            
            {/* Primary Action: Enter App */}
            <a
              ref={enterAppBtnRef}
              href="#"
              onClick={(e) => {
                e.stopPropagation();
                if (activeWorldRef.current) {
                  const target = e.currentTarget.getAttribute('href') || WORLD_ROUTES[activeWorldRef.current] || '/';
                  analytics.trackFeature(activeWorldRef.current, 'enter_experience_clicked', { target });
                }
              }}
              style={{
                width: '100%',
                padding: '9px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
                e.currentTarget.style.filter = 'brightness(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.filter = 'none';
              }}
            >
              <span>ENTER APP</span>
              <span style={{ fontSize: '12px' }}>➔</span>
            </a>

            {/* Coming Soon Badge when world app is not yet live */}
            <div
              ref={comingSoonRef}
              style={{
                display: 'none',
                width: '100%',
                padding: '9px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(56, 189, 248, 0.45)',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(56, 189, 248, 0.06))',
                color: '#e0f2fe',
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxSizing: 'border-box',
                pointerEvents: 'none'
              }}
            >
              <span>COMING SOON</span>
            </div>

            {/* Auto Tour Progression Bar: Back Button + Continue Button + Seconds Adjuster */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', flex: '1 1 auto', gap: '6px', minWidth: 'fit-content' }}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    tour.prevWorld();
                  }}
                  style={{
                    flexShrink: 0,
                    padding: '7px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  title="Go back to the previous world"
                >
                  <span>← BACK</span>
                </button>

                {tour.isActive && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      tour.togglePause();
                    }}
                    style={{
                      flexShrink: 0,
                      padding: '7px 12px',
                      borderRadius: '8px',
                      border: tour.isPaused
                        ? '1px solid rgba(16, 185, 129, 0.9)'
                        : '1px solid rgba(251, 191, 36, 0.9)',
                      background: tour.isPaused
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.35), rgba(5, 150, 105, 0.25))'
                        : 'linear-gradient(135deg, rgba(245, 158, 11, 0.38), rgba(217, 119, 6, 0.25))',
                      color: tour.isPaused ? '#6ee7b7' : '#fde68a',
                      boxShadow: tour.isPaused
                        ? '0 0 16px rgba(16, 185, 129, 0.4)'
                        : '0 0 16px rgba(245, 158, 11, 0.42)',
                      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                      fontSize: '10px',
                      fontWeight: 900,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.04)';
                      e.currentTarget.style.filter = 'brightness(1.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1.0)';
                      e.currentTarget.style.filter = 'none';
                    }}
                    title={tour.isPaused ? 'Resume Auto Tour' : 'Pause Auto Tour'}
                  >
                    <span>{tour.isPaused ? '▶' : '⏸'}</span>
                    <span>{tour.isPaused ? 'RESUME' : 'PAUSE'}</span>
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    tour.nextWorld();
                  }}
                  style={{
                    flex: '1 0 auto',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    border: tour.isActive ? '1px solid rgba(56, 189, 248, 0.7)' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: tour.isActive 
                      ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.35) 0%, rgba(16, 185, 129, 0.25) 100%)' 
                      : 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    whiteSpace: 'nowrap',
                    boxShadow: tour.isActive ? '0 0 16px rgba(56, 189, 248, 0.3)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  title="Advance to the next world"
                >
                  <span style={{ color: '#38bdf8', fontSize: '10px' }}>▶</span>
                  <span>
                    {tour.isActive && !tour.isPaused
                      ? `NEXT (${tour.remainingSeconds}s) →`
                      : 'NEXT →'}
                  </span>
                </button>
              </div>

              {/* Seconds Adjuster Stepper + Scroll to Fly + Exit Tour aligned left */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', flexWrap: 'wrap' }}>
                <div 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '3px', 
                    padding: '3px 6px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.55)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '10px',
                    flexShrink: 0
                  }}
                  title="Adjust seconds spent in each world before moving forward"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      tour.adjustSeconds(-1);
                    }}
                    aria-label="Decrease seconds"
                    style={{
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      fontWeight: 900,
                      fontSize: '12px',
                      lineHeight: 1,
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#94a3b8'; }}
                  >
                    −
                  </button>

                  <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 800, color: '#38bdf8', padding: '0 2px' }}>
                    {tour.seconds}s
                  </span>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      tour.adjustSeconds(1);
                    }}
                    aria-label="Increase seconds"
                    style={{
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      fontWeight: 900,
                      fontSize: '12px',
                      lineHeight: 1,
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#94a3b8'; }}
                  >
                    +
                  </button>
                </div>

                <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>SCROLL TO FLY ↓</span>

                {tour.isActive && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      tour.stopTour();
                    }}
                    style={{
                      padding: '7px 11px',
                      borderRadius: '8px',
                      border: '1px solid rgba(244, 63, 94, 0.45)',
                      background: 'rgba(244, 63, 94, 0.12)',
                      color: '#fda4af',
                      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                      fontSize: '9.5px',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(244, 63, 94, 0.28)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(244, 63, 94, 0.12)';
                      e.currentTarget.style.color = '#fda4af';
                    }}
                    title="Exit Auto Tour and remain in this world"
                  >
                    <span style={{ fontSize: '11px', lineHeight: 1 }}>✕</span>
                    <span>EXIT TOUR</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Home Hub Auto Tour Floating Launcher Bar */}
      <div 
        ref={hubTourRef}
        className="demo3d-hub-tour-bar"
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 14px 6px 16px',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, rgba(8, 14, 28, 0.92) 0%, rgba(3, 7, 18, 0.97) 100%)',
          backdropFilter: 'blur(24px) saturate(190%)',
          WebkitBackdropFilter: 'blur(24px) saturate(190%)',
          border: '1px solid rgba(56, 189, 248, 0.45)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.85), 0 0 20px rgba(56, 189, 248, 0.25)',
          pointerEvents: 'auto',
          transition: 'opacity 0.35s ease, transform 0.35s ease'
        }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            tour.startTour(1);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: '11.5px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        >
          <span style={{ 
            width: '26px', 
            height: '26px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #0ea5e9, #10b981)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 14px rgba(56, 189, 248, 0.65)'
          }}>
            <span style={{ color: '#fff', fontSize: '11px', marginLeft: '1px' }}>▶</span>
          </span>
          <span>START AUTO TOUR</span>
        </button>

        <div style={{ width: '1px', height: '18px', background: 'rgba(255, 255, 255, 0.18)' }} />

        {/* Seconds Adjuster on Hub */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '9.5px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '0.05em' }}>
            PAUSE:
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              tour.adjustSeconds(-1);
            }}
            aria-label="Decrease seconds"
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.06)',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            −
          </button>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', minWidth: '28px', textAlign: 'center', fontFamily: 'monospace' }}>
            {tour.seconds}s
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              tour.adjustSeconds(1);
            }}
            aria-label="Increase seconds"
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.06)',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            +
          </button>
        </div>
      </div>

    </div>,
    document.body
  );
};

const Scene3D = () => {
  return (
    <>
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
          <Preload all />
        </React.Suspense>
        <Sparkles count={1000} scale={200} size={4} speed={0.8} opacity={0.5} color="#00ff44" />

        {/* The HTML UI Layer */}
        <Scroll html style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
          <HTMLStations />
        </Scroll>

      </ScrollControls>
      
      {/* Cinematic Post-Processing - High-Performance Zero-Allocation */}
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom 
          luminanceThreshold={0.90} 
          mipmapBlur 
          intensity={0.88} 
        />
      </EffectComposer>
    </Canvas>
    {/* Ultra-smooth CSS Vignette: zero WebGL draw calls & zero GPU fill-rate cost */}
    <div className="pointer-events-none fixed inset-0 z-[5]" style={{ background: 'radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.55) 100%)' }} />
    </>
  );
};

export default Scene3D;
