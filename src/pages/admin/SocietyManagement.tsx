
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

  // Helper function for consistent error handling
  const showError = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const handleCreateSociety = async (societyData: any) => {
    if (!profile?.id) {
      showError(
        "Error",
        "You must be logged in to create a society"
      );
      return;
    }
    
    try {
      setActionLoading(true);
      console.log("Creating society with data:", { ...societyData, created_by: profile.id });
      
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
        showError(
          "Error",
          error.message || "Failed to create society. Please try again."
        );
        return;
      }

      console.log("Society created successfully:", data);

      // Update the user's profile with the society ID
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ society_id: data.id })
        .eq('id', profile.id);

      if (profileError) {
        console.error("Error updating profile:", profileError);
        showError(
          "Warning",
          "Society created but failed to update your profile. Please refresh the page."
        );
        return;
      }

      console.log("Profile updated with society ID:", data.id);
      toast({
        title: "Success!",
        description: "Society created successfully",
      });
      
      // Only update the society state after everything succeeds
      setSociety(data);
    } catch (error: any) {
      console.error("Unexpected error in handleCreateSociety:", error);
      showError(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleInviteTenant = async (email: string) => {
    if (!society?.id) {
      showError(
        "Error",
        "No society found to invite tenant to"
      );
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
        showError(
          "Error",
          "Failed to check existing invitations. Please try again."
        );
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
        showError(
          "Error",
          error.message || "Failed to send invitation"
        );
        return;
      }

      console.log("Invitation created successfully for email:", email);
      toast({
        title: "Success!",
        description: `Invitation sent to ${email}`,
      });
    } catch (error: any) {
      console.error("Unexpected error in handleInviteTenant:", error);
      showError(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
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
