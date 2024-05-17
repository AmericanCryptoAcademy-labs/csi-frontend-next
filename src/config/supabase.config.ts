
import { createClient } from '@supabase/supabase-js'

export const supabaseProjectId = process.env.SUPABASE_PROJECT_URL;
if (!supabaseProjectId) throw new Error('Supabase Project ID is not defined')

export const supabaseApiKey = process.env.SUPABASE_API_KEY;
if (!supabaseApiKey) throw new Error('supabaseApiKey is not defined')


// Create a single supabase client for interacting with your database
export const supabase = createClient(
    supabaseProjectId, 
    supabaseApiKey
)

