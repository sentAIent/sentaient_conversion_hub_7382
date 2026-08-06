import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Fetch root domains from apps table
    const { data: apps, error: appError } = await supabase
      .from('apps')
      .select('id, name')
      .in('type', ['Website', 'Web App', 'WebApp', 'website', 'web']);
      
    if (appError) throw appError;
    if (!apps || apps.length === 0) {
       return new Response(JSON.stringify({ success: true, message: "No root domains found to scan." }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let newlyDiscoveredCount = 0;
    const incidents = [];

    // Map of existing apps to avoid re-inserting
    const existingAppsSet = new Set(apps.map(a => a.id.toLowerCase()));

    // 2. Query crt.sh for each root domain
    for (const app of apps) {
      let rootDomain = app.id;
      // Strip protocols and www
      rootDomain = rootDomain.replace(/^https?:\/\//, '').replace(/^www\./, '');

      console.log(`Querying CT logs for: ${rootDomain}`);
      try {
        const response = await fetch(`https://crt.sh/?q=%.${rootDomain}&output=json`);
        if (!response.ok) {
          console.warn(`crt.sh returned ${response.status} for ${rootDomain}`);
          continue;
        }

        const certs = await response.json();
        const discoveredSubdomains = new Set<string>();

        for (const cert of certs) {
          // name_value can contain multiple domains separated by newlines
          const names = cert.name_value.split('\n');
          for (const name of names) {
            const cleanName = name.trim().toLowerCase();
            if (cleanName.endsWith(rootDomain) && !cleanName.includes('*') && !existingAppsSet.has(cleanName)) {
              discoveredSubdomains.add(cleanName);
            }
          }
        }

        // 3. Insert newly discovered subdomains into the apps table
        if (discoveredSubdomains.size > 0) {
          const newAppsToInsert = Array.from(discoveredSubdomains).map(subdomain => ({
            id: subdomain,
            name: `${app.name} (Discovered Subdomain)`,
            type: 'Discovered Asset'
          }));

          const { error: insertError } = await supabase
            .from('apps')
            .insert(newAppsToInsert);

          if (insertError) {
             console.error(`Error inserting subdomains for ${rootDomain}:`, insertError);
          } else {
             newlyDiscoveredCount += discoveredSubdomains.size;
             // Add them to our local set so we don't try to re-insert them later in the loop if there are duplicates
             newAppsToInsert.forEach(a => existingAppsSet.add(a.id));

             // Create an incident alert for the analyst
             incidents.push({
               type: 'security',
               title: `New Shadow IT Assets Discovered for ${rootDomain}`,
               explanation: `Recon agent passively discovered ${discoveredSubdomains.size} new subdomains in Certificate Transparency logs (e.g. ${Array.from(discoveredSubdomains).slice(0, 3).join(', ')}).`,
               fix_action: 'Verify if these assets are authorized. If not, investigate potential shadow IT.',
               is_fixed: false,
               source: 'recon-agent'
             });
          }
        }
      } catch (scanError) {
        console.error(`Failed to query crt.sh for ${rootDomain}:`, scanError);
      }
    }

    // 4. Insert Incidents
    if (incidents.length > 0) {
      const { error: incidentError } = await supabase
        .from('incidents')
        .insert(incidents);
        
      if (incidentError) throw incidentError;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      scanned: apps.length,
      discoveredAssets: newlyDiscoveredCount,
      incidentsCreated: incidents.length
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
