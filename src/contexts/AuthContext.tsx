import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, firestore as db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Extend the Firebase User type
interface User extends FirebaseUser {
  role?: 'admin' | 'tenant';
  name?: string;
  societyId?: string;
  societyName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, name: string, role?: 'admin' | 'tenant') => Promise<void>;
  signOut: () => Promise<void>;
  updateUserSociety: (societyId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => { },
  signInWithGoogle: async () => { },
  signUp: async () => { },
  signOut: async () => { },
  updateUserSociety: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();

        // Combine Firebase user with Firestore data
        const enhancedUser: User = {
          ...firebaseUser,
          role: userData?.role || 'tenant',
          name: userData?.name || firebaseUser.displayName,
          societyId: userData?.societyId || '',
          societyName: userData?.societyName || '',
        };

        setUser(enhancedUser);

        // Set up real-time listener for user updates
        const userUnsubscribe = onSnapshot(doc(db, 'users', firebaseUser.uid), (doc) => {
          if (doc.exists()) {
            const updatedData = doc.data();
            setUser(prev => ({
              ...prev!,
              role: updatedData.role || prev?.role,
              name: updatedData.name || prev?.name,
              societyId: updatedData.societyId || prev?.societyId,
              societyName: updatedData.societyName || prev?.societyName,
            }));
          }
        });

        return () => userUnsubscribe();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          name: result.user.displayName,
          role: 'tenant',
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string, role: 'admin' | 'tenant' = 'tenant') => {
    try {
      // First create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user's display name in Firebase Auth
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      // Then create the user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        name,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        // Additional fields for admin users
        ...(role === 'admin' && {
          permissions: ['manage_societies', 'manage_tenants', 'manage_notices', 'manage_maintenance'],
          isSuperAdmin: false,
        }),
      });
    } catch (error: any) {
      console.error('Error signing up:', error);
      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please use a different email or sign in.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters long.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else {
        throw new Error('An error occurred during signup. Please try again.');
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserSociety = async (societyId: string) => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        societyId,
        updatedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Error updating user society:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signInWithGoogle,
      signUp,
      signOut: handleSignOut,
      updateUserSociety,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
