
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreateSocietyDialog from "@/components/society/CreateSocietyDialog";

interface EmptySocietyStateProps {
  onCreateSociety: (societyData: any) => Promise<void>;
  isLoading: boolean;
}

const EmptySocietyState: React.FC<EmptySocietyStateProps> = ({ 
  onCreateSociety, 
  isLoading 
}) => {
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  
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
        onSubmit={onCreateSociety}
        isLoading={isLoading}
      />
    </>
  );
};

export default EmptySocietyState;
