const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Replace the physics block
const physicsRegex = /\/\/ GROUND COLLISION & NORMAL[\s\S]*?wasInAir\.current = inAir;/;

const newPhysics = `// GROUND COLLISION & NORMAL
    const px = pos.current.x;
    const pz = pos.current.z;
    const groundY = getTerrainHeight(px, pz);
    const groundNormalObj = getTerrainNormal(px, pz);
    const groundNormal = new THREE.Vector3(groundNormalObj.x, groundNormalObj.y, groundNormalObj.z);

    let inAir = pos.current.y > groundY + 0.1;
    const gravity = new THREE.Vector3(0, -80, 0); // Snappy gravity

    if (inAir) {
      vel.current.addScaledVector(gravity, dt);
      
      // Double Jump Upgrade
      if (jump && upgrades.includes('double_jump') && !doubleJumpUsed.current && now - lastJump.current > 300) {
        vel.current.y = Math.max(vel.current.y, 0) + 30;
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
          setTrickMsg("WIPEOUT!");
          comboMultiplier.current = upgrades.includes('magnetic_coins') ? 2 : 1;
          announceTrick("wipeout", 0, true);
          // Lose some speed on wipeout
          vel.current.multiplyScalar(0.3);
        } else {
          // Success
          const spins = Math.floor(totalAirRotation.current.y / Math.PI);
          const flips = Math.floor(totalAirRotation.current.x / (Math.PI * 2));
          if (spins > 0 || flips > 0) {
            const spinName = spins > 0 ? \`\${spins * 180}\` : '';
            const flipName = flips > 0 ? (flips > 1 ? \`Double Flip\` : \`Flip\`) : '';
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

            const trickName = \`\${spinName} \${flipName}\`.trim();
            if (finalScore >= 3000 && saveHighlight) {
              saveHighlight();
              setTrickMsg(\`EPIC \${trickName}! +\${trickScore} (CLIP SAVED)\`);
            } else {
              setTrickMsg(\`Sick \${trickName}! +\${trickScore}\`);
            }
            announceTrick(trickName, Math.floor(finalScore));
            setTimeout(() => setTrickMsg(""), 2000);
            
            // Massive speed boost on landing a trick!
            vel.current.multiplyScalar(1.4);
          } else {
            comboMultiplier.current = upgrades.includes('magnetic_coins') ? 2 : 1;
          }
        }
        totalAirRotation.current.set(0,0,0);
        trickRotation.current.set(0,0,0);
      }

      // Physics on Ground
      pos.current.y = groundY;
      
      // Downhill acceleration based on slope
      const slopeForce = gravity.clone().projectOnPlane(groundNormal);
      vel.current.addScaledVector(slopeForce, dt * 1.5);
      
      // Constant base downhill thrust (Arcade feel)
      vel.current.z -= 40 * dt;
      
      // Speed limits & Friction
      const maxSpeed = skate ? 180 : 120;
      let speed = vel.current.length();
      
      if (speed > maxSpeed) {
        vel.current.multiplyScalar(maxSpeed / speed);
      } else {
        // Frame-rate independent friction
        vel.current.multiplyScalar(Math.exp(-0.2 * dt)); 
      }
      
      // Steering & Momentum
      if (left) angularVel.current += 10 * dt;
      if (right) angularVel.current -= 10 * dt;
      angularVel.current *= Math.exp(-4.0 * dt); // Snappy return
      
      boardRotation.current += angularVel.current * dt;
      
      // Limit board rotation to +/- 70 degrees from forward
      boardRotation.current = Math.max(-1.2, Math.min(1.2, boardRotation.current));
      
      const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), boardRotation.current);
      
      // Arcade Drift - align velocity to board direction
      if (speed > 5) {
         const driftSpeed = 8.0; 
         const alignedVel = forward.clone().multiplyScalar(speed);
         vel.current.lerp(alignedVel, 1.0 - Math.exp(-driftSpeed * dt));
      }
      
      if (skate) vel.current.addScaledVector(forward, 60 * dt);
      if (brake) vel.current.multiplyScalar(Math.exp(-2.5 * dt)); // Hard brake
      
      // Auto-jump if hitting an uphill ridge fast, else manual jump
      const isUphill = groundNormal.z < -0.2;
      if ((jump && now - lastJump.current > 300) || (isUphill && speed > 60 && now - lastJump.current > 500)) {
        vel.current.y += jump ? 40 : 30; // Massive jump
        lastJump.current = now;
        pos.current.y += 1.0; // pop off ground
      }
      
      carvingIntensity.current = Math.abs(angularVel.current) * speed;
    }
    
    // Add velocity to position
    pos.current.addScaledVector(vel.current, dt);
    
    wasInAir.current = inAir;`;

code = code.replace(physicsRegex, newPhysics);

// Fix the groundY offset (removed -5 to fix sinking, but need to make sure the mesh is shifted correctly)
// If I changed `groundY = getTerrainHeight() - 5` to `groundY = getTerrainHeight()`, I should ensure the visual mesh is centered.
// In Player.js the visual mesh is `<mesh position={[0, -0.4, 0]}>` which is fine.

fs.writeFileSync('components/Player.js', code);
