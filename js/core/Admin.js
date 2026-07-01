class AdminManager {
    constructor(game) {
        this.game = game;
    }

    toggleAdminPanel() {
        const panel = document.getElementById('adminPanel');
        if (!panel) return;

        const isVisible = panel.style.display === 'block';
        panel.style.display = isVisible ? 'none' : 'block';

        if (!isVisible) {
            this.updateAdminDebugInfo();
        }
    }

    initAdminPanel() {
        const panel = document.getElementById('adminPanel');
        if (!panel) return;

        // Populate with tools
        let html = `
            <div style="background:rgba(0,0,0,0.9); padding:15px; border-radius:8px; border:1px solid #ff00ff; color:#fff; font-family:monospace; font-size:12px;">
                <h3 style="margin-top:0; color:#ff00ff; display:flex; justify-content:space-between;">
                    ADMIN TERMINAL
                    <span onclick="window.game.adminManager.toggleAdminPanel()" style="cursor:pointer; color:#888;">[X]</span>
                </h3>
                <div id="adminDebugStats" style="margin-bottom:10px; padding:5px; background:rgba(255,255,255,0.05); border-radius:4px;"></div>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:5px;">
                    <button onclick="window.game.credits += 100000; window.game.hudManager.updateWalletUI();" style="background:#222; border:1px solid #00ff00; color:#00ff00; padding:5px; cursor:pointer;">+100K Credits</button>
                    <button onclick="window.game.playerGems += 500; localStorage.setItem('playerGems', window.game.playerGems);" style="background:#222; border:1px solid #00ffff; color:#00ffff; padding:5px; cursor:pointer;">+500 Gems</button>
                    <button onclick="window.game.combatManager.destroyBoss();" style="background:#222; border:1px solid #ff0000; color:#ff0000; padding:5px; cursor:pointer;">Kill Boss</button>
                    <button onclick="window.game.hazardManager.spawnAllHazards();" style="background:#222; border:1px solid #ff9900; color:#ff9900; padding:5px; cursor:pointer;">Chaos Spawn</button>
                    <button onclick="window.game.persistenceManager.exportSaveData();" style="background:#222; border:1px solid #888; color:#fff; padding:5px; cursor:pointer;">Backup Save</button>
                    <button onclick="location.reload();" style="background:#222; border:1px solid #888; color:#fff; padding:5px; cursor:pointer;">Reload Engine</button>
                </div>
            </div>
        `;
        panel.innerHTML = html;
        panel.style.display = 'none';

        // Keyboard Shortcut: [ALT] + [~]
        window.addEventListener('keydown', (e) => {
            if (e.altKey && e.code === 'Backquote') {
                this.toggleAdminPanel();
            }
        });
    }

    updateAdminDebugInfo() {
        const statsEl = document.getElementById('adminDebugStats');
        if (!statsEl) return;

        const game = this.game;
        const fps = Math.round(60 / (game._lastFrameTime ? (performance.now() - game._lastFrameTime) / 16.66 : 1));
        game._lastFrameTime = performance.now();

        statsEl.innerHTML = `
            <div><b>FPS:</b> ${fps || 60}</div>
            <div><b>Entities:</b> ${game.enemyShips.length + game.spacecraft.length + game.minerals.length}</div>
            <div><b>Hazards:</b> ${game.spaceMines.length + game.missileBases.length}</div>
            <div><b>Particles:</b> ${game.damageParticles.length}</div>
            <div><b>Pos:</b> ${Math.round(game.playerShip?.x || 0)}, ${Math.round(game.playerShip?.y || 0)}</div>
        `;
    }
}

// Make accessible globally
if (typeof window !== 'undefined') {
    window.AdminManager = AdminManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminManager;
}
