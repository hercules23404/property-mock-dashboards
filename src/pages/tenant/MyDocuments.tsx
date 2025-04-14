
import React, { useState } from "react";
import { PlusCircle, FileText, Download, File } from "lucide-react";
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
  Card,
  CardContent,
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
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockDocuments } from "@/utils/mockData";

const MyDocuments = () => {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <PageHeader 
          title="My Documents"
          description="Access and upload important documents related to your tenancy"
          action={{
            label: "Upload Document",
            icon: <PlusCircle className="h-4 w-4" />,
            onClick: () => setOpen(true),
          }}
        />
        
        <SearchFilters placeholder="Search documents..." />

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="contracts">Lease & Contracts</TabsTrigger>
            <TabsTrigger value="inspections">Inspections</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <DocumentsTable documents={mockDocuments} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <DocumentCard 
                name="Important Document Guidelines"
                description="Learn about required documents and submission deadlines."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="contracts" className="mt-6">
            <DocumentsTable 
              documents={mockDocuments.filter(doc => 
                doc.category === "Contract"
              )} 
            />
          </TabsContent>
          
          <TabsContent value="inspections" className="mt-6">
            <DocumentsTable 
              documents={mockDocuments.filter(doc => 
                doc.category === "Inspection"
              )} 
            />
          </TabsContent>
          
          <TabsContent value="insurance" className="mt-6">
            <DocumentsTable 
              documents={mockDocuments.filter(doc => 
                doc.category === "Insurance"
              )} 
            />
          </TabsContent>
        </Tabs>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload a new document to your tenant file.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="document-name" className="text-right">
                  Document Name
                </Label>
                <Input
                  id="document-name"
                  placeholder="Enter document name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="document-category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="policies">Policies</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="document-file" className="text-right">
                  File
                </Label>
                <Input
                  id="document-file"
                  type="file"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="document-notes" className="text-right">
                  Notes (Optional)
                </Label>
                <Input
                  id="document-notes"
                  placeholder="Any additional notes"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

const DocumentsTable = ({ documents }: { documents: any[] }) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date Uploaded</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{doc.category}</TableCell>
              <TableCell>{doc.uploaded}</TableCell>
              <TableCell>
                <DocumentStatusBadge status={doc.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const DocumentStatusBadge = ({ status }: { status: string }) => {
  let variant: "default" | "secondary" | "outline" = "default";
  
  switch (status) {
    case "Active":
      variant = "default";
      break;
    case "Pending":
      variant = "secondary";
      break;
    case "Expired":
      variant = "outline";
      break;
    default:
      variant = "secondary";
  }
  
  return <Badge variant={variant}>{status}</Badge>;
};

const DocumentCard = ({ name, description }: { name: string, description: string }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <File className="h-5 w-5" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default MyDocuments;
