const APP_URL = "http://localhost:4173/";

function loadTextIntoFrame(text) {
    const frame = document.getElementById('app-frame');
    frame.src = `${APP_URL}?mode=extension&text=${encodeURIComponent(text)}`;
}

// 1. Try to get text from storage (if context menu was used on a normal site)
chrome.storage.local.get(['selectedText'], async (result) => {
    if (result.selectedText) {
        loadTextIntoFrame(result.selectedText);
        chrome.storage.local.remove('selectedText');
    } else {
        // 2. Try to grab the current selection from the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (!activeTab || !activeTab.id) return;
            
            // MAGIC: If it's a Google Doc, use the Export API to grab the entire text securely
            if (activeTab.url && activeTab.url.includes("docs.google.com/document/d/")) {
                const docIdMatch = activeTab.url.match(/\/d\/([a-zA-Z0-9-_]+)/);
                if (docIdMatch && docIdMatch[1]) {
                    const docId = docIdMatch[1];
                    
                    chrome.scripting.executeScript({
                        target: { tabId: activeTab.id },
                        args: [docId],
                        func: async (id) => {
                            try {
                                // The browser will auto-attach the user's active Google session cookies!
                                const response = await fetch(`https://docs.google.com/document/export?format=txt&id=${id}`);
                                if (response.ok) {
                                    return await response.text();
                                }
                                return null;
                            } catch (e) {
                                return null;
                            }
                        }
                    }, (results) => {
                        if (chrome.runtime.lastError || !results || !results[0].result) {
                            const frame = document.getElementById('app-frame');
                            frame.src = `${APP_URL}?mode=extension`;
                            return;
                        }
                        const text = results[0].result;
                        loadTextIntoFrame(text);
                    });
                    return; // Stop here, don't run the normal fallback
                }
            }

            // Normal fallback for non-Google Docs sites (grabs highlighted text)
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                func: () => window.getSelection().toString()
            }, (results) => {
                if (chrome.runtime.lastError || !results || !results[0].result) {
                    const frame = document.getElementById('app-frame');
                    frame.src = `${APP_URL}?mode=extension`;
                    return;
                }
                const text = results[0].result;
                if (text.trim().length > 0) {
                    loadTextIntoFrame(text);
                } else {
                    const frame = document.getElementById('app-frame');
                    frame.src = `${APP_URL}?mode=extension`;
                }
            });
        });
    }
});

// Listen for subsequent changes if the panel is already open and they use the context menu
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.selectedText && changes.selectedText.newValue) {
        loadTextIntoFrame(changes.selectedText.newValue);
        chrome.storage.local.remove('selectedText');
    }
});
