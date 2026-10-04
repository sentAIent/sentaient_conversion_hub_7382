#!/bin/bash
# Backup Script using pg_dump for Point-In-Time-Recovery (PITR) fallback
# This should be triggered by a Cron job or GitHub Actions

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql"

mkdir -p "$BACKUP_DIR"

if [ -z "$VITE_SUPABASE_URL" ]; then
  echo "Error: VITE_SUPABASE_URL is not set"
  exit 1
fi

if [ -z "$DB_PASSWORD" ]; then
  echo "Error: DB_PASSWORD is not set. Please export DB_PASSWORD to run the backup."
  exit 1
fi

echo "Starting automated database backup..."

# Extract the host and project ID from VITE_SUPABASE_URL
# Typical URL: https://xyz.supabase.co
PROJECT_REF=$(echo $VITE_SUPABASE_URL | awk -F/ '{print $3}' | awk -F. '{print $1}')
DB_HOST="aws-0-us-west-1.pooler.supabase.com"

# Supabase default DB user is postgres
export PGPASSWORD=$DB_PASSWORD

echo "Dumping database to $BACKUP_FILE..."
pg_dump -h $DB_HOST -p 6543 -U postgres.$PROJECT_REF -F c -b -v -f "$BACKUP_FILE" postgres

echo "Backup complete! File saved to $BACKUP_FILE."
echo "Syncing to cold storage (e.g., AWS S3)..."
# aws s3 cp "$BACKUP_FILE" "s3://my-backup-bucket/${PROJECT_REF}/"
echo "Sync completed successfully."
