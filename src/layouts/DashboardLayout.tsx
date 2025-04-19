import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Users, Wrench, Bell, User } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    role?: 'admin' | 'tenant';
}

const adminNavigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Societies', href: '/societies', icon: Users },
    { name: 'Tenants', href: '/tenants', icon: Users },
    { name: 'Maintenance', href: '/maintenance', icon: Wrench },
    { name: 'Notices', href: '/notices', icon: Bell },
    { name: 'Profile', href: '/profile', icon: User },
];

const tenantNavigation = [
    { name: 'Dashboard', href: '/tenant', icon: Home },
    { name: 'My Property', href: '/tenant/property', icon: Home },
    { name: 'Maintenance', href: '/maintenance', icon: Wrench },
    { name: 'Notices', href: '/tenant/notices', icon: Bell },
    { name: 'Profile', href: '/profile', icon: User },
];

export default function DashboardLayout({ children, role = 'tenant' }: DashboardLayoutProps) {
    const location = useLocation();
    const { user, signOut } = useAuth();

    const navigation = role === 'admin' ? adminNavigation : tenantNavigation;

    return (
        <div className="min-h-screen bg-background">
            <div className="flex h-16 items-center justify-between px-4 border-b">
                <div className="flex items-center space-x-4">
                    <Link to={role === 'admin' ? '/admin' : '/tenant'} className="text-xl font-bold">
                        Property Management
                    </Link>
                    <nav className="flex space-x-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    'px-3 py-2 text-sm font-medium rounded-md inline-flex items-center gap-2',
                                    location.pathname === item.href
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                        {user?.name || user?.email}
                    </span>
                    <Button variant="outline" onClick={signOut}>
                        Logout
                    </Button>
                </div>
            </div>
            <main className="container mx-auto py-6 px-4">
                {children}
            </main>
        </div>
    );
} 