import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { createClient } from 'redis';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const redis = createClient({ 
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD
});

redis.on('error', (err) => console.error('[Scheduler] Redis Error', err));

async function startScheduler() {
    await redis.connect();
    console.log("[Scheduler] Connected to Redis.");

    const configPath = path.join(__dirname, 'marketing_schedules.json');
    if (!fs.existsSync(configPath)) {
        console.error(`[Scheduler] Configuration file missing: ${configPath}`);
        process.exit(1);
    }

    const schedules = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    console.log(`[Scheduler] Loaded ${schedules.length} individual marketing schedules.`);

    for (const app of schedules) {
        if (!cron.validate(app.cron)) {
            console.error(`[Scheduler] Invalid cron expression for ${app.brand}: ${app.cron}`);
            continue;
        }

        console.log(`[Scheduler] Scheduling [${app.brand}] with CRON: ${app.cron} (Timezone: America/Los_Angeles)`);
        
        cron.schedule(app.cron, async () => {
            console.log(`[Scheduler] ⏰ CRON TRIGGERED for ${app.brand}! Injecting payload into queue...`);
            
            const payload = {
                campaign_id: `cron_${Date.now()}_${Math.random().toString(36).substring(7)}`,
                brand: app.brand,
                campaignType: 'browser_agent',
                inputValue: app.url,
                assassination_mode: app.assassination_mode || false,
                competitor_url: app.competitor_url || null,
                goal: app.goal || 'marketing',
                status: 'approved_for_publishing', // Instantly approved for autonomous processing
                created_at: new Date().toISOString(),
                source: 'autonomous_cron_scheduler'
            };

            try {
                // Save to Redis queue
                await redis.set(`queue:${payload.campaign_id}`, JSON.stringify(payload));
                console.log(`[Scheduler] Successfully queued automated campaign for ${app.brand}.`);
            } catch (err) {
                console.error(`[Scheduler] Failed to queue campaign for ${app.brand}:`, err);
            }
        }, {
            scheduled: true,
            timezone: "America/Los_Angeles"
        });
    }
}

startScheduler();
