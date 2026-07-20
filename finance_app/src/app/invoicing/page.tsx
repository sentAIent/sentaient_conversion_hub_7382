"use client";

import { useState } from 'react';
import { useEntity } from '@/context/EntityContext';

export default function InvoicingPage() {
  const { activeEntity } = useEntity();
  
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: 'INV-1001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: '',
    clientAddress: '',
  });

  const [lineItems, setLineItems] = useState([
    { description: 'Consulting Services', quantity: 1, rate: 150 }
  ]);

  const handlePrint = () => {
    window.print();
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, rate: 0 }]);
  };

  const updateLineItem = (index: number, field: string, value: string | number) => {
    const newItems = [...lineItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setLineItems(newItems);
  };

  const removeLineItem = (index: number) => {
    const newItems = lineItems.filter((_, i) => i !== index);
    setLineItems(newItems);
  };

  const calculateTotal = () => {
    return lineItems.reduce((total, item) => total + (item.quantity * item.rate), 0);
  };

  return (
    <div className="space-y-6 print-container">
      {/* Hide this controls section when printing */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 print-hide">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoicing</h1>
          <p className="text-gray-500 mt-1">Create and generate simple invoices.</p>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Print / Save PDF
        </button>
      </div>

      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto print-card">
        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-12 border-b pb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{activeEntity?.name || 'Your Company Name'}</h2>
            <p className="text-gray-500">123 Business Rd.</p>
            <p className="text-gray-500">Suite 100</p>
            <p className="text-gray-500">City, ST 12345</p>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">INVOICE</h1>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-gray-500">Invoice #:</span>
              <input 
                type="text" 
                className="font-medium text-right border-0 border-b border-dashed border-gray-300 focus:ring-0 p-0 w-24"
                value={invoiceDetails.invoiceNumber}
                onChange={(e) => setInvoiceDetails({...invoiceDetails, invoiceNumber: e.target.value})}
              />
              <span className="text-gray-500">Date:</span>
              <input 
                type="date" 
                className="font-medium text-right border-0 border-b border-dashed border-gray-300 focus:ring-0 p-0"
                value={invoiceDetails.date}
                onChange={(e) => setInvoiceDetails({...invoiceDetails, date: e.target.value})}
              />
              <span className="text-gray-500">Due Date:</span>
              <input 
                type="date" 
                className="font-medium text-right border-0 border-b border-dashed border-gray-300 focus:ring-0 p-0"
                value={invoiceDetails.dueDate}
                onChange={(e) => setInvoiceDetails({...invoiceDetails, dueDate: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Bill To:</h3>
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Client Name"
              className="block w-full text-lg font-medium border-0 border-b border-dashed border-gray-300 focus:ring-0 p-0 placeholder-gray-300"
              value={invoiceDetails.clientName}
              onChange={(e) => setInvoiceDetails({...invoiceDetails, clientName: e.target.value})}
            />
            <textarea 
              placeholder="Client Address"
              rows={2}
              className="block w-full text-gray-600 border-0 border-b border-dashed border-gray-300 focus:ring-0 p-0 placeholder-gray-300 resize-none"
              value={invoiceDetails.clientAddress}
              onChange={(e) => setInvoiceDetails({...invoiceDetails, clientAddress: e.target.value})}
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-800 text-left">
                <th className="py-3 font-semibold text-gray-700">Description</th>
                <th className="py-3 font-semibold text-gray-700 text-right w-24">Qty</th>
                <th className="py-3 font-semibold text-gray-700 text-right w-32">Rate</th>
                <th className="py-3 font-semibold text-gray-700 text-right w-32">Amount</th>
                <th className="w-10 print-hide"></th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 group">
                  <td className="py-3">
                    <input 
                      type="text" 
                      placeholder="Item description"
                      className="w-full border-0 focus:ring-0 p-0 text-gray-900"
                      value={item.description}
                      onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                    />
                  </td>
                  <td className="py-3 text-right">
                    <input 
                      type="number" 
                      className="w-full text-right border-0 focus:ring-0 p-0 text-gray-900"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(index, 'quantity', Number(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end items-center">
                      <span className="text-gray-500 mr-1">$</span>
                      <input 
                        type="number" 
                        className="w-24 text-right border-0 focus:ring-0 p-0 text-gray-900"
                        value={item.rate}
                        onChange={(e) => updateLineItem(index, 'rate', Number(e.target.value))}
                      />
                    </div>
                  </td>
                  <td className="py-3 text-right font-medium">
                    ${(item.quantity * item.rate).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-right print-hide">
                    <button 
                      onClick={() => removeLineItem(index)}
                      className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            onClick={addLineItem}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium print-hide"
          >
            + Add Line Item
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Subtotal:</span>
              <span className="font-medium">${calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-3 border-b-2 border-gray-800 text-xl font-bold">
              <span>Total:</span>
              <span>${calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Thank you for your business!</p>
          <p>Please make payment within 30 days of receiving this invoice.</p>
        </div>
      </div>
    </div>
  );
}
