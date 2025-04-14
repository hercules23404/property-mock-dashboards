
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockMaintenanceRequests } from "@/utils/mockData";

// Filter only the tenant's maintenance requests (using Jordan Smith as our tenant)
const tenantRequests = mockMaintenanceRequests.filter(
  request => request.tenant === "Jordan Smith"
);

const TenantMaintenance = () => {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <PageHeader 
          title="Maintenance Requests"
          description="Submit and track maintenance issues in your unit"
          action={{
            label: "New Request",
            icon: <PlusCircle className="h-4 w-4" />,
            onClick: () => setOpen(true),
          }}
        />
        
        <SearchFilters placeholder="Search requests..." />

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Requests</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tenantRequests
                .filter(request => request.status !== "Completed")
                .map((request) => (
                  <MaintenanceRequestCard key={request.id} request={request} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tenantRequests
                .filter(request => request.status === "Completed")
                .map((request) => (
                  <MaintenanceRequestCard key={request.id} request={request} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tenantRequests.map((request) => (
                <MaintenanceRequestCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Submit Maintenance Request</DialogTitle>
              <DialogDescription>
                Please provide details about the issue you're experiencing.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="appliance">Appliance</SelectItem>
                    <SelectItem value="structural">Structural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High - Urgent Issue</SelectItem>
                    <SelectItem value="medium">Medium - Needs Attention</SelectItem>
                    <SelectItem value="low">Low - Minor Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please describe the issue in detail"
                  className="col-span-3"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="photo" className="text-right">
                  Photo (Optional)
                </Label>
                <Input
                  id="photo"
                  type="file"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="access" className="text-right">
                  Access Instructions
                </Label>
                <Input
                  id="access"
                  placeholder="Any special access instructions"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

const MaintenanceRequestCard = ({ request }: { request: any }) => {
  let statusVariant: "default" | "secondary" | "outline";
  let priorityVariant: "default" | "destructive" | "secondary" | "outline";
  
  switch (request.status) {
    case "Open":
      statusVariant = "outline";
      break;
    case "In Progress":
      statusVariant = "secondary";
      break;
    default:
      statusVariant = "default";
  }
  
  switch (request.priority) {
    case "High":
      priorityVariant = "destructive";
      break;
    case "Medium":
      priorityVariant = "secondary";
      break;
    default:
      priorityVariant = "outline";
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{request.issue}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={statusVariant}>{request.status}</Badge>
            <Badge variant={priorityVariant}>{request.priority}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p>{request.category}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date Submitted</p>
              <p>{request.dateSubmitted}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Assigned To</p>
              <p>{request.assignedTo}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline">Check Status</Button>
        {request.status !== "Completed" && (
          <Button variant="outline">Cancel Request</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TenantMaintenance;
