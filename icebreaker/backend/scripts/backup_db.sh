#!/bin/bash
# automated_backup.sh
# Automated PostgreSQL Backup Script for Resilience

set -e

BACKUP_DIR="/var/backups/icebreaker"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
DB_NAME="icebreaker_prod"
DB_USER="postgres"
BACKUP_FILE="$BACKUP_DIR/icebreaker_backup_$TIMESTAMP.sql.gz"

echo "[INFO] Starting database backup for $DB_NAME..."

mkdir -p "$BACKUP_DIR"

# Dump and compress
pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$BACKUP_FILE"

echo "[INFO] Backup saved to $BACKUP_FILE"

# Clean up backups older than 30 days
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +30 -exec rm {} \;

echo "[INFO] Old backups cleaned up. Done."
