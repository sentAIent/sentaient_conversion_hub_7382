const fs = require('fs');

let playerCode = fs.readFileSync('components/Player.js', 'utf8');

const htmlStart = `
      {/* Dynamic Carve Trail */}
      <CarveTrail playerPos={pos} carvingIntensity={carvingIntensity} />`;

const htmlReplacement = `
      {/* Dynamic Carve Trail */}
      <CarveTrail playerPos={pos} carvingIntensity={carvingIntensity} />

      {/* Touch Controls Overlay */}
      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', bottom: 30, left: 30, display: 'flex', pointerEvents: 'auto', opacity: 0.7 }}>
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
            <div style={{ pointerEvents: 'none', color: '#00d0ff', fontWeight: 'bold' }}>STEER</div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 30, right: 30, display: 'flex', gap: 15, pointerEvents: 'auto', opacity: 0.8 }}>
           <div 
            style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255, 0, 255, 0.3)', border: '2px solid #ff00ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}
            onTouchStart={() => controls.current.grab = true}
            onTouchEnd={() => controls.current.grab = false}
          >
            GRAB
          </div>
          <div 
            style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255, 165, 0, 0.3)', border: '2px solid #ffa500', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}
            onTouchStart={() => controls.current.jump = true}
            onTouchEnd={() => controls.current.jump = false}
          >
            JUMP
          </div>
        </div>
      </Html>`;

playerCode = playerCode.replace(htmlStart, htmlReplacement);
fs.writeFileSync('components/Player.js', playerCode);
console.log("Touch controls added!");
