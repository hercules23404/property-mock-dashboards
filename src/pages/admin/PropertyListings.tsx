
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockProperties } from "@/utils/mockData";

const PropertyListings = () => {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <PageHeader 
          title="Property Listings"
          description="Manage your property listings and vacancies"
          action={{
            label: "Add Listing",
            icon: <PlusCircle className="h-4 w-4" />,
            onClick: () => setOpen(true),
          }}
        />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchFilters 
            placeholder="Search listings..." 
            className="flex-1"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Listings</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
              <CardHeader>
                <CardTitle>{property.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{property.address}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Property Type</p>
                    <p>{property.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Units</p>
                    <p>{property.units}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-muted-foreground">Occupancy</p>
                    <p>{property.occupancyRate}%</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-muted-foreground">Vacant Units</p>
                    <p>{Math.round(property.units * (100 - property.occupancyRate) / 100)}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Units</Button>
                <Button>Edit Listing</Button>
              </CardFooter>
            </Card>
          ))}
          
          <Card className="border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setOpen(true)}>
            <CardContent className="p-6 flex flex-col items-center">
              <PlusCircle className="h-12 w-12 mb-4 text-muted-foreground" />
              <p className="font-medium">Add New Property</p>
              <p className="text-sm text-muted-foreground">Click to add a new listing</p>
            </CardContent>
          </Card>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Property Listing</DialogTitle>
              <DialogDescription>
                Enter the details of the new property listing.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="listing-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="listing-name"
                  placeholder="Property name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="listing-address" className="text-right">
                  Address
                </Label>
                <Input
                  id="listing-address"
                  placeholder="Full address"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="listing-type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment Complex</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="highrise">High-rise</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="listing-units" className="text-right">
                  Units
                </Label>
                <Input
                  id="listing-units"
                  type="number"
                  placeholder="Number of units"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="listing-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="listing-description"
                  placeholder="Property description"
                  className="col-span-3"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="listing-image" className="text-right">
                  Image
                </Label>
                <Input
                  id="listing-image"
                  type="file"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save Listing</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PropertyListings;
