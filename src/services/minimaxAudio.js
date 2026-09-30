// src/services/minimaxAudio.js

/**
 * Service to interact with the MiniMax Audio/Music generation API.
 * Uses environment variable VITE_MINIMAX_API_KEY for configuration.
 */

const API_KEY = import.meta.env.VITE_MINIMAX_API_KEY;
const GROUP_ID = import.meta.env.VITE_MINIMAX_GROUP_ID; // Often required by MiniMax API

export async function generateMusic(prompt) {
  if (!API_KEY) {
    console.warn("MiniMax API Key not found (VITE_MINIMAX_API_KEY). Operating in mock mode.");
    
    // Simulate network latency for the flawless experience
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Return a royalty-free ambient lofi track as a fallback so the app remains fully functional
    // In production with a key, this would be the URL to the MiniMax generated audio blob
    return { 
      success: true, 
      mocked: true, 
      audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_b2824dafa3.mp3?filename=lofi-study-112191.mp3",
      message: "Mock track loaded. Set VITE_MINIMAX_API_KEY for real generative music." 
    };
  }

  try {
    // Official MiniMax T2A (Text-to-Audio / Music) Endpoint
    // Note: MiniMax requires a group_id in the URL for most v1 endpoints
    const baseUrl = `https://api.minimax.chat/v1/t2a_v2?GroupId=${GROUP_ID || ''}`;
    
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "music-01", // The MiniMax music generation model
        text: prompt,
        // Optional parameters supported by MiniMax
        voice_setting: {
          pitch: 0,
          speed: 1.0,
          vol: 1.0
        },
        audio_setting: {
          format: "mp3",
          sample_rate: 44100
        }
      })
    });

    if (!response.ok) {
      throw new Error(`MiniMax API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // MiniMax returns audio in base64 string under data.data.audio
    if (data && data.data && data.data.audio) {
      const audioUrl = `data:audio/mp3;base64,${data.data.audio}`;
      return { success: true, audioUrl };
    } else {
      throw new Error("Invalid response format from MiniMax");
    }

  } catch (error) {
    console.error("Failed to generate music from MiniMax:", error);
    return { success: false, error: error.message };
  }
}
