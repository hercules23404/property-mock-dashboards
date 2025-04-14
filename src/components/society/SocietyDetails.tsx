
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import { Send } from "lucide-react";
import InviteTenantDialog from "@/components/society/InviteTenantDialog";

interface SocietyDetailsProps {
  society: any;
  onInviteTenant: (email: string) => Promise<void>;
  isLoading: boolean;
}

const SocietyDetails: React.FC<SocietyDetailsProps> = ({
  society,
  onInviteTenant,
  isLoading
}) => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  
  return (
    <>
      <PageHeader 
        title="Society Management"
        description="Manage your society's information and settings"
        action={{
          label: "Invite Tenant",
          icon: <Send className="h-4 w-4" />,
          onClick: () => setShowInviteDialog(true),
        }}
      />
      
      <SearchFilters placeholder="Search society info..." />

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Society Information</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Society Name</Label>
              <Input defaultValue={society.name || "N/A"} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Address</Label>
              <Input defaultValue={society.address || "N/A"} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Total Units</Label>
              <Input defaultValue={society.total_units || 0} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Created Date</Label>
              <Input 
                defaultValue={society.created_at ? new Date(society.created_at).toLocaleDateString() : "N/A"} 
                className="col-span-3" 
                readOnly 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <InviteTenantDialog
        open={showInviteDialog}
        onClose={() => setShowInviteDialog(false)}
        onSubmit={onInviteTenant}
        isLoading={isLoading}
      />
    </>
  );
};

export default SocietyDetails;
