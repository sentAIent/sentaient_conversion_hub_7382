import { create } from 'zustand';

export type TTSProvider = 'browser' | 'local';

interface SettingsState {
    useLocalAI: boolean;
    localAiEndpoint: string;
    ttsProvider: TTSProvider;
    isSettingsModalOpen: boolean;
    
    // Actions
    setUseLocalAI: (useLocal: boolean) => void;
    setLocalAiEndpoint: (endpoint: string) => void;
    setTtsProvider: (provider: TTSProvider) => void;
    setIsSettingsModalOpen: (isOpen: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    useLocalAI: false,
    localAiEndpoint: 'http://localhost:11434/api/generate',
    ttsProvider: 'browser',
    isSettingsModalOpen: false,

    setUseLocalAI: (useLocal) => set({ useLocalAI: useLocal }),
    setLocalAiEndpoint: (endpoint) => set({ localAiEndpoint: endpoint }),
    setTtsProvider: (provider) => set({ ttsProvider: provider }),
    setIsSettingsModalOpen: (isOpen) => set({ isSettingsModalOpen: isOpen }),
}));
