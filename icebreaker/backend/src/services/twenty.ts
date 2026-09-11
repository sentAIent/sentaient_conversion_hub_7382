/**
 * Service to sync newly registered Venues to Twenty CRM.
 */
import fetch from 'node-fetch';

export const syncVenueToCRM = async (venueName: string, email: string) => {
  console.log(`[Twenty CRM] Syncing new venue: ${venueName} (${email})`);
  
  const payload = {
    name: venueName,
    domainName: email.split('@')[1] || '',
    accountOwnerId: 'SYSTEM', // Assign to standard sales rep
  };

  const apiKey = process.env.TWENTY_API_KEY;
  if (!apiKey) {
    console.log("[Twenty CRM] Missing API Key. Using mock.");
    return { success: true, crmId: 'twenty_mock_id' };
  }

  try {
    const response = await fetch('https://api.twenty.com/rest/companies', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json() as any;
    return { success: true, crmId: data.id || 'unknown_id' };
  } catch(e) {
    console.error("[Twenty CRM] API Error:", e);
    return { success: false, crmId: null };
  }
};
