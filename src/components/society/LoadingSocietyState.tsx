
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LoadingSocietyState: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading society information...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingSocietyState;
