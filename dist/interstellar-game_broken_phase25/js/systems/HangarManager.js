class HangarManager {
    constructor(game) {
        this.game = game;
        this.currentHangarBay = 0;
        this.currentHangarTab = 'ships';
        this.hangarShips = [
            { id: 'interceptor', name: 'Aegis Interceptor', model: 'A-1 LIGHT', desc: 'Fast, agile scout.', speed: 2500, accel: 0.8, rotSpeed: 0.04, armor: 100, power: 80, color: '#00f3ff', health: 100, shield: 100 },
            { id: 'hauler', name: 'Mule Hauler', model: 'H-4 HEAVY', desc: 'Massive cargo hold.', speed: 1200, accel: 0.4, rotSpeed: 0.02, armor: 400, power: 150, color: '#ffaa00', health: 300, shield: 200 },
            { id: 'viper', name: 'Viper Strike', model: 'S-7 ELITE', desc: 'Advanced tactical fighter.', speed: 3000, accel: 1.0, rotSpeed: 0.05, armor: 150, power: 120, color: '#ff3366', health: 150, shield: 300 }
        ];
    }

    showShipModal() {
        if (this.game.hudManager) {
            this.game.hudManager.closeAllModals();
            this.game.hudManager.bringToFront('shipModal');
        }
        this.updateHangarUI();
    }

    hideShipModal() {
        const modal = document.getElementById('shipModal');
        if (modal) modal.classList.add('hidden');
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
        if (ship) {
            ship.color = color;
            this.updateHangarUI();
        }
    }

    selectShip() {
        const shipDesign = this.hangarShips[this.currentHangarBay];
        if (!shipDesign) return;

        this.game.playerShip = {
            ...this.game.playerShip,
            type: shipDesign.id,
            color: shipDesign.color,
            maxSpeed: shipDesign.speed / 10,
            acceleration: shipDesign.accel || 0.8,
            rotationSpeed: shipDesign.rotSpeed || 0.035,
            hullHealth: shipDesign.health,
            health: shipDesign.health, // Sync for legacy/hazard consistency
            maxHull: shipDesign.health,
            shield: shipDesign.shield,
            maxShield: shipDesign.shield,
            vz: 0, pitch: 0, roll: 0 // Initialize 3D orientations
        };

        this.game.hudManager.showToast(`SHIP SELECTED: ${shipDesign.name.toUpperCase()}`, 3000, 'success');
        this.hideShipModal();
        this.game.renderManager.draw();
        
        localStorage.setItem('playerShipType', shipDesign.id);
        localStorage.setItem('playerShipColor', shipDesign.color);
    }

    updateHangarUI() {
        const ship = this.hangarShips[this.currentHangarBay];
        if (!ship) return;

        const nameEl = document.getElementById('shipName');
        const modelEl = document.getElementById('shipModel');
        const descEl = document.getElementById('shipDesc');
        
        if (nameEl) nameEl.textContent = ship.name;
        if (modelEl) modelEl.textContent = ship.model;
        if (descEl) descEl.textContent = ship.desc;

        const speedBar = document.getElementById('statSpeed');
        const armorBar = document.getElementById('statArmor');
        const powerBar = document.getElementById('statPower');
        
        if (speedBar) speedBar.style.width = (ship.speed / 3000 * 100) + '%';
        if (armorBar) armorBar.style.width = (ship.armor / 500 * 100) + '%';
        if (powerBar) powerBar.style.width = (ship.power / 2000 * 100) + '%';

        const container = document.getElementById('hangarShipCanvas');
        if (container) {
            container.style.color = ship.color;
        }
    }
}

window.HangarManager = HangarManager;
