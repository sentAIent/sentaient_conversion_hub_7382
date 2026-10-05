import axios from 'axios';
import dotenv from 'dotenv';

// Load variables from .env file
dotenv.config();

const url = process.env.SUPABASE_EDGE_FUNCTION_URL;
const key = process.env.SUPABASE_ANON_KEY;

async function ping() {
    if (!url || !key) {
        console.error('[Keep-Alive] Error: Missing SUPABASE_EDGE_FUNCTION_URL or SUPABASE_ANON_KEY in environment.');
        process.exit(1);
    }
    
    console.log(`[Keep-Alive] Sending keep-alive request to: ${url}`);
    
    try {
        const response = await axios.post(url, { ping: true }, {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000 // 10s timeout
        });
        
        console.log(`[Keep-Alive] Success! Server responded with status: ${response.status}`);
    } catch (err) {
        console.error('[Keep-Alive] Ping failed:', err.response ? err.response.data : err.message);
        process.exit(1);
    }
}

ping();
