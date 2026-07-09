import Link from "next/link";
import Image from "next/image";
import logoImg from "../../public/logo.png";

const bullets = [
  {
    icon: "🎯",
    heading: "Bounty Management",
    items: [
      "Create performance-based reward campaigns for UGC influencers",
      "Set per-bounty spending caps and monitor total budget vs. burn",
      "Stripe-powered checkout — fund bounties securely, no manual invoicing",
    ],
  },
  {
    icon: "📣",
    heading: "Campaign Hub",
    items: [
      "Launch Swarm Campaigns that geo-trigger group events at your venue",
      "Offer dynamic discounts that unlock when enough users check in together",
      "Monitor campaign reach, active bounties, and total claims from one dashboard",
    ],
  },
  {
    icon: "🏪",
    heading: "Storefront Builder",
    items: [
      "List products and services directly to an engaged local audience",
      "Manage your entire physical storefront presence from one clean portal",
      "Connect your brand with thousands of users in your exact target market",
    ],
  },
  {
    icon: "💰",
    heading: "Wallet & Analytics",
    items: [
      "Track impression analytics — reach, active bounties, and claims at a glance",
      "Full budget controls with real-time spend visibility per campaign",
      "DAU/MAU and engagement telemetry tied directly to your campaigns",
    ],
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 backdrop-blur-sm sticky top-0 z-30 bg-black/80">
        <div className="flex items-center gap-3">
          <Image
            src={logoImg}
            alt="Icebreaker logo"
            width={36}
            height={36}
            className="rounded-xl"
            priority
          />
          <span className="text-xl font-bold tracking-tight">Icebreaker Business</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
          >
            Go to Dashboard
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden">
        {/* Semi-transparent hero logo watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src={logoImg}
            alt=""
            width={560}
            height={560}
            className="opacity-[0.06]"
            priority
          />
        </div>

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(0,255,204,0.07) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/10 text-[#00ffcc] text-sm font-semibold mb-8 tracking-wide">
            🐝 Hyper-Local Commerce Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-6 leading-[1.1]">
            Drive hyper-local<br />demand on command.
          </h1>

          <p className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            Icebreaker Business connects your venue or brand with thousands in your exact target market. Run Swarm Campaigns, post Bounties to reward UGC influencers, and manage your Storefront — all
            from one powerful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Launch Campaign
            </Link>
            <Link
              href="/dashboard/storefront"
              className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors"
            >
              Manage Storefront
            </Link>
          </div>
        </div>
      </section>

      {/* Marketing bullets */}
      <section className="px-6 pb-24 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bullets.map((section) => (
            <div
              key={section.heading}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-xl font-bold text-white">{section.heading}</h2>
              </div>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#00ffcc] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="border-t border-white/10 py-8 px-8 flex items-center justify-between text-white/40 text-sm">
        <div className="flex items-center gap-2">
          <Image src={logoImg} alt="Icebreaker" width={20} height={20} className="opacity-60" />
          <span>© 2025 Icebreaker Business</span>
        </div>
        <Link href="/dashboard" className="text-[#00ffcc] hover:opacity-80 font-medium transition-opacity">
          Go to Dashboard →
        </Link>
      </footer>
    </div>
  );
}
