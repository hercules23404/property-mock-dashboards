
import { auth } from '@/lib/firebase';
import { sendEmailVerification } from 'firebase/auth';

interface WelcomeEmailData {
    name: string;
    email: string;
    password: string;
    societyName: string;
}

export const sendWelcomeEmail = async (toEmail?: string, data?: WelcomeEmailData) => {
    try {
        // If data is provided, send welcome email to new tenant
        if (toEmail && data) {
            // In a real implementation, this would call a server endpoint to send the email
            console.log('Sending welcome email to tenant', {
                to: toEmail,
                subject: 'Welcome to ' + data.societyName,
                body: `
                    Hello ${data.name},
                    
                    You have been added as a tenant to ${data.societyName}.
                    
                    Your login credentials are:
                    Email: ${data.email}
                    Password: ${data.password}
                    
                    Please login at our tenant portal.
                `
            });
            
            // In a production app, you would use an edge function to send this email
            // For now, we'll just simulate success
            return { success: true };
        }
        
        // Original functionality for sending email verification
        const user = auth.currentUser;
        if (!user) {
            throw new Error('No authenticated user');
        }

        // Send email verification which will trigger the welcome email template
        await sendEmailVerification(user, {
            url: `${window.location.origin}/dashboard?welcome=true`,
            handleCodeInApp: true,
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return { success: false, error };
    }
}; 
