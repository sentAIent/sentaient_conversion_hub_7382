import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req) => {
  try {
    const { record } = await req.json(); // Supabase webhook payload

    // Only alert on new incidents
    if (!record || record.is_fixed) {
      return new Response("Ignored", { status: 200 });
    }

    const discordWebhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");
    const slackWebhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
    const telegramBotToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const telegramChatId = Deno.env.get("TELEGRAM_CHAT_ID");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const message = `🚨 **LightSpeed Critical Alert** 🚨\n**Source**: ${record.source}\n**Issue**: ${record.title}\n**AI Diagnosis**: ${record.explanation}\n**Action**: ${record.fix_action}`;

    const fetchPromises = [];

    // Fetch user preferences for dynamic routing
    const { data: prefs } = await supabase.from('user_preferences').select('*').limit(1).single();

    if (prefs && resendApiKey) {
      const emailAddresses = [];
      if (prefs.email) emailAddresses.push(prefs.email);
      if (prefs.phone_number && prefs.carrier_gateway) {
        emailAddresses.push(`${prefs.phone_number}${prefs.carrier_gateway}`);
      }

      if (emailAddresses.length > 0) {
        fetchPromises.push(
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'LightSpeed Alerts <alerts@lightspeed.com>',
              to: emailAddresses,
              subject: `[CRITICAL] ${record.title} (${record.source})`,
              html: `<p><strong>Source:</strong> ${record.source}</p>
                     <p><strong>Issue:</strong> ${record.title}</p>
                     <p><strong>AI Diagnosis:</strong> ${record.explanation}</p>
                     <p><strong>Recommended Fix:</strong> ${record.fix_action}</p>`
            })
          })
        );
      }
    }

    // 1. Discord
    if (discordWebhookUrl) {
      fetchPromises.push(
        fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: message }),
        })
      );
    }

    // 2. Slack
    if (slackWebhookUrl) {
      fetchPromises.push(
        fetch(slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: message }),
        })
      );
    }

    // 3. Telegram
    if (telegramBotToken && telegramChatId) {
      const tgUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
      fetchPromises.push(
        fetch(tgUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
            parse_mode: "Markdown",
          }),
        })
      );
    }

    await Promise.allSettled(fetchPromises);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Alert Dispatch Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
