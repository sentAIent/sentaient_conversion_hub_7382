import { db } from './firebase.js';
import { doc, setDoc, getDoc, updateDoc, increment } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

const REF_KEY = 'mindwave_ref_code';
const INVITES_KEY = 'mindwave_invites_count';

export async function getInviteLink() {
    let refCode = localStorage.getItem(REF_KEY);
    
    if (!refCode) {
        // Generate a random 6 character code
        refCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        localStorage.setItem(REF_KEY, refCode);
        
        // Initialize in Firestore if possible
        try {
            if (db) {
                await setDoc(doc(db, "referrals", refCode), {
                    clicks: 0,
                    signups: 0,
                    createdAt: new Date()
                });
            }
        } catch (e) {
            console.warn("[Referral] Firebase not ready, storing locally.");
        }
    }
    
    return `https://mindwave.app/?ref=${refCode}`;
}

export async function processIncomingReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    
    if (ref) {
        console.log(`[Referral] Arrived via referral code: ${ref}`);
        // Only process if we haven't already counted this user
        if (!localStorage.getItem('mindwave_has_been_referred')) {
            localStorage.setItem('mindwave_has_been_referred', 'true');
            
            try {
                if (db) {
                    const refDoc = doc(db, "referrals", ref);
                    await updateDoc(refDoc, {
                        signups: increment(1)
                    });
                }
            } catch (e) {
                console.warn("[Referral] Could not update Firestore for referral.");
            }
            
            // Give the new user a welcome bonus (e.g. 1 day of premium)
            localStorage.setItem('mindwave_welcome_bonus', 'true');
        }
    }
}

export async function checkUnlockStatus() {
    let invites = parseInt(localStorage.getItem(INVITES_KEY) || '0');
    
    try {
        const refCode = localStorage.getItem(REF_KEY);
        if (refCode && db) {
            const snap = await getDoc(doc(db, "referrals", refCode));
            if (snap.exists()) {
                invites = snap.data().signups || 0;
                localStorage.setItem(INVITES_KEY, invites.toString());
            }
        }
    } catch (e) {
        console.warn("[Referral] Could not sync with Firestore.");
    }
    
    return {
        invites,
        unlocked: invites >= 3
    };
}
