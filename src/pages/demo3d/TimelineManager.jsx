import React, { useRef, useState } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Import Worlds
import WorldIcebreaker from './worlds/WorldIcebreaker';
import WorldMindWave from './worlds/WorldMindWave';
import LegalEagle from './worlds/LegalEagle';
import Interstellar from './worlds/Interstellar';
import WorldOrbitalCommand from './worlds/WorldOrbitalCommand';
import WorldDroneSwarm from './worlds/WorldDroneSwarm';
import WorldAutopilot from './worlds/WorldAutopilot';
import WorldCloveH2O from './worlds/WorldCloveH2O';
import WorldFantasyQuant from './worlds/WorldFantasyQuant';
import ContangoQuant from './worlds/ContangoQuant';
import WorldSentaient from './worlds/WorldSentaient';

// Import Wormholes
import WormholeMatrix from './wormholes/WormholeMatrix';
import WormholeIce from './wormholes/WormholeIce';
import WormholeGeneric from './wormholes/WormholeGeneric';
import WormholeContango from './wormholes/WormholeContango';
import WormholeWaterslide from './wormholes/WormholeWaterslide';

// The Masterpiece Hybrid Timeline - Drop down into Icebreaker, then pure straight line Z-axis
export const SCROLL_TIMELINE = [
  // Intro -> MindWave (Center at Z=-1250)
  { p: 0.00, x: 0, y: 0, z: 10, rx: 0, ry: 0 },
  { p: 0.04, x: 0, y: 0, z: -250, rx: 0, ry: 0 },    
  { p: 0.06, x: 0, y: 0, z: -1250, rx: 0, ry: 0 }, // Arrive MindWave (Center)
  { p: 0.10, x: 0, y: 0, z: -1250, rx: 0, ry: 0 }, // PAUSE MindWave (4% gap)
  
  // Plunge straight down into Ice Wormhole (Drop 1)
  { p: 0.12, x: 0, y: 0, z: -1250, rx: -Math.PI / 2, ry: 0 }, // Start dive
  { p: 0.18, x: 0, y: -3000, z: -1250, rx: -Math.PI / 2, ry: 0 }, // Diving
  
  // Pull out of the dive into Icebreaker
  { p: 0.20, x: 0, y: -3980, z: -1750, rx: 0, ry: 0 }, // Level out
  { p: 0.22, x: 0, y: -3980, z: -1900, rx: 0, ry: 0 }, // Stop 1 (Blue People) - farther back
  { p: 0.24, x: 0, y: -3980, z: -1900, rx: 0, ry: 0 }, // PAUSE Stop 1
  { p: 0.26, x: 0, y: -3980, z: -2250, rx: 0, ry: 0 }, // Move to Stop 2 (Fire/Dance)
  { p: 0.27, x: 0, y: -3980, z: -2250, rx: 0, ry: 0 }, // PAUSE Stop 2 (Lock triggers here)
  { p: 0.28, x: 0, y: -3980, z: -2800, rx: 0, ry: 0 }, // Move to Stop 3 (Text Title)
  { p: 0.29, x: 0, y: -3980, z: -2800, rx: 0, ry: 0 }, // PAUSE Stop 3
  { p: 0.30, x: 0, y: -3980, z: -3250, rx: 0, ry: 0 }, // Start entering Wormhole
  
  // Soundwaves Wormhole 
  { p: 0.32, x: 0, y: -3980, z: -4000, rx: 0, ry: 0 },
  { p: 0.36, x: 0, y: -3980, z: -6250, rx: 0, ry: 0 },
  
  // Interstellar (Center at Z=-7550)
  { p: 0.38, x: 0, y: -3980, z: -7150, rx: 0, ry: 0 }, // Arrive Interstellar
  { p: 0.42, x: 0, y: -3980, z: -7150, rx: 0, ry: 0 }, // PAUSE Interstellar
  { p: 0.44, x: 0, y: -3980, z: -8250, rx: 0, ry: 0 }, // Exit Interstellar
  
  // Legal Eagle (Center at Z=-10250)
  { p: 0.46, x: 0, y: -3980, z: -8750, rx: 0, ry: 0 }, 
  { p: 0.48, x: 0, y: -3980, z: -10250, rx: 0, ry: 0 }, // Arrive Legal Eagle
  { p: 0.52, x: 0, y: -3980, z: -10250, rx: 0, ry: 0 }, // PAUSE Legal Eagle
  { p: 0.55, x: 0, y: -3980, z: -11250, rx: 0, ry: 0 }, // Exit Legal Eagle
  
  // Orbital Command (Center at Z=-13550)
  { p: 0.56, x: 0, y: -4000, z: -11550, rx: 0, ry: 0 }, 
  { p: 0.58, x: 0, y: -4000, z: -13150, rx: 0, ry: 0 }, // Arrive Orbital Command
  { p: 0.60, x: 0, y: -4000, z: -13150, rx: 0, ry: 0 }, // PAUSE Orbital Command
  
  // Branch out laterally to Drone Swarm
  { p: 0.61, x: 0, y: -4000, z: -13550, rx: 0, ry: -Math.PI / 2 }, // Turn Right
  { p: 0.63, x: 4000, y: -4000, z: -13550, rx: 0, ry: -Math.PI / 2 }, // Arrive Drone Swarm
  { p: 0.65, x: 4000, y: -4000, z: -13550, rx: 0, ry: -Math.PI / 2 }, // PAUSE Drone Swarm

  // Continue laterally to Autopilot
  { p: 0.655, x: 4000, y: -4000, z: -13550, rx: 0, ry: -Math.PI / 2 }, 
  { p: 0.67, x: 7000, y: -4000, z: -13550, rx: 0, ry: -Math.PI / 2 }, // Arrive Autopilot
  { p: 0.68, x: 7000, y: -4000, z: -13550, rx: 0, ry: -Math.PI / 2 }, // PAUSE Autopilot

  // Diagonal return to main timeline (CloveH2O)
  { p: 0.685, x: 7000, y: -4000, z: -13550, rx: 0, ry: Math.atan2(-7000, -2600) }, // Turn diagonally towards CloveH2O
  { p: 0.705, x: 0, y: -4000, z: -16150, rx: 0, ry: 0 }, // Arrive CloveH2O, align forward
  
  // CloveH2O (Center at Z=-16550)
  { p: 0.72, x: 0, y: -4000, z: -16150, rx: 0, ry: 0 }, // PAUSE CloveH2O
  
  // FantasyQuant Waterslide (Drop straight down from CloveH2O Z=-16550)
  { p: 0.74, x: 0, y: -4500, z: -16550, rx: -1.5, ry: 0 }, // Pitch down and drop
  { p: 0.79, x: 0, y: -12200, z: -16550, rx: -1.5, ry: 0 }, // Reach bottom
  { p: 0.81, x: 0, y: -11750, z: -17175, rx: -0.1, ry: 0 }, // Shoot out into stands
  { p: 0.84, x: 0, y: -11750, z: -17175, rx: -0.1, ry: 0 }, // PAUSE FantasyQuant
  { p: 0.86, x: 0, y: -11750, z: -17800, rx: 0, ry: 0 }, // Exit FantasyQuant

  // Candlesticks Wormhole (Long) -> now leads to Contango
  { p: 0.88, x: 0, y: -11750, z: -18550, rx: 0, ry: 0 }, 
  { p: 0.90, x: 0, y: -11750, z: -22550, rx: 0, ry: 0 }, 

  // Contango (Center at Z=-24200)
  { p: 0.91, x: 0, y: -11750, z: -24200, rx: 0, ry: 0 }, // Arrive Contango
  { p: 0.94, x: 0, y: -11750, z: -24200, rx: 0, ry: 0 }, // PAUSE Contango
  { p: 0.95, x: 0, y: -11750, z: -25200, rx: 0, ry: 0 }, // Exit Contango

  // Sentaient Finale
  { p: 0.97, x: 0, y: -11750, z: -28050, rx: 0, ry: 0 }, 
  { p: 0.98, x: 0, y: -11750, z: -29050, rx: 0, ry: 0 }, // Arrive Sentaient
  { p: 1.00, x: 0, y: -11750, z: -29050, rx: 0, ry: 0 }, // PAUSE Sentaient
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

export const CameraController = () => {
  const scroll = useScroll();
  const lightRef = useRef();

  useFrame((state) => {
    let progress = scroll.offset;
    if (window.icebreakerCaveLocked) {
      progress = 0.22; // Hard clamp for cave entrance pause
    } else if (window.icebreakerThawLocked) {
      progress = 0.27; // Hard clamp to prevent Drei spring interpolation from drifting
    } else if (window.icebreakerTextLocked) {
      progress = 0.29; // Hard clamp for the text pause
    } else if (window.mindwaveLocked) {
      progress = 0.08; // Hard clamp for MindWave text pause
    } else if (window.interstellarLocked) {
      progress = 0.42; // Hard clamp for Interstellar pause
    } else if (window.orbitalLocked) {
      progress = 0.60; // Hard clamp for Orbital pause
    } else if (window.swarmLocked) {
      progress = 0.65; // Hard clamp for Swarm pause
    } else if (window.autopilotLocked) {
      progress = 0.68; // Hard clamp for Autopilot pause
    } else if (window.contangoLocked) {
      progress = 0.93; // Hard clamp for Contango pause
    }
    const targetPos = getPosFromProgress(progress);
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetPos.x, 0.2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetPos.y, 0.2);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetPos.z, 0.2);
    
    // Use slerp for rotations for smoother pitching
    const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(targetPos.rx, targetPos.ry, 0));
    state.camera.quaternion.slerp(targetQuat, 0.15);
    
    // Slight banking based on scroll speed
    const velocity = scroll.delta * 10;
    // We add the banking on top of the slerped rotation
    state.camera.rotateZ(THREE.MathUtils.lerp(0, velocity * 2.0, 0.2));
    
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
    sentaient: false
  });
  
  const activeZonesRef = useRef(activeZones);

  useFrame(() => {
    const p = scroll.offset;
    
    const newZones = {
      intro: p < 0.08,
      mindwave: p > 0.04 && p < 0.18,
      wormhole_ice: p > 0.10 && p < 0.25,
      icebreaker: p > 0.18 && p < 0.35, 
      wormhole_sound: p > 0.28 && p < 0.42,
      interstellar: p > 0.28 && p < 0.48, 
      w_legal: p > 0.43 && p < 0.54,
      legal: p > 0.48 && p < 0.58,
      w_orbital: p > 0.53 && p < 0.65,
      orbital: p > 0.56 && p < 0.63,
      w_swarm: p > 0.59 && p < 0.67,
      swarm: p > 0.61 && p < 0.67,
      w_autopilot: p > 0.64 && p < 0.70,
      autopilot: p > 0.65 && p < 0.71,
      w_clove: p > 0.67 && p < 0.72,
      clove: p > 0.69 && p < 0.76,
      w_fantasy: p > 0.71 && p < 0.83,
      fantasy: p > 0.73 && p < 0.88,
      w_contango: p > 0.84 && p < 0.91,
      contango: p > 0.89 && p < 0.96,
      sentaient: p > 0.94,
    };
    
    let changed = false;
    for (const key in newZones) {
      if (activeZonesRef.current[key] !== newZones[key]) changed = true;
    }
    
    if (changed) {
      activeZonesRef.current = newZones;
      setActiveZones(newZones);
    }
  });

  return (
    <group>
      <WormholeMatrix startZ={10} endZ={-250} visible={activeZones.intro} />
      
      <WorldMindWave position={[0, 0, -1350]} visible={activeZones.mindwave} />
      
      {/* Plunge tunnel down Y axis */}
      <WormholeIce position={[0, -2000, -1250]} rotation={[0, 0, 0]} length={4000} visible={activeZones.wormhole_ice} />
      
      {/* Icebreaker Cavern */}
      <WorldIcebreaker position={[0, -4000, -2550]} visible={activeZones.icebreaker} />
      
      {/* Interstellar */}
      <Interstellar position={[0, -4000, -7550]} rotation={[0, 0, 0]} visible={activeZones.interstellar} />

      <WormholeGeneric position={[0, -4000, -8750]} rotation={[Math.PI/2, 0, 0]} length={2000} color="#d4af37" visible={activeZones.w_legal} />
      
      <LegalEagle position={[0, -4000, -10550]} rotation={[0, 0, 0]} visible={activeZones.legal} />

      <WormholeGeneric position={[0, -4000, -11750]} rotation={[Math.PI/2, 0, 0]} length={2000} color="#00ffcc" visible={activeZones.w_orbital} />

      <WorldOrbitalCommand position={[0, -4000, -13550]} rotation={[0, 0, 0]} visible={activeZones.orbital} />

      {/* Lateral Wormhole to Drone Swarm */}
      <WormholeGeneric position={[2000, -4000, -13550]} rotation={[Math.PI/2, -Math.PI/2, 0]} length={2000} color="#00ffff" speed={40.0} visible={activeZones.w_swarm} />

      <WorldDroneSwarm position={[5000, -4000, -13550]} rotation={[0, 0, 0]} visible={activeZones.swarm} />

      {/* Lateral Wormhole to Autopilot */}
      <WormholeGeneric position={[5500, -4000, -13550]} rotation={[Math.PI/2, -Math.PI/2, 0]} length={1500} color="#ff00ff" speed={40.0} visible={activeZones.w_autopilot} />

      <WorldAutopilot position={[7500, -4000, -13550]} rotation={[0, -Math.PI/2, 0]} visible={activeZones.autopilot} />

      {/* Diagonal return Wormhole to CloveH2O */}
      <WormholeGeneric position={[3500, -4000, -14850]} rotation={[Math.PI/2, Math.atan2(7000, -2600), 0]} length={3800} color="#ff00ff" speed={40.0} visible={activeZones.w_clove} />

      <WorldCloveH2O position={[0, -4000, -16550]} rotation={[0, 0, 0]} visible={activeZones.clove} />

      <WormholeWaterslide position={[0, -8200, -16550]} rotation={[0, 0, 0]} length={8000} visible={activeZones.w_fantasy} />

      <WorldFantasyQuant position={[0, -11700, -17500]} rotation={[0, 0, 0]} visible={activeZones.fantasy} />

      <WormholeContango position={[0, -11750, -20550]} length={4000} visible={activeZones.w_contango} />

      <ContangoQuant position={[0, -11750, -24800]} rotation={[0, 0, 0]} visible={activeZones.contango} />

      <WorldSentaient position={[0, -11750, -29350]} rotation={[0, 0, 0]} visible={activeZones.sentaient} />
    </group>
  );
};

