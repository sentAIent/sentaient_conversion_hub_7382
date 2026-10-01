/**
 * MattermostClient.js
 * 
 * A headless service wrapper for interacting with the Mattermost REST API and WebSockets.
 * This acts as the backend communication layer for the Matrix Edge AI chat system.
 */

class MattermostClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.apiUrl = `${baseUrl}/api/v4`;
    this.token = null;
    this.userId = null;
    this.ws = null;
    this.messageHandlers = new Set();
  }

  /**
   * Authenticate with the Mattermost server.
   */
  async login(username, password) {
    const res = await fetch(`${this.apiUrl}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login_id: username, password })
    });

    if (!res.ok) {
      throw new Error('Failed to login to Mattermost');
    }

    this.token = res.headers.get('Token');
    const userData = await res.json();
    this.userId = userData.id;

    // Initialize WebSocket connection for real-time events
    this.connectWebSocket();
    return userData;
  }

  /**
   * Helper for authenticated API requests
   */
  async request(endpoint, options = {}) {
    if (!this.token) throw new Error('Not authenticated');

    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    const res = await fetch(`${this.apiUrl}${endpoint}`, { ...options, headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`Mattermost API Error: ${err.message || res.statusText}`);
    }
    
    // Some endpoints return 204 No Content
    if (res.status === 204) return null;
    return await res.json();
  }

  /**
   * Create a new post (message) in a channel.
   */
  async createPost(channelId, message, rootId = '') {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify({
        channel_id: channelId,
        message,
        root_id: rootId
      })
    });
  }

  /**
   * Fetch posts for a specific channel.
   */
  async getPosts(channelId, page = 0, perPage = 60) {
    return this.request(`/channels/${channelId}/posts?page=${page}&per_page=${perPage}`);
  }

  /**
   * Initialize a WebSocket connection to listen for real-time events.
   */
  connectWebSocket() {
    if (this.ws) return;

    const wsUrl = this.baseUrl.replace(/^http/, 'ws') + '/api/v4/websocket';
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      // Authenticate the websocket stream
      this.ws.send(JSON.stringify({
        seq: 1,
        action: 'authentication_challenge',
        data: { token: this.token }
      }));
    };

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.event === 'posted') {
        const post = JSON.parse(msg.data.post);
        this.messageHandlers.forEach(handler => handler(post));
      }
    };

    this.ws.onerror = (err) => console.error('Mattermost WS Error:', err);
    this.ws.onclose = () => {
      this.ws = null;
      // Implement basic reconnection logic
      setTimeout(() => this.connectWebSocket(), 3000);
    };
  }

  /**
   * Subscribe to incoming messages.
   */
  onMessage(handler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }
}

export const mattermostClient = new MattermostClient('http://localhost:8065');
