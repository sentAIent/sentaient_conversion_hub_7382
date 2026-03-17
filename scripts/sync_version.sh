#!/bin/bash

# Mindwave Version Sync Script
# Usage: sh scripts/sync_version.sh [VERSION_NAME]
# Example: sh scripts/sync_version.sh V41

VERSION_NAME=$1

if [ -z "$VERSION_NAME" ]; then
    echo "Error: Please provide a version name (e.g., V41)"
    exit 1
fi

FULL_VERSION="NUCLEAR_FIX_$VERSION_NAME"
CACHE_VERSION="mindwave-cache-$(echo $VERSION_NAME | tr '[:upper:]' '[:lower:]')"

echo "Syncing all files to version: $FULL_VERSION..."

# 1. Update HTML files
sed -i '' "s/NUCLEAR_FIX_V[0-9]*/$FULL_VERSION/g" public/*.html

# 2. Update Service Worker Cache
sed -i '' "s/mindwave-cache-v[0-9]*/$CACHE_VERSION/g" public/sw.js

echo "✅ Success: All entry points synced to $FULL_VERSION"
echo "✅ Success: Service Worker cache set to $CACHE_VERSION"
