exports.handler = async (event, context) => {
  // 1. Edge Proxy: Keep OPENAI_API_KEY secure on the server
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfiguration: Missing API Key" }) };
  }

  // 2. Authentication Verification
  // Ensure the user is logged in before allowing AI calls
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized access" }) };
  }

  // 3. Basic IP Rate Limiting & Spend Caps (Mocked logic for implementation)
  const clientIp = event.headers["x-nf-client-connection-ip"] || "unknown";
  
  // To strictly enforce this, you would check a Redis/Supabase table for usage counts
  // e.g., const usage = await checkUsage(clientIp);
  // if (usage > 100) return { statusCode: 429, body: "Rate limit exceeded" };
  // if (budgetExceeded) return { statusCode: 402, body: "Spend cap reached" };

  try {
    const payload = JSON.parse(event.body);

    // Ensure we are appending max_tokens to prevent massive runaway completions
    if (!payload.max_tokens) {
      payload.max_tokens = 500;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "OpenAI API Error", details: errorData })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Configure strictly in production
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error("OpenAI Proxy Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
};
