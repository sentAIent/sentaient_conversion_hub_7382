import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Session Auth & CSRF Management
 * 
 * Handles secure token storage and CSRF header injections for API requests.
 */

const CSRF_HEADER_NAME = 'X-CSRF-Token';

export class SessionManager {
  /**
   * We store the JWT securely.
   * Note: For production, expo-secure-store should be used instead of AsyncStorage.
   * However, depending on the Expo bare workflow status, we default to AsyncStorage here as a placeholder.
   */
  static async storeToken(token: string): Promise<void> {
    await AsyncStorage.setItem('@auth_token', token);
  }

  static async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('@auth_token');
  }

  static async clearSession(): Promise<void> {
    await AsyncStorage.removeItem('@auth_token');
    await AsyncStorage.removeItem('@csrf_token');
  }

  static async storeCsrfToken(token: string): Promise<void> {
    await AsyncStorage.setItem('@csrf_token', token);
  }

  static async getCsrfToken(): Promise<string | null> {
    return await AsyncStorage.getItem('@csrf_token');
  }

  /**
   * Generates a fetch-compatible headers object with Auth and CSRF tokens injected.
   */
  static async getSecureHeaders(customHeaders: Record<string, string> = {}): Promise<Record<string, string>> {
    const token = await this.getToken();
    const csrfToken = await this.getCsrfToken();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...customHeaders
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (csrfToken && Platform.OS === 'web') {
      // CSRF is primarily a web-based attack vector, but we can enforce it strictly.
      headers[CSRF_HEADER_NAME] = csrfToken;
    }

    return headers;
  }
}
