/**
 * Lock Screen Controls Service
 * Integrates with navigator.mediaSession to provide lock screen media controls.
 */

import { state } from '../state.js';
import { handlePlayClick } from '../ui/controls_v3.js';

export function initLockScreenControls() {
    if (!('mediaSession' in navigator)) {
        console.warn('[MediaSession] API not supported.');
        return;
    }

    console.log('[MediaSession] Initializing lock screen controls.');

    // Update metadata
    updateMediaMetadata();

    // Set action handlers
    navigator.mediaSession.setActionHandler('play', () => {
        console.log('[MediaSession] Play action triggered');
        if (!state.isPlaying) {
            handlePlayClick();
            updateMediaPlaybackState();
        }
    });

    navigator.mediaSession.setActionHandler('pause', () => {
        console.log('[MediaSession] Pause action triggered');
        if (state.isPlaying) {
            handlePlayClick();
            updateMediaPlaybackState();
        }
    });

    // We don't really have "next" and "previous" tracks in a generative app,
    // but we could use them to cycle through presets or soundscapes if desired.
    navigator.mediaSession.setActionHandler('previoustrack', null);
    navigator.mediaSession.setActionHandler('nexttrack', null);
}

export function updateMediaMetadata() {
    if (!('mediaSession' in navigator)) return;

    let title = 'Mindwave Generative Audio';
    let artist = 'Binaural Beats Engine';

    // Enhance metadata based on active state
    if (state.activePresetType) {
        title = state.activePresetType.charAt(0).toUpperCase() + state.activePresetType.slice(1) + ' Session';
    }

    navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        album: 'Mindwave State of the Art',
        artwork: [
            { src: '/binaural-assets/img/icon-96x96.png',   sizes: '96x96',   type: 'image/png' },
            { src: '/binaural-assets/img/icon-128x128.png', sizes: '128x128', type: 'image/png' },
            { src: '/binaural-assets/img/icon-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/binaural-assets/img/icon-256x256.png', sizes: '256x256', type: 'image/png' },
            { src: '/binaural-assets/img/icon-384x384.png', sizes: '384x384', type: 'image/png' },
            { src: '/binaural-assets/img/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        ]
    });
}

export function updateMediaPlaybackState() {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.playbackState = state.isPlaying ? 'playing' : 'paused';
}
