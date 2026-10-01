/**
 * publishingValidator.js
 * Programmatic audit engine that evaluates workspace configurations
 * to determine launch readiness across Web, Google Play, and Apple App Store.
 */

export class PublishingValidator {
    constructor(workspaceRoot = '.') {
        this.root = workspaceRoot;
        this.fs = null;
        this.path = null;
        this.isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
    }

    async init() {
        if (this.isNode) {
            this.fs = await import('fs');
            this.path = await import('path');
        }
    }

    /**
     * Helper to read file if in Node.js environment
     */
    safeReadFile(relativePath) {
        if (!this.isNode || !this.fs || !this.path) return null;
        try {
            const fullPath = this.path.join(this.root, relativePath);
            if (this.fs.existsSync(fullPath)) {
                return this.fs.readFileSync(fullPath, 'utf8');
            }
        } catch (e) {
            // Ignore missing files
        }
        return null;
    }

    /**
     * Audit Web readiness
     */
    async auditWeb() {
        const report = { platform: 'Web', score: 0, maxScore: 3, issues: [] };
        
        // 1. Check Package.json for build scripts
        const packageJson = this.safeReadFile('package.json');
        if (packageJson && packageJson.includes('"build"')) {
            report.score++;
        } else {
            report.issues.push('package.json missing "build" script.');
        }

        // 2. Check index.html for SEO / Meta tags
        const indexHtml = this.safeReadFile('index.html');
        if (indexHtml && indexHtml.includes('meta name="description"')) {
            report.score++;
        } else {
            report.issues.push('index.html missing standard SEO <meta name="description"> tag.');
        }

        // 3. Environmental leaks check
        const envFile = this.safeReadFile('.env');
        if (envFile && envFile.includes('SECRET')) {
            report.issues.push('.env file contains potential secrets but was not excluded from audit.');
        } else {
            report.score++;
        }

        report.percentage = Math.round((report.score / report.maxScore) * 100);
        return report;
    }

    /**
     * Audit Google Play (Android) readiness
     */
    async auditAndroid() {
        const report = { platform: 'Google Play', score: 0, maxScore: 4, issues: [] };
        
        // 1. Check for Capacitor/Cordova wrappers or android directory
        const capacitorConfig = this.safeReadFile('capacitor.config.json') || this.safeReadFile('capacitor.config.ts');
        const androidDirExists = this.isNode && this.fs.existsSync(this.path.join(this.root, 'android'));
        if (capacitorConfig || androidDirExists) {
            report.score++;
        } else {
            report.issues.push('No Android wrapper found (Capacitor/React Native). App cannot be compiled for Android.');
        }

        // 2. Check target API SDK (Needs 36 for Android 16)
        const buildGradle = this.safeReadFile('android/app/build.gradle');
        if (buildGradle && buildGradle.includes('targetSdkVersion 36')) {
            report.score++;
        } else {
            report.issues.push('Target SDK Version is not 36. Google Play requires API 36 (Android 16) for 2026 mandates.');
        }

        // 3. Check for 14-day Testing Track logic (Simulated check)
        report.issues.push('Google Play 14-day closed testing track with 12 users must be completed manually on Google Play Console.');

        // 4. Asset sizes
        const hasAndroidIcon = this.isNode && this.fs.existsSync(this.path.join(this.root, 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png'));
        if (hasAndroidIcon) {
            report.score++;
        } else {
            report.issues.push('Missing high-res Android icon formats (mipmap-xxxhdpi).');
        }

        // Data Safety compliance
        report.issues.push('Data Safety Form and privacy policy must be hosted publicly.');

        report.percentage = Math.round((report.score / report.maxScore) * 100);
        return report;
    }

    /**
     * Audit Apple App Store (iOS) readiness
     */
    async auditIOS() {
        const report = { platform: 'Apple App Store', score: 0, maxScore: 4, issues: [] };

        // 1. Check for iOS wrapper
        const iosDirExists = this.isNode && this.fs.existsSync(this.path.join(this.root, 'ios'));
        if (iosDirExists) {
            report.score++;
        } else {
            report.issues.push('No iOS wrapper directory found. App cannot be compiled for iOS.');
        }

        // 2. Check for Privacy Manifest (PrivacyInfo.xcprivacy)
        const privacyInfo = this.safeReadFile('ios/App/PrivacyInfo.xcprivacy');
        if (privacyInfo) {
            report.score++;
        } else {
            report.issues.push('Missing PrivacyInfo.xcprivacy manifest. Apple requires explicit privacy declarations for 3rd-party APIs.');
        }

        // 3. Info.plist usages
        const infoPlist = this.safeReadFile('ios/App/App/Info.plist');
        if (infoPlist && (infoPlist.includes('NSCameraUsageDescription') || infoPlist.includes('NSPhotoLibraryUsageDescription'))) {
            report.score++;
        } else {
            report.issues.push('Info.plist might be missing specific device feature usage descriptions (e.g. NSCameraUsageDescription).');
        }

        // 4. App Privacy Labels
        report.issues.push('App Privacy Labels (Nutrition labels) must be configured in App Store Connect.');

        report.percentage = Math.round((report.score / report.maxScore) * 100);
        return report;
    }

    /**
     * Run full suite audit
     */
    async runFullAudit() {
        await this.init();
        return {
            timestamp: new Date().toISOString(),
            web: await this.auditWeb(),
            android: await this.auditAndroid(),
            ios: await this.auditIOS()
        };
    }
}

export default PublishingValidator;
