
import React from "react";
import { Calendar, Wrench, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DateItem {
  icon: JSX.Element;
  title: string;
  date: string;
  daysLeft: number;
  bgColor: string;
  textColor: string;
}

const ImportantDates = () => {
  const dates: DateItem[] = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Rent Payment Due",
      date: "July 1, 2023",
      daysLeft: 12,
      bgColor: "bg-blue-100",
      textColor: "text-blue-700"
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      title: "Maintenance Visit",
      date: new Date().toLocaleDateString(),
      daysLeft: 3,
      bgColor: "bg-green-100",
      textColor: "text-green-700"
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Building Inspection",
      date: "July 15, 2023",
      daysLeft: 26,
      bgColor: "bg-purple-100",
      textColor: "text-purple-700"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Important Dates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dates.map((item) => (
            <div key={item.title} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center ${item.textColor}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-sm">{item.date}</p>
                </div>
              </div>
              <span className={`text-sm px-2 py-1 ${item.bgColor} ${item.textColor} rounded-md`}>
                {item.daysLeft} days
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantDates;
