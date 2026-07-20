"use client";

import { useState } from 'react';

export default function PlaidLinkButton() {
  const [isLinked, setIsLinked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const simulatePlaidLink = async () => {
    setIsLoading(true);
    
    // Simulate API call to fetch link token
    try {
      const response = await fetch('/api/plaid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_link_token' })
      });
      
      const data = await response.json();
      
      // Since this is a mock without real keys, we just simulate the success delay
      if (data.link_token === 'mock-link-token-123') {
        setTimeout(() => {
          setIsLinked(true);
          setIsLoading(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  if (isLinked) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Plaid Account Linked Successfully (Mock)
      </div>
    );
  }

  return (
    <button 
      onClick={simulatePlaidLink}
      disabled={isLoading}
      className={`bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-md transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Connecting to Plaid...' : 'Link Bank Account'}
    </button>
  );
}
