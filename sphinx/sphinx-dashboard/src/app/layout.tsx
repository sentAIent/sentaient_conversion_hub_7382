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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
