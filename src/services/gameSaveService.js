/**
 * Game Save Service
 * Handles all Firestore persistence for game data
 */
import { db } from '../config/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

/**
 * Load user's game data from Firestore
 * @param {string} userId - Firebase user ID
 * @returns {Object} Game data including credits, upgrades, stats
 */
export async function loadGameData(userId) {
    if (!userId) throw new Error('User ID required');

    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
        throw new Error('User not found');
    }

    const data = userDoc.data();
    return {
        aetherCredits: data.aetherCredits || 0,
        upgrades: data.upgrades || {},
        stats: data.stats || {},
        shipConfig: data.shipConfig || {},
        subscription: data.subscription || {},
        lastSaved: data.lastSaved
    };
}

/**
 * Save game data to Firestore
 * @param {string} userId - Firebase user ID
 * @param {Object} gameData - Data to save
 */
export async function saveGameData(userId, gameData) {
    if (!userId) throw new Error('User ID required');

    const updateData = {
        lastSaved: new Date().toISOString()
    };

    // Only update fields that are provided
    if (gameData.aetherCredits !== undefined) {
        updateData.aetherCredits = gameData.aetherCredits;
    }
    if (gameData.upgrades) {
        updateData.upgrades = gameData.upgrades;
    }
    if (gameData.stats) {
        updateData.stats = gameData.stats;
    }
    if (gameData.shipConfig) {
        updateData.shipConfig = gameData.shipConfig;
    }

    await updateDoc(doc(db, "users", userId), updateData);
}

/**
 * Add credits to user's account
 * @param {string} userId - Firebase user ID
 * @param {number} amount - Credits to add
 */
export async function addCredits(userId, amount) {
    if (!userId) throw new Error('User ID required');

    await updateDoc(doc(db, "users", userId), {
        aetherCredits: increment(amount),
        totalCreditsEarned: increment(amount)
    });
}

/**
 * Spend credits from user's account
 * @param {string} userId - Firebase user ID
 * @param {number} amount - Credits to spend
 * @returns {boolean} Success
 */
export async function spendCredits(userId, amount) {
    if (!userId) throw new Error('User ID required');

    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) throw new Error('User not found');

    const currentCredits = userDoc.data().aetherCredits || 0;
    if (currentCredits < amount) {
        throw new Error('Insufficient credits');
    }

    await updateDoc(doc(db, "users", userId), {
        aetherCredits: increment(-amount),
        totalCreditsSpent: increment(amount)
    });

    return true;
}

/**
 * Purchase an upgrade
 * @param {string} userId - Firebase user ID
 * @param {string} upgradeId - Upgrade type
 * @param {number} cost - Cost in credits
 */
export async function purchaseUpgrade(userId, upgradeId, cost) {
    if (!userId) throw new Error('User ID required');

    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) throw new Error('User not found');

    const data = userDoc.data();
    const currentCredits = data.aetherCredits || 0;
    const currentLevel = data.upgrades?.[upgradeId] || 1;

    if (currentLevel >= 10) {
        throw new Error('Upgrade already at max level');
    }
    if (currentCredits < cost) {
        throw new Error('Insufficient credits');
    }

    await updateDoc(doc(db, "users", userId), {
        aetherCredits: increment(-cost),
        totalCreditsSpent: increment(cost),
        [`upgrades.${upgradeId}`]: currentLevel + 1,
        'stats.upgradesUnlocked': increment(1)
    });

    return currentLevel + 1;
}

/**
 * Update gameplay stats
 * @param {string} userId - Firebase user ID
 * @param {Object} statsUpdate - Stats to increment
 */
export async function updateStats(userId, statsUpdate) {
    if (!userId) throw new Error('User ID required');

    const updates = {};
    for (const [key, value] of Object.entries(statsUpdate)) {
        updates[`stats.${key}`] = increment(value);
    }

    await updateDoc(doc(db, "users", userId), updates);
}

/**
 * Grant Pro Pilot subscription
 * @param {string} userId - Firebase user ID
 * @param {string} planId - Stripe subscription ID
 */
export async function grantProPilot(userId, planId) {
    if (!userId) throw new Error('User ID required');

    const now = new Date();
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() + 1);

    await updateDoc(doc(db, "users", userId), {
        'subscription.isProPilot': true,
        'subscription.planId': planId,
        'subscription.startDate': now.toISOString(),
        'subscription.endDate': endDate.toISOString(),
        aetherCredits: increment(2000), // Monthly bonus credits
        'subscription.monthlyCreditsGranted': now.toISOString()
    });
}

/**
 * Revoke Pro Pilot subscription
 * @param {string} userId - Firebase user ID
 */
export async function revokeProPilot(userId) {
    if (!userId) throw new Error('User ID required');

    await updateDoc(doc(db, "users", userId), {
        'subscription.isProPilot': false,
        'subscription.endDate': new Date().toISOString()
    });
}

/**
 * Unlock a ship for subscriber
 * @param {string} userId - Firebase user ID
 * @param {string} shipId - Ship to unlock
 */
export async function unlockShip(userId, shipId) {
    if (!userId) throw new Error('User ID required');

    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) throw new Error('User not found');

    const ships = userDoc.data().shipConfig?.unlockedShips || ['default'];
    if (!ships.includes(shipId)) {
        ships.push(shipId);
        await updateDoc(doc(db, "users", userId), {
            'shipConfig.unlockedShips': ships
        });
    }
}

/**
 * Unlock a skin for subscriber
 * @param {string} userId - Firebase user ID
 * @param {string} skinId - Skin to unlock
 */
export async function unlockSkin(userId, skinId) {
    if (!userId) throw new Error('User ID required');

    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) throw new Error('User not found');

    const skins = userDoc.data().shipConfig?.unlockedSkins || ['default'];
    if (!skins.includes(skinId)) {
        skins.push(skinId);
        await updateDoc(doc(db, "users", userId), {
            'shipConfig.unlockedSkins': skins
        });
    }
}
