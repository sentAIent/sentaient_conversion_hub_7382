import { create } from 'zustand';

export type TTSProvider = 'browser' | 'local';

interface SettingsState {
    useLocalAI: boolean;
    localAiEndpoint: string;
    ttsProvider: TTSProvider;
    isSettingsModalOpen: boolean;
    enablePiiRedaction: boolean;
    
    // Actions
    setUseLocalAI: (useLocal: boolean) => void;
    setLocalAiEndpoint: (endpoint: string) => void;
    setTtsProvider: (provider: TTSProvider) => void;
    setIsSettingsModalOpen: (isOpen: boolean) => void;
    setEnablePiiRedaction: (enable: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    useLocalAI: false,
    localAiEndpoint: 'http://localhost:11434/api/generate',
    ttsProvider: 'browser',
    isSettingsModalOpen: false,
    enablePiiRedaction: true,

    setUseLocalAI: (useLocal) => set({ useLocalAI: useLocal }),
    setLocalAiEndpoint: (endpoint) => set({ localAiEndpoint: endpoint }),
    setTtsProvider: (provider) => set({ ttsProvider: provider }),
    setIsSettingsModalOpen: (isOpen) => set({ isSettingsModalOpen: isOpen }),
    setEnablePiiRedaction: (enable) => set({ enablePiiRedaction: enable }),
}));
