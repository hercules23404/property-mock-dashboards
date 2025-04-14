
import React, { useState, useEffect } from "react";
import { PlusCircle, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { SearchFilters } from "@/components/ui/search-filters";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateSocietyDialog from "@/components/society/CreateSocietyDialog";
import InviteTenantDialog from "@/components/society/InviteTenantDialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const SocietyManagement = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [society, setSociety] = useState<any>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  useEffect(() => {
    const fetchSociety = async () => {
      try {
        setLoading(true);
        
        if (!profile?.id) return;

        // First check for society they created as admin
        const { data: adminSociety, error: adminError } = await supabase
          .from('societies')
          .select('*')
          .eq('created_by', profile.id)
          .maybeSingle();

        if (adminError) {
          console.error("Error fetching admin society:", adminError);
          throw adminError;
        }

        if (adminSociety) {
          setSociety(adminSociety);
          setLoading(false);
          return;
        }

        // If not found as admin, check profile for society_id
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('society_id')
          .eq('id', profile.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          throw profileError;
        }

        if (profileData?.society_id) {
          const { data: societyData, error: societyError } = await supabase
            .from('societies')
            .select('*')
            .eq('id', profileData.society_id)
            .maybeSingle();

          if (societyError) {
            console.error("Error fetching society by ID:", societyError);
            throw societyError;
          }
          
          setSociety(societyData);
        }
      } catch (error: any) {
        console.error("Error in fetchSociety:", error);
        toast({
          title: "Error",
          description: "Failed to fetch society information. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSociety();
  }, [profile, toast]);

  const handleCreateSociety = async (societyData: any) => {
    try {
      if (!profile?.id) {
        toast({
          title: "Error",
          description: "You must be logged in to create a society",
          variant: "destructive",
        });
        return;
      }
      
      setLoading(true);
      
      // Insert the society data
      const { data, error } = await supabase
        .from('societies')
        .insert([{
          ...societyData,
          created_by: profile.id
        }])
        .select()
        .single();

      if (error) {
        console.error("Error creating society:", error);
        throw error;
      }

      // Update the user's profile with the society ID
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ society_id: data.id })
        .eq('id', profile.id);

      if (profileError) {
        console.error("Error updating profile:", profileError);
        throw profileError;
      }

      setSociety(data);
      toast({
        title: "Success!",
        description: "Society created successfully",
      });
      setShowCreateDialog(false);
    } catch (error: any) {
      console.error("Error in handleCreateSociety:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create society. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInviteTenant = async (email: string) => {
    try {
      if (!society?.id) {
        toast({
          title: "Error",
          description: "No society found to invite tenant to",
          variant: "destructive",
        });
        return;
      }
      
      // First check if invitation already exists
      const { data: existingInvite, error: checkError } = await supabase
        .from('tenant_invitations')
        .select('*')
        .eq('email', email)
        .eq('society_id', society.id)
        .maybeSingle();
        
      if (checkError) {
        console.error("Error checking existing invitation:", checkError);
        throw checkError;
      }
      
      if (existingInvite) {
        toast({
          title: "Notice",
          description: `An invitation for ${email} already exists`,
        });
        setShowInviteDialog(false);
        return;
      }
      
      // Create new invitation
      const { error } = await supabase
        .from('tenant_invitations')
        .insert([{
          email,
          society_id: society.id
        }]);

      if (error) {
        console.error("Error creating invitation:", error);
        throw error;
      }

      toast({
        title: "Success!",
        description: `Invitation sent to ${email}`,
      });
      setShowInviteDialog(false);
    } catch (error: any) {
      console.error("Error in handleInviteTenant:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send invitation",
        variant: "destructive",
      });
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <p>Loading society information...</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (!society) {
      return (
        <>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-3">No Society Created Yet</h2>
            <p className="mb-6 text-muted-foreground">
              You haven't created a society yet. Create one to start managing properties and tenants.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Society
            </Button>
          </div>
          <CreateSocietyDialog 
            open={showCreateDialog} 
            onClose={() => setShowCreateDialog(false)}
            onSubmit={handleCreateSociety}
          />
        </>
      );
    }

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
                <Input defaultValue={society.name} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Address</Label>
                <Input defaultValue={society.address} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Total Units</Label>
                <Input defaultValue={society.total_units} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Created Date</Label>
                <Input 
                  defaultValue={new Date(society.created_at).toLocaleDateString()} 
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
          onSubmit={handleInviteTenant}
        />
      </>
    );
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default SocietyManagement;
