/**
 * Lock Screen Controls Service
 * Integrates with navigator.mediaSession to provide lock screen media controls.
 */

import { state } from '../state.js';
import { handlePlayClick } from '../ui/controls_v3.js';

export async function initLockScreenControls() {
    // 1. Try Native Capacitor MediaSession first
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        try {
            console.log('[MediaSession] Initializing Native Capacitor lock screen controls.');
            const { MediaSession } = await import('@capacitor-community/media-session');
            
            await updateMediaMetadata();

            MediaSession.addListener('play', () => {
                console.log('[Native MediaSession] Play action triggered');
                if (!state.isPlaying) {
                    handlePlayClick();
                    updateMediaPlaybackState();
                }
            });

            MediaSession.addListener('pause', () => {
                console.log('[Native MediaSession] Pause action triggered');
                if (state.isPlaying) {
                    handlePlayClick();
                    updateMediaPlaybackState();
                }
            });
            return;
        } catch (error) {
            console.error('[MediaSession] Failed to init native media session plugin:', error);
            // Fallthrough to web logic if it fails
        }
    }

    // 2. Web fallback
    if (!('mediaSession' in navigator)) {
        console.warn('[MediaSession] API not supported.');
        return;
    }

    console.log('[MediaSession] Initializing Web lock screen controls.');

    // Update metadata
    await updateMediaMetadata();

    // Set action handlers
    navigator.mediaSession.setActionHandler('play', () => {
        console.log('[Web MediaSession] Play action triggered');
        if (!state.isPlaying) {
            handlePlayClick();
            updateMediaPlaybackState();
        }
    });

    navigator.mediaSession.setActionHandler('pause', () => {
        console.log('[Web MediaSession] Pause action triggered');
        if (state.isPlaying) {
            handlePlayClick();
            updateMediaPlaybackState();
        }
    });

    navigator.mediaSession.setActionHandler('previoustrack', null);
    navigator.mediaSession.setActionHandler('nexttrack', null);
}

export async function updateMediaMetadata() {
    let title = 'Mindwave Generative Audio';
    let artist = 'Binaural Beats Engine';

    if (state.activePresetType) {
        title = state.activePresetType.charAt(0).toUpperCase() + state.activePresetType.slice(1) + ' Session';
    }

    // Native Capacitor Metadata
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        try {
            const { MediaSession } = await import('@capacitor-community/media-session');
            await MediaSession.setMetadata({
                title: title,
                artist: artist,
                album: 'Mindwave State of the Art',
                artwork: [
                    { src: '/binaural-assets/img/icon-512x512.png', sizes: '512x512', type: 'image/png' }
                ]
            });
            return;
        } catch (e) {
            console.error('[MediaSession] Native metadata failed', e);
        }
    }

    // Web Fallback
    if (!('mediaSession' in navigator)) return;

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

export async function updateMediaPlaybackState() {
    // Native Capacitor State
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        try {
            const { MediaSession } = await import('@capacitor-community/media-session');
            await MediaSession.setPlaybackState({
                playbackState: state.isPlaying ? 'playing' : 'paused'
            });
            return;
        } catch (e) {
            console.error('[MediaSession] Native state failed', e);
        }
    }

    // Web Fallback
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.playbackState = state.isPlaying ? 'playing' : 'paused';
}
