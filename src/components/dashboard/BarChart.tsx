import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BarChartProps {
    title: string;
    data: {
        label: string;
        value: number;
        color?: string;
    }[];
    maxValue?: number;
}

const BarChart: React.FC<BarChartProps> = ({ title, data, maxValue }) => {
    const max = maxValue || Math.max(...data.map(item => item.value));
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={item.label} className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>{item.label}</span>
                                <span className="font-medium">{item.value}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${(item.value / max) * 100}%`,
                                        backgroundColor: item.color || colors[index % colors.length],
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default BarChart; 