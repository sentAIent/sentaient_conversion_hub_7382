/**
 * MindWave AI Consent & Content Reporting Modals
 * Compliant with:
 * - Apple Guideline 5.1.2(i): Explicit prior consent for third-party AI processing
 * - Apple Guideline 1.2 & Google Play AI Safety: User content flagging and reporting mechanism
 */

import { showToast } from '../utils/helpers.js';

export function hasAIConsent() {
    return localStorage.getItem('mindwave_ai_consent_accepted') === 'true';
}

export function openAIConsentModal(onAccept) {
    let modal = document.getElementById('aiConsentModal');
    if (!modal) {
        modal = createAIConsentModalDOM(onAccept);
        document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

function closeAIConsentModal() {
    const modal = document.getElementById('aiConsentModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

function createAIConsentModalDOM(onAccept) {
    const container = document.createElement('div');
    container.id = 'aiConsentModal';
    container.className = 'fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md hidden';
    container.innerHTML = `
        <div class="relative w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 text-white shadow-2xl overflow-hidden" style="box-shadow: 0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(0, 255, 204, 0.15);">
            <div class="flex items-center gap-3 pb-3 border-b border-white/10">
                <div class="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div>
                    <h3 class="text-base font-bold text-white tracking-wide">AI Neuro Coach Consent</h3>
                    <p class="text-[10px] text-white/50">Apple Guideline 5.1.2(i) Disclosure</p>
                </div>
            </div>

            <div class="mt-4 space-y-3 text-xs text-white/70 leading-relaxed">
                <p>
                    MindWave's Neural Coach utilizes advanced artificial intelligence (Google Gemini & OpenAI LLMs) to personalize carrier frequencies and cognitive recommendations based on your input.
                </p>
                <div class="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5 text-[11px] text-white/80">
                    <div class="font-bold text-cyan-400">Your Privacy Safeguards:</div>
                    <ul class="list-disc list-inside space-y-0.5 text-white/60">
                        <li><strong>Zero Personal Data Shared:</strong> Only the immediate wellness query is transmitted.</li>
                        <li><strong>Local-First Fallback:</strong> If declined, MindWave uses deterministic offline heuristic rules.</li>
                        <li><strong>Not Medical Advice:</strong> AI suggestions are strictly for mindfulness and cognitive entrainment.</li>
                    </ul>
                </div>

                <div class="flex gap-2 pt-3">
                    <button id="declineAIBtn" class="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-all">
                        Decline (Local Only)
                    </button>
                    <button id="acceptAIBtn" class="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20">
                        I Consent & Continue
                    </button>
                </div>
            </div>
        </div>
    `;

    container.querySelector('#declineAIBtn').onclick = () => {
        localStorage.setItem('mindwave_ai_consent_accepted', 'false');
        closeAIConsentModal();
        showToast('Local heuristic mode active. No data sent to external AI.', 'info');
    };

    container.querySelector('#acceptAIBtn').onclick = () => {
        localStorage.setItem('mindwave_ai_consent_accepted', 'true');
        closeAIConsentModal();
        showToast('AI Neural Coach enabled.', 'success');
        if (typeof onAccept === 'function') onAccept();
    };

    return container;
}

/**
 * Guideline 1.2 Content Moderation & Reporting Dialog
 */
export function openAIReportModal(promptText, responseText) {
    let modal = document.getElementById('aiReportModal');
    if (!modal) {
        modal = createAIReportModalDOM();
        document.body.appendChild(modal);
    }
    modal.dataset.prompt = promptText || '';
    modal.dataset.response = responseText || '';
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

function closeAIReportModal() {
    const modal = document.getElementById('aiReportModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

function createAIReportModalDOM() {
    const container = document.createElement('div');
    container.id = 'aiReportModal';
    container.className = 'fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md hidden';
    container.innerHTML = `
        <div class="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 text-white shadow-2xl">
            <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <div class="flex items-center gap-2.5">
                    <span class="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black">!</span>
                    <h3 class="text-base font-bold text-white">Report AI Response</h3>
                </div>
                <button id="closeReportModalBtn" class="p-1 rounded-full text-white/50 hover:text-white">✕</button>
            </div>

            <div class="mt-4 space-y-3 text-xs text-white/70">
                <p>Help us maintain safe and accurate AI guidance. Why are you flagging this response?</p>
                <select id="reportReasonSelect" class="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs">
                    <option value="medical_advice">Offers inappropriate medical advice</option>
                    <option value="inaccurate">Inaccurate or misleading frequency guidance</option>
                    <option value="offensive">Offensive, harmful, or inappropriate content</option>
                    <option value="other">Other issue</option>
                </select>

                <div class="flex gap-2 pt-3">
                    <button id="cancelReportBtn" class="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs">Cancel</button>
                    <button id="submitReportBtn" class="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs">Submit Report</button>
                </div>
            </div>
        </div>
    `;

    container.querySelector('#closeReportModalBtn').onclick = closeAIReportModal;
    container.querySelector('#cancelReportBtn').onclick = closeAIReportModal;

    container.querySelector('#submitReportBtn').onclick = () => {
        const reason = container.querySelector('#reportReasonSelect').value;
        const report = {
            reason,
            prompt: container.dataset.prompt,
            response: container.dataset.response,
            timestamp: new Date().toISOString()
        };
        const existing = JSON.parse(localStorage.getItem('mindwave_ai_reports') || '[]');
        existing.push(report);
        localStorage.setItem('mindwave_ai_reports', JSON.stringify(existing));
        closeAIReportModal();
        showToast('Thank you. Content flagged and queued for moderation review.', 'success');
    };

    return container;
}
