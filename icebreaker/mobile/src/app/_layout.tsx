import React, { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, gql, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCache } from 'apollo3-cache-persist';
import { auth } from '../utils/firebase';
import { registerForPushNotificationsAsync } from '../utils/notifications';
import { ErrorBoundary } from '../components/ErrorBoundary';
import * as Linking from 'expo-linking';
import { ActivityIndicator, View } from 'react-native';
import { CartProvider } from '../context/CartContext';
import { StripeWrapper } from '../components/StripeWrapper';
import { InstallPrompt } from '../components/InstallPrompt';
import * as Sentry from '@sentry/react-native';
import { PostHogProvider } from 'posthog-react-native';

const posthogApiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY || 'phc_placeholder_key_for_mobile';
const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN || "https://examplePublicKey@o0.ingest.sentry.io/0",
  tracesSampleRate: 1.0,
});

const httpLink = createHttpLink({
  uri: __DEV__
    ? 'http://localhost:4000/graphql' // Local dev backend
    : 'https://icebreaker-b5u1.onrender.com/graphql', // Production backend
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      Sentry.captureException(new Error(`GraphQL Error: ${message}`));
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    Sentry.captureException(networkError);
    // In production, trigger a toast notification here
  }
});

const authLink = setContext(async (_, { headers }) => {
  const token = await auth.currentUser?.getIdToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
});

const UPDATE_PUSH_TOKEN = gql`
  mutation UpdatePushToken($token: String!) {
    updatePushToken(token: $token) {
      id
    }
  }
`;

export default function Layout() {
  const [clientReady, setClientReady] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const { path, queryParams } = Linking.parse(url);
      if (path?.startsWith('v/')) {
         // example: icebreaker://v/123 -> open video
         router.push(`/(tabs)/explore?videoId=${path.split('/')[1]}`);
      } else if (path?.startsWith('u/')) {
         // example: icebreaker://u/123 -> open profile
         router.push(`/user/${path.split('/')[1]}`);
      } else if (path?.startsWith('b/')) {
         // example: icebreaker://b/123 -> open bounty
         router.push(`/bounty/${path.split('/')[1]}`);
      }
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // Setup Apollo Cache Persistence
    persistCache({
      cache,
      storage: AsyncStorage,
      maxSize: 5242880, // 5MB
    }).then(() => {
      setClientReady(true);
    });

    // Auth State Listener
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
      if (user) {
        registerForPushNotificationsAsync().then(token => {
          if (token) {
            client.mutate({
              mutation: UPDATE_PUSH_TOKEN,
              variables: { token }
            }).catch(err => console.error("Error saving push token", err));
          }
        });
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (initializing) return;
    
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)/network');
    }
  }, [user, initializing, segments]);

  if (!clientReady || initializing) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <PostHogProvider apiKey={posthogApiKey} options={{ host: posthogHost }}>
        <InstallPrompt />
        <StripeWrapper>
          <ApolloProvider client={client}>
            <CartProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="schedule" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="rating" options={{ presentation: 'transparentModal', headerShown: false }} />
                <Stack.Screen name="cart" options={{ presentation: 'modal', headerShown: false }} />
              </Stack>
            </CartProvider>
          </ApolloProvider>
        </StripeWrapper>
      </PostHogProvider>
    </ErrorBoundary>
  );
}
