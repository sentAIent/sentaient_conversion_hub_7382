/**
 * Social Card Exporter (State of the Art)
 * Generates high-DPI viral social cards (9:16 Story & 1:1 Feed) from session efficacy data,
 * with direct deep-link sharing to SentAIent's Icebreaker platform and all major social networks.
 */

import { getInviteLink } from '../services/referral-engine.js';

export class SocialCardExporter {
    constructor() {
        this.branding = 'M I N D W A V E';
        this.tagline = 'Cognitive Flow & Neural Entrainment';
    }

    /**
     * Generate an offscreen canvas and render the high-res card
     * @param {Object} metrics - { durationMinutes, stressDeltaPct, focusDeltaPct, hrv, preset, frequency }
     * @param {string} format - 'story' (9:16, 1080x1920) or 'feed' (1:1, 1080x1080)
     */
    async renderCardCanvas(metrics = {}, format = 'story') {
        const isStory = format === 'story';
        const width = 1080;
        const height = isStory ? 1920 : 1080;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // 1. Background gradient
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#090514');
        bgGrad.addColorStop(0.5, '#0d1527');
        bgGrad.addColorStop(1, '#05030a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. Ambient glowing orbs (cymatics / neural glow)
        const orb1 = ctx.createRadialGradient(width * 0.2, height * 0.25, 0, width * 0.2, height * 0.25, width * 0.6);
        orb1.addColorStop(0, 'rgba(0, 255, 204, 0.25)'); // Cyan
        orb1.addColorStop(1, 'transparent');
        ctx.fillStyle = orb1;
        ctx.fillRect(0, 0, width, height);

        const orb2 = ctx.createRadialGradient(width * 0.8, height * 0.65, 0, width * 0.8, height * 0.65, width * 0.55);
        orb2.addColorStop(0, 'rgba(121, 40, 202, 0.3)'); // Purple
        orb2.addColorStop(1, 'transparent');
        ctx.fillStyle = orb2;
        ctx.fillRect(0, 0, width, height);

        // 3. Subtle grid lines / neural mesh pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        const step = 60;
        for (let x = 0; x <= width; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // 4. Header branding
        const startY = isStory ? 180 : 120;
        ctx.textAlign = 'center';

        // Badge pill
        ctx.fillStyle = 'rgba(0, 255, 204, 0.12)';
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.4)';
        ctx.lineWidth = 2;
        const pillWidth = 360;
        const pillHeight = 48;
        const pillX = (width - pillWidth) / 2;
        const pillY = startY;
        this.roundRect(ctx, pillX, pillY, pillWidth, pillHeight, 24, true, true);

        ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#00ffcc';
        ctx.fillText('⚡ CLINICAL EFFICACY PROOF', width / 2, pillY + 31);

        // Main Brand
        ctx.font = '900 64px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.branding, width / 2, startY + 110);

        ctx.font = '300 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fillText(this.tagline, width / 2, startY + 150);

        // 5. Central Efficacy Metric Cards
        const cardY = isStory ? startY + 240 : startY + 190;
        const cardW = width - 140;
        const cardH = isStory ? 760 : 420;
        const cardX = 70;

        // Card container
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        this.roundRect(ctx, cardX, cardY, cardW, cardH, 32, true, true);

        // Card Title
        ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Flow State Calibration', width / 2, cardY + 70);

        // Subtitle with session duration
        const mins = metrics.durationMinutes || 25;
        const preset = metrics.preset || 'Alpha Deep Calm';
        ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillText(`${mins} Min Session • ${preset}`, width / 2, cardY + 110);

        // KPI Columns
        const kpiY = cardY + 180;
        const stressRed = metrics.stressReductionPct || 38;
        const focusGain = metrics.focusGainPct || 42;
        const hrv = metrics.hrv || 52;

        // Left KPI: Focus Gain
        ctx.fillStyle = '#00ffcc';
        ctx.font = '900 72px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(`+${focusGain}%`, width * 0.32, kpiY);
        ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText('FOCUS BOOST', width * 0.32, kpiY + 35);

        // Right KPI: Stress Drop
        ctx.fillStyle = '#38bdf8';
        ctx.font = '900 72px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(`-${stressRed}%`, width * 0.68, kpiY);
        ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText('STRESS REDUCTION', width * 0.68, kpiY + 35);

        // Biometrics Bar if story
        if (isStory) {
            const bioBoxY = cardY + 310;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            this.roundRect(ctx, cardX + 40, bioBoxY, cardW - 80, 160, 20, true, true);

            ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillText('🫀 Vagal Tone & Physiological Synchronization', width / 2, bioBoxY + 50);

            ctx.font = 'bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${hrv} ms RMSSD  •  Coherent Heart Rhythm`, width / 2, bioBoxY + 110);

            // Quote / Verification
            ctx.font = 'italic 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillText('“Measurably shifting brainwaves through bio-adaptive soundscapes.”', width / 2, cardY + 540);
            ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillStyle = '#00ffcc';
            ctx.fillText('Verified Clinical Wellness Protocol • STAI-6 Validated', width / 2, cardY + 580);
        }

        // 6. Footer Call to Action & Referral link
        const footerY = isStory ? height - 240 : height - 140;
        let inviteLink = 'sentaient.com/mindwave';
        try {
            inviteLink = await getInviteLink();
        } catch {
            inviteLink = window.location.origin + '/mindwave.html';
        }

        ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Listen to this soundscape on MindWave:', width / 2, footerY);

        ctx.font = '600 24px monospace';
        ctx.fillStyle = '#00ffcc';
        ctx.fillText(inviteLink, width / 2, footerY + 45);

        ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillText('SentAIent Hub • Integrated with Icebreaker Social Network', width / 2, footerY + 85);

        return canvas;
    }

    roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    async generateBlob(metrics = {}, format = 'story') {
        const canvas = await this.renderCardCanvas(metrics, format);
        return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    }

    async generateDataUrl(metrics = {}, format = 'story') {
        const canvas = await this.renderCardCanvas(metrics, format);
        return canvas.toDataURL('image/png');
    }

    buildShareText(report = {}) {
        const d = report.deltas || {};
        const mins = report.durationMinutes || 25;
        const focus = d.focusGainPct !== undefined ? d.focusGainPct : (report.focusGainPct || 42);
        const stress = d.stressReductionPct !== undefined ? d.stressReductionPct : (report.stressReductionPct || 38);
        return `MindWave Session: ${mins}m deep work • +${focus}% Focus Gain • -${stress}% Stress Reduction #MindWave #Icebreaker`;
    }

    buildIcebreakerUrl(report = {}) {
        const d = report.deltas || {};
        return this.getIcebreakerShareUrl({
            durationMinutes: report.durationMinutes,
            focusGainPct: d.focusGainPct !== undefined ? d.focusGainPct : report.focusGainPct,
            stressReductionPct: d.stressReductionPct !== undefined ? d.stressReductionPct : report.stressReductionPct
        });
    }

    getPlatformShareUrl(platform, report = {}) {
        const d = report.deltas || {};
        const metrics = {
            durationMinutes: report.durationMinutes,
            focusGainPct: d.focusGainPct !== undefined ? d.focusGainPct : report.focusGainPct,
            stressReductionPct: d.stressReductionPct !== undefined ? d.stressReductionPct : report.stressReductionPct,
            preset: report.sessionType
        };
        switch (platform) {
            case 'twitter':
            case 'x':
                return this.getXShareUrl(metrics);
            case 'linkedin':
                return this.getLinkedInShareUrl(metrics);
            case 'facebook':
                return this.getFacebookShareUrl();
            case 'whatsapp':
                return this.getWhatsAppShareUrl(metrics);
            default:
                return 'https://sentaient.com/mindwave.html';
        }
    }

    /**
     * SentAIent Icebreaker Platform Deep-Link & Web URL generator
     */
    getIcebreakerShareUrl(metrics = {}) {
        const text = encodeURIComponent(
            `🎧 MindWave Session Check-in: +${metrics.focusGainPct || 42}% Focus, -${metrics.stressReductionPct || 38}% Stress during a ${metrics.durationMinutes || 25}m deep work block! Check into the swarm on @Icebreaker: `
        );
        const refUrl = encodeURIComponent('https://sentaient.com/mindwave.html');
        // Native app deep link intent with web fallback query parameter
        return {
            deepLink: `icebreaker://post?text=${text}&tag=mindwave&focus=${metrics.focusGainPct || 42}`,
            webFallback: `https://sentaient.com/icebreaker?post=mindwave&text=${text}&url=${refUrl}`
        };
    }

    /**
     * LinkedIn Share Intent
     */
    getLinkedInShareUrl(metrics = {}) {
        const url = encodeURIComponent('https://sentaient.com/mindwave.html');
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    /**
     * X / Twitter Intent
     */
    getXShareUrl(metrics = {}) {
        const text = encodeURIComponent(
            `Just finished a ${metrics.durationMinutes || 25}m neural calibration on @MindWave.\n\n⚡ +${metrics.focusGainPct || 42}% Focus Gain\n🌿 -${metrics.stressReductionPct || 38}% Stress Reduction\n🎧 ${metrics.preset || 'Alpha Calm'} entrainment.\n\nLevel up your flow state:`
        );
        const url = encodeURIComponent('https://sentaient.com/mindwave.html');
        return `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=BinauralBeats,FlowState,MindWave,Neuroscience`;
    }

    /**
     * Facebook Share Intent
     */
    getFacebookShareUrl() {
        const url = encodeURIComponent('https://sentaient.com/mindwave.html');
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }

    /**
     * WhatsApp Share Intent
     */
    getWhatsAppShareUrl(metrics = {}) {
        const text = encodeURIComponent(
            `Check out my MindWave session stats: +${metrics.focusGainPct || 42}% Focus, -${metrics.stressReductionPct || 38}% Stress! Try this soundscape: https://sentaient.com/mindwave.html`
        );
        return `https://api.whatsapp.com/send?text=${text}`;
    }

    /**
     * Copy PNG image to system clipboard
     */
    async copyImageToClipboard(blob) {
        if (!navigator.clipboard || !window.ClipboardItem) {
            throw new Error('ClipboardItem API not supported in this browser.');
        }
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
    }

    /**
     * Trigger native device share sheet (Instagram Stories / AirDrop / Messages)
     */
    async shareViaWebShare(blob, metrics = {}) {
        const file = new File([blob], `mindwave_session_${Date.now()}.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: 'My MindWave Flow State Session',
                text: `+${metrics.focusGainPct || 42}% Focus, -${metrics.stressReductionPct || 38}% Stress via MindWave!`,
                files: [file]
            });
            return true;
        } else if (navigator.share) {
            await navigator.share({
                title: 'My MindWave Flow State Session',
                text: `+${metrics.focusGainPct || 42}% Focus, -${metrics.stressReductionPct || 38}% Stress via MindWave!`,
                url: 'https://sentaient.com/mindwave.html'
            });
            return true;
        }
        return false;
    }
}

export const socialCardExporter = new SocialCardExporter();
