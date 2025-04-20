import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { firestore } from '@/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Notice, Comment } from '@/types/notice';
import { Edit, MessageSquare, Send } from 'lucide-react';

type NoticeType = 'info' | 'warning' | 'error';
type NoticePriority = 'low' | 'medium' | 'high';

interface NoticeFormData {
    title: string;
    content: string;
    type: NoticeType;
    priority: NoticePriority;
    startDate: string;
    endDate: string;
    isImportant: boolean;
}

export default function Notices() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [notices, setNotices] = useState<Notice[]>([]);
    const [comments, setComments] = useState<Record<string, Comment[]>>({});
    const [loading, setLoading] = useState(true);
    const [newNotice, setNewNotice] = useState<NoticeFormData>({
        title: '',
        content: '',
        type: 'info',
        priority: 'medium',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isImportant: false
    });
    const [newComment, setNewComment] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!user?.societyId) return;

        const noticesQuery = query(
            collection(firestore, 'notices'),
            where('societyId', '==', user.societyId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribeNotices = onSnapshot(noticesQuery, (snapshot) => {
            const noticesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate(),
                updatedAt: doc.data().updatedAt?.toDate(),
                startDate: doc.data().startDate?.toDate(),
                endDate: doc.data().endDate?.toDate()
            })) as Notice[];
            setNotices(noticesData);
            setLoading(false);
        });

        return () => unsubscribeNotices();
    }, [user?.societyId]);

    useEffect(() => {
        if (notices.length === 0) return;

        const unsubscribeComments = notices.map(notice => {
            const commentsQuery = query(
                collection(firestore, 'comments'),
                where('noticeId', '==', notice.id),
                orderBy('createdAt', 'asc')
            );

            return onSnapshot(commentsQuery, (snapshot) => {
                const commentsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate()
                })) as Comment[];
                setComments(prev => ({ ...prev, [notice.id]: commentsData }));
            });
        });

        return () => unsubscribeComments.forEach(unsubscribe => unsubscribe());
    }, [notices]);

    const handleSubmitNotice = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.societyId) return;

        try {
            await addDoc(collection(firestore, 'notices'), {
                ...newNotice,
                societyId: user.societyId,
                createdBy: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                startDate: new Date(newNotice.startDate),
                endDate: new Date(newNotice.endDate)
            });

            setNewNotice({
                title: '',
                content: '',
                type: 'info',
                priority: 'medium',
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                isImportant: false
            });

            toast({
                title: 'Success',
                description: 'Notice created successfully'
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create notice',
                variant: 'destructive'
            });
        }
    };

    const handleAddComment = async (noticeId: string) => {
        if (!newComment[noticeId]?.trim()) return;

        try {
            await addDoc(collection(firestore, 'comments'), {
                noticeId,
                content: newComment[noticeId],
                createdBy: user?.uid,
                createdAt: serverTimestamp()
            });

            setNewComment(prev => ({ ...prev, [noticeId]: '' }));
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to add comment',
                variant: 'destructive'
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Notice</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitNotice} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <Input
                                    value={newNotice.title}
                                    onChange={(e) => setNewNotice(prev => ({ ...prev, title: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <Select
                                    value={newNotice.type}
                                    onValueChange={(value) => setNewNotice(prev => ({ ...prev, type: value as NoticeType }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="info">Info</SelectItem>
                                        <SelectItem value="warning">Warning</SelectItem>
                                        <SelectItem value="error">Error</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Content</label>
                            <Textarea
                                value={newNotice.content}
                                onChange={(e) => setNewNotice(prev => ({ ...prev, content: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Priority</label>
                                <Select
                                    value={newNotice.priority}
                                    onValueChange={(value) => setNewNotice(prev => ({ ...prev, priority: value as NoticePriority }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Date</label>
                                <Input
                                    type="date"
                                    value={newNotice.startDate}
                                    onChange={(e) => setNewNotice(prev => ({ ...prev, startDate: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">End Date</label>
                                <Input
                                    type="date"
                                    value={newNotice.endDate}
                                    onChange={(e) => setNewNotice(prev => ({ ...prev, endDate: e.target.value }))}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="isImportant"
                                checked={newNotice.isImportant}
                                onChange={(e) => setNewNotice(prev => ({ ...prev, isImportant: e.target.checked }))}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <label htmlFor="isImportant" className="text-sm font-medium">
                                Mark as Important
                            </label>
                        </div>
                        <Button type="submit">Create Notice</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {notices.map(notice => (
                    <Card key={notice.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        {notice.title}
                                        {notice.isImportant && (
                                            <span className="text-red-500 text-sm">(Important)</span>
                                        )}
                                    </CardTitle>
                                    <div className="flex gap-2 mt-2">
                                        <span className={`px-2 py-1 rounded text-xs ${notice.type === 'info' ? 'bg-blue-100 text-blue-800' :
                                            notice.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {notice.type}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs ${notice.priority === 'low' ? 'bg-green-100 text-green-800' :
                                            notice.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {notice.priority} priority
                                        </span>
                                    </div>
                                </div>
                                {user?.uid === notice.createdBy && (
                                    <Button variant="ghost" size="sm">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-gray-600">{notice.content}</p>
                                <div className="text-sm text-gray-500">
                                    Posted on {notice.createdAt.toLocaleDateString()}
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <MessageSquare className="h-4 w-4" />
                                        <h4 className="font-medium">Comments</h4>
                                    </div>
                                    <div className="space-y-4">
                                        {comments[notice.id]?.map(comment => (
                                            <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                                                <p className="text-sm">{comment.content}</p>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Posted on {comment.createdAt.toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex gap-2">
                                            <Input
                                                value={newComment[notice.id] || ''}
                                                onChange={(e) => setNewComment(prev => ({ ...prev, [notice.id]: e.target.value }))}
                                                placeholder="Add a comment..."
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleAddComment(notice.id)}
                                            >
                                                <Send className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 