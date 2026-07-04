'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';

interface CalendarViewProps {
  items: any[];
}

export default function CalendarView({ items }: CalendarViewProps) {
  // Generate a basic 4-week calendar based on the current date for demo purposes
  const calendarDays = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay()); // Start on Sunday

    const days = [];
    for (let i = 0; i < 28; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // Find items matching this day
      const dayItems = items.filter(item => {
        if (!item.scheduledTime) return false;
        const itemDate = new Date(item.scheduledTime);
        return itemDate.toDateString() === currentDate.toDateString();
      });

      days.push({
        date: currentDate,
        isToday: currentDate.toDateString() === today.toDateString(),
        items: dayItems,
      });
    }
    return days;
  }, [items]);

  const getStatusColor = (item: any) => {
    // If it was posted, use green/gray. If scheduled, use yellow/blue
    const itemDate = new Date(item.scheduledTime);
    if (itemDate < new Date()) {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    }
    return 'bg-[#60a9ff]/20 text-[#60a9ff] border-[#60a9ff]/30';
  };

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="grid grid-cols-7 gap-4 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i} className="text-center text-gray-400 font-medium text-sm tracking-wider uppercase">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {calendarDays.map((day, i) => (
          <div 
            key={i} 
            className={`min-h-[120px] p-2 rounded-xl border ${day.isToday ? 'border-white/30 bg-white/10' : 'border-white/5 bg-white/5'} transition-colors`}
          >
            <div className={`text-right mb-2 text-sm font-semibold ${day.isToday ? 'text-white' : 'text-gray-500'}`}>
              {day.date.getDate()}
            </div>
            <div className="space-y-2">
              {day.items.map((item, idx) => (
                <Link 
                  href={`/queue/${item.id}`} 
                  key={idx}
                  className={`block px-2 py-1.5 rounded-lg border text-xs font-medium cursor-pointer hover:brightness-125 transition-all truncate ${getStatusColor(item)}`}
                  title={item.caption}
                >
                  {new Date(item.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {item.brand}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
