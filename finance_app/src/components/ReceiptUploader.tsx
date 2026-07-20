"use client";

import { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, FileText, Loader2, Receipt } from 'lucide-react';

interface ExtractedData {
  merchantName: string;
  totalAmount: number;
  date: string;
  confidence: number;
}

export default function ReceiptUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setExtractedData(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('receipt', file);

    try {
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      setExtractedData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during upload');
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setFile(null);
    setExtractedData(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 print-hide">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Receipt className="mr-2 h-5 w-5 text-gray-500" />
        Automated Receipt Matching
      </h2>
      
      {!file && (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 font-medium mb-1">Click to upload a receipt</p>
          <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            accept="image/png, image/jpeg, application/pdf"
          />
        </div>
      )}

      {file && !extractedData && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {!isUploading && (
              <button onClick={clearSelection} className="text-xs text-gray-500 hover:text-gray-700">
                Cancel
              </button>
            )}
          </div>
          
          <button 
            onClick={handleUpload} 
            disabled={isUploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Extracting Data...
              </>
            ) : (
              'Process Receipt'
            )}
          </button>
          
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      )}

      {extractedData && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-3">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="font-medium text-green-800">Receipt Extracted Successfully</span>
          </div>
          
          <div className="bg-white p-3 rounded border border-green-100 text-sm mb-3">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-500">Merchant:</span>
              <span className="font-medium">{extractedData.merchantName}</span>
              
              <span className="text-gray-500">Amount:</span>
              <span className="font-medium">${extractedData.totalAmount.toFixed(2)}</span>
              
              <span className="text-gray-500">Date:</span>
              <span className="font-medium">{new Date(extractedData.date).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="text-xs text-green-700 mb-4 bg-green-100 p-2 rounded flex items-start">
             <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
             Matched with existing transaction: {extractedData.merchantName} (-${extractedData.totalAmount.toFixed(2)})
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded transition-colors"
            >
              Confirm Match
            </button>
            <button 
              onClick={clearSelection}
              className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium py-2 rounded transition-colors"
            >
              Upload Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
