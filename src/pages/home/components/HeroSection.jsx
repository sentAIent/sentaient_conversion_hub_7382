import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 'interstellar',
    image: '/hero_slide_interstellar.jpg',
    logo: '/interstellar_logo.png',
    logoScale: 'scale-100',
    appName: 'Interstellar',
    tagline: 'Deep-space exploration game',
    accentFrom: 'from-blue-500',
    accentTo: 'to-cyan-400',
    badgeColor: 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300',
    category: 'Gaming',
    href: '/interstellar',
  },
  {
    id: 'mindwave',
    image: '/hero_slide_mindwave.jpg',
    logo: '/mindwave-logo.png',
    logoScale: 'scale-[2.2] translate-y-[8px]',
    appName: 'MindWave',
    tagline: 'Binaural beats & cymatic visuals',
    accentFrom: 'from-teal-400',
    accentTo: 'to-blue-500',
    badgeColor: 'bg-teal-500/20 border-teal-400/40 text-teal-300',
    category: 'Health & Wellness',
    href: '/mindwave',
  },
  {
    id: 'icebreaker',
    image: '/hero_slide_icebreaker.jpg',
    logo: '/icebreaker_logo.png',
    logoScale: 'scale-[0.85]',
    appName: 'Icebreaker',
    tagline: 'Real-world social discovery platform',
    accentFrom: 'from-pink-500',
    accentTo: 'to-purple-500',
    badgeColor: 'bg-pink-500/20 border-pink-400/40 text-pink-300',
    category: 'Social',
    href: '/icelogin',
  },
  {
    id: 'legaleagle',
    image: '/hero_slide_legaleagle.jpg',
    logo: '/legal_eagle_logo.png',
    logoScale: 'scale-125',
    appName: 'Legal Eagle',
    tagline: 'AI-powered legal document analysis',
    accentFrom: 'from-violet-500',
    accentTo: 'to-purple-600',
    badgeColor: 'bg-violet-500/20 border-violet-400/40 text-violet-300',
    category: 'Legal',
    href: '/legaleagle',
  },
  {
    id: 'autopilot',
    image: '/hero_slide_autopilot.jpg',
    logo: '/autopilot_logo.png',
    logoScale: 'scale-[1.4] translate-y-[8px]',
    appName: 'AutoPilot',
    tagline: 'Autonomous AI marketing engine',
    accentFrom: 'from-emerald-500',
    accentTo: 'to-green-400',
    badgeColor: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300',
    category: 'B2B Marketing',
    href: '#platforms',
  },
];

const AUTOPLAY_MS = 5000;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-end overflow-hidden bg-[#0A0A0B] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Carousel Background ── */}
      <AnimatePresence mode="sync">
        <motion.img
          key={slide.id}
          src={slide.image}
          alt={slide.appName}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      {/* ── Gradient overlays ── */}
      {/* Bottom gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-10 pointer-events-none" />
      {/* Top gradient for header clearance */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />

      {/* ── Logo collage watermark (edges only) ── */}
      <img
        src="/logo_collage_overlay.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center mix-blend-screen pointer-events-none opacity-25 z-10"
        style={{
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 40%, black 85%)',
          maskImage: 'radial-gradient(circle at center, transparent 40%, black 85%)',
        }}
      />

      {/* ── Prev / Next arrow controls ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Hidden Preloader for all slides ── */}
      <div className="hidden" aria-hidden="true">
        {SLIDES.map(s => (
          <React.Fragment key={`preload-${s.id}`}>
            <img src={s.image} alt="" loading="lazy" />
            <img src={s.logo} alt="" loading="lazy" />
          </React.Fragment>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-20 text-left">

        {/* App logo icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`logo-${slide.id}`}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -10 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mb-5"
          >
            <div className="w-20 h-20 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden">
              <img
                src={slide.logo}
                alt={`${slide.appName} logo`}
                width={80}
                height={80}
                loading="eager"
                className={`w-full h-full object-contain ${slide.logoScale}`}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* App badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${slide.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-sm ${slide.badgeColor}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {slide.category}
          </motion.div>
        </AnimatePresence>

        {/* App name */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`h1-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-3 leading-none"
          >
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.accentFrom} ${slide.accentTo} drop-shadow-lg`}>
              {slide.appName}
            </span>
          </motion.h1>
        </AnimatePresence>

        {/* Tagline */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`p-${slide.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-8 drop-shadow"
          >
            {slide.tagline}
          </motion.p>
        </AnimatePresence>

        {/* CTA row */}
        <div className="flex flex-row items-center gap-4">
          <a
            href={slide.href}
            onClick={(e) => {
              if (!slide.href.startsWith('#')) {
                e.preventDefault();
                // Bypass universal links by opening a blank tab and setting location asynchronously
                const w = window.open('about:blank', '_blank');
                if (w) {
                  w.opener = null;
                  w.location.href = slide.href;
                }
              }
            }}
            target={slide.href.startsWith('#') ? undefined : "_blank"}
            rel={slide.href.startsWith('#') ? undefined : "noopener noreferrer"}
            className={`group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r ${slide.accentFrom} ${slide.accentTo} rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]`}
          >
            Launch {slide.appName}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-white/5 border border-white/20 rounded-full backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
          >
            Explore All
          </button>
        </div>
      </div>

      {/* ── Dot indicators + progress bar ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        {/* Dots */}
        <div className="flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              aria-label={`Go to ${s.appName}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        {/* Autoplay progress bar */}
        {!paused && (
          <div className="w-32 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              key={`progress-${slide.id}`}
              className="h-full bg-white rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
