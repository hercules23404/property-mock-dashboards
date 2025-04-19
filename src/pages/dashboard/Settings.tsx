import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const SettingsPage: React.FC = () => {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Settings</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Application Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <Settings className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-medium">Loading settings...</p>
                            <p className="text-sm text-muted-foreground">Please wait while we load your settings</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsPage; 