import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const triggerHapticLight = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch (e) {
    // Ignore on web if not supported
  }
};

export const triggerHapticMedium = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch (e) {
    // Ignore on web
  }
};

export const triggerHapticSuccess = async () => {
  try {
    await Haptics.notification({ type: 'SUCCESS' });
  } catch (e) {
    // Ignore on web
  }
};
