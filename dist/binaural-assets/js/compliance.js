/**
 * compliance.js
 * Handles the Global Compliance Onboarding Gate (Age Verification, Medical Disclaimer, Cookie Consent).
 */

export function initCompliance() {
    const complianceModal = document.getElementById('complianceModal');
    if (!complianceModal) return;

    // Check if user has already accepted the compliance gate
    const isCompliant = localStorage.getItem('mindwave_compliant');
    if (isCompliant) {
        // User already accepted. Setup analytics state based on their preference
        setupAnalytics();
        return;
    }

    // Show modal, freeze background
    complianceModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    
    // Optional: If you have an app wrapper that can be blurred
    const appWrapper = document.getElementById('appWrapper');
    if (appWrapper) appWrapper.style.filter = 'blur(10px)';

    const ageCheck = document.getElementById('complianceAge');
    const medCheck = document.getElementById('complianceMedical');
    const analyticsCheck = document.getElementById('complianceAnalytics');
    const acceptBtn = document.getElementById('complianceAcceptBtn');

    // Default analytics to true, user can uncheck it if they want
    analyticsCheck.checked = true;

    function validate() {
        if (ageCheck.checked && medCheck.checked) {
            acceptBtn.disabled = false;
            acceptBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            acceptBtn.classList.add('hover:bg-[var(--accent)]', 'hover:text-white', 'shadow-[0_0_15px_var(--accent-glow)]');
        } else {
            acceptBtn.disabled = true;
            acceptBtn.classList.add('opacity-50', 'cursor-not-allowed');
            acceptBtn.classList.remove('hover:bg-[var(--accent)]', 'hover:text-white', 'shadow-[0_0_15px_var(--accent-glow)]');
        }
    }

    ageCheck.addEventListener('change', validate);
    medCheck.addEventListener('change', validate);

    acceptBtn.addEventListener('click', () => {
        if (acceptBtn.disabled) return;

        // Save compliance state
        localStorage.setItem('mindwave_compliant', Date.now().toString());
        localStorage.setItem('mindwave_analytics_consent', analyticsCheck.checked ? 'true' : 'false');

        // Hide modal
        complianceModal.classList.add('fade-out');
        setTimeout(() => {
            complianceModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            if (appWrapper) appWrapper.style.filter = 'none';
        }, 300);

        // Apply analytics settings immediately
        setupAnalytics();
    });
}

function setupAnalytics() {
    const analyticsConsent = localStorage.getItem('mindwave_analytics_consent') === 'true';
    if (!analyticsConsent) {
        console.log('[Compliance] Analytics tracking disabled by user preference.');
        // Disable Firebase Analytics if window.firebaseAnalytics exists, etc.
        window.analyticsDisabled = true;
    } else {
        console.log('[Compliance] Analytics tracking enabled.');
        window.analyticsDisabled = false;
    }
}
