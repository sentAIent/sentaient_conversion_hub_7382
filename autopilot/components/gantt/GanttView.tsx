'use client';
import React, { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { supabase } from '@/lib/supabase';
import { useWorkspace } from '../providers/WorkspaceProvider';
import { format, addDays, differenceInDays, startOfWeek, isSameDay } from 'date-fns';

export function GanttView() {
  const { activeWorkspace } = useWorkspace();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  // Create 14 days timeline
  const days = Array.from({ length: 14 }, (_, i) => addDays(startDate, i));

  // Sync with Supabase
  useEffect(() => {
    if (!activeWorkspace) return;
    
    const fetchTasks = async () => {
      const { data, error } = await supabase.from('tasks').select('*').eq('brandId', activeWorkspace);
      if (data && data.length > 0) {
        setTasks(data.map((t: any) => ({
          ...t,
          brandId: t.brandId,
          order: t.order,
          startDate: t.startDate,
          dueDate: t.dueDate
        })) as Task[]);
      } else {
        // Fallback mock data with dates if empty
        setTasks([
          { 
            id: '1', title: 'Design Summer Promo Header', status: 'Design', brandId: activeWorkspace, platforms: ['twitter'], order: 1,
            startDate: format(new Date(), 'yyyy-MM-dd'), dueDate: format(addDays(new Date(), 3), 'yyyy-MM-dd')
          },
          { 
            id: '2', title: 'Edit Video Hook Variations', status: 'Queue/Processing', brandId: activeWorkspace, platforms: ['youtube'], order: 2,
            startDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'), dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd')
          },
          { 
            id: '3', title: 'Schedule B2B LinkedIn Post', status: 'Scheduled', brandId: activeWorkspace, platforms: ['linkedin'], order: 3,
            startDate: format(addDays(new Date(), 5), 'yyyy-MM-dd'), dueDate: format(addDays(new Date(), 10), 'yyyy-MM-dd')
          },
        ]);
      }
    };

    fetchTasks();

    const subscription = supabase
      .channel(`public:tasks:brandId=eq.${activeWorkspace}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: `brandId=eq.${activeWorkspace}` }, payload => {
        fetchTasks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [activeWorkspace]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl h-full flex flex-col">
      <div className="flex border-b border-white/10">
        <div className="w-1/4 p-4 font-bold border-r border-white/10 bg-black/20 text-gray-300">
          Task
        </div>
        <div className="w-3/4 flex bg-black/20">
          {days.map((day, i) => (
            <div 
              key={i} 
              className={`flex-1 text-center p-4 border-r border-white/10 text-xs font-medium ${isSameDay(day, new Date()) ? 'text-[#60a9ff] bg-[#60a9ff]/10' : 'text-gray-400'}`}
            >
              <div className="uppercase tracking-wider opacity-50 mb-1">{format(day, 'EEE')}</div>
              <div className="text-sm font-bold">{format(day, 'd')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tasks.map(task => {
          if (!task.startDate || !task.dueDate) return null;
          
          const taskStart = new Date(task.startDate);
          const taskEnd = new Date(task.dueDate);
          
          // Calculate grid positions
          const startOffset = Math.max(0, differenceInDays(taskStart, startDate));
          const duration = Math.min(14 - startOffset, differenceInDays(taskEnd, taskStart) + 1);
          
          if (startOffset >= 14 || startOffset + duration <= 0) return null;

          return (
            <div key={task.id} className="flex border-b border-white/5 group hover:bg-white/5 transition-colors">
              <div className="w-1/4 p-4 border-r border-white/10 truncate">
                <h4 className="text-sm font-bold text-white mb-1 truncate">{task.title}</h4>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{task.status}</p>
              </div>
              <div className="w-3/4 flex relative">
                {/* Background Grid Lines */}
                {days.map((_, i) => (
                  <div key={i} className="flex-1 border-r border-white/5" />
                ))}
                
                {/* Task Bar */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-[#60a9ff] to-blue-500 rounded-lg shadow-lg flex items-center px-3"
                  style={{
                    left: `${(startOffset / 14) * 100}%`,
                    width: `${(duration / 14) * 100}%`,
                    marginLeft: '4px',
                    marginRight: '4px',
                  }}
                >
                  <span className="text-xs font-bold text-white truncate">{task.title}</span>
                </div>
              </div>
            </div>
          );
        })}
        {tasks.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No tasks with dates assigned to display on the timeline.
          </div>
        )}
      </div>
    </div>
  );
}
