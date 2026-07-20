import { pipeline } from '@xenova/transformers';
import { useSettingsStore } from '@/store/settingsStore';

class AudioService {
    private synthesizer: any = null;

    async initBrowserTTS() {
        if (!this.synthesizer) {
            try {
                this.synthesizer = await pipeline('text-to-speech', 'Xenova/speecht5_tts', {
                    quantized: true,
                });
            } catch (e) {
                console.error("Failed to initialize Transformers.js TTS", e);
            }
        }
    }

    async generateSpeech(text: string): Promise<string> {
        const { ttsProvider, localAiEndpoint } = useSettingsStore.getState();

        if (ttsProvider === 'local') {
            const endpoint = localAiEndpoint.replace('/api/generate', '/v1/audio/speech');
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'tts-1',
                    input: text,
                    voice: 'alloy'
                })
            });

            if (!response.ok) {
                throw new Error('Local TTS failed.');
            }

            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } else {
            await this.initBrowserTTS();
            
            try {
                if (!this.synthesizer) throw new Error("Synthesizer not initialized");
                
                // speecht5 requires speaker embeddings, we use a default if possible or it will fail
                const out = await this.synthesizer(text);
                const wav = out.audio;
                const wavBlob = this.encodeWAV(wav, out.sampling_rate);
                return URL.createObjectURL(wavBlob);
            } catch (error) {
                console.warn('Transformers.js TTS failed, falling back to Web Speech API', error);
                return new Promise((resolve) => {
                    const utterance = new SpeechSynthesisUtterance(text);
                    window.speechSynthesis.speak(utterance);
                    resolve('');
                });
            }
        }
    }

    private encodeWAV(samples: Float32Array, sampleRate: number): Blob {
        const buffer = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buffer);

        const writeString = (view: DataView, offset: number, string: string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + samples.length * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, samples.length * 2, true);

        let offset = 44;
        for (let i = 0; i < samples.length; i++, offset += 2) {
            let s = Math.max(-1, Math.min(1, samples[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }

        return new Blob([buffer], { type: 'audio/wav' });
    }
}

export const audioService = new AudioService();
