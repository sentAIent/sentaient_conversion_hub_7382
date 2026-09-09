import { publishToTikTok } from './social-publishers.js';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function runTest() {
    console.log('🧪 Starting TikTok API Publisher Test...');
    
    // A standard 9:16 sample video hosted publicly (TikTok requires a public URL for PULL_FROM_URL)
    const testVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
    const testCaption = `Testing SentAIent AutoPilot API Integration 🚀 #test ${Date.now()}`;
    const handle = 'test_account'; // The handle doesn't strictly matter if we fallback to .env

    console.log(`\n📤 Sending payload to TikTok Direct Post API:`);
    console.log(`   - Video: ${testVideoUrl}`);
    console.log(`   - Caption: ${testCaption}`);

    try {
        const result = await publishToTikTok(testVideoUrl, testCaption, handle);
        console.log('\n✅ TikTok API Response:');
        console.log(JSON.stringify(result, null, 2));

        if (result.success && result.status !== 'simulated_success') {
            console.log('\n🎉 SUCCESS! The video has been successfully pushed to the TikTok inbox processing queue.');
        } else if (result.status === 'simulated_success') {
            console.log('\n⚠️ SIMULATED SUCCESS: The credentials in .env were not found or not loaded.');
        }
    } catch (err) {
        console.error('\n❌ ERROR publishing to TikTok:');
        console.error(err);
    }
    
    process.exit(0);
}

runTest();
