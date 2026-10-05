/**
 * Content Script for extracting social media telemetry
 * Gracefully extracts DMs, Bookmarks, and timeline data without triggering bot detection.
 */

// Basic utility to detect platform
const getPlatform = () => {
    if (window.location.hostname.includes('twitter.com') || window.location.hostname.includes('x.com')) return 'X';
    if (window.location.hostname.includes('instagram.com')) return 'Instagram';
    if (window.location.hostname.includes('tiktok.com')) return 'TikTok';
    return 'Unknown';
};

const platform = getPlatform();

/**
 * Send payload to background script
 */
function transmitData(payloadType, data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;

    chrome.runtime.sendMessage({
        type: 'DATA_EXTRACTED',
        source: platform,
        payload: {
            type: payloadType,
            content: data,
            url: window.location.href
        }
    }, (response) => {
        if (chrome.runtime.lastError) {
            console.warn('[Content Script] Transmit warning:', chrome.runtime.lastError.message);
        } else {
            console.log(\`[Content Script] Transmitted \${payloadType} data to background.\`);
        }
    });
}

/**
 * Generalized extraction logic (simplified for demonstration)
 * In a real environment, this would use MutationObservers to track DOM changes dynamically
 * rather than simple polling, and map specific CSS selectors for DMs/Bookmarks.
 */
function extractVisibleTextContent() {
    let extractedData = [];
    
    if (platform === 'X') {
        // Extract X posts
        const tweets = document.querySelectorAll('article[data-testid="tweet"]');
        tweets.forEach(tweet => {
            const textElement = tweet.querySelector('div[data-testid="tweetText"]');
            if (textElement) extractedData.push(textElement.innerText);
        });
    } else if (platform === 'Instagram') {
        // Extract IG captions/DMs
        // Selectors are highly volatile, these are generic placeholders
        const messages = document.querySelectorAll('div[dir="auto"]');
        messages.forEach(msg => {
            if (msg.innerText.trim().length > 0) {
                extractedData.push(msg.innerText.trim());
            }
        });
    }

    // Deduplicate and send
    const uniqueData = [...new Set(extractedData)];
    if (uniqueData.length > 0) {
        transmitData('DOM_EXTRACTION', uniqueData);
    }
}

// Throttle extraction to avoid performance hits
let extractInterval;

function startExtraction() {
    console.log(\`[Content Script] Sentaient telemetry active for \${platform}\`);
    
    // Run an extraction every 10 seconds
    extractInterval = setInterval(extractVisibleTextContent, 10000);
    
    // Run one immediately
    setTimeout(extractVisibleTextContent, 2000);
}

// Only start if we are on a known platform
if (platform !== 'Unknown') {
    // Wait for SPA to load
    if (document.readyState === 'complete') {
        startExtraction();
    } else {
        window.addEventListener('load', startExtraction);
    }
}
