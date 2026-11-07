import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================================================
// CAPTIVATING 3D MATHEMATICAL HORN/DIPOLE TOROIDAL FIELD
// Inspired by physical magnetic dipole fields, sacred toroidal geometry,
// and tokamak fusion vortex dynamics.
//
// Key Features:
// 1. Parametric Horn/Dipole Torus (tight central vortex funnel pinch, oblate profile)
// 2. Dipole Meridian Flux Arcs (glowing from white-hot core to sapphire perimeter)
// 3. Toroidal Latitude Wireframe Rings (horizontal cross-sectional contour rings)
// 4. Counter-Twisting Helical Spirals (Villarceau diamond interference lattice)
// 5. Luminous Central Singularity Ring (waist accelerator ring inside the throat)
// 6. Circulating Plasma Flux Particles (accelerating through the core funnel)
// ============================================================================

export default function ToroidalSentaientCore({
  dynamicRadius = 300,
  itemScale = 1.0,
  appPositions = [],
  hoveredWorld = null,
  onClick
}) {
  const tiltedGroupRef = useRef();
  const fieldAssemblyRef = useRef();
  const spiralsGroupRef = useRef();
  const counterSpiralsGroupRef = useRef();
  const cycloneRef = useRef();
  const photonsRef = useRef();
  const particlesRef = useRef();
  const emblemRef = useRef();

  // Load official high-res sentAIent emblem
  const logoTex = useLoader(THREE.TextureLoader, '/sentaient_logo_final.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  // Soft holographic backing glow texture for central emblem
  const glowTex = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.50, 'rgba(255, 255, 255, 0.60)');
    grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.22)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);

  // --------------------------------------------------------------------------
  // 1. HORN / DIPOLE TORUS PARAMETRIC SCALING
  // Dynamically scaled in lockstep with dynamicRadius for perfect clearance
  // --------------------------------------------------------------------------
  const maxOuterR = Math.max(70, Math.min(125, dynamicRadius * 0.50)) * 1.04;
  const neckR = 6.0 * 1.04; // tight central hourglass vortex throat
  const R0 = (maxOuterR + neckR) / 2; // major circle center
  const r0 = (maxOuterR - neckR) / 2; // minor circle radius
  const H0 = maxOuterR * 0.38;        // oblate height
  const emblemBaseY = maxOuterR * 0.70 + 15;

  // Parametric evaluation function: returns [x, y, z] for any poloidal (u) and azimuthal (v)
  const evalFieldPoint = (u, v) => {
    const r = R0 + r0 * Math.cos(u);
    const z = H0 * Math.sin(u);
    return [r * Math.cos(v), r * Math.sin(v), z];
  };

  // --------------------------------------------------------------------------
  // 2. TRANSLUCENT ETHEREAL HORN TORUS SURFACE (Smooth Plasma Sheath)
  // --------------------------------------------------------------------------
  const hornTorusSurfaceGeo = useMemo(() => {
    const Nu = 44;
    const Nv = 56;
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i <= Nu; i++) {
      const u = (i / Nu) * Math.PI * 2 - Math.PI;
      const r = R0 + r0 * Math.cos(u);
      const z = H0 * Math.sin(u);

      // Normal in the (r, z) plane
      const nR = H0 * Math.cos(u);
      const nZ = r0 * Math.sin(u);
      const nLen = Math.hypot(nR, nZ) || 1;
      const unitNR = nR / nLen;
      const unitNZ = nZ / nLen;

      for (let j = 0; j <= Nv; j++) {
        const v = (j / Nv) * Math.PI * 2;
        const cosV = Math.cos(v);
        const sinV = Math.sin(v);

        positions.push(r * cosV, r * sinV, z);
        normals.push(unitNR * cosV, unitNR * sinV, unitNZ);
        uvs.push(j / Nv, i / Nu);
      }
    }

    for (let i = 0; i < Nu; i++) {
      for (let j = 0; j < Nv; j++) {
        const a = i * (Nv + 1) + j;
        const b = (i + 1) * (Nv + 1) + j;
        const c = (i + 1) * (Nv + 1) + (j + 1);
        const d = i * (Nv + 1) + (j + 1);

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setIndex(indices);
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    return geo;
  }, [R0, r0, H0]);

  // --------------------------------------------------------------------------
  // 3. DIPOLE MERIDIAN FLUX ARCS (Image 2 - Glowing Poloidal Field Lines)
  // --------------------------------------------------------------------------
  const { meridianGeometry } = useMemo(() => {
    const numMeridians = 32;
    const numStepsU = 48;
    const positions = [];
    const colors = [];

    const coreColor = new THREE.Color('#ffffff');      // White-hot core
    const throatColor = new THREE.Color('#00ffff');    // Laser cyan
    const shoulderColor = new THREE.Color('#00a2ff');  // Electric azure
    const rimColor = new THREE.Color('#0055ff');       // Deep sapphire blue

    for (let m = 0; m < numMeridians; m++) {
      const v = (m / numMeridians) * Math.PI * 2;
      for (let s = 0; s < numStepsU; s++) {
        const u1 = (s / numStepsU) * Math.PI * 2 - Math.PI;
        const u2 = ((s + 1) / numStepsU) * Math.PI * 2 - Math.PI;

        const [x1, y1, z1] = evalFieldPoint(u1, v);
        const [x2, y2, z2] = evalFieldPoint(u2, v);

        positions.push(x1, y1, z1, x2, y2, z2);

        // Core proximity factor: 1.0 at throat (|u| = PI), 0.0 at outer equator (u = 0)
        const t1 = Math.abs(u1) / Math.PI;
        const t2 = Math.abs(u2) / Math.PI;

        const c1 = new THREE.Color();
        if (t1 > 0.75) {
          c1.lerpColors(throatColor, coreColor, (t1 - 0.75) / 0.25);
        } else if (t1 > 0.35) {
          c1.lerpColors(shoulderColor, throatColor, (t1 - 0.35) / 0.40);
        } else {
          c1.lerpColors(rimColor, shoulderColor, t1 / 0.35);
        }

        const c2 = new THREE.Color();
        if (t2 > 0.75) {
          c2.lerpColors(throatColor, coreColor, (t2 - 0.75) / 0.25);
        } else if (t2 > 0.35) {
          c2.lerpColors(shoulderColor, throatColor, (t2 - 0.35) / 0.40);
        } else {
          c2.lerpColors(rimColor, shoulderColor, t2 / 0.35);
        }

        colors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return { meridianGeometry: geo };
  }, [R0, r0, H0]);

  // --------------------------------------------------------------------------
  // 4. TOROIDAL LATITUDE WIREFRAME RINGS (Image 1 - Concentric Parallel Rings)
  // --------------------------------------------------------------------------
  const latitudeGeometry = useMemo(() => {
    const numRings = 18;
    const numStepsV = 52;
    const positions = [];

    for (let r = 1; r < numRings; r++) {
      const u = (r / numRings) * Math.PI * 2 - Math.PI;
      for (let s = 0; s < numStepsV; s++) {
        const v1 = (s / numStepsV) * Math.PI * 2;
        const v2 = ((s + 1) / numStepsV) * Math.PI * 2;

        const [x1, y1, z1] = evalFieldPoint(u, v1);
        const [x2, y2, z2] = evalFieldPoint(u, v2);

        positions.push(x1, y1, z1, x2, y2, z2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [R0, r0, H0]);

  // --------------------------------------------------------------------------
  // 5. DUAL COUNTER-TWISTING HELICAL SPIRALS (Image 3 - Villarceau Diamond Mesh)
  // --------------------------------------------------------------------------
  const { cwSpiralGeometry, ccwSpiralGeometry } = useMemo(() => {
    const numSpirals = 16;
    const numStepsU = 52;
    const cwPositions = [];
    const ccwPositions = [];
    const cwColors = [];
    const ccwColors = [];

    const cyan = new THREE.Color('#00ffff');
    const gold = new THREE.Color('#ffaa00');
    const violet = new THREE.Color('#b355ff');

    for (let s = 0; s < numSpirals; s++) {
      const vBase = (s / numSpirals) * Math.PI * 2;
      for (let step = 0; step < numStepsU; step++) {
        const u1 = (step / numStepsU) * Math.PI * 2 - Math.PI;
        const u2 = ((step + 1) / numStepsU) * Math.PI * 2 - Math.PI;

        // Clockwise spiral winding
        const [x1A, y1A, z1A] = evalFieldPoint(u1, vBase + 2.0 * u1);
        const [x2A, y2A, z2A] = evalFieldPoint(u2, vBase + 2.0 * u2);
        cwPositions.push(x1A, y1A, z1A, x2A, y2A, z2A);

        const colA = (s % 2 === 0) ? cyan : gold;
        cwColors.push(colA.r, colA.g, colA.b, colA.r, colA.g, colA.b);

        // Counter-clockwise spiral winding
        const [x1B, y1B, z1B] = evalFieldPoint(u1, vBase - 2.0 * u1);
        const [x2B, y2B, z2B] = evalFieldPoint(u2, vBase - 2.0 * u2);
        ccwPositions.push(x1B, y1B, z1B, x2B, y2B, z2B);

        const colB = (s % 2 === 0) ? violet : cyan;
        ccwColors.push(colB.r, colB.g, colB.b, colB.r, colB.g, colB.b);
      }
    }

    const geoCW = new THREE.BufferGeometry();
    geoCW.setAttribute('position', new THREE.Float32BufferAttribute(cwPositions, 3));
    geoCW.setAttribute('color', new THREE.Float32BufferAttribute(cwColors, 3));

    const geoCCW = new THREE.BufferGeometry();
    geoCCW.setAttribute('position', new THREE.Float32BufferAttribute(ccwPositions, 3));
    geoCCW.setAttribute('color', new THREE.Float32BufferAttribute(ccwColors, 3));

    return { cwSpiralGeometry: geoCW, ccwSpiralGeometry: geoCCW };
  }, [R0, r0, H0]);

  // --------------------------------------------------------------------------
  // 6. CIRCULATING PLASMA FLUX PARTICLES (Living Fluid Motion Through Funnel)
  // --------------------------------------------------------------------------
  const { particleCount, particleData, particleInitPositions, particleColors } = useMemo(() => {
    const count = 280;
    const pData = [];
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cCyan = new THREE.Color('#00ffff');
    const cWhite = new THREE.Color('#ffffff');
    const cGold = new THREE.Color('#ffbb33');
    const cBlue = new THREE.Color('#0088ff');

    for (let i = 0; i < count; i++) {
      // Random initial poloidal phase u and azimuthal angle v
      const u = (Math.random() * 2 - 1) * Math.PI;
      const v = Math.random() * Math.PI * 2;
      const speed = 0.55 + Math.random() * 0.65;
      const spiralOffset = (Math.random() - 0.5) * 1.5;

      pData.push({ u, v, speed, spiralOffset });

      const r = R0 + r0 * Math.cos(u);
      const z = H0 * Math.sin(u);
      positions[i * 3] = r * Math.cos(v);
      positions[i * 3 + 1] = r * Math.sin(v);
      positions[i * 3 + 2] = z;

      const pick = Math.random();
      const col = pick < 0.50 ? cCyan : (pick < 0.75 ? cBlue : (pick < 0.90 ? cGold : cWhite));
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    return {
      particleCount: count,
      particleData: pData,
      particleInitPositions: positions,
      particleColors: colors
    };
  }, [R0, r0, H0]);

  // --------------------------------------------------------------------------
  // 7. MEMOIZED SYNAPSE BEAMS (Connecting Core to Perimeter Apps)
  // --------------------------------------------------------------------------
  const synapseGeometry = useMemo(() => {
    const positions = [];
    const sourceDist = maxOuterR;
    appPositions.forEach(app => {
      const targetX = app.x;
      const targetY = app.y + 18;
      const angle = Math.atan2(targetY, targetX);
      const sx = Math.cos(angle) * sourceDist;
      const sy = Math.sin(angle) * sourceDist;
      positions.push(sx, sy, 0, targetX, targetY, 0);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [appPositions, maxOuterR]);

  // --------------------------------------------------------------------------
  // 7A. SEGMENTED EQUATORIAL ACCELERATOR RING (Active High-Visibility Rotation)
  // --------------------------------------------------------------------------
  const acceleratorRingGeometry = useMemo(() => {
    const numSegments = 36;
    const positions = [];
    const colors = [];
    const cBright = new THREE.Color('#ffdd33');
    const cDim = new THREE.Color('#ff5500');
    const rIn = maxOuterR - 3.2;
    const rOut = maxOuterR + 3.2;

    for (let i = 0; i < numSegments; i++) {
      const a1 = (i / numSegments) * Math.PI * 2;
      const a2 = ((i + 0.65) / numSegments) * Math.PI * 2;
      const c = (i % 2 === 0) ? cBright : cDim;

      const nSteps = 4;
      for (let s = 0; s < nSteps; s++) {
        const t1 = a1 + (s / nSteps) * (a2 - a1);
        const t2 = a1 + ((s + 1) / nSteps) * (a2 - a1);

        positions.push(
          rIn * Math.cos(t1), rIn * Math.sin(t1), 0,
          rOut * Math.cos(t1), rOut * Math.sin(t1), 0,
          rOut * Math.cos(t1), rOut * Math.sin(t1), 0,
          rOut * Math.cos(t2), rOut * Math.sin(t2), 0,
          rIn * Math.cos(t1), rIn * Math.sin(t1), 0,
          rIn * Math.cos(t2), rIn * Math.sin(t2), 0
        );
        for (let k = 0; k < 6; k++) {
          colors.push(c.r, c.g, c.b);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [maxOuterR]);

  // --------------------------------------------------------------------------
  // 7B. CENTRAL CYCLONE HELIX VORTEX (Vertical Swirling Funnel in Throat)
  // --------------------------------------------------------------------------
  const cycloneHelixGeometry = useMemo(() => {
    const numStrands = 8;
    const steps = 36;
    const positions = [];
    const colors = [];
    const cCyan = new THREE.Color('#00ffff');
    const cWhite = new THREE.Color('#ffffff');

    for (let s = 0; s < numStrands; s++) {
      const vOffset = (s / numStrands) * Math.PI * 2;
      for (let i = 0; i < steps; i++) {
        const p1 = (i / steps) * 2 - 1;
        const p2 = ((i + 1) / steps) * 2 - 1;

        const z1 = p1 * (H0 * 0.95);
        const z2 = p2 * (H0 * 0.95);

        const rad1 = neckR + 16.0 * (p1 * p1);
        const rad2 = neckR + 16.0 * (p2 * p2);

        const a1 = vOffset + p1 * Math.PI * 2.8;
        const a2 = vOffset + p2 * Math.PI * 2.8;

        positions.push(
          rad1 * Math.cos(a1), rad1 * Math.sin(a1), z1,
          rad2 * Math.cos(a2), rad2 * Math.sin(a2), z2
        );

        const col1 = (Math.abs(p1) < 0.25) ? cWhite : cCyan;
        const col2 = (Math.abs(p2) < 0.25) ? cWhite : cCyan;
        colors.push(col1.r, col1.g, col1.b, col2.r, col2.g, col2.b);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [H0, neckR]);

  // --------------------------------------------------------------------------
  // 7C. ORBITAL ACCELERATOR PHOTONS (14 High-Speed Luminous Energy Nodes)
  // --------------------------------------------------------------------------
  const numPhotons = 14;
  const { photonInitPositions, photonColors } = useMemo(() => {
    const pos = new Float32Array(numPhotons * 3);
    const col = new Float32Array(numPhotons * 3);
    const cGold = new THREE.Color('#ffee44');
    const cCyan = new THREE.Color('#00ffff');
    for (let i = 0; i < numPhotons; i++) {
      const a = (i / numPhotons) * Math.PI * 2;
      pos[i * 3] = maxOuterR * Math.cos(a);
      pos[i * 3 + 1] = maxOuterR * Math.sin(a);
      pos[i * 3 + 2] = 0;
      const c = (i % 2 === 0) ? cGold : cCyan;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { photonInitPositions: pos, photonColors: col };
  }, [maxOuterR]);

  // --------------------------------------------------------------------------
  // 8. 60-120FPS ZERO-ALLOCATION KINETIC ANIMATION LOOP
  // --------------------------------------------------------------------------
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Side profile: vertical cyclone in the center, horizontal toroidal equator
    if (tiltedGroupRef.current) {
      tiltedGroupRef.current.rotation.x = (Math.PI / 2) - 0.20;
      tiltedGroupRef.current.rotation.y = 0;
    }

    // Steady field rotation around magnetic dipole axis (energetic spin)
    if (fieldAssemblyRef.current) {
      fieldAssemblyRef.current.rotation.z = t * 0.42;
    }

    // Swirling vertical cyclone funnel core
    if (cycloneRef.current) {
      cycloneRef.current.rotation.z = t * 1.35;
    }

    // Counter-twisting kinetic spiral waves
    if (spiralsGroupRef.current) {
      spiralsGroupRef.current.rotation.z = t * 0.55;
    }
    if (counterSpiralsGroupRef.current) {
      counterSpiralsGroupRef.current.rotation.z = -t * 0.55;
    }

    // High-speed orbital photons racing around the equatorial ring
    if (photonsRef.current) {
      const pArr = photonsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < numPhotons; i++) {
        const a = (i / numPhotons) * Math.PI * 2 + t * 0.95;
        pArr[i * 3] = maxOuterR * Math.cos(a);
        pArr[i * 3 + 1] = maxOuterR * Math.sin(a);
        pArr[i * 3 + 2] = 0;
      }
      photonsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Upright emblem floating above the toroidal field
    if (emblemRef.current) {
      emblemRef.current.position.y = emblemBaseY + Math.sin(t * 1.6) * 3;
    }

    // Fluid circulation of plasma flux particles through the vortex funnel
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];

        // Accelerate through center vortex funnel (|u| near PI), cruise at outer rim (u near 0)
        const accelFactor = 1.0 + 1.8 * Math.pow((1.0 - Math.cos(p.u)) * 0.5, 2);
        p.u += delta * p.speed * 0.9 * accelFactor;

        // Wrap around smoothly
        if (p.u > Math.PI) p.u -= Math.PI * 2;

        const currentV = p.v + p.spiralOffset * p.u + t * 0.15;
        const r = R0 + r0 * Math.cos(p.u);
        const z = H0 * Math.sin(p.u);

        arr[i * 3] = r * Math.cos(currentV);
        arr[i * 3 + 1] = r * Math.sin(currentV);
        arr[i * 3 + 2] = z;
      }
      posAttr.needsUpdate = true;
    }
  });

  // Native aspect ratio of /sentaient_logo_final.png (840 x 156 = 5.385 : 1)
  const emblemW = 140 * itemScale * 1.3;
  const emblemH = emblemW / (840 / 156);

  return (
    <group position={[0, -18, 30]} scale={itemScale}>

      {/* ------------------------------------------------------------------ */}
      {/* A. SENTAIENT LOGO (Floating gracefully ABOVE the Toroidal Field)   */}
      {/* ------------------------------------------------------------------ */}
      <group
        ref={emblemRef}
        position={[0, emblemBaseY, 20]}
      >
        {/* Holographic Backing Glow Aura for Central Logo */}
        {glowTex && (
          <group position={[0, 0, -2]}>
            {/* Subtle SentAIent Electric Cyan Halo */}
            <mesh scale={[emblemW * 1.25, emblemH * 1.8, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial
                map={glowTex}
                color="#00e5ff"
                transparent
                opacity={0.12}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
            {/* Soft Ambient Sapphire Bloom */}
            <mesh scale={[emblemW * 1.6, emblemH * 2.4, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial
                map={glowTex}
                color="#0055ff"
                transparent
                opacity={0.075}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        )}

        <mesh
          position={[0, 0, 0]}
          scale={[emblemW, emblemH, 1]}
          onClick={onClick}
          onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
          onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; }}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={logoTex}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* B. VOLUMETRIC DIRECTIONAL POINT LIGHTS FOR 3D CURVATURE HIGHLIGHTS */}
      {/* ------------------------------------------------------------------ */}
      <pointLight position={[70, 90, 80]} intensity={20} distance={380} color="#00ffff" />
      <pointLight position={[-70, -90, 70]} intensity={16} distance={320} color="#0088ff" />
      <pointLight position={[0, 0, 0]} intensity={25} distance={150} color="#00e5ff" />

      {/* ------------------------------------------------------------------ */}
      {/* C. 3D TOROIDAL FIELD (Side profile: vertical cyclone in the center)*/}
      {/* ------------------------------------------------------------------ */}
      <group ref={tiltedGroupRef} rotation={[(Math.PI / 2) - 0.20, 0, 0]}>

        {/* 1. Translucent Plasma Sheath (Custom Horn Torus Parametric Mesh) */}
        <mesh geometry={hornTorusSurfaceGeo}>
          <meshStandardMaterial
            color="#021438"
            emissive="#0033aa"
            emissiveIntensity={1.9}
            roughness={0.14}
            metalness={0.86}
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 2. Rotating Primary Field Assembly */}
        <group ref={fieldAssemblyRef}>

          {/* Dipole Meridian Flux Arcs (Image 2 - Glowing vertical loops) */}
          <lineSegments geometry={meridianGeometry}>
            <lineBasicMaterial
              vertexColors
              transparent
              opacity={0.88}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>

          {/* Toroidal Latitude Rings (Image 1 - Concentric horizontal circles) */}
          <lineSegments geometry={latitudeGeometry}>
            <lineBasicMaterial
              color="#00d9ff"
              transparent
              opacity={0.32}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>

          {/* Central Singularity Tokamak Ring (Image 2 - Glowing Hot Waist Ring) */}
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[neckR + 3.5 * 1.04, 1.8 * 1.04, 16, 48]} />
            <meshBasicMaterial
              color="#ff2277"
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[neckR + 6.0 * 1.04, 1.0 * 1.04, 14, 48]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.80}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Central Cyclone Helical Vortex Funnel (Swirling 3D Cyclone in Throat) */}
          <group ref={cycloneRef}>
            <lineSegments geometry={cycloneHelixGeometry}>
              <lineBasicMaterial
                vertexColors
                transparent
                opacity={0.88}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </lineSegments>
          </group>

          {/* Central Singularity Spindle Core Beam */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[2.5 * 1.04, 7.5 * 1.04, H0 * 1.9, 20, 1, true]} />
            <meshBasicMaterial
              color="#00e5ff"
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          {/* Segmented Equatorial Accelerator Rim (High-Visibility Rotating Ring with 36 Teeth) */}
          <lineSegments geometry={acceleratorRingGeometry}>
            <lineBasicMaterial
              vertexColors
              transparent
              opacity={0.94}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>

          {/* Luminous Equatorial Waveguide Ring Backing */}
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[maxOuterR - 1.5, maxOuterR + 1.5, 64]} />
            <meshBasicMaterial
              color="#ffaa00"
              side={THREE.DoubleSide}
              transparent
              opacity={0.55}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* High-Velocity Orbital Photons Racing Around The Equatorial Ring */}
          <points ref={photonsRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={numPhotons}
                array={photonInitPositions}
                itemSize={3}
              />
              <bufferAttribute
                attach="attributes-color"
                count={numPhotons}
                array={photonColors}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={9.36}
              vertexColors
              transparent
              opacity={0.96}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>
        </group>

        {/* 3. Counter-Twisting Helical Spirals (Image 3 - Diamond Interference Mesh) */}
        <group ref={spiralsGroupRef}>
          <lineSegments geometry={cwSpiralGeometry}>
            <lineBasicMaterial
              vertexColors
              transparent
              opacity={0.75}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        </group>
        <group ref={counterSpiralsGroupRef}>
          <lineSegments geometry={ccwSpiralGeometry}>
            <lineBasicMaterial
              vertexColors
              transparent
              opacity={0.70}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        </group>

        {/* 4. Circulating Plasma Flux Particles (Living Accelerating Energy Sparks) */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particleInitPositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particleCount}
              array={particleColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={7.28}
            vertexColors
            transparent
            opacity={0.92}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* D. CENTRAL CORE SINGULARITY (Luminous spark in the vortex throat)  */}
      {/* ------------------------------------------------------------------ */}
      <group position={[0, 0, 15]}>
        {/* Core Singularity White Spark */}
        <mesh scale={0.166}>
          <sphereGeometry args={[25, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* E. MEMOIZED SYNAPSE BEAMS (Linking Core to Perimeter Apps)         */}
      {/* ------------------------------------------------------------------ */}
      <lineSegments geometry={synapseGeometry}>
        <lineBasicMaterial
          color="#0088ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
