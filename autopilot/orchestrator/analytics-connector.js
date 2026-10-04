import axios from 'axios';

/**
 * SentAIent AutoPilot <-> Ackee Analytics Bridge
 * 
 * Provisions isolated analytics dashboards and tracking IDs for AutoPilot
 * users using our internal, privacy-first Ackee instance.
 */
export class AnalyticsConnector {
    baseUrl;
    username;
    password;
    token;

    constructor() {
        this.baseUrl = process.env.ACKEE_URL || 'http://localhost:3000/api';
        this.username = process.env.ACKEE_USERNAME || 'admin';
        this.password = process.env.ACKEE_PASSWORD || 'sentaient_ackee_secret';
        this.token = null;
    }

    /**
     * Authenticates with Ackee to get a JWT token for administrative actions.
     */
    async authenticate() {
        try {
            const response = await axios.post(`${this.baseUrl}`, {
                query: `
                    mutation createToken($input: CreateTokenInput!) {
                        createToken(input: $input) {
                            payload {
                                id
                            }
                        }
                    }
                `,
                variables: {
                    input: {
                        username: this.username,
                        password: this.password
                    }
                }
            });

            this.token = response.data.data.createToken.payload.id;
        } catch (error) {
            console.error('[Ackee] Authentication failed:', error.message);
            throw new Error('Failed to authenticate with analytics backend.');
        }
    }

    /**
     * Provisions a new tracking domain in Ackee for a specific user campaign or bio-link.
     * @param {string} title - The name of the campaign/site (e.g., "UserX BioLink")
     * @returns {string} The unique Tracking Domain ID to inject into the user's generated pages.
     */
    async provisionDomain(title) {
        if (!this.token) await this.authenticate();

        try {
            const response = await axios.post(`${this.baseUrl}`, {
                query: `
                    mutation createDomain($input: CreateDomainInput!) {
                        createDomain(input: $input) {
                            payload {
                                id
                            }
                        }
                    }
                `,
                variables: {
                    input: {
                        title: title
                    }
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const domainId = response.data.data.createDomain.payload.id;
            console.log(`[Ackee] Provisioned new tracking domain for "${title}": ${domainId}`);
            return domainId;
        } catch (error) {
            console.error('[Ackee] Domain provisioning failed:', error.message);
            throw new Error('Failed to provision analytics domain.');
        }
    }
}
