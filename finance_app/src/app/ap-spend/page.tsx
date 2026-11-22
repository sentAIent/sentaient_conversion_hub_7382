'use client';

import React from 'react';
import SpendAPView from '@/components/SpendAPView';

export default function SpendAPPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <SpendAPView />
      </div>
    </div>
  );
}
