import { auth } from '@/lib/firebase';
import { sendEmailVerification } from 'firebase/auth';

export const sendWelcomeEmail = async () => {
    try {
        // Get the current user
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