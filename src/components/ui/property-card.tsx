
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Edit, User } from "lucide-react";

interface PropertyCardProps {
  flatNumber: string;
  assignedTo?: string;
  status: "Available" | "Occupied" | "Maintenance";
  onEdit?: () => void;
}

export const PropertyCard = ({
  flatNumber,
  assignedTo,
  status,
  onEdit,
}: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Home className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Flat #{flatNumber}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <User className="h-3 w-3" />
                <span>
                  {assignedTo ? `Assigned to: ${assignedTo}` : "Unoccupied"}
                </span>
              </div>
            </div>
          </div>
          <Badge 
            variant={
              status === "Available" 
                ? "default" 
                : status === "Occupied" 
                  ? "secondary" 
                  : "outline"
            }
          >
            {status}
          </Badge>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button size="sm" variant="outline" onClick={onEdit} className="gap-1">
            <Edit className="h-4 w-4" />
            Edit Property
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
