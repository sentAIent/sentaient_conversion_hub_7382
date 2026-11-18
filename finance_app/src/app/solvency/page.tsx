'use client';

import React from 'react';
import SolvencyProofView from '@/components/SolvencyProofView';

export default function SolvencyPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <SolvencyProofView />
      </div>
    </div>
  );
}
