import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Platform } from 'react-native';
import { getTerrainHeight, getTerrainNormal } from '../utils/terrainUtils';
import { CarveTrail } from './CarveTrail';

// Custom Hook for all snowboarding keyboard controls
function useControls() {
  const keys = useRef({ 
    skate: false, brake: false, left: false, right: false, 
    jump: false, cameraCycle: false, grab: false 
  });
  
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handleKeyDown = (e) => {
      switch(e.code) {
        case 'KeyW': case 'ArrowUp': keys.current.skate = true; break;
        case 'KeyS': case 'ArrowDown': keys.current.brake = true; break;
        case 'KeyA': case 'ArrowLeft': keys.current.left = true; break;
        case 'KeyD': case 'ArrowRight': keys.current.right = true; break;
        case 'Space': keys.current.jump = true; break;
        case 'KeyC': keys.current.cameraCycle = true; break;
        case 'ShiftLeft': case 'ShiftRight': keys.current.grab = true; break;
      }
    };
    const handleKeyUp = (e) => {
      switch(e.code) {
        case 'KeyW': case 'ArrowUp': keys.current.skate = false; break;
        case 'KeyS': case 'ArrowDown': keys.current.brake = false; break;
        case 'KeyA': case 'ArrowLeft': keys.current.left = false; break;
        case 'KeyD': case 'ArrowRight': keys.current.right = false; break;
        case 'Space': keys.current.jump = false; break;
        case 'KeyC': keys.current.cameraCycle = false; break;
        case 'ShiftLeft': case 'ShiftRight': keys.current.grab = false; break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  return keys;
}

export function Player({ gameStarted = true, goggleColor = '#ff9900', camDistance = 4, camHeight = 1.5 }) {
  const { camera } = useThree();
  const controls = useControls();
  
  const [animState, setAnimState] = useState({ carving: 0, inAir: false, grabbing: false, wipeout: false });
  const [cameraMode, setCameraMode] = useState(0); 
  const lastCamToggle = useRef(0);
  
  // Custom Kinematic Physics
  const pos = useRef(new THREE.Vector3(0, 50, 0));
  const vel = useRef(new THREE.Vector3(0, 0, 0));
  
  const boardRotation = useRef(0);
  const angularVel = useRef(0);
  const carvingIntensity = useRef(0);
  
  // Game state
  const score = useRef(0);
  const [displayScore, setDisplayScore] = useState(0);
  const lastJump = useRef(0);
  const trickRotation = useRef(new THREE.Vector3(0,0,0));
  const totalAirRotation = useRef(new THREE.Vector3(0,0,0));
  const [trickMsg, setTrickMsg] = useState("");
  const comboMultiplier = useRef(1);
  const wasInAir = useRef(false);
  const isWipeout = useRef(false);
  const wipeoutTimer = useRef(0);
  
  const visualRef = useRef();

  useFrame((state, delta) => {
    if (!gameStarted) return;
    const dt = Math.min(delta, 0.05);
    const now = Date.now();
    
    if (isWipeout.current) {
      wipeoutTimer.current -= dt;
      if (wipeoutTimer.current <= 0) {
        isWipeout.current = false;
        pos.current.y += 5; // Pop up
        vel.current.set(0,0,0);
        trickRotation.current.set(0,0,0);
        totalAirRotation.current.set(0,0,0);
        boardRotation.current = 0;
      }
      setAnimState({ carving: 0, inAir: false, grabbing: false, wipeout: true });
      return;
    }

    const { skate, brake, left, right, jump, cameraCycle } = controls.current;

    // Camera Toggle
    if (cameraCycle && now - lastCamToggle.current > 300) {
      setCameraMode((prev) => (prev + 1) % 3);
      lastCamToggle.current = now;
    }

    // GROUND COLLISION & NORMAL
    const px = pos.current.x;
    const pz = pos.current.z;
    const groundY = getTerrainHeight(px, pz) - 5;
    const groundNormalObj = getTerrainNormal(px, pz);
    const groundNormal = new THREE.Vector3(groundNormalObj.x, groundNormalObj.y, groundNormalObj.z);

    let inAir = pos.current.y > groundY + 0.5;
    const gravity = new THREE.Vector3(0, -60, 0); // Heavy gravity

    if (inAir) {
      vel.current.addScaledVector(gravity, dt);
      
      // Trick System
      let deltaX = 0, deltaY = 0, deltaZ = 0;
      if (jump) { deltaX = 6 * dt; deltaZ = 4 * dt; }
      if (left) deltaY = 7 * dt;
      if (right) deltaY = -7 * dt;
      
      trickRotation.current.x += deltaX;
      trickRotation.current.y += deltaY;
      trickRotation.current.z += deltaZ;
      
      totalAirRotation.current.x += Math.abs(deltaX);
      totalAirRotation.current.y += Math.abs(deltaY);
      totalAirRotation.current.z += Math.abs(deltaZ);
      
      if (controls.current.grab) score.current += (50 * dt * comboMultiplier.current);
      
    } else {
      // LANDING WIPE OUT CHECK
      if (wasInAir.current) {
        // Did they land flat?
        const trickFlat = Math.abs(Math.sin(trickRotation.current.x)) < 0.5 && 
                          Math.abs(Math.sin(trickRotation.current.z)) < 0.5;
        
        if (!trickFlat) {
          isWipeout.current = true;
          wipeoutTimer.current = 1.5;
          setTrickMsg("WIPEOUT!");
          comboMultiplier.current = 1;
        } else {
          // Success
          const spins = Math.floor(totalAirRotation.current.y / Math.PI);
          const flips = Math.floor(totalAirRotation.current.x / (Math.PI * 2));
          if (spins > 0 || flips > 0) {
            const spinName = spins > 0 ? `${spins * 180}` : '';
            const flipName = flips > 0 ? (flips > 1 ? `Double Flip` : `Flip`) : '';
            const trickScore = (spins * 500) + (flips * 1000);
            comboMultiplier.current += 0.5;
            score.current += (trickScore * comboMultiplier.current);
            setTrickMsg(`Sick ${spinName} ${flipName}! +${trickScore}`);
            setTimeout(() => setTrickMsg(""), 2000);
          } else {
            comboMultiplier.current = 1;
          }
        }
        totalAirRotation.current.set(0,0,0);
        trickRotation.current.set(0,0,0);
      }

      // Physics on Ground
      pos.current.y = groundY;
      
      const normalForce = groundNormal.clone().multiplyScalar(gravity.dot(groundNormal));
      const slopeForce = gravity.clone().sub(normalForce);
      vel.current.addScaledVector(slopeForce, dt);
      
      vel.current.multiplyScalar(0.98); // Friction
      
      // Steering & Momentum
      const speed = vel.current.length();
      if (left) angularVel.current += 3 * dt;
      if (right) angularVel.current -= 3 * dt;
      angularVel.current *= 0.85; 
      
      boardRotation.current += angularVel.current * dt;
      
      const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), boardRotation.current);
      
      if (speed > 1) {
         const drift = 0.95; 
         const alignedVel = forward.clone().multiplyScalar(speed);
         vel.current.lerp(alignedVel, drift * dt * 10);
      }
      
      if (skate && speed < 40) vel.current.addScaledVector(forward, 25 * dt);
      if (brake) vel.current.multiplyScalar(0.9);
      
      if (jump && now - lastJump.current > 500) {
        vel.current.y += 20; 
        lastJump.current = now;
        pos.current.y += 0.5; 
      }
      
      carvingIntensity.current = Math.abs(angularVel.current) * speed;
    }
    
    wasInAir.current = inAir;
    pos.current.addScaledVector(vel.current, dt);

    // Update visuals
    if (visualRef.current) {
      visualRef.current.position.copy(pos.current);
      
      const forward = new THREE.Vector3(0,0,-1).applyAxisAngle(new THREE.Vector3(0,1,0), boardRotation.current);
      const targetRotation = new THREE.Matrix4().lookAt(
        new THREE.Vector3(0,0,0),
        forward,
        inAir ? new THREE.Vector3(0,1,0) : groundNormal
      );
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(targetRotation);
      
      if (inAir) {
        const tqx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), trickRotation.current.x);
        const tqy = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), trickRotation.current.y);
        const tqz = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), trickRotation.current.z);
        targetQuat.multiply(tqy).multiply(tqx).multiply(tqz);
      }
      
      visualRef.current.quaternion.slerp(targetQuat, 0.2);
    }
    
    setAnimState({ carving: Math.sign(angularVel.current), inAir, grabbing: inAir && controls.current.grab, wipeout: false });

    // Scoring
    score.current += Math.max(0, vel.current.length() * dt * comboMultiplier.current);
    if (Math.floor(state.clock.elapsedTime * 10) % 2 === 0) {
      if (Math.abs(displayScore - score.current) > 10) setDisplayScore(Math.floor(score.current));
    }
    
    // Camera
    const playerV = pos.current.clone();
    if (cameraMode === 0) {
      const idealOffset = new THREE.Vector3(0, camHeight * 4, camDistance * 4);
      idealOffset.applyAxisAngle(new THREE.Vector3(0,1,0), boardRotation.current);
      idealOffset.add(playerV);
      
      const lookAt = playerV.clone().add(new THREE.Vector3(0,0,-20).applyAxisAngle(new THREE.Vector3(0,1,0), boardRotation.current));
      
      camera.position.lerp(idealOffset, 0.1);
      camera.lookAt(lookAt);
      
      const speed = vel.current.length();
      camera.fov = THREE.MathUtils.lerp(camera.fov, 60 + Math.min(speed * 0.5, 40), 0.1);
      camera.updateProjectionMatrix();
    }
  });

  return (
    <group>
      <Html position={[0, 3, 0]} center zIndexRange={[100, 0]}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', padding: '10px', width: '350px' }}>
          <div style={{
             background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)',
             border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px',
             padding: '12px 36px', color: '#fff', fontSize: 48, fontWeight: '900', fontStyle: 'italic',
             textShadow: '0 0 20px rgba(0, 208, 255, 0.8)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
             display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <div style={{ fontSize: 16, color: '#00d0ff', letterSpacing: 2 }}>SCORE</div>
            {displayScore.toLocaleString()}
            <div style={{ fontSize: 24, color: '#ff9900', marginTop: -5 }}>x{comboMultiplier.current.toFixed(1)}</div>
          </div>
          {trickMsg && (
            <div style={{ color: isWipeout.current ? '#ff3333' : '#00ffcc', fontSize: 32, fontWeight: '900', fontStyle: 'italic', textShadow: `0 0 15px ${isWipeout.current ? '#ff3333' : '#00ffcc'}`, marginTop: 20 }}>
              {trickMsg}
            </div>
          )}
        </div>
      </Html>

      <group ref={visualRef} scale={[4, 4, 4]}>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.4, 0.05, 1.8]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} emissive="#00d0ff" emissiveIntensity={0.8} />
        </mesh>
        <SnowboarderAvatar animState={animState} goggleColor={goggleColor} />
      </group>
      
      <CarveTrail playerPos={pos} carvingIntensity={carvingIntensity} />
    </group>
  );
}

export function SnowboarderAvatar({ animState, goggleColor }) {
  const { carving, inAir, grabbing, wipeout } = animState;
  
  if (wipeout) {
    return (
      <group position={[0, -0.4, 0]}>
        <group position={[0, 0.1, 0]} rotation={[1.5, 0, Math.random()]}>
           <mesh position={[0,0,0]}><boxGeometry args={[0.35, 0.5, 0.2]} /><meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} /></mesh>
        </group>
      </group>
    );
  }
  
  const defaultLegBent = 0.2;
  const leftLegRot = inAir ? (grabbing ? 0.8 : 0.4) : (carving === -1 ? 0.6 : defaultLegBent);
  const rightLegRot = inAir ? (grabbing ? -0.8 : -0.4) : (carving === 1 ? -0.6 : -defaultLegBent);
  const bodyLeanZ = carving === -1 ? -0.3 : (carving === 1 ? 0.3 : 0);
  const bodyLeanX = inAir ? (grabbing ? 0.6 : 0) : 0;
  
  const leftArmRotZ = inAir && grabbing ? -1.5 : (inAir ? -1.0 : -0.3);
  const leftArmRotX = inAir && grabbing ? 0.5 : 0;
  const rightArmRotZ = inAir && grabbing ? 1.0 : (inAir ? 1.0 : 0.3);

  // Ultra-realistic materials
  const suitMaterial = <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />;
  const skinMaterial = <meshStandardMaterial color="#8d5524" roughness={0.4} />;
  const gloveMaterial = <meshStandardMaterial color="#0f0f0f" roughness={0.9} />;

  return (
    <group position={[0, -0.4, 0]}>
      <group position={[0, 0.6, 0]} rotation={[bodyLeanX, 1.57, bodyLeanZ]}>
        <mesh position={[0, 0, 0]}><boxGeometry args={[0.35, 0.55, 0.22]} />{suitMaterial}</mesh>
        <mesh position={[0, 0.38, 0]}><boxGeometry args={[0.18, 0.22, 0.18]} />{skinMaterial}</mesh>
        <mesh position={[0, 0.42, 0]}><boxGeometry args={[0.2, 0.18, 0.2]} /><meshStandardMaterial color="#222" roughness={0.3} metalness={0.5} /></mesh>
        <mesh position={[0, 0.38, -0.1]}><boxGeometry args={[0.18, 0.08, 0.05]} /><meshStandardMaterial color="#000" emissive={goggleColor} emissiveIntensity={1.5} /></mesh>
        
        <group position={[-0.22, 0.15, 0]} rotation={[leftArmRotX, 0, leftArmRotZ]}>
          <mesh position={[0, -0.2, 0]}><boxGeometry args={[0.12, 0.4, 0.12]} />{suitMaterial}</mesh>
          <mesh position={[0, -0.42, 0]}><boxGeometry args={[0.13, 0.1, 0.13]} />{gloveMaterial}</mesh>
        </group>
        <group position={[0.22, 0.15, 0]} rotation={[0, 0, rightArmRotZ]}>
          <mesh position={[0, -0.2, 0]}><boxGeometry args={[0.12, 0.4, 0.12]} />{suitMaterial}</mesh>
          <mesh position={[0, -0.42, 0]}><boxGeometry args={[0.13, 0.1, 0.13]} />{gloveMaterial}</mesh>
        </group>
      </group>
      <mesh position={[0, 0.25, -0.25]} rotation={[leftLegRot, 0, 0]}><boxGeometry args={[0.14, 0.5, 0.14]} />{suitMaterial}</mesh>
      <mesh position={[0, 0.25, 0.25]} rotation={[rightLegRot, 0, 0]}><boxGeometry args={[0.14, 0.5, 0.14]} />{suitMaterial}</mesh>
    </group>
  );
}
