
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'tenant';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Allow a short delay to make sure auth state is fully loaded
    const timer = setTimeout(() => {
      if (!user) {
        navigate('/login');
        return;
      }

      if (requiredRole && profile?.role !== requiredRole) {
        navigate(profile?.role === 'admin' ? '/admin' : '/tenant');
      }
      
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user, profile, requiredRole, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (requiredRole && profile?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
