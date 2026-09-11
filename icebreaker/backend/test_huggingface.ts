import { checkToxicity, checkNSFWImage } from './src/services/aiModeration';
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config({ override: true });

async function runTests() {
  console.log("=== Testing Toxicity (Local Model) ===");
  
  console.log("Testing safe text...");
  const safeText = await checkToxicity("Hello, this is a beautiful day!");
  console.log("Safe text result:", safeText);
  
  console.log("Testing toxic text...");
  const toxicText = await checkToxicity("You are a fucking idiot and I hate you!");
  console.log("Toxic text result:", toxicText);
  
  console.log("\n=== Testing Hugging Face API (Premium Text Generation) ===");
  if (!process.env.HF_TOKEN) {
    console.warn("No HF_TOKEN found in environment. Skipping API test.");
  } else {
    const hf = new HfInference(process.env.HF_TOKEN);
    try {
      console.log("Calling Mistral-7B...");
      const out = await hf.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        inputs: `[INST] Enhance and polish the following text, making it engaging and professional. Only output the improved text.\n\nText: this app is rly cool but it crashes smtimes [/INST]`,
        parameters: { max_new_tokens: 150, temperature: 0.7 }
      });
      console.log("Enhanced Text Output:\n", out.generated_text.trim());
    } catch (e) {
      console.error("HF Inference error:", e);
    }
  }
  
  console.log("\nTests completed!");
  process.exit(0);
}

runTests();
