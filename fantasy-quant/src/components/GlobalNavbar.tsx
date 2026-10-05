'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GlobalNavbar() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Explorer', href: '/data-explorer' },
    { name: 'DFS', href: '/dfs' },
    { name: 'Coaching', href: '/coaching' },
    { name: 'SOS', href: '/sos' },
    { name: 'Analyst', href: '/analysis' },
    { name: 'Quant', href: '/quant-dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 w-full px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-lg mr-2">
            FQ.
          </Link>
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  pathname === link.href
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
