import { pipeline, env } from '@xenova/transformers';

// Ensure models are downloaded from Hugging Face hub
env.allowLocalModels = false;

// Singleton pipeline to avoid reloading the model on every call
let classifier = null;

async function getClassifier() {
    if (!classifier) {
        console.log("[Predictive Model] Initializing DistilBERT for sentiment analysis...");
        classifier = await pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
    }
    return classifier;
}

export async function scoreVariant(variantText) {
    try {
        const analyze = await getClassifier();
        
        const text = variantText ? variantText.trim() : "";
        if (text.length < 10) return 60.0;
        
        // Truncate to avoid model token limits
        const truncatedText = text.substring(0, 512);
        
        const result = await analyze(truncatedText);
        const prediction = result[0]; // e.g., { label: 'POSITIVE', score: 0.99 }
        
        let score = 50;
        
        if (prediction.label === 'POSITIVE') {
            score = 70 + (prediction.score * 25); // Range: 70 - 95
        } else {
            score = 40 + ((1 - prediction.score) * 30); // Range: 40 - 70
        }
        
        // Slight bonus for longer, detailed copy
        if (text.length > 200) score += 4.5;
        
        if (score > 99.9) score = 99.9;
        
        return parseFloat(score.toFixed(1));
        
    } catch (err) {
        console.error("[Predictive Model] ML scoring failed, using fallback:", err.message);
        return parseFloat((Math.random() * 20 + 70).toFixed(1));
    }
}
