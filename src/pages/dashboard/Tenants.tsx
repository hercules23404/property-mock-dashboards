import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Plus } from 'lucide-react';
import { firestore } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

interface Tenant {
    id: string;
    name: string;
    email: string;
    phone: string;
    unitNumber: string;
    rentAmount: number;
    leaseStartDate: string;
    leaseEndDate: string;
}

const Tenants: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                if (user?.societyId) {
                    const tenantsRef = collection(firestore, 'tenants');
                    const q = query(tenantsRef, where('societyId', '==', user.societyId));
                    const querySnapshot = await getDocs(q);

                    const tenantsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as Tenant[];

                    setTenants(tenantsData);
                }
            } catch (error) {
                console.error('Error fetching tenants:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTenants();
    }, [user?.societyId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Tenants</h1>
                <Button onClick={() => navigate('/admin/tenants')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Tenant
                </Button>
            </div>

            {tenants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tenants.map((tenant) => (
                        <Card key={tenant.id} className="hover:bg-accent cursor-pointer" onClick={() => navigate(`/admin/tenants/${tenant.id}`)}>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <Users className="h-6 w-6" />
                                    <div>
                                        <h3 className="font-semibold">{tenant.name}</h3>
                                        <p className="text-sm text-muted-foreground">Unit {tenant.unitNumber}</p>
                                        <p className="text-sm text-muted-foreground">₹{tenant.rentAmount}/month</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>No Tenants Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>No tenants have been added to your society yet. Add your first tenant to get started.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Tenants; 