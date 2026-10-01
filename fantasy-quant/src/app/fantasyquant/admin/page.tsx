'use client';

import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Users, CreditCard, CheckCircle, Activity, Search } from '@/components/icons';
import { createClient } from '@/utils/supabase/client';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const supabase = createClient();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCheckingAuth(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();
        
      if (data?.is_admin) {
        setIsAdmin(true);
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingAuth(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, updates: any) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });
      const data = await res.json();
      if (data.user) {
        setUsers(users.map(u => u.id === id ? { ...u, ...data.user } : u));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <Activity className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex flex-col items-center justify-center text-center p-8">
        <ShieldAlert size={64} className="text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-slate-400 max-w-md">You do not have administrator privileges to view this page. Please contact a system administrator.</p>
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 p-8 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight flex items-center gap-3">
              <Shield className="text-indigo-400" size={32} />
              Command Center
            </h1>
            <p className="text-slate-400">System management, user administration, and platform metrics.</p>
          </div>
        </header>

        {/* Metrics Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
              <Users size={18} />
              <h3 className="text-sm font-semibold uppercase tracking-widest">Total Users</h3>
            </div>
            <div className="text-3xl font-bold text-white">{users.length}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
              <CreditCard size={18} />
              <h3 className="text-sm font-semibold uppercase tracking-widest">Premium Subscribers</h3>
            </div>
            <div className="text-3xl font-bold text-emerald-400">
              {users.filter(u => u.subscription_tier === 'premium' || u.subscription_tier === 'pro').length}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
              <Activity size={18} />
              <h3 className="text-sm font-semibold uppercase tracking-widest">System Status</h3>
            </div>
            <div className="text-3xl font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle size={24} /> Optimal
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-xl font-bold text-white">User Directory</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Search email or ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-black/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 w-64"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-widest">
                  <th className="px-6 py-4 font-medium">User Details</th>
                  <th className="px-6 py-4 font-medium">Joined</th>
                  <th className="px-6 py-4 font-medium">Subscription Tier</th>
                  <th className="px-6 py-4 font-medium">Admin Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      <Activity className="animate-spin mx-auto mb-2" size={24} />
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      No users found matching "{searchTerm}"
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-white">{user.email}</div>
                        <div className="text-xs text-slate-500 font-mono mt-1">{user.id}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.subscription_tier || 'free'}
                          onChange={(e) => updateUser(user.id, { tier: e.target.value })}
                          className={`text-xs font-bold uppercase tracking-wider rounded-md px-3 py-1.5 border appearance-none cursor-pointer focus:outline-none transition-colors ${
                            user.subscription_tier === 'premium' ? 'bg-indigo-900/40 text-indigo-400 border-indigo-500/30' :
                            user.subscription_tier === 'pro' ? 'bg-fuchsia-900/40 text-fuchsia-400 border-fuchsia-500/30' :
                            'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          <option value="free">Free</option>
                          <option value="premium">Premium</option>
                          <option value="pro">Pro</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => updateUser(user.id, { isAdmin: !user.is_admin })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${user.is_admin ? 'bg-indigo-500' : 'bg-slate-700'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.is_admin ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
