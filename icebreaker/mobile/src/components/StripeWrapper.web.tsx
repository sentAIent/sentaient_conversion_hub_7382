import React from 'react';

export function StripeWrapper({ children }: { children: React.ReactNode }) {
  // Stripe React Native is not supported on web natively out of the box in this setup.
  // So we just render children.
  return <>{children}</>;
}

export const useStripe = () => {
  return {
    initPaymentSheet: async () => ({ error: { message: 'Not supported on Web' } }),
    presentPaymentSheet: async () => ({ error: { message: 'Not supported on Web' } }),
  };
};
