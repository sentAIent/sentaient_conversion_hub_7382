import './setup_mock.js';
import test from 'node:test';
import assert from 'node:assert/strict';

import { socialCardExporter } from '../binaural-assets/js/export/social-card-exporter.js';
import { emailMarketing } from '../binaural-assets/js/services/email-marketing.js';
import { spatialGyro } from '../binaural-assets/js/audio/spatial-gyro.js';
import { enterpriseWellness } from '../binaural-assets/js/services/enterprise-wellness.js';

test('Social Card Exporter: Text & Deep-link generation', () => {
    const mockReport = {
        sessionType: 'gamma',
        durationMinutes: 45,
        deltas: {
            stressReductionPct: 62,
            focusGainPct: 88,
            overallEfficacy: 78
        },
        biometrics: {
            hrvBefore: 42,
            hrvAfter: 68
        }
    };

    // 1. Share text construction
    const text = socialCardExporter.buildShareText(mockReport);
    assert.ok(text.includes('45m'), 'Text should contain duration');
    assert.ok(text.includes('88%'), 'Text should contain focus gain');
    assert.ok(text.includes('62%'), 'Text should contain stress reduction');
    assert.ok(text.includes('#MindWave'), 'Text should include MindWave hashtag');
    assert.ok(text.includes('#Icebreaker'), 'Text should include Icebreaker hashtag');

    // 2. Icebreaker links
    const iceLinks = socialCardExporter.buildIcebreakerUrl(mockReport);
    assert.ok(iceLinks.deepLink.startsWith('icebreaker://post?'), 'Deep link scheme should be icebreaker://');
    assert.ok(iceLinks.deepLink.includes('tag=mindwave'), 'Tag parameter should be present');
    assert.ok(iceLinks.webFallback.startsWith('https://sentaient.com/icebreaker?'), 'Web fallback should point to sentaient.com');

    // 3. Platform URLs
    const twitterUrl = socialCardExporter.getPlatformShareUrl('twitter', mockReport);
    assert.ok(twitterUrl.startsWith('https://twitter.com/intent/tweet?'));

    const linkedInUrl = socialCardExporter.getPlatformShareUrl('linkedin', mockReport);
    assert.ok(linkedInUrl.startsWith('https://www.linkedin.com/sharing/share-offsite/?'));

    const whatsappUrl = socialCardExporter.getPlatformShareUrl('whatsapp', mockReport);
    assert.ok(whatsappUrl.startsWith('https://api.whatsapp.com/send?'));
});

test('Email Marketing Service: Template Management & Interpolation', async () => {
    // 1. Template listing
    const templates = emailMarketing.getTemplatesList();
    assert.equal(templates.length, 7, 'Should have 7 marketing email templates');
    assert.ok(templates.some(t => t.id === 'welcome'));
    assert.ok(templates.some(t => t.id === 'icebreaker-sync'));
    assert.ok(templates.some(t => t.id === 'enterprise-pitch'));

    // 2. Variable interpolation directly
    const interpolated = emailMarketing.interpolate('Hello {{userName}}, your focus increased by {{focusGain}}%!', {
        userName: 'Alex',
        focusGain: '85'
    });
    assert.equal(interpolated, 'Hello Alex, your focus increased by 85%!');

    // 3. Fallback / rendered HTML
    const html = await emailMarketing.getRenderedTemplate('session-win', {
        userName: 'Alex',
        focusGain: '85',
        stressReduction: '60'
    });
    assert.ok(html.includes('Proof of Flow') || html.includes('60%'), 'Rendered HTML should contain subject or variable');
});

test('Spatial Gyro: Head tracking angle smoothing & clamping', () => {
    assert.equal(spatialGyro.isEnabled(), false, 'Spatial gyro should start disabled');

    // Feed mock device orientation event
    spatialGyro.isActive = true;
    spatialGyro.handleOrientation({ beta: 20, gamma: 15, alpha: 90 });

    const state = spatialGyro.getState();
    assert.ok(typeof state.yaw === 'number');
    assert.ok(typeof state.pitch === 'number');
    assert.ok(typeof state.roll === 'number');
    assert.ok(state.panX >= -1 && state.panX <= 1, 'panX should be clamped in [-1, 1]');
    assert.ok(state.panY >= -1 && state.panY <= 1, 'panY should be clamped in [-1, 1]');

    // Extreme values should clamp safely
    spatialGyro.handleOrientation({ beta: 150, gamma: 150, alpha: 300 });
    const clampedState = spatialGyro.getState();
    assert.ok(clampedState.panX <= 1 && clampedState.panX >= -1);
    assert.ok(clampedState.panY <= 1 && clampedState.panY >= -1);

    spatialGyro.stop();
    assert.equal(spatialGyro.isEnabled(), false);
});

test('Enterprise Wellness: Teammate Live Presence Roster', () => {
    const room = enterpriseWellness.joinFocusRoom('Engineering Deep Work', 'gamma');
    assert.ok(room.activeParticipants, 'Active participants roster should be populated');
    assert.ok(room.activeParticipants.length >= 3, 'Should have at least 3 active teammates in room');
    
    const teammate = room.activeParticipants[0];
    assert.ok(teammate.name, 'Teammate should have name');
    assert.ok(teammate.role, 'Teammate should have role');
    assert.ok(teammate.avatar, 'Teammate should have avatar');
    assert.ok(teammate.focusMinutes > 0, 'Teammate should have focus minutes');

    enterpriseWellness.leaveFocusRoom();
});
