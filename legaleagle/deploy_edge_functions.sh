#!/bin/bash

echo "Deploying Legal Eagle Edge Functions..."

# Deploy the new invite functions
echo "Deploying invite-user function..."
npx -y firebase-tools@latest emulators:exec "supabase functions deploy invite-user" || supabase functions deploy invite-user

echo "Deploying accept-invite function..."
npx -y firebase-tools@latest emulators:exec "supabase functions deploy accept-invite" || supabase functions deploy accept-invite

echo ""
echo "================================================================"
echo "Deployment Complete! Next steps:"
echo "================================================================"
echo ""
echo "1. Set your n8n Webhook URL for the email invitations:"
echo "   supabase secrets set N8N_WEBHOOK_URL=\"https://your-n8n-instance.com/webhook/...\""
echo ""
echo "2. Don't forget to set your Stripe secrets if you haven't already:"
echo "   supabase secrets set STRIPE_SECRET_KEY=\"sk_test_...\""
echo "   supabase secrets set STRIPE_WEBHOOK_SECRET=\"whsec_...\""
echo ""
echo "================================================================"
