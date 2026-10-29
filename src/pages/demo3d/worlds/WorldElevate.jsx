import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Alpine Pine Tree Component
const AlpinePineTree = ({ position, scale = 1.0 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 10, 0]}>
        <cylinderGeometry args={[2, 3.5, 20, 8]} />
        <meshStandardMaterial color="#2d1c0c" roughness={0.9} />
      </mesh>
      {[
        { y: 22, rB: 18, rT: 0, h: 22 },
        { y: 34, rB: 14, rT: 0, h: 20 },
        { y: 45, rB: 10, rT: 0, h: 18 },
        { y: 55, rB: 6,  rT: 0, h: 14 }
      ].map((tier, idx) => (
        <group key={idx} position={[0, tier.y, 0]}>
          <mesh position={[0, 0, 0]}>
            <coneGeometry args={[tier.rB, tier.h, 7]} />
            <meshStandardMaterial color="#063e26" roughness={0.8} />
          </mesh>
          <mesh position={[0, tier.h * 0.22, 0]}>
            <coneGeometry args={[tier.rB * 0.92, tier.h * 0.65, 7]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Reusable math objects for high-performance 60/120fps camera calculations
const tempCamPos = new THREE.Vector3();
const tempLookAt = new THREE.Vector3();
const tempCamMatrix = new THREE.Matrix4();
const tempCamQuat = new THREE.Quaternion();
const upVector = new THREE.Vector3(0, 1, 0);
const bankEuler = new THREE.Euler();
const bankQuat = new THREE.Quaternion();

// Mathematical terrain elevation profile along the mountain fall line
function getMountainTerrainY(z) {
  if (z >= 650) return 1780; // Flat summit drop-off plateau so camera behind peak is 100% unobstructed!
  if (z >= 450) return THREE.MathUtils.lerp(1780, 1520, (650 - z) / 200);
  if (z >= 90)  return THREE.MathUtils.lerp(1520, 1130, (450 - z) / 360);
  if (z >= 50)  return THREE.MathUtils.lerp(1130, 1136, (90 - z) / 40); // Natural upturned snow kicker ramp at Cliff 1 lip!
  if (z >= -30) return THREE.MathUtils.lerp(1136, 720, (50 - z) / 80);  // SHEER CLIFF 1 VERTICAL GRANITE DROP (416-unit drop!)
  if (z >= -280) return THREE.MathUtils.lerp(720, 440, (-30 - z) / 250);
  if (z >= -420) return THREE.MathUtils.lerp(440, 288, (-280 - z) / 140);
  if (z >= -460) return THREE.MathUtils.lerp(288, 294, (-420 - z) / 40); // Natural upturned snow kicker ramp at Cliff 2 lip!
  if (z >= -540) return THREE.MathUtils.lerp(294, -40, (-460 - z) / 80); // SHEER CLIFF 2 VERTICAL BASALT DROP (334-unit drop!)
  if (z >= -720) return THREE.MathUtils.lerp(-40, -135.2, (-540 - z) / 180);
  return -135.2;
}

// Exact slope pitch angle (in radians around X axis) so the snowboard lies 100% flat on the snow
function getTerrainSlopePitch(z) {
  const yFront = getMountainTerrainY(z - 16);
  const yBack = getMountainTerrainY(z + 16);
  return -Math.atan2(yBack - yFront, 32);
}

// Absolute collision clearance for camera: guarantees camera remains safely above all terrain & cliff faces
function getMinSafeCameraY(cz) {
  const base = getMountainTerrainY(cz);
  return base + 18;
}

// Procedural High-Definition Alaskan Mountain Terrain Generator
function createAlpineMountainGeometry() {
  const width = 1600;
  const length = 2650;
  const segX = 140;
  const segZ = 240;

  const geom = new THREE.PlaneGeometry(width, length, segX, segZ);
  geom.rotateX(-Math.PI / 2);
  geom.translate(0, 0, -275);

  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);

    let baseY = getMountainTerrainY(z);
    if (z > 650) {
      baseY = 1780 + (z - 650) * 0.12;
    }

    const dist = Math.abs(x);
    const arenaTaper = z < -650 ? Math.max(0, (z - (-720)) / 70) : 1.0;
    const corridorSmooth = Math.max(0, Math.min(1, (dist - 34) / 32));

    // Subtle natural powder undulations in central ride track
    const microPowder = (Math.sin(x * 0.14 + z * 0.045) * Math.cos(x * 0.08 - z * 0.035)) * 1.4 * (1.0 - corridorSmooth);

    // Primary cirque wall lift on flanks
    const wallRise = Math.pow(Math.max(0, dist - 34) / 38, 1.25) * 44.0 * arenaTaper;
    const outerFlankRise = Math.pow(Math.max(0, dist - 240) / 50, 1.35) * 58.0 * arenaTaper;

    // Alaskan Spines (Multi-octave sharp arêtes & steep sluff gullies)
    const spineDrift = Math.sin(z * 0.013 + (x > 0 ? 0.35 : -0.35)) * 1.8;
    const spineW1 = (1.0 - Math.pow(Math.abs(Math.sin(x * 0.046 + spineDrift)), 0.65)) * 52.0;
    const spineW2 = (1.0 - Math.pow(Math.abs(Math.sin(x * 0.092 - z * 0.015)), 0.75)) * 22.0;
    const spineFlutes = (spineW1 + spineW2) * corridorSmooth * arenaTaper;

    // Rock strata & wind sastrugi
    const rockStrata = Math.cos(z * 0.034 + x * 0.012) * 14.0 * corridorSmooth * arenaTaper;
    const windCrags = Math.sin(x * 0.16 + z * 0.032) * Math.cos(x * 0.07 - z * 0.055) * 8.5 * corridorSmooth * arenaTaper;

    // Natural rock cliff fractures at Cliff 1 & Cliff 2
    let cliffFracture = 0;
    if (z >= -45 && z <= 65) {
      cliffFracture = (Math.sin(x * 0.08) * 16.0 + Math.cos(z * 0.12) * 10.0) * corridorSmooth;
    }
    if (z >= -560 && z <= -430) {
      cliffFracture = (Math.cos(x * 0.09) * 15.0 + Math.sin(z * 0.10) * 9.0) * corridorSmooth;
    }

    pos.setY(i, baseY + microPowder + wallRise + outerFlankRise + spineFlutes + rockStrata + windCrags + cliffFracture);
  }

  geom.computeVertexNormals();

  const colors = [];
  const normals = geom.attributes.normal;
  const snowPure = new THREE.Color("#f1f5f9"); // Soft natural white snow, prevents bloom glare
  const snowShade = new THREE.Color("#cbd5e1"); // Soft sky-tinted shadowed snow
  const rockDark = new THREE.Color("#475569");  // Slate granite grey, never pitch-black
  const rockMid = new THREE.Color("#64748b");   // Sunlit granite
  const rockBrown = new THREE.Color("#78716c"); // Warm rocky accents
  const iceCyan = new THREE.Color("#38bdf8");   // Glacial blue ice veins

  // High daytime sun direction
  const sunDir = new THREE.Vector3(-0.4, 0.8, 0.45).normalize();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const ny = normals.getY(i);
    const nx = normals.getX(i);
    const nz = normals.getZ(i);

    // In Alaska, deep powder snow clings to almost every slope. Only near-vertical drops expose rock.
    let rockFactor = 0;
    if (ny < 0.28) {
      rockFactor = 0.82;
    } else if (ny < 0.46) {
      rockFactor = ((0.46 - ny) / 0.18) * 0.82;
    }

    // Rich rock texture
    const rockVar = (Math.sin(x * 0.06 + z * 0.05) + Math.cos(x * 0.03 - z * 0.08) + 2) * 0.25;
    let finalRock = rockDark.clone().lerp(rockMid, rockVar).lerp(rockBrown, 0.2);

    // Glacial blue ice veins on cliff headwalls
    if ((Math.abs(z - 10) < 55 || Math.abs(z - (-495)) < 55) && ny < 0.46) {
      finalRock.lerp(iceCyan, 0.55);
      rockFactor = Math.max(rockFactor, 0.85);
    }

    // Balanced daytime snow illumination: visible powder contours, no blown-out glare
    const sunDot = nx * sunDir.x + ny * sunDir.y + nz * sunDir.z;
    const sunSlope = THREE.MathUtils.clamp((sunDot + 0.2) / 1.1, 0, 1);
    const finalSnow = snowShade.clone().lerp(snowPure, 0.35 + sunSlope * 0.65);

    const c = finalSnow.clone().lerp(finalRock, rockFactor);
    colors.push(c.r, c.g, c.b);
  }

  geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return geom;
}

// Procedural authentic snowboard deck: true parabolic sidecut, flat contact running base, rounded nose & tail kicks
function createSnowboardDeckGeometry() {
  const geom = new THREE.BufferGeometry();
  const zSegments = 60;
  const xSegments = 16;
  const positions = [];
  const uvs = [];
  const indices = [];

  function getHalfWidth(z) {
    if (z > 27) {
      const t = (z - 27) / 11;
      return 8.8 * Math.sqrt(Math.max(0, 1 - t * t));
    } else if (z < -27) {
      const t = (-27 - z) / 11;
      return 8.8 * Math.sqrt(Math.max(0, 1 - t * t));
    } else {
      const t = z / 27;
      return 7.4 + 1.4 * (t * t);
    }
  }

  function getDeckY(z) {
    if (z > 26) {
      const t = (z - 26) / 12;
      return 0.7 + Math.pow(t, 1.8) * 3.6;
    } else if (z < -26) {
      const t = (-26 - z) / 12;
      return 0.7 + Math.pow(t, 1.8) * 3.6;
    } else {
      return 0.7;
    }
  }

  const thickness = 1.4;

  for (let layer = 0; layer < 2; layer++) {
    const yOffset = layer === 0 ? thickness / 2 : -thickness / 2;
    for (let i = 0; i <= zSegments; i++) {
      const zRatio = i / zSegments;
      const z = -38 + zRatio * 76;
      const halfW = getHalfWidth(z);
      const baseY = getDeckY(z);
      for (let j = 0; j <= xSegments; j++) {
        const xRatio = j / xSegments;
        const x = (-1 + xRatio * 2) * halfW;
        const y = baseY + yOffset;
        positions.push(x, y, z);
        uvs.push(xRatio, zRatio);
      }
    }
  }

  const rowStride = xSegments + 1;
  const layerStride = (zSegments + 1) * rowStride;

  for (let i = 0; i < zSegments; i++) {
    for (let j = 0; j < xSegments; j++) {
      const a = i * rowStride + j;
      const b = a + 1;
      const c = a + rowStride;
      const d = c + 1;
      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  for (let i = 0; i < zSegments; i++) {
    for (let j = 0; j < xSegments; j++) {
      const a = layerStride + i * rowStride + j;
      const b = a + 1;
      const c = a + rowStride;
      const d = c + 1;
      indices.push(a, c, b);
      indices.push(b, c, d);
    }
  }

  for (let i = 0; i < zSegments; i++) {
    const topA = i * rowStride;
    const topB = (i + 1) * rowStride;
    const botA = layerStride + topA;
    const botB = layerStride + topB;
    indices.push(topA, topB, botA);
    indices.push(topB, botB, botA);
  }

  for (let i = 0; i < zSegments; i++) {
    const topA = i * rowStride + xSegments;
    const topB = (i + 1) * rowStride + xSegments;
    const botA = layerStride + topA;
    const botB = layerStride + topB;
    indices.push(topA, botA, topB);
    indices.push(topB, botA, botB);
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

// Continuous stainless steel wrapped edge rail along the bottom perimeter
function createSnowboardEdgeGeometry() {
  const points = [];
  const zSegments = 60;
  
  function getHalfWidth(z) {
    if (z > 27) {
      const t = (z - 27) / 11;
      return 8.8 * Math.sqrt(Math.max(0, 1 - t * t));
    } else if (z < -27) {
      const t = (-27 - z) / 11;
      return 8.8 * Math.sqrt(Math.max(0, 1 - t * t));
    } else {
      const t = z / 27;
      return 7.4 + 1.4 * (t * t);
    }
  }

  function getDeckY(z) {
    if (z > 26) {
      const t = (z - 26) / 12;
      return 0.7 + Math.pow(t, 1.8) * 3.6;
    } else if (z < -26) {
      const t = (-26 - z) / 12;
      return 0.7 + Math.pow(t, 1.8) * 3.6;
    } else {
      return 0.7;
    }
  }

  for (let i = 0; i <= zSegments; i++) {
    const z = -38 + (i / zSegments) * 76;
    const w = getHalfWidth(z);
    const y = getDeckY(z) - 0.55;
    points.push(new THREE.Vector3(w, y, z));
  }
  for (let i = zSegments; i >= 0; i--) {
    const z = -38 + (i / zSegments) * 76;
    const w = -getHalfWidth(z);
    const y = getDeckY(z) - 0.55;
    points.push(new THREE.Vector3(w, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points, true);
  return new THREE.TubeGeometry(curve, 100, 0.38, 6, true);
}

// Center topsheet racing graphic stripe conforming to deck camber & rockered kicks
function createSnowboardStripeGeometry() {
  const geom = new THREE.BufferGeometry();
  const zSegments = 50;
  const positions = [];
  const uvs = [];
  const indices = [];

  function getDeckY(z) {
    if (z > 26) {
      const t = (z - 26) / 12;
      return 0.7 + Math.pow(t, 1.8) * 3.6;
    } else if (z < -26) {
      const t = (-26 - z) / 12;
      return 0.7 + Math.pow(t, 1.8) * 3.6;
    } else {
      return 0.7;
    }
  }

  const halfW = 2.2;
  const yOffset = 0.75;

  for (let i = 0; i <= zSegments; i++) {
    const z = -34 + (i / zSegments) * 68;
    const y = getDeckY(z) + yOffset;
    positions.push(-halfW, y, z);
    positions.push(halfW, y, z);
    uvs.push(0, i / zSegments);
    uvs.push(1, i / zSegments);
  }

  for (let i = 0; i < zSegments; i++) {
    const a = i * 2;
    const b = a + 1;
    const c = a + 2;
    const d = c + 1;
    indices.push(a, b, c);
    indices.push(b, d, c);
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

// Procedural Alaskan Massif Ridge Geometry (For Summit Backdrop and Flanking Valley Walls)
function createAlaskanMassifRidgeGeometry(width = 2400, height = 1400, depth = 900, numPeaks = 5, seed = 1) {
  const segX = 80;
  const segZ = 36;
  const geom = new THREE.PlaneGeometry(width, depth, segX, segZ);
  geom.rotateX(-Math.PI / 2);

  const pos = geom.attributes.position;
  const halfDepth = depth / 2;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);

    const zNorm = 1.0 - Math.min(1.0, Math.abs(z) / halfDepth);
    const ridgeProfile = Math.pow(zNorm, 0.75);

    const xNorm = x / (width / 2);
    let peakSum = 0;
    for (let k = 0; k < numPeaks; k++) {
      const peakX = ((k / (numPeaks - 1)) * 2 - 1) * 0.82 + Math.sin(k * 2.3 + seed) * 0.08;
      const peakH = 0.75 + Math.sin(k * 1.7 + seed * 3) * 0.25;
      const d = Math.abs(xNorm - peakX) * numPeaks;
      const peakShape = Math.max(0, 1.0 - d);
      peakSum += Math.pow(peakShape, 1.5) * peakH;
    }
    const endTaper = 1.0 - Math.pow(Math.abs(xNorm), 3.5);
    const ridgeH = Math.max(0.25, peakSum) * endTaper;

    const arêteCrags = (Math.sin(x * 0.02 + z * 0.03 + seed) * Math.cos(x * 0.04 - z * 0.02)) * 0.12;
    const yVal = height * ridgeH * ridgeProfile * (1.0 + arêteCrags);

    pos.setY(i, yVal);
  }

  geom.computeVertexNormals();

  const colors = [];
  const normals = geom.attributes.normal;
  const snowPure = new THREE.Color("#f1f5f9");
  const snowShade = new THREE.Color("#cbd5e1");
  const rockDark = new THREE.Color("#475569");
  const rockMid = new THREE.Color("#64748b");

  for (let i = 0; i < pos.count; i++) {
    const ny = normals.getY(i);
    const y = pos.getY(i);
    const hRatio = Math.max(0, Math.min(1, y / height));

    let rockFactor = ny < 0.28 ? 0.75 : ny < 0.48 ? ((0.48 - ny) / 0.20) * 0.75 : 0.0;
    rockFactor = THREE.MathUtils.clamp(rockFactor * (1.1 - hRatio * 0.5), 0, 1);

    const rock = rockDark.clone().lerp(rockMid, 0.4);
    const snow = snowShade.clone().lerp(snowPure, THREE.MathUtils.clamp(ny * 1.25, 0, 1));
    const c = snow.clone().lerp(rock, rockFactor);
    colors.push(c.r, c.g, c.b);
  }

  geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return geom;
}

// Natural Fractured Granite Cliff Buttress Geometry (Replaces flat boxGeometry)
function createNaturalCliffButtressGeometry(width = 160, height = 320, depth = 35, seed = 3) {
  const segX = 24;
  const segY = 32;
  const geom = new THREE.PlaneGeometry(width, height, segX, segY);

  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);

    const vertJoint = Math.sin(x * 0.12 + seed) * Math.cos(y * 0.08) * 8.0;
    const horizLedge = Math.pow(Math.abs(Math.cos(y * 0.07 + seed * 2)), 0.6) * 12.0;
    const cragFacet = (Math.sin(x * 0.22 + y * 0.15) + Math.cos(x * 0.15 - y * 0.2)) * 4.5;

    pos.setZ(i, vertJoint + horizLedge + cragFacet);
  }

  geom.computeVertexNormals();
  return geom;
}

export default function WorldElevate({ position = [0, -11750, -33000], visible }) {
  // Procedural sculpted mountain geometry with realistic snow & granite shading
  const mountainGeom = useMemo(() => createAlpineMountainGeometry(), []);
  const summitMassifGeom = useMemo(() => createAlaskanMassifRidgeGeometry(3200, 1600, 1100, 6, 1.5), []);
  const westFlankMassifGeom = useMemo(() => createAlaskanMassifRidgeGeometry(3400, 1500, 1000, 7, 2.8), []);
  const eastFlankMassifGeom = useMemo(() => createAlaskanMassifRidgeGeometry(3400, 1500, 1000, 7, 3.4), []);
  const cliff1ButtressGeom = useMemo(() => createNaturalCliffButtressGeometry(220, 360, 45, 1.2), []);
  const cliff2ButtressGeom = useMemo(() => createNaturalCliffButtressGeometry(220, 300, 40, 2.5), []);

  const snowboardDeckGeom = useMemo(() => createSnowboardDeckGeometry(), []);
  const snowboardEdgeGeom = useMemo(() => createSnowboardEdgeGeometry(), []);
  const snowboardStripeGeom = useMemo(() => createSnowboardStripeGeometry(), []);

  // Procedural radiant alpine daylight sky dome shader material
  const skyMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uSunPosition: { value: new THREE.Vector3(-0.4, 0.8, 0.45).normalize() },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        uniform vec3 uSunPosition;

        void main() {
          vec3 dir = normalize(vWorldPosition - vec3(0.0, 400.0, -200.0));
          float h = dir.y;

          // Realistic Alaskan overcast sky gradient: pale winter arctic slate -> soft muted white-blue -> pale snowy horizon mist
          vec3 zenithColor  = vec3(0.42, 0.49, 0.58); // Muted arctic slate grey-blue
          vec3 midColor     = vec3(0.65, 0.73, 0.82); // Soft overcast winter sky
          vec3 horizonColor = vec3(0.82, 0.88, 0.93); // Pale arctic mist
          vec3 snowHaze     = vec3(0.92, 0.94, 0.96); // Soft snow reflection

          vec3 sky;
          if (h > 0.20) {
            float t = clamp((h - 0.20) / 0.80, 0.0, 1.0);
            sky = mix(midColor, zenithColor, t);
          } else if (h > 0.0) {
            float t = clamp(h / 0.20, 0.0, 1.0);
            sky = mix(horizonColor, midColor, t);
          } else {
            float t = clamp((h + 0.3) / 0.3, 0.0, 1.0);
            sky = mix(snowHaze, horizonColor, t);
          }

          // Soft diffuse winter sun disc & gentle atmospheric halo
          float sunDot = max(0.0, dot(dir, uSunPosition));
          float sunCorona = pow(sunDot, 12.0) * 0.28;
          float sunDisc   = smoothstep(0.995, 0.999, sunDot) * 1.5;

          vec3 coronaColor = vec3(0.98, 0.96, 0.90);
          sky += coronaColor * sunCorona + vec3(1.0, 0.99, 0.95) * sunDisc;

          gl_FragColor = vec4(sky, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    });
  }, []);

  // References for animated helicopter
  const heliGroupRef = useRef();
  const heliRotorRef = useRef();
  const heliRotorBlurRef = useRef();
  const heliTailRotorRef = useRef();
  const heliStrobeRef = useRef();

  // References for human-like Snowboarder
  const riderGroupRef = useRef();
  const riderPelvisRef = useRef();
  const riderTorsoRef = useRef();
  const riderHeadRef = useRef();
  const riderLeftArmRef = useRef();
  const riderRightArmRef = useRef();
  const riderLeftLegRef = useRef();
  const riderRightLegRef = useRef();
  const feetSnowboardRef = useRef(); // Board when strapped to boots
  const handSnowboardRef = useRef(); // Board when held as a weapon

  // References for human-like Skier
  const skierGroupRef = useRef();
  const skierTorsoRef = useRef();
  const skierHeadRef = useRef();
  const skierLeftArmRef = useRef();
  const skierRightArmRef = useRef();
  const skierLeftLegRef = useRef();
  const skierRightLegRef = useRef();
  const headGogglesRef = useRef();   // Goggles on head initially
  const feetLeftSkiRef = useRef();   // Skis on feet initially
  const feetRightSkiRef = useRef();

  // Flying dynamic debris / accessories knocked off during brawl
  const flyingGogglesRef = useRef();
  const flyingLeftSkiRef = useRef();
  const flyingRightSkiRef = useRef();
  const flyingLeftPoleRef = useRef();
  const flyingRightPoleRef = useRef();

  // Fight FX references
  const punchStarRef = useRef();
  const bashShockwaveRef = useRef();
  const fightCloudRef = useRef();
  const dizzyStarsRef = useRef();
  const hockeySprayRef = useRef();
  const landingSpray1Ref = useRef();
  const landingSpray2Ref = useRef();
  const dropInSprayRef = useRef();

  // Narrative Cycle Duration (Includes full descent, fight, heli boarding at base, ascent to peak & peak drop-off)
  const LOOP_DURATION = 27.0;

  // Snow Spray Particles for Carve Trails
  const sprayCount = 45;
  const sprayParticles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < sprayCount; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 35,
        y: Math.random() * 20,
        z: (Math.random() - 0.5) * 35,
        scale: Math.random() * 2.5 + 0.8
      });
    }
    return arr;
  }, []);

  // Main Frame Loop
  useFrame((state) => {
    if (!visible) {
      if (typeof window !== 'undefined' && window._elevateChaseCam) {
        window._elevateChaseCam.active = false;
        window._elevateChaseCam.blend = 0;
      }
      if (state.scene.background) state.scene.background = null;
      if (state.scene.fog) state.scene.fog = null;
      return;
    }

    // Ensure canvas background is transparent so the realistic sky dome renders cleanly without global cyan tint
    if (state.scene.background) state.scene.background = null;
    if (!state.scene.fog) {
      state.scene.fog = new THREE.FogExp2('#cbd5e1', 0.000015);
    }
    if (state.camera.far < 20000) {
      state.camera.far = 25000;
      state.camera.updateProjectionMatrix();
    }

    const rawTime = state.clock.getElapsedTime();
    const t = rawTime % LOOP_DURATION;

    // -------------------------------------------------------------
    // 1. HELICOPTER CONTINUOUS ROTOR MOTION & LIGHTS
    // -------------------------------------------------------------
    if (heliRotorRef.current) heliRotorRef.current.rotation.y = rawTime * 45;
    if (heliRotorBlurRef.current) heliRotorBlurRef.current.rotation.z = rawTime * 45;
    if (heliTailRotorRef.current) heliTailRotorRef.current.rotation.x = rawTime * 55;
    if (heliStrobeRef.current) {
      heliStrobeRef.current.visible = Math.floor(rawTime * 4) % 2 === 0;
    }

    // -------------------------------------------------------------
    // 2. HELICOPTER FLIGHT TRAJECTORY (PEAK DROP-OFF -> BASE LANDING -> WAIT FOR FIGHT -> FLY RIDER TO PEAK)
    // -------------------------------------------------------------
    let hx = -55, hy = 1815, hz = 670;
    let hPitch = 0, hYaw = 0.45, hRoll = 0;

    if (t < 0.8) {
      // Hovering beside Summit Peak right after dropping off the snowboarder
      hx = -55;
      hy = 1825 + Math.sin(rawTime * 3) * 1.2;
      hz = 670;
      hPitch = 0.08; hYaw = 0.45; hRoll = -0.06;
    } else if (t < 10.2) {
      // High-altitude flight down the central valley corridor & vertical landing at Base Arena Helipad
      const p = (t - 0.8) / 9.4;
      const smoothDesc = p * p * (3 - 2 * p);
      hx = THREE.MathUtils.lerp(-55, -72, smoothDesc);
      hz = THREE.MathUtils.lerp(670, -985, smoothDesc);
      const maxTerr = Math.max(getMountainTerrainY(hz), getMountainTerrainY(hz - 140), getMountainTerrainY(hz + 140));
      const highCruiseY = THREE.MathUtils.lerp(2080, 420, smoothDesc) + Math.sin(p * Math.PI) * 340;
      hy = p < 0.85
        ? Math.max(highCruiseY, maxTerr + 450)
        : THREE.MathUtils.lerp(420, -108, (p - 0.85) / 0.15);
      const flare = p > 0.82 ? Math.sin(((p - 0.82) / 0.18) * Math.PI) : 0;
      hPitch = THREE.MathUtils.lerp(0.18, 0, smoothDesc) - flare * 0.22;
      hYaw = p < 0.15
        ? THREE.MathUtils.lerp(0.45, Math.PI, p / 0.15)
        : p < 0.82
          ? Math.PI
          : THREE.MathUtils.lerp(Math.PI, 0.45, (p - 0.82) / 0.18);
      hRoll = Math.sin(p * Math.PI * 2) * 0.10 * (1 - smoothDesc);
    } else if (t < 20.9) {
      // Parked on the snow at the Base Arena Helipad waiting while the rider beats up the skier & boards!
      hx = -72;
      hy = -108; // 1.5x scaled skids at local Y=-27 rest flat on Y=-135 snow!
      hz = -985;
      hPitch = 0; hYaw = 0.45; hRoll = 0;
    } else if (t < 25.4) {
      // HIGH-ALTITUDE ASCENT WITH RIDER: Nose (+Z) points forward uphill (hYaw = 0) all the way up the mountain!
      const p = (t - 20.9) / 4.5;
      if (p < 0.16) {
        // Phase 1: Vertical climb straight up into open sky & nose aligns uphill (hYaw -> 0)
        const liftP = p / 0.16;
        const smoothLift = liftP * liftP * (3 - 2 * liftP);
        hx = THREE.MathUtils.lerp(-72, -45, smoothLift);
        hz = THREE.MathUtils.lerp(-985, -920, smoothLift);
        hy = THREE.MathUtils.lerp(-108, 520, smoothLift);
        hPitch = 0.12 * Math.sin(liftP * Math.PI);
        hYaw = THREE.MathUtils.lerp(0.45, 0, smoothLift);
        hRoll = 0;
      } else if (p < 0.84) {
        // Phase 2: High-altitude forward cruise (hYaw = 0 so +Z nose leads uphill, -Z tail trails behind)
        const cruiseP = (p - 0.16) / 0.68;
        const smoothCruise = cruiseP * cruiseP * (3 - 2 * cruiseP);
        hx = THREE.MathUtils.lerp(-45, 0, smoothCruise);
        hz = THREE.MathUtils.lerp(-920, 650, smoothCruise);
        const maxSlopeY = Math.max(getMountainTerrainY(hz), getMountainTerrainY(hz + 180));
        const highArcY = THREE.MathUtils.lerp(520, 2280, smoothCruise) + Math.sin(cruiseP * Math.PI) * 260;
        hy = Math.max(highArcY, maxSlopeY + 520);
        hPitch = 0.18 * Math.sin(cruiseP * Math.PI);
        hYaw = 0;
        hRoll = -Math.sin(cruiseP * Math.PI * 2) * 0.08;
      } else {
        // Phase 3: Vertical descent from high above the summit down to hover directly over the Summit Peak!
        const descP = (p - 0.84) / 0.16;
        const smoothPeakDesc = descP * descP * (3 - 2 * descP);
        hx = 0;
        hz = 650;
        hy = THREE.MathUtils.lerp(2280, 1813, smoothPeakDesc);
        hPitch = THREE.MathUtils.lerp(0.08, 0, smoothPeakDesc);
        hYaw = THREE.MathUtils.lerp(0, 0.45, smoothPeakDesc);
        hRoll = 0;
      }
    } else {
      // Hovers directly over Summit Peak while rider drops out onto the peak, then slides to flank
      const p = (t - 25.4) / 1.6;
      const shiftP = Math.max(0, (p - 0.50) / 0.50);
      const smoothShift = shiftP * shiftP * (3 - 2 * shiftP);
      hx = THREE.MathUtils.lerp(0, -55, smoothShift);
      hy = THREE.MathUtils.lerp(1813, 1825, smoothShift);
      hz = THREE.MathUtils.lerp(650, 670, smoothShift);
      hPitch = THREE.MathUtils.lerp(0, 0.08, smoothShift);
      hYaw = 0.45;
      hRoll = -0.06 * smoothShift;
    }

    if (heliGroupRef.current) {
      heliGroupRef.current.position.set(hx, hy, hz);
      heliGroupRef.current.rotation.set(hPitch, hYaw, hRoll);
    }

    // -------------------------------------------------------------
    // 3. SNOWBOARDER TRAJECTORY & REALISTIC SIDEWAYS FREERIDE STANCE
    // -------------------------------------------------------------
    let rx = 0, ry = 1780.5, rz = 650;
    let riderPitch = 0, riderYaw = 0, riderRoll = 0;
    let isStrapped = true;
    let isHoldingBoard = false;
    let isInHeli = false;
    let boardRaise = 0;

    // Body articulation for genuine snowboarding stance:
    let torsoYaw = 0.18, torsoPitch = 0;
    let headYaw = Math.PI / 2, headPitch = 0;
    let crouchDrop = 0;
    let rArmPitch = 0.1, rArmYaw = 0, rArmRoll = 0.85;
    let lArmPitch = 0.1, lArmYaw = 0, lArmRoll = -0.85;
    let rLegPitch = 0, lLegPitch = 0, rLegRoll = 0, lLegRoll = 0;

    if (t < 0.8) {
      // Perched on Summit Peak (Z=650, Y=1780.5), snowboard flat on the summit snow slope
      rx = 0;
      rz = 650;
      ry = getMountainTerrainY(rz) + 0.5;
      riderYaw = 0;
      riderPitch = getTerrainSlopePitch(rz) * 0.65;
      riderRoll = 0;
      isStrapped = true;
      crouchDrop = -2.5;
      torsoYaw = 0.18; headYaw = Math.PI / 2;
      lArmRoll = -0.85; rArmRoll = 0.85; lArmPitch = 0.1; rArmPitch = 0.1;
      if (dropInSprayRef.current) dropInSprayRef.current.visible = false;
      if (landingSpray1Ref.current) landingSpray1Ref.current.visible = false;
      if (landingSpray2Ref.current) landingSpray2Ref.current.visible = false;
      if (hockeySprayRef.current) hockeySprayRef.current.visible = false;
    } else if (t < 3.3) {
      // CARVING AT THE TOP OF THE MOUNTAIN: Dynamic sweeping S-turns across upper headwall powder (Z: 650 -> 240)
      const p = (t - 0.8) / 2.5;
      const carveFreq = p * Math.PI * 3;
      const carveEnv = Math.sin(p * Math.PI);
      rx = Math.sin(carveFreq) * 32 * carveEnv;
      rz = THREE.MathUtils.lerp(650, 240, p);
      ry = getMountainTerrainY(rz) + 0.5;
      riderPitch = getTerrainSlopePitch(rz);
      const carveTurn = Math.cos(carveFreq) * carveEnv;
      const carveApex = Math.sin(carveFreq) * carveEnv;
      riderYaw = -carveTurn * 0.45;
      riderRoll = carveApex * 0.48;
      isStrapped = true;
      crouchDrop = -3.5 - Math.abs(carveApex) * 2.8;

      torsoYaw = 0.18 - carveTurn * 0.08;
      headYaw = Math.PI / 2 - carveTurn * 0.15;
      lArmRoll = -0.85 + carveTurn * 0.25;
      rArmRoll = 0.85 - carveTurn * 0.25;
      lArmPitch = 0.1; rArmPitch = 0.1;
      rLegPitch = 0; lLegPitch = 0;

      if (p > 0.25 && dropInSprayRef.current) {
        dropInSprayRef.current.visible = true;
        const s = Math.min(1.6, (p - 0.25) * 2.0);
        dropInSprayRef.current.scale.set(s, s * 0.5, s * 1.8);
        dropInSprayRef.current.position.set(-rx * 0.3, ry + 1.2, rz + 24);
      }
    } else if (t < 5.2) {
      // STRAIGHT DOWN TO FIRST JUMP: Aerodynamic straight-line tuck charging dead-center into Cliff 1 Lip (Z: 240 -> 50)
      if (dropInSprayRef.current) dropInSprayRef.current.visible = false;
      const p = (t - 3.3) / 1.9;
      const accelP = Math.pow(p, 1.25);
      rx = 0;
      rz = THREE.MathUtils.lerp(240, 50, accelP);
      ry = getMountainTerrainY(rz) + 0.5;
      riderPitch = getTerrainSlopePitch(rz);
      riderYaw = 0;
      riderRoll = 0;
      isStrapped = true;
      crouchDrop = -4.5;

      torsoYaw = 0.18; headYaw = Math.PI / 2;
      lArmRoll = -0.85; rArmRoll = 0.85;
      lArmPitch = 0.1; rArmPitch = 0.1;
      rLegPitch = 0; lLegPitch = 0;
    } else if (t < 8.0) {
      // CLIFF JUMP 1: High-Speed Launch Off Sheer 416-Unit Granite Cliff (Z: 50 -> -265)!
      // Clean Newtonian gravity arc + floaty Layout Wildcat Backflip (zero gimbal lock)
      const p = (t - 5.2) / 2.8;
      const lateralP = p * p * (3 - 2 * p);
      rx = THREE.MathUtils.lerp(0, -22, lateralP);
      rz = THREE.MathUtils.lerp(50, -265, p);
      const takeoffY = getMountainTerrainY(50);     // 1136 (Cliff 1 lip)

      // Exact Newtonian ballistic parabola: upward pop of +432/2.8 = +154 units/s, constant gravity descent to Y=457
      ry = takeoffY + 0.5 + 432 * p - 1111 * p * p;

      // Pure Layout Wildcat Backflip: smooth rotation around pitch axis with zero gimbal-lock yaw flip
      const flipRaw = Math.max(0, Math.min(1, (p - 0.10) / 0.72));
      const flipP = flipRaw * flipRaw * (3 - 2 * flipRaw);
      const baseSlopePitch = THREE.MathUtils.lerp(getTerrainSlopePitch(50), getTerrainSlopePitch(-265), p);
      riderPitch = baseSlopePitch + flipP * Math.PI * 2;
      riderYaw = 0;
      riderRoll = Math.sin(flipP * Math.PI) * 0.12; // Subtle freeride hip style tweak
      isStrapped = true;

      // Anatomical layout arch at apex, spotting landing, and deep knee compression on touchdown
      const layoutArch = Math.sin(flipP * Math.PI);
      const landCompress = p > 0.86 ? Math.sin(((p - 0.86) / 0.14) * Math.PI) * 5.5 : 0;
      crouchDrop = -3.5 * (1 - layoutArch) - landCompress;
      torsoPitch = -0.32 * layoutArch;
      torsoYaw = 0.18;
      headYaw = Math.PI / 2;
      headPitch = layoutArch * 0.35 - (p > 0.7 ? 0.35 : 0);
      lArmRoll = -0.85 - layoutArch * 0.45;
      rArmRoll = 0.85 + layoutArch * 0.45;
      lArmPitch = 0.1 - layoutArch * 0.2;
      rArmPitch = 0.1 - layoutArch * 0.2;
      rLegPitch = 0; lLegPitch = 0;

      if (p > 0.88 && landingSpray1Ref.current) {
        landingSpray1Ref.current.visible = true;
        const s = (p - 0.88) * 9;
        landingSpray1Ref.current.position.set(rx, ry, rz);
        landingSpray1Ref.current.scale.set(s, s * 1.5, s);
      }
    } else if (t < 10.8) {
      // MID-MOUNTAIN SPRINT & CLIFF JUMP 2: High-Speed Launch Off Sheer 334-Unit Abyss Cliff (Z: -460 -> -785)!
      if (landingSpray1Ref.current) landingSpray1Ref.current.visible = false;
      const p = (t - 8.0) / 2.8;
      isStrapped = true;

      if (p < 0.26) {
        // Blistering transition run (Z: -265 -> -460) up the upturned snow kicker lip of Cliff 2
        const subP = p / 0.26;
        rx = THREE.MathUtils.lerp(-22, 14, subP);
        rz = THREE.MathUtils.lerp(-265, -460, subP);
        ry = getMountainTerrainY(rz) + 0.5;
        riderPitch = getTerrainSlopePitch(rz);
        riderYaw = -0.22 * Math.sin(subP * Math.PI);
        riderRoll = 0.32 * Math.sin(subP * Math.PI);
        crouchDrop = -3.5 - subP * 3.0;
        torsoYaw = 0.18; headYaw = Math.PI / 2;
        lArmRoll = -0.85; rArmRoll = 0.85;
      } else {
        // Launches at high speed off the Abyss cliff lip (Z=-460, Y=294) while the cliff drops straight to Y=-40!
        const jumpP = (p - 0.26) / 0.74;
        rx = THREE.MathUtils.lerp(14, 18, jumpP);
        rz = THREE.MathUtils.lerp(-460, -785, jumpP);
        const takeoffY = getMountainTerrainY(-460);   // 294 (Cliff 2 lip)
        const landingY = getMountainTerrainY(-785);   // -106 (Lower landing slope)
        const baseChordY = THREE.MathUtils.lerp(takeoffY, landingY, jumpP);
        const airArc = Math.sin(Math.pow(jumpP, 0.72) * Math.PI) * 210;
        ry = baseChordY + 0.5 + airArc;

        const trickRaw = Math.max(0, Math.min(1, (jumpP - 0.04) / 0.82));
        const trickP = trickRaw * trickRaw * (3 - 2 * trickRaw);
        const baseSlopePitch = THREE.MathUtils.lerp(getTerrainSlopePitch(-460), getTerrainSlopePitch(-785), jumpP);
        riderPitch = baseSlopePitch + trickP * Math.PI * 2; // Full Layout Backflip
        riderYaw = -trickP * Math.PI * 4; // Full 720° two-revolution spin
        riderRoll = Math.sin(trickP * Math.PI) * 0.32;

        const grab = Math.sin(trickP * Math.PI);
        const landCompress = jumpP > 0.86 ? Math.sin(((jumpP - 0.86) / 0.14) * Math.PI) * 6.0 : 0;
        crouchDrop = -7.5 * grab - landCompress;
        torsoYaw = 0.18;
        headYaw = Math.PI / 2;
        headPitch = -0.45 * grab;
        lArmPitch = 0.1 + grab * 0.65; lArmRoll = -0.85 + grab * 0.55;
        rArmPitch = 0.1 - grab * 0.35; rArmRoll = 0.85 + grab * 0.25;

        if (jumpP > 0.85 && landingSpray2Ref.current) {
          landingSpray2Ref.current.visible = true;
          const s = (jumpP - 0.85) * 9;
          landingSpray2Ref.current.position.set(rx, ry, rz);
          landingSpray2Ref.current.scale.set(s, s * 1.4, s);
        }
      }
    } else if (t < 12.0) {
      // VALLEY SPRINT CHARGE -> INITIATES HOCKEY-STOP SNOW SPLASH DIRECTLY IN FRONT OF SKIER!
      if (landingSpray2Ref.current) landingSpray2Ref.current.visible = false;
      const p = (t - 10.8) / 1.2;
      isStrapped = true;
      if (p < 0.58) {
        // Charging straight toward the front of the skier (skier is at X=20, Z=-965)
        const chargeP = p / 0.58;
        if (hockeySprayRef.current) hockeySprayRef.current.visible = false;
        rx = THREE.MathUtils.lerp(18, 14, chargeP);
        rz = THREE.MathUtils.lerp(-785, -944, chargeP);
        ry = getMountainTerrainY(rz) + 0.5;
        riderPitch = getTerrainSlopePitch(rz);
        riderYaw = THREE.MathUtils.lerp(-0.18, -0.35, chargeP);
        riderRoll = 0.22 * (1 - chargeP * 0.5);
        crouchDrop = -3.0;
        torsoYaw = 0.18; headYaw = Math.PI / 2;
        lArmRoll = -0.85; rArmRoll = 0.85;
      } else {
        // Whips board sideways RIGHT IN FRONT OF THE SKIER (X: 14 -> -6, Z: -944 -> -962), blasting snow in his face!
        const slideP = (p - 0.58) / 0.42;
        rx = THREE.MathUtils.lerp(14, -6, slideP);
        rz = THREE.MathUtils.lerp(-944, -962, slideP);
        ry = getMountainTerrainY(rz) + 0.5;
        riderPitch = getTerrainSlopePitch(rz) * (1 - slideP);
        riderYaw = THREE.MathUtils.lerp(-0.35, -0.08, slideP);
        riderRoll = THREE.MathUtils.lerp(0.15, 0.68, slideP);
        crouchDrop = THREE.MathUtils.lerp(-3.0, -5.5, slideP);
        torsoYaw = 0.12; headYaw = Math.PI / 4;
        rArmPitch = -0.35; rArmRoll = 0.45;
        lArmPitch = -0.35; lArmRoll = -0.45;

        if (hockeySprayRef.current) {
          hockeySprayRef.current.visible = true;
          const s = THREE.MathUtils.lerp(0.8, 2.3, slideP);
          hockeySprayRef.current.scale.set(s, s * 1.35, s);
          hockeySprayRef.current.position.set(
            THREE.MathUtils.lerp(14, 2, slideP),
            -133,
            THREE.MathUtils.lerp(-946, -960, slideP)
          );
        }
      }
      rLegPitch = 0; lLegPitch = 0;
    } else if (t < 12.9) {
      // COMPLETES HOCKEY-STOP SLIDE NEXT TO SKIER AS SNOW SPLASH SETTLES
      const p = (t - 12.0) / 0.9;
      const stopCurve = Math.min(1, p * 1.8);
      const smoothStop = stopCurve * stopCurve * (3 - 2 * stopCurve);
      rx = THREE.MathUtils.lerp(-6, -24, smoothStop);
      rz = THREE.MathUtils.lerp(-962, -965, smoothStop);
      ry = -135;
      riderYaw = THREE.MathUtils.lerp(-0.08, 0, smoothStop);
      riderRoll = (1 - smoothStop) * 0.68;
      riderPitch = 0;
      isStrapped = true;
      isHoldingBoard = false;
      boardRaise = 0;
      crouchDrop = -(1 - smoothStop) * 5.5;
      rLegPitch = 0; lLegPitch = 0;
      torsoYaw = THREE.MathUtils.lerp(0.12, 0, smoothStop);
      headYaw = THREE.MathUtils.lerp(Math.PI / 4, 0, smoothStop);
      rArmPitch = -0.35; rArmRoll = 0.45;
      lArmPitch = -0.35; lArmRoll = -0.45;

      if (hockeySprayRef.current) {
        hockeySprayRef.current.visible = p < 0.65;
        const s = Math.max(0.01, (1 - p / 0.65) * 2.1);
        hockeySprayRef.current.scale.set(s, s * 1.3, s);
        hockeySprayRef.current.position.set(
          THREE.MathUtils.lerp(2, -10, Math.min(1, p / 0.65)),
          -133,
          -962
        );
      }
    } else if (t < 14.35) {
      // UNSTRAPPING BOOTS FROM BINDINGS & STEPPING OFF SNOWBOARD BEFORE THE FIGHT
      if (hockeySprayRef.current) hockeySprayRef.current.visible = false;
      if (punchStarRef.current) punchStarRef.current.visible = false;
      if (bashShockwaveRef.current) bashShockwaveRef.current.visible = false;
      const p = (t - 12.9) / 1.45;
      isHoldingBoard = false;
      boardRaise = 0;
      riderPitch = 0; riderRoll = 0; riderYaw = 0;

      if (p < 0.38) {
        // Phase 1: Snowboarder bends squarely over HIS OWN board at rx=-24, unbuckles front boot binding
        const bendP = Math.sin(Math.min(1, p / 0.18) * Math.PI / 2);
        isStrapped = true;
        rx = -24; ry = -135; rz = -965;
        crouchDrop = -11 * bendP;
        torsoPitch = 0.62 * bendP;
        torsoYaw = 0;
        headYaw = 0;
        headPitch = 0.55 * bendP; // Eyes focused straight down on his own boot
        lArmPitch = -0.75 * bendP; lArmRoll = 0.25; // Left hand unbuckles front strap at Z=-12.5
        rArmPitch = -0.15 * bendP; rArmRoll = -0.25;
        rLegPitch = 0; lLegPitch = 0;
      } else if (p < 0.72) {
        // Phase 2: Unbuckles rear boot binding on his own board
        isStrapped = true;
        rx = -24; ry = -135; rz = -965;
        crouchDrop = -11;
        torsoPitch = 0.62;
        torsoYaw = 0;
        headYaw = 0;
        headPitch = 0.55;
        rArmPitch = 0.65; rArmRoll = -0.25; // Right hand reaches back to rear strap at Z=+12.5
        lArmPitch = -0.25; lArmRoll = 0.25;
        rLegPitch = 0; lLegPitch = 0;
      } else {
        // Phase 3: Stands up, steps boots off snowboard onto the snow, squares up for fight
        const stepP = (p - 0.72) / 0.28;
        const smoothStep = stepP * stepP * (3 - 2 * stepP);
        isStrapped = false;
        rx = THREE.MathUtils.lerp(-24, -13, smoothStep);
        ry = -135; rz = -965;
        crouchDrop = THREE.MathUtils.lerp(-11, -1.5, smoothStep);
        torsoPitch = THREE.MathUtils.lerp(0.62, 0.08, smoothStep);
        torsoYaw = THREE.MathUtils.lerp(0, -0.25, smoothStep);
        headYaw = THREE.MathUtils.lerp(0, 0.12, smoothStep);
        headPitch = THREE.MathUtils.lerp(0.55, 0, smoothStep);
        lLegPitch = -Math.sin(stepP * Math.PI) * 0.45;
        rLegPitch = Math.sin(stepP * Math.PI) * 0.30;
        lLegRoll = 0.16 * smoothStep;
        rLegRoll = -0.16 * smoothStep;
        rArmPitch = THREE.MathUtils.lerp(-0.75, -1.25, smoothStep);
        rArmRoll = -0.45;
        lArmPitch = THREE.MathUtils.lerp(-0.35, -1.15, smoothStep);
        lArmRoll = 0.45;
      }
    } else if (t < 15.8) {
      // EXCHANGE 1: LEAD STRAIGHT PUNCH TO FACE -> HEAVY REAR CROSS TO FACE -> DUCK UNDER COUNTER!
      if (punchStarRef.current) punchStarRef.current.visible = false;
      if (bashShockwaveRef.current) bashShockwaveRef.current.visible = false;
      const p = (t - 14.35) / 1.45;
      isStrapped = false;
      isHoldingBoard = false;
      boardRaise = 0;
      riderPitch = 0; riderRoll = 0; riderYaw = 0;
      lLegRoll = 0.16; rLegRoll = -0.16;

      if (p < 0.34) {
        const jabP = p / 0.34;
        const jabExt = jabP < 0.22 ? -(jabP / 0.22) * 0.35 : jabP < 0.72 ? 1.0 : 1.0 - (jabP - 0.72) / 0.28;
        rx = THREE.MathUtils.lerp(-13, -11, Math.max(0, jabExt));
        ry = -135; rz = -965;
        crouchDrop = -1.5;
        torsoPitch = 0.14 * Math.max(0, jabExt);
        torsoYaw = -0.25 - Math.max(0, jabExt) * 0.45;
        headYaw = 0.15;
        rArmPitch = jabExt < 0 ? THREE.MathUtils.lerp(-1.25, -0.55, -jabExt) : THREE.MathUtils.lerp(-1.25, -1.88, jabExt);
        rArmYaw = 0.18 * Math.max(0, jabExt);
        rArmRoll = THREE.MathUtils.lerp(-0.45, -0.58, Math.max(0, jabExt));
        lArmPitch = -1.15;
        lArmRoll = 0.48;
        lLegPitch = -0.24; rLegPitch = 0.20;
      } else if (p < 0.68) {
        const crossP = (p - 0.34) / 0.34;
        const crossExt = crossP < 0.24 ? -(crossP / 0.24) * 0.45 : crossP < 0.74 ? 1.0 : 1.0 - (crossP - 0.74) / 0.26;
        rx = THREE.MathUtils.lerp(-11, -9.5, Math.max(0, crossExt));
        ry = -135; rz = -965;
        crouchDrop = -2.0;
        torsoPitch = 0.18 * Math.max(0, crossExt);
        torsoYaw = crossExt < 0 ? THREE.MathUtils.lerp(-0.35, -0.65, -crossExt) : THREE.MathUtils.lerp(-0.35, 0.72, crossExt);
        headYaw = -0.2 * Math.max(0, crossExt);
        lArmPitch = crossExt < 0 ? THREE.MathUtils.lerp(-1.15, -0.35, -crossExt) : THREE.MathUtils.lerp(-1.15, -1.92, crossExt);
        lArmYaw = -0.15 * Math.max(0, crossExt);
        lArmRoll = THREE.MathUtils.lerp(0.45, 0.58, Math.max(0, crossExt));
        rArmPitch = -1.15;
        rArmRoll = -0.48;
        lLegPitch = -0.28; rLegPitch = 0.26;
      } else {
        const slipP = (p - 0.68) / 0.32;
        const slipCurve = Math.sin(slipP * Math.PI);
        rx = -9.5; ry = -135; rz = -965;
        crouchDrop = -2.0 - slipCurve * 7.5;
        torsoPitch = 0.16 + slipCurve * 0.28;
        torsoYaw = THREE.MathUtils.lerp(0.2, -0.45, slipCurve);
        headPitch = -0.15 * slipCurve;
        rArmPitch = -1.25; rArmRoll = -0.48;
        lArmPitch = -1.20; lArmRoll = 0.48;
        lLegPitch = -0.25; rLegPitch = 0.2;
      }
    } else if (t < 17.2) {
      // EXCHANGE 2: LEAD HOOK TO FACE -> RISING UPPERCUT TO CHIN/FACE -> HEAVY RIGHT STRAIGHT TO FACE (NO KICKS!)
      if (punchStarRef.current) punchStarRef.current.visible = false;
      if (bashShockwaveRef.current) bashShockwaveRef.current.visible = false;
      const p = (t - 15.8) / 1.4;
      isStrapped = false;
      isHoldingBoard = false;
      boardRaise = 0;
      riderPitch = 0; riderRoll = 0; riderYaw = 0;
      lLegRoll = 0.16; rLegRoll = -0.16;

      if (p < 0.34) {
        const hookP = p / 0.34;
        const hookImpact = hookP < 0.22 ? 0 : hookP < 0.72 ? 1.0 : 1.0 - (hookP - 0.72) / 0.28;
        rx = THREE.MathUtils.lerp(-9.5, -8.0, hookP);
        ry = -135; rz = -965;
        crouchDrop = THREE.MathUtils.lerp(-9, -2, hookP);
        torsoPitch = 0.14;
        torsoYaw = hookP < 0.22 ? -0.15 : THREE.MathUtils.lerp(-0.55, -0.78, hookImpact);
        rArmPitch = hookP < 0.22
          ? THREE.MathUtils.lerp(-1.25, -0.75, hookP / 0.22)
          : THREE.MathUtils.lerp(-1.20, -1.88, hookImpact);
        rArmYaw = 0.32 * hookImpact;
        rArmRoll = THREE.MathUtils.lerp(-0.48, -0.58, hookImpact);
        lArmPitch = -1.15; lArmRoll = 0.45;
        lLegPitch = -0.25; rLegPitch = 0.22;
      } else if (p < 0.68) {
        const upP = (p - 0.34) / 0.34;
        const upImpact = upP < 0.22 ? 0 : upP < 0.72 ? 1.0 : 1.0 - (upP - 0.72) / 0.28;
        rx = THREE.MathUtils.lerp(-8.0, -7.2, upP);
        ry = -135; rz = -965;
        crouchDrop = upP < 0.22 ? -5 : THREE.MathUtils.lerp(-4, 0, upImpact);
        torsoPitch = upP < 0.22 ? 0.22 : THREE.MathUtils.lerp(0.18, -0.06, upImpact);
        torsoYaw = upP < 0.22 ? -0.35 : THREE.MathUtils.lerp(-0.2, 0.72, upImpact);
        lArmPitch = upP < 0.22
          ? THREE.MathUtils.lerp(-1.15, -0.45, upP / 0.22)
          : THREE.MathUtils.lerp(-1.15, -2.02, upImpact);
        lArmRoll = THREE.MathUtils.lerp(0.45, 0.58, upImpact);
        rArmPitch = -1.20; rArmRoll = -0.45;
        lLegPitch = -0.18; rLegPitch = 0.18;
      } else {
        // Heavy step-in right straight punch to the skier's face (both boots stay planted on snow)
        const straightP = (p - 0.68) / 0.32;
        const straightImpact = straightP < 0.22 ? 0 : straightP < 0.74 ? 1.0 : 1.0 - (straightP - 0.74) / 0.26;
        rx = THREE.MathUtils.lerp(-7.2, -6.5, straightP);
        ry = -135; rz = -965;
        crouchDrop = -2.0 * straightImpact;
        torsoPitch = 0.16 * straightImpact;
        torsoYaw = straightP < 0.22 ? 0.35 : THREE.MathUtils.lerp(0.35, -0.82, straightImpact);
        rArmPitch = straightP < 0.22
          ? THREE.MathUtils.lerp(-1.20, -0.65, straightP / 0.22)
          : THREE.MathUtils.lerp(-1.20, -1.92, straightImpact);
        rArmYaw = 0.22 * straightImpact;
        rArmRoll = THREE.MathUtils.lerp(-0.45, -0.58, straightImpact);
        lArmPitch = -1.15; lArmRoll = 0.45;
        lLegPitch = -0.26; rLegPitch = 0.24;
      }
    } else if (t < 18.6) {
      // KNOCKOUT FINISHER: STEP-IN LEAD PUNCH TO FACE -> HUGE WIND-UP OVERHAND RIGHT TO FACE!
      if (punchStarRef.current) punchStarRef.current.visible = false;
      if (bashShockwaveRef.current) bashShockwaveRef.current.visible = false;
      const p = (t - 17.2) / 1.4;
      isStrapped = false;
      isHoldingBoard = false;
      boardRaise = 0;
      riderPitch = 0; riderRoll = 0; riderYaw = 0;
      lLegRoll = 0.16; rLegRoll = -0.16;

      if (p < 0.42) {
        const hookP = p / 0.42;
        const hookImpact = hookP < 0.22 ? 0 : hookP < 0.72 ? 1.0 : 1.0 - (hookP - 0.72) / 0.28;
        rx = THREE.MathUtils.lerp(-7.0, -5.5, hookP);
        ry = -135; rz = -965;
        crouchDrop = -2.0;
        torsoPitch = 0.12;
        torsoYaw = hookP < 0.22 ? 0.15 : THREE.MathUtils.lerp(0.15, -0.72, hookImpact);
        rArmPitch = hookP < 0.22
          ? THREE.MathUtils.lerp(-1.15, -0.68, hookP / 0.22)
          : THREE.MathUtils.lerp(-1.15, -1.88, hookImpact);
        rArmYaw = 0.28 * hookImpact;
        rArmRoll = THREE.MathUtils.lerp(-0.45, -0.58, hookImpact);
        lArmPitch = -1.15; lArmRoll = 0.45;
        lLegPitch = -0.25; rLegPitch = 0.22;
      } else {
        const koP = (p - 0.42) / 0.58;
        const koImpact = koP < 0.24 ? 0 : koP < 0.76 ? 1.0 : 1.0 - (koP - 0.76) / 0.24;
        rx = THREE.MathUtils.lerp(-5.5, -4.0, Math.min(1, koP * 1.4));
        ry = -135; rz = -965;
        crouchDrop = -2.5 * koImpact;
        torsoPitch = 0.16 * koImpact;
        torsoYaw = koP < 0.24 ? -0.62 : THREE.MathUtils.lerp(-0.55, 0.85, koImpact);
        headYaw = -0.2 * koImpact;
        lArmPitch = koP < 0.24
          ? THREE.MathUtils.lerp(-1.15, -0.25, koP / 0.24)
          : THREE.MathUtils.lerp(-1.15, -1.94, koImpact);
        lArmYaw = -0.25 * koImpact;
        lArmRoll = THREE.MathUtils.lerp(0.45, 0.58, koImpact);
        rArmPitch = -0.95; rArmRoll = -0.35;
        lLegPitch = -0.32; rLegPitch = 0.28;
      }
    } else if (t < 20.9) {
      // POST-FIGHT EXTRACTION: PICKS UP SNOWBOARD, WALKS CLEANLY TO BASE HELICOPTER & CLIMBS IN!
      if (punchStarRef.current) punchStarRef.current.visible = false;
      if (bashShockwaveRef.current) bashShockwaveRef.current.visible = false;
      const p = (t - 18.6) / 2.3;
      isStrapped = false;
      riderPitch = 0; riderRoll = 0;
      lLegRoll = 0.18; rLegRoll = -0.18; // Normal hip-width walking stance (no wide snowboard split)

      if (p < 0.25) {
        // Phase A: Turns toward snowboard at x=-24, bends down & grabs board under left arm
        const grabP = p / 0.25;
        const bendArc = Math.sin(grabP * Math.PI);
        rx = THREE.MathUtils.lerp(-4.0, -24.0, grabP);
        ry = -135; rz = -965;
        riderYaw = THREE.MathUtils.lerp(0, Math.PI - 0.40, Math.min(1, grabP * 1.4));
        crouchDrop = -10 * bendArc;
        torsoPitch = 0.55 * bendArc;
        torsoYaw = 0; headYaw = 0; headPitch = 0.35 * bendArc;
        isHoldingBoard = grabP > 0.45;
        lArmPitch = -0.55 * bendArc; lArmRoll = 0.18;
        rArmPitch = -0.45 * bendArc; rArmRoll = -0.18;
        lLegPitch = Math.sin(grabP * Math.PI) * 0.24;
        rLegPitch = -Math.sin(grabP * Math.PI) * 0.24;
      } else if (p < 0.78) {
        // Phase B: Walks at a calm pace carrying snowboard tucked under arm, ducking under rotor wash as he nears heli
        const runP = (p - 0.25) / 0.53;
        const stride = runP * Math.PI * 2.5;
        isHoldingBoard = true;
        rx = THREE.MathUtils.lerp(-24.0, -56.0, runP);
        rz = THREE.MathUtils.lerp(-965, -982, runP);
        ry = -135 + Math.abs(Math.sin(stride)) * 0.5;
        riderYaw = Math.PI - 0.40; // Exact heading angle along displacement vector (-40, -17)

        // Realistic alpine rotor approach crouch (keeps head well clear of spinning main rotor)
        const nearHeli = Math.max(0, (runP - 0.30) / 0.70);
        const smoothCrouch = nearHeli * nearHeli * (3 - 2 * nearHeli);
        crouchDrop = -11.0 * smoothCrouch;
        torsoPitch = THREE.MathUtils.lerp(0.08, 0.42, smoothCrouch);
        headPitch = 0.24 * smoothCrouch;
        torsoYaw = Math.sin(stride) * 0.06;
        headYaw = 0;
        lLegPitch = Math.sin(stride) * 0.38;
        rLegPitch = -Math.sin(stride) * 0.38;
        lArmPitch = -0.35; lArmRoll = 0.18; // Left arm steady holding snowboard at hip
        rArmPitch = -Math.sin(stride) * 0.32; rArmRoll = -0.18; // Right arm natural counter-swing
      } else {
        // Phase C: Steps up onto helicopter landing skid & climbs inside cabin door while remaining crouched low
        const boardP = (p - 0.78) / 0.22;
        const smoothBoard = boardP * boardP * (3 - 2 * boardP);
        isHoldingBoard = boardP < 0.55;
        isInHeli = boardP >= 0.55;
        rx = THREE.MathUtils.lerp(-56.0, hx, smoothBoard);
        ry = THREE.MathUtils.lerp(-135, hy - 18, smoothBoard);
        rz = THREE.MathUtils.lerp(-982, hz, smoothBoard);
        riderYaw = THREE.MathUtils.lerp(Math.PI - 0.40, hYaw, smoothBoard);
        crouchDrop = THREE.MathUtils.lerp(-11.0, -14.0, smoothBoard); // Stays crouched below cabin roofline
        torsoPitch = THREE.MathUtils.lerp(0.42, 0.30, smoothBoard);
        torsoYaw = 0; headYaw = 0; headPitch = 0.20;
        lLegPitch = -0.42 * Math.sin(boardP * Math.PI);
        rLegPitch = 0.35 * Math.sin(boardP * Math.PI);
      }
    } else if (t < 25.4) {
      // RIDING INSIDE HELICOPTER CABIN UP TO THE TOP OF THE MOUNTAIN
      isStrapped = true;
      isHoldingBoard = false;
      isInHeli = true;
      rx = hx;
      ry = hy - 18;
      rz = hz;
      riderPitch = hPitch;
      riderYaw = hYaw;
      riderRoll = hRoll;
      crouchDrop = -8;
      torsoYaw = 0; headYaw = Math.PI / 2;
    } else {
      // SUMMIT PEAK DROP-OFF: Hops out of hovering helicopter onto the Summit Peak snow!
      const dropP = (t - 25.4) / 1.6;
      const fallP = Math.min(1, dropP / 0.50);
      const landP = Math.max(0, (dropP - 0.50) / 0.50);
      isStrapped = true;
      isHoldingBoard = false;
      isInHeli = false;
      rx = 0;
      rz = 650;
      const peakSnowY = getMountainTerrainY(650) + 0.5;
      ry = THREE.MathUtils.lerp(1796, peakSnowY, fallP * fallP);
      riderPitch = THREE.MathUtils.lerp(0, getTerrainSlopePitch(650) * 0.65, fallP);
      riderYaw = 0;
      riderRoll = 0;
      const landShock = dropP >= 0.50 ? Math.sin(landP * Math.PI) * 5.0 : 0;
      crouchDrop = -2.5 - landShock;
      torsoYaw = 0.18; headYaw = Math.PI / 2;
      lArmRoll = -0.85; rArmRoll = 0.85; lArmPitch = 0.1; rArmPitch = 0.1;
    }

    // Apply snowboarder transforms
    if (riderGroupRef.current) {
      riderGroupRef.current.visible = !isInHeli;
      riderGroupRef.current.position.set(rx, ry, rz);
      riderGroupRef.current.rotation.set(riderPitch, riderYaw, riderRoll);
    }
    const pitchFwd = Math.sin(torsoPitch);
    const yawTwist = Math.sin(torsoYaw);
    if (riderTorsoRef.current) {
      riderTorsoRef.current.position.set(0, 36 + crouchDrop, pitchFwd * 3);
      riderTorsoRef.current.rotation.set(torsoPitch, torsoYaw, 0);
    }
    if (riderHeadRef.current) {
      riderHeadRef.current.position.set(0, 54 + crouchDrop, pitchFwd * 13);
      riderHeadRef.current.rotation.set(headPitch, headYaw, 0);
    }
    if (riderRightArmRef.current) {
      const rPunchCenter = rArmPitch < -1.5 ? Math.min(1, (-rArmPitch - 1.5) / 0.35) : 0;
      riderRightArmRef.current.position.set(12 * (1 - rPunchCenter * 0.65), 42 + crouchDrop + rPunchCenter * 3, pitchFwd * 7 - yawTwist * 8);
      riderRightArmRef.current.rotation.set(rArmPitch, rArmYaw, rArmRoll);
    }
    if (riderLeftArmRef.current) {
      const lPunchCenter = lArmPitch < -1.5 ? Math.min(1, (-lArmPitch - 1.5) / 0.35) : 0;
      riderLeftArmRef.current.position.set(-12 * (1 - lPunchCenter * 0.65), 42 + crouchDrop + lPunchCenter * 3, pitchFwd * 7 + yawTwist * 8);
      riderLeftArmRef.current.rotation.set(lArmPitch, lArmYaw, lArmRoll);
    }
    if (riderRightLegRef.current) riderRightLegRef.current.rotation.set(rLegPitch, 0, rLegRoll);
    if (riderLeftLegRef.current) riderLeftLegRef.current.rotation.set(lLegPitch, 0, lLegRoll);

    // Keep snowboard attached when riding, resting on snow during fight, or tucked under arm when running to heli
    if (feetSnowboardRef.current) {
      feetSnowboardRef.current.visible = !isHoldingBoard && !isInHeli;
      if (isStrapped) {
        feetSnowboardRef.current.position.set(0, 0, 0);
        feetSnowboardRef.current.rotation.set(0, 0, 0);
      } else {
        feetSnowboardRef.current.position.set(-24 - rx, 0, -965 - rz);
        feetSnowboardRef.current.rotation.set(0, 0, 0);
      }
    }
    if (handSnowboardRef.current) {
      handSnowboardRef.current.visible = isHoldingBoard;
      if (isHoldingBoard) {
        handSnowboardRef.current.position.set(2, 26 + crouchDrop, -11.5);
        handSnowboardRef.current.rotation.set(0.25, Math.PI / 2, Math.PI / 2);
      }
    }

    // -------------------------------------------------------------
    // 4. SKIER ANATOMICAL ARTICULATION & KNOCKOUT REACTION
    // -------------------------------------------------------------
    let sx = 20, sy = -135, sz = -965;
    let sPitch = 0, sYaw = 0, sRoll = 0;
    let sTorsoPitch = 0, sTorsoYaw = 0;
    let sHeadPitch = 0, sHeadYaw = 0;
    let hasGoggles = true;
    let hasSkis = true;
    let hasPoles = true;

    if (dizzyStarsRef.current) dizzyStarsRef.current.visible = false;
    if (flyingGogglesRef.current) flyingGogglesRef.current.visible = false;
    if (flyingLeftSkiRef.current) flyingLeftSkiRef.current.visible = false;
    if (flyingRightSkiRef.current) flyingRightSkiRef.current.visible = false;

    if (t < 10.8) {
      // Idle retro-alpine stance before snowboarder arrives - already facing where snowboarder ends up (-X direction)
      sx = 18; sy = -135; sz = -965;
      sPitch = 0; sYaw = -Math.PI / 2; sRoll = 0;
      sHeadPitch = Math.sin(rawTime * 0.8) * 0.1;
      sHeadYaw = 0;
      hasGoggles = true; hasSkis = true; hasPoles = true;
      if (skierLeftLegRef.current) skierLeftLegRef.current.rotation.set(0, 0, 0);
      if (skierRightLegRef.current) skierRightLegRef.current.rotation.set(0, 0, 0);
      if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(0, 0, 0.2);
      if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(0, 0, -0.2);
    } else if (t < 11.5) {
      // Watching snowboarder sprint down toward the arena - skier already faces him, head turns slightly to track
      sx = 18; sy = -135; sz = -965;
      sPitch = 0; sYaw = -Math.PI / 2; sRoll = 0;
      sHeadPitch = 0.08;
      sHeadYaw = 0.25; // Head looks slightly up-valley toward oncoming rider
      hasGoggles = true; hasSkis = true; hasPoles = true;
      if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(0.2, 0, 0.3);
      if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(0.2, 0, -0.3);
    } else if (t < 12.9) {
      // BLASTED WITH SNOW FROM THE FRONT: Skier shields face with arms - zero body turning, already facing arrival spot!
      sx = 18; sy = -135; sz = -965;
      sPitch = 0; sYaw = -Math.PI / 2; sRoll = 0;
      sTorsoPitch = -0.35;
      sHeadPitch = -0.45;
      sHeadYaw = 0;
      hasGoggles = true; hasSkis = true; hasPoles = true;
      if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(-1.45, 0.25, 0.5);
      if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(-1.45, -0.25, -0.5);
    } else if (t < 14.35) {
      // SKIER DROPS POLES & SQUARES UP ON HIS SKIS - ZERO ROTATION, ALWAYS FACES SNOWBOARDER
      const p = (t - 12.9) / 1.45;
      hasGoggles = true;
      hasPoles = false;
      hasSkis = true; // Stays firmly on his skis!
      const stepInP = Math.max(0, (p - 0.35) / 0.65);
      const smoothReady = stepInP * stepInP * (3 - 2 * stepInP);
      sx = 18.0;
      sy = -135; sz = -965;
      sPitch = 0;
      sYaw = -Math.PI / 2; // Fixed facing where snowboarder ends up - never turns
      sRoll = 0;
      sTorsoPitch = THREE.MathUtils.lerp(-0.25, 0.08, smoothReady);
      sHeadPitch = 0; sHeadYaw = 0;
      if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(-0.95, 0.2, 0.42);
      if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(-0.95, -0.2, -0.42);
      if (skierLeftLegRef.current) skierLeftLegRef.current.rotation.set(-0.18 * smoothReady, 0, 0);
      if (skierRightLegRef.current) skierRightLegRef.current.rotation.set(0.18 * smoothReady, 0, 0);
    } else if (t < 15.8) {
      // EXCHANGE 1 REACTION: JAB TO FACE -> CROSS TO FACE -> SKIER THROWS WILD COUNTER-HAYMAKER ON HIS SKIS!
      const p = (t - 14.35) / 1.45;
      hasGoggles = true; hasSkis = true; hasPoles = false;
      sYaw = -Math.PI / 2;

      if (p < 0.34) {
        // Hit squarely in the face by lead jab! Head & upper torso snap violently back
        const jabP = p / 0.34;
        const jabHit = jabP < 0.2 ? 0 : jabP < 0.72 ? 1.0 : 1.0 - (jabP - 0.72) / 0.28;
        sx = THREE.MathUtils.lerp(18.0, 19.2, jabP);
        sTorsoPitch = 0.08 - jabHit * 0.55;
        sHeadPitch = -0.95 * jabHit;
        sHeadYaw = 0.35 * jabHit;
        if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(-0.8 + jabHit * 0.4, 0.2, 0.55);
        if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(-0.8 + jabHit * 0.4, -0.2, -0.55);
      } else if (p < 0.68) {
        // Hit in the face by heavy rear cross! Head & jaw whip backward and sideways
        const crossP = (p - 0.34) / 0.34;
        const crossHit = crossP < 0.2 ? 0 : crossP < 0.72 ? 1.0 : 1.0 - (crossP - 0.72) / 0.28;
        sx = THREE.MathUtils.lerp(19.2, 20.8, crossP);
        sTorsoPitch = 0.08 - crossHit * 0.65;
        sTorsoYaw = -0.52 * crossHit;
        sHeadPitch = -1.05 * crossHit;
        sHeadYaw = -0.85 * crossHit;
        if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(-0.55, 0.2, 0.68);
        if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(-0.55, -0.2, -0.68);
      } else {
        // Skier lunges forward and swings a wild right counter-haymaker over the ducking snowboarder!
        const counterP = (p - 0.68) / 0.32;
        const swingArc = Math.sin(counterP * Math.PI);
        sx = THREE.MathUtils.lerp(20.8, 17.5, swingArc);
        sTorsoPitch = 0.22 * swingArc;
        sTorsoYaw = THREE.MathUtils.lerp(-0.4, 0.65, swingArc);
        sHeadPitch = 0.1; sHeadYaw = 0;
        if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(-1.68 * swingArc - 0.4, 0.45 * swingArc, -0.35);
        if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(-0.85, 0.2, 0.42);
      }
    } else if (t < 17.2) {
      // EXCHANGE 2 REACTION: WHIPPED BY LEAD HOOK TO FACE -> SNAPPED BY UPPERCUT TO CHIN -> ROCKED BY STRAIGHT PUNCH!
      const p = (t - 15.8) / 1.4;
      hasGoggles = true; hasSkis = true; hasPoles = false;
      sYaw = -Math.PI / 2;

      if (p < 0.34) {
        // Hit across the face by heavy lead hook! Head whips sideways and back
        const hookP = p / 0.34;
        const hookHit = hookP < 0.2 ? 0 : hookP < 0.72 ? 1.0 : 1.0 - (hookP - 0.72) / 0.28;
        sx = THREE.MathUtils.lerp(19.0, 20.0, hookP);
        sy = -135; sz = -965;
        sTorsoPitch = -0.45 * hookHit;
        sTorsoYaw = 0.55 * hookHit;
        sHeadPitch = -0.85 * hookHit;
        sHeadYaw = 0.90 * hookHit;
        if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(-0.6, 0.25, 0.62);
        if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(-0.6, -0.25, -0.62);
      } else if (p < 0.68) {
        // Hit under the chin/face by rising uppercut! Head & chest snap violently upward and backward
        const upP = (p - 0.34) / 0.34;
        const upHit = upP < 0.2 ? 0 : upP < 0.75 ? 1.0 : 1.0 - (upP - 0.75) / 0.25;
        sx = THREE.MathUtils.lerp(20.0, 21.5, upP);
        sTorsoPitch = -0.65 * upHit;
        sHeadPitch = -1.15 * upHit;
        sHeadYaw = -0.35 * upHit;
        if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(-0.35, 0, 0.75);
        if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(-0.35, 0, -0.75);
      } else {
        // Rocked in the face by heavy right straight punch! Head whips back and staggers backward
        const straightP = (p - 0.68) / 0.32;
        const straightHit = straightP < 0.2 ? 0 : straightP < 0.75 ? 1.0 : 1.0 - (straightP - 0.75) / 0.25;
        sx = THREE.MathUtils.lerp(21.5, 24.5, straightP);
        sTorsoPitch = -0.58 * straightHit;
        sTorsoYaw = 0.48 * straightHit;
        sHeadPitch = -1.02 * straightHit;
        sHeadYaw = 0.82 * straightHit;
        if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(-0.55, 0, 0.68);
        if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(-0.55, 0, -0.68);
        if (skierLeftLegRef.current) skierLeftLegRef.current.rotation.set(Math.sin(straightP * Math.PI * 2) * 0.25, 0, 0);
        if (skierRightLegRef.current) skierRightLegRef.current.rotation.set(-Math.sin(straightP * Math.PI * 2) * 0.25, 0, 0);
      }
    } else if (t < 18.6) {
      // KNOCKOUT FINISHER REACTION: ROCKED BY LEAD PUNCH TO FACE -> CRUSHED BY OVERHAND RIGHT & COLLAPSES!
      const p = (t - 17.2) / 1.4;
      hasGoggles = true; hasPoles = false;
      sYaw = -Math.PI / 2;

      if (p < 0.42) {
        // Rocked by lead hook/jab to face, head snaps back and knees wobble on skis
        hasSkis = true;
        const hookP = p / 0.42;
        const hookHit = hookP < 0.2 ? 0 : hookP < 0.72 ? 1.0 : 1.0 - (hookP - 0.72) / 0.28;
        sx = THREE.MathUtils.lerp(24.5, 25.5, hookP);
        sy = -135; sz = -965;
        sTorsoPitch = -0.45 * hookHit;
        sTorsoYaw = 0.52 * hookHit;
        sHeadPitch = -0.92 * hookHit;
        sHeadYaw = 0.85 * hookHit;
        if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(-0.65, 0.2, 0.58);
        if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(-0.65, -0.2, -0.58);
      } else {
        // Crushed in the face by overhand right knockout! Skis pop loose and body collapses flat onto the snow
        const koP = (p - 0.42) / 0.58;
        hasSkis = koP < 0.22;
        const collapseP = koP * koP * (3 - 2 * koP);
        sx = THREE.MathUtils.lerp(25.5, 29.5, collapseP);
        sy = THREE.MathUtils.lerp(-135, -141, collapseP);
        sz = -965;
        sPitch = THREE.MathUtils.lerp(0, -Math.PI / 2, collapseP);
        sRoll = THREE.MathUtils.lerp(0, 0.18, collapseP);
        sTorsoPitch = THREE.MathUtils.lerp(-0.55, 0, collapseP);
        sTorsoYaw = 0;
        sHeadPitch = THREE.MathUtils.lerp(-1.05, 0.15, collapseP);
        sHeadYaw = THREE.MathUtils.lerp(-0.85, -0.35, collapseP);
        if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(THREE.MathUtils.lerp(-0.65, 0, collapseP), 0, THREE.MathUtils.lerp(0.58, 1.15, collapseP));
        if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(THREE.MathUtils.lerp(-0.65, 0, collapseP), 0, THREE.MathUtils.lerp(-0.58, -1.15, collapseP));
        if (skierLeftLegRef.current) skierLeftLegRef.current.rotation.set(0, 0, 0.18 * collapseP);
        if (skierRightLegRef.current) skierRightLegRef.current.rotation.set(0, 0, -0.18 * collapseP);
      }
    } else {
      // KNOCKED OUT ON THE SNOW (NO SPINNING SKIS OR ROTATING PROPS)
      sx = 29.5; sy = -141; sz = -965;
      sPitch = -Math.PI / 2;
      sYaw = -Math.PI / 2;
      sRoll = 0.18;
      sTorsoPitch = 0; sTorsoYaw = 0;
      sHeadPitch = 0.15; sHeadYaw = -0.35;
      hasGoggles = true; hasSkis = false; hasPoles = false;

      if (skierLeftArmRef.current) skierLeftArmRef.current.rotation.set(0, 0, 1.15);
      if (skierRightArmRef.current) skierRightArmRef.current.rotation.set(0, 0, -1.15);
      if (skierLeftLegRef.current) skierLeftLegRef.current.rotation.set(0, 0, 0.18);
      if (skierRightLegRef.current) skierRightLegRef.current.rotation.set(0, 0, -0.18);
    }

    // Apply skier transforms with YXZ order so local pitch tilts along the skier's facing direction
    if (skierGroupRef.current) {
      skierGroupRef.current.position.set(sx, sy, sz);
      skierGroupRef.current.rotation.order = 'YXZ';
      skierGroupRef.current.rotation.set(sPitch, sYaw, sRoll);
    }
    if (skierTorsoRef.current) {
      skierTorsoRef.current.position.set(0, 32, Math.sin(sTorsoPitch) * 3);
      skierTorsoRef.current.rotation.set(sTorsoPitch, sTorsoYaw, 0);
    }
    if (skierHeadRef.current) {
      skierHeadRef.current.position.set(0, 48, Math.sin(sTorsoPitch) * 11);
      skierHeadRef.current.rotation.set(sHeadPitch + sTorsoPitch * 0.5, sHeadYaw, 0);
    }
    if (headGogglesRef.current) headGogglesRef.current.visible = hasGoggles;
    if (feetLeftSkiRef.current) feetLeftSkiRef.current.visible = hasSkis;
    if (feetRightSkiRef.current) feetRightSkiRef.current.visible = hasSkis;
    if (flyingLeftPoleRef.current) flyingLeftPoleRef.current.visible = hasPoles;
    if (flyingRightPoleRef.current) flyingRightPoleRef.current.visible = hasPoles;
    // Keep unclipped skis resting completely flat and stationary on the snow (never spinning)
    if (!hasSkis) {
      if (flyingLeftSkiRef.current) {
        flyingLeftSkiRef.current.visible = true;
        flyingLeftSkiRef.current.position.set(22, -135, -961);
        flyingLeftSkiRef.current.rotation.set(0, -0.45, 0);
      }
      if (flyingRightSkiRef.current) {
        flyingRightSkiRef.current.visible = true;
        flyingRightSkiRef.current.position.set(28, -135, -969);
        flyingRightSkiRef.current.rotation.set(0, -0.45, 0);
      }
    }

    // -------------------------------------------------------------
    // 5. CHASE CAMERA RIG (2X ZOOMED-OUT WIDE PANORAMIC FRAMING)
    // -------------------------------------------------------------
    let cx = 0, cy = 0, cz = 0;
    let lx = 0, ly = 0, lz = 0;
    let camBank = 0;

    if (t < 0.8) {
      cz = 735; cx = 0;
      cy = 1818;
      lx = 0; ly = 1792; lz = 640;
      camBank = 0;
    } else if (t < 3.3) {
      // DYNAMIC CHASE CAM: Flowing with top mountain powder carves
      const p = (t - 0.8) / 2.5;
      const carveFreq = p * Math.PI * 3;
      cz = rz + 105;
      cx = rx * 0.75 + Math.sin(carveFreq) * 10;
      cy = Math.max(getMountainTerrainY(cz) + 32, ry + 42);
      lx = rx; ly = ry + 6; lz = rz - 35;
      camBank = Math.cos(carveFreq) * 0.08;
    } else if (t < 5.2) {
      // STRAIGHT FALL-LINE CHASE: Locked dead-center charging straight into Cliff 1 Lip
      cz = rz + 115;
      cx = 0;
      cy = Math.max(getMountainTerrainY(cz) + 34, ry + 45);
      lx = 0; ly = ry + 4; lz = rz - 40;
      camBank = 0;
    } else if (t < 8.0) {
      // CLIFF JUMP 1: Smooth 2x Zooming Wide Cliff Cam showing sheer 416-unit drop & high-speed layout backflip
      const p = (t - 5.2) / 2.8;
      const camZoomP = Math.min(1, p * 2.2);
      const smoothZoom = camZoomP * camZoomP * (3 - 2 * camZoomP);
      cz = rz + THREE.MathUtils.lerp(115, 175, smoothZoom);
      cx = rx * THREE.MathUtils.lerp(0.3, 0.7, smoothZoom);
      cy = Math.max(getMountainTerrainY(cz) + 38, ry + THREE.MathUtils.lerp(45, 85, smoothZoom));
      lx = rx;
      ly = ry + THREE.MathUtils.lerp(4, 12, smoothZoom);
      lz = rz - THREE.MathUtils.lerp(40, 30, smoothZoom);
      camBank = -0.04 * smoothZoom;
    } else if (t < 10.8) {
      // CLIFF JUMP 2: 2x Zoomed-Out Wide Abyss Cliff Cam showing sheer 334-unit drop & Cork 720 flip!
      const p = (t - 8.0) / 2.8;
      cz = rz + 175;
      cx = rx * 0.7;
      if (p < 0.26) {
        cy = Math.max(getMountainTerrainY(cz) + 45, ry + 85);
        lx = rx; ly = ry - 6; lz = rz - 45;
      } else {
        const jumpP = (p - 0.26) / 0.74;
        const baseSlopeY = THREE.MathUtils.lerp(getMountainTerrainY(-460), getMountainTerrainY(-785), jumpP);
        cy = Math.max(getMountainTerrainY(cz) + 42, baseSlopeY + 95);
        lx = rx;
        ly = ry + 12;
        lz = rz - 30;
      }
      camBank = 0;
    } else if (t < 12.0) {
      // VALLEY SPRINT FOLLOW CAM: Smoothly swoops into 2x zoomed-out base arena framing
      const p = (t - 10.8) / 1.2;
      const combatMidX = (rx + sx) * 0.5;
      cz = THREE.MathUtils.lerp(rz + 175, -745, p);
      cx = THREE.MathUtils.lerp(rx * 0.7, combatMidX - 6, p);
      const targetCy = THREE.MathUtils.lerp(ry + 85, -48, p);
      cy = Math.max(targetCy, getMountainTerrainY(cz) + 38);
      lx = THREE.MathUtils.lerp(rx, combatMidX + 8, p);
      ly = THREE.MathUtils.lerp(ry - 6, -116, p);
      lz = THREE.MathUtils.lerp(rz - 45, -965, p);
      camBank = THREE.MathUtils.lerp(0, -0.02, p);
    } else if (t < 20.9) {
      // 2X ZOOMED-OUT BASE ARENA CAMERA (High-angle panoramic view framing Helipad, Brawl & Elevate Card)
      const combatMidX = (rx + sx) * 0.5;
      const heliFocus = t > 18.6 ? Math.min(1, (t - 18.6) / 1.8) : 0;
      cx = THREE.MathUtils.lerp(combatMidX - 6, -38, heliFocus);
      cy = -48;
      cz = -745;
      lx = THREE.MathUtils.lerp(combatMidX + 8, -45, heliFocus);
      ly = -116;
      lz = THREE.MathUtils.lerp(-965, -980, heliFocus);
      camBank = 0;
    } else if (t < 25.4) {
      // HELICOPTER ASCENT CHASE CAM: Stays on open-air valley side (hz - 210) so mountain never blocks view, then arcs over summit!
      const p = (t - 20.9) / 4.5;
      if (p < 0.78) {
        const trackP = Math.min(1, p * 2.5);
        cz = THREE.MathUtils.lerp(-770, hz - 210, trackP);
        cx = THREE.MathUtils.lerp(-38, hx + 35, trackP);
        cy = Math.max(getMountainTerrainY(cz) + 60, hy + 55);
        lx = hx;
        ly = hy - 6;
        lz = hz;
        camBank = -Math.sin(p * Math.PI * 2) * 0.05;
      } else {
        const crestP = (p - 0.78) / 0.22;
        const smoothCrest = crestP * crestP * (3 - 2 * crestP);
        cz = THREE.MathUtils.lerp(hz - 210, 740, smoothCrest);
        cx = THREE.MathUtils.lerp(hx + 35, 0, smoothCrest);
        cy = THREE.MathUtils.lerp(hy + 55, 1822, smoothCrest);
        lx = THREE.MathUtils.lerp(hx, 0, smoothCrest);
        ly = THREE.MathUtils.lerp(hy - 6, 1795, smoothCrest);
        lz = THREE.MathUtils.lerp(hz, 645, smoothCrest);
        camBank = 0;
      }
    } else {
      // SUMMIT PEAK DROP-OFF CAM: Close, cinematic view of helicopter hovering over peak & rider hopping out onto snow!
      const p = (t - 25.4) / 1.6;
      const smoothPeak = p * p * (3 - 2 * p);
      cz = THREE.MathUtils.lerp(740, 735, smoothPeak);
      cx = 0;
      cy = THREE.MathUtils.lerp(1822, 1818, smoothPeak);
      lx = 0;
      ly = THREE.MathUtils.lerp(1795, 1792, smoothPeak);
      lz = THREE.MathUtils.lerp(645, 640, smoothPeak);
      camBank = 0;
    }

    // Absolute collision safeguard: camera can never penetrate the mountain terrain or cliff crags
    const minSafeCamY = getMinSafeCameraY(cz);
    if (cy < minSafeCamY) cy = minSafeCamY;

    const worldCamX = position[0] + cx;
    const worldCamY = position[1] + cy;
    const worldCamZ = position[2] + cz;

    const worldLookX = position[0] + lx;
    const worldLookY = position[1] + ly;
    const worldLookZ = position[2] + lz;

    tempCamPos.set(worldCamX, worldCamY, worldCamZ);
    tempLookAt.set(worldLookX, worldLookY, worldLookZ);
    tempCamMatrix.lookAt(tempCamPos, tempLookAt, upVector);
    tempCamQuat.setFromRotationMatrix(tempCamMatrix);

    if (camBank !== 0) {
      bankEuler.set(0, 0, camBank);
      bankQuat.setFromEuler(bankEuler);
      tempCamQuat.multiply(bankQuat);
    }

    const curP = window._currentProgress !== undefined ? window._currentProgress : 0.550;
    let blend = 0;
    if (curP >= 0.535 && curP <= 0.575) {
      if (curP < 0.543) blend = (curP - 0.535) / 0.008;
      else if (curP > 0.565) blend = (0.575 - curP) / 0.010;
      else blend = 1.0;
    }
    blend = THREE.MathUtils.clamp(blend, 0, 1);

    if (typeof window !== 'undefined') {
      if (!window._elevateChaseCam) {
        window._elevateChaseCam = {
          pos: new THREE.Vector3(),
          quat: new THREE.Quaternion(),
          active: true,
          blend: 0
        };
      }
      window._elevateChaseCam.pos.copy(tempCamPos);
      window._elevateChaseCam.quat.copy(tempCamQuat);
      window._elevateChaseCam.active = true;
      window._elevateChaseCam.blend = blend;
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* ========================================================= */}
      {/* 1. ALPINE DAYTIME SKY DOME & ATMOSPHERE                    */}
      {/* ========================================================= */}
      {/* Immersive High-Altitude Radiant Alpine Daytime Sky Dome */}
      <mesh position={[0, 400, -200]} material={skyMaterial}>
        <sphereGeometry args={[14000, 32, 24]} />
      </mesh>

      {/* Floating High-Altitude Alpine Fair-Weather Clouds */}
      <group position={[0, 2200, -800]}>
        {[
          { pos: [-1400, 200, -1200], scale: [320, 75, 220] },
          { pos: [1100, 350, -1400], scale: [380, 85, 250] },
          { pos: [-400, 420, -1800], scale: [450, 95, 280] },
          { pos: [1600, 180, -900], scale: [310, 70, 210] },
          { pos: [-1800, 320, -600], scale: [360, 80, 240] },
        ].map((c, i) => (
          <group key={i} position={c.pos}>
            <mesh scale={c.scale}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshStandardMaterial color="#ffffff" roughness={0.9} transparent opacity={0.78} />
            </mesh>
            <mesh position={[c.scale[0] * 0.35, 15, 0]} scale={[c.scale[0] * 0.7, c.scale[1] * 0.85, c.scale[2] * 0.75]}>
              <sphereGeometry args={[1, 10, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.9} transparent opacity={0.75} />
            </mesh>
            <mesh position={[-c.scale[0] * 0.35, 10, 0]} scale={[c.scale[0] * 0.65, c.scale[1] * 0.8, c.scale[2] * 0.7]}>
              <sphereGeometry args={[1, 10, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.9} transparent opacity={0.75} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================= */}
      {/* 2. CALIBRATED NATURAL ALPINE DAYTIME LIGHTING             */}
      {/* ========================================================= */}
      {/* Soft Overcast Arctic Ambient Light */}
      <ambientLight intensity={0.46} color="#cbd5e1" />

      {/* Primary Diffused Winter Sunlight (Soft, realistic illumination) */}
      <directionalLight position={[-1100, 2400, 800]} intensity={1.15} color="#fffdf5" />

      {/* Soft Snowpack Valley Fill */}
      <directionalLight position={[800, -100, -700]} intensity={0.32} color="#cbd5e1" />

      {/* Base Arena Daylight Fill */}
      <directionalLight position={[0, 600, -965]} intensity={0.35} color="#ffffff" />

      {/* Gentle Airborne Alpine Powder Flurry */}
      <Sparkles 
        count={350} 
        scale={[2800, 2000, 3600]} 
        size={6} 
        speed={3} 
        opacity={0.35} 
        color="#ffffff" 
        position={[0, 750, -200]} 
      />

      {/* ========================================================= */}
      {/* 3. THE ALPINE MOUNTAIN MASSIF                             */}
      {/* ========================================================= */}
      <group position={[0, 0, 0]}>
        {/* Procedural High-Definition Alpine Mountain Terrain with Vertex Colors */}
        <mesh geometry={mountainGeom}>
          <meshStandardMaterial vertexColors roughness={0.88} metalness={0.0} />
        </mesh>

        {/* Alaskan Glaciated Mountain Massif Backdrop & Flanking Valley Walls */}
        <group position={[0, 0, 0]}>
          {/* Majestic High Summit Backdrop Massif towering behind drop-off zone */}
          <mesh geometry={summitMassifGeom} position={[0, 1550, 1400]}>
            <meshStandardMaterial vertexColors roughness={0.88} metalness={0.0} side={THREE.DoubleSide} />
          </mesh>

          {/* West Flanking Massif (Continuous glaciated valley wall) */}
          <mesh geometry={westFlankMassifGeom} position={[-1150, 420, -250]} rotation={[0, Math.PI / 2 + 0.12, 0]}>
            <meshStandardMaterial vertexColors roughness={0.88} metalness={0.0} side={THREE.DoubleSide} />
          </mesh>

          {/* East Flanking Massif (Continuous glaciated valley wall) */}
          <mesh geometry={eastFlankMassifGeom} position={[1150, 420, -250]} rotation={[0, -Math.PI / 2 - 0.12, 0]}>
            <meshStandardMaterial vertexColors roughness={0.88} metalness={0.0} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Upper Couloir Flanking Rock Outcrops (Framing the steep chute from Z=420 down to Z=180) */}
        <group position={[0, 0, 0]}>
          <mesh position={[-155, 1240, 210]} rotation={[-0.1, 0.6, 0.3]}>
            <dodecahedronGeometry args={[52, 1]} />
            <meshStandardMaterial color="#475569" roughness={0.88} />
          </mesh>
          <mesh position={[155, 1240, 210]} rotation={[-0.1, -0.6, -0.3]}>
            <dodecahedronGeometry args={[52, 1]} />
            <meshStandardMaterial color="#475569" roughness={0.88} />
          </mesh>
        </group>

        {/* CLIFF 1: Sheer 416-Unit Natural Granite Precipice (Lip at Z=50, Y=1136 -> Base at Z=-30, Y=720) */}
        <group position={[0, 880, 10]}>
          {/* Flanking Granite Buttress Left */}
          <mesh position={[-125, 180, 20]} rotation={[0.15, 0.4, -0.2]}>
            <dodecahedronGeometry args={[58, 1]} />
            <meshStandardMaterial color="#475569" roughness={0.88} />
          </mesh>
          {/* Flanking Granite Buttress Right */}
          <mesh position={[125, 180, 20]} rotation={[0.15, -0.4, 0.2]}>
            <dodecahedronGeometry args={[58, 1]} />
            <meshStandardMaterial color="#475569" roughness={0.88} />
          </mesh>
          {/* Natural Fractured Granite Rock Wall Directly Beneath Launch Lip */}
          <mesh geometry={cliff1ButtressGeom} position={[0, 20, 15]} rotation={[0.08, 0, 0]}>
            <meshStandardMaterial color="#475569" roughness={0.85} metalness={0.05} side={THREE.DoubleSide} />
          </mesh>
          {/* Frozen glacial blue ice cascades clinging to the sheer cliff face */}
          <mesh position={[0, 30, 28]} rotation={[0.08, 0, 0]}>
            <boxGeometry args={[55, 290, 4]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} />
          </mesh>
          {/* Natural Round Granite Boulders at Cliff Base (Far below jump arc) */}
          <mesh position={[-18, -140, -25]} rotation={[0.2, 0.5, 0]}>
            <dodecahedronGeometry args={[28, 1]} />
            <meshStandardMaterial color="#64748b" roughness={0.88} metalness={0.05} />
          </mesh>
          <mesh position={[20, -145, -30]} rotation={[-0.2, -0.4, 0.1]}>
            <dodecahedronGeometry args={[24, 1]} />
            <meshStandardMaterial color="#64748b" roughness={0.88} metalness={0.05} />
          </mesh>
        </group>

        {/* CLIFF 2: The Abyss Drop (Sheer 334-Unit Basalt Cliff - Lip at Z=-460, Y=294 -> Base at Z=-540, Y=-40) */}
        <group position={[0, 95, -500]}>
          {/* Flanking Basalt Pillar Left */}
          <mesh position={[-130, 140, 20]} rotation={[0.12, 0.4, -0.2]}>
            <dodecahedronGeometry args={[60, 1]} />
            <meshStandardMaterial color="#334155" roughness={0.88} />
          </mesh>
          {/* Flanking Basalt Pillar Right */}
          <mesh position={[130, 140, 20]} rotation={[0.12, -0.4, 0.2]}>
            <dodecahedronGeometry args={[60, 1]} />
            <meshStandardMaterial color="#334155" roughness={0.88} />
          </mesh>
          {/* Natural Fractured Basalt Drop Wall Beneath Launch Lip */}
          <mesh geometry={cliff2ButtressGeom} position={[0, 15, 15]} rotation={[0.08, 0, 0]}>
            <meshStandardMaterial color="#334155" roughness={0.85} metalness={0.05} side={THREE.DoubleSide} />
          </mesh>
          {/* Cascading blue glacial ice sheets */}
          <mesh position={[0, 20, 28]} rotation={[0.08, 0, 0]}>
            <boxGeometry args={[80, 240, 4]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} />
          </mesh>
          {/* Natural Round Basalt Boulders at Cliff Base (Far below jump arc) */}
          <mesh position={[20, -115, -25]} rotation={[0.1, 0.4, -0.2]}>
            <dodecahedronGeometry args={[22, 1]} />
            <meshStandardMaterial color="#475569" roughness={0.88} metalness={0.05} />
          </mesh>
          <mesh position={[-14, -120, -30]} rotation={[-0.1, -0.3, 0.2]}>
            <dodecahedronGeometry args={[20, 1]} />
            <meshStandardMaterial color="#475569" roughness={0.88} metalness={0.05} />
          </mesh>
        </group>

        {/* Base Resort Apron (Pristine snow arena for the brawl, helipad, and lodge) */}
        <mesh position={[0, -145, -970]} rotation={[-0.05, 0, 0]}>
          <boxGeometry args={[650, 14, 380]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.4} metalness={0.05} />
        </mesh>

        {/* Alpine Pine Forest Glades (Rich snow-covered evergreen clusters along mountain flanks) */}
        {[
          [-160, -135, -960, 1.4], [140, -135, -960, 1.4], [-210, -130, -910, 1.6], [190, -130, -900, 1.5],
          [-185, -132, -840, 1.5], [215, -130, -820, 1.6], [-220, -40, -710, 1.7], [220, -35, -690, 1.6],
          [-185, 25, -590, 1.5], [195, 35, -570, 1.6], [-210, 260, -430, 1.6], [210, 280, -410, 1.6],
          [-175, 320, -390, 1.6], [175, 320, -390, 1.6], [-225, 450, -270, 1.7], [225, 470, -250, 1.6],
          [-170, 520, -210, 1.5], [185, 580, -160, 1.7], [-195, 780, 20, 1.6], [195, 800, 40, 1.6],
          [-215, 1040, 130, 1.7], [215, 1060, 150, 1.6], [-150, 1220, 180, 1.4], [160, 1220, 180, 1.4],
        ].map(([px, py, pz, ps], idx) => (
          <AlpinePineTree key={idx} position={[px, py, pz]} scale={ps} />
        ))}

        {/* Sculpted Rolling Deep Powder Snow Drifts Along Mountain Flanks */}
        {[
          { pos: [-240, -128, -860], scale: [60, 16, 95], rot: [0.1, 0.4, 0.05] },
          { pos: [240, -128, -840], scale: [60, 16, 95], rot: [0.08, -0.35, -0.05] },
          { pos: [-170, 18, -580], scale: [85, 30, 130], rot: [0.18, 0.5, 0.1] },
          { pos: [175, 40, -550], scale: [80, 28, 125], rot: [0.16, -0.4, -0.08] },
          { pos: [-165, 475, -220], scale: [90, 34, 140], rot: [0.22, 0.45, 0.12] },
          { pos: [170, 505, -190], scale: [85, 32, 135], rot: [0.2, -0.42, -0.1] },
          { pos: [-150, 1175, 160], scale: [95, 38, 150], rot: [0.25, 0.35, 0.15] },
          { pos: [155, 1195, 190], scale: [90, 36, 145], rot: [0.24, -0.38, -0.12] },
        ].map((drift, i) => (
          <mesh key={i} position={drift.pos} rotation={drift.rot} scale={drift.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.38} metalness={0.04} />
          </mesh>
        ))}

        {/* Base Area Wooden Ski Lodge Backdrop */}
        <group position={[120, -135, -1000]}>
          <mesh position={[0, 25, 0]}>
            <boxGeometry args={[95, 50, 60]} />
            <meshStandardMaterial color="#3e2712" roughness={0.8} />
          </mesh>
          <mesh position={[0, 60, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[55, 55, 66]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          <mesh position={[0, 20, 31]}>
            <planeGeometry args={[65, 20]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <pointLight position={[0, 20, 40]} color="#f59e0b" intensity={4} distance={120} />
        </group>

        {/* Base Helipad Circle & H-Pad Marking (Where Helicopter Waits at Base) */}
        <group position={[-72, -134.8, -985]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
          <mesh>
            <ringGeometry args={[36, 40, 32]} />
            <meshBasicMaterial color="#f97316" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-8, 0, 0]}>
            <planeGeometry args={[4, 24]} />
            <meshBasicMaterial color="#f97316" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[8, 0, 0]}>
            <planeGeometry args={[4, 24]} />
            <meshBasicMaterial color="#f97316" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[16, 4]} />
            <meshBasicMaterial color="#f97316" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Trail Signpost (Placed on right flank away from helipad and fight sightline) */}
        <group position={[68, -135, -995]}>
          <mesh position={[0, 16, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 32, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 28, 0]}>
            <boxGeometry args={[42, 16, 2]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
          <mesh position={[-12, 28, 1.2]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[7, 7, 0.5]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>

        {/* Boundary Poles placed on outer flanks so helipad & view are 100% clear */}
        {[-150, -135, -120, 65, 80, 95].map((px, i) => (
          <group key={i} position={[px, -135, -970]}>
            <mesh position={[0, 12, 0]}>
              <cylinderGeometry args={[0.8, 0.8, 24, 8]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================= */}
      {/* 3. RESCUE HELI-SKIING HELICOPTER                          */}
      {/* ========================================================= */}
      <group ref={heliGroupRef} position={[-65, 845, -280]} scale={1.5}>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[16, 42, 16, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[33, 10, 43]} />
          <meshStandardMaterial color="#f97316" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 3, 18]} rotation={[0.35, 0, 0]}>
          <sphereGeometry args={[14.5, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.1} transparent opacity={0.7} />
        </mesh>
        <mesh position={[16.2, -1, -2]}>
          <boxGeometry args={[1, 20, 18]} />
          <meshBasicMaterial color="#050a14" />
        </mesh>

        <mesh position={[0, 16, -6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[10, 12, 34, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 16, -24]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[6, 7, 8, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.1} />
        </mesh>

        <mesh position={[0, 7, -65]} rotation={[-Math.PI / 2 + 0.05, 0, 0]}>
          <cylinderGeometry args={[3.5, 7, 85, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0, 11, -95]}>
          <boxGeometry args={[44, 2, 10]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
        <mesh position={[0, 26, -108]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[3, 34, 18]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>

        {[-15, 15].map((sx, i) => (
          <group key={i} position={[sx, -18, 0]}>
            <mesh position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[1.5, 1.5, 68, 12]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
            </mesh>
            <mesh position={[0, 5, 29]} rotation={[0.6, 0, 0]}>
              <cylinderGeometry args={[1.5, 1.5, 14, 12]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
            </mesh>
            <mesh position={[(i === 0 ? 7 : -7), 9, 14]} rotation={[0, 0, (i === 0 ? -0.4 : 0.4)]}>
              <cylinderGeometry args={[1.2, 1.2, 20, 8]} />
              <meshStandardMaterial color="#64748b" metalness={0.9} />
            </mesh>
            <mesh position={[(i === 0 ? 7 : -7), 9, -20]} rotation={[0, 0, (i === 0 ? -0.4 : 0.4)]}>
              <cylinderGeometry args={[1.2, 1.2, 20, 8]} />
              <meshStandardMaterial color="#64748b" metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* RAISED ALPINE RESCUE HIGH-CLEARANCE 4-BLADE ROTOR ASSEMBLY */}
        <group position={[0, 16, -6]}>
          {/* Tapered Transmission Pylon Fairing */}
          <mesh position={[0, 9, 0]}>
            <cylinderGeometry args={[4.2, 7.5, 18, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Tall Rotor Mast Shaft (Ensures Blades Spin Far Above Passenger Heads) */}
          <mesh position={[0, 24, 0]}>
            <cylinderGeometry args={[3.2, 4.0, 18, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.95} />
          </mesh>
          <group ref={heliRotorRef}>
            {/* Round Central Mast Hub */}
            <mesh position={[0, 36, 0]}>
              <cylinderGeometry args={[6.5, 7.5, 3.5, 16]} />
              <meshStandardMaterial color="#334155" metalness={0.9} />
            </mesh>
            {/* 4 Clean Straight Radial Aerodynamic Blades with Yellow Safety Tips */}
            {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((ang, i) => (
              <group key={i} rotation={[0, ang, 0]} position={[0, 36, 0]}>
                <mesh position={[46, 0, 0]}>
                  <boxGeometry args={[78, 1.2, 5.5]} />
                  <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
                </mesh>
                <mesh position={[88, 0, 0]}>
                  <boxGeometry args={[6, 1.25, 5.7]} />
                  <meshStandardMaterial color="#eab308" />
                </mesh>
              </group>
            ))}
          </group>
          {/* Circular semi-transparent rotor blur disc */}
          <mesh ref={heliRotorBlurRef} position={[0, 36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[8, 92, 32]} />
            <meshBasicMaterial color="#cbd5e1" transparent opacity={0.18} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Tail Rotor */}
        <group position={[4, 38, -112]}>
          <group ref={heliTailRotorRef}>
            <mesh>
              <boxGeometry args={[1.2, 28, 4]} />
              <meshStandardMaterial color="#f8fafc" />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[1.2, 28, 4]} />
              <meshStandardMaterial color="#f8fafc" />
            </mesh>
          </group>
        </group>

        {/* Standard FAA red anti-collision strobe on tail */}

        <group ref={heliStrobeRef} position={[0, 44, -108]}>
          <mesh>
            <sphereGeometry args={[2, 12, 12]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <pointLight color="#ef4444" intensity={8} distance={150} />
        </group>
      </group>

      {/* ========================================================= */}
      {/* 4. REALISTIC HUMAN BIG-MOUNTAIN SNOWBOARDER               */}
      {/* ========================================================= */}
      <group ref={riderGroupRef} position={[0, 810, -340]}>
        {/* A. AUTHENTIC CURVED FREERIDE SNOWBOARD (PARABOLIC SIDECUT & ROUNDED ZERO-CORNER TIPS) */}
        <group ref={feetSnowboardRef} position={[0, 0, 0]}>
          {/* 3D Curved Snowboard Deck (Continuous Parabolic Sidecut, Rounded Nose & Tail Arcs, Progressive Camber & Kicks) */}
          <mesh geometry={snowboardDeckGeom}>
            <meshStandardMaterial color="#090d16" roughness={0.25} metalness={0.7} />
          </mesh>
          {/* Seamless 360-Degree Stainless Steel Wrapped Edge Rail */}
          <mesh geometry={snowboardEdgeGeom}>
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.12} />
          </mesh>
          {/* Topsheet Hazard Orange Center Graphic Stripe */}
          <mesh geometry={snowboardStripeGeom}>
            <meshStandardMaterial color="#f97316" roughness={0.35} />
          </mesh>
          {/* Textured Rubber Stomp Pad Between Bindings */}
          <mesh position={[0, 1.6, -1]}>
            <boxGeometry args={[8.5, 0.35, 7]} />
            <meshStandardMaterial color="#1e293b" roughness={0.95} />
          </mesh>

          {/* Pro Ratchet Highback Bindings (Mounted across board: Highbacks on -X heel edge, Toes on +X toe edge) */}
          {/* Lead Foot Binding (World Z = -12.5 downhill, angled 15° forward) */}
          <group position={[0, 1.6, -12.5]} rotation={[0, 1.83, 0]}>
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[12, 3, 14]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} />
            </mesh>
            <mesh position={[0, 5, -5.5]} rotation={[-0.15, 0, 0]}>
              <boxGeometry args={[9.5, 11, 2]} />
              <meshStandardMaterial color="#f97316" metalness={0.6} />
            </mesh>
            <mesh position={[0, 4.5, -5.8]}>
              <cylinderGeometry args={[4.2, 4.2, 2.5, 12, 1, true]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} />
            </mesh>
            {/* Ankle Strap & Toe Cap */}
            <mesh position={[0, 7, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[4.6, 1.2, 6, 12, Math.PI]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>
            <mesh position={[0, 3, 4.5]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[3.8, 0.9, 6, 12, Math.PI]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>
          </group>

          {/* Rear Foot Binding (World Z = +12.5 uphill, angled -10° backward duck stance) */}
          <group position={[0, 1.6, 12.5]} rotation={[0, 1.40, 0]}>
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[12, 3, 14]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} />
            </mesh>
            <mesh position={[0, 5, -5.5]} rotation={[-0.15, 0, 0]}>
              <boxGeometry args={[9.5, 11, 2]} />
              <meshStandardMaterial color="#f97316" metalness={0.6} />
            </mesh>
            <mesh position={[0, 4.5, -5.8]}>
              <cylinderGeometry args={[4.2, 4.2, 2.5, 12, 1, true]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} />
            </mesh>
            {/* Ankle Strap & Toe Cap */}
            <mesh position={[0, 7, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[4.6, 1.2, 6, 12, Math.PI]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>
            <mesh position={[0, 3, 4.5]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[3.8, 0.9, 6, 12, Math.PI]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>
          </group>
        </group>

        {/* B. PRO AUTHENTIC CURVED SNOWBOARD HELD IN HANDS (As Heavy Weapon During Brawl) */}
        <group ref={handSnowboardRef} position={[-12, 18, 4]} visible={false}>
          <mesh geometry={snowboardDeckGeom}>
            <meshStandardMaterial color="#090d16" roughness={0.25} metalness={0.7} />
          </mesh>
          <mesh geometry={snowboardEdgeGeom}>
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.12} />
          </mesh>
          <mesh geometry={snowboardStripeGeom}>
            <meshStandardMaterial color="#f97316" roughness={0.35} />
          </mesh>
        </group>

        {/* C. RIDER SIDEWAYS FREERIDE BODY (True Sideways Stance with Feet Firmly on Snowboard) */}
        <group rotation={[0, Math.PI / 2, 0]}>
          <group ref={riderPelvisRef} position={[0, 36, 0]}>
            {/* Technical Bib Pants Waist & Utility Belt Loops */}
            <mesh position={[0, 3, 0]}>
              <cylinderGeometry args={[8.2, 7.6, 8, 14]} />
              <meshStandardMaterial color="#1e293b" roughness={0.85} />
            </mesh>
            <mesh position={[0, 2, 4.2]}>
              <boxGeometry args={[1.5, 6, 0.8]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>

            {/* Left Leg (Lead Leg / Downhill - Foot placed at World Z = -12.5) */}
            <group ref={riderLeftLegRef} position={[5, 0, 0]}>
              <mesh position={[2.5, -6.5, 0]} rotation={[0, 0, -0.18]}>
                <cylinderGeometry args={[4.2, 3.6, 13, 12]} />
                <meshStandardMaterial color="#1e293b" roughness={0.85} />
              </mesh>
              {/* Outer Cargo Utility Pocket */}
              <mesh position={[5.5, -6.5, 0]}>
                <boxGeometry args={[1.6, 6.5, 4.8]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
              </mesh>
              {/* Articulated Reinforced Knee Flex Joint Pad */}
              <mesh position={[4.5, -13, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[3.6, 3.6, 4.2, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
              </mesh>
              {/* Lower Leg Shin & Calf */}
              <mesh position={[6.2, -20, 0]} rotation={[0, 0, -0.18]}>
                <cylinderGeometry args={[3.5, 3.1, 13, 12]} />
                <meshStandardMaterial color="#1e293b" roughness={0.85} />
              </mesh>
              {/* Flared Snow Pant Boot Gaiter Cuff */}
              <mesh position={[7.5, -25.5, 0]}>
                <cylinderGeometry args={[4.1, 4.7, 4.5, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
              </mesh>
              {/* Pro Snowboard Boot with Forward Lean & Boa Dial (Bottom resting inside lead binding) */}
              <group position={[7.5, -32, 2]} rotation={[0, 0.26, 0]}>
                <mesh position={[0, 3.5, 0]}>
                  <boxGeometry args={[6.4, 7, 8]} />
                  <meshStandardMaterial color="#090d16" roughness={0.7} metalness={0.3} />
                </mesh>
                {/* Boa Dial Knob on side of boot */}
                <mesh position={[3.4, 4.5, 0.5]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[1.1, 1.1, 0.8, 10]} />
                  <meshStandardMaterial color="#38bdf8" metalness={0.8} />
                </mesh>
                {/* Boot Forefoot & Rockered Toe */}
                <mesh position={[0, 1.0, 3.5]}>
                  <boxGeometry args={[6.6, 4.5, 10]} />
                  <meshStandardMaterial color="#090d16" roughness={0.7} metalness={0.3} />
                </mesh>
                {/* Rubber Toe Bumper & Heel Counter */}
                <mesh position={[0, 1.0, 8]}>
                  <boxGeometry args={[6.8, 3, 3]} />
                  <meshStandardMaterial color="#38bdf8" roughness={0.5} />
                </mesh>
                {/* Lugged Vibram Traction Outsole (Resting flat on top of snowboard deck) */}
                <mesh position={[0, -0.8, 3]}>
                  <boxGeometry args={[6.8, 1.6, 13]} />
                  <meshStandardMaterial color="#1e293b" roughness={0.95} />
                </mesh>
              </group>
            </group>

            {/* Right Leg (Rear Leg / Uphill - Foot placed at World Z = +12.5) */}
            <group ref={riderRightLegRef} position={[-5, 0, 0]}>
              <mesh position={[-2.5, -6.5, 0]} rotation={[0, 0, 0.18]}>
                <cylinderGeometry args={[4.2, 3.6, 13, 12]} />
                <meshStandardMaterial color="#1e293b" roughness={0.85} />
              </mesh>
              {/* Outer Cargo Utility Pocket */}
              <mesh position={[-5.5, -6.5, 0]}>
                <boxGeometry args={[1.6, 6.5, 4.8]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
              </mesh>
              {/* Articulated Reinforced Knee Flex Joint Pad */}
              <mesh position={[-4.5, -13, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[3.6, 3.6, 4.2, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
              </mesh>
              {/* Lower Leg Shin & Calf */}
              <mesh position={[-6.2, -20, 0]} rotation={[0, 0, 0.18]}>
                <cylinderGeometry args={[3.5, 3.1, 13, 12]} />
                <meshStandardMaterial color="#1e293b" roughness={0.85} />
              </mesh>
              {/* Flared Snow Pant Boot Gaiter Cuff */}
              <mesh position={[-7.5, -25.5, 0]}>
                <cylinderGeometry args={[4.1, 4.7, 4.5, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
              </mesh>
              {/* Pro Snowboard Boot with Forward Lean & Boa Dial (Bottom resting inside rear binding) */}
              <group position={[-7.5, -32, 2]} rotation={[0, -0.17, 0]}>
                <mesh position={[0, 3.5, 0]}>
                  <boxGeometry args={[6.4, 7, 8]} />
                  <meshStandardMaterial color="#090d16" roughness={0.7} metalness={0.3} />
                </mesh>
                {/* Boa Dial Knob on side of boot */}
                <mesh position={[-3.4, 4.5, 0.5]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[1.1, 1.1, 0.8, 10]} />
                  <meshStandardMaterial color="#38bdf8" metalness={0.8} />
                </mesh>
                {/* Boot Forefoot & Rockered Toe */}
                <mesh position={[0, 1.0, 3.5]}>
                  <boxGeometry args={[6.6, 4.5, 10]} />
                  <meshStandardMaterial color="#090d16" roughness={0.7} metalness={0.3} />
                </mesh>
                {/* Rubber Toe Bumper & Heel Counter */}
                <mesh position={[0, 1.0, 8]}>
                  <boxGeometry args={[6.8, 3, 3]} />
                  <meshStandardMaterial color="#38bdf8" roughness={0.5} />
                </mesh>
                {/* Lugged Vibram Traction Outsole (Resting flat on top of snowboard deck) */}
                <mesh position={[0, -0.8, 3]}>
                  <boxGeometry args={[6.8, 1.6, 13]} />
                  <meshStandardMaterial color="#1e293b" roughness={0.95} />
                </mesh>
              </group>
            </group>
          </group>

        {/* D. UPPER BODY: Technical 3-Layer Gore-Tex Freeride Jacket with Athletic V-Taper */}
        <group ref={riderTorsoRef} position={[0, 36, 0]}>
          {/* Main Anatomical Chest Block (Deep Charcoal Slate) */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[9.4, 7.8, 19, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.05} />
          </mesh>
          {/* Weatherproof Burnt Avalanche Orange Chest Shell Panel */}
          <mesh position={[0, 2, 3.8]}>
            <boxGeometry args={[14, 11, 4.2]} />
            <meshStandardMaterial color="#f97316" roughness={0.8} />
          </mesh>
          {/* High-Visibility Avalanche Orange Back Shell Panel */}
          <mesh position={[0, 2, -3.8]}>
            <boxGeometry args={[14, 12, 4.2]} />
            <meshStandardMaterial color="#f97316" roughness={0.8} />
          </mesh>
          {/* Welded Waterproof Center Front Zipper Track */}
          <mesh position={[0, 0, 6.1]}>
            <boxGeometry args={[1.4, 18, 0.8]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} />
          </mesh>
          {/* Dual Chest Radio & Vent Pockets with Zip Tape */}
          <mesh position={[4.2, 3, 6.0]}>
            <boxGeometry args={[4, 5.5, 0.5]} />
            <meshStandardMaterial color="#1e293b" roughness={0.85} />
          </mesh>
          <mesh position={[-4.2, 3, 6.0]}>
            <boxGeometry args={[4, 5.5, 0.5]} />
            <meshStandardMaterial color="#1e293b" roughness={0.85} />
          </mesh>
          {/* Tall Protective Storm Collar (Guarding Throat & Lower Jaw) */}
          <mesh position={[0, 9.5, 0]}>
            <cylinderGeometry args={[5.2, 5.8, 5.5, 14, 1, true]} />
            <meshStandardMaterial color="#0f172a" roughness={0.85} />
          </mesh>
          {/* Sculpted Hood Draped Around Shoulders / Back of Neck */}
          <mesh position={[0, 8.5, -3.2]} rotation={[1.1, 0, 0]}>
            <torusGeometry args={[5.2, 2.2, 8, 16, Math.PI * 1.1]} />
            <meshStandardMaterial color="#f97316" roughness={0.85} />
          </mesh>
          {/* Powder Skirt Hem Band at Waist */}
          <mesh position={[0, -9.5, 0]}>
            <cylinderGeometry args={[8.2, 8.6, 3, 14]} />
            <meshStandardMaterial color="#1e293b" roughness={0.9} />
          </mesh>
        </group>

        {/* E. ARMS: Deltoid Shoulders, Articulated Sleeves & Technical Mittens */}
        {/* Left Arm */}
        <group ref={riderLeftArmRef} position={[-12, 42, 0]}>
          {/* Deltoid Shoulder Cap */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[4.5, 12, 12]} />
            <meshStandardMaterial color="#f97316" roughness={0.8} />
          </mesh>
          {/* Upper Arm Bicep */}
          <mesh position={[-2.5, -5.5, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[3.2, 2.9, 10, 10]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
          {/* Reinforced Elbow Joint Flex Patch */}
          <mesh position={[-4, -11.5, 0]}>
            <sphereGeometry args={[3.0, 10, 10]} />
            <meshStandardMaterial color="#1e293b" roughness={0.95} />
          </mesh>
          {/* Forearm with Zippered Sleeve Pass Pocket */}
          <mesh position={[-5.5, -17, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[2.9, 2.5, 10, 10]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
          <mesh position={[-6.8, -16.5, 0]}>
            <boxGeometry args={[0.5, 4.5, 2.5]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
          {/* Technical Snowboard Mitten with Pre-Curved Thumb & Leather Palm */}
          <group position={[-8, -23, 1]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[2.8, 2.6, 3.5, 10]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, -4, 0]}>
              <boxGeometry args={[4.8, 6.5, 3.4]} />
              <meshStandardMaterial color="#090d16" roughness={0.7} />
            </mesh>
            <mesh position={[-2, -3, 1]} rotation={[0.3, 0, -0.4]}>
              <capsuleGeometry args={[1.1, 3, 6, 6]} />
              <meshStandardMaterial color="#f97316" />
            </mesh>
            <mesh position={[0, -4, 1.8]}>
              <planeGeometry args={[4.2, 5.5]} />
              <meshStandardMaterial color="#262626" roughness={0.9} />
            </mesh>
          </group>
        </group>

        {/* Right Arm */}
        <group ref={riderRightArmRef} position={[12, 42, 0]}>
          {/* Deltoid Shoulder Cap */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[4.5, 12, 12]} />
            <meshStandardMaterial color="#f97316" roughness={0.8} />
          </mesh>
          {/* Upper Arm Bicep */}
          <mesh position={[2.5, -5.5, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[3.2, 2.9, 10, 10]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
          {/* Reinforced Elbow Joint Flex Patch */}
          <mesh position={[4, -11.5, 0]}>
            <sphereGeometry args={[3.0, 10, 10]} />
            <meshStandardMaterial color="#1e293b" roughness={0.95} />
          </mesh>
          {/* Forearm */}
          <mesh position={[5.5, -17, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[2.9, 2.5, 10, 10]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
          {/* Technical Snowboard Mitten with Pre-Curved Thumb & Leather Palm */}
          <group position={[8, -23, 1]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[2.8, 2.6, 3.5, 10]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, -4, 0]}>
              <boxGeometry args={[4.8, 6.5, 3.4]} />
              <meshStandardMaterial color="#090d16" roughness={0.7} />
            </mesh>
            <mesh position={[2, -3, 1]} rotation={[0.3, 0, 0.4]}>
              <capsuleGeometry args={[1.1, 3, 6, 6]} />
              <meshStandardMaterial color="#f97316" />
            </mesh>
            <mesh position={[0, -4, 1.8]}>
              <planeGeometry args={[4.2, 5.5]} />
              <meshStandardMaterial color="#262626" roughness={0.9} />
            </mesh>
          </group>
        </group>

        {/* F. HEAD: Tactical Balaclava, Freeride Helmet & Spherical Mirror Goggles */}
        <group ref={riderHeadRef} position={[0, 54, 0]}>
          {/* Anatomical Head Base with Storm Balaclava */}
          <mesh position={[0, -2, 0]}>
            <cylinderGeometry args={[3.8, 4.4, 5.5, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 2, 0.5]}>
            <sphereGeometry args={[7.8, 16, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} />
          </mesh>

          {/* Aerodynamic Freeride ABS Helmet */}
          <mesh position={[0, 3.5, 0]}>
            <sphereGeometry args={[8.8, 20, 16]} />
            <meshStandardMaterial color="#ea580c" roughness={0.65} metalness={0.1} />
          </mesh>
          {/* Integrated Brow Sun Visor / Peak */}
          <mesh position={[0, 5, 6.8]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[11, 1.8, 4.2]} />
            <meshStandardMaterial color="#f97316" roughness={0.7} />
          </mesh>
          {/* Top Climate Airflow Vents with Mesh Slots */}
          <mesh position={[0, 11.2, -0.5]}>
            <boxGeometry args={[4.2, 1.2, 8]} />
            <meshStandardMaterial color="#0284c7" metalness={0.7} />
          </mesh>
          {/* Soft Molded Ear Pads with Audio Ports */}
          <mesh position={[8.4, 0.5, 0]}>
            <boxGeometry args={[1.8, 5.5, 4.8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.9} />
          </mesh>
          <mesh position={[-8.4, 0.5, 0]}>
            <boxGeometry args={[1.8, 5.5, 4.8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.9} />
          </mesh>
          {/* Rear Goggle Strap Retention Clip */}
          <mesh position={[0, 3.5, -8.7]}>
            <boxGeometry args={[2.5, 4.5, 0.9]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
          {/* Helmet Top Action Cam with Recording Red Tally Light */}
          <group position={[0, 12, 1.8]}>
            <mesh>
              <boxGeometry args={[3.6, 3, 2.8]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 1.5]}>
              <sphereGeometry args={[0.7, 8, 8]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
            <pointLight position={[0, 0, 2]} color="#ef4444" intensity={3} distance={25} />
          </group>

          {/* Pro Spherical Snow Goggles with Gold/Amber Mirror Iridescence */}
          <group position={[0, 3, 6.5]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[5.2, 0.9, 8, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.5} />
            </mesh>
            {/* Curved Toric Double Mirror Lens */}
            <mesh position={[0, 0, 0.8]}>
              <boxGeometry args={[11.5, 4.8, 2]} />
              <meshStandardMaterial 
                color="#f59e0b" 
                emissive="#ea580c" 
                emissiveIntensity={1.8} 
                metalness={0.95} 
                roughness={0.05} 
              />
            </mesh>
            {/* Woven Jacquard Goggle Strap Wrapping Around Helmet */}
            <mesh position={[0, 0, -6.5]}>
              <cylinderGeometry args={[8.8, 8.8, 2.2, 20, 1, true]} />
              <meshBasicMaterial color="#f97316" side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 5. REALISTIC RETRO-ALPINE PUFFER SKIER                    */}
      {/* ========================================================= */}
      <group ref={skierGroupRef} position={[10, -135, -965]}>
        {/* A. TWIN-TIP ALPINE SKIS WITH STEP-IN BINDINGS (Attached to Boots Initially) */}
        <group ref={feetLeftSkiRef} position={[-7, 1.5, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[6.6, 2, 56]} />
            <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, 4, 29]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[6.4, 1.8, 10]} />
            <meshStandardMaterial color="#3b82f6" metalness={0.8} />
          </mesh>
          <mesh position={[0, 3, -29]} rotation={[-0.32, 0, 0]}>
            <boxGeometry args={[6.4, 1.8, 9]} />
            <meshStandardMaterial color="#3b82f6" metalness={0.8} />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[7.0, 0.6, 57]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
          </mesh>
          {/* Center Racing Stripe Graphic */}
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[2.2, 1.2, 55]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
          {/* Alpine Binding Toe & Heel Pieces */}
          <mesh position={[0, 3, 7]}>
            <boxGeometry args={[5.5, 3.5, 5]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 4, -5]}>
            <boxGeometry args={[5.5, 5.5, 6]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 2, -6]}>
            <boxGeometry args={[7.8, 1.5, 1]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
        </group>

        <group ref={feetRightSkiRef} position={[7, 1.5, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[6.6, 2, 56]} />
            <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, 4, 29]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[6.4, 1.8, 10]} />
            <meshStandardMaterial color="#3b82f6" metalness={0.8} />
          </mesh>
          <mesh position={[0, 3, -29]} rotation={[-0.32, 0, 0]}>
            <boxGeometry args={[6.4, 1.8, 9]} />
            <meshStandardMaterial color="#3b82f6" metalness={0.8} />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[7.0, 0.6, 57]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
          </mesh>
          {/* Center Racing Stripe Graphic */}
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[2.2, 1.2, 55]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
          {/* Alpine Binding Toe & Heel Pieces */}
          <mesh position={[0, 3, 7]}>
            <boxGeometry args={[5.5, 3.5, 5]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 4, -5]}>
            <boxGeometry args={[5.5, 5.5, 6]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 2, -6]}>
            <boxGeometry args={[7.8, 1.5, 1]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
        </group>

        {/* B. LOWER BODY: Alpine Ski Pants & 4-Buckle Ski Boots */}
        <group position={[0, 16, 0]}>
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[8.0, 7.5, 8, 14]} />
            <meshStandardMaterial color="#0284c7" roughness={0.8} />
          </mesh>

          {/* Left Leg with Articulated Knee & 4-Buckle Boot */}
          <group ref={skierLeftLegRef} position={[-6, 0, 0]}>
            <mesh position={[0, -5.5, 0]}>
              <cylinderGeometry args={[4.2, 3.6, 11, 12]} />
              <meshStandardMaterial color="#0284c7" roughness={0.8} />
            </mesh>
            {/* Reinforced Knee Flex Patch */}
            <mesh position={[0, -11.5, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[3.6, 3.6, 4.2, 12]} />
              <meshStandardMaterial color="#0369a1" roughness={0.85} />
            </mesh>
            <mesh position={[0, -16.5, 0]}>
              <cylinderGeometry args={[3.5, 3.1, 9, 12]} />
              <meshStandardMaterial color="#0284c7" roughness={0.8} />
            </mesh>
            {/* 4-Buckle Alpine Ski Boot */}
            <group position={[0, -22, 2]}>
              <mesh position={[0, -2, 0]}>
                <boxGeometry args={[6.2, 8, 8]} />
                <meshStandardMaterial color="#eab308" metalness={0.7} roughness={0.3} />
              </mesh>
              {/* Shin Power Strap */}
              <mesh position={[0, 1.2, 0.2]}>
                <cylinderGeometry args={[3.4, 3.4, 2, 12]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              {/* 4 Micro-Adjustable Aluminum Buckles */}
              <mesh position={[0, 0, 4.2]}>
                <boxGeometry args={[3.8, 1, 1.2]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
              </mesh>
              <mesh position={[0, -2, 4.2]}>
                <boxGeometry args={[3.8, 1, 1.2]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
              </mesh>
              {/* Instep & Toe Shell */}
              <mesh position={[0, -4.5, 3]}>
                <boxGeometry args={[6.4, 4.5, 9.5]} />
                <meshStandardMaterial color="#eab308" metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh position={[0, -3.5, 4.5]}>
                <boxGeometry args={[3.8, 1, 1.2]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
              </mesh>
              <mesh position={[0, -4.2, 6.8]}>
                <boxGeometry args={[3.8, 1, 1.2]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
              </mesh>
              {/* DIN Toe & Heel Lugs */}
              <mesh position={[0, -5.8, 7.8]}>
                <boxGeometry args={[6.2, 1.6, 2.5]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[0, -5.8, -3.5]}>
                <boxGeometry args={[6.2, 1.6, 2.5]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </group>
          </group>

          {/* Right Leg with Articulated Knee & 4-Buckle Boot */}
          <group ref={skierRightLegRef} position={[6, 0, 0]}>
            <mesh position={[0, -5.5, 0]}>
              <cylinderGeometry args={[4.2, 3.6, 11, 12]} />
              <meshStandardMaterial color="#0284c7" roughness={0.8} />
            </mesh>
            {/* Reinforced Knee Flex Patch */}
            <mesh position={[0, -11.5, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[3.6, 3.6, 4.2, 12]} />
              <meshStandardMaterial color="#0369a1" roughness={0.85} />
            </mesh>
            <mesh position={[0, -16.5, 0]}>
              <cylinderGeometry args={[3.5, 3.1, 9, 12]} />
              <meshStandardMaterial color="#0284c7" roughness={0.8} />
            </mesh>
            {/* 4-Buckle Alpine Ski Boot */}
            <group position={[0, -22, 2]}>
              <mesh position={[0, -2, 0]}>
                <boxGeometry args={[6.2, 8, 8]} />
                <meshStandardMaterial color="#eab308" metalness={0.7} roughness={0.3} />
              </mesh>
              {/* Shin Power Strap */}
              <mesh position={[0, 1.2, 0.2]}>
                <cylinderGeometry args={[3.4, 3.4, 2, 12]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              {/* 4 Micro-Adjustable Aluminum Buckles */}
              <mesh position={[0, 0, 4.2]}>
                <boxGeometry args={[3.8, 1, 1.2]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
              </mesh>
              <mesh position={[0, -2, 4.2]}>
                <boxGeometry args={[3.8, 1, 1.2]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
              </mesh>
              {/* Instep & Toe Shell */}
              <mesh position={[0, -4.5, 3]}>
                <boxGeometry args={[6.4, 4.5, 9.5]} />
                <meshStandardMaterial color="#eab308" metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh position={[0, -3.5, 4.5]}>
                <boxGeometry args={[3.8, 1, 1.2]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
              </mesh>
              <mesh position={[0, -4.2, 6.8]}>
                <boxGeometry args={[3.8, 1, 1.2]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
              </mesh>
              {/* DIN Toe & Heel Lugs */}
              <mesh position={[0, -5.8, 7.8]}>
                <boxGeometry args={[6.2, 1.6, 2.5]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[0, -5.8, -3.5]}>
                <boxGeometry args={[6.2, 1.6, 2.5]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </group>
          </group>
        </group>

        {/* C. TORSO: Retro-Alpine 5-Chamber Quilted Down Puffer Jacket */}
        <group ref={skierTorsoRef} position={[0, 32, 0]}>
          {/* Chamber 1: Shoulder & Yoke Chamber (Retro Cyan) */}
          <mesh position={[0, 9, 0]}>
            <cylinderGeometry args={[9.8, 10.2, 4.5, 16]} />
            <meshStandardMaterial color="#06b6d4" roughness={0.4} />
          </mesh>
          {/* Chamber 2: Upper Chest Chamber (Safety Canary Yellow) */}
          <mesh position={[0, 4.5, 0]}>
            <cylinderGeometry args={[10.4, 10.2, 4.5, 16]} />
            <meshStandardMaterial color="#eab308" roughness={0.4} />
          </mesh>
          {/* Chamber 3: Mid Chest Chamber (Vivid Alpine Magenta) */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[10.2, 9.8, 4.5, 16]} />
            <meshStandardMaterial color="#ec4899" roughness={0.4} />
          </mesh>
          {/* Chamber 4: Lower Abdomen Chamber (Vivid Alpine Magenta) */}
          <mesh position={[0, -4.5, 0]}>
            <cylinderGeometry args={[9.8, 9.4, 4.5, 16]} />
            <meshStandardMaterial color="#ec4899" roughness={0.4} />
          </mesh>
          {/* Chamber 5: Waist Hem Chamber (Vivid Alpine Magenta) */}
          <mesh position={[0, -9, 0]}>
            <cylinderGeometry args={[9.4, 9.0, 4.5, 16]} />
            <meshStandardMaterial color="#ec4899" roughness={0.4} />
          </mesh>
          {/* Deep Baffle Quilt Seam Rings */}
          {[-6.8, -2.2, 2.2, 6.8].map((sy, i) => (
            <mesh key={i} position={[0, sy, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[9.8, 0.6, 6, 16]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
          ))}
          {/* Tall Insulated Storm Collar */}
          <mesh position={[0, 13, 0]}>
            <cylinderGeometry args={[5.6, 6.2, 5, 16, 1, true]} />
            <meshStandardMaterial color="#06b6d4" roughness={0.5} />
          </mesh>
          {/* Heavy-Duty Center Zipper Storm Flap */}
          <mesh position={[0, 0, 5.5]}>
            <boxGeometry args={[1.6, 22, 1.0]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>

        {/* D. ARMS & DETAILED SKI POLES */}
        {/* Left Arm */}
        <group ref={skierLeftArmRef} position={[-11, 38, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[4.4, 12, 12]} />
            <meshStandardMaterial color="#06b6d4" />
          </mesh>
          <mesh position={[-2.5, -5.5, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[3.6, 3.2, 9, 12]} />
            <meshStandardMaterial color="#ec4899" roughness={0.4} />
          </mesh>
          <mesh position={[-4.5, -13.5, 0.5]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[3.2, 2.7, 9, 12]} />
            <meshStandardMaterial color="#ec4899" roughness={0.4} />
          </mesh>
          {/* Technical Ski Glove with Grip Palm */}
          <group position={[-6.5, -19.5, 1]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[2.7, 2.5, 3, 10]} />
              <meshStandardMaterial color="#eab308" />
            </mesh>
            <mesh position={[0, -3.5, 0]}>
              <boxGeometry args={[4.6, 5.5, 3.2]} />
              <meshStandardMaterial color="#090d16" roughness={0.7} />
            </mesh>
            <mesh position={[-1.8, -2.5, 0.8]} rotation={[0.3, 0, -0.4]}>
              <capsuleGeometry args={[1.0, 2.8, 6, 6]} />
              <meshStandardMaterial color="#eab308" />
            </mesh>
          </group>
          {/* Detailed Ski Pole (Held in hand) */}
          <group ref={flyingLeftPoleRef} position={[-7.5, -23, 2]}>
            {/* Ergonomic Molded Grip with Finger Grooves */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.3, 1.0, 7.5, 10]} />
              <meshStandardMaterial color="#1e293b" roughness={0.9} />
            </mesh>
            {/* Grip Cap & Nylon Wrist Loop Strap */}
            <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[2.2, 0.4, 6, 12]} />
              <meshStandardMaterial color="#ec4899" />
            </mesh>
            {/* Lightweight Tapered Aluminum Shaft */}
            <mesh position={[0, -22, 0]}>
              <cylinderGeometry args={[0.45, 0.3, 40, 8]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.95} />
            </mesh>
            {/* Snowflake Powder Basket Disc */}
            <mesh position={[0, -40, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[4.2, 4.2, 0.6, 12]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Steel Ice Tip */}
            <mesh position={[0, -42, 0]}>
              <coneGeometry args={[0.35, 3, 8]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
            </mesh>
          </group>
        </group>

        {/* Right Arm */}
        <group ref={skierRightArmRef} position={[11, 38, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[4.4, 12, 12]} />
            <meshStandardMaterial color="#06b6d4" />
          </mesh>
          <mesh position={[2.5, -5.5, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[3.6, 3.2, 9, 12]} />
            <meshStandardMaterial color="#ec4899" roughness={0.4} />
          </mesh>
          <mesh position={[4.5, -13.5, 0.5]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[3.2, 2.7, 9, 12]} />
            <meshStandardMaterial color="#ec4899" roughness={0.4} />
          </mesh>
          {/* Technical Ski Glove with Grip Palm */}
          <group position={[6.5, -19.5, 1]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[2.7, 2.5, 3, 10]} />
              <meshStandardMaterial color="#eab308" />
            </mesh>
            <mesh position={[0, -3.5, 0]}>
              <boxGeometry args={[4.6, 5.5, 3.2]} />
              <meshStandardMaterial color="#090d16" roughness={0.7} />
            </mesh>
            <mesh position={[1.8, -2.5, 0.8]} rotation={[0.3, 0, 0.4]}>
              <capsuleGeometry args={[1.0, 2.8, 6, 6]} />
              <meshStandardMaterial color="#eab308" />
            </mesh>
          </group>
          {/* Detailed Ski Pole (Held in hand) */}
          <group ref={flyingRightPoleRef} position={[7.5, -23, 2]}>
            {/* Ergonomic Molded Grip with Finger Grooves */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.3, 1.0, 7.5, 10]} />
              <meshStandardMaterial color="#1e293b" roughness={0.9} />
            </mesh>
            {/* Grip Cap & Nylon Wrist Loop Strap */}
            <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[2.2, 0.4, 6, 12]} />
              <meshStandardMaterial color="#ec4899" />
            </mesh>
            {/* Lightweight Tapered Aluminum Shaft */}
            <mesh position={[0, -22, 0]}>
              <cylinderGeometry args={[0.45, 0.3, 40, 8]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.95} />
            </mesh>
            {/* Snowflake Powder Basket Disc */}
            <mesh position={[0, -40, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[4.2, 4.2, 0.6, 12]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Steel Ice Tip */}
            <mesh position={[0, -42, 0]}>
              <coneGeometry args={[0.35, 3, 8]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
            </mesh>
          </group>
        </group>

        {/* E. HEAD, RIB-KNIT BEANIE WITH POM-POM & REMOVABLE GOGGLES */}
        <group ref={skierHeadRef} position={[0, 48, 0]}>
          <mesh position={[0, -1, 0]}>
            <cylinderGeometry args={[3.8, 4.2, 5, 12]} />
            <meshStandardMaterial color="#fde047" roughness={0.7} />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <sphereGeometry args={[7.6, 16, 16]} />
            <meshStandardMaterial color="#fde047" roughness={0.7} />
          </mesh>
          {/* Rib-Knit Alpine Beanie Body & Folded Brim Cuff */}
          <mesh position={[0, 5, 0]}>
            <cylinderGeometry args={[8.0, 8.4, 7, 16]} />
            <meshStandardMaterial color="#eab308" roughness={0.85} />
          </mesh>
          <mesh position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[8.0, 1.4, 8, 16]} />
            <meshStandardMaterial color="#ec4899" roughness={0.85} />
          </mesh>
          {/* Fluffy Pom-Pom on Top */}
          <mesh position={[0, 9.5, 0]}>
            <sphereGeometry args={[3.4, 12, 12]} />
            <meshStandardMaterial color="#ec4899" roughness={0.9} />
          </mesh>

          {/* Removable Cylindrical Ski Goggles */}
          <group ref={headGogglesRef} position={[0, 2.5, 6.8]} rotation={[-0.1, 0, 0]}>
            <mesh>
              <boxGeometry args={[11.5, 4.4, 2.6]} />
              <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={1.3} metalness={0.92} />
            </mesh>
            <mesh position={[0, 0, -6.5]}>
              <cylinderGeometry args={[8.4, 8.4, 2.2, 16, 1, true]} />
              <meshBasicMaterial color="#090d16" side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 6. FLYING PROPS KNOCKED OFF DURING BRAWL                  */}
      {/* ========================================================= */}
      {/* A. Flying Goggles (Knocked off by Face Punch) */}
      <group ref={flyingGogglesRef} position={[10, -114, -965]} visible={false}>
        <mesh>
          <boxGeometry args={[11.5, 4.4, 2.6]} />
          <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={1.3} metalness={0.92} />
        </mesh>
        <mesh position={[0, 0, -4]}>
          <cylinderGeometry args={[8.4, 8.4, 2.2, 16, 1, true]} />
          <meshBasicMaterial color="#090d16" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* B. Left Ski (Cartwheeling through the air) */}
      <group ref={flyingLeftSkiRef} position={[8, -135, -965]} visible={false}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6.6, 2, 56]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 4, 29]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[6.4, 1.8, 10]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.8} />
        </mesh>
        <mesh position={[0, 3, -29]} rotation={[-0.32, 0, 0]}>
          <boxGeometry args={[6.4, 1.8, 9]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.8} />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[7.0, 0.6, 57]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[2.2, 1.2, 55]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
        <mesh position={[0, 3, 7]}>
          <boxGeometry args={[5.5, 3.5, 5]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 4, -5]}>
          <boxGeometry args={[5.5, 5.5, 6]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* C. Right Ski (Cartwheeling in opposite direction) */}
      <group ref={flyingRightSkiRef} position={[16, -135, -965]} visible={false}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6.6, 2, 56]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 4, 29]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[6.4, 1.8, 10]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.8} />
        </mesh>
        <mesh position={[0, 3, -29]} rotation={[-0.32, 0, 0]}>
          <boxGeometry args={[6.4, 1.8, 9]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.8} />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[7.0, 0.6, 57]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[2.2, 1.2, 55]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
        <mesh position={[0, 3, 7]}>
          <boxGeometry args={[5.5, 3.5, 5]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 4, -5]}>
          <boxGeometry args={[5.5, 5.5, 6]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Skier status FX hook */}
      <group ref={dizzyStarsRef} visible={false} />

      {/* ========================================================= */}
      {/* 7. DYNAMIC ACTION FX & COMIC HIT BURSTS                   */}
      {/* ========================================================= */}
      <group ref={dropInSprayRef} position={[0, 810, -340]} visible={false}>
        <mesh>
          <sphereGeometry args={[4, 12, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.9} transparent opacity={0.4} />
        </mesh>
      </group>

      <group ref={landingSpray1Ref} position={[-25, 230, -710]} visible={false}>
        <mesh>
          <sphereGeometry args={[22, 16, 16]} />
          <meshBasicMaterial color="#f8fafc" transparent opacity={0.7} />
        </mesh>
      </group>

      <group ref={landingSpray2Ref} position={[20, -45, -905]} visible={false}>
        <mesh>
          <sphereGeometry args={[26, 16, 16]} />
          <meshBasicMaterial color="#f8fafc" transparent opacity={0.75} />
        </mesh>
      </group>

      {/* Massive Roostertail Hockey Stop Snow Spray Blast (Blasting directly over Skier) */}
      <group ref={hockeySprayRef} position={[2, -133, -962]} visible={false}>
        {/* Fan of flying powder angled straight at skier */}
        <mesh position={[6, 8, 0]} rotation={[-0.2, 0.4, -0.6]}>
          <coneGeometry args={[16, 32, 14, 1, true]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.82} side={THREE.DoubleSide} />
        </mesh>
        {/* Dense plume billow at board edge */}
        <mesh position={[0, 4, 0]}>
          <sphereGeometry args={[11, 12, 12]} />
          <meshBasicMaterial color="#f8fafc" transparent opacity={0.88} />
        </mesh>
        {/* Mid powder cloud surging forward toward skier */}
        <mesh position={[6, 9, 2]}>
          <sphereGeometry args={[14, 12, 12]} />
          <meshBasicMaterial color="#f1f5f9" transparent opacity={0.8} />
        </mesh>
        {/* High spray cloud hitting skier's chest and face */}
        <mesh position={[11, 16, 2]}>
          <sphereGeometry args={[15, 12, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.75} />
        </mesh>
        {/* Fine mist outer envelope */}
        <mesh position={[9, 12, 0]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[4, 16, 28, 12, 1, true]} />
          <meshBasicMaterial color="#e0f2fe" transparent opacity={0.55} side={THREE.DoubleSide} />
        </mesh>
        <pointLight color="#e0f2fe" intensity={8} distance={70} />
      </group>

      {/* GTA Visceral Punch Impact Powder & Debris Spray */}
      <group ref={punchStarRef} position={[7, -114, -965]} visible={false}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2.8, 10, 10]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[2.5, 0, 0]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[4.2, 8, 8]} />
          <meshBasicMaterial color="#f1f5f9" transparent opacity={0.85} />
        </mesh>
      </group>

      {/* GTA Heavy Snowboard Smash Powder Blast Wave */}
      <group ref={bashShockwaveRef} position={[10, -118, -965]} visible={false}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[7.5, 12, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.88} />
        </mesh>
        <mesh position={[3, 0, 0]}>
          <sphereGeometry args={[11, 12, 12]} />
          <meshBasicMaterial color="#e0f2fe" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 8. AAA HOLOGRAPHIC TYPOGRAPHY BLADE (Floating Above Trees on Right Flank) */}
      {/* ========================================================= */}
      <group position={[245, 90, -950]} rotation={[0, -0.78, 0]} scale={0.55}>
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[240, 190]} />
          <meshStandardMaterial 
            color="#040b17" 
            transparent 
            opacity={0.88} 
            roughness={0.15} 
            metalness={0.9} 
          />
        </mesh>

        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(240, 190)]} />
          <lineBasicMaterial color="#38bdf8" linewidth={2} />
        </lineSegments>

        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-105, 75, 0]}
          fontSize={8.5}
          color="#38bdf8"
          letterSpacing={0.12}
          anchorX="left"
          anchorY="middle"
        >
          EXP // 10  ◈  ALPINE AI & ACTION SPORTS OS
        </Text>

        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-105, 42, 0]}
          fontSize={36}
          color="#ffffff"
          outlineWidth={1.2}
          outlineColor="#0369a1"
          anchorX="left"
          anchorY="middle"
        >
          ELEVATE
        </Text>

        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-105, 8, 0]}
          fontSize={10.5}
          color="#38bdf8"
          maxWidth={210}
          lineHeight={1.3}
          anchorX="left"
          anchorY="middle"
        >
          AUTONOMOUS ALPINE TELEMETRY & AVALANCHE SURVIVAL
        </Text>

        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-105, -38, 0]}
          fontSize={9}
          color="#e0f2fe"
          maxWidth={210}
          lineHeight={1.45}
          anchorX="left"
          anchorY="middle"
        >
          Conquer the most extreme big-mountain terrain with real-time avalanche radar, descent trajectory optimization, and automated 4K action camera highlight tracking.
        </Text>

        <Text
          font="/fonts/Roboto.woff"
          fallbackFonts={[]}
          position={[-105, -80, 0]}
          fontSize={7.8}
          color="#f97316"
          letterSpacing={0.05}
          anchorX="left"
          anchorY="middle"
        >
          [ ◈ HELI-DROP CERTIFIED  ◈ CLIFF AIR METRICS  ◈ ZERO-FEAR ]
        </Text>
      </group>
    </group>
  );
}
