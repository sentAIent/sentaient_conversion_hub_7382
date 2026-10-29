import React, { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MockBackend } from '../utils/mockBackend';
import * as THREE from 'three';

export function GhostRiders() {
  const [ghostRuns, setGhostRuns] = useState([]);
  const timeRef = useRef(0);

  useEffect(() => {
    if (MockBackend && MockBackend.getGhostRuns) {
      MockBackend.getGhostRuns().then(runs => setGhostRuns(runs || []));
    }
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta * 60; // Normalize time for 60fps frame array playback
  });

  if (!ghostRuns || ghostRuns.length === 0) return null;

  return (
    <>
      {ghostRuns.map((run, index) => (
        <GhostRider key={index} run={run} timeRef={timeRef} />
      ))}
    </>
  );
}

function GhostRider({ run, timeRef }) {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current || !run || run.length === 0) return;
    const frameIndex = Math.floor(timeRef.current) % run.length;
    const frame = run[frameIndex];
    if (frame) {
      meshRef.current.position.set(frame.x, frame.y, frame.z);
      meshRef.current.rotation.set(0, frame.r, 0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.5, 1.5, 0.5]} />
      <meshStandardMaterial color="#00ffff" transparent opacity={0.3} emissive="#00ffff" emissiveIntensity={0.5} />
    </mesh>
  );
}
