import fetch from 'node-fetch'; // Backend uses Node 18+ or standard node-fetch

/**
 * Service to generate Cal.com booking links when users match.
 */
export const generateMeetingLink = async (user1Id: string, user2Id: string) => {
  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) {
    console.log(`[Cal.com] Missing API Key. Returning fallback link for ${user1Id} and ${user2Id}`);
    return `https://cal.com/sentaient-agent/icebreaker-meetup?notes=Meeting%20between%20${user1Id}%20and%20${user2Id}`;
  }

  try {
    const response = await fetch('https://api.cal.com/v1/links?apiKey=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventTypeId: 1, // Assume 1 is the default meeting type
        title: `Icebreaker Meeting: ${user1Id.substring(0,6)} & ${user2Id.substring(0,6)}`,
        notes: `Meeting between ${user1Id} and ${user2Id}`,
      })
    });
    const data = await response.json() as any;
    if (data && data.link) {
      return data.link;
    }
  } catch (e) {
    console.error("[Cal.com] API Error:", e);
  }
  
  return `https://cal.com/sentaient-agent/icebreaker-meetup?notes=Meeting%20between%20${user1Id}%20and%20${user2Id}`;
};
