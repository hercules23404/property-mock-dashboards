export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'manager' | 'tenant';
    societyId?: string;
    photoURL?: string;
    createdAt?: Date;
    updatedAt?: Date;
    phoneNumber?: string;
    address?: string;
    profilePicture?: string;
    isActive: boolean;
    lastLogin?: Date;
    preferences?: {
        notifications: boolean;
        emailUpdates: boolean;
        darkMode: boolean;
    };
}

export interface Society {
    id: string;
    name: string;
    address: string;
    totalUnits: number;
    occupiedUnits: number;
    adminId: string;
    createdAt: Date;
    updatedAt: Date;
} 