'use client';
import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { Task, TaskStatus } from '@/types/task';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

export function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'Column',
      columnId: id
    }
  });

  return (
    <div className="flex flex-col flex-1 min-w-[280px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
      <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm uppercase tracking-wider text-white">{title}</h3>
          <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors text-lg leading-none">+</button>
      </div>

      <div 
        ref={setNodeRef}
        className={`flex-1 p-4 overflow-y-auto transition-colors ${isOver ? 'bg-white/5' : ''}`}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="h-24 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-gray-500 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
