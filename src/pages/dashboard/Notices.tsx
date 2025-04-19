import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

const Notices: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Notices</h1>
                <Button onClick={() => navigate('/admin/notices')}>
                    <Bell className="mr-2 h-4 w-4" />
                    Manage Notices
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Notices Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>No notices found.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Notices; 