import React, { useState, useEffect } from 'react';
import { LightningIcon } from "./icons/LightningIcon";
import { CloseIcon } from "./icons/CloseIcon";

const GitNexusAuditor = ({ algorithmId, codeString, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'GitNexus RAG Agent initialized. I have mapped the knowledge graph for this algorithm. What would you like to know about its security, logic, or dependencies?' }
  ]);
  const [input, setInput] = useState('');
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    // Simulate initial graph building
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [algorithmId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    const query = input;
    setInput('');
    
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api/copilot`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, algorithmId: algorithmId || 'default' })
        });
        const data = await res.json();
        if (data.reply) {
            setMessages([...newMsgs, { role: 'assistant', content: data.reply }]);
        } else {
            setMessages([...newMsgs, { role: 'assistant', content: "Error: No response from copilot." }]);
        }
    } catch (err) {
        console.error(err);
        setMessages([...newMsgs, { role: 'assistant', content: "Network error connecting to copilot." }]);
    }
  };

  return (
    <div style={{ position: 'relative', padding: '24px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      {/* Visual Graph Panel */}
      <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', padding: '16px', position: 'relative', minHeight: '350px', overflow: 'hidden' }}>
        <h3 style={{ color: 'var(--success-color)', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LightningIcon size={20} />
          GitNexus Knowledge Graph
        </h3>
        
        {isScanning ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '250px' }}>
            <div style={{ border: '2px solid rgba(16,185,129,0.2)', borderBottomColor: 'var(--success-color)', borderRadius: '50%', width: '48px', height: '48px', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Mapping code syntax and dependencies...</p>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{ position: 'relative', height: '250px', width: '100%' }}>
            {/* Mock Nodes */}
            <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', padding: '8px', background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.5)', borderRadius: '4px', fontSize: '0.75rem', color: '#93c5fd', zIndex: 10 }}>Algorithm Base</div>
            
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', stroke: 'rgba(255,255,255,0.1)', zIndex: 0 }}>
               <line x1="50%" y1="20%" x2="25%" y2="50%" strokeWidth="1.5" />
               <line x1="50%" y1="20%" x2="75%" y2="50%" strokeWidth="1.5" />
               <line x1="25%" y1="60%" x2="50%" y2="85%" strokeWidth="1.5" strokeDasharray="4" />
               <line x1="75%" y1="60%" x2="50%" y2="85%" strokeWidth="1.5" strokeDasharray="4" />
            </svg>

            <div style={{ position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', padding: '8px', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.5)', borderRadius: '4px', fontSize: '0.75rem', color: '#6ee7b7', zIndex: 10, cursor: 'pointer' }}>quant_engine (LEAN)</div>
            <div style={{ position: 'absolute', top: '50%', left: '75%', transform: 'translate(-50%, -50%)', padding: '8px', background: 'rgba(167,139,250,0.2)', border: '1px solid rgba(167,139,250,0.5)', borderRadius: '4px', fontSize: '0.75rem', color: '#d8b4fe', zIndex: 10, cursor: 'pointer' }}>risk_limits (1x max)</div>
            
            <div style={{ position: 'absolute', top: '85%', left: '50%', transform: 'translate(-50%, -50%)', padding: '8px', background: 'rgba(244,63,94,0.2)', border: '1px solid rgba(244,63,94,0.5)', borderRadius: '4px', fontSize: '0.75rem', color: '#fda4af', zIndex: 10, cursor: 'pointer' }}>broker_vault_aes</div>
          </div>
        )}
      </div>

      {/* RAG Chat Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', border: '1px solid var(--border-color)', overflow: 'hidden', maxHeight: '350px' }}>
        <div style={{ padding: '12px', background: 'rgba(15,23,42,0.8)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>GitNexus Graph RAG Agent</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Zero-Server Client</span>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '85%', borderRadius: '6px', padding: '12px', fontSize: '0.85rem', lineHeight: '1.4', background: msg.role === 'user' ? 'var(--accent-color)' : 'rgba(30,41,59,0.8)', color: msg.role === 'user' ? '#fff' : 'var(--text-primary)', border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)' }}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about this code (e.g. stop-loss, leverage)..." 
            style={{ flex: 1, background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', fontSize: '0.85rem', color: '#fff', outline: 'none' }}
          />
          <button 
            onClick={handleSend}
            style={{ background: 'var(--success-color)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}
          >
            Ask
          </button>
        </div>
      </div>
      
      {onClose && (
        <button onClick={onClose} style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }} title="Close Auditor">
          <CloseIcon size={20} />
        </button>
      )}
    </div>
  );
};

export default GitNexusAuditor;
