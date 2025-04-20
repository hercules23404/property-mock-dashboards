
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, firestore as db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';

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
  updateUserSociety: (societyId: string, societyName?: string) => Promise<void>;
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
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();

          // Check for user_roles
          const rolesRef = collection(db, 'user_roles');
          const rolesQuery = query(rolesRef, where('user_id', '==', firebaseUser.uid));
          const rolesSnapshot = await getDocs(rolesQuery);
          
          let societyId = userData?.societyId || '';
          let societyName = userData?.societyName || '';
          
          // If we have a role entry with a society, use that instead
          if (!rolesSnapshot.empty) {
            const roleData = rolesSnapshot.docs[0].data();
            if (roleData.society_id) {
              societyId = roleData.society_id;
              
              // Fetch society name
              const societyDoc = await getDoc(doc(db, 'societies', societyId));
              if (societyDoc.exists()) {
                societyName = societyDoc.data().name || '';
              }
            }
          }

          // Check for profile data
          let profileData = null;
          const profilesRef = collection(db, 'profiles');
          const profileQuery = query(profilesRef, where('id', '==', firebaseUser.uid));
          const profileSnapshot = await getDocs(profileQuery);
          
          if (!profileSnapshot.empty) {
            profileData = profileSnapshot.docs[0].data();
          }

          // Combine Firebase user with Firestore data
          const enhancedUser: User = {
            ...firebaseUser,
            role: profileData?.role || userData?.role || 'tenant',
            name: profileData?.name || userData?.name || firebaseUser.displayName,
            societyId: profileData?.societyId || societyId,
            societyName: profileData?.societyName || societyName,
          };

          setUser(enhancedUser);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Basic user info if we can't get the enhanced data
          setUser({
            ...firebaseUser,
            role: 'tenant',
          });
        }
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
          role: 'admin', // Default Google sign-in users to admin
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
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserSociety = async (societyId: string, societyName?: string) => {
    if (!user) return;

    try {
      // Update in users collection
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        societyId,
        societyName,
        updatedAt: new Date(),
      }, { merge: true });
      
      // Update local user state
      setUser(prevUser => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          societyId,
          societyName: societyName || prevUser.societyName
        };
      });
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
