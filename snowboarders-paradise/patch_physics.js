const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// 1. Remove the old adaptive gravity and jump logic
const oldPhysics = `    if (inAir) {
      // Adaptive gravity: The higher you are, the harder gravity pulls, preventing infinite orbit
      const height = pos.current.y - groundY;
      const adaptiveGravity = _adaptiveGravity.set(0, -120 - (height * 8), 0);
      vel.current.addScaledVector(adaptiveGravity, dt);`;
const newPhysics = `    // REALISTIC PHYSICS: Always apply standard gravity first
    vel.current.y -= 35.0 * dt; 
    
    // Update position before ground checks
    pos.current.addScaledVector(vel.current, dt);
    
    // Re-check ground after moving
    const groundY = getTerrainHeight(pos.current.x, pos.current.z);
    const groundNormalObj = getTerrainNormal(pos.current.x, pos.current.z);
    const groundNormal = _groundNormal.set(groundNormalObj.x, groundNormalObj.y, groundNormalObj.z);
    
    let inAir = pos.current.y > groundY + 0.1;
    
    if (inAir) {`;
code = code.replace(oldPhysics, newPhysics);

// 2. Remove the old pos.current.y = groundY and slope force logic
const oldGround = `      // Physics on Ground
      pos.current.y = groundY;
      
      // Downhill acceleration based on slope
      const slopeForce = gravity.clone().projectOnPlane(groundNormal);
      vel.current.addScaledVector(slopeForce, dt * 1.5);
      
      // Constant base downhill thrust (Arcade feel)
      vel.current.z -= 40 * dt;`;
const newGround = `      // Physics on Ground
      pos.current.y = groundY;
      
      // Project velocity along the slope so we don't penetrate the ground and maintain momentum
      if (vel.current.y < 0) {
        const speed = vel.current.length();
        vel.current.projectOnPlane(groundNormal);
        if (vel.current.lengthSq() > 0.1) {
            vel.current.normalize().multiplyScalar(speed * 0.98); // Slight friction on impact
        }
      }
      
      // Downhill gravity acceleration based on slope
      const slopeForce = _gravity.clone().projectOnPlane(groundNormal);
      vel.current.addScaledVector(slopeForce, dt * 0.8);
      
      // Constant base downhill thrust
      vel.current.z -= 20 * dt;`;
code = code.replace(oldGround, newGround);

// 3. Remove the auto-jump uphill trampoline and replace with realistic jumping
const oldJump = `      if ((jump && now - lastJump.current > 300) || (isUphill && speed > 60 && now - lastJump.current > 500)) {
        // Arcade jump: Add pure vertical velocity so we don't break horizontal momentum.
        // Cap the max jump velocity so they don't get moon gravity if they spam it on a bump.
        vel.current.y = Math.max(vel.current.y, 0) + 25; vel.current.z -= 10;
        lastJump.current = now;
        pos.current.y += 0.5; // pop off ground
      }`;
const newJump = `      // Manual Jumping only. Natural bumps will launch you via slope projection.
      if (jump && now - lastJump.current > 300) {
        vel.current.y += 18; 
        vel.current.z -= 5;
        lastJump.current = now;
        pos.current.y += 0.5;
        inAir = true;
      }`;
code = code.replace(oldJump, newJump);

// 4. Remove the duplicate ground check variables at the top of the loop
const oldInit = `    // GROUND COLLISION & NORMAL
    const px = pos.current.x;
    const pz = pos.current.z;
    const groundY = getTerrainHeight(px, pz);
    const groundNormalObj = getTerrainNormal(px, pz);
    const groundNormal = _groundNormal.set(groundNormalObj.x, groundNormalObj.y, groundNormalObj.z);

    let inAir = pos.current.y > groundY + 0.1;
    
    const gravity = _gravity;`;
const newInit = `    // GROUND COLLISION PRE-CALC
    const px = pos.current.x;
    const pz = pos.current.z;
    // We fetch ground height later after applying velocity`;
code = code.replace(oldInit, newInit);

// 5. Remove the duplicate pos.current.addScaledVector at the bottom
const oldEnd = `    // Ensure we don't apply velocity twice (bug fix)
    pos.current.addScaledVector(vel.current, dt);`;
const newEnd = `    // Velocity already applied at start of loop`;
code = code.replace(oldEnd, newEnd);

fs.writeFileSync('components/Player.js', code);
console.log("Physics patched");
