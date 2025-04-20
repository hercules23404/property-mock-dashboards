import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatisticsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    description?: string;
    className?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
    title,
    value,
    icon,
    trend,
    description,
    className,
}) => {
    return (
        <Card className={cn("hover:shadow-lg transition-shadow", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {trend && (
                    <div className={cn(
                        "flex items-center text-xs mt-1",
                        trend.isPositive ? "text-green-500" : "text-red-500"
                    )}>
                        {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                    </div>
                )}
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

export default StatisticsCard; 