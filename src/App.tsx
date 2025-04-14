import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import SocietyManagement from "./pages/admin/SocietyManagement";
import TenantManagement from "./pages/admin/TenantManagement";
import PropertyListings from "./pages/admin/PropertyListings";
import MaintenanceRequests from "./pages/admin/MaintenanceRequests";
import NoticeBoard from "./pages/admin/NoticeBoard";

// Tenant pages
import TenantDashboard from "./pages/tenant/TenantDashboard";
import MyProperty from "./pages/tenant/MyProperty";
import TenantMaintenance from "./pages/tenant/TenantMaintenance";
import TenantNotices from "./pages/tenant/TenantNotices";
import MyDocuments from "./pages/tenant/MyDocuments";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/society-management" element={<SocietyManagement />} />
            <Route path="/admin/tenant-management" element={<TenantManagement />} />
            <Route path="/admin/property-listings" element={<PropertyListings />} />
            <Route path="/admin/maintenance-requests" element={<MaintenanceRequests />} />
            <Route path="/admin/notices" element={<NoticeBoard />} />
            
            {/* Tenant Routes */}
            <Route path="/tenant" element={<TenantDashboard />} />
            <Route path="/tenant/my-property" element={<MyProperty />} />
            <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
            <Route path="/tenant/notices" element={<TenantNotices />} />
            <Route path="/tenant/documents" element={<MyDocuments />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
