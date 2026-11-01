import React, { useMemo } from 'react';
import { Text, Sparkles } from '@react-three/drei';
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
// Sculpted directly from the proportions of Khafre and the Great Sphinx of Giza
function createSphinxFaceGeometry() {
  const numRows = 48;
  const numCols = 48;
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let r = 0; r < numRows; r++) {
    const v = r / (numRows - 1); // 0 (forehead at brow band) to 1 (under chin)
    const y = 20 - v * 48;       // from y = 20 down to y = -28

    // Width curve from forehead to jaw
    let halfWidth;
    if (v < 0.28) {
      halfWidth = 19 + v * 12;
    } else if (v < 0.60) {
      halfWidth = 22.5 + Math.sin((v - 0.28) / 0.32 * Math.PI) * 2.5; // noble wide cheekbones
    } else if (v < 0.85) {
      halfWidth = 23 - (v - 0.60) * 16; // tapering pharaonic jaw
    } else {
      halfWidth = 19 - (v - 0.85) * 35; // rounded chin
    }
    halfWidth = Math.max(5, halfWidth);

    for (let c = 0; c < numCols; c++) {
      const u = (c / (numCols - 1)) * 2 - 1; // -1 to +1
      const x = u * halfWidth;
      const absU = Math.abs(u);

      // Base head curvature (cranial stone relief)
      const headRadius = 24;
      let z = Math.sqrt(Math.max(0, headRadius * headRadius - (u * 21) * (u * 21) * 0.7 - ((v - 0.5) * 44) * ((v - 0.5) * 44) * 0.45));

      // 1. Forehead plane
      if (v < 0.25) {
        const fFactor = Math.sin((v / 0.25) * Math.PI);
        z += 1.4 * fFactor * Math.max(0, 1 - absU * 1.5);
      }

      // 2. Continuous Pharaonic Brow Ridge
      const browCenterV = 0.27;
      const browDistV = Math.abs(v - browCenterV);
      if (browDistV < 0.08) {
        const bV = Math.cos((browDistV / 0.08) * (Math.PI / 2));
        const bU = Math.max(0, 1 - Math.pow(absU - 0.35, 2) * 5);
        z += 3.2 * bV * bU;
        if (absU < 0.2) {
          z += 2.0 * bV * (1 - absU / 0.2);
        }
      }

      // 3. Almond Eye Sockets & Sculpted Stone Eyelids
      const eyeCenterV = 0.37;
      const eyeCenterU = 0.40;
      const distEyeV = Math.abs(v - eyeCenterV);
      const distEyeU = Math.abs(absU - eyeCenterU);
      if (distEyeV < 0.08 && distEyeU < 0.22) {
        const normDV = distEyeV / 0.08;
        const normDU = distEyeU / 0.22;
        const eyeMask = Math.max(0, 1 - (normDV * normDV + normDU * normDU));
        z -= 2.6 * eyeMask;
        // Convex almond stone eyeball
        const globeDV = distEyeV / 0.05;
        const globeDU = distEyeU / 0.14;
        if (globeDV * globeDV + globeDU * globeDU < 1.0) {
          const globe = Math.max(0, 1 - (globeDV * globeDV + globeDU * globeDU));
          z += 1.8 * globe;
        }
        // Sculpted upper eyelid fold
        if (v < eyeCenterV && distEyeV < 0.05 && distEyeU < 0.18) {
          z += 0.8 * Math.cos((distEyeV / 0.05) * (Math.PI / 2));
        }
      }

      // 4. Regal High Cheekbones of Khafre
      const cheekCenterV = 0.50;
      const cheekCenterU = 0.52;
      const distCheek = Math.hypot((v - cheekCenterV) / 0.16, (absU - cheekCenterU) / 0.22);
      if (distCheek < 1.0) {
        z += 2.8 * Math.cos(distCheek * (Math.PI / 2));
      }

      // 5. Authentic Broken Nose of Giza (Weathered chisel fracture depression)
      if (absU < 0.22 && v >= 0.28 && v <= 0.58) {
        const nWidth = 1 - (absU / 0.22);
        if (v < 0.40) {
          const bridgeT = (v - 0.28) / 0.12;
          z += (2.5 + bridgeT * 2.0) * nWidth;
        } else if (v <= 0.54) {
          // Sheared break: drops into eroded limestone depression
          const fracT = (v - 0.40) / 0.14;
          const chiseled = Math.sin(v * 45 + u * 20) * 0.35;
          z += (3.5 - fracT * 1.8 + chiseled) * nWidth;
        } else {
          const baseT = (v - 0.54) / 0.04;
          z += (1.7 - baseT * 0.8) * nWidth;
        }
      }

      // 6. Philtrum Groove
      if (v >= 0.55 && v <= 0.65 && absU < 0.08) {
        z -= 0.6 * (1 - absU / 0.08);
      }

      // 7. Full Ancient Pharaonic Lips with Subtle Archaic Smile
      if (absU < 0.38 && v >= 0.63 && v <= 0.76) {
        const lipWidth = Math.cos((absU / 0.38) * (Math.PI / 2));
        if (v >= 0.63 && v <= 0.69) {
          const upT = Math.sin(((v - 0.63) / 0.06) * Math.PI);
          z += 2.4 * upT * lipWidth;
        }
        if (Math.abs(v - 0.69) < 0.015) {
          z -= 0.8 * lipWidth;
        }
        if (v >= 0.69 && v <= 0.76) {
          const lowT = Math.sin(((v - 0.69) / 0.07) * Math.PI);
          z += 2.2 * lowT * lipWidth;
        }
      }

      // 8. Strong Pharaonic Chin & Mental Crease
      if (v >= 0.76 && v <= 0.94 && absU < 0.35) {
        const chinWidth = Math.cos((absU / 0.35) * (Math.PI / 2));
        if (v >= 0.76 && v <= 0.80) {
          z -= 0.8 * Math.sin(((v - 0.76) / 0.04) * Math.PI) * chinWidth;
        }
        if (v >= 0.80 && v <= 0.94) {
          const cT = Math.sin(((v - 0.80) / 0.14) * Math.PI);
          z += 2.8 * cT * chinWidth;
        }
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
    const y = 22 - v * 52; // from y = 22 down to -30
    
    // Iconic flared triangular outer contour
    const flare = Math.sin(v * Math.PI * 0.82);
    const innerX = (17 + v * 3) * side;
    const outerX = (23 + flare * 21) * side;
    
    const zInner = 20 - v * 10;
    const zOuter = 10 - flare * 5;

    for (let c = 0; c < numUSteps; c++) {
      const u = c / (numUSteps - 1);
      const x = innerX + (outerX - innerX) * u;
      let z = zInner + (zOuter - zInner) * u;
      
      // Carved horizontal pleated linen ridges
      const pleat = Math.sin(v * Math.PI * 22) * 0.5 * (1 - u * 0.25);
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

      {/* Subtle Depth Shadow in the Mouth Crease */}
      <mesh position={[0, -13.2, 24.2]}>
        <boxGeometry args={[14, 0.4, 1.2]} />
        <meshBasicMaterial color="#1a1209" />
      </mesh>

      {/* Dark Weathered Nostril Cavity Recesses Under Broken Nose */}
      {[-1, 1].map((side, i) => (
        <mesh key={`nostril-${i}`} position={[side * 2.2, -4.5, 24.0]} rotation={[0.4, 0, side * 0.15]}>
          <sphereGeometry args={[1.5, 10, 8]} scale={[1.1, 0.75, 0.7]} />
          <meshBasicMaterial color="#1f140b" />
        </mesh>
      ))}

      {/* Authentic Broken Beard Scar Under Chin (Beard broke off in antiquity) */}
      <mesh position={[0, -28.5, 20]} rotation={[-0.2, 0, 0]}>
        <cylinderGeometry args={[5.2, 7.0, 5.5, 16]} />
        <meshStandardMaterial color={LIMESTONE_FRACTURE} roughness={0.96} />
      </mesh>

      {/* Prominent Classical Pharaonic Limestone Ears (Flanking Cheeks) */}
      {[-1, 1].map((side, i) => (
        <group key={`ear-${i}`} position={[side * 23.5, 2, 11]} rotation={[0.06, side * 0.25, side * 0.1]}>
          <mesh>
            <cylinderGeometry args={[4.2, 3.2, 18, 16]} />
            <meshStandardMaterial color={LIMESTONE_BASE} roughness={0.88} />
          </mesh>
          <mesh position={[side * 0.8, 0, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 16, 8]} />
            <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.85} />
          </mesh>
          <mesh position={[side * 0.2, 0, 0]}>
            <boxGeometry args={[1.5, 9, 4]} />
            <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* --- B. Authentic Weathered Limestone Nemes Headdress --- */}
      {/* Upper Cranial Cowl Dome */}
      <mesh position={[0, 15, -4]} scale={[1.08, 1.05, 1.1]}>
        <sphereGeometry args={[26, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
        <meshStandardMaterial color={LIMESTONE_WARM} roughness={0.86} metalness={0.02} />
      </mesh>

      {/* Horizontal Pharaonic Brow Band Across Forehead */}
      <mesh position={[0, 19.5, 14]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[42, 3.2, 14]} />
        <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.9} />
      </mesh>

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

      {/* Weathered Uraeus Stump on Brow (Eroded Stone Knot) */}
      <mesh position={[0, 22.5, 21.2]} rotation={[0.12, 0, 0]}>
        <sphereGeometry args={[2.8, 14, 12]} scale={[1, 1.3, 0.9]} />
        <meshStandardMaterial color={LIMESTONE_SHADOW} roughness={0.92} />
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

      {/* Horizontal Weathered Limestone Erosion Strata Ledges Across Chest & Neck (Member II Bedrock) */}
      {[46, 58, 70, 82, 94, 106, 118].map((cy, idx) => (
        <mesh key={`chest-strata-${idx}`} position={[0, cy, 46]} rotation={[0.26, 0, 0]}>
          <cylinderGeometry args={[58 + idx * 3.5, 63 + idx * 3.5, 7.5, 28, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color={idx % 2 === 0 ? LIMESTONE_SHADOW : LIMESTONE_WARM} roughness={0.92} />
        </mesh>
      ))}

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

      {/* Royal Dream Stela of Thutmose IV Between the Paws */}
      <group position={[0, -18, 175]}>
        {/* Weathered Red Granite Slab */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[42, 95, 8]} />
          <meshStandardMaterial color="#3f3325" roughness={0.75} metalness={0.2} />
        </mesh>
        {/* Rounded Stela Top Arch */}
        <mesh position={[0, 47.5, 0]}>
          <cylinderGeometry args={[21, 21, 8, 24, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#3f3325" roughness={0.75} metalness={0.2} />
        </mesh>
        {/* Ancient Hieroglyphic Tablet */}
        <mesh position={[0, 5, 4.4]}>
          <planeGeometry args={[36, 95]} />
          <meshStandardMaterial color="#261c12" emissive={GOLD_24K} emissiveIntensity={0.25} metalness={0.4} roughness={0.6} />
        </mesh>
        {/* Winged Sun Disk of Horus at Top of Stela */}
        <mesh position={[0, 44, 4.6]}>
          <circleGeometry args={[8, 24]} />
          <meshStandardMaterial color={GOLD_24K} emissive={GOLD_24K} emissiveIntensity={0.6} />
        </mesh>
      </group>

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
// 4. MAIN WORLD SPHINX SCENE COMPONENT
// ---------------------------------------------------------------------------
export default function WorldSphinx({ position, visible }) {
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
      {/* 4. HOLOGRAPHIC TYPOGRAPHY BLADE (CLEANLY FRAMED ON LEFT FLANK) */}
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
