"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Swarm Campaigns', href: '/dashboard/campaigns', icon: '🐝' },
    { name: 'Bounties', href: '/dashboard/bounties/new', icon: '💰' },
    { name: 'Storefront', href: '/dashboard/storefront', icon: '🏪' },
    { name: 'Wallet', href: '/dashboard/wallet', icon: '💳' },
  ];

  return (
    <aside className="w-64 border-r border-white/10 flex flex-col bg-black">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#00ffcc] to-[#3b82f6]" />
          <span className="font-bold">Icebreaker Business</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
                className={`flex items-center px-4 py-3 mb-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/5 rounded-lg transition-colors font-medium">
          Log out
        </button>
      </div>
    </aside>
  );
}
