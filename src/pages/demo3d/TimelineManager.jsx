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
  elevate: 'Elevate',
  sphinx: 'Sphinx',
  liquid: 'Liquid',
  maya: 'Maya',
  pyramid: 'Pyramid',
  matrix: 'Matrix',
  lightspeed: 'LightSpeed',
  sentaient: 'sentAIent'
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
  { p: 0.131, x: 0, y: -3840, z: -2010, rx: -0.41, ry: 0 }, // Thawed / framing title, logo, fire & people cleanly
  { p: 0.145, x: 0, y: -3840, z: -2010, rx: -0.41, ry: 0 }, // Hold looking at fire & people
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
  
  // Autopilot Wormhole (3x longer: 5100 units from Z=-11050 to Z=-16150)
  { p: 0.275, x: 0, y: -3980, z: -13900, rx: 0, ry: 0 }, 
  
  // Autopilot (Center at Z=-16950)
  { p: 0.285, x: 0, y: -3980, z: -16250, rx: 0, ry: 0 }, // Arrive Autopilot (Zoomed out 700 units)
  { p: 0.300, x: 0, y: -3980, z: -16250, rx: 0, ry: 0 }, // PAUSE Autopilot
  { p: 0.312, x: 0, y: -3980, z: -17950, rx: 0, ry: 0 }, // Exit Autopilot directly into FantasyQuant waterslide
  
  // FantasyQuant Waterslide (Coaxial plunge straight from Autopilot exit into FantasyQuant stadium)
  { p: 0.322, x: 0, y: -4350, z: -18054, rx: -0.95, ry: 0 }, // Dive into flared mouth looking down barrel
  { p: 0.345, x: 0, y: -6220, z: -18580, rx: -1.2967, ry: 0 }, // Inside tube looking straight down wormhole
  { p: 0.375, x: 0, y: -8840, z: -19316, rx: -1.2967, ry: 0 }, // Descending straight down center of wormhole
  { p: 0.398, x: 0, y: -10950, z: -19909, rx: -0.85, ry: 0 }, // Flared exit leveling out toward stadium
  { p: 0.412, x: 0, y: -11450, z: -20050, rx: 0, ry: 0 }, // Arrive FantasyQuant (Level out facing field)
  { p: 0.422, x: 0, y: -11450, z: -20050, rx: 0, ry: 0 }, // PAUSE FantasyQuant
  { p: 0.430, x: 0, y: -11750, z: -21200, rx: 0, ry: 0 }, // Exit FantasyQuant

  // Candlesticks Wormhole (3.5x longer: 19250 units) -> now leads to Contango
  { p: 0.440, x: 0, y: -11750, z: -21950, rx: 0, ry: 0 }, 
  { p: 0.450, x: 0, y: -11750, z: -39700, rx: 0, ry: 0 }, 

  // Contango (Center at Z=-41350)
  { p: 0.455, x: 0, y: -11750, z: -41350, rx: 0, ry: 0 }, // Arrive Contango
  { p: 0.470, x: 0, y: -11750, z: -41350, rx: 0, ry: 0 }, // PAUSE Contango
  { p: 0.475, x: 0, y: -11750, z: -42350, rx: 0, ry: 0 }, // Exit Contango

  // Elevate (Center at Z=-46150, Summit at Z=-45410)
  { p: 0.480, x: 0, y: -11750, z: -42950, rx: 0.32, ry: 0 }, // Smooth pitch-up into glacial wormhole mouth
  { p: 0.489, x: 0, y: -11050, z: -43766, rx: 0.58, ry: 0 }, // Steady glide up center of ice cave
  { p: 0.498, x: 0, y: -10320, z: -44617, rx: 0.48, ry: 0 }, // Rising through swirling snow cave
  { p: 0.505, x: 0, y: -9820, z: -45200, rx: 0.12, ry: 0 }, // Smoothly level out over alpine ridge
  { p: 0.512, x: 0, y: -9915, z: -45410, rx: -0.15, ry: 0 }, // Arrive Elevate summit
  { p: 0.528, x: 0, y: -9915, z: -45410, rx: -0.15, ry: 0 }, // PAUSE Elevate (Panoramic summit view)
  { p: 0.542, x: 0, y: -11750, z: -47150, rx: 0, ry: 0 }, // Fly through into Sphinx
  
  // Sphinx (Center at Z=-50150, Camera holds at Z=-49830, zoomed in)
  { p: 0.552, x: 0, y: -11750, z: -48350, rx: 0, ry: 0 },
  { p: 0.572, x: 0, y: -11750, z: -49830, rx: 0, ry: 0 }, // Arrive Sphinx (Zoomed in)
  { p: 0.592, x: 0, y: -11750, z: -49830, rx: 0, ry: 0 }, // PAUSE Sphinx (Zoomed in)
  { p: 0.605, x: 0, y: -11750, z: -51150, rx: 0, ry: 0 },
  
  // Liquid (Center at Z=-54150, Camera holds at Z=-53750)
  { p: 0.615, x: 0, y: -11750, z: -52150, rx: 0, ry: 0 },
  { p: 0.638, x: 0, y: -11750, z: -53750, rx: 0, ry: 0 },
  { p: 0.658, x: 0, y: -11750, z: -53750, rx: 0, ry: 0 }, // PAUSE Liquid
  { p: 0.670, x: 0, y: -11750, z: -55650, rx: 0, ry: 0 },
  
  // Maya (Center at Z=-58150, Camera holds at Z=-57550)
  { p: 0.680, x: 0, y: -11750, z: -56550, rx: 0, ry: 0 },
  { p: 0.702, x: 0, y: -11750, z: -57550, rx: 0, ry: 0 }, // Arrive Maya (Holographic Avatar)
  { p: 0.722, x: 0, y: -11750, z: -57550, rx: 0, ry: 0 }, // PAUSE Maya
  { p: 0.735, x: 0, y: -11750, z: -59650, rx: 0, ry: 0 },
  
  // PyRAmid (Center at Z=-62150, Camera holds at Z=-61500)
  { p: 0.748, x: 0, y: -11750, z: -60150, rx: 0, ry: 0 },
  { p: 0.768, x: 0, y: -11750, z: -61500, rx: 0, ry: 0 }, // Arrive PyRAmid
  { p: 0.788, x: 0, y: -11750, z: -61500, rx: 0, ry: 0 }, // PAUSE PyRAmid
  { p: 0.800, x: 0, y: -11750, z: -63150, rx: 0, ry: 0 }, // Exit PyRAmid
  
  // Matrix (Center at Z=-66150, Camera holds at Z=-65770)
  { p: 0.812, x: 0, y: -11750, z: -64150, rx: 0, ry: 0 },
  { p: 0.832, x: 0, y: -11750, z: -65770, rx: 0, ry: 0 }, // Arrive Matrix
  { p: 0.852, x: 0, y: -11750, z: -65770, rx: 0, ry: 0 }, // PAUSE Matrix
  { p: 0.865, x: 0, y: -11750, z: -67150, rx: 0, ry: 0 },
  
  // LightSpeed (Center at Z=-70150, Camera holds at Z=-69400)
  { p: 0.870, x: 0, y: -11750, z: -68150, rx: 0, ry: 0 },
  { p: 0.885, x: 0, y: -11750, z: -69400, rx: 0, ry: 0 }, // Arrive LightSpeed
  { p: 0.900, x: 0, y: -11750, z: -69400, rx: 0, ry: 0 }, // PAUSE LightSpeed
  { p: 0.910, x: 0, y: -11750, z: -71150, rx: 0, ry: 0 }, // Exit LightSpeed into CloveH2O wormhole

  // CloveH2O Wormhole & World (Center at Z=-73700, Camera holds at Y=-11730, Z=-73000)
  { p: 0.920, x: 0, y: -11730, z: -72150, rx: 0, ry: 0 },
  { p: 0.932, x: 0, y: -11730, z: -73000, rx: 0, ry: 0 }, // Arrive CloveH2O
  { p: 0.946, x: 0, y: -11730, z: -73000, rx: 0, ry: 0 }, // PAUSE CloveH2O
  { p: 0.952, x: 0, y: -11950, z: -73700, rx: -0.95, ry: 0 }, // Plunge into center of CloveH2O ocean
  { p: 0.958, x: 0, y: -13500, z: -73880, rx: -1.455, ry: 0 }, // Inside Sentaient wormhole looking straight down
  { p: 0.964, x: 0, y: -15200, z: -74078, rx: -1.455, ry: 0 }, // Descending through ocean wormhole toward Sentaient

  // SentAIent Grand Finale (Center at Y=-16250, Z=-74950, Camera holds at Y=-16250, Z=-74200)
  { p: 0.972, x: 0, y: -16250, z: -74200, rx: 0, ry: 0 }, // Arrive Sentaient Grand Finale
  { p: 0.986, x: 0, y: -16250, z: -74200, rx: 0, ry: 0 }, // PAUSE Sentaient (Monumental Studio & Venture Lab)
  { p: 0.993, x: 0, y: -16250, z: -75750, rx: 0, ry: 0 }, // Hyper-warp acceleration back to Home Hub
  { p: 1.000, x: 0, y: 0, z: 10, rx: 0, ry: 0 }, // Return to Main Load Page (Home Hub)
];

if (typeof window !== 'undefined') {
  window._scrollTimeline = SCROLL_TIMELINE;
}

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
      if (window._elevateChaseCam.getMinSafeWorldY) {
        const minWorldY = window._elevateChaseCam.getMinSafeWorldY(finalPosZ);
        if (finalPosY < minWorldY) finalPosY = minWorldY;
      }
    }
    
    // Keep camera upright and level when returning to Hub or leaving Hub before destination wormhole entry
    if (window._isDirectTeleportActive && window._teleportWarp) {
      const isLeavingHub = window._teleportWarp.startStationId === 'hub' && (window._teleportWarp.progress || 0) < 0.35;
      if (window._teleportWarp.targetStationId === 'hub' || isLeavingHub) {
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

      // Post-lerp terrain clearance safeguard so camera can never clip through Elevate mountain during entry/chase lerp
      if (window._elevateChaseCam && window._elevateChaseCam.active && window._elevateChaseCam.getMinSafeWorldY) {
        if (state.camera.position.z >= -44350 && state.camera.position.z <= -41700) {
          const minSafeWorldY = window._elevateChaseCam.getMinSafeWorldY(state.camera.position.z);
          if (state.camera.position.y < minSafeWorldY) {
            state.camera.position.y = minSafeWorldY;
          }
        }
      }
      
      // Use slerp for rotations for smoother pitching
      tempEuler.set(targetRotX, targetRotY, 0);
      tempQuat.setFromEuler(tempEuler);
      if (chaseBlend > 0 && window._elevateChaseCam) {
        tempQuat.slerp(window._elevateChaseCam.quat, chaseBlend);
      }
      state.camera.quaternion.slerp(tempQuat, 0.18);

      // Dynamic action FOV expansion for panoramic alpine clearance, warp speed dilation,
      // and portrait phone/tablet aspect ratio compensation so the 3D Hub & Worlds never crop horizontally
      const fovBoost = window._teleportFovBoost || 0;
      const aspect = state.size.width / Math.max(1, state.size.height);
      const portraitFovBoost = aspect < 1.0 ? Math.min(34, (1.0 - aspect) * 48) : 0;
      const targetFov = THREE.MathUtils.lerp(75, 82, chaseBlend) + fovBoost + portraitFovBoost;
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
        w_matrix_intro: activeId === 'hub',
        w_mindwave: activeId === 'mindwave' && p < 0.030,
        mindwave: activeId === 'mindwave',
        wormhole_ice: activeId === 'icebreaker' && p < 0.120,
        icebreaker: activeId === 'icebreaker', 
        wormhole_sound: activeId === 'interstellar' && p < 0.195,
        interstellar: activeId === 'interstellar', 
        w_legal: activeId === 'legal' && p < 0.245,
        legal: activeId === 'legal',
        w_autopilot: activeId === 'autopilot' && p < 0.286,
        autopilot: activeId === 'autopilot',
        w_clove: activeId === 'clove' && p < 0.932,
        clove: activeId === 'clove',
        w_fantasy: activeId === 'fantasy' && p < 0.412,
        fantasy: activeId === 'fantasy',
        w_contango: activeId === 'contango' && p < 0.458,
        contango: activeId === 'contango',
        w_sentaient: activeId === 'sentaient' && p < 0.972,
        sentaient: activeId === 'sentaient',
        w_elevate: activeId === 'elevate' && p < 0.504,
        elevate: activeId === 'elevate',
        w_sphinx: activeId === 'sphinx' && p < 0.570,
        sphinx: activeId === 'sphinx',
        w_liquid: activeId === 'liquid' && p < 0.635,
        liquid: activeId === 'liquid',
        w_maya: activeId === 'maya' && p < 0.700,
        maya: activeId === 'maya',
        w_pyramid: activeId === 'pyramid' && p < 0.765,
        pyramid: activeId === 'pyramid',
        w_matrix: activeId === 'matrix' && p < 0.830,
        matrix: activeId === 'matrix',
        w_lightspeed: activeId === 'lightspeed' && p < 0.885,
        lightspeed: activeId === 'lightspeed'
      };
    } else {
      // Precision world & wormhole zone activation (strictly mutually exclusive, zero bleed/spillover)
      newZones = {
        intro: p < 0.025,
        w_matrix_intro: p >= 0.000 && p < 0.038,
        w_mindwave: p >= 0.015 && p < 0.030,
        mindwave: p >= 0.022 && p < 0.065,
        wormhole_ice: p >= 0.048 && p < 0.120,
        icebreaker: p >= 0.095 && p < 0.165,
        wormhole_sound: p >= 0.145 && p < 0.195,
        interstellar: p >= 0.180 && p < 0.228,
        w_legal: p >= 0.215 && p < 0.245,
        legal: p >= 0.235 && p < 0.272,
        w_autopilot: p >= 0.260 && p < 0.286,
        autopilot: p >= 0.278 && p < 0.315,
        w_fantasy: p >= 0.310 && p < 0.412,
        fantasy: p >= 0.320 && p < 0.438,
        w_contango: p >= 0.428 && p < 0.458,
        contango: p >= 0.448 && p < 0.480,
        w_elevate: p >= 0.475 && p < 0.504,
        elevate: p >= 0.500 && p < 0.540,
        w_sphinx: p >= 0.535 && p < 0.570,
        sphinx: p >= 0.565 && p < 0.602,
        w_liquid: p >= 0.598 && p < 0.635,
        liquid: p >= 0.630 && p < 0.668,
        w_maya: p >= 0.664 && p < 0.700,
        maya: p >= 0.695 && p < 0.732,
        w_pyramid: p >= 0.728 && p < 0.765,
        pyramid: p >= 0.760 && p < 0.798,
        w_matrix: p >= 0.794 && p < 0.830,
        matrix: p >= 0.825 && p < 0.862,
        w_lightspeed: p >= 0.858 && p < 0.885,
        lightspeed: p >= 0.875 && p < 0.910,
        w_clove: p >= 0.905 && p < 0.932,
        clove: p >= 0.925 && p < 0.955,
        w_sentaient: p >= 0.950 && p < 0.972,
        sentaient: p >= 0.960 && p <= 1.000
      };
    }

    // Unconditionally ensure wormholes are completely hidden at any world's focal point
    const isAtAnyFocalPoint = window._isWorldActionActive || 
      WORLD_PAUSE_STATIONS.some(st => Math.abs(st.p - p) < 0.005);
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

    // Mandatory Focal Pause for Every World (skipped during Auto Tour, which manages its own dwell)
    if (!window._isTransitActive && !window._isWorldActionActive && !window._isAutoTourActive) {
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
      {activeZones.intro && <MiniWorldsHub visible />}
      {activeZones.w_matrix_intro && <WormholeMatrix startZ={20} endZ={-1100} visible />}
      <React.Suspense fallback={null}>
        {activeZones.w_mindwave && <WormholeMindWave position={[0, 0, -425]} rotation={[Math.PI / 2, 0, 0]} length={1100} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.mindwave && <WorldMindWave position={[0, 0, -1350]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.wormhole_ice && <WormholeIce position={[0, -2330, -1250]} rotation={[0, 0, 0]} length={4340} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.icebreaker && <WorldIcebreaker position={[0, -4000, -2550]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.wormhole_sound && <WormholeSoundwaves position={[0, -4000, -5050]} rotation={[Math.PI/2, 0, 0]} length={6400} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.interstellar && <Interstellar position={[0, -4000, -7550]} rotation={[0, 0, 0]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_legal && <WormholeLegal position={[0, -4000, -9050]} rotation={[Math.PI/2, 0, 0]} length={3800} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.legal && <LegalEagle position={[0, -4000, -10550]} rotation={[0, 0, 0]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_autopilot && <WormholeAutopilot position={[0, -4000, -13600]} rotation={[Math.PI/2, 0, 0]} length={5100} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.autopilot && <WorldAutopilot position={[0, -4000, -16950]} rotation={[0, 0, 0]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_fantasy && <WormholeWaterslide position={[0, -7715, -19000]} rotation={[0.2741, 0, 0]} length={7760} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.fantasy && <WorldFantasyQuant position={[0, -11700, -20900]} rotation={[0, 0, 0]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_contango && <WormholeContango position={[0, -11750, -21600]} length={19250} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.contango && <ContangoQuant position={[0, -11750, -41950]} rotation={[0, 0, 0]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_elevate && <WormholeElevate position={[0, -10785, -44075]} rotation={[-0.8618, 0, 0]} length={2600} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.elevate && <WorldElevate position={[0, -11750, -46150]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_sphinx && <WormholeSphinx position={[0, -11750, -48150]} rotation={[Math.PI/2, 0, 0]} length={3600} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.sphinx && <WorldSphinx position={[0, -11750, -50150]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_liquid && <WormholeLiquid position={[0, -11750, -52150]} rotation={[Math.PI/2, 0, 0]} length={3600} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.liquid && <WorldLiquid position={[0, -11750, -54150]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_maya && <WormholeMaya position={[0, -11750, -56150]} rotation={[Math.PI/2, 0, 0]} length={3600} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.maya && <WorldMaya position={[0, -11750, -58150]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_pyramid && <WormholePyramid position={[0, -11750, -60150]} rotation={[Math.PI/2, 0, 0]} length={3600} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.pyramid && <WorldPyramid position={[0, -11750, -62150]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_matrix && <WormholeMatrixTeam position={[0, -11750, -64150]} rotation={[Math.PI/2, 0, 0]} length={3600} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.matrix && <WorldMatrix position={[0, -11750, -66150]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_lightspeed && <WormholeLightSpeed position={[0, -11750, -68150]} rotation={[Math.PI/2, 0, 0]} length={3600} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.lightspeed && <WorldLightSpeed position={[0, -11750, -70150]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_clove && <WormholeClove position={[0, -11750, -72150]} rotation={[Math.PI/2, 0, 0]} length={3600} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.clove && <WorldCloveH2O position={[0, -11750, -73700]} rotation={[0, 0, 0]} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.w_sentaient && <WormholeSentaient position={[0, -14100, -73950]} rotation={[0.11576, 0, 0]} length={4400} visible />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {activeZones.sentaient && <WorldSentaient position={[0, -16250, -74950]} rotation={[0, 0, 0]} visible />}
      </React.Suspense>
    </group>
  );
};

