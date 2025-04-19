import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const societyFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    totalUnits: z.number().min(1, 'Must have at least 1 unit'),
    managerName: z.string().min(2, 'Manager name must be at least 2 characters'),
    managerEmail: z.string().email('Invalid email address'),
    managerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
    description: z.string().optional(),
});

type SocietyFormValues = z.infer<typeof societyFormSchema>;

interface SocietyFormProps {
    initialData?: SocietyFormValues;
    onSubmit: (data: SocietyFormValues) => void;
    isEditing?: boolean;
}

export function SocietyForm({ initialData, onSubmit, isEditing = false }: SocietyFormProps) {
    const form = useForm<SocietyFormValues>({
        resolver: zodResolver(societyFormSchema),
        defaultValues: initialData || {
            name: '',
            address: '',
            totalUnits: 0,
            managerName: '',
            managerEmail: '',
            managerPhone: '',
            description: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Society Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter society name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter society address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="totalUnits"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Units</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total number of units"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="managerName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Manager Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter manager name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="managerEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Manager Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter manager email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="managerPhone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Manager Phone</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="Enter manager phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter society description"
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Optional: Add any additional information about the society
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">{isEditing ? 'Update Society' : 'Create Society'}</Button>
            </form>
        </Form>
    );
} 