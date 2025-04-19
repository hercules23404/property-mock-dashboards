
import React from "react";
import { Home, Users, Wrench, Bell } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { ActivityList } from "@/components/ui/activity-list";
import { mockDashboardStats, mockActivities } from "@/utils/mockData";

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your society overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Properties"
            value="50"
            icon={<Home className="h-8 w-8" />}
          />
          <StatCard
            title="Total Tenants"
            value="42"
            icon={<Users className="h-8 w-8" />}
          />
          <StatCard
            title="Maintenance Requests"
            value="7"
            icon={<Wrench className="h-8 w-8" />}
          />
          <StatCard
            title="New Notices"
            value="3"
            icon={<Bell className="h-8 w-8" />}
          />
        </div>

        <ActivityList
          activities={mockActivities.admin}
          title="Recent Activities"
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
