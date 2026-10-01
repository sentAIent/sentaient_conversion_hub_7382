document.addEventListener('DOMContentLoaded', () => {
    // Check Tauri local server connection
    fetch('http://localhost:3335/api/health')
        .then(res => {
            if (res.ok) {
                document.getElementById('statusIndicator').classList.remove('offline');
            } else {
                document.getElementById('statusIndicator').classList.add('offline');
            }
        })
        .catch(() => {
            document.getElementById('statusIndicator').classList.add('offline');
        });

    // Query active tabs to update UI
    chrome.tabs.query({}, (tabs) => {
        let hasX = false;
        let hasIg = false;
        let hasTk = false;

        tabs.forEach(tab => {
            if (tab.url) {
                if (tab.url.includes('twitter.com') || tab.url.includes('x.com')) hasX = true;
                if (tab.url.includes('instagram.com')) hasIg = true;
                if (tab.url.includes('tiktok.com')) hasTk = true;
            }
        });

        if (hasX) {
            document.getElementById('statusX').textContent = 'Active';
            document.getElementById('statusX').className = 'active';
        }
        if (hasIg) {
            document.getElementById('statusIg').textContent = 'Active';
            document.getElementById('statusIg').className = 'active';
        }
        if (hasTk) {
            document.getElementById('statusTk').textContent = 'Active';
            document.getElementById('statusTk').className = 'active';
        }
    });
});
