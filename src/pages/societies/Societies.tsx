import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const societies = [
    {
        id: 1,
        name: 'Green Valley Society',
        address: '123 Main St, City',
        totalUnits: 50,
        occupiedUnits: 45,
        manager: 'John Doe',
        contact: 'john@example.com',
    },
    {
        id: 2,
        name: 'Sunrise Apartments',
        address: '456 Park Ave, City',
        totalUnits: 30,
        occupiedUnits: 28,
        manager: 'Jane Smith',
        contact: 'jane@example.com',
    },
    {
        id: 3,
        name: 'Ocean View Residency',
        address: '789 Beach Rd, City',
        totalUnits: 40,
        occupiedUnits: 35,
        manager: 'Mike Johnson',
        contact: 'mike@example.com',
    },
];

export default function Societies() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Societies</h1>
                <Button>Add New Society</Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Societies</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Input
                                placeholder="Search societies..."
                                className="max-w-sm"
                            />
                            <Button variant="outline">Filter</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Units</TableHead>
                                <TableHead>Manager</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {societies.map((society) => (
                                <TableRow key={society.id}>
                                    <TableCell className="font-medium">{society.name}</TableCell>
                                    <TableCell>{society.address}</TableCell>
                                    <TableCell>
                                        {society.occupiedUnits}/{society.totalUnits}
                                    </TableCell>
                                    <TableCell>{society.manager}</TableCell>
                                    <TableCell>{society.contact}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            View
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
} 