class EngineCore {
    constructor(game) {
        this.game = game;
    }

    toggleFlightMode() {
        try {
            // Debounce guard: prevent double-fire within 500ms
            const now = Date.now();
            if (this._lastToggle && now - this._lastToggle < 500) {
                console.warn('[Engine] toggleFlightMode debounced (double-fire prevented)');
                return;
            }
            this._lastToggle = now;
            
            const game = this.game;
            console.log(`🚀 [Engine] Toggling Flight Mode. Current: ${game.flightMode}`);

            // Safety: Ensure ship is initialized BEFORE world generation
            if (!game.playerShip) {
                console.warn('[Engine] Warning: playerShip missing during toggle. Initializing defaults...');
                game.playerShip = {
                    x: 0, y: 0, vx: 0, vy: 0, vz: 0, rotation: 0, pitch: 0, roll: 0,
                    hullHealth: 100, maxHull: 100, shield: 100, maxShield: 100,
                    upgrades: {}, cargoCount: 0, maxCargo: 1000,
                    type: 'interceptor', color: '#00f3ff'
                };
            }

            game.flightMode = !game.flightMode;
            game.mode = game.flightMode ? 'flight' : 'draw';
            console.log(`🚀 [Engine] State Changed: Mode=${game.mode}, Flight=${game.flightMode}`);
            if (game.updateStats) game.updateStats();



            if (game.flightMode) {
                console.log('🚀 [Engine] FLIGHT MODE ENGAGED');
                
                // 🛡️ SYSTEMIC HEALTH GUARD: Reset ship state to prevent death-on-spawn loop
                if (game.playerShip) {
                    game.playerShip.maxHull = game.playerShip.maxHull || 100;
                    game.playerShip.maxShield = game.playerShip.maxShield || 100;
                    game.playerShip.hullHealth = game.playerShip.maxHull;
                    game.playerShip.shield = game.playerShip.maxShield;
                    game.playerShip.health = game.playerShip.maxHull; // Legacy support
                    console.log('✅ [Engine] Ship integrity restored for flight.');
                }

                game.checkAndGenerateSectors();
                
                // Hide Lotus Engine Overlay (if it exists)
                const lotusOverlay = document.getElementById('lotusEngineOverlay');
                if (lotusOverlay) {
                    lotusOverlay.classList.remove('visible');
                    lotusOverlay.classList.add('hidden');
                    lotusOverlay.style.display = 'none';
                }
            } else {
                console.log('🚀 [Engine] RETURN TO DRAW MODE');
            }

            // Coordinates Safety
            if (game.playerShip) {
                if (!isFinite(game.playerShip.x)) game.playerShip.x = 0;
                if (!isFinite(game.playerShip.y)) game.playerShip.y = 0;
                if (!isFinite(game.playerShip.vx)) game.playerShip.vx = 0;
                if (!isFinite(game.playerShip.vy)) game.playerShip.vy = 0;
            }

            // Effect Cleanup
            if (game.hazardEffect && game.hazardEffect.type !== 'supernova') {
                game.hazardEffect = null;
            }
            game.camera.shakeX = 0; game.camera.shakeY = 0;

            // HUD & UI Management
            const hud = document.getElementById('flightHUD');
            const floatingLeaders = document.getElementById('floatingLeaders');
            const floatingMap = document.getElementById('floatingMap');
            const bottomBar = document.querySelector('.bottom-bar');
            const selectShipBtn = document.getElementById('selectShipBtn');
            const dockBtn = document.getElementById('dockBtn');

            if (game.flightMode) {
                // Show flight UI
                if (hud) hud.classList.remove('hidden');
                if (floatingLeaders) floatingLeaders.classList.remove('hidden');
                if (floatingMap) floatingMap.classList.remove('hidden');
                if (bottomBar) bottomBar.style.display = 'none'; // Hide drawing tools
                if (selectShipBtn) selectShipBtn.style.display = '';
                if (dockBtn) dockBtn.style.display = '';
                
                if (game.hudManager) {
                    game.hudManager.updateFloatingLeaderboard();
                    game.hudManager.showToast('🚀 FLIGHT ENGAGED - WASD to move');
                    game.hudManager.updateMissionHUD();
                    game.hudManager.updateFactionHUD();
                }
            } else {
                // Show drawing UI
                if (hud) hud.classList.add('hidden');
                if (floatingLeaders) floatingLeaders.classList.add('hidden');
                if (floatingMap) floatingMap.classList.add('hidden');
                if (bottomBar) bottomBar.style.display = ''; // Show drawing tools
                if (selectShipBtn) selectShipBtn.style.display = 'none';
                if (dockBtn) dockBtn.style.display = 'none';
            }

            // Trigger immediate redraw
            game.renderManager.draw();

        } catch (error) {
            console.error('❌ [Engine] FATAL ERROR during toggleFlightMode:', error);
            // Fallback recovery
            try { this.game.flightMode = false; this.game.mode = 'draw'; } catch(e) {}
        }
    }

    handlePlayerDeath() {
        const game = this.game;
        if (game.hazardEffect) return;

        console.log('[Death] Started dramatic death sequence');
        if (window.gameAudio) window.gameAudio.playExplosion();

        game.hazardEffect = {
            type: 'player_death',
            startTime: performance.now(),
            duration: 4000,
            phase: 'shaking',
            flashIntensity: 0,
            ventingPoints: []
        };

        for (let i = 0; i < 5; i++) {
            game.hazardEffect.ventingPoints.push({
                offsetX: (Math.random() - 0.5) * 40,
                offsetY: (Math.random() - 0.5) * 40,
                startTime: 500 + Math.random() * 2000,
                duration: 1000,
                size: 10 + Math.random() * 20
            });
        }

        if (game.playerShip) {
            game.playerShip.vx *= 0.1;
            game.playerShip.vy *= 0.1;
        }
    }

    updateMinerals() {
        const game = this.game;
        if (!game.playerShip) return;

        // --- SECTOR-AWARE COLLECTION (O(1) search) ---
        const sector = game.proceduralManager.getSectorCoords(game.playerShip.x, game.playerShip.y);
        
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const key = `${sector.x + dx},${sector.y + dy}`;
                const sectorData = game.loadedSectors.get(key);
                if (sectorData && sectorData.minerals) {
                    for (let i = sectorData.minerals.length - 1; i >= 0; i--) {
                        const m = sectorData.minerals[i];
                        const dX = game.playerShip.x - m.x;
                        const dY = game.playerShip.y - m.y;
                        const distSq = dX * dX + dY * dY;
                        
                        if (distSq < 1600) { // 40^2 = 1600
                            game.playerManager.collectMineral(m, sectorData);
                        }
                    }
                }
            }
        }
    }

    updateDamageParticles() {
        const game = this.game;
        const particles = game.damageParticles;
        if (!particles || particles.length === 0) return;
        
        let writeIdx = 0;
        for (let readIdx = 0; readIdx < particles.length; readIdx++) {
            const p = particles[readIdx];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay || 0.02;
            
            if (p.life > 0) {
                if (readIdx !== writeIdx) {
                    particles[writeIdx] = p;
                }
                writeIdx++;
            }
        }
        
        if (writeIdx !== particles.length) {
            particles.length = writeIdx;
        }
    }

}

// Make accessible globally
if (typeof window !== 'undefined') {
    window.EngineCore = EngineCore;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EngineCore;
}
