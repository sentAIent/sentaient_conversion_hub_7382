import React, { useRef, useState, useEffect } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Import Worlds
import WorldIcebreaker from './worlds/WorldIcebreaker';
import WorldAutopilot from './worlds/WorldAutopilot';
import WorldMindWave from './worlds/WorldMindWave';
import LegalEagle from './worlds/LegalEagle';
import Interstellar from './worlds/Interstellar';
import WorldCloveH2O from './worlds/WorldCloveH2O';
import WorldFantasyQuant from './worlds/WorldFantasyQuant';
import ContangoQuant from './worlds/ContangoQuant';
import WorldSentaient from './worlds/WorldSentaient';

import WorldElevate from './worlds/WorldElevate';
import WorldSphinx from './worlds/WorldSphinx';
import WorldLiquid from './worlds/WorldLiquid';
import WorldMaya from './worlds/WorldMaya';
import WorldPyramid from './worlds/WorldPyramid';
import WorldMatrix from './worlds/WorldMatrix';
import WorldLightSpeed from './worlds/WorldLightSpeed';
import MiniWorldsHub from './components/MiniWorldsHub';
import './navigation/WaypointNavigator';
import { WORLD_PAUSE_STATIONS, startWorldPause, clearActiveWorldPause } from './navigation/WorldPauseManager';
import analytics from '../../services/ComprehensiveAnalytics';

const WORLD_NAMES_MAP = {
  mindwave: 'MindWave',
  icebreaker: 'Icebreaker',
  interstellar: 'Interstellar',
  legal: 'Legal Eagle',
  autopilot: 'Autopilot',
  clove: 'CloveH2O',
  fantasy: 'FantasyQuant',
  contango: 'Contango',
  sentaient: 'sentAIent',
  elevate: 'Elevate',
  sphinx: 'Sphinx',
  liquid: 'Liquid',
  maya: 'Maya',
  pyramid: 'Pyramid',
  matrix: 'Matrix',
  lightspeed: 'LightSpeed'
};

// Import Wormholes (All 100% Unique - Zero Generic Duplicates)
import WormholeMatrix from './wormholes/WormholeMatrix';
import WormholeMindWave from './wormholes/WormholeMindWave';
import WormholeIce from './wormholes/WormholeIce';
import WormholeSoundwaves from './wormholes/WormholeSoundwaves';
import WormholeLegal from './wormholes/WormholeLegal';
import WormholeAutopilot from './wormholes/WormholeAutopilot';
import WormholeClove from './wormholes/WormholeClove';
import WormholeWaterslide from './wormholes/WormholeWaterslide';
import WormholeContango from './wormholes/WormholeContango';
import WormholeSentaient from './wormholes/WormholeSentaient';
import WormholeElevate from './wormholes/WormholeElevate';
import WormholeSphinx from './wormholes/WormholeSphinx';
import WormholeLiquid from './wormholes/WormholeLiquid';
import WormholeMaya from './wormholes/WormholeMaya';
import WormholePyramid from './wormholes/WormholePyramid';
import WormholeMatrixTeam from './wormholes/WormholeMatrixTeam';
import WormholeLightSpeed from './wormholes/WormholeLightSpeed';

// The Masterpiece Hybrid Timeline - Drop down into Icebreaker, then pure straight line Z-axis
export const SCROLL_TIMELINE = [
  // Intro -> MindWave (Center at Z=-1350)
  { p: 0.000, x: 0, y: 0, z: 10, rx: 0, ry: 0 },
  { p: 0.020, x: 0, y: 0, z: -250, rx: 0, ry: 0 },    
  { p: 0.030, x: 0, y: 0, z: -850, rx: 0, ry: 0 }, // Arrive MindWave (Zoomed out 500 units)
  { p: 0.045, x: 0, y: 0, z: -850, rx: 0, ry: 0 }, // PAUSE MindWave
  
  // Plunge straight down into Ice Wormhole (Drop 1)
  { p: 0.060, x: 0, y: 0, z: -1250, rx: -Math.PI / 2, ry: 0 }, // Transition to dive entry
  { p: 0.090, x: 0, y: -3000, z: -1250, rx: -Math.PI / 2, ry: 0 }, // Diving
  
  // Pull out of the dive into Icebreaker (Center at Z=-2275)
  { p: 0.105, x: 0, y: -3980, z: -1550, rx: 0, ry: 0 }, // Level out into Icebreaker cavern
  { p: 0.120, x: 0, y: -3980, z: -1680, rx: 0, ry: 0 }, // Arrive Icebreaker cave entrance
  { p: 0.131, x: 0, y: -3840, z: -2010, rx: -0.58, ry: 0 }, // Thawed / looking down at fire & people at 33deg
  { p: 0.145, x: 0, y: -3840, z: -2010, rx: -0.58, ry: 0 }, // Hold looking down at fire & people
  { p: 0.155, x: 0, y: -3980, z: -3250, rx: 0, ry: 0 }, // Seamless forward flight past fire into sound wormhole
  
  // Soundwaves Wormhole 
  { p: 0.160, x: 0, y: -3980, z: -4000, rx: 0, ry: 0 },
  { p: 0.180, x: 0, y: -3980, z: -6250, rx: 0, ry: 0 },
  
  // Interstellar (Center at Z=-7550)
  { p: 0.190, x: 0, y: -3980, z: -6750, rx: 0, ry: 0 }, // Arrive Interstellar (Zoomed out 800 units)
  { p: 0.210, x: 0, y: -3980, z: -6750, rx: 0, ry: 0 }, // PAUSE Interstellar
  { p: 0.220, x: 0, y: -3980, z: -8250, rx: 0, ry: 0 }, // Exit Interstellar
  
  // Legal Eagle (Center at Z=-10550)
  { p: 0.230, x: 0, y: -3980, z: -8750, rx: 0, ry: 0 }, 
  { p: 0.240, x: 0, y: -3980, z: -9850, rx: 0, ry: 0 }, // Arrive Legal Eagle (Zoomed out 700 units)
  { p: 0.255, x: 0, y: -3980, z: -9850, rx: 0, ry: 0 }, // PAUSE Legal Eagle
  { p: 0.265, x: 0, y: -3980, z: -11550, rx: 0, ry: 0 }, // Exit Legal Eagle
  
  // Autopilot Wormhole
  { p: 0.275, x: 0, y: -3980, z: -12250, rx: 0, ry: 0 }, 
  
  // Autopilot (Center at Z=-13550)
  { p: 0.285, x: 0, y: -3980, z: -12850, rx: 0, ry: 0 }, // Arrive Autopilot (Zoomed out 700 units)
  { p: 0.300, x: 0, y: -3980, z: -12850, rx: 0, ry: 0 }, // PAUSE Autopilot
  { p: 0.310, x: 0, y: -3980, z: -14550, rx: 0, ry: 0 }, // Exit Autopilot

  // CloveH2O Wormhole
  { p: 0.320, x: 0, y: -3980, z: -15250, rx: 0, ry: 0 }, 

  // CloveH2O (Center at Z=-16550)
  { p: 0.330, x: 0, y: -3980, z: -15850, rx: 0, ry: 0 }, // Arrive CloveH2O (Zoomed out 700 units)
  { p: 0.360, x: 0, y: -3980, z: -15850, rx: 0, ry: 0 }, // PAUSE CloveH2O
  
  // FantasyQuant Waterslide (Drop straight down from CloveH2O Z=-16550)
  { p: 0.368, x: 0, y: -4200, z: -16550, rx: -0.4, ry: 0 }, // Begin descent
  { p: 0.380, x: 0, y: -6800, z: -16550, rx: -1.2, ry: 0 }, // Plunging through waterslide
  { p: 0.395, x: 0, y: -10200, z: -16550, rx: -1.0, ry: 0 }, // Leveling out towards bottom
  { p: 0.405, x: 0, y: -11400, z: -16600, rx: -0.4, ry: 0 }, // Entering stadium
  { p: 0.412, x: 0, y: -11450, z: -16650, rx: -0.2, ry: 0 }, // Arrive FantasyQuant (Level out gently)
  { p: 0.422, x: 0, y: -11450, z: -16650, rx: -0.2, ry: 0 }, // PAUSE FantasyQuant
  { p: 0.430, x: 0, y: -11750, z: -17800, rx: 0, ry: 0 }, // Exit FantasyQuant

  // Candlesticks Wormhole (Long) -> now leads to Contango
  { p: 0.440, x: 0, y: -11750, z: -18550, rx: 0, ry: 0 }, 
  { p: 0.450, x: 0, y: -11750, z: -22550, rx: 0, ry: 0 }, 

  // Contango (Center at Z=-24200)
  { p: 0.455, x: 0, y: -11750, z: -24200, rx: 0, ry: 0 }, // Arrive Contango
  { p: 0.470, x: 0, y: -11750, z: -24200, rx: 0, ry: 0 }, // PAUSE Contango
  { p: 0.475, x: 0, y: -11750, z: -25200, rx: 0, ry: 0 }, // Exit Contango

  // Sentaient Finale
  { p: 0.485, x: 0, y: -11750, z: -28050, rx: 0, ry: 0 }, 
  { p: 0.492, x: 0, y: -11750, z: -29050, rx: 0, ry: 0 }, // Arrive Sentaient
  { p: 0.518, x: 0, y: -11750, z: -29050, rx: 0, ry: 0 }, // PAUSE Sentaient (Hold steady to view animation)
  { p: 0.528, x: 0, y: -11750, z: -31000, rx: 0, ry: 0 }, // Exit Sentaient into Elevate

  // Elevate (Center at Z=-33000)
  { p: 0.540, x: 0, y: -11750, z: -33000, rx: 0, ry: 0 }, // Arrive Elevate
  { p: 0.555, x: 0, y: -11750, z: -33000, rx: 0, ry: 0 }, // PAUSE Elevate
  { p: 0.570, x: 0, y: -11750, z: -34000, rx: 0, ry: 0 }, // Fly through
  
  // Sphinx (Center at Z=-37000, Camera holds at Z=-36680, zoomed in)
  { p: 0.580, x: 0, y: -11750, z: -35200, rx: 0, ry: 0 },
  { p: 0.600, x: 0, y: -11750, z: -36680, rx: 0, ry: 0 }, // Arrive Sphinx (Zoomed in)
  { p: 0.620, x: 0, y: -11750, z: -36680, rx: 0, ry: 0 }, // PAUSE Sphinx (Zoomed in)
  { p: 0.630, x: 0, y: -11750, z: -38000, rx: 0, ry: 0 },
  
  // Liquid (Center at Z=-41750, Camera holds at Z=-40600, zoomed out 400 units to clear Return to Hub button)
  { p: 0.640, x: 0, y: -11750, z: -39000, rx: 0, ry: 0 },
  { p: 0.660, x: 0, y: -11750, z: -40600, rx: 0, ry: 0 },
  { p: 0.675, x: 0, y: -11750, z: -40600, rx: 0, ry: 0 }, // PAUSE Liquid (Zoomed out 400 units)
  { p: 0.690, x: 0, y: -11750, z: -42500, rx: 0, ry: 0 },
  
  // Maya (Center at Z=-45750, Camera holds at Z=-44400, zoomed out ~600 units)
  { p: 0.705, x: 0, y: -11750, z: -43400, rx: 0, ry: 0 },
  { p: 0.720, x: 0, y: -11750, z: -44400, rx: 0, ry: 0 },
  { p: 0.735, x: 0, y: -11750, z: -44400, rx: 0, ry: 0 }, // PAUSE Maya (Zoomed out)
  { p: 0.755, x: 0, y: -11750, z: -46500, rx: 0, ry: 0 },
  
  // PyRAmid (Center at Z=-49000, Camera holds at Z=-48520, zoomed in ~370 units closer)
  { p: 0.770, x: 0, y: -11750, z: -47000, rx: 0, ry: 0 },
  { p: 0.790, x: 0, y: -11750, z: -48520, rx: 0, ry: 0 }, // Arrive PyRAmid (Zoomed in close)
  { p: 0.815, x: 0, y: -11750, z: -48520, rx: 0, ry: 0 }, // PAUSE PyRAmid (Zoomed in close)
  { p: 0.830, x: 0, y: -11750, z: -50000, rx: 0, ry: 0 }, // Exit PyRAmid
  
  // Matrix (Center at Z=-53000, Camera holds at Z=-52620, zoomed in ~370 units closer)
  { p: 0.840, x: 0, y: -11750, z: -51000, rx: 0, ry: 0 },
  { p: 0.860, x: 0, y: -11750, z: -52620, rx: 0, ry: 0 }, // Arrive Matrix (Zoomed in close)
  { p: 0.885, x: 0, y: -11750, z: -52620, rx: 0, ry: 0 }, // PAUSE Matrix (Zoomed in close)
  { p: 0.900, x: 0, y: -11750, z: -54000, rx: 0, ry: 0 },
  
  // LightSpeed (Center at Z=-57000)
  { p: 0.910, x: 0, y: -11750, z: -55000, rx: 0, ry: 0 },
  { p: 0.930, x: 0, y: -11750, z: -56250, rx: 0, ry: 0 }, // Arrive LightSpeed (Zoomed out 750 units)
  { p: 0.960, x: 0, y: -11750, z: -56250, rx: 0, ry: 0 }, // PAUSE LightSpeed
  { p: 1.000, x: 0, y: -11750, z: -58000, rx: 0, ry: 0 },
];

const getPosFromProgress = (p) => {
  if (p <= SCROLL_TIMELINE[0].p) return SCROLL_TIMELINE[0];
  if (p >= SCROLL_TIMELINE[SCROLL_TIMELINE.length - 1].p) return SCROLL_TIMELINE[SCROLL_TIMELINE.length - 1];
  
  for (let i = 0; i < SCROLL_TIMELINE.length - 1; i++) {
    const cur = SCROLL_TIMELINE[i];
    const next = SCROLL_TIMELINE[i + 1];
    if (p >= cur.p && p <= next.p) {
      const t = (p - cur.p) / (next.p - cur.p);
      return {
        x: THREE.MathUtils.lerp(cur.x, next.x, t),
        y: THREE.MathUtils.lerp(cur.y, next.y, t),
        z: THREE.MathUtils.lerp(cur.z, next.z, t),
        rx: THREE.MathUtils.lerp(cur.rx, next.rx, t),
        ry: THREE.MathUtils.lerp(cur.ry, next.ry, t)
      };
    }
  }
  return SCROLL_TIMELINE[0];
};

// Reusable objects for useFrame
const tempQuat = new THREE.Quaternion();
const tempEuler = new THREE.Euler();

export const CameraController = () => {
  const scroll = useScroll();
  const lightRef = useRef();

  useFrame((state) => {
    let progress = (window._isTransitActive && window._warpProgress !== undefined)
      ? window._warpProgress 
      : scroll.offset;
    if (window._worldPauseLockProgress !== undefined && window._worldPauseLockProgress !== null) {
      progress = window._worldPauseLockProgress;
    } else if (!window._isTransitActive && (window._icebreakerLockCamera || window.icebreakerThawLocked) && progress >= 0.118 && progress <= 0.148) {
      progress = 0.135;
    }
    window._currentProgress = progress;
    const targetPos = getPosFromProgress(progress);
    
    // Smooth Elevate Chase-Cam Integration
    let finalPosX = targetPos.x;
    let finalPosY = targetPos.y;
    let finalPosZ = targetPos.z;
    let targetRotX = targetPos.rx;
    let targetRotY = targetPos.ry;
    let chaseBlend = 0;

    // Smooth Icebreaker Island Zoom-Cam Integration
    if (!window._isTransitActive && window._icebreakerCam && window._icebreakerCam.active) {
      finalPosX = window._icebreakerCam.x;
      finalPosY = window._icebreakerCam.y;
      finalPosZ = window._icebreakerCam.z;
      targetRotX = window._icebreakerCam.rx;
      targetRotY = window._icebreakerCam.ry;
    }
    
    if (window._elevateChaseCam && window._elevateChaseCam.active && window._elevateChaseCam.blend > 0) {
      chaseBlend = window._elevateChaseCam.blend;
      finalPosX = THREE.MathUtils.lerp(targetPos.x, window._elevateChaseCam.pos.x, chaseBlend);
      finalPosY = THREE.MathUtils.lerp(targetPos.y, window._elevateChaseCam.pos.y, chaseBlend);
      finalPosZ = THREE.MathUtils.lerp(targetPos.z, window._elevateChaseCam.pos.z, chaseBlend);
    }
    
    // Keep camera upright and level during direct teleport to/from load screen (Hub)
    if (window._isDirectTeleportActive && window._teleportWarp) {
      if (window._teleportWarp.targetStationId === 'hub' || window._teleportWarp.startStationId === 'hub') {
        targetRotX = 0;
        targetRotY = 0;
      }
    }
    
    if (window._snapCamera) {
      state.camera.position.set(finalPosX, finalPosY, finalPosZ);
      tempEuler.set(targetRotX, targetRotY, 0);
      tempQuat.setFromEuler(tempEuler);
      if (chaseBlend > 0 && window._elevateChaseCam) {
        tempQuat.slerp(window._elevateChaseCam.quat, chaseBlend);
      }
      state.camera.quaternion.copy(tempQuat);
      window._snapCamera = false;
    } else {
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, finalPosX, 0.2);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, finalPosY, 0.2);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, finalPosZ, 0.2);
      
      // Use slerp for rotations for smoother pitching
      tempEuler.set(targetRotX, targetRotY, 0);
      tempQuat.setFromEuler(tempEuler);
      if (chaseBlend > 0 && window._elevateChaseCam) {
        tempQuat.slerp(window._elevateChaseCam.quat, chaseBlend);
      }
      state.camera.quaternion.slerp(tempQuat, 0.18);

      // Dynamic action FOV expansion for panoramic alpine clearance & warp speed dilation
      const fovBoost = window._teleportFovBoost || 0;
      const targetFov = THREE.MathUtils.lerp(75, 82, chaseBlend) + fovBoost;
      if (Math.abs(state.camera.fov - targetFov) > 0.05) {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 0.15);
        state.camera.updateProjectionMatrix();
      }
    }
    
    if (lightRef.current) {
      lightRef.current.position.copy(state.camera.position);
    }
  });

  return (
    <group>
      <perspectiveCamera makeDefault fov={75} position={[0, 0, 10]} far={30000} />
      <pointLight ref={lightRef} position={[0, 0, 0]} intensity={2} color="#ffffff" distance={150} />
      <ambientLight intensity={0.2} />
    </group>
  );
};

export const TimelineManager = () => {
  const scroll = useScroll();
  const [activeZones, setActiveZones] = useState({
    intro: true,
    w_matrix_intro: true,
    mindwave: false,
    wormhole_ice: false,
    icebreaker: false,
    wormhole_sound: false,
    interstellar: false,
    w_legal: false,
    legal: false,
    w_orbital: false,
    orbital: false,
    w_swarm: false,
    swarm: false,
    w_autopilot: false,
    autopilot: false,
    w_clove: false,
    clove: false,
    w_fantasy: false,
    fantasy: false,
    w_contango: false,
    contango: false,
    w_sentaient: false,
    sentaient: false,
    w_elevate: false,
    elevate: false,
    w_sphinx: false,
    sphinx: false,
    w_liquid: false,
    liquid: false,
    w_maya: false,
    maya: false,
    w_pyramid: false,
    pyramid: false,
    w_matrix: false,
    matrix: false,
    w_lightspeed: false,
    lightspeed: false
  });
  
  const activeZonesRef = useRef(activeZones);
  const visitedPauseWorldsRef = useRef({});

  useEffect(() => {
    return () => {
      clearActiveWorldPause();
    };
  }, []);

  useFrame(() => {
    const p = (window._isTransitActive && window._warpProgress !== undefined)
      ? window._warpProgress 
      : scroll.offset;
    
    let newZones;
    if (window._isDirectTeleportActive && window._teleportActiveWorldId) {
      const activeId = window._teleportActiveWorldId;
      newZones = {
        intro: activeId === 'hub' || activeId === 'intro',
        w_matrix_intro: activeId === 'hub' || activeId === 'mindwave',
        w_mindwave: false,
        mindwave: activeId === 'mindwave',
        wormhole_ice: false,
        icebreaker: activeId === 'icebreaker', 
        wormhole_sound: false,
        interstellar: activeId === 'interstellar', 
        w_legal: false,
        legal: activeId === 'legal',
        w_autopilot: false,
        autopilot: activeId === 'autopilot',
        w_clove: false,
        clove: activeId === 'clove',
        w_fantasy: false,
        fantasy: activeId === 'fantasy',
        w_contango: false,
        contango: activeId === 'contango',
        w_sentaient: false,
        sentaient: activeId === 'sentaient',
        w_elevate: false,
        elevate: activeId === 'elevate',
        w_sphinx: false,
        sphinx: activeId === 'sphinx',
        w_liquid: false,
        liquid: activeId === 'liquid',
        w_maya: false,
        maya: activeId === 'maya',
        w_pyramid: false,
        pyramid: activeId === 'pyramid',
        w_matrix: false,
        matrix: activeId === 'matrix',
        w_lightspeed: false,
        lightspeed: activeId === 'lightspeed'
      };
    } else {
      // Smooth preloading of 2-3 worlds in advance to eliminate frame hitching and shader compilation lag
      newZones = {
        intro: p < 0.025,
        w_matrix_intro: p >= 0.000 && p < 0.038,
        w_mindwave: p >= 0.002 && p < 0.030,
        mindwave: p >= 0.000 && p < 0.080, // Preloaded at hub, warm in GPU
        wormhole_ice: p >= 0.045 && p < 0.118,
        icebreaker: p >= 0.000 && p < 0.180, // Preloaded at hub before dive
        wormhole_sound: p >= 0.145 && p < 0.198,
        interstellar: p >= 0.025 && p < 0.245, // Preloaded 2 worlds in advance
        w_legal: p >= 0.210 && p < 0.246,
        legal: p >= 0.100 && p < 0.285, // Preloaded 2-3 worlds in advance
        w_autopilot: p >= 0.258 && p < 0.292,
        autopilot: p >= 0.160 && p < 0.330, // Preloaded 2-3 worlds in advance
        w_clove: p >= 0.302 && p < 0.338,
        clove: p >= 0.210 && p < 0.380, // Preloaded 2-3 worlds in advance
        w_fantasy: p >= 0.355 && p < 0.412,
        fantasy: p >= 0.270 && p < 0.445, // Preloaded 2-3 worlds in advance
        w_contango: p >= 0.422 && p < 0.462,
        contango: p >= 0.320 && p < 0.495, // Preloaded 2-3 worlds in advance
        w_sentaient: p >= 0.472 && p < 0.502,
        sentaient: p >= 0.370 && p < 0.535, // Preloaded 2-3 worlds in advance
        w_elevate: p >= 0.520 && p < 0.546,
        elevate: p >= 0.410 && p < 0.575, // Preloaded 2-3 worlds in advance
        w_sphinx: p >= 0.560 && p < 0.608,
        sphinx: p >= 0.460 && p < 0.640, // Preloaded 2-3 worlds in advance
        w_liquid: p >= 0.620 && p < 0.666,
        liquid: p >= 0.520 && p < 0.700, // Preloaded 2-3 worlds in advance
        w_maya: p >= 0.675 && p < 0.726,
        maya: p >= 0.580 && p < 0.760, // Preloaded 2-3 worlds in advance
        w_pyramid: p >= 0.735 && p < 0.785,
        pyramid: p >= 0.640 && p < 0.840, // Preloaded 2-3 worlds in advance
        w_matrix: p >= 0.825 && p < 0.870,
        matrix: p >= 0.700 && p < 0.910, // Preloaded 2-3 worlds in advance
        w_lightspeed: p >= 0.885 && p < 0.940,
        lightspeed: p >= 0.770 && p <= 1.000 // Preloaded 2-3 worlds in advance
      };
    }

    // Unconditionally ensure wormholes are completely hidden at any world's focal point
    const isAtAnyFocalPoint = window._isWorldActionActive || 
      WORLD_PAUSE_STATIONS.some(st => Math.abs(st.p - p) < 0.012);
    if (isAtAnyFocalPoint) {
      newZones.w_mindwave = false;
      newZones.wormhole_ice = false;
      newZones.wormhole_sound = false;
      newZones.w_legal = false;
      newZones.w_autopilot = false;
      newZones.w_clove = false;
      newZones.w_fantasy = false;
      newZones.w_contango = false;
      newZones.w_sentaient = false;
      newZones.w_elevate = false;
      newZones.w_sphinx = false;
      newZones.w_liquid = false;
      newZones.w_maya = false;
      newZones.w_pyramid = false;
      newZones.w_matrix = false;
      newZones.w_lightspeed = false;
    }
    
    let changed = false;
    for (const key in newZones) {
      if (activeZonesRef.current[key] !== newZones[key]) {
        changed = true;
        break;
      }
    }
    
    if (changed) {
      activeZonesRef.current = newZones;
      setActiveZones(newZones);

      // Track dwell time in active world
      const activeWorldKey = Object.keys(WORLD_NAMES_MAP).find(k => newZones[k]);
      if (activeWorldKey) {
        analytics.startWorldDwell(WORLD_NAMES_MAP[activeWorldKey]);
      } else {
        analytics.endWorldDwell();
      }
    }

    // Mandatory Focal Pause for Every World
    if (!window._isTransitActive && !window._isWorldActionActive) {
      const scrollP = scroll.offset;
      
      // Reset visited flag when user has scrolled far enough away from the world's center
      WORLD_PAUSE_STATIONS.forEach((st) => {
        if (visitedPauseWorldsRef.current[st.id]) {
          const resetDist = st.id === 'icebreaker' ? 0.025 : 0.045;
          if (Math.abs(scrollP - st.p) > resetDist) {
            visitedPauseWorldsRef.current[st.id] = false;
          }
        }
      });

      // Reset Icebreaker state only if user scrolls all the way back before plunge tunnel (scrollP < 0.070)
      if (scrollP < 0.070) {
        if (window._icebreakerMeltState && window._icebreakerMeltState !== 'idle') {
          window._icebreakerMeltState = 'idle';
          window.icebreakerThaw = 0.0;
          window.icebreakerThawLocked = false;
          window._icebreakerLockCamera = false;
          window._isWorldActionActive = false;
          if (window._icebreakerCam) {
            window._icebreakerCam.active = false;
            window._icebreakerCam = null;
          }
        }
      }

      // Check if user has entered any world's pause zone
      for (let i = 0; i < WORLD_PAUSE_STATIONS.length; i++) {
        const st = WORLD_PAUSE_STATIONS[i];
        if (!visitedPauseWorldsRef.current[st.id]) {
          if (scrollP >= st.triggerMin && scrollP <= st.triggerMax) {
            visitedPauseWorldsRef.current[st.id] = true;
            startWorldPause(st);
            break;
          }
        }
      }
    }
  });

  return (
    <group>
      <MiniWorldsHub visible={activeZones.intro} />
      <WormholeMatrix startZ={20} endZ={-1100} visible={activeZones.w_matrix_intro} />
      <WormholeMindWave position={[0, 0, -425]} rotation={[Math.PI / 2, 0, 0]} length={1100} visible={activeZones.w_mindwave} />
      
      <WorldMindWave position={[0, 0, -1350]} visible={activeZones.mindwave} />
      
      {/* Plunge tunnel down Y axis (flush with lake surface Y=+300 down to Y=-4500) */}
      <WormholeIce position={[0, -2100, -1250]} rotation={[0, 0, 0]} length={4800} visible={activeZones.wormhole_ice} />
      
      {/* Icebreaker Cavern */}
      <WorldIcebreaker position={[0, -4000, -2550]} visible={activeZones.icebreaker} />
      
      <WormholeSoundwaves position={[0, -4000, -5050]} rotation={[Math.PI/2, 0, 0]} length={6400} visible={activeZones.wormhole_sound} />

      {/* Interstellar */}
      <Interstellar position={[0, -4000, -7550]} rotation={[0, 0, 0]} visible={activeZones.interstellar} />

      <WormholeLegal position={[0, -4000, -9050]} rotation={[Math.PI/2, 0, 0]} length={3800} visible={activeZones.w_legal} />
      
      <LegalEagle position={[0, -4000, -10550]} rotation={[0, 0, 0]} visible={activeZones.legal} />

      <WormholeAutopilot position={[0, -4000, -12050]} rotation={[Math.PI/2, 0, 0]} length={3600} visible={activeZones.w_autopilot} />

      <WorldAutopilot position={[0, -4000, -13550]} rotation={[0, 0, 0]} visible={activeZones.autopilot} />

      <WormholeClove position={[0, -4000, -15050]} rotation={[Math.PI/2, 0, 0]} length={3600} visible={activeZones.w_clove} />

      <WorldCloveH2O position={[0, -4000, -16550]} rotation={[0, 0, 0]} visible={activeZones.clove} />

      <WormholeWaterslide position={[0, -7800, -16550]} rotation={[0, 0, 0]} length={14000} visible={activeZones.w_fantasy} />

      <WorldFantasyQuant position={[0, -11700, -17500]} rotation={[0, 0, 0]} visible={activeZones.fantasy} />

      <WormholeContango position={[0, -11750, -21000]} length={11000} visible={activeZones.w_contango} />

      <ContangoQuant position={[0, -11750, -24800]} rotation={[0, 0, 0]} visible={activeZones.contango} />

      <WormholeSentaient position={[0, -11750, -27125]} rotation={[Math.PI/2, 0, 0]} length={6500} visible={activeZones.w_sentaient} />

      <WorldSentaient position={[0, -11750, -29350]} rotation={[0, 0, 0]} visible={activeZones.sentaient} />
      
      <WormholeElevate position={[0, -11750, -31500]} rotation={[Math.PI/2, 0, 0]} length={5000} visible={activeZones.w_elevate} />
      <WorldElevate position={[0, -11750, -33000]} visible={activeZones.elevate} />
      
      <WormholeSphinx position={[0, -11750, -35000]} rotation={[Math.PI/2, 0, 0]} length={5200} visible={activeZones.w_sphinx} />
      <WorldSphinx position={[0, -11750, -37000]} visible={activeZones.sphinx} />
      
      <WormholeLiquid position={[0, -11750, -39000]} rotation={[Math.PI/2, 0, 0]} length={5600} visible={activeZones.w_liquid} />
      <WorldLiquid position={[0, -11750, -41000]} visible={activeZones.liquid} />
      
      <WormholeMaya position={[0, -11750, -43000]} rotation={[Math.PI/2, 0, 0]} length={5400} visible={activeZones.w_maya} />
      <WorldMaya position={[0, -11750, -45000]} visible={activeZones.maya} />
      
      <WormholePyramid position={[0, -11750, -47000]} rotation={[Math.PI/2, 0, 0]} length={5000} visible={activeZones.w_pyramid} />
      <WorldPyramid position={[0, -11750, -49000]} visible={activeZones.pyramid} />
      
      <WormholeMatrixTeam position={[0, -11750, -51000]} rotation={[Math.PI/2, 0, 0]} length={5600} visible={activeZones.w_matrix} />
      <WorldMatrix position={[0, -11750, -53000]} visible={activeZones.matrix} />
      
      <WormholeLightSpeed position={[0, -11750, -55000]} rotation={[Math.PI/2, 0, 0]} length={5200} visible={activeZones.w_lightspeed} />
      <WorldLightSpeed position={[0, -11750, -57000]} visible={activeZones.lightspeed} />
    </group>
  );
};

