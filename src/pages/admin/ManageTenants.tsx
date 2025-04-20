import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { firestore, auth } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import { sendWelcomeEmail } from '@/lib/email';

interface TenantFormData {
    name: string;
    email: string;
    phone: string;
}

const ManageTenants: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAuth();
    const [formData, setFormData] = useState<TenantFormData>({
        name: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.societyId) return;

        try {
            // Create tenant document
            const tenantRef = await addDoc(collection(firestore, 'tenants'), {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                societyId: user.societyId,
                societyName: user.societyName,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            // Send welcome email
            await sendWelcomeEmail();

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: ''
            });

            toast({
                title: 'Success',
                description: 'Tenant added successfully'
            });
        } catch (error) {
            console.error('Error adding tenant:', error);
            toast({
                title: 'Error',
                description: 'Failed to add tenant',
                variant: 'destructive'
            });
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
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Tenants</h1>
                <Button variant="outline" onClick={() => navigate('/tenants')}>
                    Back to Tenants
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Tenant</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Tenant'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageTenants; 