
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NoticeCardProps {
  id: string;
  title: string;
  content: string;
  datePosted: string;
}

export const NoticeCard = ({ title, content, datePosted }: NoticeCardProps) => {
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
      </CardContent>
    </Card>
  );
};
