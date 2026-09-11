import { pipeline } from '@xenova/transformers';

let textClassifier: any = null;
let imageClassifier: any = null;

/**
 * Checks if a given text string contains toxic content.
 * Uses Xenova/toxic-bert which outputs probabilities for toxic labels.
 */
export async function checkToxicity(text: string): Promise<{ isToxic: boolean, score: number, reason?: string }> {
  try {
    if (!textClassifier) {
      // Initialize the pipeline on first use
      textClassifier = await pipeline('text-classification', 'Xenova/toxic-bert', {
        quantized: true // Use quantized model for speed
      });
    }
    
    // toxic-bert returns an array of label probabilities
    // labels include: toxic, severe_toxic, obscene, threat, insult, identity_hate
    const results = await textClassifier(text, { topk: 5 });
    
    let maxToxicScore = 0;
    let topReason = '';

    for (const res of results) {
      // Any score above 0.8 on a toxic label is considered toxic
      if (res.score > maxToxicScore) {
        maxToxicScore = res.score;
        topReason = res.label;
      }
    }

    const isToxic = maxToxicScore > 0.8;
    return {
      isToxic,
      score: maxToxicScore,
      reason: isToxic ? topReason : undefined
    };
  } catch (error) {
    console.error('Error in text toxicity check:', error);
    // Fail open if AI service fails, to not block user flow entirely
    return { isToxic: false, score: 0 };
  }
}

/**
 * Checks if an image URL contains NSFW content.
 * Uses a zero-shot image classifier or dedicated NSFW model.
 */
export async function checkNSFWImage(imageUrl: string): Promise<{ isNSFW: boolean, score: number }> {
  try {
    if (!imageClassifier) {
      // Using a fast quantized model for image classification
      imageClassifier = await pipeline('image-classification', 'Xenova/vit-base-nsfw-detector', {
        quantized: true
      });
    }

    const results = await imageClassifier(imageUrl);
    
    // Xenova/vit-base-nsfw-detector returns labels 'nsfw' and 'normal'
    let nsfwScore = 0;
    for (const res of results) {
      if (res.label === 'nsfw' || res.label === 'porn' || res.label === 'hentai') {
        nsfwScore += res.score;
      }
    }

    return {
      isNSFW: nsfwScore > 0.7,
      score: nsfwScore
    };
  } catch (error) {
    console.error('Error in NSFW image check:', error);
    return { isNSFW: false, score: 0 };
  }
}
