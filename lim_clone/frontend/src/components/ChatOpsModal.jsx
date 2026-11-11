import React, { useState, useEffect } from 'react';

const ChatOpsModal = ({ isOpen, onClose }) => {
  const [discordUrl, setDiscordUrl] = useState('');
  const [telegramToken, setTelegramToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [loading, setLoading] = useState(false);
  const [testNotice, setTestNotice] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetch('http://127.0.0.1:8000/api/chatops/config')
        .then(r => r.json())
        .then(data => {
          // prefill if loaded
        })
        .catch(err => console.warn(err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveConfig = async () => {
    setLoading(true);
    try {
      await fetch('http://127.0.0.1:8000/api/chatops/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discord_webhook_url: discordUrl,
          telegram_bot_token: telegramToken,
          telegram_chat_id: telegramChatId,
          enabled: true
        })
      });
      alert("ChatOps Webhook configuration saved!");
    } catch (e) {
      alert("Save failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const sendTestAlert = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/chatops/test-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: "NVDA",
          side: "BUY",
          qty: 25,
          price: 135.20,
          stop_loss: 131.82,
          take_profit: 141.96,
          strategy: "LangGraph Sentient Alpha Bot",
          order_id: "test-ord-7382"
        })
      });
      const data = await res.json();
      setTestNotice(data.preview);
    } catch (e) {
      alert("Test failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        width: '520px',
        maxWidth: '92vw',
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc', fontWeight: 800 }}>
            📲 ChatOps: Telegram & Discord Instant Trade Bot
          </h3>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4' }}>
          Receive automated 1-tap trade approval cards and fill notifications directly on your mobile device whenever high-confidence alpha triggers.
        </p>

        {/* Discord Section */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '4px' }}>
            Discord Webhook URL
          </label>
          <input
            type="text"
            placeholder="https://discord.com/api/webhooks/..."
            value={discordUrl}
            onChange={(e) => setDiscordUrl(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', fontSize: '0.8rem' }}
          />
        </div>

        {/* Telegram Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '4px' }}>
              Telegram Bot Token
            </label>
            <input
              type="text"
              placeholder="123456:ABC-DEF1234ghIkl-zyx"
              value={telegramToken}
              onChange={(e) => setTelegramToken(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', fontSize: '0.8rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '4px' }}>
              Chat ID
            </label>
            <input
              type="text"
              placeholder="@MyQuantAlerts"
              value={telegramChatId}
              onChange={(e) => setTelegramChatId(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', fontSize: '0.8rem' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
          <button
            onClick={saveConfig}
            disabled={loading}
            className="btn-primary"
            style={{ flex: 1, padding: '10px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
          >
            💾 Save Webhook Config
          </button>
          <button
            onClick={sendTestAlert}
            disabled={loading}
            style={{
              padding: '10px 16px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              color: '#38bdf8',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            🚀 Send Test Alert
          </button>
        </div>

        {/* Test Preview Output */}
        {testNotice && (
          <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '12px', fontSize: '0.75rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', fontFamily: 'monospace', maxHeight: '160px', overflowY: 'auto' }}>
            {testNotice}
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatOpsModal;
