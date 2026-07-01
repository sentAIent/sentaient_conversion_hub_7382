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
    }

    init() {
        const progress = JSON.parse(localStorage.getItem('academyProgress')) || {};
        this.lessons.forEach(l => {
            if (progress[l.id]) l.completed = true;
        });
        this.currentLessonIndex = parseInt(localStorage.getItem('currentLessonIndex')) || 0;
    }

    openAcademy() {
        const modal = document.getElementById('flightAcademyModal');
        if (modal) {
            modal.style.display = 'flex';
            this.updateAcademyUI();
        }
        if (window.gameAudio) window.gameAudio.playMenuHover();
    }

    updateAcademyUI() {
        const list = document.getElementById('academyLessonList');
        if (!list) return;

        list.innerHTML = this.lessons.map((l, i) => `
            <div class="academy-lesson-item ${l.completed ? 'completed' : ''} ${i === this.currentLessonIndex ? 'active' : ''}" 
                 onclick="window.game.academyManager.selectLesson(${i})"
                 style="padding: 12px; background: rgba(0,243,255,${i === this.currentLessonIndex ? '0.2' : '0.05'}); 
                        border: 1px solid ${i === this.currentLessonIndex ? '#00f3ff' : 'rgba(0,243,255,0.2)'}; 
                        border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 10px;
                        opacity: ${l.completed ? '0.7' : '1'}; transition: all 0.3s;">
                <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid ${l.completed ? '#00ffaa' : '#555'}; 
                            display: flex; align-items: center; justify-content: center; font-size: 12px;">
                    ${l.completed ? '✓' : i + 1}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; font-weight: bold; color: ${l.completed ? '#00ffaa' : '#fff'};">${l.title.toUpperCase()}</div>
                    <div style="font-size: 10px; color: #888;">${l.completed ? 'COMPLETED' : 'INCOMPLETE'}</div>
                </div>
            </div>
        `).join('');
    }

    selectLesson(index) {
        this.currentLessonIndex = index;
        const lesson = this.lessons[index];
        const detail = document.getElementById('lessonDetail');
        if (!detail) return;

        detail.innerHTML = `
            <h3 style="color: #00f3ff; margin-top: 0;">${lesson.title}</h3>
            <p style="color: #ccc; font-size: 14px; line-height: 1.6;">${lesson.desc}</p>
            <div style="margin-top: 30px; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 5px; border-left: 4px solid #00f3ff;">
                <div style="font-size: 12px; color: #00f3ff; margin-bottom: 10px; letter-spacing: 1px;">OBJECTIVE</div>
                <div style="font-size: 14px; color: #fff;">${this.getObjectiveForLesson(lesson.id)}</div>
            </div>
            <button class="btn-main" onclick="window.game.academyManager.startLesson(${index})" 
                    style="width: 100%; margin-top: 30px; height: 45px; ${lesson.completed ? 'opacity: 0.5;' : ''}">
                ${lesson.completed ? 'RESTART SIMULATION' : 'START LESSON'}
            </button>
        `;
        this.updateAcademyUI();
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
        this.setupTrainingGoal(lesson.id);
        
        if (window.gameAudio) window.gameAudio.playMenuSelect();
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
