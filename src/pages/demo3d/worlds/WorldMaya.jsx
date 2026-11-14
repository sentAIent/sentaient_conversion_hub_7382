import React, { useRef, useMemo, useState, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Sparkles, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

// Preload the high-res realistic female human avatar model
useGLTF.preload('/avatars/maya-holo.glb', true, true);

// ===========================================================================
// WORLD MAYA: Star Wars Holographic Female Human Avatar
// Pure self-luminous Star Wars holoprojector aesthetic: glowing electric
// cyan-blue light, incandescent Fresnel rim silhouette, crisp animated
// horizontal scanlines, subtle transmission flicker, natural relaxed pose,
// and zero enclosing tube.
// ===========================================================================

function findBone(root, name) {
  let match = null;
  const target = name.toLowerCase();
  root.traverse((node) => {
    if (match || !node.name) return;
    const n = node.name.toLowerCase();
    if (n === target || n.endsWith(':' + target)) {
      match = node;
    }
  });
  return match;
}

/**
 * Star Wars Holographic Female Human
 * Uses MeshBasicMaterial + onBeforeCompile so the avatar is 100% self-luminous
 * (no muddy dark directional shadows), preserving facial/hair/coat detail
 * inside a crisp, glowing Star Wars cyan-blue scanline hologram.
 */
function StarWarsHoloAvatar({ hovered, speechActive }) {
  const avatarGroupRef = useRef();
  const { scene } = useGLTF('/avatars/maya-holo.glb', true, true);

  const holoUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHoloShadow: { value: new THREE.Color('#031b38') },
    uHoloColor: { value: new THREE.Color('#00d8ff') },
    uRimColor: { value: new THREE.Color('#e8ffff') }
  }), []);

  const { avatar, poseBones } = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene);

    cloned.traverse((child) => {
      if (child.isMesh) {
        const meshName = (child.name || '').toLowerCase();
        // Hide internal teeth and glasses so eyes & face stay crystal clear
        if (meshName.includes('teeth') || meshName.includes('glasses')) {
          child.visible = false;
          return;
        }

        child.castShadow = false;
        child.receiveShadow = false;
        child.frustumCulled = false;

        const isEye = meshName.includes('eye');
        const origMap = child.material?.map || null;
        const holoMat = new THREE.MeshBasicMaterial({
          map: origMap,
          color: '#ffffff',
          transparent: true,
          opacity: 0.94,
          depthWrite: true,
          side: THREE.FrontSide
        });
        holoMat.customProgramCacheKey = () => (isEye ? 'star-wars-holo-eye-v5' : 'star-wars-holo-body-v5');

        holoMat.onBeforeCompile = (shader) => {
          shader.uniforms.uTime = holoUniforms.uTime;
          shader.uniforms.uHoloShadow = holoUniforms.uHoloShadow;
          shader.uniforms.uHoloColor = holoUniforms.uHoloColor;
          shader.uniforms.uRimColor = holoUniforms.uRimColor;

          shader.vertexShader = `
            varying vec3 vHoloWorldPos;
            varying vec3 vHoloNormal;
            varying vec3 vHoloViewDir;
            ` + shader.vertexShader.replace(
              '#include <project_vertex>',
              `
              #include <project_vertex>
              vHoloWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
              vHoloNormal = normalize(transformedNormal + vec3(0.0, 0.0, 0.0001));
              vHoloViewDir = normalize(-mvPosition.xyz + vec3(0.0, 0.0, 0.0001));
              `
            );

          shader.fragmentShader = `
            uniform float uTime;
            uniform vec3 uHoloShadow;
            uniform vec3 uHoloColor;
            uniform vec3 uRimColor;
            varying vec3 vHoloWorldPos;
            varying vec3 vHoloNormal;
            varying vec3 vHoloViewDir;
            ` + shader.fragmentShader.replace(
              '#include <dithering_fragment>',
              `
              #include <dithering_fragment>

              // 1. Strong Fresnel Silhouette Rim Glow (drives Bloom halo around her exact silhouette)
              vec3 viewDir = normalize(vHoloViewDir + vec3(0.0, 0.0, 0.0001));
              vec3 norm = normalize(vHoloNormal + vec3(0.0, 0.0, 0.0001));
              float ndotv = clamp(abs(dot(viewDir, norm)), 0.0, 1.0);
              float fresnel = pow(1.0 - ndotv, 1.85);

              // 2. Sculpted 3D Rim/Key Shading so face, eyes, hair, and limbs keep crisp form
              float keyLight = clamp(dot(norm, normalize(vec3(0.35, 0.65, 0.70))), 0.0, 1.0);
              float sculpt = 0.42 + 0.58 * keyLight;

              // 3. Unmistakable Star Wars Horizontal Scanlines + Fine Interlacing
              float scanWave = sin(vHoloWorldPos.y * 1.25 - uTime * 4.5) * 0.5 + 0.5;
              float scanMod = 0.45 + 0.68 * pow(scanWave, 2.0);
              float fineScan = sin(vHoloWorldPos.y * 4.8 + uTime * 2.2) * 0.5 + 0.5;

              // 4. Sweeping Holoprojector Beam + Subtle Transmission Flicker
              float sweep = exp(-pow(fract(vHoloWorldPos.y * 0.004 - uTime * 0.24) - 0.5, 2.0) * 85.0);
              float glitch = step(0.988, sin(vHoloWorldPos.y * 0.14 + uTime * 15.0)) * 0.35;
              float flicker = 0.91 + 0.09 * sin(uTime * 29.0) * cos(uTime * 13.0);

              // 5. Translucent Star Wars Cyan Core + Incandescent Rim Halo
              float lum = clamp(dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114)), 0.0, 1.0);
              float detail = clamp(pow(lum, 0.92) * sculpt, 0.0, 1.0);
              vec3 holoCore = mix(uHoloShadow * 0.8, uHoloColor * 0.85, detail * 0.85 + 0.08);

              vec3 finalColor = holoCore * scanMod;
              finalColor += uHoloColor * (fineScan * 0.12 + sweep * 0.42 + glitch);
              finalColor = mix(finalColor, uRimColor * 2.1, fresnel * 0.95);
              finalColor *= flicker;

              // Translucent interior (0.58..0.96) that lets space glow subtly through while rim stays bright
              float alpha = clamp((0.58 + fresnel * 0.40) * (0.76 + scanWave * 0.24) * flicker, 0.42, 0.98);
              gl_FragColor = vec4(finalColor, alpha);
              `
            );
        };

        child.material = holoMat;
      }
    });

    // Gently relax Ready Player Me A-pose arms into a natural poised stance
    const lArm = findBone(cloned, 'LeftArm');
    const rArm = findBone(cloned, 'RightArm');
    const lForearm = findBone(cloned, 'LeftForeArm');
    const rForearm = findBone(cloned, 'RightForeArm');
    const head = findBone(cloned, 'Head');
    const spine2 = findBone(cloned, 'Spine2');

    if (lArm) lArm.rotateX(0.32);
    if (rArm) rArm.rotateX(0.32);
    if (lForearm) lForearm.rotateZ(0.08);
    if (rForearm) rForearm.rotateZ(-0.08);

    return {
      avatar: cloned,
      poseBones: {
        head,
        headBaseQ: head ? head.quaternion.clone() : null,
        spine2,
        spine2BaseQ: spine2 ? spine2.quaternion.clone() : null,
        lArm,
        lArmBaseQ: lArm ? lArm.quaternion.clone() : null,
        rArm,
        rArmBaseQ: rArm ? rArm.quaternion.clone() : null
      }
    };
  }, [scene, holoUniforms]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    holoUniforms.uTime.value = t;

    // Subtle poised breathing & head/arm micro-motion
    if (poseBones.head && poseBones.headBaseQ) {
      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(Math.sin(t * 0.9) * 0.025, Math.sin(t * 0.55) * 0.06, 0)
      );
      poseBones.head.quaternion.copy(poseBones.headBaseQ).multiply(q);
    }
    if (poseBones.spine2 && poseBones.spine2BaseQ) {
      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(Math.sin(t * 1.4) * 0.018, 0, 0)
      );
      poseBones.spine2.quaternion.copy(poseBones.spine2BaseQ).multiply(q);
    }
    if (poseBones.lArm && poseBones.lArmBaseQ) {
      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(Math.sin(t * 1.4) * 0.02, 0, 0)
      );
      poseBones.lArm.quaternion.copy(poseBones.lArmBaseQ).multiply(q);
    }
    if (poseBones.rArm && poseBones.rArmBaseQ) {
      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(Math.sin(t * 1.4) * 0.02, 0, 0)
      );
      poseBones.rArm.quaternion.copy(poseBones.rArmBaseQ).multiply(q);
    }

    if (avatarGroupRef.current) {
      avatarGroupRef.current.position.y = -179;
      avatarGroupRef.current.rotation.y = Math.sin(t * 0.35) * 0.08;
    }
  });

  const auraMaterial = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color('#00e5ff') },
      uIntensity: { value: 0.42 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec2 vUv;
      void main() {
        vec2 centered = (vUv - 0.5) * vec2(2.2, 1.5);
        float distSq = dot(centered, centered);
        float glow = exp(-distSq * 4.2) * uIntensity;
        gl_FragColor = vec4(uColor * glow, glow);
      }
    `
  }), []);

  return (
    <group ref={avatarGroupRef} position={[0, -179, 60]}>
      {/* Soft Gaussian cyan aura radiating around her silhouette (no hard edges) */}
      <mesh position={[0, 155, -18]} material={auraMaterial}>
        <planeGeometry args={[280, 380]} />
      </mesh>

      <primitive object={avatar} scale={[175, 175, 175]} />

      {/* Subtle rising holographic photon sparks */}
      <Sparkles
        count={120}
        scale={[120, 280, 120]}
        position={[0, 150, 0]}
        size={hovered ? 7 : 4.5}
        speed={1.2}
        opacity={hovered ? 0.8 : 0.5}
        color="#00e5ff"
      />
    </group>
  );
}

/**
 * Minimal Sparkle Fallback while GLB loads (NO tube)
 */
function StarWarsHoloFallback() {
  return (
    <group position={[0, -80, 60]}>
      <Sparkles count={100} scale={[70, 190, 70]} size={6} speed={1.4} color="#00e5ff" />
    </group>
  );
}

/**
 * WORLD MAYA: Star Wars Hologram Stage
 */
export default function WorldMaya({ position, visible }) {
  const [avatarHovered, setAvatarHovered] = useState(false);
  const [speechActive, setSpeechActive] = useState(true);

  const logoTex = useLoader(THREE.TextureLoader, '/maya_logo_final.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;

  const voiceOrbitsRef = useRef();

  const playChime = (freq = 523.25, duration = 0.35, type = 'sine') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!window._mayaAudioCtx) {
        window._mayaAudioCtx = new AudioCtx();
      }
      const ctx = window._mayaAudioCtx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay handled safely
    }
  };

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    if (voiceOrbitsRef.current) {
      voiceOrbitsRef.current.children.forEach((orbit, idx) => {
        const speed = (idx + 1) * 0.22;
        orbit.rotation.z = t * (idx % 2 === 0 ? speed : -speed);
        orbit.rotation.x = Math.sin(t * 0.4 + idx) * 0.16;
      });
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* Atmospheric Lighting */}
      <ambientLight intensity={0.8} color="#082038" />
      <pointLight position={[0, -60, 220]} intensity={32} distance={1000} color="#00e5ff" />
      <pointLight position={[0, -160, 80]} intensity={avatarHovered ? 40 : 28} distance={500} color="#00e5ff" />

      {/* Atmospheric Starfield Sparkles */}
      <Sparkles count={600} scale={[1800, 900, 1800]} size={9} speed={0.35} opacity={0.6} color="#00e5ff" position={[0, 40, 80]} />
      <Sparkles count={350} scale={[1400, 700, 1400]} size={7} speed={0.45} opacity={0.45} color="#38bdf8" position={[0, 30, 80]} />

      {/* Deep Obsidian Mirror Floor */}
      <mesh position={[0, -200, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4800, 4800]} />
        <meshStandardMaterial color="#020713" roughness={0.06} metalness={0.96} />
      </mesh>

      {/* Floor Holoprojector Base (flat on floor, NO tube) */}
      <mesh position={[0, -195, 60]}>
        <cylinderGeometry args={[280, 320, 16, 48]} />
        <meshStandardMaterial color="#040e1c" roughness={0.08} metalness={0.96} />
      </mesh>

      {[140, 210, 275].map((radius, idx) => (
        <mesh key={idx} position={[0, -186, 60]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 3, 64]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? "#00e5ff" : "#38bdf8"}
            transparent
            opacity={0.65 - idx * 0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Center Emitter Lens Disc */}
      <mesh position={[0, -183, 60]}>
        <cylinderGeometry args={[85, 98, 6, 32]} />
        <meshStandardMaterial color="#061830" roughness={0.12} metalness={0.95} />
      </mesh>
      <mesh position={[0, -179, 60]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[72, 83, 48]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={3.2} />
      </mesh>

      {/* THE FEMALE HUMAN STAR WARS HOLOGRAM */}
      <group
        onPointerOver={(e) => { e.stopPropagation(); setAvatarHovered(true); playChime(659.25, 0.35, 'triangle'); }}
        onPointerOut={(e) => { e.stopPropagation(); setAvatarHovered(false); }}
        onClick={(e) => { e.stopPropagation(); setSpeechActive(prev => !prev); playChime(523.25, 0.45, 'sine'); }}
      >
        <Suspense fallback={<StarWarsHoloFallback />}>
          <StarWarsHoloAvatar hovered={avatarHovered} speechActive={speechActive} />
        </Suspense>
      </group>

      {/* Subtle Orbital Telemetry Rings */}
      <group ref={voiceOrbitsRef} position={[0, -65, 60]}>
        {[125, 165].map((radius, idx) => (
          <mesh key={idx} rotation={[Math.PI / 3 + idx * 0.4, idx * 0.5, 0]}>
            <torusGeometry args={[radius, 0.9, 16, 80]} />
            <meshBasicMaterial
              color={idx === 0 ? "#00e5ff" : "#38bdf8"}
              transparent
              opacity={0.28 - idx * 0.08}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* Floating Maya Emblem, Identity & ENTER APP CTA */}
      <Float speed={1.5} rotationIntensity={0.04} floatIntensity={0.25}>
        <group position={[0, 224, 60]}>
          <mesh position={[0, 26, 0]}>
            <planeGeometry args={[60, 28]} />
            <meshBasicMaterial map={logoTex} transparent opacity={0.95} depthWrite={false} />
          </mesh>

          <Text
            font="/fonts/Roboto.woff"
            fallbackFonts={[]}
            position={[0, -10, 0]}
            fontSize={22}
            color="#00e5ff"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
            outlineWidth={0.4}
            outlineColor="#000000"
          >
            MAYA
          </Text>

          <Text
            font="/fonts/Roboto.woff"
            fallbackFonts={[]}
            position={[0, -44, 0]}
            fontSize={18}
            lineHeight={1.25}
            maxWidth={340}
            textAlign="center"
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.3}
            outlineColor="#000000"
            letterSpacing={0.04}
          >
            {"Empathetic Conversational Intelligence\n& 24/7 Enterprise Representative"}
          </Text>

          <group
            position={[0, -82, 6]}
            onClick={(e) => {
              e.stopPropagation();
              window.open('/maya/index.html', '_blank', 'noopener,noreferrer');
            }}
            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; }}
          >
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[84, 18]} />
              <meshStandardMaterial
                color="#0284c7"
                emissive="#00e5ff"
                emissiveIntensity={2.4}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            <mesh position={[0, 0, 1]}>
              <planeGeometry args={[86, 20]} />
              <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.4} />
            </mesh>
            <Text
              font="/fonts/Roboto.woff"
              fallbackFonts={[]}
              position={[0, -0.5, 2]}
              fontSize={7.2}
              color="#ffffff"
              anchorX="center"
              fontWeight="bold"
              letterSpacing={0.08}
            >
              ENTER APP  ➔
            </Text>
          </group>
        </group>
      </Float>
    </group>
  );
}
