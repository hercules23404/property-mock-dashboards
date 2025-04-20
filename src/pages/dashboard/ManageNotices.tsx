import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface Notice {
    id: string;
    title: string;
    content: string;
    type: string;
    priority: string;
    createdAt: string;
    societyId: string;
}

export default function ManageNotices() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'general',
        priority: 'low',
    });
    const [loading, setLoading] = useState(false);
    const [notices, setNotices] = useState<Notice[]>([]);

    useEffect(() => {
        if (!user?.societyId) return;

        const fetchNotices = async () => {
            try {
                const noticesQuery = query(
                    collection(firestore, 'notices'),
                    where('societyId', '==', user.societyId),
                    orderBy('createdAt', 'desc')
                );
                const snapshot = await getDocs(noticesQuery);
                const noticesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Notice[];
                setNotices(noticesData);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchNotices();
    }, [user?.societyId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.societyId) return;

        try {
            setLoading(true);
            const noticeRef = await addDoc(collection(firestore, 'notices'), {
                ...formData,
                societyId: user.societyId,
                createdAt: Timestamp.now(),
                status: 'active'
            });

            toast({
                title: 'Success',
                description: 'Notice created successfully',
            });
            setFormData({
                title: '',
                content: '',
                type: 'general',
                priority: 'low',
            });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto py-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Notice</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter notice title"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select notice type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="general">General</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                        <SelectItem value="emergency">Emergency</SelectItem>
                                        <SelectItem value="event">Event</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select
                                    value={formData.priority}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter notice content"
                                    className="min-h-[150px]"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Notice'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Notices</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {notices.map((notice) => (
                            <div key={notice.id} className="border rounded-lg p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">{notice.title}</h3>
                                    <Badge className={getPriorityColor(notice.priority)}>
                                        {notice.priority}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600">{notice.content}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>{notice.type}</span>
                                    <span>{format(new Date(notice.createdAt), 'MMM d, yyyy h:mm a')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 