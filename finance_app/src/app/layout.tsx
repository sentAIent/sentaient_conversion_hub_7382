import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const geistSans = {
  variable: "--font-geist-sans",
  className: "font-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
  className: "font-mono",
};

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
