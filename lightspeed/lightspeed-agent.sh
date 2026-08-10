#!/bin/bash

# Lightspeed Universal Telemetry & Security Agent
# ------------------------------------------------
# Run this on any Linux endpoint (AWS, Azure, Bare Metal) 
# to stream logs and system telemetry to Lightspeed.

# Configuration
# Replace these with your actual Supabase URL and Anon Key
SUPABASE_URL="${SUPABASE_URL:-https://your-project-ref.supabase.co}"
SUPABASE_ANON_KEY="${SUPABASE_ANON_KEY:-your-anon-key}"
INGEST_ENDPOINT="$SUPABASE_URL/functions/v1/ingest-log"
HOSTNAME=$(hostname)

echo "Starting Lightspeed Agent on $HOSTNAME..."
echo "Targeting ingestion endpoint: $INGEST_ENDPOINT"

# Gather simple telemetry (CPU load)
CPU_LOAD=$(uptime | awk -F'load average:' '{ print $2 }' | cut -d, -f1 | sed 's/ //g')
MEMORY_USAGE=$(free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2 }')

echo "Current CPU Load: $CPU_LOAD"
echo "Current Memory Usage: $MEMORY_USAGE"

# Send a Telemetry Event
echo "Pushing telemetry event..."
curl -s -X POST "$INGEST_ENDPOINT" \
     -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{
           "source": "'"$HOSTNAME"'",
           "type": "telemetry",
           "message": "Host metrics update. CPU: '"$CPU_LOAD"', Memory: '"$MEMORY_USAGE"'",
           "severity": "low"
         }' > /dev/null

echo "Done."

# Simulate an SSH Login Failure (Security Alert)
echo "Simulating SSH Brute Force Detection..."
curl -s -X POST "$INGEST_ENDPOINT" \
     -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{
           "source": "'"$HOSTNAME"'",
           "type": "security_alert",
           "message": "Detected 5 failed SSH login attempts from 192.168.1.42 in the last minute.",
           "severity": "high"
         }' > /dev/null

echo "Security alert pushed."
echo "Agent execution completed successfully."
