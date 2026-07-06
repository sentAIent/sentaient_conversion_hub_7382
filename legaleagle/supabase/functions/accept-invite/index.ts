import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get the caller's auth token
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    const { token } = await req.json()

    if (!token) {
      throw new Error('Missing token')
    }

    // Service role client to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Find the invitation
    const { data: inviteData, error: inviteError } = await supabaseAdmin
      .from('team_invitations')
      .select('*')
      .eq('token', token)
      .single()

    if (inviteError || !inviteData) {
      throw new Error('Invalid or expired invitation token')
    }

    if (new Date(inviteData.expires_at) < new Date()) {
       // Delete expired token
       await supabaseAdmin.from('team_invitations').delete().eq('id', inviteData.id)
       throw new Error('Invitation has expired')
    }

    // Ensure email matches (optional, but good for security)
    if (user.email !== inviteData.email) {
       throw new Error('Invitation email does not match authenticated user email')
    }

    // Check if user is already a member
    const { data: existingMember } = await supabaseAdmin
      .from('team_members')
      .select('id')
      .eq('team_id', inviteData.team_id)
      .eq('user_id', user.id)
      
    if (existingMember && existingMember.length > 0) {
       // Just delete the invite since they are already in
       await supabaseAdmin.from('team_invitations').delete().eq('id', inviteData.id)
       return new Response(JSON.stringify({ success: true, message: 'Already a member' }), {
         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
       })
    }

    // Add user to team
    const { error: memberError } = await supabaseAdmin
      .from('team_members')
      .insert({
        team_id: inviteData.team_id,
        user_id: user.id,
        role: inviteData.role
      })

    if (memberError) {
       throw memberError
    }

    // Delete the invitation
    await supabaseAdmin.from('team_invitations').delete().eq('id', inviteData.id)

    // Update their current_team_id
    await supabaseAdmin
      .from('profiles')
      .update({ current_team_id: inviteData.team_id })
      .eq('id', user.id)

    return new Response(JSON.stringify({ success: true, team_id: inviteData.team_id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
