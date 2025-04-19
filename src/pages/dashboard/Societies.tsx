import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building } from 'lucide-react';

const Societies: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Societies</h1>
                <Button onClick={() => navigate('/admin/societies')}>
                    <Building className="mr-2 h-4 w-4" />
                    Manage Societies
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Society Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>No societies found. Create your first society to get started.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Societies; 