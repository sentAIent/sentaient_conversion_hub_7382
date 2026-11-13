class NativeIntegration {
    constructor() {
        this.isNative = !!(window.Capacitor && window.Capacitor.isNative);
        console.log("NativeIntegration init, isNative:", this.isNative);
        
        // TODO: REPLACE WITH YOUR ACTUAL REVENUECAT PUBLIC API KEYS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.revenueCatApiKey = isIOS ? 
            'YOUR_IOS_REVENUECAT_KEY' : 
            'YOUR_ANDROID_REVENUECAT_KEY';
            
        this.initMonetization();
        this.requestNotificationPermission();
    }

    async requestNotificationPermission() {
        if (!this.isNative) return;
        try {
            const { LocalNotifications } = capacitorExports;
            if (LocalNotifications) {
                await LocalNotifications.requestPermissions();
            }
        } catch (e) {
            console.warn("LocalNotifications permission error:", e);
        }
    }

    async triggerHaptic(style = 'LIGHT') {
        if (!this.isNative) return; // Fallback to navigator.vibrate is handled separately if needed, or we just rely on Capacitor
        try {
            const { Haptics, ImpactStyle } = capacitorExports;
            if (Haptics && ImpactStyle) {
                const impactStyle = ImpactStyle[style] || ImpactStyle.Light;
                await Haptics.impact({ style: impactStyle });
            }
        } catch (e) {
            console.warn("Haptics error:", e);
        }
    }

    async scheduleBackgroundNotification() {
        if (!this.isNative) return;
        try {
            const { LocalNotifications } = capacitorExports;
            if (LocalNotifications) {
                // Cancel pending
                const pending = await LocalNotifications.getPending();
                if (pending.notifications.length > 0) {
                    await LocalNotifications.cancel(pending);
                }
                
                // Schedule new one for 24 hours from now
                await LocalNotifications.schedule({
                    notifications: [
                        {
                            title: "Storage Full!",
                            body: "Your Space Base has reached maximum capacity. Collect your earnings!",
                            id: 1,
                            schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 24) },
                            sound: null,
                            attachments: null,
                            actionTypeId: "",
                            extra: null
                        }
                    ]
                });
                console.log("Scheduled offline push notification.");
            }
        } catch (e) {
            console.warn("LocalNotifications error:", e);
        }
    }

    async initMonetization() {
        if (!this.isNative) return;
        try {
            const { Purchases } = capacitorExports;
            if (Purchases) {
                await Purchases.configure({ apiKey: this.revenueCatApiKey });
                console.log("RevenueCat configured.");
            }
        } catch (e) {
            console.warn("RevenueCat init error:", e);
        }
    }

    async purchaseProduct(productId) {
        if (!this.isNative) {
            console.log("Mock purchase in browser for product:", productId);
            return true; // Mock success
        }
        try {
            const { Purchases } = capacitorExports;
            if (Purchases) {
                const result = await Purchases.purchaseStoreProduct({ productIdentifier: productId });
                console.log("Purchase result:", result);
                return true;
            }
        } catch (e) {
            if (e.code === 'PURCHASE_CANCELLED') {
                console.log("User cancelled purchase");
            } else {
                console.error("Purchase error:", e);
            }
            return false;
        }
        return false;
    }
}

// Since we are using standard script tags and not a bundler for the main game, 
// Capacitor plugins are generally available globally on window if compiled, or we can import them if we use modules.
// For now, we mock the capacitorExports object. In a real Capacitor setup, plugins are registered globally.
const capacitorExports = window.Capacitor ? window.Capacitor.Plugins : {};

window.nativeIntegration = new NativeIntegration();

// Bidirectional Bridge Listener for React HUD Overlays
window.addEventListener('message', (event) => {
    if (!event.data || !event.data.type) return;
    const { type } = event.data;
    
    if (type === 'SET_TIME_SCALE') {
        window.__timeScale = event.data.timeScale || 1.0;
        if (window.game) window.game.timeScale = window.__timeScale;
        console.log('[NativeBridge] Time scale set to:', window.__timeScale);
    } else if (type === 'TARGET_SUBSYSTEM') {
        window.__targetedSubsystem = event.data.subsystem;
        console.log('[NativeBridge] Targeted subsystem:', window.__targetedSubsystem);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`TARGET LOCKED: ${event.data.subsystem.toUpperCase()}`, 2000);
        }
    } else if (type === 'APPLY_LOADOUT') {
        console.log('[NativeBridge] Loadout applied:', event.data.loadout);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`SHIP LOADOUT EQUIPPED`, 2000);
        }
    } else if (type === 'ENGAGE_NEMESIS') {
        console.log('[NativeBridge] Engaging Nemesis Admiral:', event.data.admiral);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`HOSTILE ENCOUNTER: ${event.data.admiral?.name || 'UNKNOWN'}`, 3000);
        }
    } else if (type === 'START_TIME_TRIAL') {
        console.log('[NativeBridge] Starting Hyperspace Time Trial');
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`HYPERSPACE TRIAL INITIATED`, 3000);
        }
    } else if (type === 'CONTRIBUTE_FACTION') {
        console.log('[NativeBridge] Contributed to faction:', event.data.factionId, event.data.sectorId);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`SECTOR INFLUENCE CONTRIBUTED`, 2500);
        }
    } else if (type === 'APPLY_SHIP_AESTHETICS') {
        window.__shipAesthetics = event.data.aesthetics;
        console.log('[NativeBridge] Applied Ship Aesthetics Forge payload:', event.data.aesthetics);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`VANITY FORGE: ${event.data.aesthetics?.trail?.name || 'AESTHETICS'} EQUIPPED`, 2500);
        }
    } else if (type === 'DERELICT_BREACH_INITIATED') {
        console.log('[NativeBridge] Derelict Breach Initiated:', event.data.derelict);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`ANOMALY DETECTED: ${event.data.derelict?.name || 'DERELICT'}`, 3000);
        }
    } else if (type === 'CLAIM_DERELICT_SALVAGE') {
        console.log('[NativeBridge] Derelict Salvage Claimed:', event.data.loot);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`ANCIENT SALVAGE RECOVERED`, 3000);
        }
    } else if (type === 'WINGMAN_ORDER' || type === 'WINGMAN_VOICE_COMMAND') {
        console.log('[NativeBridge] Wingman Directive Received:', event.data);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`AI WINGMAN: ${event.data.orderId || 'DIRECTIVE ACKNOWLEDGED'}`, 2500);
        }
    } else if (type === 'APPLY_WEATHER_HAZARD') {
        window.__activeWeather = event.data.weather;
        console.log('[NativeBridge] Stellar Weather Hazard Applied:', event.data.weather);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`WEATHER ALERT: ${event.data.weather?.name || 'STELLAR HAZARD'}`, 3500);
        }
    } else if (type === 'SET_SHIELD_POLARIZATION') {
        window.__shieldPolarization = event.data.polarization;
        console.log('[NativeBridge] Shield Polarization calibrated to:', event.data.polarization);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`SHIELD POLARIZATION: ${event.data.polarization}`, 2000);
        }
    } else if (type === 'SET_NAV_WAYPOINT' || type === 'REGISTER_STAR_COORDINATES') {
        console.log('[NativeBridge] Galactic Waypoint Registered:', event.data);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`NAV WAYPOINT LOCKED: ${event.data.name || 'WAYPOINT'}`, 3000);
        }
    } else if (type === 'STRIKE_LEVIATHAN_WEAKPOINT') {
        console.log('[NativeBridge] Leviathan Weakpoint Struck:', event.data);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`LEVIATHAN HIT: -${event.data.damage?.toLocaleString()} DMG`, 2000);
        }
    } else if (type === 'HUNT_BOUNTY_TARGET') {
        console.log('[NativeBridge] Hunting Bounty Target:', event.data.target);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`HUNT CONTRACT ENGAGED: ${event.data.target?.name || 'TARGET'}`, 3500);
        }
    } else if (type === 'CLAIM_BOUNTY_REWARD') {
        console.log('[NativeBridge] Bounty Reward Claimed:', event.data.reward);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`BOUNTY SECURED: +${event.data.reward} CREDITS`, 3000);
        }
    } else if (type === 'INITIATE_PVP_STAKE_DUEL') {
        console.log('[NativeBridge] PvP Staked Escrow Duel Initiated:', event.data);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`PVP ESCROW LOCKED: ${event.data.stake?.totalPurse} PURSE`, 3500);
        }
    } else if (type === 'ONBOARD_VOICE_COMMAND') {
        console.log('[NativeBridge] Voice Copilot Action Executed:', event.data);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`VOICE PILOT: ${event.data.action}`, 2500);
        }
    } else if (type === 'ADVANCE_RIFT_SECTOR') {
        console.log('[NativeBridge] Advancing Rift Sector:', event.data.sector);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`RIFT SECTOR ${event.data.sector} ENGAGED (${event.data.multiplier}x)`, 3000);
        }
    } else if (type === 'EXTRACT_RIFT_LOOT') {
        console.log('[NativeBridge] Extracted Rift Shards:', event.data.shards);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`RIFT EXTRACTED: +${event.data.shards} SHARDS`, 3000);
        }
    } else if (type === 'COLLECT_DRONE_MINING_YIELD') {
        console.log('[NativeBridge] Drone Mining Cargo Bay Harvested:', event.data.amount);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`DRONE CARGO TRANSFERRED: +${event.data.amount} UNITS`, 2500);
        }
    } else if (type === 'CINEMATIC_TIME_FREEZE') {
        window.__timeScale = event.data.frozen ? 0.0 : 1.0;
        if (window.game) window.game.timeScale = window.__timeScale;
        console.log('[NativeBridge] Cinematic Time Freeze:', event.data.frozen);
    } else if (type === 'LOAD_CUSTOM_SECTOR_MISSION') {
        console.log('[NativeBridge] Custom Sector Mission Loaded:', event.data.seed, event.data.config);
        if (window.game && typeof window.game.showToast === 'function') {
            window.game.showToast(`WARPING TO SEED ${event.data.seed}`, 3500);
        }
    }
});
