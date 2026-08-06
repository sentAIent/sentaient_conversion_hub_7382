"use client";

import { useState, useEffect, useRef } from 'react';
import { InvoiceData, defaultInvoiceData, LineItem, CustomField } from '@/lib/invoiceTypes';
import { Settings2, Printer, Download, FileUp, Plus, Trash2, Cloud, CloudDownload, Calendar, Briefcase, Mail, MapPin, Building, Type, PenTool, ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';


export default function AdvancedInvoicingPage() {
  const [data, setData] = useState<InvoiceData>(defaultInvoiceData);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showTax, setShowTax] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();
  const [isSaving, setIsSaving] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [cloudInvoices, setCloudInvoices] = useState<any[]>([]);
  
  const invoicePreviewRef = useRef<HTMLDivElement>(null);

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'JPY': return '¥';
      default: return '$';
    }
  };


  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('advancedInvoiceData');
    if (saved) {
      try {
        setData(JSON.parse(saved));
        const parsed = JSON.parse(saved);
        if (parsed.discountValue > 0) setShowDiscount(true);
        if (parsed.taxValue > 0) setShowTax(true);
        if (parsed.shippingValue > 0) setShowShipping(true);
      } catch (e) {
        console.error("Failed to parse saved invoice data", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('advancedInvoiceData', JSON.stringify(data));
  }, [data]);

  const updateField = (field: keyof InvoiceData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateSeller = (field: string, value: string) => {
    setData(prev => ({ ...prev, seller: { ...prev.seller, [field]: value } }));
  };

  const updateBuyer = (field: string, value: string) => {
    setData(prev => ({ ...prev, buyer: { ...prev.buyer, [field]: value } }));
  };

  const addLineItem = () => {
    const newItem: LineItem = { id: Math.random().toString(36).substring(7), description: '', quantity: 1, rate: 0 };
    setData(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removeItem = (id: string) => {
    setData(prev => ({ ...prev, items: prev.items.filter(item => item.id !== id) }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculations
  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateTotal = () => {
    let sub = calculateSubtotal();
    
    if (showDiscount) {
      if (data.discountType === 'percentage') {
        sub -= sub * (data.discountValue / 100);
      } else {
        sub -= data.discountValue;
      }
    }
    
    let taxAmt = 0;
    if (showTax) {
      if (data.taxType === 'percentage') {
        taxAmt = sub * (data.taxValue / 100);
      } else {
        taxAmt = data.taxValue;
      }
    }
    
    let shipAmt = showShipping ? data.shippingValue : 0;
    
    return sub + taxAmt + shipAmt;
  };

  const exportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `invoice-${data.invoiceNumber}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setData(imported);
        if (imported.discountValue > 0) setShowDiscount(true);
        if (imported.taxValue > 0) setShowTax(true);
        if (imported.shippingValue > 0) setShowShipping(true);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const saveToCloud = async () => {
    setIsSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please log in to save to cloud");
      setIsSaving(false);
      return;
    }
    
    const payload = {
      user_id: user.id,
      invoice_number: data.invoiceNumber || `INV-${Date.now()}`,
      date: data.date,
      due_date: data.dueDate,
      data: data
    };

    const { error } = await supabase
      .from('invoices')
      .upsert(payload, { onConflict: 'user_id, invoice_number' });

    if (error) {
      console.error("Failed to save", error);
      alert("Failed to save to cloud");
    } else {
      alert("Saved to cloud!");
    }
    setIsSaving(false);
  };

  const downloadPDF = async () => {
    if (!invoicePreviewRef.current) return;
    
    try {
      setIsPrinting(true);
      
      const htmlContent = invoicePreviewRef.current.outerHTML;
      
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: htmlContent }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice-${data.invoiceNumber || 'Draft'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Failed to generate PDF. Make sure Stirling-PDF is running locally.');
    } finally {
      setIsPrinting(false);
    }
  };

  const requestSignature = async () => {
    if (!invoicePreviewRef.current) return;
    
    if (!data.clientEmail) {
      alert("Please enter a client email address to send the document for signature.");
      return;
    }
    
    try {
      setIsSigning(true);
      
      // 1. Get HTML
      const htmlContent = invoicePreviewRef.current.outerHTML;
      
      // 2. Generate PDF via Stirling API first
      const pdfResponse = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: htmlContent }),
      });
      
      if (!pdfResponse.ok) throw new Error('Failed to generate PDF');
      
      const blob = await pdfResponse.blob();
      
      // 3. Send PDF to Documenso
      const formData = new FormData();
      formData.append('file', blob, `Invoice-${data.invoiceNumber || 'Draft'}.pdf`);
      formData.append('signers', data.clientEmail);
      
      const documensoResponse = await fetch('/api/documenso', {
        method: 'POST',
        body: formData,
      });
      
      const result = await documensoResponse.json();
      
      if (!documensoResponse.ok) {
        throw new Error(result.error || 'Failed to request signature');
      }
      
      alert(result.message || 'Signature request sent successfully!');
      
    } catch (err: any) {
      console.error('Documenso error:', err);
      alert(err.message || 'Failed to request signature.');
    } finally {
      setIsSigning(false);
    }
  };

  const loadFromCloud = async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select('id, invoice_number, date, due_date, data')
      .order('date', { ascending: false });
      
    if (data) {
      setCloudInvoices(data);
      setShowLoadModal(true);
    } else {
      alert("Could not load invoices from cloud.");
    }
  };

  const selectCloudInvoice = (inv: any) => {
    setData(inv.data);
    setShowDiscount(inv.data.discountValue > 0);
    setShowTax(inv.data.taxValue > 0);
    setShowShipping(inv.data.shippingValue > 0);
    setShowLoadModal(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-20">
      {/* LEFT COLUMN: Editor */}
      <div className="flex-1 space-y-6 print-hide">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Editor Header Toolbar */}
          <div className="bg-gray-50 border-b border-gray-100 p-4 flex flex-wrap gap-3 items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-blue-500" />
              Invoice Editor
            </h1>
            <div className="flex gap-2">
              <button onClick={loadFromCloud} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-md transition-colors border border-blue-200">
                <CloudDownload className="w-4 h-4" /> Load Cloud
              </button>
              <button onClick={saveToCloud} disabled={isSaving} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50">
                <Cloud className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Cloud'}
              </button>
              <button onClick={downloadPDF} disabled={isPrinting} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors border border-gray-200 disabled:opacity-50">
                <Printer className="w-4 h-4" /> {isPrinting ? 'Generating...' : 'Print PDF'}
              </button>
              <button onClick={requestSignature} disabled={isSigning} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-medium rounded-md transition-colors border border-green-200 disabled:opacity-50">
                <PenTool className="w-4 h-4" /> {isSigning ? 'Sending...' : 'Request Signature'}
              </button>
              <button onClick={exportJson} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors border border-gray-200">
                <Download className="w-4 h-4" /> Export
              </button>
              <button onClick={() => importInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors border border-gray-200">
                <FileUp className="w-4 h-4" /> Import
              </button>
              <input type="file" ref={importInputRef} onChange={importJson} accept=".json" className="hidden" />
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Logo & Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-colors h-32 relative overflow-hidden"
                >
                  {data.logoUrl ? (
                    <img src={data.logoUrl} alt="Logo" className="max-h-full max-w-full object-contain z-10" />
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                      <span className="text-sm">Click to upload logo</span>
                    </>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                </div>
                {data.logoUrl && (
                  <button onClick={(e) => { e.stopPropagation(); updateField('logoUrl', ''); }} className="text-xs text-red-500 mt-2 hover:underline">
                    Remove Logo
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                  <input type="text" value={data.invoiceNumber} onChange={e => updateField('invoiceNumber', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" value={data.date} onChange={e => updateField('date', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input type="date" value={data.dueDate} onChange={e => updateField('dueDate', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bill From & To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Bill From (Your Details)</h3>
                <input type="text" placeholder="Company/Name" value={data.seller.name} onChange={e => updateSeller('name', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                <input type="text" placeholder="Address" value={data.seller.address} onChange={e => updateSeller('address', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City" value={data.seller.city} onChange={e => updateSeller('city', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                  <input type="text" placeholder="State/Zip" value={`${data.seller.state} ${data.seller.zip}`.trim()} onChange={e => {
                    const parts = e.target.value.split(' ');
                    updateSeller('zip', parts.pop() || '');
                    updateSeller('state', parts.join(' '));
                  }} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </div>
                <input type="text" placeholder="Country" value={data.seller.country} onChange={e => updateSeller('country', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Bill To (Client Details)</h3>
                <input type="text" placeholder="Client Name" value={data.buyer.name} onChange={e => updateBuyer('name', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                <input type="email" placeholder="Client Email (for signatures)" value={data.clientEmail || ''} onChange={e => updateField('clientEmail', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                <input type="text" placeholder="Client Address" value={data.buyer.address} onChange={e => updateBuyer('address', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City" value={data.buyer.city} onChange={e => updateBuyer('city', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                  <input type="text" placeholder="State/Zip" value={`${data.buyer.state} ${data.buyer.zip}`.trim()} onChange={e => {
                    const parts = e.target.value.split(' ');
                    updateBuyer('zip', parts.pop() || '');
                    updateBuyer('state', parts.join(' '));
                  }} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </div>
                <input type="text" placeholder="Country" value={data.buyer.country} onChange={e => updateBuyer('country', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
              </div>
            </div>

            {/* Line Items */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Line Items</h3>
              <div className="space-y-3">
                {data.items.map((item, idx) => (
                  <div key={item.id} className="flex gap-3 items-start group">
                    <div className="flex-1">
                      <input type="text" placeholder="Description of service/product" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                    </div>
                    <div className="w-24">
                      <input type="number" min="0" placeholder="Qty" value={item.quantity || ''} onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                    </div>
                    <div className="w-32">
                      <input type="number" min="0" placeholder="Rate" value={item.rate || ''} onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                    </div>
                    <div className="w-32 pt-2 text-right font-medium text-gray-700">
                      {getCurrencySymbol(data.currency)}{(item.quantity * item.rate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button onClick={addLineItem} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 mt-2">
                  <Plus className="w-4 h-4" /> Add Line Item
                </button>
              </div>
            </div>

            {/* Totals & Extras */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea rows={3} value={data.notes} onChange={e => updateField('notes', e.target.value)} placeholder="Any relevant notes for the client" className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Terms</label>
                  <textarea rows={3} value={data.terms} onChange={e => updateField('terms', e.target.value)} placeholder="Terms and conditions, late fees, etc." className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm resize-none"></textarea>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                  <label className="text-sm font-medium text-gray-700">Currency</label>
                  <select 
                    value={data.currency} 
                    onChange={e => updateField('currency', e.target.value)}
                    className="border-gray-300 rounded-md shadow-sm sm:text-sm py-1.5"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="AUD">AUD ($)</option>
                    <option value="CAD">CAD ($)</option>
                  </select>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{getCurrencySymbol(data.currency)}{calculateSubtotal().toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={showDiscount} onChange={e => setShowDiscount(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
                      Add Discount
                    </label>
                    {showDiscount && (
                      <div className="flex items-center gap-2">
                        <input type="number" value={data.discountValue} onChange={e => updateField('discountValue', parseFloat(e.target.value) || 0)} className="w-20 sm:text-sm border-gray-300 rounded-md py-1" />
                        <select value={data.discountType} onChange={e => updateField('discountType', e.target.value)} className="sm:text-sm border-gray-300 rounded-md py-1">
                          <option value="percentage">%</option>
                          <option value="fixed">{getCurrencySymbol(data.currency)}</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={showTax} onChange={e => setShowTax(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
                      Add Tax
                    </label>
                    {showTax && (
                      <div className="flex items-center gap-2">
                        <input type="number" value={data.taxValue} onChange={e => updateField('taxValue', parseFloat(e.target.value) || 0)} className="w-20 sm:text-sm border-gray-300 rounded-md py-1" />
                        <select value={data.taxType} onChange={e => updateField('taxType', e.target.value)} className="sm:text-sm border-gray-300 rounded-md py-1">
                          <option value="percentage">%</option>
                          <option value="fixed">{getCurrencySymbol(data.currency)}</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={showShipping} onChange={e => setShowShipping(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
                      Add Shipping
                    </label>
                    {showShipping && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{getCurrencySymbol(data.currency)}</span>
                        <input type="number" value={data.shippingValue} onChange={e => updateField('shippingValue', parseFloat(e.target.value) || 0)} className="w-24 sm:text-sm border-gray-300 rounded-md py-1" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">{getCurrencySymbol(data.currency)}{calculateTotal().toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Live Preview */}
      <div className="w-full lg:w-[800px] flex-shrink-0">
        <div className="sticky top-6">
          <div ref={invoicePreviewRef} className="bg-white shadow-xl rounded-sm border border-gray-200 p-12 print:shadow-none print:border-none print:p-0 min-h-[1056px] text-gray-800 relative bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] print:bg-none print:w-[8.5in] print:h-auto">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-16">
              <div className="w-1/2">
                {data.logoUrl ? (
                  <img src={data.logoUrl} alt="Company Logo" className="max-h-24 max-w-xs object-contain mb-6" />
                ) : (
                  <div className="h-12"></div>
                )}
                
                {data.seller.name && <h2 className="text-xl font-bold text-gray-900 mb-1">{data.seller.name}</h2>}
                {data.seller.address && <p className="text-sm text-gray-600">{data.seller.address}</p>}
                {(data.seller.city || data.seller.state || data.seller.zip) && (
                  <p className="text-sm text-gray-600">
                    {[data.seller.city, data.seller.state, data.seller.zip].filter(Boolean).join(', ')}
                  </p>
                )}
                {data.seller.country && <p className="text-sm text-gray-600">{data.seller.country}</p>}
              </div>

              <div className="text-right">
                <h1 className="text-4xl font-light text-gray-300 tracking-widest uppercase mb-4">Invoice</h1>
                <div className="inline-block text-left">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    <div className="text-gray-500 font-medium">Invoice #</div>
                    <div className="text-gray-900 text-right">{data.invoiceNumber}</div>
                    
                    <div className="text-gray-500 font-medium">Date</div>
                    <div className="text-gray-900 text-right">{new Date(data.date).toLocaleDateString()}</div>
                    
                    <div className="text-gray-500 font-medium">Due Date</div>
                    <div className="text-gray-900 text-right">{new Date(data.dueDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div className="mb-12">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Bill To</h3>
              {data.buyer.name ? (
                <>
                  <p className="text-base font-semibold text-gray-900">{data.buyer.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{data.buyer.address}</p>
                  <p className="text-sm text-gray-600">
                    {[data.buyer.city, data.buyer.state, data.buyer.zip].filter(Boolean).join(', ')}
                  </p>
                  <p className="text-sm text-gray-600">{data.buyer.country}</p>
                </>
              ) : (
                <p className="text-sm text-gray-300 italic">Client details...</p>
              )}
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2 border-gray-800 text-left">
                  <th className="py-3 font-semibold text-gray-800 text-sm uppercase">Item Description</th>
                  <th className="py-3 font-semibold text-gray-800 text-sm uppercase text-center w-24">Qty</th>
                  <th className="py-3 font-semibold text-gray-800 text-sm uppercase text-right w-32">Rate</th>
                  <th className="py-3 font-semibold text-gray-800 text-sm uppercase text-right w-32">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.items.map(item => (
                  <tr key={item.id}>
                    <td className="py-4 text-sm text-gray-800 pr-4">{item.description || <span className="text-gray-300 italic">Description...</span>}</td>
                    <td className="py-4 text-sm text-gray-600 text-center">{item.quantity}</td>
                    <td className="py-4 text-sm text-gray-600 text-right">{getCurrencySymbol(data.currency)}{item.rate.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td className="py-4 text-sm text-gray-900 font-medium text-right">{getCurrencySymbol(data.currency)}{(item.quantity * item.rate).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Box */}
            <div className="flex justify-end mb-16">
              <div className="w-72">
                <div className="flex justify-between py-2 text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{getCurrencySymbol(data.currency)}{calculateSubtotal().toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                </div>
                
                {showDiscount && (
                  <div className="flex justify-between py-2 text-sm text-gray-600">
                    <span>Discount {data.discountType === 'percentage' ? `(${data.discountValue}%)` : ''}</span>
                    <span className="text-red-500">
                      -{getCurrencySymbol(data.currency)}{(data.discountType === 'percentage' ? calculateSubtotal() * (data.discountValue/100) : data.discountValue).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}
                    </span>
                  </div>
                )}

                {showTax && (
                  <div className="flex justify-between py-2 text-sm text-gray-600">
                    <span>Tax {data.taxType === 'percentage' ? `(${data.taxValue}%)` : ''}</span>
                    <span>
                      +{getCurrencySymbol(data.currency)}{(data.taxType === 'percentage' ? 
                        (calculateSubtotal() - (showDiscount ? (data.discountType === 'percentage' ? calculateSubtotal() * (data.discountValue/100) : data.discountValue) : 0)) * (data.taxValue/100) 
                        : data.taxValue).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}
                    </span>
                  </div>
                )}

                {showShipping && (
                  <div className="flex justify-between py-2 text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>+{getCurrencySymbol(data.currency)}{data.shippingValue.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                  </div>
                )}

                <div className="flex justify-between py-3 mt-2 border-t-2 border-gray-800 text-lg font-bold text-gray-900 bg-gray-50 px-2 rounded-sm">
                  <span>Total Amount</span>
                  <span>{getCurrencySymbol(data.currency)}{calculateTotal().toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-gray-200">
              {data.notes && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notes</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{data.notes}</p>
                </div>
              )}
              {data.terms && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Terms & Conditions</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{data.terms}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      
      {/* Load Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CloudDownload className="w-5 h-5 text-blue-500" />
                Load Cloud Invoices
              </h2>
              <button onClick={() => setShowLoadModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {cloudInvoices.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No invoices found in cloud.</p>
              ) : (
                <div className="space-y-3">
                  {cloudInvoices.map(inv => (
                    <div 
                      key={inv.id} 
                      onClick={() => selectCloudInvoice(inv)}
                      className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{inv.invoice_number}</p>
                        <p className="text-sm text-gray-500">Date: {inv.date} | Due: {inv.due_date}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        Select →
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
