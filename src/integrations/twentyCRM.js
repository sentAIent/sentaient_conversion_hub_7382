/**
 * twentyCRM.js
 * Integration layer for Twenty CRM Cloud API.
 * Automatically handles lead creation, opportunity pipelines, and contact updates.
 */

const TWENTY_API_BASE = 'https://api.twenty.com/rest/v1';

export class TwentyCRMIntegration {
    constructor() {
        this.apiKey = import.meta.env.VITE_TWENTY_API_KEY;
    }

    /**
     * Creates a new Person (Contact) in Twenty CRM
     * @param {object} personData - Details of the person (firstName, lastName, email, etc.)
     */
    async createPerson(personData) {
        if (!this.apiKey) {
            console.warn("[TwentyCRM] No API key found. Mocking Person creation:", personData);
            return { id: `mock_person_${Date.now()}`, ...personData };
        }

        try {
            const response = await fetch(`${TWENTY_API_BASE}/people`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(personData)
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("[TwentyCRM] Error creating person:", error);
            throw error;
        }
    }

    /**
     * Creates an Opportunity associated with a Person
     * @param {string} personId - The ID of the person
     * @param {object} opportunityData - Details of the opportunity (name, amount, stage)
     */
    async createOpportunity(personId, opportunityData) {
        if (!this.apiKey) {
            console.warn("[TwentyCRM] No API key found. Mocking Opportunity creation for person:", personId);
            return { id: `mock_opportunity_${Date.now()}`, personId, ...opportunityData };
        }

        try {
            const response = await fetch(`${TWENTY_API_BASE}/opportunities`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personId,
                    ...opportunityData
                })
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("[TwentyCRM] Error creating opportunity:", error);
            throw error;
        }
    }
}

// Export singleton instance
export const twentyCRM = new TwentyCRMIntegration();
