"use client";

import { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, Scan, RefreshCw } from 'lucide-react';
import { OCRExtractionResult, EXPENSE_CATEGORIES } from '@/lib/expenseMockEngine';

interface ReceiptScannerProps {
  onSave: (expense: Omit<OCRExtractionResult, 'confidence'>) => void;
}

export default function ReceiptScanner({ onSave }: ReceiptScannerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<OCRExtractionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      
      // Auto start scanning
      setIsScanning(true);
      setScanResult(null);
      
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('/api/ocr', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to scan receipt');
        }

        const data = await response.json();
        
        setScanResult({
          merchant: data.merchant_name || 'Unknown Merchant',
          date: data.date || new Date().toISOString().split('T')[0],
          amount: data.amount || 0,
          tax: 0,
          category: data.category || 'Other',
          confidence: data.confidence || 0.9,
        });
      } catch (err) {
        console.error(err);
        alert('Failed to scan receipt with AI.');
      } finally {
        setIsScanning(false);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (scanResult) {
      onSave(scanResult);
      // Reset
      setFile(null);
      setPreviewUrl(null);
      setScanResult(null);
    }
  };

  const handleChange = (field: keyof OCRExtractionResult, value: string | number) => {
    if (scanResult) {
      setScanResult({ ...scanResult, [field]: value });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <Scan className="w-5 h-5 text-blue-500" />
        AI Receipt Scanner
      </h2>

      {!file && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <div className="bg-blue-100 p-3 rounded-full mb-3">
            <UploadCloud className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-gray-900 font-medium text-lg">Click to upload a receipt</p>
          <p className="text-gray-500 text-sm mt-1">PNG, JPG, or PDF up to 10MB</p>
        </div>
      )}

      {file && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center min-h-[300px]">
            {previewUrl && (
              <img src={previewUrl} alt="Receipt preview" className="max-h-[400px] object-contain" />
            )}
            
            {isScanning && (
              <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="w-full h-1 bg-blue-400 absolute top-0 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                <RefreshCw className="w-10 h-10 text-white animate-spin mb-3" />
                <p className="text-white font-medium text-lg drop-shadow-md">Extracting data...</p>
              </div>
            )}
          </div>

          <div className="md:w-1/2">
            {isScanning ? (
              <div className="h-full flex items-center justify-center flex-col text-gray-500 space-y-4">
                <div className="w-full space-y-3">
                  <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            ) : scanResult ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex items-center gap-2 mb-4 text-green-600 bg-green-50 p-2 rounded text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5" />
                  Extraction successful ({(scanResult.confidence * 100).toFixed(0)}% confidence)
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Merchant</label>
                  <input 
                    type="text" 
                    value={scanResult.merchant}
                    onChange={(e) => handleChange('merchant', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      value={scanResult.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={scanResult.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    >
                      {EXPENSE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Amount</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input 
                        type="number" 
                        step="0.01"
                        value={scanResult.tax}
                        onChange={(e) => handleChange('tax', parseFloat(e.target.value) || 0)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-7 p-2 border"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input 
                        type="number" 
                        step="0.01"
                        value={scanResult.amount}
                        onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-7 p-2 border font-bold text-gray-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setScanResult(null);
                    }}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Save Expense
                  </button>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
