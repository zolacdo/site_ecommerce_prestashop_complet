export interface PaymentCard {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover';
  lastFour: string;
  expiryMonth: number;
  expiryYear: number;
  holderName: string;
  isDefault: boolean;
  isExpired: boolean;
  addedDate: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank_transfer' | 'crypto';
  name: string;
  details: string;
  isEnabled: boolean;
  fees: number;
  processingTime: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  description: string;
  date: string;
  paymentMethod: string;
  orderId?: string;
  fees?: number;
  refundAmount?: number;
  refundReason?: string;
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  taxId?: string;
}

export interface PaymentSettings {
  autoPayEnabled: boolean;
  defaultPaymentMethod: string;
  receiptEmail: string;
  invoiceLanguage: string;
  taxExempt: boolean;
}

export interface Invoice {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  downloadUrl: string;
}

export interface PaymentAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  topPaymentMethods: Array<{
    method: string;
    percentage: number;
    amount: number;
  }>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
  }>;
}