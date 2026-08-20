import type { Metadata } from "next";
import "./styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enterprise AI Agent Catalogue — KDS ERP Crew",
  description:
    "A comprehensive library of enterprise AI agents built to automate, orchestrate, and optimize business processes across Microsoft Dynamics 365.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
