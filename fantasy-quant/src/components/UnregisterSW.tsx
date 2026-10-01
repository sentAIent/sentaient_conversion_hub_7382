'use client';
import { useEffect } from 'react';

export default function UnregisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
          console.log('ServiceWorker unregistered successfully.');
        }
      }).catch(function(err) {
        console.log('ServiceWorker unregistration failed: ', err);
      });
    }
  }, []);
  return null;
}
