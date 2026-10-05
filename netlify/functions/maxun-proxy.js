exports.handler = async (event, context) => {
  // Edge Proxy: Securely route requests to Maxun without exposing the API Key or URL

  if (event.httpMethod !== "POST" && event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Use dynamic ports via environment variables (default to 8080 if not set)
  const maxunApiUrl = process.env.MAXUN_API_URL || "http://localhost:8080";
  const apiKey = process.env.MAXUN_API_KEY;

  if (!apiKey) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "Server misconfiguration: Missing Maxun API Key" }) 
    };
  }

  // Ensure the user is authenticated (Optional but recommended)
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized access" }) };
  }

  try {
    const action = event.path.split('/').pop(); // e.g. 'run' or 'result'

    if (action === 'run') {
      const payload = JSON.parse(event.body);
      const response = await fetch(`${maxunApiUrl}/api/v1/robots/${payload.robotId}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload.inputData)
      });
      
      const data = await response.json();
      return { statusCode: 200, body: JSON.stringify(data) };
    } 
    
    if (action === 'result') {
      const runId = event.queryStringParameters.runId;
      const response = await fetch(`${maxunApiUrl}/api/v1/runs/${runId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`
        }
      });

      const data = await response.json();
      return { statusCode: 200, body: JSON.stringify(data) };
    }

    return { statusCode: 404, body: "Not Found" };

  } catch (error) {
    console.error("Maxun Proxy Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error", details: error.message }) };
  }
};
