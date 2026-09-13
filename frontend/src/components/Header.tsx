import Link from "next/link";
import Image from "next/image";
import { assetUrl } from "@/lib/api";
import type { HeaderSettings, MenuItem } from "@/types";
import HeaderInteractive from "./HeaderInteractive";

const API_BASE = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

async function fetchJson(path: string) {
  if (!API_BASE) {
    console.error("NEXT_PUBLIC_LARAVEL_API_URL is not configured.");
    return null;
  }

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      console.error(`Header API request failed: ${path} (${res.status})`);
      return null;
    }

    const json = await res.json();

    // Laravel wraps responses as { success, data } — unwrap it
    if (json && typeof json === "object" && "success" in json) {
      if (json.success === false) return null;
      return json.data;
    }

    return json;
  } catch (error) {
    console.error(`Header API request failed: ${path}`, error);
    return null;
  }
}

export const revalidate = 900;

export default async function Header() {
  const settings: HeaderSettings = (await fetchJson("/api/header-settings")) || {};
  const items: MenuItem[] = (await fetchJson("/api/menu-items")) || [];

  const logo = assetUrl(settings.logo_image) || "/images/kds-logo-header.png";
  const ctaText = settings.cta_text || "Schedule Your AI Audit";

  return (
    <HeaderInteractive
      logo={logo}
      logoAltText={settings.logo_alt_text || "KDS ERP Crew"}
      ctaText={ctaText}
      items={items}
    />
  );
}