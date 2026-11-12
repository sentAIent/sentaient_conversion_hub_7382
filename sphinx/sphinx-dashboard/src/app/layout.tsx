import type { Metadata, Viewport } from "next";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sphinx Tactical OSINT Hub",
  description: "Global defense, geospatial intelligence, radar, celestial, and SIGINT situational awareness platform.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sphinx OSINT",
  },
  manifest: "/manifest.json",
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased font-mono bg-black text-white">
      <head>
        <style
          id="sphinx-custom-cursor-style"
          dangerouslySetInnerHTML={{
            __html: `*, *::before, *::after { cursor: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20width%3D%2232%22%20height%3D%2232%22%3E%3Cg%3E%3Cpolygon%20points%3D%2246%2C35%2054%2C35%2050%2C8%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(0%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2246%2C35%2054%2C35%2050%2C8%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(45%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2246%2C35%2054%2C35%2050%2C8%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(90%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2246%2C35%2054%2C35%2050%2C8%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(135%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2246%2C35%2054%2C35%2050%2C8%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(180%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2246%2C35%2054%2C35%2050%2C8%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(225%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2246%2C35%2054%2C35%2050%2C8%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(270%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2246%2C35%2054%2C35%2050%2C8%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(315%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2248%2C35%2052%2C35%2050%2C18%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(22.5%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2248%2C35%2052%2C35%2050%2C18%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(67.5%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2248%2C35%2052%2C35%2050%2C18%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(112.5%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2248%2C35%2052%2C35%2050%2C18%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(157.5%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2248%2C35%2052%2C35%2050%2C18%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(202.5%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2248%2C35%2052%2C35%2050%2C18%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(247.5%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2248%2C35%2052%2C35%2050%2C18%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(292.5%2C50%2C50)%22%2F%3E%3Cpolygon%20points%3D%2248%2C35%2052%2C35%2050%2C18%22%20fill%3D%22%2300e5ff%22%20transform%3D%22rotate(337.5%2C50%2C50)%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2215%22%20fill%3D%22none%22%20stroke%3D%22%2300e5ff%22%20stroke-width%3D%225%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") 16 16, auto !important; } .cursor-ns-resize, .cursor-ns-resize * { cursor: ns-resize !important; } .cursor-ew-resize, .cursor-ew-resize * { cursor: ew-resize !important; } .cursor-nwse-resize, .cursor-nwse-resize * { cursor: nwse-resize !important; } .cursor-nesw-resize, .cursor-nesw-resize * { cursor: nesw-resize !important; } .cursor-grab, .cursor-grab * { cursor: grab !important; } .cursor-grabbing, .cursor-grabbing * { cursor: grabbing !important; } .cursor-crosshair, .cursor-crosshair * { cursor: crosshair !important; }`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var s = localStorage.getItem('sphinx_user_settings_v1');
                if (s) {
                  var p = JSON.parse(s);
                  if (p && p.cursor) {
                    var shape = p.cursor.shape || 'sun';
                    var color = p.cursor.color || '#00e5ff';
                    var op = p.cursor.opacity != null ? p.cursor.opacity : 1.0;
                    var url = '';
                    if (shape === 'sun2') {
                      url = "url('/sphinx/tribal-sun-cursor.png') 16 16, url('/tribal-sun-cursor.png') 16 16, auto";
                    } else if (shape === 'mindwave') {
                      url = "url('/sphinx/mindwave-cursor.png') 16 16, url('/mindwave-cursor.png') 16 16, auto";
                    } else if (shape === 'crosshair') {
                      var chSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="' + color + '" stroke-width="1.5" opacity="0.9"/><circle cx="16" cy="16" r="5" fill="none" stroke="' + color + '" stroke-width="1.2" opacity="0.6"/><circle cx="16" cy="16" r="1.5" fill="' + color + '"/><line x1="16" y1="1" x2="16" y2="8" stroke="' + color + '" stroke-width="1.5"/><line x1="16" y1="24" x2="16" y2="31" stroke="' + color + '" stroke-width="1.5"/><line x1="1" y1="16" x2="8" y2="16" stroke="' + color + '" stroke-width="1.5"/><line x1="24" y1="16" x2="31" y2="16" stroke="' + color + '" stroke-width="1.5"/></svg>';
                      url = 'url("data:image/svg+xml,' + encodeURIComponent(chSvg) + '") 16 16, auto';
                    } else if (shape === 'sun' && (color !== '#00e5ff' || op !== 1.0)) {
                      var sunSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32"' + (op !== 1 ? ' opacity="' + op + '"' : '') + '><g><polygon points="46,35 54,35 50,8" fill="' + color + '" transform="rotate(0,50,50)"/><polygon points="46,35 54,35 50,8" fill="' + color + '" transform="rotate(45,50,50)"/><polygon points="46,35 54,35 50,8" fill="' + color + '" transform="rotate(90,50,50)"/><polygon points="46,35 54,35 50,8" fill="' + color + '" transform="rotate(135,50,50)"/><polygon points="46,35 54,35 50,8" fill="' + color + '" transform="rotate(180,50,50)"/><polygon points="46,35 54,35 50,8" fill="' + color + '" transform="rotate(225,50,50)"/><polygon points="46,35 54,35 50,8" fill="' + color + '" transform="rotate(270,50,50)"/><polygon points="46,35 54,35 50,8" fill="' + color + '" transform="rotate(315,50,50)"/><polygon points="48,35 52,35 50,18" fill="' + color + '" transform="rotate(22.5,50,50)"/><polygon points="48,35 52,35 50,18" fill="' + color + '" transform="rotate(67.5,50,50)"/><polygon points="48,35 52,35 50,18" fill="' + color + '" transform="rotate(112.5,50,50)"/><polygon points="48,35 52,35 50,18" fill="' + color + '" transform="rotate(157.5,50,50)"/><polygon points="48,35 52,35 50,18" fill="' + color + '" transform="rotate(202.5,50,50)"/><polygon points="48,35 52,35 50,18" fill="' + color + '" transform="rotate(247.5,50,50)"/><polygon points="48,35 52,35 50,18" fill="' + color + '" transform="rotate(292.5,50,50)"/><polygon points="48,35 52,35 50,18" fill="' + color + '" transform="rotate(337.5,50,50)"/><circle cx="50" cy="50" r="15" fill="none" stroke="' + color + '" stroke-width="5"/></g></svg>';
                      url = 'url("data:image/svg+xml,' + encodeURIComponent(sunSvg) + '") 16 16, auto';
                    } else if (shape === 'default') {
                      url = 'auto';
                    }
                    if (url) {
                      var el = document.getElementById('sphinx-custom-cursor-style');
                      if (el) {
                        el.textContent = '*, *::before, *::after { cursor: ' + url + ' !important; } .cursor-ns-resize, .cursor-ns-resize * { cursor: ns-resize !important; } .cursor-ew-resize, .cursor-ew-resize * { cursor: ew-resize !important; } .cursor-nwse-resize, .cursor-nwse-resize * { cursor: nwse-resize !important; } .cursor-nesw-resize, .cursor-nesw-resize * { cursor: nesw-resize !important; } .cursor-grab, .cursor-grab * { cursor: grab !important; } .cursor-grabbing, .cursor-grabbing * { cursor: grabbing !important; } .cursor-crosshair, .cursor-crosshair * { cursor: crosshair !important; }';
                      }
                    }
                  }
                }
              } catch(e){}
            })();`
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
