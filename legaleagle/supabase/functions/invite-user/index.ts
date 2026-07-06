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

    const { email, team_id, role } = await req.json()

    if (!email || !team_id || !role) {
      throw new Error('Missing required fields')
    }

    // Verify caller is admin/owner
    const { data: memberData, error: memberError } = await supabaseClient
      .from('team_members')
      .select('role')
      .eq('team_id', team_id)
      .eq('user_id', user.id)
      .single()

    if (memberError || !memberData || !['admin', 'owner'].includes(memberData.role)) {
      throw new Error('You do not have permission to invite users to this team')
    }

    // Service role client to bypass RLS for inserting invite
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get team info
    const { data: teamData } = await supabaseAdmin
      .from('teams')
      .select('name')
      .eq('id', team_id)
      .single()

    // Get caller's profile to find n8n webhook
    const { data: profileData } = await supabaseAdmin
      .from('profiles')
      .select('n8n_webhook_url, full_name, email')
      .eq('id', user.id)
      .single()

    const webhookUrl = profileData?.n8n_webhook_url || Deno.env.get('N8N_WEBHOOK_URL')

    if (!webhookUrl) {
      throw new Error('No n8n webhook URL configured for sending email')
    }

    // Check if user is already a member
    const { data: existingMember } = await supabaseAdmin
      .from('team_members')
      .select('id')
      .eq('team_id', team_id)
      .eq('user_id', (await supabaseAdmin.from('profiles').select('id').eq('email', email).single()).data?.id)
      
    if (existingMember && existingMember.length > 0) {
       throw new Error('User is already a member of this team')
    }

    // Create or update invitation
    const { data: inviteData, error: inviteError } = await supabaseAdmin
      .from('team_invitations')
      .upsert({
        team_id,
        email,
        role,
        invited_by: user.id
      }, { onConflict: 'team_id, email' })
      .select()
      .single()

    if (inviteError) {
      throw inviteError
    }

    // Send via n8n
    const inviteLink = `https://sentaient.com/legaleagle/accept-invite?token=${inviteData.token}`
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'team.invitation',
        invite: {
            email: email,
            role: role,
            team_name: teamData?.name || 'A Legal Eagle Workspace',
            inviter_name: profileData?.full_name || profileData?.email || 'A colleague',
            invite_link: inviteLink
        },
        timestamp: new Date().toISOString()
      }),
    })

    if (!response.ok) {
       console.error("n8n responded with an error:", await response.text());
       // We won't throw here, just warn, so the UI still knows the invite was generated
    }

    return new Response(JSON.stringify({ success: true, invite: inviteData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
