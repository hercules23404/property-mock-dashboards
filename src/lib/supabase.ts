
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://zkfqubhmbkzvqjmhjlqu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprZnF1YmhtYmt6dnFqbWhqbHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDcxMzYsImV4cCI6MjA2MDIyMzEzNn0.OomoypjxCVdNogew1kQARBny6ueNE8jrUiFS5oJ09tk';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage
  }
});

// Custom functions to simplify auth
export const createTenantUser = async (email: string, password: string, userData: any) => {
  // First create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...userData,
        role: 'tenant'
      }
    }
  });
  
  if (error) throw error;
  return data;
};

export const updateUser = async (userId: string, userData: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      ...userData,
      updated_at: new Date()
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};
