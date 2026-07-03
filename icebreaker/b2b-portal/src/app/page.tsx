import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00ffcc] to-[#3b82f6]" />
          <span className="text-xl font-bold tracking-tight">Icebreaker Business</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/dashboard" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
            Go to Dashboard
          </Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6">
          Drive hyper-local demand on command.
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10">
          Icebreaker Business connects your venue or brand with thousands of users in your immediate vicinity. Run Swarm Campaigns, post Bounties, and manage your physical Storefront—all from one powerful dashboard.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/dashboard" className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold text-lg hover:opacity-90 transition-opacity">
            Launch Campaign
          </Link>
          <Link href="/storefront" className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors">
            Manage Storefront
          </Link>
        </div>
      </main>
    </div>
  );
}
