import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Icebreaker Business | B2B Commerce Portal",
  description: "Drive hyper-local demand with Swarm Campaigns and Bounties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className={`${inter.className} min-h-full flex flex-col bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
