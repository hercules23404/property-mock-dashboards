
import { useNavigate } from "react-router-dom";
import { BuildingIcon, UserIcon, Shield, Home, Users, Key, FileText, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold text-pm-gray-dark">
            PropertyManage<span className="text-pm-blue">Pro</span>
          </h1>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin")} 
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Admin Demo
            </Button>
            <Button 
              onClick={() => navigate("/tenant")} 
              className="flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              Tenant Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-pm-gray-dark">
            Property Management <span className="text-pm-blue">Simplified</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-pm-gray-dark">
            A comprehensive platform for landlords, property managers, and tenants to streamline rental operations and enhance communication.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/admin")} 
              className="flex items-center gap-2 text-lg"
            >
              <BuildingIcon className="h-5 w-5" />
              Admin Dashboard
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/tenant")} 
              className="flex items-center gap-2 text-lg"
            >
              <UserIcon className="h-5 w-5" />
              Tenant Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Property Management"
              description="Easily manage multiple properties, units, and common areas from a centralized dashboard."
              icon={<Home className="h-12 w-12 text-pm-blue" />}
            />
            <FeatureCard
              title="Tenant Management"
              description="Keep track of tenant information, lease agreements, rent payments, and communication history."
              icon={<Users className="h-12 w-12 text-pm-blue" />}
            />
            <FeatureCard
              title="Maintenance Requests"
              description="Submit, track, and manage maintenance requests with priority levels and status updates."
              icon={<BuildingIcon className="h-12 w-12 text-pm-blue" />}
            />
            <FeatureCard
              title="Document Management"
              description="Store and organize important documents like leases, inspections, and insurance policies."
              icon={<FileText className="h-12 w-12 text-pm-blue" />}
            />
            <FeatureCard
              title="Notice Board"
              description="Share important announcements, updates, and community information with tenants."
              icon={<BuildingIcon className="h-12 w-12 text-pm-blue" />}
            />
            <FeatureCard
              title="Analytics & Reports"
              description="Access insightful data on occupancy rates, rental income, expenses, and maintenance trends."
              icon={<BarChart className="h-12 w-12 text-pm-blue" />}
            />
          </div>
        </div>
      </section>

      {/* Role Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Role</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <RoleCard 
              title="Property Manager"
              description="Access comprehensive tools to manage properties, tenants, maintenance, and finances."
              icon={<Shield className="h-16 w-16 text-pm-blue" />}
              buttonText="Admin Dashboard"
              onClick={() => navigate("/admin")}
            />
            <RoleCard 
              title="Tenant"
              description="View your property details, submit maintenance requests, access documents, and receive notices."
              icon={<Key className="h-16 w-16 text-pm-teal" />}
              buttonText="Tenant Portal"
              onClick={() => navigate("/tenant")}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold mb-2">PropertyManagePro</h2>
          <p className="text-slate-300">A demonstration wireframe for a property management application</p>
          <p className="text-slate-400 mt-4 text-sm">© 2023 PropertyManagePro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => {
  return (
    <Card className="border border-gray-200 transition-all hover:shadow-md">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-blue-50 p-3">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const RoleCard = ({ 
  title, 
  description, 
  icon, 
  buttonText, 
  onClick 
}: { 
  title: string, 
  description: string, 
  icon: React.ReactNode, 
  buttonText: string, 
  onClick: () => void 
}) => {
  return (
    <Card className="border border-gray-200 hover:shadow-lg transition-all">
      <CardHeader className="text-center pt-6">
        <div className="mx-auto mb-4">{icon}</div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-6">
        <Button onClick={onClick} size="lg" className="px-8">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Index;
