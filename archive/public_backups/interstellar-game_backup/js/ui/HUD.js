class HUDManager {
    constructor(game) {
        this.game = game;
    }


    updateWalletUI() {
        const creditsEl = document.getElementById('walletValue');
        if (creditsEl) {
            creditsEl.textContent = this.game.credits.toLocaleString();
        }
        const creditsDisplay = document.getElementById('creditsDisplay'); // Legacy support
        if (creditsDisplay) {
            creditsDisplay.textContent = '$' + this.game.credits.toLocaleString();
        }
    }


    updateInventoryUI() {
        const gemsGrid = document.getElementById('gemsGrid');
        const gemsTotalEl = document.getElementById('gemsTotal');

        if (!gemsGrid) return;

        let totalValue = 0;
        let html = '';

        // Calculate total value
        Object.entries(this.game.playerInventory || {}).forEach(([type, count]) => {
            const info = MINERAL_TYPES[type];
            if (info) totalValue += count * info.value;
        });

        // Display ALL types
        Object.keys(MINERAL_TYPES).forEach(type => {
            const info = MINERAL_TYPES[type];
            const count = (this.game.playerInventory && this.game.playerInventory[type]) || 0;

            const itemValue = count * info.value;
            const valueDisplay = this.game.showGemValues ? `<span style="color:${info.color}; font-weight:bold; margin-left:6px;">$${Math.round(itemValue).toLocaleString()}</span>` : '';

            const opacity = count > 0 ? 1 : 0.5;
            const bgAlpha = count > 0 ? 0.6 : 0.2;

            html += `
                        <div class="gem-item" style="border:1px solid ${info.color}44; background: rgba(0,0,0,${bgAlpha}); opacity: ${opacity};">
                            <div style="${this.game.styleGem(type)}"></div>
                            <span style="color:${info.color}">${info.name}</span>
                            <span class="gem-count">×${count}</span>
                            ${valueDisplay}
                        </div>
                    `;
        });

        gemsGrid.innerHTML = html;

        if (gemsTotalEl) {
            gemsTotalEl.textContent = `$${totalValue.toLocaleString()}`;
        }
    }

    updateShipStatus() {

        const ship = this.game.playerShip;
        if (!ship) return;

        // Update shield bar
        const shieldBar = document.getElementById('shieldBar');
        const shieldText = document.getElementById('shieldText');

        if (shieldBar && shieldText) {
            const shieldPercent = (ship.shield / ship.maxShield) * 100;
            shieldBar.style.width = shieldPercent + '%';
            shieldText.textContent = `${Math.round(ship.shield)} / ${Math.round(ship.maxShield)}`;

            // Change color based on shield level
            if (shieldPercent < 25) {
                shieldBar.style.background = 'linear-gradient(90deg, #ff3333, #ff6666)';
                shieldBar.style.boxShadow = '0 0 15px rgba(255, 50, 50, 0.8)';
            } else if (shieldPercent < 50) {
                shieldBar.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc00)';
                shieldBar.style.boxShadow = '0 0 10px rgba(255, 170, 0, 0.6)';
            } else {
                shieldBar.style.background = 'linear-gradient(90deg, #00aaff, #00ffff)';
                shieldBar.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
            }
        }

        // Update health bar (reflects actual hull health)
        const hullBar = document.getElementById('hullBar');
        const hullText = document.getElementById('hullText');

        if (hullBar && hullText) {
            const hullPercent = Math.max(0, Math.min(100, (this.game.playerShip.hullHealth / this.game.playerShip.maxHull) * 100));
            hullBar.style.width = `${hullPercent}%`;
            hullText.textContent = `${Math.round(hullPercent)}%`;

            // Color feedback based on health
            if (hullPercent <= 25) {
                hullBar.style.background = 'linear-gradient(90deg, #ff3333, #ff6666)';
                hullBar.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.8)';
            } else if (hullPercent <= 50) {
                hullBar.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc00)';
                hullBar.style.boxShadow = '0 0 10px rgba(255, 170, 0, 0.6)';
            } else {
                hullBar.style.background = 'linear-gradient(90deg, #00cc55, #00ff88)';
                hullBar.style.boxShadow = '0 0 10px rgba(0, 255, 100, 0.5)';
            }
        }

        // Show/hide damage warning
        const damageWarning = document.getElementById('damageWarning');
        if (damageWarning) {
            const isTakingDamage = this.game.hazardEffect && (this.game.hazardEffect.type === 'missile_hit' || this.game.hazardEffect.type === 'planet_impact');
            damageWarning.style.display = isTakingDamage ? 'block' : 'none';
        }

        // Quick Repair Button visibility (Monetization Hook)
        const repairBtn = document.getElementById('quickRepairBtn');
        if (repairBtn) {
            const hullPercent = (this.game.playerShip.hullHealth / this.game.playerShip.maxHull) * 100;
            // Show if hull is < 30% and player has enough credits
            if (hullPercent < 30 && this.game.credits >= 2000) {
                repairBtn.style.display = 'block';
            } else {
                repairBtn.style.display = 'none';
            }
        }
    }

    updateMissionHUD() {
        const section = document.getElementById('sectionMission');
        const content = document.getElementById('missionContent');
        if (!section || !content) return;

        if (this.game.activeMission && this.game.flightMode) {
            section.style.display = 'flex';
            // Make mission window VERY prominent with pulsing glow
            section.style.border = '2px solid #00ffcc';
            section.style.boxShadow = '0 0 20px rgba(0,255,204,0.5), 0 0 40px rgba(0,255,204,0.2), inset 0 0 15px rgba(0,255,204,0.1)';
            section.style.animation = 'missionPulse 2s ease-in-out infinite';
            section.style.zIndex = '50';
            // Inject keyframe if not present
            if (!document.getElementById('missionPulseStyle')) {
                const style = document.createElement('style');
                style.id = 'missionPulseStyle';
                style.textContent = `
                    @keyframes missionPulse {
                        0%, 100% { box-shadow: 0 0 20px rgba(0,255,204,0.5), 0 0 40px rgba(0,255,204,0.2); border-color: #00ffcc; }
                        50% { box-shadow: 0 0 30px rgba(0,255,204,0.8), 0 0 60px rgba(0,255,204,0.4); border-color: #66ffdd; }
                    }
                `;
                document.head.appendChild(style);
            }
            const m = this.game.activeMission;
            const pct = Math.min(100, Math.round((m.progress / m.goal) * 100));
            
            // Use the mission-specific hint if available, fall back to generic
            let tip = '';
            if (m.hint) {
                tip = `<div style="color: #00eaff; font-size: 11px; margin-top: 8px; font-style: italic; font-weight: bold; line-height: 1.4; background: rgba(0,234,255,0.08); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #00eaff;">${m.hint}</div>`;
            } else if (m.type === 'kill' || m.type === 'kill_any' || m.type === 'boss') {
                tip = '<div style="color: #ff6b6b; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(255,50,50,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #ff6b6b;">🎯 Hold [SPACE] to Fire Weapons</div>';
            } else if (m.type === 'collect') {
                tip = '<div style="color: #f17eff; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(241,126,255,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #f17eff;">💎 Fly over glowing gems to collect</div>';
            } else if (m.type === 'survive') {
                tip = '<div style="color: #ffaa00; font-size: 11px; margin-top: 8px; font-weight: bold; background: rgba(255,170,0,0.1); padding: 6px 8px; border-radius: 4px; border-left: 3px solid #ffaa00;">⚠️ Dodge hazards — stay alive!</div>';
            }
            
            content.innerHTML = `
                <div style="color: #00ffcc; font-weight: bold; font-size: 14px; margin-bottom: 4px; text-shadow: 0 0 8px rgba(0,255,204,0.4);">${m.name}</div>
                <div style="color: #ddd; margin-bottom: 8px; font-size: 12px; line-height: 1.4;">${m.desc}</div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 6px; padding: 8px; margin-bottom: 4px;">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #aaa; margin-bottom: 4px;">
                        <span>PROGRESS</span>
                        <span style="color: #00ff88; font-weight: bold;">${m.progress} / ${m.goal}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); border-radius: 3px; height: 8px; overflow: hidden;">
                        <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #00ff88, #00ffcc); border-radius: 3px; transition: width 0.3s ease; box-shadow: 0 0 8px rgba(0,255,136,0.5);"></div>
                    </div>
                </div>
                ${tip}
            `;
        } else {
            section.style.display = 'none';
            section.style.border = '';
            section.style.boxShadow = '';
            section.style.animation = '';
        }
    }

    updateFactionHUD() {
        const panel = document.getElementById('sectionFactions');
        if (!panel) return;

        if (!this.game.flightMode) {
            panel.style.display = 'none';
            return;
        }

        panel.style.display = 'block';

        const content = document.getElementById('factionsContent');
        if (!content) return;

        const factions = [
            { key: 'xenon',  label: 'Xenon Hive',      color: '#ff4444' },
            { key: 'mauler', label: 'Mauler Cartel',    color: '#ff9900' },
            { key: 'terran', label: 'Terran Defense',   color: '#44aaff' },
        ];

        content.innerHTML = factions.map(f => {
            const rep = this.game.factionRep[f.key] || 0;
            const pct = ((rep + 100) / 200) * 100; // -100..100 => 0..100%
            const status = rep > 30 ? 'Friendly' : rep < -30 ? 'Hostile' : 'Neutral';
            const statusColor = rep > 30 ? '#44ff88' : rep < -30 ? '#ff4444' : '#ffdd44';
            return `<div style="margin-bottom:6px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:2px;">
                    <span style="color:${f.color};font-weight:bold;">${f.label}</span>
                    <span style="color:${statusColor};font-size:10px;">${status}</span>
                </div>
                <div style="background:rgba(255,255,255,0.1);border-radius:3px;height:6px;overflow:hidden;">
                    <div style="width:${pct.toFixed(1)}%;height:100%;background:${f.color};transition:width 0.3s;"></div>
                </div>
                <div style="text-align:right;font-size:9px;color:#888;margin-top:1px;">${rep > 0 ? '+' : ''}${rep}</div>
            </div>`;
        }).join('');
    }

    showToast(msg) {
        console.log('[Toast]', msg);
        // Create a toast element if needed
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:8px;z-index:9999;transition:opacity 0.3s';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        clearTimeout(this.game._toastTimeout);
        this.game._toastTimeout = setTimeout(() => { toast.style.opacity = '0'; }, 2000);
    }
}
window.HUDManager = HUDManager;
