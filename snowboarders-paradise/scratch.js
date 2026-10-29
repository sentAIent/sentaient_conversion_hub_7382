import { Asset } from 'expo-asset';
import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { Platform } from 'react-native';
import { getTerrainHeight, getTerrainNormal, getNearbyObstacles } from '../utils/terrainUtils';
import { MockBackend } from '../utils/mockBackend';
import { useCustomization } from './CustomizationContext';
import { CarveTrail } from './CarveTrail';

import { Helicopter, CameraDrone, IncredibleSnowboarder } from './DetailedModels';

import { useAIAnnouncer } from './AIAnnouncer';
import { socket } from './socket';

// Custom Hook for all snowboarding keyboard controls
function useControls() {
  const keys = useRef({ 
    skate: false, brake: false, left: false, right: false, 
    jump: false, cameraCycle: false, grab: false, boost: false,
    grab1: false, grab2: false, grab3: false, melee: false
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
        case 'Digit1': keys.current.grab1 = true; break;
        case 'Digit2': keys.current.grab2 = true; break;
        case 'Digit3': keys.current.grab3 = true; break;
        case 'KeyM': keys.current.melee = true; break;
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
        case 'Digit1': keys.current.grab1 = false; break;
        case 'Digit2': keys.current.grab2 = false; break;
        case 'Digit3': keys.current.grab3 = false; break;
        case 'KeyM': keys.current.melee = false; break;
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


// PREALLOCATED GLOBALS FOR GC PERFORMANCE
const _groundNormal = new THREE.Vector3();
const _gravity = new THREE.Vector3(0, -120, 0);
const _adaptiveGravity = new THREE.Vector3();
const _forward = new THREE.Vector3();
const _yAxis = new THREE.Vector3(0, 1, 0);
const _xAxis = new THREE.Vector3(1, 0, 0);
const _zAxis = new THREE.Vector3(0, 0, 1);
const _slopeForward = new THREE.Vector3();
const _targetVel = new THREE.Vector3();
const _targetRotationMat = new THREE.Matrix4();
const _targetQuat = new THREE.Quaternion();
const _tqx = new THREE.Quaternion();
const _tqy = new THREE.Quaternion();
const _tqz = new THREE.Quaternion();
const _playerV = new THREE.Vector3();
const _droneOffsetVec = new THREE.Vector3();
const _idealDronePos = new THREE.Vector3();
const _idealOffset = new THREE.Vector3();
const _lookOffset = new THREE.Vector3();
const _lookAt = new THREE.Vector3();
const _zeroVec = new THREE.Vector3(0, 0, 0);

export function Player({ gameStarted, camDistance, camHeight, saveHighlight }) {
  const smoothedYRef = React.useRef(30);
  const { camera } = useThree();
  const playerRef = useRef();
  const visualRef = useRef();
  const controls = useControls();
  
  const [introState, setIntroState] = useState('cinematic_hover');
  const heliRef = useRef();
  const introTimer = useRef(0);
  const droneRef = useRef();
  const droneOffset = useRef(new THREE.Vector3(0, 0, 0));
  const [animState, setAnimState] = useState({ carving: 0, inAir: false, grabbing: false, wipeout: false });
  const [cameraMode, setCameraMode] = useState(0); 
  const lastCamToggle = useRef(0);
  const currentLookAt = useRef(new THREE.Vector3(0, 30, 0));
  
  // Custom Kinematic Physics
  const pos = useRef(new THREE.Vector3(0, 30, 0));
  const vel = useRef(new THREE.Vector3(0, 0, 0));
  
  const boardRotation = useRef(0);
  const angularVel = useRef(0);
  const carvingIntensity = useRef(0);
  
  // Game state
  const score = useRef(0);
  const displayScoreRef = useRef(0);
  const displayBoostRef = useRef(0);
  const boostRef = useRef(0);
  const cameraShake = useRef(0);
  const lastJump = useRef(0);
  const doubleJumpUsed = useRef(false);
  const trickRotation = useRef(new THREE.Vector3(0,0,0));
  const totalAirRotation = useRef(new THREE.Vector3(0,0,0));
  const meleeTimer = useRef(0);
  const weaponRotation = useRef(new THREE.Euler());
  const [trickMsg, setTrickMsg] = useState("");
  const trickMsgRef = useRef("");
  const updateTrickMsg = (msg) => { if (trickMsgRef.current !== msg) { trickMsgRef.current = msg; setTrickMsg(msg); } };

  const { colors, equippedBoard } = useCustomization();
  const [upgrades, setUpgrades] = useState([]);
  const { announceTrick } = useAIAnnouncer();

  useEffect(() => {
    MockBackend.loadProgression().then(data => {
      setUpgrades(data.unlocked || []);
    });
  }, []);

  // Reference for camera
  const cameraTarget = useRef(new THREE.Vector3());
  const comboMultiplier = useRef(1);
  const wasInAir = useRef(false);
  const isWipeout = useRef(false);
  const wipeoutTimer = useRef(0);
  const lastSync = useRef(0);
  

  useFrame((state, delta) => {
    if (!gameStarted) return;
    const dt = Math.min(delta, 0.05);
    const now = Date.now();
    const { skate, brake, left, right, jump, cameraCycle, boost } = controls.current;
    

    
    // === CINEMATIC HELICOPTER INTRO ===
    if (introState === 'cinematic_approach' || introState === 'cinematic_hover') {
      if (!heliRef.current) return;
      
      // Initialize instantly at the peak hover
      if (!heliRef.current.userData.initialized) {
          heliRef.current.position.set(0, 30, 0);
          heliRef.current.rotation.set(0.1, 0, 0.1);
          heliRef.current.userData.initialized = true;
          pos.current.set(0, 30, 0);
          setAnimState({ carving: 0, inAir: false, grabbing: false, wipeout: true });
          
          if (introState === 'cinematic_approach') {
             setIntroState('cinematic_hover');
          }
      }

      introTimer.current += dt;

      // Heli hovers intensely at peak
      heliRef.current.position.x = Math.cos(introTimer.current * 2) * 0.5;
      heliRef.current.position.y = 30 + Math.sin(introTimer.current * 3) * 0.5;
      heliRef.current.position.z = Math.sin(introTimer.current * 1.5) * 0.5;
      
      heliRef.current.rotation.z = Math.sin(introTimer.current * 4) * 0.05;
      heliRef.current.rotation.y = Math.sin(introTimer.current * 0.5) * 0.2; 
      heliRef.current.rotation.x = 0.1 + Math.sin(introTimer.current * 2) * 0.05;

      updateTrickMsg("PRESS JUMP TO DROP IN");
      
      if (jump || introTimer.current > 4) {
        setIntroState('falling');
        setAnimState({ carving: 0, inAir: true, grabbing: false, wipeout: false });
        updateTrickMsg("");
        vel.current.set(0, 5, -20); // Aggressive jump forward and slightly up
      }

      // Drone is attached to heli side
      if (droneRef.current) {
        droneRef.current.position.copy(heliRef.current.position);
        droneRef.current.position.y -= 2.0;
        droneRef.current.position.x -= 4.5;
        droneRef.current.rotation.copy(heliRef.current.rotation);
      }

      // Player sits on the edge of the heli skid
      pos.current.copy(heliRef.current.position);
      pos.current.y -= 3.0;
      pos.current.x += 4.5; // push them further out onto the edge 
      boardRotation.current = heliRef.current.rotation.y;

      // Dynamic Cinematic Camera pan around the hovering heli
      const camRadius = 15;
      const camSpeed = 0.5;
      const cx = heliRef.current.position.x + Math.sin(introTimer.current * camSpeed) * camRadius;
      const cz = heliRef.current.position.z + Math.cos(introTimer.current * camSpeed) * camRadius;
      const cy = heliRef.current.position.y + 5 + Math.sin(introTimer.current) * 2;
      
      camera.position.lerp(new THREE.Vector3(cx, cy, cz), 0.1);
      currentLookAt.current.lerp(heliRef.current.position, 0.2); camera.lookAt(currentLookAt.current);

      return;
    }

    // === FALLING & PLAYING ===
    if (introState === 'falling') {
      // Heli aggressively banks and flies away
      if (heliRef.current) {
        heliRef.current.position.y += 40 * dt;
        heliRef.current.position.z -= 150 * dt; // flies forwards away from camera
        heliRef.current.position.x += 80 * dt; // fly right
        heliRef.current.rotation.z = THREE.MathUtils.lerp(heliRef.current.rotation.z, 0.8, dt * 5); // banking hard
        heliRef.current.rotation.x = THREE.MathUtils.lerp(heliRef.current.rotation.x, -0.5, dt * 5);
      }
      
      vel.current.y -= 150 * dt; // Gravity
      
      // We fall down to the ground
      if (pos.current.y <= getTerrainHeight(pos.current.x, pos.current.z) + 0.1) {
        setIntroState('playing');
        vel.current.z = -80; // explosive start downhill
      }
    }

    
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
      setAnimState(prev => {
        if (prev.wipeout) return prev;
        return { carving: 0, inAir: false, grabbing: false, wipeout: true };
      });
      return;
    }

    
    // Camera Toggle
    if (cameraCycle && now - lastCamToggle.current > 300) {
      setCameraMode((prev) => (prev + 1) % 3);
      lastCamToggle.current = now;
    }

    // GROUND COLLISION PRE-CALC
    const px = pos.current.x;
    const pz = pos.current.z;
    // We fetch ground height later after applying velocity
    let inAir = pos.current.y > getTerrainHeight(px, pz) + 0.1;

    // --- OBSTACLE COLLISIONS ---
    const nearby = getNearbyObstacles(px, pz);
    let hitKicker = false;
    for (const obs of nearby) {
      const dist = Math.sqrt((px - obs.x)**2 + (pz - obs.z)**2);
      
      if (obs.type === 'tree' || obs.type === 'rock') {
         const radius = obs.scale * (obs.type === 'tree' ? 1.5 : 3.0);
         if (dist < radius) {
           // We hit a solid object!
           if (!inAir || pos.current.y < obs.y + radius * 2) {
             isWipeout.current = true;
             cameraShake.current = 5.0;
             wipeoutTimer.current = 1.5;
             updateTrickMsg("WIPEOUT!");
             setTimeout(() => updateTrickMsg(""), 2000);
             comboMultiplier.current = 1.0;
             break;
           }
         }
      }
      else if (obs.type === 'kicker') {
         if (dist  30 && pos.current.y <= getTerrainHeight(pos.current.x, pos.current.z) + 2.0) {
            hitKicker = true;
         }
      }
    }

    
    if (inAir) {
       if (controls.current.jump && left) updateTrickMsg("RODEO FLIP!");
       else if (controls.current.jump && right) updateTrickMsg("CORKSCREW!");
       else if (controls.current.jump) updateTrickMsg("FRONTFLIP!");
       else if (controls.current.grab) updateTrickMsg("MUTE GRAB!");
    }

    
    // REALISTIC PHYSICS: Always apply standard gravity first (High for steep mountain!)
    vel.current.y -= 150.0 * dt; 
    
    // Update position before ground checks
    pos.current.addScaledVector(vel.current, dt);
    
    // Re-check ground after moving
    const groundY = getTerrainHeight(pos.current.x, pos.current.z);
    const groundNormalObj = getTerrainNormal(pos.current.x, pos.current.z);
    const groundNormal = _groundNormal.set(groundNormalObj.x, groundNormalObj.y, groundNormalObj.z);
    
    inAir = pos.current.y > groundY + 0.1;
    
    if (inAir) {

      
      // Double Jump Upgrade
      if (jump && upgrades.includes('double_jump') && !doubleJumpUsed.current && now - lastJump.current > 300) {
        vel.current.y = Math.max(vel.current.y, 0) + 75;
        lastJump.current = now;
        doubleJumpUsed.current = true;
      }

      // Trick System - vastly faster rotations for arcade feel
      let deltaX = 0, deltaY = 0, deltaZ = 0;
      if (jump) { deltaX = 12 * dt; deltaZ = 8 * dt; }
      
      if (left) deltaY = 10 * dt;
      if (right) deltaY = -10 * dt;
      
      trickRotation.current.x += deltaX;
      trickRotation.current.y += deltaY;
      trickRotation.current.z += deltaZ;
      
      totalAirRotation.current.x += Math.abs(deltaX);
      totalAirRotation.current.y += Math.abs(deltaY);
      totalAirRotation.current.z += Math.abs(deltaZ);
      
      if (controls.current.grab) score.current += (50 * dt * comboMultiplier.current);
      if (controls.current.grab1) score.current += (100 * dt * comboMultiplier.current);
      if (controls.current.grab2) score.current += (200 * dt * comboMultiplier.current);
      if (controls.current.grab3) score.current += (300 * dt * comboMultiplier.current);
      
    } else {
      // LANDING WIPE OUT CHECK
      if (wasInAir.current) {
        doubleJumpUsed.current = false;
        // More forgiving landing (within 60 degrees)
        const trickFlat = Math.abs(Math.sin(trickRotation.current.x)) < 0.8 && 
                          Math.abs(Math.sin(trickRotation.current.z)) < 0.8;
        
        if (!trickFlat) {
          isWipeout.current = true;
          wipeoutTimer.current = 1.5;
          if (saveHighlight) saveHighlight();
          updateTrickMsg("WIPEOUT!");
          comboMultiplier.current = upgrades.includes('magnetic_coins') ? 2 : 1;
          announceTrick("wipeout", 0, true);
          // Lose some speed on wipeout
          vel.current.multiplyScalar(0.3);
        } else {
          // Success
          const spins = Math.floor(totalAirRotation.current.y / Math.PI);
          const flips = Math.floor(totalAirRotation.current.x / (Math.PI * 2));
          if (spins > 0 || flips > 0) {
            const spinName = spins > 0 ? `${spins * 180}` : '';
            const flipName = flips > 0 ? (flips > 1 ? `Double Flip` : `Flip`) : '';
            const trickScore = (spins * 500) + (flips * 1000);
            comboMultiplier.current += 0.5;
            const finalScore = (trickScore * comboMultiplier.current) * (upgrades.includes('titanium_board') ? 2 : 1);
            score.current += finalScore;
            
            if (finalScore >= 1000 && MockBackend) {
              const coinsEarned = Math.floor(finalScore / 1000);
              MockBackend.loadProgression().then(data => {
                MockBackend.saveProgression({ ...data, coins: (data.coins || 0) + coinsEarned });
              });
            }

            const trickName = `${spinName} ${flipName}`.trim();
            if (finalScore >= 3000 && saveHighlight) {
              saveHighlight();
              updateTrickMsg(`EPIC ${trickName}! +${trickScore} (CLIP SAVED)`);
            } else {
              updateTrickMsg(`Sick ${trickName}! +${trickScore}`);
            }
            announceTrick(trickName, Math.floor(finalScore));
            setTimeout(() => updateTrickMsg(""), 2000);
            
            // Massive speed boost on landing a trick!
            vel.current.multiplyScalar(1.4);
          } else {
            comboMultiplier.current = upgrades.includes('magnetic_coins') ? 2 : 1;
          }
        }
        totalAirRotation.current.set(0,0,0);
        trickRotation.current.set(0,0,0);
      }

      // Physics on Ground: True Arcade Snowboard Glide
      pos.current.y = groundY; // Lock strictly to terrain on ground
      
      // Orient the forward vector to the slope
      const boardForward = _forward.set(0, 0, -1).applyAxisAngle(_yAxis, boardRotation.current);
      const slopeForward = boardForward.projectOnPlane(groundNormal).normalize();
      
      // Calculate speed and prevent moving backwards up the hill
      let speed = vel.current.length();
      
      // Downhill acceleration (Gravity pushing down the slope)
      const slopeSteepness = -groundNormal.z; // How steep the hill is in the Z direction
      const downhillThrust = Math.max(0.1, slopeSteepness) * 80.0 * dt;
      speed += downhillThrust;
      
      // Steering
      if (left) angularVel.current += 15 * dt;
      if (right) angularVel.current -= 15 * dt;
      angularVel.current *= Math.exp(-10.0 * dt); 
      
      boardRotation.current += angularVel.current * dt;
      boardRotation.current = Math.max(-1.3, Math.min(1.3, boardRotation.current));
      
      // Apply Arcade Drift: the velocity smoothly aligns with the board's nose
      vel.current.copy(slopeForward).multiplyScalar(speed);
      
      // Ground Friction
      const maxSpeed = skate ? 160 : 110;
      if (speed > maxSpeed) {
         vel.current.multiplyScalar(maxSpeed / speed);
      } else {
         vel.current.multiplyScalar(Math.exp(-0.05 * dt)); // Low friction on snow
      }
      
      if (skate) vel.current.addScaledVector(boardForward, 60 * dt);
      if (brake) vel.current.multiplyScalar(Math.exp(-2.5 * dt)); // Hard brake
      
      // Auto-jump if hitting an uphill ridge fast, else manual jump
      const isUphill = groundNormal.z < -0.2;
      
      
      if (hitKicker) { 
          // Smooth arcade jump off kickers. Do not artificially boost Z speed, it looks unnatural.
          // Do not give insane Y height.
          vel.current.y = Math.max(vel.current.y, 0) + 100; vel.current.z -= 20; 
          pos.current.y += 1.0; 
          inAir = true; 
          updateTrickMsg("KICKER!"); 
          setTimeout(() => updateTrickMsg(""), 2000); 
      }
      // Manual Jumping only. Natural bumps will launch you via slope projection.
      if (jump && now - lastJump.current > 300) {
        vel.current.y += 45; 
        vel.current.z -= 5;
        lastJump.current = now;
        pos.current.y += 0.5;
        inAir = true;
      }


      
      carvingIntensity.current = Math.abs(angularVel.current) * speed;
    }
    
    // Smooth Y interpolation for camera and visuals
    let currentSmoothedY = smoothedYRef.current || pos.current.y;
    
    if (introState === 'cinematic_hover') {
      smoothedYRef.current = pos.current.y;
      currentSmoothedY = pos.current.y;
    } else {
      // Visual Suspension: Smooth out the rendering so the board doesn't jitter
      if (pos.current.y > currentSmoothedY) {
          currentSmoothedY = pos.current.y; // Instant catch when going up
      } else {
          currentSmoothedY = THREE.MathUtils.lerp(currentSmoothedY, pos.current.y, 1.0 - Math.exp(-15.0 * dt)); // Soft catch going down
      }
      smoothedYRef.current = currentSmoothedY;
    }

    if (wasInAir.current && !inAir) { updateTrickMsg("PERFECT LANDING!"); setTimeout(() => updateTrickMsg(""), 1500); cameraShake.current = Math.min(3.0, vel.current.length() * 0.02); boostRef.current += 10; }
    wasInAir.current = inAir;
    
    // Update visuals with smoothed Y
    if (visualRef.current) {
      visualRef.current.position.set(pos.current.x, currentSmoothedY, pos.current.z);
      
      const forward = _forward.set(0, 0, -1).applyAxisAngle(_yAxis, boardRotation.current);
      // Project forward onto the slope so it's not horizontal
      const slopeForward = forward.clone().projectOnPlane(groundNormal).normalize();
      
      const targetRotation = _targetRotationMat.lookAt(
        _zeroVec,
        slopeForward,
        inAir ? _yAxis : groundNormal
      );
      const targetQuat = _targetQuat.setFromRotationMatrix(targetRotation);
      
      if (inAir) {
        const tqx = _tqx.setFromAxisAngle(_xAxis, trickRotation.current.x);
        const tqy = _tqy.setFromAxisAngle(_yAxis, trickRotation.current.y);
        const tqz = _tqz.setFromAxisAngle(_zAxis, trickRotation.current.z);
        targetQuat.multiply(tqy).multiply(tqx).multiply(tqz);
      }
      
      visualRef.current.quaternion.slerp(targetQuat, 0.2);
    }
    
    
    const newCarving = Math.sign(angularVel.current);
    const newGrabbing = inAir && controls.current.grab;
    const newGrabType = controls.current.grab1 ? 'method' : controls.current.grab2 ? 'indy' : controls.current.grab3 ? 'stiffy' : null;
    
    setAnimState(prev => {
      if (prev.carving === newCarving && prev.inAir === inAir && prev.grabbing === newGrabbing && prev.grabType === newGrabType && prev.wipeout === false) {
        return prev;
      }
      return { carving: newCarving, inAir, grabbing: newGrabbing, grabType: newGrabType, wipeout: false };
    });


    // Scoring
    score.current += Math.max(0, vel.current.length() * dt * comboMultiplier.current);
    if (inAir) boostRef.current += dt * 5 * comboMultiplier.current;
    if (boost && boostRef.current > 0) { boostRef.current -= dt * 20; vel.current.multiplyScalar(1.0 + 0.5 * dt); }
    if (Math.floor(state.clock.elapsedTime * 10) % 2 === 0) {
      if (Math.abs(displayScoreRef.current - score.current) > 10) {
         displayScoreRef.current = Math.floor(score.current);
         const el = document.getElementById('live-score');
         if (el) el.innerText = displayScoreRef.current.toLocaleString();
      }
      if (Math.abs(displayBoostRef.current - boostRef.current) > 2) {
         displayBoostRef.current = Math.floor(boostRef.current);
         const el = document.getElementById('boost-meter-fill');
         const elText = document.getElementById('boost-meter-text');
         if (el) {
            el.style.width = `${Math.min(100, displayBoostRef.current)}%`;
            el.style.backgroundColor = displayBoostRef.current > 99 ? '#ff0055' : '#00ffcc';
            el.style.boxShadow = `0 0 15px ${displayBoostRef.current > 99 ? '#ff0055' : '#00ffcc'}`;
         }
         if (elText) {
            elText.innerText = displayBoostRef.current > 99 ? 'MAX BOOST READY! (SHIFT)' : 'TRICK TO BOOST';
         }
      }
    }
    
    // Camera
    const playerV = _playerV.set(pos.current.x, smoothedYRef.current, pos.current.z);
    
    // Dynamic Drone Cameraman (Detaches and follows the player!)
    if (introState !== 'cinematic_approach' && introState !== 'cinematic_hover' && droneRef.current) {
      // Position drone slightly up and to the right behind the player
      const droneOffsetVec = _droneOffsetVec.set(3, 8, 12).applyAxisAngle(_yAxis, boardRotation.current);
      const idealDronePos = _idealDronePos.copy(playerV).add(droneOffsetVec);
      
      // Let the drone smoothly catch up after the drop
      droneRef.current.position.lerp(idealDronePos, 0.05);
      
      // Drone always looks at player
      droneRef.current.lookAt(playerV);
      
      // Tilt drone slightly for speed
      const speed = vel.current.length();
      droneRef.current.rotation.x += speed * 0.002; 
    }
    if (cameraMode === 0) {
      
      // Track actual velocity direction rather than board rotation
      let moveAngle = boardRotation.current;
      if (vel.current.lengthSq() > 1.0) {
        moveAngle = THREE.MathUtils.lerp(boardRotation.current, Math.atan2(vel.current.x, -vel.current.z), 0.5);
      }
      
      
      // Bring camera closer and look directly at the player's upper body instead of 20 meters ahead
      
      // Aggressively tight action camera
      
      
      // Standard 3rd person follow camera
      // Keep it 10-20 feet (4-6 meters) behind and lower to the ground for a fast chase feel.
      let idealOffset = _idealOffset.set(0, camHeight - 1.0, camDistance + 2.0); 
      let targetFov = 65 + (boost && boostRef.current > 0 ? 10 : 0);
      
      // Point the camera slightly ahead and at the rider's chest
      let lookOffset = _lookOffset.set(0, 1.0, -2); 
      lookOffset.applyAxisAngle(_yAxis, moveAngle);
      
      const heightAboveGround = pos.current.y - groundY;
      if (inAir && heightAboveGround > 3) {
         // Cinematic Big Air!
         // Pull the camera WAY back and slightly down to make the jump look massive
         const pullBack = Math.min((heightAboveGround - 3) * 0.8, 15); 
         idealOffset = _idealOffset.set(0, camHeight - (pullBack * 0.2), camDistance + 2.0 + pullBack);
         targetFov += Math.min((heightAboveGround - 3) * 1.5, 30); // dynamic wide angle
         lookOffset.y -= pullBack * 0.1; // Look further down at the landing zone
      }

      
      idealOffset.applyAxisAngle(_yAxis, moveAngle);
      idealOffset.add(playerV);
      
      // Ensure camera never clips into the mountain
      const camGroundY = getTerrainHeight(idealOffset.x, idealOffset.z);
      if (idealOffset.y < camGroundY + 1.5) {
         idealOffset.y = camGroundY + 1.5; // Keep camera low but not clipping
      }
      
      const lookAt = _lookAt.copy(playerV).add(lookOffset);

      // Decoupled Camera Smoothing: Fast horizontally, Soft vertically to absorb bumps
      const lerpFactorXZ = 1.0 - Math.exp(-25.0 * dt);
      const lerpFactorY = 1.0 - Math.exp(-8.0 * dt);
      
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, idealOffset.x, lerpFactorXZ);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, idealOffset.z, lerpFactorXZ);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, idealOffset.y, lerpFactorY);
      
      if (cameraShake.current > 0) { 
          lookAt.x += (Math.random()-0.5)*cameraShake.current; 
          lookAt.y += (Math.random()-0.5)*cameraShake.current; 
          cameraShake.current -= dt * 10; 
      }
      currentLookAt.current.lerp(lookAt, 1.0 - Math.exp(-15.0 * dt)); // Softer lookAt to prevent jitter
      camera.lookAt(currentLookAt.current);
      
      

      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.1);
      camera.updateProjectionMatrix();
    }
    
    // Multiplayer Sync (every 100ms)
    if (now - lastSync.current > 100) {
      socket.emit('player_update', {
        id: socket.id,
        pos: pos.current,
        boardRotation: boardRotation.current,
        animState
      });
      lastSync.current = now;
    }
  });

  return (
    
      
        
          <div style={{
             background: 'rgba(10, 10, 15, 0.7)', backdropFilter: 'blur(12px)',
             border: '2px solid rgba(0, 208, 255, 0.5)', borderRadius: '24px',
             padding: '12px 36px', color: '#fff', fontSize: 54, fontWeight: '900', fontStyle: 'italic',
             textShadow: '0 0 25px rgba(0, 208, 255, 0.9)', boxShadow: '0 0 40px rgba(0,208,255,0.4)',
             display: 'flex', flexDirection: 'column', alignItems: 'center',
             transform: comboMultiplier.current > 1 ? 'scale(1.1) rotate(-2deg)' : 'none',
             transition: 'transform 0.1s ease-out'
          }}>
            LIVE SCORE
            0
            = 3 ? '#ff0055' : '#ff9900', marginTop: -5 }}>
              x{comboMultiplier.current.toFixed(1)}
            
          
          
          {/* BOOST METER */}
          
             
          
          
             TRICK TO BOOST
          

          {trickMsg && (
            
              {trickMsg}
            
          )}
        
      

      
      
      
      
      
        {introState !== 'heli' && }

        {/* Melee Weapon */}
        
            0 || controls.current.melee}>
              
               {/* Realistic Wood/Composite Weapon */}
           
        
      

      
      {/* Dynamic Carve Trail */}
       0} />

      {/* Touch Controls Overlay */}
      {introState !== 'heli' && introState !== 'cinematic_approach' && 
        
          <div 
            style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(0, 255, 255, 0.2)', border: '2px solid #00d0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              const rect = e.target.getBoundingClientRect();
              const x = touch.clientX - rect.left - 60;
              if (x < -20) { controls.current.left = true; controls.current.right = false; }
              else if (x > 20) { controls.current.right = true; controls.current.left = false; }
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              const rect = e.target.getBoundingClientRect();
              const x = touch.clientX - rect.left - 60;
              if (x < -20) { controls.current.left = true; controls.current.right = false; }
              else if (x > 20) { controls.current.right = true; controls.current.left = false; }
              else { controls.current.left = false; controls.current.right = false; }
            }}
            onTouchEnd={() => { controls.current.left = false; controls.current.right = false; }}
          >
            STEER
          
        

        
           <div 
            style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255, 0, 255, 0.3)', border: '2px solid #ff00ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}
            onTouchStart={() => controls.current.grab = true}
            onTouchEnd={() => controls.current.grab = false}
          >
            GRAB
          
          <div 
            style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255, 165, 0, 0.3)', border: '2px solid #ffa500', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}
            onTouchStart={() => controls.current.jump = true}
            onTouchEnd={() => controls.current.jump = false}
          >
            JUMP
          
        
      }
    
  );
}


export { IncredibleSnowboarder as SnowboarderAvatar } from './DetailedModels';
// FORCE_METRO_REBUILD_1790476448
