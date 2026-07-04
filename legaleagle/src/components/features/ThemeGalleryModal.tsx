import React from 'react';
import { X, Check, Palette, Layout, Type } from 'lucide-react';
import { THEMES } from '@/constants/themes';
import type { Theme } from '@/types';

interface ThemeGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTheme: Theme;
    setCurrentTheme: (theme: Theme) => void;
}

export const ThemeGalleryModal: React.FC<ThemeGalleryModalProps> = ({
    isOpen,
    onClose,
    currentTheme,
    setCurrentTheme
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop - Solid color for stability */}
            <div
                className="absolute inset-0 bg-slate-900/95 transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Palette className="w-6 h-6 text-blue-600" />
                            Theme Gallery
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Personalize your workspace with our curated premium themes.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Gallery Grid */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.values(THEMES).map((theme) => {
                            const isActive = currentTheme.id === theme.id;
                            const isLight = ['eggshell', 'sand'].includes(theme.id);

                            return (
                                <button
                                    key={theme.id}
                                    onClick={() => setCurrentTheme(theme)}
                                    className={`group relative flex flex-col text-left rounded-xl overflow-hidden transition-all duration-300 border-2 ${isActive
                                            ? 'border-blue-600 shadow-xl scale-[1.02]'
                                            : 'border-transparent hover:border-slate-300 hover:shadow-lg hover:-translate-y-1'
                                        }`}
                                >
                                    {/* Theme Preview Card */}
                                    <div className="h-40 w-full flex relative">
                                        {/* Sidebar Preview */}
                                        <div className={`w-1/3 h-full p-3 flex flex-col gap-2 ${theme.sidebar}`}>
                                            <div className={`w-8 h-8 rounded-lg ${theme.accent} opacity-80`} />
                                            <div className={`w-16 h-2 rounded-full ${isLight ? 'bg-slate-900/10' : 'bg-white/10'}`} />
                                            <div className={`w-12 h-2 rounded-full ${isLight ? 'bg-slate-900/10' : 'bg-white/10'}`} />

                                            <div className="mt-auto space-y-1.5">
                                                <div className={`w-full h-1.5 rounded-full ${isLight ? 'bg-slate-900/5' : 'bg-white/5'}`} />
                                                <div className={`w-3/4 h-1.5 rounded-full ${isLight ? 'bg-slate-900/5' : 'bg-white/5'}`} />
                                            </div>
                                        </div>

                                        {/* Main Content Preview */}
                                        <div className={`flex-1 h-full p-3 flex flex-col gap-3 ${theme.appBg || 'bg-slate-50'}`}>
                                            {/* Header */}
                                            <div className={`w-full h-8 rounded-lg border ${theme.panelBg} flex items-center px-2 gap-2`}>
                                                <div className="w-4 h-4 rounded-full bg-slate-200" />
                                                <div className="w-20 h-2 rounded-full bg-slate-100" />
                                            </div>

                                            {/* Content Area */}
                                            <div className={`flex-1 rounded-lg border p-2 ${theme.docBg} ${theme.docBorder}`}>
                                                <div className={`w-3/4 h-2 rounded-full mb-2 bg-slate-100`} />
                                                <div className="space-y-1">
                                                    <div className="w-full h-1.5 rounded-full bg-slate-50" />
                                                    <div className="w-full h-1.5 rounded-full bg-slate-50" />
                                                    <div className="w-2/3 h-1.5 rounded-full bg-slate-50" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Active Badge */}
                                        {isActive && (
                                            <div className="absolute top-2 right-2 bg-blue-600 text-white p-1.5 rounded-full shadow-lg z-10">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Theme Info */}
                                    <div className="p-4 bg-white border-t border-slate-100 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-slate-900">{theme.name}</h3>
                                            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                                                <span className="flex items-center gap-1">
                                                    <Layout className="w-3 h-3" /> Layout
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                <span className="flex items-center gap-1">
                                                    <Type className="w-3 h-3" /> Typography
                                                </span>
                                            </p>
                                        </div>

                                        {/* Color Swatches */}
                                        <div className="flex -space-x-2">
                                            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-sm ${theme.sidebar.split(' ')[0]}`} />
                                            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-sm ${theme.accent.split(' ')[0]}`} />
                                            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-sm ${theme.appBg?.split(' ')[0] || 'bg-slate-50'}`} />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-400">
                    Pro Tip: Themes automatically adjust contrast for optimal readability.
                </div>
            </div>
        </div>
    );
};
