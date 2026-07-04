'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWorkspace } from '@/components/providers/WorkspaceProvider';

export default function Sidebar() {
  const pathname = usePathname();
  const { activeWorkspace, setActiveWorkspace } = useWorkspace();

  const links = [
    { name: 'Brands', href: '/brands', icon: '🏢' },
    { name: 'Studio', href: '/studio', icon: '🎨' },
    { name: 'Library', href: '/library', icon: '📚' },
    { name: 'Queue', href: '/queue', icon: '⏳' },
    { name: 'Analytics', href: '/analytics', icon: '📈' },
  ];

  return (
    <div className="w-64 h-full bg-[#1a202c]/80 backdrop-blur-2xl border-r border-white/10 flex flex-col p-6 text-white shrink-0 shadow-2xl relative z-50">
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold tracking-tighter text-[#60a9ff] drop-shadow-sm flex items-center gap-2">
          <span>SentAIent</span>
        </h1>
        <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mt-1">Marketing Hub</p>
      </div>

      <div className="mb-8">
        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3 block">Active Workspace</label>
        <select 
          value={activeWorkspace}
          onChange={(e) => setActiveWorkspace(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-gray-300 focus:ring-2 focus:ring-[#60a9ff] outline-none"
        >
          <option value="cloveh2o" className="bg-[#202733]">CloveH2O Global</option>
          <option value="mindwave" className="bg-[#202733]">Mindwave Official</option>
          <option value="sentaient" className="bg-[#202733]">SentAIent Demo</option>
        </select>
      </div>

      <nav className="flex-1 space-y-2">
        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3 block">Navigation</label>
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive 
                  ? 'bg-[#60a9ff]/20 text-[#60a9ff] shadow-inner border border-[#60a9ff]/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#60a9ff] to-purple-500 flex items-center justify-center font-bold shadow-lg">
            A
          </div>
          <div>
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-gray-400">Marketing Lead</p>
          </div>
        </div>
      </div>
    </div>
  );
}
