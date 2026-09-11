#!/usr/bin/env bash
# Automated Redis Snapshot Backup

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="/usr/local/var/db/redis/dump.rdb" # Default Homebrew redis path, adjust as needed

mkdir -p "$BACKUP_DIR"

echo "[Backup] Triggering Redis BGSAVE..."
redis-cli BGSAVE

# Wait a few seconds for BGSAVE to finish
sleep 5

if [ -f "$DUMP_FILE" ]; then
    cp "$DUMP_FILE" "$BACKUP_DIR/redis_dump_$TIMESTAMP.rdb"
    echo "[Backup] Successfully backed up Redis to $BACKUP_DIR/redis_dump_$TIMESTAMP.rdb"
else
    echo "[Backup] WARNING: dump.rdb not found at $DUMP_FILE. Skipping copy."
fi
