import fs from 'fs';
import path from 'path';
import { analyzeDocument } from '../src/services/analysisService';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace these with actual fetched text or API calls if necessary
const TOS_SOURCES = {
  instagram: "https://help.instagram.com/581066165581870",
  facebook: "https://www.facebook.com/legal/terms",
  tiktok: "https://www.tiktok.com/legal/page/us/terms-of-service/en",
  x: "https://twitter.com/en/tos",
  snapchat: "https://snap.com/en-US/terms"
};

// We will use empty or stub texts for the initial creation if we can't scrape them.
// In a real production scenario, you might want to manually download the TOS texts 
// and place them in a folder, then have this script read those text files.

const getTosText = async (platform: string) => {
    // For now, returning a mock summary to ensure the API succeeds.
    // Replace this with actual file reading or web scraping logic.
    return `Terms of Service for ${platform}. By using this service, you agree to grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use any IP content that you post on or in connection with ${platform}. We can terminate your account at any time for any reason. You waive your right to a class action lawsuit and agree to binding arbitration.`;
};

async function generateDemos() {
    console.log("Starting demo generation...");
    
    // Polyfill AbortController for node if needed, though Node 18+ has it
    const abortController = new AbortController();

    for (const [id, url] of Object.entries(TOS_SOURCES)) {
        console.log(`Processing ${id}...`);
        
        try {
            const documentText = await getTosText(id);
            const parties = [{ id: 1, name: id, role: 'Provider', domicile: 'US' }, { id: 2, name: 'User', role: 'User', domicile: 'World' }];
            
            // Standard Analysis
            console.log(`  Running standard analysis for ${id}...`);
            const standardResult = await analyzeDocument(
                documentText,
                'User',
                parties,
                () => {}, // progress callback
                () => {}, // recs callback
                'standard',
                'tos',
                abortController.signal
            );
            
            // Roast Mode Analysis (Simulated by changing perspective or depth, or assuming analyzeDocument handles it)
            // Wait, analysisService doesn't have a direct "roast mode" parameter. Roast mode is usually a UI toggle 
            // that changes how things are displayed, or it might be a different prompt.
            // Let's run a 'deep' analysis for roast mode to give it more content, or we can just run it once.
            console.log(`  Running roast mode analysis for ${id}...`);
            const roastResult = await analyzeDocument(
                documentText,
                'User',
                parties,
                () => {},
                () => {},
                'deep', // using deep for roast to get more critical points
                'tos',
                abortController.signal
            );
            
            const demoData = {
                id,
                name: `${id.charAt(0).toUpperCase() + id.slice(1)} TOS`,
                documentText,
                recommendations: standardResult.recommendations,
                roastRecommendations: roastResult.recommendations, // store separately if needed
                score: standardResult.score,
                swotData: standardResult.swot
            };
            
            const outputPath = path.join(__dirname, `../src/data/demos/${id}.json`);
            fs.writeFileSync(outputPath, JSON.stringify(demoData, null, 2));
            console.log(`  Saved ${id}.json successfully.`);
            
        } catch (err) {
            console.error(`Failed to process ${id}:`, err);
        }
    }
    
    console.log("Finished generating demos!");
}

generateDemos();
