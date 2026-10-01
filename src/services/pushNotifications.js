import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export const registerForPushNotifications = async () => {
    if (Capacitor.isNativePlatform()) {
        try {
            // Request permissions
            const permStatus = await PushNotifications.requestPermissions();
            if (permStatus.receive === 'granted') {
                // Register with Apple/Google to receive token
                await PushNotifications.register();
            } else {
                console.warn('Push notification permission denied');
            }

            // On success, we should be able to receive notifications
            PushNotifications.addListener('registration', async (token) => {
                console.log('Push registration success, token: ' + token.value);
                // Send the token to the Supabase backend
                const userId = localStorage.getItem('guest_user_id') || (window.supabase?.auth?.user?.()?.id);
                if (userId && window.supabase) {
                    try {
                        await window.supabase
                            .from('profiles')
                            .update({ fcm_token: token.value })
                            .eq('id', userId);
                        console.log('FCM token synced to Supabase profile');
                    } catch (e) {
                        console.error('Failed to sync FCM token:', e);
                    }
                }
            });

            PushNotifications.addListener('registrationError', (error) => {
                console.error('Error on push registration: ', error);
            });

            PushNotifications.addListener('pushNotificationReceived', (notification) => {
                console.log('Push received: ', notification);
            });

            PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
                console.log('Push action performed: ', notification);
            });
        } catch (error) {
            console.error('Push notification registration failed', error);
        }
    } else {
        console.log('Push notifications are only available on native mobile platforms.');
    }
};
