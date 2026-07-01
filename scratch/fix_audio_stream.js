const fs = require('fs');
const path = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js';

let audio = fs.readFileSync(path, 'utf8');

const newStreaming = `
    playStreamingMusic(urlOrPlaylist, startIndex = 0) {
        this.ensureContext();
        this.stopAllMusic();
        
        if (Array.isArray(urlOrPlaylist)) {
            this.playlist = urlOrPlaylist;
            this.currentTrackIndex = startIndex;
        } else {
            this.playlist = [urlOrPlaylist];
            this.currentTrackIndex = 0;
        }

        if (this.playlist.length === 0) return;
        
        const url = this.playlist[this.currentTrackIndex];
        
        if (window.app) window.app.showToast('Buffering...', 2000);
        
        if (this.currentStreamingAudio) {
            this.currentStreamingAudio.pause();
            this.currentStreamingAudio.src = '';
            this.currentStreamingAudio = null;
        }

        if (this.streamingNode) {
            this.streamingNode.disconnect();
            this.streamingNode = null;
        }

        this.currentStreamingAudio = new Audio(url);
        this.currentStreamingAudio.crossOrigin = "anonymous";
        this.currentStreamingAudio.loop = this.playlist.length === 1;
        
        this.currentStreamingAudio.addEventListener('canplay', () => {
            this.currentStreamingAudio.play().catch(e => console.error("Audio playback blocked", e));
        });

        this.currentStreamingAudio.addEventListener('play', () => {
            this.isStreamingPlaying = true;
            if (window.app) window.app.showToast('Now Playing', 2000);
        });

        this.currentStreamingAudio.addEventListener('ended', () => {
            if (this.playlist.length > 1) {
                this.playNextTrack();
            }
        });

        this.currentStreamingAudio.addEventListener('error', (e) => {
            console.error("Audio streaming error:", e);
            if (window.app) window.app.showToast('Audio Stream Failed', 3000);
        });

        this.streamingNode = this.ctx.createMediaElementSource(this.currentStreamingAudio);
        this.streamingNode.connect(this.musicGain);
    }

    pauseStream() {
        if (this.currentStreamingAudio) {
            this.currentStreamingAudio.pause();
            this.isStreamingPlaying = false;
        }
    }

    resumeStream() {
        if (this.currentStreamingAudio) {
            this.currentStreamingAudio.play();
            this.isStreamingPlaying = true;
        } else if (this.playlist && this.playlist.length > 0) {
            this.playStreamingMusic(this.playlist, this.currentTrackIndex);
        }
    }
`;

audio = audio.replace(/playStreamingMusic\([\s\S]*?resumeStream\(\) \{[\s\S]*?\}/, newStreaming.trim());

fs.writeFileSync(path, audio, 'utf8');
console.log("Streaming fixed to use HTMLAudioElement!");
