import JarvisChat from '@/components/chat/JarvisChat'

export const metadata = {
  title: 'J.A.R.V.I.S. Analytics Engine',
  description: 'AI-driven quantitative fantasy football analytics',
}

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <main className="flex-1 flex flex-col items-center p-4 sm:p-8">
        <header className="w-full max-w-5xl flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-emerald-500">◆</span> J.A.R.V.I.S.
            </h1>
            <p className="text-gray-400 text-sm mt-1">Quantitative Analytics Engine</p>
          </div>
        </header>
        
        <div className="w-full max-w-5xl flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <JarvisChat />
        </div>
      </main>
    </div>
  )
}
