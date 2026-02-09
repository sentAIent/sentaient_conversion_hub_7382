/**
 * Social Proof System
 * Shows "Recent Purchase" toasts to increase conversion
 */

const NAMES = [
    "Sarah J.", "Michael K.", "David R.", "Jessica M.", "Alex T.",
    "Emily W.", "Chris B.", "Amanda L.", "Daniel H.", "Rachel P."
];

const LOCATIONS = [
    "from New York", "from London", "from California", "from Toronto",
    "from Berlin", "from Sydney", "from Texas", "from Paris"
];

const ACTIONS = [
    "joined Founders Club",
    "unlocked Lifetime Access",
    "started a deep focus session",
    "is meditating with Theta waves"
];

export function initSocialProof() {
    // Start loop
    scheduleNextToast();
}

function scheduleNextToast() {
    const delay = Math.random() * (60000 - 30000) + 30000; // 30-60 seconds
    setTimeout(() => {
        showToast();
        scheduleNextToast();
    }, delay);
}

function showToast() {
    // Don't show if user is busy (e.g. modal open)
    if (document.querySelector('.modal:not(.hidden)')) return;

    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const location = Math.random() > 0.3 ? LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)] : "";
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

    const toast = document.createElement('div');
    toast.className = 'social-proof-toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        background: rgba(15, 23, 42, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 12px 16px;
        border-radius: 12px;
        color: white;
        font-size: 13px;
        z-index: 50;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none; /* Let clicks pass through */
    `;

    toast.innerHTML = `
        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">👋</div>
        <div>
            <div style="font-weight: 600; color: #f1f5f9;">${name} ${location}</div>
            <div style="color: #94a3b8; font-size: 12px;">Just ${action}</div>
        </div>
    `;

    document.body.appendChild(toast);

    // Animate In
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    // Animate Out
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}
