import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom React Hook to manage the Web Worker running Transformers.js.
 * This prevents the heavy AI calculations from freezing the UI.
 */
export const useAIEngine = () => {
    const [isReady, setIsReady] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0); // 0 to 100 for model downloading
    const [downloadStatus, setDownloadStatus] = useState('');
    
    // We use a ref for the worker so it persists across renders without causing re-renders
    const worker = useRef(null);
    
    // Keep track of pending requests by a unique ID
    const pendingRequests = useRef({});

    useEffect(() => {
        // Initialize the Web Worker using Vite's ?worker syntax
        if (!worker.current) {
            // Web Workers in Vite are imported using special syntax or URL constructor
            worker.current = new Worker(new URL('../workers/aiWorker.js', import.meta.url), {
                type: 'module'
            });

            // Listen for messages from the worker
            worker.current.addEventListener('message', (event) => {
                const { id, status, message, data, result, error } = event.data;

                switch (status) {
                    case 'loading':
                    case 'processing':
                        setDownloadStatus(message);
                        break;
                    case 'progress':
                        // data contains properties like: { name, file, progress: number, status }
                        if (data && data.status === 'progress') {
                            setDownloadStatus(`Downloading AI Core: ${Math.round(data.progress)}%`);
                            setProgress(data.progress);
                        } else if (data && data.status === 'ready') {
                            setIsReady(true);
                            setDownloadStatus('AI Core Online');
                        }
                        break;
                    case 'complete':
                        setIsGenerating(false);
                        if (id && pendingRequests.current[id]) {
                            pendingRequests.current[id].resolve(result);
                            delete pendingRequests.current[id];
                        }
                        break;
                    case 'error':
                        setIsGenerating(false);
                        console.error('AI Engine Error:', error);
                        if (id && pendingRequests.current[id]) {
                            pendingRequests.current[id].reject(new Error(error));
                            delete pendingRequests.current[id];
                        }
                        break;
                    default:
                        break;
                }
            });
        }

        return () => {
            if (worker.current) {
                worker.current.terminate();
                worker.current = null;
            }
        };
    }, []);

    const generateText = useCallback(async (prompt) => {
        if (!worker.current) throw new Error("AI Worker not initialized.");
        
        setIsGenerating(true);
        const requestId = Date.now().toString(); // Simple unique ID
        
        return new Promise((resolve, reject) => {
            pendingRequests.current[requestId] = { resolve, reject };
            
            worker.current.postMessage({
                id: requestId,
                type: 'GENERATE',
                prompt: prompt
            });
        });
    }, []);

    return {
        isReady,
        isGenerating,
        progress,
        downloadStatus,
        generateText
    };
};
