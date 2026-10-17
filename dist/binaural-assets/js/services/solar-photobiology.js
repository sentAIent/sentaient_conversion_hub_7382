/**
 * solar-photobiology.js
 * MindWave Solar Spectral Photobiology & Circadian Exposure Engine
 *
 * Implements rigorous celestial mechanics, atmospheric optical air mass,
 * and biochemical pathways:
 * 1. NIR-A / NIR-B (700-1400 nm): Subcellular mitochondrial melatonin via Cytochrome c Oxidase (CCO)
 * 2. Circadian Blue (460-490 nm): ipRGC / Melanopsin SCN entrainment & pineal melatonin gating
 * 3. UVA (315-400 nm): Endothelial nitric oxide (NO) mobilization & blood pressure regulation
 * 4. UVB (290-315 nm): 7-DHC pre-vitamin D3 photoisomerization & POMC/alpha-MSH eumelanogenesis
 */

export const FITZPATRICK_PROFILES = {
    1: { name: 'Type I (Very Fair)', desc: 'Always burns, never tans', medMinutesUVI10: 8, optimalMedRatio: 0.5 },
    2: { name: 'Type II (Fair)', desc: 'Burns easily, tans minimally', medMinutesUVI10: 12, optimalMedRatio: 0.6 },
    3: { name: 'Type III (Medium / Olive)', desc: 'Burns moderately, tans gradually', medMinutesUVI10: 18, optimalMedRatio: 0.7 },
    4: { name: 'Type IV (Olive / Brown)', desc: 'Burns rarely, tans easily', medMinutesUVI10: 25, optimalMedRatio: 0.75 },
    5: { name: 'Type V (Dark Brown)', desc: 'Very rarely burns, tans profusely', medMinutesUVI10: 35, optimalMedRatio: 0.8 },
    6: { name: 'Type VI (Deeply Pigmented)', desc: 'Never burns, deeply pigmented', medMinutesUVI10: 50, optimalMedRatio: 0.85 }
};

export class SolarPhotobiologyEngine {
    constructor() {
        this.storageKeyCoords = 'mindwave_solar_coords';
        this.storageKeySkin = 'mindwave_solar_skin_type';
        this.storageKeyNotify = 'mindwave_solar_notifications_enabled';
    }

    /**
     * Get or set user coordinates. Default fallback to 37.7749 (San Francisco) if not set.
     */
    getUserCoordinates() {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                const raw = localStorage.getItem(this.storageKeyCoords);
                if (raw) return JSON.parse(raw);
            }
        } catch (e) {
            console.warn('[Solar] Error reading coordinates from storage', e);
        }
        return { lat: 37.7749, lon: -122.4194, city: 'Local Horizon' };
    }

    setUserCoordinates(lat, lon, city = 'Detected Location') {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(this.storageKeyCoords, JSON.stringify({ lat, lon, city }));
        }
    }

    getUserSkinType() {
        if (typeof window !== 'undefined' && window.localStorage) {
            return parseInt(localStorage.getItem(this.storageKeySkin) || '3', 10);
        }
        return 3;
    }

    setUserSkinType(type) {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(this.storageKeySkin, String(type));
        }
    }

    areNotificationsEnabled() {
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem(this.storageKeyNotify) === 'true';
        }
        return false;
    }

    setNotificationsEnabled(enabled) {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(this.storageKeyNotify, enabled ? 'true' : 'false');
        }
    }

    /**
     * Compute solar position and optical parameters for a given coordinate & date/time.
     */
    calculateSolarPosition(lat, lon, date = new Date()) {
        const rad = Math.PI / 180;
        const deg = 180 / Math.PI;

        const startOfYear = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - startOfYear.getTime();
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

        // 1. Solar Declination (Spencer/Cooper model)
        const declination = 23.45 * Math.sin(rad * ((360 / 365) * (284 + dayOfYear)));

        // 2. Equation of Time (EoT) in minutes
        const B = (360 / 365) * (dayOfYear - 81) * rad;
        const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);

        // 3. Solar Time & Solar Hour Angle (omega)
        const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
        const solarTimeHours = (utcHours + lon / 15 + eot / 60 + 24) % 24;
        const hourAngle = (solarTimeHours - 12) * 15;

        // 4. Solar Zenith & Elevation Angle
        const sinLat = Math.sin(lat * rad);
        const cosLat = Math.cos(lat * rad);
        const sinDec = Math.sin(declination * rad);
        const cosDec = Math.cos(declination * rad);
        const cosOmega = Math.cos(hourAngle * rad);

        const cosZenith = sinLat * sinDec + cosLat * cosDec * cosOmega;
        const zenithDeg = Math.acos(Math.max(-1, Math.min(1, cosZenith))) * deg;
        const elevationDeg = 90 - zenithDeg;

        // 5. Optical Air Mass (Kasten-Young model)
        const airMass = elevationDeg > 0
            ? 1 / (Math.sin(elevationDeg * rad) + 0.50572 * Math.pow(elevationDeg + 6.07995, -1.6364))
            : Infinity;

        // 6. Spectral Active Windows
        const nirActive = elevationDeg > 0;
        const blueCircadianActive = elevationDeg > 10;
        const uvaActive = elevationDeg > 15;
        const uvbActive = elevationDeg > 35; // The biological UVB window threshold

        // Approximate clear-sky UV Index based on elevation
        const estimatedUVI = elevationDeg > 5
            ? Math.max(0, (Math.sin(elevationDeg * rad) * 11) - 0.5)
            : 0;

        return {
            zenith: zenithDeg,
            elevation: elevationDeg,
            airMass: isFinite(airMass) ? airMass : 0,
            nirActive,
            blueCircadianActive,
            uvaActive,
            uvbActive,
            estimatedUVI: parseFloat(estimatedUVI.toFixed(1))
        };
    }

    /**
     * Compute the full daily schedule of solar photobiology windows for today.
     */
    computeDailySchedule(lat, lon, date = new Date()) {
        const schedule = {
            dawn: null,
            sunrise: null,
            circadianBlueStart: null,
            uvaStart: null,
            uvbStart: null,
            solarZenith: null,
            uvbEnd: null,
            uvaEnd: null,
            circadianBlueEnd: null,
            sunset: null,
            peakElevation: -90,
            currentPhase: null
        };

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        // Sample every 2 minutes across the 24h diurnal cycle
        for (let m = 0; m < 1440; m += 2) {
            const sampleTime = new Date(year, month, day, Math.floor(m / 60), m % 60);
            const pos = this.calculateSolarPosition(lat, lon, sampleTime);

            if (pos.elevation > schedule.peakElevation) {
                schedule.peakElevation = pos.elevation;
                schedule.solarZenith = sampleTime;
            }

            // Detect phase crossings
            if (pos.elevation >= 0 && !schedule.sunrise) schedule.sunrise = sampleTime;
            if (pos.elevation >= 10 && !schedule.circadianBlueStart) schedule.circadianBlueStart = sampleTime;
            if (pos.elevation >= 15 && !schedule.uvaStart) schedule.uvaStart = sampleTime;
            if (pos.elevation >= 35 && !schedule.uvbStart) schedule.uvbStart = sampleTime;

            if (schedule.solarZenith && pos.elevation < 35 && schedule.uvbStart && !schedule.uvbEnd) {
                schedule.uvbEnd = sampleTime;
            }
            if (schedule.solarZenith && pos.elevation < 15 && schedule.uvaStart && !schedule.uvaEnd) {
                schedule.uvaEnd = sampleTime;
            }
            if (schedule.solarZenith && pos.elevation < 10 && schedule.circadianBlueStart && !schedule.circadianBlueEnd) {
                schedule.circadianBlueEnd = sampleTime;
            }
            if (schedule.solarZenith && pos.elevation < 0 && schedule.sunrise && !schedule.sunset) {
                schedule.sunset = sampleTime;
            }
        }

        const now = date;
        const currentPos = this.calculateSolarPosition(lat, lon, now);

        // Identify current biological solar phase
        if (currentPos.elevation < 0) {
            schedule.currentPhase = {
                name: 'Nocturnal Restoration',
                badge: 'PINEAL MELATONIN SURGE',
                desc: 'Zero blue light recommended. Pineal gland actively secreting restorative systemic melatonin into CSF & serum.',
                action: 'Shield eyes from blue/green photons (>550nm cutoff). Restorative sleep & cellular autophagy active.'
            };
        } else if (currentPos.elevation < 15) {
            const isMorning = !schedule.solarZenith || now < schedule.solarZenith;
            schedule.currentPhase = isMorning ? {
                name: 'Solar Dawn / NIR Priming',
                badge: 'CYTOCHROME C OXIDASE (CCO)',
                desc: 'Spectrum dominated by Near-Infrared (700-1400 nm) & deep red. Deep tissue penetrance stimulates mitochondrial melatonin.',
                action: '15-30 min outside without sunglasses. Pre-conditions cellular membranes and DNA against subsequent UV exposure.'
            } : {
                name: 'Golden Hour / Evening NIR Recovery',
                badge: 'MITOCHONDRIAL REPAIR & SCN DOWNSHIFT',
                desc: 'Vanishing blue light disinhibits pineal AANAT enzyme. Red/NIR activates DNA repair enzymes in skin cells.',
                action: '20-30 min low-angle sunset exposure. Signals pineal melatonin priming for deep restorative sleep.'
            };
        } else if (currentPos.elevation < 35) {
            schedule.currentPhase = {
                name: 'Mid-Day Circadian & Vascular Wave',
                badge: 'UVA & NITRIC OXIDE (NO) RELEASE',
                desc: 'Strong 480nm blue activates ipRGC melanopsin, anchoring cortisol awakening response. UVA releases photolabile Nitric Oxide.',
                action: '15-20 min ambient light exposure. Promotes systemic vasodilation, healthy arterial blood pressure, and mental alertness.'
            };
        } else {
            const skinType = this.getUserSkinType();
            const profile = FITZPATRICK_PROFILES[skinType] || FITZPATRICK_PROFILES[3];
            const uvi = Math.max(1, currentPos.estimatedUVI);
            const optimalMinutes = Math.round((profile.medMinutesUVI10 * (10 / uvi)) * profile.optimalMedRatio);

            schedule.currentPhase = {
                name: 'Active UVB Synthesis Window',
                badge: 'PRE-VITAMIN D3 & POMC / EUMELANIN',
                desc: 'Solar elevation > 35°. UVB converts 7-DHC to Pre-Vitamin D3. Basal keratinocytes trigger POMC -> alpha-MSH & beta-endorphins.',
                action: `Optimal sub-erythemal exposure for ${profile.name}: ~${Math.max(5, Math.min(60, optimalMinutes))} min. Stop well short of pinkness/erythema.`
            };
        }

        return { currentPos, schedule };
    }

    /**
     * Compute optimal exposure duration for the current location & skin type.
     */
    getOptimalExposureAdvice(lat, lon) {
        const { currentPos, schedule } = this.computeDailySchedule(lat, lon);
        const skinType = this.getUserSkinType();
        const profile = FITZPATRICK_PROFILES[skinType] || FITZPATRICK_PROFILES[3];

        return {
            skinType,
            profile,
            currentPos,
            schedule,
            isUvbWinter: schedule.peakElevation < 35
        };
    }
}

export const solarEngine = new SolarPhotobiologyEngine();
