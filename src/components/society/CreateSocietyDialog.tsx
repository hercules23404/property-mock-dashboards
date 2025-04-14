
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Society name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  total_units: z.coerce.number().int().min(1, "Must have at least 1 unit")
});

type FormValues = z.infer<typeof formSchema>;

interface CreateSocietyDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => void;
}

const CreateSocietyDialog: React.FC<CreateSocietyDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      total_units: 1
    }
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Society</DialogTitle>
          <DialogDescription>
            Enter the details for your new society. This will be used for property management.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Society Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter society name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of your housing society
                  </FormDescription>
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
                  <FormDescription>
                    Full address of the society
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="total_units"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Units</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      placeholder="Number of flats/apartments" 
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Total number of flats or apartments
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create Society</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSocietyDialog;
