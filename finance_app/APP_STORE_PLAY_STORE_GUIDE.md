# Liquid: Apple App Store & Google Play Store Submission Guide

This document specifies the exact configurations, regulatory declarations, and build workflows required to deploy **Liquid** to the **Apple App Store** and **Google Play Store**.

---

## 1. Apple App Store Guidelines & Compliance Playbook

### Guideline 3.1.5 (Cryptocurrencies):
- **Classification:** Liquid operates as a **non-custodial financial dashboard and smart contract interaction interface**.
- **Review Notes for Apple Reviewer:**
  > *"Liquid is a non-custodial software application. The app does not hold, custody, or transmit fiat or virtual currency on behalf of users. All cryptographic operations (token creation, vesting interactions) are signed directly by the user via their connected Web3 wallet or device Secure Enclave. Liquid does not operate an unregistered exchange or custodial wallet."*
- **Geographic Restrictions:** If deploying token minting features globally, ensure restricted jurisdictions (e.g., sanctioned countries per OFAC) are excluded via App Store Connect territory availability.

### Guideline 3.1.3(a) (Multiplatform Services & In-App Purchases):
- **Enterprise SaaS Exemption:** B2B accounting and financial reporting subscriptions qualify as multiplatform SaaS under Section 3.1.3(a).
- **Implementation Rule:**
  - Users who purchase a subscription on the web (`sentaient.com/liquid`) can sign in and access all features in the iOS app without being forced to use Apple In-App Purchase (IAP).
  - Do not link directly from inside the iOS app to an external Stripe payment page; instead, present a standard sign-in / account sync screen.

### iOS Privacy Manifest (`PrivacyInfo.xcprivacy`):
- Location: `ios/App/App/PrivacyInfo.xcprivacy` (already generated and integrated).
- Declared APIs:
  - `NSPrivacyAccessedAPICategoryUserDefaults` (Reason: `CA92.1` for user offline preferences).
  - `NSPrivacyAccessedAPICategorySystemBootTime` (Reason: `35F9.1` for session latency measurement).
  - `NSPrivacyAccessedAPICategoryDiskSpace` (Reason: `E174.1` for offline receipt storage).
- Data Collected: Payment Info and User ID linked to functionality, not tracking (`NSPrivacyTracking = false`).

---

## 2. Google Play Store Guidelines & Policy Declarations

### Financial Services Declaration:
- In Google Play Console under **Policy and Programs > Financial Features Declaration**:
  - Select: **Financial Management & Accounting Tool**.
  - Check: Non-custodial personal finance & business accounting.
  - State clearly that Liquid does not provide micro-lending, personal loans, or salary advance products.

### Blockchain-Based Content Policy:
- Under **App Content > Blockchain-Based Content**:
  - Declare that the app contains blockchain-based features (Token Studio & Portfolio tracking).
  - Affirm: *"The app does not offer real-world gambling or simulated casino mechanics with blockchain assets."*

### Play Integrity API & Biometrics:
- Target Android SDK 34 (Android 14) or higher.
- Biometric authentication uses Android `BiometricPrompt` with hardware-backed Keystore crypto keys.

---

## 3. Step-by-Step Native Build & Release Commands

### Prerequisites:
- macOS with Xcode 15+ and CocoaPods installed.
- Android Studio with Android SDK 34 installed.

### Step 1: Build Web Assets
```bash
cd finance_app
npm run build
```

### Step 2: Sync Native Platforms with Capacitor
```bash
npx cap sync
```

### Step 3: iOS Build & Xcode Archive
```bash
# Open iOS project in Xcode
npx cap open ios

# Inside Xcode:
# 1. Select 'App' target > Signing & Capabilities.
# 2. Select your Apple Developer Team.
# 3. Product > Destination > Any iOS Device (arm64).
# 4. Product > Archive.
# 5. Distribute App > App Store Connect > Upload.
```

### Step 4: Android Release App Bundle (AAB)
```bash
# Open Android project in Android Studio
npx cap open android

# Build release bundle via command line:
cd android
./gradlew bundleRelease

# The generated bundle is at:
# android/app/build/outputs/bundle/release/app-release.aab
# Upload this .aab file to Google Play Console > Production or Internal Testing.
```
