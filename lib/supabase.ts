
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Clear stale auth tokens from old Supabase projects
const currentRef = supabaseUrl.match(/\/\/([^.]+)\./)?.[1] || '';
const currentKey = `sb-${currentRef}-auth-token`;
for (let i = localStorage.length - 1; i >= 0; i--) {
  const key = localStorage.key(i);
  if (key && key.startsWith('sb-') && key.endsWith('-auth-token') && key !== currentKey) {
    localStorage.removeItem(key);
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
