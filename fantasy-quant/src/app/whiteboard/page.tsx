'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

// Excalidraw doesn't support SSR
const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  { ssr: false }
);

export default function WhiteboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">DFS Lineup Maps</h1>
        <p className="text-white/60">
          Visualize correlations, map out stacks, and brainstorm your tournament strategy.
        </p>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-white">
        <Excalidraw theme="dark" />
      </div>
    </div>
  );
}
