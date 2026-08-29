// One-off script to create an admin user directly via the Supabase Admin API.
// Usage:
//   SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/create-user.mjs someone@example.com "TempPass123!"
//
// Requires NEXT_PUBLIC_SUPABASE_URL (already in .env.local) and the
// SERVICE ROLE key (Project Settings > API > service_role). Never expose the
// service role key to the browser or commit it - pass it as an env var only.

import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const [, , email, password] = process.argv

if (!email || !password) {
  console.error('Usage: node scripts/create-user.mjs <email> <password>')
  process.exit(1)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment.')
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const { data, error } = await supabaseAdmin.auth.admin.createUser({
  email,
  password,
  email_confirm: true, // skip the confirmation email, user can log in right away
})

if (error) {
  console.error('Failed to create user:', error.message)
  process.exit(1)
}

console.log('User created:', data.user.id, data.user.email)
