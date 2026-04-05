-- ============================================================================
-- RESTRICT PROFILE SELF-UPDATE — prevent users from changing sensitive fields
-- ============================================================================
-- The original `profiles_update` policy allows users to update ANY column on
-- their own row. This means a user could SET approved = true, change their
-- role, or tamper with approval metadata. This migration replaces it with a
-- restricted policy using WITH CHECK to ensure sensitive fields are immutable
-- by the row owner.
-- ============================================================================

-- Drop the overly-permissive update policy
DROP POLICY IF EXISTS profiles_update ON profiles;

-- Create a restricted update policy:
-- Users can only update their own row AND cannot change protected fields.
-- The WITH CHECK ensures the new values for protected columns match the old.
-- Protected columns: role, approved, approved_at, approved_by
CREATE POLICY profiles_update ON profiles
    FOR UPDATE
    USING (user_id = auth.uid())
    WITH CHECK (
        role = (SELECT p.role FROM profiles p WHERE p.id = profiles.id)
        AND approved = (SELECT p.approved FROM profiles p WHERE p.id = profiles.id)
        AND approved_at IS NOT DISTINCT FROM (SELECT p.approved_at FROM profiles p WHERE p.id = profiles.id)
        AND approved_by IS NOT DISTINCT FROM (SELECT p.approved_by FROM profiles p WHERE p.id = profiles.id)
    );

-- Note: Admins can still update any profile via the `admin_all_profiles`
-- policy from 20250715000000_admin_tables.sql which uses is_admin().
