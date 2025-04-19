import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const Tenants: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Tenants</h1>
                <Button onClick={() => navigate('/admin/tenants')}>
                    <Users className="mr-2 h-4 w-4" />
                    Manage Tenants
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Tenant Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>No tenants found. Add tenants to get started.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Tenants; 