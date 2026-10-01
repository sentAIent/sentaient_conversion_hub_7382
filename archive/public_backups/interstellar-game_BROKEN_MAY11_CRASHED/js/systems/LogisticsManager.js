/**
 * LogisticsManager.js
 * Handles automated trade routes, resource logistics, and economic scaling.
 * Phase 22 & 23: Sovereignty Update
 */

class LogisticsManager {
    constructor(game) {
        this.game = game;
        this.tradeRoutes = []; // { id, sectorA, sectorB, value, status }
        this.lastRouteTick = Date.now();
        this.baseIncomePerMinute = 500;
    }

    init() {
        this.loadLogisticsData();
        console.log("🚛 [Logistics] Automated Trade Network Online.");
    }

    update() {
        const now = Date.now();
        // Route Income Tick (Every 2 minutes)
        if (now - this.lastRouteTick > 120000) {
            this.processTradeRoutes();
            this.lastRouteTick = now;
        }
    }

    processTradeRoutes() {
        if (this.tradeRoutes.length === 0) return;

        let totalIncome = 0;
        let raidTriggered = false;

        this.tradeRoutes.forEach(route => {
            if (route.status !== 'active') return;

            // Base income + sector development bonus
            const bonusA = this.getSectorDevelopmentBonus(route.sectorA);
            const bonusB = this.getSectorDevelopmentBonus(route.sectorB);
            const routeValue = (this.baseIncomePerMinute * 2) * (1 + bonusA + bonusB);
            
            totalIncome += routeValue;
            route.value = routeValue;

            // Hazard Chance (Pirate Raids) — 5% chance per high-value route
            if (routeValue > 2000 && Math.random() < 0.05) {
                raidTriggered = true;
                this.triggerPirateRaid(route);
            }
        });

        if (totalIncome > 0) {
            this.game.credits += Math.floor(totalIncome);
            this.game.hudManager?.updateWalletUI();
            this.game.hudManager?.showToast(`📦 Trade Logistics: +$${Math.floor(totalIncome).toLocaleString()} in revenue`, 3000, 'info');
        }
    }

    getSectorDevelopmentBonus(sectorKey) {
        // High-level development bonus based on visited sectors and buildings
        // (Placeholder for Phase 23 deepening)
        return 0.2; // Temp static bonus
    }

    triggerPirateRaid(route) {
        const currentSector = this.game.sectorManager?.getCurrentSectorData();
        const routeKeyA = `${route.sectorA.x},${route.sectorA.y}`;
        const currentKey = `${currentSector?.x},${currentSector?.y}`;

        if (routeKeyA === currentKey && this.game.aiManager) {
            console.log(`🏴‍C️ [Logistics] Pirate Raid detected on route ${route.id}!`);
            
            // Phase 4: BUFFERED RAID (5s Warning)
            this.game.hudManager?.showCriticalAlert("Gravitic Warp Distortion: Pirate Raid in 5s", 5000);
            
            setTimeout(() => {
                // Second check before spawning (incase of warp out)
                const nowSector = this.game.sectorManager?.getCurrentSectorData();
                if (`${nowSector?.x},${nowSector?.y}` !== currentKey) return;

                for (let i = 0; i < 3; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 1200 + Math.random() * 600; // Increased distance for fairness
                    const x = (this.game.playerShip?.x || 0) + Math.cos(angle) * dist;
                    const y = (this.game.playerShip?.y || 0) + Math.sin(angle) * dist;
                    
                    this.game.aiManager.ships.push({
                        id: `pirate_raid_${Date.now()}_${i}`,
                        faction: 'VOID_BORN', 
                        x: x, y: y,
                        homeX: x, homeY: y,
                        rotation: Math.random() * Math.PI * 2,
                        color: '#FF4500',
                        alignment: 'hostile',
                        vesselType: 'scout',
                        size: 25,
                        health: 150, maxHealth: 150
                    });
                }
                this.game.hudManager?.showToast("🏴‍☠️ PIRATES HAVE DROPPED FROM WARP!", 4000, 'error');
            }, 5000);
            
        } else {
            // Background raid: minor credit loss
            const loss = Math.floor(route.value * 1.5);
            this.game.credits = Math.max(0, this.game.credits - loss);
            this.game.hudManager?.showToast(`⚠️ Trade convoy lost to pirates near ${route.id}: -$${loss}`, 5000, 'warning');
        }
    }

    addTradeRoute(sectorA, sectorB) {
        const id = `TR_${sectorA.x}${sectorA.y}_${sectorB.x}${sectorB.y}`;
        if (this.tradeRoutes.find(r => r.id === id)) return false;

        this.tradeRoutes.push({
            id: id,
            sectorA: sectorA,
            sectorB: sectorB,
            value: 0,
            status: 'active'
        });
        this.saveLogisticsData();
        return true;
    }

    saveLogisticsData() {
        localStorage.setItem('interstellar_trade_routes', JSON.stringify(this.tradeRoutes));
    }

    loadLogisticsData() {
        try {
            const saved = localStorage.getItem('interstellar_trade_routes');
            if (saved) this.tradeRoutes = JSON.parse(saved);
        } catch (e) { console.error("Logistics Load Error", e); }
    }

    /**
     * getTrunkStats - Calculates automated trade network metrics for the HUD
     */
    getTrunkStats() {
        const activeRoutes = this.tradeRoutes.filter(r => r.status === 'active').length;
        let totalValue = 0;
        this.tradeRoutes.forEach(r => totalValue += (r.value || 0));

        // Efficiency is based on route health vs pure base value
        const efficiency = activeRoutes > 0 ? 0.85 + (Math.random() * 0.1) : 0; // Simulated efficiency for Phase 23

        return {
            activeRoutes: activeRoutes,
            totalValue: totalValue,
            efficiency: efficiency,
            pending: 0
        };
    }
}

window.LogisticsManager = LogisticsManager;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogisticsManager;
}
