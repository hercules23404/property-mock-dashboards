
import React from "react";
import { Home, FileText, Wrench, Bell, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { ActivityList } from "@/components/ui/activity-list";
import { mockDashboardStats, mockActivities, mockNotices, mockMaintenanceRequests } from "@/utils/mockData";

const TenantDashboard = () => {
  const nextMaintenanceDate = new Date();
  nextMaintenanceDate.setDate(nextMaintenanceDate.getDate() + 3);
  
  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Jordan! Here's an overview of your property.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Next Rent Payment"
            value={mockDashboardStats.tenant.nextPayment}
            description={`Due: ${mockDashboardStats.tenant.dueDate}`}
            icon={<Home className="h-8 w-8" />}
          />
          <StatCard
            title="Active Requests"
            value={mockDashboardStats.tenant.maintenanceRequests}
            icon={<Wrench className="h-8 w-8" />}
          />
          <StatCard
            title="Unread Notices"
            value="3"
            icon={<Bell className="h-8 w-8" />}
          />
          <StatCard
            title="My Documents"
            value={mockDashboardStats.tenant.documents}
            icon={<FileText className="h-8 w-8" />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Rent Payment Due</p>
                      <p className="text-muted-foreground text-sm">July 1, 2023</p>
                    </div>
                  </div>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                    12 days
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Maintenance Visit</p>
                      <p className="text-muted-foreground text-sm">{nextMaintenanceDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-md">
                    3 days
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Building Inspection</p>
                      <p className="text-muted-foreground text-sm">July 15, 2023</p>
                    </div>
                  </div>
                  <span className="text-sm px-2 py-1 bg-purple-100 text-purple-700 rounded-md">
                    26 days
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <ActivityList activities={mockActivities.tenant} title="Recent Updates" />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Notices</h2>
          <div className="grid grid-cols-1 gap-4">
            {mockNotices.slice(0, 3).map((notice) => (
              <Card key={notice.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{notice.title}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {notice.datePosted}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2">{notice.content}</p>
                  <div className="mt-2 flex justify-end">
                    <button className="text-sm text-pm-blue font-medium hover:underline">
                      Read More
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

export default TenantDashboard;
