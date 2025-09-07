import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a demo client for development
const createDemoClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: () => Promise.resolve({ error: { message: 'Demo mode: Please verify your Supabase URL and anon key are correctly configured' } }),
    signInWithPassword: () => Promise.resolve({ error: { message: 'Demo mode: Please verify your Supabase URL and anon key are correctly configured' } }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ error: { message: 'Demo mode: Please verify your Supabase URL and anon key are correctly configured' } })
  }
})

let supabase: any

// Safely initialize Supabase with fallback
try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not found. Running in demo mode.')
    supabase = createDemoClient()
  } else if (!supabaseUrl.startsWith('https://')) {
    console.error(`Invalid Supabase URL format: ${supabaseUrl}. Should start with https://. 
    It looks like the URL and anon key might be swapped. 
    URL should be like: https://your-project.supabase.co
    Anon key should be a JWT token starting with 'eyJ'`)
    supabase = createDemoClient()
  } else if (!supabaseAnonKey.startsWith('eyJ')) {
    console.error(`Invalid Supabase anon key format. Should be a JWT token starting with 'eyJ'.
    It looks like the URL and anon key might be swapped.`)
    supabase = createDemoClient()
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log('Supabase initialized successfully')
  }
} catch (error) {
  console.error('Supabase initialization error:', error)
  supabase = createDemoClient()
}

export { supabase }

export type User = {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    name?: string
  }
}

export type AuthError = {
  message: string
}
