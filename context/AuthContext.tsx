
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
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Listen for Auth Changes FIRST (fires INITIAL_SESSION synchronously in v2)
    const { data: { subscription } } = (supabase.auth as any).onAuthStateChange((event: any, session: any) => {
      if (session) {
        // Defer async profile fetch to avoid blocking the auth state machine
        setTimeout(() => {
          fetchProfile(session.user.id).finally(() => setLoading(false));
        }, 0);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // 2. Fallback: if onAuthStateChange didn't fire, ensure loading clears
    const timeout = setTimeout(() => setLoading(false), 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
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

  const resetPassword = async (email: string) => {
    const { error } = await (supabase.auth as any).resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/#/login`,
    });
    if (error) throw error;
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
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
