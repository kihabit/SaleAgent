"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiGet, assetUrl } from "@/lib/api";
import type { HeaderSettings, MenuItem } from "@/types";

const ROUTE_ALIASES: Record<string, string> = {
  "/about": "/about-us",
  "/about/": "/about-us",
  "/aboutus": "/about-us",
  "/about-us/": "/about-us",
};

function normalizeHref(rawHref: string): string {
  if (!rawHref) return "#";
  if (/^https?:\/\//i.test(rawHref) || rawHref.startsWith("#")) {
    return rawHref;
  }
  const trimmed =
    rawHref.length > 1 && rawHref.endsWith("/") ? rawHref.slice(0, -1) : rawHref;
  return ROUTE_ALIASES[trimmed] || ROUTE_ALIASES[rawHref] || rawHref;
}

export default function Header() {
  const [settings, setSettings] = useState<HeaderSettings>({});
  const [items, setItems] = useState<MenuItem[]>([]);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 md:px-10 md:py-3">
        <Link href="/" aria-label="KDS ERP Crew home">
          <Image
            src={logo}
            alt={settings.logo_alt_text || "KDS ERP Crew"}
            width={200}
            height={60}
            priority
            unoptimized
            onLoad={() => setLogoLoaded(true)}
            className={`h-12 w-auto max-w-[68vw] object-contain transition-opacity duration-200 sm:h-[3.75rem] ${
              logoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8">
            {items.map((item) => {
              const label = item.label || item.title || item.name || "";
              const rawHref = item.url || item.href || "#";
              const href = normalizeHref(rawHref);
              const external = /^https?:\/\//i.test(href);

              if (external) {
                return (
                  <a
                    key={item.id}
                    href={href}
                    target={item.target || "_blank"}
                    rel="noopener noreferrer"
                    className="text-[15.4px] font-medium text-gray-700 transition hover:text-[#051895]"
                  >
                    {label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={href}
                  className="text-[15.4px] font-medium text-gray-700 transition hover:text-[#051895]"
                >
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

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-200 text-[#051895] transition hover:bg-gray-50 md:hidden"
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`border-t border-gray-100 bg-white px-4 pb-4 pt-2 shadow-sm md:hidden ${mobileOpen ? "block" : "hidden"}`}
      >
        <nav className="flex flex-col">
          {items.map((item) => {
            const label = item.label || item.title || item.name || "";
            const rawHref = item.url || item.href || "#";
            const href = normalizeHref(rawHref);
            const external = /^https?:\/\//i.test(href);
            const className = "border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-700 transition hover:text-[#051895]";

            return external ? (
              <a key={item.id} href={href} target={item.target || "_blank"} rel="noopener noreferrer" className={className} onClick={() => setMobileOpen(false)}>
                {label}
              </a>
            ) : (
              <Link key={item.id} href={href} className={className} onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            );
          })}
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-3 inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            style={{ backgroundColor: "#051895" }}
          >
            {ctaText}
          </a>
        </nav>
      </div>
    </header>
  );
}