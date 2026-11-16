import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
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

  // Candlesticks Wormhole -> leads to Contango
  { p: 0.440, x: 0, y: -11750, z: -21950, rx: 0, ry: 0 }, 
  { p: 0.450, x: 0, y: -11750, z: -25950, rx: 0, ry: 0 }, 

  // Contango (Center at Z=-27600)
  { p: 0.455, x: 0, y: -11750, z: -27600, rx: 0, ry: 0 }, // Arrive Contango
  { p: 0.470, x: 0, y: -11750, z: -27600, rx: 0, ry: 0 }, // PAUSE Contango
  { p: 0.475, x: 0, y: -11750, z: -28600, rx: 0, ry: 0 }, // Exit Contango

  // Elevate (Center at Z=-32400, Summit at Z=-31660)
  { p: 0.480, x: 0, y: -11750, z: -29200, rx: 0.32, ry: 0 }, // Smooth pitch-up into glacial wormhole mouth
  { p: 0.489, x: 0, y: -11050, z: -30016, rx: 0.58, ry: 0 }, // Steady glide up center of ice cave
  { p: 0.498, x: 0, y: -10320, z: -30867, rx: 0.48, ry: 0 }, // Rising through swirling snow cave
  { p: 0.505, x: 0, y: -9820, z: -31450, rx: 0.12, ry: 0 }, // Smoothly level out over alpine ridge
  { p: 0.512, x: 0, y: -9915, z: -31660, rx: -0.15, ry: 0 }, // Arrive Elevate summit
  { p: 0.528, x: 0, y: -9915, z: -31660, rx: -0.15, ry: 0 }, // PAUSE Elevate (Panoramic summit view)
  { p: 0.542, x: 0, y: -11750, z: -33400, rx: 0, ry: 0 }, // Fly through into Sphinx
  
  // Sphinx (Center at Z=-36400, Camera holds at Z=-36080, zoomed in)
  { p: 0.552, x: 0, y: -11750, z: -34600, rx: 0, ry: 0 },
  { p: 0.572, x: 0, y: -11750, z: -36080, rx: 0, ry: 0 }, // Arrive Sphinx (Zoomed in)
  { p: 0.592, x: 0, y: -11750, z: -36080, rx: 0, ry: 0 }, // PAUSE Sphinx (Zoomed in)
  { p: 0.605, x: 0, y: -11750, z: -37400, rx: 0, ry: 0 },
  
  // Liquid (Center at Z=-40400, Camera holds at Z=-40000)
  { p: 0.615, x: 0, y: -11750, z: -38400, rx: 0, ry: 0 },
  { p: 0.638, x: 0, y: -11750, z: -40000, rx: 0, ry: 0 },
  { p: 0.658, x: 0, y: -11750, z: -40000, rx: 0, ry: 0 }, // PAUSE Liquid
  { p: 0.670, x: 0, y: -11750, z: -41900, rx: 0, ry: 0 },
  
  // Maya (Center at Z=-44400, Camera holds at Z=-43800)
  { p: 0.680, x: 0, y: -11750, z: -42800, rx: 0, ry: 0 },
  { p: 0.702, x: 0, y: -11750, z: -43800, rx: 0, ry: 0 }, // Arrive Maya (Holographic Avatar)
  { p: 0.722, x: 0, y: -11750, z: -43800, rx: 0, ry: 0 }, // PAUSE Maya
  { p: 0.735, x: 0, y: -11750, z: -45900, rx: 0, ry: 0 },
  
  // PyRAmid (Center at Z=-48400, Camera holds at Z=-47750)
  { p: 0.748, x: 0, y: -11750, z: -46400, rx: 0, ry: 0 },
  { p: 0.768, x: 0, y: -11750, z: -47750, rx: 0, ry: 0 }, // Arrive PyRAmid
  { p: 0.788, x: 0, y: -11750, z: -47750, rx: 0, ry: 0 }, // PAUSE PyRAmid
  { p: 0.800, x: 0, y: -11750, z: -49400, rx: 0, ry: 0 }, // Exit PyRAmid
  
  // Matrix (Center at Z=-52400, Camera holds at Z=-52020)
  { p: 0.812, x: 0, y: -11750, z: -50400, rx: 0, ry: 0 },
  { p: 0.832, x: 0, y: -11750, z: -52020, rx: 0, ry: 0 }, // Arrive Matrix
  { p: 0.852, x: 0, y: -11750, z: -52020, rx: 0, ry: 0 }, // PAUSE Matrix
  { p: 0.865, x: 0, y: -11750, z: -53400, rx: 0, ry: 0 },
  
  // LightSpeed (Center at Z=-56400, Camera holds at Z=-55650)
  { p: 0.870, x: 0, y: -11750, z: -54400, rx: 0, ry: 0 },
  { p: 0.885, x: 0, y: -11750, z: -55650, rx: 0, ry: 0 }, // Arrive LightSpeed
  { p: 0.900, x: 0, y: -11750, z: -55650, rx: 0, ry: 0 }, // PAUSE LightSpeed
  { p: 0.910, x: 0, y: -11750, z: -57400, rx: 0, ry: 0 }, // Exit LightSpeed into CloveH2O wormhole

  // CloveH2O Wormhole & World (Center at Z=-59950, Camera holds at Y=-11730, Z=-59250)
  { p: 0.920, x: 0, y: -11730, z: -58400, rx: 0, ry: 0 },
  { p: 0.932, x: 0, y: -11730, z: -59250, rx: 0, ry: 0 }, // Arrive CloveH2O
  { p: 0.946, x: 0, y: -11730, z: -59250, rx: 0, ry: 0 }, // PAUSE CloveH2O
  { p: 0.952, x: 0, y: -11950, z: -59950, rx: -0.95, ry: 0 }, // Plunge into center of CloveH2O ocean
  { p: 0.958, x: 0, y: -13500, z: -60130, rx: -1.455, ry: 0 }, // Inside Sentaient wormhole looking straight down
  { p: 0.964, x: 0, y: -15200, z: -60328, rx: -1.455, ry: 0 }, // Descending through ocean wormhole toward Sentaient

  // SentAIent Grand Finale (Center at Y=-16250, Z=-61200, Camera holds at Y=-16250, Z=-60450)
  { p: 0.972, x: 0, y: -16250, z: -60450, rx: 0, ry: 0 }, // Arrive Sentaient Grand Finale
  { p: 0.986, x: 0, y: -16250, z: -60450, rx: 0, ry: 0 }, // PAUSE Sentaient (Monumental Studio & Venture Lab)
  { p: 0.993, x: 0, y: -16250, z: -62000, rx: 0, ry: 0 }, // Hyper-warp acceleration back to Home Hub
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
  const portraitOffsetRef = useRef(0);
  const lastAppliedOffsetYRef = useRef(0);

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
        if (state.camera.position.z >= -30600 && state.camera.position.z <= -27950) {
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
      let needsProjUpdate = false;
      if (Math.abs(state.camera.fov - targetFov) > 0.05) {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 0.15);
        needsProjUpdate = true;
      }

      // On portrait phones inside a world, shift the 3D scene upward so gameplay sits above the bottom card
      const isPortraitPhoneInWorld = state.size.width < 768 && aspect < 0.85 && !window._isTransitActive && progress >= 0.025;
      const targetPortraitOffset = isPortraitPhoneInWorld ? 0.15 : 0;
      portraitOffsetRef.current = THREE.MathUtils.lerp(portraitOffsetRef.current, targetPortraitOffset, 0.14);
      const offsetY = portraitOffsetRef.current > 0.002 ? Math.round(state.size.height * portraitOffsetRef.current) : 0;
      if (offsetY !== lastAppliedOffsetYRef.current) {
        lastAppliedOffsetYRef.current = offsetY;
        if (offsetY > 0) {
          state.camera.setViewOffset(state.size.width, state.size.height, 0, offsetY, state.size.width, state.size.height);
        } else {
          state.camera.clearViewOffset();
        }
        needsProjUpdate = true;
      }

      if (needsProjUpdate) {
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
  const [prewarmedZones, setPrewarmedZones] = useState({});
  
  const activeZonesRef = useRef(activeZones);
  const visitedPauseWorldsRef = useRef({});

  useEffect(() => {
    const WORLD_PRELOAD_ZONES = {
      mindwave: ['w_mindwave', 'mindwave'],
      icebreaker: ['wormhole_ice', 'icebreaker'],
      interstellar: ['wormhole_sound', 'interstellar'],
      'legal eagle': ['w_legal', 'legal'],
      autopilot: ['w_autopilot', 'autopilot'],
      fantasyquant: ['w_fantasy', 'fantasy'],
      contango: ['w_contango', 'contango'],
      elevate: ['w_elevate', 'elevate'],
      sphinx: ['w_sphinx', 'sphinx'],
      liquid: ['w_liquid', 'liquid'],
      maya: ['w_maya', 'maya'],
      pyramid: ['w_pyramid', 'pyramid'],
      matrix: ['w_matrix', 'matrix'],
      lightspeed: ['w_lightspeed', 'lightspeed'],
      cloveh2o: ['w_clove', 'clove'],
      sentaient: ['w_sentaient', 'sentaient'],
    };

    const prewarmKeys = (keys) => {
      if (!keys || keys.length === 0) return;
      setPrewarmedZones((prev) => {
        if (keys.every((k) => prev[k])) return prev;
        const next = { ...prev };
        keys.forEach((k) => { next[k] = true; });
        return next;
      });
    };

    window._preloadWorldByName = (name) => {
      if (!name) return;
      const key = String(name).trim().toLowerCase();
      const zones = WORLD_PRELOAD_ZONES[key];
      if (zones) prewarmKeys(zones);
    };

    // Staggered background asset & zone preloading after Hub settles so wormhole exits never freeze
    const textureAssets = [
      '/interstellar_logo_final.png',
      '/legal_eagle_logo.png',
      '/legal_eagle_courtroom_bg.jpg',
      '/autopilot_logo.png',
      '/nfl_football_field.png',
      '/fantasyquant_wizard_bright.png',
      '/assets/images/contango_quant_logo_new.png',
      '/elevate_logo_final.png',
      '/sphinx_logo_final.png',
      '/liquid_logo_gold.png',
      '/maya_logo_final.png',
      '/pyramid_logo_final.png',
      '/matrix_logo_bright.png',
      '/lightspeed_logo_gold.png',
      '/sentaient_logo_final.png',
    ];
    const zoneQueue = [
      'w_mindwave', 'mindwave',
      'wormhole_ice', 'icebreaker',
      'wormhole_sound', 'interstellar',
      'w_legal', 'legal',
      'w_autopilot', 'autopilot',
      'w_fantasy', 'fantasy',
      'w_contango', 'contango',
      'w_elevate', 'elevate',
      'w_sphinx', 'sphinx',
      'w_liquid', 'liquid',
      'w_maya', 'maya',
      'w_pyramid', 'pyramid',
      'w_matrix', 'matrix',
      'w_lightspeed', 'lightspeed',
      'w_clove', 'clove',
      'w_sentaient', 'sentaient',
    ];

    let cancelled = false;
    const timers = [];
    let idleHandle = null;

    const scheduleIdleStep = (idx) => {
      if (cancelled || idx >= zoneQueue.length) return;
      const runStep = () => {
        if (cancelled) return;
        prewarmKeys([zoneQueue[idx]]);
        const t = setTimeout(() => scheduleIdleStep(idx + 1), 280);
        timers.push(t);
      };
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(runStep, { timeout: 600 });
      } else {
        const t = setTimeout(runStep, 300);
        timers.push(t);
      }
    };

    const startTimer = setTimeout(() => {
      try { useGLTF.preload('/avatars/maya-holo.glb', true, true); } catch (e) {}
      textureAssets.forEach((url, idx) => {
        const t = setTimeout(() => {
          try { useLoader.preload(THREE.TextureLoader, url); } catch (e) {}
        }, idx * 160);
        timers.push(t);
      });
      scheduleIdleStep(0);
    }, 1200);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      timers.forEach(clearTimeout);
      if (idleHandle !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
      delete window._preloadWorldByName;
      clearActiveWorldPause();
    };
  }, []);

  useFrame(() => {
    const p = (window._isTransitActive && window._warpProgress !== undefined)
      ? window._warpProgress 
      : scroll.offset;
    
    let newZones;
    if (window._isDirectTeleportActive && (window._teleportActiveWorldId || window._teleportTargetWorldId)) {
      const activeId = window._teleportActiveWorldId;
      const targetId = window._teleportTargetWorldId;
      const isActiveOrPreloading = (id) => activeId === id || targetId === id;
      newZones = {
        intro: activeId === 'hub' || activeId === 'intro',
        w_matrix_intro: activeId === 'hub',
        w_mindwave: false,
        mindwave: isActiveOrPreloading('mindwave'),
        wormhole_ice: false,
        icebreaker: isActiveOrPreloading('icebreaker'), 
        wormhole_sound: false,
        interstellar: isActiveOrPreloading('interstellar'), 
        w_legal: false,
        legal: isActiveOrPreloading('legal'),
        w_autopilot: false,
        autopilot: isActiveOrPreloading('autopilot'),
        w_clove: false,
        clove: isActiveOrPreloading('clove'),
        w_fantasy: false,
        fantasy: isActiveOrPreloading('fantasy'),
        w_contango: false,
        contango: isActiveOrPreloading('contango'),
        w_sentaient: activeId === 'sentaient' && p < 0.972,
        sentaient: isActiveOrPreloading('sentaient'),
        w_elevate: false,
        elevate: isActiveOrPreloading('elevate'),
        w_sphinx: false,
        sphinx: isActiveOrPreloading('sphinx'),
        w_liquid: false,
        liquid: isActiveOrPreloading('liquid'),
        w_maya: false,
        maya: isActiveOrPreloading('maya'),
        w_pyramid: false,
        pyramid: isActiveOrPreloading('pyramid'),
        w_matrix: false,
        matrix: isActiveOrPreloading('matrix'),
        w_lightspeed: false,
        lightspeed: isActiveOrPreloading('lightspeed')
      };
    } else {
      // Early look-ahead mounting: each world mounts at the start of its preceding wormhole
      // so geometry & shaders warm up during wormhole transit instead of stalling at the exit.
      newZones = {
        intro: p < 0.025,
        w_matrix_intro: p >= 0.000 && p < 0.038,
        w_mindwave: p >= 0.015 && p < 0.030,
        mindwave: p >= 0.005 && p < 0.065,
        wormhole_ice: p >= 0.048 && p < 0.120,
        icebreaker: p >= 0.045 && p < 0.165,
        wormhole_sound: p >= 0.145 && p < 0.195,
        interstellar: p >= 0.140 && p < 0.228,
        w_legal: p >= 0.215 && p < 0.245,
        legal: p >= 0.205 && p < 0.272,
        w_autopilot: p >= 0.260 && p < 0.286,
        autopilot: p >= 0.250 && p < 0.315,
        w_fantasy: p >= 0.310 && p < 0.412,
        fantasy: p >= 0.285 && p < 0.438,
        w_contango: p >= 0.428 && p < 0.458,
        contango: p >= 0.415 && p < 0.480,
        w_elevate: p >= 0.475 && p < 0.504,
        elevate: p >= 0.465 && p < 0.540,
        w_sphinx: p >= 0.535 && p < 0.570,
        sphinx: p >= 0.520 && p < 0.602,
        w_liquid: p >= 0.598 && p < 0.635,
        liquid: p >= 0.585 && p < 0.668,
        w_maya: p >= 0.664 && p < 0.700,
        maya: p >= 0.650 && p < 0.732,
        w_pyramid: p >= 0.728 && p < 0.765,
        pyramid: p >= 0.715 && p < 0.798,
        w_matrix: p >= 0.794 && p < 0.830,
        matrix: p >= 0.780 && p < 0.862,
        w_lightspeed: p >= 0.858 && p < 0.885,
        lightspeed: p >= 0.840 && p < 0.910,
        w_clove: p >= 0.905 && p < 0.932,
        clove: p >= 0.890 && p < 0.955,
        w_sentaient: p >= 0.950 && p < 0.972,
        sentaient: p >= 0.935 && p <= 1.000
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
        {(activeZones.w_mindwave || prewarmedZones.w_mindwave) && <WormholeMindWave position={[0, 0, -425]} rotation={[Math.PI / 2, 0, 0]} length={1100} visible={activeZones.w_mindwave} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.mindwave || prewarmedZones.mindwave) && <WorldMindWave position={[0, 0, -1350]} visible={activeZones.mindwave} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.wormhole_ice || prewarmedZones.wormhole_ice) && <WormholeIce position={[0, -2330, -1250]} rotation={[0, 0, 0]} length={4340} visible={activeZones.wormhole_ice} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.icebreaker || prewarmedZones.icebreaker) && <WorldIcebreaker position={[0, -4000, -2550]} visible={activeZones.icebreaker} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.wormhole_sound || prewarmedZones.wormhole_sound) && <WormholeSoundwaves position={[0, -4000, -5050]} rotation={[Math.PI/2, 0, 0]} length={6400} visible={activeZones.wormhole_sound} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.interstellar || prewarmedZones.interstellar) && <Interstellar position={[0, -4000, -7550]} rotation={[0, 0, 0]} visible={activeZones.interstellar} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_legal || prewarmedZones.w_legal) && <WormholeLegal position={[0, -4000, -9050]} rotation={[Math.PI/2, 0, 0]} length={3800} visible={activeZones.w_legal} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.legal || prewarmedZones.legal) && <LegalEagle position={[0, -4000, -10550]} rotation={[0, 0, 0]} visible={activeZones.legal} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_autopilot || prewarmedZones.w_autopilot) && <WormholeAutopilot position={[0, -4000, -13600]} rotation={[Math.PI/2, 0, 0]} length={5100} visible={activeZones.w_autopilot} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.autopilot || prewarmedZones.autopilot) && <WorldAutopilot position={[0, -4000, -16950]} rotation={[0, 0, 0]} visible={activeZones.autopilot} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_fantasy || prewarmedZones.w_fantasy) && <WormholeWaterslide position={[0, -7715, -19000]} rotation={[0.2741, 0, 0]} length={7760} visible={activeZones.w_fantasy} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.fantasy || prewarmedZones.fantasy) && <WorldFantasyQuant position={[0, -11700, -20900]} rotation={[0, 0, 0]} visible={activeZones.fantasy} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_contango || prewarmedZones.w_contango) && <WormholeContango position={[0, -11750, -21600]} length={5500} visible={activeZones.w_contango} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.contango || prewarmedZones.contango) && <ContangoQuant position={[0, -11750, -28200]} rotation={[0, 0, 0]} visible={activeZones.contango} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_elevate || prewarmedZones.w_elevate) && <WormholeElevate position={[0, -10785, -30325]} rotation={[-0.8618, 0, 0]} length={2600} visible={activeZones.w_elevate} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.elevate || prewarmedZones.elevate) && <WorldElevate position={[0, -11750, -32400]} visible={activeZones.elevate} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_sphinx || prewarmedZones.w_sphinx) && <WormholeSphinx position={[0, -11750, -34400]} rotation={[Math.PI/2, 0, 0]} length={3600} visible={activeZones.w_sphinx} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.sphinx || prewarmedZones.sphinx) && <WorldSphinx position={[0, -11750, -36400]} visible={activeZones.sphinx} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_liquid || prewarmedZones.w_liquid) && <WormholeLiquid position={[0, -11750, -38400]} rotation={[Math.PI/2, 0, 0]} length={3600} visible={activeZones.w_liquid} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.liquid || prewarmedZones.liquid) && <WorldLiquid position={[0, -11750, -40400]} visible={activeZones.liquid} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_maya || prewarmedZones.w_maya) && <WormholeMaya position={[0, -11750, -42400]} rotation={[Math.PI/2, 0, 0]} length={3600} visible={activeZones.w_maya} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.maya || prewarmedZones.maya) && <WorldMaya position={[0, -11750, -44400]} visible={activeZones.maya} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_pyramid || prewarmedZones.w_pyramid) && <WormholePyramid position={[0, -11750, -46400]} rotation={[Math.PI/2, 0, 0]} length={3600} visible={activeZones.w_pyramid} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.pyramid || prewarmedZones.pyramid) && <WorldPyramid position={[0, -11750, -48400]} visible={activeZones.pyramid} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_matrix || prewarmedZones.w_matrix) && <WormholeMatrixTeam position={[0, -11750, -50400]} rotation={[Math.PI/2, 0, 0]} length={3600} visible={activeZones.w_matrix} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.matrix || prewarmedZones.matrix) && <WorldMatrix position={[0, -11750, -52400]} visible={activeZones.matrix} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_lightspeed || prewarmedZones.w_lightspeed) && <WormholeLightSpeed position={[0, -11750, -54400]} rotation={[Math.PI/2, 0, 0]} length={3600} visible={activeZones.w_lightspeed} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.lightspeed || prewarmedZones.lightspeed) && <WorldLightSpeed position={[0, -11750, -56400]} visible={activeZones.lightspeed} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_clove || prewarmedZones.w_clove) && <WormholeClove position={[0, -11750, -58400]} rotation={[Math.PI/2, 0, 0]} length={3600} visible={activeZones.w_clove} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.clove || prewarmedZones.clove) && <WorldCloveH2O position={[0, -11750, -59950]} rotation={[0, 0, 0]} visible={activeZones.clove} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.w_sentaient || prewarmedZones.w_sentaient) && <WormholeSentaient position={[0, -14100, -60200]} rotation={[0.11576, 0, 0]} length={4400} visible={activeZones.w_sentaient} />}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {(activeZones.sentaient || prewarmedZones.sentaient) && <WorldSentaient position={[0, -16250, -61200]} rotation={[0, 0, 0]} visible={activeZones.sentaient} />}
      </React.Suspense>
    </group>
  );
};

