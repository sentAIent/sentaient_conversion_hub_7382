const fs = require('fs');
const path = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js';

let audio = fs.readFileSync(path, 'utf8');

// Fix toggleMute returning undefined
audio = audio.replace("toggleMute() {\n        this.muted = !this.muted;", "toggleMute() {\n        this.muted = !this.muted;\n        const ret = this.muted;");
audio = audio.replace("this.musicGain.connect(this.masterGain);\n        }\n    }", "this.musicGain.connect(this.masterGain);\n        }\n        return ret;\n    }");

// Fix engineVolume initialization
if (!audio.includes('this.engineVolume =')) {
    audio = audio.replace("this.musicVolume = savedMusicVol !== null && !isNaN(parseFloat(savedMusicVol)) ? parseFloat(savedMusicVol) : 0.15;\n        this.engineNode = null;", "this.musicVolume = savedMusicVol !== null && !isNaN(parseFloat(savedMusicVol)) ? parseFloat(savedMusicVol) : 0.15;\n        const savedEngineVol = localStorage.getItem('engineVolume');\n        this.engineVolume = savedEngineVol !== null && !isNaN(parseFloat(savedEngineVol)) ? parseFloat(savedEngineVol) : 1.0;\n        this.engineNode = null;");
}

fs.writeFileSync(path, audio, 'utf8');
console.log("Mute and engineVolume fixed!");
