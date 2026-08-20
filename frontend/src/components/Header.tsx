"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet, assetUrl } from "@/lib/api";
import type { HeaderSettings, MenuItem } from "@/types";

/**
 * Maps API-provided menu URLs to the actual Next.js route paths
 * that exist in src/app. Add an entry here any time the CMS/API
 * sends a URL slug that doesn't exactly match your folder name
 * under src/app, instead of hunting down 404s later.
 *
 * Key   = possible value coming from the API
 * Value = actual route that exists in src/app
 */
const ROUTE_ALIASES: Record<string, string> = {
  "/about": "/about-us",
  "/about/": "/about-us",
  "/aboutus": "/about-us",
  "/about-us/": "/about-us",
};

function normalizeHref(rawHref: string): string {
  if (!rawHref) return "#";

  // Leave external / anchor / hash links untouched
  if (/^https?:\/\//i.test(rawHref) || rawHref.startsWith("#")) {
    return rawHref;
  }

  // Strip trailing slash for lookup (except root "/")
  const trimmed =
    rawHref.length > 1 && rawHref.endsWith("/") ? rawHref.slice(0, -1) : rawHref;

  return ROUTE_ALIASES[trimmed] || ROUTE_ALIASES[rawHref] || rawHref;
}

export default function Header() {
  const [settings, setSettings] = useState<HeaderSettings>({});
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    Promise.allSettled([
      apiGet<HeaderSettings>("/api/header-settings"),
      apiGet<MenuItem[]>("/api/menu-items"),
    ]).then(([header, menu]) => {
      if (header.status === "fulfilled") setSettings(header.value || {});
      if (menu.status === "fulfilled") setItems(menu.value || []);
    });
  }, []);

  const logo = assetUrl(settings.logo_image) || "/images/kds-logo-header.png";
  const ctaText = settings.cta_text || "Schedule Your AI Audit";
  const ctaUrl = settings.cta_url || "https://keydynamicssolutions.com/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-3 md:px-10">
        <Link href="/" aria-label="KDS ERP Crew home">
          <img
            src={logo}
            alt={settings.logo_alt_text || "KDS ERP Crew"}
            className="h-[3.75rem] object-contain"
          />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8">
            {items.map((item) => {
              const label = item.label || item.title || item.name || "";
              const rawHref = item.url || item.href || "#";
              const href = normalizeHref(rawHref);
              const external = /^https?:\/\//i.test(href);

              return external ? (
                <a
                  key={item.id}
                  href={href}
                  target={item.target || "_blank"}
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                >
                  {label}
                </a>
              ) : (
                <Link key={item.id} href={href} className="text-sm font-medium">
                  {label}
                </Link>
              );
            })}
          </nav>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            style={{ backgroundColor: "#051895" }}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </header>
  );
}