import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, useKeyboardControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { getTerrainHeight, getTerrainNormal } from './Terrain';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

export function Player() {
  const bodyRef = useRef();
  const modelRef = useRef();
  const boardGroupRef = useRef();
  const boardRef = useRef();
  const flipGroupRef = useRef();
  const particlesRef = useRef();
  const weaponRef = useRef();
  
  // Safe load the local Soldier model as the player avatar
  const { scene, animations } = useGLTF("/models/Soldier.glb");
  const { actions } = useAnimations(animations, modelRef);

  
  const [, getKeys] = useKeyboardControls();
  
  // Reusable vectors to prevent GC pressure
  const idealCamPos = useMemo(() => new THREE.Vector3(), []);
  const lookAtPos = useMemo(() => new THREE.Vector3(), []);
  const velocity = useMemo(() => new THREE.Vector3(0, 0, -20), []);
  
  // Start player safely above the new high mountain terrain
  const currentPos = useMemo(() => new THREE.Vector3(0, 1000, 900), []);
  
  const [comboDisplay, setComboDisplay] = useState(null);
  const comboTimeout = useRef(null);

  // State flags
  const stateRef = useRef({
    isAirborne: false,
    verticalVelocity: 0,
    rotationY: Math.PI, // Facing -Z
    flipX: 0,
    trickMultiplier: 1,
    sprayIntensity: 0,
    camY: 180,
  });

  // Bulletproof particle geometry
  const particleCount = 100;
  const particlesGeo = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for(let i=0; i<particleCount; i++) {
        pos[i*3] = (Math.random() - 0.5);
        pos[i*3+1] = Math.random();
        pos[i*3+2] = (Math.random() - 0.5);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useEffect(() => {
    if (actions['Idle']) {
      actions['Idle'].reset().play();
      stateRef.current.currentAnimation = 'Idle';
    } else if (actions['TPose']) {
      actions['TPose'].reset().play();
      stateRef.current.currentAnimation = 'TPose';
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (!bodyRef.current || !modelRef.current) return;
    
    // Cap delta to prevent massive physics explosions on tab switch
    const dt = Math.min(delta, 0.1);

    const { left, right, forward, backward, jump, melee, throwProjectile } = getKeys();
    const st = stateRef.current;
    
    // --- Physics State ---
    if (st.velocity === undefined) {
        st.velocity = new THREE.Vector3(0, 0, -20);
        st.popCharge = 0;
        st.wasJumping = false;
        st.isTucking = false;
    }

    const terrainY = getTerrainHeight(currentPos.x, currentPos.z);
    const normal = getTerrainNormal(currentPos.x, currentPos.z);
    
    // --- Pop Mechanics (Shredders style) ---
    // Hold jump to charge, release to pop
    if (jump && !st.isAirborne) {
        st.popCharge = Math.min(st.popCharge + dt * 2, 1.0); // max 1 second charge
    } else if (!jump && st.wasJumping && !st.isAirborne) {
        // Released jump! POP!
        st.isAirborne = true;
        // Pop strength depends on charge (min 10, max 25)
        const popForce = 10 + (st.popCharge * 15);
        st.verticalVelocity = Math.max(st.verticalVelocity, 0) + popForce;
        currentPos.y = terrainY + 0.6; // Slightly above the new grounded offset
        st.popCharge = 0;
    }
    st.wasJumping = jump;
    st.isTucking = forward; // 'W' to tuck

    // --- Airborne vs Grounded Physics ---
    if (st.isAirborne) {
        st.verticalVelocity -= 40 * dt; // Gravity
        currentPos.y += st.verticalVelocity * dt;

        if (currentPos.y <= terrainY + 0.5) {
            // Landed
            st.isAirborne = false;
            currentPos.y = terrainY + 0.5;
            if (st.trickMultiplier > 1) {
                const finalCombo = st.trickMultiplier.toFixed(1);
                setComboDisplay(`x${finalCombo} Landed!`);
                if (comboTimeout.current) clearTimeout(comboTimeout.current);
                comboTimeout.current = setTimeout(() => setComboDisplay(null), 2000);
            }
            st.trickMultiplier = 1;
        }
    } else {
        // Grounded
        const expectedY = currentPos.y;
        if (terrainY + 0.5 < expectedY - 0.5) { // If terrain drops sharply beneath us
            st.isAirborne = true; // Dropped off a cliff/kicker
        } else {
            st.verticalVelocity = ((terrainY + 0.5) - expectedY) / dt;
            currentPos.y = terrainY + 0.5;
        }
    }

    // --- Carving & Momentum (Shredders style) ---
    // Smooth steering instead of instant snapping
    const targetTurn = left ? 3.5 : (right ? -3.5 : 0);
    st.turnSpeed = THREE.MathUtils.lerp(st.turnSpeed || 0, targetTurn, dt * 5);
    
    if (st.isAirborne) {
        // Advanced Trick System
        if (left || right || forward || backward) {
            st.trickMultiplier += dt * 2.0; // Build combo faster
            
            // Left/Right = Spins (Helicopters)
            st.rotationY += st.turnSpeed * 2 * dt;
            
            // Forward/Backward = Flips (Frontflips/Backflips)
            const flipDir = forward ? 5 : (backward ? -5 : 0);
            st.flipX += flipDir * dt;
        }
        st.sprayIntensity = THREE.MathUtils.lerp(st.sprayIntensity, 0, dt * 10);
    } else {
        // Ground Carving
        st.rotationY += st.turnSpeed * dt;
        
        // Normalize flipX to shortest path to 0 to prevent violent unwinding
        st.flipX = st.flipX % (Math.PI * 2);
        if (st.flipX > Math.PI) st.flipX -= Math.PI * 2;
        if (st.flipX < -Math.PI) st.flipX += Math.PI * 2;
        st.flipX = THREE.MathUtils.lerp(st.flipX, 0, dt * 10);
        
        const boardDir = new THREE.Vector3(Math.sin(st.rotationY), 0, Math.cos(st.rotationY)).normalize();
        
        // Lower gravity for more realistic, slightly floatier speed build-up
        const gravityForce = 45; 
        const slopeForce = new THREE.Vector3(-normal.x, 0, -normal.z).multiplyScalar(gravityForce * dt);
        st.velocity.add(slopeForce);

        const slopeGradient = Math.hypot(normal.x, normal.z);
        const isFlat = slopeGradient < 0.15; // Treat as flat ground if slope is very shallow
        const speed = st.velocity.length();

        let targetAnimation = 'Idle';

        if (isFlat) {
            // Flat ground mechanics
            if (forward && speed < 30) {
                targetAnimation = 'Run'; // Push with back foot
                st.velocity.add(boardDir.clone().multiplyScalar(40 * dt)); // Push acceleration
            }
        } else {
            // Downhill mechanics
            if (forward) {
                // Lean forward / tuck for extra speed
                st.velocity.add(boardDir.clone().multiplyScalar(20 * dt));
            } else if (!left && !right) {
                // Auto-carve when not actively steering
                st.autoCarvePhase = (st.autoCarvePhase || 0) + dt * speed * 0.05;
                st.rotationY += Math.sin(st.autoCarvePhase) * 0.3 * dt;
            }
        }

        // Apply animation state changes
        if (st.currentAnimation !== targetAnimation) {
            if (actions[targetAnimation] && actions[st.currentAnimation]) {
                actions[st.currentAnimation].fadeOut(0.2);
                actions[targetAnimation].reset().fadeIn(0.2).play();
            }
            st.currentAnimation = targetAnimation;
        }

        // Friction and Drag
        let dragCoefficient = st.isTucking ? 0.1 : 0.6; // Reduced friction so you don't lose speed instantly
        if (backward) dragCoefficient = 3.0; // Braking/Snowplow

        // Carving: Vector projection to simulate edge bite
        // We lerp the actual velocity towards the direction the board is facing
        // The sharper the angle between velocity and board, the more speed is lost to "skidding" friction
        const finalSpeed = st.velocity.length();
        const idealVelocity = boardDir.clone().multiplyScalar(finalSpeed);
        
        // How much the board's edge bites into the snow (carving response)
        const edgeGrip = 6.0 * dt; // Stronger bite
        st.velocity.lerp(idealVelocity, edgeGrip);
        
        // Apply framerate-independent drag
        const dragFactor = Math.max(0, 1.0 - dragCoefficient * dt);
        st.velocity.multiplyScalar(dragFactor);

        // Visual spray intensity based on how much we are "skidding" (velocity vs board dir)
        const skidAmount = 1.0 - Math.abs(st.velocity.clone().normalize().dot(boardDir));
        const targetSpray = skidAmount * 5.0 + (backward ? 1.0 : 0.0);
        st.sprayIntensity = THREE.MathUtils.lerp(st.sprayIntensity, targetSpray, dt * 5);
    }

    // Apply velocity to position
    currentPos.x += st.velocity.x * dt;
    currentPos.z += st.velocity.z * dt;

    // --- Melee Combat & Trick Strikes ---
    if (melee && !st.isSwinging) {
        st.isSwinging = true;
        st.swingTimer = 0.3; // Swing lasts 0.3s
    }

    if (st.isSwinging) {
        st.swingTimer -= dt;
        if (st.swingTimer <= 0) st.isSwinging = false;
        
        // Weapon swing animation
        if (weaponRef.current) {
            weaponRef.current.visible = true; // Show when swinging
            // Rapidly swing the bat down and across
            weaponRef.current.rotation.z = Math.PI / 4 - Math.sin(st.swingTimer * 10) * 2;
            weaponRef.current.rotation.x = Math.sin(st.swingTimer * 10) * 1.5;
        }

        // Hit Detection against NPCs
        if (window.npcList) {
            window.npcList.forEach(npc => {
                if (!npc.knockedOut) {
                    const dist = Math.hypot(npc.x - currentPos.x, npc.z - currentPos.z);
                    if (dist < 4) { // Hit radius
                        npc.knockedOut = true;
                        // Apply ragdoll force away from player
                        npc.knockoutVelocity.set(
                            (npc.x - currentPos.x) * 10,
                            20, // pop up
                            (npc.z - currentPos.z) * 10 - 20
                        );
                        npc.knockoutRotation.set(Math.random()*10, Math.random()*10, Math.random()*10);

                        // Trick Strike logic!
                        if (st.isAirborne && st.trickMultiplier > 1.2) {
                            window.timeScale = 0.2; // Slow-mo!
                            setTimeout(() => { window.timeScale = 1.0; }, 500); // Wait 500ms real-time
                            st.trickMultiplier += 5.0; // Massive combo
                            setComboDisplay(`TRICK STRIKE! x${st.trickMultiplier.toFixed(1)}`);
                        } else {
                            st.trickMultiplier += 1.0;
                            setComboDisplay(`Smash!`);
                        }
                        if (comboTimeout.current) clearTimeout(comboTimeout.current);
                        comboTimeout.current = setTimeout(() => setComboDisplay(null), 2000);
                    }
                }
            });
        }
    } else {
        if (weaponRef.current) {
            weaponRef.current.visible = false; // Hide otherwise
            weaponRef.current.rotation.set(0, 0, Math.PI / 4); // Reset to idle resting position
        }
    }

    if (throwProjectile && !st.isThrowing) {
        st.isThrowing = true;
        if (!window.projectiles) window.projectiles = [];
        window.projectiles.push({
            id: Math.random().toString(),
            x: currentPos.x,
            y: currentPos.y + 2,
            z: currentPos.z,
            vx: Math.sin(st.rotationY) * 80,
            vy: Math.max(st.verticalVelocity, 0) + 10,
            vz: Math.cos(st.rotationY) * 80,
            dead: false
        });
        setTimeout(() => { st.isThrowing = false; }, 300); // cooldown
    }

    // Apply strictly to Kinematic body
    bodyRef.current.setNextKinematicTranslation(currentPos);
    
    // --- Model Alignment & Animations ---
    const flipQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), st.flipX);
    
    if (!st.isAirborne) {
        const up = new THREE.Vector3(0, 1, 0);
        const normal = getTerrainNormal(currentPos.x, currentPos.z);
        // Align board to slope
        const alignQuat = new THREE.Quaternion().setFromUnitVectors(up, normal);
        // Add yaw steering
        const yawQuat = new THREE.Quaternion().setFromAxisAngle(up, st.rotationY);
        
        // Board group aligns to terrain + yaw (NO FLIP for shadow/particles)
        if (boardGroupRef.current) {
            const finalQuat = alignQuat.multiply(yawQuat);
            boardGroupRef.current.quaternion.slerp(finalQuat, dt * 10);
            
            // Rider stays upright (yaw + flip only), preventing face-plants into the snow on steep slopes
            if (modelRef.current) {
                modelRef.current.quaternion.slerp(yawQuat.clone().multiply(flipQuat), dt * 10);
            }
        }
    } else {
        // When airborne, just use yaw
        const up = new THREE.Vector3(0, 1, 0);
        const yawQuat = new THREE.Quaternion().setFromAxisAngle(up, st.rotationY);
        const finalAirQuat = yawQuat.clone().multiply(flipQuat);
        
        if (modelRef.current) {
            modelRef.current.quaternion.slerp(finalAirQuat, dt * 5);
        }
        
        if (boardGroupRef.current) {
            boardGroupRef.current.quaternion.slerp(yawQuat, dt * 5); // Shadow stays flat
        }
    }

    // Apply flip to the visual board and bindings ONLY
    if (flipGroupRef.current) {
        flipGroupRef.current.quaternion.slerp(flipQuat, dt * 10);
    }

    // --- Snow Spray Particles ---
    if (particlesRef.current && particlesRef.current.geometry.attributes.position) {
        const pArr = particlesRef.current.geometry.attributes.position.array;
        for(let i=0; i<particleCount; i++) {
            pArr[i*3+1] += (Math.random() * 2) * dt; // rise up
            pArr[i*3] += (Math.random() - 0.5) * dt;
            pArr[i*3+2] += (Math.random() - 0.5) * dt;
            // Reset particle
            if (pArr[i*3+1] > st.sprayIntensity * 2) {
                pArr[i*3+1] = 0;
                pArr[i*3] = (Math.random() - 0.5) * st.sprayIntensity;
                pArr[i*3+2] = (Math.random() - 0.5) * st.sprayIntensity;
            }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // --- Dynamic Smooth Camera (Fixes jumpy graphics) ---
    const currentSpeed = st.velocity ? st.velocity.length() : 0;
    const speedRatio = Math.min(currentSpeed / 60, 1.0); // Cap FOV expansion
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 60 + (speedRatio * 15), dt * 2);
    state.camera.updateProjectionMatrix();

    // Smooth the camera Y separately to absorb terrain bumps, giving a much smoother cinematic feel
    st.camY = THREE.MathUtils.lerp(st.camY, currentPos.y, dt * 5); // Was 10

    // Keep camera behind the player relative to their facing direction
    const forwardX = Math.sin(st.rotationY);
    const forwardZ = Math.cos(st.rotationY);
    
    idealCamPos.set(
        currentPos.x - forwardX * 7, // pull slightly further back for speed feel
        st.camY + 3.5, 
        currentPos.z - forwardZ * 7
    );
    
    // Enforce camera ground clearance so it never clips into the mountain
    const camTerrainY = getTerrainHeight(idealCamPos.x, idealCamPos.z);
    if (idealCamPos.y < camTerrainY + 1.5) {
        idealCamPos.y = camTerrainY + 1.5;
    }
    
    // Look slightly further down the mountain
    lookAtPos.set(
        currentPos.x + forwardX * 10, 
        st.camY - 1, 
        currentPos.z + forwardZ * 10
    );
    
    // Elastic camera drag that feels grounded and smooth
    state.camera.position.lerp(idealCamPos, dt * 8); // Was 15
    state.camera.lookAt(lookAtPos);
    
    // Infinite Mountain Loop - reset if falling off the Z=-1000 edge
    if (currentPos.y < -250 || currentPos.z < -1000) {
       currentPos.set(0, 1000, 900);
       st.rotationY = Math.PI;
       st.camY = 1000;
    }
  });

  return (
    <RigidBody ref={bodyRef} type="kinematicPosition" colliders={false} position={[0, 180, 900]}>
      <CuboidCollider args={[0.5, 1, 0.5]} position={[0, 0.5, 0]} />
      {/* Soldier Avatar (Yaw only) */}
      <group ref={modelRef}>
        {/* Drop avatar so feet sit perfectly in the bindings */}
        <primitive object={scene} scale={[0.8, 0.8, 0.8]} position={[0, -0.45, 0]} rotation={[0, 1.57, 0]} />
        {/* Weapon (Tree Branch / Bat) attached to rider */}
        <group ref={weaponRef} position={[0.4, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.06, 0.1, 1.8]} /> {/* Bigger, heavier club */}
            <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Board and Particles (Yaw + Pitch/Roll for terrain) */}
      <group ref={boardGroupRef}>
        <group ref={flipGroupRef}>
          {/* Realistic Snowboard */}
          <mesh ref={boardRef} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.2]} castShadow receiveShadow>
              <capsuleGeometry args={[0.15, 1.5, 4, 16]} />
              <meshStandardMaterial color="#222222" roughness={0.6} metalness={0.4} />
          </mesh>
          
          {/* Snowboard bindings (moved in to perfectly cup the rider's stance) */}
          <mesh position={[0, -0.45, 0.22]} castShadow>
              <boxGeometry args={[0.25, 0.1, 0.15]} />
              <meshStandardMaterial color="#444444" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.45, -0.22]} castShadow>
              <boxGeometry args={[0.25, 0.1, 0.15]} />
              <meshStandardMaterial color="#444444" roughness={0.8} />
          </mesh>
        </group>
        
        {/* Snow Spray Particles */}
        <points ref={particlesRef} geometry={particlesGeo} position={[0, -0.5, 0.5]}>
            <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.6} depthWrite={false} />
        </points>
      </group>

      {/* Floating Trick Combo UI (Always mounted to prevent React crashes) */}
      <Html center position={[0, 2.5, 0]}>
            <div style={{ 
                color: '#00ffff', 
                fontSize: '24px', 
                fontWeight: 'bold', 
                textShadow: '0 0 10px #00ffff', 
                whiteSpace: 'nowrap', 
                pointerEvents: 'none',
                opacity: comboDisplay ? 1 : 0,
                transition: 'opacity 0.2s'
            }}>
                {comboDisplay || ''}
            </div>
        </Html>
    </RigidBody>
  );
}

useGLTF.preload("/models/Soldier.glb");
