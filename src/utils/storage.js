import { Preferences } from '@capacitor/preferences';

/**
 * A secure storage utility wrapper for mobile and web.
 * On mobile, uses Capacitor Preferences which persists key/value pairs safely.
 * For highly sensitive data (e.g., raw passwords, though we use Firebase Auth so we don't store them),
 * consider adding @aparajita/capacitor-secure-storage later.
 */
export const secureStorage = {
  async set(key, value) {
    try {
      await Preferences.set({
        key,
        value: typeof value === 'string' ? value : JSON.stringify(value),
      });
      return true;
    } catch (err) {
      console.error(`Failed to set storage key ${key}:`, err);
      return false;
    }
  },

  async get(key) {
    try {
      const { value } = await Preferences.get({ key });
      if (!value) return null;
      try {
        return JSON.parse(value);
      } catch {
        return value; // It was a plain string
      }
    } catch (err) {
      console.error(`Failed to get storage key ${key}:`, err);
      return null;
    }
  },

  async remove(key) {
    try {
      await Preferences.remove({ key });
      return true;
    } catch (err) {
      console.error(`Failed to remove storage key ${key}:`, err);
      return false;
    }
  },

  async clear() {
    try {
      await Preferences.clear();
      return true;
    } catch (err) {
      console.error('Failed to clear secure storage:', err);
      return false;
    }
  }
};
