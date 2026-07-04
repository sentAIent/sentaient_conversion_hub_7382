/**
 * Text-to-Speech Utility
 * 
 * Uses the Web Speech API for browser-native TTS
 */

/**
 * Check if TTS is supported in the browser
 */
export const isTTSSupported = (): boolean => {
    return 'speechSynthesis' in window;
};

/**
 * Get available voices (prefer English voices)
 */
export const getPreferredVoice = (): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();

    // Prefer high-quality English voices
    const preferredVoices = [
        'Samantha', // macOS
        'Karen',    // macOS
        'Daniel',   // macOS
        'Google US English',
        'Microsoft Zira',
        'Microsoft David',
    ];

    for (const preferred of preferredVoices) {
        const voice = voices.find(v => v.name.includes(preferred));
        if (voice) return voice;
    }

    // Fallback to any English voice
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) return englishVoice;

    // Use default voice
    return voices[0] || null;
};

/**
 * Speak text using TTS
 */
export const speak = (text: string, onEnd?: () => void): void => {
    if (!isTTSSupported()) {
        console.warn('TTS not supported in this browser');
        return;
    }

    // Cancel any ongoing speech
    stop();

    // Clean text for better speech
    const cleanText = text
        .replace(/\*\*/g, '') // Remove markdown bold
        .replace(/\*/g, '')   // Remove markdown italic
        .replace(/`/g, '')    // Remove code backticks
        .replace(/#{1,6}\s/g, '') // Remove markdown headers
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with text
        .replace(/\n+/g, '. ') // Replace newlines with pauses
        .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Configure voice settings
    const voice = getPreferredVoice();
    if (voice) {
        utterance.voice = voice;
    }

    utterance.rate = 1.0;  // Normal speed
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume

    utterance.onend = () => {
        onEnd?.();
    };

    utterance.onerror = (event) => {
        console.error('TTS error:', event.error);
        onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
};

/**
 * Stop current speech
 */
export const stop = (): void => {
    if (isTTSSupported()) {
        window.speechSynthesis.cancel();
    }
};

/**
 * Check if currently speaking
 */
export const isSpeaking = (): boolean => {
    return isTTSSupported() && window.speechSynthesis.speaking;
};

/**
 * Toggle speech - speak if not speaking, stop if speaking
 */
export const toggleSpeak = (text: string, onEnd?: () => void): boolean => {
    if (isSpeaking()) {
        stop();
        return false;
    } else {
        speak(text, onEnd);
        return true;
    }
};
