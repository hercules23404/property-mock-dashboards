
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AuthLayout from "@/components/auth/AuthLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const signupFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isInvitedTenant, setIsInvitedTenant] = useState(false);
  const [invitationData, setInvitationData] = useState<{email: string, society_id: string} | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // Check if there's an email parameter in the URL query string
  // This would be used for tenant invitations
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    
    if (email) {
      form.setValue("email", email);
      
      // Check if this email has a tenant invitation
      const checkInvitation = async () => {
        try {
          const { data, error } = await supabase
            .from("tenant_invitations")
            .select("email, society_id")
            .eq("email", email)
            .single();

          if (error && error.code !== "PGRST116") {
            throw error;
          }

          if (data) {
            setIsInvitedTenant(true);
            setInvitationData(data);
          }
        } catch (error) {
          console.error("Error checking invitation:", error);
        }
      };

      checkInvitation();
    }
  }, [location.search, form]);

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      // Determine the role based on whether this is an invited tenant
      const role = isInvitedTenant ? "tenant" : "admin";
      
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            role: role,
            // Include society_id for tenants
            ...(isInvitedTenant && invitationData ? { society_id: invitationData.society_id } : {})
          },
        }
      });

      if (error) throw error;

      // If this was an invited tenant, remove the invitation
      if (isInvitedTenant && invitationData) {
        await supabase
          .from("tenant_invitations")
          .delete()
          .eq("email", values.email);
      }

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account",
      });
      
      navigate("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            {isInvitedTenant 
              ? "Sign up as a tenant with your invitation" 
              : "Sign up to manage your property"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="name@example.com" 
                        {...field} 
                        disabled={isInvitedTenant}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => navigate("/login")}>
            Already have an account? Log in
          </Button>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
};

export default Signup;
