exports.handler = async (event, context) => {
  // Example Health Check logic designed to be triggered via Cron

  const DISCORD_WEBHOOK_URL = process.env.DISCORD_HEALTH_WEBHOOK_URL;
  
  try {
    // 1. Check Database connection
    // const { data, error } = await supabase.from('users').select('id').limit(1);
    // if (error) throw new Error('Database connection failed');

    // 2. Check 3rd party APIs
    // const stripeRes = await fetch('https://api.stripe.com/v1/healthcheck', ...);

    // If all good:
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "healthy", timestamp: new Date().toISOString() }),
    };

  } catch (error) {
    console.error("Health Check Failed:", error);
    
    // Dispatch to Discord / Telegram Autopilot
    if (DISCORD_WEBHOOK_URL) {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚨 **URGENT: PRODUCTION HEALTH CHECK FAILED** 🚨\n\n**Error:** \`${error.message}\`\n**Time:** ${new Date().toISOString()}\n\nPlease investigate immediately.`,
        }),
      });
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ status: "unhealthy", error: error.message }),
    };
  }
};
