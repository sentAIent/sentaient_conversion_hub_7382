import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const RealisticFootballPlayer = ({
  color = '#00d4ff',
  accentColor = '#061d33',
  pantsColor = '#f8fafc',
  helmetColor = '#38bdf8',
  visorColor = '#0a192f',
  number = '80',
  name = '',
  isLineman = false,
  scale = 2.5,
  groupRef,
  armRef,
  leftArmRef,
  torsoRef,
  leftLegRef,
  rightLegRef
}) => {
  const torsoRadius = isLineman ? 4.2 : 3.4;
  const torsoHeight = isLineman ? 8.5 : 7.6;
  const padScale = isLineman ? 3.0 : 2.5;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Turf Contact Shadow (Soft grounded shadow) */}
      <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[isLineman ? 4.2 : 3.4, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} depthWrite={false} />
      </mesh>

      {/* Main Torso & Upper Body Group */}
      <group ref={torsoRef}>
        {/* Belt & Waist */}
        <mesh position={[0, 7.5, 0]}>
          <cylinderGeometry args={[torsoRadius * 0.72, torsoRadius * 0.7, 1.4, 16]} />
          <meshStandardMaterial color={pantsColor} roughness={0.7} />
        </mesh>

        {/* Tapered Athletic V-Torso Jersey */}
        <mesh position={[0, 11.2, 0]}>
          <cylinderGeometry args={[torsoRadius, torsoRadius * 0.7, torsoHeight, 16]} />
          <meshStandardMaterial color={color} roughness={0.45} metalness={0.15} />
        </mesh>

        {/* Arched Cantilever Shoulder Pads */}
        <mesh position={[-torsoRadius * 0.95, 14.5, 0]} rotation={[0, 0, 0.2]}>
          <sphereGeometry args={[padScale, 14, 14]} scale={[1.2, 0.75, 1.1]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.2} />
        </mesh>
        <mesh position={[torsoRadius * 0.95, 14.5, 0]} rotation={[0, 0, -0.2]}>
          <sphereGeometry args={[padScale, 14, 14]} scale={[1.2, 0.75, 1.1]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.2} />
        </mesh>

        {/* Helmet Assembly */}
        <group position={[0, 17.6, 0]}>
          {/* Gloss Polycarbonate Helmet Shell */}
          <mesh>
            <sphereGeometry args={[isLineman ? 3.1 : 2.8, 24, 24]} />
            <meshStandardMaterial color={helmetColor} metalness={0.75} roughness={0.18} />
          </mesh>
          {/* Center Helmet Ridge Stripe */}
          <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[isLineman ? 3.12 : 2.82, 0.22, 8, 24, Math.PI]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Tinted Iridescent Aerodynamic Visor */}
          <mesh position={[0, 0.1, 2.1]} rotation={[-0.15, 0, 0]}>
            <boxGeometry args={[3.2, 1.6, 1.2]} />
            <meshStandardMaterial color={visorColor} metalness={0.95} roughness={0.05} emissive="#003366" emissiveIntensity={0.6} />
          </mesh>
          {/* 3D Chrome Facemask Horizontal & Cross Bars */}
          <mesh position={[0, 0.5, 2.75]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 3.2, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.1, 2.85]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 3.2, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.7, 2.65]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 3.0, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Facemask Vertical Struts */}
          {[-0.8, 0.8].map((vx, vi) => (
            <mesh key={vi} position={[vx, -0.1, 2.8]}>
              <cylinderGeometry args={[0.14, 0.14, 1.5, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
          {/* Chin Strap */}
          <mesh position={[0, -2.0, 1.2]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[2.0, 0.8, 0.4]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
        </group>

        {/* Left Arm Assembly */}
        <group position={[-torsoRadius * 1.15, 14.0, 0]} ref={leftArmRef}>
          {/* Bicep / Sleeve */}
          <mesh position={[0, -2.4, 0]}>
            <cylinderGeometry args={[isLineman ? 1.5 : 1.25, isLineman ? 1.3 : 1.05, 5.0, 12]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Forearm & Wristband */}
          <mesh position={[0, -6.0, 0.2]}>
            <cylinderGeometry args={[1.05, 0.85, 4.5, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.8} />
          </mesh>
          {/* Receiver / DB Glove */}
          <mesh position={[0, -8.6, 0.2]}>
            <boxGeometry args={[1.4, 1.6, 0.8]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
          </mesh>
        </group>

        {/* Right Arm Assembly (Articulated for Throw & Spike) */}
        <group position={[torsoRadius * 1.15, 14.0, 0]} ref={armRef}>
          {/* Bicep / Sleeve */}
          <mesh position={[0, -2.4, 0]}>
            <cylinderGeometry args={[isLineman ? 1.5 : 1.25, isLineman ? 1.3 : 1.05, 5.0, 12]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Forearm & Wristband */}
          <mesh position={[0, -6.0, 0.2]}>
            <cylinderGeometry args={[1.05, 0.85, 4.5, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.8} />
          </mesh>
          {/* Receiver / DB Glove */}
          <mesh position={[0, -8.6, 0.2]}>
            <boxGeometry args={[1.4, 1.6, 0.8]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
          </mesh>
        </group>

        {/* Front & Back Jersey Numbers */}
        {number && (
          <>
            <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, 11.5, torsoRadius * 0.9 + 0.1]} fontSize={3.2} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.08} outlineColor="#000000">
              {number}
            </Text>
            <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, 11.5, -torsoRadius * 0.9 - 0.1]} rotation={[0, Math.PI, 0]} fontSize={3.2} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.08} outlineColor="#000000">
              {number}
            </Text>
            {name && (
              <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, 14.5, -torsoRadius * 0.92 - 0.1]} rotation={[0, Math.PI, 0]} fontSize={1.4} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.04} outlineColor="#000000">
                {name}
              </Text>
            )}
          </>
        )}
      </group>

      {/* Left Leg Assembly */}
      <group position={[-torsoRadius * 0.45, 7.0, 0]} ref={leftLegRef}>
        {/* Thigh & Football Pants with Knee Pad */}
        <mesh position={[0, -3.2, 0]}>
          <cylinderGeometry args={[isLineman ? 1.9 : 1.5, isLineman ? 1.5 : 1.15, 6.2, 12]} />
          <meshStandardMaterial color={pantsColor} roughness={0.75} />
        </mesh>
        {/* Shin / Sock */}
        <mesh position={[0, -7.5, 0]}>
          <cylinderGeometry args={[1.2, 0.95, 5.5, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>
        {/* Cleat & Spat Tape */}
        <mesh position={[0, -10.2, 0.8]}>
          <boxGeometry args={[1.8, 1.4, 3.8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      </group>

      {/* Right Leg Assembly */}
      <group position={[torsoRadius * 0.45, 7.0, 0]} ref={rightLegRef}>
        {/* Thigh & Football Pants with Knee Pad */}
        <mesh position={[0, -3.2, 0]}>
          <cylinderGeometry args={[isLineman ? 1.9 : 1.5, isLineman ? 1.5 : 1.15, 6.2, 12]} />
          <meshStandardMaterial color={pantsColor} roughness={0.75} />
        </mesh>
        {/* Shin / Sock */}
        <mesh position={[0, -7.5, 0]}>
          <cylinderGeometry args={[1.2, 0.95, 5.5, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>
        {/* Cleat & Spat Tape */}
        <mesh position={[0, -10.2, 0.8]}>
          <boxGeometry args={[1.8, 1.4, 3.8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

const FootballFieldSurface = () => {
  const fieldTex = useLoader(THREE.TextureLoader, '/nfl_football_field.png');
  fieldTex.colorSpace = THREE.SRGBColorSpace;
  fieldTex.anisotropy = 16;
  
  return (
    <group position={[0, -0.5, 0]}>
      {/* Stadium-wide outer perimeter turf apron to fill gaps to the stands */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[2400, 1800]} />
        <meshStandardMaterial color="#144d24" roughness={0.85} metalness={0.0} />
      </mesh>

      {/* Authentic Regulation NFL Football Turf Plane (140 yds x 69.33 yds matching the 4096x2048 texture) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[1166.67, 577.75]} />
        <meshStandardMaterial 
          map={fieldTex} 
          roughness={0.65} 
          metalness={0.0}
          emissive="#062810"
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Turf Illumination Accent */}
      <pointLight position={[0, 90, 0]} color="#4ade80" intensity={4.5} distance={1600} />

      {/* Yellow Goal Posts (Uprights) at both back endzones (x = -500 and +500) */}
      {[-500, 500].map((gx, idx) => (
        <group key={idx} position={[gx, 0, 0]} rotation={[0, idx === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
          <mesh position={[0, 25, 0]}>
            <cylinderGeometry args={[2.2, 2.2, 50, 16]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 50, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[2, 2, 55, 16]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[-26, 95, 0]}>
            <cylinderGeometry args={[1.8, 1.8, 90, 16]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[26, 95, 0]}>
            <cylinderGeometry args={[1.8, 1.8, 90, 16]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Orange Pylons at Endzone Corners (x = -500, -416.7, 416.7, 500, z = +-222.2) */}
      {[-500, -416.7, 416.7, 500].map((px, idx) => (
        <React.Fragment key={idx}>
          <mesh position={[px, 4, 222.2]}>
            <boxGeometry args={[3.2, 8, 3.2]} />
            <meshStandardMaterial color="#ff5500" roughness={0.3} emissive="#ff4400" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[px, 4, -222.2]}>
            <boxGeometry args={[3.2, 8, 3.2]} />
            <meshStandardMaterial color="#ff5500" roughness={0.3} emissive="#ff4400" emissiveIntensity={0.3} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
};

const RegulationFootball = ({ ballRef }) => {
  return (
    <group ref={ballRef}>
      {/* Oblong Pigskin Spheroid */}
      <mesh>
        <sphereGeometry args={[4.2, 24, 24]} scale={[1.75, 1.0, 1.0]} />
        <meshStandardMaterial color="#8b3a0f" roughness={0.55} metalness={0.15} emissive="#f59e0b" emissiveIntensity={0.25} />
      </mesh>
      {/* White Regulation Rings near ends */}
      <mesh position={[-3.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.0, 0.35, 8, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[3.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.0, 0.35, 8, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Laces along the top */}
      <mesh position={[0, 4.25, 0]}>
        <boxGeometry args={[4.0, 0.4, 0.6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {[-1.2, -0.4, 0.4, 1.2].map((lx, idx) => (
        <mesh key={idx} position={[lx, 4.3, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.4, 0.35, 0.3]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

const BroadcastFieldGraphics = () => {
  return (
    <group position={[0, 0.15, 0]}>
      {/* Blue Line of Scrimmage at x = -30 */}
      <mesh position={[-30, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 444.4]} />
        <meshBasicMaterial color="#00a8ff" transparent opacity={0.75} />
      </mesh>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[-30, 0.4, 210]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={13} color="#00a8ff" anchorX="center" anchorY="middle">
        LINE OF SCRIMMAGE
      </Text>

      {/* Yellow 1st Down Line to Gain at x = 220 */}
      <mesh position={[220, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 444.4]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.88} />
      </mesh>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[220, 0.4, 210]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={13} color="#ffd700" anchorX="center" anchorY="middle">
        1ST & 10 (LINE TO GAIN)
      </Text>
    </group>
  );
};

const TurfSpray = ({ position, active }) => {
  const meshRef = useRef();
  const particleCount = 45;
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, () => ({
      pos: new THREE.Vector3(0, 0, 0),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        Math.random() * 60 + 25,
        (Math.random() - 0.5) * 50
      ),
      rot: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, 0),
      rotSpeed: new THREE.Vector3((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15),
      scale: Math.random() * 0.8 + 0.4
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (!active) {
      meshRef.current.visible = false;
      particles.forEach((p) => {
        p.pos.set(0, 0, 0);
        p.vel.set((Math.random() - 0.5) * 50, Math.random() * 60 + 25, (Math.random() - 0.5) * 50);
      });
      return;
    }
    meshRef.current.visible = true;

    particles.forEach((p, i) => {
      p.pos.addScaledVector(p.vel, delta);
      p.vel.y -= 130 * delta; // Gravity
      if (p.pos.y < 0) {
        p.pos.y = 0;
        p.vel.y = -p.vel.y * 0.35; // Turf rebound
        p.vel.x *= 0.7;
        p.vel.z *= 0.7;
      }
      p.rot.x += p.rotSpeed.x * delta;
      p.rot.y += p.rotSpeed.y * delta;

      dummy.position.copy(p.pos).add(position);
      dummy.rotation.set(p.rot.x, p.rot.y, p.rot.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, particleCount]}>
      <boxGeometry args={[1.2, 0.6, 1.2]} />
      <meshStandardMaterial color="#14461b" roughness={0.9} />
    </instancedMesh>
  );
};

const FootballPlay = ({ position }) => {
  // Offense (11 Players)
  const qbRef = useRef();
  const qbArmRef = useRef();
  const qbLegLRef = useRef();
  const qbLegRRef = useRef();
  const wr1Ref = useRef();
  const wr1ArmRef = useRef();
  const wr1LegLRef = useRef();
  const wr1LegRRef = useRef();
  const wr2Ref = useRef();
  const wr2ArmRef = useRef();
  const wr2LegLRef = useRef();
  const wr2LegRRef = useRef();
  const slotRef = useRef();
  const slotArmRef = useRef();
  const slotLegLRef = useRef();
  const slotLegRRef = useRef();
  const teRef = useRef();
  const teLegLRef = useRef();
  const teLegRRef = useRef();
  const rbRef = useRef();
  const rbArmRef = useRef();
  const rbTorsoRef = useRef();
  const rbLegLRef = useRef();
  const rbLegRRef = useRef();
  const ltRef = useRef();
  const ltTorsoRef = useRef();
  const ltLegLRef = useRef();
  const ltLegRRef = useRef();
  const lgRef = useRef();
  const lgTorsoRef = useRef();
  const cRef = useRef();
  const cTorsoRef = useRef();
  const rgRef = useRef();
  const rgTorsoRef = useRef();
  const rtRef = useRef();
  const rtTorsoRef = useRef();
  const rtLegLRef = useRef();
  const rtLegRRef = useRef();

  // Defense (11 Players)
  const rdeRef = useRef();
  const rdeTorsoRef = useRef();
  const rdeLegLRef = useRef();
  const rdeLegRRef = useRef();
  const ntRef = useRef();
  const ntTorsoRef = useRef();
  const dtRef = useRef();
  const dtTorsoRef = useRef();
  const ldeRef = useRef();
  const ldeTorsoRef = useRef();
  const ldeLegLRef = useRef();
  const ldeLegRRef = useRef();
  const wlbRef = useRef();
  const wlbTorsoRef = useRef();
  const wlbLegLRef = useRef();
  const wlbLegRRef = useRef();
  const mlbRef = useRef();
  const mlbTorsoRef = useRef();
  const mlbLegLRef = useRef();
  const mlbLegRRef = useRef();
  const slbRef = useRef();
  const slbTorsoRef = useRef();
  const slbLegLRef = useRef();
  const slbLegRRef = useRef();
  const cb1Ref = useRef();
  const cb1LegLRef = useRef();
  const cb1LegRRef = useRef();
  const cb2Ref = useRef();
  const cb2LegLRef = useRef();
  const cb2LegRRef = useRef();
  const fsRef = useRef();
  const fsLegLRef = useRef();
  const fsLegRRef = useRef();
  const fsArmRef = useRef();
  const ssRef = useRef();
  const ssLegLRef = useRef();
  const ssLegRRef = useRef();
  const ssArmRef = useRef();

  // The Ball & Particle Spray
  const ballRef = useRef();
  const [sprayActive, setSprayActive] = React.useState(false);

  // Field Coordinate Constants
  const startQB = useMemo(() => new THREE.Vector3(-60, 0, 0), []);
  const meshQB = useMemo(() => new THREE.Vector3(-55, 0, -4), []);
  const dropQB = useMemo(() => new THREE.Vector3(-125, 0, 0), []); // Deep 5-Step Dropback
  const hitchQB = useMemo(() => new THREE.Vector3(-118, 0, 0), []); // Step-Up Hitch into Throw

  const startRB = useMemo(() => new THREE.Vector3(-68, 0, -18), []);
  const meshRB = useMemo(() => new THREE.Vector3(-53, 0, -4), []);
  const losRB = useMemo(() => new THREE.Vector3(-25, 0, 6), []);
  const flatRB = useMemo(() => new THREE.Vector3(60, 0, 48), []);
  const deepRB = useMemo(() => new THREE.Vector3(240, 0, 65), []);

  const startWR1 = useMemo(() => new THREE.Vector3(-30, 0, 92), []);
  const stemWR1 = useMemo(() => new THREE.Vector3(200, 0, 92), []);
  const catchPoint = useMemo(() => new THREE.Vector3(425, 0, 25), []);
  const endzoneSpike = useMemo(() => new THREE.Vector3(485, 0, 25), []);

  const startWR2 = useMemo(() => new THREE.Vector3(-30, 0, -92), []);
  const stemWR2 = useMemo(() => new THREE.Vector3(180, 0, -92), []);
  const deepWR2 = useMemo(() => new THREE.Vector3(430, 0, -90), []);

  const startSlot = useMemo(() => new THREE.Vector3(-33, 0, 56), []);
  const stemSlot = useMemo(() => new THREE.Vector3(140, 0, 56), []);
  const inCutSlot = useMemo(() => new THREE.Vector3(240, 0, -50), []);

  const startTE = useMemo(() => new THREE.Vector3(-30, 0, 32), []);
  const chipTE = useMemo(() => new THREE.Vector3(-5, 0, 36), []);
  const flatTE = useMemo(() => new THREE.Vector3(100, 0, 48), []);
  const cornerTE = useMemo(() => new THREE.Vector3(280, 0, 78), []);

  // Authentic COVER 2 Defense: Both Safeties Deep (2-High Shell), Corners in Flats
  const startFS = useMemo(() => new THREE.Vector3(165, 0, -55), []); // Deep Left Safety
  const startSS = useMemo(() => new THREE.Vector3(165, 0, 55), []);  // Deep Right Safety
  const pedalFS = useMemo(() => new THREE.Vector3(195, 0, -55), []);
  const pedalSS = useMemo(() => new THREE.Vector3(195, 0, 55), []);

  const startCB1 = useMemo(() => new THREE.Vector3(-16, 0, 92), []); // Press Flat Corner Right
  const flatCB1 = useMemo(() => new THREE.Vector3(30, 0, 85), []);
  const startCB2 = useMemo(() => new THREE.Vector3(-16, 0, -92), []); // Press Flat Corner Left
  const stemCB2 = useMemo(() => new THREE.Vector3(155, 0, -92), []);
  const deepCB2 = useMemo(() => new THREE.Vector3(370, 0, -90), []);

  const startMLB = useMemo(() => new THREE.Vector3(-12, 0, 0), []);
  const biteMLB = useMemo(() => new THREE.Vector3(-22, 0, -2), []);
  const tampaMLB = useMemo(() => new THREE.Vector3(85, 0, 0), []); // Middle Pole Drop

  const startWLB = useMemo(() => new THREE.Vector3(-14, 0, -28), []);
  const biteWLB = useMemo(() => new THREE.Vector3(-22, 0, -16), []);
  const startSLB = useMemo(() => new THREE.Vector3(-14, 0, 28), []);
  const dropSLB = useMemo(() => new THREE.Vector3(25, 0, 35), []);

  const scratchV1 = useMemo(() => new THREE.Vector3(), []);
  const scratchV2 = useMemo(() => new THREE.Vector3(), []);

  // Leg cycle helper
  const updateLegs = (legL, legR, speed, time, isMoving) => {
    if (!legL || !legR) return;
    if (isMoving) {
      const cycle = time * speed;
      legL.rotation.x = Math.sin(cycle) * 0.7;
      legR.rotation.x = -Math.sin(cycle) * 0.7;
    } else {
      legL.rotation.x = 0;
      legR.rotation.x = 0;
    }
  };

  useFrame((state) => {
    const t = (state.clock.elapsedTime) % 7.0; // 7.0-second broadcast play cycle

    // --- PHASE 1: Pre-Snap Cadence & Stances (0.0s - 0.7s) ---
    if (t < 0.7) {
      setSprayActive(false);

      // QB Cadence in Shotgun
      if (qbRef.current) {
        qbRef.current.position.copy(startQB);
        qbRef.current.rotation.set(0, Math.PI / 2, 0);
      }
      if (qbArmRef.current) qbArmRef.current.rotation.set(0, 0, -0.4);

      // RB in Ready Crouched Stance
      if (rbRef.current) {
        rbRef.current.position.copy(startRB);
        rbRef.current.rotation.set(0, Math.PI * 0.42, 0);
      }
      if (rbTorsoRef.current) rbTorsoRef.current.rotation.set(-0.35, 0, 0);

      // Offensive Line in 3-Point Stances
      if (cTorsoRef.current) cTorsoRef.current.rotation.set(-0.55, 0, 0);
      if (lgTorsoRef.current) lgTorsoRef.current.rotation.set(-0.5, 0, 0);
      if (rgTorsoRef.current) rgTorsoRef.current.rotation.set(-0.5, 0, 0);
      if (ltTorsoRef.current) ltTorsoRef.current.rotation.set(-0.45, 0, 0);
      if (rtTorsoRef.current) rtTorsoRef.current.rotation.set(-0.45, 0, 0);

      if (cRef.current) cRef.current.position.set(-30, 0, 0);
      if (lgRef.current) lgRef.current.position.set(-30, 0, -10);
      if (rgRef.current) rgRef.current.position.set(-30, 0, 10);
      if (ltRef.current) ltRef.current.position.set(-31, 0, -21);
      if (rtRef.current) rtRef.current.position.set(-31, 0, 21);

      // Defensive Line in 3/4-Point Stances
      if (ntTorsoRef.current) ntTorsoRef.current.rotation.set(0.55, 0, 0);
      if (dtTorsoRef.current) dtTorsoRef.current.rotation.set(0.55, 0, 0);
      if (rdeTorsoRef.current) rdeTorsoRef.current.rotation.set(0.5, 0, 0);
      if (ldeTorsoRef.current) ldeTorsoRef.current.rotation.set(0.5, 0, 0);

      if (ntRef.current) ntRef.current.position.set(-26, 0, -6);
      if (dtRef.current) dtRef.current.position.set(-26, 0, 7);
      if (rdeRef.current) rdeRef.current.position.set(-27, 0, -25);
      if (ldeRef.current) ldeRef.current.position.set(-27, 0, 25);

      // Linebackers in 2-Point Athletic Stance
      if (wlbRef.current) {
        wlbRef.current.position.copy(startWLB);
        wlbRef.current.rotation.set(0, -Math.PI / 2, 0);
      }
      if (mlbRef.current) {
        mlbRef.current.position.copy(startMLB);
        mlbRef.current.rotation.set(0, -Math.PI / 2, 0);
      }
      if (slbRef.current) {
        slbRef.current.position.copy(startSLB);
        slbRef.current.rotation.set(0, -Math.PI / 2, 0);
      }

      // Skill Receivers in Stances
      if (wr1Ref.current) {
        wr1Ref.current.position.copy(startWR1);
        wr1Ref.current.rotation.set(0, Math.PI / 2, 0);
      }
      if (wr1ArmRef.current) wr1ArmRef.current.rotation.set(0, 0, -0.3);

      if (wr2Ref.current) {
        wr2Ref.current.position.copy(startWR2);
        wr2Ref.current.rotation.set(0, Math.PI / 2, 0);
      }
      if (slotRef.current) {
        slotRef.current.position.copy(startSlot);
        slotRef.current.rotation.set(0, Math.PI / 2, 0);
      }
      if (teRef.current) {
        teRef.current.position.copy(startTE);
        teRef.current.rotation.set(0, Math.PI / 2, 0);
      }

      // Secondary Alignment
      if (cb1Ref.current) {
        cb1Ref.current.position.copy(startCB1);
        cb1Ref.current.rotation.set(0, -Math.PI / 2, 0);
      }
      if (cb2Ref.current) {
        cb2Ref.current.position.copy(startCB2);
        cb2Ref.current.rotation.set(0, -Math.PI / 2, 0);
      }
      if (fsRef.current) {
        fsRef.current.position.copy(startFS);
        fsRef.current.rotation.set(0, -Math.PI / 2, 0);
      }
      if (ssRef.current) {
        ssRef.current.position.copy(startSS);
        ssRef.current.rotation.set(0, -Math.PI / 2, 0);
      }

      // Football at Center's hand on turf
      if (ballRef.current) {
        ballRef.current.position.set(-30, 2.0, 0);
        ballRef.current.rotation.set(0, 0, 0);
      }

      // Zero leg motions
      updateLegs(qbLegLRef.current, qbLegRRef.current, 0, t, false);
      updateLegs(rbLegLRef.current, rbLegRRef.current, 0, t, false);
      updateLegs(wr1LegLRef.current, wr1LegRRef.current, 0, t, false);
      updateLegs(wr2LegLRef.current, wr2LegRRef.current, 0, t, false);
      updateLegs(slotLegLRef.current, slotLegRRef.current, 0, t, false);
      updateLegs(teLegLRef.current, teLegRRef.current, 0, t, false);
      updateLegs(ltLegLRef.current, ltLegRRef.current, 0, t, false);
      updateLegs(rtLegLRef.current, rtLegRRef.current, 0, t, false);
      updateLegs(rdeLegLRef.current, rdeLegRRef.current, 0, t, false);
      updateLegs(ldeLegLRef.current, ldeLegRRef.current, 0, t, false);
      updateLegs(cb1LegLRef.current, cb1LegRRef.current, 0, t, false);
      updateLegs(cb2LegLRef.current, cb2LegRRef.current, 0, t, false);
      updateLegs(fsLegLRef.current, fsLegRRef.current, 0, t, false);
      updateLegs(ssLegLRef.current, ssLegRRef.current, 0, t, false);
      updateLegs(mlbLegLRef.current, mlbLegRRef.current, 0, t, false);
    }
    // --- PHASE 2: Snap, Hard Play-Action Fake to RB, Trench Clash & Route Stems (0.7s - 2.0s) ---
    else if (t < 2.0) {
      const snapProgress = (t - 0.7) / 1.3;

      // 1. HARD PLAY ACTION MESH (0.7s - 1.15s)
      if (t < 1.15) {
        const meshFrac = Math.min(1.0, (t - 0.7) / 0.45);
        // RB Craig sprints into the mesh point with Montana
        if (rbRef.current) {
          rbRef.current.position.lerpVectors(startRB, meshRB, meshFrac);
          rbRef.current.rotation.set(0, Math.PI * 0.38, 0);
        }
        // QB steps into mesh point
        if (qbRef.current) {
          qbRef.current.position.lerpVectors(startQB, meshQB, meshFrac);
          qbRef.current.rotation.set(0, Math.PI * 0.45, 0);
        }

        // Football snap and mesh placement
        if (ballRef.current) {
          if (t < 0.85) {
            const zip = (t - 0.7) / 0.15;
            ballRef.current.position.lerpVectors(scratchV1.set(-30, 2.0, 0), meshQB, zip);
          } else {
            // Ball buried deep in Craig's stomach by Montana!
            ballRef.current.position.copy(meshRB).add(scratchV1.set(1.5, 17, 0));
          }
        }

        // Craig clamps arms and hunches over ball fake
        if (rbTorsoRef.current) rbTorsoRef.current.rotation.set(0.42, 0, 0);
        if (qbArmRef.current) qbArmRef.current.rotation.set(0, 0, -0.6);

        // Linebackers BITE DOWNHILL on the run!
        if (mlbRef.current) mlbRef.current.position.lerp(biteMLB, 0.14);
        if (wlbRef.current) wlbRef.current.position.lerp(biteWLB, 0.14);
      } 
      // 2. MONTANA 5-STEP DROPBACK & HITCH, RB LEAKS TO FLAT (1.15s - 2.0s)
      else {
        // Montana takes an authentic deep 5-step dropback to dropQB (-125), then hitches to hitchQB (-118)
        if (t < 1.85) {
          const dropFrac = (t - 1.15) / 0.7; // 5-step dropback duration
          if (qbRef.current) {
            qbRef.current.position.lerpVectors(meshQB, dropQB, dropFrac);
            qbRef.current.rotation.set(0, Math.PI / 2, 0);
          }
          if (ballRef.current && qbRef.current) {
            ballRef.current.position.copy(qbRef.current.position).add(scratchV1.set(4, 25, 1));
            ballRef.current.rotation.set(0, 0, 0);
          }
          if (qbArmRef.current) qbArmRef.current.rotation.set(-0.3, 0, 0.5);
        } else {
          // Step-up hitch into the throwing pocket
          const hitchFrac = (t - 1.85) / 0.15;
          if (qbRef.current) {
            qbRef.current.position.lerpVectors(dropQB, hitchQB, hitchFrac);
            qbRef.current.rotation.set(0, Math.PI / 2, 0);
          }
          if (ballRef.current && qbRef.current) {
            ballRef.current.position.copy(qbRef.current.position).add(scratchV1.set(6, 28, 2));
          }
          if (qbArmRef.current) qbArmRef.current.rotation.set(-0.6, 0, 0.9); // Cocked at ear
        }

        // RB Craig bursts through line and leaks out into right flat
        const pullFrac = (t - 1.15) / 0.85;
        if (rbRef.current) {
          rbRef.current.position.lerpVectors(meshRB, flatRB, pullFrac);
          rbRef.current.rotation.set(0, Math.PI * 0.46, 0);
        }
        if (rbTorsoRef.current) rbTorsoRef.current.rotation.set(0.1, 0, 0);

        // Linebackers realize pass: MLB drops into Tampa-2 middle hole
        if (mlbRef.current) mlbRef.current.position.lerp(tampaMLB, 0.1);
        if (slbRef.current) slbRef.current.position.lerp(dropSLB, 0.08);
        if (wlbRef.current) wlbRef.current.position.lerp(scratchV1.set(-42, 0, -12), 0.1);
      }

      // 3. TRENCH WARFARE: PASS RUSH & DEEP POCKET PROTECTION (FORMING AROUND 5-STEP DROP)
      // RDE #97 speed rush around edge vs LT #71 kick-slide
      if (rdeRef.current) {
        rdeRef.current.position.lerp(scratchV1.set(-112, 0, -32), 0.08);
        rdeRef.current.rotation.set(0, Math.PI * 0.65, 0);
      }
      if (rdeTorsoRef.current) rdeTorsoRef.current.rotation.set(0.2, 0, -0.2);

      if (ltRef.current) {
        ltRef.current.position.lerp(scratchV1.set(-98, 0, -22), 0.08);
        ltRef.current.rotation.set(0, -Math.PI * 0.4, 0);
      }
      if (ltTorsoRef.current) ltTorsoRef.current.rotation.set(-0.15, 0, 0.2);

      // LDE #99 edge rush vs RT #77 kick-slide
      if (ldeRef.current) {
        ldeRef.current.position.lerp(scratchV1.set(-112, 0, 32), 0.08);
        ldeRef.current.rotation.set(0, Math.PI * 0.35, 0);
      }
      if (ldeTorsoRef.current) ldeTorsoRef.current.rotation.set(0.2, 0, 0.2);

      if (rtRef.current) {
        rtRef.current.position.lerp(scratchV1.set(-98, 0, 22), 0.08);
        rtRef.current.rotation.set(0, -Math.PI * 0.6, 0);
      }
      if (rtTorsoRef.current) rtTorsoRef.current.rotation.set(-0.15, 0, -0.2);

      // Interior Pocket Clash (Center, Guards vs NT & DT)
      if (ntRef.current) ntRef.current.position.lerp(scratchV1.set(-46, 0, -6), 0.1);
      if (dtRef.current) dtRef.current.position.lerp(scratchV1.set(-46, 0, 7), 0.1);
      if (cRef.current) cRef.current.position.lerp(scratchV1.set(-42, 0, 0), 0.1);
      if (lgRef.current) lgRef.current.position.lerp(scratchV1.set(-43, 0, -12), 0.1);
      if (rgRef.current) rgRef.current.position.lerp(scratchV1.set(-43, 0, 12), 0.1);

      // Interior hand-fighting vibration
      const clash = Math.sin(t * 22) * 0.08;
      if (cTorsoRef.current) cTorsoRef.current.rotation.set(-0.15 + clash, 0, 0);
      if (lgTorsoRef.current) lgTorsoRef.current.rotation.set(-0.15 + clash, 0, 0);
      if (rgTorsoRef.current) rgTorsoRef.current.rotation.set(-0.15 - clash, 0, 0);
      if (ntTorsoRef.current) ntTorsoRef.current.rotation.set(0.2 - clash, 0, 0);
      if (dtTorsoRef.current) dtTorsoRef.current.rotation.set(0.2 + clash, 0, 0);

      // 4. ALL RECEIVERS RUNNING ROUTES (EXPLOSIVE SPRINT SPEED CALIBRATED TO STRIDE)
      // WR1 Rice explodes past press coverage down right numbers
      if (wr1Ref.current) {
        wr1Ref.current.position.lerpVectors(startWR1, stemWR1, snapProgress);
        wr1Ref.current.rotation.set(0, Math.PI / 2, 0);
      }
      // CB1 Revis jams at line, sinks into flat zone
      if (cb1Ref.current) {
        cb1Ref.current.position.lerpVectors(startCB1, flatCB1, snapProgress);
        cb1Ref.current.rotation.set(0, -Math.PI / 2, 0);
      }

      // WR2 Owens flies deep down left sideline
      if (wr2Ref.current) {
        wr2Ref.current.position.lerpVectors(startWR2, stemWR2, snapProgress);
        wr2Ref.current.rotation.set(0, Math.PI / 2, 0);
      }
      // CB2 Sanders flips hips, blankets Owens stride-for-stride
      if (cb2Ref.current) {
        cb2Ref.current.position.lerpVectors(startCB2, stemCB2, snapProgress);
        cb2Ref.current.rotation.set(0, Math.PI / 2, 0);
      }

      // Slot Clark drives 15 yards vertical up right seam
      if (slotRef.current) {
        slotRef.current.position.lerpVectors(startSlot, stemSlot, snapProgress);
        slotRef.current.rotation.set(0, Math.PI / 2, 0);
      }

      // TE Jones chips LDE, releases to intermediate zone
      if (teRef.current) {
        teRef.current.position.lerpVectors(startTE, flatTE, snapProgress);
        teRef.current.rotation.set(0, Math.PI * 0.45, 0);
      }

      // COVER 2 SAFETIES backpedal deep in their halves
      if (fsRef.current) {
        fsRef.current.position.lerpVectors(startFS, pedalFS, snapProgress);
        fsRef.current.rotation.set(0, -Math.PI / 2, 0);
      }
      if (ssRef.current) {
        ssRef.current.position.lerpVectors(startSS, pedalSS, snapProgress);
        ssRef.current.rotation.set(0, -Math.PI / 2, 0);
      }

      // Leg running animations calibrated to ground speed (zero sliding!)
      updateLegs(qbLegLRef.current, qbLegRRef.current, 13, t, true);
      updateLegs(rbLegLRef.current, rbLegRRef.current, 13, t, true);
      updateLegs(wr1LegLRef.current, wr1LegRRef.current, 14, t, true);
      updateLegs(wr2LegLRef.current, wr2LegRRef.current, 14, t, true);
      updateLegs(slotLegLRef.current, slotLegRRef.current, 12, t, true);
      updateLegs(teLegLRef.current, teLegRRef.current, 11, t, true);
      updateLegs(ltLegLRef.current, ltLegRRef.current, 11, t, true);
      updateLegs(rtLegLRef.current, rtLegRRef.current, 11, t, true);
      updateLegs(rdeLegLRef.current, rdeLegRRef.current, 14, t, true);
      updateLegs(ldeLegLRef.current, ldeLegRRef.current, 14, t, true);
      updateLegs(cb1LegLRef.current, cb1LegRRef.current, 10, t, true);
      updateLegs(cb2LegLRef.current, cb2LegRRef.current, 14, t, true);
      updateLegs(fsLegLRef.current, fsLegRRef.current, 9, t, true);
      updateLegs(ssLegLRef.current, ssLegRRef.current, 9, t, true);
      updateLegs(mlbLegLRef.current, mlbLegRRef.current, 11, t, true);
    }
    // --- PHASE 3: Montana Bombs Deep Post, Routes Cut & Converge (2.0s - 4.4s) ---
    else if (t < 4.4) {
      const passFrac = (t - 2.0) / 2.4;

      // 1. MONTANA'S TEXTBOOK THROW & FOLLOW-THROUGH FROM 5-STEP POCKET
      if (qbArmRef.current) {
        if (t < 2.3) {
          qbArmRef.current.rotation.set(-0.8, 0, 1.2); // cocks arm
        } else {
          qbArmRef.current.rotation.set(0.45, 0, -0.65); // follow-through
        }
      }
      if (qbRef.current) {
        qbRef.current.position.lerp(scratchV1.set(-112, 0, 0), 0.05);
        qbRef.current.rotation.set(0, Math.PI / 2, 0);
      }

      // 2. FOOTBALL MAJESTIC HIGH SPIRAL ARC FROM 5-STEP RELEASE
      if (ballRef.current) {
        const qbRelease = scratchV2.copy(hitchQB).add(scratchV1.set(6, 28, 2));
        const arc = Math.sin(passFrac * Math.PI) * 85;
        ballRef.current.position.lerpVectors(qbRelease, scratchV1.set(catchPoint.x, catchPoint.y + 24, catchPoint.z), passFrac);
        ballRef.current.position.y += arc;
        ballRef.current.rotation.x += 0.48; // tight spiral
        ballRef.current.rotation.z = -0.12;
      }

      // 3. PASS RUSH COLLAPSES AROUND 5-STEP POCKET (NEAR MISS)
      if (rdeRef.current) {
        rdeRef.current.position.lerp(scratchV1.set(-120, 0, -12), 0.1);
        rdeRef.current.rotation.set(0, Math.PI * 0.75, 0);
      }
      if (ldeRef.current) {
        ldeRef.current.position.lerp(scratchV1.set(-118, 0, 12), 0.1);
        ldeRef.current.rotation.set(0, Math.PI * 0.25, 0);
      }
      if (ltRef.current) ltRef.current.position.lerp(scratchV1.set(-110, 0, -18), 0.08);
      if (rtRef.current) rtRef.current.position.lerp(scratchV1.set(-110, 0, 18), 0.08);

      // 4. DOWNFIELD ROUTE BREAKS & COVERAGE DUELS
      // WR1 Jerry Rice cuts sharp 45° across field on deep post splitting Cover 2 safeties!
      if (wr1Ref.current) {
        wr1Ref.current.position.lerpVectors(stemWR1, catchPoint, passFrac);
        wr1Ref.current.rotation.set(0, 1.85, 0);
      }

      // WR2 Owens & CB2 Sanders continue high-speed duel deep down left boundary
      if (wr2Ref.current) {
        wr2Ref.current.position.lerpVectors(stemWR2, deepWR2, passFrac);
        wr2Ref.current.rotation.set(0, Math.PI / 2, 0);
      }
      if (cb2Ref.current) {
        cb2Ref.current.position.lerpVectors(stemCB2, deepCB2, passFrac);
        cb2Ref.current.rotation.set(0, Math.PI / 2, 0);
      }

      // Slot Clark cuts sharp 90° across the hash marks on 15-yard in/dig route!
      if (slotRef.current) {
        slotRef.current.position.lerpVectors(stemSlot, inCutSlot, passFrac);
        slotRef.current.rotation.set(0, Math.PI * 0.8, 0);
      }

      // TE Jones breaks toward front right pylon on corner route
      if (teRef.current) {
        teRef.current.position.lerpVectors(flatTE, cornerTE, passFrac);
        teRef.current.rotation.set(0, Math.PI * 0.35, 0);
      }

      // RB Craig wheels out down right sideline as checkdown
      if (rbRef.current) {
        rbRef.current.position.lerpVectors(flatRB, deepRB, passFrac);
        rbRef.current.rotation.set(0, Math.PI * 0.45, 0);
      }

      // BOTH COVER 2 SAFETIES DIAGNOSE POST, BREAK DOWNHILL TO BRACKET RICE!
      if (fsRef.current) {
        fsRef.current.position.lerpVectors(pedalFS, scratchV1.set(catchPoint.x - 6, 0, catchPoint.z - 8), passFrac);
        fsRef.current.rotation.set(0, Math.PI * 0.72, 0);
      }
      if (ssRef.current) {
        ssRef.current.position.lerpVectors(pedalSS, scratchV1.set(catchPoint.x + 4, 0, catchPoint.z + 8), passFrac);
        ssRef.current.rotation.set(0, Math.PI * 0.28, 0);
      }

      // CB1 Revis pursues Rice in trail coverage from behind
      if (cb1Ref.current) {
        cb1Ref.current.position.lerpVectors(flatCB1, scratchV1.set(catchPoint.x + 12, 0, catchPoint.z + 10), passFrac);
        cb1Ref.current.rotation.set(0, Math.PI / 2, 0);
      }

      // Linebackers pursue downfield
      if (mlbRef.current) mlbRef.current.position.lerp(scratchV1.set(160, 0, 10), 0.05);

      // Leg animations calibrated to realistic sprinting stride (zero slipping!)
      updateLegs(qbLegLRef.current, qbLegRRef.current, 0, t, false);
      updateLegs(wr1LegLRef.current, wr1LegRRef.current, 14, t, true);
      updateLegs(wr2LegLRef.current, wr2LegRRef.current, 13, t, true);
      updateLegs(cb2LegLRef.current, cb2LegRRef.current, 13, t, true);
      updateLegs(slotLegLRef.current, slotLegRRef.current, 11, t, true);
      updateLegs(teLegLRef.current, teLegRRef.current, 11, t, true);
      updateLegs(rbLegLRef.current, rbLegRRef.current, 12, t, true);
      updateLegs(fsLegLRef.current, fsLegRRef.current, 14, t, true);
      updateLegs(ssLegLRef.current, ssLegRRef.current, 14, t, true);
      updateLegs(cb1LegLRef.current, cb1LegRRef.current, 12, t, true);
      updateLegs(mlbLegLRef.current, mlbLegRRef.current, 11, t, true);
    }
    // --- PHASE 4: Contested Goal-Line Catch Between Both Safeties (4.4s - 4.8s) ---
    else if (t < 4.8) {
      const jumpFrac = (t - 4.4) / 0.4;
      const jumpY = Math.sin(jumpFrac * Math.PI) * 20;

      // WR1 Jerry Rice leaps 20 units high between both converging safeties
      if (wr1Ref.current) {
        wr1Ref.current.position.copy(catchPoint);
        wr1Ref.current.position.y = jumpY;
      }
      if (wr1ArmRef.current) wr1ArmRef.current.rotation.set(0, 0, Math.PI * 0.82);

      // BOTH CONVERGING SAFETIES LEAP ALONGSIDE IN BRACKET COLLISION
      if (fsRef.current) {
        fsRef.current.position.set(catchPoint.x - 6, jumpY * 0.85, catchPoint.z - 8);
      }
      if (ssRef.current) {
        ssRef.current.position.set(catchPoint.x + 4, jumpY * 0.85, catchPoint.z + 8);
      }
      if (cb1Ref.current) {
        cb1Ref.current.position.set(catchPoint.x + 10, jumpY * 0.65, catchPoint.z + 10);
      }

      // Ball secured in Rice's hands high above the defenders!
      if (ballRef.current && wr1Ref.current) {
        ballRef.current.position.copy(wr1Ref.current.position).add(scratchV1.set(2, 34, 0));
        ballRef.current.rotation.set(0, 0, 0);
      }

      // Other players downfield look toward the catch
      if (wr2Ref.current) wr2Ref.current.lookAt(catchPoint.x, 20, catchPoint.z);
      if (cb2Ref.current) cb2Ref.current.lookAt(catchPoint.x, 20, catchPoint.z);
      if (slotRef.current) slotRef.current.lookAt(catchPoint.x, 20, catchPoint.z);

      // Montana jogs forward out of pocket with arms raising
      if (qbRef.current) {
        qbRef.current.position.lerp(scratchV1.set(-70, 0, 0), 0.08);
      }
      if (qbArmRef.current) qbArmRef.current.rotation.set(0, 0, Math.PI * 0.4);

      updateLegs(qbLegLRef.current, qbLegRRef.current, 10, t, true);
      updateLegs(wr1LegLRef.current, wr1LegRRef.current, 0, t, false);
      updateLegs(fsLegLRef.current, fsLegRRef.current, 0, t, false);
      updateLegs(ssLegLRef.current, ssLegRRef.current, 0, t, false);
    }
    // --- PHASE 5: Touchdown Sprint into Endzone & Defenders Hit Turf (4.8s - 5.6s) ---
    else if (t < 5.6) {
      const tdFrac = (t - 4.8) / 0.8;

      // Rice breaks away and sprints across the goal line into the endzone!
      if (wr1Ref.current) {
        wr1Ref.current.position.lerpVectors(catchPoint, endzoneSpike, tdFrac);
        wr1Ref.current.position.y = 0;
        wr1Ref.current.rotation.set(0, Math.PI / 2, 0); // facing downfield into endzone
      }
      if (wr1ArmRef.current) wr1ArmRef.current.rotation.set(0, 0, -0.3);

      if (ballRef.current && wr1Ref.current) {
        ballRef.current.position.copy(wr1Ref.current.position).add(scratchV1.set(6, 24, 2));
      }

      // Defenders tumble to turf
      if (fsRef.current) {
        fsRef.current.position.y = 0;
        fsRef.current.rotation.set(0, Math.PI / 2, Math.PI / 2);
      }
      if (ssRef.current) {
        ssRef.current.position.y = 0;
        ssRef.current.rotation.set(0, Math.PI / 2, -Math.PI / 2);
      }
      if (cb1Ref.current) {
        cb1Ref.current.position.y = 0;
        cb1Ref.current.rotation.set(0, Math.PI / 2, 0);
      }

      // Teammates sprint toward endzone in celebration!
      if (wr2Ref.current) {
        wr2Ref.current.position.lerp(scratchV1.set(450, 0, -40), 0.1);
        wr2Ref.current.lookAt(endzoneSpike.x, 0, endzoneSpike.z);
      }
      if (slotRef.current) {
        slotRef.current.position.lerp(scratchV1.set(440, 0, 5), 0.1);
        slotRef.current.lookAt(endzoneSpike.x, 0, endzoneSpike.z);
      }
      if (rbRef.current) {
        rbRef.current.position.lerp(scratchV1.set(200, 0, 40), 0.1);
        rbRef.current.lookAt(endzoneSpike.x, 0, endzoneSpike.z);
      }
      if (qbRef.current) {
        qbRef.current.position.lerp(scratchV1.set(-50, 0, 0), 0.08);
      }

      // Offensive Linemen celebrate and chest bump
      if (ltRef.current) ltRef.current.position.lerp(scratchV1.set(-70, 0, -10), 0.08);
      if (rtRef.current) rtRef.current.position.lerp(scratchV1.set(-70, 0, 10), 0.08);

      updateLegs(wr1LegLRef.current, wr1LegRRef.current, 18, t, true);
      updateLegs(wr2LegLRef.current, wr2LegRRef.current, 18, t, true);
      updateLegs(slotLegLRef.current, slotLegRRef.current, 18, t, true);
      updateLegs(qbLegLRef.current, qbLegRRef.current, 10, t, true);
      updateLegs(rbLegLRef.current, rbLegRRef.current, 14, t, true);
    }
    // --- PHASE 6: Endzone Celebration (5.6s - 6.0s) ---
    else if (t < 6.0) {
      if (wr1Ref.current) {
        wr1Ref.current.position.copy(endzoneSpike);
        wr1Ref.current.position.y = 0;
      }
      // Raise ball high overhead in triumph
      if (wr1ArmRef.current) wr1ArmRef.current.rotation.set(0, 0, Math.PI);
      if (ballRef.current && wr1Ref.current) {
        ballRef.current.position.copy(wr1Ref.current.position).add(scratchV1.set(11, 46, 0));
        ballRef.current.rotation.set(0, 0, 0);
      }

      // Owens & Clark celebrate with Rice in endzone
      if (wr2Ref.current) {
        wr2Ref.current.position.set(470, 0, -15);
        wr2Ref.current.lookAt(endzoneSpike.x, 0, endzoneSpike.z);
      }
      if (wr2ArmRef.current) wr2ArmRef.current.rotation.set(0, 0, Math.PI * 0.7);

      if (slotRef.current) {
        slotRef.current.position.set(470, 0, 45);
        slotRef.current.lookAt(endzoneSpike.x, 0, endzoneSpike.z);
      }
      if (slotArmRef.current) slotArmRef.current.rotation.set(0, 0, Math.PI * 0.7);

      if (qbRef.current) qbRef.current.position.set(-40, 0, 0);
      if (qbArmRef.current) qbArmRef.current.rotation.set(0, 0, Math.PI * 0.8);

      updateLegs(wr1LegLRef.current, wr1LegRRef.current, 0, t, false);
      updateLegs(wr2LegLRef.current, wr2LegRRef.current, 0, t, false);
      updateLegs(slotLegLRef.current, slotLegRRef.current, 0, t, false);
    }
    // --- PHASE 7: The Thunderous Spike & Turf Spray Explosion (6.0s - 7.0s) ---
    else {
      setSprayActive(true);

      if (wr1Ref.current) wr1Ref.current.position.copy(endzoneSpike);
      // Arm whipped down in violent spike
      if (wr1ArmRef.current) wr1ArmRef.current.rotation.set(0, 0, -Math.PI / 3);

      // Football dynamic rebound off turf with physics damping
      if (ballRef.current && wr1Ref.current) {
        const spikeTime = t - 6.0;
        const bounceY = Math.abs(Math.cos(spikeTime * 14)) * 16 * Math.exp(-spikeTime * 2.2);
        ballRef.current.position.copy(wr1Ref.current.position).add(scratchV1.set(12, Math.max(2, bounceY), 2));
        ballRef.current.rotation.x += 0.45;
        ballRef.current.rotation.z += 0.25;
      }

      // Owens & Clark jumping in celebration
      if (wr2Ref.current) {
        const jumpY = Math.abs(Math.sin((t - 6.0) * 12)) * 6;
        wr2Ref.current.position.set(470, jumpY, -15);
      }
      if (slotRef.current) {
        const jumpY = Math.abs(Math.sin((t - 6.0) * 12 + 1)) * 6;
        slotRef.current.position.set(470, jumpY, 45);
      }

      // Craig and Montana fist pumping
      if (qbRef.current) qbRef.current.position.set(-40, 0, 0);
      if (qbArmRef.current) qbArmRef.current.rotation.set(0, 0, Math.PI * 0.8);

      updateLegs(wr1LegLRef.current, wr1LegRRef.current, 0, t, false);
    }
  });

  return (
    <group position={position}>
      {/* Authentic Regulation NFL Turf Plane */}
      <FootballFieldSurface />

      {/* Broadcast Graphics Line of Scrimmage & 1st Down */}
      <BroadcastFieldGraphics />

      {/* OFFENSE (11 Players - Electric Cyan & Deep Navy) */}
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="16" name="MONTANA" groupRef={qbRef} armRef={qbArmRef} leftLegRef={qbLegLRef} rightLegRef={qbLegRRef} scale={2.5} />
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="80" name="RICE" groupRef={wr1Ref} armRef={wr1ArmRef} leftLegRef={wr1LegLRef} rightLegRef={wr1LegRRef} scale={2.5} />
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="81" name="OWENS" groupRef={wr2Ref} armRef={wr2ArmRef} leftLegRef={wr2LegLRef} rightLegRef={wr2LegRRef} scale={2.5} />
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="88" name="CLARK" groupRef={slotRef} armRef={slotArmRef} leftLegRef={slotLegLRef} rightLegRef={slotLegRRef} scale={2.5} />
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="87" name="JONES" groupRef={teRef} leftLegRef={teLegLRef} rightLegRef={teLegRRef} scale={2.6} />
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="28" name="CRAIG" groupRef={rbRef} torsoRef={rbTorsoRef} armRef={rbArmRef} leftLegRef={rbLegLRef} rightLegRef={rbLegRRef} scale={2.5} />
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="71" isLineman groupRef={ltRef} torsoRef={ltTorsoRef} leftLegRef={ltLegLRef} rightLegRef={ltLegRRef} scale={2.7} />
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="62" isLineman groupRef={lgRef} torsoRef={lgTorsoRef} scale={2.7} />
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="50" isLineman groupRef={cRef} torsoRef={cTorsoRef} scale={2.7} />
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="66" isLineman groupRef={rgRef} torsoRef={rgTorsoRef} scale={2.7} />
      <RealisticFootballPlayer color="#00d4ff" helmetColor="#38bdf8" pantsColor="#f8fafc" number="77" isLineman groupRef={rtRef} torsoRef={rtTorsoRef} leftLegRef={rtLegLRef} rightLegRef={rtLegRRef} scale={2.7} />

      {/* DEFENSE (11 Players - Crimson Red & Carbon Black) */}
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="97" isLineman groupRef={rdeRef} torsoRef={rdeTorsoRef} leftLegRef={rdeLegLRef} rightLegRef={rdeLegRRef} scale={2.7} />
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="92" isLineman groupRef={ntRef} torsoRef={ntTorsoRef} scale={2.7} />
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="91" isLineman groupRef={dtRef} torsoRef={dtTorsoRef} scale={2.7} />
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="99" isLineman groupRef={ldeRef} torsoRef={ldeTorsoRef} leftLegRef={ldeLegLRef} rightLegRef={ldeLegRRef} scale={2.7} />
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="52" groupRef={wlbRef} torsoRef={wlbTorsoRef} leftLegRef={wlbLegLRef} rightLegRef={wlbLegRRef} scale={2.6} />
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="54" groupRef={mlbRef} torsoRef={mlbTorsoRef} leftLegRef={mlbLegLRef} rightLegRef={mlbLegRRef} scale={2.6} />
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="55" groupRef={slbRef} torsoRef={slbTorsoRef} leftLegRef={slbLegLRef} rightLegRef={slbLegRRef} scale={2.6} />
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="24" name="REVIS" groupRef={cb1Ref} leftLegRef={cb1LegLRef} rightLegRef={cb1LegRRef} scale={2.5} />
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="21" name="SANDERS" groupRef={cb2Ref} leftLegRef={cb2LegLRef} rightLegRef={cb2LegRRef} scale={2.5} />
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="31" name="LOTT" groupRef={fsRef} leftLegRef={fsLegLRef} rightLegRef={fsLegRRef} armRef={fsArmRef} scale={2.5} />
      <RealisticFootballPlayer color="#dc2626" helmetColor="#475569" pantsColor="#1e293b" number="43" name="POLAMALU" groupRef={ssRef} leftLegRef={ssLegLRef} rightLegRef={ssLegRRef} armRef={ssArmRef} scale={2.5} />

      {/* Realistic 3D Regulation Football */}
      <RegulationFootball ballRef={ballRef} />

      {/* Turf Rubber Crumb & Grass Particle Explosion on Spike */}
      <TurfSpray position={endzoneSpike} active={sprayActive} />
    </group>
  );
};

const Scoreboard = () => {
  const [isCelebration, setIsCelebration] = React.useState(false);
  const flashRef = useRef(false);

  // Load official FantasyQuant wizard emblem
  const logoTex = useLoader(THREE.TextureLoader, '/fantasyquant_wizard_bright.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    const t = (state.clock.elapsedTime) % 7.0;
    const td = t >= 4.4;
    if (td !== flashRef.current) {
      flashRef.current = td;
      setIsCelebration(td);
    }
  });

  return (
    <group position={[0, 300, -300]} rotation={[0.1, 0, 0]}>
      {/* Main Center Screen */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[800, 300, 20]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 10.1]}>
        <planeGeometry args={[790, 290]} />
        <meshBasicMaterial color={isCelebration ? '#002200' : '#001100'} />
      </mesh>
      
      {/* Left Angled Screen */}
      <mesh position={[-580, 0, 150]} rotation={[0, Math.PI / 6, 0]}>
        <boxGeometry args={[400, 300, 20]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-571, 0, 155]} rotation={[0, Math.PI / 6, 0]}>
        <planeGeometry args={[390, 290]} />
        <meshBasicMaterial color="#001100" />
      </mesh>

      {/* Right Angled Screen */}
      <mesh position={[580, 0, 150]} rotation={[0, -Math.PI / 6, 0]}>
        <boxGeometry args={[400, 300, 20]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[571, 0, 155]} rotation={[0, -Math.PI / 6, 0]}>
        <planeGeometry args={[390, 290]} />
        <meshBasicMaterial color="#001100" />
      </mesh>
      
      {/* Structural framing connecting the screens */}
      <mesh position={[-390, 150, 0]}>
        <boxGeometry args={[20, 20, 20]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[390, 150, 0]}>
        <boxGeometry args={[20, 20, 20]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.3} />
      </mesh>

      {/* Floating Wizard Emblem perched above Jumbotron */}
      <Float speed={2} rotationIntensity={0.06} floatIntensity={0.35}>
        <mesh position={[0, 225, 10]}>
          <planeGeometry args={[90, 120]} />
          <meshBasicMaterial 
            map={logoTex} 
            transparent 
            depthWrite={false} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
      </Float>

      {/* Grid overlay for LED effect */}
      <gridHelper args={[800, 80, isCelebration ? '#ffaa00' : '#00ff00', '#004400']} position={[0, 0, 11]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Text on Main Screen */}
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, 88, 15]} fontSize={isCelebration ? 46 : 58} maxWidth={730} textAlign="center" color={isCelebration ? '#ffd700' : '#ffffff'} outlineWidth={0.02} outlineColor={isCelebration ? '#ff8800' : '#00ff00'} anchorX="center" anchorY="middle">
        {isCelebration ? '*** TOUCHDOWN 49ERS! ***' : 'FANTASY QUANT'}
      </Text>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, 22, 15]} fontSize={26} maxWidth={730} textAlign="center" color={isCelebration ? '#38bdf8' : '#00ffff'} outlineWidth={0.01} outlineColor="#0088ff" anchorX="center" anchorY="middle">
        {isCelebration ? 'MONTANA TO RICE: 42-YD TD PASS!' : 'PREDICTING: PLAY ACTION DEEP POST -> TOUCHDOWN'}
      </Text>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -58, 15]} fontSize={21} color="#ffffff" maxWidth={710} textAlign="center" lineHeight={1.35} anchorX="center" anchorY="middle">
        {isCelebration ? '"TOUCHDOWN SAN FRANCISCO!! Rice splits the Cover 2 safeties in the endzone! Unbelievable execution!"' : '"Play action fake to Craig sucks in the linebackers, Montana bombs the deep post to Rice splitting the Cover 2 safeties... TOUCHDOWN!!"'}
      </Text>

      {/* Stats on Side Screens */}
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[-580, 40, 165]} rotation={[0, Math.PI / 6, 0]} fontSize={28} maxWidth={340} textAlign="center" color={isCelebration ? '#ffd700' : '#00ff00'} anchorX="center" anchorY="middle">
        {isCelebration ? 'WIN PROB: 99.8%' : 'WIN PROB: 94%'}
      </Text>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[-580, -40, 165]} rotation={[0, Math.PI / 6, 0]} fontSize={28} maxWidth={340} textAlign="center" color="#00ff00" anchorX="center" anchorY="middle">
        {isCelebration ? 'POINTS: +6.0 PTS' : 'EXPECTED PTS: +6.0'}
      </Text>
      
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[580, 40, 165]} rotation={[0, -Math.PI / 6, 0]} fontSize={26} maxWidth={340} textAlign="center" color={isCelebration ? '#38bdf8' : '#00ff00'} anchorX="center" anchorY="middle">
        {isCelebration ? 'RESULT: TD SCORED' : 'DEF COVERAGE: COVER 2'}
      </Text>
      <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[580, -40, 165]} rotation={[0, -Math.PI / 6, 0]} fontSize={26} maxWidth={340} textAlign="center" color="#00ff00" anchorX="center" anchorY="middle">
        {isCelebration ? 'COVER 2 BEATEN' : 'MISMATCH DETECTED'}
      </Text>
    </group>
  );
};



function createRealisticFanGeometry() {
  // Lower body (stadium pants/legs)
  const legsGeo = new THREE.BoxGeometry(6.5, 7.5, 5.0).translate(0, 3.75, 0);

  // Torso (authentic team jersey & hoodie)
  const torsoGeo = new THREE.BoxGeometry(8.5, 10.5, 5.8).translate(0, 12.5, 0);

  // Head
  const headGeo = new THREE.SphereGeometry(3.0, 8, 6).translate(0, 20.5, 0);

  // Cap crown & visor facing +Z (inward toward field)
  const capGeo = new THREE.CylinderGeometry(3.2, 3.2, 1.4, 8).translate(0, 22.8, 0);
  const visorGeo = new THREE.BoxGeometry(4.0, 0.6, 3.5).translate(0, 22.2, 2.2);

  // Left arm (athletic bent pose / fist pump)
  const leftArmGeo = new THREE.BoxGeometry(2.0, 8.5, 2.2).translate(-5.2, 13.0, 0);
  // Right arm (raised high in celebration)
  const rightArmGeo = new THREE.BoxGeometry(2.0, 9.5, 2.2).translate(5.2, 16.5, 1.0);

  // White Rally Towel held high overhead
  const towelGeo = new THREE.BoxGeometry(3.5, 7.0, 0.6).translate(5.5, 22.5, 1.4);

  return mergeGeometries([legsGeo, torsoGeo, headGeo, capGeo, visorGeo, leftArmGeo, rightArmGeo, towelGeo]);
}

const StadiumFlashbulbs = () => {
  const pointsRef = useRef();
  const count = 180;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const tier = Math.floor(Math.random() * 20);
      const radius = 620 + tier * 80 + Math.random() * 40;
      const y = tier * 40 - 80 + Math.random() * 20;
      const angle = (Math.random()) * Math.PI * 1.5;
      
      pos[i * 3 + 0] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = (state.clock.elapsedTime) % 7.0;
    // Flashes strobe during celebration when TD is scored (t >= 4.4s)
    if (t >= 4.4) {
      const strobeTime = t - 4.4;
      pointsRef.current.material.opacity = (Math.sin(strobeTime * 35) > 0.3) ? 0.95 : 0.08;
      pointsRef.current.material.size = 28 + Math.sin(strobeTime * 50) * 12;
    } else {
      pointsRef.current.material.opacity = (Math.sin(t * 8) > 0.96) ? 0.35 : 0.0;
      pointsRef.current.material.size = 14;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={24}
        transparent
        opacity={0.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const StadiumRibbonBoard = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = (state.clock.elapsedTime) % 7.0;
    if (t >= 4.4) {
      // Pulsing gold & electric cyan during touchdown celebration
      const pulse = 0.5 + 0.5 * Math.sin((t - 4.4) * 20);
      meshRef.current.material.color.setRGB(1.0, 0.8 * pulse + 0.2, 0.1);
      meshRef.current.material.emissive.setRGB(0.8, 0.6 * pulse, 0.0);
    } else {
      // High-tech emerald / cyan telemetry glow during play
      meshRef.current.material.color.setRGB(0.0, 0.8, 0.9);
      meshRef.current.material.emissive.setRGB(0.0, 0.4, 0.5);
    }
  });

  return (
    <group position={[0, 140, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Mezzanine Ribbon Ring */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1000, 14, 16, 120, Math.PI * 1.5]} />
        <meshStandardMaterial roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
};

const StadiumGeometry = () => {
  const tiers = 20;
  
  // Concrete rings & tiered stadium seating
  const concreteRings = useMemo(() => {
    const rings = [];
    for (let i = 0; i < tiers; i++) {
      const radius = 600 + i * 80;
      const y = i * 40 - 100;
      rings.push(
        <group key={`tier-${i}`}>
          {/* Concrete Tier Riser */}
          <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 22, 16, 120, Math.PI * 1.5]} />
            <meshStandardMaterial color="#1f2937" roughness={0.85} metalness={0.2} />
          </mesh>
          {/* Dark Stadium Chair Backings */}
          <mesh position={[0, y + 12, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius + 18, 6, 8, 120, Math.PI * 1.5]} />
            <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.3} />
          </mesh>
        </group>
      );
    }
    return rings;
  }, [tiers]);

  // Fans InstancedMesh
  const fanMeshRef = useRef();
  const fanCount = 8000;

  // Realistic Humanoid Fan Geometry
  const fanGeometry = useMemo(() => createRealisticFanGeometry(), []);

  // Shared Animation Uniforms
  const fanUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uCelebration: { value: 0 },
    uScoreTime: { value: 0 }
  }), []);

  // Custom Shader Material with GPU-accelerated Touchdown Celebration
  const fanMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      roughness: 0.55,
      metalness: 0.15
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = fanUniforms.uTime;
      shader.uniforms.uCelebration = fanUniforms.uCelebration;
      shader.uniforms.uScoreTime = fanUniforms.uScoreTime;

      shader.vertexShader = `
        attribute vec4 aFanData;
        uniform float uTime;
        uniform float uCelebration;
        uniform float uScoreTime;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float phase = aFanData.x;
        float freq = aFanData.y;
        float jumpHeight = aFanData.z;
        float delay = aFanData.w;

        float jump = 0.0;
        float celebrationDelta = max(0.0, uScoreTime - delay);

        if (uCelebration > 0.05 && celebrationDelta > 0.0) {
            float wavePhase = celebrationDelta * freq + phase;
            // Erupt out of seat with high-energy bouncing
            jump = abs(sin(wavePhase)) * jumpHeight * uCelebration;

            // Rally Towel & Arm Waving overhead (vertices above waist)
            if (position.y > 15.0) {
                float towelWave = sin(wavePhase * 2.2) * 3.0 * uCelebration;
                transformed.x += towelWave;
                transformed.z += cos(wavePhase * 1.8) * 2.2 * uCelebration;
            }

            // Torso lean and celebratory pumping
            float pitch = sin(wavePhase) * 0.18 * uCelebration;
            transformed.z += (position.y - 10.0) * pitch;
        } else {
            // Subtle pre-snap stadium anticipation breathing
            jump = sin(uTime * 2.5 + phase) * 1.0;
        }

        transformed.y += jump;
        `
      );
    };

    return mat;
  }, [fanUniforms]);

  // Initialize Fan Instances with Authentic Game-Day Colors and Inward Field Orientations
  useEffect(() => {
    if (!fanMeshRef.current) return;
    const tempObj = new THREE.Object3D();
    const tempColor = new THREE.Color();

    // Fans wearing mostly 49ers Red and Gold shirts, sweaters, and tops (Sea of Red & Gold)
    const authenticApparel = [
      '#b91c1c', '#dc2626', '#991b1b', '#ef4444', '#7f1d1d', // 49ers Scarlet & Crimson red tops
      '#dc2626', '#b91c1c', '#991b1b', '#881337', '#be123c', // Rich red jerseys & sweaters
      '#fbbf24', '#f59e0b', '#d97706', '#fcd34d',             // Bright 49ers Gold tops & hoodies
      '#f59e0b', '#fbbf24', '#eab308',                         // Championship gold sweaters
      '#ffffff', '#f8fafc',                                     // White rally shirts
      '#1e293b'                                                 // Occasional dark stadium jacket
    ];

    const fanDataArray = new Float32Array(fanCount * 4);
    let index = 0;

    for (let i = 0; i < tiers; i++) {
      const radius = 600 + i * 80;
      const y = i * 40 - 100;
      const fansInRow = Math.floor((radius * Math.PI * 1.5) / 11);

      for (let j = 0; j < fansInRow; j++) {
        if (index >= fanCount) break;

        const angle = (j / fansInRow) * Math.PI * 1.5;
        // Staggered seating depth rows per tier
        const rowOffset = (j % 2 === 0) ? 0 : 25;
        const r = radius + rowOffset;
        const fanY = y + 12 + (rowOffset * 0.4);

        tempObj.position.set(
          Math.cos(angle) * r + (Math.random() - 0.5) * 4,
          fanY,
          Math.sin(angle) * r + (Math.random() - 0.5) * 4
        );

        // Every fan faces inward toward field center
        tempObj.lookAt(0, fanY, 0);
        tempObj.updateMatrix();
        fanMeshRef.current.setMatrixAt(index, tempObj.matrix);

        // Authentic apparel color distribution
        tempColor.set(authenticApparel[Math.floor(Math.random() * authenticApparel.length)]);
        fanMeshRef.current.setColorAt(index, tempColor);

        // Per-fan animation parameters (phase, freq, jumpHeight, waveDelay)
        fanDataArray[index * 4 + 0] = Math.random() * Math.PI * 2;
        fanDataArray[index * 4 + 1] = 14.0 + Math.random() * 8.0;
        fanDataArray[index * 4 + 2] = 12.0 + Math.random() * 14.0;
        fanDataArray[index * 4 + 3] = (angle / (Math.PI * 1.5)) * 0.45;

        index++;
      }
    }

    fanGeometry.setAttribute('aFanData', new THREE.InstancedBufferAttribute(fanDataArray, 4));

    fanMeshRef.current.instanceMatrix.needsUpdate = true;
    if (fanMeshRef.current.instanceColor) fanMeshRef.current.instanceColor.needsUpdate = true;
  }, [fanGeometry, tiers, fanCount]);

  // Global Frame Loop for Touchdown Celebration
  useFrame((state) => {
    const t = (state.clock.elapsedTime) % 7.0;
    if (t >= 4.4) {
      fanUniforms.uCelebration.value = Math.min(1.0, (t - 4.4) * 6.0);
      fanUniforms.uScoreTime.value = t - 4.4;
    } else {
      fanUniforms.uCelebration.value = 0.0;
      fanUniforms.uScoreTime.value = 0.0;
    }
    fanUniforms.uTime.value = t;
  });

  return (
    <group rotation={[0, Math.PI * 1.25, 0]}>
      {concreteRings}
      <StadiumRibbonBoard />
      <StadiumFlashbulbs />
      <instancedMesh
        ref={fanMeshRef}
        args={[fanGeometry, fanMaterial, fanCount]}
      />
    </group>
  );
};
const StadiumLightBeams = () => {
  const corners = [
    [-650, 750, -450],
    [650, 750, -450],
    [-650, 750, 450],
    [650, 750, 450],
  ];

  return (
    <group>
      {corners.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Light bank structure */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[60, 40, 20]} />
            <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Halogen bulb grid face */}
          <mesh position={[0, 0, 10.1]}>
            <planeGeometry args={[56, 36]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Intense halogen point light */}
          <pointLight color="#f0f9ff" intensity={4.5} distance={2000} decay={1.5} />
        </group>
      ))}
    </group>
  );
};

const WorldFantasyQuant = ({ position, rotation, visible }) => {
  const stadiumTex = useLoader(THREE.TextureLoader, '/fantasy_quant_stadium.jpg');
  stadiumTex.colorSpace = THREE.SRGBColorSpace;
  stadiumTex.wrapS = THREE.RepeatWrapping;
  stadiumTex.repeat.set(-1, 1);
  
  if (!visible) return null;

  return (
    <group visible={visible} position={position} rotation={rotation}>
      {/* Dark stadium background */}
      <mesh>
        <sphereGeometry args={[3000, 32, 32]} />
        <meshBasicMaterial map={stadiumTex} side={THREE.BackSide} />
      </mesh>

      <StadiumGeometry />
      {/* 4 Super Bowl Stadium Light Banks */}
      <StadiumLightBeams />

      {/* The Play */}
      <FootballPlay position={[0, -120, 100]} />

      {/* Stadium Floodlighting */}
      <ambientLight intensity={0.9} color="#ffffff" />
      <directionalLight position={[0, 900, 100]} intensity={3.5} color="#ffffff" />
      <pointLight color="#22c55e" intensity={4} distance={2500} position={[0, 600, 500]} />
      <pointLight color="#38bdf8" intensity={3} distance={2500} position={[0, 600, -500]} />

      {/* Massive Jumbotron */}
      <Scoreboard />
    </group>
  );
};

export default WorldFantasyQuant;
