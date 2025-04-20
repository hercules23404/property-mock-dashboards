import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyC0grxp2mNv4twDKEmhy7v2SkCiosYQmTM",
    authDomain: "rental-and-property-management.firebaseapp.com",
    projectId: "rental-and-property-management",
    storageBucket: "rental-and-property-management.firebasestorage.app",
    messagingSenderId: "505831527296",
    appId: "1:505831527296:web:137000ab608f0b60e36765",
    measurementId: "G-2H0WJS8M0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const functions = getFunctions(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// Add additional scopes
googleProvider.addScope('https://www.googleapis.com/auth/firebase');

// Initialize Analytics only if supported and in browser environment
let analytics = null;

if (typeof window !== 'undefined') {
    const initAnalytics = async () => {
        try {
            if (await isSupported()) {
                analytics = getAnalytics(app);
            }
        } catch (error) {
            console.warn('Firebase Analytics not supported in this environment');
        }
    };
    initAnalytics();
}

export { analytics }; 