import React, { useState, useEffect } from 'react';

const AlertsManager = ({ symbol, currentPrice, alerts, setAlerts }) => {
  const [activeTab, setActiveTab] = useState('price_alerts'); // 'price_alerts', 'webhooks'
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState('ABOVE');

  // Webhook and Telegram Configurations
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState('');
  const [telegramBotToken, setTelegramBotToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [testStatus, setTestStatus] = useState('');

  useEffect(() => {
    fetchAlertsConfig();
  }, []);

  const fetchAlertsConfig = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/alerts/config');
      const data = await res.json();
      if (data.discord_webhook_url) setDiscordWebhookUrl(data.discord_webhook_url);
      if (data.telegram_bot_token) setTelegramBotToken(data.telegram_bot_token);
      if (data.telegram_chat_id) setTelegramChatId(data.telegram_chat_id);
    } catch (e) {
      console.warn('Alerts config error:', e);
    }
  };

  const handleSaveWebhooks = async (e) => {
    e.preventDefault();
    setSaveStatus('Saving...');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/alerts/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discord_webhook_url: discordWebhookUrl,
          telegram_bot_token: telegramBotToken,
          telegram_chat_id: telegramChatId,
          events_enabled: {
            trade_executed: true,
            stop_loss_triggered: true,
            drawdown_circuit_breaker: true,
            alpha_stream_signal: true
          }
        })
      });
      const data = await res.json();
      setSaveStatus('✅ Webhooks saved successfully.');
    } catch (e) {
      setSaveStatus('❌ Save failed: ' + e.message);
    }
  };

  const handleSendTestAlert = async (channel) => {
    setTestStatus(`Testing ${channel}...`);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/alerts/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel,
          discord_webhook_url: discordWebhookUrl,
          telegram_bot_token: telegramBotToken,
          telegram_chat_id: telegramChatId
        })
      });
      const data = await res.json();
      setTestStatus(data.success ? `✅ ${channel} test alert delivered!` : `❌ ${channel} delivery failed.`);
    } catch (e) {
      setTestStatus('❌ Test failed: ' + e.message);
    }
  };

  const handleAddAlert = (e) => {
    e.preventDefault();
    if (!targetPrice || isNaN(targetPrice)) return;
    
    const newAlert = {
      id: Date.now().toString(),
      symbol: symbol.toUpperCase(),
      target: parseFloat(targetPrice),
      condition,
      active: true,
      createdAt: new Date().toLocaleTimeString()
    };
    
    setAlerts([...alerts, newAlert]);
    setTargetPrice('');
  };

  const handleDelete = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="panel" style={{ padding: '20px', background: 'rgba(22, 26, 37, 0.7)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>
      
      {/* Header & Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '1rem' }}>🔔 Alert Dispatcher</h3>
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '3px', borderRadius: '6px' }}>
          <button 
            onClick={() => setActiveTab('price_alerts')}
            style={{ padding: '4px 10px', borderRadius: '4px', border: 'none', background: activeTab === 'price_alerts' ? '#3b82f6' : 'transparent', color: activeTab === 'price_alerts' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
          >
            Price Limits
          </button>
          <button 
            onClick={() => setActiveTab('webhooks')}
            style={{ padding: '4px 10px', borderRadius: '4px', border: 'none', background: activeTab === 'webhooks' ? '#3b82f6' : 'transparent', color: activeTab === 'webhooks' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
          >
            Telegram / Discord
          </button>
        </div>
      </div>
      
      {activeTab === 'price_alerts' ? (
        <>
          <form onSubmit={handleAddAlert} style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#0f172a', padding: '6px 12px', borderRadius: '6px', border: '1px solid #334155' }}>
              <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>{symbol}</span>
            </div>
            <select 
              value={condition} 
              onChange={(e) => setCondition(e.target.value)}
              style={{ background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              <option value="ABOVE">CROSSES ABOVE</option>
              <option value="BELOW">CROSSES BELOW</option>
            </select>
            <input 
              type="text" 
              placeholder="Price (e.g. 185.50)" 
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              style={{ background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '6px 12px', width: '130px', fontSize: '0.85rem' }}
            />
            <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 16px', fontWeight: '600', cursor: 'pointer' }}>
              Set Alert
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {alerts.length === 0 ? (
              <div style={{ color: '#64748b', fontSize: '0.8rem', fontStyle: 'italic', textAlign: 'center', padding: '12px' }}>
                No price alerts configured.
              </div>
            ) : (
              alerts.map(alert => (
                <div 
                  key={alert.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '10px 14px', 
                    background: alert.active ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)', 
                    borderRadius: '6px',
                    border: `1px solid ${alert.active ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
                    opacity: alert.active ? 1 : 0.6
                  }}
                >
                  <div style={{ fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: '700', color: '#fff', marginRight: '6px' }}>{alert.symbol}</span>
                    <span style={{ color: '#94a3b8', marginRight: '6px' }}>{alert.condition === 'ABOVE' ? '≥' : '≤'}</span>
                    <span style={{ fontWeight: '600', color: '#fbbf24' }}>${alert.target.toFixed(2)}</span>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', marginLeft: '10px' }}>({alert.createdAt})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: alert.active ? '#3b82f6' : '#10b981' }}>
                      {alert.active ? 'ACTIVE' : 'TRIGGERED ✓'}
                    </span>
                    <button 
                      onClick={() => handleDelete(alert.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        /* Webhook & Telegram Tab */
        <form onSubmit={handleSaveWebhooks} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
              Discord Webhook URL
            </label>
            <input 
              type="text" 
              value={discordWebhookUrl}
              onChange={(e) => setDiscordWebhookUrl(e.target.value)}
              placeholder="https://discord.com/api/webhooks/..."
              style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '6px', fontSize: '0.8rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                Telegram Bot Token
              </label>
              <input 
                type="text" 
                value={telegramBotToken}
                onChange={(e) => setTelegramBotToken(e.target.value)}
                placeholder="123456:ABC-DEF..."
                style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '6px', fontSize: '0.8rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                Telegram Chat ID
              </label>
              <input 
                type="text" 
                value={telegramChatId}
                onChange={(e) => setTelegramChatId(e.target.value)}
                placeholder="@my_trading_channel or -100123"
                style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '6px', fontSize: '0.8rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              Save Webhook Routes
            </button>
            <button 
              type="button" 
              onClick={() => handleSendTestAlert('discord')}
              style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid #3b82f6', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              Test Discord
            </button>
            <button 
              type="button" 
              onClick={() => handleSendTestAlert('telegram')}
              style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid #10b981', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              Test Telegram
            </button>
          </div>

          {(saveStatus || testStatus) && (
            <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>
              {saveStatus || testStatus}
            </div>
          )}
        </form>
      )}

    </div>
  );
};

export default AlertsManager;
