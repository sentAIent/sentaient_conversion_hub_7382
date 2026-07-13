import React, { useRef, useState } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Import Worlds
import WorldIcebreaker from './worlds/WorldIcebreaker';
import WorldMindWave from './worlds/WorldMindWave';
import WorldInterstellar from './worlds/WorldInterstellar';
import WorldLegalEagle from './worlds/WorldLegalEagle';
import WorldAutopilot from './worlds/WorldAutopilot';
import WorldCloveH2O from './worlds/WorldCloveH2O';
import WorldFantasyQuant from './worlds/WorldFantasyQuant';
import WorldSentaient from './worlds/WorldSentaient';

// Import Wormholes
import WormholeMatrix from './wormholes/WormholeMatrix';
import WormholeIce from './wormholes/WormholeIce';
import WormholeGeneric from './wormholes/WormholeGeneric';
import WormholeContango from './wormholes/WormholeContango';

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
  
  // Pull out of the dive into Icebreaker (Cavern starts at Z=-1250, Center at Z=-2250)
  { p: 0.20, x: 0, y: -3980, z: -1750, rx: 0, ry: 0 }, // Level out
  { p: 0.22, x: 0, y: -3980, z: -2250, rx: 0, ry: 0 }, // Arrive Icebreaker (Center)
  { p: 0.26, x: 0, y: -3980, z: -2250, rx: 0, ry: 0 }, // PAUSE Icebreaker (4% gap)
  { p: 0.28, x: 0, y: -3980, z: -3250, rx: 0, ry: 0 }, // Exit Icebreaker
  
  // Soundwaves Wormhole 
  { p: 0.30, x: 0, y: -3980, z: -3750, rx: 0, ry: 0 },
  { p: 0.36, x: 0, y: -3980, z: -6250, rx: 0, ry: 0 },
  
  // Interstellar (Center at Z=-7250)
  { p: 0.38, x: 0, y: -3980, z: -7250, rx: 0, ry: 0 }, // Arrive Interstellar
  { p: 0.42, x: 0, y: -3980, z: -7250, rx: 0, ry: 0 }, // PAUSE Interstellar
  { p: 0.44, x: 0, y: -3980, z: -8250, rx: 0, ry: 0 }, // Exit Interstellar
  
  // Legal Eagle (Center at Z=-10250)
  { p: 0.46, x: 0, y: -3980, z: -8750, rx: 0, ry: 0 }, 
  { p: 0.48, x: 0, y: -3980, z: -10250, rx: 0, ry: 0 }, // Arrive Legal Eagle
  { p: 0.52, x: 0, y: -3980, z: -10250, rx: 0, ry: 0 }, // PAUSE Legal Eagle
  { p: 0.55, x: 0, y: -3980, z: -11250, rx: 0, ry: 0 }, // Exit Legal Eagle
  
  // Autopilot (Center at Z=-13250)
  { p: 0.57, x: 0, y: -3980, z: -12250, rx: 0, ry: 0 },
  { p: 0.59, x: 0, y: -3980, z: -13250, rx: 0, ry: 0 }, // Arrive Autopilot
  { p: 0.63, x: 0, y: -3980, z: -13250, rx: 0, ry: 0 }, // PAUSE Autopilot
  { p: 0.65, x: 0, y: -3980, z: -14250, rx: 0, ry: 0 }, // Exit Autopilot
  
  // CloveH2O (Center at Z=-16250)
  { p: 0.67, x: 0, y: -3980, z: -15250, rx: 0, ry: 0 }, 
  { p: 0.69, x: 0, y: -3980, z: -16250, rx: 0, ry: 0 }, // Arrive CloveH2O
  { p: 0.73, x: 0, y: -3980, z: -16250, rx: 0, ry: 0 }, // PAUSE CloveH2O
  { p: 0.75, x: 0, y: -3980, z: -17250, rx: 0, ry: 0 }, // Exit CloveH2O
  
  // FantasyQuant (Center at Z=-19250)
  { p: 0.77, x: 0, y: -3980, z: -18250, rx: 0, ry: 0 }, 
  { p: 0.79, x: 0, y: -3980, z: -19250, rx: 0, ry: 0 }, // Arrive FantasyQuant
  { p: 0.83, x: 0, y: -3980, z: -19250, rx: 0, ry: 0 }, // PAUSE FantasyQuant
  { p: 0.85, x: 0, y: -3980, z: -20250, rx: 0, ry: 0 }, // Exit FantasyQuant
  
  // Candlesticks Wormhole (Long)
  { p: 0.87, x: 0, y: -3980, z: -21250, rx: 0, ry: 0 }, 
  { p: 0.93, x: 0, y: -3980, z: -26250, rx: 0, ry: 0 }, 
  
  // Sentaient Finale (Center at Z=-27750)
  { p: 0.95, x: 0, y: -3980, z: -27250, rx: 0, ry: 0 }, 
  { p: 0.97, x: 0, y: -3980, z: -27750, rx: 0, ry: 0 }, // Arrive Sentaient
  { p: 1.00, x: 0, y: -3980, z: -27750, rx: 0, ry: 0 }, // PAUSE Sentaient
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
    const progress = scroll.offset;
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
    w_auto: false,
    auto: false,
    w_clove: false,
    clove: false,
    w_fantasy: false,
    fantasy: false,
    w_contango: false,
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
      interstellar: p > 0.38 && p < 0.48,
      w_legal: p > 0.43 && p < 0.54,
      legal: p > 0.48 && p < 0.58,
      w_auto: p > 0.53 && p < 0.65,
      auto: p > 0.58 && p < 0.68,
      w_clove: p > 0.63 && p < 0.75,
      clove: p > 0.68 && p < 0.78,
      w_fantasy: p > 0.73 && p < 0.85,
      fantasy: p > 0.78 && p < 0.88,
      w_contango: p > 0.83 && p < 0.96,
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
      
      {/* Plunge tunnel down Y axis, starting slightly below MindWave, length 4000 to reach Y=-4000 */}
      <WormholeIce position={[0, -2000, -1250]} rotation={[0, 0, 0]} length={4000} visible={activeZones.wormhole_ice} />
      
      {/* Icebreaker Cavern at Y=-4000, centered around Z=-2250. */}
      <WorldIcebreaker position={[0, -4000, -2550]} visible={activeZones.icebreaker} />
      
      {/* From here on, purely moving on Z axis at Y=-3980 */}
      <WormholeGeneric position={[0, -4000, -5000]} rotation={[Math.PI/2, 0, 0]} length={3500} color="#ff00ff" speed={20.0} visible={activeZones.wormhole_sound} />

      <WorldInterstellar position={[0, -4000, -7550]} rotation={[0, 0, 0]} visible={activeZones.interstellar} />

      <WormholeGeneric position={[0, -4000, -8750]} rotation={[Math.PI/2, 0, 0]} length={2000} color="#d4af37" visible={activeZones.w_legal} />
      
      <WorldLegalEagle position={[0, -4000, -10550]} rotation={[0, 0, 0]} visible={activeZones.legal} />

      <WormholeGeneric position={[0, -4000, -11750]} rotation={[Math.PI/2, 0, 0]} length={2000} color="#00ffcc" visible={activeZones.w_auto} />

      <WorldAutopilot position={[0, -4000, -13550]} rotation={[0, 0, 0]} visible={activeZones.auto} />

      <WormholeGeneric position={[0, -4000, -14750]} rotation={[Math.PI/2, 0, 0]} length={2000} color="#00ffff" speed={40.0} visible={activeZones.w_clove} />

      <WorldCloveH2O position={[0, -4000, -16550]} rotation={[0, 0, 0]} visible={activeZones.clove} />

      <WormholeGeneric position={[0, -4000, -17750]} rotation={[Math.PI/2, 0, 0]} length={2000} color="#00ff00" visible={activeZones.w_fantasy} />

      <WorldFantasyQuant position={[0, -4000, -19550]} rotation={[0, 0, 0]} visible={activeZones.fantasy} />

      <WormholeContango position={[0, -4000, -23250]} length={6000} visible={activeZones.w_contango} />

      <WorldSentaient position={[0, -4000, -28050]} rotation={[0, 0, 0]} visible={activeZones.sentaient} />
    </group>
  );
};
