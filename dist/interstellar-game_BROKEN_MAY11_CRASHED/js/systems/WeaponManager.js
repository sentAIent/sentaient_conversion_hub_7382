class WeaponManager {
    constructor(game) {
        this.game = game;
        this.activeWeaponId = 'pulse_laser';
        this.unlockedWeapons = ['pulse_laser'];
        
        this.loadUnlocks();
        console.log("⚔️ [WeaponManager] Initialized.");
    }

    loadUnlocks() {
        const saved = localStorage.getItem('unlockedWeapons');
        if (saved) {
            try {
                this.unlockedWeapons = JSON.parse(saved);
                // Ensure pulse_laser is always there
                if (!this.unlockedWeapons.includes('pulse_laser')) {
                    this.unlockedWeapons.push('pulse_laser');
                }
            } catch (e) {
                console.error("[WeaponManager] Failed to load unlocks:", e);
            }
        }
        
        const active = localStorage.getItem('activeWeaponId');
        if (active && this.unlockedWeapons.includes(active)) {
            this.activeWeaponId = active;
        }
    }

    saveUnlocks() {
        localStorage.setItem('unlockedWeapons', JSON.stringify(this.unlockedWeapons));
        localStorage.setItem('activeWeaponId', this.activeWeaponId);
    }

    getActiveWeapon() {
        return WEAPON_TYPES[this.activeWeaponId] || WEAPON_TYPES.pulse_laser;
    }

    selectWeapon(id) {
        if (this.unlockedWeapons.includes(id)) {
            this.activeWeaponId = id;
            this.saveUnlocks();
            this.game.hudManager?.showToast(`⚔️ WEAPON SYSTEM: ${WEAPON_TYPES[id].name.toUpperCase()} ARMED`, 3000, 'info');
            if (window.gameAudio) window.gameAudio.playMenuSelect();
            this.updateOrdnanceUI();
            return true;
        }
        return false;
    }

    unlockWeapon(id) {
        const weapon = WEAPON_TYPES[id];
        if (!weapon) return;

        if (this.unlockedWeapons.includes(id)) return;

        // Use ResourceManager for formal credit deduction
        if (this.game.resourceManager?.removeCredits(weapon.cost)) {
            this.unlockedWeapons.push(id);
            this.saveUnlocks();
            this.game.hudManager?.showToast(`🔓 UNLOCKED: ${weapon.name.toUpperCase()}`, 3000, 'success');
            if (window.gameAudio) window.gameAudio.playUpgrade();
            this.updateOrdnanceUI();
            return true;
        } else {
            this.game.hudManager?.showToast(`INSUFFICIENT CREDITS! Need $${weapon.cost.toLocaleString()}`, 3000, 'error');
            return false;
        }
    }

    updateOrdnanceUI() {
        const panel = document.getElementById('ordnancePanel');
        if (!panel || panel.classList.contains('hidden')) return;

        const list = document.getElementById('ordnanceList');
        if (!list) return;

        list.innerHTML = Object.entries(WEAPON_TYPES).map(([id, w]) => {
            const isUnlocked = this.unlockedWeapons.includes(id);
            const isActive = this.activeWeaponId === id;
            const credits = this.game.resourceManager?.credits ?? this.game.credits ?? 0;
            const canAfford = credits >= w.cost;

            return `
                <div class="ordnance-item ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}" 
                     onclick="window.game.weaponManager.${isUnlocked ? `selectWeapon('${id}')` : `unlockWeapon('${id}')`}">
                    <div class="ordnance-info">
                        <div class="ordnance-name">${w.name} ${isActive ? ' (ARMED)' : ''}</div>
                        <div class="ordnance-desc">${w.description}</div>
                        <div class="ordnance-stats">
                            <span>DMG: ${w.damage}</span>
                            <span>ROF: ${Math.round(1000/w.fireRate)}/s</span>
                        </div>
                    </div>
                    <div class="ordnance-status">
                        ${isUnlocked ? 
                            (isActive ? '<span class="status-active">ONLINE</span>' : '<span class="status-ready">READY</span>') : 
                            `<span class="status-cost ${canAfford ? '' : 'poor'}">$${w.cost.toLocaleString()}</span>`
                        }
                    </div>
                </div>
            `;
        }).join('');
    }

    toggleOrdnancePanel() {
        const panel = document.getElementById('ordnancePanel');
        if (panel) {
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                this.updateOrdnanceUI();
            }
        }
    }
}

window.WeaponManager = WeaponManager;
