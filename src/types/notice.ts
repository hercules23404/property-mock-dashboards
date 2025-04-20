export interface Notice {
    id: string;
    title: string;
    content: string;
    type: 'info' | 'warning' | 'error';
    priority: 'low' | 'medium' | 'high';
    societyId: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    startDate: Date;
    endDate: Date;
    isImportant: boolean;
}

export interface Comment {
    id: string;
    noticeId: string;
    content: string;
    createdBy: string;
    createdAt: Date;
} 