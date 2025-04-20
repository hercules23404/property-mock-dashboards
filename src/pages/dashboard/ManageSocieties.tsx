import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManageSocieties() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            setLoading(true);

            // Create society document
            const societyRef = await addDoc(collection(firestore, 'societies'), {
                ...formData,
                adminId: user.uid,
                createdAt: new Date().toISOString(),
                status: 'active'
            });

            // Create admin permissions document
            await setDoc(doc(firestore, 'adminPermissions', user.uid), {
                societyId: societyRef.id,
                role: 'mainAdmin',
                permissions: ['manage_society', 'manage_tenants', 'manage_notices', 'manage_maintenance'],
                createdAt: new Date().toISOString()
            });

            // Update user's society reference
            await setDoc(doc(firestore, 'users', user.uid), {
                societyId: societyRef.id,
                societyName: formData.name
            }, { merge: true });

            toast({
                title: 'Success',
                description: 'Society created successfully',
            });
            navigate('/admin/societies');
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Society</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Society Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter society name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter society address"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter city"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter state"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zipCode">ZIP Code</Label>
                                <Input
                                    id="zipCode"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter ZIP code"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Society'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 