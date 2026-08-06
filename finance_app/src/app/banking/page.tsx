"use client";

import { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Building2, ArrowRight, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export default function BankingPage() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate a link_token from your server when the component mounts
    const createLinkToken = async () => {
      try {
        const response = await fetch('/api/plaid/create-link-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientUserId: 'user-123' })
        });
        const data = await response.json();
        
        if (data.link_token) {
          setLinkToken(data.link_token);
        } else {
          console.error("Failed to fetch link token", data);
        }
      } catch (err) {
        console.error("Error creating link token:", err);
      } finally {
        setLoading(false);
      }
    };
    
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token: string, metadata: any) => {
    // Send the public_token to your server to exchange for an access_token
    console.log("Plaid Link Success. Metadata:", metadata);
    try {
      const response = await fetch('/api/plaid/exchange-public-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token }),
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Error exchanging token:", err);
    }
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Banking & Sync</h1>
        <p className="text-gray-500 mt-1">Connect your financial institutions to sync transactions automatically.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
            <Building2 className="w-8 h-8" />
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connect Your Bank</h2>
          <p className="text-gray-500 mb-8 max-w-sm">
            Liquid uses Plaid to securely connect to over 11,000 financial institutions globally.
          </p>

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Connection Successful</p>
                <p className="text-sm opacity-90">Transactions are now syncing to the ledger.</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => open()}
              disabled={!ready || !linkToken || loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><RefreshCw className="w-5 h-5 animate-spin" /> Preparing...</>
              ) : (
                <>Connect with Plaid <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          )}

          <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-gray-400">
            <ShieldCheck className="w-4 h-4" /> Secure, read-only access
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Accounts</h3>
          
          {isSuccess ? (
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Chase Checking</h4>
                  <p className="text-sm text-gray-500">****1234 • Syncs daily</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">$12,450.00</p>
                <span className="inline-block px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full mt-1">
                  Active
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
              No accounts connected yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
