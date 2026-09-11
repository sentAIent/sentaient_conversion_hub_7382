import { useRouter } from 'expo-router';
import { useCallback } from 'react';

/**
 * A custom hook that provides a safe back navigation.
 * If the router cannot go back (e.g. deep linked directly to a screen),
 * it routes to a fallback path instead of crashing or doing nothing.
 */
export function useSafeBack(fallbackRoute: string = '/(tabs)/feed') {
  const router = useRouter();

  const safeBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(fallbackRoute as any);
    }
  }, [router, fallbackRoute]);

  return safeBack;
}
