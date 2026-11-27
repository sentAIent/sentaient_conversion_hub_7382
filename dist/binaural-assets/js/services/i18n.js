/**
 * MindWave Internationalization (i18n) & RTL Layout Service (2026 SOTA)
 * Supports English, Spanish, German, French, Japanese, and Arabic (with RTL mode).
 */

const DICTIONARIES = {
    en: {
        appName: 'MindWave',
        tagline: 'Cognitive Flow & Neural Entrainment',
        play: 'Play Session',
        pause: 'Pause Audio',
        gammaFocus: 'Gamma (40Hz Peak Focus)',
        alphaFlow: 'Alpha (10Hz Flow State)',
        thetaCalm: 'Theta (6Hz Decompression)',
        deltaSleep: 'Delta (2Hz Deep Recovery)',
        biometricHUD: 'Biometric HUD',
        clinicalEfficacy: 'Clinical Efficacy & Assessments',
        enterprisePortal: 'Enterprise Team Focus & Sync Rooms',
        deleteAccount: 'Delete Account & Data',
        exportData: 'Export My Data',
        gyroTracking: 'Gyro Head Tracking',
        orbitAudio: '3D Orbit Audio',
        dir: 'ltr'
    },
    es: {
        appName: 'MindWave',
        tagline: 'Flujo Cognitivo y Arrastre Neural',
        play: 'Iniciar Sesión',
        pause: 'Pausar Audio',
        gammaFocus: 'Gamma (40Hz Enfoque Máximo)',
        alphaFlow: 'Alpha (10Hz Estado de Flujo)',
        thetaCalm: 'Theta (6Hz Descompresión)',
        deltaSleep: 'Delta (2Hz Sueño Profundo)',
        biometricHUD: 'Monitor Biométrico',
        clinicalEfficacy: 'Eficacia Clínica y Evaluaciones',
        enterprisePortal: 'Salas de Enfoque Empresarial',
        deleteAccount: 'Eliminar Cuenta y Datos',
        exportData: 'Exportar Mis Datos',
        gyroTracking: 'Seguimiento Giroscópico',
        orbitAudio: 'Audio Espacial 3D',
        dir: 'ltr'
    },
    de: {
        appName: 'MindWave',
        tagline: 'Kognitiver Fluss & Neuronale Synchronisation',
        play: 'Sitzung Starten',
        pause: 'Audio Anhalten',
        gammaFocus: 'Gamma (40Hz Spitzenfokus)',
        alphaFlow: 'Alpha (10Hz Flow-Zustand)',
        thetaCalm: 'Theta (6Hz Entspannung)',
        deltaSleep: 'Delta (2Hz Tiefschlaf)',
        biometricHUD: 'Biometrie-HUD',
        clinicalEfficacy: 'Klinische Wirksamkeit',
        enterprisePortal: 'Team-Fokus-Räume',
        deleteAccount: 'Konto & Daten Löschen',
        exportData: 'Daten Exportieren',
        gyroTracking: 'Gyroskop-Kopfverfolgung',
        orbitAudio: '3D-Orbit-Audio',
        dir: 'ltr'
    },
    fr: {
        appName: 'MindWave',
        tagline: 'Flux Cognitif & Entraînement Neural',
        play: 'Démarrer la Session',
        pause: 'Mettre en Pause',
        gammaFocus: 'Gamma (40Hz Concentration Maximale)',
        alphaFlow: 'Alpha (10Hz État de Flow)',
        thetaCalm: 'Theta (6Hz Décompression)',
        deltaSleep: 'Delta (2Hz Sommeil Profond)',
        biometricHUD: 'HUD Biométrique',
        clinicalEfficacy: 'Efficacité Clinique',
        enterprisePortal: 'Espaces de Focus Entreprise',
        deleteAccount: 'Supprimer le Compte et les Données',
        exportData: 'Exporter Mes Données',
        gyroTracking: 'Suivi Gyroscopique de la Tête',
        orbitAudio: 'Audio Spatial 3D',
        dir: 'ltr'
    },
    ja: {
        appName: 'MindWave',
        tagline: '認知的フローと神経同調',
        play: 'セッション開始',
        pause: '音声を一時停止',
        gammaFocus: 'ガンマ (40Hz 超集中)',
        alphaFlow: 'アルファ (10Hz フロー状態)',
        thetaCalm: 'シータ (6Hz リセット)',
        deltaSleep: 'デルタ (2Hz 深い回復)',
        biometricHUD: '生体情報HUD',
        clinicalEfficacy: '臨床効果と評価',
        enterprisePortal: '企業チーム集中ルーム',
        deleteAccount: 'アカウントとデータを削除',
        exportData: 'データをエクスポート',
        gyroTracking: 'ジャイロ頭部追跡',
        orbitAudio: '3D立体音響',
        dir: 'ltr'
    },
    ar: {
        appName: 'مايند ويف',
        tagline: 'التدفق المعرفي ومزامنة الموجات الدماغية',
        play: 'بدء الجلسة',
        pause: 'إيقاف مؤقت',
        gammaFocus: 'غاما (٤٠ هرتز تركيز فائق)',
        alphaFlow: 'ألفا (١٠ هرتز حالة التدفق)',
        thetaCalm: 'ثيتا (٦ هرتز استرخاء وتفريغ)',
        deltaSleep: 'دلتا (٢ هرتز نوم عميق وتعافي)',
        biometricHUD: 'شاشة القياسات الحيوية',
        clinicalEfficacy: 'الفاعلية السريرية والتقييمات',
        enterprisePortal: 'غرف التركيز المتزامنة للشركات',
        deleteAccount: 'حذف الحساب والبيانات نهائياً',
        exportData: 'تصدير بياناتي',
        gyroTracking: 'التتبع الجيروسكوبي للرأس',
        orbitAudio: 'صوت مداري ثلاثي الأبعاد',
        dir: 'rtl'
    }
};

class I18nService {
    constructor() {
        this.currentLocale = localStorage.getItem('mindwave_locale') || 'en';
        this.dict = DICTIONARIES[this.currentLocale] || DICTIONARIES.en;
    }

    setLocale(locale) {
        if (!DICTIONARIES[locale]) return false;
        this.currentLocale = locale;
        this.dict = DICTIONARIES[locale];
        localStorage.setItem('mindwave_locale', locale);

        if (typeof document !== 'undefined' && document.documentElement) {
            document.documentElement.lang = locale;
            document.documentElement.dir = this.dict.dir || 'ltr';
            window.dispatchEvent(new CustomEvent('mindwave-locale-changed', { detail: { locale, dir: this.dict.dir } }));
        }
        return true;
    }

    t(key) {
        return this.dict[key] || DICTIONARIES.en[key] || key;
    }

    getAvailableLocales() {
        return [
            { code: 'en', name: 'English', dir: 'ltr' },
            { code: 'es', name: 'Español', dir: 'ltr' },
            { code: 'de', name: 'Deutsch', dir: 'ltr' },
            { code: 'fr', name: 'Français', dir: 'ltr' },
            { code: 'ja', name: '日本語', dir: 'ltr' },
            { code: 'ar', name: 'العربية', dir: 'rtl' }
        ];
    }
}

export const i18n = new I18nService();
