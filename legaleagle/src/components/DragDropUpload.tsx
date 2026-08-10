import React, { useCallback, useState } from 'react';
import { UploadCloud, File, X, CheckCircle2 } from 'lucide-react';
import { logAuditAction } from '@/services/auditService';
import { useAuth } from '@/context/AuthContext';

interface DragDropUploadProps {
  onUpload: (files: File[]) => void;
}

export const DragDropUpload: React.FC<DragDropUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{file: File, progress: number, complete: boolean}[]>([]);
  const { user } = useAuth();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = (files: File[]) => {
    const newFiles = files.map(f => ({ file: f, progress: 0, complete: false }));
    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Mock upload progress
    newFiles.forEach((fileObj) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 20;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setUploadedFiles(prev => {
            const next = [...prev];
            const fileIndex = next.findIndex(f => f.file.name === fileObj.file.name);
            if (fileIndex !== -1) {
              next[fileIndex] = { ...next[fileIndex], progress: 100, complete: true };
            }
            return next;
          });
          
          // Trigger onUpload when all are complete (mocking simple for now)
          setTimeout(() => {
              onUpload(files);
              if (user) {
                  logAuditAction(null, user.id, 'DOCUMENT_UPLOAD', { filename: fileObj.file.name, size: fileObj.file.size });
              }
          }, 500);
        } else {
          setUploadedFiles(prev => {
            const next = [...prev];
            const fileIndex = next.findIndex(f => f.file.name === fileObj.file.name);
            if (fileIndex !== -1) {
              next[fileIndex] = { ...next[fileIndex], progress: currentProgress };
            }
            return next;
          });
        }
      }, 300);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.file.name !== fileName));
    if (user) {
        logAuditAction(null, user.id, 'DOCUMENT_DELETED', { filename: fileName });
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full ${isDragging ? 'bg-blue-100' : 'bg-white shadow-sm'}`}>
            <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-blue-600' : 'text-gray-500'}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Drag & Drop files here</h3>
            <p className="text-gray-500 text-sm mt-1">or click to browse from your computer</p>
          </div>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Supported formats: PDF, DOCX, TXT. Max file size: 50MB.
          </p>
          <label className="cursor-pointer bg-white px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Browse Files
            <input 
              type="file" 
              className="hidden" 
              multiple 
              onChange={handleFileInput}
              accept=".pdf,.docx,.txt"
            />
          </label>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Uploaded Files</h4>
          {uploadedFiles.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm animate-in fade-in zoom-in duration-300">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <File className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate pr-4">{item.file.name}</p>
                  <span className="text-xs text-gray-500">{(item.file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                {item.complete ? (
                   <div className="flex items-center text-xs text-green-600 font-medium">
                     <CheckCircle2 className="w-3 h-3 mr-1" />
                     Upload complete, vectorized and ready for RAG
                   </div>
                ) : (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${item.progress}%` }}></div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => removeFile(item.file.name)}
                className="p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
