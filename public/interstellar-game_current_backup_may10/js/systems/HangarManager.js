class HangarManager {
    constructor(game) {
        this.game = game;
        this.currentHangarBay = 0;
        this.currentHangarTab = 'ships';
        this.hangarShips = [
            { id: 'interceptor', name: 'Aegis Interceptor', model: 'A-1 LIGHT', desc: 'Fast, agile scout for recon.', speed: 2500, accel: 0.8, rotSpeed: 0.04, armor: 100, power: 80, color: '#00f3ff', health: 100, shield: 100, cost: 0, unlocked: true },
            { id: 'hauler', name: 'Mule Hauler', model: 'H-4 HEAVY', desc: 'Massive cargo capacity.', speed: 1200, accel: 0.4, rotSpeed: 0.02, armor: 400, power: 150, color: '#ffaa00', health: 300, shield: 200, cost: 5000, unlocked: false },
            { id: 'viper', name: 'Viper Strike', model: 'S-7 ELITE', desc: 'Tactical fighter with high burst.', speed: 3200, accel: 1.1, rotSpeed: 0.05, armor: 150, power: 120, color: '#ff3366', health: 150, shield: 300, cost: 12000, gems: { titanium: 10 }, unlocked: false },
            { id: 'phoenix', name: 'Solar Phoenix', model: 'P-9 MAJESTIC', desc: 'Sleek, heat-shielded speedster.', speed: 3800, accel: 1.3, rotSpeed: 0.045, armor: 180, power: 300, color: '#ff6600', health: 200, shield: 400, cost: 25000, gems: { sapphire: 15 }, unlocked: false },
            { id: 'titan', name: 'Colossus Titan', model: 'T-10 DREAD', desc: 'Unstoppable imperial juggernaut.', speed: 900, accel: 0.3, rotSpeed: 0.015, armor: 900, power: 500, color: '#ffffff', health: 1000, shield: 500, cost: 50000, gems: { ruby: 20 }, unlocked: false },
            { id: 'draco', name: 'Shadow Draco', model: 'D-5 STEALTH', desc: 'Infiltration craft with low sig.', speed: 2800, accel: 0.9, rotSpeed: 0.06, armor: 120, power: 100, color: '#444444', health: 120, shield: 200, cost: 35000, gems: { emerald: 15 }, unlocked: false },
            { id: 'nova', name: 'Supernova Burst', model: 'N-2 ENERGY', desc: 'Advanced energy weapon platform.', speed: 2000, accel: 0.7, rotSpeed: 0.035, armor: 250, power: 800, color: '#aa00ff', health: 250, shield: 600, cost: 45000, gems: { diamond: 15 }, unlocked: false },
            { id: 'apex', name: 'Apex Vanguard', model: 'X-100 ULTIMA', desc: 'The pinnacle of interstellar engineering.', speed: 4500, accel: 1.5, rotSpeed: 0.05, armor: 500, power: 1000, color: '#ffd700', health: 500, shield: 1000, cost: 100000, gems: { prismatic: 50 }, unlocked: false }
        ];
        this.loadUnlocks();
    }

    loadUnlocks() {
        const unlocked = JSON.parse(localStorage.getItem('unlockedShips')) || ['interceptor'];
        this.hangarShips.forEach(s => {
            if (unlocked.includes(s.id)) s.unlocked = true;
        });
    }

    saveUnlocks() {
        const unlocked = this.hangarShips.filter(s => s.unlocked).map(s => s.id);
        localStorage.setItem('unlockedShips', JSON.stringify(unlocked));
    }

    showShipModal() {
        if (this.game.hudManager) {
            this.game.hudManager.closeAllModals();
            this.game.hudManager.bringToFront('shipModal');
        }
        this.modalActive = true;
        this.startHangarLoop();
        this.updateHangarUI();
    }

    showOrdnance() {
        this.showShipModal();
        this.setHangarTab('skins'); // Pivot to skins/customization
    }

    hideShipModal() {
        const modal = document.getElementById('shipModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
        this.modalActive = false;
        
        // Restore flight mode cleanly if we were in flight
        if (this.game.flightMode && this.game.hudManager) {
            this.game.hudManager.showFlightHUD();
        }
    }

    startHangarLoop() {
        if (!this.modalActive) return;
        this.updateHangarUI();
        requestAnimationFrame(() => this.startHangarLoop());
    }

    setHangarTab(tab) {
        this.currentHangarTab = tab;
        document.querySelectorAll('.h-tab').forEach(el => {
            el.classList.toggle('active', el.id === `tab-${tab}`);
        });
        this.updateHangarUI();
    }

    prevHangarBay() {
        this.currentHangarBay = (this.currentHangarBay - 1 + this.hangarShips.length) % this.hangarShips.length;
        this.updateHangarUI();
    }

    nextHangarBay() {
        this.currentHangarBay = (this.currentHangarBay + 1) % this.hangarShips.length;
        this.updateHangarUI();
    }

    setHangarColor(color) {
        const ship = this.hangarShips[this.currentHangarBay];
        if (ship && ship.unlocked) {
            ship.color = color;
            this.updateHangarUI();
        }
    }

    selectShip() {
        const shipDesign = this.hangarShips[this.currentHangarBay];
        if (!shipDesign) return;

        if (!shipDesign.unlocked) {
            this.unlockShip(shipDesign);
            return;
        }

        this.game.playerShip = {
            ...this.game.playerShip,
            type: shipDesign.id,
            color: shipDesign.color,
            maxSpeed: shipDesign.speed / 10,
            acceleration: shipDesign.accel || 0.8,
            rotationSpeed: shipDesign.rotSpeed || 0.035,
            hullHealth: shipDesign.health,
            health: shipDesign.health, 
            maxHull: shipDesign.health,
            shield: shipDesign.shield,
            maxShield: shipDesign.shield,
            vz: 0, pitch: 0, roll: 0
        };

        this.game.hudManager?.showToast(`SHIP SELECTED: ${shipDesign.name.toUpperCase()}`, 3000, 'success');
        this.hideShipModal();
        
        if (!this.game.flightMode && this.game.engineCore) {
            this.game.engineCore.toggleFlightMode();
        }
        
        this.game.renderManager?.draw();
        
        localStorage.setItem('playerShipType', shipDesign.id);
        localStorage.setItem('playerShipColor', shipDesign.color);
    }

    unlockShip(ship) {
        // Check Credits
        if ((this.game.credits || 0) < ship.cost) {
            this.game.hudManager?.showToast(`INSUFFICIENT CREDITS! Need $${ship.cost.toLocaleString()}`, 3000, 'error');
            return;
        }

        // Check Gems
        if (ship.gems) {
            const rm = this.game.resourceManager;
            for (const [type, amt] of Object.entries(ship.gems)) {
                if ((rm?.getGemCount(type) || 0) < amt) {
                    this.game.hudManager?.showToast(`INSUFFICIENT ${type.toUpperCase()}! Need ${amt}`, 3000, 'error');
                    return;
                }
            }
            // Deduct Gems
            for (const [type, amt] of Object.entries(ship.gems)) {
                rm.spendGem(type, amt);
            }
        }

        // Deduct Credits
        this.game.credits -= ship.cost;
        ship.unlocked = true;
        this.saveUnlocks();
        this.game.hudManager?.updateWalletUI();
        this.game.hudManager?.showToast(`UNLOCKED: ${ship.name.toUpperCase()}`, 4000, 'success');
        this.updateHangarUI();
        
        if (window.gameAudio) window.gameAudio.playMenuSelect();
    }

    updateHangarUI() {
        const ship = this.hangarShips[this.currentHangarBay];
        if (!ship) return;

        const nameEl = document.getElementById('shipName');
        const modelEl = document.getElementById('shipModel');
        const descEl = document.getElementById('shipDesc');
        const speedBar = document.getElementById('statSpeed');
        const armorBar = document.getElementById('statArmor');
        const powerBar = document.getElementById('statPower');
        const actionBtn = document.querySelector('.btn-majestic');

        if (nameEl) nameEl.textContent = ship.name.toUpperCase();
        if (modelEl) modelEl.textContent = ship.model;
        if (descEl) descEl.textContent = ship.desc;

        if (speedBar) speedBar.style.width = `${(ship.speed / 5000) * 100}%`;
        if (armorBar) armorBar.style.width = `${(ship.armor / 1000) * 100}%`;
        if (powerBar) powerBar.style.width = `${(ship.power / 1000) * 100}%`;

        if (actionBtn) {
            if (ship.unlocked) {
                actionBtn.textContent = 'CONFIRM SELECTION';
                actionBtn.style.background = 'linear-gradient(135deg, rgba(0, 243, 255, 0.2), rgba(0, 255, 170, 0.2))';
            } else {
                let costText = `$${ship.cost.toLocaleString()}`;
                if (ship.gems) {
                    const gemStr = Object.entries(ship.gems).map(([t, a]) => `${a} ${t}`).join(', ');
                    costText += ` + ${gemStr}`;
                }
                actionBtn.textContent = `UNLOCK [${costText.toUpperCase()}]`;
                actionBtn.style.background = 'linear-gradient(135deg, rgba(255, 170, 0, 0.2), rgba(255, 50, 0, 0.2))';
            }
        }

        // Draw Ship Hologram
        const canvas = document.getElementById('hangarShipCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const w = canvas.width;
            const h = canvas.height;
            const size = Math.min(w, h) * 0.25;

            ctx.clearRect(0, 0, w, h);
            
            // Holographic Background
            const grad = ctx.createRadialGradient(w/2, h/2, size*0.5, w/2, h/2, size*2.5);
            grad.addColorStop(0, ship.color + '33');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            ctx.save();
            ctx.translate(w/2, h/2);
            ctx.rotate(-Math.PI / 2); // Face forward in preview
            
            // Pulse effect
            const pulse = 0.9 + Math.sin(Date.now() * 0.003) * 0.1;
            ctx.scale(pulse, pulse);

            // Call the engine's drawing method for this ship type
            if (this.game) {
                const type = ship.id;
                const methodName = 'draw' + type.charAt(0).toUpperCase() + type.slice(1);
                if (this.game[methodName]) {
                    this.game[methodName](ctx, size, ship.color, 1.0, Date.now());
                } else {
                    // Fallback to interceptor drawing if specific method doesn't exist
                    this.drawHologramFallback(ctx, size, ship.color);
                }
            }
            ctx.restore();
        }
    }

    drawHologramFallback(ctx, size, color) {
        ctx.strokeStyle = color || '#00f3ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(size, 0);
        ctx.lineTo(-size * 0.6, size * 0.8);
        ctx.lineTo(-size * 0.3, 0);
        ctx.lineTo(-size * 0.6, -size * 0.8);
        ctx.closePath();
        ctx.stroke();
    }
}

window.HangarManager = HangarManager;
