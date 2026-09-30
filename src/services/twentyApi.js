// src/services/twentyApi.js

/**
 * Service to interact with the Twenty CRM API.
 * Uses environment variables for configuration.
 * VITE_TWENTY_API_URL: e.g., "https://api.twenty.com"
 * VITE_TWENTY_API_KEY: Bearer token
 */

const API_URL = import.meta.env.VITE_TWENTY_API_URL || 'https://api.twenty.com';
const API_KEY = import.meta.env.VITE_TWENTY_API_KEY;

export async function pingTwentyApi() {
  if (!API_KEY) {
    console.warn("Twenty API Key not found. Operating in mock mode.");
    return { success: true, mocked: true, message: "Mock ping successful. Set VITE_TWENTY_API_KEY to hit real API." };
  }

  try {
    // Ping the health or core objects endpoint
    const response = await fetch(`${API_URL}/rest/core/workspaces`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Failed to ping Twenty API:", error);
    return { success: false, error: error.message };
  }
}

export async function createContact(firstName, lastName, email) {
  if (!API_KEY) {
    console.log(`[Mock Twenty] Created contact ${firstName} ${lastName}`);
    return { success: true, mocked: true };
  }

  try {
    const response = await fetch(`${API_URL}/rest/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: { firstName, lastName },
        emails: [{ address: email, primary: true }]
      })
    });
    
    return { success: response.ok, data: await response.json() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
