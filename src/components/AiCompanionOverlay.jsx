import React, { useState } from 'react';
import { AIConcierge } from './AIConcierge';

export default function AiCompanionOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
      {/* Container for the AI Concierge with pointer-events restored */}
      <div className={`transition-all duration-300 transform origin-bottom-right pointer-events-auto ${isOpen ? 'scale-100 opacity-100 mb-4' : 'scale-95 opacity-0 pointer-events-none mb-0 h-0 overflow-hidden'}`}>
        <div className="w-96 shadow-2xl">
          {/* We import the original AI Concierge but we override its absolute positioning via a wrapper */}
          <div className="relative w-full h-full [&>div]:static [&>div]:w-full [&>div]:shadow-none [&>div]:border-[#444] [&>div]:bg-[#111]">
             <AIConcierge />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="flex justify-end pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-400 transition-colors"
        >
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L4.2 15.3l.025-.06a2.002 2.002 0 012.873-.881l.334.223a1.5 1.5 0 001.996-.201l3.5-3.5a1.5 1.5 0 00.413-1.077V3.104" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
