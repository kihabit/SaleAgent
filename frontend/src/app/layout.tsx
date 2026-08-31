import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enterprise AI Agent Catalogue — KDS ERP Crew",
  description:
    "A comprehensive library of enterprise AI agents built to automate, orchestrate, and optimize business processes across Microsoft Dynamics 365.",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
        <Header />
        {children}
      </body>
    </html>
  );
}