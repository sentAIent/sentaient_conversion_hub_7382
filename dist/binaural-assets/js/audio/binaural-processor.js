class BinauralProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.phaseLeft = 0;
        this.phaseRight = 0;
        this.isoPhase = 0;
        this.mode = 'binaural'; // 'binaural', 'monaural', 'isochronic'
        this.baseFreq = 200;
        this.beatFreq = 10;
        this.harmonicsLevel = 0; // Future use

        this.port.onmessage = (event) => {
            if (event.data.type === 'setFrequencies') {
                this.baseFreq = event.data.baseFreq;
                this.beatFreq = event.data.beatFreq;
            } else if (event.data.type === 'setMode') {
                this.mode = event.data.mode;
            }
        };
    }

    process(inputs, outputs, parameters) {
        const output = outputs[0];
        const channelLeft = output[0];
        const channelRight = output[1];
        
        // If the output isn't stereo, we can't do binaural properly, but we'll try.
        if (!channelLeft || !channelRight) return true;

        const sampleRate = globalThis.sampleRate || 44100;
        const TWO_PI = Math.PI * 2;

        for (let i = 0; i < channelLeft.length; i++) {
            // Frequencies
            const freqLeft = this.baseFreq;
            const freqRight = this.mode === 'isochronic' ? this.baseFreq : this.baseFreq + this.beatFreq;

            // Phase increments
            const phaseIncLeft = (freqLeft * TWO_PI) / sampleRate;
            const phaseIncRight = (freqRight * TWO_PI) / sampleRate;

            this.phaseLeft += phaseIncLeft;
            this.phaseRight += phaseIncRight;

            // Wrap phases
            if (this.phaseLeft > TWO_PI) this.phaseLeft -= TWO_PI;
            if (this.phaseRight > TWO_PI) this.phaseRight -= TWO_PI;

            // Base sine waves
            const sampleLeft = Math.sin(this.phaseLeft);
            const sampleRight = Math.sin(this.phaseRight);

            if (this.mode === 'binaural') {
                channelLeft[i] = sampleLeft;
                channelRight[i] = sampleRight;
            } else if (this.mode === 'monaural') {
                // Mix them both into the center
                const mix = (sampleLeft + sampleRight) * 0.5;
                channelLeft[i] = mix;
                channelRight[i] = mix;
            } else if (this.mode === 'isochronic') {
                // Isochronic pulses
                const isoPhaseInc = (this.beatFreq * TWO_PI) / sampleRate;
                this.isoPhase += isoPhaseInc;
                if (this.isoPhase > TWO_PI) this.isoPhase -= TWO_PI;
                
                // Square wave for the pulse (0 or 1)
                const pulse = Math.sin(this.isoPhase) > 0 ? 1 : 0;
                
                // Both ears get the same base freq multiplied by the pulse
                channelLeft[i] = sampleLeft * pulse;
                channelRight[i] = sampleRight * pulse; // Note: sampleRight is also baseFreq here
            }
        }

        return true;
    }
}

registerProcessor('binaural-processor', BinauralProcessor);
