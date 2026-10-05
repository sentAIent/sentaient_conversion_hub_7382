'use client';

import React from 'react';
import { AlertTriangle, RefreshCcw } from '@/components/icons';

interface Props {
  children: React.ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-start justify-center p-8 bg-[#0a0a0a] border-4 border-red-600 font-mono text-left w-full h-full min-h-[300px]">
          <div className="flex items-center gap-4 mb-6 text-red-500">
            <AlertTriangle className="w-12 h-12" strokeWidth={3} />
            <h3 className="text-3xl font-bold uppercase tracking-tighter">System Error</h3>
          </div>
          
          <div className="bg-red-950/40 border border-red-900/50 p-4 w-full mb-8">
            <p className="text-red-400 font-bold uppercase text-sm tracking-widest mb-1">Diagnostic Output:</p>
            <p className="text-sm text-red-200/80 break-words font-mono">
              {this.props.fallbackMessage || this.state.error?.message || "Critical failure in UI thread execution."}
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-widest hover:bg-red-500 transition-colors border-2 border-transparent active:border-red-900"
          >
            <RefreshCcw size={20} strokeWidth={3} />
            Force Reboot
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
