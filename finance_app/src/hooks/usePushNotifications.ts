import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";

export function usePushNotifications() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      checkPermissions();
    }
  }, []);

  const checkPermissions = async () => {
    try {
      const { receive } = await FirebaseMessaging.checkPermissions();
      if (receive === "granted") {
        setHasPermission(true);
        registerNotifications();
      }
    } catch (error) {
      console.error("Error checking FCM permissions", error);
    }
  };

  const requestPermissions = async () => {
    try {
      const { receive } = await FirebaseMessaging.requestPermissions();
      if (receive === "granted") {
        setHasPermission(true);
        registerNotifications();
      } else {
        alert("Push notification permission denied.");
      }
    } catch (error) {
      console.error("Error requesting FCM permissions", error);
    }
  };

  const registerNotifications = async () => {
    try {
      // Add listeners
      FirebaseMessaging.addListener("tokenReceived", (event) => {
        console.log("FCM Token:", event.token);
        setFcmToken(event.token);
        // In a real app, send this token to Supabase/backend to store it for the user
      });

      (FirebaseMessaging as any).addListener("notificationReceived", (notification: any) => {
        console.log("Push received:", notification);
      });

      // Register
      if (typeof (FirebaseMessaging as any).register === 'function') {
        await (FirebaseMessaging as any).register();
      }
    } catch (error) {
      console.error("Error registering FCM", error);
    }
  };

  return {
    fcmToken,
    hasPermission,
    requestPermissions,
  };
}
