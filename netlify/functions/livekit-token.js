const { AccessToken } = require('livekit-server-sdk');

exports.handler = async (event, context) => {
  // Ensure the request is POST or GET, handle CORS if necessary
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // 1. Get LiveKit Credentials from Netlify Environment Variables
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server misconfigured. Missing LiveKit credentials.' })
      };
    }

    // 2. Extract user info (if any) or generate a random identity for the game session
    // In a real app, you would verify the user's session token here.
    const participantIdentity = `space-commander-${Math.floor(Math.random() * 10000)}`;
    const participantName = 'Interstellar Player';

    // 3. Create the secure JWT Token
    // We give the user permission to join the "interstellar-bridge" room
    // and permission to publish audio (speak) and subscribe (listen).
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantIdentity,
      name: participantName,
    });
    
    at.addGrant({ 
        roomJoin: true, 
        room: 'interstellar-bridge',
        canPublish: true,
        canSubscribe: true 
    });

    const token = await at.toJwt();

    // 4. Return the token securely to the frontend
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ token })
    };
  } catch (error) {
    console.error('Error generating token:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to generate access token' })
    };
  }
};
