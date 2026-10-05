#!/bin/bash
# automated database backup script for PostgreSQL / Supabase
# Requires standard pg_dump tools to be installed
# To automate, add to crontab:
# 0 3 * * * /path/to/scripts/backup_db.sh

set -e

# Load environment variables if needed
if [ -f "../.env" ]; then
  source ../.env
fi

BACKUP_DIR="../backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
FILENAME="db_backup_${TIMESTAMP}.sql"

mkdir -p "$BACKUP_DIR"

if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL environment variable is not set."
  echo "Ensure you have DATABASE_URL set in your .env or CI environment."
  exit 1
fi

echo "Starting automated database backup to $BACKUP_DIR/$FILENAME..."

# Perform the pg_dump
# We use custom format (-Fc) for easier partial restores, or plain text if preferred
pg_dump "$DATABASE_URL" --clean --if-exists -F c -f "$BACKUP_DIR/$FILENAME"

# Optional: compress if using plain text
# gzip "$BACKUP_DIR/$FILENAME"

echo "✅ Backup completed successfully: $BACKUP_DIR/$FILENAME"

# Cleanup backups older than 30 days
find "$BACKUP_DIR" -type f -name "db_backup_*.sql*" -mtime +30 -exec rm {} \;
echo "Cleaned up backups older than 30 days."
