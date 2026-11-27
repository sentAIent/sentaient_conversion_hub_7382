import './setup_mock.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { llmRouter } from '../binaural-assets/js/services/llm-router.js';
import { localDB } from '../binaural-assets/js/services/local-db.js';
import { clinicalAssessment } from '../binaural-assets/js/services/clinical-assessment.js';
import { ragEngine } from '../binaural-assets/js/services/rag-engine.js';
import { i18n } from '../binaural-assets/js/services/i18n.js';

test('1. Tiered AI LLM Router: Classification, Safety Guardrails & Semantic Cache', async () => {
    // A. Model Tier Classification
    assert.equal(llmRouter.classifyTier('summarize mood', 'sentiment_classify'), 'fast');
    assert.equal(llmRouter.classifyTier('Recommend advanced clinical protocol with deep analysis and multi-step plan'), 'frontier');

    // B. Safety Guardrail: Medical diagnosis / prescription intercept
    const emergencyPrompt = 'Please prescribe medication and drugs to diagnose my disease';
    const emergencyResp = await llmRouter.complete(emergencyPrompt);
    assert.ok(emergencyResp.text.includes('MindWave provides auditory entrainment'), 'Should intercept with safety warning');

    // C. Non-medical disclaimer injection
    const clinicalPrompt = 'Recommend binaural beat frequency for ADHD focus';
    const response1 = await llmRouter.complete(clinicalPrompt);
    assert.ok(response1.text.length > 0, 'Response should not be empty');
    assert.equal(response1.cached, false, 'First run should not be cached');

    // D. Semantic Cache Hit
    const response2 = await llmRouter.complete(clinicalPrompt);
    assert.equal(response2.cached, true, 'Second identical request should hit semantic cache');

    // E. Telemetry Tracking
    const telemetry = llmRouter.getTelemetry();
    assert.ok(telemetry.totalRequests >= 2, 'Should track total requests');
    assert.ok(telemetry.cacheHits >= 1, 'Should track cache hits');
    assert.ok(telemetry.estimatedCostUSD >= 0, 'Should track cost estimate');
});

test('2. Local-First IndexedDB & Storage Fallback', async () => {
    // Put & Get item
    const mockSession = {
        id: 'sess_test_101',
        title: 'Deep Theta Rest',
        frequency: 6.0,
        carrierFrequency: 216,
        durationMinutes: 30,
        createdAt: new Date().toISOString()
    };

    const saved = await localDB.put('sessions', mockSession);
    assert.equal(saved.id, 'sess_test_101');

    const retrieved = await localDB.get('sessions', 'sess_test_101');
    assert.ok(retrieved, 'Should retrieve stored session');
    assert.equal(retrieved.frequency, 6.0);

    const allSessions = await localDB.getAll('sessions');
    assert.ok(allSessions.length >= 1, 'Should contain at least 1 session');

    // Delete item
    await localDB.delete('sessions', 'sess_test_101');
    const afterDelete = await localDB.get('sessions', 'sess_test_101');
    assert.equal(afterDelete, null, 'Should be null after deletion');
});

test('3. Clinical Assessment & User Data Export (GDPR / HIPAA Portability)', async () => {
    // Run an assessment workflow
    clinicalAssessment.startSessionAssessment('alpha');
    clinicalAssessment.recordPreAssessment({ stress: 8, focus: 3 });
    const report = clinicalAssessment.recordPostAssessment({ stress: 3, focus: 8 });

    assert.ok(report, 'Report should be generated');
    assert.ok(report.deltas.overallEfficacy > 0, 'Efficacy score should be calculated');
    assert.ok(report.deltas.stressReductionPct > 0, 'Stress reduction should be positive');

    // Export formats
    const exportedRawJSON = clinicalAssessment.exportUserData('json');
    assert.ok(exportedRawJSON, 'JSON export should succeed');
    const exportedObj = JSON.parse(exportedRawJSON);
    assert.ok(exportedObj.sessions.length > 0, 'Export should include sessions');
    assert.ok(exportedObj.exportDate, 'Export should have ISO timestamp');

    const exportedCSV = clinicalAssessment.exportUserData('csv');
    assert.ok(exportedCSV.includes('SessionID,Date,Preset,DurationMins'), 'CSV should contain valid header row');
});

test('4. Hybrid Neuro-Acoustic RAG Engine: BM25 + Dense Semantic Ranking', () => {
    assert.ok(ragEngine.corpus.length >= 4, 'Should contain peer-reviewed citations');

    // Query Oster 1973 Auditory Beats
    const results = ragEngine.search('Oster auditory beats in the brain superior olivary', 3);
    assert.ok(results.length > 0, 'Should return ranked search results');
    assert.ok(results[0].title.toLowerCase().includes('auditory beats'), 'Top hit should be Oster auditory beats');
    assert.equal(results[0].id, 'paper_01');

    // Query 40Hz gamma entrainment
    const gammaResults = ragEngine.search('gamma 40Hz microglial sensory entrainment', 3);
    assert.ok(gammaResults.length > 0, 'Should return gamma results');
});

test('5. Multi-Locale i18n & RTL Layout Switching', () => {
    // Test Spanish
    i18n.setLocale('es');
    assert.equal(i18n.currentLocale, 'es');
    assert.equal(i18n.t('play'), 'Iniciar Sesión');
    assert.equal(i18n.t('alphaFlow'), 'Alpha (10Hz Estado de Flujo)');

    // Test Japanese
    i18n.setLocale('ja');
    assert.equal(i18n.t('play'), 'セッション開始');

    // Test Arabic & RTL Direction
    i18n.setLocale('ar');
    assert.equal(i18n.t('play'), 'بدء الجلسة');
    assert.equal(document.documentElement.dir, 'rtl', 'Arabic should set document dir to rtl');

    // Reset to English
    i18n.setLocale('en');
    assert.equal(document.documentElement.dir, 'ltr', 'English should reset document dir to ltr');
    assert.equal(i18n.t('play'), 'Play Session');
});

test('6. App Store & Google Play Universal Link Manifests', () => {
    const cwd = process.cwd();
    const appleFiles = [
        path.join(cwd, 'public', '.well-known', 'apple-app-site-association'),
        path.join(cwd, 'dist', '.well-known', 'apple-app-site-association')
    ];
    for (const f of appleFiles) {
        assert.ok(fs.existsSync(f), `Apple association file should exist: ${f}`);
        const data = JSON.parse(fs.readFileSync(f, 'utf8'));
        assert.ok(data.applinks, 'Must contain applinks configuration');
        assert.ok(data.applinks.details.length > 0, 'Must contain applinks details');
        assert.ok(data.applinks.details[0].appID.includes('com.sentaient.mindwave'), 'App ID must match');
    }

    const androidFiles = [
        path.join(cwd, 'public', '.well-known', 'assetlinks.json'),
        path.join(cwd, 'dist', '.well-known', 'assetlinks.json')
    ];
    for (const f of androidFiles) {
        assert.ok(fs.existsSync(f), `Asset links file should exist: ${f}`);
        const data = JSON.parse(fs.readFileSync(f, 'utf8'));
        assert.ok(Array.isArray(data), 'Asset links must be a JSON array');
        assert.equal(data[0].relation[0], 'delegate_permission/common.handle_all_urls');
        assert.equal(data[0].target.package_name, 'com.sentaient.mindwave');
    }
});

test('7. Web Security Headers & LLM Crawler Docs', () => {
    const cwd = process.cwd();
    // Headers
    const headersPath = path.join(cwd, 'public', '_headers');
    assert.ok(fs.existsSync(headersPath), 'public/_headers must exist');
    const headersContent = fs.readFileSync(headersPath, 'utf8');
    assert.ok(headersContent.includes('X-Frame-Options: SAMEORIGIN'), 'Should include X-Frame-Options');
    assert.ok(headersContent.includes('X-Content-Type-Options: nosniff'), 'Should include X-Content-Type-Options');
    assert.ok(headersContent.includes('Strict-Transport-Security:'), 'Should include HSTS');
    assert.ok(headersContent.includes('Permissions-Policy:'), 'Should include Permissions-Policy');

    // llms.txt
    const llmsPath = path.join(cwd, 'public', 'llms.txt');
    assert.ok(fs.existsSync(llmsPath), 'public/llms.txt must exist');
    const llmsContent = fs.readFileSync(llmsPath, 'utf8');
    assert.ok(llmsContent.includes('Delta (0.5 – 4 Hz)'), 'Should document frequency bands');
    assert.ok(llmsContent.includes('Oster, G. (1973)'), 'Should include clinical citations');
});

import { iapService } from '../binaural-assets/js/services/iap-service.js';
import { appCheck } from '../binaural-assets/js/services/app-check.js';
import { webGPUSLM } from '../binaural-assets/js/services/webgpu-slm.js';
import { spatialAudioMesh } from '../binaural-assets/js/audio/spatial-audio-mesh.js';
import { policyRadar } from '../scripts/policy-radar.js';
import { adversarialRig } from '../scripts/adversarial-review.js';

test('8. StoreKit 2 / Google Play Billing & AppCheck Anti-Abuse', async () => {
    // A. IAP Service
    await iapService.init();
    const offerings = await iapService.getOfferings();
    assert.ok(offerings.length >= 3, 'Should provide at least 3 subscription packages');
    assert.ok(offerings.some(o => o.identifier === 'pro_monthly'));

    const purchaseRes = await iapService.purchase('pro_monthly');
    assert.equal(purchaseRes.success, true);
    assert.equal(purchaseRes.tier, 'pro');

    const restoreRes = await iapService.restorePurchases();
    assert.equal(restoreRes.success, true);

    // B. AppCheck
    const token = await appCheck.getToken();
    assert.ok(token, 'Should generate an AppCheck / Play Integrity token');
    const headers = appCheck.getAuthHeaders();
    assert.ok(headers['X-Firebase-AppCheck'], 'Should generate AppCheck auth header');
});

test('9. WebGPU Neuro SLM Inference & WebRTC Spatial Audio Mesh', async () => {
    // A. WebGPU SLM
    const initWebGPU = await webGPUSLM.init();
    assert.equal(typeof initWebGPU, 'boolean');

    const promptPayload = webGPUSLM.buildCachedPromptPayload('Recommend focus beats');
    assert.ok(promptPayload.system[0].text.includes('MINDWAVE_NEURO_CORE_V1'));
    assert.equal(promptPayload.system[0].cache_control.type, 'ephemeral');

    const streamResult = await webGPUSLM.complete('Recommend focus beats');
    assert.ok(streamResult.text.includes('Gamma'), 'Should generate Gamma entrainment guidance');
    assert.equal(streamResult.costUSD, 0, 'In-browser inference should be zero cloud cost');

    // B. WebRTC Spatial Audio Mesh
    await spatialAudioMesh.init();
    const room = await spatialAudioMesh.joinRoom('DeepFocusRoom', 'Scientist1');
    assert.equal(room.roomName, 'DeepFocusRoom');
    assert.ok(room.usersCount >= 1);
    assert.ok(room.peerId);

    const telemetry = spatialAudioMesh.getRoomTelemetry();
    assert.equal(telemetry.roomName, 'DeepFocusRoom');

    spatialAudioMesh.leaveRoom();
    assert.equal(spatialAudioMesh.roomName, null);
});

test('10. Prisma Relational Schema & Target SDK 36 Mandate', () => {
    const cwd = process.cwd();

    // Prisma Schema validation
    const prismaFile = path.join(cwd, 'prisma', 'schema.prisma');
    assert.ok(fs.existsSync(prismaFile), 'prisma/schema.prisma must exist');
    const prismaContent = fs.readFileSync(prismaFile, 'utf8');
    assert.ok(prismaContent.includes('model UserProfile'));
    assert.ok(prismaContent.includes('model SessionRecord'));
    assert.ok(prismaContent.includes('model ClinicalAssessment'));
    assert.ok(prismaContent.includes('model UserPreset'));

    // Android Target SDK 36 validation
    const gradleFile = path.join(cwd, 'android', 'variables.gradle');
    assert.ok(fs.existsSync(gradleFile), 'android/variables.gradle must exist');
    const gradleContent = fs.readFileSync(gradleFile, 'utf8');
    assert.ok(gradleContent.includes('targetSdkVersion = 36'), 'Must mandate targetSdkVersion = 36 (Android 16)');
    assert.ok(gradleContent.includes('compileSdkVersion = 36'), 'Must mandate compileSdkVersion = 36');
});

test('11. Policy Radar Scanner & Adversarial Dual-Model Review Rig', async () => {
    // Policy Radar
    const radarRes = await policyRadar.scan();
    assert.equal(radarRes.overallStatus, 'ALL_MANDATES_SATISFIED');
    assert.ok(radarRes.mandates.length >= 6);

    // Adversarial Review Rig
    const reviewRes = adversarialRig.runFullReview();
    assert.equal(reviewRes.converged, true, 'Dual-model review must converge');
    assert.equal(reviewRes.modelA, 'APPROVED');
    assert.equal(reviewRes.modelB, 'APPROVED');
    assert.equal(reviewRes.violations.length, 0);
});
