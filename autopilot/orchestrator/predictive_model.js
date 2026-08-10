export function scoreVariant(variantText) {
    // A simplified predictive scoring model simulating a lightweight TensorFlow/ML process.
    // In a production environment, this would analyze past conversion rates across 
    // different hook structures, word counts, and aggressive vs passive tones.
    
    let baseScore = Math.floor(Math.random() * 20) + 70; // Base score 70-90
    
    const text = variantText.toLowerCase();
    
    // Penalize if it's too short
    if (text.length < 50) baseScore -= 10;
    
    // Reward power words that traditionally perform well in SaaS / B2B
    const powerWords = ['superior', 'dominate', 'secret', 'growth', 'guarantee', 'exclusive', 'proven'];
    let powerWordCount = 0;
    for (const word of powerWords) {
        if (text.includes(word)) powerWordCount++;
    }
    
    baseScore += (powerWordCount * 2);
    
    // Cap at 99.9 for realism
    if (baseScore > 99) baseScore = 99.9 - Math.random();
    
    return parseFloat(baseScore.toFixed(1));
}
