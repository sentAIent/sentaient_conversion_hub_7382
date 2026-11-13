/**
 * Netlify Serverless Function: Analytics Ingest
 * Receives telemetry events (errors, feedback, session heartbeats)
 */

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { type, payload: eventData } = payload;

    // Log for server telemetry
    console.log(`[Analytics Ingest] Event Type: ${type}`, {
      timestamp: new Date().toISOString(),
      type,
      eventData
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        receivedAt: new Date().toISOString()
      })
    };
  } catch (err) {
    console.error('[Analytics Ingest Error]', err);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON payload' })
    };
  }
};
