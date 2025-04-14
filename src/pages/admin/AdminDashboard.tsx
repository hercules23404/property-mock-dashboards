
import React from "react";
import { Home, Users, Wrench, Bell, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { ActivityList } from "@/components/ui/activity-list";
import { mockDashboardStats, mockActivities, mockProperties } from "@/utils/mockData";

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Alex! Here's an overview of your properties.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Properties"
            value={mockDashboardStats.admin.properties}
            icon={<Home className="h-8 w-8" />}
          />
          <StatCard
            title="Total Tenants"
            value={mockDashboardStats.admin.tenants}
            icon={<Users className="h-8 w-8" />}
          />
          <StatCard
            title="Active Maintenance"
            value={mockDashboardStats.admin.maintenanceRequests}
            icon={<Wrench className="h-8 w-8" />}
          />
          <StatCard
            title="Vacant Units"
            value={mockDashboardStats.admin.vacancies}
            icon={<Home className="h-8 w-8" />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard
                  title="Collected Rent"
                  value={mockDashboardStats.admin.collectedRent}
                  trend="up"
                  trendValue="3.2% from last month"
                  className="border-none shadow-none"
                />
                <StatCard
                  title="Pending Rent"
                  value={mockDashboardStats.admin.pendingRent}
                  trend="down"
                  trendValue="5.1% from last month"
                  className="border-none shadow-none"
                />
              </div>
              <div className="h-[200px] mt-6 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Financial Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>
          
          <ActivityList activities={mockActivities.admin} title="Recent Activities" />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Properties Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockProperties.slice(0, 3).map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{property.address}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Units</p>
                      <p className="font-medium">{property.units}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Occupancy</p>
                      <p className="font-medium">{property.occupancyRate}%</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="text-sm text-pm-blue flex items-center font-medium hover:underline">
                      View Property <ArrowUpRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
