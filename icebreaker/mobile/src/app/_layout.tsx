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
import { ActivityIndicator, View } from 'react-native';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Local dev backend
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
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
    // Setup Apollo Cache Persistence
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => {
      setClientReady(true);
    });

    // Push Notifications
    registerForPushNotificationsAsync().then(token => {
      if (token && auth.currentUser) {
        client.mutate({
          mutation: UPDATE_PUSH_TOKEN,
          variables: { token }
        }).catch(err => console.error("Error saving push token", err));
      }
    });

    // Auth State Listener
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
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
      <ApolloProvider client={client}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="schedule" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="rating" options={{ presentation: 'transparentModal', headerShown: false }} />
        </Stack>
      </ApolloProvider>
    </ErrorBoundary>
  );
}
