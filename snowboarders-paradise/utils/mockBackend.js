// mockBackend.js
// Simulates Supabase using LocalStorage

export const MockBackend = {
  login: async (username) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('sp_username', username);
    return { success: true, username };
  },

  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem('sp_username');
  },

  submitScore: async (score, distance, ghostFrames) => {
    if (typeof window === 'undefined') return;
    const user = MockBackend.getCurrentUser() || 'Anonymous';
    const entry = { user, score, distance, date: new Date().toISOString(), ghostFrames };
    
    let leaderboard = JSON.parse(window.localStorage.getItem('sp_leaderboard') || '[]');
    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 50); // Keep top 50
    
    window.localStorage.setItem('sp_leaderboard', JSON.stringify(leaderboard));
    return { success: true };
  },

  getLeaderboard: async () => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(window.localStorage.getItem('sp_leaderboard') || '[]');
  },

  saveProgression: async (data) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('sp_progression', JSON.stringify(data));
  },

  loadProgression: async () => {
    if (typeof window === 'undefined') return { coins: 0, unlocked: [] };
    return JSON.parse(window.localStorage.getItem('sp_progression') || '{"coins": 0, "unlocked": []}');
  },

  logComplianceAgreement: async (agreements) => {
    if (typeof window === 'undefined') return;
    // Store compliance records persistently to prove compliance proactively
    const log = {
      timestamp: new Date().toISOString(),
      agreements,
      ip_address: "127.0.0.1", // In production, grab this from the server request
      user_agent: navigator.userAgent
    };
    let logs = JSON.parse(window.localStorage.getItem('sp_compliance_logs') || '[]');
    logs.push(log);
    window.localStorage.setItem('sp_compliance_logs', JSON.stringify(logs));
    window.localStorage.setItem('sp_compliance_accepted', 'true');
    return { success: true };
  },

  deleteUserData: async () => {
    if (typeof window === 'undefined') return;
    
    // Clear all progression, scores, and settings
    window.localStorage.removeItem('sp_username');
    window.localStorage.removeItem('sp_progression');
    window.localStorage.removeItem('sp_leaderboard');
    window.localStorage.removeItem('sp_compliance_accepted');
    window.localStorage.removeItem('sp_compliance_logs');
    window.localStorage.removeItem('sp_vault_clips');
    
    // Attempt to clear cookies if any were set
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });

    return { success: true };
  }
};
