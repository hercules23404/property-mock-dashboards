import { Timestamp } from 'firebase/firestore';

export interface FirebaseUser {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'manager' | 'tenant';
    societyId?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface FirebaseSociety {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    contactNumber: string;
    email: string;
    registrationNumber: string;
    totalProperties: number;
    adminId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface FirebaseProperty {
    id: string;
    societyId: string;
    propertyNumber: string;
    type: 'apartment' | 'villa' | 'plot';
    status: 'vacant' | 'occupied';
    ownerId?: string;
    tenantId?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface FirebaseMaintenanceRequest {
    id: string;
    propertyId: string;
    userId: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
    assignedTo?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface FirebaseNotice {
    id: string;
    societyId: string;
    title: string;
    content: string;
    type: 'info' | 'warning' | 'error';
    priority: 'low' | 'medium' | 'high';
    isImportant: boolean;
    createdBy: string;
    startDate: Timestamp;
    endDate?: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface FirebasePayment {
    id: string;
    propertyId: string;
    userId: string;
    amount: number;
    type: 'rent' | 'maintenance' | 'other';
    status: 'pending' | 'completed' | 'failed';
    dueDate: Timestamp;
    paidDate?: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
} 