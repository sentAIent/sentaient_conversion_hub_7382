import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

export const isBiometricEnrollmentAvailable = async (): Promise<boolean> => {
  if (Platform.OS === 'web') return false;
  
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) return false;

  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  return isEnrolled;
};

export const authenticateBiometrics = async (promptMessage: string = 'Authenticate to continue'): Promise<boolean> => {
  try {
    const isAvailable = await isBiometricEnrollmentAvailable();
    if (!isAvailable) {
      return false; // Fallback to normal flow if not available
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      fallbackLabel: 'Use Passcode',
      disableDeviceFallback: false,
    });

    return result.success;
  } catch (error) {
    console.error('Biometric authentication error:', error);
    return false;
  }
};
