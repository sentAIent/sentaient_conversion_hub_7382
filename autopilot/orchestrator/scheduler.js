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

let activeCronJobs = [];

function loadAndSchedule(configPath) {
    try {
        // Destroy existing jobs to prevent duplicates during hot-reload
        if (activeCronJobs.length > 0) {
            console.log(`[Scheduler] File change detected! Destroying ${activeCronJobs.length} active jobs...`);
            for (const job of activeCronJobs) {
                job.stop();
            }
            activeCronJobs = [];
        }

        const schedules = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        console.log(`[Scheduler] Loaded ${schedules.length} individual marketing schedules.`);

        for (const app of schedules) {
            const cronExp = app.generate_cron;
            if (!cronExp || !cron.validate(cronExp)) {
                console.error(`[Scheduler] Invalid cron expression for ${app.brand_id}: ${cronExp}`);
                continue;
            }

            console.log(`[Scheduler] Scheduling [${app.brand_id}] with CRON: ${cronExp} (Timezone: America/Los_Angeles)`);
            
            const job = cron.schedule(cronExp, async () => {
                console.log(`[Scheduler] ⏰ CRON TRIGGERED for ${app.brand_id}! Injecting payload into queue...`);
                
                const payload = {
                    campaign_id: `cron_${Date.now()}_${Math.random().toString(36).substring(7)}`,
                    brand: app.brand_id,
                    prompt_template: app.prompt_template,
                    platformAccounts: app.platforms ? app.platforms.reduce((acc, p) => ({ ...acc, [p]: [`@${app.brand_id}_Main`] }), {}) : {},
                    status: 'approved_for_publishing',
                    created_at: new Date().toISOString(),
                    source: 'autonomous_cron_scheduler'
                };

                try {
                    await redis.set(`queue:${payload.campaign_id}`, JSON.stringify(payload));
                    console.log(`[Scheduler] Successfully queued automated campaign for ${app.brand_id}.`);
                } catch (err) {
                    console.error(`[Scheduler] Failed to queue campaign for ${app.brand_id}:`, err);
                }
            }, {
                scheduled: true,
                timezone: "America/Los_Angeles"
            });

            activeCronJobs.push(job);
        }
    } catch (e) {
        console.error("[Scheduler] Error parsing marketing_schedules.json during reload:", e.message);
    }
}

async function startScheduler() {
    await redis.connect();
    console.log("[Scheduler] Connected to Redis.");

    const configPath = path.join(__dirname, 'marketing_schedules.json');
    if (!fs.existsSync(configPath)) {
        console.error(`[Scheduler] Configuration file missing: ${configPath}`);
        process.exit(1);
    }

    // Initial Load
    loadAndSchedule(configPath);

    // Watch for JSON changes (Hot Reloading)
    fs.watchFile(configPath, { interval: 1000 }, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            loadAndSchedule(configPath);
        }
    });
}

startScheduler();
