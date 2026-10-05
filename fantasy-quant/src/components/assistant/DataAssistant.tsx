'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Database, Loader2 } from '@/components/icons'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion, AnimatePresence } from 'framer-motion'

export function DataAssistant() {
  const [messages, setMessages] = useState<{role: string, content: string, data?: any[]}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      })

      const data = await res.json()
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content, data: data.data }])
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error' }])
    } finally {
      setLoading(false)
    }
  }

  const renderTable = (data: any[]) => {
    if (!data || data.length === 0) return null
    const keys = Object.keys(data[0])
    
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-gray-800 bg-[#111111]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1a1a1a] text-gray-400 uppercase text-xs font-semibold tracking-wider">
              <tr>
                {keys.map(k => <th key={k} className="px-5 py-4 whitespace-nowrap">{k.replace(/_/g, ' ')}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                  {keys.map(k => (
                    <td key={k} className="px-5 py-4 text-gray-300">
                      {typeof row[k] === 'number' && !Number.isInteger(row[k]) ? row[k].toFixed(2) : row[k]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-[#111111] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
      <div className="flex items-center gap-4 p-5 border-b border-gray-800 bg-[#111111] z-10">
        <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
          <Database size={22} />
        </div>
        <div>
          <h2 className="font-bold text-white text-lg tracking-tight">AI Data Analyst</h2>
          <p className="text-xs text-gray-400 font-medium">Powered by Gemini & Postgres RPC</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#0a0a0a]">
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-gray-500 text-center space-y-6"
          >
            <div className="p-4 bg-gray-900 rounded-full">
              <Bot size={40} className="text-gray-600" />
            </div>
            <p className="max-w-md text-sm leading-relaxed">
              Ask me complex statistical questions about players, teams, or fantasy points. I will generate SQL to query the live database.
            </p>
            <div className="flex flex-col gap-3 text-sm w-full max-w-md">
              <button onClick={() => setInput("Who were the top 10 WRs last season by PPR PPG?")} className="px-5 py-3.5 bg-[#111111] border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-gray-900 transition-all text-left text-gray-300">
                <span className="font-medium text-white mb-1 block">WR Scoring</span>
                "Who were the top 10 WRs last season by PPR PPG?"
              </button>
              <button onClick={() => setInput("Show me Christian McCaffrey's floor, ceiling, and avg standard pts based on standard deviation in 2026.")} className="px-5 py-3.5 bg-[#111111] border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-gray-900 transition-all text-left text-gray-300">
                <span className="font-medium text-white mb-1 block">Variance Analysis</span>
                "Show me Christian McCaffrey's floor and ceiling..."
              </button>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex gap-4 max-w-4xl mx-auto w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={20} />
                </div>
              )}
              
              <div className={`max-w-[85%] ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-md' 
                  : 'text-gray-300'
              }`}>
                {m.role === 'user' ? (
                  <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
                ) : (
                  <div className="prose prose-invert prose-blue max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                    {m.data && renderTable(m.data)}
                  </div>
                )}
              </div>

              {m.role === 'user' && (
                <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 flex items-center justify-center shrink-0 mt-1">
                  <User size={20} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex gap-4 max-w-4xl mx-auto w-full"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Loader2 size={20} className="animate-spin" />
            </div>
            <div className="text-gray-500 flex items-center gap-3 px-2">
              <span className="text-sm font-medium">Querying database...</span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-5 bg-[#111111] border-t border-gray-800">
        <form onSubmit={handleSubmit} className="relative flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a statistical question..."
            className="w-full bg-[#1a1a1a] text-white rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50 border border-gray-800 placeholder:text-gray-600 shadow-inner"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()}
            className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
