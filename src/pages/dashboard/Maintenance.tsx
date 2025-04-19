import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

const Maintenance: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Maintenance</h1>
                <Button onClick={() => navigate('/admin/maintenance')}>
                    <Wrench className="mr-2 h-4 w-4" />
                    Manage Maintenance
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Maintenance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>No maintenance requests found.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Maintenance; 