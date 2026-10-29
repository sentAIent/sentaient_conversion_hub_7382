const fs = require('fs');

let playerCode = fs.readFileSync('components/Player.js', 'utf8');

// 1. Add Boost Key to controls
playerCode = playerCode.replace("grab: false,", "grab: false, boost: false,");
playerCode = playerCode.replace("if (e.code === 'KeyE') keys.current.grab = true;", "if (e.code === 'KeyE') keys.current.grab = true;\n      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keys.current.boost = true;");
playerCode = playerCode.replace("if (e.code === 'KeyE') keys.current.grab = false;", "if (e.code === 'KeyE') keys.current.grab = false;\n      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keys.current.boost = false;");

// 2. Add Boost State & Variables
playerCode = playerCode.replace("const [displayScore, setDisplayScore] = useState(0);", "const [displayScore, setDisplayScore] = useState(0);\n  const [displayBoost, setDisplayBoost] = useState(0);\n  const boostRef = useRef(0);\n  const cameraShake = useRef(0);");

// 3. Extract boost from controls
playerCode = playerCode.replace("const { skate, brake, left, right, jump, cameraCycle } = controls.current;", "const { skate, brake, left, right, jump, cameraCycle, boost } = controls.current;");

// 4. Update UI to include Boost Meter and better Score visuals
const oldUI = `<div style={{
             background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)',
             border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px',
             padding: '12px 36px', color: '#fff', fontSize: 48, fontWeight: '900', fontStyle: 'italic',
             textShadow: '0 0 20px rgba(0, 208, 255, 0.8)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
             display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <div style={{ fontSize: 16, color: '#00d0ff', letterSpacing: 2 }}>SCORE</div>
            {displayScore.toLocaleString()}
            <div style={{ fontSize: 24, color: '#ff9900', marginTop: -5 }}>x{comboMultiplier.current.toFixed(1)}</div>
          </div>`;

const newUI = `<div style={{
             background: 'rgba(10, 10, 15, 0.7)', backdropFilter: 'blur(12px)',
             border: '2px solid rgba(0, 208, 255, 0.5)', borderRadius: '24px',
             padding: '12px 36px', color: '#fff', fontSize: 54, fontWeight: '900', fontStyle: 'italic',
             textShadow: '0 0 25px rgba(0, 208, 255, 0.9)', boxShadow: '0 0 40px rgba(0,208,255,0.4)',
             display: 'flex', flexDirection: 'column', alignItems: 'center',
             transform: comboMultiplier.current > 1 ? 'scale(1.1) rotate(-2deg)' : 'none',
             transition: 'transform 0.1s ease-out'
          }}>
            <div style={{ fontSize: 18, color: '#00d0ff', letterSpacing: 3 }}>SCORE</div>
            {displayScore.toLocaleString()}
            <div style={{ fontSize: 28, color: comboMultiplier.current >= 3 ? '#ff0055' : '#ff9900', marginTop: -5 }}>
              x{comboMultiplier.current.toFixed(1)}
            </div>
          </div>
          
          {/* BOOST METER */}
          <div style={{ marginTop: 15, width: '100%', height: 25, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 12, border: '2px solid #333', overflow: 'hidden' }}>
             <div style={{ width: \`\${Math.min(100, displayBoost)}%\`, height: '100%', backgroundColor: displayBoost > 99 ? '#ff0055' : '#00ffcc', boxShadow: \`0 0 15px \${displayBoost > 99 ? '#ff0055' : '#00ffcc'}\`, transition: 'width 0.1s' }} />
          </div>
          <div style={{ fontSize: 14, color: '#fff', fontWeight: 'bold', fontStyle: 'italic', marginTop: 5, textShadow: '0 0 10px #fff' }}>
             {displayBoost > 99 ? 'MAX BOOST READY! (SHIFT)' : 'TRICK TO BOOST'}
          </div>
`;

playerCode = playerCode.replace(oldUI, newUI);

// 5. Update physics loop for Boost and Camera Shake
const physicsHookStart = `const smoothedY = smoothedYRef.current || pos.current.y;`;
const physicsHookEnd = `camera.updateProjectionMatrix();`;

// Let's inject Boost logic where speed is calculated and combo is updated
playerCode = playerCode.replace("score.current += Math.max(0, vel.current.length() * dt * comboMultiplier.current);", 
  "score.current += Math.max(0, vel.current.length() * dt * comboMultiplier.current);\n    if (inAir) boostRef.current += dt * 5 * comboMultiplier.current;\n    if (boost && boostRef.current > 0) { boostRef.current -= dt * 20; vel.current.multiplyScalar(1.0 + 0.5 * dt); }");

playerCode = playerCode.replace("if (Math.abs(displayScore - score.current) > 10) setDisplayScore(Math.floor(score.current));",
  "if (Math.abs(displayScore - score.current) > 10) setDisplayScore(Math.floor(score.current));\n      if (Math.abs(displayBoost - boostRef.current) > 2) setDisplayBoost(Math.floor(boostRef.current));");

// 6. Camera shake on wipeout and landing
// Wait, we can add camera shake to the camera lookAt
playerCode = playerCode.replace("camera.lookAt(lookAt);", "if (cameraShake.current > 0) { lookAt.x += (Math.random()-0.5)*cameraShake.current; lookAt.y += (Math.random()-0.5)*cameraShake.current; cameraShake.current -= dt * 10; }\n      camera.lookAt(lookAt);");

// Trigger shake on wipeout
playerCode = playerCode.replace("isWipeout.current = true;", "isWipeout.current = true;\n             cameraShake.current = 5.0;");

// Trigger shake on perfect landing (wasInAir -> !inAir)
playerCode = playerCode.replace("wasInAir.current = inAir;", "if (wasInAir.current && !inAir) { cameraShake.current = Math.min(3.0, vel.current.length() * 0.02); boostRef.current += 10; }\n    wasInAir.current = inAir;");

fs.writeFileSync('components/Player.js', playerCode);
console.log("Juice added.");
