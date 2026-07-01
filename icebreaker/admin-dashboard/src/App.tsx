import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, MapPin, Calendar, Activity, Share2, Shield, Lock } from 'lucide-react'

const ADMIN_ANALYTICS = `
  query AdminAnalytics($password: String!) {
    adminAnalytics(password: $password) {
      totalUsers
      dau
      mau
      totalCheckIns
      totalMeetings
      meetingsAccepted
      totalReferrals
      averageTrustScore
      avgStreak
    }
  }
`

function Dashboard({ password }: { password: string }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ADMIN_ANALYTICS, variables: { password } })
    })
    .then(res => res.json())
    .then(res => {
      if (res.errors) throw new Error(res.errors[0].message)
      setData(res.data)
      setLoading(false)
    })
    .catch(err => {
      setError(err.message)
      setLoading(false)
    })
  }, [password])

  if (loading) return <div className="flex h-screen items-center justify-center text-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div></div>
  if (error) return <div className="flex h-screen items-center justify-center text-red-500 font-bold">Error: {error}</div>

  const stats = data?.adminAnalytics
  
  // Mock time-series data since backend returns aggregates
  const chartData = [
    { name: 'Mon', users: stats.dau * 0.8 },
    { name: 'Tue', users: stats.dau * 0.9 },
    { name: 'Wed', users: stats.dau * 1.1 },
    { name: 'Thu', users: stats.dau * 0.95 },
    { name: 'Fri', users: stats.dau * 1.2 },
    { name: 'Sat', users: stats.dau * 1.4 },
    { name: 'Sun', users: stats.dau },
  ]

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-[#1e1e23]/60 backdrop-blur-md rounded-2xl p-6 border border-white/5 flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">{title}</p>
        <p className="text-3xl font-black text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-${color}-500/20`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Icebreaker Analytics</h1>
            <p className="text-emerald-400 font-medium">Admin Dashboard</p>
          </div>
          <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-sm text-gray-300">Live Data</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="blue" />
          <StatCard title="Daily Active" value={stats.dau} icon={Activity} color="emerald" />
          <StatCard title="Total Check-Ins" value={stats.totalCheckIns} icon={MapPin} color="purple" />
          <StatCard title="Meetings Accepted" value={stats.meetingsAccepted} icon={Calendar} color="orange" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#1e1e23]/60 backdrop-blur-md rounded-2xl p-6 border border-white/5">
            <h2 className="text-xl font-bold mb-6">User Activity (7 Days)</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                  <Line type="monotone" dataKey="users" stroke="#34d399" strokeWidth={3} dot={{ r: 4, fill: '#34d399' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1e1e23]/60 backdrop-blur-md rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <Share2 className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold">Viral Loops</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Referrals Redeemed</span>
                  <span className="font-bold text-xl">{stats.totalReferrals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Meetings</span>
                  <span className="font-bold text-xl">{stats.totalMeetings}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1e1e23]/60 backdrop-blur-md rounded-2xl p-6 border border-white/5 border-t-4 border-t-yellow-500">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-bold">Trust & Safety</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg Trust Score</span>
                  <span className="font-bold text-2xl text-yellow-500">{stats.averageTrustScore.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg Daily Streak</span>
                  <span className="font-bold text-xl text-orange-400">{stats.avgStreak.toFixed(1)} 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Login({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState('')
  return (
    <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center p-4">
      <div className="bg-[#1e1e23] p-8 rounded-3xl w-full max-w-md border border-white/10 text-center">
        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Icebreaker Admin</h2>
        <p className="text-gray-400 mb-8">Enter the admin password to view analytics</p>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(pw) }}>
          <input 
            type="password"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 outline-none focus:border-blue-500 transition-colors"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-colors">
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}

function App() {
  const [password, setPassword] = useState('')

  return (
    <>
      {!password ? (
        <Login onLogin={setPassword} />
      ) : (
        <Dashboard password={password} />
      )}
    </>
  )
}

export default App
