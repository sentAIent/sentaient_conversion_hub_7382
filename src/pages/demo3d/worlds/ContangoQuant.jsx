import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles, Float, Line, useTexture, Stars, useScroll } from '@react-three/drei';
import * as THREE from 'three';

const MobiusStrip = ({ position }) => {
  const numParticles = 4000;
  const meshRef = useRef();

  const particles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < numParticles; i++) {
      // Mobius strip parametric equation
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * 150; // width of the strip
      
      const R = 400; // Radius
      const x = (R + v * Math.cos(u / 2)) * Math.cos(u);
      const y = v * Math.sin(u / 2);
      const z = (R + v * Math.cos(u / 2)) * Math.sin(u);
      
      pts.push({
        pos: new THREE.Vector3(x, y, z),
        u: u,
        v: v,
        speed: Math.random() * 0.5 + 0.2,
        color: new THREE.Color(Math.random() > 0.5 ? '#00f3ff' : '#0077ff')
      });
    }
    return pts;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    particles.forEach((p, i) => {
      // Move particles along the strip over time
      const currentU = (p.u + time * p.speed) % (Math.PI * 2);
      
      const R = 400;
      const x = (R + p.v * Math.cos(currentU / 2)) * Math.cos(currentU);
      const y = p.v * Math.sin(currentU / 2);
      const z = (R + p.v * Math.cos(currentU / 2)) * Math.sin(currentU);
      
      dummy.position.set(x, y, z);
      
      // Make them pulse
      const scale = 1.5 + Math.sin(time * p.speed * 5 + i) * 0.8;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, p.color);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group position={position}>
      <instancedMesh ref={meshRef} args={[new THREE.PlaneGeometry(2, 2), null, numParticles]}>
        <meshBasicMaterial transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </instancedMesh>
    </group>
  );
};

const DataLines = () => {
  const lines = useMemo(() => {
    return Array.from({ length: 30 }).map(() => {
      const points = [];
      const yBase = (Math.random() - 0.5) * 800;
      const radius = 600 + Math.random() * 400;
      const startAngle = Math.random() * Math.PI * 2;
      for (let i = 0; i <= 50; i++) {
        const angle = startAngle + (i / 50) * Math.PI * 1.5;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, yBase + Math.sin(angle * 8) * 50, Math.sin(angle) * radius));
      }
      return { points, color: Math.random() > 0.5 ? '#00f3ff' : '#ffffff' };
    });
  }, []);

  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <Line key={i} points={line.points} color={line.color} lineWidth={2} transparent opacity={0.4} />
      ))}
    </group>
  );
};



const ContangoQuant = ({ position, rotation, visible }) => {
  const scroll = useScroll();
  const [locked, setLocked] = useState(false);
  const lockRef = useRef({ triggered: false, timer: 0 });

  useFrame((state, delta) => {
    if (!visible) return;
    
    const p = scroll.offset;
    
    // Trigger lock in Contango
    if (!lockRef.current.triggered && p >= 0.92) {
      lockRef.current.triggered = true;
      setLocked(true);
      window.contangoLocked = true;
      if (scroll.el) {
        scroll.el.style.overflow = 'hidden';
        scroll.el.scrollTop = 0.93 * (scroll.el.scrollHeight - scroll.el.clientHeight);
      }
    }
    
    if (window.contangoLocked) {
      if (scroll.el) {
        scroll.el.scrollTop = 0.93 * (scroll.el.scrollHeight - scroll.el.clientHeight);
      }
      lockRef.current.timer += delta;
      // Unlock after 1.5 seconds
      if (lockRef.current.timer > 1.5) {
        window.contangoLocked = false;
        setLocked(false);
        if (scroll.el) scroll.el.style.overflow = 'auto';
      }
    }
  });

  return (
    <group visible={visible} position={position} rotation={rotation}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 500, 500]} intensity={1.5} color="#ffffff" />
      <spotLight position={[-500, 500, 500]} intensity={2.0} color="#00f3ff" penumbra={1} />
      <spotLight position={[500, -500, 500]} intensity={2.0} color="#0077ff" penumbra={1} />
      
      {/* Infinite Dark Void Background */}
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[3000, 64, 64]} />
        <meshBasicMaterial color="#010204" side={THREE.BackSide} />
      </mesh>

      <DataLines />
      <Stars radius={1500} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* 3D Logo / Title */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1} floatingRange={[-10, 10]}>
        <React.Suspense fallback={null}>

        </React.Suspense>

        <Text
          position={[0, 250, -800]}
          fontSize={100}
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
        >
          CONTANGO QUANT
        </Text>
        <Text
          position={[0, 120, -800]}
          fontSize={35}
          color="#00f3ff"
          anchorX="center"
          anchorY="middle"
          maxWidth={800}
          textAlign="center"
        >
          The physics of finance
        </Text>
      </Float>

      {/* Centerpiece: Glowing Mobius Strip */}
      <MobiusStrip position={[0, -100, -800]} />

      {/* Ambient Data Particles */}
      <Sparkles count={4000} scale={3000} size={25} speed={0.6} opacity={0.5} color="#00f3ff" position={[0, 0, -500]} />
    </group>
  );
};

export default ContangoQuant;
