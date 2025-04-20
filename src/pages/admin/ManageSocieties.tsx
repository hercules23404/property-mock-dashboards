import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { firestore } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

interface SocietyFormData {
    name: string;
    address: string;
    description: string;
    contactNumber: string;
    email: string;
}

const ManageSocieties: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user, updateUserSociety } = useAuth();
    const [formData, setFormData] = useState<SocietyFormData>({
        name: '',
        address: '',
        description: '',
        contactNumber: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!user) {
                throw new Error('User not authenticated');
            }

            // Create society document
            const societiesRef = collection(firestore, 'societies');
            const societyDoc = await addDoc(societiesRef, {
                ...formData,
                createdAt: new Date(),
                updatedAt: new Date(),
                mainAdminId: user.uid,
            });

            // Create admin permissions document
            const adminPermissionsRef = doc(firestore, 'societyAdmins', societyDoc.id);
            await setDoc(adminPermissionsRef, {
                adminId: user.uid,
                societyId: societyDoc.id,
                permissions: ['all'],
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // Update user's society reference
            await updateUserSociety(societyDoc.id);

            toast({
                title: 'Success',
                description: 'Society created successfully',
            });

            // Force a reload of the user data
            window.location.href = '/societies';
        } catch (error: any) {
            console.error('Error creating society:', error);
            toast({
                title: 'Error',
                description: error.message || 'Failed to create society',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Societies</h1>
                <Button variant="outline" onClick={() => navigate('/societies')}>
                    Back to Societies
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Society</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Society Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input
                                id="contactNumber"
                                name="contactNumber"
                                type="tel"
                                value={formData.contactNumber}
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

                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Society'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageSocieties; 