import { supabase } from '@/lib/supabase';

export interface CrawlResponse {
    success: boolean;
    data: any;
    error?: string;
}

export const executeAISearch = async (
    url: string, 
    query?: string, 
    onProgress?: (msg: string) => void
): Promise<CrawlResponse> => {
    try {
        onProgress?.('Initiating crawl...');
        let { data, error } = await supabase.functions.invoke('deep-research', {
            body: { url, query }
        });

        if (error) {
            console.error("Deep Research API Error:", error);
            throw error;
        }

        // If it returned a task_id, we need to poll
        if (data.data?.task_id && !data.data?.markdown) {
            const taskId = data.data.task_id;
            onProgress?.('Crawling in progress. Polling for results...');
            
            let isCompleted = false;
            let attempts = 0;
            const maxAttempts = 30; // 1 minute max polling

            while (!isCompleted && attempts < maxAttempts) {
                await new Promise(r => setTimeout(r, 2000));
                attempts++;

                const pollRes = await supabase.functions.invoke('deep-research', {
                    body: { task_id: taskId }
                });

                if (pollRes.error) {
                    throw pollRes.error;
                }

                const status = pollRes.data?.data?.status;
                if (status === 'completed' || status === 'success') {
                    isCompleted = true;
                    data = pollRes.data; // Final result
                } else if (status === 'failed' || status === 'error') {
                    throw new Error("Crawl failed on the server.");
                }
                // If status is 'processing' or similar, we continue polling
            }

            if (!isCompleted) {
                throw new Error("Crawl polling timed out.");
            }
        }

        return data;
    } catch (e: any) {
        console.error("Deep Research Service Exception:", e);
        throw e;
    }
};
