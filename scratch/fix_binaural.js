const fs = require('fs');
const path = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js';
let code = fs.readFileSync(path, 'utf8');

const updateFunc = `
    updateBinauralFrequencies(baseFreq, beatSpread) {
        if (!this.ctx || !this.activeBinauralNodes || this.activeBinauralNodes.length === 0) return;
        const t = this.ctx.currentTime;
        const freqs = [baseFreq * 0.5, baseFreq, baseFreq * 1.5, baseFreq * 2.0];
        
        this.activeBinauralNodes.forEach((pair, i) => {
            if (pair.nodeL && pair.nodeR) {
                const freq = freqs[i];
                pair.nodeL.frequency.setTargetAtTime(freq, t, 0.1);
                pair.nodeR.frequency.setTargetAtTime(freq + beatSpread, t, 0.1);
            }
        });
    }
`;

if (!code.includes('updateBinauralFrequencies')) {
    code = code.replace('stopBinauralTones() {', updateFunc + '\n    stopBinauralTones() {');
    fs.writeFileSync(path, code);
    console.log('Added updateBinauralFrequencies');
}
