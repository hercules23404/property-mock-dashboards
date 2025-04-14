
import React, { useState } from "react";
import { PlusCircle, Filter, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProperties } from "@/utils/mockData";
import { SearchFilters, DefaultFilterContent } from "@/components/ui/search-filters";
import { PageHeader } from "@/components/ui/page-header";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const SocietyManagement = () => {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <PageHeader 
          title="Society Management"
          description="Manage your properties and common areas"
          action={{
            label: "Add Property",
            icon: <PlusCircle className="h-4 w-4" />,
            onClick: () => setOpen(true),
          }}
        />
        
        <SearchFilters 
          placeholder="Search properties..." 
          filtersContent={<DefaultFilterContent />} 
        />

        <Tabs defaultValue="properties">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="common-areas">Common Areas</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
          </TabsList>
          <TabsContent value="properties" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{property.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{property.address}</p>
                    <p className="text-sm mb-4">Type: {property.type}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Units</p>
                        <p className="font-medium">{property.units}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Occupancy</p>
                        <p className="font-medium">{property.occupancyRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Maintenance</p>
                        <p className="font-medium">{property.maintenanceRequests}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" size="sm">View Units</Button>
                      <Button size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="common-areas" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CommonAreaCard 
                name="Main Lobby" 
                property="Sunset Apartments"
                status="Good Condition"
              />
              <CommonAreaCard 
                name="Swimming Pool" 
                property="Oceanview Residences"
                status="Maintenance Scheduled"
              />
              <CommonAreaCard 
                name="Fitness Center" 
                property="Highland Towers"
                status="Good Condition"
              />
              <CommonAreaCard 
                name="Rooftop Garden" 
                property="Park Place Residences"
                status="Good Condition"
              />
              <CommonAreaCard 
                name="Underground Parking" 
                property="Sunset Apartments"
                status="Needs Attention"
              />
            </div>
          </TabsContent>
          <TabsContent value="amenities" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <Building className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Amenities Management</h3>
              <p>This section is under construction</p>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>
                Enter the details of the new property.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="property-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="property-name"
                  placeholder="Property name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="property-address" className="text-right">
                  Address
                </Label>
                <Input
                  id="property-address"
                  placeholder="Full address"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="property-type" className="text-right">
                  Type
                </Label>
                <Input
                  id="property-type"
                  placeholder="Property type"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="property-units" className="text-right">
                  Units
                </Label>
                <Input
                  id="property-units"
                  type="number"
                  placeholder="Number of units"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save Property</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

const CommonAreaCard = ({ name, property, status }: { name: string, property: string, status: string }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{property}</p>
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="font-medium">{status}</p>
          </div>
          <div className="mt-4 flex justify-between">
            <Button variant="outline" size="sm">Scheduling</Button>
            <Button size="sm">Manage</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocietyManagement;
