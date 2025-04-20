import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Edit, Users, Bell, Settings, DollarSign, Home, Calendar, AlertTriangle } from 'lucide-react';
import { firestore } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import BarChart from '@/components/dashboard/BarChart';

interface Society {
    id: string;
    name: string;
    address: string;
    description: string;
    contactNumber: string;
    email: string;
}

interface Tenant {
    id: string;
    name: string;
    rentAmount: number;
    leaseEndDate: string;
}

interface Notice {
    id: string;
    type: 'general' | 'maintenance' | 'emergency';
}

const Societies: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [society, setSociety] = useState<Society | null>(null);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribeSociety: () => void;
        let unsubscribeTenants: () => void;
        let unsubscribeNotices: () => void;

        const setupListeners = async () => {
            try {
                if (user?.societyId) {
                    // Set up society listener
                    const societyRef = doc(firestore, 'societies', user.societyId);
                    unsubscribeSociety = onSnapshot(societyRef, (doc) => {
                        if (doc.exists()) {
                            setSociety({ id: doc.id, ...doc.data() } as Society);
                        } else {
                            setSociety(null);
                        }
                    });

                    // Set up tenants listener
                    const tenantsRef = collection(firestore, 'tenants');
                    const tenantsQuery = query(tenantsRef, where('societyId', '==', user.societyId));
                    unsubscribeTenants = onSnapshot(tenantsQuery, (snapshot) => {
                        const tenantsData = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })) as Tenant[];
                        setTenants(tenantsData);
                    });

                    // Set up notices listener
                    const noticesRef = collection(firestore, 'notices');
                    const noticesQuery = query(noticesRef, where('societyId', '==', user.societyId));
                    unsubscribeNotices = onSnapshot(noticesQuery, (snapshot) => {
                        const noticesData = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })) as Notice[];
                        setNotices(noticesData);
                    });
                } else {
                    setSociety(null);
                    setTenants([]);
                    setNotices([]);
                }
            } catch (error) {
                console.error('Error setting up listeners:', error);
            } finally {
                setLoading(false);
            }
        };

        setupListeners();

        return () => {
            if (unsubscribeSociety) unsubscribeSociety();
            if (unsubscribeTenants) unsubscribeTenants();
            if (unsubscribeNotices) unsubscribeNotices();
        };
    }, [user?.societyId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const totalRent = tenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0);
    const expiringLeases = tenants.filter(tenant => {
        const endDate = new Date(tenant.leaseEndDate);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays > 0;
    }).length;

    const noticeTypes = notices.reduce((acc, notice) => {
        acc[notice.type] = (acc[notice.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="space-y-6">
            {society ? (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">{society.name}</h1>
                        <Button onClick={() => navigate('/admin/societies')}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Society
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatisticsCard
                            title="Total Tenants"
                            value={tenants.length}
                            icon={<Users className="h-4 w-4 text-muted-foreground" />}
                            description="Active tenants in the society"
                        />
                        <StatisticsCard
                            title="Monthly Rent"
                            value={`₹${totalRent.toLocaleString()}`}
                            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                            description="Total monthly rent collection"
                        />
                        <StatisticsCard
                            title="Expiring Leases"
                            value={expiringLeases}
                            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                            description="Leases ending in next 30 days"
                            trend={{ value: 5, isPositive: false }}
                        />
                        <StatisticsCard
                            title="Active Notices"
                            value={notices.length}
                            icon={<Bell className="h-4 w-4 text-muted-foreground" />}
                            description="Total active notices"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <BarChart
                            title="Notice Types Distribution"
                            data={Object.entries(noticeTypes).map(([type, count]) => ({
                                label: type.charAt(0).toUpperCase() + type.slice(1),
                                value: count,
                            }))}
                        />
                        <BarChart
                            title="Rent Distribution"
                            data={tenants.map(tenant => ({
                                label: tenant.name,
                                value: tenant.rentAmount,
                            }))}
                        />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Society Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <p>{society.address}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Contact</p>
                                    <p>{society.contactNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p>{society.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Description</p>
                                    <p>{society.description}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="cursor-pointer hover:bg-accent" onClick={() => navigate('/admin/tenants')}>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <Users className="h-6 w-6" />
                                    <div>
                                        <h3 className="font-semibold">Manage Tenants</h3>
                                        <p className="text-sm text-muted-foreground">View and manage society tenants</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:bg-accent" onClick={() => navigate('/admin/notices')}>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <Bell className="h-6 w-6" />
                                    <div>
                                        <h3 className="font-semibold">Manage Notices</h3>
                                        <p className="text-sm text-muted-foreground">Create and manage society notices</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:bg-accent" onClick={() => navigate('/admin/settings')}>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <Settings className="h-6 w-6" />
                                    <div>
                                        <h3 className="font-semibold">Society Settings</h3>
                                        <p className="text-sm text-muted-foreground">Configure society settings</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Societies</h1>
                        <Button onClick={() => navigate('/admin/societies')}>
                            <Building className="mr-2 h-4 w-4" />
                            Create Society
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>No Society Found</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>You haven't created or been assigned to any society yet. Create your first society to get started.</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Societies; 