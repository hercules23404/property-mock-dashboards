
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wrench, Calendar, User } from "lucide-react";

interface MaintenanceRequestCardProps {
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  dateSubmitted: string;
  assignedTo?: string;
  category: string;
  onStatusUpdate?: () => void;
  onAssign?: () => void;
  onCancel?: () => void;
}

export const MaintenanceRequestCard = ({
  title,
  description,
  status,
  priority,
  dateSubmitted,
  assignedTo,
  category,
  onStatusUpdate,
  onAssign,
  onCancel,
}: MaintenanceRequestCardProps) => {
  // Status and priority badge variants
  const statusVariant = {
    Pending: "outline",
    "In Progress": "secondary",
    Completed: "default",
  } as const;
  
  const priorityVariant = {
    High: "destructive",
    Medium: "secondary",
    Low: "outline",
  } as const;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mt-1">
              <Wrench className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{category}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3" />
                <span>{dateSubmitted}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge variant={statusVariant[status]}>{status}</Badge>
            <Badge variant={priorityVariant[priority]}>{priority}</Badge>
          </div>
        </div>
        
        <p className="mt-3 text-sm line-clamp-2">{description}</p>
        
        {assignedTo && (
          <div className="mt-3 flex items-center gap-1 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Assigned to: </span>
            <span>{assignedTo}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-6 py-4 flex justify-between border-t">
        {status !== "Completed" && (
          <>
            {status === "Pending" ? (
              <Button size="sm" onClick={onAssign}>
                Assign
              </Button>
            ) : (
              <Button size="sm" onClick={onStatusUpdate}>
                Mark Complete
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={onCancel}>
              Cancel Request
            </Button>
          </>
        )}
        
        {status === "Completed" && (
          <>
            <span className="text-xs text-muted-foreground">Completed</span>
            <Button size="sm" variant="outline" onClick={onStatusUpdate}>
              View Details
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
