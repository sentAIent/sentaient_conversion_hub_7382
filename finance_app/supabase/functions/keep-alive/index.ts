import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.7"

console.log("Keep-Alive Edge Function initializing...")

serve(async (req) => {
  try {
    // We only need the URL and ANON_KEY since we are just doing a simple keep-alive ping.
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables")
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Execute a simple, zero-impact query to register activity in the database.
    // This wakes up/keeps alive the Postgres instance.
    const { data, error } = await supabase
      .from('entities') // Using our new multi-tenancy table
      .select('id')
      .limit(1)

    if (error) throw error

    return new Response(
      JSON.stringify({ message: "Keep-alive ping successful", time: new Date().toISOString() }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error("Keep-alive error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
})
