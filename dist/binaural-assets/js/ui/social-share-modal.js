/**
 * Social Share Modal (State of the Art)
 * Displays the rendered session efficacy card with aspect ratio toggles
 * and seamless integrations for Icebreaker, Instagram, LinkedIn, X, and direct download.
 */

import { socialCardExporter } from '../export/social-card-exporter.js';
import { showToast } from '../utils/helpers.js';

let activeMetrics = {
    durationMinutes: 25,
    focusGainPct: 42,
    stressReductionPct: 38,
    hrv: 54,
    preset: 'Alpha Flow',
    baseFrequency: 432,
    beatFrequency: 10
};
let currentFormat = 'story'; // 'story' | 'feed'
let currentBlob = null;

export function openSocialShareModal(metrics = {}) {
    activeMetrics = { ...activeMetrics, ...metrics };
    currentFormat = 'story';
    
    let modal = document.getElementById('socialShareModal');
    if (!modal) {
        modal = createSocialShareModal();
        document.body.appendChild(modal);
    }
    
    modal.classList.remove('hidden');
    refreshCardPreview();
}

export function closeSocialShareModal() {
    const modal = document.getElementById('socialShareModal');
    if (modal) modal.classList.add('hidden');
}

function createSocialShareModal() {
    const el = document.createElement('div');
    el.id = 'socialShareModal';
    el.className = 'fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto hidden';
    
    el.innerHTML = `
        <div class="bg-[#0f172a] border border-white/15 rounded-3xl max-w-xl w-full p-5 sm:p-6 text-white shadow-2xl relative my-auto max-h-[95vh] overflow-y-auto">
            <!-- Close -->
            <button id="closeSocialShareBtn" class="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <!-- Header -->
            <div class="text-center mb-4">
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                    ⚡ Share Your Breakthrough
                </div>
                <h3 class="text-xl sm:text-2xl font-bold tracking-tight">Viral Session Card</h3>
                <p class="text-xs sm:text-sm text-gray-400 mt-1">Export your clinical efficacy proof to Icebreaker or major social platforms.</p>
            </div>

            <!-- Aspect Ratio Toggle -->
            <div class="flex justify-center gap-2 mb-4 bg-white/5 p-1 rounded-xl border border-white/10 max-w-xs mx-auto">
                <button id="toggleStoryBtn" class="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors bg-[var(--accent)] text-black font-bold">
                    📱 9:16 Story
                </button>
                <button id="toggleFeedBtn" class="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors text-gray-400 hover:text-white">
                    🔲 1:1 Feed
                </button>
            </div>

            <!-- Preview Canvas Area -->
            <div class="flex justify-center mb-4">
                <div class="relative rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-black/60 flex items-center justify-center p-2 max-h-[380px]">
                    <img id="socialCardPreviewImg" class="max-h-[360px] object-contain rounded-xl" alt="Session Efficacy Card Preview" />
                    <div id="socialCardLoading" class="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center text-xs text-cyan-300">
                        Rendering high-res card...
                    </div>
                </div>
            </div>

            <!-- Social Action Buttons -->
            <div class="space-y-2.5">
                <!-- SentAIent Icebreaker Platform (Primary) -->
                <button id="shareIcebreakerBtn" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition-all">
                    <span>🧊</span>
                    <span>Post Check-in to Icebreaker Social</span>
                    <span class="text-[10px] uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full ml-1 font-semibold">SentAIent App</span>
                </button>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <!-- Instagram Stories -->
                    <button id="shareInstagramBtn" class="py-2.5 px-3 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:brightness-110 text-white font-medium text-xs flex flex-col items-center justify-center gap-1 transition-all">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        <span>Instagram</span>
                    </button>

                    <!-- LinkedIn -->
                    <button id="shareLinkedInBtn" class="py-2.5 px-3 rounded-xl bg-[#0077b5] hover:brightness-110 text-white font-medium text-xs flex flex-col items-center justify-center gap-1 transition-all">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        <span>LinkedIn</span>
                    </button>

                    <!-- X (Twitter) -->
                    <button id="shareXBtn" class="py-2.5 px-3 rounded-xl bg-black border border-white/20 hover:bg-white/10 text-white font-medium text-xs flex flex-col items-center justify-center gap-1 transition-all">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        <span>X (Twitter)</span>
                    </button>

                    <!-- WhatsApp / Messenger -->
                    <button id="shareWhatsAppBtn" class="py-2.5 px-3 rounded-xl bg-[#25D366] hover:brightness-110 text-white font-medium text-xs flex flex-col items-center justify-center gap-1 transition-all">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                        <span>WhatsApp</span>
                    </button>
                </div>

                <!-- Utilities: Copy Image & Download -->
                <div class="flex gap-2 pt-1">
                    <button id="copyImageBtn" class="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                        <svg class="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                        <span>Copy Image</span>
                    </button>
                    <button id="downloadImageBtn" class="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                        <svg class="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        <span>Download PNG</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Event wiring
    el.querySelector('#closeSocialShareBtn').addEventListener('click', closeSocialShareModal);
    
    // Toggle formats
    const storyBtn = el.querySelector('#toggleStoryBtn');
    const feedBtn = el.querySelector('#toggleFeedBtn');

    storyBtn.addEventListener('click', () => {
        currentFormat = 'story';
        storyBtn.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors bg-[var(--accent)] text-black font-bold';
        feedBtn.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors text-gray-400 hover:text-white';
        refreshCardPreview();
    });

    feedBtn.addEventListener('click', () => {
        currentFormat = 'feed';
        feedBtn.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors bg-[var(--accent)] text-black font-bold';
        storyBtn.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors text-gray-400 hover:text-white';
        refreshCardPreview();
    });

    // Share buttons
    el.querySelector('#shareIcebreakerBtn').addEventListener('click', () => {
        const ice = socialCardExporter.getIcebreakerShareUrl(activeMetrics);
        // Try native deep link first, fallback to web app
        window.location.href = ice.deepLink;
        setTimeout(() => {
            window.open(ice.webFallback, '_blank');
        }, 600);
        showToast("Opening Icebreaker social check-in...", "info");
    });

    el.querySelector('#shareInstagramBtn').addEventListener('click', async () => {
        if (currentBlob) {
            const shared = await socialCardExporter.shareViaWebShare(currentBlob, activeMetrics);
            if (!shared) {
                downloadCurrentCard();
                showToast("Card downloaded! Story asset ready for Instagram.", "success");
            }
        }
    });

    el.querySelector('#shareLinkedInBtn').addEventListener('click', () => {
        const li = socialCardExporter.getLinkedInShareUrl(activeMetrics);
        window.open(li, '_blank', 'width=600,height=600');
    });

    el.querySelector('#shareXBtn').addEventListener('click', () => {
        const xUrl = socialCardExporter.getXShareUrl(activeMetrics);
        window.open(xUrl, '_blank', 'width=600,height=500');
    });

    el.querySelector('#shareWhatsAppBtn').addEventListener('click', () => {
        const wa = socialCardExporter.getWhatsAppShareUrl(activeMetrics);
        window.open(wa, '_blank');
    });

    el.querySelector('#copyImageBtn').addEventListener('click', async () => {
        if (currentBlob) {
            try {
                await socialCardExporter.copyImageToClipboard(currentBlob);
                showToast("High-res card copied to clipboard!", "success");
            } catch {
                downloadCurrentCard();
                showToast("Card downloaded!", "info");
            }
        }
    });

    el.querySelector('#downloadImageBtn').addEventListener('click', () => {
        downloadCurrentCard();
    });

    return el;
}

async function refreshCardPreview() {
    const loading = document.getElementById('socialCardLoading');
    const previewImg = document.getElementById('socialCardPreviewImg');
    if (loading) loading.style.display = 'flex';

    try {
        currentBlob = await socialCardExporter.generateBlob(activeMetrics, currentFormat);
        const dataUrl = URL.createObjectURL(currentBlob);
        if (previewImg) previewImg.src = dataUrl;
    } catch (err) {
        console.error('[SocialShareModal] Render failed:', err);
    } finally {
        if (loading) loading.style.display = 'none';
    }
}

function downloadCurrentCard() {
    if (!currentBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(currentBlob);
    a.download = `mindwave_efficacy_${currentFormat}_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Downloaded session card!", "success");
}
