import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Share2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default async function SharedLineupPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { data: lineup, error } = await supabase
    .from('shared_lineups')
    .select('*, auth.users(email)')
    .eq('id', id)
    .single() as any;

  if (error || !lineup) {
    notFound();
  }

  const players = lineup.lineup_data;

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-sans flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30">
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/10 via-indigo-600/5 to-transparent rounded-full" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-600/10 via-emerald-600/5 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap className="text-white" size={20} />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">FantasyQuant</span>
        </div>

        <div className="bg-[#11141a]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Share2 size={18} className="text-indigo-400" />
                Shared Lineup
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Generated {new Date(lineup.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-emerald-400">{lineup.total_projected_pts.toFixed(2)}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Proj Points</div>
            </div>
          </div>

          <div className="p-2">
            {players.map((p: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 text-center font-bold text-gray-500 text-sm">{p.position}</div>
                  <div>
                    <div className="font-bold">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.team}</div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-6">
                  <div>
                    <div className="font-bold text-gray-300">${p.salary.toLocaleString()}</div>
                  </div>
                  <div className="w-16">
                    <div className="font-bold text-emerald-400">{p.projected_pts.toFixed(1)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <ShieldCheck size={16} className="text-indigo-400" />
              Verified 150-Max Engine
            </div>
            <div className="text-sm font-bold text-white">
              Total Salary: <span className="text-indigo-400">${lineup.total_salary.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-8 backdrop-blur-md">
          <h2 className="text-2xl font-black mb-2">Want to build lineups like this?</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Stop relying on gut feelings. Generate 150 mathematically perfect, +EV lineups instantly with FantasyQuant.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors">
            Start Dominating <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
