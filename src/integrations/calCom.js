/**
 * calCom.js
 * Integration layer for Cal.com Scheduling API.
 * Automatically generates booking links for high-value leads identified by the agent swarm.
 */

const CAL_API_BASE = 'https://api.cal.com/v1';

export class CalComIntegration {
    constructor() {
        this.apiKey = import.meta.env.VITE_CALCOM_API_KEY;
        this.eventTypeId = import.meta.env.VITE_CALCOM_EVENT_TYPE_ID; // The ID of the event to book (e.g., 30-min discovery call)
    }

    /**
     * Generates a pre-filled scheduling link for a specific lead
     * @param {object} leadData - Lead details (name, email) to pre-fill the booking
     * @returns {string} - The scheduling URL
     */
    generateSchedulingLink(leadData) {
        // Base cal.com username link would be configured in env, e.g. cal.com/sentaient/discovery
        const baseUrl = import.meta.env.VITE_CALCOM_BASE_LINK || 'https://cal.com/mock-user/discovery';
        
        const params = new URLSearchParams();
        if (leadData.name) params.append('name', leadData.name);
        if (leadData.email) params.append('email', leadData.email);
        
        return `${baseUrl}?${params.toString()}`;
    }

    /**
     * Optionally fetches available slots for a custom UI rendering
     * @param {string} startTime - ISO String
     * @param {string} endTime - ISO String
     */
    async getAvailableSlots(startTime, endTime) {
        if (!this.apiKey) {
            console.warn("[Cal.com] No API key found. Mocking available slots.");
            return [
                { time: '2026-09-01T10:00:00Z', duration: 30 },
                { time: '2026-09-01T14:30:00Z', duration: 30 }
            ];
        }

        try {
            const response = await fetch(`${CAL_API_BASE}/slots?eventTypeId=${this.eventTypeId}&startTime=${startTime}&endTime=${endTime}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("[Cal.com] Error fetching slots:", error);
            throw error;
        }
    }
}

// Export singleton instance
export const calCom = new CalComIntegration();
