'use client';
import React, { useCallback } from 'react';
import { UploadCloud } from 'lucide-react';

interface UploadZoneProps {
  onFileDrop: (file: File) => void;
  isDragging: boolean;
  setIsDragging: (val: boolean) => void;
}

export function UploadZone({ onFileDrop, isDragging, setIsDragging }: UploadZoneProps) {
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, [setIsDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, [setIsDragging]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Handle the first file for simplicity in this demo, or map through all
      Array.from(e.dataTransfer.files).forEach(file => {
        onFileDrop(file);
      });
      e.dataTransfer.clearData();
    }
  }, [onFileDrop, setIsDragging]);

  if (!isDragging) return null;

  return (
    <div 
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#60a9ff]/20 backdrop-blur-sm border-4 border-dashed border-[#60a9ff] rounded-3xl m-4 transition-all"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center pointer-events-none">
        <UploadCloud size={64} className="text-[#60a9ff] mb-4 drop-shadow-lg" />
        <h2 className="text-3xl font-extrabold text-white drop-shadow-md">Drop files to upload</h2>
        <p className="text-[#60a9ff] font-medium mt-2 bg-black/40 px-4 py-1 rounded-full">They will be saved to this folder instantly</p>
      </div>
    </div>
  );
}
