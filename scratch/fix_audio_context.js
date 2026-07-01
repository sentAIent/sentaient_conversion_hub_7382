const fs = require('fs');
const path = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js';

let audio = fs.readFileSync(path, 'utf8');

// Inject this.ensureContext() at the top of these methods
const methods = ['playSound', 'playBossAlert', 'startEngineHum'];

methods.forEach(method => {
    // Find "methodName(args) {\n        if (!this.ctx) return;"
    // or similar
    const regex = new RegExp(`(${method}\\s*\\([^{]*\\)\\s*\\{)`, 'g');
    
    // Check if it already has ensureContext
    if (!audio.includes(`${method}(`)) return;
    
    // We will just replace "if (!this.ctx) return;" with "this.ensureContext();\n        if (!this.ctx) return;"
    audio = audio.replace(
        new RegExp(`(${method}\\s*\\([^{]*\\)\\s*\\{[\\s\\S]*?)(if\\s*\\(!this\\.ctx\\)\\s*return;)`, 'g'), 
        "$1this.ensureContext();\n        $2"
    );
});

// For startEngineHum, the original had "if (this.engineHumMuted || !this.ctx) return;"
audio = audio.replace(
    /(startEngineHum\s*\(\)\s*\{)([\s\S]*?if\s*\([^)]*!this\.ctx[^)]*\)\s*return;)/g,
    "$1\n        this.ensureContext();$2"
);

// Also need to handle interaction resume for document
const resumeCode = `
    ensureContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.connect(this.ctx.destination);
            
            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.value = this.muted ? 0 : Math.max(0, Math.min(1, this.musicVolume));
            this.musicGain.connect(this.masterGain);
            
            // Auto resume context on first click
            const resumeFn = () => {
                if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
                document.removeEventListener('click', resumeFn);
                document.removeEventListener('keydown', resumeFn);
            };
            document.addEventListener('click', resumeFn);
            document.addEventListener('keydown', resumeFn);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }
`;

audio = audio.replace(/ensureContext\(\)\s*\{[\s\S]*?\}\s*if\s*\(this\.ctx\.state[\s\S]*?\}\s*\}/, resumeCode.trim());

fs.writeFileSync(path, audio, 'utf8');
console.log("Audio context fixes applied!");
