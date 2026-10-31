import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================================================
// WORLD SPHINX: The Grand Royal Sphinx of Giza — Autonomous Perimeter Sentinel
// Imposing, majestic ancient monument with authentic royal pharaonic face,
// noble leonine anatomy, golden pyramids on the horizon, and divine aegis shield.
// ===========================================================================

// --- Materials Palette for Authentic Weathered Giza Limestone & 24K Gold ---
const LIMESTONE_BASE = '#d4b886';     // Sun-drenched weathered Giza limestone
const LIMESTONE_SHADOW = '#9e7b4f';   // Warm deep carving shadow limestone
const LIMESTONE_WARM = '#e5cc9c';     // Highlighted sunlit limestone
const GOLD_24K = '#ffd700';           // Royal pharaonic gold leaf
const LAPIS_BLUE = '#1e3a8a';         // Sacred Egyptian lapis lazuli
const OBSIDIAN_KOHL = '#0a0a0f';      // Deep Egyptian kohl eyeliner / black basalt
const DESERT_SAND = '#c29b62';        // Warm rolling dunes sand

// Authentic Monolithic Classical Sphinx Face Geometry
// Continuous anatomical limestone relief of Pharaoh Khafre with smooth vertex normals
function createSphinxFaceGeometry() {
  const rows = [
    { y: 24, z: [21, 20.5, 19.5, 17.5, 14, 8], x: [0, 4, 9, 15, 20, 24] },
    { y: 18, z: [23, 22.5, 21.5, 19, 15, 9], x: [0, 4.2, 9.5, 16, 21, 25] },
    { y: 11, z: [26.5, 25.8, 24.5, 21.5, 16.5, 10], x: [0, 4.2, 10, 17, 22, 26] },
    { y: 6,  z: [27.0, 24.0, 21.2, 21.8, 17, 10.5], x: [0, 3.2, 9.5, 17, 22.5, 26.5] },
    { y: 1,  z: [28.5, 24.8, 23.2, 22.5, 17.5, 10.5], x: [0, 3.0, 9.8, 17, 22.5, 26.5] },
    { y: -4, z: [30.0, 25.5, 21.8, 22.0, 16.5, 9.5], x: [0, 3.6, 9.0, 16.5, 22, 26] },
    { y: -8, z: [26.8, 24.0, 21.2, 20.0, 15.0, 8.5], x: [0, 2.8, 8.0, 15.5, 21, 25] },
    { y: -12, z: [26.2, 25.5, 22.0, 18.5, 13.5, 7.5], x: [0, 3.2, 7.5, 14.5, 19.5, 23.5] },
    { y: -16, z: [25.8, 24.8, 21.5, 17.0, 12.0, 6.5], x: [0, 3.0, 7.0, 13.5, 18.0, 22.0] },
    { y: -20, z: [23.5, 23.0, 20.0, 15.5, 10.5, 5.0], x: [0, 2.8, 6.5, 12.0, 16.5, 20.0] },
    { y: -25, z: [26.0, 25.0, 20.0, 14.0, 8.5, 3.0], x: [0, 3.2, 6.5, 11.0, 15.0, 18.5] },
    { y: -31, z: [20.0, 19.0, 16.0, 10.5, 5.0, 0.0], x: [0, 2.5, 5.5, 9.0, 12.5, 15.5] }
  ];

  const positions = [];
  const uvs = [];
  const indices = [];
  const numRows = rows.length;
  const numHalfCols = 6;
  const numCols = numHalfCols * 2 - 1;

  for (let r = 0; r < numRows; r++) {
    const row = rows[r];
    const y = row.y;
    const v = r / (numRows - 1);
    for (let c = 0; c < numCols; c++) {
      let x, z;
      if (c < numHalfCols - 1) {
        const srcIdx = numHalfCols - 1 - c;
        x = -row.x[srcIdx];
        z = row.z[srcIdx];
      } else {
        const srcIdx = c - (numHalfCols - 1);
        x = row.x[srcIdx];
        z = row.z[srcIdx];
      }
      positions.push(x, y, z);
      const u = c / (numCols - 1);
      uvs.push(u, v);
    }
  }

  for (let r = 0; r < numRows - 1; r++) {
    for (let c = 0; c < numCols - 1; c++) {
      const a = r * numCols + c;
      const b = (r + 1) * numCols + c;
      const d = r * numCols + (c + 1);
      const e = (r + 1) * numCols + (c + 1);
      indices.push(a, b, d);
      indices.push(d, b, e);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

// ---------------------------------------------------------------------------
// 1. DIGNIFIED PHARAONIC HEAD & ROYAL NEMES HEADDRESS
// ---------------------------------------------------------------------------
const PharaonicHead = () => {
  const faceGeometry = useMemo(() => createSphinxFaceGeometry(), []);

  return (
    <group position={[0, 168, 56]} scale={[1.45, 1.45, 1.45]}>
      {/* --- A. Noble Monolithic Sculpted Face Structure --- */}
      {/* Rear Cranial Skull Core Dome (Fills interior of Nemes) */}
      <mesh position={[0, 4, -4]} scale={[1.0, 1.05, 0.95]}>
        <sphereGeometry args={[25, 32, 24]} />
        <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.82} metalness={0.04} />
      </mesh>

      {/* Unified Seamless Pharaonic Face Relief (Carved Limestone of Khafre) */}
      <mesh geometry={faceGeometry}>
        <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.8} metalness={0.04} />
      </mesh>

      {/* Subtle Serene Mouth Shadow Crease */}
      <mesh position={[0, -14, 25.4]}>
        <boxGeometry args={[14, 0.5, 2]} />
        <meshBasicMaterial color="#1f160b" />
      </mesh>

      {/* Sacred Royal Egyptian Kohl Eyeliner Contours (Almond temple wings) */}
      {[-1, 1].map((side, i) => (
        <group key={i} position={[side * 9.8, 1.5, 23.5]}>
          {/* Upper Eyelid Kohl Arch */}
          <mesh rotation={[0.15, 0, side * 0.12]}>
            <torusGeometry args={[4.2, 0.45, 8, 24, Math.PI * 0.72]} />
            <meshStandardMaterial color={OBSIDIAN_KOHL} roughness={0.4} />
          </mesh>

          {/* Lower Eyelid Kohl Contour */}
          <mesh position={[0, -2.4, 0.1]} rotation={[0.15, 0, side * 0.12]}>
            <torusGeometry args={[3.8, 0.35, 8, 24, -Math.PI * 0.58]} />
            <meshStandardMaterial color={OBSIDIAN_KOHL} roughness={0.4} />
          </mesh>

          {/* Temple Cosmetic Eyeliner Wing */}
          <mesh position={[side * 4.8, 1.0, 0]} rotation={[0, 0, side * 0.28]}>
            <cylinderGeometry args={[0.45, 0.15, 6.5, 8]} />
            <meshStandardMaterial color={OBSIDIAN_KOHL} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Ceremonial Royal Plaited Beard of Osiris */}
      <group position={[0, -33, 28]} rotation={[0.08, 0, 0]}>
        <mesh position={[0, -24, 0]}>
          <cylinderGeometry args={[4.8, 6.2, 52, 16]} />
          <meshStandardMaterial color={GOLD_24K} metalness={0.88} roughness={0.25} />
        </mesh>
        {/* Plaited Egyptian Horizontal Braid Rings */}
        {[-8, -16, -24, -32, -40].map((by, idx) => (
          <mesh key={idx} position={[0, by, 0]}>
            <cylinderGeometry args={[5.4, 5.4, 2.2, 16]} />
            <meshStandardMaterial color={LAPIS_BLUE} metalness={0.6} roughness={0.3} />
          </mesh>
        ))}
        {/* Curled Beard Terminal Tip */}
        <mesh position={[0, -51, 1.5]} rotation={[-0.4, 0, 0]}>
          <sphereGeometry args={[5.2, 16, 16]} />
          <meshStandardMaterial color={GOLD_24K} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* --- B. Royal Nemes Headdress (Pleated Symmetrical Crown) --- */}
      {/* Upper Nemes Crown Dome */}
      <mesh position={[0, 22, -2]}>
        <sphereGeometry args={[33, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
        <meshStandardMaterial color={GOLD_24K} metalness={0.82} roughness={0.28} />
      </mesh>

      {/* Striped Gold & Lapis Nemes Rings over Crown */}
      {[6, 14, 22, 30].map((ry, idx) => (
        <mesh key={idx} position={[0, ry, -2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[30 - idx * 2.8, 1.4, 12, 36, Math.PI]} />
          <meshStandardMaterial color={idx % 2 === 0 ? LAPIS_BLUE : GOLD_24K} metalness={0.8} roughness={0.25} />
        </mesh>
      ))}

      {/* Majestic Flared Nemes Side Wings (Left & Right) */}
      {[-1, 1].map((side, i) => (
        <group key={i} position={[side * 36, -6, 4]} rotation={[0.08, -side * 0.22, side * 0.12]}>
          {/* Main Wing Plate */}
          <mesh>
            <boxGeometry args={[26, 68, 22]} />
            <meshStandardMaterial color={GOLD_24K} metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Horizontal Lapis Striping across the Nemes Flaps */}
          {[-24, -14, -4, 6, 16, 26].map((ly, lIdx) => (
            <mesh key={lIdx} position={[0, ly, 2]}>
              <boxGeometry args={[26.4, 4.2, 20]} />
              <meshStandardMaterial color={LAPIS_BLUE} metalness={0.65} roughness={0.3} />
            </mesh>
          ))}
          {/* Front Descending Lapet (drapes down over the chest) */}
          <mesh position={[side * -4, -42, 6]} rotation={[0.15, 0, 0]}>
            <boxGeometry args={[16, 38, 10]} />
            <meshStandardMaterial color={GOLD_24K} metalness={0.85} roughness={0.25} />
          </mesh>
          {[-32, -42, -52].map((ly, lIdx) => (
            <mesh key={`lapet-${lIdx}`} position={[side * -4, ly, 8]}>
              <boxGeometry args={[16.4, 3.2, 8]} />
              <meshStandardMaterial color={LAPIS_BLUE} metalness={0.65} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Royal Uraeus (Sacred Rearing Cobra on Forehead) */}
      <group position={[0, 26, 24]} rotation={[0.25, 0, 0]}>
        {/* Cobra Body S-Curve */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.2, 3.2, 18, 12]} />
          <meshStandardMaterial color={GOLD_24K} metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Flared Cobra Hood */}
        <mesh position={[0, 10, 1.2]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[9, 11, 2.8]} />
          <meshStandardMaterial color={GOLD_24K} metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Cobra Head with Royal Ruby Gem */}
        <mesh position={[0, 16, 3.2]}>
          <sphereGeometry args={[2.6, 12, 12]} />
          <meshStandardMaterial color="#dc2626" emissive="#ef4444" emissiveIntensity={1.8} />
        </mesh>
      </group>

      {/* Rear Nemes Queue / Braid extending down spine */}
      <mesh position={[0, -42, -24]} rotation={[-0.1, 0, 0]}>
        <cylinderGeometry args={[14, 9, 96, 16]} />
        <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.8} />
      </mesh>
    </group>
  );
};

// ---------------------------------------------------------------------------
// 2. MONUMENTAL LEONINE BODY, PAWS & DREAM STELA
// ---------------------------------------------------------------------------
const LeonineBody = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Broad Muscular Chest of the Lion */}
      <mesh position={[0, 32, 35]}>
        <cylinderGeometry args={[56, 80, 110, 24]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.82} />
      </mesh>

      {/* Muscular Carved Limestone Neck Supporting the Pharaonic Head */}
      <mesh position={[0, 112, 48]}>
        <cylinderGeometry args={[32, 38, 60, 24]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.8} />
      </mesh>

      {/* Grand Royal Egyptian Usekh Collar (Broad Golden Pectoral Collar) */}
      <mesh position={[0, 78, 48]} rotation={[0.32, 0, 0]}>
        <cylinderGeometry args={[66, 82, 26, 24, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={GOLD_24K} metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Collar Gem Inlays */}
      {[84, 78, 72].map((cy, idx) => (
        <mesh key={idx} position={[0, cy, 54]} rotation={[0.32, 0, 0]}>
          <torusGeometry args={[70 - idx * 4, 1.8, 8, 32, Math.PI]} />
          <meshStandardMaterial color={idx % 2 === 0 ? LAPIS_BLUE : '#dc2626'} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Main Elongated Leonine Torso (Receding gracefully back) */}
      <mesh position={[0, 12, -120]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[68, 76, 290, 24]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.84} />
      </mesh>

      {/* Lion Shoulders (Left & Right Deltoids) */}
      {[-68, 68].map((sx, i) => (
        <mesh key={i} position={[sx, 50, 18]}>
          <sphereGeometry args={[44, 24, 20]} />
          <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.82} />
        </mesh>
      ))}

      {/* Powerful Hindquarters / Crouching Lion Haunches */}
      {[-74, 74].map((hx, i) => (
        <group key={i} position={[hx, 0, -210]} rotation={[0, i === 0 ? 0.22 : -0.22, 0]}>
          <mesh position={[0, 25, 0]}>
            <sphereGeometry args={[56, 24, 20]} />
            <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.85} />
          </mesh>
          {/* Folded Hind Leg Plate */}
          <mesh position={[0, -22, -15]} rotation={[-0.25, 0, 0]}>
            <boxGeometry args={[48, 65, 110]} />
            <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.82} />
          </mesh>
        </group>
      ))}

      {/* Long Feline Tail Curling Around Right Haunch */}
      <mesh position={[78, -38, -220]} rotation={[0.35, 0.45, 0]}>
        <torusGeometry args={[68, 6.5, 16, 48, Math.PI * 1.25]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.8} />
      </mesh>
      <mesh position={[82, -56, -156]}>
        <sphereGeometry args={[9, 16, 16]} />
        <meshStandardMaterial color={GOLD_24K} metalness={0.85} roughness={0.25} />
      </mesh>

      {/* --- Extended Monumental Forepaws (Reaching out into the desert sand) --- */}
      {[-64, 64].map((px, i) => (
        <group key={i} position={[px, -50, 140]}>
          {/* Foreleg Limb angling down */}
          <mesh position={[0, 28, -55]} rotation={[0.3, 0, 0]}>
            <cylinderGeometry args={[24, 30, 120, 16]} />
            <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.82} />
          </mesh>
          {/* Monumental Paw Base */}
          <mesh position={[0, -10, 35]}>
            <boxGeometry args={[48, 26, 140]} />
            <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.8} />
          </mesh>
          {/* 4 Carved Monumental Toes & Knuckles */}
          {[-16, -5.5, 5.5, 16].map((tx, tIdx) => (
            <group key={tIdx} position={[tx, -10, 105]}>
              <mesh position={[0, 3, 0]}>
                <sphereGeometry args={[5.2, 14, 14]} />
                <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.76} />
              </mesh>
              <mesh position={[0, -2, 6]}>
                <boxGeometry args={[8.8, 16, 16]} />
                <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.8} />
              </mesh>
            </group>
          ))}
          {/* Gold Inlaid Claw Accents */}
          <mesh position={[0, -11, 115]}>
            <boxGeometry args={[44, 4, 8]} />
            <meshStandardMaterial color={GOLD_24K} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Royal Dream Stela of Thutmose IV Between the Paws */}
      <group position={[0, -18, 175]}>
        {/* Granite Slab */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[42, 95, 8]} />
          <meshStandardMaterial color="#3f3325" roughness={0.65} metalness={0.4} />
        </mesh>
        {/* Rounded Stela Top Arch */}
        <mesh position={[0, 47.5, 0]}>
          <cylinderGeometry args={[21, 21, 8, 24, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#3f3325" roughness={0.65} metalness={0.4} />
        </mesh>
        {/* Glowing Sacred Golden Hieroglyphs Tablet */}
        <mesh position={[0, 5, 4.4]}>
          <planeGeometry args={[36, 95]} />
          <meshStandardMaterial color="#1a1105" emissive={GOLD_24K} emissiveIntensity={0.65} metalness={0.8} />
        </mesh>
        {/* Winged Sun Disk of Horus at Top of Stela */}
        <mesh position={[0, 44, 4.6]}>
          <circleGeometry args={[8, 24]} />
          <meshBasicMaterial color={GOLD_24K} />
        </mesh>
      </group>

      {/* Monumental Stepped Limestone Plinth */}
      <group position={[0, -78, -30]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[360, 24, 520]} />
          <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.88} />
        </mesh>
        <mesh position={[0, -18, 0]}>
          <boxGeometry args={[410, 20, 580]} />
          <meshStandardMaterial color="#85653b" roughness={0.9} />
        </mesh>
        {/* 24K Gold Plinth Rim Trim */}
        <mesh position={[0, 12, 0]}>
          <boxGeometry args={[364, 3, 524]} />
          <meshStandardMaterial color={GOLD_24K} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

// ---------------------------------------------------------------------------
// 3. GREAT PYRAMIDS ON THE DESERT HORIZON
// ---------------------------------------------------------------------------
const GreatPyramidsHorizon = () => {
  return (
    <group position={[0, 0, -2200]}>
      {/* Great Pyramid of Khufu (Center Left) */}
      <group position={[-650, -120, -600]} rotation={[0, 0.42, 0]}>
        <mesh position={[0, 420, 0]}>
          <coneGeometry args={[560, 840, 4]} />
          <meshStandardMaterial color="#9a7444" roughness={0.92} metalness={0.05} />
        </mesh>
        {/* Gleaming 24K Gold Pyramidion Capstone */}
        <mesh position={[0, 810, 0]}>
          <coneGeometry args={[75, 110, 4]} />
          <meshStandardMaterial color={GOLD_24K} emissive={GOLD_24K} emissiveIntensity={1.8} metalness={0.95} roughness={0.12} />
        </mesh>
        {/* Subtle Skyward Celestial Defense Beam */}
        <pointLight position={[0, 860, 0]} color={GOLD_24K} intensity={14} distance={900} />
      </group>

      {/* Pyramid of Khafre (Center Right) */}
      <group position={[720, -120, -850]} rotation={[0, -0.32, 0]}>
        <mesh position={[0, 390, 0]}>
          <coneGeometry args={[510, 780, 4]} />
          <meshStandardMaterial color="#8f6b3e" roughness={0.92} metalness={0.05} />
        </mesh>
        {/* Intact Casing Stones & Golden Capstone */}
        <mesh position={[0, 755, 0]}>
          <coneGeometry args={[70, 100, 4]} />
          <meshStandardMaterial color={GOLD_24K} emissive={GOLD_24K} emissiveIntensity={1.6} metalness={0.95} roughness={0.12} />
        </mesh>
        <pointLight position={[0, 805, 0]} color={GOLD_24K} intensity={12} distance={850} />
      </group>
    </group>
  );
};

// ---------------------------------------------------------------------------
// 4. MAIN WORLD SPHINX SCENE COMPONENT
// ---------------------------------------------------------------------------
export default function WorldSphinx({ position, visible }) {
  const radarRingsRef = useRef();

  // Animation Loop
  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    // Orbital Threat Radar concentric rings rotation
    if (radarRingsRef.current) {
      radarRingsRef.current.rotation.y = t * 0.08;
      radarRingsRef.current.rotation.x = Math.sin(t * 0.3) * 0.06;
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* --- Cinematic Egyptian Twilight & Golden Torch Lighting --- */}
      <ambientLight intensity={0.55} color="#181326" />
      
      {/* Primary Golden Sunset/Moonlight Key on the Sphinx Face */}
      <directionalLight position={[-450, 650, -200]} intensity={3.2} color="#fff1cc" />
      
      {/* Soft Blue Night Sky Fill */}
      <directionalLight position={[450, 450, 300]} intensity={1.4} color="#38bdf8" />
      
      {/* Warm Golden Torch Spotlight illuminating the monumental chest & paws */}
      <pointLight position={[0, 80, -520]} intensity={18} distance={1100} color="#f59e0b" />
      <pointLight position={[0, 160, -460]} intensity={28} distance={900} color="#ffedd5" />
      <pointLight position={[-180, -40, -480]} intensity={10} distance={600} color="#ea580c" />
      <pointLight position={[180, -40, -480]} intensity={10} distance={600} color="#ea580c" />

      {/* Atmospheric Desert Starlight & Golden Sand Particles */}
      <Sparkles count={700} scale={[1900, 700, 1800]} size={6} speed={0.4} opacity={0.5} color="#ffd700" position={[0, 100, -700]} />
      <Sparkles count={350} scale={[500, 300, 300]} size={9} speed={1.0} opacity={0.65} color="#38bdf8" position={[0, 50, -640]} />

      {/* ------------------------------------------------------------- */}
      {/* 1. GREAT PYRAMIDS ON THE DESERT HORIZON                       */}
      {/* ------------------------------------------------------------- */}
      <GreatPyramidsHorizon />

      {/* ------------------------------------------------------------- */}
      {/* 2. ROLLING GOLDEN DESERT SAND DUNES BASE                      */}
      {/* ------------------------------------------------------------- */}
      <mesh position={[0, -188, -750]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4800, 4800, 48, 48]} />
        <meshStandardMaterial color={DESERT_SAND} roughness={0.88} metalness={0.05} />
      </mesh>

      {/* Surrounding Sculpted Golden Sand Dunes */}
      {[
        { pos: [-420, -170, -620], scale: [360, 42, 280], rot: [0.08, 0.35, 0] },
        { pos: [450, -170, -650], scale: [390, 46, 310], rot: [0.06, -0.4, 0] },
        { pos: [-220, -178, -380], scale: [280, 26, 180], rot: [0.04, 0.15, 0] },
        { pos: [240, -178, -390], scale: [290, 28, 190], rot: [-0.04, -0.2, 0] },
      ].map((dune, idx) => (
        <mesh key={idx} position={dune.pos} rotation={dune.rot} scale={dune.scale}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial color="#cfa46a" roughness={0.9} />
        </mesh>
      ))}

      {/* Monumental Stone Fire Braziers Framing the Approach Way */}
      {[-240, 240].map((bx, idx) => (
        <group key={idx} position={[bx, -175, -450]}>
          {/* Carved Limestone Pedestal */}
          <mesh position={[0, 24, 0]}>
            <cylinderGeometry args={[11, 15, 48, 16]} />
            <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.8} />
          </mesh>
          {/* Bronze Fire Basin */}
          <mesh position={[0, 50, 0]}>
            <cylinderGeometry args={[18, 9, 14, 16]} />
            <meshStandardMaterial color="#78350f" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Living Flame Core */}
          <mesh position={[0, 60, 0]}>
            <sphereGeometry args={[8.5, 16, 16]} />
            <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={3.5} />
          </mesh>
        </group>
      ))}

      {/* ------------------------------------------------------------- */}
      {/* 3. THE MAGNIFICENT GREAT SPHINX OF GIZA                       */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, -85, -740]}>
        {/* Anatomically Majestic Pharaonic Head with Nemes Headdress */}
        <PharaonicHead />

        {/* Muscular Leonine Body, Extended Forepaws & Royal Dream Stela */}
        <LeonineBody />

      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. CELESTIAL THREAT RADAR RINGS (HIGH IN THE TWILIGHT SKY)     */}
      {/* ------------------------------------------------------------- */}
      <group ref={radarRingsRef} position={[0, 420, -1100]}>
        <mesh rotation={[Math.PI / 5, 0, 0]}>
          <ringGeometry args={[480, 488, 64]} />
          <meshBasicMaterial color={GOLD_24K} transparent opacity={0.32} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <ringGeometry args={[520, 526, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[0, Math.PI / 3, 0]}>
          <ringGeometry args={[560, 565, 64]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 5. HOLOGRAPHIC TYPOGRAPHY BLADE (CLEANLY FRAMED ON LEFT FLANK) */}
      {/* ------------------------------------------------------------- */}
      <group position={[-520, 80, -560]} rotation={[0, Math.PI / 9, 0]}>
        {/* Holographic Obsidian Glass Blade Backing */}
        <mesh position={[140, -10, -2]}>
          <planeGeometry args={[280, 240]} />
          <meshStandardMaterial 
            color="#0b0804" 
            transparent 
            opacity={0.65} 
            roughness={0.15} 
            metalness={0.9} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        
        {/* Burnished 24K Gold Top Rail */}
        <mesh position={[140, 110, 0]}>
          <boxGeometry args={[282, 3.5, 2]} />
          <meshStandardMaterial color={GOLD_24K} emissive={GOLD_24K} emissiveIntensity={2.0} />
        </mesh>

        {/* Category Header */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[16, 84, 0]}
          fontSize={10}
          color="#38bdf8"
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
          position={[16, 44, 0]}
          fontSize={44}
          color="#ffffff"
          outlineWidth={1.5}
          outlineColor="#451a03"
          anchorX="left"
          anchorY="middle"
        >
          SPHINX
        </Text>

        {/* Headline */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[16, 4, 0]}
          fontSize={12.5}
          color={GOLD_24K}
          maxWidth={245}
          lineHeight={1.3}
          anchorX="left"
          anchorY="middle"
        >
          AUTONOMOUS PERIMETER SECURITY & GLOBAL RADAR
        </Text>

        {/* Description */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[16, -50, 0]}
          fontSize={10.5}
          color="#fef3c7"
          maxWidth={245}
          lineHeight={1.45}
          anchorX="left"
          anchorY="middle"
        >
          Safeguard critical infrastructure with a timeless autonomous sentinel that neutralizes multi-vector security threats with impenetrable perimeter defense.
        </Text>

        {/* Telemetry Indicator */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[16, -100, 0]}
          fontSize={9}
          color="#38bdf8"
          letterSpacing={0.06}
          anchorX="left"
          anchorY="middle"
        >
          [ ◈ 100% DEFLECTION  ◈ ZERO-IMPACT RESISTANCE ]
        </Text>
      </group>
    </group>
  );
}
