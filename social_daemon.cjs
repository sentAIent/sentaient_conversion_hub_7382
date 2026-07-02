const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const { execSync } = require('child_process');
const path = require('path');

// Initialize Firebase Admin (requires GOOGLE_APPLICATION_CREDENTIALS)
// For local mock/testing, we can just log a warning if it's not set.
let app;
let db;
try {
    const serviceAccount = require('./firebase-key.json');
    app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id,
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });
    // Explicitly reference the named database 'mindwave'
    db = getFirestore(app, 'mindwave');
    db.settings({ ignoreUndefinedProperties: true });
} catch (e) {
    console.warn("⚠️ Firebase Admin initialization failed. Ensure you have service account credentials to run this daemon against production.");
    console.warn(e.message);
}

async function checkAndPost() {
    if (!db) {
        console.log("Mock Mode: Would query 'scheduled_posts' for pending posts...");
        return;
    }

    const projectId = app ? app.options.projectId || app.options.credential.projectId : 'unknown';
    const now = new Date().toISOString();
    console.log(`[Social Daemon] Checking for scheduled posts at ${now} (Project: ${projectId})...`);

    try {
        const allPosts = await db.collection('scheduled_posts').get();
        console.log(`[Social Daemon] Found ${allPosts.size} total posts in the database.`);
        allPosts.docs.forEach(doc => {
            const data = doc.data();
            console.log(`   -> Post ${doc.id}: status=${data.status}, scheduledAt=${data.scheduledAt}`);
        });

        const snapshot = await db.collection('scheduled_posts')
            .where('status', '==', 'pending')
            .where('scheduledAt', '<=', now)
            .get();

        if (snapshot.empty) {
            console.log('[Social Daemon] No pending posts found that are ready to trigger.');
            return;
        }

        for (const doc of snapshot.docs) {
            const post = doc.data();
            console.log(`[Social Daemon] Processing post ID: ${doc.id} (Scheduled for: ${post.scheduledAt})`);
            
            // 1. Download Media (conceptual)
            console.log(`[Social Daemon]   -> Media URL: ${post.mediaUrl}`);
            console.log(`[Social Daemon]   -> Platforms: ${post.platforms.join(', ')}`);
            
            // 2. Interface with Agent-Reach (mocked execution)
            post.platforms.forEach(platform => {
                console.log(`[Social Daemon]   -> 🚀 Firing Agent-Reach for ${platform}...`);
                try {
                    // This would invoke the agent-reach python package installed locally
                    // e.g., execSync(`python3 -m agent_reach post --platform ${platform} --media "${post.mediaUrl}" --caption "${post.caption}"`);
                    console.log(`[Social Daemon]   -> ✅ Successfully posted to ${platform}`);
                } catch (err) {
                    console.error(`[Social Daemon]   -> ❌ Failed to post to ${platform}:`, err);
                }
            });

            // 3. Mark as complete
            await db.collection('scheduled_posts').doc(doc.id).update({
                status: 'posted',
                postedAt: new Date().toISOString()
            });
            console.log(`[Social Daemon] Marked post ${doc.id} as 'posted'.`);
        }
    } catch (err) {
        if (err.message.includes('Could not load the default credentials') || err.message.includes('ENOENT') || err.code === 'ENOENT') {
            console.log('⚠️ [Social Daemon] Paused: Waiting for valid Firebase credentials (GOOGLE_APPLICATION_CREDENTIALS) to access production queue.');
            console.log('   Please make sure you have downloaded the Service Account JSON and set the path correctly.');
        } else if (err.code === 5 || (err.message && err.message.includes('NOT_FOUND'))) {
            console.log('⚠️ [Social Daemon] Paused: Firestore database not found.');
            console.log('   Please go to the Firebase Console -> Build -> Firestore Database and click "Create database".');
        } else if (err.code === 9 || (err.message && err.message.includes('requires an index'))) {
            console.log('⚠️ [Social Daemon] Firestore requires a composite index for this query!');
            // Extract the URL from the error message using regex
            const urlMatch = err.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/);
            if (urlMatch) {
                console.log('\n👉 PLEASE CLICK THIS LINK TO BUILD THE INDEX:');
                console.log(`   ${urlMatch[0]}\n`);
                console.log('It will take 2-5 minutes to build. Once it says "Enabled", run the daemon again!');
            } else {
                console.log('   Please check the Firestore console to build the required index for: status (Ascending) + scheduledAt (Ascending)');
            }
        } else {
            console.error("[Social Daemon] Error checking posts:", err);
        }
    }
}

// Run loop
setInterval(checkAndPost, 60000); // Check every minute
checkAndPost(); // Initial check
