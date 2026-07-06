"use client";

import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { useState } from 'react';

const GET_WALLET = gql`
  query GetWallet {
    me {
      id
      wallet {
        balance
      }
    }
  }
`;

const CASH_OUT_WALLET = gql`
  mutation CashOutWallet($amount: Int!) {
    cashOutWallet(amount: $amount) {
      status
      message
      onboardingUrl
    }
  }
`;

export default function WalletPage() {
  const { data, loading: loadingWallet, refetch } = useQuery<any>(GET_WALLET);
  const [cashOut, { loading: loadingCashOut, error }] = useMutation<any, any>(CASH_OUT_WALLET);
  const [successMsg, setSuccessMsg] = useState('');

  const handleCashOut = async () => {
    setSuccessMsg('');
    try {
      const balance = data?.me?.wallet?.balance || 0;
      if (balance < 2000) {
        alert("Minimum cash out is $20.00");
        return;
      }

      const res = await cashOut({
        variables: { amount: balance }
      });

      const result = res.data.cashOutWallet;
      if (result.status === 'REQUIRES_ONBOARDING' && result.onboardingUrl) {
        // Redirect to Stripe Connect onboarding
        window.location.href = result.onboardingUrl;
      } else if (result.status === 'SUCCESS') {
        setSuccessMsg(result.message);
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loadingWallet) return <div className="p-8">Loading wallet...</div>;

  const balance = data?.me?.wallet?.balance || 0;
  const balanceUsd = (balance / 100).toFixed(2);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Business Wallet</h1>
      <p className="text-gray-400">Manage your earnings, storefront sales, and cash out securely via Stripe.</p>

      <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col items-center space-y-4">
        <h2 className="text-lg font-medium text-gray-300">Available Balance</h2>
        <div className="text-6xl font-black tracking-tighter text-[#00ffcc]">${balanceUsd}</div>
        
        {error && <div className="text-red-500 bg-red-500/10 px-4 py-2 rounded-lg">{error.message}</div>}
        {successMsg && <div className="text-green-400 bg-green-400/10 px-4 py-2 rounded-lg">{successMsg}</div>}

        <button 
          onClick={handleCashOut}
          disabled={loadingCashOut || balance < 2000}
          className="mt-6 bg-white text-black disabled:bg-white/20 disabled:text-white/50 hover:bg-gray-200 font-bold py-4 px-12 rounded-full transition-all"
        >
          {loadingCashOut ? 'Processing...' : 'Cash Out'}
        </button>
        {balance < 2000 && <p className="text-xs text-gray-500">Minimum cash out is $20.00</p>}
      </div>
    </div>
  );
}
