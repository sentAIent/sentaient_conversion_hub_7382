"use client";
import { useEffect } from 'react';
import { CursorSettings } from '../lib/useSettings';

export const CURSOR_SHAPES: Record<string, {
  name: string;
  icon: string;
  create: (color: string, secondary?: string) => string | null;
}> = {
  sun: {
    name: 'Sun',
    icon: '☀️',
    create: (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">
      <g>
        <polygon points="46,35 54,35 50,8" fill="${color}" transform="rotate(0,50,50)"/>
        <polygon points="46,35 54,35 50,8" fill="${color}" transform="rotate(45,50,50)"/>
        <polygon points="46,35 54,35 50,8" fill="${color}" transform="rotate(90,50,50)"/>
        <polygon points="46,35 54,35 50,8" fill="${color}" transform="rotate(135,50,50)"/>
        <polygon points="46,35 54,35 50,8" fill="${color}" transform="rotate(180,50,50)"/>
        <polygon points="46,35 54,35 50,8" fill="${color}" transform="rotate(225,50,50)"/>
        <polygon points="46,35 54,35 50,8" fill="${color}" transform="rotate(270,50,50)"/>
        <polygon points="46,35 54,35 50,8" fill="${color}" transform="rotate(315,50,50)"/>
        <polygon points="48,35 52,35 50,18" fill="${color}" transform="rotate(22.5,50,50)"/>
        <polygon points="48,35 52,35 50,18" fill="${color}" transform="rotate(67.5,50,50)"/>
        <polygon points="48,35 52,35 50,18" fill="${color}" transform="rotate(112.5,50,50)"/>
        <polygon points="48,35 52,35 50,18" fill="${color}" transform="rotate(157.5,50,50)"/>
        <polygon points="48,35 52,35 50,18" fill="${color}" transform="rotate(202.5,50,50)"/>
        <polygon points="48,35 52,35 50,18" fill="${color}" transform="rotate(247.5,50,50)"/>
        <polygon points="48,35 52,35 50,18" fill="${color}" transform="rotate(292.5,50,50)"/>
        <polygon points="48,35 52,35 50,18" fill="${color}" transform="rotate(337.5,50,50)"/>
        <circle cx="50" cy="50" r="15" fill="none" stroke="${color}" stroke-width="5"/>
      </g>
    </svg>`
  },
  sun2: {
    name: 'Tribal Sun',
    icon: '🌞',
    create: () => null // uses /tribal-sun-cursor.png
  },
  crosshair: {
    name: 'Crosshair',
    icon: '🎯',
    create: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="11" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.9"/>
      <circle cx="16" cy="16" r="5" fill="none" stroke="${color}" stroke-width="1.2" opacity="0.6"/>
      <circle cx="16" cy="16" r="1.5" fill="${color}"/>
      <line x1="16" y1="1" x2="16" y2="8" stroke="${color}" stroke-width="1.5"/>
      <line x1="16" y1="24" x2="16" y2="31" stroke="${color}" stroke-width="1.5"/>
      <line x1="1" y1="16" x2="8" y2="16" stroke="${color}" stroke-width="1.5"/>
      <line x1="24" y1="16" x2="31" y2="16" stroke="${color}" stroke-width="1.5"/>
    </svg>`
  },
  moon: {
    name: 'Moon',
    icon: '🌙',
    create: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <path d="M 26 4 A 14 14 0 1 1 4 26 A 16 16 0 0 0 26 4 Z" fill="${color}"/>
    </svg>`
  },
  heart: {
    name: 'Heart',
    icon: '❤️',
    create: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 24l-1.5-1.3C7.4 18.1 4 15.1 4 11.5 4 8.4 6.4 6 9.5 6c1.7 0 3.4.8 4.5 2.1 1.1-1.3 2.8-2.1 4.5-2.1 3.1 0 5.5 2.4 5.5 5.5 0 3.6-3.4 6.6-8.5 11.2L14 24z" fill="${color}"/>
    </svg>`
  },
  lotus: {
    name: 'Lotus',
    icon: '🪷',
    create: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <ellipse cx="16" cy="16" rx="4" ry="8" fill="${color}" opacity="0.8"/>
      <ellipse cx="16" cy="16" rx="4" ry="8" fill="${color}" opacity="0.6" transform="rotate(45 16 16)"/>
      <ellipse cx="16" cy="16" rx="4" ry="8" fill="${color}" opacity="0.6" transform="rotate(-45 16 16)"/>
      <ellipse cx="16" cy="16" rx="4" ry="8" fill="${color}" opacity="0.6" transform="rotate(90 16 16)"/>
      <circle cx="16" cy="16" r="3" fill="${color}"/>
    </svg>`
  },
  mindwave: {
    name: 'MindWave',
    icon: '⚡',
    create: (color, secondary) => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128">
      <g stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M64 20 C80 20 108 50 108 80 C108 105 88 115 64 115 C40 115 20 105 20 80 C20 50 48 20 64 20 Z" stroke="${secondary || color}" stroke-width="6" opacity="0.4"/>
        <path d="M40 85 L52 55 L64 75 L76 55 L88 85" stroke="${color}" stroke-width="8"/>
        <path d="M30 95 C45 85 83 85 98 95" stroke="${color}" stroke-width="4" opacity="0.6"/>
      </g>
    </svg>`
  },
  default: {
    name: 'Default',
    icon: '↖',
    create: () => null
  }
};

export function CustomCursor({ settings }: { settings?: CursorSettings }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let styleTag = document.getElementById('sphinx-custom-cursor-style') as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'sphinx-custom-cursor-style';
      document.head.appendChild(styleTag);
    }

    const shape = settings?.shape || 'sun';
    const color = settings?.color || '#00e5ff';
    const secondary = settings?.secondaryColor || '#fb7185';
    const opacity = settings?.opacity ?? 1.0;

    if (shape === 'default') {
      styleTag.textContent = '';
      return;
    }

    let cursorUrl = '';

    if (shape === 'sun2') {
      cursorUrl = `url('/tribal-sun-cursor.png') 16 16, auto`;
    } else {
      const generator = CURSOR_SHAPES[shape]?.create;
      if (!generator) {
        styleTag.textContent = '';
        return;
      }

      const svg = generator(color, secondary);
      if (!svg) {
        styleTag.textContent = '';
        return;
      }

      let finalSvg = svg;
      if (opacity !== 1.0) {
        finalSvg = finalSvg.replace('<svg ', `<svg opacity="${opacity}" `);
      }

      cursorUrl = `url("data:image/svg+xml,${encodeURIComponent(finalSvg)}") 16 16, auto`;
    }

    styleTag.textContent = `
      html, body, a, button, [role="button"], input, select, textarea, .cursor-pointer, .maplibregl-canvas, .maplibregl-canvas-container {
        cursor: ${cursorUrl} !important;
      }
      .cursor-ns-resize { cursor: ns-resize !important; }
      .cursor-ew-resize { cursor: ew-resize !important; }
      .cursor-nwse-resize { cursor: nwse-resize !important; }
      .cursor-nesw-resize { cursor: nesw-resize !important; }
      .cursor-grab { cursor: grab !important; }
      .cursor-grabbing { cursor: grabbing !important; }
      .cursor-crosshair { cursor: crosshair !important; }
    `;

    return () => {
      if (styleTag) {
        styleTag.textContent = '';
      }
    };
  }, [settings?.shape, settings?.color, settings?.secondaryColor, settings?.opacity]);

  return null;
}
