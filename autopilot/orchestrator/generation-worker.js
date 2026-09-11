import * as dotenv from 'dotenv';
dotenv.config();

import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const API_BASE = 'http://localhost:8080';

async function generateAndQueueCampaign(schedule) {
    const { brand_id, prompt_template, platforms } = schedule;
    
    console.log(`[GenWorker] Triggered generation for brand: ${brand_id}`);
    
    try {
        // 1. Call Gemini via our proxy
        console.log(`[GenWorker] Requesting Gemini generation...`);
        const geminiRes = await fetch(`${API_BASE}/proxy/gemini`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'gemini-2.5-flash',
                prompt: prompt_template,
                systemPrompt: `You are a viral social media manager for the brand '${brand_id}'. Generate high-converting copy formatted for ${platforms.join(', ')}. Keep it engaging, natively formatted for each platform, and use appropriate hashtags. Do NOT output markdown code blocks or conversational filler.`
            })
        });

        if (!geminiRes.ok) {
            throw new Error(`Gemini proxy failed with status: ${geminiRes.status}`);
        }

        const data = await geminiRes.json();
        const generatedCopy = data.text;
        
        console.log(`[GenWorker] Received generated copy for ${brand_id}. Length: ${generatedCopy.length}`);

        // 2. Format queue payload
        const campaignId = `auto_${brand_id}_${Date.now()}`;
        
        const targetAccounts = platforms.map(p => `${p}:@auto`);
        
        let mediaUrl = null;
        try {
            console.log(`[GenWorker] Requesting Kling-3.0 Media Generation for ${brand_id}...`);
            const mediaRes = await fetch(`${API_BASE}/api/media/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Use the template as the prompt for the video, or Gemini's output
                body: JSON.stringify({ model: 'kling-3.0', prompt: prompt_template }) 
            });
            if (mediaRes.ok) {
                const mediaData = await mediaRes.json();
                mediaUrl = mediaData.url;
                console.log(`[GenWorker] Media generated successfully: ${mediaUrl}`);
            } else {
                console.warn(`[GenWorker] Media API returned non-OK status: ${mediaRes.status}`);
            }
        } catch (mediaErr) {
            console.error(`[GenWorker] Failed to generate media for ${brand_id}:`, mediaErr);
        }

        const payload = {
            campaign_id: campaignId,
            brand: brand_id,
            brand_id: brand_id,
            status: 'approved_for_publishing', // FULL AUTONOMY ENABLED
            generated_copy: generatedCopy,
            media_url: mediaUrl,
            targetAccounts: targetAccounts,
            platforms: platforms,
            created_at: new Date().toISOString(),
            source: 'autonomous_generation_loop'
        };

        // 3. Queue it up
        console.log(`[GenWorker] Pushing to queue as staged...`);
        const queueRes = await fetch(`${API_BASE}/queue/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!queueRes.ok) {
            throw new Error(`Failed to queue item. Status: ${queueRes.status}`);
        }

        console.log(`[GenWorker] Successfully staged autonomous campaign: ${campaignId}`);

    } catch (err) {
        console.error(`[GenWorker] Failed to generate for ${brand_id}:`, err);
    }
}

async function startWorker() {
    console.log("[GenWorker] Starting Autonomous Generation Engine...");

    const schedulesPath = path.join(__dirname, 'marketing_schedules.json');
    if (!fs.existsSync(schedulesPath)) {
        console.error("[GenWorker] No marketing_schedules.json found. Exiting.");
        process.exit(1);
    }

    const schedules = JSON.parse(fs.readFileSync(schedulesPath, 'utf8'));
    let activeJobs = 0;

    for (const schedule of schedules) {
        const { brand_id, generate_cron } = schedule;
        
        if (generate_cron && cron.validate(generate_cron)) {
            console.log(`[GenWorker] Scheduling generation tasks for brand '${brand_id}' on cron '${generate_cron}'`);
            
            cron.schedule(generate_cron, async () => {
                await generateAndQueueCampaign(schedule);
            });
            activeJobs++;
        } else {
            console.error(`[GenWorker] Invalid or missing generate_cron expression for ${brand_id}: ${generate_cron}`);
        }
    }

    console.log(`[GenWorker] Initialization complete. ${activeJobs} generation schedules actively monitoring.`);
}

startWorker().catch(err => {
    console.error("[GenWorker] Fatal startup error:", err);
    process.exit(1);
});
