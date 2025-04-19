import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Notice } from '@/types/notice';

interface NoticeCardProps {
  notice: Notice;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice }) => {
  const getBadgeVariant = () => {
    switch (notice.type) {
      case 'info':
        return 'secondary';
      case 'warning':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{notice.title}</span>
          <div className="flex gap-2">
            <Badge variant={getBadgeVariant()}>{notice.type}</Badge>
            {notice.isImportant && (
              <Badge variant="secondary">Important</Badge>
            )}
            <Badge variant="outline">{notice.priority}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{notice.content}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-muted-foreground">
            Created: {format(new Date(notice.createdAt), 'PPP')}
          </p>
          {notice.endDate && (
            <p className="text-xs text-muted-foreground">
              Ends: {format(new Date(notice.endDate), 'PPP')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticeCard;
