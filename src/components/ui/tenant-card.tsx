
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, User } from "lucide-react";

interface TenantCardProps {
  name: string;
  flatNumber: string;
  email: string;
  status: "Active" | "Pending";
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TenantCard = ({
  name,
  flatNumber,
  email,
  status,
  onEdit,
  onDelete,
}: TenantCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">Flat #{flatNumber}</p>
            </div>
          </div>
          <Badge variant={status === "Active" ? "default" : "secondary"}>
            {status}
          </Badge>
        </div>
        
        <p className="mt-3 text-sm">
          <span className="text-muted-foreground">Email: </span>
          {email}
        </p>
        
        <div className="mt-4 flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={onEdit} className="gap-1">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete} className="gap-1 text-destructive hover:text-destructive-foreground hover:bg-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
