
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useSocietyData } from "@/hooks/useSocietyData";
import LoadingSocietyState from "@/components/society/LoadingSocietyState";
import EmptySocietyState from "@/components/society/EmptySocietyState";
import SocietyDetails from "@/components/society/SocietyDetails";

const SocietyManagement = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [actionLoading, setActionLoading] = useState(false);
  const { society, setSociety, loading } = useSocietyData(profile?.id);

  const handleCreateSociety = async (societyData: any) => {
    if (!profile?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create a society",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setActionLoading(true);
      
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
        toast({
          title: "Error",
          description: error.message || "Failed to create society. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Update the user's profile with the society ID
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          society_id: data.id,
          role: 'admin' 
        })
        .eq('id', profile.id);

      if (profileError) {
        console.error("Error updating profile:", profileError);
        toast({
          title: "Warning",
          description: "Society created but failed to update your profile. Please refresh the page.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Society created successfully",
      });
      
      setSociety(data);
    } catch (error: any) {
      console.error("Unexpected error in handleCreateSociety:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleInviteTenant = async (email: string) => {
    if (!society?.id) {
      toast({
        title: "Error",
        description: "No society found to invite tenant to",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setActionLoading(true);
      console.log("Inviting tenant with email:", email, "to society:", society.id);
      
      // First check if invitation already exists
      const { data: existingInvite, error: checkError } = await supabase
        .from('tenant_invitations')
        .select('*')
        .eq('email', email)
        .eq('society_id', society.id)
        .maybeSingle();
        
      if (checkError) {
        console.error("Error checking existing invitation:", checkError);
        toast({
          title: "Error",
          description: "Failed to check existing invitations. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      if (existingInvite) {
        console.log("Invitation already exists for email:", email);
        toast({
          title: "Notice",
          description: `An invitation for ${email} already exists`,
        });
        return;
      }
      
      // Create new invitation
      const { data, error } = await supabase
        .from('tenant_invitations')
        .insert([{
          email,
          society_id: society.id
        }]);

      if (error) {
        console.error("Error creating invitation:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to send invitation",
          variant: "destructive",
        });
        return;
      }

      console.log("Invitation created successfully for email:", email);
      toast({
        title: "Success!",
        description: `Invitation sent to ${email}`,
      });
    } catch (error: any) {
      console.error("Unexpected error in handleInviteTenant:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSocietyState />;
    }

    if (!society) {
      return (
        <EmptySocietyState 
          onCreateSociety={handleCreateSociety}
          isLoading={actionLoading} 
        />
      );
    }

    return (
      <SocietyDetails 
        society={society} 
        onInviteTenant={handleInviteTenant}
        isLoading={actionLoading}
      />
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
