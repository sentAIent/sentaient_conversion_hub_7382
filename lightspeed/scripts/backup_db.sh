#!/bin/bash
# Backup script for LightSpeed Supabase PostgreSQL database
# Intended to be run via a cron job on a secure internal server

# Exit on error
set -e

# Load environment variables (ensure this file contains SUPABASE_DB_URL)
if [ -f "../.env.local" ]; then
    export $(cat ../.env.local | grep -v '#' | awk '/=/ {print $1}')
fi

if [ -z "$SUPABASE_DB_URL" ]; then
    echo "❌ Error: SUPABASE_DB_URL is not set."
    exit 1
fi

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups"
BACKUP_FILE="${BACKUP_DIR}/lightspeed_backup_${TIMESTAMP}.sql"

mkdir -p "$BACKUP_DIR"

echo "⏳ Starting database backup to ${BACKUP_FILE}..."

# Execute pg_dump
# Note: Requires pg_dump installed on the host running this script
pg_dump "$SUPABASE_DB_URL" > "$BACKUP_FILE"

# Compress the backup
gzip "$BACKUP_FILE"

echo "✅ Backup complete: ${BACKUP_FILE}.gz"

# Optional: Cleanup backups older than 30 days
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +30 -exec rm {} \;
echo "🧹 Old backups cleaned up."
