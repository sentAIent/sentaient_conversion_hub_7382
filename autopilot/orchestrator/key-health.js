import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function checkKeyHealth() {
    console.log("[Key Health Autopilot] Scanning credentials vault...");
    const configPath = path.join(__dirname, 'marketing_credentials.json');
    
    if (!fs.existsSync(configPath)) {
        console.warn("[Key Health Autopilot] Vault not found. No keys are configured.");
        return;
    }

    try {
        const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        let issuesFound = 0;

        for (const [handle, creds] of Object.entries(data)) {
            // Check for obviously missing keys
            if (handle.startsWith('TikTok') && (!creds.accessToken || !creds.openId)) {
                console.warn(`[Key Health Alert] ⚠️ TikTok account ${handle} is missing required tokens.`);
                issuesFound++;
            }
            if (handle.startsWith('Instagram') && (!creds.accessToken || !creds.accountId)) {
                console.warn(`[Key Health Alert] ⚠️ Meta account ${handle} is missing required tokens.`);
                issuesFound++;
            }
        }

        if (issuesFound === 0) {
            console.log("[Key Health Autopilot] ✅ All stored accounts have complete credential sets.");
        } else {
            console.warn(`[Key Health Autopilot] Found ${issuesFound} issues. Sending alert to Discord/Telegram (stub).`);
            // In a real scenario, make a fetch() call to a Discord webhook here
        }
    } catch (e) {
        console.error("[Key Health Autopilot] Failed to parse credentials vault:", e);
    }
}

// Run immediately, and then every 24 hours
checkKeyHealth();
setInterval(checkKeyHealth, 24 * 60 * 60 * 1000);
