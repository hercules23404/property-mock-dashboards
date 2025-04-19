import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            <Card>
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.name || 'User'}
                                    className="h-12 w-12 rounded-full"
                                />
                            ) : (
                                <User className="h-6 w-6" />
                            )}
                        </div>
                        <div>
                            <p className="font-medium">{user?.name || user?.email}</p>
                            <p className="text-sm text-muted-foreground">{user?.role}</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                            <p className="mt-1">{user?.email}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                            <p className="mt-1 capitalize">{user?.role}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Account Created</h3>
                            <p className="mt-1">
                                {user?.metadata?.creationTime
                                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                                    : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Last Sign In</h3>
                            <p className="mt-1">
                                {user?.metadata?.lastSignInTime
                                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                                    : 'N/A'}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage; 