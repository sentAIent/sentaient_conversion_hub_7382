"use client";

import { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isLinked, setIsLinked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate a link token on mount
  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await fetch('/api/plaid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'create_link_token' })
        });
        const data = await response.json();
        if (data.link_token) {
          setLinkToken(data.link_token);
        }
      } catch (err) {
        console.error("Failed to fetch link token", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token: string, metadata: any) => {
    try {
      const response = await fetch('/api/plaid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'exchange_public_token', public_token })
      });
      const data = await response.json();
      if (data.success) {
        setIsLinked(true);
      }
    } catch (err) {
      console.error("Failed to exchange public token", err);
    }
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  if (isLinked) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Plaid Account Linked Successfully
      </div>
    );
  }

  return (
    <button 
      onClick={() => open()}
      disabled={!ready || isLoading || !linkToken}
      className={`bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-md transition-colors ${(!ready || isLoading || !linkToken) ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Loading Plaid...' : 'Link Bank Account'}
    </button>
  );
}
