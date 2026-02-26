import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate that the URL is a real URL and not the placeholder from .env.example
const isValidUrl = (url: string) => {
    try {
        return url.startsWith('https://') && !url.includes('your_supabase_project_url_here');
    } catch {
        return false;
    }
};

const isReady = isValidUrl(supabaseUrl) && supabaseAnonKey && !supabaseAnonKey.includes('your_supabase_anon_key_here');

// Initialize the Supabase client safely
export const supabase = isReady
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any;

export const isCloudReady = isReady;

export const signOut = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error.message);
};
