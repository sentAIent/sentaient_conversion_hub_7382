"use client";

import { useEffect, useState } from "react";

export function FinancialHealthScore() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Animate score from 0 to 85
    let current = 0;
    const target = 85;
    const interval = setInterval(() => {
      current += 1;
      setScore(current);
      if (current >= target) {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 text-center">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Financial Health Score</h3>
      <div className="relative inline-flex items-center justify-center">
        {/* Simple SVG Circular Progress */}
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-800"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="376.99"
            strokeDashoffset={376.99 - (376.99 * score) / 100}
            strokeLinecap="round"
            className={`${
              score > 80 ? "text-green-500" : score > 50 ? "text-yellow-500" : "text-red-500"
            } transition-all duration-300 ease-out`}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}</span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">
        Your score is excellent! You are maximizing tax-loss harvesting and maintaining healthy cash flow.
      </p>
    </div>
  );
}
