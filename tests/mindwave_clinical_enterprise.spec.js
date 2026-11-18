import './setup_mock.js';
import test from 'node:test';
import assert from 'node:assert/strict';

import { clinicalAssessment } from '../binaural-assets/js/services/clinical-assessment.js';
import { enterpriseWellness } from '../binaural-assets/js/services/enterprise-wellness.js';
import { biofeedback } from '../binaural-assets/js/services/biofeedback.js';

test('Clinical Assessment: Pre/Post Evaluation & Efficacy Scoring', () => {
    // 1. Start assessment
    const session = clinicalAssessment.startSessionAssessment('alpha');
    assert.ok(session.id.startsWith('sess_'), 'Session ID should be generated');

    // 2. Record Pre-session values
    clinicalAssessment.recordPreAssessment({ stress: 8, focus: 4, energy: 3 });

    // 3. Record Post-session values
    const report = clinicalAssessment.recordPostAssessment({ stress: 3, focus: 8, energy: 7 });

    assert.ok(report, 'Report should be returned');
    assert.equal(report.pre.stress, 8);
    assert.equal(report.post.stress, 3);
    assert.equal(report.deltas.stressReductionPct, 63, 'Stress reduction should be ~63%');
    assert.equal(report.deltas.focusGainPct, 100, 'Focus gain should be 100%');
    assert.ok(report.deltas.overallEfficacy >= 50, 'Overall efficacy should be positive');

    // 4. Verify History and Aggregates
    const history = clinicalAssessment.getHistory();
    assert.ok(history.length >= 1, 'History should persist the session');

    const stats = clinicalAssessment.getAggregateStats();
    assert.equal(stats.totalSessions, 1);
    assert.equal(stats.avgStressReduction, 63);
    assert.equal(stats.avgFocusGain, 100);
});

test('Enterprise Wellness: Corporate Licenses & Sync Rooms', () => {
    // 1. Invalid License
    const invalid = enterpriseWellness.redeemCorporateCode('INVALID_CODE');
    assert.equal(invalid.success, false, 'Invalid code should be rejected');

    // 2. Valid License
    const valid = enterpriseWellness.redeemCorporateCode('SENTAIENT-CORP');
    assert.equal(valid.success, true, 'SentAIent Enterprise license should redeem');
    assert.equal(enterpriseWellness.orgData.isEnterprise, true);
    assert.equal(enterpriseWellness.orgData.companyName, 'SentAIent Enterprise');

    // 3. Join Synchronized Focus Room
    const room = enterpriseWellness.joinFocusRoom('Engineering Flow', 'gamma');
    assert.ok(room, 'Room should be joined');
    assert.equal(room.name, 'Engineering Flow');
    assert.equal(room.preset, 'gamma');
    assert.ok(room.remainingSeconds > 0, 'Room timer should have remaining seconds');
    assert.ok(room.participants >= 1, 'Room should have participants');

    // 4. Leave Room and verify cleanup (kills interval)
    enterpriseWellness.leaveFocusRoom();
    assert.equal(enterpriseWellness.activeRoom, null, 'Active room should be cleared');
    assert.equal(enterpriseWellness.roomSyncInterval, null, 'Interval should be cleared');
});

test('Biofeedback: HRV RMSSD Computation & Simulation Lifecycle', () => {
    // 1. Feed healthy synthetic RR intervals (approx 50ms variability)
    const rrSamples = [800, 850, 810, 860, 815, 865, 820, 870, 825, 875];
    rrSamples.forEach(rr => biofeedback.recordRrInterval(rr));

    assert.ok(biofeedback.currentHrv > 30 && biofeedback.currentHrv < 70, 
        `HRV RMSSD (${biofeedback.currentHrv}ms) should be in physiological range`);
    assert.ok(biofeedback.stressScore >= 0 && biofeedback.stressScore <= 100, 
        'Stress score should be normalized between 0 and 100');

    // 2. Start simulation mode
    biofeedback.startSimulation();
    assert.equal(biofeedback.isConnected, true);
    assert.equal(biofeedback.isSimulated, true);
    assert.ok(biofeedback.simInterval !== null, 'Simulation interval should be running');

    // 3. Stop simulation mode (kills interval)
    biofeedback.stopSimulation();
    assert.equal(biofeedback.isConnected, false);
    assert.equal(biofeedback.isSimulated, false);
    assert.equal(biofeedback.simInterval, null, 'Simulation interval should be cleaned up');
});
