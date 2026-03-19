import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    try {
      return new URL(explicit);
    } catch {
      /* ignore */
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: "Boots to Journeys | Travel Concierge",
  description:
    "Veteran-owned travel concierge in South Carolina specializing in custom itineraries, group trips, cruises, luxury travel, and exclusive deals.",
  keywords: [
    "travel concierge South Carolina",
    "veteran owned travel agency",
    "custom travel itinerary",
    "luxury travel planner",
    "cruise travel agent",
    "group travel planning",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Boots to Journeys",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boots to Journeys | Travel Concierge",
    description:
      "Veteran-owned travel concierge for custom itineraries, cruises, and luxury trips.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
