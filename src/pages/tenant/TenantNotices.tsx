
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { NoticeList } from "@/components/notices/NoticeList";
import { mockNotices } from "@/utils/mockData";

const TenantNotices = () => {
  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <PageHeader 
          title="Notice Board"
          description="View important announcements from your society"
        />
        <SearchFilters placeholder="Search notices..." />
        <NoticeList notices={mockNotices} />
      </div>
    </DashboardLayout>
  );
};

export default TenantNotices;
