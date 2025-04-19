export interface Society {
    id: string;
    name: string;
    registrationNumber: string;
    address: string;
    adminId: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    contactNumber: string;
    email: string;
    website?: string;
    logo?: string;
    description?: string;
    facilities?: string[];
    rules?: {
        title: string;
        description: string;
    }[];
    maintenanceFee?: number;
    paymentFrequency?: 'monthly' | 'quarterly' | 'yearly';
    bankDetails?: {
        accountName: string;
        accountNumber: string;
        bankName: string;
        ifscCode: string;
    };
    settings?: {
        allowTenantComplaints: boolean;
        allowMaintenanceRequests: boolean;
        allowVisitorRegistration: boolean;
        allowDocumentUpload: boolean;
    };
} 