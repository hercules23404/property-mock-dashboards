
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import AdminSignup from './pages/auth/AdminSignup';
import TenantLogin from './pages/auth/TenantLogin';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Societies from './pages/dashboard/Societies';
import Tenants from './pages/dashboard/Tenants';
import Maintenance from './pages/dashboard/Maintenance';
import Notices from './pages/dashboard/Notices';
import Profile from './pages/dashboard/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import SocietyManagement from './pages/admin/SocietyManagement';
import ManageNotices from './pages/admin/ManageNotices';
import TenantManagement from './pages/admin/TenantManagement';

// Tenant Pages
import TenantDashboard from './pages/tenant/TenantDashboard';
import MyProperty from './pages/tenant/MyProperty';
import TenantNotices from './pages/tenant/TenantNotices';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'tenant';
}

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/tenant'} replace />;
  }

  return <>{children}</>;
};

// Create the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/login',
    element: <AuthLayout><Login /></AuthLayout>,
  },
  {
    path: '/signup',
    element: <AuthLayout><Signup /></AuthLayout>,
  },
  {
    path: '/admin-signup',
    element: <AuthLayout><AdminSignup /></AuthLayout>,
  },
  {
    path: '/tenant-login',
    element: <AuthLayout><TenantLogin /></AuthLayout>,
  },
  {
    path: '/admin',
    element: <ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: '/admin/societies',
    element: <ProtectedRoute requiredRole="admin"><SocietyManagement /></ProtectedRoute>,
  },
  {
    path: '/admin/notices',
    element: <ProtectedRoute requiredRole="admin"><ManageNotices /></ProtectedRoute>,
  },
  {
    path: '/admin/tenants/:societyId',
    element: <ProtectedRoute requiredRole="admin"><TenantManagement /></ProtectedRoute>,
  },
  {
    path: '/societies',
    element: <ProtectedRoute requiredRole="admin"><SocietyManagement /></ProtectedRoute>,
  },
  {
    path: '/tenants',
    element: <ProtectedRoute requiredRole="admin"><Tenants /></ProtectedRoute>,
  },
  {
    path: '/tenant',
    element: <ProtectedRoute requiredRole="tenant"><TenantDashboard /></ProtectedRoute>,
  },
  {
    path: '/tenant/property',
    element: <ProtectedRoute requiredRole="tenant"><MyProperty /></ProtectedRoute>,
  },
  {
    path: '/tenant/notices',
    element: <ProtectedRoute requiredRole="tenant"><TenantNotices /></ProtectedRoute>,
  },
  {
    path: '/maintenance',
    element: <ProtectedRoute><Maintenance /></ProtectedRoute>,
  },
  {
    path: '/notices',
    element: <ProtectedRoute><Notices /></ProtectedRoute>,
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
