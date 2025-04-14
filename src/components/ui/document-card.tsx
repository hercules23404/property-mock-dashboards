
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar } from "lucide-react";

interface DocumentCardProps {
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: "Active" | "Pending" | "Expired";
  onDownload?: () => void;
}

export const DocumentCard = ({
  name,
  type,
  size,
  uploadDate,
  status,
  onDownload,
}: DocumentCardProps) => {
  const statusVariant = {
    Active: "default",
    Pending: "secondary",
    Expired: "outline",
  } as const;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{type}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{size}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3" />
                <span>Uploaded: {uploadDate}</span>
              </div>
            </div>
          </div>
          <Badge variant={statusVariant[status]}>{status}</Badge>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button size="sm" variant="outline" onClick={onDownload} className="gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
