
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";

interface NoticeItemProps {
  title: string;
  date: string;
  content: string;
  category?: string;
  priority?: "High" | "Medium" | "Low";
  onClick?: () => void;
}

export const NoticeItem = ({
  title,
  date,
  content,
  category,
  priority,
  onClick,
}: NoticeItemProps) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" 
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
            </div>
          </div>
          {category && <Badge variant="outline">{category}</Badge>}
        </div>
        
        {priority && (
          <div className="mt-3">
            <Badge 
              variant={
                priority === "High" 
                  ? "destructive" 
                  : priority === "Medium" 
                    ? "secondary" 
                    : "outline"
              }
              className="text-xs"
            >
              {priority} Priority
            </Badge>
          </div>
        )}
        
        <p className="mt-3 text-sm line-clamp-2">{content}</p>
        <div className="mt-2 text-right">
          <span className="text-sm text-primary hover:underline">Read more</span>
        </div>
      </CardContent>
    </Card>
  );
};
