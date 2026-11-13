import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const geistSans = { variable: "--font-geist-sans" };
const geistMono = { variable: "--font-geist-mono" };

export const metadata: Metadata = {
  title: "Liquid",
  description: "Automated Finance & Accounting",
};

import { Toaster } from "react-hot-toast";
import { EntityProvider } from "@/context/EntityContext";
import { TransactionProvider } from "@/context/TransactionContext";
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
          <TransactionProvider>
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
              <Toaster position="top-right" />
            </main>
          </TransactionProvider>
        </EntityProvider>
      </body>
    </html>
  );
}
