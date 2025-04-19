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
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';

const noticeFormSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    type: z.enum(['info', 'warning', 'error']),
    startDate: z.date(),
    endDate: z.date().optional(),
    societyId: z.string().min(1, 'Society is required'),
    isImportant: z.boolean().default(false),
});

type NoticeFormValues = z.infer<typeof noticeFormSchema>;

interface NoticeFormProps {
    initialData?: NoticeFormValues;
    onSubmit: (data: NoticeFormValues) => void;
    isEditing?: boolean;
    societies: Array<{ id: string; name: string }>;
}

export function NoticeForm({
    initialData,
    onSubmit,
    isEditing = false,
    societies,
}: NoticeFormProps) {
    const form = useForm<NoticeFormValues>({
        resolver: zodResolver(noticeFormSchema),
        defaultValues: initialData || {
            title: '',
            content: '',
            type: 'info',
            startDate: new Date(),
            endDate: undefined,
            societyId: '',
            isImportant: false,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter notice title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter notice content"
                                    className="min-h-[150px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notice Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select notice type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="info">Information</SelectItem>
                                        <SelectItem value="warning">Warning</SelectItem>
                                        <SelectItem value="error">Error</SelectItem>
                                    </SelectContent>
                                </Select>
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
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        className="rounded-md border"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date (Optional)</FormLabel>
                                <FormControl>
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        className="rounded-md border"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Leave empty if the notice has no end date
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="isImportant"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Mark as Important</FormLabel>
                                <FormDescription>
                                    Important notices will be highlighted and shown at the top
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit">{isEditing ? 'Update Notice' : 'Create Notice'}</Button>
            </form>
        </Form>
    );
} 