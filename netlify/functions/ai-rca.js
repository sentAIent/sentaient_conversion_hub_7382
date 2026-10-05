exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "Server misconfiguration: Missing Gemini API Key" }) 
    };
  }

  try {
    const { errorTraceback } = JSON.parse(event.body);

    if (!errorTraceback) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing errorTraceback in payload" }) };
    }

    const prompt = `You are an expert Site Reliability Engineer (SRE). Analyze the following React stack trace and production error log.
Provide a JSON response with two keys:
1. "root_cause": A brief 2-sentence explanation of what went wrong.
2. "remediation": A 3-step actionable plan to fix the code or infrastructure.

ERROR LOG:
${errorTraceback}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", errText);
      return { statusCode: 502, body: JSON.stringify({ error: "Upstream AI Service Error" }) };
    }

    const data = await response.json();
    
    // Parse the JSON response from Gemini
    let textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textContent) {
       return { statusCode: 500, body: JSON.stringify({ error: "Invalid response format from Gemini" }) };
    }

    // Clean up markdown formatting if Gemini includes it
    textContent = textContent.replace(/```json/gi, '').replace(/```/g, '').trim();

    const rcaResult = JSON.parse(textContent);
    
    return { statusCode: 200, body: JSON.stringify(rcaResult) };

  } catch (error) {
    console.error("AI RCA Proxy Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error", details: error.message }) };
  }
};
