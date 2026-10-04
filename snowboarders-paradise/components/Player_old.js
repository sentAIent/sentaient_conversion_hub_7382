import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, ContactShadows, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { Platform } from 'react-native';
import { getTerrainHeight, getTerrainNormal, getCollectibleData, getRailData } from '../utils/terrainUtils';
import { useAudioManager } from './AudioManager';
import { useCustomization } from './CustomizationContext';

// Custom Hook for all snowboarding keyboard controls
function useControls() {
  const keys = useRef({ 
    skate: false, // W
    brake: false, // S
    left: false,  // A
    right: false, // D
    jump: false,  // Space
    cameraCycle: false, // C
    grab: false,  // Shift (also used for boost)
    reset: false, // R
    melee: false, // F
    throw: false, // T
    toggleCombat: false, // M
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
        case 'KeyR': keys.current.reset = true; break;
        case 'KeyF': keys.current.melee = true; break;
        case 'KeyT': keys.current.throw = true; break;
        case 'KeyM': keys.current.toggleCombat = true; break;
        case 'KeyU': keys.current.unstrap = true; break;
        case 'KeyE': keys.current.equip = true; break;
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
        case 'KeyR': keys.current.reset = false; break;
        case 'KeyF': keys.current.melee = false; break;
        case 'KeyT': keys.current.throw = false; break;
        case 'KeyM': keys.current.toggleCombat = false; break;
        case 'KeyU': keys.current.unstrap = false; break;
        case 'KeyE': keys.current.equip = false; break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Merge keyboard controls with mobile touch controls
  const mergedControls = { ...keys.current };
  if (window.mobileControls) {
    if (window.mobileControls.left) mergedControls.left = true;
    if (window.mobileControls.right) mergedControls.right = true;
    if (window.mobileControls.brake) mergedControls.brake = true;
    if (window.mobileControls.skate) mergedControls.skate = true;
    if (window.mobileControls.jump) mergedControls.jump = true;
    if (window.mobileControls.melee) mergedControls.melee = true;
    if (window.mobileControls.throw) mergedControls.throw = true;
    if (window.mobileControls.grab) mergedControls.grab = true;
    if (window.mobileControls.toggleCombat) mergedControls.toggleCombat = true;
  }
  
  // Use a ref to return so it mimics the previous structure
  const mergedRef = useRef(mergedControls);
  mergedRef.current = mergedControls;
  return mergedRef;
}

export function Player({ gameStarted = true, goggleColor = '#ff9900', camDistance = 4, camHeight = 1.5 }) {
  const { camera } = useThree();
  const controls = useControls();
  
  // Customization Context
  const { avatarUrl } = useCustomization();
  
  // Audio
  const { playSoundtrack, playSfx } = useAudioManager();

  // Animation state to pass to the avatar
  const [animState, setAnimState] = useState({
    carving: 0,
    inAir: false,
    grabbing: false,
    boosting: false,
    melee: false
  });

  // Kinematic state
  const pos = useRef(new THREE.Vector3(0, 50, 0));
  const vel = useRef(new THREE.Vector3(0, 0, 0));
  
  // CAMERA STATE
  const [cameraMode, setCameraMode] = useState(0); 
  const lastCamToggle = useRef(0);
  const boardRotation = useRef(0);
  const boardRoll = useRef(0);
  const boardPitch = useRef(0);

  // GAMEPLAY STATE
  const score = useRef(0);
  const [displayScore, setDisplayScore] = useState(0);

  const lastJump = useRef(0);
  const trickRotation = useRef(new THREE.Vector3(0,0,0));
  const totalAirRotation = useRef(new THREE.Vector3(0,0,0));
  const [trickMsg, setTrickMsg] = useState("");
  const comboMultiplier = useRef(1);
  const wasInAir = useRef(false);
  const isDead = useRef(false);
  const angularVel = useRef(0); // Added for inertia steering

  // GEAR AND WEAPONS STATE
  const [vehicle, setVehicle] = useState('snowboard'); // 'snowboard', 'skis', 'none'
  const [weapon, setWeapon] = useState('branch'); // 'branch', 'skis', 'poles', 'snowboard'
  const lastUnstrap = useRef(0);
  const lastMelee = useRef(0);

  const [combatMode, setCombatMode] = useState(false);
  const lastCombatToggle = useRef(0);
  const timeScale = useRef(1.0);
  const trickStrikeEndTime = useRef(0);

  const [projectiles, setProjectiles] = useState([]);
  const projPhysics = useRef({});
  const projRefs = useRef({});
  const lastThrow = useRef(0);

  const [trailNodes] = useState(() => Array(20).fill(0).map(() => new THREE.Vector3()));
  const trailRef = useRef([]);

  useFrame((state, delta) => {
    if (!gameStarted) return;
    
    // Hard cap delta to prevent massive physics spikes on mobile
    delta = Math.min(delta, 0.05);
    
    const { skate, brake, left, right, jump, cameraCycle, reset, grab, melee, unstrap, equip } = controls.current;

    const actualTime = Date.now();
    
    // Toggle Combat Mode
    if (controls.current.toggleCombat && actualTime - lastCombatToggle.current > 300) {
      setCombatMode(m => !m);
      lastCombatToggle.current = actualTime;
    }

    // Time Dilation for Trick Strike (Hit Stop -> Slow Mo)
    if (actualTime < trickStrikeEndTime.current) {
      if (actualTime > trickStrikeEndTime.current - 1400) { // First 100ms
        timeScale.current = 0.02; // Hit Stop freeze
      } else {
        timeScale.current = 0.2; // Slow-mo fallout
      }
    } else {
      timeScale.current = 1.0;
    }
    window.timeScale = timeScale.current;
    const scaledDelta = delta * timeScale.current;
    delta = scaledDelta;

    // UNSTRAP MECHANIC
    const now = Date.now();
    if (unstrap && now - lastUnstrap.current > 500) {
      if (vehicle !== 'none') {
         setVehicle('none');
         setWeapon(vehicle === 'snowboard' ? 'snowboard' : 'skis'); // Wield previous vehicle
      } else {
         setVehicle(weapon === 'snowboard' ? 'snowboard' : 'skis'); // Strap back in
         setWeapon('branch');
      }
      lastUnstrap.current = now;
    }

    // EQUIP MECHANIC (Loot Stealing)
    if (equip && window.droppedLoot) {
       for (let i = window.droppedLoot.length - 1; i >= 0; i--) {
          const loot = window.droppedLoot[i];
          const dist = pos.current.distanceTo(new THREE.Vector3(loot.position[0], pos.current.y, loot.position[2]));
          if (dist < 4) {
             // Pick it up
             if (loot.type === 'skis' || loot.type === 'poles') {
                setWeapon(loot.type);
                setTrickMsg(`Picked up ${loot.type}!`);
                setTimeout(() => setTrickMsg(""), 2000);
             }
             // Remove from world
             window.droppedLoot.splice(i, 1);
             break;
          }
       }
    }

    // RESET MECHANIC
    if (reset || isDead.current) {
      if (reset) isDead.current = false; // Allow manual reset to resurrect
      if (!isDead.current) {
        pos.current.set(0, 50, pos.current.z - 50);
        vel.current.set(0, 0, 0);
        boardRotation.current = 0;
        score.current = 0;
        comboMultiplier.current = 1;
      }
      return;
    }

    // CAMERA TOGGLE DEBOUNCE
    if (cameraCycle && now - lastCamToggle.current > 300) {
      setCameraMode((prev) => (prev + 1) % 3);
      lastCamToggle.current = now;
    }

    const speed = vel.current.length();
    const groundY = getTerrainHeight(pos.current.x, pos.current.z);
    let inAir = pos.current.y > groundY + 0.5;
    
    // Inertia & Momentum Steering
    let currentCarve = 0;
    const turnAccel = inAir ? 3.0 * delta : 12.0 * delta;
    if (left) { angularVel.current += turnAccel; currentCarve = -1; }
    if (right) { angularVel.current -= turnAccel; currentCarve = 1; }
    
    // Rotational friction/damping
    angularVel.current *= (1 - (inAir ? 1.5 : 5.0) * delta);
    boardRotation.current += angularVel.current * delta;

    const targetRoll = currentCarve * Math.min(0.8, speed * 0.05);
    boardRoll.current = THREE.MathUtils.lerp(boardRoll.current, targetRoll, 0.1);

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), boardRotation.current);

    let isBoosting = false;
    let isGrinding = false;

    // AUDIO: Soundtrack trigger
    if (speed > 5) playSoundtrack();
    if (speed > 40 && Math.random() < 0.1) playSfx('wind');
    if (Math.abs(currentCarve) > 0.5 && !inAir && Math.random() < 0.2) playSfx('carve');

    // GRINDING & COLLECTIBLES CHECK
    const collectible = getCollectibleData(pos.current.x, pos.current.z);
    if (collectible && pos.current.distanceTo(new THREE.Vector3(collectible.position.x, collectible.position.y, collectible.position.z)) < 3) {
       comboMultiplier.current += 1.0;
       score.current += 1000;
       setTrickMsg("RING COLLECTED! +1.0x");
       playSfx('hit'); // Ding!
       setTimeout(() => setTrickMsg(""), 2000);
    }

    const rail = getRailData(pos.current.x, pos.current.z);
    if (rail && pos.current.y > rail.position.y && pos.current.y < rail.position.y + 2 && Math.abs(pos.current.x - rail.position.x) < 1.5) {
       isGrinding = true;
       pos.current.y = rail.position.y + 0.5;
       vel.current.y = 0;
       inAir = false;
       comboMultiplier.current += delta * 2; // Fast multiplier build on rails
       playSfx('carve'); // Grind sound
    }

    if (!inAir && !isGrinding) {
      if (vehicle === 'none') {
        // ON-FOOT MOVEMENT (Walking/Running)
        vel.current.multiplyScalar(0.8); // High friction
        if (skate) vel.current.add(forward.clone().multiplyScalar(15 * delta));
        if (brake) vel.current.add(forward.clone().multiplyScalar(-15 * delta));
      } else {
        // RIDING ACCELERATION
        if (skate && speed < 80) {
          vel.current.add(forward.clone().multiplyScalar(40 * delta));
        }
        if (brake) {
          vel.current.multiplyScalar(1 - 2 * delta);
        }
        if (grab && comboMultiplier.current > 1.0) {
          isBoosting = true;
          vel.current.add(forward.clone().multiplyScalar(100 * delta));
          comboMultiplier.current = Math.max(1.0, comboMultiplier.current - delta * 2);
        }
        
        // DECOUPLED CARVING / EDGE GRIP
        // Curve velocity towards the board's facing direction
        if (speed > 2) {
          const flatVel = new THREE.Vector3(vel.current.x, 0, vel.current.z);
          const flatSpeed = flatVel.length();
          flatVel.normalize();
          
          // Smoothly interpolate current velocity vector towards board forward
          const grip = brake ? 0.8 : (Math.abs(currentCarve) > 0 ? 0.08 : 0.03);
          flatVel.lerp(new THREE.Vector3(forward.x, 0, forward.z), grip).normalize();
          
          vel.current.set(flatVel.x * flatSpeed, vel.current.y, flatVel.z * flatSpeed);
          
          // Apply natural air drag
          vel.current.multiplyScalar(1 - 0.2 * delta);
        }
      }
    }

    if (!isGrinding) {
      // Realistic Gravity Curve (Terminal Velocity)
      // Gravity gets stronger the longer you fall, capped at terminal velocity
      const gravity = vel.current.y > 0 ? 35 : 45; // Fall slightly faster than rising
      vel.current.y = Math.max(-80, vel.current.y - gravity * delta);
      
      // POSITION UPDATE
      pos.current.add(vel.current.clone().multiplyScalar(delta));
      
      const newGroundY = getTerrainHeight(pos.current.x, pos.current.z);
      
      // TERRAIN COLLISION & PROJECTION
      if (pos.current.y <= newGroundY) {
         pos.current.y = newGroundY;
         inAir = false;
         
         // Project velocity onto the ground plane to preserve momentum downhill
         const normal = getTerrainNormal(pos.current.x, pos.current.z);
         const normalVec = new THREE.Vector3(normal.x, normal.y, normal.z);
         
         // Cancel out velocity going INTO the ground
         const dot = vel.current.dot(normalVec);
         if (dot < 0) {
            vel.current.sub(normalVec.clone().multiplyScalar(dot));
         }
      } else {
         // We are in the air, apply slight air drag
         vel.current.x *= (1 - 0.1 * delta);
         vel.current.z *= (1 - 0.1 * delta);
         inAir = true;
      }
    }

    // JUMP
    if (jump && !inAir && now - lastJump.current > 500) {
      vel.current.y += 25; // Pop velocity
      lastJump.current = now;
      inAir = true; // immediately in air
    }

    // NPC MELEE COMBAT WITH WEAPON STATS
    let swingCooldown = 500;
    let baseDamage = 1000;
    let comboAward = 1.0;
    
    if (weapon === 'poles') { swingCooldown = 200; baseDamage = 500; comboAward = 0.5; }
    else if (weapon === 'skis') { swingCooldown = 400; baseDamage = 1500; comboAward = 1.5; }
    else if (weapon === 'snowboard') { swingCooldown = 800; baseDamage = 3000; comboAward = 2.5; } // Slow, devastating

    if (melee && window.npcList && actualTime - lastMelee.current > swingCooldown) {
      lastMelee.current = actualTime;
      window.npcList.forEach(npc => {
        if (!npc.knockedOut) {
          const npcPos = new THREE.Vector3(npc.x, pos.current.y, npc.z);
          const dist = pos.current.distanceTo(npcPos);
          
          // Directional cone check
          const dirToNpc = npcPos.clone().sub(pos.current).normalize();
          const dot = forward.dot(dirToNpc);
          
          if (dist < 8 && dot > 0.4) { // Must be roughly in front
            npc.knockedOut = true;
            npc.knockoutVelocity.set((npc.x - pos.current.x) * (baseDamage/200), 20, -30);
            npc.knockoutRotation.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
            
            let isTrickStrike = inAir && (Math.abs(trickRotation.current.x) > 0.5 || Math.abs(trickRotation.current.y) > 0.5 || Math.abs(trickRotation.current.z) > 0.5);
            
            if (isTrickStrike) {
              comboMultiplier.current += comboAward * 5;
              score.current += baseDamage * comboMultiplier.current * 2;
              setTrickMsg("TRICK STRIKE!!!");
              trickStrikeEndTime.current = actualTime + 1500;
            } else {
              comboMultiplier.current += comboAward; 
              score.current += baseDamage * comboMultiplier.current;
              setTrickMsg(`${weapon.toUpperCase()} SMACKDOWN!`);
            }
            playSfx('hit');
            setTimeout(() => setTrickMsg(""), 2000);
          }
        }
      });
    }

    // Projectile Throwing Logic
    if (controls.current.throw && actualTime - lastThrow.current > 500) {
      lastThrow.current = actualTime;
      const pId = actualTime.toString();
      const forwardVel = forward.clone().multiplyScalar(80);
      projPhysics.current[pId] = {
        pos: pos.current.clone().add(new THREE.Vector3(0, 1, 0)),
        vel: vel.current.clone().add(forwardVel)
      };
      setProjectiles(prev => [...prev, pId]);
    }

    Object.keys(projPhysics.current).forEach(pId => {
      const p = projPhysics.current[pId];
      p.pos.add(p.vel.clone().multiplyScalar(delta));
      p.vel.y -= 20 * delta;
      
      const ground = getTerrainHeight(p.pos.x, p.pos.z);
      if (p.pos.y <= ground) {
        p.pos.y = ground;
        p.vel.y *= -0.5;
      }
      
      if (projRefs.current[pId]) projRefs.current[pId].position.copy(p.pos);
      
      if (window.npcList) {
        window.npcList.forEach(npc => {
          if (!npc.knockedOut) {
            const dist = p.pos.distanceTo(new THREE.Vector3(npc.x, npc.y || getTerrainHeight(npc.x, npc.z), npc.z));
            if (dist < 4) {
              npc.knockedOut = true;
              npc.knockoutVelocity.set(p.vel.x * 0.5, 20, p.vel.z * 0.5);
              npc.knockoutRotation.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
              score.current += 500 * comboMultiplier.current;
              setTrickMsg("BULLSEYE!");
              setTimeout(() => setTrickMsg(""), 2000);
            }
          }
        });
      }
    });

    // TRICKS
    if (inAir) {
      // SSX-style tricks! Hold jump and directions to spin and flip
      let deltaX = 0, deltaY = 0, deltaZ = 0;
      if (jump) {
         deltaX = 8 * delta; trickRotation.current.x += deltaX; 
         deltaZ = 4 * delta; trickRotation.current.z += deltaZ;
      }
      if (left) { deltaY = 10 * delta; trickRotation.current.y += deltaY; }
      if (right) { deltaY = -10 * delta; trickRotation.current.y += deltaY; }
      
      totalAirRotation.current.x += Math.abs(deltaX);
      totalAirRotation.current.y += Math.abs(deltaY);
      totalAirRotation.current.z += Math.abs(deltaZ);
      
      if (grab) {
         score.current += (100 * delta * comboMultiplier.current);
      }
    } else {
      // Landed
      if (wasInAir.current) {
        const spins = Math.floor(totalAirRotation.current.y / Math.PI);
        const flips = Math.floor(totalAirRotation.current.x / (Math.PI * 2));
        
        // Wipeout check
        const yRot = Math.abs(trickRotation.current.y % (Math.PI * 2));
        const xRot = Math.abs(trickRotation.current.x % (Math.PI * 2));
        // if landed badly (not facing forward or upside down)
        if ( (yRot > Math.PI/2 && yRot < Math.PI*1.5) || (xRot > Math.PI/2 && xRot < Math.PI*1.5) ) {
            setTrickMsg(`WIPEOUT! Press R to respawn.`);
            isDead.current = true;
            vel.current.set(0,0,0);
        } else if (spins > 0 || flips > 0) {
          const spinName = spins > 0 ? `${spins * 180}` : '';
          const flipName = flips > 0 ? (flips > 1 ? `Double Flip` : `Flip`) : '';
          const msg = `Sick ${spinName} ${flipName}!`;
          const trickScore = (spins * 1000) + (flips * 2000);
          
          comboMultiplier.current += 1.0;
          score.current += (trickScore * comboMultiplier.current);
          setTrickMsg(`${msg} +${trickScore}`);
          
          setTimeout(() => setTrickMsg(""), 2000);
        } else {
          comboMultiplier.current = 1;
        }
        totalAirRotation.current.set(0,0,0);
      }
      trickRotation.current.lerp(new THREE.Vector3(0, 0, 0), 0.2);
    }
    wasInAir.current = inAir;
    
    setAnimState({
      carving: currentCarve,
      inAir: inAir,
      grabbing: inAir && grab,
      boosting: isBoosting,
      melee: now - lastMelee.current < 200, // Short swing animation
      vehicle: vehicle,
      weapon: weapon
    });

    // VISUAL ALIGNMENT
    if (visualRef.current) {
      visualRef.current.position.copy(pos.current);
      
      const normal = getTerrainNormal(pos.current.x, pos.current.z);
      const normalVec = new THREE.Vector3(normal.x, normal.y, normal.z);
      
      const targetRotation = new THREE.Matrix4().lookAt(
        new THREE.Vector3(0,0,0),
        forward,
        inAir ? new THREE.Vector3(0,1,0) : normalVec // align to ground normal if not in air
      );
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(targetRotation);
      
      const rollQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), -boardRoll.current);
      targetQuat.multiply(rollQuat);
      
      const trickQuatX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), trickRotation.current.x);
      const trickQuatY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), trickRotation.current.y);
      const trickQuatZ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), trickRotation.current.z);
      
      targetQuat.multiply(trickQuatY).multiply(trickQuatX).multiply(trickQuatZ);
      
      if (isDead.current) {
         // Fall over if dead
         targetQuat.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), Math.PI/2));
      }
      
      visualRef.current.quaternion.slerp(targetQuat, 0.3); // faster slerp for snappy rotation
    }

    // SCORE UPDATE
    score.current += Math.max(0, -vel.current.z * delta * 2 * comboMultiplier.current);
    if (Math.floor(state.clock.elapsedTime * 10) % 2 === 0) {
       if (Math.abs(displayScore - score.current) > 10) setDisplayScore(Math.floor(score.current));
    }

    // CAMERA LOGIC
    let idealOffset, idealLookAt;
    
    if (combatMode) {
      idealOffset = new THREE.Vector3(2, camHeight * 4, camDistance * 3);
      idealOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), boardRotation.current);
      idealOffset.add(pos.current);
      
      idealLookAt = new THREE.Vector3(0, 0, -20);
      idealLookAt.applyAxisAngle(new THREE.Vector3(0, 1, 0), boardRotation.current);
      idealLookAt.add(pos.current);
      
      camera.position.lerp(idealOffset, 0.1);
      camera.lookAt(idealLookAt);
    } else if (cameraMode === 0) {
      idealOffset = new THREE.Vector3(0, camHeight * 4, camDistance * 4); 
      idealOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), boardRotation.current);
      idealOffset.add(pos.current);
      
      idealLookAt = new THREE.Vector3(0, 0, -20);
      idealLookAt.applyAxisAngle(new THREE.Vector3(0, 1, 0), boardRotation.current);
      idealLookAt.add(pos.current);
      
      camera.position.lerp(idealOffset, 0.1);
      camera.lookAt(idealLookAt);
    } 
    else if (cameraMode === 1) {
      idealOffset = new THREE.Vector3(30, 40, 30);
      idealOffset.add(pos.current);
      camera.position.lerp(idealOffset, 0.05);
      camera.lookAt(pos.current);
    }

    if (cameraMode === 0) {
      const targetFov = 60 + Math.min(speed * 0.4, 40); 
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.1);
      camera.updateProjectionMatrix();
    }
  });

  const visualRef = useRef();

  return (
    <group>
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
        <group position={[0, 0.5, 0]}>
          {/* Soft shadow directly underneath the board for realistic grounding */}
          <ContactShadows position={[0, -0.49, 0]} opacity={0.8} scale={3} blur={2} far={1} />
        
        {/* Particle Trail for Boost/High Speed */}
        {animState.boosting && (
           <mesh position={[0, -0.4, 0.9]}>
             <boxGeometry args={[0.6, 0.1, 3.0]} />
             <meshBasicMaterial color="#00ffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
           </mesh>
        )}
        
        {trailNodes.map((_, i) => (
          <mesh key={`scarf-${i}`} ref={el => trailRef.current[i] = el}>
            <boxGeometry args={[0.2, 0.1, 0.2]} />
            <meshStandardMaterial color="#000000" emissive="#ff00ff" emissiveIntensity={3} />
          </mesh>
        ))}
        
        {projectiles.map(pId => (
          <mesh key={pId} ref={el => projRefs.current[pId] = el}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#000000" emissive="#00ffff" emissiveIntensity={5} />
          </mesh>
        ))}

        {/* Vehicle (Snowboard vs None) */}
        {animState.vehicle === 'snowboard' && (
          <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.05, 1.8]} />
            <meshStandardMaterial color="#dddddd" metalness={0.2} roughness={0.5} />
          </mesh>
        )}
        
        <SnowboarderAvatar animState={animState} goggleColor={goggleColor} avatarUrl={avatarUrl} />
        </group>
      </group>
    </group>
  );
}

export function SnowboarderAvatar({ animState, goggleColor, avatarUrl }) {
  const { carving, inAir, grabbing, melee, weapon, vehicle } = animState;
  const group = useRef();
  const { scene, animations } = useGLTF(avatarUrl || "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Soldier.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Clone scene to avoid shared materials issue if instantiated multiple times
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    // Basic animation handling - map our game states to available animations in the GLTF
    // We assume the default Soldier model has 'Run' and 'Idle' (or similar standard names)
    // If we have actual snowboarding animations, we'd map them here.
    const actionName = inAir ? 'Jump' : (Math.abs(carving) > 0 ? 'Run' : 'Idle');
    
    // Play the closest match if it exists
    let activeAction = null;
    if (actions[actionName]) {
      activeAction = actions[actionName];
    } else if (actions['Run'] && actionName === 'Run') {
      activeAction = actions['Run'];
    } else if (actions['Idle']) {
      activeAction = actions['Idle'];
    }

    if (activeAction) {
      activeAction.reset().fadeIn(0.2).play();
    }
    
    return () => {
      if (activeAction) activeAction.fadeOut(0.2);
    };
  }, [inAir, carving, actions]);

  // Procedurally tilt the whole character slightly for carving
  const bodyLeanZ = carving === -1 ? -0.3 : (carving === 1 ? 0.3 : 0);
  const bodyLeanX = inAir ? (grabbing ? 0.6 : 0) : 0; // Lean forward when grabbing

  return (
    <group ref={group} position={[0, -0.4, 0]} rotation={[bodyLeanX, 1.57, bodyLeanZ]}>
      {/* We scale up the soldier slightly to match the original bounding box */}
      <primitive object={scene} scale={[0.8, 0.8, 0.8]} />
      
      {/* Attach weapons relative to the right hand roughly */}
      <group position={[0.25, 0.6, 0.2]}>
        {weapon === 'branch' && (
           <mesh position={[0, 0, 0]} rotation={[1.5, 0, 0]}>
             <cylinderGeometry args={[0.02, 0.04, 1.2]} />
             <meshStandardMaterial color="#664422" />
           </mesh>
        )}
        {weapon === 'poles' && (
           <mesh position={[0, 0, 0]} rotation={[1.5, 0, 0]}>
             <cylinderGeometry args={[0.01, 0.01, 1.5]} />
             <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
           </mesh>
        )}
      </group>
    </group>
  );
}

// Preload the default avatar to avoid popping
useGLTF.preload("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Soldier.glb");
