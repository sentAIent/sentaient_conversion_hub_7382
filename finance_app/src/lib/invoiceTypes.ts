export interface CustomField {
  id: string;
  name: string;
  value: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface PartyDetails {
  name: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  country: string;
  customFields: CustomField[];
}

export interface InvoiceData {
  logoUrl?: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  paymentTerms: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  
  seller: PartyDetails;
  buyer: PartyDetails;
  
  items: LineItem[];
  
  notes: string;
  terms: string;
  
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  taxType: 'percentage' | 'fixed';
  taxValue: number;
  shippingValue: number;
  
  currency: string;
}

export const defaultInvoiceData: InvoiceData = {
  invoiceNumber: 'INV-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  paymentTerms: '7',
  status: 'draft',
  
  seller: {
    name: '',
    address: '',
    zip: '',
    city: '',
    state: '',
    country: '',
    customFields: []
  },
  buyer: {
    name: '',
    address: '',
    zip: '',
    city: '',
    state: '',
    country: '',
    customFields: []
  },
  
  items: [
    { id: '1', description: '', quantity: 1, rate: 0 }
  ],
  
  notes: '',
  terms: '',
  
  discountType: 'percentage',
  discountValue: 0,
  taxType: 'percentage',
  taxValue: 0,
  shippingValue: 0,
  
  currency: 'USD'
};
