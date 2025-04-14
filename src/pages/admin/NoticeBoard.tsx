
import React, { useState } from "react";
import { PlusCircle, Bell } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockNotices } from "@/utils/mockData";

const NoticeBoard = () => {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <PageHeader 
          title="Notice Board"
          description="Create and manage notices for your properties"
          action={{
            label: "Add Notice",
            icon: <PlusCircle className="h-4 w-4" />,
            onClick: () => setOpen(true),
          }}
        />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchFilters 
            placeholder="Search notices..." 
            className="flex-1"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="amenities">Amenities</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
              <SelectItem value="community">Community Event</SelectItem>
              <SelectItem value="building">Building Update</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Notice</DialogTitle>
              <DialogDescription>
                Enter the details of your notice to tenants.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notice-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="notice-title"
                  placeholder="Notice title"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notice-category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="amenities">Amenities</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="community">Community Event</SelectItem>
                    <SelectItem value="building">Building Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notice-priority" className="text-right">
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
                <Label htmlFor="notice-properties" className="text-right">
                  Properties
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select properties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="sunset">Sunset Apartments</SelectItem>
                    <SelectItem value="oceanview">Oceanview Residences</SelectItem>
                    <SelectItem value="highland">Highland Towers</SelectItem>
                    <SelectItem value="parkplace">Park Place Residences</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notice-content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="notice-content"
                  placeholder="Notice content"
                  className="col-span-3"
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Post Notice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
        <div className="flex justify-between">
          <CardTitle>{notice.title}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">{notice.category}</Badge>
            <Badge variant={priorityVariant}>{notice.priority}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4">{notice.datePosted} by {notice.postedBy}</p>
        <p className="leading-relaxed">{notice.content}</p>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Displayed at:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {notice.properties.map((property: string, index: number) => (
              <Badge key={index} variant="outline">{property}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit</Button>
        <Button variant="destructive">Remove</Button>
      </CardFooter>
    </Card>
  );
};

export default NoticeBoard;
