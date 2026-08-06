import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert a ping record to keep the project active
    const { data, error } = await supabaseClient
      .from('system_logs')
      .insert([
        { 
          service_name: 'keepalive-ping', 
          log_level: 'info',
          message: 'Automated keepalive ping executed to prevent project pause',
          metadata: { trigger: 'cron', timestamp: new Date().toISOString() }
        },
      ])

    if (error) throw error

    return new Response(JSON.stringify({ success: true, message: 'Keepalive ping recorded' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
