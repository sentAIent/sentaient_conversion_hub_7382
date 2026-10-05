import React from 'react';
import VerificationDashboard from '@/components/verification/VerificationDashboard';

export const metadata = {
  title: 'Data Verification | Fantasy Quant',
  description: 'Side-by-side data verification for fantasy football projections.',
};

export default function VerificationPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-200 p-6 font-mono selection:bg-white selection:text-black">
      <VerificationDashboard />
    </main>
  );
}
