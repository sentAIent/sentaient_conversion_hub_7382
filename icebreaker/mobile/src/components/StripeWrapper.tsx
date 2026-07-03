import React from 'react';
import { StripeProvider, useStripe as useStripeNative } from '@stripe/stripe-react-native';

export function StripeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StripeProvider publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
      {children}
    </StripeProvider>
  );
}

export const useStripe = useStripeNative;
