
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase configuration
 * Note: In a production environment, these should be provided via environment variables.
 * We use placeholder strings here to prevent the 'supabaseUrl is required' initialization error.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
