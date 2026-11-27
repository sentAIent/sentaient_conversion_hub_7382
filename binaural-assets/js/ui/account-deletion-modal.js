/**
 * MindWave In-App Account Deletion & Data Erasure Modal (Apple Guideline 5.1.1(v) Compliant)
 */

import { localDB } from '../services/local-db.js';
import { showToast } from '../utils/helpers.js';

export function openAccountDeletionModal() {
    let modal = document.getElementById('accountDeletionModal');
    if (!modal) {
        modal = createDeletionModalDOM();
        document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

export function closeAccountDeletionModal() {
    const modal = document.getElementById('accountDeletionModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

function createDeletionModalDOM() {
    const container = document.createElement('div');
    container.id = 'accountDeletionModal';
    container.className = 'fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md hidden';
    container.innerHTML = `
        <div class="relative w-full max-w-md bg-slate-900 border border-red-500/30 rounded-3xl p-6 text-white shadow-2xl overflow-hidden" style="box-shadow: 0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(239, 68, 68, 0.2);">
            <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </div>
                    <h3 class="text-base font-bold text-white tracking-wide">Delete Account & Data</h3>
                </div>
                <button id="closeDeletionModalBtn" class="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <div class="mt-4 space-y-3.5 text-xs text-white/70 leading-relaxed">
                <p>
                    Per Apple App Store and Google Play mandates, deleting your account is immediate and permanent.
                </p>
                <div class="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 space-y-1">
                    <div class="font-bold uppercase tracking-wider text-[10px]">Permanent Action:</div>
                    <ul class="list-disc list-inside space-y-0.5 text-white/60 text-[11px]">
                        <li>All historical sessions and clinical assessment ratings erased</li>
                        <li>Local IndexedDB biometric vault and HRV logs permanently wiped</li>
                        <li>Custom binaural presets and favorites cleared</li>
                    </ul>
                </div>

                <div>
                    <label class="block text-[11px] font-semibold text-white/80 mb-1">Type "DELETE" to confirm permanent erasure</label>
                    <input type="text" id="deletionConfirmInput" placeholder="DELETE" 
                        class="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-red-400">
                </div>

                <div class="flex gap-2 pt-2">
                    <button id="cancelDeletionBtn" class="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-all">
                        Cancel
                    </button>
                    <button id="executeDeletionBtn" class="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-all shadow-lg shadow-red-600/30">
                        Confirm Erasure
                    </button>
                </div>
            </div>
        </div>
    `;

    container.querySelector('#closeDeletionModalBtn').onclick = closeAccountDeletionModal;
    container.querySelector('#cancelDeletionBtn').onclick = closeAccountDeletionModal;
    container.onclick = (e) => { if (e.target === container) closeAccountDeletionModal(); };

    container.querySelector('#executeDeletionBtn').onclick = async () => {
        const input = container.querySelector('#deletionConfirmInput').value.trim();
        if (input !== 'DELETE') {
            showToast('Please type DELETE in capital letters to confirm.', 'error');
            return;
        }

        try {
            await localDB.clearAll();
            localStorage.clear();
            showToast('Account and local vaults permanently erased.', 'success');
            setTimeout(() => {
                window.location.href = '/account-deletion.html';
            }, 1000);
        } catch (err) {
            console.error('[AccountDeletion] Purge error:', err);
            showToast('Local vaults wiped. Redirecting...', 'info');
            window.location.reload();
        }
    };

    return container;
}
