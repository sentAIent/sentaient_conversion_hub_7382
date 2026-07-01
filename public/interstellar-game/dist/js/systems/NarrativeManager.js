/**
 * NarrativeManager for Interstellar Engine
 * Handles holographic transmissions, dialogue sequencing, and story delivery.
 */
class NarrativeManager {
    constructor(game) {
        this.game = game;
        this.queue = [];
        this.activeMsg = null;
        this.isTransmitting = false;
        
        this.characters = {
            'vane': { name: 'COMMANDER VANE', portrait: '👤', color: '#00f3ff' },
            'nexus': { name: 'AI NEXUS', portrait: '🤖', color: '#00ffaa' },
            'krall': { name: 'LORD KRALL', portrait: '👹', color: '#ff3300' }
        };

        this.createUI();
    }

    createUI() {
        if (document.getElementById('narrative-transmission')) return;

        const container = document.createElement('div');
        container.id = 'narrative-transmission';
        container.style.cssText = `
            position: fixed; bottom: 15vh; left: 50%; transform: translateX(-50%);
            width: 500px; height: 120px; background: rgba(0, 15, 30, 0.85);
            border: 1px solid rgba(0, 243, 255, 0.3); border-radius: 8px;
            display: none; align-items: center; gap: 20px; padding: 15px;
            z-index: 10000; pointer-events: none;
            backdrop-filter: blur(5px);
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);
        `;

        const portraitWrap = document.createElement('div');
        portraitWrap.style.cssText = `
            width: 80px; height: 80px; background: rgba(0, 243, 255, 0.1);
            border: 1px solid #00f3ff; border-radius: 4px;
            display: flex; align-items: center; justify-content: center;
            font-size: 40px; position: relative; overflow: hidden;
        `;
        portraitWrap.id = 'transmission-portrait';

        // Glitch lines overlay
        const glitchOverlay = document.createElement('div');
        glitchOverlay.style.cssText = `
            position: absolute; top:0; left:0; width:100%; height:100%;
            background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,243,255,0.05) 3px);
            pointer-events: none;
        `;
        portraitWrap.appendChild(glitchOverlay);

        const content = document.createElement('div');
        content.style.cssText = `flex: 1; display: flex; flexDirection: column; gap: 5px;`;

        const nameLabel = document.createElement('div');
        nameLabel.id = 'transmission-name';
        nameLabel.style.cssText = `font-family: 'Orbitron', sans-serif; font-size: 12px; color: #00f3ff; letter-spacing: 2px;`;

        const textBody = document.createElement('div');
        textBody.id = 'transmission-text';
        textBody.style.cssText = `font-size: 14px; color: #fff; line-height: 1.4; min-height: 45px;`;

        content.appendChild(nameLabel);
        content.appendChild(textBody);
        container.appendChild(portraitWrap);
        container.appendChild(content);

        document.body.appendChild(container);
    }

    /**
     * Queues a transmission
     * @param {string} charId character key
     * @param {string} text dialogue text
     * @param {number} duration ms to show
     */
    enqueue(charId, text, duration = 4000) {
        this.queue.push({ charId, text, duration });
        if (!this.isTransmitting) {
            this.processQueue();
        }
    }

    processQueue() {
        if (this.queue.length === 0) {
            this.hide();
            return;
        }

        this.isTransmitting = true;
        this.activeMsg = this.queue.shift();
        this.show(this.activeMsg);

        setTimeout(() => {
            this.processQueue();
        }, this.activeMsg.duration + 500); // 500ms gap
    }

    show(msg) {
        const char = this.characters[msg.charId] || this.characters['vane'];
        const container = document.getElementById('narrative-transmission');
        const portrait = document.getElementById('transmission-portrait');
        const nameLabel = document.getElementById('transmission-name');
        const textBody = document.getElementById('transmission-text');

        nameLabel.textContent = char.name;
        nameLabel.style.color = char.color;
        textBody.textContent = '';
        
        // Typewriter effect
        let i = 0;
        const typeInterval = setInterval(() => {
            textBody.textContent += msg.text[i];
            i++;
            if (i >= msg.text.length) clearInterval(typeInterval);
        }, 30);

        container.style.display = 'flex';
        container.style.opacity = '0';
        container.style.transform = 'translateX(-50%) translateY(20px)';
        
        // Simple animation
        setTimeout(() => {
            container.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            container.style.opacity = '1';
            container.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);

        if (window.gameAudio) window.gameAudio.playTransmissionStart && window.gameAudio.playTransmissionStart();
    }

    hide() {
        const container = document.getElementById('narrative-transmission');
        if (!container) return;
        
        container.style.opacity = '0';
        container.style.transform = 'translateX(-50%) translateY(-20px)';
        
        setTimeout(() => {
            container.style.display = 'none';
            this.isTransmitting = false;
        }, 500);
    }
}

window.NarrativeManager = NarrativeManager;
