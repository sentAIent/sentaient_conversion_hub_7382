import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({ error: 'Missing environment variables.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const payload = await req.json()
    
    const { source, type, message, metadata, correlation_id } = payload

    if (!source || !type || !message) {
      return new Response(
        JSON.stringify({ error: 'Invalid payload. Required fields: source, type, message' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    let fix_action = 'Investigate log source.'
    let proposed_fix_iac = null

    // Simulate Automated WAF / IP Banning logic
    if (type === 'security' && metadata?.ip_address) {
      fix_action = `Banned IP ${metadata.ip_address} on WAF`
      proposed_fix_iac = `
resource "aws_wafv2_ip_set" "banned_ips" {
  name               = "AutoBannedIPs"
  scope              = "REGIONAL"
  ip_address_version = "IPV4"
  addresses          = ["${metadata.ip_address}/32"]
}
      `.trim()
    }

    const { data, error } = await supabase
      .from('incidents')
      .insert([
        {
          type: type,
          title: `[${source}] ${type} Alert`,
          explanation: message,
          fix_action: fix_action,
          is_fixed: false,
          source: source,
          correlation_id: correlation_id || `corr_${Date.now()}`,
          proposed_fix_iac: proposed_fix_iac
        }
      ])
      .select()

    if (error) {
      console.error(error)
      return new Response(
        JSON.stringify({ error: 'Failed to insert log.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Log ingested successfully', data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
