import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function ChatOpsSidebar() {
  const { user, role } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('chatops_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50);
      
    if (data) setMessages(data);
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  useEffect(() => {
    const channel = supabase
      .channel('public:chatops')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chatops_messages' }, payload => {
        setMessages(prev => [...prev, payload.new]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    const msg = input;
    setInput('');

    await supabase.from('chatops_messages').insert({
      sender: user.email.split('@')[0],
      message: msg,
      channel: 'general'
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="glass-button"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}
      >
        💬
      </button>

      {/* Sidebar Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-400px',
        width: '400px',
        height: '100vh',
        background: 'rgba(15, 15, 19, 0.95)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid var(--border-glass)',
        transition: 'right 0.3s ease',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            #general
          </h3>
          <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: 'bold', color: msg.sender === 'System' || msg.sender === 'Agent' ? 'var(--accent)' : 'var(--text-bright)' }}>
                  {msg.sender}
                </span>
                <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.4 }}>
                {msg.message}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-glass)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={user ? "Type a message or @agent..." : "Sign in to chat"}
              disabled={!user}
              style={{
                flex: 1,
                padding: '0.8rem',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                color: 'white',
                outline: 'none'
              }}
            />
            <button type="submit" disabled={!user} className="glass-button" style={{ padding: '0 1rem' }}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
