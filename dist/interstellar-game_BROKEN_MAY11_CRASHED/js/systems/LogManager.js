/**
 * LogManager.js
 * Chronicling transactions, milestones, and galactic accomplishments.
 * Phase 9: Fleet & Asset Command
 */

class LogManager {
    constructor(game) {
        this.game = game;
        this.entries = [];
        this.MAX_ENTRIES = 100; // Prevent local storage bloating
    }

    init() {
        console.log("📜 [Log] Log Manager Initialized.");
        this.loadLogs();
    }

    /**
     * Adds a new entry to the galactic log.
     * @param {string} category - CATEGORY (FLEET, ECONOMY, COMBAT, DISCOVERY)
     * @param {string} text - The log message.
     * @param {string} status - Optional: 'info', 'success', 'warning', 'error'
     */
    addEntry(category, text, status = 'info') {
        const entry = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            category: category.toUpperCase(),
            text: text,
            status: status
        };

        this.entries.unshift(entry); // Newest first

        // Cap size
        if (this.entries.length > this.MAX_ENTRIES) {
            this.entries.pop();
        }

        this.saveLogs();
        
        // Notify HUD if needed (subtle indicator)
        if (this.game.hudManager) this.game.hudManager.pulseLogIndicator();
    }

    saveLogs() {
        try {
            localStorage.setItem('interstellar_logs', JSON.stringify(this.entries));
        } catch (e) { console.error("Log save error", e); }
    }

    loadLogs() {
        try {
            const saved = localStorage.getItem('interstellar_logs');
            if (saved) this.entries = JSON.parse(saved);
        } catch (e) { this.entries = []; }
    }

    clearLogs() {
        this.entries = [];
        this.saveLogs();
        if (this.game.hudManager) this.game.hudManager.showToast("Log Cleared", 2000);
    }
}

window.LogManager = LogManager;
