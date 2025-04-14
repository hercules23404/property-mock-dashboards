
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
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

        <div className="grid gap-4">
          {mockNotices.map((notice) => (
            <Card key={notice.id}>
              <CardHeader className="pb-2">
                <CardTitle>{notice.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Posted on {notice.datePosted}
                </p>
                <p className="line-clamp-2">{notice.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TenantNotices;
