import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import "./globals.css";
import Header from "@/components/Header";
import AnalyticsInjector from "@/components/AnalyticsInjector";
import { apiGet } from "@/lib/api";
import type { HeaderSettings } from "@/types";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

async function getHeaderSettings(): Promise<HeaderSettings | null> {
  try {
    return await apiGet<HeaderSettings>("/api/header-settings");
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const header = await getHeaderSettings();

  return {
    title:
      header?.meta_title ||
      "Enterprise AI Agent Catalogue — KDS ERP Crew",
    description:
      header?.meta_description ||
      "A comprehensive library of enterprise AI agents built to automate, orchestrate, and optimize business processes across Microsoft Dynamics 365.",
    icons: { icon: "/favicon.ico" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const header = await getHeaderSettings();

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/erp-crew-management.webp"
          fetchPriority="high"
        />
      </head>
      <body className={inter.className}>
        <AnalyticsInjector code={header?.google_analytics_code} />
        <Header />
        {children}
      </body>
    </html>
  );
}