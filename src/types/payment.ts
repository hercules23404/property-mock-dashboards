export interface Payment {
    id: string;
    tenantId: string;
    propertyId: string;
    societyId: string;
    amount: number;
    type: 'rent' | 'maintenance' | 'security' | 'other';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    dueDate: Date;
    paidDate?: Date;
    paymentMethod?: 'bank_transfer' | 'credit_card' | 'debit_card' | 'cash' | 'other';
    transactionId?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentReceipt {
    id: string;
    paymentId: string;
    tenantId: string;
    propertyId: string;
    societyId: string;
    amount: number;
    paidDate: Date;
    paymentMethod: string;
    transactionId: string;
    receiptNumber: string;
    createdAt: Date;
}

export interface PaymentReminder {
    id: string;
    paymentId: string;
    tenantId: string;
    sentDate: Date;
    reminderType: 'email' | 'sms' | 'in_app';
    status: 'sent' | 'failed';
    createdAt: Date;
}

export interface PaymentHistory {
    id: string;
    tenantId: string;
    propertyId: string;
    societyId: string;
    amount: number;
    type: string;
    status: string;
    dueDate: Date;
    paidDate?: Date;
    createdAt: Date;
} 