import React, { useRef, useState } from 'react';
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

// Import Wormholes
import WormholeMatrix from './wormholes/WormholeMatrix';
import WormholeIce from './wormholes/WormholeIce';
import WormholeGeneric from './wormholes/WormholeGeneric';
import WormholeContango from './wormholes/WormholeContango';
import WormholeWaterslide from './wormholes/WormholeWaterslide';
import WormholeElevate from './wormholes/WormholeElevate';
import WormholeSphinx from './wormholes/WormholeSphinx';
import WormholeLiquid from './wormholes/WormholeLiquid';
import WormholeMaya from './wormholes/WormholeMaya';
import WormholePyramid from './wormholes/WormholePyramid';
import WormholeMatrixTeam from './wormholes/WormholeMatrixTeam';
import WormholeLightSpeed from './wormholes/WormholeLightSpeed';

// The Masterpiece Hybrid Timeline - Drop down into Icebreaker, then pure straight line Z-axis
export const SCROLL_TIMELINE = [
  // Intro -> MindWave (Center at Z=-1250)
  { p: 0.000, x: 0, y: 0, z: 10, rx: 0, ry: 0 },
  { p: 0.020, x: 0, y: 0, z: -250, rx: 0, ry: 0 },    
  { p: 0.030, x: 0, y: 0, z: -1250, rx: 0, ry: 0 }, // Arrive MindWave (Center)
  { p: 0.050, x: 0, y: 0, z: -1250, rx: 0, ry: 0 }, // PAUSE MindWave (4% gap)
  
  // Plunge straight down into Ice Wormhole (Drop 1)
  { p: 0.060, x: 0, y: 0, z: -1250, rx: -Math.PI / 2, ry: 0 }, // Start dive
  { p: 0.090, x: 0, y: -3000, z: -1250, rx: -Math.PI / 2, ry: 0 }, // Diving
  
  // Pull out of the dive into Icebreaker
  { p: 0.100, x: 0, y: -3980, z: -1750, rx: 0, ry: 0 }, // Level out
  { p: 0.110, x: 0, y: -3980, z: -1900, rx: 0, ry: 0 }, // Stop 1 (Blue People) - farther back
  { p: 0.120, x: 0, y: -3980, z: -1900, rx: 0, ry: 0 }, // PAUSE Stop 1
  { p: 0.130, x: 0, y: -3980, z: -2250, rx: 0, ry: 0 }, // Move to Stop 2 (Fire/Dance)
  { p: 0.135, x: 0, y: -3980, z: -2250, rx: 0, ry: 0 }, // PAUSE Stop 2 (Lock triggers here)
  { p: 0.140, x: 0, y: -3980, z: -2800, rx: 0, ry: 0 }, // Move to Stop 3 (Text Title)
  { p: 0.145, x: 0, y: -3980, z: -2800, rx: 0, ry: 0 }, // PAUSE Stop 3
  { p: 0.150, x: 0, y: -3980, z: -3250, rx: 0, ry: 0 }, // Start entering Wormhole
  
  // Soundwaves Wormhole 
  { p: 0.160, x: 0, y: -3980, z: -4000, rx: 0, ry: 0 },
  { p: 0.180, x: 0, y: -3980, z: -6250, rx: 0, ry: 0 },
  
  // Interstellar (Center at Z=-7550)
  { p: 0.190, x: 0, y: -3980, z: -7150, rx: 0, ry: 0 }, // Arrive Interstellar
  { p: 0.210, x: 0, y: -3980, z: -7150, rx: 0, ry: 0 }, // PAUSE Interstellar
  { p: 0.220, x: 0, y: -3980, z: -8250, rx: 0, ry: 0 }, // Exit Interstellar
  
// Legal Eagle (Center at Z=-10550)
  { p: 0.230, x: 0, y: -3980, z: -8750, rx: 0, ry: 0 }, 
  { p: 0.240, x: 0, y: -3980, z: -10550, rx: 0, ry: 0 }, // Arrive Legal Eagle
  { p: 0.255, x: 0, y: -3980, z: -10550, rx: 0, ry: 0 }, // PAUSE Legal Eagle
  { p: 0.265, x: 0, y: -3980, z: -11550, rx: 0, ry: 0 }, // Exit Legal Eagle
  
  // Autopilot Wormhole
  { p: 0.275, x: 0, y: -3980, z: -12550, rx: 0, ry: 0 }, 
  
  // Autopilot (Center at Z=-13550)
  { p: 0.285, x: 0, y: -3980, z: -13550, rx: 0, ry: 0 }, // Arrive Autopilot
  { p: 0.300, x: 0, y: -3980, z: -13550, rx: 0, ry: 0 }, // PAUSE Autopilot
  { p: 0.310, x: 0, y: -3980, z: -14550, rx: 0, ry: 0 }, // Exit Autopilot

  // CloveH2O Wormhole
  { p: 0.320, x: 0, y: -3980, z: -15550, rx: 0, ry: 0 }, 

  // CloveH2O (Center at Z=-16550)
  { p: 0.330, x: 0, y: -4000, z: -16550, rx: 0, ry: 0 }, // Arrive CloveH2O
  { p: 0.360, x: 0, y: -4000, z: -16550, rx: 0, ry: 0 }, // PAUSE CloveH2O
  
  // FantasyQuant Waterslide (Drop straight down from CloveH2O Z=-16550)
  { p: 0.370, x: 0, y: -4500, z: -16550, rx: -1.5, ry: 0 }, // Pitch down and drop
  { p: 0.395, x: 0, y: -12200, z: -16550, rx: -1.5, ry: 0 }, // Reach bottom
  { p: 0.405, x: 0, y: -11750, z: -17175, rx: -0.1, ry: 0 }, // Shoot out into stands
  { p: 0.420, x: 0, y: -11750, z: -17175, rx: -0.1, ry: 0 }, // PAUSE FantasyQuant
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
  { p: 0.490, x: 0, y: -11750, z: -29050, rx: 0, ry: 0 }, // Arrive Sentaient
  { p: 0.500, x: 0, y: -11750, z: -29050, rx: 0, ry: 0 }, // PAUSE Sentaient

  // Elevate (Center at Z=-33000)
  { p: 0.520, x: 0, y: -11750, z: -31000, rx: 0, ry: 0 },
  { p: 0.540, x: 0, y: -11750, z: -33000, rx: 0, ry: 0 }, // Arrive Elevate
  { p: 0.555, x: 0, y: -11750, z: -33000, rx: 0, ry: 0 }, // PAUSE Elevate
  { p: 0.570, x: 0, y: -11750, z: -34000, rx: 0, ry: 0 }, // Fly through
  
  // Sphinx
  { p: 0.580, x: 0, y: -11750, z: -35000, rx: 0, ry: 0 },
  { p: 0.600, x: 0, y: -11750, z: -37000, rx: 0, ry: 0 },
  { p: 0.620, x: 0, y: -11750, z: -38000, rx: 0, ry: 0 },
  
  // Liquid (Center at Z=-41750, Camera holds at Z=-41000, 750 units clearance)
  { p: 0.640, x: 0, y: -11750, z: -39000, rx: 0, ry: 0 },
  { p: 0.660, x: 0, y: -11750, z: -41000, rx: 0, ry: 0 },
  { p: 0.675, x: 0, y: -11750, z: -41000, rx: 0, ry: 0 }, // PAUSE Liquid at 750 units clearance
  { p: 0.690, x: 0, y: -11750, z: -42500, rx: 0, ry: 0 },
  
  // Maya (Center at Z=-45750, Camera holds at Z=-45000, 750 units clearance)
  { p: 0.705, x: 0, y: -11750, z: -43500, rx: 0, ry: 0 },
  { p: 0.720, x: 0, y: -11750, z: -45000, rx: 0, ry: 0 },
  { p: 0.735, x: 0, y: -11750, z: -45000, rx: 0, ry: 0 }, // PAUSE Maya
  { p: 0.755, x: 0, y: -11750, z: -46500, rx: 0, ry: 0 },
  
  // PyRAmid
  { p: 0.770, x: 0, y: -11750, z: -47000, rx: 0, ry: 0 },
  { p: 0.790, x: 0, y: -11750, z: -49000, rx: 0, ry: 0 },
  { p: 0.820, x: 0, y: -11750, z: -50000, rx: 0, ry: 0 },
  
  // Matrix
  { p: 0.840, x: 0, y: -11750, z: -51000, rx: 0, ry: 0 },
  { p: 0.860, x: 0, y: -11750, z: -53000, rx: 0, ry: 0 },
  { p: 0.890, x: 0, y: -11750, z: -54000, rx: 0, ry: 0 },
  
  // LightSpeed
  { p: 0.910, x: 0, y: -11750, z: -55000, rx: 0, ry: 0 },
  { p: 0.930, x: 0, y: -11750, z: -57000, rx: 0, ry: 0 },
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
    let progress = window._warpProgress !== undefined ? window._warpProgress : scroll.offset;
    window._currentProgress = progress;
    const targetPos = getPosFromProgress(progress);
    
    // Smooth Elevate Chase-Cam Integration
    let finalPosX = targetPos.x;
    let finalPosY = targetPos.y;
    let finalPosZ = targetPos.z;
    let chaseBlend = 0;
    
    if (window._elevateChaseCam && window._elevateChaseCam.active && window._elevateChaseCam.blend > 0) {
      chaseBlend = window._elevateChaseCam.blend;
      finalPosX = THREE.MathUtils.lerp(targetPos.x, window._elevateChaseCam.pos.x, chaseBlend);
      finalPosY = THREE.MathUtils.lerp(targetPos.y, window._elevateChaseCam.pos.y, chaseBlend);
      finalPosZ = THREE.MathUtils.lerp(targetPos.z, window._elevateChaseCam.pos.z, chaseBlend);
    }
    
    if (window._snapCamera) {
      state.camera.position.set(finalPosX, finalPosY, finalPosZ);
      tempEuler.set(targetPos.rx, targetPos.ry, 0);
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
      tempEuler.set(targetPos.rx, targetPos.ry, 0);
      tempQuat.setFromEuler(tempEuler);
      if (chaseBlend > 0 && window._elevateChaseCam) {
        tempQuat.slerp(window._elevateChaseCam.quat, chaseBlend);
      }
      state.camera.quaternion.slerp(tempQuat, 0.18);
      
      // Slight banking based on scroll speed (attenuated during chase cam)
      const velocity = scroll.delta * 10 * (1 - chaseBlend);
      // We add the banking on top of the slerped rotation
      state.camera.rotateZ(THREE.MathUtils.lerp(0, velocity * 2.0, 0.2));

      // Dynamic action FOV expansion for panoramic alpine clearance
      const targetFov = THREE.MathUtils.lerp(75, 82, chaseBlend);
      if (Math.abs(state.camera.fov - targetFov) > 0.05) {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 0.1);
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

  useFrame(() => {
    const p = window._warpProgress !== undefined ? window._warpProgress : scroll.offset;
    
    const newZones = {
      intro: p < 0.025,
      mindwave: p >= 0.020 && p < 0.058,
      wormhole_ice: p >= 0.055 && p < 0.098,
      icebreaker: p >= 0.095 && p < 0.150, 
      wormhole_sound: p >= 0.148 && p < 0.188,
      interstellar: p >= 0.188 && p < 0.222, 
      w_legal: p >= 0.220 && p < 0.245,
      legal: p >= 0.245 && p < 0.272,
      w_autopilot: p >= 0.272 && p < 0.290,
      autopilot: p >= 0.290 && p < 0.318,
      w_clove: p >= 0.318 && p < 0.338,
      clove: p >= 0.338 && p < 0.370,
      w_fantasy: p >= 0.370 && p < 0.408,
      fantasy: p >= 0.408 && p < 0.440,
      w_contango: p >= 0.440 && p < 0.460,
      contango: p >= 0.460 && p < 0.485,
      w_sentaient: p >= 0.485 && p < 0.495,
      sentaient: p >= 0.495 && p < 0.520,
      w_elevate: p >= 0.520 && p < 0.540,
      elevate: p >= 0.535 && p < 0.575,
      w_sphinx: p >= 0.570 && p < 0.590,
      sphinx: p >= 0.590 && p < 0.628,
      w_liquid: p >= 0.628 && p < 0.650,
      liquid: p >= 0.650 && p < 0.688,
      w_maya: p >= 0.688 && p < 0.710,
      maya: p >= 0.710 && p < 0.755,
      w_pyramid: p >= 0.755 && p < 0.780,
      pyramid: p >= 0.780 && p < 0.830,
      w_matrix: p >= 0.830 && p < 0.850,
      matrix: p >= 0.850 && p < 0.895,
      w_lightspeed: p >= 0.895 && p < 0.920,
      lightspeed: p >= 0.920,
    };
    
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
    }
  });

  return (
    <group>
      <MiniWorldsHub />
      <WormholeMatrix startZ={10} endZ={-1250} visible={activeZones.intro} />
      
      <WorldMindWave position={[0, 0, -1350]} visible={activeZones.mindwave} />
      
      {/* Plunge tunnel down Y axis */}
      <WormholeIce position={[0, -2000, -1250]} rotation={[0, 0, 0]} length={4200} visible={activeZones.wormhole_ice} />
      
      {/* Icebreaker Cavern */}
      <WorldIcebreaker position={[0, -4000, -2550]} visible={activeZones.icebreaker} />
      
      <WormholeGeneric position={[0, -4000, -5400]} rotation={[Math.PI/2, 0, 0]} length={4500} color="#ff00ff" speed={20.0} visible={activeZones.wormhole_sound} />

      {/* Interstellar */}
      <Interstellar position={[0, -4000, -7550]} rotation={[0, 0, 0]} visible={activeZones.interstellar} />

      <WormholeGeneric position={[0, -4000, -9050]} rotation={[Math.PI/2, 0, 0]} length={3200} color="#d4af37" visible={activeZones.w_legal} />
      
      <LegalEagle position={[0, -4000, -10550]} rotation={[0, 0, 0]} visible={activeZones.legal} />

      <WormholeGeneric position={[0, -4000, -12050]} rotation={[Math.PI/2, 0, 0]} length={3200} color="#00ffff" speed={40.0} visible={activeZones.w_autopilot} />

      <WorldAutopilot position={[0, -4000, -13550]} rotation={[0, 0, 0]} visible={activeZones.autopilot} />

      <WormholeGeneric position={[0, -4000, -15050]} rotation={[Math.PI/2, 0, 0]} length={3200} color="#ff00ff" speed={40.0} visible={activeZones.w_clove} />

      <WorldCloveH2O position={[0, -4000, -16550]} rotation={[0, 0, 0]} visible={activeZones.clove} />

      <WormholeWaterslide position={[0, -7850, -16550]} rotation={[0, 0, 0]} length={8500} visible={activeZones.w_fantasy} />

      <WorldFantasyQuant position={[0, -11700, -17500]} rotation={[0, 0, 0]} visible={activeZones.fantasy} />

      <WormholeContango position={[0, -11750, -17500]} length={7300} visible={activeZones.w_contango} />

      <ContangoQuant position={[0, -11750, -24800]} rotation={[0, 0, 0]} visible={activeZones.contango} />

      <WormholeGeneric position={[0, -11750, -27075]} rotation={[Math.PI/2, 0, 0]} length={4700} color="#60a9ff" speed={30.0} visible={activeZones.w_sentaient} />

      <WorldSentaient position={[0, -11750, -29350]} rotation={[0, 0, 0]} visible={activeZones.sentaient} />
      
      <WormholeElevate position={[0, -11750, -31175]} rotation={[Math.PI/2, 0, 0]} length={2400} visible={activeZones.w_elevate} />
      <WorldElevate position={[0, -11750, -33000]} visible={activeZones.elevate} />
      
      <WormholeSphinx position={[0, -11750, -35000]} rotation={[Math.PI/2, 0, 0]} length={2400} visible={activeZones.w_sphinx} />
      <WorldSphinx position={[0, -11750, -37000]} visible={activeZones.sphinx} />
      
      <WormholeLiquid position={[0, -11750, -39000]} rotation={[Math.PI/2, 0, 0]} length={2400} visible={activeZones.w_liquid} />
      <WorldLiquid position={[0, -11750, -41000]} visible={activeZones.liquid} />
      
      <WormholeMaya position={[0, -11750, -43000]} rotation={[Math.PI/2, 0, 0]} length={2400} visible={activeZones.w_maya} />
      <WorldMaya position={[0, -11750, -45000]} visible={activeZones.maya} />
      
      <WormholePyramid position={[0, -11750, -47000]} rotation={[Math.PI/2, 0, 0]} length={2400} visible={activeZones.w_pyramid} />
      <WorldPyramid position={[0, -11750, -49000]} visible={activeZones.pyramid} />
      
      <WormholeMatrixTeam position={[0, -11750, -51000]} rotation={[Math.PI/2, 0, 0]} length={2400} visible={activeZones.w_matrix} />
      <WorldMatrix position={[0, -11750, -53000]} visible={activeZones.matrix} />
      
      <WormholeLightSpeed position={[0, -11750, -55000]} rotation={[Math.PI/2, 0, 0]} length={2400} visible={activeZones.w_lightspeed} />
      <WorldLightSpeed position={[0, -11750, -57000]} visible={activeZones.lightspeed} />
    </group>
  );
};

