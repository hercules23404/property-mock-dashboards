import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'tenant';
}

const adminNavigationItems = [
  { name: "Dashboard", href: "/admin", icon: User },
  { name: "Society Management", href: "/admin/society-management", icon: User },
  { name: "Tenant Management", href: "/admin/tenant-management", icon: User },
  { name: "Property Listings", href: "/admin/property-listings", icon: User },
  { name: "Maintenance Requests", href: "/admin/maintenance-requests", icon: User },
  { name: "Notice Board", href: "/admin/notices", icon: User },
];

const tenantNavigationItems = [
  { name: "Dashboard", href: "/tenant", icon: User },
  { name: "My Property", href: "/tenant/property", icon: User },
  { name: "Maintenance", href: "/tenant/maintenance", icon: User },
  { name: "Notices", href: "/tenant/notices", icon: User },
  { name: "Documents", href: "/tenant/documents", icon: User },
];

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigationItems = role === "admin" ? adminNavigationItems : tenantNavigationItems;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  // Get user's initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">
              {role === "admin" ? "Admin Dashboard" : "Tenant Portal"}
            </h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt={user?.name || ""} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
  );
};

export default DashboardLayout;
