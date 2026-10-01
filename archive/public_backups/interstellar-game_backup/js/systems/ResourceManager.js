class ResourceManager {
    constructor(game) {
        this.game = game;
        this.credits = 0;
        this.playerInventory = {};
        this.playerGems = 0;
        this.carriedResources = {};
        this.showGemValues = true;
    }

    init() {
        this.credits = this.game.persistenceManager.loadCredits();
        this.playerInventory = this.game.persistenceManager.loadInventory();
        this.playerGems = parseInt(localStorage.getItem('playerGems')) || 0;
        this.carriedResources = this.game.persistenceManager.loadCarriedResources();
    }

    addCredits(amount) {
        this.credits += amount;
        this.game.persistenceManager.saveCredits();
        this.game.hudManager.updateWalletUI();
    }

    removeCredits(amount) {
        if (this.credits >= amount) {
            this.credits -= amount;
            this.game.persistenceManager.saveCredits();
            this.game.hudManager.updateWalletUI();
            return true;
        }
        return false;
    }

    addResource(type, count = 1) {
        this.playerInventory[type] = (this.playerInventory[type] || 0) + count;
        this.playerGems += count;
        this.game.persistenceManager.saveInventory();
        localStorage.setItem('playerGems', this.playerGems);
        this.game.hudManager.updateInventoryUI();
    }

    carryResource(type, count = 1) {
        this.carriedResources[type] = (this.carriedResources[type] || 0) + count;
        if (this.game.playerShip) {
            this.game.playerShip.cargoCount = (this.game.playerShip.cargoCount || 0) + count;
        }
        this.game.persistenceManager.saveCarriedResources();
    }

    depositResources() {
        let count = 0;
        let value = 0;
        Object.entries(this.carriedResources).forEach(([type, amt]) => {
            this.addResource(type, amt);
            const info = MINERAL_TYPES[type];
            if (info) value += amt * info.value;
            count += amt;
        });
        
        this.carriedResources = {};
        if (this.game.playerShip) this.game.playerShip.cargoCount = 0;
        this.game.persistenceManager.saveCarriedResources();
        
        if (count > 0) {
            this.game.hudManager.showToast(`DEPOSITED ${count} RESOURCES ($${Math.round(value).toLocaleString()})`, 3000, 'success');
            if (window.gameAudio) window.gameAudio.playCollect();
        }
    }
}

window.ResourceManager = ResourceManager;
