
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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

// Import route protectors
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import TenantRoute from './components/auth/TenantRoute';

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
  // Admin routes using AdminRoute component
  {
    element: <AdminRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminDashboard />
      },
      {
        path: '/admin/societies',
        element: <SocietyManagement />
      },
      {
        path: '/admin/notices',
        element: <ManageNotices />
      },
      {
        path: '/admin/tenants/:societyId',
        element: <TenantManagement />
      },
      {
        path: '/societies',
        element: <SocietyManagement />
      },
      {
        path: '/tenants',
        element: <Tenants />
      }
    ]
  },
  // Tenant routes using TenantRoute component
  {
    element: <TenantRoute />,
    children: [
      {
        path: '/tenant',
        element: <TenantDashboard />
      },
      {
        path: '/tenant/property',
        element: <MyProperty />
      },
      {
        path: '/tenant/notices',
        element: <TenantNotices />
      }
    ]
  },
  // General protected routes
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/maintenance',
        element: <Maintenance />
      },
      {
        path: '/notices',
        element: <Notices />
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
