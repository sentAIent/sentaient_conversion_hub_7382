import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, password, username) {
        return createUserWithEmailAndPassword(auth, email, password).then((result) => {
            // Create comprehensive user profile in Firestore
            return setDoc(doc(db, "users", result.user.uid), {
                // Identity
                username: username,
                email: email,
                displayName: username,

                // Currency
                aetherCredits: 1000, // Starting bonus credits
                totalCreditsEarned: 0,
                totalCreditsSpent: 0,

                // Upgrades (1-10 levels)
                upgrades: {
                    thruster: 1,    // Speed upgrade
                    armor: 1,       // Hull health upgrade
                    shield: 1,      // Shield capacity upgrade
                    weapon: 1,      // Weapon damage upgrade
                    scanner: 1,     // Radar range upgrade
                    collector: 1    // Credit collection radius upgrade
                },

                // Subscription
                subscription: {
                    isProPilot: false,
                    planId: null,
                    startDate: null,
                    endDate: null,
                    monthlyCreditsGranted: null  // Track last credit grant date
                },

                // Gameplay Stats (for AI Readiness Score)
                stats: {
                    totalPlayTime: 0,       // Minutes
                    gemsCollected: 0,
                    hazardsAvoided: 0,
                    missionsCompleted: 0,
                    upgradesUnlocked: 0,
                    highScore: 0
                },

                // Ship Configuration
                shipConfig: {
                    selectedShip: 'default',
                    unlockedShips: ['default'],
                    selectedSkin: 'default',
                    unlockedSkins: ['default']
                },

                // Timestamps
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                lastSaved: null
            }).then(() => {
                return updateProfile(result.user, { displayName: username });
            });
        });
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Fetch additional data from Firestore
                    const userDocPromise = getDoc(doc(db, "users", user.uid));
                    const subDocPromise = getDoc(doc(db, "subscriptions", user.uid));

                    const [userDoc, subDoc] = await Promise.all([userDocPromise, subDocPromise]);
                    
                    const userData = userDoc.exists() ? userDoc.data() : {};
                    const subData = subDoc.exists() ? subDoc.data() : {};
                    
                    // Merge subscription data to ensure we have the 'lifetime' or 'plan' tier 
                    // accessible directly on currentUser object
                    const mergedSubscription = {
                        ...(userData.subscription || {}),
                        ...subData
                    };

                    const isLifetime = mergedSubscription.plan === 'lifetime' || 
                                       mergedSubscription.planId === 'lifetime' || 
                                       mergedSubscription.isProPilot === true;

                    if (isLifetime) {
                        localStorage.setItem('sentaient_lifetime_access', 'true');
                    } else {
                        localStorage.removeItem('sentaient_lifetime_access');
                    }

                    setCurrentUser({ 
                        ...user, 
                        ...userData,
                        subscription: mergedSubscription
                    });
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    setCurrentUser(user);
                    localStorage.removeItem('sentaient_lifetime_access');
                }
            } else {
                setCurrentUser(null);
                localStorage.removeItem('sentaient_lifetime_access');
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
