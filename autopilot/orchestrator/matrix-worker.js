import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from 'redis';
import { HypitBridge } from './tools/hypit-bridge.js';

/**
 * SentAIent AutoPilot - Matrix Worker
 * 
 * Listens to the `queue:campaign_matrix` Redis queue. When a user requests
 * a viral campaign matrix (via Hypit), this worker pulls the job, triggers
 * the `HypitBridge` to generate N variants, and pushes the generated assets 
 * into the user's dashboard payload/queue.
 */
class MatrixWorker {
    constructor() {
        this.redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
        this.client = createClient({ url: this.redisUrl });
        this.hypit = new HypitBridge();
    }

    async start() {
        await this.client.connect();
        console.log('[MatrixWorker] Listening for Hypit Viral Matrix generation requests...');
        
        while (true) {
            try {
                // Block until a matrix job arrives
                const payload = await this.client.blPop('queue:campaign_matrix', 0);
                if (payload) {
                    const jobData = JSON.parse(payload.element);
                    await this.processMatrixJob(jobData);
                }
            } catch (error) {
                console.error('[MatrixWorker] Polling error:', error);
                await new Promise(res => setTimeout(res, 5000));
            }
        }
    }

    async processMatrixJob(jobData) {
        console.log(`[MatrixWorker] Picked up Matrix Job: ${jobData.jobId}`);
        console.log(`[MatrixWorker] Source: ${jobData.sourceUrl} | Variants: ${jobData.numVariants}`);

        try {
            // Trigger the 100M views pipeline
            const finalUrls = await this.hypit.generateViralMatrix(
                jobData.sourceUrl, 
                jobData.referenceImage, 
                jobData.numVariants
            );

            console.log(`[MatrixWorker] Job ${jobData.jobId} completed successfully. ${finalUrls.length} variants generated.`);
            
            // Push the generated URLs back to the user's dashboard queue (for the UI to pick up)
            await this.client.rPush(`user:${jobData.userId}:completed_campaigns`, JSON.stringify({
                jobId: jobData.jobId,
                variants: finalUrls,
                status: 'READY_TO_SCHEDULE'
            }));

        } catch (error) {
            console.error(`[MatrixWorker] Job ${jobData.jobId} failed:`, error.message);
            // Push error state
            await this.client.rPush(`user:${jobData.userId}:completed_campaigns`, JSON.stringify({
                jobId: jobData.jobId,
                status: 'FAILED',
                error: error.message
            }));
        }
    }
}

// Start the worker if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const worker = new MatrixWorker();
    worker.start();
}
