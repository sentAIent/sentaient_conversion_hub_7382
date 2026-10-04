import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { JailbreakRootDetection } from 'capacitor-jailbreak-root-detection';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export function useSecurityCheck() {
  useEffect(() => {
    const performChecks = async () => {
      if (!Capacitor.isNativePlatform()) return;

      try {
        // 1. Check for Root / Jailbreak
        const result = await JailbreakRootDetection.isJailbrokenOrRooted();
        if (result.isJailbrokenOrRooted) {
          console.error("CRITICAL: Device is rooted or jailbroken. App is locking down.");
          // In a real app, you would block the UI or exit
          alert("Security Violation: This app cannot run on rooted/jailbroken devices.");
          // Native exit could be triggered here or throw fatal error
          throw new Error("Security Violation: Rooted Device");
        }

        // 2. Setup Secure Storage
        // We ensure we can read/write to the encrypted keychain/keystore
        await SecureStoragePlugin.set({ key: 'security_audit', value: 'passed' });
        const audit = await SecureStoragePlugin.get({ key: 'security_audit' });
        if (audit.value !== 'passed') {
           throw new Error("Secure Storage unavailable");
        }
      } catch (err) {
        console.error("Security checks failed", err);
      }
    };

    performChecks();
  }, []);
}
