
import React from "react";
import { PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const SocietyManagement = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <PageHeader 
          title="Society Management"
          description="Manage your society's information and settings"
          action={{
            label: "Edit Society",
            icon: <PlusCircle className="h-4 w-4" />,
            onClick: () => {},
          }}
        />
        
        <SearchFilters placeholder="Search society info..." />

        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Society Name</Label>
                <Input defaultValue="Sunset Apartments" className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Address</Label>
                <Input defaultValue="123 Main Street, Cityville" className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Total Units</Label>
                <Input defaultValue="50" className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Created Date</Label>
                <Input defaultValue="January 15, 2023" className="col-span-3" readOnly />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SocietyManagement;
