#!/bin/bash
# Firebase Automated Backup Script
# This script is intended to be run as a cron job or via GitHub Actions/GCP Cloud Scheduler
# It triggers a Firestore export to a Google Cloud Storage bucket.
#
# Requirements:
# 1. gcloud CLI installed and authenticated
# 2. A GCS bucket for backups (e.g., gs://sentaient-firestore-backups)

PROJECT_ID="sentaient-conversion-hub"
BUCKET="gs://sentaient-firestore-backups-$(date +%Y%m%d)"

echo "Starting Firestore backup for project: $PROJECT_ID"
gcloud firestore export $BUCKET --project=$PROJECT_ID

echo "Backup initiated to $BUCKET. Check GCP console for operation status."
