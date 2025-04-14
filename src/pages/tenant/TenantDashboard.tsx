
import React from "react";
import { Home, FileText, Wrench, Bell } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { ActivityList } from "@/components/ui/activity-list";
import { NoticeList } from "@/components/notices/NoticeList";
import ImportantDates from "@/components/dashboard/ImportantDates";
import { mockDashboardStats, mockActivities, mockNotices } from "@/utils/mockData";

const TenantDashboard = () => {
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
          <ImportantDates />
          <ActivityList activities={mockActivities.tenant} title="Recent Updates" />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Notices</h2>
          <NoticeList notices={mockNotices.slice(0, 3)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TenantDashboard;
