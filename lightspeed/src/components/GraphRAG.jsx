import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function GraphRAG() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('graph-rag-query', {
        body: { query: userMessage.content }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      console.error("Error querying Graph-RAG:", err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error querying the Knowledge Graph. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🧠</span> Cloud Graph-RAG
        </h3>
        <span className="badge safe">Gemini Powered</span>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
            Ask anything about the system architecture, security posture, or specific nodes.
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} style={{ 
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user' ? 'rgba(0, 150, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${msg.role === 'user' ? 'rgba(0, 150, 255, 0.3)' : 'rgba(255,255,255,0.1)'}`,
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              maxWidth: '85%',
              lineHeight: '1.4'
            }}>
              {msg.content}
            </div>
          ))
        )}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Analyzing knowledge graph...
          </div>
        )}
      </div>

      <form onSubmit={handleQuery} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. What apps use legacy authentication?"
          style={{ 
            flex: 1, 
            padding: '0.8rem', 
            background: 'rgba(0,0,0,0.3)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '8px',
            color: 'white',
            outline: 'none'
          }}
          disabled={loading}
        />
        <button type="submit" className="glass-button" disabled={loading} style={{ padding: '0 1.5rem', fontWeight: 'bold' }}>
          Query
        </button>
      </form>
    </div>
  );
}
