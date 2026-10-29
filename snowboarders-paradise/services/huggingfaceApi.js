// Hugging Face Inference API Service (Premium Features)

const HF_API_URL = "https://api-inference.huggingface.co/models";

/**
 * Validates if the user is a Premium user (e.g. they provided an API token or we verify their status)
 */
export const isPremiumUser = (token) => {
  return token && token.startsWith('hf_');
};

/**
 * Generate a custom decal texture using Stable Diffusion
 * Returns a Blob URL for the generated image.
 */
export async function generateDecal(prompt, token) {
  if (!isPremiumUser(token)) throw new Error("Premium feature only. Please provide a valid HF token.");
  
  const model = "stabilityai/stable-diffusion-xl-base-1.0"; // or any smaller SD model
  const response = await fetch(`${HF_API_URL}/${model}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "POST",
    body: JSON.stringify({ inputs: prompt }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to generate decal: ${response.statusText}`);
  }
  
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

/**
 * Generate a dynamic quest using an LLM (e.g. Mixtral or Zephyr)
 */
export async function generateDynamicQuest(token) {
  if (!isPremiumUser(token)) throw new Error("Premium feature only. Please provide a valid HF token.");
  
  const model = "mistralai/Mixtral-8x7B-Instruct-v0.1";
  
  const prompt = `[INST] You are a quest generator for an extreme snowboarding game. Generate 1 crazy bounty challenge for the player to complete. Output ONLY valid JSON in this format: {"title": "Quest Title", "description": "Quest Description", "reward": 5000} [/INST]`;
  
  const response = await fetch(`${HF_API_URL}/${model}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 150, temperature: 0.7 }
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to generate quest: ${response.statusText}`);
  }
  
  const result = await response.json();
  try {
      // Parse out the JSON from the LLM output
      const generatedText = result[0].generated_text.replace(prompt, '').trim();
      const quest = JSON.parse(generatedText);
      return quest;
  } catch (e) {
      console.error("Failed to parse LLM JSON output", e, result);
      return { title: "Error", description: "Failed to load quest", reward: 0 };
  }
}
