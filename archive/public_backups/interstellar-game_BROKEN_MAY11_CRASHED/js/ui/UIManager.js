class UIManager {
    constructor(game) {
        this.game = game;
        console.log("📍 [UIManager] Constructor START");
        this.modals = [
            'shipModal', 'upgradePanel', 'adminPanel', 'templatePanel', 
            'ordnancePanel', 'baseBuilderModal', 'tradeModal', 
            'marketplaceModal', 'empireModal', 'prestigeModal'
        ];
        console.log("✅ [UIManager] Constructor COMPLETE");
    }

    closeAllModals() {
        this.modals.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (el.classList.contains('modal-overlay') || el.classList.contains('fullscreen-modal')) {
                    el.style.display = 'none';
                    el.style.pointerEvents = 'none';
                } else {
                    el.classList.add('hidden');
                }
            }
        });

        
        // Specific case for academyPanel if it's shown independently
        const academy = document.getElementById('academyPanel');
        if (academy) academy.style.display = 'none';
    }

    isAnyModalOpen() {
        return this.modals.some(id => {
            const el = document.getElementById(id);
            if (!el) return false;
            if (el.classList.contains('modal-overlay')) {
                return el.style.display === 'flex' || el.style.display === 'block';
            }
            return !el.classList.contains('hidden');
        });
    }

    toggleUpgradePanel() {
        const panel = document.getElementById('upgradePanel');
        if (!panel) return;
        const isHidden = panel.classList.contains('hidden');
        this.closeAllModals();
        if (isHidden) panel.classList.remove('hidden');
    }

    toggleAdminPanel() {
        const panel = document.getElementById('adminPanel');
        if (!panel) return;
        const isHidden = panel.classList.contains('hidden');
        this.closeAllModals();
        if (isHidden) {
            panel.classList.remove('hidden');
            if (this.game.adminManager) this.game.adminManager.initAdminPanel();
        }
    }

    toggleOrdnancePanel() {
        const panel = document.getElementById('ordnancePanel');
        if (panel) panel.classList.toggle('hidden');
    }

    toggleTemplatePanel() {
        const panel = document.getElementById('templatePanel');
        if (!panel) return;
        panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
    }

    toggleMobileControls() {
        const container = document.getElementById('joystick-container');
        if (!container) return;
        const isHidden = container.style.display === 'none';
        container.style.display = isHidden ? 'block' : 'none';
        if (this.game.inputManager) this.game.inputManager.joystickActive = isHidden;
        this.game.hudManager.showToast(isHidden ? "Mobile Controls: ON" : "Mobile Controls: OFF", 2000);
    }

    toggleCockpitSection(id) {
        const section = document.getElementById(id);
        if (!section) return;
        section.classList.toggle('collapsed');
        
        const btn = section.querySelector('.window-btn');
        if (btn && (btn.textContent === '−' || btn.textContent === '+')) {
            btn.textContent = section.classList.contains('collapsed') ? '+' : '−';
        }
    }

    autoArrangeHUD() {
        const draggables = [
            'leftInfo', 'sectionMission', 'sectionFactions', 'floatingLeaders',
            'sectionRadar', 'sectionVelocity', 'sectionMap',
            'sectionShipStatus', 'sectionGems', 'sectionControls'
        ];
        
        draggables.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.position = '';
                el.style.top = '';
                el.style.left = '';
                el.style.bottom = '';
                el.style.right = '';
                el.classList.remove('collapsed');
            }
        });

        this.game.hudManager.showToast("HUD Auto-Arranged", 2000);
    }

    setupDraggables() {
        const draggables = [
            'leftInfo', 'sectionMission', 'sectionFactions', 'floatingLeaders',
            'sectionRadar', 'sectionVelocity', 'sectionMap',
            'sectionShipStatus', 'sectionGems', 'sectionControls'
        ];
        draggables.forEach(id => this.makeDraggable(id));
    }

    makeDraggable(elementId) {
        const elmnt = document.getElementById(elementId);
        if (!elmnt) return;

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = elmnt.querySelector('.window-header') || elmnt.querySelector('.cockpit-header') || elmnt;

        header.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            // Prevent dragging if clicking a button
            if (e.target.tagName === 'BUTTON') return;
            
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Switch to absolute for dragging out of grid
            if (elmnt.style.position !== 'absolute') {
                const rect = elmnt.getBoundingClientRect();
                elmnt.style.width = rect.width + 'px';
                elmnt.style.position = 'absolute';
                elmnt.style.top = rect.top + 'px';
                elmnt.style.left = rect.left + 'px';
                elmnt.style.zIndex = '1000';
            }

            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            elmnt.style.bottom = 'auto';
            elmnt.style.right = 'auto';
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

window.UIManager = UIManager;
