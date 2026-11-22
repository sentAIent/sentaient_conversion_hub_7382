'use client';

import React from 'react';
import SafeMultiSigView from '@/components/SafeMultiSigView';

export default function SafeMultiSigPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <SafeMultiSigView />
      </div>
    </div>
  );
}
