import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

const ReportsPage: React.FC = () => {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Reports</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <BarChart className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-medium">Loading reports...</p>
                            <p className="text-sm text-muted-foreground">Please wait while we load your reports</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReportsPage; 