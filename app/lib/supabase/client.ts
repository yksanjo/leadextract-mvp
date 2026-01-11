import { createClient } from '@supabase/supabase-js'

// For build time, return a mock client if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Server-side client with service role key
export const supabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    // Return mock for build time
    return {
      from: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        }),
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        }),
        upsert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        })
      })
    } as any
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}