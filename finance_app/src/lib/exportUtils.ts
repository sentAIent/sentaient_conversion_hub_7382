import { Transaction } from './categorizationEngine';

export function exportTransactionsToCSV(transactions: Transaction[], filename: string = 'transactions_export.csv') {
  if (!transactions.length) return;

  const headers = ['ID', 'Date', 'Merchant', 'Amount'];
  
  const csvContent = [
    headers.join(','),
    ...transactions.map(tx => [
      tx.id,
      tx.date,
      `"${tx.merchant.replace(/"/g, '""')}"`, // Escape quotes in merchant name
      tx.amount.toFixed(2)
    ].join(','))
  ].join('\n');

  downloadCSV(csvContent, filename);
}

function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
