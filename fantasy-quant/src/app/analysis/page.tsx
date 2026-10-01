import React from 'react'
import { DataAssistant } from '@/components/assistant/DataAssistant'

export const metadata = {
  title: 'AI Data Analyst | FantasyQuant',
  description: 'Natural language to SQL for advanced fantasy football stats',
}

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 pt-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Data Analyst</h1>
          <p className="text-slate-400">
            Ask complex statistical questions in natural language. Our AI translates your question into safe, 
            read-only SQL and executes it against the FantasyQuant data warehouse in real-time.
          </p>
        </div>
        
        <DataAssistant />
      </div>
    </div>
  )
}
