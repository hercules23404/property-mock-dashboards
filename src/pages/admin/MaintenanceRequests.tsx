
import React, { useState } from "react";
import { PlusCircle, AlertCircle } from "lucide-react";
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
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockMaintenanceRequests } from "@/utils/mockData";

const MaintenanceRequests = () => {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <PageHeader 
          title="Maintenance Requests"
          description="View and manage maintenance requests across all properties"
          action={{
            label: "Add Request",
            icon: <PlusCircle className="h-4 w-4" />,
            onClick: () => setOpen(true),
          }}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <SearchFilters 
            placeholder="Search requests..." 
            className="flex-1"
          />
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockMaintenanceRequests.map((request) => (
            <MaintenanceRequestCard key={request.id} request={request} />
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2 py-4">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button size="sm" className="bg-primary">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create Maintenance Request</DialogTitle>
              <DialogDescription>
                Enter the details of the maintenance request.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="property" className="text-right">
                  Property
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunset">Sunset Apartments</SelectItem>
                    <SelectItem value="oceanview">Oceanview Residences</SelectItem>
                    <SelectItem value="highland">Highland Towers</SelectItem>
                    <SelectItem value="parkplace">Park Place Residences</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">
                  Unit
                </Label>
                <Input
                  id="unit"
                  placeholder="Unit number"
                  className="col-span-3"
                />
              </div>
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
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issue" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="issue"
                  placeholder="Describe the issue"
                  className="col-span-3"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="due-date" className="text-right">
                  Due Date
                </Label>
                <Input
                  id="due-date"
                  type="date"
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
          <CardTitle>{request.category}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={statusVariant}>{request.status}</Badge>
            <Badge variant={priorityVariant}>{request.priority}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-medium mb-2">{request.issue}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Property</p>
            <p>{request.property}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Unit</p>
            <p>{request.unit}</p>
          </div>
          <div className="mt-2">
            <p className="text-muted-foreground">Tenant</p>
            <p>{request.tenant}</p>
          </div>
          <div className="mt-2">
            <p className="text-muted-foreground">Date Submitted</p>
            <p>{request.dateSubmitted}</p>
          </div>
          <div className="mt-2">
            <p className="text-muted-foreground">Assigned To</p>
            <p>{request.assignedTo}</p>
          </div>
          <div className="mt-2">
            <p className="text-muted-foreground">Due Date</p>
            <p>{request.dueDate}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Assign</Button>
        <Button>Update Status</Button>
      </CardFooter>
    </Card>
  );
};

export default MaintenanceRequests;
