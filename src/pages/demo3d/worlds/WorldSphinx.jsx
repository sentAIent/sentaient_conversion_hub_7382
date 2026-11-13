import React, { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================================================
// WORLD SPHINX: The Grand Royal Sphinx of Giza — Autonomous Perimeter Sentinel
// Imposing, majestic ancient monument with authentic royal pharaonic face,
// noble leonine anatomy, golden pyramids on the horizon, and divine aegis shield.
// ===========================================================================

// --- Authentic Geological Weathered Giza Limestone Palette ---
const LIMESTONE_BASE = '#cbb18a';     // Natural weathered Giza limestone bedrock
const LIMESTONE_SHADOW = '#9c8152';   // Wind-eroded shadow limestone & deep crevices
const LIMESTONE_WARM = '#d8c096';     // Sunlit desert limestone
const LIMESTONE_FRACTURE = '#8c7047'; // Weathered broken bedrock fracture (broken nose & beard scar)
const DESERT_SAND = '#c29b62';        // Warm rolling dunes sand
const GOLD_24K = '#ffd700';           // Royal pharaonic gold leaf (subtle accents & stela hieroglyphs)

// --- Authentic High-Definition Continuous Parametric Pharaonic Face Geometry ---
// Sculpted directly from the human proportions of the Great Sphinx of Giza (Khafre)
// and the Sphinx of Hatshepsut: upright dignified profile, planar cheeks, noble brow,
// almond eyes with eyeliner contour, serene archaic smile, and human pharaonic jaw.
function createSphinxFaceGeometry() {
  const numRows = 54;
  const numCols = 54;
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let r = 0; r < numRows; r++) {
    const v = r / (numRows - 1); // 0 (forehead at brow band) to 1 (under chin)
    const y = 21.0 - v * 45.0;   // from y = 21 down to y = -24

    // Anatomical width of pharaonic human head (broad cheekbones, tapered chin)
    let halfWidth;
    if (v < 0.22) {
      halfWidth = 18.2 + v * 6.5; // forehead
    } else if (v < 0.54) {
      const t = (v - 0.22) / 0.32;
      halfWidth = 19.6 + Math.sin(t * Math.PI) * 2.2; // wide regal cheekbones (peaks ~21.8)
    } else if (v < 0.82) {
      const t = (v - 0.54) / 0.28;
      halfWidth = 21.0 - t * 7.0; // tapering pharaonic jaw
    } else {
      const t = (v - 0.82) / 0.18;
      halfWidth = 14.0 - t * 5.0; // rounded human chin
    }

    for (let c = 0; c < numCols; c++) {
      const u = (c / (numCols - 1)) * 2 - 1; // -1 to +1
      const x = u * halfWidth;
      const absX = Math.abs(x);
      const absU = Math.abs(u);

      // BASE PLANAR FACIAL SURFACE (Not a bulging sphere/cylinder)
      let z = 18.2 - Math.pow(x / 14.0, 2) * 2.2;
      if (absX > 12.0) {
        z -= Math.pow((absX - 12.0) / 7.5, 2) * 6.0;
      }

      // 1. Forehead plane: broad, noble, slightly inclined
      if (v < 0.22) {
        const t = v / 0.22;
        z += Math.sin(t * Math.PI) * 0.75 * (1 - absU * 0.65);
      }

      // 2. Continuous Pharaonic Supraorbital Brow Ridge
      if (v >= 0.20 && v <= 0.32) {
        const distV = Math.abs(v - 0.26) / 0.06;
        const browV = Math.cos(distV * (Math.PI / 2));
        const eyeBrowU = Math.max(0, 1 - Math.pow((absU - 0.36) / 0.32, 2));
        z += 1.8 * browV * eyeBrowU;
        if (absU < 0.18) {
          z += 1.3 * browV * (1 - absU / 0.18);
        }
      }

      // 3. Almond Eye Sockets & Sculpted Stone Eyelids
      const eyeCenterV = 0.36;
      const eyeCenterU = 0.38;
      const distEyeV = Math.abs(v - eyeCenterV) / 0.08;
      const distEyeU = Math.abs(absU - eyeCenterU) / 0.22;
      if (distEyeV < 1.0 && distEyeU < 1.0) {
        const eyeMask = Math.max(0, 1 - (distEyeV * distEyeV + distEyeU * distEyeU));
        z -= 2.2 * eyeMask;
        const eyeballV = distEyeV / 0.65;
        const eyeballU = distEyeU / 0.65;
        if (eyeballV * eyeballV + eyeballU * eyeballU < 1.0) {
          const eyeballMask = Math.max(0, 1 - (eyeballV * eyeballV + eyeballU * eyeballU));
          z += 1.4 * eyeballMask;
        }
        if (v < eyeCenterV && distEyeV < 0.6 && distEyeU < 0.8) {
          z += 0.6 * Math.cos((distEyeV / 0.6) * (Math.PI / 2));
        }
      }

      // 4. Regal High Cheekbones of Khafre
      const cheekCenterV = 0.48;
      const cheekCenterU = 0.52;
      const distCheek = Math.hypot((v - cheekCenterV) / 0.14, (absU - cheekCenterU) / 0.25);
      if (distCheek < 1.0) {
        z += 2.0 * Math.cos(distCheek * (Math.PI / 2));
      }

      // 5. Authentic Weathered Limestone Nose of Giza
      if (absX < 4.2 && v >= 0.28 && v <= 0.58) {
        const nWidth = Math.cos((absX / 4.2) * (Math.PI / 2));
        if (v < 0.38) {
          const t = (v - 0.28) / 0.10;
          z += (0.8 + t * 1.6) * nWidth;
        } else if (v <= 0.52) {
          const t = (v - 0.38) / 0.14;
          z += (2.4 - t * 0.5) * nWidth;
        } else {
          const t = (v - 0.52) / 0.06;
          z += (1.9 - t * 1.1) * nWidth;
        }
      }

      // 6. Philtrum Groove
      if (v >= 0.57 && v <= 0.66 && absX < 1.4) {
        z -= 0.5 * (1 - absX / 1.4);
      }

      // 7. Serene Archaic Egyptian Smile & Full Pharaonic Lips
      if (absX < 8.2 && v >= 0.64 && v <= 0.77) {
        const lipWidth = Math.cos((absX / 8.2) * (Math.PI / 2));
        if (v < 0.70) {
          const t = (v - 0.64) / 0.06;
          const cupid = Math.sin(t * Math.PI);
          const bowIndent = (absX < 1.2) ? 0.3 : 0;
          z += (1.6 * cupid - bowIndent) * lipWidth;
        } else if (Math.abs(v - 0.70) < 0.012) {
          z -= 0.6 * lipWidth;
        } else {
          const t = (v - 0.70) / 0.07;
          z += (1.4 * Math.sin(t * Math.PI)) * lipWidth;
        }
      }

      // 8. Mental Crease beneath lower lip
      if (v >= 0.77 && v <= 0.82 && absX < 6.0) {
        const t = (v - 0.77) / 0.05;
        z -= 0.6 * Math.sin(t * Math.PI) * Math.cos((absX / 6.0) * (Math.PI / 2));
      }

      // 9. Broad Dignified Human Chin
      if (v >= 0.82 && v <= 0.98 && absX < 8.0) {
        const t = (v - 0.82) / 0.16;
        z += 1.8 * Math.sin(t * Math.PI) * Math.cos((absX / 8.0) * (Math.PI / 2));
      }

      positions.push(x, y, z);
      uvs.push((u + 1) / 2, 1 - v);
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

// Sweeping Flared Nemes Headdress Wing with Carved Linen Pleat Grooves
function createNemesWingGeometry(side) {
  const numVSteps = 32;
  const numUSteps = 12;
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let r = 0; r < numVSteps; r++) {
    const v = r / (numVSteps - 1);
    const y = 22.0 - v * 50.0; // from y = 22 down to -28
    
    // Smooth inner contour hugging the pharaonic head & jaw
    let innerX;
    if (v < 0.2) {
      innerX = 18.0 + v * 8.0;
    } else if (v < 0.55) {
      innerX = 19.6 + Math.sin(((v - 0.2) / 0.35) * Math.PI) * 1.5;
    } else if (v < 0.85) {
      innerX = 20.0 - ((v - 0.55) / 0.30) * 6.0;
    } else {
      innerX = 14.0 - ((v - 0.85) / 0.15) * 5.0;
    }
    innerX *= side;

    // Majestic cobra-hood flare
    const flare = Math.sin(Math.pow(v, 0.75) * Math.PI);
    const outerX = (21.0 + flare * 17.5) * side;

    const zInner = 14.5 - v * 4.5;
    const zOuter = 7.5 - flare * 3.5;

    for (let c = 0; c < numUSteps; c++) {
      const u = c / (numUSteps - 1);
      const x = innerX + (outerX - innerX) * u;
      let z = zInner + (zOuter - zInner) * u;

      // Carved horizontal pleated linen ridges
      const pleat = Math.sin(v * Math.PI * 20.0) * 0.45 * (1 - u * 0.2);
      z += pleat;

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let r = 0; r < numVSteps - 1; r++) {
    for (let c = 0; c < numUSteps - 1; c++) {
      const a = r * numUSteps + c;
      const b = (r + 1) * numUSteps + c;
      const d = r * numUSteps + (c + 1);
      const e = (r + 1) * numUSteps + (c + 1);
      if (side > 0) {
        indices.push(a, b, d);
        indices.push(d, b, e);
      } else {
        indices.push(a, d, b);
        indices.push(d, e, b);
      }
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

// Front Descending Nemes Lapets Draping Smoothly over Shoulders onto Chest
function createNemesLapetGeometry(side) {
  const numVSteps = 24;
  const numUSteps = 8;
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let r = 0; r < numVSteps; r++) {
    const v = r / (numVSteps - 1);
    const y = -24 - v * 36; // from y = -24 down to -60
    
    const lapetWidth = 14 * (1 - v * 0.15);
    const centerX = side * (19 - v * 3);
    const leftX = centerX - lapetWidth / 2;
    const rightX = centerX + lapetWidth / 2;
    
    const zBase = 12 + Math.sin(v * Math.PI * 0.7) * 6;

    for (let c = 0; c < numUSteps; c++) {
      const u = c / (numUSteps - 1);
      const x = leftX + (rightX - leftX) * u;
      let z = zBase + Math.sin(u * Math.PI) * 1.5;
      z += Math.sin(v * Math.PI * 14) * 0.45; // pleats
      
      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let r = 0; r < numVSteps - 1; r++) {
    for (let c = 0; c < numUSteps - 1; c++) {
      const a = r * numUSteps + c;
      const b = (r + 1) * numUSteps + c;
      const d = r * numUSteps + (c + 1);
      const e = (r + 1) * numUSteps + (c + 1);
      if (side > 0) {
        indices.push(a, b, d);
        indices.push(d, b, e);
      } else {
        indices.push(a, d, b);
        indices.push(d, e, b);
      }
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
// 1. DIGNIFIED PHARAONIC HEAD & ROYAL NEMES HEADDRESS (AUTHENTIC GIZA MONOLITH)
// ---------------------------------------------------------------------------
const PharaonicHead = () => {
  const faceGeometry = useMemo(() => createSphinxFaceGeometry(), []);
  const wingRightGeometry = useMemo(() => createNemesWingGeometry(1), []);
  const wingLeftGeometry = useMemo(() => createNemesWingGeometry(-1), []);
  const lapetRightGeometry = useMemo(() => createNemesLapetGeometry(1), []);
  const lapetLeftGeometry = useMemo(() => createNemesLapetGeometry(-1), []);

  return (
    <group position={[0, 168, 56]} scale={[1.45, 1.45, 1.45]}>
      {/* --- A. Noble Monolithic Sculpted Face of Khafre --- */}
      {/* Unified Seamless Pharaonic Face Relief */}
      <mesh geometry={faceGeometry}>
        <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.82} metalness={0.02} />
      </mesh>

      {/* Luminous Golden Pharaonic Eyes (Brighter Royal Gold) */}
      {[-1, 1].map((side, i) => (
        <group key={`gold-eye-${i}`} position={[side * 7.6, 4.4, 16.7]} rotation={[0, 0, side * -0.04]}>
          {/* Luminous Gold Almond Eyeball */}
          <mesh scale={[1.35, 0.72, 0.4]}>
            <sphereGeometry args={[2.1, 18, 14]} />
            <meshStandardMaterial 
              color="#ffd700" 
              emissive="#f59e0b" 
              emissiveIntensity={1.3} 
              roughness={0.25} 
              metalness={0.85} 
            />
          </mesh>

          {/* Pharaonic Amber-Gold Pupil & Iris Depth */}
          <mesh position={[0, 0, 0.7]} scale={[0.55, 0.7, 0.2]}>
            <sphereGeometry args={[1.0, 14, 12]} />
            <meshStandardMaterial 
              color="#78350f" 
              emissive="#ffd700" 
              emissiveIntensity={0.6} 
              roughness={0.2} 
            />
          </mesh>

          {/* Subtle Warm Divine Eye Illumination */}
          <pointLight intensity={3.0} distance={35} color="#ffd700" />
        </group>
      ))}

      {/* Royal Kohl Eyeliner Cosmetic Bands (Ancient Egyptian Sculpture Accent) */}
      {[-1, 1].map((side, i) => (
        <group key={`eyeliner-${i}`} position={[side * 7.6, 4.8, 17.5]} rotation={[0, 0, side * -0.05]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[6.8, 0.45, 0.4]} />
            <meshStandardMaterial color="#2d1c0e" roughness={0.7} />
          </mesh>
          <mesh position={[side * 4.2, 0.2, -0.3]} rotation={[0, 0, side * 0.12]}>
            <boxGeometry args={[2.2, 0.3, 0.4]} />
            <meshStandardMaterial color="#2d1c0e" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Prominent Classical Pharaonic Limestone Ears (Flanking Cheeks) */}
      {[-1, 1].map((side, i) => (
        <group key={`ear-${i}`} position={[side * 20.8, 4.0, 11.5]} rotation={[0.04, side * 0.28, side * 0.08]}>
          <mesh>
            <cylinderGeometry args={[4.2, 2.8, 16, 16]} />
            <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.88} />
          </mesh>
          <mesh position={[side * 0.6, -1.0, 0.2]}>
            <cylinderGeometry args={[1.6, 1.2, 12, 8]} />
            <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.85} />
          </mesh>
          <mesh position={[side * 0.1, 0, 0.5]}>
            <boxGeometry args={[1.2, 8, 3]} />
            <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* --- B. Authentic Weathered Limestone Nemes Headdress --- */}
      {/* Upper Cranial Cowl Dome */}
      <mesh position={[0, 15, -4]} scale={[1.06, 1.05, 1.08]}>
        <sphereGeometry args={[25, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.56]} />
        <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.84} metalness={0.05} />
      </mesh>

      {/* Alternating Royal Gold Band Accents on Crown */}
      {[22, 27, 32].map((by, idx) => (
        <mesh key={`crown-band-${idx}`} position={[0, by, -3]} rotation={[0.1, 0, 0]}>
          <torusGeometry args={[20 - idx * 3.8, 0.8, 8, 32, Math.PI]} />
          <meshStandardMaterial color={GOLD_24K} roughness={0.4} metalness={0.65} />
        </mesh>
      ))}

      {/* Horizontal Pharaonic Brow Band Across Forehead */}
      <mesh position={[0, 20.8, 16.5]} rotation={[0.06, 0, 0]}>
        <boxGeometry args={[41, 3.2, 6.0]} />
        <meshStandardMaterial color={GOLD_24K} roughness={0.4} metalness={0.65} />
      </mesh>

      {/* Royal Sacred Uraeus Cobra at Center of Brow Band */}
      <group position={[0, 24.5, 20.0]} rotation={[-0.08, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[2.2, 6.5, 12]} rotation={[Math.PI, 0, 0]} />
          <meshStandardMaterial color={GOLD_24K} roughness={0.35} metalness={0.75} />
        </mesh>
        <mesh position={[0, 3.8, 0.4]}>
          <sphereGeometry args={[1.2, 12, 10]} />
          <meshStandardMaterial color={GOLD_24K} roughness={0.35} metalness={0.75} />
        </mesh>
        <mesh position={[0, 5.2, 0.2]}>
          <cylinderGeometry args={[1.5, 1.5, 0.6, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Sweeping Flared Nemes Wings with Pleated Linen Ridges */}
      <mesh geometry={wingRightGeometry}>
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.86} />
      </mesh>
      <mesh geometry={wingLeftGeometry}>
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.86} />
      </mesh>

      {/* Front Descending Lapets Draping Gracefully onto Chest */}
      <mesh geometry={lapetRightGeometry}>
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.85} />
      </mesh>
      <mesh geometry={lapetLeftGeometry}>
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.85} />
      </mesh>

      {/* Rear Nemes Queue extending down spine */}
      <mesh position={[0, -42, -24]} rotation={[-0.1, 0, 0]}>
        <cylinderGeometry args={[14, 9, 96, 16]} />
        <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.9} />
      </mesh>
    </group>
  );
};

// ---------------------------------------------------------------------------
// 2. MONUMENTAL LEONINE BODY, PAWS & DREAM STELA (GIZA BEDROCK)
// ---------------------------------------------------------------------------
const LeonineBody = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Broad Muscular Chest of the Lion */}
      <mesh position={[0, 32, 35]}>
        <cylinderGeometry args={[56, 80, 110, 28]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.86} />
      </mesh>

      {/* Muscular Carved Limestone Neck Supporting the Pharaonic Head */}
      <mesh position={[0, 112, 48]}>
        <cylinderGeometry args={[32, 38, 60, 24]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.85} />
      </mesh>


      {/* Main Elongated Leonine Torso (Receding gracefully back) */}
      <mesh position={[0, 12, -120]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[68, 76, 290, 28]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.88} />
      </mesh>

      {/* Horizontal Flank Erosion Ledges (Iconic Member II Bedrock Weathering) */}
      {[-40, -100, -160, -220].map((fz, idx) => (
        <mesh key={`flank-strata-${idx}`} position={[0, 14, fz]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[71, 71, 14, 28, 1, true]} />
          <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.94} />
        </mesh>
      ))}

      {/* Lion Shoulders (Left & Right Deltoids) */}
      {[-68, 68].map((sx, i) => (
        <mesh key={i} position={[sx, 50, 18]}>
          <sphereGeometry args={[44, 24, 20]} />
          <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.85} />
        </mesh>
      ))}

      {/* Powerful Hindquarters / Crouching Lion Haunches */}
      {[-74, 74].map((hx, i) => (
        <group key={i} position={[hx, 0, -210]} rotation={[0, i === 0 ? 0.22 : -0.22, 0]}>
          <mesh position={[0, 25, 0]}>
            <sphereGeometry args={[56, 24, 20]} />
            <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.88} />
          </mesh>
          {/* Folded Hind Leg Plate */}
          <mesh position={[0, -22, -15]} rotation={[-0.25, 0, 0]}>
            <boxGeometry args={[48, 65, 110]} />
            <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* Long Feline Tail Curling Around Right Haunch */}
      <mesh position={[78, -38, -220]} rotation={[0.35, 0.45, 0]}>
        <torusGeometry args={[68, 6.5, 16, 48, Math.PI * 1.25]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.85} />
      </mesh>
      <mesh position={[82, -56, -156]}>
        <sphereGeometry args={[9, 16, 16]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.88} />
      </mesh>

      {/* --- Monumental Forepaws (Reaching Directly Forward as seen in Image 2) --- */}
      {[-66, 66].map((px, i) => (
        <group key={i} position={[px, -50, 140]}>
          {/* Foreleg Limb angling down */}
          <mesh position={[0, 28, -55]} rotation={[0.3, 0, 0]}>
            <cylinderGeometry args={[24, 30, 120, 16]} />
            <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.85} />
          </mesh>
          {/* Monumental Paw Base (Carved Limestone Blocks) */}
          <mesh position={[0, -10, 35]}>
            <boxGeometry args={[52, 26, 150]} />
            <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.86} />
          </mesh>
          {/* 4 Monumental Ancient Masonry Toes (Directly matching Image 2) */}
          {[-18, -6, 6, 18].map((tx, tIdx) => (
            <group key={tIdx} position={[tx, -8, 110]}>
              {/* Toe body */}
              <mesh position={[0, 0, 0]} rotation={[0.08, 0, 0]}>
                <cylinderGeometry args={[5.2, 5.8, 38, 16]} />
                <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.84} />
              </mesh>
              {/* Rounded front toe cap */}
              <mesh position={[0, -2, 20]} rotation={[0.2, 0, 0]}>
                <sphereGeometry args={[5.2, 16, 14]} scale={[1, 0.8, 1.2]} />
                <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.82} />
              </mesh>
              {/* Carved Masonry Joint Lines on the Toe */}
              {[-8, 4, 16].map((jz, jIdx) => (
                <mesh key={jIdx} position={[0, 0.2, jz]} rotation={[0.08, 0, 0]}>
                  <boxGeometry args={[11, 0.6, 0.8]} />
                  <meshBasicMaterial color="#302010" />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      ))}


      {/* Monumental Stepped Limestone Plinth */}
      <group position={[0, -78, -30]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[360, 24, 520]} />
          <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.9} />
        </mesh>
        <mesh position={[0, -18, 0]}>
          <boxGeometry args={[410, 20, 580]} />
          <meshStandardMaterial color="#85653b" roughness={0.92} />
        </mesh>
        {/* Carved Limestone Plinth Rim Molding */}
        <mesh position={[0, 12, 0]}>
          <boxGeometry args={[364, 3, 524]} />
          <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.88} />
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
// 3.5 ANCIENT MONUMENTAL TEMPLE FIRE BRAZIERS (LIVING FLAME & EMBERS)
// ---------------------------------------------------------------------------
function createOrganicFlameGeometry(radius = 11, height = 44, radialSegments = 16, heightSegments = 14) {
  const geo = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments, true);
  geo.translate(0, height / 2, 0);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const normalizedY = Math.max(0, Math.min(1, v.y / height));
    // Teardrop flare at 25-30% height, sharp licking tip at top
    const flare = Math.sin(normalizedY * Math.PI) * 1.35 * Math.pow(1 - normalizedY * 0.65, 0.6);
    v.x *= flare;
    v.z *= flare;
    const curveOffset = Math.sin(normalizedY * Math.PI * 1.5) * (normalizedY * normalizedY * 3.2);
    v.z += curveOffset;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

function GrandTempleBrazier({ position = [0, 0, 0], scale = 1.0, phaseOffset = 0 }) {
  const flameGroupRef = useRef();
  const flameCoreRef = useRef();
  const flameTongueLeftRef = useRef();
  const flameTongueRightRef = useRef();
  const lightRef = useRef();
  const glowHaloRef = useRef();
  const embersRef = useRef();

  const flameGeo = useMemo(() => createOrganicFlameGeometry(10.5, 42, 16, 12), []);
  const coreFlameGeo = useMemo(() => createOrganicFlameGeometry(6.2, 28, 14, 10), []);
  const tongueGeo = useMemo(() => createOrganicFlameGeometry(5.5, 26, 12, 8), []);

  const emberData = useMemo(() => {
    const count = 38;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const wander = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rad = Math.random() * 8.5;
      positions[i * 3 + 0] = Math.cos(angle) * rad;
      positions[i * 3 + 1] = 68 + Math.random() * 85;
      positions[i * 3 + 2] = Math.sin(angle) * rad;
      speeds[i] = 16 + Math.random() * 26;
      wander[i] = Math.random() * Math.PI * 2;
    }
    return { count, positions, speeds, wander };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() + phaseOffset;

    // Multi-harmonic flickering & turbulent draft
    if (flameGroupRef.current) {
      const stretchY = 1 + Math.sin(t * 8.5) * 0.12 + Math.sin(t * 19.3) * 0.06;
      const swayX = Math.sin(t * 3.8) * 0.08 + Math.sin(t * 11.2) * 0.04;
      const swayZ = Math.cos(t * 4.2) * 0.08 + Math.sin(t * 13.7) * 0.04;
      flameGroupRef.current.scale.set(1 + swayX * 0.5, stretchY, 1 + swayZ * 0.5);
      flameGroupRef.current.rotation.y = Math.sin(t * 2.2) * 0.2;
      flameGroupRef.current.rotation.z = Math.sin(t * 4.6) * 0.06;
      flameGroupRef.current.rotation.x = Math.cos(t * 5.1) * 0.05;
    }

    if (flameCoreRef.current) {
      const coreFlicker = 1 + Math.sin(t * 14.5) * 0.08 + Math.sin(t * 27.1) * 0.05;
      flameCoreRef.current.scale.set(coreFlicker, coreFlicker, coreFlicker);
    }

    if (flameTongueLeftRef.current) {
      flameTongueLeftRef.current.rotation.z = Math.sin(t * 7.2) * 0.18 + 0.15;
      flameTongueLeftRef.current.scale.y = 0.9 + Math.sin(t * 12.0) * 0.18;
    }

    if (flameTongueRightRef.current) {
      flameTongueRightRef.current.rotation.z = -Math.sin(t * 8.1) * 0.18 - 0.15;
      flameTongueRightRef.current.scale.y = 0.9 + Math.cos(t * 13.5) * 0.18;
    }

    if (glowHaloRef.current) {
      const haloScale = 1 + Math.sin(t * 6.5) * 0.14 + Math.sin(t * 15.2) * 0.08;
      glowHaloRef.current.scale.set(haloScale, haloScale * 1.15, haloScale);
    }

    if (lightRef.current) {
      // Atmospheric dynamic firelight flicker
      lightRef.current.intensity = 22 + Math.sin(t * 9.4) * 4.5 + Math.sin(t * 21.7) * 3.0 + Math.sin(t * 37.1) * 1.6;
    }

    // Updraft ember particles drifting in desert breeze
    if (embersRef.current) {
      const posAttr = embersRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < emberData.count; i++) {
        const idx = i * 3;
        arr[idx + 1] += emberData.speeds[i] * delta;
        arr[idx + 0] += Math.sin(t * 2.5 + emberData.wander[i]) * 0.28;
        arr[idx + 2] += Math.cos(t * 2.8 + emberData.wander[i]) * 0.28;

        // Reset particle to cauldron hearth bed
        if (arr[idx + 1] > 165) {
          const angle = Math.random() * Math.PI * 2;
          const rad = Math.random() * 8.5;
          arr[idx + 0] = Math.cos(angle) * rad;
          arr[idx + 1] = 68 + Math.random() * 6;
          arr[idx + 2] = Math.sin(angle) * rad;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* 1. MONUMENTAL CARVED EGYPTIAN LIMESTONE PEDESTAL */}
      {/* Lower Stepped Foundation Plinth */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[34, 8, 34]} />
        <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.92} />
      </mesh>
      {/* Upper Stepped Plinth */}
      <mesh position={[0, 11, 0]}>
        <boxGeometry args={[28, 6, 28]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.85} />
      </mesh>
      {/* Torus Molding Base Ring */}
      <mesh position={[0, 15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[13.5, 2.2, 12, 24]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.8} />
      </mesh>
      {/* Fluted Weathered Pedestal Shaft */}
      <mesh position={[0, 36, 0]}>
        <cylinderGeometry args={[11, 13.5, 40, 20]} />
        <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.78} />
      </mesh>
      {/* Royal 24K Gold Leaf Collar Ring */}
      <mesh position={[0, 56.5, 0]}>
        <cylinderGeometry args={[13.8, 13.8, 3.2, 24]} />
        <meshStandardMaterial color={GOLD_24K} metalness={0.92} roughness={0.18} emissive={GOLD_24K} emissiveIntensity={0.25} />
      </mesh>
      {/* Traditional Egyptian Cavetto Cornice Capital */}
      <mesh position={[0, 61.5, 0]}>
        <cylinderGeometry args={[20.5, 12.5, 8, 24]} />
        <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.75} />
      </mesh>

      {/* 2. ORNATE HAMMERED TEMPLE BRONZE CAULDRON */}
      {/* Flared Bronze Cauldron Basin */}
      <mesh position={[0, 69, 0]}>
        <cylinderGeometry args={[22.5, 14, 15, 24]} />
        <meshStandardMaterial color="#6c3310" metalness={0.88} roughness={0.28} />
      </mesh>
      {/* Heavy Cast Bronze Rolled Rim Lip */}
      <mesh position={[0, 76.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[22.6, 2.2, 14, 32]} />
        <meshStandardMaterial color="#78350f" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* 3 Lion-Paw Cast Bronze Tripod Struts */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((ang, i) => (
        <group key={i} rotation={[0, ang, 0]}>
          <mesh position={[16, 64.5, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[4.2, 14, 3.8]} />
            <meshStandardMaterial color="#55260b" metalness={0.85} roughness={0.35} />
          </mesh>
          {/* Lion Paw Foot Clasping Cornice */}
          <mesh position={[18.5, 59, 0]}>
            <sphereGeometry args={[3.2, 12, 10]} />
            <meshStandardMaterial color="#55260b" metalness={0.85} roughness={0.35} />
          </mesh>
        </group>
      ))}
      {/* Heavy Cast Hanging Temple Rings on Cauldron Sides */}
      {[-24.2, 24.2].map((rx, i) => (
        <mesh key={i} position={[rx, 72, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[3.8, 1.2, 10, 20]} />
          <meshStandardMaterial color="#451a03" metalness={0.92} roughness={0.3} />
        </mesh>
      ))}

      {/* 3. SMOLDERING CHARCOAL & ACACIA WOOD FUEL BED */}
      <mesh position={[0, 72, 0]}>
        <cylinderGeometry args={[20, 13, 6, 20]} />
        <meshStandardMaterial color="#1c1917" roughness={0.95} />
      </mesh>
      {/* Glowing Hot Ember Coals Clustered in Bed */}
      {[
        { pos: [-6, 73.8, -4], r: 3.8 },
        { pos: [5, 74.0, 5], r: 4.2 },
        { pos: [-4, 74.2, 5], r: 3.5 },
        { pos: [6, 73.9, -5], r: 4.0 },
        { pos: [0, 74.5, 0], r: 4.8 },
      ].map((ember, i) => (
        <mesh key={i} position={ember.pos}>
          <dodecahedronGeometry args={[ember.r, 0]} />
          <meshStandardMaterial
            color="#ea580c"
            emissive="#ef4444"
            emissiveIntensity={3.2}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* 4. MULTI-LAYER LIVING FLAME SCULPTURE */}
      <group ref={flameGroupRef} position={[0, 74, 0]}>
        {/* Main Golden-Amber Flame Tongue */}
        <mesh geometry={flameGeo}>
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={3.5}
            roughness={0.15}
            transparent
            opacity={0.94}
          />
        </mesh>

        {/* Secondary Lapping Flame Tongue (Left) */}
        <mesh ref={flameTongueLeftRef} geometry={tongueGeo} position={[-4, 2, -2]}>
          <meshStandardMaterial
            color="#fb923c"
            emissive="#ea580c"
            emissiveIntensity={2.8}
            roughness={0.2}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Secondary Lapping Flame Tongue (Right) */}
        <mesh ref={flameTongueRightRef} geometry={tongueGeo} position={[4, 2, 2]}>
          <meshStandardMaterial
            color="#f97316"
            emissive="#ea580c"
            emissiveIntensity={2.8}
            roughness={0.2}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Incandescent White-Hot Flame Core */}
        <mesh ref={flameCoreRef} geometry={coreFlameGeo} position={[0, 1, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#fef08a"
            emissiveIntensity={5.2}
            roughness={0.05}
          />
        </mesh>

        {/* Volumetric Flame Heat Halo with Additive Blending */}
        <mesh ref={glowHaloRef} position={[0, 20, 0]}>
          <sphereGeometry args={[18, 16, 16]} />
          <meshBasicMaterial
            color="#fbbf24"
            transparent
            opacity={0.24}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 5. CONVECTIVE SWIRLING EMBER SPARKS FOUNTAIN */}
      <points ref={embersRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={emberData.count}
            array={emberData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={4.8}
          color="#ffedd5"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 6. DYNAMIC DANCING FIRELIGHT CAST */}
      <pointLight
        ref={lightRef}
        position={[0, 88, 0]}
        color="#f59e0b"
        distance={750}
        decay={2}
        intensity={22}
      />
      {/* Broad Warm Hearth Ambiance Light */}
      <pointLight
        position={[0, 110, 0]}
        color="#ea580c"
        distance={950}
        decay={2}
        intensity={14}
      />
    </group>
  );
}

// ---------------------------------------------------------------------------
// 4. MAIN WORLD SPHINX SCENE COMPONENT
// ---------------------------------------------------------------------------
export default function WorldSphinx({ position, visible }) {
  // Load official Sphinx emblem
  const logoTex = useLoader(THREE.TextureLoader, '/sphinx_logo_final.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

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

      {/* Ancient Pharaonic Grand Fire Braziers Framing the Causeway */}
      {[
        { pos: [-240, -188, -440], scale: 1.05, phase: 0.0 },
        { pos: [240, -188, -440], scale: 1.05, phase: 1.8 },
        { pos: [-315, -188, -600], scale: 1.15, phase: 3.4 },
        { pos: [315, -188, -600], scale: 1.15, phase: 5.1 },
      ].map((b, idx) => (
        <GrandTempleBrazier
          key={idx}
          position={b.pos}
          scale={b.scale}
          phaseOffset={b.phase}
        />
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
      {/* 4. CENTERPIECE: SPHINX LOGO & TITLE ABOVE ANIMATION           */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 380, -680]}>
        {/* Floating Sphinx Emblem */}
        <Float speed={2} rotationIntensity={0.06} floatIntensity={0.35}>
          <mesh position={[0, 68, 0]}>
            <planeGeometry args={[120, 94]} />
            <meshBasicMaterial 
              map={logoTex} 
              transparent 
              depthWrite={false} 
              blending={THREE.AdditiveBlending} 
            />
          </mesh>
        </Float>

        {/* Sphinx Title */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, 0, 0]}
          fontSize={52}
          color="#ffffff"
          outlineWidth={1.8}
          outlineColor="#78350f"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          SPHINX
        </Text>

        {/* Subtitle - Enlarged for High Legibility */}
        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[0, -48, 0]}
          fontSize={26}
          color="#f59e0b"
          outlineWidth={1.2}
          outlineColor="#0b0804"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          GLOBAL THREAT & DISASTER DEFENSE
        </Text>
      </group>
    </group>
  );
}
