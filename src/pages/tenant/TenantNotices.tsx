
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockNotices } from "@/utils/mockData";

const TenantNotices = () => {
  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <PageHeader 
          title="Notice Board"
          description="Important announcements and updates from management"
        />
        
        <SearchFilters placeholder="Search notices..." />

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Notices</TabsTrigger>
            <TabsTrigger value="important">Important</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {mockNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="important" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {mockNotices
                .filter(notice => notice.priority === "High")
                .map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="maintenance" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {mockNotices
                .filter(notice => notice.category === "Maintenance")
                .map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="community" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {mockNotices
                .filter(notice => notice.category === "Community Event")
                .map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const NoticeCard = ({ notice }: { notice: any }) => {
  let priorityVariant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline" = "default";
  
  switch (notice.priority) {
    case "High":
      priorityVariant = "destructive";
      break;
    case "Medium":
      priorityVariant = "secondary";
      break;
    case "Low":
      priorityVariant = "outline";
      break;
    default:
      priorityVariant = "default";
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <CardTitle>{notice.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{notice.category}</Badge>
            <Badge variant={priorityVariant}>{notice.priority}</Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Posted on {notice.datePosted} by {notice.postedBy}
        </p>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed">{notice.content}</p>
      </CardContent>
      <CardFooter className="flex justify-end pt-0">
        <Button variant="outline">Mark as Read</Button>
      </CardFooter>
    </Card>
  );
};

export default TenantNotices;
