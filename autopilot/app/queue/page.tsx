'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CalendarView from '@/components/studio/CalendarView';
import toast from 'react-hot-toast';

export default function QueuePage() {
  const [scheduledItems, setScheduledItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  useEffect(() => {
    async function fetchQueue() {
      try {
        const response = await fetch('/api/campaign/queue');
        const data = await response.json();
        
        if (data.success && data.items) {
          const mappedItems = data.items.map((item: any) => ({
            id: item.campaign_id,
            brand: item.brand,
            type: item.content_type,
            status: item.status,
            scheduledTime: item.scheduled_time, // keeping raw for filtering
            scheduledTimeStr: new Date(item.scheduled_time).toLocaleString(),
            caption: item.text || item.caption || "No caption",
            rawItem: item
          }));
          
          setScheduledItems(mappedItems);
        } else {
          setScheduledItems([]);
        }
      } catch (err) {
        console.error("Failed to load queue", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchQueue();
  }, []);

  const now = new Date().getTime();

  // Sort upcoming soonest first
  const upcomingPosts = scheduledItems
    .filter(item => new Date(item.scheduledTime).getTime() >= now)
    .sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());

  // Sort history most recent first
  const historyPosts = scheduledItems
    .filter(item => new Date(item.scheduledTime).getTime() < now)
    .sort((a, b) => new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime());

  const displayedItems = activeTab === 'upcoming' ? upcomingPosts : historyPosts;

  return (
    <div className="min-h-screen p-12 bg-[#202733] font-sans relative overflow-hidden text-white">
      {/* Background gradients for Glassmorphism depth */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#60a9ff] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Publishing Queue</h1>
            <p className="text-lg text-gray-400 font-light">Monitor and manage scheduled autonomous marketing campaigns.</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-4 mb-6 gap-4">
            
            <div 
              className="flex bg-white/5 rounded-xl p-1 border border-white/10 transition-opacity duration-300" 
              style={{ opacity: viewMode === 'list' ? 1 : 0, pointerEvents: viewMode === 'list' ? 'auto' : 'none' }}
            >
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'upcoming' ? 'bg-[#60a9ff] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-[#60a9ff] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                History
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'list' ? 'bg-white/20 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                  List
                </button>
                <button 
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'calendar' ? 'bg-white/20 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                  Calendar
                </button>
              </div>
            </div>
            
          </div>

          {viewMode === 'list' && (
            <div className="mb-4">
              <h2 className="text-xl font-bold tracking-wide">
                {activeTab === 'upcoming' ? 'Upcoming Scheduled Posts' : 'Posted History'}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Showing {displayedItems.length} {activeTab === 'upcoming' ? 'active' : 'completed'} campaigns.
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#60a9ff]">
              <svg className="w-10 h-10 mb-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="tracking-wide font-medium">Fetching {activeTab} queue...</p>
            </div>
          ) : viewMode === 'calendar' ? (
            <CalendarView items={scheduledItems} />
          ) : (
            <div className="space-y-4">
              {displayedItems.map((item, i) => (
                <Link href={`/queue/${item.id}`} key={i} className="block flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex flex-col mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-lg uppercase tracking-wide group-hover:bg-white/20 transition-colors">
                        {item.brand}
                      </span>
                      <span className="text-[#60a9ff] font-medium text-sm">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm font-mono line-clamp-2 max-w-2xl group-hover:text-white transition-colors">{item.caption}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                        {activeTab === 'upcoming' ? 'Scheduled For' : 'Posted On'}
                      </p>
                      <p className="text-sm font-semibold text-gray-100">{item.scheduledTimeStr}</p>
                    </div>
                    
                    <div className="h-10 w-px bg-white/10 hidden md:block group-hover:bg-white/20 transition-colors"></div>
                    
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        {item.status === 'failed' ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <p className="text-sm font-semibold text-red-500 group-hover:text-red-400 transition-colors">Failed</p>
                            <button 
                              onClick={async (e) => { 
                                e.preventDefault(); 
                                toast.loading("Retrying...");
                                await fetch('/api/campaign/retry', { method: 'POST', body: JSON.stringify({ id: item.id }) }); 
                                window.location.reload();
                              }} 
                              className="ml-2 px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-lg hover:bg-red-500/40 border border-red-500/30 transition-colors"
                            >
                              Retry
                            </button>
                          </>
                        ) : activeTab === 'upcoming' ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                            <p className="text-sm font-semibold text-yellow-400 group-hover:text-yellow-300 transition-colors">{item.status}</p>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <p className="text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">Posted</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-400 group-hover:text-white transition-colors hidden md:block">
                      &rarr;
                    </div>
                  </div>
                </Link>
              ))}

              {displayedItems.length === 0 && (
                <div className="text-center py-16 text-gray-400 border border-dashed border-white/20 rounded-2xl bg-white/5">
                  <p className="text-lg">No {activeTab} campaigns found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
