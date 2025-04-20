
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Users, Bell, Settings, FileText, Shield, ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/tenant');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">PropertyManagePro</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Property Management Simplified</h1>
            <p className="text-xl mb-8 text-blue-100">
              Streamline your property management operations with our comprehensive platform
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/admin-signup')}
                className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center"
              >
                Sign up as Admin
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/tenant-login')}
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Tenant Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">Manage your properties efficiently with our comprehensive features</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 className="h-12 w-12 text-primary" />,
                title: 'Property Management',
                description: 'Efficiently manage multiple properties with detailed tracking and reporting'
              },
              {
                icon: <Users className="h-12 w-12 text-primary" />,
                title: 'Tenant Management',
                description: 'Streamline tenant onboarding, communication, and document management'
              },
              {
                icon: <Bell className="h-12 w-12 text-primary" />,
                title: 'Maintenance Requests',
                description: 'Track and manage maintenance requests with real-time updates'
              },
              {
                icon: <FileText className="h-12 w-12 text-primary" />,
                title: 'Document Management',
                description: 'Secure storage and easy access to all property-related documents'
              },
              {
                icon: <Settings className="h-12 w-12 text-primary" />,
                title: 'Automated Workflows',
                description: 'Automate routine tasks and streamline your operations'
              },
              {
                icon: <Shield className="h-12 w-12 text-primary" />,
                title: 'Secure Platform',
                description: 'Enterprise-grade security to protect your data and privacy'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Role</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Property Manager</h3>
                <p className="text-gray-600 mb-6">
                  Manage multiple properties, handle maintenance requests, and communicate with tenants efficiently.
                </p>
                <button
                  onClick={() => navigate('/admin-signup')}
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign up as Admin
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tenant</h3>
                <p className="text-gray-600 mb-6">
                  Access property details, submit maintenance requests, and stay updated with property notices.
                </p>
                <button
                  onClick={() => navigate('/tenant-login')}
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Tenant Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PropertyManagePro</span>
            </div>
            <div className="text-gray-400">
              © {new Date().getFullYear()} PropertyManagePro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
