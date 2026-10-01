import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// import { getAuth } from 'https://esm.sh/firebase-admin/auth' // if using Firebase Auth server-side

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Verify user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }

    const userId = user.id

    // Use a service role key to bypass RLS and delete all user data
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log(`Starting GDPR deletion pipeline for user: ${userId}`)

    // 1. Delete user from custom tables
    await supabaseAdmin.from('users').delete().eq('id', userId)
    await supabaseAdmin.from('presence_sessions').delete().eq('uid', userId)
    await supabaseAdmin.from('referrals').delete().or(`referrerUid.eq.${userId},referredUid.eq.${userId}`)
    
    // 2. Add to deletion audit log (retention policy TTL will clean this up eventually)
    await supabaseAdmin.from('gdpr_deletion_logs').insert([{ user_id: userId, deleted_at: new Date().toISOString() }])

    // 3. Delete user from auth (Supabase Auth)
    const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId)
    if (deleteAuthError) {
       console.error(`Failed to delete user ${userId} from auth:`, deleteAuthError)
       throw deleteAuthError
    }

    console.log(`Successfully completed GDPR deletion for user: ${userId}`)

    return new Response(
      JSON.stringify({ message: 'Account and all associated data successfully deleted.' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('GDPR Deletion Error:', error.message)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: corsHeaders })
  }
})
