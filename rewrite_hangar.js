const fs = require('fs');

let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');
let js = fs.readFileSync('interstellar-game/script.js', 'utf8');

// 1. In CSS, we will replace the .wall-back and 3D environment entirely with a flat UI that looks 3D,
// or we will just add a new .hangar-ui-window that holds both.

css += `
/* --- COHESIVE HANGAR WINDOW OVERRIDE --- */
.docking-bay {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transform-style: flat !important;
    perspective: none !important;
    width: 100vw !important;
    height: 100vh !important;
    overflow: hidden !important;
}

.bay-walls, .bay-floor, .wall-side {
    display: none !important; /* Hide old 3D structure to avoid clipping */
}

/* The single unified window requested by user */
.hangar-ui-window {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 850px;
    max-width: 95vw;
    height: 520px;
    max-height: 85vh;
    padding: 40px;
    background: 
        radial-gradient(circle at 75% 50%, rgba(0, 243, 255, 0.18) 0%, transparent 55%),
        linear-gradient(135deg, rgba(2, 5, 10, 0.95) 0%, rgba(5, 15, 30, 0.85) 100%);
    border: 1px solid rgba(0, 243, 255, 0.2);
    border-top: 2px solid var(--accent);
    border-radius: 12px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.9), inset 0 0 40px rgba(0,243,255,0.05);
    z-index: 100;
    position: relative;
    box-sizing: border-box;
}

.hangar-left-col {
    width: 350px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 101;
}

.hangar-right-col {
    position: relative;
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 101;
}

/* Ship Specs Styling */
.ship-specs-modern {
    color: #fff;
    background: rgba(5, 10, 20, 0.6);
    border: 1px solid rgba(0, 243, 255, 0.2);
    border-radius: 8px;
    padding: 20px;
    box-shadow: inset 0 0 20px rgba(0, 243, 255, 0.05);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.specs-header-mod {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 243, 255, 0.3);
    padding-bottom: 10px;
    margin-bottom: 15px;
}
.specs-header-mod .bay-num {
    font-family: monospace;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 1px;
}
.specs-header-mod .status {
    color: #00ff66;
    font-family: monospace;
    font-weight: bold;
}
.specs-header-mod .status.locked {
    color: #ff4444;
}

.ship-specs-modern h3 {
    margin: 0 0 5px 0;
    color: var(--accent);
    font-size: 24px;
    letter-spacing: 2px;
    font-family: 'Exo 2', sans-serif;
}
.ship-specs-modern .subtitle {
    font-family: monospace;
    color: rgba(255,255,255,0.6);
    font-size: 12px;
    margin-bottom: 20px;
}

.spec-bar-container {
    margin-bottom: 15px;
}
.spec-bar-meta {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    font-family: monospace;
    margin-bottom: 5px;
    color: var(--accent);
}
.spec-bar-meta .val {
    color: #fff;
}
.spec-bar-bg {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
}
.spec-bar-fill {
    height: 100%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
}
.spec-desc-mod {
    margin-top: auto;
    font-size: 12px;
    color: rgba(255,255,255,0.7);
    line-height: 1.5;
}

/* Hologram Glow */
.holo-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: 
        radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.15) 0%, transparent 60%),
        repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(0, 243, 255, 0.05) 41px, transparent 42px);
    box-shadow: 0 0 50px rgba(0, 243, 255, 0.1);
    animation: radarSpin 20s linear infinite;
    z-index: 1;
}

.hangar-right-col canvas {
    position: relative;
    z-index: 2;
    animation: floatHolo 4s ease-in-out infinite;
}

.btn-container {
    margin-top: 20px;
    text-align: center;
}

@media (max-width: 900px) {
    .hangar-ui-window {
        flex-direction: column;
        height: auto;
        padding: 20px;
    }
    .hangar-left-col {
        width: 100%;
        order: 2;
    }
    .hangar-right-col {
        width: 100%;
        height: 250px;
        order: 1;
    }
    .hangar-right-col canvas {
        width: 250px;
        height: 250px;
    }
}
`;

fs.writeFileSync('interstellar-game/styles.css', css);

// 2. Rewrite script.js initHangar to use the new layout.
const initHangarStart = js.indexOf('initHangar() {');
const initHangarEnd = js.indexOf('    updateHangarUI() {');

const newInitHangar = `initHangar() {
        const track = document.getElementById('hangarTrack');
        if (!track) return;

        track.innerHTML = ''; // Clear old bays

        const shipPrices = {
            saucer: 500, viper: 600, orion: 700, draco: 800, hauler: 900,
            interceptor: 1000, bulwark: 1200, prospector: 1500, spectre: 2000,
            siphon: 2500, titan: 3500, nova: 4000, flux: 4500, pulses: 5000,
            apex: 6000, harvester: 7500, phoenix: 10000
        };

        this.hangarShips.forEach((ship, index) => {
            const bay = document.createElement('div');
            bay.className = 'docking-bay';
            bay.id = \`bay-\${ship.id}\`;

            const isLocked = ship.premium && !this.unlockedShips.includes(ship.id);
            const price = shipPrices[ship.id] || 1000;
            
            let btnAction = \`window.game.selectShip('\${ship.id}')\`;
            let btnText = (this.playerShip && this.playerShip.type === ship.id) ? 'SELECTED' : 'SELECT SHIP';
            let btnClass = (this.playerShip && this.playerShip.type === ship.id) ? 'select-ship-btn active' : 'select-ship-btn';

            if (isLocked) {
                if (this.playerGems >= price) {
                    btnAction = \`window.game.unlockShip('\${ship.id}', \${price})\`;
                    btnText = \`UNLOCK (\${price} GEMS)\`;
                    btnClass += ' unlock-btn available';
                } else {
                    btnAction = \`window.game.showToast('Not enough gems!', 2000)\`;
                    btnText = \`\${price} GEMS REQUIRED\`;
                    btnClass += ' unlock-btn locked';
                }
            }

            const speedPercent = Math.min(100, Math.round((ship.speed / 140) * 100));
            const armorPercent = Math.min(100, Math.round((ship.armor / 150) * 100) || 10);
            
            const lockStatusClass = isLocked ? 'locked' : '';
            const lockStatusText = isLocked ? 'SYSTEM LCKD' : 'SYS READY';
            const lockOverlayHtml = isLocked ? \`<div class="lock-overlay">⭐ \${price} GEMS</div>\` : '';

            bay.innerHTML = \`
                <div class="hangar-ui-window">
                    <div class="hangar-left-col">
                        <div class="ship-specs-modern">
                            <div class="specs-header-mod">
                                <span class="bay-num">UNIT 0\${index + 1}</span>
                                <span class="status \${lockStatusClass}">\${lockStatusText}</span>
                            </div>
                            <h3>\${ship.name.toUpperCase()}</h3>
                            <div class="subtitle">// CONFIG: \${ship.model || 'STANDARD'}</div>
                            
                            <div class="spec-bar-container">
                                <div class="spec-bar-meta">
                                    <span>SPEED RATING</span>
                                    <span class="val">\${speedPercent}%</span>
                                </div>
                                <div class="spec-bar-bg">
                                    <div class="spec-bar-fill" style="width: \${speedPercent}%"></div>
                                </div>
                            </div>

                            <div class="spec-bar-container">
                                <div class="spec-bar-meta">
                                    <span>HULL INTEGRITY</span>
                                    <span class="val">\${armorPercent}%</span>
                                </div>
                                <div class="spec-bar-bg">
                                    <div class="spec-bar-fill" style="width: \${armorPercent}%"></div>
                                </div>
                            </div>

                            <div class="spec-bar-container">
                                <div class="spec-bar-meta">
                                    <span>CORE POWER</span>
                                    <span class="val">\${ship.power}</span>
                                </div>
                            </div>

                            <div class="spec-desc-mod">\${ship.desc || 'No description available.'}</div>
                        </div>
                        <div class="btn-container">
                            <button class="\${btnClass}" onclick="\${btnAction}" style="width: 100%;">
                                \${btnText}
                            </button>
                        </div>
                    </div>
                    
                    <div class="hangar-right-col">
                        <div class="holo-glow"></div>
                        <canvas id="preview-\${ship.id}" width="400" height="400"></canvas>
                        \${lockOverlayHtml}
                    </div>
                </div>
            \`;
            track.appendChild(bay);
        });
    }

`;

const newJs = js.substring(0, initHangarStart) + newInitHangar + js.substring(initHangarEnd);
fs.writeFileSync('interstellar-game/script.js', newJs);

