# Google Play Console Data Safety Declaration (MindWave)

## Overview
MindWave collects the minimum necessary data to provide personalized acoustic entrainment and mindfulness tracking. All data transmitted is encrypted using standard HTTPS/TLS protocols. Users can request immediate account and data deletion at any time.

## Data Categories Collected & Shared

| Category | Type | Purpose | Ephemeral / Stored | Shared with Third Parties |
|---|---|---|---|---|
| **Health & Fitness** | Heart Rate / HRV | Optional physiological biofeedback & frequency entrainment | Stored locally in IndexedDB; encrypted cloud backup if opted-in | No (Zero third-party sharing) |
| **Personal Info** | Email address / User ID | Account creation, authentication, enterprise licensing | Stored in PostgreSQL with RLS | No |
| **App Activity** | Session duration, carrier waves, assessment scores | Personal mindfulness statistics, longitudinal progress tracking | Stored locally; cloud sync if enabled | No |
| **Device or other IDs** | Anonymous installation identifier | License seat allocation and push notifications | Stored | No |

## Security Practices
1. **Data Encrypted in Transit**: All network requests use TLS 1.3 encryption.
2. **User Data Deletion**: Users can delete their data in-app or via https://sentaient.com/account-deletion.html.
3. **No Advertising / Data Brokerage**: MindWave contains zero advertising SDKs and never sells user data.
