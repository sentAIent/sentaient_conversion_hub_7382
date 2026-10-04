'use client';
import dynamic from 'next/dynamic';

const SphinxMap = dynamic(() => import('@/components/SphinxMap'), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-mono text-2xl">BOOTING MAP ENGINE...</div>
});

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <SphinxMap />
    </main>
  );
}
