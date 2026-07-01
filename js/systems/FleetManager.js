/**
 * FleetManager.js
 * Handles player-owned AI assets, hiring, salaries, and class-based command scaling.
 * Phase 9: Fleet & Asset Command
 */

class FleetManager {
    constructor(game) {
        this.game = game;
        this.escorts = []; // Player-owned wingmen
        this.activeCommand = 'defend'; // defend, attack, patrol, retreat
        
        // Slot mapping: Ship Type -> Max Fleet Slots
        this.SLOT_MAP = {
            'viper': 1,
            'flux': 2,
            'sentinel': 2,
            'spectre': 2,
            'raptor': 3,
            'titan': 4,
            'hauler': 5,
            'nexus-carrier': 8
        };

        // Salary definitions (per minute)
        this.SALARY_MAP = {
            'scout': 50,
            'interceptor': 150,
            'defender': 300,
            'support': 250
        };

        this.payrollTimer = 60000; // 60s Interval
    }

    init() {
        console.log("🛸 [Fleet] Fleet Manager Initialized.");
        this.loadEscorts();
    }

    getMaxSlots() {
        const type = this.game.playerShip?.type || 'viper';
        return this.SLOT_MAP[type] || 1;
    }

    hireEscort(type) {
        if (this.escorts.length >= this.getMaxSlots()) {
            this.game.hudManager.showToast(`FLEET CAPACITY REACHED (${this.getMaxSlots()})`, 3000, 'warning');
            return false;
        }

        const cost = this.getHiringCost(type);
        if (this.game.credits >= cost) {
            this.game.removeCredits(cost);
            const escort = this.createEscortEntity(type);
            this.escorts.push(escort);
            this.game.logManager?.addEntry('FLEET', `Hired ${type.toUpperCase()} escort for $${cost.toLocaleString()}`, 'success');
            this.saveEscorts();
            return true;
        } else {
            this.game.hudManager.showToast("INSUFFICIENT CREDITS", 3000, 'error');
            return false;
        }
    }

    getHiringCost(type) {
        const baseCosts = { 'scout': 1000, 'interceptor': 5000, 'defender': 12000, 'support': 8000 };
        return baseCosts[type] || 1000;
    }

    createEscortEntity(type) {
        const player = this.game.playerShip;
        return {
            id: `escort_${Date.now()}_${Math.random()}`,
            type: type,
            health: 200,
            maxHealth: 200,
            x: player.x + (Math.random() - 0.5) * 200,
            y: player.y + (Math.random() - 0.5) * 200,
            vx: 0, vy: 0,
            rotation: player.rotation,
            alignment: 'player_fleet'
        };
    }

    update(dt) {
        if (!this.game.flightMode) return;

        // Salary Loop
        this.payrollTimer -= 16.6 * dt; // Approx ms
        if (this.payrollTimer <= 0) {
            this.processPayroll();
            this.payrollTimer = 60000;
        }

        this.updateEscortAI(dt);
    }

    processPayroll() {
        let totalSalary = 0;
        this.escorts.forEach(e => {
            totalSalary += this.SALARY_MAP[e.type] || 50;
        });

        if (totalSalary === 0) return;

        if (this.game.credits >= totalSalary) {
            this.game.removeCredits(totalSalary);
            this.game.logManager?.addEntry('ECONOMY', `Payroll Payout: -$${totalSalary} for ${this.escorts.length} ships.`, 'info');
            this.game.hudManager?.showToast(`💰 PAYROLL PROCESSED: -$${totalSalary}`, 4000, 'info');
        } else {
            this.handleBankruptcy();
        }
    }

    handleBankruptcy() {
        if (this.escorts.length > 0) {
            this.game.hudManager?.showToast("⚠️ BANKRUPTCY: Fleet Abandoned!", 5000, 'error');
            this.game.logManager?.addEntry('FLEET', "Bankruptcy: Escorts have deserted due to lack of funds.", 'error');
            this.escorts = [];
            this.saveEscorts();
        }
    }

    updateEscortAI(dt) {
        const player = this.game.playerShip;
        if (!player) return;

        this.escorts.forEach((escort, index) => {
            // Target determination based on activeCommand
            let targetX = player.x;
            let targetY = player.y;
            
            // Formation offsets (V-shape)
            const side = index % 2 === 0 ? 1 : -1;
            const fold = Math.floor(index / 2) + 1;
            const offsetAngle = player.rotation + Math.PI + (0.5 * side * fold);
            const offsetDist = 150 + (fold * 50);
            
            const destX = player.x + Math.cos(offsetAngle) * offsetDist;
            const destY = player.y + Math.sin(offsetAngle) * offsetDist;

            // Simple attraction physics
            const dx = destX - escort.x;
            const dy = destY - escort.y;
            const dist = Math.hypot(dx, dy);

            if (dist > 10) {
                const angle = Math.atan2(dy, dx);
                const speed = 7 * (dist > 500 ? 1.5 : 1);
                escort.x += Math.cos(angle) * speed * dt;
                escort.y += Math.sin(angle) * speed * dt;
                
                // Rotation learp
                const rotDiff = angle - escort.rotation;
                escort.rotation += Math.asin(Math.sin(rotDiff)) * 0.1 * dt;
            } else {
                const rotDiff = player.rotation - escort.rotation;
                escort.rotation += Math.asin(Math.sin(rotDiff) || 0) * 0.1 * dt;
            }
        });
    }

    issueCommand(command) {
        this.activeCommand = command;
        this.game.hudManager?.showToast(`📡 FLEET ORDER: ${command.toUpperCase()}`, 3000, 'info');
        this.game.logManager?.addEntry('FLEET', `Issued command: ${command.toUpperCase()}`);
    }

    saveEscorts() {
        localStorage.setItem('fleet_escorts', JSON.stringify(this.escorts));
    }

    loadEscorts() {
        try {
            const saved = localStorage.getItem('fleet_escorts');
            if (saved) this.escorts = JSON.parse(saved);
        } catch (e) { console.error("Fleet load error", e); }
    }
}

window.FleetManager = FleetManager;
