import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Societies from './pages/dashboard/Societies';
import Tenants from './pages/dashboard/Tenants';
import Maintenance from './pages/dashboard/Maintenance';
import Notices from './pages/dashboard/Notices';
import Profile from './pages/dashboard/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

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
    return <Navigate to="/login" />;
  }

  // Check if user has the required role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/tenant'} />;
  }

  return <DashboardLayout role={user.role}>{children}</DashboardLayout>;
};

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/tenant'} /> : <Index />} />

          {/* Auth Routes */}
          <Route element={<AuthLayout><Outlet /></AuthLayout>}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/societies" element={<ProtectedRoute requiredRole="admin"><Societies /></ProtectedRoute>} />
          <Route path="/tenants" element={<ProtectedRoute requiredRole="admin"><Tenants /></ProtectedRoute>} />

          {/* Tenant Routes */}
          <Route path="/tenant" element={<ProtectedRoute requiredRole="tenant"><TenantDashboard /></ProtectedRoute>} />
          <Route path="/tenant/property" element={<ProtectedRoute requiredRole="tenant"><MyProperty /></ProtectedRoute>} />
          <Route path="/tenant/notices" element={<ProtectedRoute requiredRole="tenant"><TenantNotices /></ProtectedRoute>} />

          {/* Common Protected Routes */}
          <Route path="/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
          <Route path="/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
