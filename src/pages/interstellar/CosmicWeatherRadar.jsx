import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const WEATHER_CONDITIONS = [
  {
    id: 'solar_flare',
    name: 'Coronal Mass Ejection (Solar Flare)',
    severity: 'High Warning',
    icon: '☀️',
    color: '#ffaa00',
    debuff: 'Disables energy shielding outside asteroid shadow',
    buff: '+35% Plasma Weapon Thermal Output',
    countdown: 18,
    advice: 'Seek physical cover behind asteroid clusters or planetary rings.'
  },
  {
    id: 'ion_storm',
    name: 'Dense Ion Dust Nebula',
    severity: 'Severe Disruption',
    icon: '⚡',
    color: '#00f3ff',
    debuff: 'Radar targeting scrambler active; engine thrust -20%',
    buff: 'Cloaking signature +50% effective against hostile tracking',
    countdown: 45,
    advice: 'Switch to manual visual guidance and ballistic railguns.'
  },
  {
    id: 'gravity_singularity',
    name: 'Micro-Singularity Gravitational Rift',
    severity: 'Extreme Hazard',
    icon: '🌀',
    color: '#9d4edd',
    debuff: 'Extreme vector drift; afterburner fuel burn doubled',
    buff: 'Slingshot velocity acceleration bonus up to +120%',
    countdown: 60,
    advice: 'Counter-steer against gravitational pull; avoid event horizon perimeter.'
  },
  {
    id: 'pulsar_sweep',
    name: 'Neutron Pulsar Gamma Sweep',
    severity: 'Periodic Radiation',
    icon: '☢️',
    color: '#ff0055',
    debuff: 'Hull erosion every 4 seconds unless polarized',
    buff: 'Quantum capacitor recharge rate +80%',
    countdown: 12,
    advice: 'Match Shield Polarization frequency to Gamma spectrum.'
  }
];

export const CosmicWeatherRadar = ({ isOpen, onClose, iframeRef }) => {
  const [currentWeather, setCurrentWeather] = useState(WEATHER_CONDITIONS[0]);
  const [shieldPolarization, setShieldPolarization] = useState('ALPHA'); // 'ALPHA' | 'BETA' | 'GAMMA'
  const [radiationBaffles, setRadiationBaffles] = useState(true);
  const [countdownTimer, setCountdownTimer] = useState(18);

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  // Weather Countdown ticker
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCountdownTimer((prev) => (prev > 1 ? prev - 1 : currentWeather.countdown));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, currentWeather]);

  const selectWeather = async (weather) => {
    await triggerHaptic(ImpactStyle.Medium);
    setCurrentWeather(weather);
    setCountdownTimer(weather.countdown);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'APPLY_WEATHER_HAZARD',
        weather
      }, '*');
    }
  };

  const cyclePolarization = async () => {
    await triggerHaptic(ImpactStyle.Heavy);
    const options = ['ALPHA', 'BETA', 'GAMMA'];
    const nextIdx = (options.indexOf(shieldPolarization) + 1) % options.length;
    const nextPol = options[nextIdx];
    setShieldPolarization(nextPol);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'SET_SHIELD_POLARIZATION',
        polarization: nextPol
      }, '*');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-neutral-950 border border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-amber-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📡</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-amber-300 font-mono">
                  COSMIC WEATHER & STELLAR HAZARD RADAR
                </h2>
                <p className="text-xs text-amber-400/70 font-mono">
                  Solar Flares • Ion Storms • Gravitational Rifts • Shield Polarization
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Active Hazard Hero Card */}
            <div
              className="p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
              style={{
                borderColor: currentWeather.color,
                background: `radial-gradient(circle at top left, ${currentWeather.color}15, rgba(10, 10, 10, 0.9))`
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl p-3 rounded-2xl bg-black/60 border border-neutral-800">
                  {currentWeather.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white font-mono">{currentWeather.name}</span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
                      style={{ color: currentWeather.color, background: `${currentWeather.color}25` }}
                    >
                      {currentWeather.severity}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-1">{currentWeather.advice}</p>
                </div>
              </div>

              {/* Countdown Ticker */}
              <div className="text-center p-3 rounded-xl bg-black/80 border border-neutral-800 min-w-[110px]">
                <div className="text-[10px] font-mono text-neutral-400">NEXT WAVE IN</div>
                <div className="text-2xl font-black font-mono text-white animate-pulse">
                  00:{countdownTimer < 10 ? `0${countdownTimer}` : countdownTimer}
                </div>
              </div>
            </div>

            {/* Weather Buff / Debuff Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 font-mono text-xs space-y-1">
                <span className="text-red-400 font-bold block uppercase tracking-wider">Hazard Penalty:</span>
                <span className="text-neutral-300">{currentWeather.debuff}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 font-mono text-xs space-y-1">
                <span className="text-emerald-400 font-bold block uppercase tracking-wider">Tactical Advantage:</span>
                <span className="text-neutral-300">{currentWeather.buff}</span>
              </div>
            </div>

            {/* Defensive Countermeasures Console */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <div className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                Defensive Countermeasure Modulation
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Shield Polarization Switcher */}
                <button
                  onClick={cyclePolarization}
                  className="flex-1 p-3 rounded-xl bg-black/60 border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-between font-mono transition-all"
                >
                  <div className="text-left">
                    <div className="text-[10px] text-neutral-400">SHIELD POLARIZATION</div>
                    <div className="text-sm font-bold text-cyan-300">{shieldPolarization} SPECTRUM</div>
                  </div>
                  <span className="px-2.5 py-1 bg-cyan-950/60 text-cyan-300 rounded text-xs font-bold border border-cyan-500/30">
                    Cycle (Click)
                  </span>
                </button>

                {/* Radiation Baffles */}
                <button
                  onClick={() => {
                    triggerHaptic();
                    setRadiationBaffles(!radiationBaffles);
                  }}
                  className={`flex-1 p-3 rounded-xl border flex items-center justify-between font-mono transition-all ${
                    radiationBaffles
                      ? 'border-emerald-500/40 bg-emerald-950/20'
                      : 'border-neutral-800 bg-black/60'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-[10px] text-neutral-400">HEAT EXCHANGER BAFFLES</div>
                    <div className="text-sm font-bold text-white">
                      {radiationBaffles ? 'SEALED (Protected)' : 'VENTING (Vulnerable)'}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      radiationBaffles ? 'bg-emerald-500 text-black' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {radiationBaffles ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>

            {/* Weather System Catalog Selector */}
            <div>
              <div className="text-xs font-mono text-neutral-400 font-semibold mb-2 uppercase">
                Simulate Stellar Region Weather:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {WEATHER_CONDITIONS.map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => selectWeather(cond)}
                    className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                      currentWeather.id === cond.id
                        ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-2xl">{cond.icon}</span>
                    <span className="text-[11px] font-bold text-white truncate max-w-full">{cond.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CosmicWeatherRadar;
