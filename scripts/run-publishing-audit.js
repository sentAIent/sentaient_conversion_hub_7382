#!/usr/bin/env node

/**
 * run-publishing-audit.js
 * CLI wrapper for the PublishingValidator service.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { PublishingValidator } from '../src/services/publishingValidator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.join(__dirname, '..');

async function run() {
    console.log('=============================================');
    console.log('  App Store & Web Publishing Auditor         ');
    console.log('=============================================');
    console.log(`Scanning workspace: ${workspaceRoot}\n`);

    const validator = new PublishingValidator(workspaceRoot);
    const report = await validator.runFullAudit();

    const printPlatformReport = (platformReport) => {
        console.log(`[${platformReport.platform}] Readiness Score: ${platformReport.score}/${platformReport.maxScore} (${platformReport.percentage}%)`);
        if (platformReport.issues.length === 0) {
            console.log('  ✅ No issues detected. Ready for publishing.');
        } else {
            platformReport.issues.forEach((issue, idx) => {
                console.log(`  ❌ Issue ${idx + 1}: ${issue}`);
            });
        }
        console.log('');
    };

    printPlatformReport(report.web);
    printPlatformReport(report.android);
    printPlatformReport(report.ios);

    console.log('Audit complete.');
    console.log('Note: To view this interactively, open the Store Launch Auditor card in Cognitive Agent Studio.');
}

run().catch(err => {
    console.error('Audit failed:', err);
    process.exit(1);
});
