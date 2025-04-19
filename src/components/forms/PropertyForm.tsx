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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const propertyFormSchema = z.object({
    unitNumber: z.string().min(1, 'Unit number is required'),
    societyId: z.string().min(1, 'Society is required'),
    type: z.enum(['apartment', 'villa', 'penthouse', 'studio']),
    bedrooms: z.number().min(0, 'Number of bedrooms must be 0 or more'),
    bathrooms: z.number().min(1, 'Must have at least 1 bathroom'),
    area: z.number().min(1, 'Area must be greater than 0'),
    rentAmount: z.number().min(0, 'Rent amount must be 0 or more'),
    status: z.enum(['vacant', 'occupied', 'maintenance']),
    description: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface PropertyFormProps {
    initialData?: PropertyFormValues;
    onSubmit: (data: PropertyFormValues) => void;
    isEditing?: boolean;
    societies: Array<{ id: string; name: string }>;
}

export function PropertyForm({
    initialData,
    onSubmit,
    isEditing = false,
    societies,
}: PropertyFormProps) {
    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertyFormSchema),
        defaultValues: initialData || {
            unitNumber: '',
            societyId: '',
            type: 'apartment',
            bedrooms: 1,
            bathrooms: 1,
            area: 0,
            rentAmount: 0,
            status: 'vacant',
            description: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="unitNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unit Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter unit number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="societyId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Society</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a society" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {societies.map((society) => (
                                            <SelectItem key={society.id} value={society.id}>
                                                {society.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Property Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select property type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="apartment">Apartment</SelectItem>
                                        <SelectItem value="villa">Villa</SelectItem>
                                        <SelectItem value="penthouse">Penthouse</SelectItem>
                                        <SelectItem value="studio">Studio</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="vacant">Vacant</SelectItem>
                                        <SelectItem value="occupied">Occupied</SelectItem>
                                        <SelectItem value="maintenance">Under Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bedrooms</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Number of bedrooms"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bathrooms</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Number of bathrooms"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Area (sq ft)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Area in square feet"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="rentAmount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rent Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter rent amount"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
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
                                    placeholder="Enter property description"
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Optional: Add any additional information about the property
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">{isEditing ? 'Update Property' : 'Add Property'}</Button>
            </form>
        </Form>
    );
} 