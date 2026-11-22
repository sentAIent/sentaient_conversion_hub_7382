'use client';

import React from 'react';
import GlobalTaxView from '@/components/GlobalTaxView';

export default function GlobalTaxPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <GlobalTaxView />
      </div>
    </div>
  );
}
