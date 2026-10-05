const LOCAL_TAURI_PORT = 3335;
const API_ENDPOINT = \`http://localhost:\${LOCAL_TAURI_PORT}/api/ingest\`;

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'DATA_EXTRACTED') {
        console.log('[Background] Received extracted data:', message.payload);
        
        // Forward to local Tauri / Sentaient backend
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                source: message.source,
                data: message.payload,
                timestamp: new Date().toISOString()
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('[Background] Successfully forwarded to local Sentaient engine:', data);
            sendResponse({ status: 'success' });
        })
        .catch(err => {
            console.error('[Background] Failed to forward data. Is Sentaient running?', err);
            sendResponse({ status: 'error', reason: err.message });
        });

        // Return true to indicate we wish to send a response asynchronously
        return true;
    }
});

// Optional: Keep track of active tabs to inject programmatically if needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        if (tab.url.includes('instagram.com') || tab.url.includes('twitter.com') || tab.url.includes('x.com')) {
            console.log('[Background] Social media tab detected:', tab.url);
        }
    }
});
