
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notice } from "./NoticeList";

export const NoticeCard = ({ 
  title, 
  content, 
  datePosted, 
  category, 
  priority 
}: Notice) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          Posted on {datePosted}
        </p>
        <p className="line-clamp-2">{content}</p>
        {category && (
          <div className="mt-2 text-xs text-muted-foreground">
            Category: {category}
          </div>
        )}
        {priority && (
          <div className="mt-1 text-xs text-muted-foreground">
            Priority: {priority}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
