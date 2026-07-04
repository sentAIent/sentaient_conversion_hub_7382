import React, { useState } from 'react';
import { Scale, Sparkles, Users, Send, LogOut, Volume2, VolumeX } from 'lucide-react';
import { renderFormattedText } from '@/utils/formatting';
import { toggleSpeak, stop, isTTSSupported } from '@/utils/tts';
import type { Theme, ChatMessage } from '@/types';

interface ChatViewProps {
    chatHistory: ChatMessage[];
    isChatThinking: boolean;
    chatInput: string;
    setChatInput: (value: string) => void;
    handleSendMessage: () => void;
    chatEndRef: React.RefObject<HTMLDivElement>;
    setActiveTab: (tab: string) => void;
    currentTheme: Theme;
}

export const ChatView: React.FC<ChatViewProps> = ({
    chatHistory,
    isChatThinking,
    chatInput,
    setChatInput,
    handleSendMessage,
    chatEndRef,
    setActiveTab,
    currentTheme
}) => {
    const [speakingId, setSpeakingId] = useState<string | number | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSpeak = (msg: ChatMessage) => {
        if (speakingId === msg.id) {
            // Currently speaking this message, stop it
            stop();
            setSpeakingId(null);
        } else {
            // Stop any current speech and start new
            stop();
            setSpeakingId(msg.id);
            toggleSpeak(msg.content, () => {
                setSpeakingId(null);
            });
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className={`border-b p-4 flex items-center justify-between shadow-sm ${currentTheme.card || currentTheme.panelBg}`}>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h2 className="font-bold">Legal Assistant</h2>
                    {isTTSSupported() && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            Voice Enabled
                        </span>
                    )}
                </div>
                <button
                    onClick={() => setActiveTab('editor')}
                    className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    <LogOut className="w-4 h-4" /> Back to Document
                </button>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${currentTheme.main || currentTheme.appBg}`}>
                {chatHistory.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user'
                            ? 'bg-slate-200'
                            : 'bg-blue-600 text-white'
                            }`}>
                            {msg.role === 'user'
                                ? <Users className="w-4 h-4 text-slate-500" />
                                : <Scale className="w-4 h-4" />
                            }
                        </div>
                        <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed max-w-[80%] ${msg.role === 'user'
                            ? 'bg-white border border-slate-200 rounded-tr-none'
                            : 'bg-white border border-slate-200 rounded-tl-none'
                            }`}>
                            {msg.role === 'ai'
                                ? renderFormattedText(msg.content, currentTheme)
                                : <p className="text-slate-800">{msg.content}</p>
                            }

                            {/* TTS Button for AI messages */}
                            {msg.role === 'ai' && isTTSSupported() && (
                                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                                    <button
                                        onClick={() => handleSpeak(msg)}
                                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all ${speakingId === msg.id
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        title={speakingId === msg.id ? 'Stop speaking' : 'Read aloud'}
                                    >
                                        {speakingId === msg.id ? (
                                            <>
                                                <VolumeX className="w-3.5 h-3.5" />
                                                <span>Stop</span>
                                            </>
                                        ) : (
                                            <>
                                                <Volume2 className="w-3.5 h-3.5" />
                                                <span>Listen</span>
                                            </>
                                        )}
                                    </button>
                                    {speakingId === msg.id && (
                                        <span className="text-xs text-blue-600 animate-pulse">
                                            Speaking...
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Sources */}
                            {msg.sources && msg.sources.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-slate-100">
                                    <p className="text-xs font-bold text-slate-500 mb-2">Sources:</p>
                                    <ul className="space-y-1">
                                        {msg.sources.map((source, idx) => (
                                            <li key={idx}>
                                                <a
                                                    href={source.uri}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-blue-600 hover:underline"
                                                >
                                                    {source.title || source.uri}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isChatThinking && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-600 text-white">
                            <Scale className="w-4 h-4" />
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2">
                            <span className="animate-pulse">Researching legal precedents...</span>
                        </div>
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className={`p-4 border-t relative ${currentTheme.card || currentTheme.panelBg}`}>
                <div className="relative">
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about liability clauses, indemnification, force majeure..."
                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!chatInput.trim() || isChatThinking}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-center">
                    AI responses are informational only. Consult licensed counsel for specific legal advice.
                </p>
            </div>
        </div>
    );
};

export default ChatView;

