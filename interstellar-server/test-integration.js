import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runTests() {
    console.log("Starting Database Integration Tests...");
    
    // 1. Test Supabase Database Access (News Feed)
    try {
        const { data, error } = await supabase
            .from('galactic_news_feed')
            .select('*')
            .limit(1);
            
        if (error) {
            console.error("❌ Failed to query galactic_news_feed table:", error.message);
            // Ignore error if table just doesn't exist yet, we only care about realtime mostly
        } else {
            console.log("✅ Successfully queried galactic_news_feed table. Rows:", data.length);
        }
    } catch(e) {
        console.error("❌ Exception querying DB:", e);
    }

    // 2. Test Supabase Realtime Channels
    console.log("Testing Realtime Channels...");
    const channel = supabase.channel('room:global-space-test');
    
    let messageReceived = false;
    
    channel.on('broadcast', { event: 'test_sync' }, (payload) => {
        console.log("✅ Received broadcast on channel:", payload);
        messageReceived = true;
    });

    channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
            console.log("✅ Subscribed to Realtime channel room:global-space-test");
            
            // Send a test broadcast
            const res = await channel.send({
                type: 'broadcast',
                event: 'test_sync',
                payload: { test: 'hello world' }
            });
            console.log("Sent broadcast. Result:", res);
            
            // Wait a moment for receipt
            setTimeout(() => {
                if (messageReceived) {
                    console.log("✅ Realtime broadcast loopback successful.");
                    process.exit(0);
                } else {
                    console.error("❌ Realtime broadcast was sent but not received back.");
                    process.exit(1);
                }
            }, 3000);
        } else {
            console.error("❌ Failed to subscribe to channel. Status:", status);
        }
    });
}

runTests();
