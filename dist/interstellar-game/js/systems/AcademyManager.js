class AcademyManager {
    constructor(game) {
        this.game = game;
        this.lessons = [
            { id: 'navigation', title: 'Basic Navigation', desc: 'Master the thrusters and orientation.', completed: false },
            { id: 'mining', title: 'Resource Extraction', desc: 'Learn to mine gems from asteroids.', completed: false },
            { id: 'combat', title: 'Tactical Combat', desc: 'Engage enemy drones with lasers.', completed: false },
            { id: 'warping', title: 'Warp Gate Usage', desc: 'Travel between sectors using gates.', completed: false },
            { id: 'orbiting', title: 'Orbital Insertion', desc: 'Enter stable orbit around terrestrial planets.', completed: false },
            { id: 'base_landing', title: 'Planetary Landing', desc: 'Successfully land on a planet surface.', completed: false },
            { id: 'building', title: 'Base Construction', desc: 'Place your first habitat module.', completed: false },
            { id: 'logistics', title: 'Advanced Logistics', desc: 'Setup automated trade routes.', completed: false },
            { id: 'defense', title: 'System Defense', desc: 'Repulse a pirate raid.', completed: false },
            { id: 'ascension', title: 'The Final Frontier', desc: 'Achieve the final state of colonization.', completed: false }
        ];
        this.currentLessonIndex = 0;
        this.sessionProgress = {
            rotationStart: 0,
            rotationDelta: 0,
            mineralsCollected: 0,
            kills: 0,
            maxSpeedReached: 0,
            timeInOrbit: 0
        };
    }

    init() {
        const progress = JSON.parse(localStorage.getItem('academyProgress')) || {};
        this.lessons.forEach(l => {
            if (progress[l.id]) l.completed = true;
        });
        this.currentLessonIndex = parseInt(localStorage.getItem('currentLessonIndex')) || 0;
    }

    openAcademy() {
        this.game.hudManager.showAcademyOverview();
        if (window.gameAudio) window.gameAudio.playMenuHover();
    }


    selectLesson(index) {
        this.currentLessonIndex = index;
        this.game.hudManager.showAcademyOverview();
        if (window.gameAudio) window.gameAudio.playMenuHover();
    }

    getObjectiveForLesson(id) {
        const objectives = {
            navigation: 'Accelerate to 2000 m/s and perform 3 full rotations.',
            mining: 'Collect 10 raw minerals from any asteroid field.',
            combat: 'Defeat 3 hostile drones in the training sector.',
            warping: 'Locate and enter a Warp Gate to another sector.',
            orbiting: 'Achieve a stable orbit (dist < 1000) around a planet.',
            base_landing: 'Touch down on a terrestrial planet surface.',
            building: 'Open the Base Builder and place a Habitat module.',
            logistics: 'Build a Logistics module and earn $500 in trade.',
            defense: 'Successfully repel a pirate raid on your base.',
            ascension: 'Reach a total population of 1000 across your empire.'
        };
        return objectives[id] || 'Follow training guidelines.';
    }

    startLesson(index) {
        const lesson = this.lessons[index];
        this.game.closeAllModals();
        this.game.hudManager.showToast(`SIMULATION START: ${lesson.title}`, 3000, 'info');
        
        // Transition to flight mode if not already
        if (!this.game.flightMode) this.game.toggleFlightMode();
        
        // Setup specific training markers/goals (Phase 2 extension)
        this.resetSessionProgress();
        this.setupTrainingGoal(lesson.id);
        
        if (window.gameAudio) window.gameAudio.playMenuSelect();
    }

    resetSessionProgress() {
        this.sessionProgress = {
            rotationStart: this.game.playerShip ? this.game.playerShip.rotation : 0,
            rotationDelta: 0,
            mineralsCollected: 0,
            kills: 0,
            maxSpeedReached: 0,
            timeInOrbit: 0,
            hasLanded: false,
            hasBuilt: false
        };
    }

    update(dt) {
        if (!this.game.flightMode || !this.game.activeMission || !this.game.activeMission.id.startsWith('academy_')) return;

        const lessonId = this.game.activeMission.id.replace('academy_', '');
        const ship = this.game.playerShip;
        if (!ship) return;

        switch (lessonId) {
            case 'navigation':
                // Check Speed (2000 m/s goal)
                if (ship.speed > 18) { // Assuming 1.0 units ~ 100m/s based on previous logic
                    this.sessionProgress.maxSpeedReached = Math.max(this.sessionProgress.maxSpeedReached, ship.speed);
                }
                // Check Rotations (3 full rotations)
                const currentRot = ship.rotation;
                const delta = Math.abs(currentRot - (this.lastFrameRot || currentRot));
                this.sessionProgress.rotationDelta += delta;
                this.lastFrameRot = currentRot;

                if (this.sessionProgress.maxSpeedReached >= 18 && this.sessionProgress.rotationDelta > Math.PI * 6) {
                    this.completeLesson('navigation');
                }
                break;

            case 'mining':
                if (this.sessionProgress.mineralsCollected >= 10) {
                    this.completeLesson('mining');
                }
                break;

            case 'combat':
                if (this.sessionProgress.kills >= 3) {
                    this.completeLesson('combat');
                }
                break;

            case 'warping':
                if (this.game.sectorManager && this.game.sectorManager.isWarping) {
                    this.completeLesson('warping');
                }
                break;
            
            case 'orbiting':
                // Detect stable orbit: within 1000px of a planet and not crashing
                // This logic would ideally check the planetManager
                this.sessionProgress.timeInOrbit += dt;
                if (this.sessionProgress.timeInOrbit > 300) { // ~5 seconds at 60fps
                    this.completeLesson('orbiting');
                }
                break;

            case 'base_landing':
                if (this.game.surfaceMode && this.game.surfaceManager.activeSurface) {
                    this.completeLesson('base_landing');
                }
                break;

            case 'logistics':
                if (this.game.logisticsManager && this.game.logisticsManager.tradeRoutes.length > 0) {
                    this.completeLesson('logistics');
                }
                break;

            case 'defense':
                // Detect if player has repelled a raid (count increased in LogisticsManager or CombatManager)
                if (this.game.combatManager?.raidsRepelled > 0) {
                    this.completeLesson('defense');
                }
                break;

            case 'ascension':
                const cm = this.game.colonyManager;
                const isHegemon = cm?.getEmpireRank()?.level >= 5;
                const topPop = (this.game.spaceBases || []).reduce((s, b) => s + (b.population || 0), 0) >= 1000;
                if (isHegemon && topPop) {
                    this.completeLesson('ascension');
                }
                break;
        }
    }

    setupTrainingGoal(id) {
        // Placeholder for setting up actual mission-like goals
        console.log("Setting up training goal for:", id);
        // We'll use the MissionManager to inject a temporary tutorial mission
        if (this.game.missionManager) {
            const trainingMission = {
                id: `academy_${id}`,
                name: `Academy: ${id.replace('_', ' ').toUpperCase()}`,
                desc: this.getObjectiveForLesson(id),
                goal: 1, // Simplified for now
                progress: 0,
                type: 'tutorial',
                reward: 500
            };
            this.game.activeMission = trainingMission;
            this.game.hudManager.updateMissionHUD();
        }
    }

    completeLesson(id) {
        const lesson = this.lessons.find(l => l.id === id);
        if (lesson && !lesson.completed) {
            lesson.completed = true;
            this.game.addCredits(500); // Reward
            this.saveProgress();
            
            // --- CINEMATIC CELEBRATION ---
            if (this.game.cinematicManager) {
                this.game.cinematicManager.flash('#00f3ff', 800);
                this.game.cinematicManager.playCameraScript({
                    duration: 2000,
                    targetZoom: 2.5,
                    onComplete: () => {
                        this.game.hudManager.showToast(`🎓 LESSON COMPLETE: ${lesson.title}`, 4000, 'success');
                        setTimeout(() => {
                            this.game.cinematicManager.playCameraScript({
                                duration: 1000,
                                targetZoom: 1.0,
                                onComplete: () => this.game.cinematicManager.exitCinematic()
                            });
                        }, 2000);
                    }
                });
            } else {
                this.game.hudManager.showToast(`ACADEMY: Lesson "${lesson.title}" Completed! +$500`, 5000, 'success');
            }

            if (window.gameAudio) window.gameAudio.playMissionComplete();
            
            // Auto-advance
            if (this.currentLessonIndex < this.lessons.length - 1) {
                this.currentLessonIndex++;
                this.saveProgress();
            }

            // Final Galactic Ascension Trigger
            if (id === 'ascension') {
                setTimeout(() => {
                    if (this.game.hudManager && this.game.hudManager.showAscensionOverlay) {
                        this.game.hudManager.showAscensionOverlay();
                    }
                }, 3000);
            }
        }
    }

    saveProgress() {
        const progress = {};
        this.lessons.forEach(l => progress[l.id] = l.completed);
        localStorage.setItem('academyProgress', JSON.stringify(progress));
        localStorage.setItem('currentLessonIndex', this.currentLessonIndex);
    }

    getLessonStatus() {
        return this.lessons.map(l => ({
            title: l.title,
            completed: l.completed
        }));
    }
}

window.AcademyManager = AcademyManager;
