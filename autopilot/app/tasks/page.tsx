'use client';
import React, { useState } from 'react';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { GanttView } from '@/components/gantt/GanttView';
import { useWorkspace } from '@/components/providers/WorkspaceProvider';

export default function TaskManagement() {
  const [view, setView] = useState<'kanban' | 'gantt'>('kanban');
  const { activeWorkspace, brands } = useWorkspace();
  const activeBrand = brands.find(b => b.id === activeWorkspace);

  return (
    <div className="min-h-screen p-8 md:p-12 bg-transparent text-white relative flex flex-col">
      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between text-center md:text-left gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#60a9ff] drop-shadow-sm">
                Project Workflows
              </h1>
              {activeBrand && (
                <span className="px-3 py-1 bg-[#60a9ff]/20 text-[#60a9ff] text-xs font-bold rounded-full uppercase tracking-wider hidden md:inline-block">
                  {activeBrand.name}
                </span>
              )}
            </div>
            <p className="text-gray-300 font-medium tracking-wide">
              Manage content pipelines via Kanban boards and Gantt timelines.
            </p>
          </div>
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setView('kanban')}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                view === 'kanban' 
                  ? 'bg-[#60a9ff] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Board
            </button>
            <button
              onClick={() => setView('gantt')}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                view === 'gantt' 
                  ? 'bg-[#60a9ff] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Timeline
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 min-h-[600px]">
          {view === 'kanban' ? <KanbanBoard /> : <GanttView />}
        </div>
      </div>
    </div>
  );
}
