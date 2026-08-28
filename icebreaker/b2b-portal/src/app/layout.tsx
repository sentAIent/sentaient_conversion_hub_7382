import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "../lib/ApolloWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Icebreaker Business | B2B Commerce Portal",
  description: "Drive hyper-local demand with Swarm Campaigns and Bounties.",
  keywords: ["Icebreaker", "B2B", "Commerce", "Swarm Campaigns", "Bounties", "Local Demand", "Retail Analytics"],
  openGraph: {
    title: "Icebreaker Business | B2B Commerce Portal",
    description: "Drive hyper-local demand with Swarm Campaigns and Bounties.",
    url: "https://business.icebreaker.app",
    siteName: "Icebreaker Business",
    images: [
      {
        url: "https://business.icebreaker.app/og-image.png", // Ensure this image exists or replace with actual
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Icebreaker Business | B2B Commerce Portal",
    description: "Drive hyper-local demand with Swarm Campaigns and Bounties.",
    images: ["https://business.icebreaker.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://business.icebreaker.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className={`${inter.className} min-h-full flex flex-col bg-black text-white`}>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
