
import React, { useState } from "react";
import { PlusCircle, Search, UserPlus, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockTenants } from "@/utils/mockData";
import { Badge } from "@/components/ui/badge";

const TenantManagement = () => {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <PageHeader 
          title="Tenant Management"
          description="View and manage tenant information"
          action={{
            label: "Add Tenant",
            icon: <PlusCircle className="h-4 w-4" />,
            onClick: () => setOpen(true),
          }}
        />
        
        <SearchFilters 
          placeholder="Search tenants..." 
          filtersContent={
            <>
              <DropdownMenuCheckboxItem checked>All Tenants</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Active Leases</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Expired Leases</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Rent Paid</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Rent Pending</DropdownMenuCheckboxItem>
            </>
          } 
        />

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Property/Unit</TableHead>
                <TableHead>Lease Period</TableHead>
                <TableHead>Rent Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={tenant.avatar} alt={tenant.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-sm text-muted-foreground">{tenant.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p>{tenant.property}</p>
                    <p className="text-sm text-muted-foreground">Unit {tenant.unit}</p>
                  </TableCell>
                  <TableCell>
                    <p>{new Date(tenant.moveInDate).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">to {new Date(tenant.leaseEnd).toLocaleDateString()}</p>
                  </TableCell>
                  <TableCell>
                    <RentStatusBadge status={tenant.rentStatus} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Tenant Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" /> View Lease
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" /> Contact Tenant
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>
                Enter the details of the new tenant.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenant-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="tenant-name"
                  placeholder="Full name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenant-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="tenant-email"
                  type="email"
                  placeholder="Email address"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenant-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="tenant-phone"
                  placeholder="Phone number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenant-property" className="text-right">
                  Property
                </Label>
                <Input
                  id="tenant-property"
                  placeholder="Select property"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenant-unit" className="text-right">
                  Unit
                </Label>
                <Input
                  id="tenant-unit"
                  placeholder="Unit number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lease-start" className="text-right">
                  Lease Start
                </Label>
                <Input
                  id="lease-start"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lease-end" className="text-right">
                  Lease End
                </Label>
                <Input
                  id="lease-end"
                  type="date"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save Tenant</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

const RentStatusBadge = ({ status }: { status: string }) => {
  let variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline" = "default";
  
  switch (status) {
    case "Paid":
      variant = "default";
      break;
    case "Pending":
      variant = "secondary";
      break;
    case "Late":
      variant = "destructive";
      break;
    default:
      variant = "outline";
  }
  
  return <Badge variant={variant}>{status}</Badge>;
};

export default TenantManagement;
