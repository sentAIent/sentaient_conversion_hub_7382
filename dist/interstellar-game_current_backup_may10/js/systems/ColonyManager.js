class ColonyManager {
    constructor(game) {
        this.game = game;
        this.colony = {
            population: 0,
            maxPopulation: 0,
            powerGenerated: 0,
            powerConsumed: 0,
            researchPoints: 0,
            researchRate: 0,
            tier: 1,
            completedResearch: []
        };
        this.milestones = {
            EMPIRE_FOUNDER: false,
            LOGISTICS_MOGUL: false,
            PLANETARY_DEFENDER: false,
            GALACTIC_HEGEMON: false,
            ASCENDED: false
        };
        this.nexusCredits = 0;
        this.nexusUpgrades = {
            ancient_alloy: 0,
            nexus_drill: 0,
            void_reactor: 0
        };
    }

    init() {
        this.colony.completedResearch = JSON.parse(localStorage.getItem('colonyResearch')) || [];
        this.milestones = JSON.parse(localStorage.getItem('empireMilestones')) || this.milestones;
        this.nexusCredits = parseInt(localStorage.getItem('nexusCredits')) || 0;
        this.nexusUpgrades = JSON.parse(localStorage.getItem('nexusUpgrades')) || this.nexusUpgrades;

        // === EMPIRE BRIDGE HANDSHAKE ===
        window.addEventListener('message', (event) => {
            if (event.data.type === 'HUB_HANDSHAKE') {
                console.log("🌌 [Empire Bridge] Handshake received from Hub. Synchronizing...");
                this.syncEmpireData();
                this.game.hudManager.showToast("EMPIRE BRIDGE LINK STABILIZED", 3000, 'success');
            }
        });
        
        // Initial sync request
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'INTERSTELLAR_READY' }, '*');
        }
    }

    openAcademy() {
        const panel = document.getElementById('academyPanel');
        if (panel) {
            panel.style.display = 'flex';
            this.updateAcademyUI();
        }
        if (window.gameAudio) window.gameAudio.playMenuHover();
    }

    updateAcademyUI() {
        const tree = document.getElementById('researchTree');
        if (!tree) return;

        const researchItems = [
            { id: 'auto_mine', name: 'Automated Extraction', desc: 'Collectors generate 25% more credits.', cost: 10, tier: 1 },
            { id: 'shield_harmonics', name: 'Shield Harmonics', desc: 'Bases gain +50% shield capacity.', cost: 25, tier: 1 },
            { id: 'pop_optimization', name: 'Habitat Efficiency', desc: 'Habitats house 5 more population.', cost: 15, tier: 1 },
            { id: 'black_hole_gen', name: 'Gravity Mastery', desc: 'Unlocks the Black Hole Generator ability.', cost: 100, tier: 2 },
            { id: 'chrono_shift', name: 'Time Dilation', desc: 'Unlocks the Chrono-Shift ability.', cost: 150, tier: 2 },
            { id: 'nano_fabrication', name: 'Nano-Fabrication', desc: 'Drones mine minerals 2× faster.', cost: 500, tier: 3 },
            { id: 'quantum_relays', name: 'Quantum Relays', desc: 'Cargo drones move at 3× speed.', cost: 1000, tier: 3 },
            { id: 'singularity_power', name: 'Singularity Power', desc: 'Infinite power for all base modules.', cost: 2500, tier: 4 },
            { id: 'project_ascension', name: 'Project Ascension', desc: 'Trigger the final victory sequence.', cost: 5000, tier: 4 }
        ];

        const completed = this.colony.completedResearch;
        this.colony.tier = completed.length > 8 ? 4 : (completed.length > 5 ? 3 : (completed.length > 2 ? 2 : 1));

        tree.innerHTML = researchItems.map(item => {
            const isCompleted = completed.includes(item.id);
            const isLocked = item.tier > this.colony.tier;
            const canAfford = this.colony.researchPoints >= item.cost;
            
            let statusClass = isCompleted ? 'completed' : (isLocked ? 'locked' : '');
            
            return `
                <div class="research-card ${statusClass}" onclick="window.game.purchaseResearch('${item.id}', ${item.cost})">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                    <div class="cost">Cost: ${item.cost} Research Points</div>
                    <div class="research-progress-bg">
                        <div class="research-progress-fill" style="width: ${isCompleted ? '100%' : '0%'}"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    purchaseResearch(id, cost) {
        if (this.colony.completedResearch.includes(id)) return;
        
        if (this.colony.researchPoints >= cost) {
            this.colony.researchPoints -= cost;
            this.colony.completedResearch.push(id);
            
            // Effect applications should ideally be delegated or handled via events
            this.game.applyResearchEffect(id);
            
            localStorage.setItem('colonyResearch', JSON.stringify(this.colony.completedResearch));
            this.updateAcademyUI();
            this.game.baseBuilder.updateColonyUI();
            this.checkMilestones();
            
            if (window.gameAudio) window.gameAudio.playMenuSelect();
        } else {
            this.game.hudManager.showToast('Insufficient Research Points!', 2000, 'error');
        }
    }

    checkMilestones() {
        let changed = false;
        
        if (!this.milestones.EMPIRE_FOUNDER && this.game.spaceBases.length >= 1) {
            this.milestones.EMPIRE_FOUNDER = true;
            this.game.hudManager.showToast('🏆 Milestone: Empire Founder Unlocked!', 5000, 'success');
            changed = true;
        }

        const connectedBases = this.game.spaceBases.filter(b => Object.values(b).some(v => v === 'log')).length;
        if (!this.milestones.LOGISTICS_MOGUL && connectedBases >= 3) {
            this.milestones.LOGISTICS_MOGUL = true;
            this.game.hudManager.showToast('🏆 Milestone: Logistics Mogul Unlocked!', 5000, 'success');
            changed = true;
        }

        const totalPop = this.game.spaceBases.reduce((sum, b) => sum + (b.population || 0), 0);
        let popCap = 1000;
        if (this.game.warpGateManager) {
            const ringCount = this.game.warpGateManager.gates.filter(g => g.structType === 'ring').length;
            popCap += ringCount * 5000;
        }

        if (!this.milestones.GALACTIC_HEGEMON && totalPop >= popCap) {
            this.milestones.GALACTIC_HEGEMON = true;
            this.game.hudManager.showToast('🏆 Milestone: Galactic Hegemon Unlocked!', 5000, 'success');
            changed = true;
        }

        if (changed) {
            localStorage.setItem('empireMilestones', JSON.stringify(this.milestones));
        }
    }

    getEmpireRank() {
        const bases = this.game.spaceBases || [];
        const baseCount = bases.length;
        const totalPop = bases.reduce((sum, b) => sum + (b.population || 0), 0);
        const megaCount = this.game.warpGateManager?.gates.length || 0;
        const hasRing = this.game.warpGateManager?.gates.some(g => g.structType === 'ring');

        if (baseCount >= 5 && totalPop >= 50000 && hasRing) return { name: 'HIGH HEGEMON', color: '#ffd700', level: 4 };
        if (baseCount >= 3 && totalPop >= 10000 && megaCount >= 1) return { name: 'SECTOR LORD', color: '#00ccff', level: 3 };
        if (baseCount >= 1 && totalPop >= 500) return { name: 'PLANETARY GOVERNOR', color: '#00ffaa', level: 2 };
        
        return { name: 'VANGUARD SCOUT', color: '#888', level: 1 };
    }

    triggerAscensionEvent() {
        this.milestones.ASCENDED = true;
        localStorage.setItem('empireMilestones', JSON.stringify(this.milestones));

        const totalPop = this.game.spaceBases.reduce((sum, b) => sum + (b.population || 0), 0);
        const awardedCredits = Math.floor(totalPop / 10) + Math.floor(this.game.credits / 1000);
        this.nexusCredits += awardedCredits;
        localStorage.setItem('nexusCredits', this.nexusCredits);

        if (window.gameAudio) {
            window.gameAudio.stopEngineHum();
            window.gameAudio.playMissionComplete(); 
        }

        if (this.game.renderManager) {
            this.game.renderManager.flashWhite(3.0);
        }

        setTimeout(() => {
            this.game.hudManager.showVictoryOverlay(awardedCredits);
        }, 3000);
    }

    commenceNewCycle() {
        localStorage.removeItem('interstellarBases');
        localStorage.removeItem('playerUpgrades');
        localStorage.removeItem('colonyResearch');
        localStorage.setItem('nexusCredits', this.nexusCredits);
        location.reload();
    }

    /**
     * renderRankBadge - Generates high-fidelity SVG badges for the Empire UI
     * Majestic Rank Badges (Phase 18 Restoration)
     */
    renderRankBadge(level) {
        const colors = {
            1: ['#444', '#888'],       // Vanguard (Iron/Steel)
            2: ['#008855', '#00ffaa'], // Governor (Jade/Plasma)
            3: ['#0055aa', '#00ccff'], // Sector Lord (Cobalt/Ion)
            4: ['#aa8800', '#ffd700']  // High Hegemon (Gold/Solar)
        };
        const [dark, light] = colors[level] || colors[1];
        
        return `
        <div class="rank-badge-container" style="width:100px; height:100px; position:relative; overflow:visible;">
            <svg viewBox="0 0 100 100" style="width:100%; height:100%; filter: drop-shadow(0 0 10px ${light}44);">
                <!-- Outer Frame -->
                <circle cx="50" cy="50" r="45" fill="none" stroke="${dark}" stroke-width="1" stroke-dasharray="2,4" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="${light}" stroke-width="0.5" opacity="0.3" />
                
                ${level >= 2 ? `<polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="none" stroke="${light}" stroke-width="1" opacity="0.5" />` : ''}
                ${level >= 3 ? `<path d="M20,30 L50,10 L80,30 L80,70 L50,90 L20,70 Z" fill="none" stroke="${light}" stroke-width="2" />` : ''}
                ${level >= 4 ? `<circle cx="50" cy="50" r="15" fill="none" stroke="${light}" stroke-width="3" stroke-dasharray="1,2" />` : ''}

                <!-- Central Icon -->
                <g transform="translate(50,50)">
                    ${level === 1 ? `
                        <path d="M0,-15 L4,-4 L15,0 L4,4 L0,15 L-4,4 L-15,0 L-4,-4 Z" fill="none" stroke="#fff" stroke-width="2" />
                        <circle r="3" fill="#fff" />
                    ` : ''}
                    ${level === 2 ? '<circle r="12" fill="none" stroke="#fff" stroke-width="2" />' : ''}
                    ${level === 3 ? '<path d="M-15,0 L0,-15 L15,0 L0,15 Z" fill="none" stroke="#fff" stroke-width="3" />' : ''}
                    ${level === 4 ? `
                        <path d="M0,-20 L5,-5 L20,0 L5,5 L0,20 L-5,5 L-20,0 L-5,-5 Z" fill="#fff" opacity="0.9" />
                        <circle r="6" fill="#fff" />
                    ` : ''}
                </g>
                
                <!-- Rank pips -->
                ${Array.from({length: level}).map((_, i) => `
                    <rect x="${40 + i*6}" y="85" width="4" height="4" fill="${light}" />
                `).join('')}
            </svg>
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; border-radius:50%; background:radial-gradient(circle, ${light}11 0%, transparent 70%); pointer-events:none;"></div>
        </div>
        `;
    }
}

window.ColonyManager = ColonyManager;
