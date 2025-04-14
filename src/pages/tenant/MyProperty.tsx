
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PropertyInfoCard from "@/components/property/PropertyInfoCard";

const MyProperty = () => {
  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <PageHeader 
          title="My Property"
          description="View details about your rented property"
        />
        <PropertyInfoCard />
      </div>
    </DashboardLayout>
  );
};

export default MyProperty;
