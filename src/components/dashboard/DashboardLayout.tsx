import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminNavigationItems, tenantNavigationItems } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/utils/mockData";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuth();
  
  const navigationItems = role === "admin" ? adminNavigationItems : tenantNavigationItems;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <ProtectedRoute requiredRole={role}>
      <div className="min-h-screen flex flex-col">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-pm-gray-dark">
                PropertyManage<span className="text-pm-blue">Pro</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="hidden md:inline-block">{profile.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside
            className={cn(
              "bg-sidebar text-sidebar-foreground w-64 flex-shrink-0 fixed left-0 top-16 bottom-0 z-20 transition-transform duration-300 ease-in-out md:translate-x-0",
              !sidebarOpen && "-translate-x-full"
            )}
          >
            <div className="flex flex-col h-full py-6">
              {/* Close button for mobile */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2 md:hidden text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
                onClick={toggleSidebar}
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="space-y-1 px-3 mt-6">
                {navigationItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                      location.pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                    onClick={() => {
                      navigate(item.href);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Button>
                ))}
              </div>
              
              <div className="mt-auto px-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log Out</span>
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main 
            className={cn(
              "flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out",
              sidebarOpen ? "md:ml-64" : "ml-0"
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
