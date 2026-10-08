import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// Create Supabase client if configured, otherwise null
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

/**
 * Storage Helper: Synchronizes with Supabase when available, 
 * falls back to localStorage automatically so the apps work instantly without waiting for credentials.
 */
export async function fetchCollection(tableName, fallbackData, storageKey) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from(tableName).select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn(`[Supabase] Fetch fallback for ${tableName}:`, err.message);
    }
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem(storageKey);
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error('LocalStorage read error:', e);
  }

  // Initial seed fallback
  try {
    localStorage.setItem(storageKey, JSON.stringify(fallbackData));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
  return fallbackData;
}

export async function saveRecord(tableName, record, storageKey, collection) {
  // 1. If Supabase is active, persist to DB
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from(tableName).upsert(record).select();
      if (error) {
        console.warn(`[Supabase] Upsert error on ${tableName}:`, error.message);
      } else if (data) {
        console.log(`[Supabase] Saved to ${tableName}:`, data);
      }
    } catch (err) {
      console.warn(`[Supabase] Save error on ${tableName}:`, err.message);
    }
  }

  // 2. Persist to LocalStorage for instant UI responsiveness
  try {
    const updated = collection.map((item) => (item.id === record.id ? { ...item, ...record } : item));
    if (!updated.some((item) => item.id === record.id)) {
      updated.unshift(record);
    }
    localStorage.setItem(storageKey, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('LocalStorage save error:', e);
    return collection;
  }
}

export async function deleteRecord(tableName, recordId, storageKey, collection) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from(tableName).delete().eq('id', recordId);
    } catch (err) {
      console.warn(`[Supabase] Delete error on ${tableName}:`, err.message);
    }
  }

  try {
    const updated = collection.filter((item) => item.id !== recordId);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('LocalStorage delete error:', e);
    return collection;
  }
}
