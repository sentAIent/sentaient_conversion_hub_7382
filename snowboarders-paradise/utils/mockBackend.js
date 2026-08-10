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
  }
};
