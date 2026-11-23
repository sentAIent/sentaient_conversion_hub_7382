/**
 * Email Marketing Service (State of the Art)
 * Provides programmatic access, variable interpolation, and export
 * for MindWave's complete suite of high-converting marketing email templates.
 */

export class EmailMarketingService {
    constructor() {
        this.templates = {
            'welcome': {
                id: 'welcome',
                title: 'Welcome to MindWave (Neural Science)',
                subject: 'Welcome to MindWave — The Science of Neural Entrainment',
                preheader: 'How binaural frequencies guide your brain into effortless flow.',
                targetAudience: 'New signups & first-time users'
            },
            'session-win': {
                id: 'session-win',
                title: 'Post-Session Win (Efficacy Proof)',
                subject: 'Proof of Flow — You Reduced Stress by {{stressReduction}}%',
                preheader: 'Your latest session calibration just yielded significant cognitive shifts.',
                targetAudience: 'Users completing their first or high-performing session'
            },
            'weekly-digest': {
                id: 'weekly-digest',
                title: 'Weekly Neuro-Digest Report',
                subject: 'Your Weekly Neuro-Digest — {{weeklyMinutes}} Minutes in Flow',
                preheader: 'Weekly cognitive summary, streak stats, and vagal tone metrics.',
                targetAudience: 'Active weekly users'
            },
            'icebreaker-sync': {
                id: 'icebreaker-sync',
                title: 'Icebreaker Social Swarms & Community Check-in',
                subject: 'Connect Your Flow State with Icebreaker Social',
                preheader: 'Find local geo-focus swarms and check in with friends on Icebreaker.',
                targetAudience: 'Users looking for community & social accountability'
            },
            'enterprise-pitch': {
                id: 'enterprise-pitch',
                title: 'B2B Enterprise Team Focus Rooms',
                subject: 'Eliminate Dev Burnout — Synchronized Focus Rooms for {{companyName}}',
                preheader: 'Supercharge engineering productivity with synchronized flow.',
                targetAudience: 'Team Leads, Engineering Directors, and People Ops'
            },
            're-engagement': {
                id: 're-engagement',
                title: 'Winback / Brain-Fog Antidote',
                subject: 'Feeling Scattered? Reset Your Brain in 12 Minutes',
                preheader: 'Quick 40Hz Gamma or 10Hz Alpha reboot for afternoon brain fog.',
                targetAudience: 'Inactive users (no session in 7+ days)'
            },
            'founders-upgrade': {
                id: 'founders-upgrade',
                title: 'Founders Club Lifetime VIP Invitation',
                subject: 'Founders Club Invitation — Lock in Lifetime VIP Access',
                preheader: 'Exclusive invitation to secure one-time lifetime access.',
                targetAudience: 'High-frequency free users & VIP trial members'
            }
        };
    }

    /**
     * Interpolates template string with variables
     */
    interpolate(templateStr, vars = {}) {
        const defaults = {
            userName: 'Explorer',
            appUrl: 'https://sentaient.com/mindwave.html',
            upgradeUrl: 'https://sentaient.com/mindwave.html#pricing',
            socialShareUrl: 'https://sentaient.com/mindwave.html#share',
            icebreakerUrl: 'https://sentaient.com/icebreaker',
            unsubscribeUrl: 'https://sentaient.com/preferences',
            stressReduction: '38',
            focusGain: '42',
            durationMinutes: '25',
            hrv: '54',
            preset: 'Alpha Calm',
            weeklyMinutes: '145',
            streakDays: '5',
            avgStressReduction: '36',
            avgFocusGain: '44',
            totalSessions: '6',
            favoritePreset: 'Gamma 40Hz Super-Focus',
            companyName: 'Your Team',
            startDate: 'Nov 17',
            endDate: 'Nov 23'
        };

        const merged = { ...defaults, ...vars };
        return templateStr.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (_, key) => merged[key] !== undefined ? merged[key] : `{{${key}}}`);
    }

    /**
     * Get rendered HTML for an email template
     */
    async getRenderedTemplate(templateId, customVars = {}) {
        const fileMap = {
            'welcome': '01-welcome-brainwave-science.html',
            'session-win': '02-first-session-win.html',
            'weekly-digest': '03-weekly-neuro-digest.html',
            'icebreaker-sync': '04-icebreaker-community-sync.html',
            'enterprise-pitch': '05-enterprise-team-pitch.html',
            're-engagement': '06-re-engagement-brain-fog.html',
            'founders-upgrade': '07-founders-club-upgrade.html'
        };

        const fileName = fileMap[templateId] || fileMap['welcome'];
        
        try {
            const resp = await fetch(`/marketing-emails/${fileName}`);
            if (resp.ok) {
                const rawHtml = await resp.text();
                return this.interpolate(rawHtml, customVars);
            }
        } catch {
            // Fallback for isolated runtime
        }

        // Return fallback formatted HTML
        return this.generateFallbackHTML(templateId, customVars);
    }

    generateFallbackHTML(templateId, vars = {}) {
        const meta = this.templates[templateId] || this.templates['welcome'];
        const subj = this.interpolate(meta.subject, vars);
        return `
            <div style="background-color:#0f172a;color:#fff;padding:32px;font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;">
                <h1 style="color:#00ffcc;font-size:24px;">${subj}</h1>
                <p style="color:#94a3b8;font-size:15px;line-height:1.6;">${meta.preheader}</p>
                <div style="background:rgba(255,255,255,0.05);padding:16px;border-radius:12px;margin:20px 0;">
                    <p style="margin:0;color:#e2e8f0;">Target Audience: <strong>${meta.targetAudience}</strong></p>
                </div>
                <a href="${vars.appUrl || 'https://sentaient.com/mindwave.html'}" style="display:inline-block;padding:12px 24px;background:#00ffcc;color:#000;font-weight:bold;text-decoration:none;border-radius:8px;">Launch MindWave</a>
            </div>
        `;
    }

    getTemplatesList() {
        return Object.values(this.templates);
    }
}

export const emailMarketing = new EmailMarketingService();
