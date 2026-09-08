import { createClient } from 'redis';
import * as dotenv from 'dotenv';

dotenv.config();

const redis = createClient({ 
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD
});

async function main() {
    await redis.connect();
    const keys = await redis.keys("queue:*");
    
    const posts = [];
    for (const key of keys.slice(0, 5)) { // Get 5 recent ones
        const data = await redis.get(key);
        if (data) {
            posts.push(JSON.parse(data));
        }
    }
    
    console.log(JSON.stringify(posts, null, 2));
    process.exit(0);
}

main().catch(console.error);
