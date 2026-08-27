import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import "./globals.css";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>

        {/* Preload default hero image immediately */}
        <link
          rel="preload"
          as="image"
          href="/images/erp-crew-management.webp"
          fetchPriority="high"
        />
      </head> 
      <body className={inter.className}>{children}</body>
    </html>
  );
}