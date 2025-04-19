import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { societyAPI } from "@/utils/api";

export function useSocietyData(userId: string | undefined) {
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
      // Safely check if user is available
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching society for user ID:", userId);

        // Use the API to fetch society data
        const societyData = await societyAPI.get(userId);

        if (societyData) {
          console.log("Found society data:", societyData);
          setSociety(societyData);
        }
      } catch (error: any) {
        console.error("Error fetching society:", error);
        showError(
          "Error",
          error.message || "An unexpected error occurred. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSociety();
  }, [userId, toast]);

  return { society, setSociety, loading };
}
