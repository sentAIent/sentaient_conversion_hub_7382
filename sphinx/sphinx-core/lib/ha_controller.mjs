import fetch from 'node-fetch';

export class HomeAssistantController {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl || 'http://localhost:8123';
    this.token = token || process.env.HA_TOKEN;
  }

  async lockAllDoors() {
    console.log('[Sphinx Base Defense] EXECUTING DEFENSIVE ACTION: Locking all doors.');
    if (!this.token) {
      console.warn('[Sphinx Base Defense] Warning: HA_TOKEN not set. Action simulated.');
      return;
    }
    
    try {
      await fetch(`${this.baseUrl}/api/services/lock/lock`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ entity_id: 'all' })
      });
      console.log('[Sphinx Base Defense] All doors locked successfully.');
    } catch (e) {
      console.error('[Sphinx Base Defense] Failed to lock doors:', e.message);
    }
  }

  async pulseRedLights() {
    console.log('[Sphinx Base Defense] EXECUTING DEFENSIVE ACTION: Pulsing red lights.');
    // Simulated action for turning lights red during a breach
  }
}
