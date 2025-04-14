
import React from "react";
import { Building, Calendar, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const MyProperty = () => {
  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <PageHeader 
          title="My Property"
          description="View details about your rented property"
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Unit Number</p>
                  <p className="text-sm text-muted-foreground">A-101</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Monthly Rent</p>
                  <p className="text-sm text-muted-foreground">$1,200</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Lease Period</p>
                  <p className="text-sm text-muted-foreground">Jan 2023 - Dec 2023</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Society Information</h3>
              <p className="text-sm text-muted-foreground">
                Sunset Apartments<br />
                123 Main Street, Cityville<br />
                Property Manager: John Smith
              </p>
            </div>

            <Button className="w-full sm:w-auto" variant="outline">
              View Society Info
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyProperty;
