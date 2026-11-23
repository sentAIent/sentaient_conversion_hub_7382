/**
 * Email Campaign Preview Modal (State of the Art)
 * Live in-app previewer for all 7 MindWave marketing email campaigns,
 * with one-click HTML / Plain-text export for CRM and marketing dispatch.
 */

import { emailMarketing } from '../services/email-marketing.js';
import { showToast } from '../utils/helpers.js';

let activeTemplateId = 'welcome';
let currentRenderedHtml = '';

export function openEmailPreviewModal(templateId = 'welcome') {
    activeTemplateId = templateId;
    let modal = document.getElementById('emailPreviewModal');
    if (!modal) {
        modal = createEmailPreviewModal();
        document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    renderActiveEmail();
}

export function closeEmailPreviewModal() {
    const modal = document.getElementById('emailPreviewModal');
    if (modal) modal.classList.add('hidden');
}

function createEmailPreviewModal() {
    const el = document.createElement('div');
    el.id = 'emailPreviewModal';
    el.className = 'fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto hidden';

    const templates = emailMarketing.getTemplatesList();
    const navItems = templates.map(t => `
        <button data-tid="${t.id}" class="email-nav-btn text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${t.id === activeTemplateId ? 'bg-[var(--accent)] text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
            ${t.title}
        </button>
    `).join('');

    el.innerHTML = `
        <div class="bg-[#0f172a] border border-white/15 rounded-3xl max-w-4xl w-full p-5 sm:p-6 text-white shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
            <!-- Header -->
            <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
                        ✉️
                    </div>
                    <div>
                        <h3 class="text-base sm:text-lg font-bold">Marketing Email Campaign Suite</h3>
                        <p class="text-xs text-gray-400">Production-ready responsive email templates for lifecycle marketing.</p>
                    </div>
                </div>
                <button id="closeEmailPreviewBtn" class="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <!-- Body: Sidebar + Iframe Preview -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 flex-1 min-h-[460px]">
                <!-- Template Selector List -->
                <div class="md:col-span-4 flex flex-col gap-1.5 overflow-y-auto pr-1 border-r border-white/10 custom-scrollbar max-h-[500px]">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 py-1">Available Campaigns</div>
                    ${navItems}
                </div>

                <!-- Live Preview Pane -->
                <div class="md:col-span-8 flex flex-col">
                    <div class="flex items-center justify-between mb-2">
                        <div class="text-xs text-gray-400 truncate max-w-[280px]" id="emailSubjectLine">
                            Subject: ...
                        </div>
                        <div class="flex gap-2">
                            <button id="copyEmailHtmlBtn" class="py-1 px-3 rounded-lg bg-[var(--accent)] text-black font-bold text-xs hover:brightness-110 flex items-center gap-1">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                <span>Copy HTML</span>
                            </button>
                        </div>
                    </div>
                    <div class="flex-1 bg-black rounded-2xl overflow-hidden border border-white/10 relative">
                        <iframe id="emailPreviewFrame" class="w-full h-full min-h-[420px] border-0" sandbox="allow-same-origin"></iframe>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Event wiring
    el.querySelector('#closeEmailPreviewBtn').addEventListener('click', closeEmailPreviewModal);

    el.querySelectorAll('.email-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activeTemplateId = btn.getAttribute('data-tid');
            el.querySelectorAll('.email-nav-btn').forEach(b => {
                const isActive = b.getAttribute('data-tid') === activeTemplateId;
                b.className = `email-nav-btn text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${isActive ? 'bg-[var(--accent)] text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`;
            });
            renderActiveEmail();
        });
    });

    el.querySelector('#copyEmailHtmlBtn').addEventListener('click', async () => {
        if (currentRenderedHtml) {
            try {
                await navigator.clipboard.writeText(currentRenderedHtml);
                showToast("Email HTML copied to clipboard!", "success");
            } catch {
                showToast("Failed to copy HTML", "error");
            }
        }
    });

    return el;
}

async function renderActiveEmail() {
    const meta = emailMarketing.templates[activeTemplateId] || emailMarketing.templates['welcome'];
    const subjEl = document.getElementById('emailSubjectLine');
    const frame = document.getElementById('emailPreviewFrame');

    if (subjEl) subjEl.textContent = `Subject: ${emailMarketing.interpolate(meta.subject)}`;

    try {
        currentRenderedHtml = await emailMarketing.getRenderedTemplate(activeTemplateId);
        if (frame) {
            const doc = frame.contentDocument || frame.contentWindow.document;
            doc.open();
            doc.write(currentRenderedHtml);
            doc.close();
        }
    } catch (err) {
        console.error('[EmailPreviewModal] Render failed:', err);
    }
}
