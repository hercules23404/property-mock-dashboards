
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function useSocietyData(profileId: string | undefined) {
  const [loading, setLoading] = useState(true);
  const [society, setSociety] = useState<any>(null);
  const { toast } = useToast();

  // Helper function for consistent error handling
  const showError = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  useEffect(() => {
    const fetchSociety = async () => {
      // Safely check if profile is available
      if (!profileId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching society for profile ID:", profileId);
        
        // First check for society created by user as admin
        const { data: adminSociety, error: adminError } = await supabase
          .from('societies')
          .select('*')
          .eq('created_by', profileId)
          .maybeSingle();

        if (adminError) {
          console.error("Error fetching admin society:", adminError);
          showError(
            "Error",
            "Failed to fetch society information. Please try again."
          );
          return;
        }

        if (adminSociety) {
          console.log("Found admin society:", adminSociety);
          setSociety(adminSociety);
          return;
        }

        // If not found as admin, check profile for society_id
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('society_id')
          .eq('id', profileId)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          showError(
            "Error",
            "Failed to fetch profile information. Please try again."
          );
          return;
        }

        if (profileData?.society_id) {
          console.log("Checking society from profile society_id:", profileData.society_id);
          const { data: societyData, error: societyError } = await supabase
            .from('societies')
            .select('*')
            .eq('id', profileData.society_id)
            .maybeSingle();

          if (societyError) {
            console.error("Error fetching society by ID:", societyError);
            showError(
              "Error",
              "Failed to fetch society information. Please try again."
            );
            return;
          }
          
          if (societyData) {
            console.log("Found society from profile:", societyData);
            setSociety(societyData);
          }
        }
      } catch (error: any) {
        console.error("Unexpected error in fetchSociety:", error);
        showError(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    };

    fetchSociety();
  }, [profileId, toast]);

  return { society, setSociety, loading };
}
