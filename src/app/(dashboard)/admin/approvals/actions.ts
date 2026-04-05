'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

/**
 * Verify the caller is an authenticated admin. Returns the admin's profile
 * or throws/returns null if not authorized.
 */
async function getAdminProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const profile = data as Profile | null
  if (!profile || profile.role !== 'admin') return null
  return profile
}

/**
 * Get a Supabase admin client using the service role key.
 * Returns null if env vars are missing (dev mode).
 */
function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) return null

  return createServiceClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function approveUser(userId: string) {
  // Dev mode fallback — no Supabase configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('[dev] approveUser called without Supabase — returning mock success')
    return { success: true }
  }

  // Auth check: caller must be an admin
  const adminProfile = await getAdminProfile()
  if (!adminProfile) {
    return { success: false, error: 'Unauthorized. Admin access required.' }
  }

  const adminClient = getAdminClient()
  if (!adminClient) {
    return { success: false, error: 'Server configuration error.' }
  }

  const { error } = await adminClient
    .from('profiles')
    .update({
      approved: true,
      approved_at: new Date().toISOString(),
      approved_by: adminProfile.id,
    })
    .eq('id', userId)

  if (error) {
    console.error('approveUser error:', error.message)
    return { success: false, error: 'Failed to approve user. Please try again.' }
  }

  return { success: true }
}

export async function rejectUser(userId: string) {
  // Dev mode fallback — no Supabase configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('[dev] rejectUser called without Supabase — returning mock success')
    return { success: true }
  }

  // Auth check: caller must be an admin
  const adminProfile = await getAdminProfile()
  if (!adminProfile) {
    return { success: false, error: 'Unauthorized. Admin access required.' }
  }

  const adminClient = getAdminClient()
  if (!adminClient) {
    return { success: false, error: 'Server configuration error.' }
  }

  // Look up the user_id from the profile so we can delete from auth.users
  const { data: targetProfile, error: lookupError } = await adminClient
    .from('profiles')
    .select('user_id')
    .eq('id', userId)
    .single()

  if (lookupError || !targetProfile) {
    return { success: false, error: 'User not found.' }
  }

  // Delete from auth.users — this cascades to profiles
  const { error } = await adminClient.auth.admin.deleteUser(
    targetProfile.user_id,
  )

  if (error) {
    console.error('rejectUser error:', error.message)
    return { success: false, error: 'Failed to reject user. Please try again.' }
  }

  return { success: true }
}
