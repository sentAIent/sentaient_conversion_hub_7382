// Real LLM parsing using Gemini (or rich fallback)
export async function parseScenePrompt(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  const fallbackLogic = (p) => {
    const lowerPrompt = p.toLowerCase();
    const result = {
      location: 'Custom World',
      speed: lowerPrompt.includes('driv') || lowerPrompt.includes('fast') ? 'fast' : 'slow',
      audioParams: { wind: 0.1, birds: 0.0, water: 0.0, traffic: 0.0, rain: 0.0 },
      visualMode: lowerPrompt.includes('3d') || lowerPrompt.includes('abstract') || lowerPrompt.includes('cyber') ? '3d' : 'video',
      videoId: 'Q-PQ2AcieH8' // Default Paris driving
    };
    
    if (lowerPrompt.includes('birds')) result.audioParams.birds = 0.9;
    if (lowerPrompt.includes('rain')) result.audioParams.rain = 0.8;
    if (lowerPrompt.includes('city')) result.audioParams.traffic = 0.6;
    if (lowerPrompt.includes('wind')) result.audioParams.wind = 0.7;
    
    if (lowerPrompt.includes('new york') || lowerPrompt.includes('nyc')) result.videoId = 'lZ_2382q8cM';
    if (lowerPrompt.includes('japan') || lowerPrompt.includes('kyoto') || lowerPrompt.includes('tokyo')) result.videoId = 'F0B6bU-h_0A';
    if (lowerPrompt.includes('train') || lowerPrompt.includes('snow')) result.videoId = 'O2Wb-J9QdDU';
    
    return result;
  };

  if (!apiKey) {
    return new Promise(resolve => setTimeout(() => resolve(fallbackLogic(prompt)), 1000));
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an environment simulator. Parse the user's prompt into a JSON object matching this schema:
{
  "location": "string (name of place)",
  "speed": "slow" | "fast",
  "visualMode": "video" | "3d",
  "videoId": "string (a real YouTube video ID that fits the prompt, e.g., 'Q-PQ2AcieH8' for Paris drive, 'lZ_2382q8cM' for NYC rain, 'F0B6bU-h_0A' for Kyoto walk, 'O2Wb-J9QdDU' for Swiss Alps train)",
  "audioParams": { "wind": float 0-1, "birds": float 0-1, "water": float 0-1, "traffic": float 0-1, "rain": float 0-1 }
}
Return ONLY valid JSON.
Prompt: "${prompt}"`
          }]
        }]
      })
    });

    const data = await response.json();
    const jsonStr = data.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("LLM parsing failed, falling back to local heuristic", error);
    return fallbackLogic(prompt);
  }
}
