import { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL } from "../services/firebase.js";

export function initSocialScheduler() {
    const modal = document.getElementById('socialSchedulerModal');
    const openBtn = document.getElementById('scheduleSocialBtn');
    const closeBtn = document.getElementById('closeSchedulerBtn');
    const cancelBtn = document.getElementById('cancelScheduleBtn');
    const confirmBtn = document.getElementById('confirmScheduleBtn');

    if (!modal || !openBtn) {
        console.warn('[Social Scheduler] Missing DOM elements');
        return;
    }

    // Open Modal
    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        
        // Default to +2 hours from now
        const now = new Date();
        now.setHours(now.getHours() + 2);
        now.setMinutes(0);
        
        const tzOffset = now.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(now - tzOffset)).toISOString().slice(0, 16);
        document.getElementById('scheduleTime').value = localISOTime;
    });

    // Close Modal
    const closeModal = () => modal.classList.add('hidden');
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Confirm Schedule
    confirmBtn.addEventListener('click', async () => {
        const type = document.getElementById('exportTypeVideo').classList.contains('active') ? 'video' : 'snapshot';
        const duration = parseInt(document.getElementById('exportDuration').value) || 15;
        const includeWatermark = document.getElementById('includeWatermark').checked;
        
        const platforms = Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(cb => cb.value);
        const caption = document.getElementById('postCaption').value;
        const scheduleTime = document.getElementById('scheduleTime').value;

        if (platforms.length === 0) {
            alert('Please select at least one platform.');
            return;
        }
        if (!scheduleTime) {
            alert('Please select a schedule time.');
            return;
        }

        const viz = window.getVisualizer ? window.getVisualizer() : null;
        if (!viz) {
            alert('Visualizer not ready.');
            return;
        }

        // Setup loading state on button
        const originalText = confirmBtn.innerHTML;
        confirmBtn.innerHTML = '<div class="spinner border-t-white w-4 h-4 rounded-full border-2 border-transparent animate-spin"></div><span>Exporting...</span>';
        confirmBtn.disabled = true;

        try {
            // 1. Export Media
            let blob = null;
            let ext = '';
            if (type === 'video') {
                if (!viz.exportVideo) throw new Error("exportVideo not implemented in Visualizer");
                blob = await viz.exportVideo(duration, includeWatermark);
                ext = 'webm';
            } else {
                if (!viz.exportSnapshot) throw new Error("exportSnapshot not implemented in Visualizer");
                blob = await viz.exportSnapshot(includeWatermark);
                ext = 'png';
            }

            confirmBtn.innerHTML = '<div class="spinner border-t-white w-4 h-4 rounded-full border-2 border-transparent animate-spin"></div><span>Uploading...</span>';

            // 2. Upload to Firebase Storage
            if (!storage) throw new Error("Firebase Storage not initialized (Mock Mode)");
            if (!db) throw new Error("Firestore not initialized (Mock Mode)");
            
            const filename = `scheduled_media/${Date.now()}_export.${ext}`;
            const storageRef = ref(storage, filename);
            
            await uploadBytes(storageRef, blob);
            const downloadUrl = await getDownloadURL(storageRef);

            // 3. Save to Firestore
            confirmBtn.innerHTML = '<div class="spinner border-t-white w-4 h-4 rounded-full border-2 border-transparent animate-spin"></div><span>Scheduling...</span>';
            
            const scheduledDate = new Date(scheduleTime);
            
            await addDoc(collection(db, "scheduled_posts"), {
                userId: window.state?.currentUser?.uid || 'anonymous',
                mediaUrl: downloadUrl,
                mediaType: type,
                platforms: platforms,
                caption: caption,
                scheduledAt: scheduledDate.toISOString(),
                status: 'pending',
                createdAt: new Date().toISOString()
            });

            if (window.showToast) window.showToast('Post Scheduled Successfully!', 'success');
            closeModal();
            
        } catch (err) {
            console.error('[Social Scheduler] Error:', err);
            if (window.showToast) window.showToast('Failed to schedule post: ' + err.message, 'error');
            else alert('Error: ' + err.message);
        } finally {
            confirmBtn.innerHTML = originalText;
            confirmBtn.disabled = false;
        }
    });
}
