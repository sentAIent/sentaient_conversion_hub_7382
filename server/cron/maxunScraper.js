const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '../.env' }); // Adjust path based on execution dir

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || 'http://localhost:54321',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_role_key'
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

/**
 * Mocks the Maxun API response. 
 * In production, you would fetch this from your self-hosted Maxun instance or Maxun Cloud.
 */
async function fetchMaxunData() {
    console.log('[Maxun Scraper] Fetching data from Maxun...');
    
    // Simulating a Maxun scrape of real-world space news (e.g. from space.com or NASA)
    return [
        {
            title: "NASA's Webb Space Telescope Discovers New Exoplanet with Water Vapor",
            description: "Scientists using the James Webb Space Telescope have found compelling evidence of water vapor in the atmosphere of a distant exoplanet, K2-18b, located in the habitable zone of its star.",
            url: "https://www.nasa.gov/news/webb-exoplanet"
        },
        {
            title: "SpaceX Starship Completes Successful Orbital Test Flight",
            description: "The massive Starship rocket completed its first fully successful orbital flight, marking a major milestone for interplanetary travel.",
            url: "https://www.spacex.com/news/starship"
        }
    ];
}

/**
 * Uses Gemini to rewrite real-world news into Interstellar Universe Lore.
 */
async function rewriteLore(realWorldNews) {
    console.log('[Maxun Scraper] Rewriting lore with Gemini...');
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
You are the lead narrative designer for the game "Interstellar".
Take the following real-world space news and rewrite it as an in-universe "Galactic News Feed" article. 
Change names of organizations (e.g. NASA -> United Earth Federation), spacecraft, and locations to fit a distant-future sci-fi universe.
Keep it dramatic and engaging.

Real World News:
Title: ${realWorldNews.title}
Summary: ${realWorldNews.description}

Format your response as a JSON object:
{
    "headline": "in-universe headline",
    "content": "in-universe article content"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(text);
}

/**
 * Main execution function
 */
async function runScraper() {
    try {
        console.log('[Maxun Scraper] Job Started');
        
        const articles = await fetchMaxunData();
        
        for (const article of articles) {
            const lore = await rewriteLore(article);
            
            console.log(`[Maxun Scraper] Inserting: ${lore.headline}`);
            
            const { error } = await supabase
                .from('galactic_news_feed')
                .insert([{
                    headline: lore.headline,
                    content: lore.content,
                    source_url: article.url
                }]);
                
            if (error) {
                console.error('[Maxun Scraper] Supabase Insert Error:', error);
            }
        }
        
        console.log('[Maxun Scraper] Job Completed Successfully');
        process.exit(0);
    } catch (err) {
        console.error('[Maxun Scraper] Fatal Error:', err);
        process.exit(1);
    }
}

// Execute the script
runScraper();
