import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// WORLD SPHINX: Colossal Cyber-Egyptian Sentinel vs Army of Tiny Warriors
// Arrows & Spears continuously barrage the Sphinx, bouncing harmlessly off
// ---------------------------------------------------------------------------

export default function WorldSphinx({ position, visible }) {
  const earthRef = useRef();
  const radarRingsRef = useRef();
  const arrowsMeshRef = useRef();
  const spearsMeshRef = useRef();
  const warriorBodyMeshRef = useRef();
  const warriorHelmMeshRef = useRef();
  const warriorShieldMeshRef = useRef();
  const shieldRippleRef = useRef();
  const sphinxEyesRef = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // 1. Army of Tiny Warriors (64 warriors across 3 battle ranks)
  const warriorCount = 64;
  const warriors = useMemo(() => {
    const list = [];
    // Rank 1: Frontline Spearmen (20 warriors, Z ~ -340)
    for (let i = 0; i < 20; i++) {
      const x = (i - 9.5) * 28 + (Math.sin(i * 3.7) * 4);
      list.push({ x, y: -212, z: -340 + (Math.cos(i * 2.1) * 8), role: 'spear', phase: i * 0.3 });
    }
    // Rank 2: Midline Archers (22 warriors, Z ~ -400)
    for (let i = 0; i < 22; i++) {
      const x = (i - 10.5) * 27 + (Math.cos(i * 4.1) * 5);
      list.push({ x, y: -212, z: -400 + (Math.sin(i * 1.9) * 10), role: 'arrow', phase: i * 0.25 + 0.5 });
    }
    // Rank 3: Rear Archers & Commanders (22 warriors, Z ~ -460)
    for (let i = 0; i < 22; i++) {
      const x = (i - 10.5) * 28 + (Math.sin(i * 5.3) * 6);
      list.push({ x, y: -212, z: -460 + (Math.cos(i * 3.3) * 12), role: 'arrow', phase: i * 0.28 + 1.1 });
    }
    return list;
  }, []);

  // 2. Projectiles: 80 Arrows + 40 Spears = 120 continuous ballistic projectiles
  const arrowCount = 80;
  const spearCount = 40;

  const arrowsData = useMemo(() => {
    const list = [];
    for (let i = 0; i < arrowCount; i++) {
      const wIdx = 20 + (i % 44); // Mid and rear rank archers
      const w = warriors[wIdx];
      // Target various points on the Sphinx (chest, headdress, shoulders, paws)
      const targetType = i % 5;
      let xh, yh, zh;
      if (targetType === 0) {
        xh = (Math.sin(i * 1.7) * 45); // Chest
        yh = -10 + Math.cos(i * 2.3) * 35;
        zh = -690;
      } else if (targetType === 1) {
        xh = (Math.cos(i * 3.1) * 55); // Headdress
        yh = 70 + Math.sin(i * 1.9) * 35;
        zh = -670;
      } else if (targetType === 2) {
        xh = -65 + Math.sin(i * 4.2) * 20; // Left Paw / Leg
        yh = -130 + Math.cos(i * 2.7) * 20;
        zh = -620;
      } else if (targetType === 3) {
        xh = 65 + Math.cos(i * 4.2) * 20; // Right Paw / Leg
        yh = -130 + Math.sin(i * 2.7) * 20;
        zh = -620;
      } else {
        xh = (i % 2 === 0 ? -85 : 85) + Math.sin(i) * 18; // Shoulders
        yh = 15 + Math.cos(i * 3.3) * 25;
        zh = -700;
      }
      const arcH = 65 + (i % 5) * 12;
      const period = 1.8 + (i % 7) * 0.12;
      const timeOffset = (i / arrowCount) * period;
      list.push({
        x0: w.x, y0: w.y + 12, z0: w.z,
        xh, yh, zh,
        arcH, period, timeOffset,
        reboundDir: (i % 2 === 0 ? 1 : -1) * (0.8 + (i % 3) * 0.4)
      });
    }
    return list;
  }, [warriors]);

  const spearsData = useMemo(() => {
    const list = [];
    for (let i = 0; i < spearCount; i++) {
      const wIdx = i % 20; // Frontline spearmen
      const w = warriors[wIdx];
      // Target lower and mid chest, paws, stela
      const targetType = i % 4;
      let xh, yh, zh;
      if (targetType === 0) {
        xh = (Math.sin(i * 2.9) * 40); // Broad chest
        yh = -20 + Math.cos(i * 3.1) * 30;
        zh = -690;
      } else if (targetType === 1) {
        xh = 0; // Royal Dream Stela between paws
        yh = -100 + Math.sin(i * 2.5) * 30;
        zh = -620;
      } else if (targetType === 2) {
        xh = -60 + Math.cos(i * 3.7) * 20; // Left Shoulder/Paw
        yh = -80 + Math.sin(i * 2.1) * 40;
        zh = -650;
      } else {
        xh = 60 + Math.sin(i * 3.7) * 20; // Right Shoulder/Paw
        yh = -80 + Math.cos(i * 2.1) * 40;
        zh = -650;
      }
      const arcH = 45 + (i % 4) * 10;
      const period = 2.1 + (i % 5) * 0.15;
      const timeOffset = (i / spearCount) * period;
      list.push({
        x0: w.x, y0: w.y + 14, z0: w.z,
        xh, yh, zh,
        arcH, period, timeOffset,
        reboundDir: (i % 2 === 0 ? 1 : -1) * (0.9 + (i % 3) * 0.3)
      });
    }
    return list;
  }, [warriors]);

  // Main Animation Loop
  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // 1. Earth backdrop rotation
    if (earthRef.current) earthRef.current.rotation.y = t * 0.03;
    if (radarRingsRef.current) {
      radarRingsRef.current.rotation.y = -t * 0.12;
      radarRingsRef.current.rotation.z = Math.sin(t * 0.4) * 0.08;
    }

    // 2. Animate the tiny warriors (aiming, lunging, drawing bows)
    if (warriorBodyMeshRef.current && warriorHelmMeshRef.current) {
      for (let i = 0; i < warriorCount; i++) {
        const w = warriors[i];
        const attackCycle = Math.sin(t * 4.5 + w.phase);
        
        // Body: slight bobbing and forward lunge
        const lunge = w.role === 'spear' ? Math.max(0, attackCycle) * 3 : 0;
        dummy.position.set(w.x, w.y + 6, w.z - lunge);
        dummy.rotation.set(0.12, Math.atan2(-w.x, 750), 0);
        dummy.updateMatrix();
        warriorBodyMeshRef.current.setMatrixAt(i, dummy.matrix);

        // Helmet
        dummy.position.set(w.x, w.y + 13.5, w.z - lunge);
        dummy.rotation.set(0.12, Math.atan2(-w.x, 750), 0);
        dummy.updateMatrix();
        warriorHelmMeshRef.current.setMatrixAt(i, dummy.matrix);

        // Shield
        if (warriorShieldMeshRef.current) {
          dummy.position.set(w.x - 4.5, w.y + 7, w.z - lunge + 2);
          dummy.rotation.set(0, Math.atan2(-w.x, 750) + 0.3, 0);
          dummy.updateMatrix();
          warriorShieldMeshRef.current.setMatrixAt(i, dummy.matrix);
        }
      }
      warriorBodyMeshRef.current.instanceMatrix.needsUpdate = true;
      warriorHelmMeshRef.current.instanceMatrix.needsUpdate = true;
      if (warriorShieldMeshRef.current) warriorShieldMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // 3. Animate 80 Arrows: Flight -> Strike Sphinx -> Deflect & Rebound Harmlessly!
    if (arrowsMeshRef.current) {
      for (let i = 0; i < arrowCount; i++) {
        const a = arrowsData[i];
        const cycleTime = (t + a.timeOffset) % a.period;
        const u = cycleTime / a.period; // 0.0 to 1.0

        if (u <= 0.62) {
          // FLIGHT PHASE: Parabolic trajectory toward Sphinx
          const p = u / 0.62;
          const x = a.x0 + (a.xh - a.x0) * p;
          const y = a.y0 + (a.yh - a.y0) * p + Math.sin(p * Math.PI) * a.arcH;
          const z = a.z0 + (a.zh - a.z0) * p;

          // Next position for orientation
          const pNext = Math.min(1.0, p + 0.02);
          const xNext = a.x0 + (a.xh - a.x0) * pNext;
          const yNext = a.y0 + (a.yh - a.y0) * pNext + Math.sin(pNext * Math.PI) * a.arcH;
          const zNext = a.z0 + (a.zh - a.z0) * pNext;

          dummy.position.set(x, y, z);
          dummy.lookAt(xNext, yNext, zNext);
          dummy.rotateX(Math.PI / 2);
          dummy.scale.set(1, 1, 1);
        } else {
          // DEFLECTION PHASE: Bounces off the Sphinx's armor/shield!
          const b = (u - 0.62) / 0.38; // 0.0 to 1.0
          // Rebound backwards away from Sphinx (+Z), sideways deflection, dropping under gravity
          const x = a.xh + a.reboundDir * b * 55;
          const y = Math.max(-218, a.yh - b * b * 260);
          const z = a.zh + b * 160;

          dummy.position.set(x, y, z);
          // Violent tumbling bounce
          dummy.rotation.set(b * 16.0 + i, b * 9.0, b * 12.0);
          dummy.scale.set(1, 1, 1);
        }
        dummy.updateMatrix();
        arrowsMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      arrowsMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // 4. Animate 40 Spears: Flight -> Strike Sphinx -> Deflect & Rebound Harmlessly!
    if (spearsMeshRef.current) {
      for (let i = 0; i < spearCount; i++) {
        const s = spearsData[i];
        const cycleTime = (t + s.timeOffset) % s.period;
        const u = cycleTime / s.period;

        if (u <= 0.60) {
          // FLIGHT PHASE: Powerful spear javelin arc
          const p = u / 0.60;
          const x = s.x0 + (s.xh - s.x0) * p;
          const y = s.y0 + (s.yh - s.y0) * p + Math.sin(p * Math.PI) * s.arcH;
          const z = s.z0 + (s.zh - s.z0) * p;

          const pNext = Math.min(1.0, p + 0.02);
          const xNext = s.x0 + (s.xh - s.x0) * pNext;
          const yNext = s.y0 + (s.yh - s.y0) * pNext + Math.sin(pNext * Math.PI) * s.arcH;
          const zNext = s.z0 + (s.zh - s.z0) * pNext;

          dummy.position.set(x, y, z);
          dummy.lookAt(xNext, yNext, zNext);
          dummy.rotateX(Math.PI / 2);
          dummy.scale.set(1, 1, 1);
        } else {
          // DEFLECTION PHASE: Clatters harmlessly off Sphinx stone and falls
          const b = (u - 0.60) / 0.40;
          const x = s.xh + s.reboundDir * b * 65;
          const y = Math.max(-218, s.yh - b * b * 280);
          const z = s.zh + b * 180;

          dummy.position.set(x, y, z);
          dummy.rotation.set(b * 14.0 + i, b * 7.0, b * 11.0);
          dummy.scale.set(1, 1, 1);
        }
        dummy.updateMatrix();
        spearsMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      spearsMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // 5. Kinetic Deflection Shield Ripple on Sphinx
    if (shieldRippleRef.current) {
      const pulse = 1.0 + Math.sin(t * 12.0) * 0.04;
      shieldRippleRef.current.scale.set(pulse, pulse, pulse);
    }

    // 6. Sphinx Piercing Eye Beams
    if (sphinxEyesRef.current) {
      sphinxEyesRef.current.rotation.y = Math.sin(t * 0.8) * 0.08;
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* Cinematic Golden Egyptian Night & Threat Lighting */}
      <ambientLight intensity={0.35} color="#0d1124" />
      <directionalLight position={[-600, 700, -300]} intensity={3.5} color="#ffd700" />
      <directionalLight position={[600, 400, 300]} intensity={1.8} color="#00e5ff" />
      <pointLight position={[0, 150, -700]} intensity={25} distance={1600} color="#ffaa00" />
      <pointLight position={[0, -50, -400]} intensity={16} distance={1000} color="#ff6600" />

      {/* Atmospheric Desert Fire Sparks & Deflection Shimmer */}
      <Sparkles count={900} scale={[1800, 800, 1800]} size={8} speed={0.5} opacity={0.55} color="#ffaa00" position={[0, 50, -600]} />
      <Sparkles count={500} scale={[600, 400, 400]} size={12} speed={1.2} opacity={0.7} color="#00f0ff" position={[0, 20, -680]} />

      {/* ------------------------------------------------------------- */}
      {/* 1. DEEP SPACE EARTH BACKDROP & ORBITAL THREAT RADAR           */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, -2500, -4200]}>
        <mesh ref={earthRef}>
          <sphereGeometry args={[2000, 64, 64]} />
          <meshStandardMaterial color="#081b33" roughness={0.35} metalness={0.7} emissive="#03162b" emissiveIntensity={0.6} />
        </mesh>
        
        {/* Orbital Weather & Threat Defense Rings */}
        <group ref={radarRingsRef}>
          <mesh rotation={[Math.PI / 6, 0, 0]}>
            <ringGeometry args={[2150, 2175, 64]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0, 0]}>
            <ringGeometry args={[2220, 2240, 64]} />
            <meshBasicMaterial color="#ffd700" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[0, Math.PI / 3, 0]}>
            <ringGeometry args={[2280, 2298, 64]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. DESERT BATTLEFIELD SAND & OBELISK SURROUNDINGS              */}
      {/* ------------------------------------------------------------- */}
      <mesh position={[0, -222, -750]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4200, 4200]} />
        <meshStandardMaterial color="#0a0703" roughness={0.7} metalness={0.4} />
      </mesh>

      {/* Golden Sand Grid Lines & Sacred Geometry */}
      {[-350, -175, 0, 175, 350].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, -220, -750]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[idx === 2 ? 6 : 2, 3600]} />
          <meshBasicMaterial color={idx === 2 ? "#ffd700" : "#ffaa00"} transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Flanking Twin Cyber Obelisks inscribed with Hieroglyphs */}
      {[-480, 480].map((x, idx) => (
        <group key={idx} position={[x, 0, -680]}>
          {/* Obelisk Base */}
          <mesh position={[0, -180, 0]}>
            <boxGeometry args={[45, 80, 45]} />
            <meshStandardMaterial color="#120c04" roughness={0.3} metalness={0.9} />
          </mesh>
          {/* Obelisk Shaft */}
          <mesh position={[0, 40, 0]}>
            <cylinderGeometry args={[14, 22, 380, 4]} />
            <meshStandardMaterial color="#1a1105" roughness={0.2} metalness={0.92} />
          </mesh>
          {/* Gold Pyramidion Capstone */}
          <mesh position={[0, 240, 0]}>
            <coneGeometry args={[14, 30, 4]} />
            <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={3.0} metalness={1.0} roughness={0.1} />
          </mesh>
          <pointLight position={[0, 245, 0]} color="#ffd700" intensity={6} distance={300} />
        </group>
      ))}

      {/* Battlefield War Fire Braziers along the warrior lines */}
      {[-240, -120, 0, 120, 240].map((bx, idx) => (
        <group key={idx} position={[bx, -210, -370]}>
          {/* Brazier Iron Bowl */}
          <mesh position={[0, 8, 0]}>
            <cylinderGeometry args={[8, 4, 8, 12]} />
            <meshStandardMaterial color="#1c1917" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Flame Core */}
          <mesh position={[0, 14, 0]}>
            <sphereGeometry args={[5, 12, 12]} />
            <meshStandardMaterial color="#ff4400" emissive="#ffaa00" emissiveIntensity={4.0} />
          </mesh>
          <pointLight position={[0, 18, 0]} color="#ff7700" intensity={4.5} distance={140} />
        </group>
      ))}

      {/* ------------------------------------------------------------- */}
      {/* 3. COLOSSAL REGAL SPHINX SENTINEL (MONUMENTAL CYBER-PHARAOH)   */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, -30, -740]}>

        {/* A. MONUMENTAL STEPPED PLINTH OF OBSIDIAN & 24K GOLD */}
        <mesh position={[0, -195, 0]}>
          <boxGeometry args={[440, 28, 560]} />
          <meshStandardMaterial color="#0d0903" metalness={0.92} roughness={0.16} />
        </mesh>
        <mesh position={[0, -172, 0]}>
          <boxGeometry args={[380, 20, 500]} />
          <meshStandardMaterial color="#181106" metalness={0.90} roughness={0.18} />
        </mesh>
        {/* Plinth Gold Trim Inlay */}
        <mesh position={[0, -161, 0]}>
          <boxGeometry args={[350, 4, 470]} />
          <meshStandardMaterial color="#ffd700" emissive="#d97706" emissiveIntensity={1.8} />
        </mesh>

        {/* B. MIGHTY EXTENDED LION PAWS REACHING FORWARD */}
        {[-70, 70].map((px, i) => (
          <group key={i} position={[px, -145, 160]}>
            {/* Forearm angled down to ground */}
            <mesh position={[0, 15, -60]} rotation={[0.25, 0, 0]}>
              <cylinderGeometry args={[26, 32, 140, 16]} />
              <meshStandardMaterial color="#1c1305" metalness={0.88} roughness={0.2} />
            </mesh>
            {/* Monumental Paw */}
            <mesh position={[0, -5, 15]}>
              <boxGeometry args={[52, 26, 120]} />
              <meshStandardMaterial color="#261b09" metalness={0.90} roughness={0.18} />
            </mesh>
            {/* Golden Claws / Knuckle Circuitry */}
            <mesh position={[0, -5, 76]}>
              <boxGeometry args={[48, 12, 12]} />
              <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2.5} />
            </mesh>
          </group>
        ))}

        {/* Royal Dream Stela between the Paws */}
        <group position={[0, -100, 180]}>
          <mesh>
            <boxGeometry args={[44, 110, 10]} />
            <meshStandardMaterial color="#0d0802" metalness={0.94} roughness={0.12} />
          </mesh>
          <mesh position={[0, 0, 5.5]}>
            <planeGeometry args={[38, 100]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} />
          </mesh>
        </group>

        {/* C. SCULPTED LEONINE TORSO, FLANKS & HAUNCHES */}
        {/* Massive Muscular Chest */}
        <mesh position={[0, -40, 40]}>
          <cylinderGeometry args={[75, 95, 180, 16]} />
          <meshStandardMaterial color="#221708" metalness={0.88} roughness={0.22} />
        </mesh>

        {/* Royal Egyptian Usekh Pectoral Broad Collar */}
        <mesh position={[0, -15, 60]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[88, 102, 35, 16, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#ffd700" emissive="#b45309" emissiveIntensity={1.4} metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Main Body Cylinder (Extending back) */}
        <mesh position={[0, -35, -110]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[80, 85, 260, 16]} />
          <meshStandardMaterial color="#1a1105" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Powerful Hindquarters / Haunches */}
        {[-75, 75].map((hx, i) => (
          <mesh key={i} position={[hx, -70, -180]} rotation={[0, (i === 0 ? 0.28 : -0.28), 0]}>
            <boxGeometry args={[56, 110, 160]} />
            <meshStandardMaterial color="#181005" metalness={0.88} roughness={0.22} />
          </mesh>
        ))}

        {/* Curled Leonine Tail */}
        <mesh position={[82, -120, -210]} rotation={[0.4, 0.6, 0]}>
          <torusGeometry args={[65, 7, 16, 64, Math.PI * 1.3]} />
          <meshStandardMaterial color="#ffd700" emissive="#b45309" emissiveIntensity={1.2} />
        </mesh>

        {/* D. MAJESTIC PHARAONIC HEAD & ROYAL NEMES HEADDRESS */}
        <group position={[0, 95, 60]}>
          {/* Chiseled Regal Pharaonic Face */}
          <mesh position={[0, 0, 12]}>
            <boxGeometry args={[46, 56, 40]} />
            <meshStandardMaterial color="#ffd700" emissive="#b45309" emissiveIntensity={1.2} metalness={0.95} roughness={0.15} />
          </mesh>

          {/* Plated Royal Beard of Osiris */}
          <mesh position={[0, -42, 28]} rotation={[-0.15, 0, 0]}>
            <cylinderGeometry args={[5, 8, 65, 12]} />
            <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2.0} metalness={1.0} roughness={0.1} />
          </mesh>

          {/* Piercing Cyan Eyes of Horus (Ocular Scanners) */}
          <group ref={sphinxEyesRef} position={[0, 8, 33]}>
            <mesh position={[-14, 0, 0]}>
              <sphereGeometry args={[5, 16, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#00f0ff" emissiveIntensity={5.0} />
            </mesh>
            <mesh position={[14, 0, 0]}>
              <sphereGeometry args={[5, 16, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#00f0ff" emissiveIntensity={5.0} />
            </mesh>
            <pointLight position={[0, 0, 10]} color="#00f0ff" intensity={18} distance={750} />
            
            {/* Forward Volumetric Scanning Eye Cones */}
            <mesh position={[-14, -60, 240]} rotation={[-Math.PI / 2.3, 0, 0]}>
              <coneGeometry args={[45, 520, 16]} />
              <meshBasicMaterial color="#00f0ff" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh position={[14, -60, 240]} rotation={[-Math.PI / 2.3, 0, 0]}>
              <coneGeometry args={[45, 520, 16]} />
              <meshBasicMaterial color="#00f0ff" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>

          {/* Flaring Royal Nemes Wings (Left & Right) */}
          <mesh position={[-48, -10, 0]} rotation={[0, 0.35, -0.15]}>
            <boxGeometry args={[42, 115, 30]} />
            <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={1.0} metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[48, -10, 0]} rotation={[0, -0.35, 0.15]}>
            <boxGeometry args={[42, 115, 30]} />
            <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={1.0} metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Royal Nemes Top Mantle Crown */}
          <mesh position={[0, 28, -6]}>
            <sphereGeometry args={[38, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#ffd700" emissive="#b45309" emissiveIntensity={1.4} metalness={0.95} roughness={0.12} />
          </mesh>

          {/* Rearing Golden Uraeus Cobra Crest with Ruby Eye */}
          <group position={[0, 32, 26]}>
            <mesh rotation={[0.4, 0, 0]}>
              <cylinderGeometry args={[2.5, 4.5, 24, 12]} />
              <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2.5} />
            </mesh>
            <mesh position={[0, 12, 4]}>
              <sphereGeometry args={[3, 12, 12]} />
              <meshStandardMaterial color="#ff0044" emissive="#ff0044" emissiveIntensity={4.5} />
            </mesh>
          </group>

          {/* Rear Nemes Queue / Braid */}
          <mesh position={[0, -50, -22]}>
            <cylinderGeometry args={[16, 9, 120, 16]} />
            <meshStandardMaterial color="#0284c7" metalness={0.88} roughness={0.2} />
          </mesh>
        </group>

        {/* E. KINETIC ENERGY AEGIS SHIELD (DEFLECTING ALL WEAPONS HARMLESSLY) */}
        <group ref={shieldRippleRef} position={[0, -10, 80]}>
          <mesh>
            <sphereGeometry args={[240, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
            <meshBasicMaterial 
              color="#00f0ff" 
              transparent 
              opacity={0.07} 
              blending={THREE.AdditiveBlending} 
              side={THREE.DoubleSide} 
              depthWrite={false} 
            />
          </mesh>
          {/* Hexagonal Shield Impact Spark Points */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[220, 235, 6]} />
            <meshBasicMaterial color="#ffd700" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. THE ARMY OF TINY WARRIORS (64 WARRIORS IN ATTACK FORMATION) */}
      {/* ------------------------------------------------------------- */}
      {/* Warrior Bodies (Armored Bronze Cuirass & Kilt) */}
      <instancedMesh ref={warriorBodyMeshRef} args={[null, null, warriorCount]}>
        <cylinderGeometry args={[2.5, 3.8, 13, 8]} />
        <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.2} emissive="#78350f" emissiveIntensity={0.6} />
      </instancedMesh>

      {/* Warrior Helmets with Crimson Crests */}
      <instancedMesh ref={warriorHelmMeshRef} args={[null, null, warriorCount]}>
        <sphereGeometry args={[3.2, 12, 12]} />
        <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.3} emissive="#991b1b" emissiveIntensity={1.2} />
      </instancedMesh>

      {/* Warrior Bronze Shields */}
      <instancedMesh ref={warriorShieldMeshRef} args={[null, null, warriorCount]}>
        <cylinderGeometry args={[4.8, 4.8, 1.2, 12]} />
        <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
      </instancedMesh>

      {/* ------------------------------------------------------------- */}
      {/* 5. STREAMING PROJECTILES: 80 ARROWS + 40 SPEARS BARRAGE SPHINX */}
      {/* ------------------------------------------------------------- */}
      {/* 80 Flying & Rebounding Arrows */}
      <instancedMesh ref={arrowsMeshRef} args={[null, null, arrowCount]}>
        <cylinderGeometry args={[0.6, 0.6, 20, 6]} />
        <meshStandardMaterial color="#fef08a" emissive="#ffd700" emissiveIntensity={2.5} roughness={0.2} />
      </instancedMesh>

      {/* 40 Flying & Rebounding Heavy Spears */}
      <instancedMesh ref={spearsMeshRef} args={[null, null, spearCount]}>
        <cylinderGeometry args={[1.3, 1.3, 36, 6]} />
        <meshStandardMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={2.2} metalness={0.9} roughness={0.2} />
      </instancedMesh>

      {/* ------------------------------------------------------------- */}
      {/* 6. 3D HOLOGRAPHIC TYPOGRAPHY BLADE (CLEANLY OFF TO THE SIDE)  */}
      {/* ------------------------------------------------------------- */}
      <group position={[-540, 100, -580]} rotation={[0, Math.PI / 10, 0]}>
        {/* Holographic Frosted Obsidian Blade Backing */}
        <mesh position={[150, -10, -2]}>
          <planeGeometry args={[300, 260]} />
          <meshStandardMaterial 
            color="#090501" 
            transparent 
            opacity={0.52} 
            roughness={0.12} 
            metalness={0.92} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        {/* Glowing Gold Top Rail */}
        <mesh position={[150, 120, 0]}>
          <boxGeometry args={[302, 3, 2]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={3.2} />
        </mesh>

        {/* Category Badge */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[20, 92, 0]}
          fontSize={11}
          color="#00f0ff"
          letterSpacing={0.12}
          anchorX="left"
          anchorY="middle"
        >
          EXP // 11  ◈  PERIMETER DEFENSE & RADAR
        </Text>

        {/* World Name Title */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[20, 50, 0]}
          fontSize={46}
          color="#ffffff"
          outlineWidth={1.5}
          outlineColor="#442800"
          anchorX="left"
          anchorY="middle"
        >
          SPHINX
        </Text>

        {/* Value Proposition Headline */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[20, 8, 0]}
          fontSize={13.5}
          color="#ffd700"
          maxWidth={260}
          lineHeight={1.3}
          anchorX="left"
          anchorY="middle"
        >
          AUTONOMOUS PERIMETER SECURITY & GLOBAL RADAR
        </Text>

        {/* System Capability Description */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[20, -50, 0]}
          fontSize={11}
          color="#fef3c7"
          maxWidth={260}
          lineHeight={1.45}
          anchorX="left"
          anchorY="middle"
        >
          Safeguard critical enterprise infrastructure with an impenetrable autonomous sentinel that neutralizes multi-vector security threats with zero downtime.
        </Text>

        {/* Telemetry Pills */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[20, -105, 0]}
          fontSize={9.5}
          color="#00f0ff"
          letterSpacing={0.05}
          anchorX="left"
          anchorY="middle"
        >
          [ ◈ 100% DEFLECTION  ◈ ZERO-IMPACT RESISTANCE ]
        </Text>
      </group>
    </group>
  );
}
