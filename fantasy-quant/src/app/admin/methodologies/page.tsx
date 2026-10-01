'use client';

import React, { useState } from 'react';
import { Save, Plus, Loader2, Database } from '@/components/icons';

export default function MethodologiesAdmin() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!title || !content) {
      setMessage('Title and Content are required.');
      setStatus('error');
      return;
    }

    setStatus('saving');
    try {
      const res = await fetch('/api/admin/methodologies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage('Methodology vectorized and saved successfully!');
        setTitle('');
        setContent('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to save methodology.');
      }
    } catch (e) {
      setStatus('error');
      setMessage('Network error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#E0E0E0] p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="border-b-4 border-white pb-6 mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Database className="w-8 h-8" />
            Quant Knowledge Base
          </h1>
          <p className="text-gray-400 mt-2">Manage AI RAG Methodologies & Formulas</p>
        </header>

        <div className="bg-[#111] border-2 border-white p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Title / Subject</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Playoff QB SOS Calculation"
              className="w-full bg-black border-2 border-gray-700 p-3 text-white focus:border-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Methodology / SQL Template (Markdown)</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Define the exact mathematical formulas, SQL snippets, and logic the AI should use..."
              className="w-full bg-black border-2 border-gray-700 p-3 text-white focus:border-white focus:outline-none transition-colors h-64 font-mono text-sm"
            />
          </div>

          {message && (
            <div className={`p-4 border-2 ${status === 'error' ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'} bg-black font-bold uppercase`}>
              {message}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={status === 'saving'}
              className="bg-white text-black px-6 py-3 font-black uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {status === 'saving' ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Embedding...</>
              ) : (
                <><Save className="w-5 h-5" /> Save to Vector DB</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
