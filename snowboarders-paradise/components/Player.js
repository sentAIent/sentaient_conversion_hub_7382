import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Platform } from 'react-native';
import { useSphere } from '@react-three/cannon';

// Custom Hook for all snowboarding keyboard controls
function useControls() {
  const keys = useRef({ 
    skate: false, // W
    brake: false, // S
    left: false,  // A
    right: false, // D
    jump: false,  // Space
    cameraCycle: false, // C
    grab: false,  // Shift
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
  
  // Animation state to pass to the avatar
  const [animState, setAnimState] = useState({
    carving: 0,
    inAir: false,
    grabbing: false
  });

  // PHYSICS BODY
  const [ref, api] = useSphere(() => ({
    mass: 80,
    position: [0, 50, 0],
    args: [2.4], // Increased radius of the rigid body sphere for larger player
    material: { friction: 0.1, restitution: 0.1 },
    angularDamping: 0.9, 
    linearDamping: 0.1, 
  }));

  // Store the exact physical position and velocity
  const pos = useRef([0, 0, 0]);
  const vel = useRef([0, 0, 0]);
  
  useEffect(() => {
    const unsubPos = api.position.subscribe(p => pos.current = p);
    const unsubVel = api.velocity.subscribe(v => vel.current = v);
    return () => {
      unsubPos();
      unsubVel();
    };
  }, [api]);

  // CAMERA STATE
  const [cameraMode, setCameraMode] = useState(0); 
  const lastCamToggle = useRef(0);
  const boardRotation = useRef(0);

  // GAMEPLAY STATE
  const score = useRef(0);
  const [displayScore, setDisplayScore] = useState(0);

  const lastJump = useRef(0);
  const trickRotation = useRef(new THREE.Vector3(0,0,0));
  const totalAirRotation = useRef(new THREE.Vector3(0,0,0));
  const [trickMsg, setTrickMsg] = useState("");
  const comboMultiplier = useRef(1);
  const wasInAir = useRef(false);

  useFrame((state, delta) => {
    if (!gameStarted) return;
    
    const { skate, brake, left, right, jump, cameraCycle } = controls.current;

    // CAMERA TOGGLE DEBOUNCE
    const now = Date.now();
    if (cameraCycle && now - lastCamToggle.current > 300) {
      setCameraMode((prev) => (prev + 1) % 3);
      lastCamToggle.current = now;
    }

    const currentVel = new THREE.Vector3(vel.current[0], vel.current[1], vel.current[2]);
    const speed = currentVel.length();
    
    // Heuristic for being in the air (since we don't have a raycaster for ground yet)
    // If vertical velocity is significant, we are falling/jumping
    const inAir = Math.abs(currentVel.y) > 2;

    // STEERING logic (rotate the board mesh direction)
    let currentCarve = 0;
    if (!inAir) {
      let turnSpeed = speed > 5 ? 1.5 * delta : 0.8 * delta;
      if (left) { boardRotation.current += turnSpeed; currentCarve = -1; }
      if (right) { boardRotation.current -= turnSpeed; currentCarve = 1; }
    }

    // Forward direction of the board
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), boardRotation.current);

    // APPLY PHYSICS FORCES
    if (skate && speed < 40 && !inAir) {
      api.applyForce([forward.x * 2000, 0, forward.z * 2000], [0, 0, 0]);
    }
    
    // JUMP & TRICKS
    if (jump && !inAir && now - lastJump.current > 500) {
      // Pop!
      api.applyImpulse([0, 600, 0], [0, 0, 0]);
      lastJump.current = now;
    }

    if (inAir) {
      // Tricks! Hold jump and directions to spin and flip
      let deltaX = 0, deltaY = 0, deltaZ = 0;
      if (jump) {
         deltaX = 4 * delta; trickRotation.current.x += deltaX; 
         deltaZ = 2 * delta; trickRotation.current.z += deltaZ;
      }
      if (left) { deltaY = 5 * delta; trickRotation.current.y += deltaY; }
      if (right) { deltaY = -5 * delta; trickRotation.current.y += deltaY; }
      
      totalAirRotation.current.x += Math.abs(deltaX);
      totalAirRotation.current.y += Math.abs(deltaY);
      totalAirRotation.current.z += Math.abs(deltaZ);
      
      // Points for holding grabs
      if (controls.current.grab) {
         score.current += (50 * delta * comboMultiplier.current);
      }
      
    } else {
      // Landed
      if (wasInAir.current) {
        // Calculate tricks performed
        const spins = Math.floor(totalAirRotation.current.y / Math.PI); // Half rotations (180, 360, etc)
        const flips = Math.floor(totalAirRotation.current.x / (Math.PI * 2));
        
        if (spins > 0 || flips > 0) {
          const spinName = spins > 0 ? `${spins * 180}` : '';
          const flipName = flips > 0 ? (flips > 1 ? `Double Flip` : `Flip`) : '';
          const msg = `Sick ${spinName} ${flipName}!`;
          const trickScore = (spins * 500) + (flips * 1000);
          
          comboMultiplier.current += 0.5;
          score.current += (trickScore * comboMultiplier.current);
          setTrickMsg(`${msg} +${trickScore}`);
          
          // Clear message after 2 seconds
          setTimeout(() => setTrickMsg(""), 2000);
        } else {
          // Reset multiplier if no tricks
          comboMultiplier.current = 1;
        }
        totalAirRotation.current.set(0,0,0);
      }
      // Smoothly return to normal stance when landing
      trickRotation.current.lerp(new THREE.Vector3(0, 0, 0), 0.1);
    }
    wasInAir.current = inAir;
    
    // Pass animation state down to avatar
    setAnimState({
      carving: currentCarve,
      inAir: inAir,
      grabbing: inAir && controls.current.grab
    });

    // VISUAL ALIGNMENT
    if (visualRef.current) {
      visualRef.current.position.set(pos.current[0], pos.current[1] - 2.4, pos.current[2]);
      
      const targetRotation = new THREE.Matrix4().lookAt(
        new THREE.Vector3(0,0,0),
        forward,
        new THREE.Vector3(0,1,0) // Up vector
      );
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(targetRotation);
      
      // Apply trick rotations
      const trickQuatX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), trickRotation.current.x);
      const trickQuatY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), trickRotation.current.y);
      const trickQuatZ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), trickRotation.current.z);
      
      targetQuat.multiply(trickQuatY).multiply(trickQuatX).multiply(trickQuatZ);
      
      // Apply normal downhill pitch if not doing extreme tricks
      if (currentVel.y < -5 && trickRotation.current.length() < 0.1) {
         const pitch = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), -0.2);
         targetQuat.multiply(pitch);
      }
      
      visualRef.current.quaternion.slerp(targetQuat, 0.2);
    }

    // SCORE UPDATE (distance based + tricks)
    score.current += Math.max(0, -currentVel.z * delta * 2 * comboMultiplier.current);
    if (Math.floor(state.clock.elapsedTime * 10) % 2 === 0) {
       if (Math.abs(displayScore - score.current) > 10) setDisplayScore(Math.floor(score.current));
    }

    // CAMERA LOGIC
    let idealOffset, idealLookAt;
    const playerPos = new THREE.Vector3(pos.current[0], pos.current[1], pos.current[2]);
    
    if (cameraMode === 0) {
      idealOffset = new THREE.Vector3(0, camHeight * 4, camDistance * 4); // Scale up camera distance
      idealOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), boardRotation.current);
      idealOffset.add(playerPos);
      
      idealLookAt = new THREE.Vector3(0, 0, -20);
      idealLookAt.applyAxisAngle(new THREE.Vector3(0, 1, 0), boardRotation.current);
      idealLookAt.add(playerPos);
      
      camera.position.lerp(idealOffset, 0.1);
      camera.lookAt(idealLookAt);
    } 
    else if (cameraMode === 1) {
      idealOffset = new THREE.Vector3(30, 40, 30);
      idealOffset.add(playerPos);
      camera.position.lerp(idealOffset, 0.05);
      camera.lookAt(playerPos);
    }

    // FOV WARP
    if (cameraMode === 0) {
      const targetFov = 60 + Math.min(speed * 0.4, 40); 
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.1);
      camera.updateProjectionMatrix();
    }
  });

  const visualRef = useRef();

  return (
    <group>
      {/* Invisible Physics Sphere */}
      <mesh ref={ref} visible={false}>
         <sphereGeometry args={[2.4]} />
      </mesh>

      {/* GAME HUD OVERLAY - PREMIUM UI */}
      <Html position={[0, 3, 0]} center zIndexRange={[100, 0]}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none',
          backgroundColor: 'transparent', padding: '10px 20px', width: '350px'
        }}>
          {/* Main Score (Glassmorphism) */}
          <div style={{
             background: 'rgba(255, 255, 255, 0.05)',
             backdropFilter: 'blur(12px)',
             WebkitBackdropFilter: 'blur(12px)',
             border: '1px solid rgba(255, 255, 255, 0.1)',
             borderRadius: '24px',
             padding: '12px 36px',
             color: '#fff', 
             fontSize: 48, 
             fontWeight: '900', 
             fontStyle: 'italic', 
             textShadow: '0 0 20px rgba(0, 208, 255, 0.8)', 
             boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
             marginBottom: 10,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center'
          }}>
            <div style={{ fontSize: 16, color: '#00d0ff', fontWeight: 'bold', letterSpacing: 2, textTransform: 'uppercase' }}>SCORE</div>
            {displayScore.toLocaleString()}
            <div style={{ fontSize: 24, color: '#ff9900', marginTop: -5 }}>x{comboMultiplier.current.toFixed(1)}</div>
          </div>
          
          {trickMsg && (
            <div style={{
              color: '#00ffcc',
              fontSize: 32,
              fontWeight: '900',
              fontStyle: 'italic',
              textShadow: '0 0 15px #00ffcc',
              animation: 'fadeUp 2s ease-out forwards',
              marginTop: 20
            }}>
              {trickMsg}
            </div>
          )}
        </div>
      </Html>

      {/* Visual Board & Rider */}
      <group ref={visualRef} scale={[4, 4, 4]}>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.4, 0.05, 1.8]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} emissive="#00d0ff" emissiveIntensity={0.8} />
        </mesh>
        
        <SnowboarderAvatar animState={animState} goggleColor={goggleColor} />
      </group>
    </group>
  );
}

// Sub-component for the articulated 3D character
function SnowboarderAvatar({ animState, goggleColor }) {
  const { carving, inAir, grabbing } = animState;
  
  // Base poses
  const defaultLegBent = 0.2;
  const leftLegRot = inAir ? (grabbing ? 0.8 : 0.4) : (carving === -1 ? 0.6 : defaultLegBent);
  const rightLegRot = inAir ? (grabbing ? -0.8 : -0.4) : (carving === 1 ? -0.6 : -defaultLegBent);
  
  const bodyLeanZ = carving === -1 ? -0.3 : (carving === 1 ? 0.3 : 0);
  const bodyLeanX = inAir ? (grabbing ? 0.6 : 0) : 0; // Lean forward when grabbing
  
  // Left arm reaches down if grabbing
  const leftArmRotZ = inAir && grabbing ? -1.5 : (inAir ? -1.0 : -0.3);
  const leftArmRotX = inAir && grabbing ? 0.5 : 0;
  
  const rightArmRotZ = inAir && grabbing ? 1.0 : (inAir ? 1.0 : 0.3);

  return (
    <group position={[0, -0.4, 0]}>
      {/* Torso */}
      <group position={[0, 0.6, 0]} rotation={[bodyLeanX, 1.57, bodyLeanZ]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.35, 0.5, 0.2]} />
          <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.5} emissive="#00d0ff" emissiveIntensity={0.2} />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.2, 0.25, 0.2]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Goggles */}
        <mesh position={[0, 0.35, -0.11]}>
          <boxGeometry args={[0.22, 0.1, 0.05]} />
          <meshStandardMaterial color="#000" emissive={goggleColor} emissiveIntensity={2} />
        </mesh>

        {/* Left Arm */}
        <mesh position={[-0.25, 0.1, 0]} rotation={[leftArmRotX, 0, leftArmRotZ]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* Right Arm */}
        <mesh position={[0.25, 0.1, 0]} rotation={[0, 0, rightArmRotZ]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>
      
      {/* Legs */}
      {/* Left Leg */}
      <mesh position={[0, 0.25, -0.3]} rotation={[leftLegRot, 0, 0]}>
        <boxGeometry args={[0.15, 0.45, 0.15]} />
        <meshStandardMaterial color="#111" emissive="#ff0055" emissiveIntensity={0.4} />
      </mesh>
      
      {/* Right Leg */}
      <mesh position={[0, 0.25, 0.3]} rotation={[rightLegRot, 0, 0]}>
        <boxGeometry args={[0.15, 0.45, 0.15]} />
        <meshStandardMaterial color="#111" emissive="#ff0055" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}
