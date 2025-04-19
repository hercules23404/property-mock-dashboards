export interface Complaint {
    id: string;
    title: string;
    description: string;
    userId: string;
    societyId: string;
    status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
    priority: 'low' | 'medium' | 'high';
    category: 'maintenance' | 'security' | 'noise' | 'cleanliness' | 'other';
    createdAt: Date;
    updatedAt: Date;
    resolvedAt?: Date;
    assignedTo?: string;
    attachments?: string[];
    comments?: {
        userId: string;
        content: string;
        createdAt: Date;
    }[];
    location?: string;
    contactNumber?: string;
    preferredResolutionTime?: Date;
    isAnonymous: boolean;
} 