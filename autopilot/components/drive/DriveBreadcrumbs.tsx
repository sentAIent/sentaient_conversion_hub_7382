'use client';
import React from 'react';
import { DriveFolder } from '@/types/drive';
import { ChevronRight, Home } from 'lucide-react';

interface DriveBreadcrumbsProps {
  currentFolder: string | null;
  folders: DriveFolder[];
  onNavigate: (folderId: string | null) => void;
}

export function DriveBreadcrumbs({ currentFolder, folders, onNavigate }: DriveBreadcrumbsProps) {
  // Build path recursively
  const buildPath = (folderId: string | null): DriveFolder[] => {
    if (!folderId) return [];
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return [];
    return [...buildPath(folder.parentFolderId), folder];
  };

  const path = buildPath(currentFolder);

  return (
    <div className="flex items-center gap-2 text-sm font-medium mb-6 bg-black/20 p-3 rounded-xl border border-white/5 w-fit">
      <button 
        onClick={() => onNavigate(null)}
        className={`flex items-center gap-1.5 transition-colors ${!currentFolder ? 'text-white' : 'text-gray-400 hover:text-white'}`}
      >
        <Home size={16} />
        <span>Root</span>
      </button>

      {path.map((folder, index) => {
        const isLast = index === path.length - 1;
        return (
          <React.Fragment key={folder.id}>
            <ChevronRight size={16} className="text-gray-600" />
            <button
              onClick={() => onNavigate(folder.id)}
              className={`transition-colors ${isLast ? 'text-[#60a9ff] font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              {folder.name}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
