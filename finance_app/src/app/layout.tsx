import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liquid",
  description: "Automated Finance & Accounting",
};

import { Toaster } from "react-hot-toast";
import { EntityProvider } from "@/context/EntityContext";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex bg-gray-50">
        <EntityProvider>
          <Sidebar />
          <main className="flex-1 p-8 overflow-y-auto">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
            <Toaster position="top-right" />
          </main>
        </EntityProvider>
      </body>
    </html>
  );
}
