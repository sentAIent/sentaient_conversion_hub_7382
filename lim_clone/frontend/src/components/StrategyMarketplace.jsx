import React, { useState, useEffect } from 'react';

const StrategyMarketplace = ({ onViewChange }) => {
  const [strategies, setStrategies] = useState([]);
  const [userStatus, setUserStatus] = useState({
    username: localStorage.getItem('sentaient_user') || 'QuantTrader_1',
    tier: 'None',
    purchased_strategies: []
  });
  const [activeTab, setActiveTab] = useState('market'); // 'market', 'creator-hub'
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  
  // Checkout states
  const [checkoutType, setCheckoutType] = useState(null); // 'purchase', 'promote'
  const [selectedTier, setSelectedTier] = useState(null); // 'Silver', 'Gold', 'Platinum'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobilePlatform, setIsMobilePlatform] = useState(false);

  // Set standard user on mount if none exists
  useEffect(() => {
    const isNative = typeof window !== 'undefined' && (window.Capacitor?.isNativePlatform?.() || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    setIsMobilePlatform(isNative);

    if (!localStorage.getItem('sentaient_user')) {
      localStorage.setItem('sentaient_user', 'QuantTrader_1');
    }
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const username = localStorage.getItem('sentaient_user') || 'QuantTrader_1';
      
      // Fetch strategies
      const resStrats = await fetch('http://127.0.0.1:8000/api/fincept/strategies');
      const dataStrats = await resStrats.json();
      setStrategies(dataStrats);

      // Fetch user status
      const resUser = await fetch(`http://127.0.0.1:8000/api/fincept/user/status?username=${username}`);
      const dataUser = await resUser.json();
      setUserStatus(dataUser);
    } catch (err) {
      console.error('Error fetching marketplace data:', err);
    }
  };

  const handlePromotionSelect = (tier) => {
    setSelectedTier(tier);
    setCheckoutType('promote');
  };

  const handleStrategySelect = (strat) => {
    setSelectedStrategy(strat);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const username = localStorage.getItem('sentaient_user') || 'QuantTrader_1';

      if (checkoutType === 'promote') {
        const res = await fetch('http://127.0.0.1:8000/api/fincept/user/promote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, tier: selectedTier })
        });
        const result = await res.json();
        if (result.status === 'success') {
          alert(`Successfully subscribed to ${selectedTier} tier! Your profile is now promoted.`);
        }
      } else if (checkoutType === 'purchase') {
        const res = await fetch('http://127.0.0.1:8000/api/fincept/strategies/purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, strategy_id: selectedStrategy.id })
        });
        const result = await res.json();
        if (result.status === 'success') {
          alert(`Successfully purchased "${selectedStrategy.name}"!`);
        }
      }
      
      // Clear forms and refresh
      setCheckoutType(null);
      setSelectedTier(null);
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
      fetchMarketData();
    } catch (err) {
      alert('Checkout failed: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLoadStrategy = (strat) => {
    localStorage.setItem('active_canvas_strategy', JSON.stringify(strat));
    window.dispatchEvent(new Event('load_strategy_to_editor'));
    if (onViewChange) {
      onViewChange('nodeeditor');
    }
  };

  const isOwned = (strat) => {
    return strat.author === userStatus.username || userStatus.purchased_strategies.includes(strat.id);
  };

  return (
    <div style={{ padding: '24px', height: '100%', overflowY: 'auto', background: '#090d16', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
      
      {/* Sub Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, background: 'linear-gradient(90deg, #3b82f6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Quant Strategy Marketplace
          </h1>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.95rem' }}>
            Buy, sell, and share visual quant trading pipelines with the community.
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.02)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <button 
            onClick={() => setActiveTab('market')}
            style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', background: activeTab === 'market' ? '#3b82f6' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}>
            🛒 Marketplace
          </button>
          <button 
            onClick={() => setActiveTab('creator-hub')}
            style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', background: activeTab === 'creator-hub' ? '#3b82f6' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}>
            🚀 Creator Hub
          </button>
        </div>
      </div>

      {activeTab === 'market' && (
        <>
          {/* VIP spotlight banner for Platinum Creators */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.1rem', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>🔥 Promoted Spotlight</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {strategies.filter(s => s.creator_tier === 'Platinum').map(strat => (
                <div 
                  key={strat.id} 
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)', 
                    border: '2px solid #a855f7', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    position: 'relative', 
                    boxShadow: '0 8px 32px rgba(168, 85, 247, 0.2)' 
                  }}
                >
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#a855f7', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    Platinum VIP
                  </span>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#f8fafc' }}>{strat.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 12px 0' }}>By <strong>{strat.author}</strong></p>
                  <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.4, height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: '16px' }}>
                    {strat.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f8fafc' }}>
                      {strat.price === 0 ? 'FREE' : `$${strat.price}`}
                    </span>
                    <button 
                      onClick={() => {
                        if (isOwned(strat)) {
                          handleLoadStrategy(strat);
                        } else {
                          setSelectedStrategy(strat);
                          setCheckoutType('purchase');
                        }
                      }}
                      style={{ background: '#fff', color: '#090d16', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                      {isOwned(strat) ? 'Load to Editor' : 'Unlock Strategy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Marketplace */}
          <div>
            <h2 style={{ fontSize: '1.1rem', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>All Listed Pipelines</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {strategies.filter(s => s.creator_tier !== 'Platinum').map(strat => {
                const isPromoted = strat.creator_tier === 'Gold' || strat.creator_tier === 'Silver';
                return (
                  <div 
                    key={strat.id} 
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: isPromoted ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.05)', 
                      borderRadius: '10px', 
                      padding: '20px', 
                      position: 'relative' 
                    }}
                  >
                    {isPromoted && (
                      <span style={{ position: 'absolute', top: '12px', right: '12px', background: strat.creator_tier === 'Gold' ? '#fb923c' : '#3b82f6', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px', textTransform: 'uppercase' }}>
                        {strat.creator_tier} Creator
                      </span>
                    )}
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: '#f8fafc' }}>{strat.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 10px 0' }}>By <strong>{strat.author}</strong></p>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4, height: '36px', overflow: 'hidden', marginBottom: '16px' }}>
                      {strat.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {strat.tags.map((tag, idx) => (
                        <span key={idx} style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#38bdf8' }}>
                        {strat.price === 0 ? 'FREE' : `$${strat.price}`}
                      </span>
                      <button 
                        onClick={() => {
                          if (isOwned(strat)) {
                            handleLoadStrategy(strat);
                          } else {
                            setSelectedStrategy(strat);
                            setCheckoutType('purchase');
                          }
                        }}
                        style={{ background: isPromoted ? '#3b82f6' : 'rgba(255, 255, 255, 0.05)', color: '#fff', border: isPromoted ? 'none' : '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                        {isOwned(strat) ? 'Load to Editor' : 'Unlock'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {activeTab === 'creator-hub' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* My Pipelines */}
          <div>
            <h2 style={{ fontSize: '1.1rem', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>My Strategies & Pipelines</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Creator Status Card */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem' }}>Developer Profile: <strong style={{ color: '#fff' }}>{userStatus.username}</strong></h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Status:</span>
                    <span style={{ 
                      background: userStatus.tier === 'Platinum' ? 'rgba(168, 85, 247, 0.15)' : userStatus.tier === 'Gold' ? 'rgba(249, 115, 22, 0.15)' : userStatus.tier === 'Silver' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.05)',
                      color: userStatus.tier === 'Platinum' ? '#c084fc' : userStatus.tier === 'Gold' ? '#fb923c' : userStatus.tier === 'Silver' ? '#60a5fa' : '#94a3b8',
                      fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '999px' 
                    }}>
                      {userStatus.tier === 'None' ? 'Standard Account' : `${userStatus.tier} Creator`}
                    </span>
                  </div>
                </div>
                {userStatus.tier === 'None' && (
                  <span style={{ fontSize: '0.85rem', color: '#3b82f6' }}>← Choose a promotion plan in the sidebar to boost strategy views!</span>
                )}
              </div>

              {/* Strategy Listing */}
              {strategies.filter(s => s.author === userStatus.username || userStatus.purchased_strategies.includes(s.id)).map(strat => {
                const isAuthor = strat.author === userStatus.username;
                return (
                  <div key={strat.id} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#f8fafc' }}>{strat.name}</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                        {isAuthor ? 'Created by you' : `Purchased from ${strat.author}`} • {strat.nodes.length} nodes
                      </p>
                    </div>
                    <button 
                      onClick={() => handleLoadStrategy(strat)}
                      style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                      Load to Canvas
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Promotion Options */}
          <div>
            <h2 style={{ fontSize: '1.1rem', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Promote Developer Profile</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Silver Tier */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>Silver Tier</h3>
                  <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>$19/mo</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  Strategies get "Verified" badges and list priority over standard ones.
                </p>
                <button 
                  onClick={() => handlePromotionSelect('Silver')}
                  style={{ marginTop: '8px', padding: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                  Subscribe Silver
                </button>
              </div>

              {/* Gold Tier */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>Gold Tier</h3>
                  <span style={{ fontWeight: 'bold', color: '#fb923c' }}>$49/mo</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  Gold Creator profile badge, priority sorting, and basic page analytics unlocked.
                </p>
                <button 
                  onClick={() => handlePromotionSelect('Gold')}
                  style={{ marginTop: '8px', padding: '8px', background: 'rgba(249, 115, 22, 0.1)', color: '#fb923c', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                  Subscribe Gold
                </button>
              </div>

              {/* Platinum Tier */}
              <div style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(9,13,22,0.1) 100%)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#c084fc', fontSize: '1.15rem' }}>Platinum VIP</h3>
                  <span style={{ fontWeight: 'bold', color: '#c084fc' }}>$99/mo</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  Top spot spotlight banner, 0% platform trading commission, and custom VIP creator styles.
                </p>
                <button 
                  onClick={() => handlePromotionSelect('Platinum')}
                  style={{ marginTop: '8px', padding: '8px', background: '#a855f7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Subscribe Platinum
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Payment / Promotion Modal */}
      {checkoutType && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '440px', color: '#f9fafb' }}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '1.25rem', borderBottom: '1px solid #1f2937', paddingBottom: '12px' }}>
              {isMobilePlatform ? '📱 In-App Subscription' : '💳 Secure Payment Portal'}
            </h3>
            
            {checkoutType === 'promote' ? (
              <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '16px' }}>
                You are subscribing to the <strong style={{ color: '#fff' }}>{selectedTier} Tier</strong> for creator profile promotion.
              </p>
            ) : (
              <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '16px' }}>
                You are unlocking the strategy <strong style={{ color: '#fff' }}>{selectedStrategy?.name}</strong> for <strong style={{ color: '#fff' }}>${selectedStrategy?.price}</strong>.
              </p>
            )}

            {isMobilePlatform ? (
              <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '8px', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                <p>
                  <strong>Apple & Google Subscription Terms:</strong> Subscriptions renew automatically each month unless cancelled at least 24 hours prior to the conclusion of the active period. Manage subscriptions anytime in your device Account Settings.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '6px' }}>Card Number</label>
                  <input 
                    type="text" 
                    required
                    placeholder="4111 2222 3333 4444" 
                    value={cardNumber} 
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: '#030712', border: '1px solid #374151', borderRadius: '6px', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '6px' }}>Expiry Date</label>
                    <input 
                      type="text" 
                      required
                      placeholder="MM/YY" 
                      value={cardExpiry} 
                      onChange={(e) => setCardExpiry(e.target.value)}
                      style={{ width: '100%', padding: '10px', background: '#030712', border: '1px solid #374151', borderRadius: '6px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '6px' }}>CVV</label>
                    <input 
                      type="password" 
                      required
                      maxLength="4"
                      placeholder="***" 
                      value={cardCvv} 
                      onChange={(e) => setCardCvv(e.target.value)}
                      style={{ width: '100%', padding: '10px', background: '#030712', border: '1px solid #374151', borderRadius: '6px', color: '#fff' }}
                    />
                  </div>
                </div>
              </form>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button 
                type="button"
                onClick={() => {
                  setCheckoutType(null);
                  setSelectedTier(null);
                }}
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleCheckoutSubmit}
                disabled={isProcessing}
                style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: isProcessing ? 'wait' : 'pointer', fontWeight: 'bold' }}>
                {isProcessing ? 'Processing...' : (isMobilePlatform ? 'Authorize Store Purchase' : 'Complete Payment')}
              </button>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: '#94a3b8' }}>
              <span>Terms of Service &bull; Privacy Policy &bull; Restore Purchases</span>
            </div>
          </div>
        </div>
      )}

      {/* Financial Disclaimer Banner */}
      <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.5' }}>
        <p>
          <strong>Regulatory Notice:</strong> Strategies, algorithms, and models listed in the marketplace represent user-created analytical blueprints and historical backtest hypotheses. They do not constitute investment advice, solicitations, or fiduciary recommendations. Performance metrics are calculated via paper trading simulation.
        </p>
      </div>

    </div>
  );
};

export default StrategyMarketplace;
