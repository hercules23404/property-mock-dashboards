import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: number;
  action: string;
  property?: string;
  details?: string;
  time: string;
}

interface ActivityListProps {
  activities: Activity[];
  title: string;
}

export const ActivityList = ({ activities, title }: ActivityListProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.property || activity.details}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
              <div className="mt-2 border-b border-[hsl(var(--border))]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
