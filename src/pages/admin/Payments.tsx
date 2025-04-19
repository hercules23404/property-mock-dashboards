import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PaymentForm } from '@/components/forms/PaymentForm';
import { paymentService } from '@/services/paymentService';
import { Payment } from '@/types/payment';
import { format } from 'date-fns';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Payments() {
    const navigate = useNavigate();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        try {
            setLoading(true);
            // TODO: Replace with actual property ID
            const propertyPayments = await paymentService.getPropertyPayments('property-id');
            setPayments(propertyPayments);
        } catch (error) {
            console.error('Failed to load payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePayment = async (data: any) => {
        try {
            // TODO: Replace with actual IDs
            await paymentService.createPayment({
                ...data,
                propertyId: 'property-id',
                tenantId: 'tenant-id',
                societyId: 'society-id',
                status: 'pending',
            });
            setShowForm(false);
            loadPayments();
        } catch (error) {
            console.error('Failed to create payment:', error);
        }
    };

    const handleUpdatePayment = async (id: string, data: any) => {
        try {
            await paymentService.updatePaymentStatus(id, data.status);
            setSelectedPayment(null);
            loadPayments();
        } catch (error) {
            console.error('Failed to update payment:', error);
        }
    };

    const handleDeletePayment = async (id: string) => {
        try {
            await paymentService.deletePayment(id);
            loadPayments();
        } catch (error) {
            console.error('Failed to delete payment:', error);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="secondary">Pending</Badge>;
            case 'completed':
                return <Badge variant="default">Completed</Badge>;
            case 'failed':
                return <Badge variant="destructive">Failed</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Payments</h1>
                <Button onClick={() => setShowForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Payment
                </Button>
            </div>

            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PaymentForm
                            onSubmit={handleCreatePayment}
                            propertyId="property-id"
                            tenantId="tenant-id"
                            societyId="society-id"
                        />
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Amount</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                                    <TableCell>{payment.type}</TableCell>
                                    <TableCell>{format(payment.dueDate, 'MMM dd, yyyy')}</TableCell>
                                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                                    <TableCell>{payment.paymentMethod || 'N/A'}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setSelectedPayment(payment)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeletePayment(payment.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
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