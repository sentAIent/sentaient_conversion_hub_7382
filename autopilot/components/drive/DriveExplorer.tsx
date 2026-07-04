'use client';
import React, { useState, useEffect } from 'react';
import { db, storage } from '@/config/firebase';
import { collection, onSnapshot, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { DriveFolder, DriveFile } from '@/types/drive';
import { DriveBreadcrumbs } from './DriveBreadcrumbs';
import { FolderModal } from './FolderModal';
import { UploadZone } from './UploadZone';
import { Folder, File as FileIcon, Image as ImageIcon, Grid, List, MoreVertical } from 'lucide-react';

interface DriveExplorerProps {
  brandId: string;
}

export function DriveExplorer({ brandId }: DriveExplorerProps) {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [folders, setFolders] = useState<DriveFolder[]>([]);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<{name: string, progress: number}[]>([]);

  // Fetch Folders
  useEffect(() => {
    if (!brandId) return;
    const q = query(collection(db, 'drive_folders'), where('brandId', '==', brandId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedFolders: DriveFolder[] = [];
      snapshot.forEach(doc => {
        fetchedFolders.push({ id: doc.id, ...doc.data() } as DriveFolder);
      });
      setFolders(fetchedFolders);
    });
    return () => unsubscribe();
  }, [brandId]);

  // Fetch Files
  useEffect(() => {
    if (!brandId) return;
    const q = query(collection(db, 'drive_files'), where('brandId', '==', brandId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedFiles: DriveFile[] = [];
      snapshot.forEach(doc => {
        fetchedFiles.push({ id: doc.id, ...doc.data() } as DriveFile);
      });
      setFiles(fetchedFiles);
    });
    return () => unsubscribe();
  }, [brandId]);

  // Derived state for current view
  const currentFolders = folders.filter(f => f.parentFolderId === currentFolder);
  const currentFiles = files.filter(f => f.folderId === currentFolder);

  // Handlers
  const handleCreateFolder = async (name: string) => {
    await addDoc(collection(db, 'drive_folders'), {
      name,
      brandId,
      parentFolderId: currentFolder,
      createdAt: new Date().toISOString(), // Use simple ISO string for now, could use serverTimestamp()
    });
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;

    // Add to uploading UI state
    setUploadingFiles(prev => [...prev, { name: file.name, progress: 0 }]);
    
    // Create storage reference
    const storageRef = ref(storage, `brands/${brandId}/${currentFolder || 'root'}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadingFiles(prev => prev.map(u => u.name === file.name ? { ...u, progress } : u));
      },
      (error) => {
        console.error("Upload failed", error);
        setUploadingFiles(prev => prev.filter(u => u.name !== file.name));
      },
      async () => {
        // Upload completed
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        
        // Save metadata to Firestore
        await addDoc(collection(db, 'drive_files'), {
          name: file.name,
          brandId,
          folderId: currentFolder,
          downloadUrl,
          size: file.size,
          type: file.type,
          createdAt: new Date().toISOString(),
        });
        
        setUploadingFiles(prev => prev.filter(u => u.name !== file.name));
      }
    );
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={40} className="text-[#60a9ff] mb-2" />;
    return <FileIcon size={40} className="text-gray-400 mb-2" />;
  };

  return (
    <div 
      className="relative min-h-[500px] flex flex-col"
      onDragEnter={() => setIsDragging(true)}
    >
      <UploadZone 
        isDragging={isDragging} 
        setIsDragging={setIsDragging} 
        onFileDrop={handleFileUpload} 
      />

      <div className="flex justify-between items-center mb-6 z-10 relative">
        <DriveBreadcrumbs currentFolder={currentFolder} folders={folders} onNavigate={setCurrentFolder} />
        
        <div className="flex items-center gap-3">
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <List size={16} />
            </button>
          </div>
          <button 
            onClick={() => setIsFolderModalOpen(true)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all text-sm"
          >
            New Folder
          </button>
          <label className="px-4 py-2 bg-[#60a9ff] hover:bg-[#4a85cc] text-white font-bold rounded-lg transition-all shadow-lg text-sm cursor-pointer">
            Upload File
            <input type="file" className="hidden" multiple onChange={(e) => {
              if (e.target.files) {
                Array.from(e.target.files).forEach(handleFileUpload);
              }
            }} />
          </label>
        </div>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="mb-6 z-10 relative flex flex-col gap-2">
          {uploadingFiles.map((upload, idx) => (
            <div key={idx} className="bg-black/30 p-3 rounded-lg border border-[#60a9ff]/50 flex items-center justify-between">
              <span className="text-sm font-medium truncate max-w-[200px]">{upload.name}</span>
              <div className="w-1/2 bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-[#60a9ff] h-full transition-all duration-300" style={{ width: `${upload.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 z-10 relative">
          {/* Folders */}
          {currentFolders.map(folder => (
            <div 
              key={folder.id}
              onDoubleClick={() => setCurrentFolder(folder.id)}
              className="bg-black/20 border border-white/5 hover:border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all group backdrop-blur-md hover:bg-white/5"
            >
              <Folder size={48} className="text-gray-400 group-hover:text-white mb-3 transition-colors" />
              <h3 className="font-bold text-sm text-gray-200 group-hover:text-white truncate w-full">{folder.name}</h3>
            </div>
          ))}

          {/* Files */}
          {currentFiles.map(file => (
            <div 
              key={file.id}
              className="bg-black/20 border border-white/5 hover:border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all group backdrop-blur-md hover:bg-white/5 relative"
            >
              {getFileIcon(file.type)}
              <h3 className="font-medium text-xs text-gray-300 group-hover:text-white truncate w-full" title={file.name}>
                {file.name}
              </h3>
              <a 
                href={file.downloadUrl} 
                target="_blank" 
                rel="noreferrer"
                className="absolute inset-0 z-10"
                title="Download"
              >
                <span className="sr-only">Download {file.name}</span>
              </a>
              <button className="absolute top-2 right-2 text-gray-500 hover:text-white z-20 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={14} />
              </button>
            </div>
          ))}

          {currentFolders.length === 0 && currentFiles.length === 0 && !isDragging && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-white/10 rounded-3xl bg-black/10">
              <Folder size={48} className="mb-4 opacity-50" />
              <p className="font-medium">This folder is empty</p>
              <p className="text-sm mt-1">Drag and drop files to upload</p>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="flex flex-col bg-black/20 border border-white/10 rounded-2xl overflow-hidden z-10 relative">
          <div className="flex items-center p-4 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400">
            <div className="flex-1">Name</div>
            <div className="w-32 hidden md:block">Size</div>
            <div className="w-32 hidden md:block">Date Modified</div>
            <div className="w-10"></div>
          </div>
          
          <div className="flex flex-col divide-y divide-white/5">
            {currentFolders.map(folder => (
              <div 
                key={folder.id}
                onDoubleClick={() => setCurrentFolder(folder.id)}
                className="flex items-center p-4 hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <div className="flex-1 flex items-center gap-3">
                  <Folder size={20} className="text-gray-400 group-hover:text-white" />
                  <span className="font-medium text-sm text-gray-200 group-hover:text-white">{folder.name}</span>
                </div>
                <div className="w-32 text-xs text-gray-500 hidden md:block">-</div>
                <div className="w-32 text-xs text-gray-500 hidden md:block">
                  {new Date(folder.createdAt).toLocaleDateString()}
                </div>
                <div className="w-10 text-right">
                  <button className="text-gray-500 hover:text-white"><MoreVertical size={16} /></button>
                </div>
              </div>
            ))}

            {currentFiles.map(file => (
              <div 
                key={file.id}
                className="flex items-center p-4 hover:bg-white/5 transition-colors group relative"
              >
                <div className="flex-1 flex items-center gap-3">
                  {file.type.startsWith('image/') ? <ImageIcon size={20} className="text-[#60a9ff]" /> : <FileIcon size={20} className="text-gray-400" />}
                  <span className="font-medium text-sm text-gray-300 group-hover:text-white truncate max-w-[200px] md:max-w-md">{file.name}</span>
                  <a href={file.downloadUrl} target="_blank" rel="noreferrer" className="absolute inset-0 z-10">
                    <span className="sr-only">Download {file.name}</span>
                  </a>
                </div>
                <div className="w-32 text-xs text-gray-500 hidden md:block">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <div className="w-32 text-xs text-gray-500 hidden md:block">
                  {new Date(file.createdAt).toLocaleDateString()}
                </div>
                <div className="w-10 text-right relative z-20">
                  <button className="text-gray-500 hover:text-white"><MoreVertical size={16} /></button>
                </div>
              </div>
            ))}

            {currentFolders.length === 0 && currentFiles.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm">
                This folder is empty
              </div>
            )}
          </div>
        </div>
      )}

      {isFolderModalOpen && (
        <FolderModal 
          onClose={() => setIsFolderModalOpen(false)} 
          onSubmit={handleCreateFolder} 
        />
      )}
    </div>
  );
}
