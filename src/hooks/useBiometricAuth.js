import { useState, useEffect } from 'react';
import { NativeBiometric } from 'capacitor-native-biometric';

export const useBiometricAuth = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [biometricType, setBiometricType] = useState(null);

    useEffect(() => {
        const checkAvailability = async () => {
            if (!window.Capacitor || !window.Capacitor.isNative) return;
            try {
                const result = await NativeBiometric.isAvailable();
                setIsAvailable(result.isAvailable);
                setBiometricType(result.biometryType);
            } catch (e) {
                console.error("Biometrics not available", e);
                setIsAvailable(false);
            }
        };
        checkAvailability();
    }, []);

    const authenticate = async (reason = "For security, please authenticate to continue") => {
        if (!isAvailable) {
            console.warn("Biometric authentication is not available on this device.");
            return false;
        }

        try {
            const verified = await NativeBiometric.verifyIdentity({
                reason: reason,
                title: "App Locked",
                subtitle: "Use biometrics to unlock",
                description: "Sentaient requires authentication to access your vault."
            });
            return true;
        } catch (e) {
            console.error("Biometric authentication failed:", e);
            return false;
        }
    };

    return {
        isAvailable,
        biometricType,
        authenticate
    };
};
