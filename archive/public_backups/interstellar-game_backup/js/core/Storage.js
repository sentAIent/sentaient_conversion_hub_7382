class PersistenceManager {
    constructor(game) {
        this.game = game;
    }

    loadInventory() {
        try {
            const data = localStorage.getItem('playerInventory');
            if (data) return JSON.parse(data);
        } catch (e) {
            console.error('[Storage] Failed to load inventory:', e);
        }
        return {};
    }

    saveInventory() {
        try {
            localStorage.setItem('playerInventory', JSON.stringify(this.game.playerInventory || {}));
            if (this.game.playerGems !== undefined) {
                localStorage.setItem('playerGems', this.game.playerGems);
            }
        } catch (e) {
            console.error('[Storage] Failed to save inventory:', e);
        }
    }

    loadCredits() {
        return parseInt(localStorage.getItem('playerCredits')) || 0;
    }

    saveCredits() {
        localStorage.setItem('playerCredits', this.game.credits);
        this.syncWithCloud();
    }

    loadUpgrades() {
        try {
            return JSON.parse(localStorage.getItem('playerUpgrades')) || { speed: 0, armor: 0, weapons: 0, shield: 0, cargo: 0, radar: 0, tractor: 0, ecm: 0, flares: 0 };
        } catch (e) {
            return { speed: 0, armor: 0, weapons: 0, shield: 0, cargo: 0, radar: 0, tractor: 0, ecm: 0, flares: 0 };
        }
    }

    saveUpgrades() {
        if (this.game.playerShip && this.game.playerShip.upgrades) {
            localStorage.setItem('playerUpgrades', JSON.stringify(this.game.playerShip.upgrades));
        }
        this.syncWithCloud();
    }

    loadFactionRep() {
        try {
            const saved = localStorage.getItem('factionRep');
            return saved ? JSON.parse(saved) : { xenon: 0, mauler: 0, terran: 0 };
        } catch (e) {
            console.error('[Storage] FactionRep parse failed, resetting.', e);
            return { xenon: 0, mauler: 0, terran: 0 };
        }
    }

    saveFactionRep() {
        localStorage.setItem('factionRep', JSON.stringify(this.game.factionRep));
    }

    // === WINGMEN PERSISTENCE (Phase 6) ===
    loadWingmen() {
        try {
            const data = localStorage.getItem('playerWingmen');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('[Storage] Failed to load wingmen:', e);
            return [];
        }
    }

    saveWingmen() {
        try {
            localStorage.setItem('playerWingmen', JSON.stringify(this.game.playerWingmen || []));
        } catch (e) {
            console.error('[Storage] Failed to save wingmen:', e);
        }
    }

    loadTrainingProgress() {
        try {
            return JSON.parse(localStorage.getItem('trainingProgress')) || {};
        } catch (e) { return {}; }
    }

    // === LEGACY & ASCENSION (Phase 18) ===
    loadLegacyData() {
        try {
            const data = localStorage.getItem('playerLegacy');
            return data ? JSON.parse(data) : { legacyPoints: 0, ascensions: 0, trophies: [] };
        } catch (e) {
            return { legacyPoints: 0, ascensions: 0, trophies: [] };
        }
    }

    saveLegacyData() {
        try {
            localStorage.setItem('playerLegacy', JSON.stringify(this.game.legacyData || { legacyPoints: 0, ascensions: 0, trophies: [] }));
        } catch (e) {
            console.error('[Storage] Legacy save failed:', e);
        }
    }

    loadCarriedResources() {
        try {
            const data = localStorage.getItem('carriedResources');
            if (data) return JSON.parse(data);
        } catch (e) {
            console.error('[Storage] Failed to load carried resources:', e);
        }
        return {};
    }

    saveCarriedResources() {
        try {
            localStorage.setItem('carriedResources', JSON.stringify(this.game.carriedResources || {}));
            if (this.game.playerShip) {
                localStorage.setItem('cargoCount', this.game.playerShip.cargoCount || 0);
            }
        } catch (e) {
            console.error('[Storage] Failed to save carried resources:', e);
        }
    }

    exportSaveData() {
        const data = {
            credits: this.game.credits,
            playerGems: this.game.playerGems,
            inventory: this.game.playerInventory,
            carried: this.game.carriedResources,
            factionRep: this.game.factionRep,
            legacy: this.game.legacyData,
            modules: this.game.marketplaceManager ? Array.from(this.game.marketplaceManager.installedModules) : [],
            timestamp: Date.now()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `interstellar_save_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (this.game.hudManager) this.game.hudManager.showToast('💾 Save Data Exported');
    }

    triggerImportSaveData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => this.importDataFromFile(e);
        input.click();
    }

    importDataFromFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.credits === undefined) throw new Error('Invalid save file');

                this.game.credits = data.credits;
                this.game.playerGems = data.playerGems || 0;
                this.game.playerInventory = data.inventory || {};
                this.game.carriedResources = data.carried || {};
                this.game.factionRep = data.factionRep || {};
                this.game.legacyData = data.legacy || { legacyPoints: 0, ascensions: 0, trophies: [] };

                localStorage.setItem('playerCredits', this.game.credits);
                localStorage.setItem('playerGems', this.game.playerGems);
                this.saveInventory();
                this.saveCarriedResources();
                this.saveFactionRep();
                this.saveLegacyData();

                if (data.modules && this.game.marketplaceManager) {
                    localStorage.setItem('interstellar_modules', JSON.stringify(data.modules));
                }

                if (this.game.hudManager) this.game.hudManager.showToast('✅ Data Imported! Reloading...');
                setTimeout(() => location.reload(), 1500);
            } catch (err) {
                console.error('[Persistence] Import failed:', err);
                if (this.game.hudManager) this.game.hudManager.showToast('❌ Import Failed: Invalid File');
            }
        };
        reader.readAsText(file);
    }

    syncWithCloud() {
        console.log('[Bridge] Syncing comprehensive empire data to Hub...');
        window.parent.postMessage({
            type: 'SAVE_GAME_DATA',
            data: {
                aetherCredits: this.game.credits,
                aetherGems: this.game.playerGems,
                reputation: this.game.factionRep,
                inventory: this.game.playerInventory,
                shipType: this.game.playerShip ? this.game.playerShip.type : 'none',
                legacyPoints: this.game.legacyData ? this.game.legacyData.legacyPoints : 0,
                upgrades: this.game.playerShip ? this.game.playerShip.upgrades : null,
                installedModules: this.game.marketplaceManager ? Array.from(this.game.marketplaceManager.installedModules) : [],
                timestamp: Date.now()
            }
        }, '*');
    }
}

window.PersistenceManager = PersistenceManager;

// === DEFENSIVE GLOBAL REGISTRATION ===
if (typeof window !== 'undefined') {
    window.PersistenceManager = PersistenceManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersistenceManager;
}
