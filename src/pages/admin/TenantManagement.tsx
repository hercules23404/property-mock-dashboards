import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { firestore, auth } from '@/lib/firebase';
import { collection, addDoc, getDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import { sendWelcomeEmail } from '@/lib/email';
import { Loader2, ArrowLeft, UserPlus, Users, Building } from 'lucide-react';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createTenantUser } from '@/lib/supabase';

interface TenantFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    unitNumber: string;
}

interface Tenant {
    id: string;
    name: string;
    email: string;
    phone: string;
    unitNumber: string;
    createdAt: any;
}

interface Society {
    id: string;
    name: string;
    address: string;
    totalUnits: number;
    occupiedUnits: number;
}

const TenantManagement: React.FC = () => {
    const { societyId } = useParams<{ societyId: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [society, setSociety] = useState<Society | null>(null);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<TenantFormData>({
        name: '',
        email: '',
        phone: '',
        password: '',
        unitNumber: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!societyId || !user) return;
            
            try {
                setLoading(true);
                
                const societyDoc = await getDoc(doc(firestore, 'societies', societyId));
                if (societyDoc.exists()) {
                    setSociety({
                        id: societyDoc.id,
                        ...societyDoc.data()
                    } as Society);
                } else {
                    toast.error("Society not found");
                    navigate('/admin');
                    return;
                }
                
                const tenantsRef = collection(firestore, 'profiles');
                const q = query(tenantsRef, where("societyId", "==", societyId), where("role", "==", "tenant"));
                const querySnapshot = await getDocs(q);
                
                const tenantsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate()
                })) as Tenant[];
                
                setTenants(tenantsData);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [societyId, user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateRandomPassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    const handleCreateTenant = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!societyId || !society) return;
        
        try {
            setCreating(true);
            
            const tenantPassword = formData.password || generateRandomPassword();
            
            const tenantData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                unitNumber: formData.unitNumber,
                societyId: societyId,
                societyName: society.name,
                role: 'tenant',
                createdAt: new Date(),
                createdBy: user?.uid,
            };
            
            const { user: newUser } = await createTenantUser(
              formData.email, 
              tenantPassword, 
              tenantData
            );
            
            if (!newUser) throw new Error("Failed to create user account");
            
            await addDoc(collection(firestore, 'user_roles'), {
                user_id: newUser.uid,
                society_id: societyId,
                role: 'tenant'
            });
            
            await sendWelcomeEmail(formData.email, {
                name: formData.name,
                email: formData.email,
                password: tenantPassword,
                societyName: society.name
            });
            
            setTenants(prev => [
                ...prev,
                {
                    id: newUser.uid,
                    ...tenantData,
                    createdAt: new Date()
                } as Tenant
            ]);
            
            setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                unitNumber: '',
            });
            
            setOpen(false);
            toast.success("Tenant added successfully! Welcome email sent.");
        } catch (error: any) {
            console.error("Error creating tenant:", error);
            toast.error(error.message || "Failed to create tenant");
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" onClick={() => navigate('/admin')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold">{society?.name} - Tenant Management</h1>
                </div>
                
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" /> Add New Tenant
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                            <DialogTitle>Add New Tenant</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateTenant} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
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
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="unitNumber">Unit Number</Label>
                                <Input
                                    id="unitNumber"
                                    name="unitNumber"
                                    value={formData.unitNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    Password (Optional - will be generated if left blank)
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={creating}>
                                    {creating ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Add Tenant"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatisticsCard
                    title="Total Units"
                    value={society?.totalUnits.toString() || "0"}
                    icon={<Building className="h-4 w-4 text-muted-foreground" />}
                />
                <StatisticsCard
                    title="Occupied Units"
                    value={society?.occupiedUnits.toString() || "0"}
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
                <StatisticsCard
                    title="Total Tenants"
                    value={tenants.length.toString()}
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
            </div>

            {tenants.length === 0 ? (
                <Card className="p-8">
                    <div className="text-center space-y-4">
                        <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                        <CardTitle>No Tenants Found</CardTitle>
                        <p className="text-muted-foreground">You haven't added any tenants to this society yet.</p>
                        <Button onClick={() => setOpen(true)}>
                            <UserPlus className="mr-2 h-4 w-4" /> Add Your First Tenant
                        </Button>
                    </div>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Tenants</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="text-left p-3">Name</th>
                                        <th className="text-left p-3">Unit</th>
                                        <th className="text-left p-3">Email</th>
                                        <th className="text-left p-3">Phone</th>
                                        <th className="text-left p-3">Added Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tenants.map((tenant) => (
                                        <tr key={tenant.id} className="border-b hover:bg-muted/50">
                                            <td className="p-3">{tenant.name}</td>
                                            <td className="p-3">{tenant.unitNumber}</td>
                                            <td className="p-3">{tenant.email}</td>
                                            <td className="p-3">{tenant.phone}</td>
                                            <td className="p-3">
                                                {tenant.createdAt instanceof Date 
                                                    ? tenant.createdAt.toLocaleDateString() 
                                                    : new Date(tenant.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default TenantManagement;
