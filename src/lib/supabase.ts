
import { auth, firestore } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Custom functions to simplify auth with Firebase instead of Supabase
export const createTenantUser = async (email: string, password: string, userData: any) => {
  // Create auth user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  if (userCredential.user) {
    // Update profile if name is provided
    if (userData.name) {
      await updateProfile(userCredential.user, {
        displayName: userData.name
      });
    }
    
    // Create user document with additional data
    await setDoc(doc(firestore, 'profiles', userCredential.user.uid), {
      id: userCredential.user.uid,
      email,
      role: 'tenant',
      ...userData,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    return {
      user: userCredential.user,
      profile: {
        id: userCredential.user.uid,
        email,
        role: 'tenant',
        ...userData
      }
    };
  }
  
  throw new Error('Failed to create user');
};

export const updateUser = async (userId: string, userData: any) => {
  // Update user profile in Firestore
  const userRef = doc(firestore, 'profiles', userId);
  
  await setDoc(userRef, {
    ...userData,
    updated_at: new Date()
  }, { merge: true });
  
  // Get the updated user data
  const updatedDoc = await getDoc(userRef);
  
  if (updatedDoc.exists()) {
    return updatedDoc.data();
  }
  
  throw new Error('Failed to update user');
};

// For compatibility with existing Supabase calls
export const supabase = {
  auth: {
    signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => {
      try {
        const data = await createTenantUser(email, password, options?.data || {});
        return { data, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    }
  },
  from: (table: string) => ({
    upsert: (data: any) => {
      const { id, ...rest } = data;
      return {
        select: () => ({
          single: async () => {
            try {
              const updatedData = await updateUser(id, rest);
              return { data: updatedData, error: null };
            } catch (error: any) {
              return { data: null, error };
            }
          }
        })
      };
    }
  })
};
