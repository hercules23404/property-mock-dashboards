import { db } from '@/integrations/firebase/config';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where, addDoc, Timestamp, deleteDoc } from 'firebase/firestore';
import { Payment, PaymentReceipt, PaymentReminder, PaymentHistory } from '@/types/payment';

const paymentsCollection = collection(db, 'payments');
const receiptsCollection = collection(db, 'receipts');
const remindersCollection = collection(db, 'reminders');
const historyCollection = collection(db, 'paymentHistory');

export const paymentService = {
    // Create a new payment
    async createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
        const paymentRef = doc(paymentsCollection);
        const newPayment = {
            ...payment,
            id: paymentRef.id,
            createdAt: Timestamp.now().toDate(),
            updatedAt: Timestamp.now().toDate(),
        };
        await setDoc(paymentRef, newPayment);
        return newPayment;
    },

    // Get a payment by ID
    async getPayment(id: string): Promise<Payment | null> {
        const paymentRef = doc(paymentsCollection, id);
        const paymentSnap = await getDoc(paymentRef);
        if (!paymentSnap.exists()) return null;
        const data = paymentSnap.data();
        return {
            ...data,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
            dueDate: data.dueDate.toDate(),
            paidDate: data.paidDate?.toDate(),
        } as Payment;
    },

    // Update payment status
    async updatePaymentStatus(id: string, status: Payment['status'], transactionId?: string): Promise<void> {
        const paymentRef = doc(paymentsCollection, id);
        await updateDoc(paymentRef, {
            status,
            transactionId,
            paidDate: status === 'completed' ? Timestamp.now() : null,
            updatedAt: Timestamp.now(),
        });
    },

    // Delete a payment
    async deletePayment(id: string): Promise<void> {
        const paymentRef = doc(paymentsCollection, id);
        await deleteDoc(paymentRef);
    },

    // Get payments for a tenant
    async getTenantPayments(tenantId: string): Promise<Payment[]> {
        const q = query(paymentsCollection, where('tenantId', '==', tenantId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate(),
                dueDate: data.dueDate.toDate(),
                paidDate: data.paidDate?.toDate(),
            } as Payment;
        });
    },

    // Get payments for a property
    async getPropertyPayments(propertyId: string): Promise<Payment[]> {
        const q = query(paymentsCollection, where('propertyId', '==', propertyId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate(),
                dueDate: data.dueDate.toDate(),
                paidDate: data.paidDate?.toDate(),
            } as Payment;
        });
    },

    // Create a payment receipt
    async createReceipt(payment: Payment): Promise<PaymentReceipt> {
        const receiptRef = doc(receiptsCollection);
        const newReceipt: PaymentReceipt = {
            id: receiptRef.id,
            paymentId: payment.id,
            tenantId: payment.tenantId,
            propertyId: payment.propertyId,
            societyId: payment.societyId,
            amount: payment.amount,
            paidDate: payment.paidDate || new Date(),
            paymentMethod: payment.paymentMethod || 'bank_transfer',
            transactionId: payment.transactionId || '',
            receiptNumber: `REC-${Date.now()}`,
            createdAt: new Date(),
        };
        await setDoc(receiptRef, newReceipt);
        return newReceipt;
    },

    // Create a payment reminder
    async createReminder(paymentId: string, tenantId: string, reminderType: PaymentReminder['reminderType']): Promise<PaymentReminder> {
        const reminderRef = doc(remindersCollection);
        const newReminder: PaymentReminder = {
            id: reminderRef.id,
            paymentId,
            tenantId,
            sentDate: new Date(),
            reminderType,
            status: 'sent',
            createdAt: new Date(),
        };
        await setDoc(reminderRef, newReminder);
        return newReminder;
    },

    // Add payment to history
    async addToHistory(payment: Payment): Promise<PaymentHistory> {
        const historyRef = doc(historyCollection);
        const newHistory: PaymentHistory = {
            id: historyRef.id,
            tenantId: payment.tenantId,
            propertyId: payment.propertyId,
            societyId: payment.societyId,
            amount: payment.amount,
            type: payment.type,
            status: payment.status,
            dueDate: payment.dueDate,
            paidDate: payment.paidDate,
            createdAt: new Date(),
        };
        await setDoc(historyRef, newHistory);
        return newHistory;
    },

    // Get payment history for a tenant
    async getTenantPaymentHistory(tenantId: string): Promise<PaymentHistory[]> {
        const q = query(historyCollection, where('tenantId', '==', tenantId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt.toDate(),
                dueDate: data.dueDate.toDate(),
                paidDate: data.paidDate?.toDate(),
            } as PaymentHistory;
        });
    },

    // Get payment history for a property
    async getPropertyPaymentHistory(propertyId: string): Promise<PaymentHistory[]> {
        const q = query(historyCollection, where('propertyId', '==', propertyId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt.toDate(),
                dueDate: data.dueDate.toDate(),
                paidDate: data.paidDate?.toDate(),
            } as PaymentHistory;
        });
    },
}; 