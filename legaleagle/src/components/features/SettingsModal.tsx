import React from 'react';
import { X, Server, Volume2 } from 'lucide-react';
import { useSettingsStore } from '@/store';
import { useUIStore } from '@/store';

export const SettingsModal: React.FC = () => {
    const { 
        isSettingsModalOpen, 
        setIsSettingsModalOpen,
        useLocalAI,
        setUseLocalAI,
        localAiEndpoint,
        setLocalAiEndpoint,
        ttsProvider,
        setTtsProvider
    } = useSettingsStore();

    const currentTheme = useUIStore(s => s.currentTheme);

    if (!isSettingsModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsSettingsModalOpen(false)}
            />
            
            <div 
                className="relative w-full max-w-lg rounded-2xl p-6 shadow-2xl border"
                style={{ 
                    backgroundColor: currentTheme.background,
                    borderColor: currentTheme.border,
                    color: currentTheme.text
                }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-serif flex items-center gap-2">
                        <Server className="w-6 h-6" />
                        Platform Settings
                    </h2>
                    <button 
                        onClick={() => setIsSettingsModalOpen(false)}
                        className="p-2 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: currentTheme.surface }}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Privacy / Local AI Section */}
                    <div 
                        className="p-4 rounded-xl border"
                        style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold mb-1 flex items-center gap-2">
                                    <Server className="w-4 h-4" />
                                    100% Local AI (Privacy Mode)
                                </h3>
                                <p className="text-sm opacity-70">
                                    Bypass the cloud entirely. Run analysis using your local Ollama server to ensure strict confidentiality.
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer ml-4 mt-1">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={useLocalAI}
                                    onChange={(e) => setUseLocalAI(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                        </div>

                        {useLocalAI && (
                            <div className="mt-4 pt-4 border-t" style={{ borderColor: currentTheme.border }}>
                                <label className="block text-sm font-medium mb-2 opacity-80">
                                    Local Ollama Endpoint (llama3 recommended)
                                </label>
                                <input
                                    type="text"
                                    value={localAiEndpoint}
                                    onChange={(e) => setLocalAiEndpoint(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border outline-none font-mono text-sm"
                                    style={{ 
                                        backgroundColor: currentTheme.background,
                                        borderColor: currentTheme.border,
                                        color: currentTheme.text
                                    }}
                                    placeholder="http://localhost:11434/api/generate"
                                />
                            </div>
                        )}
                    </div>

                    {/* Audio / Podcast Section */}
                    <div 
                        className="p-4 rounded-xl border"
                        style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}
                    >
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <Volume2 className="w-4 h-4" />
                            Audio & Podcast Generation
                        </h3>
                        <p className="text-sm opacity-70 mb-4">
                            Select the Text-to-Speech (TTS) engine used for Commute Briefings.
                        </p>

                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="ttsProvider" 
                                    value="browser"
                                    checked={ttsProvider === 'browser'}
                                    onChange={() => setTtsProvider('browser')}
                                    className="w-4 h-4"
                                />
                                <div>
                                    <div className="font-medium text-sm">In-Browser (Transformers.js)</div>
                                    <div className="text-xs opacity-60">100% private, runs directly in your browser.</div>
                                </div>
                            </label>
                            
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="ttsProvider" 
                                    value="local"
                                    checked={ttsProvider === 'local'}
                                    onChange={() => setTtsProvider('local')}
                                    className="w-4 h-4"
                                />
                                <div>
                                    <div className="font-medium text-sm">Local API (Coqui/OpenedAI)</div>
                                    <div className="text-xs opacity-60">High quality voices. Requires local TTS server running.</div>
                                </div>
                            </label>
                        </div>
                    </div>

                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => setIsSettingsModalOpen(false)}
                        className="px-6 py-2 rounded-xl font-medium transition-all"
                        style={{ backgroundColor: currentTheme.accent, color: 'white' }}
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};
