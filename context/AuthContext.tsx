
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Session Check
    const initialize = async () => {
      // Fix: Cast to any to resolve 'getSession' missing on SupabaseAuthClient type in this environment
      const { data: { session } } = await (supabase.auth as any).getSession();
      if (session) {
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    initialize();

    // 2. Listen for Auth Changes
    // Fix: Cast to any to resolve 'onAuthStateChange' missing on SupabaseAuthClient type in this environment
    const { data: { subscription } } = (supabase.auth as any).onAuthStateChange(async (event: any, session: any) => {
      if (session) {
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setUser(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const login = async (email: string, pass: string) => {
    // Fix: Cast to any to resolve 'signInWithPassword' missing on SupabaseAuthClient type in this environment
    const { error } = await (supabase.auth as any).signInWithPassword({ email, password: pass });
    if (error) throw error;
  };

  const signup = async (data: any) => {
    // Sign up with user metadata - profile is auto-created by database trigger
    const { data: authData, error } = await (supabase.auth as any).signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone_number: data.phone
        }
      }
    });

    if (error) throw error;

    // Update profile with additional data after trigger creates it
    if (authData.user) {
      // Small delay to ensure trigger has completed
      await new Promise(resolve => setTimeout(resolve, 500));

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          phone_number: data.phone
        })
        .eq('id', authData.user.id);

      if (updateError) {
        console.warn("Profile update warning:", updateError);
      }
    }
  };

  const logout = async () => {
    try {
      // Fix: Cast to any to resolve 'signOut' missing on SupabaseAuthClient type in this environment
      await (supabase.auth as any).signOut();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Always clear user state even if signOut fails
      setUser(null);
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id);
    
    if (error) throw error;
    setUser({ ...user, ...data });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
