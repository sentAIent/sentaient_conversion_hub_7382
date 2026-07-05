import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Theme } from '@/types';

interface Props {
    children: ReactNode;
    currentTheme?: Theme;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            const isLight = this.props.currentTheme ? ['eggshell', 'sand'].includes(this.props.currentTheme.id) : false;
            const bgClass = isLight ? 'bg-slate-50' : 'bg-[#0f1115]';
            const textClass = isLight ? 'text-slate-900' : 'text-slate-200';
            const cardBg = isLight ? 'bg-white shadow-sm border-slate-200' : 'bg-[#1a1d24] border-white/5';
            const errorText = isLight ? 'text-slate-600' : 'text-slate-400';

            return (
                <div className={`min-h-screen flex items-center justify-center p-4 ${bgClass}`}>
                    <div className={`max-w-md w-full border rounded-xl p-8 text-center ${cardBg}`}>
                        <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={32} />
                        </div>
                        <h2 className={`text-2xl font-bold mb-3 tracking-tight ${textClass}`}>
                            Something went wrong
                        </h2>
                        <p className={`mb-8 ${errorText}`}>
                            {this.state.error?.message || 'An unexpected error occurred.'}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                            <RefreshCw size={18} />
                            Restart Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
