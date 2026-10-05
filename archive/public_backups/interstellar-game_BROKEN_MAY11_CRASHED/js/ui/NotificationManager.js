/**
 * NotificationManager: Advanced Prioritized HUD Alert System
 * Phase 4 Stabilization - Modular UI Refactor.
 */
class NotificationManager {
    constructor(game) {
        this.game = game;
        this.notifications = [];
        this.container = null;
        this.init();
    }

    init() {
        // Create main container if it doesn't exist
        this.container = document.getElementById('notification-stack');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notification-stack';
            this.container.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 10000;
                pointer-events: none;
                width: 320px;
            `;
            document.body.appendChild(this.container);
        }

        // Add global animation styles
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes notificationIn {
                from { transform: translateX(120%) scale(0.9); opacity: 0; }
                to { transform: translateX(0) scale(1); opacity: 1; }
            }
            @keyframes notificationOut {
                from { transform: translateX(0) scale(1); opacity: 1; }
                to { transform: translateX(120%) scale(0.9); opacity: 0; }
            }
            .notification-item {
                animation: notificationIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                background: rgba(10, 20, 30, 0.85);
                backdrop-filter: blur(8px);
                border-left: 4px solid var(--accent);
                color: #fff;
                padding: 12px 18px;
                border-radius: 4px;
                font-family: 'Exo 2', sans-serif;
                font-size: 13px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
                gap: 4px;
                pointer-events: auto;
                transition: all 0.3s ease;
            }
            .notification-item.leaving {
                animation: notificationOut 0.3s ease-in forwards;
            }
            .notification-item.critical { border-left-color: #ff3366; box-shadow: 0 0 20px rgba(255, 51, 102, 0.2); }
            .notification-item.success { border-left-color: #00ffaa; }
            .notification-item.warning { border-left-color: #ffaa00; }
            .notification-item.info { border-left-color: #00f3ff; }
            .notification-content { line-height: 1.4; letter-spacing: 0.5px; }
            .notification-tags { font-size: 9px; text-transform: uppercase; color: var(--accent); opacity: 0.7; font-weight: bold; }
        `;
        document.head.appendChild(style);
    }

    /**
     * Adds a prioritized notification to the HUD.
     * @param {string} msg 
     * @param {Object} options { type, duration, priority, tag }
     */
    add(msg, options = {}) {
        const { type = 'info', duration = 4000, priority = 'normal', tag = 'SYSTEM' } = options;

        // If critical, also trigger the center-screen alert logic
        if (priority === 'critical' && this.game.hudManager) {
            this.game.hudManager.showCriticalAlert(msg, duration);
        }

        const item = document.createElement('div');
        item.className = `notification-item ${type} ${priority}`;
        
        item.innerHTML = `
            <div class="notification-tags">${tag.toUpperCase()} // STATUS: ${type.toUpperCase()}</div>
            <div class="notification-content">${msg}</div>
        `;

        // Support for "Click to dismiss"
        item.onclick = () => this.dismiss(item);

        // Auto-dismiss
        const timer = setTimeout(() => this.dismiss(item), duration);
        item.dataset.timer = timer;

        this.container.appendChild(item);
        this.notifications.push(item);

        // Cap notifications to avoid screen spam
        if (this.notifications.length > 5) {
            this.dismiss(this.notifications[0]);
        }
    }

    dismiss(element) {
        if (!element || element.classList.contains('leaving')) return;
        
        element.classList.add('leaving');
        clearTimeout(element.dataset.timer);

        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
                this.notifications = this.notifications.filter(n => n !== element);
            }
        }, 300);
    }
}

window.NotificationManager = NotificationManager;
