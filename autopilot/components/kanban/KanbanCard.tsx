'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types/task';
import { Calendar, MoreVertical, Play, GripVertical } from 'lucide-react';
import { format } from 'date-fns';

const TwitterIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface KanbanCardProps {
  task: Task;
}

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'twitter': return <TwitterIcon size={14} className="text-blue-400" />;
    case 'instagram': return <InstagramIcon size={14} className="text-pink-500" />;
    case 'linkedin': return <LinkedinIcon size={14} className="text-blue-600" />;
    case 'youtube': return <Play size={14} className="text-red-500" />;
    default: return null;
  }
};

export function KanbanCard({ task }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id, data: { type: 'Task', task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef}
        style={style}
        className="h-32 w-full bg-white/5 border-2 border-dashed border-[#60a9ff] rounded-xl mb-3 opacity-50"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-black/30 border border-white/10 p-4 rounded-xl mb-3 backdrop-blur-md shadow-lg hover:border-white/20 transition-all group relative"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2 mb-2">
          {task.platforms.map((p, i) => (
            <span key={i} className="p-1.5 bg-white/5 rounded-md" title={p}>
              {getPlatformIcon(p)}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button className="text-gray-500 hover:text-white p-1 rounded transition-colors opacity-0 group-hover:opacity-100">
            <MoreVertical size={16} />
          </button>
          <div 
            {...attributes} 
            {...listeners} 
            className="text-gray-500 hover:text-white p-1 rounded cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={16} />
          </div>
        </div>
      </div>
      
      <h4 className="text-sm font-bold text-white mb-2 leading-tight">{task.title}</h4>
      
      <div className="flex justify-between items-center mt-4">
        {task.dueDate && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar size={12} />
            <span>{format(new Date(task.dueDate), 'MMM d')}</span>
          </div>
        )}
        <div className="flex -space-x-2">
          {task.assignees?.map((assignee, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#60a9ff] to-purple-500 border border-black flex items-center justify-center text-[10px] font-bold text-white">
              {assignee.charAt(0)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
