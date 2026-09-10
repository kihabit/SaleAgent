"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiGet, assetUrl } from "@/lib/api";
import type { HeaderSettings, MenuItem } from "@/types";
import CalendlyModal from "@/components/CalendlyModal";

const ROUTE_ALIASES: Record<string, string> = {
  "/about": "/about-us",
  "/about/": "/about-us",
  "/aboutus": "/about-us",
  "/about-us/": "/about-us",
};

function normalizeHref(rawHref: string): string {
  if (!rawHref) return "#";
  if (/^https?:\/\//i.test(rawHref) || rawHref.startsWith("#")) return rawHref;
  const trimmed = rawHref.length > 1 && rawHref.endsWith("/") ? rawHref.slice(0, -1) : rawHref;
  return ROUTE_ALIASES[trimmed] || ROUTE_ALIASES[rawHref] || rawHref;
}

export default function Header() {
  const [settings, setSettings] = useState<HeaderSettings>({});
  const [items, setItems] = useState<MenuItem[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  useEffect(() => {
    Promise.allSettled([
      apiGet<HeaderSettings>("/api/header-settings"),
      apiGet<MenuItem[]>("/api/menu-items"),
    ]).then(([header, menu]) => {
      if (header.status === "fulfilled") setSettings(header.value || {});
      if (menu.status === "fulfilled") setItems(menu.value || []);
    });
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMobileOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const logo = assetUrl(settings.logo_image) || "/images/kds-logo-header.png";
  const ctaText = settings.cta_text || "Schedule Your AI Audit";

  const renderItem = (item: MenuItem, mobile = false) => {
    const label = item.label || item.title || item.name || "";
    const href = normalizeHref(item.url || item.href || "#");
    const external = /^https?:\/\//i.test(href);
    const className = mobile ? "site-header-mobile-link" : "site-header-link";
    const close = () => mobile && setMobileOpen(false);
    if (external) {
      return <a key={item.id} href={href} target={item.target || "_blank"} rel="noopener noreferrer" className={className} onClick={close}>{label}</a>;
    }
    return <Link key={item.id} href={href} className={className} onClick={close}>{label}</Link>;
  };

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" aria-label="KDS ERP Crew home" className="site-header-logo-link">
            <Image src={logo} alt={settings.logo_alt_text || "KDS ERP Crew"} width={200} height={60} priority unoptimized className="site-header-logo" />
          </Link>

          <div className="site-header-desktop">
            <nav className="site-header-nav" aria-label="Primary navigation">
              {items.length ? items.map((item) => renderItem(item)) : (
                <>
                  <Link href="/" className="site-header-link">Home</Link>
                  <Link href="/agent-library" className="site-header-link">Agent Library</Link>
                  <Link href="/about-us" className="site-header-link">About Us</Link>
                </>
              )}
            </nav>
            <button type="button" className="site-header-cta" onClick={() => setCalendlyOpen(true)}>{ctaText}</button>
          </div>

          <button type="button" className="site-header-menu-button" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} onClick={() => setMobileOpen((value) => !value)}>
            {mobileOpen ? "×" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <div id="mobile-navigation" className="site-header-mobile-panel">
            <nav className="site-header-mobile-nav" aria-label="Mobile navigation">
              {items.length ? items.map((item) => renderItem(item, true)) : (
                <>
                  <Link href="/" className="site-header-mobile-link" onClick={() => setMobileOpen(false)}>Home</Link>
                  <Link href="/agent-library" className="site-header-mobile-link" onClick={() => setMobileOpen(false)}>Agent Library</Link>
                  <Link href="/about-us" className="site-header-mobile-link" onClick={() => setMobileOpen(false)}>About Us</Link>
                </>
              )}
              <button type="button" className="site-header-mobile-cta" onClick={() => { setMobileOpen(false); setCalendlyOpen(true); }}>{ctaText}</button>
            </nav>
          </div>
        )}
      </header>
      <CalendlyModal open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
